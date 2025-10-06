"use client"

import React from "react"

interface Item {
  name: string
  children?: string[]
}

const items: Record<string, Item> = {
  company: {
    name: "Company",
    children: ["engineering", "marketing", "operations"],
  },
  engineering: {
    name: "Engineering",
    children: ["frontend", "backend", "platform-team"],
  },
  frontend: { name: "Frontend", children: ["design-system", "web-platform"] },
  "design-system": {
    name: "Design System",
    children: ["components", "tokens", "guidelines"],
  },
  components: { name: "Components" },
  tokens: { name: "Tokens" },
  guidelines: { name: "Guidelines" },
  "web-platform": { name: "Web Platform" },
  backend: { name: "Backend", children: ["apis", "infrastructure"] },
  apis: { name: "APIs" },
  infrastructure: { name: "Infrastructure" },
  "platform-team": { name: "Platform Team" },
  marketing: { name: "Marketing", children: ["content", "seo"] },
  content: { name: "Content" },
  seo: { name: "SEO" },
  operations: { name: "Operations", children: ["hr", "finance"] },
  hr: { name: "HR" },
  finance: { name: "Finance" },
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

function StaticTreeItem({ itemId, level = 0 }: { itemId: string; level?: number }) {
  const item = items[itemId]
  if (!item) return null

  const hasChildren = item.children && item.children.length > 0
  const paddingLeft = level * indent

  return (
    <div>
      <div 
        className="flex items-center px-2 py-1.5 text-sm"
        style={{ paddingLeft: `${paddingLeft + 8}px` }}
      >
        <span className="hover:underline"><a href={`#${item.name}`}>{item.name}</a></span>
      </div>
      {hasChildren && (
        <div>
          {item.children!.map((childId) => (
            <StaticTreeItem key={childId} itemId={childId} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
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
