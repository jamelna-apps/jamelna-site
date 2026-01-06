# Jobs Enhanced Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add resume library with AI tailoring, company research, deadline insights, calendar sync, and global chat widget to the job search feature.

**Architecture:** Frontend (jamelna-site) calls Conductor API for all job operations. New endpoints added to Conductor for resumes, research, insights, and calendar. Frontend adds Resume Library UI, Research panel, Insights widget, and Chat widget.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Firebase Auth, Conductor API (Next.js), Tavily API, Claude API, Google Calendar API

---

## Phase 1: Resume Library

### Task 1.1: Add Resume Types

**Files:**
- Modify: `lib/jobs/types.ts`

**Step 1: Add Resume type to types.ts**

Add after the `Application` interface (around line 115):

```typescript
export interface Resume {
  id: string;
  userId: string;
  name: string;
  content: {
    summary: string;
    experience: Array<{
      title: string;
      company: string;
      startDate: string;
      endDate?: string;
      highlights: string[];
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: number;
    }>;
    skills: string[];
  };
  pdfUrl?: string;
  isDefault: boolean;
  sourceType: 'uploaded' | 'generated' | 'tailored';
  createdAt: string;
  updatedAt: string;
}

export interface TailoredResume {
  id: string;
  baseResumeId: string;
  jobId: string;
  content: Resume['content'];
  pdfUrl?: string;
  changes: string[];
  createdAt: string;
}
```

**Step 2: Commit**

```bash
git add lib/jobs/types.ts
git commit -m "feat(jobs): add Resume and TailoredResume types"
```

---

### Task 1.2: Add Resume API Client Functions

**Files:**
- Modify: `lib/jobs/conductor-client.ts`

**Step 1: Add resume functions at end of file**

```typescript
// Resume operations
export async function getResumes(sessionToken: string): Promise<ConductorResponse<Resume[]>> {
  return conductorFetch<Resume[]>('/api/jobs/resumes', { method: 'GET' }, sessionToken);
}

export async function getResume(sessionToken: string, resumeId: string): Promise<ConductorResponse<Resume>> {
  return conductorFetch<Resume>(`/api/jobs/resumes/${resumeId}`, { method: 'GET' }, sessionToken);
}

export async function createResume(
  sessionToken: string,
  resume: Omit<Resume, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<ConductorResponse<Resume>> {
  return conductorFetch<Resume>(
    '/api/jobs/resumes',
    { method: 'POST', body: JSON.stringify(resume) },
    sessionToken
  );
}

export async function updateResume(
  sessionToken: string,
  resumeId: string,
  updates: Partial<Resume>
): Promise<ConductorResponse<Resume>> {
  return conductorFetch<Resume>(
    `/api/jobs/resumes/${resumeId}`,
    { method: 'PUT', body: JSON.stringify(updates) },
    sessionToken
  );
}

export async function deleteResume(
  sessionToken: string,
  resumeId: string
): Promise<ConductorResponse<{ success: boolean }>> {
  return conductorFetch<{ success: boolean }>(
    `/api/jobs/resumes/${resumeId}`,
    { method: 'DELETE' },
    sessionToken
  );
}

export async function uploadResumePdf(
  sessionToken: string,
  file: File,
  name: string
): Promise<ConductorResponse<Resume>> {
  const url = `${CONDUCTOR_API_URL}/api/jobs/resumes/upload`;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${sessionToken}` },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: `Network error: ${error instanceof Error ? error.message : 'Unknown'}` };
  }
}

export async function tailorResume(
  sessionToken: string,
  baseResumeId: string,
  jobId: string
): Promise<ConductorResponse<TailoredResume>> {
  return conductorFetch<TailoredResume>(
    '/api/jobs/tailor-resume',
    { method: 'POST', body: JSON.stringify({ baseResumeId, jobId }) },
    sessionToken
  );
}
```

**Step 2: Add imports at top of file**

```typescript
import type {
  JobProfile,
  Job,
  Application,
  JobSettings,
  ScanResult,
  DiscoveredJob,
  DiscoveredJobStatus,
  Resume,
  TailoredResume
} from './types';
```

**Step 3: Commit**

```bash
git add lib/jobs/conductor-client.ts
git commit -m "feat(jobs): add resume API client functions"
```

---

### Task 1.3: Create ResumeLibrary Component

**Files:**
- Create: `components/jobs/ResumeLibrary.tsx`

**Step 1: Create the component**

```tsx
// components/jobs/ResumeLibrary.tsx
'use client';

import { useState, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getResumes, deleteResume, uploadResumePdf } from '@/lib/jobs/conductor-client';
import type { Resume } from '@/lib/jobs/types';

interface ResumeLibraryProps {
  onSelect?: (resume: Resume) => void;
  selectable?: boolean;
}

