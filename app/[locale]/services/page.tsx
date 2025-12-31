'use client';

import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { useTranslations } from 'next-intl';

export default function ServicesPage() {
  const t = useTranslations('services');

  const services = [
    {
      title: t('service1.title'),
      youMightNeed: t.raw('service1.youMightNeed'),
      whatIBring: t.raw('service1.whatIBring'),
      recentExample: t('service1.recentExample'),
      deliverables: t('service1.deliverables'),
      timeline: t('service1.timeline'),
    },
    {
      title: t('service2.title'),
      youMightNeed: t.raw('service2.youMightNeed'),
      whatIBring: t.raw('service2.whatIBring'),
      recentExample: t('service2.recentExample'),
      deliverables: t('service2.deliverables'),
      timeline: t('service2.timeline'),
    },
    {
      title: t('service3.title'),
      youMightNeed: t.raw('service3.youMightNeed'),
      whatIBring: t.raw('service3.whatIBring'),
      recentExample: t('service3.recentExample'),
      deliverables: t('service3.deliverables'),
      timeline: t('service3.timeline'),
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-zinc-900 to-zinc-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249, 115, 22, 0.4), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            <span className="text-orange-400">/</span> {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto space-y-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>
    </main>
  );
}
