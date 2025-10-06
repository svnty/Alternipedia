"use client"

import React from "react"

const indent = 20

interface Heading {
  id: string;
  depth: number;
  title: string;
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

  if (!heading || !heading.title) {
    return null;
  }

  return (
    <div 
      style={{ paddingLeft: `${(heading.depth) * indent}px` }}
      className="flex items-center gap-2 py-1"
    >
      <button 
        onClick={handleClick}
        className="text-left text-sm text-gray-700 hover:text-blue-600 hover:underline cursor-pointer truncate"
      >
        {heading.title}
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
          Table of contents will appear here.
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col gap-1">
      {headings.map((heading, index) => {
        heading['id'] = heading.title.replace(' ', '-');
        return (
          <HeadingItem key={`${heading['id']}-${index}`} heading={heading} />
        );
      }
      )}
    </div>
  );
}
