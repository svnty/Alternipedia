"use client";

import { useState, useEffect } from "react";
import Contents from "@/app/[lang]/wiki/[slug]/contents";
import { getWikipediaHeadings } from "./wikipedia-data-provider";

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
  
  useEffect(() => {
    // Only show headings for Wikipedia bias
    if (bias !== 'wikipedia') {
      setHeadings([]);
      return;
    }

    // Get headings from the global data provider (no API call!)
    const wikipediaHeadings = getWikipediaHeadings();
    setHeadings(wikipediaHeadings);
  }, [bias]);
  
  return <Contents headings={headings} />;
}