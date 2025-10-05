'use client';

import { useEffect, useState } from 'react';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { locales, type Locale } from '@/lib/i18n/config';

// Get all not found messages for all supported languages
const getNotFoundMessages = () => {
  return locales.map(locale => {
    const dict = getDictionary(locale as Locale);
    return {
      locale,
      heading: dict.notFound.heading,
      message: dict.notFound.message,
    };
  });
};

const notFoundMessages = getNotFoundMessages();

export default function SlidingNotFoundText() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % notFoundMessages.length);
        setIsAnimating(false);
      }, 300); // Half of the animation duration
    }, 4000); // Change every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  const currentMessage = notFoundMessages[currentIndex];

  return (
    <div
      className={`transition-transform duration-300 ease-in-out ${
        isAnimating ? '-translate-y-5 opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        {currentMessage.heading}
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        {currentMessage.message}
      </p>
      <div className="text-xs text-gray-400 mt-2">
        {currentMessage.locale}
      </div>
    </div>
  );
}
