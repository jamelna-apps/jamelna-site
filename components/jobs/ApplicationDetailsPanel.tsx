// components/jobs/ApplicationDetailsPanel.tsx
'use client';

import { useState } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { addFollowUp, addInterviewNote } from '@/lib/jobs/conductor-client';
import type { Job, JobStatus } from '@/lib/jobs/types';

interface ApplicationDetailsPanelProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

const statusColors: Record<JobStatus, { bg: string; text: string }> = {
  new: { bg: 'rgba(255, 255, 255, 0.1)', text: '#D1D1D6' },
  reviewing: { bg: 'rgba(255, 215, 0, 0.15)', text: '#FFD700' },
  applying: { bg: 'rgba(0, 168, 255, 0.15)', text: '#00a8ff' },
  applied: { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa' },
  interviewing: { bg: 'rgba(64, 224, 208, 0.15)', text: '#40E0D0' },
  offer: { bg: 'rgba(16, 185, 129, 0.15)', text: '#10b981' },
  rejected: { bg: 'rgba(220, 38, 38, 0.15)', text: '#f87171' },
  withdrawn: { bg: 'rgba(107, 114, 128, 0.15)', text: '#6b7280' },
};

const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

export default function ApplicationDetailsPanel({ job, isOpen, onClose, onUpdate }: ApplicationDetailsPanelProps) {
  const { sessionToken } = useJobsAuth();
  const [showFollowUpForm, setShowFollowUpForm] = useState(false);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [showCoverLetter, setShowCoverLetter] = useState(false);
  const [saving, setSaving] = useState(false);

  // Follow-up form state
  const [fuDate, setFuDate] = useState(new Date().toISOString().split('T')[0]);
  const [fuType, setFuType] = useState<'email' | 'call' | 'message'>('email');
  const [fuNotes, setFuNotes] = useState('');

  // Interview note form state
  const [inDate, setInDate] = useState(new Date().toISOString().split('T')[0]);
  const [inType, setInType] = useState<'phone' | 'video' | 'onsite' | 'technical'>('video');
  const [inNotes, setInNotes] = useState('');
  const [inInterviewers, setInInterviewers] = useState('');

  if (!isOpen || !job) return null;

  const appData = job.applicationData;

  const handleAddFollowUp = async () => {
    if (!sessionToken || !fuNotes.trim()) return;
    setSaving(true);
    await addFollowUp(sessionToken, job.id, { date: fuDate, type: fuType, notes: fuNotes });
    setFuNotes('');
    setShowFollowUpForm(false);
    setSaving(false);
    onUpdate();
  };

  const handleAddInterviewNote = async () => {
    if (!sessionToken || !inNotes.trim()) return;
    setSaving(true);
    const interviewers = inInterviewers.split(',').map(s => s.trim()).filter(Boolean);
    await addInterviewNote(sessionToken, job.id, {
      date: inDate,
      type: inType,
      notes: inNotes,
      interviewers: interviewers.length > 0 ? interviewers : undefined,
    });
    setInNotes('');
    setInInterviewers('');
    setShowInterviewForm(false);
    setSaving(false);
    onUpdate();
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-[420px] z-50 overflow-y-auto shadow-xl"
        style={{ background: '#1C1C1E' }}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white truncate">{job.title}</h2>
              <p className="text-[#D1D1D6]">{job.company}</p>
              <div className="mt-2 flex items-center gap-2">
                <span
                  className="text-xs px-2 py-0.5 rounded capitalize"
                  style={{ background: statusColors[job.status].bg, color: statusColors[job.status].text }}
                >
                  {job.status}
                </span>
                {job.sourceUrl && (
                  <a
                    href={job.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#00a8ff] hover:underline"
                  >
                    View posting
                  </a>
                )}
              </div>
            </div>
            <button onClick={onClose} className="text-[#636366] hover:text-white text-2xl ml-2">
              &times;
            </button>
          </div>

          {/* Application Info */}
          {appData && (
            <div className="space-y-2">
              <h3 className="font-semibold text-white text-sm">Application Info</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-[#636366] text-xs">Applied</p>
                  <p className="text-[#D1D1D6]">{formatDate(appData.appliedDate)}</p>
                </div>
                <div>
                  <p className="text-[#636366] text-xs">Submitted Via</p>
                  <p className="text-[#D1D1D6] capitalize">{appData.submittedVia.replace('_', ' ')}</p>
                </div>
                {appData.resumeName && (
                  <div>
                    <p className="text-[#636366] text-xs">Resume</p>
                    <p className="text-[#D1D1D6]">{appData.resumeName}</p>
                  </div>
                )}
              </div>
              {appData.notes && (
                <div>
                  <p className="text-[#636366] text-xs">Notes</p>
                  <p className="text-sm text-[#D1D1D6]">{appData.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* Cover Letter */}
          {appData?.coverLetter && (
            <div>
              <button
                onClick={() => setShowCoverLetter(!showCoverLetter)}
                className="flex items-center justify-between w-full text-sm"
              >
                <h3 className="font-semibold text-white">Cover Letter</h3>
                <span className="text-[#636366] text-xs">{showCoverLetter ? '▲' : '▼'}</span>
              </button>
              {showCoverLetter && (
                <div className="mt-2">
                  <div className="p-3 rounded-md text-sm text-[#D1D1D6] whitespace-pre-wrap" style={{ background: 'rgba(56, 56, 58, 0.3)' }}>
                    {appData.coverLetter}
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(appData.coverLetter!)}
                    className="mt-1 text-xs text-[#00a8ff] hover:underline"
                  >
                    Copy to clipboard
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Timeline */}
          {appData?.timeline && appData.timeline.length > 0 && (
            <div>
              <h3 className="font-semibold text-white text-sm mb-3">Timeline</h3>
              <div className="relative pl-4 space-y-3">
                {/* Vertical line */}
                <div className="absolute left-[5px] top-1 bottom-1 w-px bg-[rgba(56,56,58,0.8)]" />
                {appData.timeline.map((event, i) => (
                  <div key={i} className="relative flex items-start gap-3">
                    <div
                      className="absolute -left-[11px] top-1.5 w-2.5 h-2.5 rounded-full border-2"
                      style={{
                        background: statusColors[event.status]?.bg || 'rgba(56, 56, 58, 0.5)',
                        borderColor: statusColors[event.status]?.text || '#636366',
                      }}
                    />
                    <div className="ml-2">
                      <p className="text-sm text-white capitalize">{event.status}</p>
                      <p className="text-xs text-[#636366]">{formatDate(event.timestamp)}</p>
                      {event.notes && <p className="text-xs text-[#D1D1D6] mt-0.5">{event.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Follow-ups */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white text-sm">Follow-ups</h3>
              <button
                onClick={() => setShowFollowUpForm(!showFollowUpForm)}
                className="text-xs text-[#00a8ff] hover:underline"
              >
                {showFollowUpForm ? 'Cancel' : '+ Add'}
              </button>
            </div>

            {showFollowUpForm && (
              <div className="space-y-2 p-3 rounded-lg mb-3" style={{ background: 'rgba(56, 56, 58, 0.3)' }}>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={fuDate}
                    onChange={(e) => setFuDate(e.target.value)}
                    className="px-2 py-1.5 rounded text-sm text-white focus:outline-none"
                    style={inputStyle}
                  />
                  <select
                    value={fuType}
                    onChange={(e) => setFuType(e.target.value as typeof fuType)}
                    className="px-2 py-1.5 rounded text-sm text-white focus:outline-none"
                    style={inputStyle}
                  >
                    <option value="email">Email</option>
                    <option value="call">Call</option>
                    <option value="message">Message</option>
                  </select>
                </div>
                <textarea
                  value={fuNotes}
                  onChange={(e) => setFuNotes(e.target.value)}
                  placeholder="What happened?"
                  rows={2}
                  className="w-full px-2 py-1.5 rounded text-sm text-white placeholder-[#636366] focus:outline-none resize-none"
                  style={inputStyle}
                />
                <button
                  onClick={handleAddFollowUp}
                  disabled={saving || !fuNotes.trim()}
                  className="btn-warm text-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Follow-up'}
                </button>
              </div>
            )}

            {appData?.followUps && appData.followUps.length > 0 ? (
              <div className="space-y-2">
                {appData.followUps.map((fu) => (
                  <div key={fu.id} className="p-2 rounded text-sm" style={{ background: 'rgba(56, 56, 58, 0.2)' }}>
                    <div className="flex items-center gap-2 text-xs text-[#636366]">
                      <span className="capitalize">{fu.type}</span>
                      <span>{formatDate(fu.date)}</span>
                    </div>
                    <p className="text-[#D1D1D6] mt-0.5">{fu.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              !showFollowUpForm && <p className="text-xs text-[#636366]">No follow-ups yet</p>
            )}
          </div>

          {/* Interview Notes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white text-sm">Interview Notes</h3>
              <button
                onClick={() => setShowInterviewForm(!showInterviewForm)}
                className="text-xs text-[#00a8ff] hover:underline"
              >
                {showInterviewForm ? 'Cancel' : '+ Add'}
              </button>
            </div>

            {showInterviewForm && (
              <div className="space-y-2 p-3 rounded-lg mb-3" style={{ background: 'rgba(56, 56, 58, 0.3)' }}>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={inDate}
                    onChange={(e) => setInDate(e.target.value)}
                    className="px-2 py-1.5 rounded text-sm text-white focus:outline-none"
                    style={inputStyle}
                  />
                  <select
                    value={inType}
                    onChange={(e) => setInType(e.target.value as typeof inType)}
                    className="px-2 py-1.5 rounded text-sm text-white focus:outline-none"
                    style={inputStyle}
                  >
                    <option value="phone">Phone</option>
                    <option value="video">Video</option>
                    <option value="onsite">Onsite</option>
                    <option value="technical">Technical</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={inInterviewers}
                  onChange={(e) => setInInterviewers(e.target.value)}
                  placeholder="Interviewers (comma-separated)"
                  className="w-full px-2 py-1.5 rounded text-sm text-white placeholder-[#636366] focus:outline-none"
                  style={inputStyle}
                />
                <textarea
                  value={inNotes}
                  onChange={(e) => setInNotes(e.target.value)}
                  placeholder="Interview notes..."
                  rows={3}
                  className="w-full px-2 py-1.5 rounded text-sm text-white placeholder-[#636366] focus:outline-none resize-none"
                  style={inputStyle}
                />
                <button
                  onClick={handleAddInterviewNote}
                  disabled={saving || !inNotes.trim()}
                  className="btn-warm text-xs disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Note'}
                </button>
              </div>
            )}

            {appData?.interviewNotes && appData.interviewNotes.length > 0 ? (
              <div className="space-y-2">
                {appData.interviewNotes.map((note) => (
                  <div key={note.id} className="p-2 rounded text-sm" style={{ background: 'rgba(56, 56, 58, 0.2)' }}>
                    <div className="flex items-center gap-2 text-xs text-[#636366]">
                      <span className="capitalize">{note.type}</span>
                      <span>{formatDate(note.date)}</span>
                    </div>
                    {note.interviewers && note.interviewers.length > 0 && (
                      <p className="text-xs text-[#00a8ff]">with {note.interviewers.join(', ')}</p>
                    )}
                    <p className="text-[#D1D1D6] mt-0.5">{note.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              !showInterviewForm && <p className="text-xs text-[#636366]">No interview notes yet</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
