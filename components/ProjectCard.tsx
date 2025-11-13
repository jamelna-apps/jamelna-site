'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface ProjectCardProps {
  role: string;
  organization: string;
  timeline: string;
  challenge: string;
  whatIDid: string[];
  impact: string;
  skills: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  role,
  organization,
  timeline,
  challenge,
  whatIDid,
  impact,
  skills,
}) => {
  const t = useTranslations('work');
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-8 mb-12 hover:border-slate-500 transition-colors">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-slate-600 uppercase tracking-wider">
            {role}
          </h3>
          <span className="text-sm text-gray-600">{timeline}</span>
        </div>
        <p className="text-lg text-gray-700">{organization}</p>
      </div>

      {/* The Challenge */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">
          {t('challenge')}
        </h4>
        <p className="text-gray-700 leading-relaxed">{challenge}</p>
      </div>

      {/* What I Did */}
      <div className="mb-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">
          {t('whatIDid')}
        </h4>
        <ul className="space-y-2">
          {whatIDid.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-slate-600 mr-2 mt-1">→</span>
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The Impact */}
      <div className="mb-6 bg-slate-50 border border-slate-200 rounded-lg p-6">
        <h4 className="text-lg font-bold text-gray-900 mb-3">
          {t('impact')}
        </h4>
        <p className="text-gray-700 leading-relaxed">{impact}</p>
      </div>

      {/* Skills Demonstrated */}
      <div>
        <h4 className="text-sm font-bold text-gray-600 uppercase mb-3 tracking-wider">
          {t('skills')}
        </h4>
        <p className="text-gray-700">{skills}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
