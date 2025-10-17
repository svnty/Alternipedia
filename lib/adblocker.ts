"use client";

import { useEffect, useState } from "react";

export function useAdBlockDetector() {
  const [isAdBlocked, setIsAdBlocked] = useState(false);

  useEffect(() => {
    const testAd = document.createElement("div");
    testAd.className = "adsbox";
    testAd.style.display = "none";
    document.body.appendChild(testAd);

    setTimeout(() => {
      const blocked =
        testAd.offsetHeight === 0 && !document.querySelector(".adsbygoogle");
      setIsAdBlocked(blocked);
      document.body.removeChild(testAd);
    }, 200);
  }, []);

  return isAdBlocked;
}