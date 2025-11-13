'use client';

import React from 'react';
import Link from 'next/link';
import Hero from '@/components/Hero';
import Button from '@/components/Button';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Core Expertise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            Core Expertise
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: t('valueProps.bridgeBuilder.title'),
                desc: t('valueProps.bridgeBuilder.description'),
              },
              {
                title: t('valueProps.aiPioneer.title'),
                desc: t('valueProps.aiPioneer.description'),
              },
              {
                title: t('valueProps.systemsDesigner.title'),
                desc: t('valueProps.systemsDesigner.description'),
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-200 hover:border-slate-500 transition-colors">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t('featuredWork.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t('featuredWork.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              { key: 'gyst', anchor: 'gyst-get-your-style-together' },
              { key: 'smartiegoals', anchor: 'smartiegoals-org' },
              { key: 'scenecraft', anchor: 'scenecraft' },
              { key: 'script', anchor: 'script' },
              { key: 'cs4all', anchor: 'nyc-cs4all' },
              { key: 'coaching', anchor: 'cs-coaching-toolkit' },
            ].map((project, index) => (
              <Link
                key={index}
                href={`/work#${project.anchor}`}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:border-slate-500 transition-colors block"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t(`featuredWork.projects.${project.key}.title`)}
                </h3>
                <p className="text-gray-700 text-sm">
                  {t(`featuredWork.projects.${project.key}.subtitle`)}
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button href="/work" variant="outline" size="lg">
              {t('featuredWork.viewAll')}
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('cta.title')}
          </h2>
          <p className="text-xl text-slate-100 mb-10">
            {t('cta.description')}
          </p>
          <Button href="/contact" variant="secondary" size="lg">
            {t('cta.button')}
          </Button>
        </div>
      </section>
    </div>
  );
}
