'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const TEASER_PHOTOS = [
  {
    src: '/photos/once-upon-a-time-in-new-york/24-DSCF7137.webp',
    alt: 'Street photography in New York',
    span: 'row-span-2',  // tall photo on left
  },
  {
    src: '/photos/open-world/5-_DSF4300.webp',
    alt: 'Travel photography',
    span: '',
  },
  {
    src: '/photos/out-there-somewhere/3-DSCF5377.webp',
    alt: 'Landscape photography',
    span: '',
  },
];

export default function PhotoTeaser() {
  const locale = useLocale();
  const t = useTranslations('home');

  return (
    <section className="py-16 lg:py-24 bg-canvas">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-10">
          <hr className="heading-rule" />
          <h2 className="text-display-section font-display font-extrabold text-text-heading mb-3">
            {t('photography.title', { defaultValue: 'Through the Lens' })}
          </h2>
          <p className="text-text-secondary text-lg max-w-xl">
            {t('photography.subtitle', { defaultValue: 'Street photography across three continents.' })}
          </p>
        </div>

        {/* Asymmetric photo grid */}
        <div className="grid grid-cols-2 gap-3 mb-8" style={{ gridTemplateRows: '200px 200px' }}>
          {/* Large photo spanning 2 rows */}
          <div className="row-span-2 relative overflow-hidden rounded-lg group">
            <Image
              src={TEASER_PHOTOS[0].src}
              alt={TEASER_PHOTOS[0].alt}
              fill
              sizes="50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          {/* Two smaller photos stacked */}
          <div className="relative overflow-hidden rounded-lg group">
            <Image
              src={TEASER_PHOTOS[1].src}
              alt={TEASER_PHOTOS[1].alt}
              fill
              sizes="50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
          <div className="relative overflow-hidden rounded-lg group">
            <Image
              src={TEASER_PHOTOS[2].src}
              alt={TEASER_PHOTOS[2].alt}
              fill
              sizes="50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </div>

        {/* Link to gallery */}
        <Link
          href={`/${locale}/photography`}
          className="link-underline text-terra font-medium inline-flex items-center gap-2 text-lg"
        >
          {t('photography.viewAll', { defaultValue: 'View all galleries' })}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
