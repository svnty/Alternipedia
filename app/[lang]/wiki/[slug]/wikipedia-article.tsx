// use require to avoid TS typing issues in this file

import Link from "next/link";

// @ts-ignore
const sanitizeHtml = require('sanitize-html');

interface WikipediaArticleProps {
  slug: string;
  language: string;
  bias: string;
  wiki?: any; // Accept wiki data as a prop
}

function jsonToLinkedParagraph(data: any, language: string, bias: string) {
  return data.sentences.map((sentence: any) => {
    let text = sentence.text;

    // Sort links by length descending to avoid partial replacements
    const links = (sentence.links || []).sort((a: any, b: any) => (b.text?.length || 0) - (a.text?.length || 0));

    // Replace each link text with an anchor tag. For internal wiki page links
    // (not starting with http[s]://) convert to our app route so Next can
    // handle client navigation. External links are left as-is.
    links.forEach((link: any) => {
      if (!link.text) return; // skip if no text (some entries just have page)

      let hrefValue = '';
      if (link.page) {
        try {
          const p = String(link.page || '');
          // Treat absolute URLs as external
          if (/^https?:\/\//i.test(p)) {
            hrefValue = p;
          } else {
            // Normalize internal wiki targets: strip leading '/wiki/' or leading '/'
            let normalized = p.replace(/^\/wiki\//i, '').replace(/^\//, '');
            // Replace underscores with spaces and decode
            const title = decodeURIComponent(normalized.replace(/_/g, ' ')).replace(/\s+/g, ' ').trim();
            const slug = encodeURIComponent(title.replace(/\s+/g, '-'));
            hrefValue = `/${language}/wiki/${slug}`;
          }
        } catch (e) {
          hrefValue = String(link.page);
        }
      }

      const hrefAttr = hrefValue ? `href=\"${hrefValue}\?bias=${bias}"` : '';
      const regex = new RegExp(`\\b${escapeRegExp(link.text)}\\b`, 'g');
      text = text.replace(regex, `<a class="cursor-pointer hover:underline text-blue-500" ${hrefAttr}>${link.text}</a>`);
      console.log(text);
    });

    // Handle formatting
    if (sentence.formatting) {
      if (sentence.formatting.bold) {
        sentence.formatting.bold.forEach((boldText: any) => {
          const regex = new RegExp(`\\b${escapeRegExp(boldText)}\\b`, 'g');
          text = text.replace(regex, `<b>${boldText}</b>`);
        });
      }
      if (sentence.formatting.italic) {
        sentence.formatting.italic.forEach((italicText: any) => {
          const regex = new RegExp(`\\b${escapeRegExp(italicText)}\\b`, 'g');
          text = text.replace(regex, `<i>${italicText}</i>`);
        });
      }
    }

    return text;
  }).join(' '); // join all sentences into one paragraph
}

// Helper function to escape special regex characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function toWikipediaReference(citation: Record<string, any>): string {
  const parts: string[] = [];

  // 1. Authors
  const authors: string[] = [];

  // Check numbered authors first
  for (let i = 1; i <= 20; i++) {
    const last = citation[`last${i}`];
    const first = citation[`first${i}`];
    if (!last && !first) break; // Stop when no author at this index
    authors.push(first ? `${last}, ${first}` : last);
  }

  // If no numbered authors, fall back to unnumbered last/first
  if (authors.length === 0 && (citation.last || citation.first)) {
    authors.push(citation.first ? `${citation.last}, ${citation.first}` : citation.last);
  }

  if (authors.length) {
    parts.push(authors.join("; "));
  }

  // 2. Title
  if (citation.title) {
    parts.push(`''${citation.title}''`);
  }

  // 3. Journal / Magazine / Work
  if (citation.journal) parts.push(citation.journal);
  else if (citation.magazine) parts.push(citation.magazine);
  else if (citation.work) parts.push(citation.work);

  // 4. Publisher / Location
  if (citation.publisher) parts.push(citation.publisher);
  if (citation.location) parts.push(citation.location);

  // 5. Date / Year
  if (citation.date) parts.push(citation.date);
  else if (citation.year) parts.push(citation.year);

  // 6. Volume / Issue / Pages / Article number
  if (citation.volume) {
    let vol = citation.volume;
    if (citation.issue) vol += `(${citation.issue})`;
    parts.push(vol);
  }

  if (citation.pages) parts.push(`pp. ${citation.pages}`);
  if (citation["article-number"]) parts.push(`Article ${citation["article-number"]}`);

  // 7. DOI / PMID / PMC / URL / Chapter URL
  if (citation.doi) parts.push(`doi:${citation.doi}`);
  if (citation.pmid) parts.push(`PMID:${citation.pmid}`);
  if (citation.pmc) parts.push(`PMCID:${citation.pmc}`);
  if (citation.url) parts.push(`<a class="cursor-pointer hover:underline text-blue-500" href="${citation.url}">${citation.url}</a>`);
  if (citation["chapter-url"]) parts.push(`<a class="cursor-pointer hover:underline text-blue-500" href="${citation["chapter-url"]}">${citation["chapter-url"]}</a>`);

  // 8. Access / Archive info
  if (citation["access-date"]) parts.push(`accessed ${citation["access-date"]}`);
  if (citation["archive-date"]) parts.push(`archived ${citation["archive-date"]}`);
  if (citation["archive-url"]) parts.push(`<a class="cursor-pointer hover:underline text-blue-500" href="${citation['archive-url']}">${citation["archive-url"]}</a>`);

  return parts.filter(Boolean).join(". ") + ".";
}

