'use client';

import React from 'react';
import Image from 'next/image';

interface ValuePropCardProps {
  image: string;
  headline: string;
  body: string;
}

const ValuePropCard: React.FC<ValuePropCardProps> = ({ image, headline, body }) => {
  return (
    <div className="relative group overflow-hidden">
      {/* Photo Background */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={image}
          alt={headline}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 group-hover:from-black/50 group-hover:via-black/70 group-hover:to-black/95 transition-all duration-500"></div>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
        <h3 className="text-2xl md:text-3xl font-light text-white mb-4 leading-tight">
          {headline}
        </h3>
        <p className="text-neutral-200 leading-relaxed font-light text-base md:text-lg">
          {body}
        </p>
      </div>
    </div>
  );
};

export default ValuePropCard;
