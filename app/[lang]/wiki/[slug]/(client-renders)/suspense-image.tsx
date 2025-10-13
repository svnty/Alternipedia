'use client'

import { useState } from 'react'

interface SuspenseImageProps {
  src: string
  alt: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function SuspenseImage({
  src,
  alt,
  className = '',
  loading = 'eager',
}: SuspenseImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);


  // TODO: Fix skeleton loader or a placeholder image while loading
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* <div
        className={`absolute inset-0 bg-gray-200 rounded transition-opacity duration-300 
          ${isLoaded ? 'opacity-0' : 'opacity-100'} 
          ${isLoaded ? '' : 'animate-pulse'}`}
      /> */}

      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        className={`
          w-full h-auto rounded object-contain transition-opacity duration-500 
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
      />
    </div>
  )
}