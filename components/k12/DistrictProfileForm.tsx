'use client';

import React, { useState } from 'react';
import PathwaySelector, { Pathway } from './PathwaySelector';

interface DistrictProfileFormProps {
  labels: {
    title: string;
    description: string;
    schoolName: string;
    schoolNamePlaceholder: string;
    city: string;
    cityPlaceholder: string;
    state: string;
    statePlaceholder: string;
    gradeLevels: string;
    currentOfferings: string;
    currentOfferingsPlaceholder: string;
    pathways: string;
    resources: string;
    resourcesPlaceholder: string;
    submit: string;
    successTitle: string;
    successMessage: string;
    pathwayLabels: Record<Pathway, string>;
    gradeLevelOptions: {
      elementary: string;
      middle: string;
      high: string;
    };
    saving?: string;
    error?: string;
  };
  onProfileSaved?: (profileId: string) => void;
}

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming', 'District of Columbia', 'Puerto Rico'
];

const DistrictProfileForm: React.FC<DistrictProfileFormProps> = ({ labels, onProfileSaved }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    schoolName: '',
    city: '',
    state: '',
    gradeLevels: [] as string[],
    currentOfferings: '',
    pathways: [] as Pathway[],
    resources: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/districts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          school_name: formData.schoolName,
          city: formData.city,
          state: formData.state,
          grade_levels: formData.gradeLevels,
          current_offerings: formData.currentOfferings || null,
          pathways: formData.pathways,
          resources: formData.resources || null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save profile');
      }

      const { data } = await response.json();
      setSubmitted(true);

      // Notify parent component if callback provided
      if (onProfileSaved && data?.id) {
        onProfileSaved(data.id);
      }
    } catch (err) {
      console.error('Error saving district profile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleGradeLevel = (level: string) => {
    setFormData((prev) => ({
      ...prev,
      gradeLevels: prev.gradeLevels.includes(level)
        ? prev.gradeLevels.filter((l) => l !== level)
        : [...prev.gradeLevels, level],
    }));
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">{labels.successTitle}</h3>
        <p className="text-green-700">{labels.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {labels.error || error}
        </div>
      )}

      {/* School/District Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.schoolName}
        </label>
        <input
          type="text"
          value={formData.schoolName}
          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          placeholder={labels.schoolNamePlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          required
          disabled={isLoading}
        />
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.city}
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder={labels.cityPlaceholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          required
          disabled={isLoading}
        />
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.state}
        </label>
        <select
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          required
          disabled={isLoading}
        >
          <option value="">{labels.statePlaceholder}</option>
          {US_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Grade Levels */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.gradeLevels}
        </label>
        <div className="flex flex-wrap gap-3">
          {(['elementary', 'middle', 'high'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => toggleGradeLevel(level)}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                formData.gradeLevels.includes(level)
                  ? 'border-slate-600 bg-slate-50 text-slate-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {labels.gradeLevelOptions[level]}
            </button>
          ))}
        </div>
      </div>

      {/* Current CS Offerings */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.currentOfferings}
        </label>
        <textarea
          value={formData.currentOfferings}
          onChange={(e) => setFormData({ ...formData, currentOfferings: e.target.value })}
          placeholder={labels.currentOfferingsPlaceholder}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>

      {/* Pathways of Interest */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.pathways}
        </label>
        <PathwaySelector
          selectedPathways={formData.pathways}
          onChange={(pathways) => setFormData({ ...formData, pathways })}
          labels={labels.pathwayLabels}
        />
      </div>

      {/* Available Resources */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {labels.resources}
        </label>
        <textarea
          value={formData.resources}
          onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
          placeholder={labels.resourcesPlaceholder}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
          disabled={isLoading}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full bg-slate-700 text-white py-3 px-6 rounded-lg font-medium transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'
        }`}
      >
        {isLoading ? (labels.saving || 'Saving...') : labels.submit}
      </button>
    </form>
  );
};

export default DistrictProfileForm;
