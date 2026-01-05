# Job Search Companion - Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build MVP job search dashboard with manual job entry, AI matching, and cover letter generation.

**Architecture:** jamelna.com `/jobs` routes (UI) + Conductor API (auth, AI, storage). jamelna.com calls Conductor's API endpoints for all backend operations.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Firebase Auth (via Conductor), Firestore (via Conductor), Claude API (via Conductor)

---

## Prerequisites

Before starting, ensure:
1. Conductor is deployed and accessible (e.g., `https://conductor.vercel.app`)
2. You have the Conductor API URL configured
3. Firebase project is set up in Conductor

---

## Task 1: Environment Configuration

**Files:**
- Create: `jamelna-site/.env.local`
- Create: `jamelna-site/.env.example`

**Step 1: Create environment example file**

```bash
# .env.example
CONDUCTOR_API_URL=https://your-conductor-instance.vercel.app
NEXT_PUBLIC_CONDUCTOR_API_URL=https://your-conductor-instance.vercel.app
```

**Step 2: Create local environment file**

```bash
# .env.local (do not commit)
CONDUCTOR_API_URL=https://conductor.vercel.app
NEXT_PUBLIC_CONDUCTOR_API_URL=https://conductor.vercel.app
```

**Step 3: Verify .gitignore includes .env.local**

Run: `grep ".env" .gitignore`
Expected: `.env*` or `.env.local` is listed

**Step 4: Commit**

```bash
git add .env.example
git commit -m "chore: add Conductor API environment configuration"
```

---

## Task 2: Job Search Types

**Files:**
- Create: `jamelna-site/lib/jobs/types.ts`

**Step 1: Create types file**

```typescript
// lib/jobs/types.ts

export type JobStatus =
  | 'new'
  | 'reviewing'
  | 'applying'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'withdrawn';

export type JobSource =
  | 'manual'
  | 'edsurge'
  | 'linkedin'
  | 'remoteok'
  | 'weworkremotely'
  | 'iste'
  | 'company';

export interface JobProfile {
  id: string;
  userId: string;
  name: string;
  email: string;
  location: string;
  targetRoles: string[];
  targetLocations: string[];
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  skills: Array<{
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    yearsExp: number;
  }>;
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
  languages: Array<{
    language: string;
    proficiency: 'basic' | 'conversational' | 'fluent' | 'native';
  }>;
  summary: string;
  resumeUrl?: string;
  linkedInUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  userId: string;
  source: JobSource;
  sourceUrl: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  description: string;
  requirements: string[];
  salary?: string;
  postedDate?: string;
  scrapedDate: string;
  matchScore: number;
  matchReasons: string[];
  gaps: string[];
  status: JobStatus;
  notes: string;
  appliedDate?: string;
  lastActivity: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  coverLetter: {
    draft: string;
    final?: string;
    generatedAt: string;
  };
  resumeVersion?: {
    url: string;
    tailoredFor: string;
  };
  submittedVia?: 'company_site' | 'linkedin' | 'email' | 'other';
  followUps: Array<{
    date: string;
    type: 'email' | 'call' | 'message';
    notes: string;
  }>;
  interviewNotes: Array<{
    date: string;
    type: 'phone' | 'video' | 'onsite' | 'technical';
    notes: string;
    interviewers?: string[];
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface JobSettings {
  digestTime: string;
  digestEmail: string;
  minMatchScore: number;
  pausedSources: JobSource[];
}

// API Response types
export interface MatchResult {
  matchScore: number;
  matchReasons: string[];
  gaps: string[];
}

export interface ExtractedJob {
  title: string;
  company: string;
  location: string;
  remote: boolean;
  description: string;
  requirements: string[];
  salary?: string;
  postedDate?: string;
}
```

**Step 2: Commit**

```bash
git add lib/jobs/types.ts
git commit -m "feat(jobs): add TypeScript types for job search"
```

---

## Task 3: Conductor API Client

**Files:**
- Create: `jamelna-site/lib/jobs/conductor-client.ts`

**Step 1: Create API client**

