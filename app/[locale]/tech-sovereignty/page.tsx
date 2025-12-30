'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';

// Project Card Component
interface Project {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  status: 'available' | 'coming-soon';
  link?: string;
}

function ProjectCard({ project }: { project: Project }) {
  const isAvailable = project.status === 'available';

  const cardContent = (
    <>
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-text-heading text-sm">{project.title}</h4>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
          isAvailable
            ? 'bg-secret/20 text-secret-light'
            : 'bg-deep-alt text-text-muted'
        }`}>
          {isAvailable ? 'Available' : 'Coming Soon'}
        </span>
      </div>
      <p className="text-text-secondary text-sm mb-3 line-clamp-2">{project.description}</p>
      <div className="flex gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          {project.difficulty}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {project.duration}
        </span>
      </div>
      {isAvailable && project.link && (
        <div className="mt-3 pt-3 border-t border-deep-border">
          <span className="text-xs text-secret font-medium flex items-center gap-1">
            View Lesson Plans
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      )}
    </>
  );

  if (isAvailable && project.link) {
    return (
      <Link
        href={project.link}
        className="block bg-deep-card border border-deep-border rounded-lg p-5 hover:border-secret/50 hover:shadow-lg hover:shadow-secret/10 transition-all"
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={`bg-deep-card border border-deep-border rounded-lg p-5 ${!isAvailable ? 'opacity-60' : ''}`}>
      {cardContent}
    </div>
  );
}

// Tool Card Component
interface Tool {
  name: string;
  description: string;
  url: string;
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-deep-card border border-deep-border rounded-lg p-4 hover:border-secret/50 hover:shadow-sm hover:shadow-secret/10 transition-all"
    >
      <h4 className="font-semibold text-text-heading text-sm mb-1">{tool.name}</h4>
      <p className="text-text-secondary text-xs">{tool.description}</p>
    </a>
  );
}

// Track Section Component
interface TrackSectionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  projects: Project[];
  color: string;
  trackLink?: string;
  trackAvailable?: boolean;
}

function TrackSection({ icon, title, description, projects, color, trackLink, trackAvailable }: TrackSectionProps) {
  const allComingSoon = projects.every(p => p.status === 'coming-soon');

  return (
    <div className={`mb-12 ${allComingSoon ? 'opacity-70' : ''}`}>
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-text-heading">{title}</h3>
            {trackAvailable && (
              <span className="bg-secret/20 text-secret-light text-xs px-2 py-1 rounded-full font-medium">
                Curriculum Available
              </span>
            )}
          </div>
          <p className="text-text-secondary text-sm mt-1">{description}</p>
          {trackLink && trackAvailable && (
            <Link
              href={trackLink}
              className="inline-flex items-center gap-1 text-sm text-secret hover:text-secret-light font-medium mt-2 transition-colors"
            >
              View Full Curriculum
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
}

// Table of Contents Component
function TableOfContents() {
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const links = [
    { id: 'why', label: 'Why Tech Sovereignty' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'tools', label: 'Tools' },
    { id: 'educators', label: 'For Educators' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={`block text-xs px-3 py-1.5 rounded-full transition-all ${
                activeSection === link.id
                  ? 'bg-secret text-white'
                  : 'text-text-muted hover:text-text-secondary hover:bg-deep-card'
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function TechSovereigntyPage() {
  const t = useTranslations('techSovereignty');
  const locale = useLocale();

  // Track data
  const networkingProjects: Project[] = [
    { title: t('tracks.networking.project1.title'), description: t('tracks.networking.project1.description'), difficulty: t('tracks.networking.project1.difficulty'), duration: t('tracks.networking.project1.duration'), status: 'available', link: `/${locale}/tech-sovereignty/networking?project=1` },
    { title: t('tracks.networking.project2.title'), description: t('tracks.networking.project2.description'), difficulty: t('tracks.networking.project2.difficulty'), duration: t('tracks.networking.project2.duration'), status: 'available', link: `/${locale}/tech-sovereignty/networking?project=2` },
    { title: t('tracks.networking.project3.title'), description: t('tracks.networking.project3.description'), difficulty: t('tracks.networking.project3.difficulty'), duration: t('tracks.networking.project3.duration'), status: 'available', link: `/${locale}/tech-sovereignty/networking?project=3` },
    { title: t('tracks.networking.project4.title'), description: t('tracks.networking.project4.description'), difficulty: t('tracks.networking.project4.difficulty'), duration: t('tracks.networking.project4.duration'), status: 'available', link: `/${locale}/tech-sovereignty/networking?project=4` },
  ];

  const selfHostedProjects: Project[] = [
    { title: t('tracks.selfHosted.project1.title'), description: t('tracks.selfHosted.project1.description'), difficulty: t('tracks.selfHosted.project1.difficulty'), duration: t('tracks.selfHosted.project1.duration'), status: 'available', link: `/${locale}/tech-sovereignty/self-hosted?project=1` },
    { title: t('tracks.selfHosted.project2.title'), description: t('tracks.selfHosted.project2.description'), difficulty: t('tracks.selfHosted.project2.difficulty'), duration: t('tracks.selfHosted.project2.duration'), status: 'available', link: `/${locale}/tech-sovereignty/self-hosted?project=2` },
    { title: t('tracks.selfHosted.project3.title'), description: t('tracks.selfHosted.project3.description'), difficulty: t('tracks.selfHosted.project3.difficulty'), duration: t('tracks.selfHosted.project3.duration'), status: 'available', link: `/${locale}/tech-sovereignty/self-hosted?project=3` },
    { title: t('tracks.selfHosted.project4.title'), description: t('tracks.selfHosted.project4.description'), difficulty: t('tracks.selfHosted.project4.difficulty'), duration: t('tracks.selfHosted.project4.duration'), status: 'available', link: `/${locale}/tech-sovereignty/self-hosted?project=4` },
  ];

  const aiProjects: Project[] = [
    { title: t('tracks.ai.project1.title'), description: t('tracks.ai.project1.description'), difficulty: t('tracks.ai.project1.difficulty'), duration: t('tracks.ai.project1.duration'), status: 'coming-soon' },
    { title: t('tracks.ai.project2.title'), description: t('tracks.ai.project2.description'), difficulty: t('tracks.ai.project2.difficulty'), duration: t('tracks.ai.project2.duration'), status: 'coming-soon' },
    { title: t('tracks.ai.project3.title'), description: t('tracks.ai.project3.description'), difficulty: t('tracks.ai.project3.difficulty'), duration: t('tracks.ai.project3.duration'), status: 'coming-soon' },
    { title: t('tracks.ai.project4.title'), description: t('tracks.ai.project4.description'), difficulty: t('tracks.ai.project4.difficulty'), duration: t('tracks.ai.project4.duration'), status: 'coming-soon' },
  ];

  const appDevProjects: Project[] = [
    { title: t('tracks.appDev.project1.title'), description: t('tracks.appDev.project1.description'), difficulty: t('tracks.appDev.project1.difficulty'), duration: t('tracks.appDev.project1.duration'), status: 'coming-soon' },
    { title: t('tracks.appDev.project2.title'), description: t('tracks.appDev.project2.description'), difficulty: t('tracks.appDev.project2.difficulty'), duration: t('tracks.appDev.project2.duration'), status: 'coming-soon' },
    { title: t('tracks.appDev.project3.title'), description: t('tracks.appDev.project3.description'), difficulty: t('tracks.appDev.project3.difficulty'), duration: t('tracks.appDev.project3.duration'), status: 'coming-soon' },
    { title: t('tracks.appDev.project4.title'), description: t('tracks.appDev.project4.description'), difficulty: t('tracks.appDev.project4.difficulty'), duration: t('tracks.appDev.project4.duration'), status: 'coming-soon' },
  ];

  const communityProjects: Project[] = [
    { title: t('tracks.community.project1.title'), description: t('tracks.community.project1.description'), difficulty: t('tracks.community.project1.difficulty'), duration: t('tracks.community.project1.duration'), status: 'coming-soon' },
    { title: t('tracks.community.project2.title'), description: t('tracks.community.project2.description'), difficulty: t('tracks.community.project2.difficulty'), duration: t('tracks.community.project2.duration'), status: 'coming-soon' },
    { title: t('tracks.community.project3.title'), description: t('tracks.community.project3.description'), difficulty: t('tracks.community.project3.difficulty'), duration: t('tracks.community.project3.duration'), status: 'coming-soon' },
  ];

  // Tools data
  const networkingTools: Tool[] = [
    { name: 'OpenWRT', description: t('tools.networking.openwrt'), url: 'https://openwrt.org' },
    { name: 'Pi-hole', description: t('tools.networking.pihole'), url: 'https://pi-hole.net' },
    { name: 'WireGuard', description: t('tools.networking.wireguard'), url: 'https://www.wireguard.com' },
  ];

  const selfHostingTools: Tool[] = [
    { name: 'Nextcloud', description: t('tools.selfHosting.nextcloud'), url: 'https://nextcloud.com' },
    { name: 'Matrix/Element', description: t('tools.selfHosting.matrix'), url: 'https://element.io' },
    { name: 'Mastodon', description: t('tools.selfHosting.mastodon'), url: 'https://joinmastodon.org' },
  ];

  const llmTools: Tool[] = [
    { name: 'Ollama', description: t('tools.llm.ollama'), url: 'https://ollama.ai' },
    { name: 'llama.cpp', description: t('tools.llm.llamacpp'), url: 'https://github.com/ggerganov/llama.cpp' },
    { name: 'Open WebUI', description: t('tools.llm.openwebui'), url: 'https://openwebui.com' },
    { name: 'Hugging Face', description: t('tools.llm.huggingface'), url: 'https://huggingface.co' },
  ];

  const devTools: Tool[] = [
    { name: 'VS Code', description: t('tools.dev.vscode'), url: 'https://code.visualstudio.com' },
    { name: 'Git', description: t('tools.dev.git'), url: 'https://git-scm.com' },
    { name: 'Python', description: t('tools.dev.python'), url: 'https://python.org' },
  ];

  const hardwareTools: Tool[] = [
    { name: 'Raspberry Pi', description: t('tools.hardware.raspberrypi'), url: 'https://www.raspberrypi.org' },
    { name: 'Pine64', description: t('tools.hardware.pine64'), url: 'https://pine64.org' },
    { name: 'LibreRouter', description: t('tools.hardware.librerouter'), url: 'https://librerouter.org' },
  ];

  return (
    <main className="min-h-screen bg-deep">
      <TableOfContents />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        {/* Purple gradient background for secret page */}
        <div className="absolute inset-0 bg-gradient-to-br from-secret/20 via-deep to-deep-darker"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(167, 139, 250, 0.3), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
            <span className="text-secret">/</span> {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <p className="text-lg text-text-muted mb-10 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#curriculum"
              className="bg-secret text-white px-8 py-3 rounded-lg font-semibold hover:bg-secret-light transition-colors"
            >
              {t('hero.ctaPrimary')}
            </a>
            <a
              href="#tools"
              className="border border-secret/50 text-text-primary px-8 py-3 rounded-lg font-semibold hover:bg-secret/10 transition-colors"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>
        </div>
      </section>

      {/* Why Tech Sovereignty */}
      <section id="why" className="py-20 px-4 bg-deep-alt">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-6 text-center">
            {t('why.title')}
          </h2>
          <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto mb-12">
            {t('why.intro')}
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Problem */}
            <div className="bg-deep-card border border-warm/30 rounded-xl p-6 hover:border-warm/60 transition-colors">
              <div className="w-12 h-12 bg-warm/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-heading mb-2">{t('why.problem.title')}</h3>
              <p className="text-text-secondary text-sm">{t('why.problem.description')}</p>
            </div>

            {/* Vision */}
            <div className="bg-deep-card border border-primary/30 rounded-xl p-6 hover:border-primary/60 transition-colors">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-heading mb-2">{t('why.vision.title')}</h3>
              <p className="text-text-secondary text-sm">{t('why.vision.description')}</p>
            </div>

            {/* Benefit */}
            <div className="bg-deep-card border border-secret/30 rounded-xl p-6 hover:border-secret/60 transition-colors">
              <div className="w-12 h-12 bg-secret/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-heading mb-2">{t('why.benefit.title')}</h3>
              <p className="text-text-secondary text-sm">{t('why.benefit.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Roadmap / Curriculum */}
      <section id="curriculum" className="py-20 px-4 bg-deep">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4 text-center">
            {t('curriculum.title')}
          </h2>
          <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto mb-12">
            {t('curriculum.description')}
          </p>

          {/* Track A: Networking */}
          <TrackSection
            icon={
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            }
            title={t('tracks.networking.title')}
            description={t('tracks.networking.description')}
            projects={networkingProjects}
            color="bg-primary/20"
            trackLink={`/${locale}/tech-sovereignty/networking`}
            trackAvailable={true}
          />

          {/* Track B: Self-Hosted Services */}
          <TrackSection
            icon={
              <svg className="w-6 h-6 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            }
            title={t('tracks.selfHosted.title')}
            description={t('tracks.selfHosted.description')}
            projects={selfHostedProjects}
            color="bg-secret/20"
            trackLink={`/${locale}/tech-sovereignty/self-hosted`}
            trackAvailable={true}
          />

          {/* Track C: AI/LLM Independence */}
          <TrackSection
            icon={
              <svg className="w-6 h-6 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
            title={t('tracks.ai.title')}
            description={t('tracks.ai.description')}
            projects={aiProjects}
            color="bg-warm/20"
          />

          {/* Track D: App Development */}
          <TrackSection
            icon={
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
            title={t('tracks.appDev.title')}
            description={t('tracks.appDev.description')}
            projects={appDevProjects}
            color="bg-primary/20"
          />

          {/* Track E: Community Building */}
          <TrackSection
            icon={
              <svg className="w-6 h-6 text-warm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title={t('tracks.community.title')}
            description={t('tracks.community.description')}
            projects={communityProjects}
            color="bg-warm/20"
          />
        </div>
      </section>

      {/* Tools Repository */}
      <section id="tools" className="py-20 px-4 bg-deep-alt">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-4 text-center">
            {t('tools.title')}
          </h2>
          <p className="text-lg text-text-secondary text-center max-w-3xl mx-auto mb-12">
            {t('tools.description')}
          </p>

          <div className="space-y-10">
            {/* Networking Tools */}
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {t('tools.categories.networking')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {networkingTools.map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>

            {/* Self-Hosting Tools */}
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-secret rounded-full"></span>
                {t('tools.categories.selfHosting')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selfHostingTools.map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>

            {/* LLM Tools */}
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-warm rounded-full"></span>
                {t('tools.categories.llm')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {llmTools.map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>

            {/* Development Tools */}
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                {t('tools.categories.dev')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {devTools.map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>

            {/* Hardware */}
            <div>
              <h3 className="text-lg font-semibold text-text-heading mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary/50 rounded-full"></span>
                {t('tools.categories.hardware')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {hardwareTools.map((tool, i) => <ToolCard key={i} tool={tool} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Educators */}
      <section id="educators" className="py-20 px-4 bg-deep-darker">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-6">
                {t('educators.title')}
              </h2>
              <p className="text-text-secondary text-lg mb-6">
                {t('educators.description')}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secret flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-secondary">{t('educators.benefit1')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secret flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-secondary">{t('educators.benefit2')}</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-secret flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-text-secondary">{t('educators.benefit3')}</span>
                </li>
              </ul>
            </div>
            <div className="bg-deep-card rounded-xl p-8 border border-deep-border">
              <h3 className="text-xl font-semibold text-text-heading mb-4">{t('educators.requirements.title')}</h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full"></span>
                  {t('educators.requirements.item1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full"></span>
                  {t('educators.requirements.item2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full"></span>
                  {t('educators.requirements.item3')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-text-muted rounded-full"></span>
                  {t('educators.requirements.item4')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Network */}
      <section id="community" className="py-20 px-4 bg-deep">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-heading mb-6">
            {t('community.title')}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            {t('community.description')}
          </p>
          <div className="bg-deep-card border border-deep-border rounded-xl p-8 max-w-2xl mx-auto hover:border-secret/50 transition-colors">
            <div className="w-16 h-16 bg-secret/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-text-heading mb-2">{t('community.cta.title')}</h3>
            <p className="text-text-secondary mb-6">{t('community.cta.description')}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block bg-secret text-white px-6 py-3 rounded-lg font-semibold hover:bg-secret-light transition-colors"
            >
              {t('community.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
