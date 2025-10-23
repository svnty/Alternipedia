export const dynamic = "force-dynamic";

import BottomTools from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/bottom-tools";
import BottomArrow from "@/app/[lang]/(client-renders)/bottom-arrow";
import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Locale } from "@/lib/i18n/config";
import WikiTabs from "@/app/[lang]/wiki/[slug]/[bias]/wiki-tabs";
import { prisma } from "@/lib/prisma";
import { BlockType, Language } from "@prisma/client";
import { fetchWikipediaPageWithWtf } from "@/lib/wikipedia-api";
import { withRetry } from "@/lib/retry";
import { load } from "cheerio";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; lang: string; bias?: string }>;
  searchParams: Promise<{ revision?: string }>;
}): Promise<Metadata> {
  const p = await params;
  const { slug, lang } = p;
  const bias = p.bias;
  const dict = getDictionary(lang as Locale);
  let description;

  if (bias === 'wikipedia') {
    description = `${dict.metadata.wikipedia.part1} ${decodeURIComponent(slug.replaceAll('_', ' '))} ${dict.metadata.wikipedia.part2}`;
  } else if (bias === 'socialist') {
    description = `${dict.metadata.socialist.part1} ${decodeURIComponent(slug.replaceAll('_', ' '))} ${dict.metadata.socialist.part2}`;
  } else if (bias === 'liberal') {
    description = `${dict.metadata.liberal.part1} ${decodeURIComponent(slug.replaceAll('_', ' '))} ${dict.metadata.liberal.part2}`;
  } else if (bias === 'conservative') {
    description = `${dict.metadata.conservative.part1} ${decodeURIComponent(slug.replaceAll('_', ' '))} ${dict.metadata.conservative.part2}`;
  } else if (bias === 'nationalist') {
    description = `${dict.metadata.nationalist.part1} ${decodeURIComponent(slug.replaceAll('_', ' '))} ${dict.metadata.nationalist.part2}`;
  }

  return {
    title: "Alternipedia | " + description,
    description: dict.metadata.description,
  };
}

