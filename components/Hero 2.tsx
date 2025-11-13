'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className="min-h-screen flex items-center bg-white py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-8">
          JAMELNA
        </h1>

        {/* Name */}
        <p className="text-2xl md:text-3xl text-slate-600 mb-8 font-semibold">
          {t('name')}
        </p>

        {/* Tagline */}
        <p className="text-3xl md:text-4xl text-gray-900 mb-8 font-light max-w-3xl">
          {t('tagline')}
        </p>

        {/* Description */}
        <p className="text-xl text-gray-700 mb-12 max-w-3xl leading-relaxed">
          {t('description')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="px-8 py-4 bg-slate-600 hover:bg-slate-700 text-white font-semibold text-lg rounded-lg transition-colors">
            {t('ctaPrimary')}
          </button>
          <button className="px-8 py-4 border-2 border-slate-600 text-slate-600 hover:bg-slate-50 font-semibold text-lg rounded-lg transition-colors">
            {t('ctaSecondary')}
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap gap-8 text-gray-600">
          <div>
            <span className="font-semibold text-gray-900">5</span> Languages
          </div>
          <div>
            <span className="font-semibold text-gray-900">15+</span> Years Experience
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
