// app/[locale]/jobs/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import AddJobModal from '@/components/jobs/AddJobModal';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getJobs, getDiscoveredJobs, scanJobs } from '@/lib/jobs/conductor-client';
import type { Job, DiscoveredJob, ScanResult } from '@/lib/jobs/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DashboardContent() {
  const { sessionToken } = useJobsAuth();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [discoveredJobs, setDiscoveredJobs] = useState<DiscoveredJob[]>([]);
  const [scanning, setScanning] = useState(false);
  const [lastScanResult, setLastScanResult] = useState<ScanResult | null>(null);

  const loadJobs = useCallback(async () => {
    if (!sessionToken) return;

    setLoading(true);
    const result = await getJobs(sessionToken);
    if (result.data) {
      setJobs(result.data);
    }
    setLoading(false);
  }, [sessionToken]);

  const loadDiscoveredJobs = useCallback(async () => {
    if (!sessionToken) return;
    const result = await getDiscoveredJobs(sessionToken, { status: 'new', minMatchScore: 50 });
    if (result.data) {
      // Filter to jobs discovered in last 24 hours
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayJobs = result.data.filter(job =>
        new Date(job.discoveredAt) >= today
      );
      setDiscoveredJobs(todayJobs);
    }
  }, [sessionToken]);

  const handleScanNow = async () => {
    if (!sessionToken) return;
    setScanning(true);
    const result = await scanJobs(sessionToken);
    if (result.data) {
      setLastScanResult(result.data);
      await loadDiscoveredJobs(); // Refresh list after scan
    }
    setScanning(false);
  };

  useEffect(() => {
    loadJobs();
    loadDiscoveredJobs();
  }, [loadJobs, loadDiscoveredJobs]);

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
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-[#D1D1D6]">Your job search at a glance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-warm flex items-center gap-2"
        >
          <span>+</span> Add Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <p className="text-sm text-[#636366]">New Jobs</p>
          <p className="text-3xl font-bold text-white">{newJobs.length}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-[#636366]">Applied</p>
          <p className="text-3xl font-bold text-[#00a8ff]">{appliedJobs.length}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-[#636366]">Interviewing</p>
          <p className="text-3xl font-bold text-[#40E0D0]">{interviewingJobs.length}</p>
        </div>
        <div className="glass-card p-6">
          <p className="text-sm text-[#636366]">High Match (80%+)</p>
          <p className="text-3xl font-bold text-[#C9704D]">{highMatchJobs.length}</p>
        </div>
      </div>

      {/* Today's Matches Section */}
      <section className="glass-card p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-white">Today's Matches</h2>
            <p className="text-sm text-[#636366]">
              {discoveredJobs.length} new jobs found
            </p>
          </div>
          <button
            onClick={handleScanNow}
            disabled={scanning}
            className="px-4 py-2 text-sm rounded-lg bg-[#00a8ff]/20 text-[#00a8ff] hover:bg-[#00a8ff]/30 disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>

        {/* Show scan result if available */}
        {lastScanResult && (
          <div className="mb-4 p-3 rounded-lg bg-[#40E0D0]/10 text-[#40E0D0] text-sm">
            Found {lastScanResult.newJobs} new jobs ({lastScanResult.duplicatesSkipped} duplicates skipped)
          </div>
        )}

        {/* Job cards */}
        <div className="space-y-3">
          {discoveredJobs.slice(0, 5).map(job => (
            <div key={job.id} className="p-4 rounded-lg" style={{ background: 'rgba(56, 56, 58, 0.3)' }}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{job.title}</h3>
                  <p className="text-sm text-[#D1D1D6]">{job.company}</p>
                  <p className="text-xs text-[#636366]">
                    {job.remote ? 'Remote' : job.location} • {job.source}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    job.matchScore >= 80 ? 'text-[#40E0D0]' :
                    job.matchScore >= 60 ? 'text-[#00a8ff]' : 'text-[#636366]'
                  }`}>
                    {job.matchScore}% match
                  </span>
                </div>
              </div>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-[#00a8ff] hover:underline"
              >
                View Job →
              </a>
            </div>
          ))}

          {discoveredJobs.length > 5 && (
            <a href="./jobs/all" className="block text-center text-sm text-[#00a8ff] hover:underline py-2">
              View All {discoveredJobs.length} Jobs →
            </a>
          )}

          {discoveredJobs.length === 0 && !scanning && (
            <p className="text-center text-[#636366] py-4">
              No new matches today. Click "Scan Now" to search for jobs.
            </p>
          )}
        </div>
      </section>

      {/* High Match Jobs */}
      <div className="glass-card">
        <div className="p-4 border-b" style={{ borderColor: 'rgba(56, 56, 58, 0.5)' }}>
          <h2 className="font-semibold text-white">High Match Jobs</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-[#636366]">Loading...</div>
        ) : highMatchJobs.length === 0 ? (
          <div className="p-8 text-center text-[#636366]">
            <p>No high-match jobs yet.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-2 text-[#00a8ff] hover:underline"
            >
              Add your first job posting
            </button>
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: 'rgba(56, 56, 58, 0.5)' }}>
            {highMatchJobs.slice(0, 5).map((job) => (
              <li key={job.id} className="p-4 hover:bg-[rgba(56,56,58,0.3)] transition-colors">
                <Link href={`/${locale}/jobs/all?id=${job.id}`} className="block">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-white">{job.title}</p>
                      <p className="text-sm text-[#D1D1D6]">{job.company}</p>
                    </div>
                    <span className="px-2 py-1 text-sm rounded-full" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40E0D0' }}>
                      {job.matchScore}% match
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {job.remote && (
                      <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0, 168, 255, 0.2)', color: '#00a8ff' }}>
                        Remote
                      </span>
                    )}
                    <span className="text-xs text-[#636366]">{job.location}</span>
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
          className="glass-card p-4"
        >
          <h3 className="font-medium text-white">View All Jobs</h3>
          <p className="text-sm text-[#636366]">Browse and filter all saved jobs</p>
        </Link>
        <Link
          href={`/${locale}/jobs/profile`}
          className="glass-card p-4"
        >
          <h3 className="font-medium text-white">Update Profile</h3>
          <p className="text-sm text-[#636366]">Improve your match accuracy</p>
        </Link>
        <Link
          href={`/${locale}/jobs/all?status=applied`}
          className="glass-card p-4"
        >
          <h3 className="font-medium text-white">Track Applications</h3>
          <p className="text-sm text-[#636366]">View applied jobs</p>
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
