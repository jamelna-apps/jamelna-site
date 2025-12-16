'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

// The JAMELNA sequence for the easter egg (click order)
const JAMELNA_SEQUENCE = ['J', 'A', 'M', 'E', 'L', 'N', 'A'];

// Name word groups - each group stays together on the same line
// Joe Alexander MELéndez-NAharro
// J=0, A=1, M=2, E=3, L=4, N=5, A=6
type NamePart = { text: string; isJamelna: boolean; jamelnaIndex?: number };
type WordGroup = { parts: NamePart[]; noWrap?: boolean };

const NAME_WORD_GROUPS: WordGroup[] = [
  {
    parts: [
      { text: 'J', isJamelna: true, jamelnaIndex: 0 },
      { text: 'oe', isJamelna: false },
    ]
  },
  {
    parts: [
      { text: 'A', isJamelna: true, jamelnaIndex: 1 },
      { text: 'lexander', isJamelna: false },
    ]
  },
  {
    parts: [
      { text: 'M', isJamelna: true, jamelnaIndex: 2 },
      { text: 'E', isJamelna: true, jamelnaIndex: 3 },
      { text: 'L', isJamelna: true, jamelnaIndex: 4 },
      { text: 'éndez-', isJamelna: false },
      { text: 'N', isJamelna: true, jamelnaIndex: 5 },
      { text: 'A', isJamelna: true, jamelnaIndex: 6 },
      { text: 'harro', isJamelna: false },
    ],
    noWrap: true  // Keep "MELéndez-NAharro" together
  },
];

