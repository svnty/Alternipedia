import WikipediaArticle from "@/app/[lang]/wiki/[slug]/wikipedia-article";
import { WikipediaDataProvider } from "./wikipedia-data-provider";
import { fetchWikipediaPageWithWtf } from "@/lib/wikipedia-api";
import CanonicalUrlSync from './canonical-url-sync';
import CanonicalTitleSync from './canonical-title-sync';

interface WikipediaWrapperProps {
  slug: string;
  language: string;
  bias: string;
}

export default async function WikipediaWrapper({ slug, language, bias }: WikipediaWrapperProps) {
  // Only fetch Wikipedia data if bias is 'wikipedia'
  if (bias !== 'wikipedia') {
    return null;
  }

  const wikipediaData = await fetchWikipediaPageWithWtf(slug, language);
  const jsonData = wikipediaData ? wikipediaData.json() : null;

  // Be conservative about changing the URL client-side. Only adjust when the
  // difference is capitalization or minor separator differences (dashes vs spaces).
  let canonicalSlug: string | null = null;
  
  if (jsonData) {
    const canonicalTitle = String(jsonData.title).trim();
    const rawRequested = String(slug || '').trim();

    // Normalize: replace dashes/underscores with spaces for comparison
    const requestedNormalized = decodeURIComponent(rawRequested).replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
    const canonicalNormalized = canonicalTitle.replace(/\s+/g, ' ').trim();

    // If they are the same except for capitalization, permit a URL update
    if (requestedNormalized.toLowerCase() === canonicalNormalized.toLowerCase()) {
      // Preserve the user's separator preference where possible
      if (rawRequested.includes('-')) {
        canonicalSlug = canonicalTitle.replace(/\s+/g, '_');
      } else if (rawRequested.includes('%20') || rawRequested.includes(' ')) {
        canonicalSlug = canonicalTitle.replace(/\s+/g, '_');
      } else {
        // default to dashes when in doubt
        canonicalSlug = canonicalTitle.replace(/\s+/g, '_');
      }
    } else {
      // Titles differ beyond minor differences; avoid surprising URL changes
      canonicalSlug = null;
    }
  }

  const headings = jsonData ? jsonData['sections'] : [];
  const stringified = JSON.parse(JSON.stringify(headings));
  const canonicalTitle = jsonData?.title || null;

  return (
    <WikipediaDataProvider headings={stringified}>
      {canonicalSlug && canonicalSlug !== slug && (
        // client-side URL sync: replace state without reload
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <CanonicalUrlSync canonicalSlug={canonicalSlug} language={language} />
      )}
      {canonicalTitle && (
        // update visible title text on the client without navigating
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <CanonicalTitleSync canonicalTitle={String(canonicalTitle)} />
      )}
      {/* Intercept clicks on wiki links inserted via innerHTML and route client-side */}
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <WikipediaArticle slug={slug} language={language} wiki={wikipediaData} bias={bias} />
    </WikipediaDataProvider>
  );
}