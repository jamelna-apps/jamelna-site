# Jobs Enhanced Features Design

**Date:** 2025-01-06
**Status:** Approved

## Overview

Enhance the job search feature by integrating Conductor's existing infrastructure for research, insights, calendar sync, and AI assistance. Add resume versioning with AI-powered tailoring.

## Features

### 1. Resume Library & AI Tailoring

**Approach:** Hybrid - library of base resume versions + AI tailors them for specific jobs.

**Data Model:**
```
users/{uid}/jobSearch/resumes/{resumeId}
├── name: "Frontend Focus"
├── content: { structured resume data }
├── pdfUrl: "storage path to PDF"
├── isDefault: boolean
├── createdAt, updatedAt
└── sourceType: "uploaded" | "generated" | "tailored"

users/{uid}/jobs/{jobId}/tailoredResume
├── baseResumeId: "resume123"
├── content: { tailored resume data }
├── pdfUrl: "storage path"
├── changes: ["Added Python emphasis", "Highlighted leadership"]
└── createdAt
```

**Workflow:**
1. User uploads base resume(s) to library via Profile page
2. When viewing a job, "Tailor Resume" button appears
3. AI analyzes job description + selected base resume → generates tailored version
4. Preview modal shows:
   - Side-by-side diff (what changed)
   - Download PDF button
   - "Save to this job" button → attaches to job record
   - "Save as new base version" → adds to library

---

### 2. Company Research Integration

**Approach:** Auto-suggest when viewing + on-demand research button. No background auto-fetch (API cost control).

**Trigger Points:**
- Job detail view shows "Research [Company]" suggestion banner
- "Research" button on each job card
- Results cached per company (not per job)

**Research Flow:**
1. User clicks "Research [Company]"
2. Tavily searches: company reviews, salary data, culture, interview experiences
3. Claude summarizes into structured sections:
   - Company Overview
   - Salary Range (if found)
   - Interview Process
   - Culture & Reviews
4. Results displayed in slide-out panel
5. "Save to Knowledge Base" button → stores as web source, indexed for RAG

**Data Model:**
```
users/{uid}/jobSearch/companyResearch/{companySlug}
├── companyName: "Code for America"
├── research: { overview, salary, culture, interviews }
├── sources: [{ url, title }]
├── createdAt, updatedAt
└── linkedJobIds: ["job1", "job2"]
```

---

### 3. Deadline-Focused Proactive Insights

**Scope:** Deadline-focused only (application deadlines, interview dates, offer responses).

**Insight Types:**

| Type | Trigger | Priority |
|------|---------|----------|
| `application_deadline` | Job expires in ≤7 days | urgent ≤3d, high ≤7d |
| `interview_upcoming` | Interview in ≤3 days | urgent if tomorrow |
| `offer_response_due` | Offer deadline approaching | urgent ≤2d |
| `follow_up_due` | 3 days post-interview | medium |

**Generation:**
- Daily cron job scans jobs with deadlines
- Creates/updates insights in `users/{uid}/jobSearch/insights`
- Dismissed insights don't regenerate until next occurrence

**Data Model:**
```
users/{uid}/jobSearch/insights/{insightId}
├── type: "application_deadline" | "interview_upcoming" | ...
├── priority: "urgent" | "high" | "medium"
├── title: "Interview with Code for America in 2 days"
├── jobId: "abc123"
├── dueDate: timestamp
├── dismissed: boolean
└── createdAt
```

**Display:**
- Insights widget on jobs dashboard (top of page)
- Badge count on nav showing urgent/high items
- Each insight has action button ("View Job", "Prepare", etc.)

---

### 4. Two-Way Calendar Integration

**Outbound Sync (Jobs → Google Calendar):**
- Interview date set → create calendar event
- Application deadline set → create reminder event
- Events include job title, company, link back to app
- Updates sync automatically

**Inbound Sync (Google Calendar → Jobs):**
- Daily sync pulls calendar events
- Pattern matching detects interview-like events
- Auto-link to matching jobs or surface as suggestion

**Event Format:**
```
Title: "Interview: Associate Program Director @ Code for America"
Description:
  - Role: Associate Program Director
  - Link: https://jamelna.com/jobs/view/{jobId}
  - Notes: [user's notes]
Location: [from job or user input]
```

