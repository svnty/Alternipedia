"use client";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

import { useEffect, useRef } from "react";
import { useAdBlockDetector } from "@/lib/adblocker";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { Locale } from "@/lib/i18n/config";

interface AdBannerProps {
  isProUser?: boolean;
  lang?: string;
}

export default function AdBanner({ lang, isProUser = false }: AdBannerProps) {
  const isAdBlocked = useAdBlockDetector();
  const adRef = useRef<HTMLDivElement | null>(null);
  const hasPushed = useRef(false);
  const dict = getDictionary(lang as Locale || 'en');

  useEffect(() => {
    if (!isProUser && !isAdBlocked && !hasPushed.current) {
      try {
        if (window.adsbygoogle && adRef.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          hasPushed.current = true;
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    }
  }, [isProUser, isAdBlocked]);

  if (isProUser) return null;

  if (isAdBlocked)
    return (
      <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-lg text-sm text-gray-700 text-center my-2">
        🙈 {dict.blockedAd.part1} <a href={`/${lang}/upgrade`} className="underline">{dict.blockedAd.part2}</a> {dict.blockedAd.part3}
      </div>
    );

  return (
    <ins className="adsbygoogle my-2"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7936619142942349"
      data-ad-slot="3304896788"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
}