'use client';

import { useEffect, useRef, useState } from 'react';

interface LazyWikiImageProps {
  src: string;        // the thumbnail (fast one)
  fullSrc?: string;   // full image URL (optional)
  alt?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  rootMargin?: string; // optional observer rootMargin (e.g. '200px')
}

const loadedImages = new Set<string>();

export default function LazyWikiImage({
  src,
  fullSrc,
  alt = '',
  className = '',
  rootMargin = '200px',
}: LazyWikiImageProps) {
  const [isVisible, setVisible] = useState<boolean>(loadedImages.has(src));
  const [isLoaded, setLoaded] = useState<boolean>(loadedImages.has(src));
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  // IntersectionObserver: observe wrapper (always present in the DOM)
  useEffect(() => {
    if (isVisible) return; // already visible/cached -> noop

    if (typeof window === 'undefined' || !wrapperRef.current) {
      setVisible(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // no IO support -> load immediately
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e && e.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(wrapperRef.current);

    return () => {
      try {
        observer.disconnect();
      } catch (err) {
        // ignore
      }
    };
  }, [src, isVisible, rootMargin]);

  // Preload behavior: if visible but not loaded, create a preloader to detect cache as well
  useEffect(() => {
    if (!isVisible || isLoaded) return;

    const pre = new Image();
    pre.src = src;
    if (pre.complete) {
      loadedImages.add(src);
      setLoaded(true);
      return;
    }
    pre.onload = () => {
      loadedImages.add(src);
      setLoaded(true);
    };
    pre.onerror = () => setLoaded(true);

    return () => {
      // nothing to cleanup on Image
    };
  }, [isVisible, isLoaded, src]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      aria-busy={!isLoaded}
    >
      {/* skeleton only while truly loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}

      {/* render the image only when visible; but we still keep it mounted once loaded */}
      {isVisible && (
        <img
          ref={imgRef}
          src={isLoaded ? src : undefined}      // if isLoaded is true we set src (cache case), otherwise preload handled by effect
          data-src={src}
          srcSet={fullSrc ? `${src} 1x, ${fullSrc} 2x` : undefined}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => {
            loadedImages.add(src);
            setLoaded(true);
          }}
          onError={() => setLoaded(true)}
          className={`w-full h-auto rounded object-contain transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}