export default function ResumeLibrary({ onSelect, selectable = false }: ResumeLibraryProps) {
  const { sessionToken } = useJobsAuth();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadResumes();
  }, [sessionToken]);

  async function loadResumes() {
    if (!sessionToken) return;
    setLoading(true);
    const result = await getResumes(sessionToken);
    if (result.data) {
      setResumes(result.data);
    } else if (result.error) {
      setError(result.error);
    }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !sessionToken) return;

    setUploading(true);
    setError(null);

    const name = file.name.replace(/\.pdf$/i, '');
    const result = await uploadResumePdf(sessionToken, file, name);

    if (result.data) {
      setResumes([...resumes, result.data]);
    } else if (result.error) {
      setError(result.error);
    }

    setUploading(false);
    e.target.value = '';
  }

  async function handleDelete(resumeId: string) {
    if (!sessionToken) return;
    if (!confirm('Delete this resume version?')) return;

    const result = await deleteResume(sessionToken, resumeId);
    if (result.data?.success) {
      setResumes(resumes.filter(r => r.id !== resumeId));
    } else if (result.error) {
      setError(result.error);
    }
  }

  if (loading) {
    return <div className="text-[#636366] py-4">Loading resumes...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">Resume Library</h3>
        <label className="cursor-pointer">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="hidden"
            disabled={uploading}
          />
          <span
            className="px-4 py-2 text-sm rounded-lg bg-[#00a8ff] text-white hover:bg-[#0090dd] transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload PDF'}
          </span>
        </label>
      </div>

      {error && (
        <div className="p-3 rounded-md text-sm" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }}>
          {error}
        </div>
      )}

      {resumes.length === 0 ? (
        <div className="text-center py-8 text-[#636366]">
          <p>No resumes yet</p>
          <p className="text-sm mt-1">Upload a PDF to get started</p>
        </div>
      ) : (
        <div className="space-y-2">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className={`p-4 rounded-lg border transition-colors ${
                selectable ? 'cursor-pointer hover:border-[#00a8ff]' : ''
              }`}
              style={{ background: 'rgba(56, 56, 58, 0.5)', borderColor: 'rgba(56, 56, 58, 0.8)' }}
              onClick={() => selectable && onSelect?.(resume)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{resume.name}</span>
                    {resume.isDefault && (
                      <span className="px-2 py-0.5 text-xs rounded bg-[#00a8ff]/20 text-[#00a8ff]">
                        Default
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-xs rounded bg-[#636366]/20 text-[#636366]">
                      {resume.sourceType}
                    </span>
                  </div>
                  <div className="text-sm text-[#636366] mt-1">
                    Updated {new Date(resume.updatedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {resume.pdfUrl && (
                    <a
                      href={resume.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 text-sm text-[#00a8ff] hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View PDF
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(resume.id);
                    }}
                    className="px-2 py-1 text-sm text-[#f87171] hover:text-[#fca5a5]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/ResumeLibrary.tsx
git commit -m "feat(jobs): add ResumeLibrary component"
```

---

### Task 1.4: Add Resume Library to Profile Page

**Files:**
- Modify: `app/[locale]/jobs/profile/page.tsx`

**Step 1: Import ResumeLibrary**

Add at top with other imports:

```typescript
import ResumeLibrary from '@/components/jobs/ResumeLibrary';
```

**Step 2: Add Resume Library section after Import Section (around line 153)**

After the Import Section closing `</section>`, add:

```tsx
      {/* Resume Library Section */}
      <section className="glass-card p-6">
        <ResumeLibrary />
      </section>
```

**Step 3: Commit**

```bash
git add app/[locale]/jobs/profile/page.tsx
git commit -m "feat(jobs): add ResumeLibrary to profile page"
```

---

### Task 1.5: Create Conductor Resume API Endpoints

**Files (in Conductor repo):**
- Create: `src/app/api/jobs/resumes/route.ts`
- Create: `src/app/api/jobs/resumes/[resumeId]/route.ts`
- Create: `src/app/api/jobs/resumes/upload/route.ts`

**Step 1: Create resumes list/create endpoint**

Create `src/app/api/jobs/resumes/route.ts`:

```typescript
// src/app/api/jobs/resumes/route.ts
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { corsOptionsResponse, corsJson } from '@/lib/jobs/cors';

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const snapshot = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('resumes')
      .orderBy('updatedAt', 'desc')
      .get();

    const resumes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return corsJson(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return corsJson({ error: 'Failed to fetch resumes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const now = new Date().toISOString();

    const resume = {
      userId: user.uid,
      name: body.name || 'Untitled Resume',
      content: body.content || { summary: '', experience: [], education: [], skills: [] },
      pdfUrl: body.pdfUrl || null,
      isDefault: body.isDefault || false,
      sourceType: body.sourceType || 'uploaded',
      createdAt: now,
      updatedAt: now,
    };

    // If this is set as default, unset other defaults
    if (resume.isDefault) {
      const existingDefaults = await adminDb
        .collection('users')
        .doc(user.uid)
        .collection('resumes')
        .where('isDefault', '==', true)
        .get();

      const batch = adminDb.batch();
      existingDefaults.docs.forEach(doc => {
        batch.update(doc.ref, { isDefault: false });
      });
      await batch.commit();
    }

    const docRef = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('resumes')
      .add(resume);

    return corsJson({ id: docRef.id, ...resume });
  } catch (error) {
    console.error('Error creating resume:', error);
    return corsJson({ error: 'Failed to create resume' }, { status: 500 });
  }
}
```

**Step 2: Create single resume endpoint**

Create `src/app/api/jobs/resumes/[resumeId]/route.ts`:

```typescript
// src/app/api/jobs/resumes/[resumeId]/route.ts
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { corsOptionsResponse, corsJson } from '@/lib/jobs/cors';

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId } = await params;
    const doc = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('resumes')
      .doc(resumeId)
      .get();

    if (!doc.exists) {
      return corsJson({ error: 'Resume not found' }, { status: 404 });
    }

    return corsJson({ id: doc.id, ...doc.data() });
  } catch (error) {
    console.error('Error fetching resume:', error);
    return corsJson({ error: 'Failed to fetch resume' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId } = await params;
    const body = await request.json();

    const docRef = adminDb
      .collection('users')
      .doc(user.uid)
      .collection('resumes')
      .doc(resumeId);

    const doc = await docRef.get();
    if (!doc.exists) {
      return corsJson({ error: 'Resume not found' }, { status: 404 });
    }

    const updates = {
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Handle default flag
    if (updates.isDefault) {
      const existingDefaults = await adminDb
        .collection('users')
        .doc(user.uid)
        .collection('resumes')
        .where('isDefault', '==', true)
        .get();

      const batch = adminDb.batch();
      existingDefaults.docs.forEach(d => {
        if (d.id !== resumeId) {
          batch.update(d.ref, { isDefault: false });
        }
      });
      await batch.commit();
    }

    await docRef.update(updates);

    const updated = await docRef.get();
    return corsJson({ id: updated.id, ...updated.data() });
  } catch (error) {
    console.error('Error updating resume:', error);
    return corsJson({ error: 'Failed to update resume' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId } = await params;
    await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('resumes')
      .doc(resumeId)
      .delete();

    return corsJson({ success: true });
  } catch (error) {
    console.error('Error deleting resume:', error);
    return corsJson({ error: 'Failed to delete resume' }, { status: 500 });
  }
}
```

**Step 3: Commit (in Conductor repo)**

```bash
cd /Users/jmelendez/Documents/Projects/conductor
git add src/app/api/jobs/resumes/
git commit -m "feat(jobs): add resume CRUD API endpoints"
```

---

## Phase 2: AI Resume Tailoring

### Task 2.1: Create Tailor Resume API Endpoint

**Files (in Conductor repo):**
- Create: `src/app/api/jobs/tailor-resume/route.ts`

**Step 1: Create the endpoint**

```typescript
// src/app/api/jobs/tailor-resume/route.ts
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { corsOptionsResponse, corsJson } from '@/lib/jobs/cors';
import Anthropic from '@anthropic-ai/sdk';

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const { baseResumeId, jobId } = await request.json();

    if (!baseResumeId || !jobId) {
      return corsJson({ error: 'baseResumeId and jobId are required' }, { status: 400 });
    }

    // Fetch base resume
    const resumeDoc = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('resumes')
      .doc(baseResumeId)
      .get();

    if (!resumeDoc.exists) {
      return corsJson({ error: 'Resume not found' }, { status: 404 });
    }

    // Fetch job
    const jobDoc = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('jobs')
      .doc(jobId)
      .get();

    if (!jobDoc.exists) {
      return corsJson({ error: 'Job not found' }, { status: 404 });
    }

    const resume = resumeDoc.data()!;
    const job = jobDoc.data()!;

    // Use Claude to tailor the resume
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `You are a resume tailoring expert. Given a base resume and a job description, create a tailored version that highlights relevant experience and skills.

BASE RESUME:
${JSON.stringify(resume.content, null, 2)}

JOB POSTING:
Title: ${job.title}
Company: ${job.company}
Description: ${job.description}
Requirements: ${job.requirements?.join(', ') || 'Not specified'}

Return a JSON object with:
1. "content" - the tailored resume content (same structure as input)
2. "changes" - array of strings describing what was changed and why

Focus on:
- Reordering experience to highlight relevant roles
- Adjusting summary to match job requirements
- Emphasizing skills that match the requirements
- Using keywords from the job description naturally

Return ONLY valid JSON, no markdown.`
      }],
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    let tailoredData;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      tailoredData = JSON.parse(jsonMatch[0]);
    } catch {
      return corsJson({ error: 'Failed to parse AI response' }, { status: 500 });
    }

    // Save tailored resume
    const now = new Date().toISOString();
    const tailoredResume = {
      baseResumeId,
      jobId,
      content: tailoredData.content,
      changes: tailoredData.changes || [],
      createdAt: now,
    };

    const docRef = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('jobs')
      .doc(jobId)
      .collection('tailoredResumes')
      .add(tailoredResume);

    return corsJson({ id: docRef.id, ...tailoredResume });
  } catch (error) {
    console.error('Error tailoring resume:', error);
    return corsJson({ error: 'Failed to tailor resume' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/jobs/tailor-resume/route.ts
git commit -m "feat(jobs): add AI resume tailoring endpoint"
```

---

### Task 2.2: Create TailorResumeModal Component

**Files:**
- Create: `components/jobs/TailorResumeModal.tsx`

**Step 1: Create the component**

```tsx
// components/jobs/TailorResumeModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getResumes, tailorResume, createResume } from '@/lib/jobs/conductor-client';
import type { Resume, TailoredResume, Job } from '@/lib/jobs/types';

interface TailorResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job;
}

type Step = 'select' | 'tailoring' | 'preview';

export default function TailorResumeModal({ isOpen, onClose, job }: TailorResumeModalProps) {
  const { sessionToken } = useJobsAuth();
  const [step, setStep] = useState<Step>('select');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
  const [tailored, setTailored] = useState<TailoredResume | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen && sessionToken) {
      loadResumes();
      setStep('select');
      setTailored(null);
      setError(null);
    }
  }, [isOpen, sessionToken]);

  async function loadResumes() {
    if (!sessionToken) return;
    const result = await getResumes(sessionToken);
    if (result.data) {
      setResumes(result.data);
      const defaultResume = result.data.find(r => r.isDefault);
      if (defaultResume) setSelectedResume(defaultResume);
    }
  }

  async function handleTailor() {
    if (!sessionToken || !selectedResume) return;

    setLoading(true);
    setError(null);
    setStep('tailoring');

    const result = await tailorResume(sessionToken, selectedResume.id, job.id);

    if (result.data) {
      setTailored(result.data);
      setStep('preview');
    } else {
      setError(result.error || 'Failed to tailor resume');
      setStep('select');
    }

    setLoading(false);
  }

  async function handleSaveToLibrary() {
    if (!sessionToken || !tailored) return;

    setSaving(true);
    const result = await createResume(sessionToken, {
      name: `${selectedResume?.name} - ${job.company}`,
      content: tailored.content,
      isDefault: false,
      sourceType: 'tailored',
    });

    if (result.data) {
      onClose();
    } else {
      setError(result.error || 'Failed to save');
    }
    setSaving(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div
        className="w-full max-w-2xl max-h-[80vh] overflow-y-auto rounded-xl p-6"
        style={{ background: '#1C1C1E' }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Tailor Resume for {job.company}
          </h2>
          <button onClick={onClose} className="text-[#636366] hover:text-white text-2xl">
            &times;
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }}>
            {error}
          </div>
        )}

        {step === 'select' && (
          <div className="space-y-4">
            <p className="text-[#D1D1D6]">Select a base resume to tailor:</p>

            {resumes.length === 0 ? (
              <p className="text-[#636366] text-center py-8">
                No resumes in library. Upload one on your Profile page first.
              </p>
            ) : (
              <div className="space-y-2">
                {resumes.map((resume) => (
                  <div
                    key={resume.id}
                    onClick={() => setSelectedResume(resume)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedResume?.id === resume.id
                        ? 'border-[#00a8ff] bg-[#00a8ff]/10'
                        : 'border-[#38383A] hover:border-[#636366]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-white">{resume.name}</span>
                      {resume.isDefault && (
                        <span className="px-2 py-0.5 text-xs rounded bg-[#00a8ff]/20 text-[#00a8ff]">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[#D1D1D6] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleTailor}
                disabled={!selectedResume}
                className="px-6 py-2 rounded-lg bg-[#00a8ff] text-white disabled:opacity-50"
              >
                Tailor Resume
              </button>
            </div>
          </div>
        )}

        {step === 'tailoring' && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#00a8ff] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#D1D1D6]">AI is tailoring your resume...</p>
            <p className="text-sm text-[#636366] mt-2">This may take 10-20 seconds</p>
          </div>
        )}

        {step === 'preview' && tailored && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">Changes Made</h3>
              <ul className="list-disc list-inside space-y-1 text-[#D1D1D6] text-sm">
                {tailored.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-2">Tailored Summary</h3>
              <p className="text-[#D1D1D6] text-sm p-3 rounded-lg" style={{ background: 'rgba(56, 56, 58, 0.5)' }}>
                {tailored.content.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-[#D1D1D6] hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleSaveToLibrary}
                disabled={saving}
                className="px-4 py-2 rounded-lg border border-[#00a8ff] text-[#00a8ff] hover:bg-[#00a8ff]/10"
              >
                {saving ? 'Saving...' : 'Save to Library'}
              </button>
              <button
                className="px-6 py-2 rounded-lg bg-[#00a8ff] text-white"
                onClick={() => {
                  // TODO: Implement PDF download
                  alert('PDF download coming soon');
                }}
              >
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/TailorResumeModal.tsx
git commit -m "feat(jobs): add TailorResumeModal component"
```

---

## Phase 3: Company Research

### Task 3.1: Create Research API Endpoint (Conductor)

**Files:**
- Create: `src/app/api/jobs/research/route.ts`

**Step 1: Create the endpoint**

```typescript
// src/app/api/jobs/research/route.ts
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { corsOptionsResponse, corsJson } from '@/lib/jobs/cors';
import { searchWeb } from '@/lib/services/tavily';
import Anthropic from '@anthropic-ai/sdk';

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const { company, jobId } = await request.json();

    if (!company) {
      return corsJson({ error: 'company is required' }, { status: 400 });
    }

    const companySlug = company.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Check cache first
    const cacheDoc = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('companyResearch')
      .doc(companySlug)
      .get();

    if (cacheDoc.exists) {
      const cached = cacheDoc.data()!;
      const cacheAge = Date.now() - new Date(cached.updatedAt).getTime();
      const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

      if (cacheAge < ONE_WEEK) {
        // Update linked jobs if new jobId provided
        if (jobId && !cached.linkedJobIds?.includes(jobId)) {
          await cacheDoc.ref.update({
            linkedJobIds: [...(cached.linkedJobIds || []), jobId]
          });
        }
        return corsJson({ id: cacheDoc.id, ...cached, fromCache: true });
      }
    }

    // Search for company info
    const queries = [
      `${company} company reviews glassdoor`,
      `${company} salary compensation`,
      `${company} interview process questions`,
      `${company} company culture values`,
    ];

    const searchResults = await Promise.all(
      queries.map(q => searchWeb(q, 3))
    );

    const allResults = searchResults.flat();

    // Summarize with Claude
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Summarize this research about ${company} into structured sections.

SEARCH RESULTS:
${allResults.map(r => `Title: ${r.title}\nURL: ${r.url}\nContent: ${r.content?.substring(0, 500) || 'No content'}`).join('\n\n')}

Return JSON with these sections:
{
  "overview": "2-3 sentence company overview",
  "salary": "Salary range info if found, otherwise null",
  "culture": "Company culture and values summary",
  "interviews": "Interview process and tips if found"
}

Return ONLY valid JSON.`
      }],
    });

    const responseText = response.content[0].type === 'text' ? response.content[0].text : '';

    let research;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error('No JSON found');
      research = JSON.parse(jsonMatch[0]);
    } catch {
      research = { overview: responseText, salary: null, culture: null, interviews: null };
    }

    const now = new Date().toISOString();
    const researchDoc = {
      companyName: company,
      research,
      sources: allResults.map(r => ({ url: r.url, title: r.title })),
      linkedJobIds: jobId ? [jobId] : [],
      createdAt: cacheDoc.exists ? cacheDoc.data()!.createdAt : now,
      updatedAt: now,
    };

    await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('companyResearch')
      .doc(companySlug)
      .set(researchDoc);

    return corsJson({ id: companySlug, ...researchDoc, fromCache: false });
  } catch (error) {
    console.error('Error researching company:', error);
    return corsJson({ error: 'Failed to research company' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/jobs/research/route.ts
git commit -m "feat(jobs): add company research API endpoint with Tavily"
```

---

### Task 3.2: Add Research Client Functions

**Files:**
- Modify: `lib/jobs/conductor-client.ts`

**Step 1: Add types to types.ts first**

In `lib/jobs/types.ts`, add:

```typescript
export interface CompanyResearch {
  id: string;
  companyName: string;
  research: {
    overview: string;
    salary: string | null;
    culture: string | null;
    interviews: string | null;
  };
  sources: Array<{ url: string; title: string }>;
  linkedJobIds: string[];
  createdAt: string;
  updatedAt: string;
  fromCache?: boolean;
}
```

**Step 2: Add client function to conductor-client.ts**

```typescript
// Company research
export async function researchCompany(
  sessionToken: string,
  company: string,
  jobId?: string
): Promise<ConductorResponse<CompanyResearch>> {
  return conductorFetch<CompanyResearch>(
    '/api/jobs/research',
    { method: 'POST', body: JSON.stringify({ company, jobId }) },
    sessionToken
  );
}
```

**Step 3: Update imports**

```typescript
import type {
  // ... existing imports ...
  CompanyResearch
} from './types';
```

**Step 4: Commit**

```bash
git add lib/jobs/types.ts lib/jobs/conductor-client.ts
git commit -m "feat(jobs): add company research types and client function"
```

---

### Task 3.3: Create CompanyResearchPanel Component

**Files:**
- Create: `components/jobs/CompanyResearchPanel.tsx`

**Step 1: Create the component**

```tsx
// components/jobs/CompanyResearchPanel.tsx
'use client';

import { useState } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { researchCompany } from '@/lib/jobs/conductor-client';
import type { CompanyResearch } from '@/lib/jobs/types';

interface CompanyResearchPanelProps {
  company: string;
  jobId?: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyResearchPanel({
  company,
  jobId,
  isOpen,
  onClose
}: CompanyResearchPanelProps) {
  const { sessionToken } = useJobsAuth();
  const [research, setResearch] = useState<CompanyResearch | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResearch() {
    if (!sessionToken) return;

    setLoading(true);
    setError(null);

    const result = await researchCompany(sessionToken, company, jobId);

    if (result.data) {
      setResearch(result.data);
    } else {
      setError(result.error || 'Failed to research company');
    }

    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed right-0 top-0 h-full w-[400px] z-50 overflow-y-auto shadow-xl"
      style={{ background: '#1C1C1E' }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Research: {company}</h2>
          <button onClick={onClose} className="text-[#636366] hover:text-white text-2xl">
            &times;
          </button>
        </div>

        {!research && !loading && (
          <div className="text-center py-12">
            <p className="text-[#D1D1D6] mb-4">
              Get AI-powered insights about {company}
            </p>
            <button
              onClick={handleResearch}
              className="px-6 py-3 rounded-lg bg-[#00a8ff] text-white"
            >
              Research Company
            </button>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-[#00a8ff] border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-[#D1D1D6]">Researching {company}...</p>
            <p className="text-sm text-[#636366] mt-2">Searching reviews, salary data, and more</p>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-md mb-4" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#f87171' }}>
            {error}
            <button
              onClick={handleResearch}
              className="block mt-2 text-sm underline"
            >
              Try again
            </button>
          </div>
        )}

        {research && (
          <div className="space-y-6">
            {research.fromCache && (
              <p className="text-xs text-[#636366]">
                Cached {new Date(research.updatedAt).toLocaleDateString()}
              </p>
            )}

            <Section title="Overview" content={research.research.overview} />
            <Section title="Salary" content={research.research.salary} />
            <Section title="Culture" content={research.research.culture} />
            <Section title="Interview Process" content={research.research.interviews} />

            {research.sources.length > 0 && (
              <div>
                <h3 className="font-semibold text-white mb-2">Sources</h3>
                <ul className="space-y-1">
                  {research.sources.slice(0, 5).map((source, i) => (
                    <li key={i}>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#00a8ff] hover:underline truncate block"
                      >
                        {source.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={handleResearch}
              className="w-full py-2 text-sm text-[#636366] hover:text-white"
            >
              Refresh Research
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: string | null }) {
  if (!content) return null;

  return (
    <div>
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-[#D1D1D6] text-sm">{content}</p>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/CompanyResearchPanel.tsx
git commit -m "feat(jobs): add CompanyResearchPanel component"
```

---

## Phase 4: Deadline Insights

### Task 4.1: Create Insights API Endpoint (Conductor)

**Files:**
- Create: `src/app/api/jobs/insights/route.ts`

**Step 1: Create the endpoint**

```typescript
// src/app/api/jobs/insights/route.ts
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { corsOptionsResponse, corsJson } from '@/lib/jobs/cors';

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function GET(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get non-dismissed insights
    const snapshot = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('jobInsights')
      .where('dismissed', '==', false)
      .orderBy('priority')
      .orderBy('dueDate')
      .get();

    const insights = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return corsJson(insights);
  } catch (error) {
    console.error('Error fetching insights:', error);
    return corsJson({ error: 'Failed to fetch insights' }, { status: 500 });
  }
}

// Generate insights for a user (called by cron or manually)
export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const now = new Date();
    const insights: any[] = [];

    // Get all jobs
    const jobsSnapshot = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('jobs')
      .get();

    for (const jobDoc of jobsSnapshot.docs) {
      const job = jobDoc.data();

      // Check interview dates
      if (job.interviewDate) {
        const interviewDate = new Date(job.interviewDate);
        const daysUntil = Math.ceil((interviewDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntil > 0 && daysUntil <= 3) {
          insights.push({
            type: 'interview_upcoming',
            priority: daysUntil === 1 ? 'urgent' : 'high',
            title: `Interview with ${job.company} in ${daysUntil} day${daysUntil > 1 ? 's' : ''}`,
            description: `Your interview for ${job.title} is coming up soon.`,
            jobId: jobDoc.id,
            dueDate: job.interviewDate,
            dismissed: false,
            createdAt: now.toISOString(),
          });
        }
      }

      // Check application deadlines
      if (job.applicationDeadline) {
        const deadline = new Date(job.applicationDeadline);
        const daysUntil = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntil > 0 && daysUntil <= 7 && job.status === 'new') {
          insights.push({
            type: 'application_deadline',
            priority: daysUntil <= 3 ? 'urgent' : 'high',
            title: `Application deadline for ${job.company} in ${daysUntil} days`,
            description: `The application for ${job.title} closes soon.`,
            jobId: jobDoc.id,
            dueDate: job.applicationDeadline,
            dismissed: false,
            createdAt: now.toISOString(),
          });
        }
      }

      // Check for follow-up reminders (3 days after interview)
      if (job.status === 'interviewing' && job.lastInterviewDate) {
        const lastInterview = new Date(job.lastInterviewDate);
        const daysSince = Math.floor((now.getTime() - lastInterview.getTime()) / (1000 * 60 * 60 * 24));

        if (daysSince >= 3 && daysSince <= 5) {
          insights.push({
            type: 'follow_up_due',
            priority: 'medium',
            title: `Follow up with ${job.company}`,
            description: `It's been ${daysSince} days since your interview. Consider sending a follow-up.`,
            jobId: jobDoc.id,
            dueDate: now.toISOString(),
            dismissed: false,
            createdAt: now.toISOString(),
          });
        }
      }
    }

    // Clear old insights and add new ones
    const batch = adminDb.batch();

    const existingSnapshot = await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('jobInsights')
      .get();

    existingSnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    insights.forEach(insight => {
      const ref = adminDb
        .collection('users')
        .doc(user.uid)
        .collection('jobInsights')
        .doc();
      batch.set(ref, insight);
    });

    await batch.commit();

    return corsJson({ generated: insights.length, insights });
  } catch (error) {
    console.error('Error generating insights:', error);
    return corsJson({ error: 'Failed to generate insights' }, { status: 500 });
  }
}
```

**Step 2: Create dismiss endpoint**

Create `src/app/api/jobs/insights/[insightId]/dismiss/route.ts`:

```typescript
// src/app/api/jobs/insights/[insightId]/dismiss/route.ts
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { corsOptionsResponse, corsJson } from '@/lib/jobs/cors';

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ insightId: string }> }
) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const { insightId } = await params;

    await adminDb
      .collection('users')
      .doc(user.uid)
      .collection('jobInsights')
      .doc(insightId)
      .update({ dismissed: true });

    return corsJson({ success: true });
  } catch (error) {
    console.error('Error dismissing insight:', error);
    return corsJson({ error: 'Failed to dismiss insight' }, { status: 500 });
  }
}
```

**Step 3: Commit**

```bash
git add src/app/api/jobs/insights/
git commit -m "feat(jobs): add insights generation and dismiss endpoints"
```

---

### Task 4.2: Add Insights Types and Client

**Files:**
- Modify: `lib/jobs/types.ts`
- Modify: `lib/jobs/conductor-client.ts`

**Step 1: Add JobInsight type**

```typescript
export type InsightType = 'application_deadline' | 'interview_upcoming' | 'offer_response_due' | 'follow_up_due';
export type InsightPriority = 'urgent' | 'high' | 'medium';

export interface JobInsight {
  id: string;
  type: InsightType;
  priority: InsightPriority;
  title: string;
  description: string;
  jobId: string;
  dueDate: string;
  dismissed: boolean;
  createdAt: string;
}
```

**Step 2: Add client functions**

```typescript
// Insights
export async function getInsights(sessionToken: string): Promise<ConductorResponse<JobInsight[]>> {
  return conductorFetch<JobInsight[]>('/api/jobs/insights', { method: 'GET' }, sessionToken);
}

export async function generateInsights(sessionToken: string): Promise<ConductorResponse<{ generated: number }>> {
  return conductorFetch<{ generated: number }>('/api/jobs/insights', { method: 'POST' }, sessionToken);
}

export async function dismissInsight(
  sessionToken: string,
  insightId: string
): Promise<ConductorResponse<{ success: boolean }>> {
  return conductorFetch<{ success: boolean }>(
    `/api/jobs/insights/${insightId}/dismiss`,
    { method: 'POST' },
    sessionToken
  );
}
```

**Step 3: Commit**

```bash
git add lib/jobs/types.ts lib/jobs/conductor-client.ts
git commit -m "feat(jobs): add insights types and client functions"
```

---

### Task 4.3: Create InsightsWidget Component

**Files:**
- Create: `components/jobs/InsightsWidget.tsx`

**Step 1: Create the component**

```tsx
// components/jobs/InsightsWidget.tsx
'use client';

import { useState, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getInsights, dismissInsight } from '@/lib/jobs/conductor-client';
import type { JobInsight } from '@/lib/jobs/types';
import Link from 'next/link';

export default function InsightsWidget() {
  const { sessionToken } = useJobsAuth();
  const [insights, setInsights] = useState<JobInsight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInsights();
  }, [sessionToken]);

  async function loadInsights() {
    if (!sessionToken) return;
    const result = await getInsights(sessionToken);
    if (result.data) {
      setInsights(result.data);
    }
    setLoading(false);
  }

  async function handleDismiss(insightId: string) {
    if (!sessionToken) return;
    await dismissInsight(sessionToken, insightId);
    setInsights(insights.filter(i => i.id !== insightId));
  }

  if (loading || insights.length === 0) return null;

  const urgentCount = insights.filter(i => i.priority === 'urgent').length;
  const highCount = insights.filter(i => i.priority === 'high').length;

  return (
    <div
      className="rounded-xl p-4 mb-6"
      style={{
        background: urgentCount > 0
          ? 'rgba(239, 68, 68, 0.1)'
          : 'rgba(251, 191, 36, 0.1)',
        border: `1px solid ${urgentCount > 0 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">
          {urgentCount > 0 ? '🔴' : '🟡'}
        </span>
        <h3 className="font-semibold text-white">
          {urgentCount > 0 ? `${urgentCount} Urgent` : ''}
          {urgentCount > 0 && highCount > 0 ? ', ' : ''}
          {highCount > 0 ? `${highCount} Important` : ''}
          {urgentCount === 0 && highCount === 0 ? 'Reminders' : ''}
        </h3>
      </div>

      <div className="space-y-2">
        {insights.slice(0, 3).map((insight) => (
          <div
            key={insight.id}
            className="flex items-start justify-between gap-3 p-3 rounded-lg"
            style={{ background: 'rgba(0, 0, 0, 0.2)' }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <PriorityBadge priority={insight.priority} />
                <span className="text-white text-sm font-medium truncate">
                  {insight.title}
                </span>
              </div>
              <p className="text-[#636366] text-xs mt-1 truncate">
                {insight.description}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/jobs/view/${insight.jobId}`}
                className="text-xs text-[#00a8ff] hover:underline"
              >
                View
              </Link>
              <button
                onClick={() => handleDismiss(insight.id)}
                className="text-xs text-[#636366] hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>

      {insights.length > 3 && (
        <p className="text-xs text-[#636366] mt-2 text-center">
          +{insights.length - 3} more
        </p>
      )}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors = {
    urgent: 'bg-red-500/20 text-red-400',
    high: 'bg-yellow-500/20 text-yellow-400',
    medium: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <span className={`px-1.5 py-0.5 text-[10px] rounded ${colors[priority as keyof typeof colors] || colors.medium}`}>
      {priority.toUpperCase()}
    </span>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/InsightsWidget.tsx
git commit -m "feat(jobs): add InsightsWidget component"
```

---

## Phase 5: Calendar Integration

### Task 5.1: Extend Job Type with Calendar Fields

**Files:**
- Modify: `lib/jobs/types.ts`

**Step 1: Add calendar fields to Job interface**

Add these fields to the `Job` interface:

```typescript
export interface Job {
  // ... existing fields ...
  interviewDate?: string;
  interviewCalendarEventId?: string;
  applicationDeadline?: string;
  deadlineCalendarEventId?: string;
  lastInterviewDate?: string;
}
```

**Step 2: Commit**

```bash
git add lib/jobs/types.ts
git commit -m "feat(jobs): add calendar fields to Job type"
```

---

### Task 5.2: Create Calendar Sync API (Conductor)

**Files:**
- Create: `src/app/api/jobs/calendar-sync/route.ts`

**Step 1: Create the endpoint**

```typescript
// src/app/api/jobs/calendar-sync/route.ts
import { NextRequest } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { corsOptionsResponse, corsJson } from '@/lib/jobs/cors';
import { createCalendarEvent, deleteCalendarEvent } from '@/lib/google/calendar';
import { getGoogleTokens } from '@/lib/google/tokens';

export async function OPTIONS() {
  return corsOptionsResponse();
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser(request);
    if (!user) {
      return corsJson({ error: 'Unauthorized' }, { status: 401 });
    }

    const { jobId, type, date, remove } = await request.json();

    if (!jobId || !type) {
      return corsJson({ error: 'jobId and type are required' }, { status: 400 });
    }

    // Get user's Google tokens
    const tokens = await getGoogleTokens(user.uid);
    if (!tokens) {
      return corsJson({ error: 'Google Calendar not connected' }, { status: 400 });
    }

    const jobRef = adminDb
      .collection('users')
      .doc(user.uid)
      .collection('jobs')
      .doc(jobId);

    const jobDoc = await jobRef.get();
    if (!jobDoc.exists) {
      return corsJson({ error: 'Job not found' }, { status: 404 });
    }

    const job = jobDoc.data()!;
    const eventIdField = type === 'interview' ? 'interviewCalendarEventId' : 'deadlineCalendarEventId';
    const dateField = type === 'interview' ? 'interviewDate' : 'applicationDeadline';

    // Remove existing event if requested or if updating
    if (remove || (date && job[eventIdField])) {
      if (job[eventIdField]) {
        try {
          await deleteCalendarEvent(tokens, job[eventIdField]);
        } catch (e) {
          console.error('Failed to delete calendar event:', e);
        }
      }

      if (remove) {
        await jobRef.update({
          [eventIdField]: null,
          [dateField]: null,
        });
        return corsJson({ success: true, removed: true });
      }
    }

    // Create new event
    if (date) {
      const eventDate = new Date(date);
      const title = type === 'interview'
        ? `Interview: ${job.title} @ ${job.company}`
        : `Deadline: Apply to ${job.company}`;

      const description = `Role: ${job.title}\n\nView job: https://jamelna.com/jobs/view/${jobId}`;

      const event = await createCalendarEvent(tokens, {
        summary: title,
        description,
        start: eventDate,
        end: new Date(eventDate.getTime() + 60 * 60 * 1000), // 1 hour
        reminders: type === 'interview'
          ? [{ method: 'popup', minutes: 60 }, { method: 'popup', minutes: 1440 }]
          : [{ method: 'popup', minutes: 1440 }],
      });

      await jobRef.update({
        [eventIdField]: event.id,
        [dateField]: date,
      });

      return corsJson({ success: true, eventId: event.id });
    }

    return corsJson({ error: 'date is required for creating event' }, { status: 400 });
  } catch (error) {
    console.error('Error syncing calendar:', error);
    return corsJson({ error: 'Failed to sync calendar' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/jobs/calendar-sync/route.ts
git commit -m "feat(jobs): add calendar sync API endpoint"
```

---

## Phase 6: Global Chat Widget

### Task 6.1: Create ChatWidget Component

**Files:**
- Create: `components/jobs/ChatWidget.tsx`

**Step 1: Create the component**

```tsx
// components/jobs/ChatWidget.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatWidgetProps {
  context?: {
    type: 'job' | 'profile' | 'list' | 'dashboard';
    jobId?: string;
    company?: string;
  };
}

export default function ChatWidget({ context }: ChatWidgetProps) {
  const { sessionToken } = useJobsAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !sessionToken || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // Build context-aware prompt
      let contextPrompt = '';
      if (context?.type === 'job' && context.company) {
        contextPrompt = `Context: User is viewing a job at ${context.company}. `;
      } else if (context?.type === 'profile') {
        contextPrompt = 'Context: User is on their profile page. ';
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_CONDUCTOR_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({
          message: contextPrompt + userMessage,
          featureContext: 'jobs',
          selectedDocIds: context?.jobId ? [context.jobId] : undefined,
        }),
      });

      const data = await response.json();

      if (data.answer) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I couldn\'t process that request. Please try again.'
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Network error. Please check your connection and try again.'
      }]);
    }

    setLoading(false);
  }

  if (!sessionToken) return null;

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#00a8ff] text-white shadow-lg hover:bg-[#0090dd] transition-all z-50 flex items-center justify-center"
        style={{ boxShadow: '0 4px 20px rgba(0, 168, 255, 0.4)' }}
      >
        {isOpen ? (
          <span className="text-2xl">&times;</span>
        ) : (
          <span className="text-2xl">💬</span>
        )}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-[380px] h-[500px] rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden"
          style={{ background: '#1C1C1E' }}
        >
          {/* Header */}
          <div className="p-4 border-b border-[#38383A]">
            <h3 className="font-semibold text-white">Job Search Assistant</h3>
            <p className="text-xs text-[#636366]">
              {context?.company
                ? `Viewing ${context.company}`
                : 'Ask about jobs, interviews, or career advice'}
            </p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-[#636366] py-8">
                <p className="text-sm">Ask me anything about:</p>
                <ul className="text-xs mt-2 space-y-1">
                  <li>• Your saved jobs</li>
                  <li>• Interview preparation</li>
                  <li>• Resume tailoring</li>
                  <li>• Company research</li>
                </ul>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    msg.role === 'user'
                      ? 'bg-[#00a8ff] text-white'
                      : 'bg-[#38383A] text-[#D1D1D6]'
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#38383A] text-[#636366] p-3 rounded-lg text-sm">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-[#38383A]">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 rounded-lg text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={{ background: 'rgba(56, 56, 58, 0.5)' }}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-4 py-2 rounded-lg bg-[#00a8ff] text-white disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/ChatWidget.tsx
git commit -m "feat(jobs): add global ChatWidget component"
```

---

### Task 6.2: Add ChatWidget to Jobs Layout

**Files:**
- Modify: `app/[locale]/jobs/layout-client.tsx`

**Step 1: Import ChatWidget**

```typescript
import ChatWidget from '@/components/jobs/ChatWidget';
```

**Step 2: Add ChatWidget before closing tag**

Add just before the final `</div>` or closing tag:

```tsx
<ChatWidget />
```

**Step 3: Commit**

```bash
git add app/[locale]/jobs/layout-client.tsx
git commit -m "feat(jobs): add ChatWidget to jobs layout"
```

---

## Final: Push and Deploy

### Task F.1: Push Feature Branch

**Step 1: Verify all changes**

```bash
git log --oneline -20
git status
```

**Step 2: Push feature branch**

```bash
git push -u origin feature/jobs-enhanced-features
```

---

### Task F.2: Deploy Conductor Changes

**Step 1: Commit and push Conductor changes**

```bash
cd /Users/jmelendez/Documents/Projects/conductor
git status
git push origin main
```

---

## Summary

This plan implements:
- **Phase 1**: Resume Library (types, API, UI component)
- **Phase 2**: AI Resume Tailoring (endpoint, modal)
- **Phase 3**: Company Research (Tavily + Claude, panel)
- **Phase 4**: Deadline Insights (generation, widget)
- **Phase 5**: Calendar Integration (sync endpoint)
- **Phase 6**: Global Chat Widget (context-aware)

Each task is self-contained with exact file paths, complete code, and commit instructions.
