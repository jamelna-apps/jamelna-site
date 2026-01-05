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
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/work`, label: t('work') },
    { href: `/${locale}/k12-cs-education`, label: 'K12 CSED' },
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
          className="fixed top-4 right-4 z-50 p-3 rounded-lg bg-deep-card/80 backdrop-blur-sm border border-deep-border text-text-primary hover:text-accent hover:border-accent/50 transition-all"
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
          ${isScrolled || isMenuOpen ? 'bg-deep/95 backdrop-blur-lg border-b border-deep-border' : 'bg-transparent'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href={`/${locale}`} tabIndex={0} className="flex items-center gap-2 group">
              <span className="text-2xl font-display font-bold text-text-heading group-hover:text-warm transition-colors">
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
                      ? 'text-primary'
                      : 'text-text-primary hover:text-warm'
                    }
                  `}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
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
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-text-primary hover:text-primary rounded-lg hover:bg-deep-card/50 transition-all"
                >
                  <span>{currentLanguage.flag}</span>
                  <span>{currentLanguage.code.toUpperCase()}</span>
                </button>

                {isLangMenuOpen && (
                  <div
                    id="language-menu"
                    role="menu"
                    className="absolute right-0 mt-2 w-48 bg-deep-card/95 backdrop-blur-lg border border-deep-border rounded-lg shadow-lg py-1 z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        role="menuitem"
                        className={`w-full text-left px-4 py-2 text-sm flex items-center gap-3 transition-colors ${
                          locale === lang.code
                            ? 'bg-primary/10 text-primary'
                            : 'text-text-primary hover:bg-deep-border/50 hover:text-warm'
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
              className="md:hidden p-2 rounded-lg text-text-primary hover:text-accent hover:bg-deep-card/50 transition-all"
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden bg-deep/95 backdrop-blur-lg border-t border-deep-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-text-primary hover:bg-deep-card/50 hover:text-warm'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 border-t border-deep-border">
                <p className="text-xs font-semibold text-text-muted mb-2 px-4">
                  {t('language')}
                </p>
                <div role="menu">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        changeLanguage(lang.code);
                        setIsMenuOpen(false);
                      }}
                      role="menuitem"
                      className={`w-full text-left px-4 py-2 rounded-lg text-sm flex items-center gap-3 transition-all ${
                        locale === lang.code
                          ? 'bg-primary/10 text-primary'
                          : 'text-text-primary hover:bg-deep-card/50 hover:text-warm'
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
      </nav>
    </>
  );
};

export default Navigation;
