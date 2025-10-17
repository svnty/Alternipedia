"use client";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

import { useEffect, useRef } from "react";
import { useAdBlockDetector } from "@/lib/adblocker";

interface AdBannerProps {
  isProUser?: boolean;
}

export default function AdBanner({ isProUser = false }: AdBannerProps) {
  const isAdBlocked = useAdBlockDetector();
  const adRef = useRef<HTMLDivElement | null>(null);
  const hasPushed = useRef(false);

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

  if (isProUser) return (<div>USER IS PRO</div>);

  if (isAdBlocked)
    return (
      <div className="bg-yellow-100 border border-yellow-300 p-3 rounded-lg text-sm text-gray-700 text-center">
        🙈 It looks like you're using an ad blocker. Please disable it to support
        our site — or <a href="/upgrade" className="underline">upgrade to PRO</a> for an ad-free experience.
      </div>
    );

  return (
    <ins className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7936619142942349"
      data-ad-slot="3304896788"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  );
}