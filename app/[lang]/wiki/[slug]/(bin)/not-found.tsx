'use client';

import Link from 'next/link';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { useParams } from 'next/navigation';
import '@/app/globals.css';

export default function NotFound() {
  const params = useParams();
  const lang = params?.lang as string;
  
  // Validate the locale and fallback to 'en' if invalid
  const validLang: Locale = isValidLocale(lang) ? (lang as Locale) : 'en';
  
  const dict = getDictionary(validLang);

  return (
    <div className="relative bg-white text-center flex flex-col justify-center items-center min-h-[60vh] px-4">
      <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{dict.notFound.heading}</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {dict.notFound.message}
      </p>
      <Link 
        href={`/${validLang}`}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        {dict.notFound.goHome}
      </Link>
    </div>
  );
}