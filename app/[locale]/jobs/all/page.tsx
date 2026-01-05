// app/[locale]/jobs/all/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import JobCard from '@/components/jobs/JobCard';
import AddJobModal from '@/components/jobs/AddJobModal';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getJobs } from '@/lib/jobs/conductor-client';
import type { Job, JobStatus } from '@/lib/jobs/types';

function AllJobsContent() {
  const { sessionToken } = useJobsAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');
  const [minScore, setMinScore] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Apply filters
  const filteredJobs = jobs.filter(job => {
    if (statusFilter !== 'all' && job.status !== statusFilter) return false;
    if (job.matchScore < minScore) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!job.title.toLowerCase().includes(query) &&
          !job.company.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
          <p className="text-gray-600">{filteredJobs.length} jobs found</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-wrap gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Title or company..."
            className="px-3 py-1.5 border border-gray-300 rounded text-sm w-48"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'all')}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="applying">Applying</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Min Match Score</label>
          <select
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
          >
            <option value={0}>Any</option>
            <option value={60}>60%+</option>
            <option value={70}>70%+</option>
            <option value={80}>80%+</option>
            <option value={90}>90%+</option>
          </select>
        </div>
      </div>

      {/* Job List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No jobs found matching your filters.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-2 text-blue-600 hover:underline"
          >
            Add a job posting
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onUpdate={loadJobs} />
          ))}
        </div>
      )}

      <AddJobModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onJobAdded={loadJobs}
      />
    </div>
  );
}

export default function AllJobsPage() {
  return (
    <AuthGuard>
      <AllJobsContent />
    </AuthGuard>
  );
}
