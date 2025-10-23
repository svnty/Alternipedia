'use client';
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

  // 🖼️ When visible, start loading full image in background
  useEffect(() => {
    if (!isVisible || fullLoaded) return;

    const img = new Image();
    img.src = currentSrc;

    img.onload = () => {
      loadedImages.add(currentSrc);
      setFullLoaded(true);
    };

    img.onerror = () => {
      // If primary src fails and we have a backup, try that
      if (currentSrc === src && backupUrl) {
        console.log(`Primary image failed (${src}), trying backup: ${backupUrl}`);
        setCurrentSrc(backupUrl);
      } else {
        // No backup or backup also failed, mark as loaded to stop trying
        setCurrentSrc(thumbnail);
        setFullLoaded(true);
      }
    };
  }, [isVisible, currentSrc, fullLoaded, src, backupUrl]);

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
      {fullLoaded && currentSrc !== thumbnail && (
        <img
          src={src}
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