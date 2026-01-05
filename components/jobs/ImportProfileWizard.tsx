// components/jobs/ImportProfileWizard.tsx
'use client';

import { useState, useCallback } from 'react';
import { importProfile } from '@/lib/jobs/conductor-client';
import type { JobProfile } from '@/lib/jobs/types';

interface ImportProfileWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (profile: Partial<JobProfile>) => void;
  sessionToken: string;
}

type WizardStep = 'upload' | 'linkedin' | 'website' | 'results';

const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

export default function ImportProfileWizard({
  isOpen,
  onClose,
  onImportComplete,
  sessionToken
}: ImportProfileWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [websiteUrls, setWebsiteUrls] = useState([
    { url: 'https://jamelna.com/en/about', checked: true },
    { url: 'https://jamelna.com/en/services', checked: true },
    { url: 'https://jamelna.com/en/work', checked: true }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [extractedData, setExtractedData] = useState<Partial<JobProfile> | null>(null);
  const [sources, setSources] = useState<Record<string, any>>({});

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find(file => file.type === 'application/pdf');

    if (pdfFile) {
      setResumeFile(pdfFile);
      setError(null);
    } else {
      setError('Please upload a PDF file');
    }
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setResumeFile(file);
        setError(null);
      } else {
        setError('Please upload a PDF file');
      }
    }
  }, []);

  const handleProcess = async () => {
    setIsProcessing(true);
    setError(null);

    const selectedWebsites = websiteUrls
      .filter(w => w.checked)
      .map(w => w.url);

    const result = await importProfile(sessionToken, {
      resume: resumeFile || undefined,
      linkedInUrl: linkedInUrl.trim() || undefined,
      websiteUrls: selectedWebsites.length > 0 ? selectedWebsites : undefined
    });

    setIsProcessing(false);

    if (result.error) {
      setError(result.error);
    } else if (result.data) {
      setExtractedData(result.data.extracted);
      setSources(result.data.sources);
      setCurrentStep('results');
    }
  };

  const updateExtractedField = <K extends keyof JobProfile>(
    field: K,
    value: JobProfile[K]
  ) => {
    if (!extractedData) return;
    setExtractedData({ ...extractedData, [field]: value });
  };

  const handleSaveProfile = () => {
    if (extractedData) {
      onImportComplete(extractedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentStep('upload');
    setResumeFile(null);
    setLinkedInUrl('');
    setWebsiteUrls([
      { url: 'https://jamelna.com/en/about', checked: true },
      { url: 'https://jamelna.com/en/services', checked: true },
      { url: 'https://jamelna.com/en/work', checked: true }
    ]);
    setIsDragging(false);
    setIsProcessing(false);
    setError(null);
    setExtractedData(null);
    setSources({});
    onClose();
  };

  const handleNext = () => {
    if (currentStep === 'upload') {
      setCurrentStep('linkedin');
    } else if (currentStep === 'linkedin') {
      setCurrentStep('website');
    } else if (currentStep === 'website') {
      handleProcess();
    }
  };

  const handleBack = () => {
    if (currentStep === 'linkedin') {
      setCurrentStep('upload');
    } else if (currentStep === 'website') {
      setCurrentStep('linkedin');
    } else if (currentStep === 'results') {
      setCurrentStep('website');
    }
  };

  const handleSkip = () => {
    if (currentStep === 'linkedin') {
      setLinkedInUrl('');
      setCurrentStep('website');
    }
  };

  const canProceed = () => {
    if (currentStep === 'upload') return resumeFile !== null;
    if (currentStep === 'website') return resumeFile || linkedInUrl.trim();
    return true;
  };

  if (!isOpen) return null;

  const stepNumber = {
    upload: 1,
    linkedin: 2,
    website: 3,
    results: 4
  }[currentStep];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0, 0, 0, 0.75)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isProcessing) {
          handleClose();
        }
      }}
    >
      <div
        className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg"
        style={{
          background: 'rgba(28, 28, 30, 0.95)',
          border: '1px solid rgba(56, 56, 58, 0.8)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b border-[rgba(56,56,58,0.8)]"
          style={{ background: 'rgba(28, 28, 30, 0.95)' }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Import Profile Data</h2>
            {!isProcessing && (
              <button
                onClick={handleClose}
                className="text-[#636366] hover:text-white transition-colors text-2xl"
              >
                ×
              </button>
            )}
          </div>

          {/* Progress indicator */}
          {currentStep !== 'results' && (
            <div className="mt-4 flex items-center justify-center gap-2">
              {[1, 2, 3].map(step => (
                <div
                  key={step}
                  className="flex items-center"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
                    style={{
                      background: step <= stepNumber ? '#00a8ff' : 'rgba(56, 56, 58, 0.5)',
                      color: step <= stepNumber ? 'white' : '#636366'
                    }}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className="w-12 h-0.5 mx-1 transition-colors"
                      style={{
                        background: step < stepNumber ? '#00a8ff' : 'rgba(56, 56, 58, 0.5)'
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="mx-6 mt-4 p-4 rounded-md"
            style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }}
          >
            {error}
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Upload Resume */}
          {currentStep === 'upload' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Upload Your Resume</h3>
                <p className="text-[#D1D1D6] text-sm mb-4">
                  Upload a PDF of your resume. We'll extract your experience, skills, and education.
                </p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer"
                style={{
                  borderColor: isDragging ? '#00a8ff' : 'rgba(56, 56, 58, 0.8)',
                  background: isDragging ? 'rgba(0, 168, 255, 0.05)' : 'transparent'
                }}
                onClick={() => document.getElementById('resume-file-input')?.click()}
              >
                <input
                  id="resume-file-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                {resumeFile ? (
                  <div className="space-y-2">
                    <div className="text-[#40E0D0] text-4xl mb-2">✓</div>
                    <p className="text-white font-medium">{resumeFile.name}</p>
                    <p className="text-[#636366] text-sm">
                      {(resumeFile.size / 1024).toFixed(1)} KB
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setResumeFile(null);
                      }}
                      className="mt-2 text-sm text-[#00a8ff] hover:underline"
                    >
                      Remove file
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-[#636366] text-4xl mb-2">📄</div>
                    <p className="text-white font-medium">Drop your PDF here</p>
                    <p className="text-[#636366] text-sm">or click to browse</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: LinkedIn URL */}
          {currentStep === 'linkedin' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">LinkedIn Profile (Optional)</h3>
                <p className="text-[#D1D1D6] text-sm mb-4">
                  Add your LinkedIn URL to enrich your profile with additional information.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#D1D1D6] mb-2">
                  LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  value={linkedInUrl}
                  onChange={(e) => setLinkedInUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  className="w-full px-4 py-3 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                  style={inputStyle}
                />
              </div>

              <div className="pt-4 text-center">
                <button
                  onClick={handleSkip}
                  className="text-sm text-[#636366] hover:text-[#D1D1D6] transition-colors"
                >
                  Skip this step
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Website URLs */}
          {currentStep === 'website' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Scan jamelna.com Pages</h3>
                <p className="text-[#D1D1D6] text-sm mb-4">
                  Select which pages to scan for additional context about your work and expertise.
                </p>
              </div>

              <div className="space-y-3">
                {websiteUrls.map((item, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-md cursor-pointer hover:bg-[rgba(56,56,58,0.3)] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => {
                        const newUrls = [...websiteUrls];
                        newUrls[index].checked = e.target.checked;
                        setWebsiteUrls(newUrls);
                      }}
                      className="w-4 h-4 rounded accent-[#00a8ff]"
                    />
                    <span className="text-[#D1D1D6]">{item.url}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {currentStep === 'results' && extractedData && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Review Extracted Data</h3>
                <p className="text-[#D1D1D6] text-sm mb-4">
                  Review and edit the extracted information before saving to your profile.
                </p>
              </div>

              {/* Source Summary */}
              <div className="p-4 rounded-md" style={{ background: 'rgba(0, 168, 255, 0.1)' }}>
                <h4 className="text-sm font-medium text-[#00a8ff] mb-2">Data Sources</h4>
                <div className="space-y-1">
                  {Object.entries(sources).map(([source, info]: [string, any]) => (
                    <div key={source} className="text-sm text-[#D1D1D6]">
                      <span className="font-medium">{source}:</span>{' '}
                      {info.parsed ? (
                        <span className="text-[#40E0D0]">
                          ✓ {info.fields?.length || 0} fields extracted
                        </span>
                      ) : (
                        <span className="text-[#636366]">
                          {info.error || 'Not processed'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary */}
              {extractedData.summary && (
                <div>
                  <label className="block text-sm font-medium text-[#D1D1D6] mb-2">
                    Professional Summary
                  </label>
                  <textarea
                    value={extractedData.summary}
                    onChange={(e) => updateExtractedField('summary', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                    style={inputStyle}
                  />
                </div>
              )}

              {/* Skills */}
              {extractedData.skills && extractedData.skills.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-[#D1D1D6] mb-2">
                    Skills ({extractedData.skills.length})
                  </label>
                  <div className="space-y-2">
                    {extractedData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input
                          type="text"
                          value={skill.name}
                          onChange={(e) => {
                            const newSkills = [...(extractedData.skills || [])];
                            newSkills[index] = { ...skill, name: e.target.value };
                            updateExtractedField('skills', newSkills);
                          }}
                          className="flex-1 px-3 py-2 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                          style={inputStyle}
                        />
                        <select
                          value={skill.level}
                          onChange={(e) => {
                            const newSkills = [...(extractedData.skills || [])];
                            newSkills[index] = { ...skill, level: e.target.value as typeof skill.level };
                            updateExtractedField('skills', newSkills);
                          }}
                          className="px-3 py-2 rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                          style={inputStyle}
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                          <option value="expert">Expert</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            updateExtractedField(
                              'skills',
                              (extractedData.skills || []).filter((_, i) => i !== index)
                            );
                          }}
                          className="px-2 py-2 text-[#f87171] hover:text-[#fca5a5] transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experience */}
              {extractedData.experience && extractedData.experience.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-[#D1D1D6] mb-2">
                    Experience ({extractedData.experience.length} positions)
                  </label>
                  <div className="space-y-3">
                    {extractedData.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-md"
                        style={{ background: 'rgba(56, 56, 58, 0.3)' }}
                      >
                        <div className="text-white font-medium">{exp.title}</div>
                        <div className="text-[#D1D1D6] text-sm">{exp.company}</div>
                        <div className="text-[#636366] text-xs mt-1">
                          {exp.startDate} - {exp.endDate || 'Present'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education */}
              {extractedData.education && extractedData.education.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-[#D1D1D6] mb-2">
                    Education ({extractedData.education.length})
                  </label>
                  <div className="space-y-2">
                    {extractedData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-md"
                        style={{ background: 'rgba(56, 56, 58, 0.3)' }}
                      >
                        <div className="text-white font-medium">{edu.degree}</div>
                        <div className="text-[#D1D1D6] text-sm">{edu.institution}</div>
                        <div className="text-[#636366] text-xs">{edu.year}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Processing state */}
          {isProcessing && (
            <div className="py-12 text-center space-y-4">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#636366] border-t-[#00a8ff]" />
              <p className="text-[#D1D1D6]">Processing your data...</p>
              <p className="text-[#636366] text-sm">This may take a moment</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isProcessing && (
          <div className="sticky bottom-0 px-6 py-4 border-t border-[rgba(56,56,58,0.8)] flex justify-between"
            style={{ background: 'rgba(28, 28, 30, 0.95)' }}
          >
            <div>
              {currentStep !== 'upload' && currentStep !== 'results' && (
                <button
                  onClick={handleBack}
                  className="px-4 py-2 rounded-md text-[#D1D1D6] hover:text-white transition-colors"
                  style={{ background: 'rgba(56, 56, 58, 0.5)' }}
                >
                  Back
                </button>
              )}
              {currentStep === 'results' && (
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-md text-[#D1D1D6] hover:text-white transition-colors"
                  style={{ background: 'rgba(56, 56, 58, 0.5)' }}
                >
                  Cancel
                </button>
              )}
            </div>

            <div>
              {currentStep === 'results' ? (
                <button
                  onClick={handleSaveProfile}
                  className="btn-warm"
                >
                  Save to Profile
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="btn-warm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentStep === 'website' ? 'Process Data' : 'Next'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
