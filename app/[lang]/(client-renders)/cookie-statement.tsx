"use client";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { Locale, isValidLocale } from "@/lib/i18n/config";
import React from "react";

export default function CookieStatement({ lang } : { lang: string }) { 
  const dict = getDictionary(lang as Locale); 


  return (
    <div
      onClick={() => {
        localStorage.removeItem("cookie-consent");
        localStorage.removeItem("cookieExpiryDateDate");
        window.location.reload();
      }}
      className="text-blue-400 cursor-pointer text-sm font-normal leading-normal hover:underline inline-block w-fit active:underline"
    >
      {dict.footer.cookieStatement}
    </div>
  );
}