**Job Record Extension:**
```
users/{uid}/jobs/{jobId}
├── interviewDate: timestamp
├── interviewCalendarEventId: "google_event_id"
├── applicationDeadline: timestamp
└── deadlineCalendarEventId: "google_event_id"
```

---

### 5. Global Chat Widget

**Placement:** Floating button (bottom-right) on all `/jobs/*` pages, expands to 400px slide-out panel.

**Context Awareness:**

| Current Page | Auto-Context |
|--------------|--------------|
| Job list | All saved jobs |
| Viewing job X | Job X + company research |
| Profile page | Resume library, skills |
| Dashboard | Recent activity, deadlines |

**Capabilities:**
- Q&A against saved jobs: "Which jobs mention Python?"
- Company research: "What's the culture like at Code for America?"
- Interview prep: "What should I prepare for this role?"
- Resume help: "How should I highlight leadership for this job?"
- Web search fallback when knowledge base lacks answer

**Technical:**
- Uses existing `/api/chat` with `featureContext: 'jobs'`
- Passes `selectedDocIds` based on view context
- History persisted in `users/{uid}/jobSearch/chatSessions`

**RAG Prompt:**
```
You are a job search assistant. Help with:
- Comparing job opportunities
- Interview preparation
- Resume tailoring suggestions
- Company research questions
Answer based on the user's saved jobs, resumes, and research.
```

---

## UI Layout

```
┌─────────────────────────────────────────────────────────┐
│ [Insights Banner - urgent/high deadlines]               │
├─────────────────────────────────────────────────────────┤
│ Dashboard / All Jobs / Profile / Settings               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Job Cards with:                                        │
│  - [Research] button                                    │
│  - [Tailor Resume] button (when viewing)                │
│  - Interview date badge (synced to calendar)            │
│  - Deadline countdown badge                             │
│                                                         │
│                                         ┌─────────────┐ │
│                                         │ Chat Widget │ │
│                                         └─────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Page Changes:**
- Profile page: Add "Resume Library" section
- Settings page: Add "Calendar Sync" toggle

---

## API Endpoints

### New Endpoints (Conductor)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/jobs/resumes` | GET, POST, DELETE | Resume library CRUD |
| `/api/jobs/resumes/[id]` | GET, PUT, DELETE | Single resume operations |
| `/api/jobs/tailor-resume` | POST | AI-powered resume tailoring |
| `/api/jobs/research` | POST | Company research via Tavily |
| `/api/jobs/insights` | GET | Get active insights for user |
| `/api/jobs/insights/[id]/dismiss` | POST | Dismiss an insight |
| `/api/jobs/calendar-sync` | POST | Trigger calendar sync |
| `/api/jobs/[jobId]/calendar-event` | POST, DELETE | Link/unlink calendar event |

### Existing Endpoints to Extend

| Endpoint | Change |
|----------|--------|
| `/api/jobs/[jobId]` | Add `interviewDate`, `applicationDeadline`, calendar event IDs |
| `/api/chat` | Add `featureContext: 'jobs'` support |
| `/api/cron/daily-tasks` | Add job insights generation |

---

## Implementation Phases

### Phase 1: Resume Library
- Resume upload/storage
- Resume list UI on Profile page
- Basic CRUD API

### Phase 2: AI Tailoring
- Tailor resume endpoint
- Preview modal with diff view
- Save options (to job, to library, download)

### Phase 3: Company Research
- Tavily integration for company research
- Research cache by company
- Slide-out panel UI
- Save to knowledge base

### Phase 4: Calendar Integration
- Outbound sync (jobs → calendar)
- Inbound sync (calendar → jobs)
- Event linking UI

### Phase 5: Proactive Insights
- Insight generation cron job
- Insights widget UI
- Dismiss/action functionality

### Phase 6: Chat Widget
- Global floating widget component
- Context-aware RAG integration
- Chat history persistence

---

## Dependencies

- **Tavily API** - Already configured in Conductor
- **Google Calendar API** - Already configured in Conductor
- **Claude API** - Already configured for RAG/chat
- **Firebase Storage** - For resume PDF storage
