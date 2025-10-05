import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import SlidingNotFoundText from '@/app/sliding-not-found-text';

import '@/app/globals.css';

export default async function NotFound() {
  // This not-found page handles root-level 404s (no language param)
  // For language-specific 404s, see app/[lang]/not-found.tsx
  const lang: Locale = 'en';

  const dict = getDictionary(lang);

  return (
    <div className="relative bg-white text-center mt-16 flex flex-col justify-center items-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <SlidingNotFoundText />
    </div>
  );
}