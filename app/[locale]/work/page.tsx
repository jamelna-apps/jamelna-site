'use client';

import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import PageWrapper from '@/components/PageWrapper';
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
    <PageWrapper>
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {t('title')}
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          {t('description')}
        </p>
      </div>

      {/* Project Cards */}
      {projects.map((project, index) => {
        // Create URL-friendly ID from project title
        const projectId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

        return (
          <div key={index} id={projectId} className="scroll-mt-20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-slate-600"></div>
              <h2 className="text-3xl font-bold text-gray-900">
                {project.title}
              </h2>
            </div>
            <ProjectCard {...project} />
          </div>
        );
      })}
    </PageWrapper>
  );
}
