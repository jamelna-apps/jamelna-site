'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

interface ServiceCardProps {
  title: string;
  youMightNeed: string[];
  whatIBring: string[];
  recentExample: string;
  deliverables: string;
  timeline: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  youMightNeed,
  whatIBring,
  recentExample,
  deliverables,
  timeline,
}) => {
  const t = useTranslations('services');
  const locale = useLocale();

  return (
    <div className="glass-card overflow-hidden mb-12">
      {/* Header */}
      <div className="bg-deep-card border-b border-deep-border px-8 py-6">
        <h2 className="text-2xl font-display font-bold text-text-heading">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* You Might Need This If */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-warm mb-4">
            {t('youMightNeed')}
          </h3>
          <ul className="space-y-2">
            {youMightNeed.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-warm mr-2 mt-1">•</span>
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What I Bring */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-primary mb-4">
            {t('whatIBring')}
          </h3>
          <ul className="space-y-2">
            {whatIBring.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-primary mr-2 mt-1">✓</span>
                <span className="text-text-secondary">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Example */}
        <div className="mb-8 bg-deep-card border border-deep-border rounded-lg p-6">
          <h3 className="text-lg font-bold text-text-heading mb-3">
            {t('recentExample')}
          </h3>
          <p className="text-text-secondary leading-relaxed">{recentExample}</p>
        </div>

        {/* Deliverables, Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-deep-card border border-deep-border rounded-lg p-4">
            <h4 className="text-sm font-bold text-warm uppercase mb-2 tracking-wider font-mono">
              {t('deliverables')}
            </h4>
            <p className="text-text-secondary">{deliverables}</p>
          </div>
          <div className="bg-deep-card border border-deep-border rounded-lg p-4">
            <h4 className="text-sm font-bold text-warm uppercase mb-2 tracking-wider font-mono">
              {t('timeline')}
            </h4>
            <p className="text-text-secondary">{timeline}</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link href={`/${locale}/contact`} className="btn-warm inline-block">
            {t('cta')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
