"use client";

import { createContext, useContext, ReactNode } from 'react';

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface WikipediaContextType {
  headings: Heading[];
  setHeadings: (headings: Heading[]) => void;
}

const WikipediaContext = createContext<WikipediaContextType | undefined>(undefined);

export function WikipediaProvider({ 
  children, 
  initialHeadings = [] 
}: { 
  children: ReactNode;
  initialHeadings?: Heading[];
}) {
  // For server-side rendering, we'll pass the headings directly
  const contextValue: WikipediaContextType = {
    headings: initialHeadings,
    setHeadings: () => {} // No-op on server side
  };

  return (
    <WikipediaContext.Provider value={contextValue}>
      {children}
    </WikipediaContext.Provider>
  );
}

export function useWikipedia() {
  const context = useContext(WikipediaContext);
  if (!context) {
    throw new Error('useWikipedia must be used within a WikipediaProvider');
  }
  return context;
}