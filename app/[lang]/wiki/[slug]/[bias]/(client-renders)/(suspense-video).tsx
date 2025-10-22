'use client'

import { useState } from 'react'

interface SuspenseVideoProps {
  src: string
  alt: string
  thumbnail: string
  className?: string
  loading?: 'lazy' | 'eager'
}

export default function SuspenseImage({
  src,
  alt,
  thumbnail,
  className = '',
  loading = 'eager',
}: SuspenseVideoProps) {

  return (
    <div className={`relative overflow-hidden ${className}`}>

      <video controls className="w-full h-auto rounded" poster="">
        <source src={src} type={`video/${src.split('.').pop()?.toLowerCase()}`} />
        Your browser does not support the video tag.
      </video>

    </div>
  )
}