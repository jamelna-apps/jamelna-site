'use client';

import React from 'react';

export type Pathway = 'robotics' | 'cybersecurity' | 'ai' | 'dataScience' | 'webDev' | 'gameDev';

interface PathwaySelectorProps {
  selectedPathways: Pathway[];
  onChange: (pathways: Pathway[]) => void;
  labels: Record<Pathway, string>;
}

const pathwayIcons: Record<Pathway, string> = {
  robotics: '🤖',
  cybersecurity: '🔒',
  ai: '🧠',
  dataScience: '📊',
  webDev: '🌐',
  gameDev: '🎮',
};

const PathwaySelector: React.FC<PathwaySelectorProps> = ({
  selectedPathways,
  onChange,
  labels,
}) => {
  const pathways: Pathway[] = ['robotics', 'cybersecurity', 'ai', 'dataScience', 'webDev', 'gameDev'];

  const togglePathway = (pathway: Pathway) => {
    if (selectedPathways.includes(pathway)) {
      onChange(selectedPathways.filter((p) => p !== pathway));
    } else {
      onChange([...selectedPathways, pathway]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {pathways.map((pathway) => {
        const isSelected = selectedPathways.includes(pathway);
        return (
          <button
            key={pathway}
            type="button"
            onClick={() => togglePathway(pathway)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              isSelected
                ? 'border-slate-600 bg-slate-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className="text-2xl mb-2 block">{pathwayIcons[pathway]}</span>
            <span className={`text-sm font-medium ${isSelected ? 'text-slate-700' : 'text-gray-700'}`}>
              {labels[pathway]}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default PathwaySelector;
