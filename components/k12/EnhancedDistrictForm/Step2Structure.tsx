'use client';

import React from 'react';
import {
  EnhancedDistrictProfile,
  SubjectArea,
  StaffRole,
  TeacherCountRange,
} from '@/lib/export/templates';

const SUBJECT_OPTIONS: { value: SubjectArea; label: string }[] = [
  { value: 'math', label: 'Mathematics' },
  { value: 'science', label: 'Science' },
  { value: 'ela', label: 'English Language Arts' },
  { value: 'socialStudies', label: 'Social Studies' },
  { value: 'art', label: 'Art' },
  { value: 'music', label: 'Music' },
  { value: 'pe', label: 'Physical Education' },
  { value: 'worldLanguages', label: 'World Languages' },
  { value: 'cte', label: 'Career & Technical Education' },
  { value: 'specialEducation', label: 'Special Education' },
  { value: 'libraryMedia', label: 'Library/Media' },
];

const STAFF_ROLES: { value: StaffRole; label: string; description: string }[] = [
  { value: 'librarians', label: 'Librarians', description: 'Can support CS research and digital literacy' },
  { value: 'counselors', label: 'Counselors', description: 'Career pathway guidance' },
  { value: 'instructionalCoaches', label: 'Instructional Coaches', description: 'PD support and mentoring' },
  { value: 'paraprofessionals', label: 'Paraprofessionals', description: 'Classroom support' },
  { value: 'afterSchoolStaff', label: 'After-School Staff', description: 'Extended learning opportunities' },
  { value: 'administration', label: 'Administration', description: 'Leadership buy-in' },
];

const TEACHER_COUNT_OPTIONS: { value: TeacherCountRange; label: string }[] = [
  { value: '0', label: 'None' },
  { value: '1-5', label: '1-5' },
  { value: '6-10', label: '6-10' },
  { value: '11-20', label: '11-20' },
  { value: '21-50', label: '21-50' },
  { value: '50+', label: '50+' },
];

interface Step2StructureProps {
  profile: Partial<EnhancedDistrictProfile>;
  updateProfile: (updates: Partial<EnhancedDistrictProfile>) => void;
}

export default function Step2Structure({ profile, updateProfile }: Step2StructureProps) {
  const toggleSubject = (subject: SubjectArea) => {
    const current = profile.subjectsTaught || [];
    const updated = current.includes(subject)
      ? current.filter((s) => s !== subject)
      : [...current, subject];
    updateProfile({ subjectsTaught: updated });
  };

  const toggleStaffRole = (role: StaffRole) => {
    const current = profile.otherStaff || [];
    const updated = current.includes(role)
      ? current.filter((r) => r !== role)
      : [...current, role];
    updateProfile({ otherStaff: updated });
  };

  const updateTeacherCount = (level: 'elementary' | 'middle' | 'high', count: TeacherCountRange) => {
    updateProfile({
      teacherCounts: {
        ...profile.teacherCounts,
        elementary: profile.teacherCounts?.elementary || '0',
        middle: profile.teacherCounts?.middle || '0',
        high: profile.teacherCounts?.high || '0',
        [level]: count,
      },
    });
  };

  const gradeLevels = profile.gradeLevels || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">School Structure</h2>
        <p className="text-gray-600">
          Help us understand your school&apos;s composition so we can provide subject-specific CS integration guidance.
        </p>
      </div>

      {/* Subjects Taught */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subjects Taught <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select all subjects your school offers. We&apos;ll provide CS integration ideas for each.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SUBJECT_OPTIONS.map((subject) => {
            const isSelected = profile.subjectsTaught?.includes(subject.value);
            return (
              <button
                key={subject.value}
                type="button"
                onClick={() => toggleSubject(subject.value)}
                className={`px-3 py-2 rounded-lg border text-sm transition-all ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50 text-slate-800'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                      isSelected ? 'border-slate-600 bg-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{subject.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Teacher Counts - Only show for selected grade levels */}
      {gradeLevels.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Approximate Teacher Counts
          </label>
          <p className="text-xs text-gray-500 mb-3">
            This helps us size professional development recommendations.
          </p>
          <div className="space-y-3">
            {gradeLevels.includes('elementary') && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 w-32">Elementary (K-5):</span>
                <select
                  value={profile.teacherCounts?.elementary || '0'}
                  onChange={(e) => updateTeacherCount('elementary', e.target.value as TeacherCountRange)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  {TEACHER_COUNT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} teachers
                    </option>
                  ))}
                </select>
              </div>
            )}
            {gradeLevels.includes('middle') && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 w-32">Middle School:</span>
                <select
                  value={profile.teacherCounts?.middle || '0'}
                  onChange={(e) => updateTeacherCount('middle', e.target.value as TeacherCountRange)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  {TEACHER_COUNT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} teachers
                    </option>
                  ))}
                </select>
              </div>
            )}
            {gradeLevels.includes('high') && (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 w-32">High School:</span>
                <select
                  value={profile.teacherCounts?.high || '0'}
                  onChange={(e) => updateTeacherCount('high', e.target.value as TeacherCountRange)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                >
                  {TEACHER_COUNT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label} teachers
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Other Staff to Include */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Other Staff to Include in Planning
        </label>
        <p className="text-xs text-gray-500 mb-3">
          Select staff roles that should be part of your CS integration plan.
        </p>
        <div className="space-y-2">
          {STAFF_ROLES.map((role) => {
            const isSelected = profile.otherStaff?.includes(role.value);
            return (
              <button
                key={role.value}
                type="button"
                onClick={() => toggleStaffRole(role.value)}
                className={`w-full p-3 rounded-lg border text-left transition-all ${
                  isSelected
                    ? 'border-slate-600 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'border-slate-600 bg-slate-600' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <span className="font-medium text-gray-900">{role.label}</span>
                    <span className="text-sm text-gray-500 ml-2">{role.description}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
