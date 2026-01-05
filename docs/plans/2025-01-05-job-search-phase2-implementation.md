# Job Search Phase 2 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task.

**Goal:** Add profile import wizard (resume + LinkedIn + jamelna.com) and automatic job discovery with daily scanning.

**Architecture:** Frontend wizard in jamelna-site, API endpoints in Conductor for file upload, text extraction, and job scanning. RSS feeds + web scrapers for job sources.

**Tech Stack:** Next.js, Firebase Storage, Anthropic Claude, Cheerio (HTML parsing), Vercel Cron

---

## Part A: Profile Import

### Task 1: Add Resume Upload to Firebase Storage (Conductor)

**Files:**
- Create: `conductor/src/app/api/jobs/upload-resume/route.ts`

**Step 1: Create the upload endpoint**

```typescript
// conductor/src/app/api/jobs/upload-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { getStorage } from 'firebase-admin/storage';
import { adminApp } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('resume') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = getStorage(adminApp).bucket();
    const filePath = `users/${user.uid}/resume.pdf`;
    const fileRef = bucket.file(filePath);

    await fileRef.save(buffer, {
      metadata: {
        contentType: 'application/pdf',
      },
    });

    // Make file publicly accessible (or use signed URLs)
    await fileRef.makePublic();
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

    return NextResponse.json({
      success: true,
      resumeUrl: publicUrl
    });
  } catch (error) {
    console.error('Error uploading resume:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
```

**Step 2: Verify Firebase Storage is configured**

Check `conductor/src/lib/firebase/admin.ts` exports storage. If not, ensure Firebase Storage is enabled in Firebase Console.

**Step 3: Test the endpoint**

```bash
curl -X POST https://conductor-jamelna-apps.vercel.app/api/jobs/upload-resume \
  -H "Authorization: Bearer $TOKEN" \
  -F "resume=@/path/to/resume.pdf"
```

**Step 4: Commit**

```bash
git add src/app/api/jobs/upload-resume/route.ts
git commit -m "feat(jobs): add resume upload endpoint"
```

---

### Task 2: Add PDF Text Extraction Endpoint (Conductor)

**Files:**
- Create: `conductor/src/lib/jobs/pdf-parser.ts`
- Create: `conductor/src/app/api/jobs/extract-resume/route.ts`

**Step 1: Install pdf-parse**

```bash
cd /Users/jmelendez/Documents/Projects/conductor
npm install pdf-parse
npm install --save-dev @types/pdf-parse
```

**Step 2: Create PDF parser utility**

```typescript
// conductor/src/lib/jobs/pdf-parser.ts
import pdf from 'pdf-parse';

export async function extractTextFromPdf(buffer: Buffer): Promise<string> {
  const data = await pdf(buffer);
  return data.text;
}
```

**Step 3: Create extraction endpoint**

```typescript
// conductor/src/app/api/jobs/extract-resume/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { extractTextFromPdf } from '@/lib/jobs/pdf-parser';
import Anthropic from '@anthropic-ai/sdk';

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('resume') as File;

    if (!file || file.type !== 'application/pdf') {
      return NextResponse.json({ error: 'PDF file required' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const text = await extractTextFromPdf(buffer);

    // Use Claude to extract structured profile data
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    const extraction = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Extract structured profile data from this resume. Return JSON only:

{
  "name": "Full name",
  "email": "Email if found",
  "location": "Location if found",
  "summary": "Professional summary (2-3 sentences)",
  "skills": [
    { "name": "Skill name", "level": "beginner|intermediate|advanced|expert", "yearsExp": 0 }
  ],
  "experience": [
    { "title": "Job title", "company": "Company", "startDate": "YYYY-MM", "endDate": "YYYY-MM or null", "highlights": ["Achievement 1", "Achievement 2"] }
  ],
  "education": [
    { "degree": "Degree name", "institution": "School name", "year": 2020 }
  ],
  "languages": [
    { "language": "Language", "proficiency": "basic|conversational|fluent|native" }
  ]
}

Resume text:
${text.substring(0, 30000)}`
      }],
    });

    const extractedText = extraction.content[0].type === 'text' ? extraction.content[0].text : '';
    const jsonMatch = extractedText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json({ error: 'Failed to parse resume' }, { status: 400 });
    }

    const profileData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      extracted: profileData,
      source: 'resume'
    });
  } catch (error) {
    console.error('Error extracting resume:', error);
    return NextResponse.json({ error: 'Extraction failed' }, { status: 500 });
  }
}
```

**Step 4: Commit**

```bash
git add src/lib/jobs/pdf-parser.ts src/app/api/jobs/extract-resume/route.ts package.json package-lock.json
git commit -m "feat(jobs): add PDF resume extraction endpoint"
```

---

### Task 3: Add LinkedIn Profile Extraction Endpoint (Conductor)

**Files:**
- Create: `conductor/src/app/api/jobs/extract-linkedin/route.ts`

**Step 1: Create LinkedIn extraction endpoint**

Note: LinkedIn blocks scraping, so we'll use a simplified approach that asks the user to paste their profile content, or fetches the public profile page and extracts what we can.

```typescript
// conductor/src/app/api/jobs/extract-linkedin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import Anthropic from '@anthropic-ai/sdk';

