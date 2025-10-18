// hooks/useAdBlockDetector.ts
"use client";
import { useEffect, useState } from "react";

export function useAdBlockDetector() {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;

    // 1️⃣ DOM-based check
    const fakeAd = document.createElement("div");
    fakeAd.className = "adsbygoogle";
    fakeAd.style.display = "none";
    document.body.appendChild(fakeAd);

    const domCheck = fakeAd.offsetParent === null;

    // 2️⃣ Network-based check
    const testScript = document.createElement("script");
    testScript.src =
      "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
    testScript.async = true;
    testScript.type = "text/javascript";

    testScript.onerror = () => {
      if (!cancelled) setIsAdBlocked(true);
    };
    testScript.onload = () => {
      if (!cancelled) setIsAdBlocked(domCheck);
    };

    document.head.appendChild(testScript);

    return () => {
      cancelled = true;
      document.body.removeChild(fakeAd);
      testScript.remove();
    };
  }, []);

  return isAdBlocked;
}