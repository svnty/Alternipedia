'use client';

import { useEffect, useState } from 'react';

const languages = [
  'Language',      // English
  '语言',          // Chinese (Simplified)
  'भाषा',          // Hindi
  'Idioma',        // Spanish
  'Langue',        // French
  'لغة',           // Arabic
  'ভাষা',          // Bengali
  'Língua',       // Portuguese
  'Язык',          // Russian
  'زبان',          // Persian
  'Language',      // English
  'Bahasa',        // Indonesian/Malay
  'Sprache',       // German
  '言語',          // Japanese
  'Langwidge / Tok', // Esperanto'
  'भाषा',          // Marathi
  'భాష',          // Telugu
  'Dil',           // Kurdish
  'மொழி',         // Tamil
  'Ngôn ngữ',     // Vietnamese
  'Lingua',        // Italian/Portuguese
  'Language',      // English
  'Taal',          // Dutch
  '언어',           // Korean
  'Γλώσσα',        // Greek
  'Språk',         // Swedish/Norwegian
  'Wika',          // Filipino/Tagalog
  'Lugha',         // Swahili
  'Zabava',        // Croatian/Serbian
  'Język',         // Polish
];

export function SlidingLanguage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % languages.length);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block transition-transform duration-300 ease-in-out hover:underline cursor-pointer ${
        isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {languages[currentIndex]}
    </span>
  );
}
