'use client';
import { convertSegmentPathToStaticExportFilename } from 'next/dist/shared/lib/segment-cache/segment-value-encoding';
import { useEffect, useRef, useState } from 'react';

interface SuspenseImageProps {
  src: string; // full image URL
  thumbnail: string; // small fast version
  alt?: string;
  backupUrl?: string;
  className?: string;
  rootMargin?: string;
}

const loadedImages = new Set<string>();

export default function SuspenseImage({
  src,
  thumbnail,
  alt = '',
  backupUrl = '',
  className = '',
  rootMargin = '200px',
}: SuspenseImageProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setVisible] = useState(false);
  const [thumbLoaded, setThumbLoaded] = useState(false);
  const [fullLoaded, setFullLoaded] = useState(loadedImages.has(src));
  const [currentSrc, setCurrentSrc] = useState(src);

  // Observe wrapper visibility
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

  const tryLoad = (url: string) =>
    new Promise<string>((resolve, reject) => {
      if (!url) return reject(new Error('empty url'));
      const img = new Image();
      let settled = false;

      const cleanup = () => {
        img.onload = null;
        img.onerror = null;
      };

      img.onload = () => {
        if (settled) return;
        settled = true;
        cleanup();
        resolve(url);
      };

      img.onerror = () => {
        if (settled) return;
        settled = true;
        cleanup();
        reject(new Error('failed to load ' + url));
      };

      // Start loading after handlers attached
      img.src = url;
    });

  // When visible, start loading full image in background
  useEffect(() => {
    if (!isVisible || fullLoaded) return;
    const tryLoadFunc = async () => {
      const sources = [src, backupUrl, thumbnail];
      for (let i = 0; i < sources.length; i++) {
        try {
          await tryLoad(sources[i]);
          setCurrentSrc(sources[i]);
          loadedImages.add(sources[i]);
          setFullLoaded(true);
          return;
        } catch (e) {

        }
      }
    }

    tryLoadFunc();

  }, [isVisible, currentSrc, fullLoaded, src, backupUrl, thumbnail]);

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden bg-gray-200 ${className}`}
    >
      {/* 🟩 Gray skeleton until thumbnail loads */}
      {!thumbLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" style={{ zIndex: 2 }} />
      )}

      {/* 🟦 Thumbnail (always loads first with eager) */}
      <img
        src={thumbnail}
        alt={alt}
        onLoad={() => setThumbLoaded(true)}
        className={`w-full h-auto rounded object-contain transition-opacity duration-500 ${thumbLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        style={{ zIndex: 1 }}
        loading="eager"
        decoding="async"
      />

      {/* 🟥 Full image (fades in after scroll + load, positioned absolutely over thumbnail) */}
      {fullLoaded && (
        <img
          src={currentSrc}
          alt={alt}
          className="absolute inset-0 w-full h-full rounded object-contain transition-opacity duration-700 opacity-100"
          style={{ zIndex: 3 }}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}