async function fetchLinkedInPage(url: string): Promise<string> {
  // LinkedIn blocks most scraping, but we can try with a browser-like User-Agent
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.text();
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { linkedInUrl } = await request.json();

    if (!linkedInUrl || !linkedInUrl.includes('linkedin.com/in/')) {
      return NextResponse.json({ error: 'Valid LinkedIn profile URL required' }, { status: 400 });
    }

    let pageContent: string;
    try {
      pageContent = await fetchLinkedInPage(linkedInUrl);
    } catch (error) {
      console.error('LinkedIn fetch error:', error);
      // LinkedIn often blocks - return a helpful message
      return NextResponse.json({
        error: 'Could not fetch LinkedIn profile. LinkedIn may be blocking the request. Please ensure your profile is public.',
        partial: true
      }, { status: 400 });
    }

    // Use Claude to extract what we can from the page
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    const extraction = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Extract profile data from this LinkedIn page HTML. Return JSON only. Extract whatever you can find:

{
  "name": "Full name",
  "headline": "Professional headline",
  "location": "Location",
  "summary": "About section summary",
  "skills": [{ "name": "Skill name", "level": "intermediate", "yearsExp": 0 }],
  "experience": [{ "title": "Title", "company": "Company", "startDate": "YYYY-MM", "endDate": "YYYY-MM or null", "highlights": [] }],
  "education": [{ "degree": "Degree", "institution": "School", "year": 2020 }]
}

HTML (may be partial due to LinkedIn restrictions):
${pageContent.substring(0, 50000)}`
      }],
    });

    const extractedText = extraction.content[0].type === 'text' ? extraction.content[0].text : '';
    const jsonMatch = extractedText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json({
        error: 'Could not extract profile data. LinkedIn may require login to view this profile.',
        partial: true
      }, { status: 400 });
    }

    const profileData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      extracted: profileData,
      source: 'linkedin',
      linkedInUrl
    });
  } catch (error) {
    console.error('Error extracting LinkedIn:', error);
    return NextResponse.json({ error: 'Extraction failed' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/jobs/extract-linkedin/route.ts
git commit -m "feat(jobs): add LinkedIn profile extraction endpoint"
```

---

### Task 4: Add Website Content Extraction Endpoint (Conductor)

**Files:**
- Create: `conductor/src/app/api/jobs/extract-website/route.ts`

**Step 1: Create website extraction endpoint**

```typescript
// conductor/src/app/api/jobs/extract-website/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import Anthropic from '@anthropic-ai/sdk';

async function fetchPageContent(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; ProfileBot/1.0)',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }

  return response.text();
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { urls } = await request.json();

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'URLs array required' }, { status: 400 });
    }

    // Fetch all pages
    const pageContents: string[] = [];
    for (const url of urls) {
      try {
        const content = await fetchPageContent(url);
        pageContents.push(`--- PAGE: ${url} ---\n${content}`);
      } catch (error) {
        console.error(`Failed to fetch ${url}:`, error);
      }
    }

    if (pageContents.length === 0) {
      return NextResponse.json({ error: 'Could not fetch any pages' }, { status: 400 });
    }

    const combinedContent = pageContents.join('\n\n');

    // Use Claude to extract profile-relevant information
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    const extraction = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Extract professional profile data from these personal website pages. Focus on:
- Professional experience and roles mentioned
- Skills and expertise areas
- Projects and accomplishments
- Education background if mentioned

Return JSON only:

{
  "name": "Full name if found",
  "summary": "Professional summary based on the content",
  "skills": [{ "name": "Skill/expertise area", "level": "beginner|intermediate|advanced|expert", "yearsExp": 0 }],
  "experience": [{ "title": "Role/title", "company": "Company/organization", "startDate": "YYYY-MM", "endDate": "YYYY-MM or null", "highlights": ["Achievement 1"] }],
  "projects": [{ "name": "Project name", "description": "Brief description", "technologies": ["tech1", "tech2"] }],
  "expertise": ["Area 1", "Area 2"]
}

Website content:
${combinedContent.substring(0, 60000)}`
      }],
    });

    const extractedText = extraction.content[0].type === 'text' ? extraction.content[0].text : '';
    const jsonMatch = extractedText.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return NextResponse.json({ error: 'Could not extract profile data' }, { status: 400 });
    }

    const profileData = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      extracted: profileData,
      source: 'website',
      urls
    });
  } catch (error) {
    console.error('Error extracting website:', error);
    return NextResponse.json({ error: 'Extraction failed' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/jobs/extract-website/route.ts
git commit -m "feat(jobs): add website content extraction endpoint"
```

---

### Task 5: Add Combined Profile Import Endpoint (Conductor)

**Files:**
- Create: `conductor/src/app/api/jobs/import-profile/route.ts`
- Create: `conductor/src/lib/jobs/profile-merger.ts`

**Step 1: Create profile merger utility**

```typescript
// conductor/src/lib/jobs/profile-merger.ts

interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsExp: number;
}

interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
}

interface Education {
  degree: string;
  institution: string;
  year: number;
}

interface ExtractedProfile {
  name?: string;
  email?: string;
  location?: string;
  summary?: string;
  skills?: Skill[];
  experience?: Experience[];
  education?: Education[];
  languages?: Array<{ language: string; proficiency: string }>;
  expertise?: string[];
}

const levelRank = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

export function mergeProfiles(sources: ExtractedProfile[]): ExtractedProfile {
  const merged: ExtractedProfile = {
    skills: [],
    experience: [],
    education: [],
    languages: [],
  };

  // Use first non-empty value for simple fields
  for (const source of sources) {
    if (!merged.name && source.name) merged.name = source.name;
    if (!merged.email && source.email) merged.email = source.email;
    if (!merged.location && source.location) merged.location = source.location;
    if (!merged.summary && source.summary) merged.summary = source.summary;
  }

  // Merge skills (dedupe by name, keep highest level)
  const skillMap = new Map<string, Skill>();
  for (const source of sources) {
    for (const skill of source.skills || []) {
      const key = skill.name.toLowerCase();
      const existing = skillMap.get(key);
      if (!existing || levelRank[skill.level] > levelRank[existing.level]) {
        skillMap.set(key, skill);
      }
    }
  }
  merged.skills = Array.from(skillMap.values());

  // Merge experience (dedupe by company+title similarity)
  const expSet = new Set<string>();
  for (const source of sources) {
    for (const exp of source.experience || []) {
      const key = `${exp.company.toLowerCase()}-${exp.title.toLowerCase()}`;
      if (!expSet.has(key)) {
        expSet.add(key);
        merged.experience!.push(exp);
      }
    }
  }

  // Merge education (dedupe by institution+degree)
  const eduSet = new Set<string>();
  for (const source of sources) {
    for (const edu of source.education || []) {
      const key = `${edu.institution.toLowerCase()}-${edu.degree.toLowerCase()}`;
      if (!eduSet.has(key)) {
        eduSet.add(key);
        merged.education!.push(edu);
      }
    }
  }

  // Merge languages (dedupe by language name)
  const langMap = new Map<string, { language: string; proficiency: string }>();
  for (const source of sources) {
    for (const lang of source.languages || []) {
      const key = lang.language.toLowerCase();
      if (!langMap.has(key)) {
        langMap.set(key, lang);
      }
    }
  }
  merged.languages = Array.from(langMap.values());

  return merged;
}
```

**Step 2: Create combined import endpoint**

```typescript
// conductor/src/app/api/jobs/import-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { getStorage } from 'firebase-admin/storage';
import { adminApp } from '@/lib/firebase/admin';
import { extractTextFromPdf } from '@/lib/jobs/pdf-parser';
import { mergeProfiles } from '@/lib/jobs/profile-merger';
import Anthropic from '@anthropic-ai/sdk';

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ProfileBot/1.0)' },
  });
  if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
  return response.text();
}

