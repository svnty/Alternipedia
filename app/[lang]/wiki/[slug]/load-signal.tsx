"use client";
import { useEffect } from "react";

export default function ClientLoadedSignal() {
  useEffect(() => {
    console.log("ClientLoadedSignal: dispatching load-signal event");
    // Mark page as loaded for any synchronous checks
    (window as any).__page_loaded__ = true;

    // Dispatch on the next tick so that parent components (like the layout)
    // have a chance to attach their event listeners during the same
    // mount/render cycle. This avoids a race where the signal fires before
    // the listener is registered (especially in React Strict Mode/dev).
    const id = window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("load-signal"));
    }, 1);

    return () => window.clearTimeout(id);
  }, []);
  return null;
}