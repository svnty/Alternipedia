"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  canonicalSlug: string;
  language: string;
}

export default function CanonicalUrlSync({ canonicalSlug, language }: Props) {
  const router = useRouter();

  useEffect(() => {
    const pathnameOnly = `/${language}/wiki/${encodeURIComponent(canonicalSlug)}/wikipedia`;
    // Preserve the current search/query and hash (so ?bias=... isn't dropped)
    if (typeof window === 'undefined') return;

    const search = window.location.search || '';
    const hash = window.location.hash || '';
    const newUrl = `${pathnameOnly}${search}${hash}`;

    // Prefer history.replaceState to only modify the URL without triggering
    // a Next.js client navigation (router.replace causes data fetching).
    try {
      const url = new URL(window.location.href);
      // If the decoded current pathname already equals the decoded desired pathname,
      // don't call replaceState (prevents unnecessary history updates and re-renders).
      try {
        const currentDecoded = decodeURIComponent(url.pathname || '');
        const desiredDecoded = decodeURIComponent(pathnameOnly || '');
        if (currentDecoded === desiredDecoded && url.search === search && url.hash === hash) {
          return
        }
      } catch (e) {
        // If decoding fails, fall through and replace
      }

      url.pathname = pathnameOnly;
      url.search = search;
      url.hash = hash;
      window.history.replaceState({}, document.title, url.toString());
    } catch (e) {
      // fallback to router.replace if history API isn't available
      try {
        router.replace(newUrl);
      } catch (err) {
        // last resort: set location (this would cause navigation)
        if (typeof window !== 'undefined') {
          window.location.replace(newUrl);
        }
      }
    }
  }, [canonicalSlug, language, router]);

  return null;
}
