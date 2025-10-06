import { fetchWikipediaPage, parseWikipediaContent } from "@/lib/wikipedia-api";

interface WikipediaArticleProps {
  slug: string;
  language: string;
  wikipediaData: Awaited<ReturnType<typeof fetchWikipediaPage>>;
}

export default function WikipediaArticle({ slug, language, wikipediaData }: WikipediaArticleProps) {
  // Debug: Log what we received
  console.log('WikipediaArticle received:', {
    slug,
    hasData: !!wikipediaData,
    title: wikipediaData?.title,
    hasExtract: !!wikipediaData?.extract,
    hasContent: !!wikipediaData?.content,
    extractLength: wikipediaData?.extract?.length,
    contentLength: wikipediaData?.content?.length,
  });

  // Parse content server-side to ensure consistency
  const parsedContent = wikipediaData?.content 
    ? parseWikipediaContent(wikipediaData.content, language)
    : null;

  // Debug parsed content and images
  console.log('Parsed content info:', {
    hasParsedContent: !!parsedContent,
    parsedContentLength: parsedContent?.length,
    containsImages: parsedContent?.includes('<figure'),
    containsImageKeyword: parsedContent?.includes('File:') || parsedContent?.includes('Image:'),
    firstFewChars: parsedContent?.substring(0, 200)
  });

  // Debug parsed content and images
  console.log('Parsed content info:', {
    hasParsedContent: !!parsedContent,
    parsedContentLength: parsedContent?.length,
    containsImages: parsedContent?.includes('<figure'),
    containsImageKeyword: parsedContent?.includes('File:') || parsedContent?.includes('Image:'),
    firstFewChars: parsedContent?.substring(0, 200)
  });

  if (!wikipediaData) {
    return (
      <div className="w-full flex flex-col justify-start items-center gap-8 p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            Wikipedia Article Not Found
          </h3>
          <p className="text-neutral-600 mb-4">
            We couldn't find a Wikipedia article for "{slug.replace(/-/g, ' ')}"
          </p>
          <a
            href={`https://${language}.wikipedia.org/wiki/Special:Search/${encodeURIComponent(slug.replace(/-/g, ' '))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search Wikipedia →
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="wikipedia-article max-w-none">
      {/* Wikipedia source notice */}
      <div className="self-stretch p-4 m-6 mt-2 bg-blue-50 border-l-4 border-blue-400 rounded-r">
        <p className="text-sm text-blue-800">
          The following selected content bias is sourced from Wikipedia and represents their community-edited perspective. To edit or discuss this version, please
          <a href="https://en.wikipedia.org/wiki/cat" target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">view on Wikipedia →</a>
        </p>
      </div>

      {/* Single column layout for better inline image support */}
      <main className="max-w-4xl mx-auto">
        {/* Article title */}
        <header className="mb-8">
          <h1 className="text-4xl font-serif font-normal text-gray-900 mb-2 leading-tight">
            {wikipediaData.title}
          </h1>
          <div className="h-px bg-gray-300 mb-4"></div>
          
          {/* Source information moved to header */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
            <span>
              Source: 
              <a
                href={`https://${language}.wikipedia.org/wiki/${encodeURIComponent(slug.replace(/-/g, ' '))}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline ml-1"
              >
                Wikipedia
              </a>
            </span>
            <span>Language: <span className="capitalize">{language}</span></span>
          </div>
        </header>

        {/* Article content with inline images */}
        {(wikipediaData.content || wikipediaData.extract) && (
          <div className="wikipedia-article-content">
            {parsedContent ? (
              <div 
                className="max-w-none text-gray-900 leading-relaxed
                         [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:border-b [&_h2]:border-gray-300 [&_h2]:pb-1 [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-black [&_h2]:clear-both
                         [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:text-black [&_h3]:clear-both
                         [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:text-black
                         [&_h5]:text-base [&_h5]:font-semibold [&_h5]:mt-4 [&_h5]:mb-2 [&_h5]:text-black
                         [&_h6]:text-sm [&_h6]:font-semibold [&_h6]:mt-3 [&_h6]:mb-2 [&_h6]:text-black
                         [&_p]:mb-4 [&_p]:leading-relaxed
                         [&_a]:text-blue-700 [&_a]:no-underline [&_a:hover]:underline
                         [&_strong]:font-semibold 
                         [&_em]:italic
                         [&_sup]:text-blue-600 [&_sup]:text-xs [&_sup]:cursor-help
                         [&_ul]:my-2 [&_ul]:ml-8 [&_ul]:list-disc [&_ul>li]:mb-1
                         [&_ol]:my-2 [&_ol]:ml-8 [&_ol]:list-decimal [&_ol>li]:mb-1
                         [&_figure]:my-4
                         after:content-[''] after:table after:clear-both"
                dangerouslySetInnerHTML={{ __html: parsedContent }} 
              />
            ) : (
              <div className="text-base leading-relaxed">
                {wikipediaData.extract}
              </div>
            )}
          </div>
        )}
        
        {/* Featured image at bottom if available and no inline images */}
        {wikipediaData.thumbnail && !parsedContent?.includes('<figure') && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <figure className="text-center">
              <img
                className="mx-auto max-w-md h-auto rounded border border-gray-300 shadow-sm"
                src={wikipediaData.thumbnail.source}
                alt={`Image of ${wikipediaData.title}`}
                loading="lazy"
              />
              <figcaption className="text-xs text-gray-600 mt-2 italic">
                Featured image from Wikipedia
              </figcaption>
            </figure>
          </div>
        )}
      </main>
    </article>
  );
}