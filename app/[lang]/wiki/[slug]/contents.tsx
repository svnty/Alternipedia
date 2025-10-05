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

interface ContentsProps {
  contents: any[];
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

export default function Contents({ contents }: ContentsProps) {
  return (
    <div className="flex h-full flex-col gap-2">
      <div className="relative">
        <StaticTreeItem itemId="company" />
      </div>
    </div>
  )
}
