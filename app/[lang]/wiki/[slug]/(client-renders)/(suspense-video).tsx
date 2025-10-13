'use client'

import { useState } from 'react'

interface SuspenseVideoProps {
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
}: SuspenseVideoProps) {
  const [isLoaded, setIsLoaded] = useState(true);

  // TODO: Fix skeleton loader or a placeholder image while loading
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* <div
        className={`absolute inset-0 bg-gray-200 rounded transition-opacity duration-300 
          ${isLoaded ? 'opacity-0' : 'opacity-100'} 
          ${isLoaded ? '' : 'animate-pulse'}`}
      /> */}

        <video controls className="w-full h-auto rounded" poster="">
          <source src={src} type={`video/${src.split('.').pop()?.toLowerCase()}`} />
          Your browser does not support the video tag.
        </video>
    </div>
  )
}