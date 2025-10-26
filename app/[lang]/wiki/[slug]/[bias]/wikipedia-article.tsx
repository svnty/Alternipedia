import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import ClientLoadedSignal from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/load-signal";
import { CircleDollarSign } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/app/(components)/ui/tooltip";

interface WikipediaArticleProps {
  slug: string;
  language: string;
  bias: string;
  wiki?: any; // Accept wiki data as a prop
  wikipediaHtml: string;
}

export default async function WikipediaArticle({ slug, language, wiki, bias, wikipediaHtml }: WikipediaArticleProps) {
  const dict = getDictionary(language as Locale);

  const css = await fetch(
    'https://en.wikipedia.org/w/load.php?lang=en&modules=site.styles|skins.vector.styles.legacy&only=styles&skin=vector'
  ).then(res => res.text());

  if (!wiki) {
    return (
      <div className="text-red-300">No Wikipedia article found.</div>
    );
  }

  if (!Object.keys(wiki).length) {
    return (
      <div className="wikipedia-article w-full flex flex-col justify-start items-center gap-8 p-8">
        <ClientLoadedSignal />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            {dict.article.notFoundHeader}
          </h3>
          <p className="text-neutral-600 mb-4">
            {dict.article.notFoundText} "{decodeURIComponent(slug.replaceAll('_', ' '))}".
          </p>
          <a
            href={`https://${language}.wikipedia.org/wiki/Special:Search/${encodeURIComponent(slug)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors active:underline"
          >
            {dict.article.searchWikipediaText} →
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="wikipedia-article max-w-none">
      <ClientLoadedSignal />
      <style jsx>
        {css}
      </style>
      <div className="self-stretch p-4 m-6 mt-2 bg-blue-50 border-l-4 border-blue-400 rounded-r flex items-center">
        <img src='/wikipedia.png' alt="Wikpedia Bias" width={40} className="flex-shrink-0 mr-4" />
        <div className="relative">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://donate.wikimedia.org/" target="_blank" rel="noopener noreferrer" className="block ml-1.5 float-right mt-1 mb-1.5 max-w-[25vw] bg-white border border-gray-200 rounded-sm p-3 cursor-pointer hover:bg-gray-100">
                  <CircleDollarSign />
                </a>
              </TooltipTrigger>
              <TooltipContent className="text-xs" showArrow={true}>
                Wikipedia provides their content for free. Consider donating to help keep it that way.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div>
            <p className="text-sm text-blue-800 flex-1">
              {dict.article.biasIntro.wikipedia.part1}
              <a href={`https://${language}.wikipedia.org/wiki/${encodeURIComponent(wiki.title)}`} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline active:underline">{dict.article.biasIntro.wikipedia.part2}</a>
            </p>
          </div>
        </div>
      </div>

      <div id="wiki-html" dangerouslySetInnerHTML={{ __html: wikipediaHtml }} className="mb-6 [&_p]:mb-2.5 [&_a]:text-blue-500 [&_a]:hover:underline" />

    </article>
  );
}
