// components/jobs/CompanyResearchPanel.tsx
'use client';

import { useState } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { researchCompany } from '@/lib/jobs/conductor-client';
import type { CompanyResearch } from '@/lib/jobs/types';

interface CompanyResearchPanelProps {
  company: string;
  jobId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyResearchPanel({
  company,
  jobId,
  isOpen,
  onClose
}: CompanyResearchPanelProps) {
  const { sessionToken } = useJobsAuth();
  const [research, setResearch] = useState<CompanyResearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResearch() {
    if (!sessionToken) return;

    setLoading(true);
    setError(null);

    const result = await researchCompany(sessionToken, company, jobId);

    if (result.data) {
      setResearch(result.data);
    } else {
      setError(result.error || 'Failed to research company');
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 h-full w-[400px] z-50 overflow-y-auto shadow-xl"
      style={{ background: '#1C1C1E' }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Research: {company}</h2>
          <button onClick={onClose} className="text-[#636366] hover:text-white text-2xl">
            &times;
          </button>
        </div>

        {!research && !loading && (
          <div className="text-center py-12">
            <p className="text-[#D1D1D6] mb-4">
              Get AI-powered insights about {company}
            </p>
            <button
              onClick={handleResearch}
              className="px-6 py-3 rounded-lg bg-[#00a8ff] text-white"
            >
              Research Company
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#00a8ff] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#D1D1D6]">Researching {company}...</p>
            <p className="text-sm text-[#636366] mt-2">Searching reviews, salary data, and more</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-md mb-4" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }}>
            {error}
            <button
              onClick={handleResearch}
              className="block mt-2 text-sm underline"
            >
              Try again
            </button>
          </div>
        )}

        {research && (
          <div className="space-y-6">
            {research.fromCache && (
              <p className="text-xs text-[#636366]">
                Cached {new Date(research.updatedAt).toLocaleDateString()}
              </p>
            )}

            <Section title="Overview" content={research.research.overview} />
            <Section title="Salary" content={research.research.salary} />
            <Section title="Culture" content={research.research.culture} />
            <Section title="Interview Process" content={research.research.interviews} />

            {research.sources.length > 0 && (
              <div>
                <h3 className="font-semibold text-white mb-2">Sources</h3>
                <ul className="space-y-1">
                  {research.sources.slice(0, 5).map((source, i) => (
                    <li key={i}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#00a8ff] hover:underline truncate block"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleResearch}
              className="w-full py-2 text-sm text-[#636366] hover:text-white"
            >
              Refresh Research
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string | null }) {
  if (!content) return null;

  return (
    <div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-[#D1D1D6] text-sm">{content}</p>
    </div>
  );
}
