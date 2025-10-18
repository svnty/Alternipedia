import WikipediaArticle from "@/app/[lang]/wiki/[slug]/wikipedia-article";
import { WikipediaDataProvider } from "./wikipedia-data-provider";
import CanonicalUrlSync from './(client-renders)/canonical-url-sync';
import CanonicalTitleSync from './(client-renders)/canonical-title-sync';

interface WikipediaWrapperProps {
  slug: string;
  language: string;
  bias: string;
  wikipediaData: any;
}

export default function WikipediaWrapper({ slug, language, bias, wikipediaData }: WikipediaWrapperProps) {
  // Only render Wikipedia data if bias is 'wikipedia'
  if (bias !== 'wikipedia') {
    return null;
  }

  const title = wikipediaData ? wikipediaData.title : null;

  // Be conservative about changing the URL client-side. Only adjust when the
  // difference is capitalization or minor separator differences (dashes vs spaces).
  let canonicalSlug: string | null = null;
  
  if (title) {
    const canonicalTitle = String(title).trim();
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

  const headings: any[] = [];
  for (const section of wikipediaData?.sections || []) {
    headings.push({
      title: section.title,
      depth: section.depth,
    });
  }

  const stringified = JSON.parse(JSON.stringify(headings));
  const canonicalTitle = title || slug.replace(/_/g, ' ');

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