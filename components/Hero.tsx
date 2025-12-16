'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

// The JAMELNA sequence for the easter egg (click order)
const JAMELNA_SEQUENCE = ['J', 'A', 'M', 'E', 'L', 'N', 'A'];

// Name parts with their JAMELNA letter indices
// Joe Alexander MELéndez-NAharro
// J=0, A=1, M=2, E=3, L=4, N=5, A=6
const NAME_PARTS = [
  { text: 'J', isJamelna: true, jamelnaIndex: 0 },
  { text: 'oe ', isJamelna: false },
  { text: 'A', isJamelna: true, jamelnaIndex: 1 },
  { text: 'lexander ', isJamelna: false },
  { text: 'M', isJamelna: true, jamelnaIndex: 2 },
  { text: 'E', isJamelna: true, jamelnaIndex: 3 }, // JAMELNA E
  { text: 'L', isJamelna: true, jamelnaIndex: 4 }, // JAMELNA L
  { text: 'éndez-', isJamelna: false },
  { text: 'N', isJamelna: true, jamelnaIndex: 5 },
  { text: 'A', isJamelna: true, jamelnaIndex: 6 },
  { text: 'harro', isJamelna: false },
];

const Hero = () => {
  const t = useTranslations('hero');
  const locale = useLocale();
  const router = useRouter();

  const [clickedSequence, setClickedSequence] = useState<number[]>([]);
  const [showPortal, setShowPortal] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [letterFeedback, setLetterFeedback] = useState<number | null>(null);

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
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(0, 168, 255, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
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
          <span
            className={`
              block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
              font-display font-bold tracking-tight
              transition-opacity duration-1000
              ${animationStarted ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {NAME_PARTS.map((part, index) => {
              if (part.isJamelna) {
                const isClicked = clickedSequence.includes(part.jamelnaIndex!);
                const isNextInSequence = part.jamelnaIndex === clickedSequence.length;
                const showFeedback = letterFeedback === part.jamelnaIndex;

                return (
                  <span
                    key={index}
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

              return (
                <span
                  key={index}
                  className="text-text-muted/70"
                >
                  {part.text}
                </span>
              );
            })}
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
            className="btn-glow text-center"
          >
            {t('ctaPrimary')}
          </a>
          <a
            href={`/${locale}/work`}
            className="
              px-6 py-3 rounded-lg font-semibold text-center
              border border-accent/50 text-accent
              hover:bg-accent/10 hover:border-accent
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
