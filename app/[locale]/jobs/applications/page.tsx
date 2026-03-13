// app/[locale]/jobs/applications/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import KanbanBoard from '@/components/jobs/KanbanBoard';
import ApplicationDetailsPanel from '@/components/jobs/ApplicationDetailsPanel';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getJobs, updateJob } from '@/lib/jobs/conductor-client';
import type { Job, JobStatus } from '@/lib/jobs/types';

const APPLIED_STATUSES: JobStatus[] = ['applied', 'interviewing', 'offer', 'rejected', 'withdrawn'];

function ApplicationsContent() {
  const { sessionToken } = useJobsAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const loadJobs = useCallback(async () => {
    if (!sessionToken) return;
    setLoading(true);
    const result = await getJobs(sessionToken);
    if (result.data) {
      setJobs(result.data.filter(j => APPLIED_STATUSES.includes(j.status)));
    }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleStatusChange = async (jobId: string, newStatus: JobStatus) => {
    if (!sessionToken) return;
    await updateJob(sessionToken, jobId, { status: newStatus });
    await loadJobs();
    // Update selected job if it was the one moved
    if (selectedJob?.id === jobId) {
      const updated = jobs.find(j => j.id === jobId);
      if (updated) setSelectedJob({ ...updated, status: newStatus });
    }
  };

  const handleCardClick = (job: Job) => {
    setSelectedJob(job);
  };

  const handlePanelUpdate = async () => {
    await loadJobs();
    // Refresh selected job data
    if (selectedJob) {
      const result = await getJobs(sessionToken!);
      if (result.data) {
        const updated = result.data.find(j => j.id === selectedJob.id);
        if (updated) setSelectedJob(updated);
      }
    }
  };

  // Stats
  const applied = jobs.filter(j => j.status === 'applied').length;
  const interviewing = jobs.filter(j => j.status === 'interviewing').length;
  const offers = jobs.filter(j => j.status === 'offer').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Applications</h1>
        <p className="text-[#D1D1D6]">
          {applied} applied, {interviewing} interviewing, {offers} offer{offers !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Kanban Board */}
      {loading ? (
        <div className="text-center py-16 text-[#636366]">Loading applications...</div>
      ) : jobs.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-[#D1D1D6] text-lg mb-2">No applications yet</p>
          <p className="text-[#636366] text-sm">
            Mark a job as &quot;Applied&quot; from the All Jobs page to start tracking your pipeline.
          </p>
        </div>
      ) : (
        <KanbanBoard
          jobs={jobs}
          onStatusChange={handleStatusChange}
          onCardClick={handleCardClick}
        />
      )}

      {/* Details Panel */}
      <ApplicationDetailsPanel
        job={selectedJob}
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        onUpdate={handlePanelUpdate}
      />
    </div>
  );
}

export default function ApplicationsPage() {
  return (
    <AuthGuard>
      <ApplicationsContent />
    </AuthGuard>
  );
}
