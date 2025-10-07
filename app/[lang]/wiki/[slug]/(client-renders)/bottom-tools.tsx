"use client";

import { Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function BottomTools() {
  const [showText, setShowText] = useState<boolean>(true);
  useEffect(() => {
    const nav = document.getElementById("bias-toggle");

    const isElementNearViewport = (el: any, offset = 40) => {
      if (!el) return true; // treat missing element as visible to avoid hiding the button
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // visible region extended by ±offset
      const aboveViewport = rect.bottom < -offset;
      const belowViewport = rect.top > vh + offset;

      return !(aboveViewport || belowViewport);
    };

    const handleScroll = () => {
      setShowText(isElementNearViewport(nav, 20));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once to set initial state
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Button className="fixed bottom-8 right-8 aspect-square bg-gray-800 text-white shadow-sm hover:shadow-lg cursor-pointer block md:hidden z-20 hover:scale-105 justify-content-center flex flex-row items-center">
      <Sword className="-ms-1 opacity-60 inline flex-1" aria-hidden="true" />
      {/* keep the span mounted so we can animate it */}
      <span
        className={
          "flex-2 " + 
          (showText ? "inline-block" : "pointer-events-none hidden")
        }
        aria-hidden={!showText}
      >
        Tools
      </span>
    </Button>
  );
}