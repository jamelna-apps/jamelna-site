import React from 'react';

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
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700 p-8 mb-12 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase">
            {role}
          </h3>
          <span className="text-sm text-neutral-500 dark:text-neutral-400">{timeline}</span>
        </div>
        <p className="text-lg text-neutral-700 dark:text-neutral-300">{organization}</p>
      </div>

      {/* The Challenge */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-primary-900 dark:text-primary-400 mb-3">
          The Challenge
        </h4>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">{challenge}</p>
      </div>

      {/* What I Did */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-primary-900 dark:text-primary-400 mb-3">
          What I Did
        </h4>
        <ul className="space-y-2">
          {whatIDid.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-accent-500 dark:text-accent-400 mr-2 mt-1">→</span>
              <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* The Impact */}
      <div className="mb-6 bg-secondary-50 dark:bg-secondary-500/10 border-l-4 border-secondary-500 dark:border-secondary-400 p-6 rounded-r-lg">
        <h4 className="text-xl font-bold text-primary-900 dark:text-primary-400 mb-3">
          The Impact
        </h4>
        <p className="text-neutral-700 dark:text-neutral-200 leading-relaxed">{impact}</p>
      </div>

      {/* Skills Demonstrated */}
      <div>
        <h4 className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase mb-3">
          Skills Demonstrated
        </h4>
        <p className="text-neutral-700 dark:text-neutral-300">{skills}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
