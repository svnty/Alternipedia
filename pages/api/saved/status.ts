import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Language } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions as any)
  const s = session as any;
  if (!s || !s.user?.email) return res.status(500).json({ saved: false });

  const { slug, language } = req.query;
  if (!slug || !language) return res.status(500).json({ saved: false });

  try {
    const slugStr = Array.isArray(slug) ? slug[0] : slug;
    const languageStr = Array.isArray(language) ? language[0] : language;
    let parsedSlug = decodeURI(slugStr);

    const article = await prisma.article.findFirst({ 
      where: { 
        slug: parsedSlug, 
        language: languageStr.toUpperCase() as Language 
      }
    });

    if (!article) {
      throw new Error("Article not found");
    }

    const saved = await prisma.savedArticle.findFirst({
      where: {
        articleId: article.id,
        user: { email: s.user.email }
      }
    });
    
    return res.status(200).json({ saved: !!saved })
  } catch (e: any) {
    return res.status(500).json({ error: e })
  }
}
