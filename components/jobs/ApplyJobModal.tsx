// components/jobs/ApplyJobModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { markJobAsApplied, getResumes } from '@/lib/jobs/conductor-client';
import type { Job, Resume } from '@/lib/jobs/types';

interface ApplyJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
  onApplied: () => void;
}

export default function ApplyJobModal({ isOpen, onClose, job, onApplied }: ApplyJobModalProps) {
  const { sessionToken } = useJobsAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);

  const [appliedDate, setAppliedDate] = useState(new Date().toISOString().split('T')[0]);
  const [submittedVia, setSubmittedVia] = useState<'company_site' | 'linkedin' | 'email' | 'other'>('company_site');
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (!isOpen || !sessionToken) return;

    async function loadResumes() {
      const result = await getResumes(sessionToken!);
      if (result.data) {
        setResumes(result.data);
        const defaultResume = result.data.find(r => r.isDefault);
        if (defaultResume) setSelectedResumeId(defaultResume.id);
      }
    }

    loadResumes();
  }, [isOpen, sessionToken]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken) return;

    setLoading(true);
    setError(null);

    const selectedResume = resumes.find(r => r.id === selectedResumeId);

    const result = await markJobAsApplied(sessionToken, job.id, {
      appliedDate,
      submittedVia,
      resumeId: selectedResumeId || undefined,
      resumeName: selectedResume?.name,
      coverLetter: coverLetter.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setLoading(false);
    onApplied();
    onClose();
  };

  const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-70 transition-opacity backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative rounded-2xl shadow-xl max-w-lg w-full p-6" style={{ background: 'rgba(44, 44, 46, 0.95)', border: '1px solid rgba(56, 56, 58, 0.5)' }}>
          <h2 className="text-lg font-semibold text-white mb-1">
            Mark as Applied
          </h2>
          <p className="text-sm text-[#636366] mb-4">
            {job.title} at {job.company}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date Applied */}
            <div>
              <label htmlFor="appliedDate" className="block text-sm font-medium text-[#D1D1D6] mb-1">
                Date Applied
              </label>
              <input
                type="date"
                id="appliedDate"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                className="w-full px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={inputStyle}
                required
              />
            </div>

            {/* Submitted Via */}
            <div>
              <label htmlFor="submittedVia" className="block text-sm font-medium text-[#D1D1D6] mb-1">
                Submitted Via
              </label>
              <select
                id="submittedVia"
                value={submittedVia}
                onChange={(e) => setSubmittedVia(e.target.value as typeof submittedVia)}
                className="w-full px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={inputStyle}
              >
                <option value="company_site">Company Website</option>
                <option value="linkedin">LinkedIn</option>
                <option value="email">Email</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Resume Used */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-[#D1D1D6] mb-1">
                Resume Used
              </label>
              <select
                id="resume"
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                className="w-full px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={inputStyle}
              >
                <option value="">None selected</option>
                {resumes.map(resume => (
                  <option key={resume.id} value={resume.id}>
                    {resume.name}{resume.isDefault ? ' (Default)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Cover Letter */}
            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-[#D1D1D6] mb-1">
                Cover Letter
              </label>
              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Paste the cover letter you submitted..."
                rows={4}
                className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff] resize-none"
                style={inputStyle}
              />
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-[#D1D1D6] mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any extra context about this application..."
                rows={2}
                className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff] resize-none"
                style={inputStyle}
              />
            </div>

            {error && (
              <div className="p-3 rounded-md text-sm" style={{ background: 'rgba(220, 38, 38, 0.2)', border: '1px solid rgba(220, 38, 38, 0.3)', color: '#fca5a5' }}>
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[#D1D1D6] hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-warm disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Mark as Applied'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
