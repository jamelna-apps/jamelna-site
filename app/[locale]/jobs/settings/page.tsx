// app/[locale]/jobs/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getSettings, updateSettings, scanJobs } from '@/lib/jobs/conductor-client';
import type { JobSettings, ScanResult } from '@/lib/jobs/types';

const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

interface JobSource {
  id: string;
  name: string;
  type: 'rss' | 'scraper';
  enabled: boolean;
}

const defaultSources: JobSource[] = [
  // RSS Feeds
  { id: 'edsurge', name: 'EdSurge Jobs', type: 'rss', enabled: true },
  { id: 'remoteok', name: 'RemoteOK', type: 'rss', enabled: true },
  { id: 'weworkremotely', name: 'We Work Remotely', type: 'rss', enabled: true },
  // Scrapers
  { id: 'iste', name: 'ISTE Job Board', type: 'scraper', enabled: true },
  { id: 'odilo', name: 'Odilo', type: 'scraper', enabled: true },
  { id: 'innovamat', name: 'Innovamat', type: 'scraper', enabled: true },
  { id: 'smileandlearn', name: 'Smile and Learn', type: 'scraper', enabled: false },
  { id: 'genially', name: 'Genially', type: 'scraper', enabled: true },
];

function SettingsContent() {
  const { sessionToken } = useJobsAuth();
  const [sources, setSources] = useState<JobSource[]>(defaultSources);
  const [minMatchScore, setMinMatchScore] = useState<number>(60);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (!sessionToken) return;

    const loadSettings = async () => {
      setLoading(true);
      const result = await getSettings(sessionToken);
      if (result.data) {
        setMinMatchScore(result.data.minMatchScore);

        // Update sources based on paused sources
        const pausedSourceIds = result.data.pausedSources.map(s => s.toString());
        setSources(prev => prev.map(source => ({
          ...source,
          enabled: !pausedSourceIds.includes(source.id)
        })));
      }
      setLoading(false);
    };

    loadSettings();
  }, [sessionToken]);

  const toggleSource = (sourceId: string) => {
    setSources(prev => prev.map(source =>
      source.id === sourceId ? { ...source, enabled: !source.enabled } : source
    ));
  };

  const handleSave = async () => {
    if (!sessionToken) return;

    setSaving(true);
    setMessage(null);

    const pausedSources = sources
      .filter(s => !s.enabled)
      .map(s => s.id) as JobSettings['pausedSources'];

    const result = await updateSettings(sessionToken, {
      minMatchScore,
      pausedSources,
    });

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    }

    setSaving(false);
  };

  const handleScan = async () => {
    if (!sessionToken) return;

    setScanning(true);
    setScanResult(null);
    setMessage(null);

    const result = await scanJobs(sessionToken);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else if (result.data) {
      setScanResult(result.data);
    }

    setScanning(false);
  };

  if (loading) {
    return <div className="text-center py-12 text-[#636366]">Loading settings...</div>;
  }

  const rssSources = sources.filter(s => s.type === 'rss');
  const scraperSources = sources.filter(s => s.type === 'scraper');

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-[#D1D1D6]">Configure your job search preferences</p>
      </div>

      {message && (
        <div
          className="p-4 rounded-md"
          style={message.type === 'success'
            ? { background: 'rgba(64, 224, 208, 0.15)', color: '#40E0D0' }
            : { background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }
          }
        >
          {message.text}
        </div>
      )}

      {/* Job Sources Section */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Job Sources</h2>

        {/* RSS Feeds */}
        <div>
          <h3 className="text-sm text-[#636366] uppercase tracking-wide mb-3">RSS Feeds</h3>
          <div className="space-y-3">
            {rssSources.map(source => (
              <div key={source.id} className="flex justify-between items-center py-2">
                <span className="text-[#D1D1D6]">{source.name}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={source.enabled}
                    onChange={() => toggleSource(source.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#38383A] rounded-full peer peer-checked:bg-[#00a8ff] transition-colors relative">
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Scrapers */}
        <div className="pt-4">
          <h3 className="text-sm text-[#636366] uppercase tracking-wide mb-3">Company Career Pages</h3>
          <div className="space-y-3">
            {scraperSources.map(source => (
              <div key={source.id} className="flex justify-between items-center py-2">
                <span className="text-[#D1D1D6]">{source.name}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={source.enabled}
                    onChange={() => toggleSource(source.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#38383A] rounded-full peer peer-checked:bg-[#00a8ff] transition-colors relative">
                    <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Match Preferences Section */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Match Preferences</h2>
        <div>
          <label className="block text-sm text-[#D1D1D6] mb-2">
            Minimum Match Score
          </label>
          <select
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
            style={inputStyle}
          >
            <option value={0}>Show all jobs (0%)</option>
            <option value={40}>40% or higher</option>
            <option value={50}>50% or higher</option>
            <option value={60}>60% or higher (Recommended)</option>
            <option value={70}>70% or higher</option>
            <option value={80}>80% or higher</option>
          </select>
          <p className="text-xs text-[#636366] mt-1">
            Jobs below this score won&apos;t appear in your dashboard
          </p>
        </div>
      </section>

      {/* Save Settings Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-warm disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      {/* Manual Scan Section */}
      <section className="glass-card p-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-white">Manual Scan</h2>
            <p className="text-sm text-[#636366]">
              Jobs are scanned automatically daily at 6 AM
            </p>
          </div>
          <button
            onClick={handleScan}
            disabled={scanning}
            className="btn-warm disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>

        {scanResult && (
          <div className="mt-4 p-3 rounded-lg bg-[#40E0D0]/10 text-[#40E0D0] text-sm">
            Scan complete: Found {scanResult.newJobs} new jobs
            {scanResult.duplicatesSkipped > 0 && ` (${scanResult.duplicatesSkipped} duplicates skipped)`}
          </div>
        )}

        {scanResult && scanResult.errors.length > 0 && (
          <div className="mt-2 p-3 rounded-lg bg-[#f87171]/10 text-[#f87171] text-sm">
            <p className="font-medium mb-1">Some sources failed:</p>
            <ul className="list-disc list-inside space-y-1">
              {scanResult.errors.map((err, i) => (
                <li key={i}>{err.source}: {err.error}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AuthGuard>
      <SettingsContent />
    </AuthGuard>
  );
}
