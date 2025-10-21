import { NextApiRequest, NextApiResponse } from "next";
import { put } from '@vercel/blob';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  if (req.method === 'POST') {
    const session = await getServerSession(authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { blobName, file } = req.body;

    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Size limit: 1 MB for non-pro users
    if (file.size > 1 * 1024 * 1024) {
      if (session?.user.subscription?.tier !== "PRO") {
        return res.status(403).json({ error: "File too large for non-pro users" });
      }
    }

    // Absolute size limit: 5 MB for pro users
    if (file.size > 5 * 1024 * 1024) {
      return res.status(403).json({ error: "File size exceeds the maximum limit of 5 MB" });
    }

    const blob = await put(blobName, file, {
      access: 'public',
      contentType: 'application/octet-stream',
      addRandomSuffix: true,
    });

    return res.status(200).json({ url: blob.url });
  }
}