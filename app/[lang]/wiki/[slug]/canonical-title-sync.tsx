"use client";

import { useEffect } from "react";

interface Props {
  canonicalTitle: string;
}

export default function CanonicalTitleSync({ canonicalTitle }: Props) {
  useEffect(() => {
    try {
      // Update any title elements that show the article title
      // There are several header divs in page.tsx; target by a data attribute or classname
      const elems = document.querySelectorAll('[data-article-title]');
      elems.forEach(el => {
        el.textContent = canonicalTitle;
      });
    } catch (e) {
      // ignore
    }
  }, [canonicalTitle]);

  return null;
}
