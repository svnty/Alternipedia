"use client";

import { Button } from "@/components/ui/button";
import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [open, setOpen] = useState<boolean>(true);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if the device is mobile based on window width
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1024); // Example breakpoint for mobile
    };

    checkIsMobile(); // Initial check
    window.addEventListener("resize", checkIsMobile); // Update on resize

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const params = useParams();
  const lang = params?.lang as string;
  const dict = getDictionary(lang as Locale);

  const handleCookieAccept = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpen(false);
    }, 300); // Match the transition duration
  };

  if (!open) return null;

  return (
    <div 
      id="cookie-banner"
      className=
      {
        `fixed left-0 right-0 z-50 border px-4 py-3 shadow-lg bg-gray-100 transition-all duration-300 ${isClosing ? "opacity-0 translate-y-full" : "opacity-100 translate-y-0"}`
        + `${isMobile ? null : " bottom-0"}`
      }
      style={{
        bottom: isMobile ? "calc(env(safe-area-inset-bottom, 0px) + 0px)" : '',
      }}>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center mx-10">
        <p className="text-sm">
          {dict.cookieMessage}
        </p>
        <div className="flex gap-2 max-md:flex-wrap">
          <Button onClick={handleCookieAccept} className="bg-gray-800 hover:bg-gray-600 text-white px-4 text-sm rounded transition cursor-pointer">
            {dict.close}
          </Button>
        </div>
      </div>
    </div>
  );
}