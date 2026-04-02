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

        {/* Full name — constrained to role label width */}
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
