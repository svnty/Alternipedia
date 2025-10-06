"use client";

import { useEffect, useState } from "react";

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface WikipediaDataProviderProps {
  children: React.ReactNode;
  headings: Heading[];
}

// Create a global store for Wikipedia headings
if (typeof window !== 'undefined') {
  (window as any).__wikipediaHeadings = [];
}

export function WikipediaDataProvider({ children, headings }: WikipediaDataProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).__wikipediaHeadings = headings;
    }
  }, [headings]);

  return <>{children}</>;
}

export function getWikipediaHeadings(): Heading[] {
  if (typeof window !== 'undefined') {
    return (window as any).__wikipediaHeadings || [];
  }
  return [];
}