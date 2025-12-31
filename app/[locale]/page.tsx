'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { useTranslations, useLocale } from 'next-intl';

// Scroll reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = ref.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale();
  const containerRef = useScrollReveal();

  const expertiseItems = [
    {
      title: t('valueProps.bridgeBuilder.title'),
      desc: t('valueProps.bridgeBuilder.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
    },
    {
      title: t('valueProps.aiPioneer.title'),
      desc: t('valueProps.aiPioneer.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: t('valueProps.systemsDesigner.title'),
      desc: t('valueProps.systemsDesigner.description'),
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
  ];

  const projects = [
    { key: 'gyst', anchor: 'gyst-get-your-style-together' },
    { key: 'smartiegoals', anchor: 'smartiegoals-org' },
    { key: 'scenecraft', anchor: 'scenecraft' },
    { key: 'script', anchor: 'script' },
    { key: 'cs4all', anchor: 'nyc-cs4all' },
    { key: 'coaching', anchor: 'cs-coaching-toolkit' },
  ];

  return (
    <div ref={containerRef} className="bg-zinc-900">
      {/* Hero Section - Keep original styling */}
      <Hero />

      {/* Core Expertise Section */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Subtle gradient accent */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="reveal text-4xl md:text-5xl font-display font-bold text-white mb-16 -ml-4 md:-ml-8">
            <span className="text-orange-400">/</span> Core Expertise
          </h2>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Large card */}
            <div className="reveal lg:col-span-7 bg-zinc-800 border border-zinc-700 rounded-lg p-8 hover:border-orange-500/50 transition-colors stagger-1">
              <div className="text-orange-400 mb-4">{expertiseItems[0].icon}</div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                {expertiseItems[0].title}
              </h3>
              <p className="text-zinc-300 text-lg leading-relaxed">
                {expertiseItems[0].desc}
              </p>
            </div>

            {/* Stacked smaller cards */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {expertiseItems.slice(1).map((item, i) => (
                <div
                  key={i}
                  className={`reveal bg-zinc-800 border border-zinc-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors stagger-${i + 2}`}
                >
                  <div className="text-blue-400 mb-3">{item.icon}</div>
                  <h3 className="text-xl font-display font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-24 bg-zinc-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="reveal mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white -ml-4 md:-ml-8 lg:-ml-16">
              <span className="text-blue-400">/</span> {t('featuredWork.title')}
            </h2>
            <p className="text-xl text-zinc-400 mt-4 max-w-2xl">
              {t('featuredWork.description')}
            </p>
          </div>

          {/* Masonry-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {projects.map((project, index) => (
              <Link
                key={index}
                href={`/${locale}/work#${project.anchor}`}
                className={`
                  reveal bg-zinc-800 border border-zinc-700 rounded-lg p-6 group
                  hover:border-orange-500/50 transition-colors
                  stagger-${(index % 5) + 1}
                  ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                `}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-500">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <svg
                    className="w-5 h-5 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {t(`featuredWork.projects.${project.key}.title`)}
                </h3>
                <p className="text-zinc-400 text-sm">
                  {t(`featuredWork.projects.${project.key}.subtitle`)}
                </p>
              </Link>
            ))}
          </div>

          <div className="reveal text-center">
            <Link
              href={`/${locale}/work`}
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-lg
                border border-blue-500/50 text-blue-400 font-semibold
                hover:bg-blue-500/10 hover:border-blue-400
                transition-all duration-300
              "
            >
              {t('featuredWork.viewAll')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-zinc-950 relative overflow-hidden">
        {/* Spotlight effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.2), transparent 60%)',
          }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="reveal text-xl text-zinc-400 mb-12 stagger-1">
            {t('cta.description')}
          </p>
          <div className="reveal stagger-2">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-lg"
            >
              {t('cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
