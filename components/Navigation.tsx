'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
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
    { href: `/${locale}/work`, label: t('work') },
    { href: `/${locale}/k12-cs-education`, label: t('k12cs') },
    { href: `/${locale}/photography`, label: t('photography') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/contact`, label: t('contact') },
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

  // Handle scroll for showing/hiding nav on homepage
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      setIsScrolled(scrollY > 50);

      // On homepage, show nav after scrolling past hero
      if (isHomePage) {
        setIsVisible(scrollY > viewportHeight * 0.5);
      } else {
        setIsVisible(true);
      }
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
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen, isLangMenuOpen]);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isLangMenuOpen && !target.closest('#language-menu') && !target.closest('[aria-controls="language-menu"]')) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLangMenuOpen]);

  // Don't render nav on homepage until scrolled, but show menu button
  // Also show nav when mobile menu is open
  const shouldShowNav = !isHomePage || isVisible || isMenuOpen;

  // Don't render main nav on jobs section - it has its own navigation
  if (isJobsSection) {
    return null;
  }

  return (
    <>
      {/* Fixed menu button on homepage before scroll */}
      {isHomePage && !isVisible && (
        <button
          onClick={() => setIsMenuOpen(true)}
          aria-label="Open navigation menu"
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-terra text-canvas-deep hover:bg-terra-light transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Main Navigation */}
      <nav
        aria-label="Main navigation"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500
          ${shouldShowNav ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          ${isScrolled || isMenuOpen ? 'bg-canvas-deep/98 border-b border-canvas-border' : 'bg-transparent'}
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

        {/* Mobile menu — full-screen editorial overlay */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden fixed inset-0 z-40 bg-canvas-deep flex flex-col justify-center px-8"
          >
            {/* Close button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close navigation menu"
              className="absolute top-4 right-4 p-3 text-text-muted hover:text-terra transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

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

            {/* Language switcher in mobile overlay */}
            <div className="mt-12 pt-8 border-t border-canvas-border">
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
        )}
      </nav>
    </>
  );
};

export default Navigation;
