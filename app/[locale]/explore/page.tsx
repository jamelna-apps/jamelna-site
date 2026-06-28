'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const iconClass = 'w-12 h-12';

function AcademicCapIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
  );
}

function CompassIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.121 9.879l-1.414 4.242-4.243 1.415 1.415-4.243 4.242-1.414z" />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
    </svg>
  );
}

function CostIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function ExplorePage() {
  const t = useTranslations();
  const locale = useLocale();

  const items = [
    {
      href: `/${locale}/k12-cs-education`,
      title: t('nav.k12cs'),
      desc: t('k12CSEducation.subtitle'),
      from: '#C4703F',
      to: '#A85A2A',
      icon: <AcademicCapIcon />,
    },
    {
      href: `/${locale}/photography`,
      title: t('nav.photography'),
      desc: t('photography.description'),
      from: '#3D5A6E',
      to: '#2A3F4F',
      icon: <CameraIcon />,
    },
    {
      href: `/${locale}/anchor-and-steer`,
      title: 'Anchor & STEER',
      desc: t('anchorAndSteer.hero.tagline'),
      from: '#8AA76E',
      to: '#5F7A48',
      icon: <CompassIcon />,
    },
    {
      href: `/${locale}/computational-collaboration`,
      title: 'Computational Collaboration',
      desc: t('computationalCollaboration.hero.tagline'),
      from: '#5A7A8E',
      to: '#3D5A6E',
      icon: <ShareIcon />,
    },
    {
      href: `/${locale}/ai-true-cost`,
      title: 'True Cost of AI',
      desc: t('trueCost.pageDescription'),
      from: '#D4896A',
      to: '#A85A2A',
      icon: <CostIcon />,
    },
  ];

  return (
    <main className="min-h-screen bg-canvas pt-16">
      {/* Hero */}
      <section className="pt-16 pb-10 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <p className="text-xs font-mono uppercase tracking-wider text-terra mb-3">
            {t('explore.kicker')}
          </p>
          <h1 className="text-display-section font-display font-extrabold text-text-heading mb-4">
            {t('explore.title')}
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
            {t('explore.intro')}
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="pb-20 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-xl border border-canvas-border bg-canvas-raised transition-all duration-300 hover:-translate-y-1 hover:border-terra"
            >
              {/* Graphic */}
              <div
                className="relative flex h-40 items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${item.from}, ${item.to})` }}
              >
                <div className="text-white/90 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-6">
                <h2 className="mb-2 font-display text-xl font-bold text-text-heading">
                  {item.title}
                </h2>
                <p className="flex-1 text-sm leading-relaxed text-text-secondary">
                  {item.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-terra">
                  {t('explore.view')}
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
