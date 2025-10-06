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
    <div className="w-full flex flex-col justify-start items-start">
      <div className="self-stretch p-4 m-6 mt-2 bg-blue-50 border-l-4 border-blue-400 rounded-r">
        <p className="text-sm text-blue-800">
          The following selected content bias is sourced from Wikipedia and represents their community-edited perspective. To edit or discuss this version, please 
          <a
            href={`https://${language}.wikipedia.org/wiki/${encodeURIComponent(slug.replace(/-/g, ' '))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 text-blue-600 hover:underline"
          >
            view on Wikipedia →
          </a>
        </p>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-12">

        <div className="self-stretch inline-flex justify-start items-start gap-12">
          {/* Note about Wikipedia content */}



          <div className="flex-1 inline-flex flex-col justify-start items-start gap-7">
            <h1 className="text-3xl font-bold text-neutral-800">{wikipediaData.title}</h1>

            {/* Full Wikipedia Content */}
            {(wikipediaData.content || wikipediaData.extract) && (
              <div className="w-full prose prose-lg max-w-none text-neutral-800">
                {parsedContent ? (
                  <div dangerouslySetInnerHTML={{ __html: parsedContent }} />
                ) : (
                  <p className="text-base font-normal leading-7">{wikipediaData.extract}</p>
                )}
              </div>
            )}
          </div>

          {/* Wikipedia thumbnail sidebar */}
          {wikipediaData.thumbnail && (
            <div className="w-full max-w-xs p-2.5 bg-white rounded-md outline outline-1 outline-offset-[-1px] outline-gray-100 flex flex-row lg:flex-col justify-start items-start gap-3.5 shrink-0">
              <div className="self-stretch justify-start text-neutral-800 text-lg font-bold leading-loose">
                {wikipediaData.title}
              </div>
              <img
                className="w-full h-auto object-cover rounded"
                src={wikipediaData.thumbnail.source}
                alt={wikipediaData.title}
              />
              <div className="self-stretch justify-start text-neutral-800 text-sm font-normal leading-normal">
                Source: Wikipedia
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}