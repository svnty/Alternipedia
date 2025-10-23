import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Language } from '@prisma/client'
import { withRetry } from '@/lib/retry'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const s = session as any;
  if (!s || !s.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { slug, language } = req.query;
  if (!slug || !language) return res.status(400).json({ error: 'Missing parameters' });

  // Avoid browser/service-worker HTTP caching for this endpoint
  // so clients always get a fresh saved-status response instead of 304s.
  res.setHeader('Cache-Control', 'no-store');

  try {
    const slugStr = Array.isArray(slug) ? slug[0] : slug;
    const languageStr = Array.isArray(language) ? language[0] : language;
    const parsedSlug = decodeURI(slugStr);
    const parsedLang = languageStr.toUpperCase() as Language;

    // Find a savedArticle for this article (slug+language) and this user
    const saved = await withRetry(() => prisma.savedArticle.findFirst({
      where: {
        article: {
          slug: parsedSlug,
          language: parsedLang,
        },
        user: {
          email: s.user.email,
        }
      },
    }));

    return res.status(200).json({ saved: !!saved })
  } catch (err: any) {
    console.error('saved/status error:', err)
    return res.status(500).json({ error: err?.message || 'Server error' })
  }
}
