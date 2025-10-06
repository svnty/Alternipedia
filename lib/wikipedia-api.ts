/**
 * Fetches Wikipedia page content using the Wikipedia API
 * @param slug - The page title/slug to fetch
 * @returns Promise<WikipediaPage | null>
 */
// Simple cache for Wikipedia data during server rendering

// Use require for CommonJS compatibility if needed
// @ts-ignore
const wtf = require('wtf_wikipedia');
const cache = new Map<string, any | null>();

/**
 * Fetches Wikipedia page content using wtf_wikipedia
 * @param slug - The page title/slug to fetch
 * @param language - Wikipedia language code
 * @returns Promise<{ title: string, html: string, wikitext: string } | null>
 */
export async function fetchWikipediaPageWithWtf(slug: string, language: string = 'en') {
  const cacheKey = `${language}:${slug}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey) || null;
  }
  try {
    // wtf_wikipedia expects spaces, not dashes
    const title = decodeURIComponent(slug.replace(/-/g, ' '));
    const doc = await wtf.fetch(title, {
      follow_redirects: true,
      lang: language,
    });
    cache.set(cacheKey, doc || null);
    if (!doc) return null;
    return doc;
  } catch (e) {
    return null;
  }
}