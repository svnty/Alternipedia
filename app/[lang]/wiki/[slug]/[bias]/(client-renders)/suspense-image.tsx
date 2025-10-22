'use client';

import { useEffect, useRef, useState } from 'react';

interface SuspenseImageProps {
  src: string;        // full image URL
  thumbnail: string;  // small fast version
  alt?: string;
  className?: string;
  rootMargin?: string;
  loading?: 'lazy' | 'eager';
}

const loadedImages = new Set<string>();

export default function SuspenseImage({
  src,
  thumbnail,
  alt = '',
  className = '',
  loading = 'lazy',
  rootMargin = '200px',
}: SuspenseImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(loadedImages.has(src));

  // 👀 Observe wrapper visibility
  useEffect(() => {
    if (typeof window === 'undefined' || !wrapperRef.current) {
      setVisible(true);
      return;
    }

    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, [rootMargin]);

  // 🖼️ When visible, start loading full image *after* thumbnail
  useEffect(() => {
    if (!isVisible || fullLoaded) return;

    const img = new Image();
    img.src = src;
    img.onload = () => {
      loadedImages.add(src);
      setFullLoaded(true);
    };
    img.onerror = () => setFullLoaded(true);
  }, [isVisible, src, fullLoaded]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
    >
      {/* 🟩 Gray skeleton until thumbnail loads */}
      {!thumbLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}

      {/* 🟦 Thumbnail (always visible first) */}
      <img
        src={thumbnail}
        alt={alt}
        onLoad={() => () => { console.log("thumb loaded"); setThumbLoaded(true); }}
        className={`w-full h-auto rounded object-contain transition-opacity duration-500 ${
          thumbLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading='eager'
        decoding="async"
      />

      {/* 🟥 Full image (fades in after scroll + load) */}
      {fullLoaded && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-auto rounded object-contain transition-opacity duration-700 opacity-100"
          style={{ zIndex: 2 }}
          decoding="async"
        />
      )}
    </div>
  );
}