'use client';

import React from 'react';
import Image from 'next/image';

interface CompactProjectCardProps {
  title: string;
  role: string;
  organization: string;
  timeline: string;
  challenge: string;
  skills: string;
  images?: string[];
  website?: string;
}

const CompactProjectCard: React.FC<CompactProjectCardProps> = ({
  title,
  role: _role,
  organization: _organization,
  timeline,
  challenge,
  skills,
  images,
  website,
}) => {
  const Wrapper = website ? 'a' : 'div';
  const wrapperProps = website
    ? { href: website, target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper {...wrapperProps} className="glass-card p-6 flex flex-col h-full group hover:border-primary/30 transition-colors cursor-pointer">
      {/* Image */}
      {images && images.length > 0 && (
        <div className="relative aspect-video rounded-lg overflow-hidden border border-canvas-border mb-4">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Title & Timeline */}
      <div className="mb-3">
        <h3 className="text-xl font-display font-bold text-text-heading mb-1 group-hover:text-primary transition-colors">
          {title}
          {website && (
            <svg className="w-4 h-4 inline-block ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          )}
        </h3>
        <p className="text-sm text-text-muted">{timeline}</p>
      </div>

      {/* One-line description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
        {challenge}
      </p>

      {/* Skills tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {skills.split(',').slice(0, 4).map((skill, i) => (
          <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-text-muted border border-canvas-border">
            {skill.trim()}
          </span>
        ))}
      </div>

      {/* Link */}
      {website && (
        <span className="text-sm text-primary group-hover:text-primary/80 transition-colors inline-flex items-center gap-1 mt-auto">
          Visit Site
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </span>
      )}
    </Wrapper>
  );
};

export default CompactProjectCard;