async function extractWithClaude(anthropic: Anthropic, content: string, source: string): Promise<any> {
  const extraction = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `Extract professional profile data from this ${source}. Return JSON only:

{
  "name": "Full name",
  "email": "Email if found",
  "location": "Location if found",
  "summary": "Professional summary (2-3 sentences)",
  "skills": [{ "name": "Skill", "level": "beginner|intermediate|advanced|expert", "yearsExp": 0 }],
  "experience": [{ "title": "Title", "company": "Company", "startDate": "YYYY-MM", "endDate": "YYYY-MM or null", "highlights": ["Achievement"] }],
  "education": [{ "degree": "Degree", "institution": "School", "year": 2020 }],
  "languages": [{ "language": "Language", "proficiency": "basic|conversational|fluent|native" }]
}

Content:
${content.substring(0, 40000)}`
    }],
  });

  const text = extraction.content[0].type === 'text' ? extraction.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const resumeFile = formData.get('resume') as File | null;
    const linkedInUrl = formData.get('linkedInUrl') as string | null;
    const websiteUrls = formData.get('websiteUrls') as string | null;

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const extractedProfiles: any[] = [];
    const sources: Record<string, any> = {};

    // 1. Extract from resume
    if (resumeFile && resumeFile.type === 'application/pdf') {
      try {
        const buffer = Buffer.from(await resumeFile.arrayBuffer());
        const text = await extractTextFromPdf(buffer);
        const profile = await extractWithClaude(anthropic, text, 'resume');
        if (profile) {
          extractedProfiles.push(profile);
          sources.resume = { parsed: true, fields: Object.keys(profile) };
        }

        // Save resume to storage
        const bucket = getStorage(adminApp).bucket();
        const filePath = `users/${user.uid}/resume.pdf`;
        await bucket.file(filePath).save(buffer, { metadata: { contentType: 'application/pdf' } });
        await bucket.file(filePath).makePublic();
        sources.resume.url = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
      } catch (error) {
        console.error('Resume extraction error:', error);
        sources.resume = { parsed: false, error: 'Failed to parse resume' };
      }
    }

    // 2. Extract from LinkedIn
    if (linkedInUrl && linkedInUrl.includes('linkedin.com/in/')) {
      try {
        const pageContent = await fetchPage(linkedInUrl);
        const profile = await extractWithClaude(anthropic, pageContent, 'LinkedIn profile page');
        if (profile) {
          extractedProfiles.push(profile);
          sources.linkedin = { parsed: true, url: linkedInUrl };
        }
      } catch (error) {
        console.error('LinkedIn extraction error:', error);
        sources.linkedin = { parsed: false, error: 'Could not fetch LinkedIn profile' };
      }
    }

    // 3. Extract from website pages
    if (websiteUrls) {
      const urls = JSON.parse(websiteUrls) as string[];
      const pageContents: string[] = [];

      for (const url of urls) {
        try {
          const content = await fetchPage(url);
          pageContents.push(`--- ${url} ---\n${content}`);
        } catch (error) {
          console.error(`Failed to fetch ${url}:`, error);
        }
      }

      if (pageContents.length > 0) {
        try {
          const profile = await extractWithClaude(anthropic, pageContents.join('\n\n'), 'personal website');
          if (profile) {
            extractedProfiles.push(profile);
            sources.website = { parsed: true, pages: urls };
          }
        } catch (error) {
          console.error('Website extraction error:', error);
          sources.website = { parsed: false, error: 'Failed to extract from website' };
        }
      }
    }

    if (extractedProfiles.length === 0) {
      return NextResponse.json({ error: 'No profile data could be extracted from any source' }, { status: 400 });
    }

    // Merge all extracted profiles
    const merged = mergeProfiles(extractedProfiles);

    return NextResponse.json({
      extracted: merged,
      sources
    });
  } catch (error) {
    console.error('Error importing profile:', error);
    return NextResponse.json({ error: 'Import failed' }, { status: 500 });
  }
}
```

**Step 3: Commit**

```bash
git add src/lib/jobs/profile-merger.ts src/app/api/jobs/import-profile/route.ts
git commit -m "feat(jobs): add combined profile import endpoint with merger"
```

---

### Task 6: Add Import Profile Client Function (jamelna-site)

**Files:**
- Modify: `jamelna-site/lib/jobs/conductor-client.ts`

**Step 1: Add importProfile function**

Add to the end of `conductor-client.ts`:

```typescript
// Profile import
export async function importProfile(
  sessionToken: string,
  data: {
    resume?: File;
    linkedInUrl?: string;
    websiteUrls?: string[];
  }
): Promise<ConductorResponse<{
  extracted: Partial<JobProfile>;
  sources: Record<string, any>;
}>> {
  const url = `${CONDUCTOR_API_URL}/api/jobs/import-profile`;

  const formData = new FormData();
  if (data.resume) {
    formData.append('resume', data.resume);
  }
  if (data.linkedInUrl) {
    formData.append('linkedInUrl', data.linkedInUrl);
  }
  if (data.websiteUrls && data.websiteUrls.length > 0) {
    formData.append('websiteUrls', JSON.stringify(data.websiteUrls));
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
        // Don't set Content-Type for FormData - browser sets it with boundary
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    const responseData = await response.json();
    return { data: responseData };
  } catch (error) {
    console.error('Import profile error:', error);
    return { error: 'Network error' };
  }
}
```

**Step 2: Commit**

```bash
git add lib/jobs/conductor-client.ts
git commit -m "feat(jobs): add importProfile client function"
```

---

### Task 7: Create Import Profile Wizard Component (jamelna-site)

**Files:**
- Create: `jamelna-site/components/jobs/ImportProfileWizard.tsx`

**Step 1: Create the wizard component**

```typescript
// components/jobs/ImportProfileWizard.tsx
'use client';

import { useState, useCallback } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { importProfile, updateProfile } from '@/lib/jobs/conductor-client';
import type { JobProfile } from '@/lib/jobs/types';

interface ImportProfileWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

type Step = 'resume' | 'linkedin' | 'website' | 'processing' | 'review';

const JAMELNA_PAGES = [
  { url: 'https://jamelna.com/en/about', label: 'About' },
  { url: 'https://jamelna.com/en/services', label: 'Services' },
  { url: 'https://jamelna.com/en/work', label: 'Work' },
];

