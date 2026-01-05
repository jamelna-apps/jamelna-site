// components/jobs/AddJobModal.tsx
'use client';

import { useState } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { addJobFromUrl } from '@/lib/jobs/conductor-client';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: () => void;
}

export default function AddJobModal({ isOpen, onClose, onJobAdded }: AddJobModalProps) {
  const { sessionToken } = useJobsAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken || !url.trim()) return;

    setLoading(true);
    setError(null);

    const result = await addJobFromUrl(sessionToken, url.trim());

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setUrl('');
    setLoading(false);
    onJobAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add Job from URL
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Job Posting URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://company.com/careers/job-title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Paste any job posting URL. AI will extract the details.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
