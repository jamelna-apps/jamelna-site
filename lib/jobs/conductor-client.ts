// lib/jobs/conductor-client.ts

import type {
  JobProfile,
  Job,
  Application,
  JobSettings,
  ScanResult,
  DiscoveredJob,
  DiscoveredJobStatus
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

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
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

export async function importProfile(
  sessionToken: string,
  data: {
    resume?: File;
    linkedInUrl?: string;
    websiteUrls?: string[];
  }
): Promise<ConductorResponse<{
  extracted: Partial<JobProfile>;
  sources: Record<string, { parsed: boolean; fields?: string[]; pages?: string[]; error?: string }>;
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
    data.websiteUrls.forEach((url, index) => {
      formData.append(`websiteUrls[${index}]`, url);
    });
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
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
    console.error('Conductor API error:', error);
    return { error: 'Network error' };
  }
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

// Job scanning operations
export async function scanJobs(
  sessionToken: string,
  options?: { feedIds?: string[]; scraperIds?: string[] }
): Promise<ConductorResponse<ScanResult>> {
  return conductorFetch<ScanResult>(
    '/api/jobs/scan',
    { method: 'POST', body: JSON.stringify(options || {}) },
    sessionToken
  );
}

export async function getDiscoveredJobs(
  sessionToken: string,
  filters?: { status?: string; minMatchScore?: number; source?: string }
): Promise<ConductorResponse<DiscoveredJob[]>> {
  const queryParams = new URLSearchParams();

  if (filters?.status) {
    queryParams.append('status', filters.status);
  }

  if (filters?.minMatchScore !== undefined) {
    queryParams.append('minMatchScore', filters.minMatchScore.toString());
  }

  if (filters?.source) {
    queryParams.append('source', filters.source);
  }

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/api/jobs/discovered?${queryString}` : '/api/jobs/discovered';

  return conductorFetch<DiscoveredJob[]>(endpoint, { method: 'GET' }, sessionToken);
}

export async function updateJobStatus(
  sessionToken: string,
  jobId: string,
  status: DiscoveredJobStatus
): Promise<ConductorResponse<void>> {
  return conductorFetch<void>(
    `/api/jobs/discovered/${jobId}`,
    { method: 'PATCH', body: JSON.stringify({ status }) },
    sessionToken
  );
}
