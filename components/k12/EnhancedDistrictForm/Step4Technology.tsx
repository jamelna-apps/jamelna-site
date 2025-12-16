'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  DeviceLevel,
  DeviceType,
  ReliabilityLevel,
} from '@/lib/export/templates';

const DEVICE_LEVELS: { value: DeviceLevel; label: string; description: string }[] = [
  {
    value: 'veryLimited',
    label: 'Very Limited',
    description: 'Shared computer lab only, students have minimal device access',
  },
  {
    value: 'limited',
    label: 'Limited',
    description: 'Occasional device access, shared carts or scheduled lab time',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: '1:1 devices at some grade levels, or frequent access for all',
  },
  {
    value: 'strong',
    label: 'Strong',
    description: '1:1 devices for all students across grade levels',
  },
];

const DEVICE_TYPES: { value: DeviceType; label: string; icon: string }[] = [
  { value: 'desktops', label: 'Desktop Computers', icon: '🖥️' },
  { value: 'chromebooks', label: 'Chromebooks', icon: '💻' },
  { value: 'ipads', label: 'iPads/Tablets', icon: '📱' },
  { value: 'laptops', label: 'Laptops (Windows/Mac)', icon: '💻' },
  { value: 'byod', label: 'BYOD (Bring Your Own)', icon: '📲' },
  { value: 'roboticsKits', label: 'Robotics Kits', icon: '🤖' },
  { value: 'makerspaceEquipment', label: 'Makerspace Equipment', icon: '🛠️' },
];

const RELIABILITY_LEVELS: { value: ReliabilityLevel; label: string; description: string }[] = [
  {
    value: 'unreliable',
    label: 'Unreliable',
    description: 'Frequent outages or very slow speeds',
  },
  {
    value: 'moderate',
    label: 'Moderate',
    description: 'Generally works but occasional issues',
  },
  {
    value: 'reliable',
    label: 'Reliable',
    description: 'Fast, consistent internet throughout the school',
  },
];

interface Step4TechnologyProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step4Technology({ profile, updateProfile }: Step4TechnologyProps) {
  const toggleDeviceType = (type: DeviceType) => {
    const current = profile.deviceTypes || [];
    const updated = current.includes(type)
      ? current.filter((t) => t !== type)
      : [...current, type];
    updateProfile({ deviceTypes: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Technology Infrastructure
        </h2>
        <p className="text-gray-600">
          Understanding your technology helps us recommend appropriate curricula - from unplugged activities to advanced programming.
        </p>
      </div>

      {/* Device Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Device Availability <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {DEVICE_LEVELS.map((level) => {
            const isSelected = profile.deviceAvailability === level.value;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => updateProfile({ deviceAvailability: level.value })}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      isSelected ? 'border-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{level.label}</div>
                    <div className="text-sm text-gray-500">{level.description}</div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Device Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Device Types Available
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select all that apply. This affects which coding platforms we recommend.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {DEVICE_TYPES.map((device) => {
            const isSelected = profile.deviceTypes?.includes(device.value);
            return (
              <button
                key={device.value}
                type="button"
                onClick={() => toggleDeviceType(device.value)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50 text-slate-800'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{device.icon}</span>
                  <span>{device.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Internet Reliability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Internet Reliability
        </label>
        <div className="grid grid-cols-3 gap-2">
          {RELIABILITY_LEVELS.map((level) => {
            const isSelected = profile.internetReliability === level.value;
            return (
              <button
                key={level.value}
                type="button"
                onClick={() => updateProfile({ internetReliability: level.value })}
                className={`p-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900 text-sm">{level.label}</div>
                <div className="text-xs text-gray-500 mt-1">{level.description}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Helpful context based on selections */}
      {profile.deviceAvailability && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <div className="text-sm text-amber-800">
              {profile.deviceAvailability === 'veryLimited' && (
                <p>
                  <strong>No worries!</strong> We&apos;ll prioritize &quot;unplugged&quot; CS activities from CS Unplugged
                  and similar curricula that teach computational thinking without computers.
                </p>
              )}
              {profile.deviceAvailability === 'limited' && (
                <p>
                  We&apos;ll recommend a mix of unplugged activities and rotation-based computer time
                  with curricula like Code.org that work well with shared devices.
                </p>
              )}
              {profile.deviceAvailability === 'moderate' && (
                <p>
                  Great setup! We can recommend full programming curricula for grades with 1:1 access
                  and hybrid approaches for other grades.
                </p>
              )}
              {profile.deviceAvailability === 'strong' && (
                <p>
                  Excellent! You can implement any curriculum. We&apos;ll focus on the most effective
                  options for each grade level and pathway.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
