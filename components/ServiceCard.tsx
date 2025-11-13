'use client';

import React from 'react';
import Button from './Button';
import { useTranslations } from 'next-intl';

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
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-12 hover:border-slate-500 transition-colors">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-8 py-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        {/* You Might Need This If */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {t('youMightNeed')}
          </h3>
          <ul className="space-y-2">
            {youMightNeed.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-slate-600 mr-2 mt-1">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What I Bring */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {t('whatIBring')}
          </h3>
          <ul className="space-y-2">
            {whatIBring.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-slate-600 mr-2 mt-1">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Example */}
        <div className="mb-8 bg-slate-50 border border-slate-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            {t('recentExample')}
          </h3>
          <p className="text-gray-700 leading-relaxed">{recentExample}</p>
        </div>

        {/* Deliverables, Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-bold text-slate-600 uppercase mb-2 tracking-wider">
              {t('deliverables')}
            </h4>
            <p className="text-gray-700">{deliverables}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-bold text-slate-600 uppercase mb-2 tracking-wider">
              {t('timeline')}
            </h4>
            <p className="text-gray-700">{timeline}</p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Button href="/contact" variant="primary" size="md">
            {t('cta')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