export default function ImportProfileWizard({ isOpen, onClose, onComplete }: ImportProfileWizardProps) {
  const { sessionToken } = useJobsAuth();
  const [step, setStep] = useState<Step>('resume');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [selectedPages, setSelectedPages] = useState<string[]>(JAMELNA_PAGES.map(p => p.url));
  const [extractedProfile, setExtractedProfile] = useState<Partial<JobProfile> | null>(null);
  const [sources, setSources] = useState<Record<string, any>>({});
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
    }
  }, []);

  const handleImport = async () => {
    if (!sessionToken) return;

    setStep('processing');
    setError(null);

    const result = await importProfile(sessionToken, {
      resume: resumeFile || undefined,
      linkedInUrl: linkedInUrl || undefined,
      websiteUrls: selectedPages.length > 0 ? selectedPages : undefined,
    });

    if (result.error) {
      setError(result.error);
      setStep('resume'); // Go back to start
      return;
    }

    if (result.data) {
      setExtractedProfile(result.data.extracted);
      setSources(result.data.sources);
      setStep('review');
    }
  };

  const handleSave = async () => {
    if (!sessionToken || !extractedProfile) return;

    setSaving(true);
    const result = await updateProfile(sessionToken, extractedProfile);
    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    onComplete();
    onClose();
  };

  const togglePage = (url: string) => {
    setSelectedPages(prev =>
      prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={onClose} />

        <div className="relative rounded-2xl shadow-xl max-w-lg w-full p-6" style={{ background: 'rgba(44, 44, 46, 0.95)', border: '1px solid rgba(56, 56, 58, 0.5)' }}>
          {/* Step 1: Resume */}
          {step === 'resume' && (
            <>
              <h2 className="text-lg font-semibold text-white mb-2">Import Profile</h2>
              <p className="text-sm text-[#D1D1D6] mb-4">Step 1 of 3: Upload Resume (PDF)</p>

              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-[#00a8ff] transition-colors"
                style={{ borderColor: resumeFile ? '#40E0D0' : 'rgba(56, 56, 58, 0.8)' }}
                onClick={() => document.getElementById('resume-input')?.click()}
              >
                <input
                  id="resume-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                {resumeFile ? (
                  <p className="text-[#40E0D0]">{resumeFile.name}</p>
                ) : (
                  <p className="text-[#636366]">Drag & drop your resume (PDF) or click to browse</p>
                )}
              </div>

              {error && <p className="mt-4 text-sm text-[#f87171]">{error}</p>}

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep('linkedin')} className="text-[#D1D1D6] hover:text-white">
                  Skip
                </button>
                <button onClick={() => setStep('linkedin')} className="btn-warm">
                  Next →
                </button>
              </div>
            </>
          )}

          {/* Step 2: LinkedIn */}
          {step === 'linkedin' && (
            <>
              <h2 className="text-lg font-semibold text-white mb-2">Import Profile</h2>
              <p className="text-sm text-[#D1D1D6] mb-4">Step 2 of 3: LinkedIn Profile (Optional)</p>

              <input
                type="url"
                value={linkedInUrl}
                onChange={(e) => setLinkedInUrl(e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
                className="w-full px-3 py-2 rounded-md text-white placeholder-[#636366] focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
                style={inputStyle}
              />
              <p className="mt-1 text-xs text-[#636366]">
                Note: LinkedIn may block some requests. Public profiles work best.
              </p>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep('resume')} className="text-[#D1D1D6] hover:text-white">
                  ← Back
                </button>
                <div className="flex gap-2">
                  <button onClick={() => setStep('website')} className="text-[#D1D1D6] hover:text-white">
                    Skip
                  </button>
                  <button onClick={() => setStep('website')} className="btn-warm">
                    Next →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Step 3: Website */}
          {step === 'website' && (
            <>
              <h2 className="text-lg font-semibold text-white mb-2">Import Profile</h2>
              <p className="text-sm text-[#D1D1D6] mb-4">Step 3 of 3: jamelna.com Pages</p>

              <div className="space-y-2">
                {JAMELNA_PAGES.map((page) => (
                  <label key={page.url} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedPages.includes(page.url)}
                      onChange={() => togglePage(page.url)}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-[#D1D1D6]">{page.label}</span>
                    <span className="text-xs text-[#636366]">({page.url})</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep('linkedin')} className="text-[#D1D1D6] hover:text-white">
                  ← Back
                </button>
                <button onClick={handleImport} className="btn-warm">
                  Import Profile
                </button>
              </div>
            </>
          )}

          {/* Processing */}
          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#00a8ff] border-t-transparent mx-auto mb-4" />
              <p className="text-[#D1D1D6]">Analyzing your profile sources...</p>
              <p className="text-sm text-[#636366] mt-2">This may take 30-60 seconds</p>
            </div>
          )}

          {/* Review */}
          {step === 'review' && extractedProfile && (
            <>
              <h2 className="text-lg font-semibold text-white mb-2">Review Extracted Profile</h2>
              <p className="text-sm text-[#D1D1D6] mb-4">
                Sources: {Object.entries(sources).filter(([, v]) => v.parsed).map(([k]) => k).join(', ')}
              </p>

              <div className="max-h-80 overflow-y-auto space-y-4">
                {extractedProfile.name && (
                  <div>
                    <label className="text-xs text-[#636366]">Name</label>
                    <p className="text-white">{extractedProfile.name}</p>
                  </div>
                )}
                {extractedProfile.summary && (
                  <div>
                    <label className="text-xs text-[#636366]">Summary</label>
                    <p className="text-sm text-[#D1D1D6]">{extractedProfile.summary}</p>
                  </div>
                )}
                {extractedProfile.skills && extractedProfile.skills.length > 0 && (
                  <div>
                    <label className="text-xs text-[#636366]">Skills ({extractedProfile.skills.length})</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {extractedProfile.skills.slice(0, 10).map((s, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0, 168, 255, 0.2)', color: '#00a8ff' }}>
                          {s.name}
                        </span>
                      ))}
                      {extractedProfile.skills.length > 10 && (
                        <span className="text-xs text-[#636366]">+{extractedProfile.skills.length - 10} more</span>
                      )}
                    </div>
                  </div>
                )}
                {extractedProfile.experience && extractedProfile.experience.length > 0 && (
                  <div>
                    <label className="text-xs text-[#636366]">Experience ({extractedProfile.experience.length})</label>
                    {extractedProfile.experience.slice(0, 3).map((exp, i) => (
                      <p key={i} className="text-sm text-[#D1D1D6]">{exp.title} @ {exp.company}</p>
                    ))}
                  </div>
                )}
              </div>

              {error && <p className="mt-4 text-sm text-[#f87171]">{error}</p>}

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep('resume')} className="text-[#D1D1D6] hover:text-white">
                  Start Over
                </button>
                <button onClick={handleSave} disabled={saving} className="btn-warm disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save to Profile'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/ImportProfileWizard.tsx
git commit -m "feat(jobs): add ImportProfileWizard component"
```

---

### Task 8: Add Import Button to Profile Page (jamelna-site)

**Files:**
- Modify: `jamelna-site/app/[locale]/jobs/profile/page.tsx`

**Step 1: Import and add the wizard**

Add imports at the top:
```typescript
import ImportProfileWizard from '@/components/jobs/ImportProfileWizard';
```

Add state for showing wizard:
```typescript
const [showImportWizard, setShowImportWizard] = useState(false);
```

Add button in the header area (after the h1):
```typescript
<div className="flex justify-between items-start">
  <div>
    <h1 className="text-2xl font-bold text-white">Your Profile</h1>
    <p className="text-[#D1D1D6]">This information powers job matching and cover letter generation</p>
  </div>
  <button
    onClick={() => setShowImportWizard(true)}
    className="btn-warm"
  >
    Import Profile
  </button>
</div>
```

Add wizard component before the closing `</form>`:
```typescript
<ImportProfileWizard
  isOpen={showImportWizard}
  onClose={() => setShowImportWizard(false)}
  onComplete={loadProfile}
/>
```

**Step 2: Commit**

```bash
git add app/[locale]/jobs/profile/page.tsx
git commit -m "feat(jobs): add Import Profile button to profile page"
```

---

## Part B: Job Discovery

### Task 9: Create RSS Feed Fetcher Utility (Conductor)

**Files:**
- Create: `conductor/src/lib/jobs/rss-fetcher.ts`

**Step 1: Create RSS fetcher**

```typescript
// conductor/src/lib/jobs/rss-fetcher.ts
import { parseStringPromise } from 'xml2js';

export interface RssJob {
  title: string;
  link: string;
  description: string;
  pubDate?: string;
  source: string;
}

const RSS_FEEDS = [
  { name: 'edsurge', url: 'https://www.edsurge.com/jobs.rss', label: 'EdSurge Jobs' },
  { name: 'remoteok', url: 'https://remoteok.com/remote-jobs.rss', label: 'RemoteOK' },
  { name: 'weworkremotely', url: 'https://weworkremotely.com/categories/remote-jobs.rss', label: 'WeWorkRemotely' },
];

async function fetchFeed(feedConfig: typeof RSS_FEEDS[0]): Promise<RssJob[]> {
  try {
    const response = await fetch(feedConfig.url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JobBot/1.0)' },
    });

    if (!response.ok) {
      console.error(`Failed to fetch ${feedConfig.name}: ${response.status}`);
      return [];
    }

    const xml = await response.text();
    const result = await parseStringPromise(xml);

    const items = result.rss?.channel?.[0]?.item || result.feed?.entry || [];

    return items.map((item: any) => ({
      title: item.title?.[0] || item.title || 'Untitled',
      link: item.link?.[0]?.$ ? item.link[0].$.href : item.link?.[0] || item.link || '',
      description: item.description?.[0] || item.summary?.[0] || item.content?.[0] || '',
      pubDate: item.pubDate?.[0] || item.published?.[0] || item.updated?.[0] || null,
      source: feedConfig.name,
    }));
  } catch (error) {
    console.error(`Error fetching ${feedConfig.name}:`, error);
    return [];
  }
}

