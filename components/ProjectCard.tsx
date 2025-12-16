'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface ProjectCardProps {
  role: string;
  organization: string;
  timeline: string;
  challenge: string;
  whatIDid: string[];
  impact: string;
  skills: string;
  images?: string[];
  website?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  role,
  organization,
  timeline,
  challenge,
  whatIDid,
  impact,
  skills,
  images,
  website,
}) => {
  const t = useTranslations('work');
  return (
    <div className="glass-card p-8 mb-12">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between mb-2 gap-4">
          <h3 className="text-sm font-bold text-warm uppercase tracking-wider font-mono">
            {role}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">{timeline}</span>
            {website && (
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-sm py-2"
              >
                Visit Site
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
        <p className="text-lg text-text-secondary">{organization}</p>
      </div>

      {/* Screenshot Gallery */}
      {images && images.length > 0 && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-deep-border hover:border-primary/50 transition-colors group cursor-pointer"
              >
                <Image
                  src={image}
                  alt={`Screenshot ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The Challenge */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-warm mb-3">
          {t('challenge')}
        </h4>
        <p className="text-text-secondary leading-relaxed">{challenge}</p>
      </div>

      {/* What I Did */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-primary mb-3">
          {t('whatIDid')}
        </h4>
        <ul className="space-y-2">
          {whatIDid.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary mr-2 mt-1">→</span>
              <span className="text-text-secondary">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The Impact */}
      <div className="mb-6 bg-deep-card border border-deep-border rounded-lg p-6">
        <h4 className="text-lg font-bold text-text-heading mb-3">
          {t('impact')}
        </h4>
        <p className="text-text-secondary leading-relaxed">{impact}</p>
      </div>

      {/* Skills Demonstrated */}
      <div>
        <h4 className="text-sm font-bold text-warm uppercase mb-3 tracking-wider font-mono">
          {t('skills')}
        </h4>
        <p className="text-text-secondary">{skills}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