export default async function WikipediaArticle({ slug, language, wiki, bias }: WikipediaArticleProps) {
  const jsonData = wiki ? wiki.json() : null;

  if (!wiki) {
    return (
      <div className="wikipedia-article w-full flex flex-col justify-start items-center gap-8 p-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">
            Wikipedia Article Not Found
          </h3>
          <p className="text-neutral-600 mb-4">
            We couldn't find a Wikipedia article for "{decodeURIComponent(slug.replace(/-/g, ' '))}".
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
      <div className="self-stretch p-4 m-6 mt-2 bg-blue-50 border-l-4 border-blue-400 rounded-r">
        <p className="text-sm text-blue-800">
          The following selected content bias is sourced from Wikipedia and represents their community-edited perspective. To edit or discuss this version, please
          <a href={`https://${language}.wikipedia.org/wiki/${encodeURIComponent(jsonData.title)}`} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">view on Wikipedia →</a>
        </p>
      </div>
      <main className="max-w-4xl mx-auto">
        <div className="space-y-6">

          {jsonData['sections'].map((section: any, index: number) => (
            <section key={index} className="wikipedia-section">
              {section.title && <h2 id={section.title.replace(' ', '-')} className="text-2xl font-bold mt-8 mb-4">{section.title}</h2>}

              {section.paragraphs && section.paragraphs.map((para: any, pIndex: number) => (
                <p key={pIndex} className="mb-4" dangerouslySetInnerHTML={{ __html: jsonToLinkedParagraph(para, language, bias) }}></p>
              ))}

              {/* REFERENCES */}
              {(section.title === 'References') && (
                <div>
                  {wiki.references() && (
                    <div>
                      <ol className="list-decimal">
                        {wiki.references().map((ref: any, index: number) => {
                          const raw = toWikipediaReference(ref.json());
                          // sanitize the output to allow only safe links and text
                          const safe = sanitizeHtml(raw, {
                            allowedTags: ['a', 'b', 'i', 'em', 'strong', 'span'],
                            allowedAttributes: {
                              '*': ['class'],
                              a: ['href', 'class', 'target', 'rel']
                            },
                            // only allow http(s) and mailto links
                            allowedSchemes: ['http', 'https', 'mailto'],
                            transformTags: {
                              'a': (tagName: string, attribs: Record<string, string>) => {
                                // preserve class if present, and ensure safe target/rel
                                attribs.target = attribs.target || '_blank';
                                attribs.rel = attribs.rel || 'noopener noreferrer';
                                
                                return { tagName, attribs };
                              }
                            }
                          });
                          return (
                            <li key={index}>
                              <div className="reference mb-2" dangerouslySetInnerHTML={{ __html: safe }} />
                              {/* {ref.wikitext()} */}
                            </li>
                          );
                        })}
                      </ol>
                    </div>
                  )}
                </div>
              )}



            </section>
          ))}

          {wiki && (
            <div className="self-stretch flex flex-col justify-start items-start gap-5 mt-4">
              <div className="self-stretch px-3 py-2.5 bg-orange-400/10 rounded-md inline-flex justify-start items-center gap-1.5 flex-wrap content-center">
                <div className="w-28 h-7 flex justify-start items-center">
                  <div className="w-7 self-stretch p-1.5 rounded-md flex justify-center items-center gap-1.5">
                    <div className="size- flex justify-start items-center gap-1.5">
                      <div data-svg-wrapper="true" data-property-1="Category" className="relative">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 8H15.9565" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round">
                        </path>
                          <path d="M8.65234 12.2607H19.0002" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round">
                          </path>
                          <path d="M5 12.2607H5.0001" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round">
                          </path>
                          <path d="M8.65234 16.5215H19.0002" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round">
                          </path>
                          <path d="M5 16.5215H5.0001" stroke="#D8753C" strokeWidth="1.5" strokeLinecap="round">
                          </path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="justify-start text-neutral-800 text-sm font-normal  leading-normal">Categories:</div>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  {wiki.categories().map((cat: string, index: number) => (
                    <div key={index} className="inline-flex items-center gap-2 px-2 rounded">
                      <Link href={`/${language}/wiki/Category:${cat.replace(" ", "_")}`} className="hover:underline inline-flex items-center gap-2 whitespace-nowrap">
                        <svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="2" r="1.5" fill="#D8753C"></circle></svg>
                        <div className="text-orange-400 text-sm font-normal leading-normal">{cat}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="self-stretch justify-start text-gray-500 text-sm font-normal  leading-normal">
                Last edited on {new Date(wiki.timestamp()).toUTCString()} (UTC)
              </div>
            </div>
          )}
        </div>
      </main>
    </article>
  );
}