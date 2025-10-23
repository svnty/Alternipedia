'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(components)/ui/tabs";
import {
  BoxIcon,
  HouseIcon,
  PanelsTopLeftIcon,
} from "lucide-react";
import ArticleText from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/article-text";
import DiscussionText from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/discussion-text";
import ReadText from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/read-text";
import EditText from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/edit-text";
import HistoryText from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/history-text";
import WikipediaWrapper from "@/app/[lang]/wiki/[slug]/[bias]/wikipedia-wrapper";
import ClientLoadedSignal from '@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/load-signal';
import Bias from "@/app/[lang]/wiki/[slug]/[bias]/bias";
import ContentEditorComponent from "@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/editor";
import Read from '@/app/[lang]/wiki/[slug]/[bias]/read';
import { WikipediaDataProvider } from '@/app/[lang]/wiki/[slug]/[bias]/wikipedia-data-provider';
import { useEffect, useState } from 'react';
import HistoryPage from '@/app/[lang]/wiki/[slug]/[bias]/(client-renders)/history';

interface WikiTabsProps {
  bias: string;
  slug: string;
  lang: string;
  revision?: any;
  wikipediaData?: any;
  wikipediaHtml?: string;
}

export default function WikiTabs({ bias, slug, lang, revision = null, wikipediaData = null, wikipediaHtml = '' }: WikiTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode');
  const [headings, setHeadings] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  const getDefaultTab = (mode?: string | null) => {
    switch (mode) {
      case 'edit': return 'tab-2';
      case 'history': return 'tab-3';
      default: return 'tab-1'; // read
    }
  };

  useEffect(() => {
    if (!revision) return;
    if (!revision.revisionBlocks) {
      setHeadings([]);
      return;
    }
    let newHeadings: any[] = [];
    revision.revisionBlocks.forEach((rb: any) => {
      if (rb.block.type === 'heading') {
        let heading = { title: rb.block.content.content[0].text, depth: rb.block.content.attrs.level };
        newHeadings.push(heading);
      }
    });
    setHeadings(newHeadings);
  }, [revision]);

  useEffect(() => {
    // Ensure we only render the interactive Tabs after client mount to avoid
    // hydration mismatches caused by Radix's internally generated ids.
    setMounted(true);
  }, []);

  const handleInnerTabChange = (value: string) => {
    if (!searchParams) return;
    const params = new URLSearchParams(searchParams.toString());
    let mode: string;
    switch (value) {
      case 'tab-2': mode = 'edit'; break;
      case 'tab-3': mode = 'history'; break;
      default: mode = 'read';
    }
    params.set('mode', mode);
    // Update URL without triggering navigation
    window.history.replaceState(null, '', `?${params.toString()}`);
  };

  const isWikipedia = bias === 'wikipedia';

  return (
    <div className={`relative w-full mb-6 ${isWikipedia ? '' : 'wikipedia-article'}`}>
      {isWikipedia && (
        <>
          {/* Server-side overlay: shown immediately on page load for wikipedia bias
          Removed by client JS when the article is ready. This guarantees a
          spinner is visible on refresh/navigation before client hydration. */}
        </>
      )}
      {mounted ? (
        <Tabs defaultValue="tab-1" suppressHydrationWarning={true} id="wiki-tabs">
          <div className="relative flex items-end justify-between border-b border-border">
            {/* Title on the left */}
            <div
              data-article-title
              className={`text-neutral-800 text-3xl font-normal pb-2 ${isWikipedia ? 'truncate' : ''}`}
              style={isWikipedia ? { opacity: 0 } : {}}
            >
              {decodeURIComponent(slug.replaceAll('_', ' '))}
            </div>

            {/* Article and Talk tabs floated to the right */}
            <TabsList className="relative h-auto w-auto gap-0.5 bg-transparent p-0">
              <TabsTrigger
                value="tab-1"
                className="overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px data-[state=inactive]:cursor-pointer"
              >
                <ArticleText />
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                disabled={isWikipedia}
                className={`overflow-hidden rounded-b-none data-[state=active]:border-x data-[state=active]:border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none data-[state=active]:border-b data-[state=active]:border-b-background data-[state=active]:-mb-px ${isWikipedia ? 'cursor-not-allowed pointer-events-auto!' : 'data-[state=inactive]:cursor-pointer'}`}
              >
                <DiscussionText />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="tab-1">
            {/* Edit tabs */}
            <Tabs
              defaultValue={getDefaultTab(mode)}
              onValueChange={handleInnerTabChange}
              suppressHydrationWarning={true}
              id="inner-tabs"
            >
              <TabsList className="text-foreground mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1 w-full justify-start">
                <TabsTrigger
                  value="tab-1"
                  className="hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none data-[state=inactive]:cursor-pointer transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out"
                >
                  <HouseIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <ReadText />
                </TabsTrigger>
                <TabsTrigger
                  disabled={isWikipedia}
                  value="tab-2"
                  className={`hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none ${isWikipedia ? 'cursor-not-allowed pointer-events-auto!' : 'data-[state=inactive]:cursor-pointer'} transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out`}
                >
                  <PanelsTopLeftIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <EditText />
                </TabsTrigger>
                <TabsTrigger
                  disabled={isWikipedia}
                  value="tab-3"
                  className={`hover:bg-accent hover:text-foreground data-[state=active]:after:bg-primary relative after:absolute after:left-0 after:right-0 after:bottom-0 after:-mb-1 after:h-0.5 data-[state=active]:shadow-none ${isWikipedia ? 'cursor-not-allowed pointer-events-auto!' : 'data-[state=inactive]:cursor-pointer'} transition-all duration-150 ease-out [&[data-state=active]]:bg-transparent [&[data-state=active]]:transition-all [&[data-state=active]]:duration-1000 [&[data-state=active]]:ease-out`}
                >
                  <BoxIcon
                    className="-ms-0.5 me-1.5 opacity-60"
                    size={16}
                    aria-hidden="true"
                  />
                  <HistoryText />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tab-1">
                {/* Start Article */}
                {isWikipedia ? (
                  <WikipediaWrapper wikipediaHtml={wikipediaHtml} slug={slug} language={lang} bias={bias || 'en'} wikipediaData={wikipediaData} />
                ) : (
                  <Bias language={lang} slug={slug} bias={bias} />
                )}
                {!isWikipedia && (
                  <WikipediaDataProvider headings={headings}>
                    <Read slug={slug} lang={lang} bias={bias} revision={revision} />
                  </WikipediaDataProvider>
                )}
              </TabsContent>
              <TabsContent value="tab-2">
                {isWikipedia ? (
                  <>{/* Null */}</>
                ) : (
                  <>
                    <ClientLoadedSignal />
                    <ContentEditorComponent key={revision?.id} revision={revision} slug={slug} lang={lang} bias={bias} />
                  </>
                )}
              </TabsContent>
              <TabsContent value="tab-3">
                {isWikipedia ? (
                  <>{/* Null */}</>
                ) : (
                  <div className="text-muted-foreground pt-1 text-center text-xs">
                    <ClientLoadedSignal />
                    <HistoryPage />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="tab-2">
            <p className="text-muted-foreground p-4 text-center text-xs">
              <ClientLoadedSignal />
              Talk
            </p>
          </TabsContent>
        </Tabs>
      ) : (
        // Non-interactive server fallback: keeps markup simple and stable so
        // hydration won't see attribute differences for Radix-generated ids.
        <div id="wiki-tabs" aria-hidden={true} className="pb-4">
          <div className="relative flex items-end justify-between border-b border-border">
            <div
              data-article-title
              className={`text-neutral-800 text-3xl font-normal pb-2 ${isWikipedia ? 'truncate' : ''}`}
              style={isWikipedia ? { opacity: 0 } : {}}
            >
              {decodeURIComponent(slug.replaceAll('_', ' '))}
            </div>
            <div className="flex gap-2 opacity-50">
              <span className="px-3 py-2 text-sm">Article</span>
              <span className="px-3 py-2 text-sm">Talk</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}