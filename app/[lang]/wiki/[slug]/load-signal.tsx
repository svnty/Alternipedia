"use client";
import { useEffect } from "react";

export default function ClientLoadedSignal() {
  useEffect(() => {
    (window as any).__page_loaded__ = true;
    window.dispatchEvent(new CustomEvent("load-signal"));
  }, []);
  return null;
}