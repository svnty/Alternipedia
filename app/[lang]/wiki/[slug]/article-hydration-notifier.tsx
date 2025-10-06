"use client";

import { useEffect } from 'react';

export default function ArticleHydrationNotifier() {
  useEffect(() => {
    try {
      const evt = new CustomEvent('wikipediaArticleHydrated');
      window.dispatchEvent(evt);
    } catch (e) {
      // ignore old browsers
    }
  }, []);

  return null;
}
