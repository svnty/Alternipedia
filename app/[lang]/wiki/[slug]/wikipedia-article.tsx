// use require to avoid TS typing issues in this file

import Link from "next/link";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/(components)/ui/table";
import SuspenseImage from "@/app/[lang]/wiki/[slug]/(client-renders)/suspense-image";

// @ts-ignore
const sanitizeHtml = require('sanitize-html');

interface WikipediaArticleProps {
  slug: string;
  language: string;
  bias: string;
  wiki?: any; // Accept wiki data as a prop
}

// Helper function to render image or video
function MediaCard({ url, caption, alt }: { url: string; caption?: string; alt?: string }) {
  const isVideo = /\.(webm|mp4|avi|mov|wmv|flv|mkv)$/i.test(url);
  return (
    <>
      {isVideo ? (
        <video controls className="w-full h-auto rounded" poster="">
          <source src={url} type={`video/${url.split('.').pop()?.toLowerCase()}`} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <SuspenseImage
          src={url}
          alt={alt || caption || 'Media'}
          className="w-full h-auto rounded object-contain"
          loading="eager"
        />
      )}
      {caption && (
        <p className="text-sm text-gray-600 mt-2 text-center">{caption}</p>
      )}
    </>
  );
}

// Helper function to escape special regex characters
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function nestSections(items: any) {
  if (!Array.isArray(items)) return [];
  const result: any = [];
  // virtual root simplifies logic
  const root = { depth: -1, sections: result };
  const stack = [root];

  for (const it of items) {
    const node = Object.assign({}, it, { sections: [] });
    // pop until we find a parent with smaller depth
    while (stack.length > 0 && stack[stack.length - 1].depth >= node.depth) {
      stack.pop();
    }
    // attach to current parent
    const parent = stack[stack.length - 1] || root;
    if (!parent.sections) parent.sections = [];
    parent.sections.push(node);
    stack.push(node);
  }

  return result;
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
            const slug = encodeURIComponent(title.replace(/\s+/g, '_'));
            hrefValue = `/${language}/wiki/${slug}`;
          }
        } catch (e) {
          hrefValue = String(link.page);
        }
      }

      const hrefAttr = hrefValue ? `href=\"${hrefValue}\?bias=${bias}"` : '';
      const regex = new RegExp(`\\b${escapeRegExp(link.text)}\\b`, 'g');
      text = text.replace(regex, `<a class="cursor-pointer hover:underline text-blue-500" ${hrefAttr}>${link.text}</a>`);
    });

    // Handle formatting
    if (sentence.formatting) {
      // When applying formatting we must avoid replacing text inside HTML tags
      // (for example inside an anchor's href attribute). Split the current
      // HTML into tag and non-tag parts and only run replacements on the
      // non-tag parts (text nodes).
      const replaceOutsideTags = (regex: RegExp, replacement: string) => {
        text = text.split(/(<[^>]*>)/g).map((part: string, idx: number) => {
          // even indexes are outside tags
          if (idx % 2 === 0) {
            return part.replace(regex, replacement);
          }
          return part;
        }).join('');
      };

      if (sentence.formatting.bold) {
        sentence.formatting.bold.forEach((boldText: any) => {
          const regex = new RegExp(`\\b${escapeRegExp(boldText)}\\b`, 'g');
          replaceOutsideTags(regex, `<b>${boldText}</b>`);
        });
      }
      if (sentence.formatting.italic) {
        sentence.formatting.italic.forEach((italicText: any) => {
          const regex = new RegExp(`\\b${escapeRegExp(italicText)}\\b`, 'g');
          replaceOutsideTags(regex, `<i>${italicText}</i>`);
        });
      }
    }

    return text;
  }).join(' '); // join all sentences into one paragraph
}

function parseWikiTable(wikitext: any) {
  if (!wikitext.isTable) return null;

  let headers: string[] = [];
  for (let i = 0; i < wikitext.sentences.length; i++) {
    headers.push(wikitext.sentences[i].text.substring(1).trim());
  }

  let title: string = '';
  for (let i = 0; i < wikitext.lists.length; i++) {
    const start = wikitext.lists[i].indexOf('+');
    let tempTitle = start !== -1 ? wikitext.lists[i].substring(start + 1).trim() : '';
    if (tempTitle !== '') {
      title = tempTitle;
    }
  }

  let rows: string[][] = [];

  for (let i = 0; i < wikitext.lists.length; i++) {
    let rowText = wikitext.lists[i].replace(/\n/g, "");

    if (!rowText.includes("{|")) {
      const clean = rowText.replace(/\s+/g, " ").trim();

      const rowStrings = clean
        .split(/\*\s*(?=align=center\s*\|)/)
        .map((r: string) => r.trim())
        .filter(Boolean);

      const parsedRows = rowStrings.map((row: string) => {
        row = row.replace(/[\*\}]+$/, "").trim();

        const cells = row
          .split(/\s*\*\s*/)
          .map((c: string) => c.replace(/^align=center\s*\|\s*/, "").trim())
          .filter(Boolean);

        return cells;
      });

      rows.push(...parsedRows);
    }
  }

  rows = rows.filter(
    (row, idx, arr) =>
      idx === arr.findIndex((r) => JSON.stringify(r) === JSON.stringify(row))
  );

  rows = rows.filter((r) => r.length > 0 && !r.includes("}"));

  console.log(rows);

  return { title, headers, rows };
}

