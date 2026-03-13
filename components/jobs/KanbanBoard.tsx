// components/jobs/KanbanBoard.tsx
'use client';

import { useState } from 'react';
import type { Job, JobStatus } from '@/lib/jobs/types';

interface KanbanBoardProps {
  jobs: Job[];
  onStatusChange: (jobId: string, newStatus: JobStatus) => Promise<void>;
  onCardClick: (job: Job) => void;
}

const columns: { status: JobStatus; label: string; color: string; bg: string }[] = [
  { status: 'applied', label: 'Applied', color: '#a78bfa', bg: 'rgba(139, 92, 246, 0.15)' },
  { status: 'interviewing', label: 'Interviewing', color: '#40E0D0', bg: 'rgba(64, 224, 208, 0.15)' },
  { status: 'offer', label: 'Offer', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
  { status: 'rejected', label: 'Rejected', color: '#f87171', bg: 'rgba(220, 38, 38, 0.15)' },
];

function relativeDate(dateStr?: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export default function KanbanBoard({ jobs, onStatusChange, onCardClick }: KanbanBoardProps) {
  const [dragOverColumn, setDragOverColumn] = useState<JobStatus | null>(null);
  const [movingJobId, setMovingJobId] = useState<string | null>(null);
  const [collapsedColumns, setCollapsedColumns] = useState<Set<JobStatus>>(new Set());

  const handleDragStart = (e: React.DragEvent, jobId: string) => {
    e.dataTransfer.setData('text/plain', jobId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, status: JobStatus) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(status);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, newStatus: JobStatus) => {
    e.preventDefault();
    setDragOverColumn(null);
    const jobId = e.dataTransfer.getData('text/plain');
    const job = jobs.find(j => j.id === jobId);
    if (!job || job.status === newStatus) return;

    setMovingJobId(jobId);
    await onStatusChange(jobId, newStatus);
    setMovingJobId(null);
  };

  const handleMoveViaDropdown = async (jobId: string, newStatus: JobStatus) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job || job.status === newStatus) return;

    setMovingJobId(jobId);
    await onStatusChange(jobId, newStatus);
    setMovingJobId(null);
  };

  const toggleColumn = (status: JobStatus) => {
    setCollapsedColumns(prev => {
      const next = new Set(prev);
      if (next.has(status)) next.delete(status);
      else next.add(status);
      return next;
    });
  };

  return (
    <div>
      {/* Desktop: horizontal columns */}
      <div className="hidden md:grid md:grid-cols-4 gap-4">
        {columns.map(col => {
          const columnJobs = jobs.filter(j => j.status === col.status);
          const isDropTarget = dragOverColumn === col.status;

          return (
            <div
              key={col.status}
              className="rounded-xl p-3 min-h-[300px] transition-all"
              style={{
                background: isDropTarget ? col.bg : 'rgba(44, 44, 46, 0.4)',
                border: isDropTarget ? `2px dashed ${col.color}` : '2px solid transparent',
              }}
              onDragOver={(e) => handleDragOver(e, col.status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, col.status)}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: col.color }}
                  />
                  <span className="text-sm font-medium text-white">{col.label}</span>
                </div>
                <span className="text-xs text-[#636366] px-2 py-0.5 rounded-full" style={{ background: 'rgba(56, 56, 58, 0.5)' }}>
                  {columnJobs.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {columnJobs.map(job => (
                  <div
                    key={job.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, job.id)}
                    onClick={() => onCardClick(job)}
                    className={`p-3 rounded-lg cursor-pointer hover:bg-[rgba(56,56,58,0.5)] transition-colors ${
                      movingJobId === job.id ? 'opacity-50' : ''
                    }`}
                    style={{ background: 'rgba(56, 56, 58, 0.3)', border: '1px solid rgba(56, 56, 58, 0.5)' }}
                  >
                    <p className="font-medium text-white text-sm truncate">{job.company}</p>
                    <p className="text-xs text-[#D1D1D6] truncate">{job.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-[#636366]">
                        {relativeDate(job.applicationData?.appliedDate || job.appliedDate)}
                      </span>
                      {job.applicationData?.resumeName && (
                        <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(0, 168, 255, 0.15)', color: '#00a8ff' }}>
                          {job.applicationData.resumeName}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {columnJobs.length === 0 && (
                  <p className="text-center text-xs text-[#636366] py-8">
                    No jobs here yet
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: stacked collapsible columns */}
      <div className="md:hidden space-y-3">
        {columns.map(col => {
          const columnJobs = jobs.filter(j => j.status === col.status);
          const isCollapsed = collapsedColumns.has(col.status);

          return (
            <div
              key={col.status}
              className="rounded-xl overflow-hidden"
              style={{ background: 'rgba(44, 44, 46, 0.4)', border: '1px solid rgba(56, 56, 58, 0.5)' }}
            >
              {/* Column Header (tap to collapse) */}
              <button
                onClick={() => toggleColumn(col.status)}
                className="w-full flex items-center justify-between p-3"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: col.color }}
                  />
                  <span className="text-sm font-medium text-white">{col.label}</span>
                  <span className="text-xs text-[#636366] px-2 py-0.5 rounded-full" style={{ background: 'rgba(56, 56, 58, 0.5)' }}>
                    {columnJobs.length}
                  </span>
                </div>
                <span className="text-[#636366] text-xs">{isCollapsed ? '▼' : '▲'}</span>
              </button>

              {/* Cards */}
              {!isCollapsed && (
                <div className="px-3 pb-3 space-y-2">
                  {columnJobs.map(job => (
                    <div
                      key={job.id}
                      className={`p-3 rounded-lg ${movingJobId === job.id ? 'opacity-50' : ''}`}
                      style={{ background: 'rgba(56, 56, 58, 0.3)', border: '1px solid rgba(56, 56, 58, 0.5)' }}
                    >
                      <div onClick={() => onCardClick(job)} className="cursor-pointer">
                        <p className="font-medium text-white text-sm truncate">{job.company}</p>
                        <p className="text-xs text-[#D1D1D6] truncate">{job.title}</p>
                        <span className="text-xs text-[#636366]">
                          {relativeDate(job.applicationData?.appliedDate || job.appliedDate)}
                        </span>
                      </div>
                      {/* Move to dropdown for mobile accessibility */}
                      <select
                        value={job.status}
                        onChange={(e) => handleMoveViaDropdown(job.id, e.target.value as JobStatus)}
                        className="mt-2 w-full text-xs px-2 py-1 rounded text-white focus:outline-none"
                        style={{ background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' }}
                      >
                        {columns.map(c => (
                          <option key={c.status} value={c.status}>{c.label}</option>
                        ))}
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>
                  ))}

                  {columnJobs.length === 0 && (
                    <p className="text-center text-xs text-[#636366] py-4">
                      No jobs here yet
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
