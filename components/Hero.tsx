'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src="/photos/bridge.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Fade to white at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-white"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* White Content Block */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* All content with consistent padding */}
          <div className="p-8 md:p-12 lg:p-16">
            {/* Name and Tagline Header */}
            <div className="mb-6 md:mb-8">
              <p className="text-3xl md:text-4xl lg:text-5xl mb-2">
                <span className="font-bold text-gray-900">J</span>
                <span className="text-slate-600">oe </span>
                <span className="font-bold text-gray-900">A</span>
                <span className="text-slate-600">lexander </span>
                <span className="font-bold text-gray-900">MEL</span>
                <span className="text-slate-600">éndez-</span>
                <span className="font-bold text-gray-900">NA</span>
                <span className="text-slate-600">harro</span>
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-700">
                Bridging Communities and Ideas in Education
              </p>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-900 -mx-8 md:-mx-12 lg:-mx-16 mb-6 md:mb-8"></div>
          {/* Description */}
          <p className="text-xl text-gray-700 mb-12 max-w-3xl leading-relaxed">
            {t('description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/contact" className="inline-block px-8 py-4 bg-slate-600 hover:bg-slate-700 text-white font-semibold text-lg rounded-lg transition-colors text-center">
              {t('ctaPrimary')}
            </Link>
            <Link href="/work" className="inline-block px-8 py-4 border-2 border-slate-600 text-slate-600 hover:bg-slate-50 font-semibold text-lg rounded-lg transition-colors text-center">
              {t('ctaSecondary')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 text-gray-600">
            <div>
              <span className="font-semibold text-gray-900">15+</span> {t('yearsExperience')}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
