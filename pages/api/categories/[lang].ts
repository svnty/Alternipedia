import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { Language } from "@prisma/client";
import { withRetry } from "@/lib/retry";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;

  if (!lang || typeof lang !== "string") {
    return res.status(400).json({ error: "Missing lang param" });
  }

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const languageEnum = (lang as string).toUpperCase() as Language;
    // Try to query categories for the language. If the Prisma client is out-of-date
    // and the `language` field isn't available on the client, fallback to returning
    // all categories so the UI still has suggestions.
    try {
      const categories = await withRetry(() => prisma.category.findMany({
        where: { language: languageEnum },
        select: { name: true },
        orderBy: { name: "asc" },
      }));
      return res.status(200).json({ categories: categories.map((c) => c.name) });
    } catch (innerErr) {
      // console.warn("Language-filtered category query failed, falling back to all categories:", innerErr);
      // const categories = await withRetry(() => prisma.category.findMany({ select: { name: true }, orderBy: { name: "asc" } }));
      console.error("Failed to load categories, innerError", innerErr);
      return res.status(500).json({ categories: [''], fallback: true, error: "Internal server error" });
    }
  } catch (error) {
    console.error("Failed to load categories:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
