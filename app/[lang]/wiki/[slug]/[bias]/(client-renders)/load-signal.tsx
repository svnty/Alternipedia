"use client";
import { useEffect } from "react";

export default function ClientLoadedSignal() {
  useEffect(() => {
    // Mark page as loaded for any synchronous checks
    (window as any).__page_loaded__ = true;

    // Helper that both dispatches the event and calls any registered
    // global callback. This covers environments where the event listener
    // may have been missed (e.g. different hydration/timing on the server).
    const dispatchNow = () => {
      try {
        window.dispatchEvent(new CustomEvent("load-signal"));
      } catch (e) {
        // ignore
      }

      const cb = (window as any).__alternipedia_on_load;
      if (typeof cb === 'function') {
        try {
          cb();
        } catch (e) {
          // ignore
        }
      }
    };

    // Dispatch on the next tick so that parent components (like the layout)
    // have a chance to attach their event listeners during the same
    // mount/render cycle. This avoids a race where the signal fires before
    // the listener is registered.
    const id = window.setTimeout(dispatchNow, 0);

    const fallBackFiveSeconds = window.setTimeout(() => {
      const wikiArticle = document.querySelectorAll('.wikipedia-article');
      wikiArticle.forEach((article) => {
        if (article.children.length > 0) {
          console.log('Article content loaded (fallback)', article);
          dispatchNow();
        }
      });
    }, 5 * 1000);

    const fallBackTenSeconds = window.setTimeout(() => {
      const wikiArticle = document.querySelectorAll('.wikipedia-article');
      wikiArticle.forEach((article) => {
        if (article.children.length > 0) {
          console.log('Article content loaded (fallback)', article);
          dispatchNow();
        }
      });
    }, 10 * 1000);

    return () => {
      window.clearTimeout(fallBackFiveSeconds);
      window.clearTimeout(fallBackTenSeconds);
      window.clearTimeout(id);
    };
  }, []);

  return null;
}