export async function fetchAllRssFeeds(enabledSources?: string[]): Promise<RssJob[]> {
  const feeds = enabledSources
    ? RSS_FEEDS.filter(f => enabledSources.includes(f.name))
    : RSS_FEEDS;

  const results = await Promise.all(feeds.map(fetchFeed));
  return results.flat();
}

export { RSS_FEEDS };
```

**Step 2: Install xml2js**

```bash
cd /Users/jmelendez/Documents/Projects/conductor
npm install xml2js
npm install --save-dev @types/xml2js
```

**Step 3: Commit**

```bash
git add src/lib/jobs/rss-fetcher.ts package.json package-lock.json
git commit -m "feat(jobs): add RSS feed fetcher utility"
```

---

### Task 10: Create Web Scraper Utilities (Conductor)

**Files:**
- Create: `conductor/src/lib/jobs/scrapers.ts`

**Step 1: Install cheerio**

```bash
cd /Users/jmelendez/Documents/Projects/conductor
npm install cheerio
npm install --save-dev @types/cheerio
```

**Step 2: Create scrapers**

```typescript
// conductor/src/lib/jobs/scrapers.ts
import * as cheerio from 'cheerio';

export interface ScrapedJob {
  title: string;
  link: string;
  company: string;
  location?: string;
  description?: string;
  source: string;
}

async function fetchPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JobBot/1.0)' },
  });
  if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
  return response.text();
}

// ISTE Job Board scraper
async function scrapeISTE(): Promise<ScrapedJob[]> {
  try {
    const html = await fetchPage('https://my.iste.org/s/community-job-board');
    const $ = cheerio.load(html);
    const jobs: ScrapedJob[] = [];

    // ISTE uses dynamic loading, so this may need adjustment
    // This is a placeholder structure
    $('.job-listing, .job-item, [data-job]').each((_, el) => {
      const title = $(el).find('.job-title, h3, h4').first().text().trim();
      const link = $(el).find('a').attr('href') || '';
      const company = $(el).find('.company, .organization').first().text().trim();

      if (title && link) {
        jobs.push({
          title,
          link: link.startsWith('http') ? link : `https://my.iste.org${link}`,
          company: company || 'ISTE Job Board',
          source: 'iste',
        });
      }
    });

    return jobs;
  } catch (error) {
    console.error('ISTE scraper error:', error);
    return [];
  }
}

// Generic company careers page scraper
async function scrapeCompanyPage(config: {
  name: string;
  url: string;
  jobSelector: string;
  titleSelector: string;
  linkSelector: string;
}): Promise<ScrapedJob[]> {
  try {
    const html = await fetchPage(config.url);
    const $ = cheerio.load(html);
    const jobs: ScrapedJob[] = [];

    $(config.jobSelector).each((_, el) => {
      const title = $(el).find(config.titleSelector).first().text().trim();
      const linkEl = $(el).find(config.linkSelector).first();
      const link = linkEl.attr('href') || '';

      if (title && link) {
        const fullLink = link.startsWith('http') ? link : new URL(link, config.url).toString();
        jobs.push({
          title,
          link: fullLink,
          company: config.name,
          source: config.name.toLowerCase().replace(/\s+/g, '-'),
        });
      }
    });

    return jobs;
  } catch (error) {
    console.error(`${config.name} scraper error:`, error);
    return [];
  }
}

// Spanish EdTech company scrapers
const COMPANY_CONFIGS = [
  {
    name: 'Odilo',
    url: 'https://www.odilo.es/careers',
    jobSelector: '.job-listing, .career-item, .position',
    titleSelector: 'h3, h4, .title',
    linkSelector: 'a',
  },
  {
    name: 'Innovamat',
    url: 'https://www.innovamat.com/careers',
    jobSelector: '.job-posting, .position, .career-opening',
    titleSelector: 'h3, h4, .job-title',
    linkSelector: 'a',
  },
  {
    name: 'Genially',
    url: 'https://genial.ly/jobs',
    jobSelector: '.job-card, .position-card, .opening',
    titleSelector: 'h3, h4, .title',
    linkSelector: 'a',
  },
  {
    name: 'Smile and Learn',
    url: 'https://smileandlearn.com/careers',
    jobSelector: '.job-item, .career, .position',
    titleSelector: 'h3, h4, .job-title',
    linkSelector: 'a',
  },
];

