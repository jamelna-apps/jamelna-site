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
      <hr className="heading-rule" />
      <h2 className="text-display-section font-display font-extrabold text-text-heading mb-2">
        {title}
      </h2>
      <p className="text-text-secondary text-lg">{description}</p>
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
      <section className="pt-32 pb-16 px-6 bg-canvas-deep">
        <div className="max-w-5xl mx-auto">
          <hr className="heading-rule" />
          <h1 className="text-display-section font-display text-text-heading mb-4">
            <span className="font-light">Selected</span>{' '}
            <span className="font-extrabold">{t('title')}</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl">
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
                      <div className="w-1 h-12 bg-ink"></div>
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
