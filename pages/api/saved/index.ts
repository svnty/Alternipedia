import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Language } from '@prisma/client'
import wtf from '@/lib/wtf'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions as any)
  const s = session as any
  if (!s || !s.user?.email) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  if (req.method === 'POST') {
    const { slug, language } = req.body
    if (!slug || !language) return res.status(400).json({ error: 'Missing parameters' })

    let parsedSlug = decodeURI(slug);

    try {
      const article = await prisma.article.findFirst({ where: { slug: parsedSlug, language: (language.toUpperCase() as unknown) as Language } })

      let saved;
      if (article) {
        saved = await prisma.savedArticle.create({
          data: {
            article: { connect: { id: article.id } },
            user: { connect: { email: s.user.email } },
          }
        })
      } else {
        let valid = await wtf.fetch(parsedSlug, {
          lang: language,
        });

        if (Array.isArray(valid)) {
          valid = valid[0];
        }

        if (!valid) {
          throw new Error("Article does not exist on Wikipedia");
        }

        const article = await prisma.article.create({
          data: {
            title: valid.title(),
            slug: parsedSlug,
            language: language.toUpperCase() as Language,
          }
        });

        // Create saved entry using slug + language fallback (use any to bypass generated client typing until prisma client is regenerated)
        saved = await prisma.savedArticle.create({
          data: {
            article: { connect: { id: article.id } },
            user: { connect: { email: s.user.email } },
          }
        })
      }

      res.status(200).json({ savedAt: saved.savedAt })
    } catch (e: any) {
      if (e?.code === 'P2002') return res.status(409).json({ error: 'Already saved' })
      res.status(500).json({ error: e?.message || 'Server error' })
    }

  } else if (req.method === 'DELETE') {
    const { slug, language } = req.query
    if (!slug || !language) return res.status(400).json({ error: 'Missing parameters' })

    try {
      const slugStr = Array.isArray(slug) ? slug[0] : slug
      const languageStr = Array.isArray(language) ? language[0] : language
      const parsedSlug = decodeURI(slugStr);
      const article = await prisma.article.findFirst({ where: { slug: parsedSlug, language: languageStr.toUpperCase() as Language } })

      if (!article) {
        throw new Error("Article not found");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: s.user.email
        }
      });

      if (!user) {
        throw new Error("this error is impossible??");
      }

      await prisma.savedArticle.delete({ where: { articleId_userId: { articleId: article.id, userId: user.id } } })
      return res.status(200).json({ ok: true })
    } catch (e: any) {
      res.status(500).json({ error: e?.message || 'Server error' })
    }
  } else {
    res.setHeader('Allow', ['POST', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
