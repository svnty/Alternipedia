"use client";

import React from 'react';
import { LoadingOverlay } from '@/app/[lang]/loading-overlay';

export default function Loading() {
  return (
    <div className="relative min-h-[200px]">
      <LoadingOverlay isVisible={true} message="Loading Wikipedia article..." />
    </div>
  );
}
