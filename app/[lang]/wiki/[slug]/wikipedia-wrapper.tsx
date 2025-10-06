import { fetchWikipediaPage, extractWikipediaHeadings } from "@/lib/wikipedia-api";
import WikipediaArticle from "@/app/[lang]/wiki/[slug]/wikipedia-article";
import { WikipediaDataProvider } from "./wikipedia-data-provider";

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

  const wikipediaData = await fetchWikipediaPage(slug, language);
  
  // Extract headings for the sidebar
  const headings = wikipediaData?.content ? extractWikipediaHeadings(wikipediaData.content) : [];
  
  return (
    <WikipediaDataProvider headings={headings}>
      <WikipediaArticle slug={slug} language={language} wikipediaData={wikipediaData} />
    </WikipediaDataProvider>
  );
}