export async function scrapeAllCompanies(enabledSources?: string[]): Promise<ScrapedJob[]> {
  const results: ScrapedJob[] = [];

  // Scrape ISTE if enabled
  if (!enabledSources || enabledSources.includes('iste')) {
    const isteJobs = await scrapeISTE();
    results.push(...isteJobs);
  }

  // Scrape company pages
  for (const config of COMPANY_CONFIGS) {
    const sourceName = config.name.toLowerCase().replace(/\s+/g, '-');
    if (!enabledSources || enabledSources.includes(sourceName)) {
      const jobs = await scrapeCompanyPage(config);
      results.push(...jobs);
      // Rate limiting - wait 1 second between requests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  return results;
}

export { COMPANY_CONFIGS };
```

**Step 3: Commit**

```bash
git add src/lib/jobs/scrapers.ts package.json package-lock.json
git commit -m "feat(jobs): add web scraper utilities for job boards"
```

---

### Task 11: Create Job Scan Endpoint (Conductor)

**Files:**
- Create: `conductor/src/app/api/jobs/scan/route.ts`

**Step 1: Create scan endpoint**

```typescript
// conductor/src/app/api/jobs/scan/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/firebase/auth';
import { adminDb } from '@/lib/firebase/admin';
import { fetchAllRssFeeds } from '@/lib/jobs/rss-fetcher';
import { scrapeAllCompanies } from '@/lib/jobs/scrapers';
import Anthropic from '@anthropic-ai/sdk';
import crypto from 'crypto';

function generateJobHash(url: string): string {
  return crypto.createHash('md5').update(url).digest('hex');
}

async function extractJobDetails(anthropic: Anthropic, content: string): Promise<any> {
  const extraction = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    messages: [{
      role: 'user',
      content: `Extract job details. Return JSON only:
{
  "title": "Job title",
  "company": "Company name",
  "location": "Location or Remote",
  "remote": true/false,
  "description": "Brief description",
  "requirements": ["req1", "req2"],
  "salary": "Salary if mentioned or null"
}

Content:
${content.substring(0, 10000)}`
    }],
  });

  const text = extraction.content[0].type === 'text' ? extraction.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : null;
}

async function calculateMatchScore(anthropic: Anthropic, job: any, profile: any): Promise<{
  matchScore: number;
  matchReasons: string[];
  gaps: string[];
}> {
  if (!profile) {
    return { matchScore: 50, matchReasons: [], gaps: ['No profile configured'] };
  }

  const matching = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 500,
    messages: [{
      role: 'user',
      content: `Score this job match. Return JSON only:
{
  "matchScore": 0-100,
  "matchReasons": ["reason1", "reason2"],
  "gaps": ["gap1"]
}

Job: ${job.title} at ${job.company}
Description: ${job.description?.substring(0, 1000)}
Requirements: ${job.requirements?.join(', ')}

Profile:
Target roles: ${profile.targetRoles?.join(', ')}
Skills: ${profile.skills?.map((s: any) => s.name).join(', ')}
Experience: ${profile.experience?.map((e: any) => e.title).join(', ')}`
    }],
  });

  const text = matching.content[0].type === 'text' ? matching.content[0].text : '';
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : { matchScore: 50, matchReasons: [], gaps: [] };
}

export async function POST(request: NextRequest) {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's enabled sources and profile
    const [settingsDoc, profileDoc] = await Promise.all([
      adminDb.collection('users').doc(user.uid).collection('jobSearch').doc('settings').get(),
      adminDb.collection('users').doc(user.uid).collection('jobSearch').doc('profile').get(),
    ]);

    const settings = settingsDoc.data() || {};
    const profile = profileDoc.data();
    const pausedSources = settings.pausedSources || [];

    // Fetch jobs from all sources
    const [rssJobs, scrapedJobs] = await Promise.all([
      fetchAllRssFeeds(pausedSources.length > 0 ? undefined : undefined), // TODO: filter by paused
      scrapeAllCompanies(pausedSources.length > 0 ? undefined : undefined),
    ]);

    const allJobs = [...rssJobs, ...scrapedJobs];
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

    let newJobsCount = 0;
    let duplicatesSkipped = 0;
    const errors: string[] = [];

    // Process each job
    for (const job of allJobs) {
      try {
        const jobHash = generateJobHash(job.link);

        // Check if job already exists
        const existingJob = await adminDb
          .collection('users')
          .doc(user.uid)
          .collection('jobs')
          .where('sourceUrl', '==', job.link)
          .limit(1)
          .get();

        if (!existingJob.empty) {
          duplicatesSkipped++;
          continue;
        }

        // Extract full job details if we only have basic RSS data
        let jobDetails = {
          title: job.title,
          company: 'company' in job ? job.company : 'Unknown',
          location: 'location' in job ? job.location : 'Not specified',
          remote: false,
          description: 'description' in job ? job.description : '',
          requirements: [] as string[],
          salary: null as string | null,
        };

        // If description is HTML or sparse, try to fetch and extract more details
        if (jobDetails.description.length < 100 && job.link) {
          try {
            const pageContent = await fetch(job.link, {
              headers: { 'User-Agent': 'Mozilla/5.0 (compatible; JobBot/1.0)' },
            }).then(r => r.text());

            const extracted = await extractJobDetails(anthropic, pageContent);
            if (extracted) {
              jobDetails = { ...jobDetails, ...extracted };
            }
          } catch (fetchError) {
            // Use basic details if fetch fails
          }
        }

        // Calculate match score
        const { matchScore, matchReasons, gaps } = await calculateMatchScore(anthropic, jobDetails, profile);

        // Skip low-scoring jobs if threshold set
        const minScore = settings.minMatchScore || 0;
        if (matchScore < minScore) {
          continue;
        }

        // Save job
        const now = new Date().toISOString();
        await adminDb.collection('users').doc(user.uid).collection('jobs').add({
          userId: user.uid,
          source: job.source,
          sourceUrl: job.link,
          sourceHash: jobHash,
          title: jobDetails.title,
          company: jobDetails.company,
          location: jobDetails.location,
          remote: jobDetails.remote,
          description: jobDetails.description,
          requirements: jobDetails.requirements,
          salary: jobDetails.salary,
          postedDate: 'pubDate' in job ? job.pubDate : null,
          scrapedDate: now,
          matchScore,
          matchReasons,
          gaps,
          status: 'new',
          notes: '',
          createdAt: now,
          updatedAt: now,
          lastActivity: now,
        });

        newJobsCount++;

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (jobError) {
        console.error('Error processing job:', jobError);
        errors.push(`Failed to process: ${job.title}`);
      }
    }

    return NextResponse.json({
      success: true,
      totalFound: allJobs.length,
      newJobs: newJobsCount,
      duplicatesSkipped,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Scan error:', error);
    return NextResponse.json({ error: 'Scan failed' }, { status: 500 });
  }
}
```

**Step 2: Commit**

```bash
git add src/app/api/jobs/scan/route.ts
git commit -m "feat(jobs): add job scan endpoint"
```

---

### Task 12: Create Cron Job Endpoint (Conductor)

**Files:**
- Create: `conductor/src/app/api/cron/scan-jobs/route.ts`
- Modify: `conductor/vercel.json`

**Step 1: Create cron endpoint**

```typescript
// conductor/src/app/api/cron/scan-jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/admin';
import { fetchAllRssFeeds } from '@/lib/jobs/rss-fetcher';
import { scrapeAllCompanies } from '@/lib/jobs/scrapers';
import Anthropic from '@anthropic-ai/sdk';
import crypto from 'crypto';

// This endpoint is called by Vercel Cron
// It scans jobs for all users who have job search enabled

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get all users with job search settings
    const usersSnapshot = await adminDb.collectionGroup('jobSearch').get();

    const userIds = new Set<string>();
    usersSnapshot.forEach(doc => {
      const pathParts = doc.ref.path.split('/');
      if (pathParts.length >= 2) {
        userIds.add(pathParts[1]); // users/{userId}/jobSearch/...
      }
    });

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
    const results: Record<string, any> = {};

    for (const userId of userIds) {
      try {
        // Get user settings and profile
        const [settingsDoc, profileDoc] = await Promise.all([
          adminDb.collection('users').doc(userId).collection('jobSearch').doc('settings').get(),
          adminDb.collection('users').doc(userId).collection('jobSearch').doc('profile').get(),
        ]);

        const settings = settingsDoc.data() || {};
        const profile = profileDoc.data();

        if (!profile) continue; // Skip users without profiles

        // Fetch jobs
        const [rssJobs, scrapedJobs] = await Promise.all([
          fetchAllRssFeeds(),
          scrapeAllCompanies(),
        ]);

        const allJobs = [...rssJobs, ...scrapedJobs];
        let newJobsCount = 0;

        for (const job of allJobs) {
          const jobHash = crypto.createHash('md5').update(job.link).digest('hex');

          // Check duplicate
          const existing = await adminDb
            .collection('users')
            .doc(userId)
            .collection('jobs')
            .where('sourceHash', '==', jobHash)
            .limit(1)
            .get();

          if (!existing.empty) continue;

          // Basic match scoring (simplified for cron)
          let matchScore = 50;
          const title = job.title.toLowerCase();
          const desc = ('description' in job ? job.description : '').toLowerCase();

          profile.targetRoles?.forEach((role: string) => {
            if (title.includes(role.toLowerCase())) matchScore += 15;
          });

          profile.skills?.forEach((skill: { name: string }) => {
            if (desc.includes(skill.name.toLowerCase())) matchScore += 5;
          });

          matchScore = Math.min(matchScore, 100);

          // Skip low matches
          if (matchScore < (settings.minMatchScore || 60)) continue;

          // Save job
          const now = new Date().toISOString();
          await adminDb.collection('users').doc(userId).collection('jobs').add({
            userId,
            source: job.source,
            sourceUrl: job.link,
            sourceHash: jobHash,
            title: job.title,
            company: 'company' in job ? job.company : 'Unknown',
            location: 'location' in job ? job.location : 'Remote',
            remote: true,
            description: 'description' in job ? job.description : '',
            requirements: [],
            matchScore,
            matchReasons: [],
            gaps: [],
            status: 'new',
            notes: '',
            scrapedDate: now,
            createdAt: now,
            updatedAt: now,
            lastActivity: now,
          });

          newJobsCount++;
        }

        results[userId] = { newJobs: newJobsCount };
      } catch (userError) {
        console.error(`Error for user ${userId}:`, userError);
        results[userId] = { error: 'Failed' };
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error) {
    console.error('Cron scan error:', error);
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 });
  }
}
```

**Step 2: Update vercel.json**

Add or update `conductor/vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/scan-jobs",
      "schedule": "0 6 * * *"
    }
  ]
}
```

**Step 3: Commit**

```bash
git add src/app/api/cron/scan-jobs/route.ts vercel.json
git commit -m "feat(jobs): add daily cron job for job scanning"
```

---

### Task 13: Add Scan Client Functions (jamelna-site)

**Files:**
- Modify: `jamelna-site/lib/jobs/conductor-client.ts`

**Step 1: Add scan and sources functions**

Add to `conductor-client.ts`:

```typescript
// Job scanning
export async function scanJobs(sessionToken: string): Promise<ConductorResponse<{
  totalFound: number;
  newJobs: number;
  duplicatesSkipped: number;
  errors?: string[];
}>> {
  return conductorFetch(
    '/api/jobs/scan',
    { method: 'POST' },
    sessionToken
  );
}

