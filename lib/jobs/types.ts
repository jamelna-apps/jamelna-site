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