function References({ section, wiki }: { section: any, wiki: any }) {
  return (
    <>
      {(section.title === 'References') && (
        <div className="mx-12 sm:mb-8">
          {wiki.references() && (
            <ol className="list-decimal ml-2">
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
                    <div className="reference mb-2 break-all" dangerouslySetInnerHTML={{ __html: safe }} />
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      )}
    </>
  );
}

function SectionContent({
  section,
  language,
  bias,
  wiki,
  mobile,
  showImages = true,
  pageImageUrl = ''
}: {
  section: any,
  language: string,
  bias: string,
  wiki: any,
  mobile: boolean,
  showImages?: boolean,
  pageImageUrl?: string
}) {
  // ✅ 1. Collect ALL images from all paragraphs (in order)
  const sectionImages = showImages && section.paragraphs
    ? section.paragraphs.flatMap((p: any) => p.images || [])
    : [];

  return (
    <div className="collapsible-content">
      {/* ✅ 2. Render ALL images first, stacked as floats */}
      {sectionImages[0] && sectionImages[0]?.url && sectionImages[0]?.url !== pageImageUrl && sectionImages.map((img: any, i: number) => (
        <div
          key={i}
          className="
    float-none md:float-right
    clear-right  
    w-full md:max-w-[32%] lg:max-w-[40%]
    mb-4 md:ml-6
    bg-white border border-gray-200 rounded-sm p-3
          "
        >
          <MediaCard
            url={img.url}
            caption={img.caption}
            alt={img.caption || 'Image'}
          />
        </div>
      ))}

      {/* ✅ 3. Now render text paragraphs with NO images inside */}
      {section.paragraphs && section.paragraphs.map((para: any, pIndex: number) => {
        const raw = jsonToLinkedParagraph(para, language, bias);

        let tableText: any = {};

        tableText['sentences'] = para.sentences;
        tableText['lists'] = [];

        para.lists.forEach((list: any, id: number) => {
          if (list.text.includes('{|')) {
            tableText['isTable'] = true;
          }
          tableText['lists'].push(list.text);
        });

        const tableData = parseWikiTable(tableText);

        if (tableData) {
          return (
            <div key={pIndex} className="mb-4">
              {tableData.title && (
                <div className="my-4 text-sm font-bold w-full text-center">
                  {tableData.title}
                </div>
              )}
              <div className="overflow-hidden mb-4 rounded-md border bg-background">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      {tableData.headers.map((header, hIndex) => (
                        <TableHead key={hIndex}>{header}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tableData.rows.map((row, rIndex) => (
                      <TableRow key={rIndex}>
                        {row.map((cell, cIndex) => (
                          <TableCell key={cIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          );
        }

        const safe = sanitizeHtml(raw, {
          allowedTags: ['a', 'b', 'i', 'em', 'strong', 'span'],
          allowedAttributes: {
            '*': ['class'],
            a: ['href', 'class', 'target', 'rel']
          },
          allowedSchemes: ['http', 'https', 'mailto'],
          transformTags: {
            'a': (tagName: string, attribs: Record<string, string>) => {
              attribs.rel = attribs.rel || 'noopener noreferrer';
              return { tagName, attribs };
            }
          }
        });

        return (
          <div key={pIndex} className="mb-4">
            <p
              className="leading-relaxed text-base"
              dangerouslySetInnerHTML={{ __html: safe }}
            />

            {/* {JSON.stringify(para)} */}

            {para.lists && para.lists.map((list: any, listIndex: number) => (
              <ul className="list-disc mx-6 mt-3" key={listIndex}>
                {list.lines.map((line: any, lineIndex: number) => (
                  <li key={lineIndex} id={`line-${encodeURI(line.text)}`}>
                    <a
                      href={line.links.find((link: any) => link.page)?.page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        line.links.some((link: any) => link.page)
                          ? 'cursor-pointer hover:underline text-blue-500'
                          : ''
                      }
                    >
                      {line.text}
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        );
      })}

      {/* ✅ Section-level lists */}
      {section.lists && section.lists.map((list: any, lIndex: number) => (
        <ul key={lIndex} className="list-disc list-inside mb-4">
          {list.items && list.items.map((item: any, iIndex: number) => (
            <li key={iIndex} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      ))}

      <References section={section} wiki={wiki} />

      {/* ✅ Recurse for subsections */}
      {section.sections && section.sections.length > 0 && section.sections.map((subSection: any, index: number) => (
        <div key={index}>
          {subSection.title && subSection.depth === 1 && (
            <div
              id={(subSection.title.replace(/\s+/g, '_') + (mobile ? '-mobile' : ''))}
              className="text-xl font-bold mb-2 mt-2 heading-anchor"
            >
              {subSection.title}
            </div>
          )}
          <SectionContent
            section={subSection}
            language={language}
            bias={bias}
            wiki={wiki}
            mobile={mobile}
            showImages={true}
          />
        </div>
      ))}
    </div>
  );
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

export default function WikipediaArticle({ slug, language, wiki, bias }: WikipediaArticleProps) {
  const wikiData: any = {};
  wikiData.pageImage = typeof wiki.pageImage === 'function' ? wiki.pageImage() : wiki.pageImage;
  if (wikiData.pageImage) {
    wikiData.pageImage.url = wikiData.pageImage.url();
    wikiData.pageImage.caption = wikiData.pageImage.caption();
  }
  wikiData.title = wiki.title();
  wikiData.sections = [];

  wiki.sections().forEach((section: any) => {
    let wikiSection: any = {
      title: section.title(),
      depth: section.depth(),
    };
    wikiSection.index = section.index();
    wikiSection.infoboxes = section.infoboxes();
    wikiSection.paragraphs = section.paragraphs();

    if (section.lists) {
      section.lists = typeof section.lists === 'function' ? section.lists() : section.lists;
      section.lists.forEach((list: any) => {
        list.lines = typeof list.lines === 'function' ? list.lines() : list.lines;
        list.text = typeof list.text === 'function' ? list.text() : list.text;
        list.lines.forEach((line: any) => {
          line.text = typeof line.text === 'function' ? line.text() : line.text;
          line.links = typeof line.links === 'function' ? line.links() : line.links;
          line.links.forEach((link: any) => {
            link.text = typeof link.text === 'function' ? link.text() : link.text;
            link.page = typeof link.page === 'function' ? link.page() : link.page;
            link.url = typeof link.url === 'function' ? link.url() : link.url;
          });
        });
      });
    }

    wikiData['sections'][wikiSection.index] = wikiSection;

    wikiData['sections'][wikiSection.index]['paragraphs'].forEach((para: any) => {
      para.sentences = typeof para.sentences === 'function' ? para.sentences() : para.sentences;
      para.references = typeof para.references === 'function' ? para.references() : para.references;
      para.lists = typeof para.lists === 'function' ? para.lists() : para.lists;
      para.images = typeof para.images === 'function' ? para.images() : para.images;

      para.images.forEach((img: any) => {
        img.caption = typeof img.caption === 'function' ? img.caption() : img.caption;
        img.url = typeof img.url === 'function' ? img.url() : img.url;
      });

      para.lists.forEach((list: any) => {
        list.lines = typeof list.lines === 'function' ? list.lines() : list.lines;
        list.text = typeof list.text === 'function' ? list.text() : list.text;
        list.lines.forEach((line: any) => {
          line.text = typeof line.text === 'function' ? line.text() : line.text;
          line.links = typeof line.links === 'function' ? line.links() : line.links;
          line.links.forEach((link: any) => {
            link.text = typeof link.text === 'function' ? link.text() : link.text;
            link.page = typeof link.page === 'function' ? link.page() : link.page;
          });
        });
      });

      para.sentences.forEach((sentence: any) => {
        sentence.links = typeof sentence.links === 'function' ? sentence.links() : sentence.links;
        sentence.text = typeof sentence.text === 'function' ? sentence.text() : sentence.text;
        sentence.italics = typeof sentence.italics === 'function' ? sentence.italics() : sentence.italics;
        sentence.bolds = typeof sentence.bolds === 'function' ? sentence.bolds() : sentence.bolds;

        sentence.links.forEach((link: any) => {
          link.text = typeof link.text === 'function' ? link.text() : link.text;
          link.page = typeof link.page === 'function' ? link.page() : link.page;
          link.url = typeof link.url === 'function' ? link.url() : link.url;
        });
      });
    });
  });


  const nestedJsonSections = nestSections(wikiData.sections);
  const dict = getDictionary(language as Locale);

  if (!wiki) {
    return (
      <div className="wikipedia-article w-full flex flex-col justify-start items-center gap-8 p-8">
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
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {dict.article.searchWikipediaText} →
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
          <a href={`https://${language}.wikipedia.org/wiki/${encodeURIComponent(wikiData.title)}`} target="_blank" rel="noopener noreferrer" className="ml-1 text-blue-600 hover:underline">view on Wikipedia →</a>
        </p>
      </div>
      <main className="mx-auto">
        <div>
          {nestedJsonSections.length > 0 && (
            <>
              {nestedJsonSections.map((section: any, index: number) => {
                if (index === 0) {
                  return (
                    <div key={index}>
                      {section.title && section.depth === 0 && (
                        <div className="w-full">
                          <div className="flex items-center justify-between w-full">
                            <div data-index={index} data-depth={section.depth} id={section.title.replace(/\s+/g, '_')} className="text-2xl font-bold heading-anchor text-left truncate">
                              {section.title}
                            </div>
                          </div>
                          <hr className="h-px mt-3 bg-gray-200 border-0 dark:bg-gray-700" />
                        </div>
                      )}
                      <div className="relative">
                        {wikiData.pageImage && wikiData.pageImage.url && wikiData.pageImage.url !== 'https://wikipedia.org/wiki/Special:Redirect/file/' && (
                          <div className="block md:float-right md:ml-4 mb-4 md:max-w-[30vw] lg:max-w-[25vw] bg-white border border-gray-200 rounded-sm p-4">
                            <MediaCard url={wikiData.pageImage.url} caption={wikiData.pageImage.caption} alt={wikiData.pageImage.caption} />
                          </div>
                        )}
                        <SectionContent section={section} language={language} bias={bias} wiki={wiki} mobile={false} pageImageUrl={wikiData.pageImage?.url} />
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <details className="wiki-section">
                        <summary className="group w-full mb-2 mt-2 transition-colors cursor-pointer py-3 list-none lg:pointer-events-none">
                          <div className="w-full">
                            <div className="flex items-center justify-between w-full">
                              <div data-index={index} data-depth={section.depth} id={section.title.replace(/\s+/g, '_')} className="text-2xl font-bold heading-anchor text-left truncate">
                                {section.title}
                              </div>

                              <div className="flex-shrink-0 ml-2 lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 group-open:rotate-90 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                            </div>

                            <hr className="h-px mt-3 bg-gray-200 border-0 dark:bg-gray-700 lg:hidden" />
                          </div>
                        </summary>
                        <div className="overflow-hidden transition-all duration-200 ease-out lg:hidden">
                          <SectionContent section={section} language={language} bias={bias} wiki={wiki} mobile={true} />
                        </div>
                      </details>
                      <div className="hidden lg:block">
                        <SectionContent section={section} language={language} bias={bias} wiki={wiki} mobile={false} />
                      </div>
                    </div>
                  );
                }
              })
              }
            </>
          )}


          {wiki && (
            <div className="self-stretch flex flex-col justify-start items-start gap-5 mt-4">
              <div className="self-stretch px-3 py-2.5 bg-orange-400/10 rounded-md inline-flex justify-start items-center gap-1.5 flex-wrap content-center">
                <div className="w-28 h-7 flex justify-start items-center">
                  <div className="w-7 self-stretch p-1.5 rounded-md flex justify-center items-center gap-1.5">
                    <div className="w-4 h-4 flex justify-start items-center gap-1.5">
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
                  <div className="justify-start text-neutral-800 text-sm font-normal ml-2 leading-normal">Categories:</div>
                </div>
                <div className="flex flex-wrap items-center gap-1">
                  {wiki.categories().map((cat: string, index: number) => (
                    <div key={index} className="inline-flex items-center gap-2 px-2 rounded">
                      <Link href={`/${language}/wiki/Category${encodeURIComponent(':' + cat)}?bias=${bias}`} className="hover:underline inline-flex items-center gap-2 whitespace-nowrap">
                        <svg width="3" height="4" viewBox="0 0 3 4" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="2" r="1.5" fill="#D8753C"></circle></svg>
                        <div className="text-orange-400 text-sm font-normal leading-normal">{cat}</div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
              <div className="self-stretch justify-start text-gray-500 text-sm font-normal  leading-normal">
                {dict.article.lastEdited} {new Date(wiki.timestamp()).toLocaleString(language, { dateStyle: 'long', timeStyle: 'medium' })} (UTC)
              </div>
            </div>
          )}
        </div>
      </main>
    </article>
  );
}
