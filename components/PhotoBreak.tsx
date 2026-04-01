'use client';

import React from 'react';
import Image from 'next/image';

interface PhotoBreakProps {
  src: string;
  alt: string;
  position?: string;  // CSS object-position value, default 'center'
  height?: string;     // CSS height, default '30vh'
}

export default function PhotoBreak({ src, alt, position = 'center', height = '30vh' }: PhotoBreakProps) {
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ height }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: position }}
        loading="lazy"
      />
      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-canvas-deep/20 via-transparent to-canvas-deep/20 pointer-events-none" />
    </div>
  );
}
