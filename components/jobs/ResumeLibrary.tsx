// components/jobs/ResumeLibrary.tsx
'use client';

import { useState, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getResumes, deleteResume, uploadResumePdf } from '@/lib/jobs/conductor-client';
import type { Resume } from '@/lib/jobs/types';

interface ResumeLibraryProps {
  onSelect?: (resume: Resume) => void;
  selectable?: boolean;
}

export default function ResumeLibrary({ onSelect, selectable = false }: ResumeLibraryProps) {
  const { sessionToken } = useJobsAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResumes();
  }, [sessionToken]);

  async function loadResumes() {
    if (!sessionToken) return;
    setLoading(true);
    const result = await getResumes(sessionToken);
    if (result.data) {
      setResumes(result.data);
    } else if (result.error) {
      setError(result.error);
    }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !sessionToken) return;

    setUploading(true);
    setError(null);

    const name = file.name.replace(/\.pdf$/i, '');
    const result = await uploadResumePdf(sessionToken, file, name);

    if (result.data) {
      setResumes([...resumes, result.data]);
    } else if (result.error) {
      setError(result.error);
    }

    setUploading(false);
    e.target.value = '';
  }

  async function handleDelete(resumeId: string) {
    if (!sessionToken) return;
    if (!confirm('Delete this resume version?')) return;

    const result = await deleteResume(sessionToken, resumeId);
    if (result.data?.success) {
      setResumes(resumes.filter(r => r.id !== resumeId));
    } else if (result.error) {
      setError(result.error);
    }
  }

  if (loading) {
    return <div className="text-[#636366] py-4">Loading resumes...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Resume Library</h3>
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <span
            className="px-4 py-2 text-sm rounded-lg bg-[#00a8ff] text-white hover:bg-[#0090dd] transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload PDF'}
          </span>
        </label>
      </div>

      {error && (
        <div className="p-3 rounded-md text-sm" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }}>
          {error}
        </div>
      )}

      {resumes.length === 0 ? (
        <div className="text-center py-8 text-[#636366]">
          <p>No resumes yet</p>
          <p className="text-sm mt-1">Upload a PDF to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className={`p-4 rounded-lg border transition-colors ${
                selectable ? 'cursor-pointer hover:border-[#00a8ff]' : ''
              }`}
              style={{ background: 'rgba(56, 56, 58, 0.5)', borderColor: 'rgba(56, 56, 58, 0.8)' }}
              onClick={() => selectable && onSelect?.(resume)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{resume.name}</span>
                    {resume.isDefault && (
                      <span className="px-2 py-0.5 text-xs rounded bg-[#00a8ff]/20 text-[#00a8ff]">
                        Default
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-xs rounded bg-[#636366]/20 text-[#636366]">
                      {resume.sourceType}
                    </span>
                  </div>
                  <div className="text-sm text-[#636366] mt-1">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resume.pdfUrl && (
                    <a
                      href={resume.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm text-[#00a8ff] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View PDF
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(resume.id);
                    }}
                    className="px-2 py-1 text-sm text-[#f87171] hover:text-[#fca5a5]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
