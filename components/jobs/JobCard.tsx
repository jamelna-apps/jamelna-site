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

const statusColors: Record<JobStatus, string> = {
  new: 'bg-gray-100 text-gray-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  applying: 'bg-blue-100 text-blue-800',
  applied: 'bg-purple-100 text-purple-800',
  interviewing: 'bg-green-100 text-green-800',
  offer: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-600',
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

  const matchColor = job.matchScore >= 80
    ? 'text-green-600 bg-green-50'
    : job.matchScore >= 60
      ? 'text-yellow-600 bg-yellow-50'
      : 'text-gray-600 bg-gray-50';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {job.remote && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  Remote
                </span>
              )}
              <span className="text-xs text-gray-500">{job.location}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${statusColors[job.status]}`}>
                {job.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${matchColor}`}>
              {job.matchScore}%
            </span>
            <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Match Analysis */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Match Analysis</h4>
            <div className="space-y-1">
              {job.matchReasons.map((reason, i) => (
                <p key={i} className="text-sm text-green-700">✓ {reason}</p>
              ))}
              {job.gaps.map((gap, i) => (
                <p key={i} className="text-sm text-yellow-700">⚠ {gap}</p>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cover Letter */}
          {coverLetter && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Generated Cover Letter</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {coverLetter}
                </pre>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(coverLetter)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Copy to clipboard
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
            <button
              onClick={handleGenerateCoverLetter}
              disabled={generatingLetter}
              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {generatingLetter ? 'Generating...' : 'Generate Cover Letter'}
            </button>

            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
            >
              View Original →
            </a>

            <select
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
              disabled={updatingStatus}
              className="px-3 py-1.5 border border-gray-300 text-sm rounded"
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
