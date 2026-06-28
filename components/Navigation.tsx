'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isExploreMenuOpen, setIsExploreMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations('nav');

  // Check if we're on the homepage
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  // Check if we're on the jobs section (has its own navigation)
  const isJobsSection = pathname?.includes('/jobs');

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'zh', label: '中文', flag: '🇨🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/work`, label: t('work') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  // Mirrors the footer's Explore column
  const exploreLinks = [
    { href: `/${locale}/k12-cs-education`, label: t('k12cs') },
    { href: `/${locale}/photography`, label: t('photography') },
    { href: `/${locale}/anchor-and-steer`, label: 'Anchor & STEER' },
    { href: `/${locale}/computational-collaboration`, label: 'Computational Collaboration' },
    { href: `/${locale}/ai-true-cost`, label: 'True Cost of AI' },
  ];

  const changeLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
    setIsLangMenuOpen(false);
  };

  const isActive = (href: string) => {
    const currentPath = pathname.replace(`/${locale}`, '') || '/';
    const linkPath = href.replace(`/${locale}`, '') || '/';
    if (linkPath === '/') {
      return currentPath === '/';
    }
    return currentPath?.startsWith(linkPath);
  };

  const exploreActive = exploreLinks.some((link) => isActive(link.href));

  // Handle scroll for showing/hiding nav on homepage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      setIsScrolled(scrollY > 50);

      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));

      // Nav is always visible; on homepage it starts transparent
      setIsVisible(true);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Keyboard handler for Escape key to close menus
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isLangMenuOpen) setIsLangMenuOpen(false);
        if (isExploreMenuOpen) setIsExploreMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isLangMenuOpen, isExploreMenuOpen]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangMenuOpen && !target.closest('#language-menu') && !target.closest('[aria-controls="language-menu"]')) {
        setIsLangMenuOpen(false);
      }
      if (isExploreMenuOpen && !target.closest('#explore-menu') && !target.closest('[aria-controls="explore-menu"]')) {
        setIsExploreMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangMenuOpen, isExploreMenuOpen]);

  // Nav is always shown (transparent on homepage hero, solid after scroll)
  const shouldShowNav = true;

  // Don't render main nav on jobs section - it has its own navigation
  if (isJobsSection) {
    return null;
  }

  return (
    <>
      {/* Main Navigation */}
      <nav
        aria-label="Main navigation"
        className={`
          relative fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${shouldShowNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          ${isScrolled || isMenuOpen ? 'bg-canvas-deep/98 border-b border-canvas-border' : 'bg-transparent'}
          ${isHomePage && !isScrolled && !isMenuOpen ? 'backdrop-blur-none' : ''}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={`/${locale}`} tabIndex={0} className="flex items-center gap-2 group">
              <span className="text-2xl font-display font-bold text-text-heading group-hover:text-terra transition-colors">
                JAMELNA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  tabIndex={0}
                  className={`
                    text-sm font-medium transition-all duration-300 relative
                    ${isActive(link.href)
                      ? 'text-terra'
                      : 'text-text-primary hover:text-terra'
                    }
                  `}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terra rounded-full" />
                  )}
                </Link>
              ))}

              {/* Explore dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsExploreMenuOpen(!isExploreMenuOpen)}
                  aria-expanded={isExploreMenuOpen}
                  aria-haspopup="true"
                  aria-controls="explore-menu"
                  className={`
                    flex items-center gap-1 text-sm font-medium transition-all duration-300 relative
                    ${exploreActive ? 'text-terra' : 'text-text-primary hover:text-terra'}
                  `}
                >
                  {t('explore')}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isExploreMenuOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  {exploreActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-terra rounded-full" />
                  )}
                </button>

                {isExploreMenuOpen && (
                  <div
                    id="explore-menu"
                    role="menu"
                    className="absolute left-0 mt-2 w-64 bg-canvas-raised border border-canvas-border rounded-lg shadow-lg py-1 z-50"
                  >
                    {exploreLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        onClick={() => setIsExploreMenuOpen(false)}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActive(link.href)
                            ? 'bg-terra/10 text-terra'
                            : 'text-text-primary hover:bg-canvas-border/50 hover:text-terra'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  aria-label="Select language"
                  aria-expanded={isLangMenuOpen}
                  aria-haspopup="true"
                  aria-controls="language-menu"
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-primary hover:text-terra rounded-lg hover:bg-canvas-raised/50 transition-all"
                >
                  <span>{currentLanguage.flag}</span>
                  <span>{currentLanguage.code.toUpperCase()}</span>
                </button>

                {isLangMenuOpen && (
                  <div
                    id="language-menu"
                    role="menu"
                    className="absolute right-0 mt-2 w-48 bg-canvas-raised border border-canvas-border rounded-lg shadow-lg py-1 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        role="menuitem"
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                          locale === lang.code
                            ? 'bg-terra/10 text-terra'
                            : 'text-text-primary hover:bg-canvas-border/50 hover:text-terra'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="md:hidden p-2 rounded-lg text-text-primary hover:text-terra hover:bg-canvas-raised/50 transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        {isScrolled && (
          <div
            className="scroll-progress"
            style={{ width: `${scrollProgress}%` }}
            aria-hidden="true"
          />
        )}
      </nav>

      {/* Mobile menu — full-screen overlay, outside nav to avoid z-index/transform issues */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 z-[60] bg-canvas-deep/100 overflow-y-auto"
          style={{ backgroundColor: 'var(--color-canvas-deep, #1A1816)' }}
        >
          {/* Close button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close navigation menu"
            className="fixed top-4 right-4 p-3 text-text-muted hover:text-terra transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="min-h-full flex flex-col justify-center px-8 py-24">
          {/* Nav links */}
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 text-3xl font-display font-bold transition-colors ${
                  isActive(link.href)
                    ? 'text-terra'
                    : 'text-text-heading hover:text-terra'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Explore links */}
          <div className="mt-10 pt-8 border-t border-canvas-border">
            <p className="text-sm font-mono text-text-muted uppercase tracking-wider mb-4">
              {t('explore')}
            </p>
            <div className="space-y-1">
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-2 text-xl font-display transition-colors ${
                    isActive(link.href)
                      ? 'text-terra'
                      : 'text-text-secondary hover:text-terra'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language switcher */}
          <div className="mt-10 pt-8 border-t border-canvas-border">
            <p className="text-sm font-mono text-text-muted uppercase tracking-wider mb-4">
              {t('language')}
            </p>
            <div className="flex flex-wrap gap-3" role="menu">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    changeLanguage(lang.code);
                    setIsMenuOpen(false);
                  }}
                  role="menuitem"
                  className={`px-4 py-2 rounded-lg text-base flex items-center gap-2 transition-colors ${
                    locale === lang.code
                      ? 'bg-terra/10 text-terra border border-terra/30'
                      : 'text-text-secondary hover:text-terra border border-canvas-border'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
