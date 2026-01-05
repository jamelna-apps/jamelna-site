// app/[locale]/jobs/profile/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getProfile, updateProfile } from '@/lib/jobs/conductor-client';
import type { JobProfile } from '@/lib/jobs/types';

function ProfileContent() {
  const { sessionToken } = useJobsAuth();
  const [profile, setProfile] = useState<JobProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

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

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No profile found. Creating one...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600">This information powers job matching and cover letter generation</p>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* Basic Info */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <h2 className="font-semibold text-gray-900">Basic Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="e.g., Madrid, Spain"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
          <input
            type="url"
            value={profile.linkedInUrl || ''}
            onChange={(e) => updateField('linkedInUrl', e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </section>

      {/* Target Roles */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <h2 className="font-semibold text-gray-900">Target Roles</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roles (comma-separated)
          </label>
          <input
            type="text"
            value={profile.targetRoles.join(', ')}
            onChange={(e) => updateField('targetRoles', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Product Manager, EdTech Lead, AI Education Specialist"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Locations (comma-separated)
          </label>
          <input
            type="text"
            value={profile.targetLocations.join(', ')}
            onChange={(e) => updateField('targetLocations', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
            placeholder="Remote, Spain, EU"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </section>

      {/* Summary */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <h2 className="font-semibold text-gray-900">Professional Summary</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Summary (used in cover letters)
          </label>
          <textarea
            value={profile.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            rows={4}
            placeholder="A brief professional summary highlighting your key strengths..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </section>

      {/* Skills */}
      <section className="bg-white p-6 rounded-lg border border-gray-200 space-y-4">
        <h2 className="font-semibold text-gray-900">Skills</h2>

        {profile.skills.map((skill, index) => (
          <div key={index} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">Skill</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[index] = { ...skill, name: e.target.value };
                  updateField('skills', newSkills);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <div className="w-32">
              <label className="block text-xs text-gray-500 mb-1">Level</label>
              <select
                value={skill.level}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[index] = { ...skill, level: e.target.value as typeof skill.level };
                  updateField('skills', newSkills);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="expert">Expert</option>
              </select>
            </div>
            <div className="w-24">
              <label className="block text-xs text-gray-500 mb-1">Years</label>
              <input
                type="number"
                value={skill.yearsExp}
                onChange={(e) => {
                  const newSkills = [...profile.skills];
                  newSkills[index] = { ...skill, yearsExp: Number(e.target.value) };
                  updateField('skills', newSkills);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                updateField('skills', profile.skills.filter((_, i) => i !== index));
              }}
              className="px-2 py-2 text-red-600 hover:text-red-800"
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
          className="text-sm text-blue-600 hover:underline"
        >
          + Add Skill
        </button>
      </section>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </div>
    </form>
  );
}

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileContent />
    </AuthGuard>
  );
}
