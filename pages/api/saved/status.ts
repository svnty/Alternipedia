import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Language } from '@prisma/client'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions as any)
  const s = session as any
  if (!s || !s.user?.email) return res.status(200).json({ saved: false })

  const { slug, language } = req.query
  if (!slug || !language) return res.status(200).json({ saved: false })

  try {
    const slugStr = Array.isArray(slug) ? slug[0] : slug
    const languageStr = Array.isArray(language) ? language[0] : language
    const article = await prisma.article.findFirst({ where: { slug: slugStr, language: (languageStr.toUpperCase() as unknown) as Language } })

    if (article) {
      console.log('Article found, checking saved by articleId & userId');
      const saved = await prisma.savedArticle.findFirst({
        where: {
          articleId: article.id,
          user: { email: s.user.email }
        }
      });
      return res.status(200).json({ saved: !!saved })
    }

    console.log('No article found, checking slug-only saved entries');

    // fallback: check slug-only saved entries (use any to bypass typing until prisma client is regenerated)
    const savedFallback = await prisma.savedArticle.findFirst({ where: { slug: slugStr, user: { email: s.user.email } } })
    return res.status(200).json({ saved: !!savedFallback })
  } catch (e: any) {
    return res.status(200).json({ saved: false })
  }
}
