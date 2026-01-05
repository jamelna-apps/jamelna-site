// app/[locale]/jobs/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import AddJobModal from '@/components/jobs/AddJobModal';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getJobs } from '@/lib/jobs/conductor-client';
import type { Job } from '@/lib/jobs/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DashboardContent() {
  const { sessionToken } = useJobsAuth();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadJobs = useCallback(async () => {
    if (!sessionToken) return;

    setLoading(true);
    const result = await getJobs(sessionToken);
    if (result.data) {
      setJobs(result.data);
    }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Calculate stats
  const newJobs = jobs.filter(j => j.status === 'new');
  const appliedJobs = jobs.filter(j => j.status === 'applied');
  const interviewingJobs = jobs.filter(j => j.status === 'interviewing');
  const highMatchJobs = jobs.filter(j => j.matchScore >= 80 && j.status === 'new');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Your job search at a glance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Add Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">New Jobs</p>
          <p className="text-3xl font-bold text-gray-900">{newJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Applied</p>
          <p className="text-3xl font-bold text-blue-600">{appliedJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Interviewing</p>
          <p className="text-3xl font-bold text-green-600">{interviewingJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">High Match (80%+)</p>
          <p className="text-3xl font-bold text-purple-600">{highMatchJobs.length}</p>
        </div>
      </div>

      {/* High Match Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">High Match Jobs</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : highMatchJobs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No high-match jobs yet.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Add your first job posting
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {highMatchJobs.slice(0, 5).map((job) => (
              <li key={job.id} className="p-4 hover:bg-gray-50">
                <Link href={`/${locale}/jobs/all?id=${job.id}`} className="block">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {job.matchScore}% match
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {job.remote && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Remote
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{job.location}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href={`/${locale}/jobs/all`}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <h3 className="font-medium text-gray-900">View All Jobs</h3>
          <p className="text-sm text-gray-500">Browse and filter all saved jobs</p>
        </Link>
        <Link
          href={`/${locale}/jobs/profile`}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Update Profile</h3>
          <p className="text-sm text-gray-500">Improve your match accuracy</p>
        </Link>
        <Link
          href={`/${locale}/jobs/all?status=applied`}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Track Applications</h3>
          <p className="text-sm text-gray-500">View applied jobs</p>
        </Link>
      </div>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onJobAdded={loadJobs}
      />
    </div>
  );
}

export default function JobsDashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
