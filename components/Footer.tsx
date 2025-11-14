'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              JAMELNA
            </h3>
            <p className="text-gray-600 text-sm mb-3">
              Joe Alexander Meléndez-Naharro
            </p>
            <p className="text-gray-600 text-sm mb-3 leading-relaxed">
              {t('tagline')}
            </p>
            <p className="text-slate-600 text-sm">
              {t('location')}
            </p>
          </div>

          {/* Middle Column - Navigation */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              {t('navigate')}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-gray-600 hover:text-slate-600 transition-colors text-sm">
                  {nav('home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="text-gray-600 hover:text-slate-600 transition-colors text-sm">
                  {nav('services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/work`} className="text-gray-600 hover:text-slate-600 transition-colors text-sm">
                  {nav('work')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/photography`} className="text-gray-600 hover:text-slate-600 transition-colors text-sm">
                  {nav('photography')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/about`} className="text-gray-600 hover:text-slate-600 transition-colors text-sm">
                  {nav('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-600 hover:text-slate-600 transition-colors text-sm">
                  {nav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Column - Connect */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
              {t('connect')}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:joe@jamelna.com"
                  className="text-gray-600 hover:text-slate-600 transition-colors text-sm"
                >
                  joe@jamelna.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/joeamelendez"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-slate-600 transition-colors text-sm"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-600 text-xs text-center md:text-left">
              <p className="leading-relaxed">
                {t('siteDescription')}
              </p>
            </div>
            <div className="text-gray-500 text-xs">
              {t('copyright')}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
