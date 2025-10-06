"use client";

import { useEffect } from "react";

interface Props {
  canonicalTitle: string;
}

export default function CanonicalTitleSync({ canonicalTitle }: Props) {
  useEffect(() => {
    try {
      // Hide titles until we update them to avoid visible flicker. We add a
      // lightweight inline class and then remove it after the update so the
      // new title fades in.
      const elems = Array.from(document.querySelectorAll<HTMLElement>('[data-article-title]'));
      elems.forEach(el => {
        // apply hidden state
        el.dataset['waiting'] = '1';
        el.style.opacity = '0';
        el.style.transition = 'opacity 220ms ease-out';
      });

      // Batch update text content in a microtask so layout thrashing is minimized
      Promise.resolve().then(() => {
        elems.forEach(el => {
          el.textContent = canonicalTitle;
        });

        // Reveal after a short tick so the transition applies
        setTimeout(() => {
          elems.forEach(el => {
            try {
              delete el.dataset['waiting'];
              el.style.opacity = '';
              // remove transition after reveal
              setTimeout(() => {
                el.style.transition = '';
              }, 300);
            } catch (e) {}
          });
        }, 20);
      });
    } catch (e) {
      // ignore
    }
  }, [canonicalTitle]);

  return null;
}
