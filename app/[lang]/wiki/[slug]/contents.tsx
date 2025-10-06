"use client"

import React from "react"

interface Item {
  name: string
  children?: string[]
}

const indent = 20

interface Heading {
  level: number;
  text: string;
  id: string;
}

interface ContentsProps {
  headings?: Heading[];
}

function HeadingItem({ heading }: { heading: Heading }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(heading.id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      style={{ paddingLeft: `${(heading.level - 1) * indent}px` }}
      className="flex items-center gap-2 py-1"
    >
      <button 
        onClick={handleClick}
        className="text-left text-sm text-gray-700 hover:text-blue-600 hover:underline cursor-pointer truncate"
      >
        {heading.text}
      </button>
    </div>
  );
}

export default function Contents({ headings = [] }: ContentsProps) {
  // If no headings provided, show placeholder content
  if (headings.length === 0) {
    return (
      <div className="flex h-full flex-col gap-2">
        <div className="text-sm text-gray-500 italic">
          Table of contents will appear here when viewing Wikipedia articles
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-1">
      {headings.map((heading, index) => (
        <HeadingItem key={`${heading.id}-${index}`} heading={heading} />
      ))}
    </div>
  );
}
