'use client';

import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import { useTranslations } from 'next-intl';

export default function WorkPage() {
  const t = useTranslations('work');
  const projects = t.raw('projects') as Array<{
    title: string;
    role: string;
    organization: string;
    timeline: string;
    challenge: string;
    whatIDid: string[];
    impact: string;
    skills: string;
  }>;

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-zinc-900 to-zinc-950"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            <span className="text-blue-400">/</span> {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      {/* Project Cards */}
      <section className="py-12 px-4 bg-zinc-950">
        <div className="max-w-5xl mx-auto space-y-12">
          {projects.map((project, index) => {
            const projectId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

            return (
              <div key={index} id={projectId} className="scroll-mt-20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-12 bg-orange-500"></div>
                  <h2 className="text-3xl font-display font-bold text-white">
                    {project.title}
                  </h2>
                </div>
                <ProjectCard {...project} />
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
