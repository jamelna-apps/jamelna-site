'use client';

import React from 'react';
import ProjectCard from '@/components/ProjectCard';
import CompactProjectCard from '@/components/CompactProjectCard';
import { useTranslations } from 'next-intl';

interface Project {
  title: string;
  role: string;
  organization: string;
  timeline: string;
  funding?: string;
  fundingUrl?: string;
  challenge: string;
  whatIDid: string[];
  impact: string;
  skills: string;
  images?: string[];
  website?: string;
  category: string;
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl md:text-3xl font-display font-bold text-text-heading mb-2">
        {title}
      </h2>
      <p className="text-text-secondary text-lg">{description}</p>
      <div className="w-16 h-0.5 bg-terra mt-4" />
    </div>
  );
}

// Desired order within each category (by title substring match)
const professionalOrder = ['SceneCraft', 'SCRIPT', 'CS4All', 'CS Coaching'];
const productsOrder = ['GYST', 'CoachDesk', 'CodeTale', 'SMARTIE'];
const creativeOrder = ['ForEveryBomb', 'Earth', 'Spread'];

function sortByPreference(projects: Project[], order: string[]): Project[] {
  return [...projects].sort((a, b) => {
    const aIdx = order.findIndex(key => a.title.includes(key));
    const bIdx = order.findIndex(key => b.title.includes(key));
    return (aIdx === -1 ? 999 : aIdx) - (bIdx === -1 ? 999 : bIdx);
  });
}

export default function WorkPage() {
  const t = useTranslations('work');
  const projects = t.raw('projects') as Project[];

  const professional = sortByPreference(
    projects.filter(p => p.category === 'professional'),
    professionalOrder
  );
  const products = sortByPreference(
    projects.filter(p => p.category === 'products'),
    productsOrder
  );
  const creative = sortByPreference(
    projects.filter(p => p.category === 'creative'),
    creativeOrder
  );

  return (
    <main className="min-h-screen bg-canvas pt-16">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-canvas to-canvas-deep"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 opacity-30 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4), transparent)' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-heading mb-6">
            <span className="text-ink">/</span> {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">

          {/* Professional Experience */}
          <div className="mb-20" id="professional">
            <SectionHeader
              title={t('sectionProfessional')}
              description={t('sectionProfessionalDesc')}
            />
            <div className="space-y-12">
              {professional.map((project, index) => {
                const projectId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <div key={index} id={projectId} className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-12 bg-terra"></div>
                      <h3 className="text-3xl font-display font-bold text-text-heading">
                        {project.title}
                      </h3>
                    </div>
                    <ProjectCard {...project} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Products I've Built */}
          <div className="mb-20" id="products">
            <SectionHeader
              title={t('sectionProducts')}
              description={t('sectionProductsDesc')}
            />
            <div className="space-y-12">
              {products.map((project, index) => {
                const projectId = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <div key={index} id={projectId} className="scroll-mt-20">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1 h-12 bg-primary"></div>
                      <h3 className="text-3xl font-display font-bold text-text-heading">
                        {project.title}
                      </h3>
                    </div>
                    <ProjectCard {...project} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Creative Projects - Compact Grid */}
          <div id="creative">
            <SectionHeader
              title={t('sectionCreative')}
              description={t('sectionCreativeDesc')}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {creative.map((project, index) => (
                <CompactProjectCard key={index} {...project} />
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
