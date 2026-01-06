// components/jobs/TailorResumeModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getResumes, tailorResume, createResume } from '@/lib/jobs/conductor-client';
import type { Resume, TailoredResume, Job } from '@/lib/jobs/types';

interface TailorResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

type Step = 'select' | 'tailoring' | 'preview';

export default function TailorResumeModal({ isOpen, onClose, job }: TailorResumeModalProps) {
  const { sessionToken } = useJobsAuth();
  const [step, setStep] = useState<Step>('select');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [tailored, setTailored] = useState<TailoredResume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && sessionToken) {
      loadResumes();
      setStep('select');
      setTailored(null);
      setError(null);
    }
  }, [isOpen, sessionToken]);

  async function loadResumes() {
    if (!sessionToken) return;
    const result = await getResumes(sessionToken);
    if (result.data) {
      setResumes(result.data);
      const defaultResume = result.data.find(r => r.isDefault);
      if (defaultResume) setSelectedResume(defaultResume);
    }
  }

  async function handleTailor() {
    if (!sessionToken || !selectedResume) return;

    setLoading(true);
    setError(null);
    setStep('tailoring');

    const result = await tailorResume(sessionToken, selectedResume.id, job.id);

    if (result.data) {
      setTailored(result.data);
      setStep('preview');
    } else {
      setError(result.error || 'Failed to tailor resume');
      setStep('select');
    }

    setLoading(false);
  }

  async function handleSaveToLibrary() {
    if (!sessionToken || !tailored) return;

    setSaving(true);
    const result = await createResume(sessionToken, {
      name: `${selectedResume?.name} - ${job.company}`,
      content: tailored.content,
      isDefault: false,
      sourceType: 'tailored',
    });

    if (result.data) {
      onClose();
    } else {
      setError(result.error || 'Failed to save');
    }
    setSaving(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl p-6"
        style={{ background: '#1C1C1E' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Tailor Resume for {job.company}
          </h2>
          <button onClick={onClose} className="text-[#636366] hover:text-white text-2xl">
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }}>
            {error}
          </div>
        )}

        {step === 'select' && (
          <div className="space-y-4">
            <p className="text-[#D1D1D6]">Select a base resume to tailor:</p>

            {resumes.length === 0 ? (
              <p className="text-[#636366] text-center py-8">
                No resumes in library. Upload one on your Profile page first.
              </p>
            ) : (
              <div className="space-y-2">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    onClick={() => setSelectedResume(resume)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedResume?.id === resume.id
                        ? 'border-[#00a8ff] bg-[#00a8ff]/10'
                        : 'border-[#38383A] hover:border-[#636366]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white">{resume.name}</span>
                      {resume.isDefault && (
                        <span className="px-2 py-0.5 text-xs rounded bg-[#00a8ff]/20 text-[#00a8ff]">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[#D1D1D6] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleTailor}
                disabled={!selectedResume}
                className="px-6 py-2 rounded-lg bg-[#00a8ff] text-white disabled:opacity-50"
              >
                Tailor Resume
              </button>
            </div>
          </div>
        )}

        {step === 'tailoring' && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#00a8ff] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#D1D1D6]">AI is tailoring your resume...</p>
            <p className="text-sm text-[#636366] mt-2">This may take 10-20 seconds</p>
          </div>
        )}

        {step === 'preview' && tailored && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Changes Made</h3>
              <ul className="list-disc list-inside space-y-1 text-[#D1D1D6] text-sm">
                {tailored.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Tailored Summary</h3>
              <p className="text-[#D1D1D6] text-sm p-3 rounded-lg" style={{ background: 'rgba(56, 56, 58, 0.5)' }}>
                {tailored.content.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[#D1D1D6] hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleSaveToLibrary}
                disabled={saving}
                className="px-4 py-2 rounded-lg border border-[#00a8ff] text-[#00a8ff] hover:bg-[#00a8ff]/10"
              >
                {saving ? 'Saving...' : 'Save to Library'}
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-[#00a8ff] text-white"
                onClick={() => {
                  // TODO: Implement PDF download
                  alert('PDF download coming soon');
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
