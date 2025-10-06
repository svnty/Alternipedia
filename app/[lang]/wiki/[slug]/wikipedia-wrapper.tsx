import { fetchWikipediaPage } from "@/lib/wikipedia-api";
import WikipediaArticle from "@/app/[lang]/wiki/[slug]/wikipedia-article";

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
  
  return <WikipediaArticle slug={slug} language={language} wikipediaData={wikipediaData} />;
}