// Sources management
export interface JobSource {
  id: string;
  name: string;
  type: 'rss' | 'scraper';
  enabled: boolean;
  lastChecked?: string;
  jobsFound?: number;
}

export async function getSources(sessionToken: string): Promise<ConductorResponse<JobSource[]>> {
  return conductorFetch<JobSource[]>('/api/jobs/sources', { method: 'GET' }, sessionToken);
}

export async function toggleSource(
  sessionToken: string,
  sourceId: string,
  enabled: boolean
): Promise<ConductorResponse<{ success: boolean }>> {
  return conductorFetch(
    `/api/jobs/sources/${sourceId}/toggle`,
    { method: 'POST', body: JSON.stringify({ enabled }) },
    sessionToken
  );
}
```

**Step 2: Commit**

```bash
git add lib/jobs/conductor-client.ts
git commit -m "feat(jobs): add scan and sources client functions"
```

---

### Task 14: Add Dashboard "Today's Matches" Section (jamelna-site)

**Files:**
- Modify: `jamelna-site/app/[locale]/jobs/page.tsx`

**Step 1: Add Today's Matches section**

In `jobs/page.tsx`, add a new section after the stats cards showing jobs from the last 24 hours:

```typescript
// Add this state
const [lastScan, setLastScan] = useState<string | null>(null);
const [scanning, setScanning] = useState(false);

// Add scan handler
const handleScan = async () => {
  if (!sessionToken || scanning) return;
  setScanning(true);
  const result = await scanJobs(sessionToken);
  setScanning(false);
  if (result.data) {
    setLastScan(new Date().toISOString());
    loadJobs(); // Refresh jobs
  }
};

