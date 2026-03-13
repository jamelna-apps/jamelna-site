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
      <div className="bg-highlight-green/10 border border-highlight-green/30 rounded-lg p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-highlight-green mb-2">{labels.successTitle}</h3>
        <p className="text-highlight-green/80">{labels.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-highlight-red/10 border border-highlight-red/30 rounded-lg p-4 text-highlight-red">
          {labels.error || error}
        </div>
      )}

      {/* School/District Name */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-2">
          {labels.schoolName}
        </label>
        <input
          type="text"
          value={formData.schoolName}
          onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
          placeholder={labels.schoolNamePlaceholder}
          className="w-full px-4 py-3 bg-deep-card border border-deep-border rounded-lg text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-warm/50 focus:border-warm/50"
          required
          disabled={isLoading}
        />
      </div>

      {/* City */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-2">
          {labels.city}
        </label>
        <input
          type="text"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          placeholder={labels.cityPlaceholder}
          className="w-full px-4 py-3 bg-deep-card border border-deep-border rounded-lg text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-warm/50 focus:border-warm/50"
          required
          disabled={isLoading}
        />
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-2">
          {labels.state}
        </label>
        <select
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full px-4 py-3 bg-deep-card border border-deep-border rounded-lg text-text-primary focus:ring-2 focus:ring-warm/50 focus:border-warm/50"
          required
          disabled={isLoading}
        >
          <option value="" className="bg-deep-card text-text-muted">{labels.statePlaceholder}</option>
          {US_STATES.map((state) => (
            <option key={state} value={state} className="bg-deep-card text-text-primary">
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Grade Levels */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-2">
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
                  ? 'border-warm bg-warm/10 text-warm'
                  : 'border-deep-border bg-deep-card text-text-secondary hover:border-warm/50'
              } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {labels.gradeLevelOptions[level]}
            </button>
          ))}
        </div>
      </div>

      {/* Current CS Offerings */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-2">
          {labels.currentOfferings}
        </label>
        <textarea
          value={formData.currentOfferings}
          onChange={(e) => setFormData({ ...formData, currentOfferings: e.target.value })}
          placeholder={labels.currentOfferingsPlaceholder}
          rows={3}
          className="w-full px-4 py-3 bg-deep-card border border-deep-border rounded-lg text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-warm/50 focus:border-warm/50"
          disabled={isLoading}
        />
      </div>

      {/* Pathways of Interest */}
      <div>
        <label className="block text-sm font-medium text-text-heading mb-2">
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
        <label className="block text-sm font-medium text-text-heading mb-2">
          {labels.resources}
        </label>
        <textarea
          value={formData.resources}
          onChange={(e) => setFormData({ ...formData, resources: e.target.value })}
          placeholder={labels.resourcesPlaceholder}
          rows={3}
          className="w-full px-4 py-3 bg-deep-card border border-deep-border rounded-lg text-text-primary placeholder:text-text-muted focus:ring-2 focus:ring-warm/50 focus:border-warm/50"
          disabled={isLoading}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full btn-warm py-3 px-6 rounded-lg font-medium transition-colors ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (labels.saving || 'Saving...') : labels.submit}
      </button>
    </form>
  );
};

export default DistrictProfileForm;
