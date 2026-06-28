'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const glyphClass = 'relative h-14 w-14';

/* ---------- Foreground glyphs ---------- */

function AcademicCapGlyph() {
  return (
    <svg className={glyphClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function CompassGlyph() {
  return (
    <svg className={glyphClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.8 9.2 11 11 9.2 14.8 13 13 Z" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function NodesGlyph() {
  return (
    <svg className="relative h-[4.5rem] w-[4.5rem]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" d="M7.1 6.9 16.9 8.3 M6.8 8.4 10.7 16.4 M12.3 17.2 16.8 9.5" />
      <circle cx="5.7" cy="6.1" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="18.3" cy="8.4" r="2.6" fill="currentColor" stroke="none" />
      <circle cx="11.2" cy="18.3" r="2.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CostGlyph() {
  return (
    <svg className={glyphClass} fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CameraBadge() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
    </svg>
  );
}

/* ---------- Background pattern overlays ---------- */

function DotPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full text-white/15" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 60" aria-hidden="true">
      <defs>
        <pattern id="exp-dots" width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100" height="60" fill="url(#exp-dots)" />
    </svg>
  );
}

function RingPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full text-white/15" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 60" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="0.7">
        {[10, 20, 30, 40, 50].map((r) => (
          <circle key={r} cx="50" cy="30" r={r} />
        ))}
      </g>
    </svg>
  );
}

function DiagonalPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full text-white/12" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 60" aria-hidden="true">
      <defs>
        <pattern id="exp-diag" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100" height="60" fill="url(#exp-diag)" />
    </svg>
  );
}

function BarPattern() {
  const bars = [12, 20, 30, 18, 38, 26, 46, 32, 52, 40, 58, 48];
  return (
    <svg className="absolute inset-0 h-full w-full text-white/15" preserveAspectRatio="xMidYMid slice" viewBox="0 0 100 60" aria-hidden="true">
      <g fill="currentColor">
        {bars.map((h, i) => (
          <rect key={i} x={4 + i * 8} y={60 - h} width="4" height={h} />
        ))}
      </g>
    </svg>
  );
}

/* ---------- Media headers ---------- */

function MotifMedia({ gradient, pattern, glyph }: { gradient: string; pattern: React.ReactNode; glyph: React.ReactNode }) {
  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden" style={{ background: gradient }}>
      {pattern}
      <div className="relative text-white/95 transition-transform duration-300 group-hover:scale-110">
        {glyph}
      </div>
    </div>
  );
}

function PhotoMedia({ src }: { src: string }) {
  return (
    <div className="relative h-44 overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
      <div className="absolute bottom-3 left-3 rounded-full bg-black/35 p-2 text-white/90 backdrop-blur-sm">
        <CameraBadge />
      </div>
    </div>
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
      media: (
        <MotifMedia
          gradient="linear-gradient(135deg, #D4896A 0%, #C4703F 50%, #A85A2A 100%)"
          pattern={<DotPattern />}
          glyph={<AcademicCapGlyph />}
        />
      ),
    },
    {
      href: `/${locale}/photography`,
      title: t('nav.photography'),
      desc: t('photography.description'),
      media: <PhotoMedia src="/photos/open-world/3-_DSF4266.webp" />,
    },
    {
      href: `/${locale}/anchor-and-steer`,
      title: 'Anchor & STEER',
      desc: t('anchorAndSteer.hero.tagline'),
      media: (
        <MotifMedia
          gradient="linear-gradient(135deg, #A8C08A 0%, #8AA76E 50%, #5F7A48 100%)"
          pattern={<RingPattern />}
          glyph={<CompassGlyph />}
        />
      ),
    },
    {
      href: `/${locale}/computational-collaboration`,
      title: 'Computational Collaboration',
      desc: t('computationalCollaboration.hero.tagline'),
      media: (
        <MotifMedia
          gradient="linear-gradient(135deg, #6E8DA0 0%, #5A7A8E 50%, #3D5A6E 100%)"
          pattern={<DiagonalPattern />}
          glyph={<NodesGlyph />}
        />
      ),
    },
    {
      href: `/${locale}/ai-true-cost`,
      title: 'True Cost of AI',
      desc: t('trueCost.pageDescription'),
      media: (
        <MotifMedia
          gradient="linear-gradient(135deg, #C4703F 0%, #A85A2A 50%, #7E3F1C 100%)"
          pattern={<BarPattern />}
          glyph={<CostGlyph />}
        />
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-canvas">
      {/* Hero */}
      <section className="pt-10 pb-8 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
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
              {item.media}

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
