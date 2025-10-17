"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useState } from "react";

export default function ClientAnalytics() {
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(true);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (accepted === "false") {
      setCookiesAccepted(false);
    }
  }, []);
  
  if (!cookiesAccepted) {
    return (
      <div className="hidden" id="cookies-rejected">Cookies rejected.</div>
    );
  }

  return (
    <Analytics />
  );
}