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
  'Língua (Português)',       // Portuguese
  'Язык',          // Russian
  'زبان',          // Persian
  'Language',      // English
  'Bahasa',        // Indonesian/Malay
  'Sprache',       // German
  '言語',          // Japanese
  'भाषा',          // Marathi
  'భాష',          // Telugu
  'Dil',           // Turkish
  'மொழி',         // Tamil (Sri Lankan)
  'Ngôn ngữ',     // Vietnamese
  'Lingua (Italia)',        // Italian
  'Language',      // English
  'Taal',          // Dutch
  '언어',           // Korean
  'Γλώσσα',        // Greek
  'Språk',         // Swedish/Norwegian
  'Wika',          // Filipino/Tagalog
  'Zabava',        // Croatian/Serbian
  'Język',         // Polish
  'ภาษา',         // Thai
  'Мова',         // Ukrainian
  'Language',      // English
  'Jezik',         // Slovenian/Slovak
  'Lietuvių kalba', // Lithuanian
  'Latviešu valoda', // Latvian
  'Eesti keel', // Estonian
  'Íslenska', // Icelandic
  'Shqip', // Albanian
  'Bosanski jezik', // Bosnian
  'Malti', // Maltese
  'اردو', // Urdu
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
      className={`inline-block transition-transform duration-300 ease-in-out ${
        isAnimating ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      {languages[currentIndex]}
    </span>
  );
}
