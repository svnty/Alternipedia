/**
 * Fetches Wikipedia page content using the Wikipedia API
 * @param slug - The page title/slug to fetch
 * @returns Promise<WikipediaPage | null>
 */
// Simple cache for Wikipedia data during server rendering. Only enable in
// development to avoid unbounded RAM use in production.
// Use require for CommonJS compatibility if needed
// @ts-ignore
const wtf = require('wtf_wikipedia');
const ENABLE_CACHE = process.env.NODE_ENV === 'development';
const cache = ENABLE_CACHE ? new Map<string, any | null>() : null;

/**
 * Fetches Wikipedia page content using wtf_wikipedia
 * @param slug - The page title/slug to fetch
 * @param language - Wikipedia language code
 * @returns Promise<{ title: string, html: string, wikitext: string } | null>
 */
export async function fetchWikipediaPageWithWtf(slug: string, language: string = 'en') {
  const cacheKey = `${language}:${slug}`;
  if (ENABLE_CACHE && cache && cache.has(cacheKey)) {
    return cache.get(cacheKey) || null;
  }
  try {
    // wtf_wikipedia expects spaces, not dashes
    const title = decodeURIComponent(slug);
    const doc = await wtf.fetch(title, {
      follow_redirects: true,
      lang: language,
    });
  if (ENABLE_CACHE && cache) cache.set(cacheKey, doc || null);
    if (!doc) return null;
    return doc;
  } catch (e) {
    return null;
  }
}