```typescript
// lib/jobs/conductor-client.ts

import type {
  JobProfile,
  Job,
  Application,
  MatchResult,
  ExtractedJob,
  JobSettings
} from './types';

const CONDUCTOR_API_URL = process.env.CONDUCTOR_API_URL || process.env.NEXT_PUBLIC_CONDUCTOR_API_URL;

if (!CONDUCTOR_API_URL) {
  console.warn('CONDUCTOR_API_URL not configured');
}

interface ConductorResponse<T> {
  data?: T;
  error?: string;
}

async function conductorFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  sessionToken?: string
): Promise<ConductorResponse<T>> {
  const url = `${CONDUCTOR_API_URL}${endpoint}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (sessionToken) {
    headers['Authorization'] = `Bearer ${sessionToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Conductor API error:', error);
    return { error: 'Network error' };
  }
}

// Profile operations
export async function getProfile(sessionToken: string): Promise<ConductorResponse<JobProfile>> {
  return conductorFetch<JobProfile>('/api/jobs/profile', { method: 'GET' }, sessionToken);
}

export async function updateProfile(
  sessionToken: string,
  profile: Partial<JobProfile>
): Promise<ConductorResponse<JobProfile>> {
  return conductorFetch<JobProfile>(
    '/api/jobs/profile',
    { method: 'PUT', body: JSON.stringify(profile) },
    sessionToken
  );
}

// Job operations
export async function getJobs(sessionToken: string): Promise<ConductorResponse<Job[]>> {
  return conductorFetch<Job[]>('/api/jobs', { method: 'GET' }, sessionToken);
}

export async function getJob(sessionToken: string, jobId: string): Promise<ConductorResponse<Job>> {
  return conductorFetch<Job>(`/api/jobs/${jobId}`, { method: 'GET' }, sessionToken);
}

export async function addJobFromUrl(
  sessionToken: string,
  url: string
): Promise<ConductorResponse<Job>> {
  return conductorFetch<Job>(
    '/api/jobs/scrape',
    { method: 'POST', body: JSON.stringify({ url }) },
    sessionToken
  );
}

export async function updateJob(
  sessionToken: string,
  jobId: string,
  updates: Partial<Job>
): Promise<ConductorResponse<Job>> {
  return conductorFetch<Job>(
    `/api/jobs/${jobId}`,
    { method: 'PUT', body: JSON.stringify(updates) },
    sessionToken
  );
}

export async function deleteJob(
  sessionToken: string,
  jobId: string
): Promise<ConductorResponse<{ success: boolean }>> {
  return conductorFetch<{ success: boolean }>(
    `/api/jobs/${jobId}`,
    { method: 'DELETE' },
    sessionToken
  );
}

// Match scoring
export async function scoreJob(
  sessionToken: string,
  jobId: string
): Promise<ConductorResponse<MatchResult>> {
  return conductorFetch<MatchResult>(
    '/api/jobs/match',
    { method: 'POST', body: JSON.stringify({ jobId }) },
    sessionToken
  );
}

// Cover letter generation
export async function generateCoverLetter(
  sessionToken: string,
  jobId: string
): Promise<ConductorResponse<{ coverLetter: string }>> {
  return conductorFetch<{ coverLetter: string }>(
    '/api/jobs/generate',
    { method: 'POST', body: JSON.stringify({ jobId, type: 'cover_letter' }) },
    sessionToken
  );
}

// Application operations
export async function getApplications(sessionToken: string): Promise<ConductorResponse<Application[]>> {
  return conductorFetch<Application[]>('/api/jobs/applications', { method: 'GET' }, sessionToken);
}

export async function createApplication(
  sessionToken: string,
  jobId: string,
  coverLetter: string
): Promise<ConductorResponse<Application>> {
  return conductorFetch<Application>(
    '/api/jobs/applications',
    { method: 'POST', body: JSON.stringify({ jobId, coverLetter }) },
    sessionToken
  );
}

// Settings
export async function getSettings(sessionToken: string): Promise<ConductorResponse<JobSettings>> {
  return conductorFetch<JobSettings>('/api/jobs/settings', { method: 'GET' }, sessionToken);
}

export async function updateSettings(
  sessionToken: string,
  settings: Partial<JobSettings>
): Promise<ConductorResponse<JobSettings>> {
  return conductorFetch<JobSettings>(
    '/api/jobs/settings',
    { method: 'PUT', body: JSON.stringify(settings) },
    sessionToken
  );
}
```

**Step 2: Commit**

```bash
git add lib/jobs/conductor-client.ts
git commit -m "feat(jobs): add Conductor API client"
```

---

## Task 4: Auth Context for Jobs

**Files:**
- Create: `jamelna-site/lib/jobs/auth-context.tsx`

**Step 1: Create auth context**

```typescript
// lib/jobs/auth-context.tsx
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth';

// Firebase config - uses same project as Conductor
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

interface AuthContextType {
  user: User | null;
  sessionToken: string | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function JobsAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // Get ID token for API calls
        const token = await user.getIdToken();
        setSessionToken(token);

        // Create session in Conductor
        try {
          await fetch(`${process.env.NEXT_PUBLIC_CONDUCTOR_API_URL}/api/auth/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: token }),
            credentials: 'include',
          });
        } catch (error) {
          console.error('Failed to create Conductor session:', error);
        }
      } else {
        setSessionToken(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Refresh token periodically (tokens expire after 1 hour)
  useEffect(() => {
    if (!user) return;

    const refreshToken = async () => {
      const token = await user.getIdToken(true);
      setSessionToken(token);
    };

    // Refresh every 50 minutes
    const interval = setInterval(refreshToken, 50 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear Conductor session
      await fetch(`${process.env.NEXT_PUBLIC_CONDUCTOR_API_URL}/api/auth/session`, {
        method: 'DELETE',
        credentials: 'include',
      });

      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, sessionToken, loading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useJobsAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useJobsAuth must be used within JobsAuthProvider');
  }
  return context;
}
```

**Step 2: Update .env.example with Firebase config**

Add to `.env.example`:
```bash
# Firebase (same project as Conductor)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
```

**Step 3: Commit**

```bash
git add lib/jobs/auth-context.tsx .env.example
git commit -m "feat(jobs): add Firebase auth context for job search"
```

---

## Task 5: Jobs Layout

**Files:**
- Create: `jamelna-site/app/[locale]/jobs/layout.tsx`

**Step 1: Create jobs layout**

```typescript
// app/[locale]/jobs/layout.tsx
import { ReactNode } from 'react';
import { JobsAuthProvider } from '@/lib/jobs/auth-context';

export const metadata = {
  title: 'Job Search | Joe Meléndez',
  description: 'Personal job search dashboard',
  robots: 'noindex, nofollow', // Private section
};

export default function JobsLayout({ children }: { children: ReactNode }) {
  return (
    <JobsAuthProvider>
      <div className="min-h-screen bg-gray-50">
        {children}
      </div>
    </JobsAuthProvider>
  );
}
```

**Step 2: Commit**

```bash
git add app/\[locale\]/jobs/layout.tsx
git commit -m "feat(jobs): add jobs section layout with auth provider"
```

---

## Task 6: Jobs Navigation Component

**Files:**
- Create: `jamelna-site/components/jobs/JobsNav.tsx`

**Step 1: Create navigation component**

```typescript
// components/jobs/JobsNav.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useJobsAuth } from '@/lib/jobs/auth-context';

const navItems = [
  { href: '/jobs', label: 'Dashboard', icon: '📊' },
  { href: '/jobs/all', label: 'All Jobs', icon: '💼' },
  { href: '/jobs/applications', label: 'Applications', icon: '📝' },
  { href: '/jobs/profile', label: 'Profile', icon: '👤' },
  { href: '/jobs/sources', label: 'Sources', icon: '🔗' },
  { href: '/jobs/settings', label: 'Settings', icon: '⚙️' },
];

export default function JobsNav() {
  const pathname = usePathname();
  const { user, logout } = useJobsAuth();

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en';

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center">
            <Link href={`/${locale}/jobs`} className="text-xl font-bold text-gray-900">
              Job Search
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const fullPath = `/${locale}${item.href}`;
              const isActive = pathname === fullPath ||
                (item.href !== '/jobs' && pathname.startsWith(fullPath));

              return (
                <Link
                  key={item.href}
                  href={fullPath}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <span className="text-sm text-gray-600">{user.email}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex overflow-x-auto py-2 px-4 space-x-2">
          {navItems.map((item) => {
            const fullPath = `/${locale}${item.href}`;
            const isActive = pathname === fullPath;

            return (
              <Link
                key={item.href}
                href={fullPath}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm ${
                  isActive
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/JobsNav.tsx
git commit -m "feat(jobs): add navigation component"
```

---

## Task 7: Login Page

**Files:**
- Create: `jamelna-site/components/jobs/LoginCard.tsx`
- Create: `jamelna-site/app/[locale]/jobs/login/page.tsx`

**Step 1: Create login card component**

```typescript
// components/jobs/LoginCard.tsx
'use client';

import { useState } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';

export default function LoginCard() {
  const { signInWithGoogle, loading } = useJobsAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setError(null);
    setIsSigningIn(true);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError('Failed to sign in. Please try again.');
      console.error(err);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Job Search Dashboard
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Sign in to access your personal job search tools
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <button
        onClick={handleSignIn}
        disabled={isSigningIn}
        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span className="text-gray-700 font-medium">
          {isSigningIn ? 'Signing in...' : 'Continue with Google'}
        </span>
      </button>

      <p className="mt-6 text-center text-xs text-gray-500">
        This is a private dashboard for personal use only.
      </p>
    </div>
  );
}
```

**Step 2: Create login page**

```typescript
// app/[locale]/jobs/login/page.tsx
import LoginCard from '@/components/jobs/LoginCard';

export default function JobsLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <LoginCard />
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add components/jobs/LoginCard.tsx app/\[locale\]/jobs/login/page.tsx
git commit -m "feat(jobs): add login page with Google OAuth"
```

---

## Task 8: Auth Guard Component

**Files:**
- Create: `jamelna-site/components/jobs/AuthGuard.tsx`

**Step 1: Create auth guard**

```typescript
// components/jobs/AuthGuard.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import JobsNav from './JobsNav';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useJobsAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Extract locale from pathname
  const locale = pathname.split('/')[1] || 'en';

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/${locale}/jobs/login`);
    }
  }, [user, loading, router, locale]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <>
      <JobsNav />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add components/jobs/AuthGuard.tsx
git commit -m "feat(jobs): add auth guard component"
```

---

## Task 9: Dashboard Page

**Files:**
- Create: `jamelna-site/app/[locale]/jobs/page.tsx`
- Create: `jamelna-site/components/jobs/AddJobModal.tsx`

**Step 1: Create Add Job Modal**

```typescript
// components/jobs/AddJobModal.tsx
'use client';

import { useState } from 'react';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { addJobFromUrl } from '@/lib/jobs/conductor-client';

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobAdded: () => void;
}

export default function AddJobModal({ isOpen, onClose, onJobAdded }: AddJobModalProps) {
  const { sessionToken } = useJobsAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sessionToken || !url.trim()) return;

    setLoading(true);
    setError(null);

    const result = await addJobFromUrl(sessionToken, url.trim());

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setUrl('');
    setLoading(false);
    onJobAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Add Job from URL
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Job Posting URL
              </label>
              <input
                type="url"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://company.com/careers/job-title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Paste any job posting URL. AI will extract the details.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Create dashboard page**

```typescript
// app/[locale]/jobs/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import AddJobModal from '@/components/jobs/AddJobModal';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getJobs } from '@/lib/jobs/conductor-client';
import type { Job } from '@/lib/jobs/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function DashboardContent() {
  const { sessionToken } = useJobsAuth();
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadJobs = useCallback(async () => {
    if (!sessionToken) return;

    setLoading(true);
    const result = await getJobs(sessionToken);
    if (result.data) {
      setJobs(result.data);
    }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Calculate stats
  const newJobs = jobs.filter(j => j.status === 'new');
  const appliedJobs = jobs.filter(j => j.status === 'applied');
  const interviewingJobs = jobs.filter(j => j.status === 'interviewing');
  const highMatchJobs = jobs.filter(j => j.matchScore >= 80 && j.status === 'new');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Your job search at a glance</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span> Add Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">New Jobs</p>
          <p className="text-3xl font-bold text-gray-900">{newJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Applied</p>
          <p className="text-3xl font-bold text-blue-600">{appliedJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">Interviewing</p>
          <p className="text-3xl font-bold text-green-600">{interviewingJobs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-500">High Match (80%+)</p>
          <p className="text-3xl font-bold text-purple-600">{highMatchJobs.length}</p>
        </div>
      </div>

      {/* High Match Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">High Match Jobs</h2>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : highMatchJobs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No high-match jobs yet.</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-2 text-blue-600 hover:underline"
            >
              Add your first job posting
            </button>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {highMatchJobs.slice(0, 5).map((job) => (
              <li key={job.id} className="p-4 hover:bg-gray-50">
                <Link href={`/${locale}/jobs/all?id=${job.id}`} className="block">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">{job.title}</p>
                      <p className="text-sm text-gray-600">{job.company}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                      {job.matchScore}% match
                    </span>
                  </div>
                  <div className="mt-2 flex gap-2">
                    {job.remote && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Remote
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{job.location}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href={`/${locale}/jobs/all`}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <h3 className="font-medium text-gray-900">View All Jobs</h3>
          <p className="text-sm text-gray-500">Browse and filter all saved jobs</p>
        </Link>
        <Link
          href={`/${locale}/jobs/profile`}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Update Profile</h3>
          <p className="text-sm text-gray-500">Improve your match accuracy</p>
        </Link>
        <Link
          href={`/${locale}/jobs/applications`}
          className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
        >
          <h3 className="font-medium text-gray-900">Track Applications</h3>
          <p className="text-sm text-gray-500">Manage your pipeline</p>
        </Link>
      </div>

      {/* Add Job Modal */}
      <AddJobModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onJobAdded={loadJobs}
      />
    </div>
  );
}

export default function JobsDashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
```

**Step 3: Commit**

```bash
git add components/jobs/AddJobModal.tsx app/\[locale\]/jobs/page.tsx
git commit -m "feat(jobs): add dashboard page with stats and add job modal"
```

---

## Task 10: All Jobs Page

**Files:**
- Create: `jamelna-site/components/jobs/JobCard.tsx`
- Create: `jamelna-site/app/[locale]/jobs/all/page.tsx`

**Step 1: Create job card component**

```typescript
// components/jobs/JobCard.tsx
'use client';

import { useState } from 'react';
import type { Job, JobStatus } from '@/lib/jobs/types';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { updateJob, generateCoverLetter } from '@/lib/jobs/conductor-client';

interface JobCardProps {
  job: Job;
  onUpdate: () => void;
  expanded?: boolean;
}

const statusColors: Record<JobStatus, string> = {
  new: 'bg-gray-100 text-gray-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  applying: 'bg-blue-100 text-blue-800',
  applied: 'bg-purple-100 text-purple-800',
  interviewing: 'bg-green-100 text-green-800',
  offer: 'bg-emerald-100 text-emerald-800',
  rejected: 'bg-red-100 text-red-800',
  withdrawn: 'bg-gray-100 text-gray-600',
};

export default function JobCard({ job, onUpdate, expanded = false }: JobCardProps) {
  const { sessionToken } = useJobsAuth();
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [generatingLetter, setGeneratingLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const handleStatusChange = async (newStatus: JobStatus) => {
    if (!sessionToken) return;
    setUpdatingStatus(true);
    await updateJob(sessionToken, job.id, { status: newStatus });
    setUpdatingStatus(false);
    onUpdate();
  };

  const handleGenerateCoverLetter = async () => {
    if (!sessionToken) return;
    setGeneratingLetter(true);
    const result = await generateCoverLetter(sessionToken, job.id);
    if (result.data) {
      setCoverLetter(result.data.coverLetter);
    }
    setGeneratingLetter(false);
  };

  const matchColor = job.matchScore >= 80
    ? 'text-green-600 bg-green-50'
    : job.matchScore >= 60
      ? 'text-yellow-600 bg-yellow-50'
      : 'text-gray-600 bg-gray-50';

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div
        className="p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {job.remote && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  Remote
                </span>
              )}
              <span className="text-xs text-gray-500">{job.location}</span>
              <span className={`text-xs px-2 py-0.5 rounded ${statusColors[job.status]}`}>
                {job.status}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${matchColor}`}>
              {job.matchScore}%
            </span>
            <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 space-y-4">
          {/* Match Analysis */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Match Analysis</h4>
            <div className="space-y-1">
              {job.matchReasons.map((reason, i) => (
                <p key={i} className="text-sm text-green-700">✓ {reason}</p>
              ))}
              {job.gaps.map((gap, i) => (
                <p key={i} className="text-sm text-yellow-700">⚠ {gap}</p>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">{job.description}</p>
          </div>

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {job.requirements.map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Cover Letter */}
          {coverLetter && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Generated Cover Letter</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans">
                  {coverLetter}
                </pre>
              </div>
              <button
                onClick={() => navigator.clipboard.writeText(coverLetter)}
                className="mt-2 text-sm text-blue-600 hover:underline"
              >
                Copy to clipboard
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
            <button
              onClick={handleGenerateCoverLetter}
              disabled={generatingLetter}
              className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {generatingLetter ? 'Generating...' : 'Generate Cover Letter'}
            </button>

            <a
              href={job.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200"
            >
              View Original →
            </a>

            <select
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
              disabled={updatingStatus}
              className="px-3 py-1.5 border border-gray-300 text-sm rounded"
            >
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="applying">Applying</option>
              <option value="applied">Applied</option>
              <option value="interviewing">Interviewing</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
              <option value="withdrawn">Withdrawn</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 2: Create all jobs page**

```typescript
// app/[locale]/jobs/all/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import AuthGuard from '@/components/jobs/AuthGuard';
import JobCard from '@/components/jobs/JobCard';
import AddJobModal from '@/components/jobs/AddJobModal';
import { useJobsAuth } from '@/lib/jobs/auth-context';
import { getJobs } from '@/lib/jobs/conductor-client';
import type { Job, JobStatus } from '@/lib/jobs/types';

function AllJobsContent() {
  const { sessionToken } = useJobsAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'all'>('all');
  const [minScore, setMinScore] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const loadJobs = useCallback(async () => {
    if (!sessionToken) return;

    setLoading(true);
    const result = await getJobs(sessionToken);
    if (result.data) {
      setJobs(result.data);
    }
    setLoading(false);
  }, [sessionToken]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  // Apply filters
  const filteredJobs = jobs.filter(job => {
    if (statusFilter !== 'all' && job.status !== statusFilter) return false;
    if (job.matchScore < minScore) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!job.title.toLowerCase().includes(query) &&
          !job.company.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  }).sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Jobs</h1>
          <p className="text-gray-600">{filteredJobs.length} jobs found</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Add Job
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-wrap gap-4">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Search</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Title or company..."
            className="px-3 py-1.5 border border-gray-300 rounded text-sm w-48"
          />
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as JobStatus | 'all')}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="reviewing">Reviewing</option>
            <option value="applying">Applying</option>
            <option value="applied">Applied</option>
            <option value="interviewing">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-gray-500 mb-1">Min Match Score</label>
          <select
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="px-3 py-1.5 border border-gray-300 rounded text-sm"
          >
            <option value={0}>Any</option>
            <option value={60}>60%+</option>
            <option value={70}>70%+</option>
            <option value={80}>80%+</option>
            <option value={90}>90%+</option>
          </select>
        </div>
      </div>

      {/* Job List */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading jobs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <p className="text-gray-500">No jobs found matching your filters.</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-2 text-blue-600 hover:underline"
          >
            Add a job posting
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} onUpdate={loadJobs} />
          ))}
        </div>
      )}

      <AddJobModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onJobAdded={loadJobs}
      />
    </div>
  );
}

export default function AllJobsPage() {
  return (
    <AuthGuard>
      <AllJobsContent />
    </AuthGuard>
  );
}
```

**Step 3: Commit**

```bash
git add components/jobs/JobCard.tsx app/\[locale\]/jobs/all/page.tsx
git commit -m "feat(jobs): add all jobs page with filtering and job cards"
```

---

## Task 11: Profile Page

**Files:**
- Create: `jamelna-site/app/[locale]/jobs/profile/page.tsx`

**Step 1: Create profile page**

```typescript
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
```

**Step 2: Commit**

```bash
git add app/\[locale\]/jobs/profile/page.tsx
git commit -m "feat(jobs): add profile editor page"
```

---

## Task 12: Conductor Backend - Jobs API Routes

**Files:**
- Create: `conductor/src/app/api/jobs/route.ts`
- Create: `conductor/src/app/api/jobs/[jobId]/route.ts`
- Create: `conductor/src/app/api/jobs/profile/route.ts`
- Create: `conductor/src/app/api/jobs/scrape/route.ts`
- Create: `conductor/src/app/api/jobs/match/route.ts`
- Create: `conductor/src/app/api/jobs/generate/route.ts`

> **Note:** This task creates the backend API in Conductor. Switch to the Conductor project directory.

**Step 1: Create jobs list route**

```typescript
// conductor/src/app/api/jobs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';

async function getUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const jobsSnapshot = await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobs')
      .orderBy('createdAt', 'desc')
      .get();

    const jobs = jobsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
  }
}
```

**Step 2: Create job detail route**

```typescript
// conductor/src/app/api/jobs/[jobId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';

async function getUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const jobDoc = await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobs')
      .doc(params.jobId)
      .get();

    if (!jobDoc.exists) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ id: jobDoc.id, ...jobDoc.data() });
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Failed to fetch job' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updates = await request.json();

    await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobs')
      .doc(params.jobId)
      .update({
        ...updates,
        updatedAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
      });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating job:', error);
    return NextResponse.json({ error: 'Failed to update job' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobs')
      .doc(params.jobId)
      .delete();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
```

**Step 3: Create profile route**

```typescript
// conductor/src/app/api/jobs/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';

async function getUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

const defaultProfile = {
  name: '',
  email: '',
  location: '',
  targetRoles: [],
  targetLocations: ['Remote'],
  skills: [],
  experience: [],
  education: [],
  languages: [],
  summary: '',
};

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const profileDoc = await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobSearch')
      .doc('profile')
      .get();

    if (!profileDoc.exists) {
      // Get user info to pre-populate
      const userDoc = await adminDb.collection('users').doc(userId).get();
      const userData = userDoc.data();

      const newProfile = {
        ...defaultProfile,
        id: 'profile',
        userId,
        name: userData?.displayName || '',
        email: userData?.email || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await adminDb
        .collection('users')
        .doc(userId)
        .collection('jobSearch')
        .doc('profile')
        .set(newProfile);

      return NextResponse.json(newProfile);
    }

    return NextResponse.json({ id: profileDoc.id, ...profileDoc.data() });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updates = await request.json();

    await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobSearch')
      .doc('profile')
      .set({
        ...updates,
        userId,
        updatedAt: new Date().toISOString(),
      }, { merge: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
```

**Step 4: Create scrape route (job extraction)**

```typescript
// conductor/src/app/api/jobs/scrape/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

async function getUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

async function fetchJobPage(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; JobSearchBot/1.0)',
    },
  });
  return response.text();
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the job page
    const pageContent = await fetchJobPage(url);

    // Use Claude to extract job details
    const extraction = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [{
        role: 'user',
        content: `Extract job posting details from this HTML. Return JSON only, no markdown:

{
  "title": "Job title",
  "company": "Company name",
  "location": "Location",
  "remote": true/false,
  "description": "Full job description",
  "requirements": ["requirement 1", "requirement 2"],
  "salary": "Salary if mentioned, null otherwise",
  "postedDate": "Posted date if found, null otherwise"
}

HTML:
${pageContent.substring(0, 50000)}`
      }],
    });

    const extractedText = extraction.content[0].type === 'text'
      ? extraction.content[0].text
      : '';

    let jobData;
    try {
      jobData = JSON.parse(extractedText);
    } catch {
      return NextResponse.json({ error: 'Failed to parse job data' }, { status: 500 });
    }

    // Get user profile for matching
    const profileDoc = await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobSearch')
      .doc('profile')
      .get();

    const profile = profileDoc.data();

    // Calculate match score
    let matchScore = 50; // Base score
    const matchReasons: string[] = [];
    const gaps: string[] = [];

    if (profile) {
      // Simple keyword matching for now
      const description = jobData.description.toLowerCase();

      profile.skills?.forEach((skill: { name: string; yearsExp: number }) => {
        if (description.includes(skill.name.toLowerCase())) {
          matchScore += 5;
          matchReasons.push(`${skill.name} (${skill.yearsExp} years)`);
        }
      });

      profile.targetRoles?.forEach((role: string) => {
        if (jobData.title.toLowerCase().includes(role.toLowerCase())) {
          matchScore += 10;
          matchReasons.push(`Matches target role: ${role}`);
        }
      });

      if (jobData.remote && profile.targetLocations?.includes('Remote')) {
        matchScore += 10;
        matchReasons.push('Remote position matches preference');
      }
    }

    matchScore = Math.min(matchScore, 100);

    // Save job to Firestore
    const now = new Date().toISOString();
    const newJob = {
      userId,
      source: 'manual',
      sourceUrl: url,
      ...jobData,
      matchScore,
      matchReasons,
      gaps,
      status: 'new',
      notes: '',
      scrapedDate: now,
      createdAt: now,
      updatedAt: now,
      lastActivity: now,
    };

    const jobRef = await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobs')
      .add(newJob);

    return NextResponse.json({ id: jobRef.id, ...newJob });
  } catch (error) {
    console.error('Error scraping job:', error);
    return NextResponse.json({ error: 'Failed to extract job data' }, { status: 500 });
  }
}
```

**Step 5: Create cover letter generation route**

```typescript
// conductor/src/app/api/jobs/generate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase/admin';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

