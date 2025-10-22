import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { url } = req.body || {}
    if (!url) return res.status(400).json({ error: 'missing url' })

    // Server-side fetch to is.gd to avoid service worker interception and opaque redirect
    const r = await fetch(`https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`, {
      redirect: 'follow',
    })

    if (!r.ok) {
      const txt = await r.text().catch(() => '')
      return res.status(502).json({ error: 'shortener failed', details: txt })
    }

    const short = (await r.text()).trim()
    return res.status(200).json({ shortUrl: short })
  } catch (err: any) {
    return res.status(500).json({ error: 'server error', details: err?.message })
  }
}
