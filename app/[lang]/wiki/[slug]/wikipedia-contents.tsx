"use client";

import { useState, useEffect } from "react";
import { fetchWikipediaPage, extractWikipediaHeadings } from "@/lib/wikipedia-api";
import Contents from "@/app/[lang]/wiki/[slug]/contents";

interface WikipediaContentsProps {
  slug: string;
  language: string;
  bias: string;
}

interface Heading {
  level: number;
  text: string;
  id: string;
}

export default function WikipediaContents({ slug, language, bias }: WikipediaContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch contents for Wikipedia bias
    if (bias !== 'wikipedia' || !slug) {
      setHeadings([]);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);

    const fetchHeadings = async () => {
      try {
        const wikipediaData = await fetchWikipediaPage(slug, language);
        
        if (isCancelled) return;

        if (wikipediaData?.content) {
          const extractedHeadings = extractWikipediaHeadings(wikipediaData.content);
          setHeadings(extractedHeadings);
        } else {
          setHeadings([]);
        }
      } catch (error) {
        console.error('Error fetching Wikipedia contents:', error);
        if (!isCancelled) {
          setHeadings([]);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchHeadings();

    return () => {
      isCancelled = true;
    };
  }, [slug, language, bias]);

  if (isLoading) {
    return (
      <div className="flex h-full flex-col gap-2">
        <div className="text-sm text-gray-500 italic">
          Loading table of contents...
        </div>
      </div>
    );
  }

  return <Contents headings={headings} />;
}