import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withRetry } from '@/lib/retry';

// GET /api/revisions?slug=Some_slug&lang=en&bias=socialist
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { slug, lang, bias } = req.query;

    if (!slug || typeof slug !== 'string') {
      return res.status(400).json({ error: 'Missing slug query param' });
    }
    if (!lang || typeof lang !== 'string') {
      return res.status(400).json({ error: 'Missing lang query param' });
    }
    if (!bias || typeof bias !== 'string') {
      return res.status(400).json({ error: 'Missing bias query param' });
    }

    // Find the article first
    const article = await withRetry(() => prisma.article.findUnique({
      where: { slug_language: { slug: slug, language: lang.toUpperCase() as any } },
      select: { id: true },
    }));

    if (!article) {
      return res.status(200).json({ revisions: [] });
    }

    // Find bias id
    const biasDb = await withRetry(() => prisma.bias.findUnique({ where: { name: String(bias) }, select: { id: true } }));
    if (!biasDb) {
      return res.status(200).json({ revisions: [] });
    }

    // Query revisions for this article+bias and aggregate star counts
    const revisions = await withRetry(() => prisma.revision.findMany({
      where: {
        articleId: article.id,
        biasId: biasDb.id,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        votes: {
          select: { value: true },
        },
      },
    }));

    const mapped = revisions.map((r) => ({
      id: r.id,
      createdAt: r.createdAt,
      stars: (r.votes || []).reduce((s, v) => s + (v?.value || 0), 0),
    }));

    return res.status(200).json({ revisions: mapped });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error', debug: String(err) });
  }
}