async function getUserId(request: NextRequest): Promise<string | null> {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.substring(7);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded.uid;
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { jobId, type } = await request.json();

    if (!jobId || type !== 'cover_letter') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Get job details
    const jobDoc = await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobs')
      .doc(jobId)
      .get();

    if (!jobDoc.exists) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const job = jobDoc.data();

    // Get user profile
    const profileDoc = await adminDb
      .collection('users')
      .doc(userId)
      .collection('jobSearch')
      .doc('profile')
      .get();

    const profile = profileDoc.data();

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found. Please complete your profile first.' }, { status: 400 });
    }

    // Generate cover letter
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      messages: [{
        role: 'user',
        content: `Write a professional cover letter for this job application.

CANDIDATE PROFILE:
Name: ${profile.name}
Summary: ${profile.summary}
Skills: ${profile.skills?.map((s: { name: string }) => s.name).join(', ')}
Experience highlights: ${profile.experience?.map((e: { title: string; company: string }) => `${e.title} at ${e.company}`).join('; ')}

JOB DETAILS:
Title: ${job?.title}
Company: ${job?.company}
Description: ${job?.description}
Requirements: ${job?.requirements?.join(', ')}

MATCH ANALYSIS:
Strengths: ${job?.matchReasons?.join(', ')}
Gaps to address: ${job?.gaps?.join(', ') || 'None identified'}

Write a compelling cover letter that:
1. Opens with a strong hook relevant to the company/role
2. Maps the candidate's experience to the job requirements
3. Addresses any gaps honestly with mitigating strengths
4. Is professional but warm (not corporate jargon)
5. Ends with a clear call to action

Write only the cover letter text, ready to use.`
      }],
    });

    const coverLetter = response.content[0].type === 'text'
      ? response.content[0].text
      : '';

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return NextResponse.json({ error: 'Failed to generate cover letter' }, { status: 500 });
  }
}
```

**Step 6: Commit in Conductor**

```bash
cd /path/to/conductor
git add src/app/api/jobs/
git commit -m "feat(jobs): add job search API endpoints"
```

---

## Task 13: Integration Test

**Step 1: Verify build passes**

```bash
cd /path/to/jamelna-site
npm run build
```

Expected: Build completes without errors

**Step 2: Start dev server and test flow**

```bash
npm run dev
```

Test manually:
1. Visit `http://localhost:3000/en/jobs`
2. Should redirect to login
3. Sign in with Google
4. Should see dashboard
5. Add a job URL
6. Should see job with match score
7. Generate cover letter
8. Should see generated text

**Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix(jobs): address integration issues"
```

---

## Summary

Phase 1 MVP includes:
- Google OAuth via Firebase (shared with Conductor)
- Profile editor with skills, experience, target roles
- Manual job URL submission with AI extraction
- Match scoring against profile
- Cover letter generation
- Job list with filtering
- Dashboard with stats

Next phases will add:
- RSS feed aggregation
- Automated scrapers
- Daily digest email
- Application tracking (Kanban)
- Resume tailoring
