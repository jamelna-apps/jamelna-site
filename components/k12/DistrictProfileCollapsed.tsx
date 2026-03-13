'use client';

import React from 'react';

interface DistrictProfileCollapsedProps {
  onStartAssessment: () => void;
  labels: {
    title: string;
    description: string;
    button: string;
  };
}

const DistrictProfileCollapsed: React.FC<DistrictProfileCollapsedProps> = ({
  onStartAssessment,
  labels,
}) => {
  return (
    <div className="bg-zinc-800 border border-blue-500/30 rounded-xl p-8 hover:border-blue-500/60 transition-all">
      <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6">
        <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {labels.title}
      </h3>
      <p className="text-zinc-300 mb-6">
        {labels.description}
      </p>
      <button
        onClick={onStartAssessment}
        className="inline-flex items-center text-blue-400 font-medium hover:text-blue-300 transition-colors"
      >
        {labels.button}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default DistrictProfileCollapsed;
