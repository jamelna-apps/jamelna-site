// components/jobs/JobCard.tsx
'use client';

import { useState } from 'react';
import type { Job, JobStatus } from '@/lib/jobs/types';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { updateJob, generateCoverLetter } from '@/lib/jobs/conductor-client';

interface JobCardProps {
  job: Job;
  onUpdate: () => void;
  expanded?: boolean;
}

const statusColors: Record<JobStatus, { bg: string; text: string }> = {
  new: { bg: 'rgba(255, 255, 255, 0.1)', text: '#D1D1D6' },
  reviewing: { bg: 'rgba(255, 215, 0, 0.15)', text: '#FFD700' },
  applying: { bg: 'rgba(0, 168, 255, 0.15)', text: '#00a8ff' },
  applied: { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa' },
  interviewing: { bg: 'rgba(64, 224, 208, 0.15)', text: '#40E0D0' },
  offer: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981' },
  rejected: { bg: 'rgba(220, 38, 38, 0.15)', text: '#f87171' },
  withdrawn: { bg: 'rgba(107, 114, 128, 0.15)', text: '#6b7280' },
};

export default function JobCard({ job, onUpdate, expanded = false }: JobCardProps) {
  const { sessionToken } = useJobsAuth();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [generatingLetter, setGeneratingLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (!sessionToken) return;
    setUpdatingStatus(true);
    await updateJob(sessionToken, job.id, { status: newStatus });
    setUpdatingStatus(false);
    onUpdate();
  };

  const handleGenerateCoverLetter = async () => {
    if (!sessionToken) return;
    setGeneratingLetter(true);
    const result = await generateCoverLetter(sessionToken, job.id);
    if (result.data) {
      setCoverLetter(result.data.coverLetter);
    }
    setGeneratingLetter(false);
  };

  const matchStyle = job.matchScore >= 80
    ? { bg: 'rgba(64, 224, 208, 0.2)', text: '#40E0D0' }
    : job.matchScore >= 60
      ? { bg: 'rgba(255, 215, 0, 0.2)', text: '#FFD700' }
      : { bg: 'rgba(107, 114, 128, 0.2)', text: '#9ca3af' };

  const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-[rgba(56,56,58,0.3)] transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-medium text-white">{job.title}</h3>
            <p className="text-sm text-[#D1D1D6]">{job.company}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {job.remote && (
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0, 168, 255, 0.2)', color: '#00a8ff' }}>
                  Remote
                </span>
              )}
              <span className="text-xs text-[#636366]">{job.location}</span>
              <span
                className="text-xs px-2 py-0.5 rounded capitalize"
                style={{ background: statusColors[job.status].bg, color: statusColors[job.status].text }}
              >
                {job.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-sm font-medium"
              style={{ background: matchStyle.bg, color: matchStyle.text }}
            >
              {job.matchScore}%
            </span>
            <span className="text-[#636366]">{isExpanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t p-4 space-y-4" style={{ borderColor: 'rgba(56, 56, 58, 0.5)' }}>
          {/* Match Analysis */}
          <div>
            <h4 className="font-medium text-white mb-2">Match Analysis</h4>
            <div className="space-y-1">
              {job.matchReasons.map((reason, i) => (
                <p key={i} className="text-sm text-[#40E0D0]">✓ {reason}</p>
              ))}
              {job.gaps.map((gap, i) => (
                <p key={i} className="text-sm text-[#FFD700]">⚠ {gap}</p>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-white mb-2">Description</h4>
            <p className="text-sm text-[#D1D1D6] whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div>
              <h4 className="font-medium text-white mb-2">Requirements</h4>
              <ul className="list-disc list-inside text-sm text-[#D1D1D6] space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cover Letter */}
          {coverLetter && (
            <div>
              <h4 className="font-medium text-white mb-2">Generated Cover Letter</h4>
              <div className="p-4 rounded-md" style={{ background: 'rgba(56, 56, 58, 0.5)' }}>
                <pre className="text-sm text-[#D1D1D6] whitespace-pre-wrap font-sans">
                  {coverLetter}
                </pre>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(coverLetter)}
                className="mt-2 text-sm text-[#00a8ff] hover:underline"
              >
                Copy to clipboard
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: 'rgba(56, 56, 58, 0.5)' }}>
            <button
              onClick={handleGenerateCoverLetter}
              disabled={generatingLetter}
              className="btn-warm text-sm disabled:opacity-50"
            >
              {generatingLetter ? 'Generating...' : 'Generate Cover Letter'}
            </button>

            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-[#D1D1D6] text-sm rounded hover:text-white transition-colors"
              style={inputStyle}
            >
              View Original →
            </a>

            <select
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
              disabled={updatingStatus}
              className="px-3 py-1.5 text-sm rounded text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
              style={inputStyle}
            >
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="applying">Applying</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
