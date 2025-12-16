'use client';

import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import PageWrapper from '@/components/PageWrapper';
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
    <PageWrapper>
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
          <span className="text-warm">/</span> {t('title')}
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </div>

      {/* Service Cards */}
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </PageWrapper>
  );
}