const Hero = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();

  const [clickedSequence, setClickedSequence] = useState<number[]>([]);
  const [showPortal, setShowPortal] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [letterFeedback, setLetterFeedback] = useState<number | null>(null);
  const [isNameHovered, setIsNameHovered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Start animation after mount
  useEffect(() => {
    const timer = setTimeout(() => setAnimationStarted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Handle JAMELNA letter click
  const handleLetterClick = useCallback((jamelnaIndex: number) => {
    const expectedIndex = clickedSequence.length;

    // Check if this is the correct next letter
    if (jamelnaIndex === expectedIndex) {
      // Correct letter!
      setLetterFeedback(jamelnaIndex);
      setTimeout(() => setLetterFeedback(null), 300);

      const newSequence = [...clickedSequence, jamelnaIndex];
      setClickedSequence(newSequence);

      // Check if sequence is complete
      if (newSequence.length === JAMELNA_SEQUENCE.length) {
        // Easter egg triggered!
        setShowPortal(true);
        setTimeout(() => {
          router.push(`/${locale}/tech-sovereignty`);
        }, 1500);
      }
    } else {
      // Wrong letter - reset sequence
      setClickedSequence([]);
    }
  }, [clickedSequence, locale, router]);

  // Scroll hint animation
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-deep">
      {/* Animated gradient background (GYST-inspired warm + blue accents) */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(143, 168, 200, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(201, 112, 77, 0.1) 0%, transparent 50%)',
        }}
      />

      {/* Portal animation overlay */}
      {showPortal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-deep">
          <div className="relative">
            {/* Portal rings */}
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
        {/* Name display */}
        <h1 className="text-center mb-8">
          {/* Screen reader accessible full name */}
          <span className="sr-only">Joe Alexander Meléndez-Naharro</span>

          {/* Visual animated name - hidden from screen readers */}
          <span
            aria-hidden="true"
            className={`
              block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              font-display font-bold tracking-tight cursor-pointer
              ${prefersReducedMotion ? '' : 'transition-opacity duration-1000'}
              ${animationStarted || prefersReducedMotion ? 'opacity-100' : 'opacity-0'}
            `}
            onMouseEnter={() => setIsNameHovered(true)}
            onMouseLeave={() => setIsNameHovered(false)}
            onFocus={() => setIsNameHovered(true)}
            onBlur={() => setIsNameHovered(false)}
          >
            {NAME_WORD_GROUPS.map((group, groupIndex) => (
              <span
                key={groupIndex}
                className={group.noWrap ? 'whitespace-nowrap' : undefined}
              >
                {group.parts.map((part, partIndex) => {
                  if (part.isJamelna) {
                    const isClicked = clickedSequence.includes(part.jamelnaIndex!);
                    const isNextInSequence = part.jamelnaIndex === clickedSequence.length;
                    const showFeedback = letterFeedback === part.jamelnaIndex;

                    return (
                      <span
                        key={partIndex}
                        onClick={() => handleLetterClick(part.jamelnaIndex!)}
                        className={`
                          cursor-pointer select-none inline-block
                          transition-all duration-300
                          ${isClicked ? 'text-accent scale-110' : 'glow-text-animated'}
                          ${showFeedback ? 'scale-125' : ''}
                          ${isNextInSequence ? 'hover:scale-110' : ''}
                        `}
                        style={{
                          animationDelay: `${(part.jamelnaIndex || 0) * 0.3}s`,
                          textShadow: isClicked
                            ? '0 0 30px rgba(0, 168, 255, 0.8), 0 0 60px rgba(0, 168, 255, 0.5)'
                            : undefined,
                        }}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            handleLetterClick(part.jamelnaIndex!);
                          }
                        }}
                        aria-label={`Letter ${part.text}`}
                      >
                        {part.text}
                      </span>
                    );
                  }

                  // Non-JAMELNA letters: hidden by default, revealed on hover
                  // For reduced motion: always show full name
                  // Wrapper handles width animation, inner span preserves baseline
                  const showFull = isNameHovered || prefersReducedMotion;
                  return (
                    <span
                      key={partIndex}
                      className={`inline-flex overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-1000 ease-out'}`}
                      style={{
                        maxWidth: showFull ? `${part.text.length + 0.5}ch` : '0',
                        verticalAlign: 'baseline',
                      }}
                    >
                      <span
                        className={`whitespace-pre ${prefersReducedMotion ? 'text-text-secondary' : 'text-text-muted/30'}`}
                        style={{
                          opacity: showFull ? 1 : 0,
                          transition: prefersReducedMotion ? 'none' : 'opacity 0.5s ease-out 0.3s',
                        }}
                      >
                        {part.text}
                      </span>
                    </span>
                  );
                })}
                {/* Add space between word groups - also animated */}
                {groupIndex < NAME_WORD_GROUPS.length - 1 && (
                  <span
                    className={`inline-flex overflow-hidden ${prefersReducedMotion ? '' : 'transition-all duration-1000 ease-out'}`}
                    style={{
                      maxWidth: (isNameHovered || prefersReducedMotion) ? '0.4em' : '0',
                      verticalAlign: 'baseline',
                    }}
                  >
                    <span className="whitespace-pre">&nbsp;</span>
                  </span>
                )}
              </span>
            ))}
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={`
            text-center text-xl md:text-2xl lg:text-3xl text-text-muted font-body
            max-w-3xl mx-auto mb-12
            transition-all duration-1000 delay-500
            ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
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
            className="
              px-6 py-3 rounded-lg font-semibold text-center
              border border-primary/50 text-primary
              hover:bg-primary/10 hover:border-primary
              transition-all duration-300
            "
          >
            {t('ctaSecondary')}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={scrollToContent}
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2
          text-text-muted hover:text-accent
          transition-all duration-1000 delay-1500
          ${animationStarted ? 'opacity-100' : 'opacity-0'}
          animate-bounce
        `}
        aria-label="Scroll to content"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </button>

      {/* Hidden hint for easter egg (very subtle) */}
      <div
        className={`
          absolute bottom-4 right-4 text-xs text-text-muted/20
          transition-opacity duration-500
          ${clickedSequence.length > 0 && clickedSequence.length < 7 ? 'opacity-100' : 'opacity-0'}
        `}
      >
        {clickedSequence.length}/7
      </div>
    </section>
  );
};

export default Hero;
