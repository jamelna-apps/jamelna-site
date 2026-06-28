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
    <main className="min-h-screen bg-canvas">
      {/* Hero Section */}
      <section className="pt-10 pb-8 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-12 px-4 bg-canvas-deep">
        <div className="max-w-5xl mx-auto space-y-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </section>
    </main>
  );
}
