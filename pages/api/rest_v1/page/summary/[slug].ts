import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const slug = req.query.slug as string;
  const lang = req.query.lang || 'en';
  const decodedSlug = decodeURIComponent(slug).split('/wikipedia')[0];
  const encodedSlug = encodeURIComponent(decodedSlug);
  const response = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodedSlug}`);
  const data = await response.json();
  return res.status(200).json(data);
};