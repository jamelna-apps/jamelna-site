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
  // Calendar integration fields
  interviewDate?: string;
  interviewCalendarEventId?: string;
  applicationDeadline?: string;
  deadlineCalendarEventId?: string;
  lastInterviewDate?: string;
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

// Job scanning types
export interface ScanResult {
  totalFound: number;
  newJobs: number;
  duplicatesSkipped: number;
  errors: { source: string; error: string }[];
  scanDuration: number;
}

export interface DiscoveredJob {
  id: string;
  urlHash: string;
  url: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  requirements: string[];
  salary: string | null;
  description: string;
  source: string;
  matchScore: number;
  matchReasons: string[];
  gaps: string[];
  status: DiscoveredJobStatus;
  discoveredAt: string;
}

export type DiscoveredJobStatus = 'new' | 'saved' | 'applied' | 'rejected';
