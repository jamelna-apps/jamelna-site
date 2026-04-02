'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

// Easter egg: Konami code → Tech Sovereignty page
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

const Hero = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();

  const [showPortal, setShowPortal] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);

  // Start animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Konami code listener
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    setKonamiProgress((prev) => {
      if (e.key === KONAMI[prev]) {
        const next = prev + 1;
        if (next === KONAMI.length) {
          setShowPortal(true);
          setTimeout(() => {
            router.push(`/${locale}/tech-sovereignty`);
          }, 1500);
          return 0;
        }
        return next;
      }
      // Reset on wrong key, but check if it matches the start
      return e.key === KONAMI[0] ? 1 : 0;
    });
  }, [locale, router]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-canvas-deep group"
    >
      {/* Photo strip background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid grid-cols-4 gap-1 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-1000">
          {[
            '/photos/bridge.webp',
            '/photos/out-there-somewhere/30-DSCF2369.webp',
            '/photos/open-world/24-DSCF5915.webp',
            '/photos/open-world/1-_DSF4181.webp',
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="w-full h-full object-cover"
              loading={i < 2 ? 'eager' : 'lazy'}
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-canvas-deep/70 via-canvas-deep/95 to-canvas-deep/70" />
      </div>

      {/* Portal animation overlay */}
      {showPortal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-canvas-deep">
          <div className="relative">
            <div className="absolute inset-0 animate-ping">
              <div className="w-64 h-64 rounded-full border-2 border-secret opacity-50" />
            </div>
            <div className="absolute inset-0 animate-pulse">
              <div className="w-64 h-64 rounded-full border border-secret/30" />
            </div>
            <div
              className="w-64 h-64 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                boxShadow: '0 0 60px rgba(139, 92, 246, 0.5), inset 0 0 60px rgba(139, 92, 246, 0.2)',
              }}
            >
              <span className="text-secret font-display text-2xl font-bold animate-pulse">
                Entering...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* HUD frame — decorative sci-fi elements around content */}
      <div className="absolute inset-0 z-[5] pointer-events-none hidden md:block">
        {/* Corner brackets */}
        <div className="absolute top-16 left-8 w-16 h-16 border-t-2 border-l-2 border-terra/30 group-hover:border-terra/60 transition-colors duration-700" />
        <div className="absolute top-16 right-8 w-16 h-16 border-t-2 border-r-2 border-terra/30 group-hover:border-terra/60 transition-colors duration-700" />
        <div className="absolute bottom-16 left-8 w-16 h-16 border-b-2 border-l-2 border-terra/30 group-hover:border-terra/60 transition-colors duration-700" />
        <div className="absolute bottom-16 right-8 w-16 h-16 border-b-2 border-r-2 border-terra/30 group-hover:border-terra/60 transition-colors duration-700" />

        {/* Connecting edge lines */}
        <div className="absolute top-16 left-24 right-24 h-px bg-gradient-to-r from-terra/20 via-terra/5 to-terra/20" />
        <div className="absolute bottom-16 left-24 right-24 h-px bg-gradient-to-r from-terra/20 via-terra/5 to-terra/20" />
        <div className="absolute left-8 top-32 bottom-32 w-px bg-gradient-to-b from-terra/20 via-terra/5 to-terra/20" />
        <div className="absolute right-8 top-32 bottom-32 w-px bg-gradient-to-b from-terra/20 via-terra/5 to-terra/20" />

        {/* Scanning line */}
        <div className="absolute inset-x-8 top-16 bottom-16 overflow-hidden">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-terra/25 to-transparent animate-scan" />
        </div>

        {/* Data readouts */}
        <div className="absolute top-20 left-12 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-terra/60 animate-pulse" />
          <span className="font-mono text-[10px] text-terra/40 uppercase tracking-widest">sys.portfolio.active</span>
        </div>
        <div className="absolute top-20 right-12 text-right">
          <span className="font-mono text-[10px] text-text-muted/30 tracking-wider">35.99°N 78.90°W</span>
        </div>
        <div className="absolute bottom-20 left-12">
          <span className="font-mono text-[10px] text-text-muted/20 tracking-wider">v2026.04</span>
        </div>

        {/* Side data bars */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 items-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-terra/15 group-hover:bg-terra/40 transition-all duration-700"
              style={{
                height: `${5 + Math.sin(i * 1.2) * 4}px`,
                transitionDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 items-center">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-1 rounded-full bg-terra/15 group-hover:bg-terra/40 transition-all duration-700"
              style={{
                height: `${5 + Math.cos(i * 1.2) * 4}px`,
                transitionDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        {/* Role label */}
        <p className={`
          text-center font-mono text-display-label uppercase tracking-[0.15em] text-text-muted mb-4
          transition-all duration-1000 delay-100
          ${animationStarted ? 'opacity-100' : 'opacity-0'}
        `}>
          {t('roleLabel', { defaultValue: 'Educator / Designer / Manager / Photographer' })}
        </p>

        {/* Full name */}
        <h1 className={`
          text-center font-display font-extrabold text-text-heading
          text-3xl sm:text-4xl md:text-5xl tracking-tight mb-8
          max-w-fit mx-auto
          transition-all duration-1000 delay-200
          ${animationStarted ? 'opacity-100' : 'opacity-0'}
        `}
          style={{ textShadow: '0 2px 20px rgba(18,17,15,0.6)' }}
        >
          {t('name', { defaultValue: 'Joe Alexander Meléndez-Naharro' })}
        </h1>

        {/* Tagline */}
        <p
          className={`
            text-center text-xl md:text-2xl lg:text-3xl text-text-secondary font-body
            max-w-4xl mx-auto mb-12
            transition-all duration-1000 delay-500
            ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
          style={{ textShadow: '0 1px 10px rgba(18,17,15,0.5)' }}
        >
          {t('tagline', { defaultValue: 'Bridging Communities and Ideas in Education' })}
        </p>

        {/* Description */}
        <p
          className={`
            text-center text-lg text-text-primary/80 font-body
            max-w-2xl mx-auto mb-12
            transition-all duration-1000 delay-700
            ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          {t('description')}
        </p>

        {/* CTA Buttons */}
        <div
          className={`
            flex flex-col sm:flex-row gap-4 justify-center
            transition-all duration-1000 delay-1000
            ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <a
            href={`/${locale}/contact`}
            className="btn-warm text-center"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href={`/${locale}/work`}
            className="btn-ghost text-center"
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={scrollToContent}
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          text-text-muted hover:text-terra
          transition-all duration-1000 delay-1500
          ${animationStarted ? 'opacity-100' : 'opacity-0'}
        `}
        aria-label="Scroll to content"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <span className="w-px bg-current animate-grow-line" />
      </button>
    </section>
  );
};

export default Hero;