export default async function Page({
  params,
  searchParams
}: {
  params: Promise<{ slug: string; lang: string; bias: string }>;
  searchParams: Promise<{ revision?: string }>
}) {
  const p = await params;
  const s = await searchParams;
  const { slug, lang, bias } = p;
  const revision = s.revision;

  let mappedRevision: any = {};
  let wikipediaData: any = {};
  let wikipediaJson: any = {};
  let wikipediaHtml = '';

  if (bias === 'wikipedia') {
    const imageToJSON = (rawData: any) => {
      try {
        const img = typeof rawData.pageImage === 'function' ? rawData.pageImage() : rawData.pageImage;
        if (!img) return null;
        const object = {
          url: typeof img.commonsURL === 'function' ? img.commonsURL() : (typeof img.url === 'function' ? img.url() : null),
          backupUrl: typeof img.url === 'function' ? img.url() : null,
          caption: typeof img.caption === 'function' ? img.caption() : null,
          alt: typeof img.alt === 'function' ? img.alt() : null,
          thumbnail: typeof img.thumb === 'function' ? img.thumb() : null,
        };
        return object;
      } catch (e) {
        return null;
      }
    };

    try {
      const rawData = await fetchWikipediaPageWithWtf(slug, lang);
      if (rawData) {
        wikipediaData = {
          infobox: {
            infobox: rawData.infobox(),
            json: typeof rawData.infobox() === "function" ? rawData.infobox().json() : {},
            wikitext: typeof rawData.infobox() === "function" ? rawData.infobox().wikitext() : "",
            html: typeof rawData.infobox() === "function" ? rawData.infobox().html() : "",
          },
          wikitext: rawData.wikitext(),
          html: rawData.html(),
          url: rawData.url(),
          timestamp: rawData.timestamp(),
          categories: rawData.categories(),
          pageImage: imageToJSON(rawData),
          title: rawData.title(),
          references: rawData.references().map((ref: any) => ({
            title: ref.title(),
            links: ref.links(),
            text: ref.text(),
            json: ref.json(),
          })),
          sections: rawData.sections().map((section: any) => ({
            html: section.html(),
            title: section.title(),
            depth: section.depth(),
            index: section.index(),
            wikitext: section.wikitext(),
            table: section.tables().map((table: any) => ({
              html: table.html(),
              wikitext: table.wikitext(),
              json: table.json(),
            })),
            infoboxes: section.infoboxes().map((infobox: any) => ({
              json: infobox.json(),
              wikitext: infobox.wikitext(),
              html: infobox.html(),
            })),
            lists: section.lists().map((list: any) => ({
              text: list.text(),
              lines: list.lines().map((line: any) => ({
                text: line.text(),
                links: line.links().map((link: any) => ({
                  text: link.text(),
                  page: link.page(),
                })),
              })),
            })),
            images: section.images().map((image: any) => ({
              url: image.commonsURL(),
              backupUrl: image.url(),
              caption: image.caption(),
              thumbnail: image.thumb(),
            })),
            paragraphs: section.paragraphs().map((paragraph: any) => ({
              html: paragraph.html(),
              images: paragraph.images().map((img: any) => ({
                url: img.commonsURL(),
                backupUrl: img.url(),
                caption: img.caption(),
                thumbnail: img.thumb(),
              })),
              lists: paragraph.lists().map((list: any) => ({
                text: list.text(),
                lines: list.lines().map((line: any) => ({
                  text: line.text(),
                  links: line.links().map((link: any) => ({
                    text: link.text(),
                    page: link.page(),
                  })),
                })),
              })),
              sentences: paragraph.sentences().map((sentence: any) => ({
                html: sentence.html(),
                text: sentence.text(),
                wikitext: sentence.wikitext(),
                links: sentence.links().map((link: any) => ({
                  text: link.text(),
                  page: link.page(),
                })),
                italics: sentence.italics(),
                bold: sentence.bold(),
              })),
            })),
          })),
        };

        wikipediaData = JSON.parse(JSON.stringify(wikipediaData));

        const params = new URLSearchParams({
          action: "parse",
          page: wikipediaData.title,
          prop: 'text',
          formatversion: '2',
          format: "json",
        });

        const url = `https://en.wikipedia.org/w/api.php?${params}`;

        const response = await fetch(url);

        wikipediaJson = await response.json();
        if (wikipediaJson) {
          const $ = load(wikipediaJson.parse.text);
          $('.infobox').addClass('flex justify-center md:float-right m-6');
          $('.mw-editsection').remove();
          $('.sistersitebox').remove();
          $('.mw-image-border').remove();
          $('h2').addClass('text-2xl font-bold mt-8 mb-4');
          $('h3').addClass('text-xl font-semibold mt-6 mb-3');
          $('h4').addClass('text-lg font-semibold mt-4 mb-2');
          $('figure img').addClass('rounded-md shadow-sm');
          $('table.infobox').addClass('border border-gray-300 dark:border-gray-600 p-2 rounded-lg m-2 p-2 !border-separate');
          $('.hatnote').addClass('mb-1 text-center');
          $('.skin-invert-image').remove();
          $('.box-More_citations_needed').remove();
          $('ul').addClass('list-disc ml-6');
          $('.tright').addClass('float-right m-2 border border-gray-300 dark:border-gray-600 p-1 bg-gray-100 dark:bg-gray-800 rounded-md border-separate justify-space-between text-center margin-auto');
          $('.thumb .thumbcaption').addClass('!text-center !justify-center !m-auto');
          $('figure').addClass('flex flex-col max-w-[20vw] float-right clear-both m-4');
          $('figure img').addClass('m-auto');
          $('figure figcaption').addClass('text-center text-sm mb-2');
          $('.thumbinner .multiimageinner').addClass('flex flex-col items-end gap-4 max-w-[360px]');
          $("a").each((i, el) => {
            const href = $(el).attr("href");
            const text = $(el).text();

            if (href) {
              // Example: modify internal Wikipedia links
              if (href.startsWith("/wiki/")) {
                let newLink = `/${lang}${href}/wikipedia`;
                $(el).attr("href", newLink);
              }
            }
          });
          wikipediaHtml = $.html();
        }
      }
    } catch (error) {
      console.error('Error fetching Wikipedia page:', error);
      wikipediaData = null;
    }
  }

  if (bias !== 'wikipedia') {
    // If a specific revision id is requested via ?revision=ID, try to load that first
    let chosenRevision: any = null;
    const requestedRevisionId = revision ? parseInt(String(revision), 10) : NaN;

    if (!Number.isNaN(requestedRevisionId)) {
      try {
        const found = await withRetry(() => prisma.revision.findUnique({
          where: { id: requestedRevisionId },
          include: {
            article: {
              include: {
                categories: {
                  where: { bias: { name: bias } },
                  include: { category: true },
                },
              },
            },
            bias: true,
            revisionBlocks: {
              include: { block: true },
              orderBy: { order: 'asc' },
            },
          },
        }));

        // Validate that this revision belongs to the same article and bias
        if (found && found.article && found.bias &&
          found.article.slug === slug && String(found.article.language) === lang.toUpperCase() && found.bias.name === bias) {
          chosenRevision = found;
        }
      } catch (e) {
        console.warn('Error fetching requested revision, falling back to latest:', e);
      }
    }

    // If we didn't pick a requested revision, load latest
    if (!chosenRevision) {
      chosenRevision = await withRetry(() => prisma.revision.findFirst({
        where: {
          article: {
            slug: slug,
            language: lang.toUpperCase() as Language,
          },
          bias: {
            name: bias,
          },
        },
        orderBy: { createdAt: 'desc' },
        include: {
          article: {
            include: {
              categories: {
                where: { bias: { name: bias } },
                include: { category: true },
              },
            },
          },
          revisionBlocks: {
            include: { block: true },
            orderBy: { order: 'asc' },
          },
        },
      }));
    }

    const blockTypeMappingReverse: Record<BlockType, string> = {
      PARAGRAPH: 'paragraph',
      HEADING: 'heading',
      QUOTE: 'blockquote',
      BULLET_LIST_ITEM: 'bulletList',
      NUMBERED_LIST_ITEM: 'orderedList',
      CODE_BLOCK: 'codeBlock',
      TABLE: 'table',
      IMAGE: 'image',
      VIDEO: 'video',
      AUDIO: 'audio',
    };

    mappedRevision = chosenRevision ? {
      ...chosenRevision,
      revisionBlocks: (chosenRevision.revisionBlocks || []).map((rb: any) => ({
        ...rb,
        block: {
          ...rb.block,
          type: blockTypeMappingReverse[rb.block.type as BlockType] ?? 'paragraph',
        },
      })),
    } : null;

    if (!mappedRevision) {
      mappedRevision = {
        id: null,
        articleId: null,
        biasId: null,
        createdAt: null,
      };
    }
  }

  return (
    <div>
      <span>
        {bias === 'socialist' && (
          <WikiTabs revision={mappedRevision} slug={slug} lang={lang} bias={bias} />
        )}

        {bias === 'liberal' && (
          <WikiTabs revision={mappedRevision} slug={slug} lang={lang} bias={bias} />
        )}

        {bias === 'wikipedia' && (
          <WikiTabs slug={slug} lang={lang} bias={bias} wikipediaData={wikipediaData} wikipediaHtml={wikipediaHtml} />
        )}

        {bias === 'conservative' && (
          <WikiTabs revision={mappedRevision} slug={slug} lang={lang} bias={bias} />
        )}

        {bias === 'nationalist' && (
          <WikiTabs revision={mappedRevision} slug={slug} lang={lang} bias={bias} />
        )}
      </span>

      <BottomTools />
      <BottomArrow />
    </div >
  );
}