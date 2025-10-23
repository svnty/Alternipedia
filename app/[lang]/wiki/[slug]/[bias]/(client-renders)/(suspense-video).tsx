'use client'

import { useState } from 'react'

interface SuspenseVideoProps {
  src: string
  alt: string
  thumbnail: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function SuspenseVideo({
  src,
  alt,
  thumbnail,
  className = '',
  loading = 'eager',
}: SuspenseVideoProps) {

  let vidType = `video/${src.split('.').pop()?.toLowerCase()}`;

  if (!src) {
    return <div className={`bg-gray-200 animate-pulse w-full h-64 rounded ${className}`} />;
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>

      <video controls className="w-full h-auto rounded" poster="">
        <source src={src} type={vidType} />
        Your browser does not support the video tag.
      </video>

    </div>
  )
}