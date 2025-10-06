"use client";

import { useState, useEffect } from "react";
import Contents from "@/app/[lang]/wiki/[slug]/contents";

function getWikipediaHeadings(): Heading[] {
  if (typeof window !== 'undefined') {
    return (window as any).__wikipediaHeadings || [];
  }
  return [];
}

interface WikipediaContentsProps {
  slug: string;
  language: string;
  bias: string;
}

interface Heading {
  id: string;
  depth: number;
  title: string;
}

export default function WikipediaContents({ slug, language, bias }: WikipediaContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  
  useEffect(() => {
    // Only show headings for Wikipedia bias
    if (bias !== 'wikipedia') {
      setHeadings([]);
      return;
    }

    // Get headings from the global data provider (no API call!)
    const wikipediaHeadings = getWikipediaHeadings();
    setHeadings(wikipediaHeadings);

    // Also listen for updates in case the provider mounts after the contents
    const handler = (e: any) => {
      const data = e?.detail || getWikipediaHeadings();
      setHeadings(data);
    };
    window.addEventListener('wikipediaHeadingsUpdated', handler as EventListener);
    return () => {
      window.removeEventListener('wikipediaHeadingsUpdated', handler as EventListener);
    };
  }, [bias]);
  
  return <Contents headings={headings} />;
}