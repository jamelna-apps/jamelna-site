// app/[locale]/jobs/profile/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getProfile, updateProfile } from '@/lib/jobs/conductor-client';
import type { JobProfile } from '@/lib/jobs/types';
import ImportProfileWizard from '@/components/jobs/ImportProfileWizard';

const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

function ProfileContent() {
  const { sessionToken } = useJobsAuth();
  const [profile, setProfile] = useState<JobProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showImportWizard, setShowImportWizard] = useState(false);

  const loadProfile = useCallback(async () => {
    if (!sessionToken) return;

    setLoading(true);
    const result = await getProfile(sessionToken);
    if (result.data) {
      setProfile(result.data);
    }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken || !profile) return;

    setSaving(true);
    setMessage(null);

    const result = await updateProfile(sessionToken, profile);

    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Profile saved successfully!' });
    }

    setSaving(false);
  };

  const updateField = <K extends keyof JobProfile>(field: K, value: JobProfile[K]) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  const handleImportComplete = (importedProfile: Partial<JobProfile>) => {
    if (!profile) return;

    // Merge imported data with existing profile
    const merged: JobProfile = {
      ...profile,
      name: importedProfile.name || profile.name,
      summary: importedProfile.summary || profile.summary,
      location: importedProfile.location || profile.location,
      linkedInUrl: importedProfile.linkedInUrl || profile.linkedInUrl,
      targetRoles: importedProfile.targetRoles && importedProfile.targetRoles.length > 0
        ? importedProfile.targetRoles
        : profile.targetRoles,
      targetLocations: importedProfile.targetLocations && importedProfile.targetLocations.length > 0
        ? importedProfile.targetLocations
        : profile.targetLocations,
      // Merge skills (union, avoiding duplicates by name)
      skills: [
        ...profile.skills,
        ...(importedProfile.skills || []).filter(
          imported => !profile.skills.some(existing =>
            existing.name.toLowerCase() === imported.name.toLowerCase()
          )
        )
      ],
      // Merge experience if it exists
      experience: importedProfile.experience && importedProfile.experience.length > 0
        ? [...(profile.experience || []), ...importedProfile.experience]
        : (profile.experience || []),
      // Merge education if it exists
      education: importedProfile.education && importedProfile.education.length > 0
        ? [...(profile.education || []), ...importedProfile.education]
        : (profile.education || []),
    };

    setProfile(merged);
    setShowImportWizard(false);
  };

  if (loading) {
    return <div className="text-center py-12 text-[#636366]">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-[#636366]">No profile found. Creating one...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Your Profile</h1>
        <p className="text-[#D1D1D6]">This information powers job matching and cover letter generation</p>
      </div>

      {/* Import Section - Prominent */}
      <section className="glass-card p-6" style={{ background: 'rgba(0, 168, 255, 0.1)', border: '1px solid rgba(0, 168, 255, 0.3)' }}>
        <h2 className="font-semibold text-white mb-2">Import Your Profile</h2>
        <p className="text-[#D1D1D6] text-sm mb-4">
          Quickly populate your profile by importing from your resume, LinkedIn, or website.
        </p>
        <button
          type="button"
          onClick={() => setShowImportWizard(true)}
          className="px-6 py-3 rounded-lg font-medium text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #00a8ff 0%, #0070cc 100%)',
            boxShadow: '0 4px 14px rgba(0, 168, 255, 0.4)'
          }}
        >
          Upload Resume / Add LinkedIn
        </button>
      </section>

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

      <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Info */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Basic Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#D1D1D6] mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
              style={inputStyle}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#D1D1D6] mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="e.g., Madrid, Spain"
              className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#D1D1D6] mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={profile.linkedInUrl || ''}
            onChange={(e) => updateField('linkedInUrl', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
            style={inputStyle}
          />
        </div>
      </section>

      {/* Target Roles */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Target Roles</h2>

        <div>
          <label className="block text-sm font-medium text-[#D1D1D6] mb-1">
            Roles (comma-separated)
          </label>
          <input
            type="text"
            value={profile.targetRoles.join(', ')}
            onChange={(e) => updateField('targetRoles', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Product Manager, EdTech Lead, AI Education Specialist"
            className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
            style={inputStyle}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#D1D1D6] mb-1">
            Locations (comma-separated)
          </label>
          <input
            type="text"
            value={profile.targetLocations.join(', ')}
            onChange={(e) => updateField('targetLocations', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Remote, Spain, EU"
            className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
            style={inputStyle}
          />
        </div>
      </section>

      {/* Summary */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Professional Summary</h2>

        <div>
          <label className="block text-sm font-medium text-[#D1D1D6] mb-1">
            Summary (used in cover letters)
          </label>
          <textarea
            value={profile.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            rows={4}
            placeholder="A brief professional summary highlighting your key strengths..."
            className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
            style={inputStyle}
          />
        </div>
      </section>

      {/* Skills */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Skills</h2>

        {profile.skills.map((skill, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs text-[#636366] mb-1">Skill</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[index] = { ...skill, name: e.target.value };
                  updateField('skills', newSkills);
                }}
                className="w-full px-3 py-2 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={inputStyle}
              />
            </div>
            <div className="w-32">
              <label className="block text-xs text-[#636366] mb-1">Level</label>
              <select
                value={skill.level}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[index] = { ...skill, level: e.target.value as typeof skill.level };
                  updateField('skills', newSkills);
                }}
                className="w-full px-3 py-2 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={inputStyle}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="w-24">
              <label className="block text-xs text-[#636366] mb-1">Years</label>
              <input
                type="number"
                value={skill.yearsExp}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[index] = { ...skill, yearsExp: Number(e.target.value) };
                  updateField('skills', newSkills);
                }}
                className="w-full px-3 py-2 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={inputStyle}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                updateField('skills', profile.skills.filter((_, i) => i !== index));
              }}
              className="px-2 py-2 text-[#f87171] hover:text-[#fca5a5] transition-colors"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => {
            updateField('skills', [...profile.skills, { name: '', level: 'intermediate', yearsExp: 1 }]);
          }}
          className="text-sm text-[#00a8ff] hover:underline"
        >
          + Add Skill
        </button>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-lg font-medium text-white transition-all disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #C9704D 0%, #a85a3a 100%)',
            boxShadow: '0 4px 14px rgba(201, 112, 77, 0.4)'
          }}
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
      </form>

      <ImportProfileWizard
        isOpen={showImportWizard}
        onClose={() => setShowImportWizard(false)}
        onImportComplete={handleImportComplete}
        sessionToken={sessionToken!}
      />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