// Filter for today's jobs
const todayJobs = jobs.filter(j => {
  const created = new Date(j.createdAt);
  const now = new Date();
  const diffHours = (now.getTime() - created.getTime()) / (1000 * 60 * 60);
  return diffHours < 24 && j.status === 'new';
}).sort((a, b) => b.matchScore - a.matchScore);
```

Add the UI section (after High Match Jobs):

```typescript
{/* Today's Matches */}
<div className="glass-card">
  <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: 'rgba(56, 56, 58, 0.5)' }}>
    <div>
      <h2 className="font-semibold text-white">Today's Matches</h2>
      {lastScan && <p className="text-xs text-[#636366]">Last scan: {new Date(lastScan).toLocaleTimeString()}</p>}
    </div>
    <button
      onClick={handleScan}
      disabled={scanning}
      className="text-sm px-3 py-1 rounded text-[#00a8ff] hover:bg-[rgba(0,168,255,0.1)] disabled:opacity-50"
    >
      {scanning ? 'Scanning...' : 'Scan Now'}
    </button>
  </div>

  {todayJobs.length === 0 ? (
    <div className="p-8 text-center text-[#636366]">
      <p>No new jobs found today.</p>
      <button onClick={handleScan} disabled={scanning} className="mt-2 text-[#00a8ff] hover:underline">
        {scanning ? 'Scanning...' : 'Run a scan now'}
      </button>
    </div>
  ) : (
    <ul className="divide-y" style={{ borderColor: 'rgba(56, 56, 58, 0.5)' }}>
      {todayJobs.slice(0, 5).map((job) => (
        <li key={job.id} className="p-4 hover:bg-[rgba(56,56,58,0.3)] transition-colors">
          <Link href={`/${locale}/jobs/all?id=${job.id}`} className="block">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-white">{job.title}</p>
                <p className="text-sm text-[#D1D1D6]">{job.company}</p>
                <span className="text-xs text-[#636366] capitalize">{job.source}</span>
              </div>
              <span className="px-2 py-1 text-sm rounded-full" style={{ background: 'rgba(64, 224, 208, 0.2)', color: '#40E0D0' }}>
                {job.matchScore}%
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )}
</div>
```

**Step 2: Add import for scanJobs**

```typescript
import { getJobs, scanJobs } from '@/lib/jobs/conductor-client';
```

**Step 3: Commit**

```bash
git add app/[locale]/jobs/page.tsx
git commit -m "feat(jobs): add Today's Matches section with Scan Now button"
```

---

### Task 15: Create Settings Page (jamelna-site)

**Files:**
- Create: `jamelna-site/app/[locale]/jobs/settings/page.tsx`
- Modify: `jamelna-site/components/jobs/JobsNav.tsx` (add Settings link)

**Step 1: Create settings page**

```typescript
// app/[locale]/jobs/settings/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getSettings, updateSettings, scanJobs } from '@/lib/jobs/conductor-client';
import type { JobSettings } from '@/lib/jobs/types';

const SOURCES = [
  { id: 'edsurge', name: 'EdSurge Jobs', type: 'rss' },
  { id: 'remoteok', name: 'RemoteOK', type: 'rss' },
  { id: 'weworkremotely', name: 'WeWorkRemotely', type: 'rss' },
  { id: 'iste', name: 'ISTE Job Board', type: 'scraper' },
  { id: 'odilo', name: 'Odilo', type: 'scraper' },
  { id: 'innovamat', name: 'Innovamat', type: 'scraper' },
  { id: 'genially', name: 'Genially', type: 'scraper' },
  { id: 'smile-and-learn', name: 'Smile and Learn', type: 'scraper' },
];

function SettingsContent() {
  const { sessionToken } = useJobsAuth();
  const [settings, setSettings] = useState<JobSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const inputStyle = { background: 'rgba(56, 56, 58, 0.5)', border: '1px solid rgba(56, 56, 58, 0.8)' };

  const loadSettings = useCallback(async () => {
    if (!sessionToken) return;
    setLoading(true);
    const result = await getSettings(sessionToken);
    if (result.data) {
      setSettings(result.data);
    } else {
      // Default settings
      setSettings({
        digestTime: '08:00',
        digestEmail: '',
        minMatchScore: 60,
        pausedSources: [],
      });
    }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const handleToggleSource = async (sourceId: string) => {
    if (!settings || !sessionToken) return;

    const isPaused = settings.pausedSources.includes(sourceId);
    const newPaused = isPaused
      ? settings.pausedSources.filter(s => s !== sourceId)
      : [...settings.pausedSources, sourceId];

    setSettings({ ...settings, pausedSources: newPaused });
    await updateSettings(sessionToken, { pausedSources: newPaused });
  };

  const handleMinScoreChange = async (value: number) => {
    if (!settings || !sessionToken) return;
    setSettings({ ...settings, minMatchScore: value });
    await updateSettings(sessionToken, { minMatchScore: value });
  };

  const handleScanNow = async () => {
    if (!sessionToken || scanning) return;
    setScanning(true);
    setScanResult(null);

    const result = await scanJobs(sessionToken);

    setScanning(false);
    if (result.data) {
      setScanResult(`Found ${result.data.newJobs} new jobs (${result.data.duplicatesSkipped} duplicates skipped)`);
    } else if (result.error) {
      setScanResult(`Error: ${result.error}`);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-[#636366]">Loading settings...</div>;
  }

  return (
    <div className="max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-[#D1D1D6]">Configure your job search preferences</p>
      </div>

      {/* Job Sources */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Job Sources</h2>
        <div className="space-y-2">
          {SOURCES.map((source) => {
            const isEnabled = !settings?.pausedSources.includes(source.id);
            return (
              <label key={source.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-[rgba(56,56,58,0.3)] cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => handleToggleSource(source.id)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-[#D1D1D6]">{source.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(56, 56, 58, 0.5)', color: '#636366' }}>
                    {source.type}
                  </span>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* Match Threshold */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Match Threshold</h2>
        <div>
          <label className="block text-sm text-[#D1D1D6] mb-2">
            Minimum match score for dashboard ({settings?.minMatchScore}%)
          </label>
          <select
            value={settings?.minMatchScore || 60}
            onChange={(e) => handleMinScoreChange(Number(e.target.value))}
            className="px-3 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#00a8ff]"
            style={inputStyle}
          >
            <option value={0}>Show all jobs</option>
            <option value={50}>50%+</option>
            <option value={60}>60%+</option>
            <option value={70}>70%+</option>
            <option value={80}>80%+</option>
          </select>
        </div>
      </section>

      {/* Manual Scan */}
      <section className="glass-card p-6 space-y-4">
        <h2 className="font-semibold text-white">Manual Scan</h2>
        <p className="text-sm text-[#636366]">Jobs are automatically scanned daily at 6 AM. You can also run a manual scan.</p>

        <button
          onClick={handleScanNow}
          disabled={scanning}
          className="btn-warm disabled:opacity-50"
        >
          {scanning ? 'Scanning...' : 'Scan Now'}
        </button>

        {scanResult && (
          <p className="text-sm text-[#40E0D0]">{scanResult}</p>
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
```

**Step 2: Add Settings link to JobsNav**

In `components/jobs/JobsNav.tsx`, add Settings to the nav links:

```typescript
const navLinks = [
  { href: `/${locale}/jobs`, label: 'Dashboard', icon: '📊' },
  { href: `/${locale}/jobs/all`, label: 'All', icon: '📋' },
  { href: `/${locale}/jobs/profile`, label: 'Profile', icon: '👤' },
  { href: `/${locale}/jobs/settings`, label: 'Settings', icon: '⚙️' },
];
```

**Step 3: Commit**

```bash
git add app/[locale]/jobs/settings/page.tsx components/jobs/JobsNav.tsx
git commit -m "feat(jobs): add Settings page with source toggles and scan button"
```

---

## Summary

This plan implements:

**Part A (Profile Import):**
- Tasks 1-5: Backend endpoints in Conductor for resume upload, PDF extraction, LinkedIn parsing, website extraction, and combined import
- Tasks 6-8: Frontend wizard component and integration

**Part B (Job Discovery):**
- Tasks 9-10: RSS feed fetcher and web scrapers
- Tasks 11-12: Scan endpoint and cron job
- Tasks 13-15: Frontend integration with scan button, Today's Matches, and Settings page

Total: 15 tasks, each with clear files, code, and commit points.
