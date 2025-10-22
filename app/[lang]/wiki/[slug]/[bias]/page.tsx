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
    title: "Alternipedia",
    description: description || 'Error: Description not available',
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

  if (bias === 'wikipedia') {
    try {
      const rawData = await fetchWikipediaPageWithWtf(slug, lang);
      if (rawData) {
        wikipediaData = {
          html: rawData.html(),
          url: rawData.url(),
          timestamp: rawData.timestamp(),
          categories: rawData.categories(),
          pageImage: {
            url: rawData.pageImage().url(),
            caption: rawData.pageImage().caption(),
            alt: rawData.pageImage().alt(),
            thumbnail: rawData.pageImage().url() + `?width=${300}`
          },
          title: rawData.title(),
          references: rawData.references().map((ref: any) => ({
            title: ref.title(),
            links: ref.links(),
            text: ref.text(),
            json: ref.json(),
          })),
          sections: rawData.sections().map((section: any) => ({
            title: section.title(),
            depth: section.depth(),
            index: section.index(),
            infoboxes: section.infoboxes(),
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
            wikitext: section.wikitext(),
            images: section.images().map((image: any) => ({
              url: image.url(),
              caption: image.caption(),
              thumbnail: image.url() + `?width=${300}`,
            })),
            paragraphs: section.paragraphs().map((paragraph: any) => ({
              images: paragraph.images().map((img: any) => ({
                url: img.url(),
                caption: img.caption(),
                thumbnail: img.url() + `?width=${300}`,
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
                text: sentence.text(),
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
          <WikiTabs slug={slug} lang={lang} bias={bias} wikipediaData={wikipediaData} />
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