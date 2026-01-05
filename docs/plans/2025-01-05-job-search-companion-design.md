# Job Search Companion - Design Document

**Date:** 2025-01-05
**Status:** Approved
**Location:** jamelna.com/jobs (private section)

## Overview

A private job search dashboard that automatically finds EdTech/AI-in-education/leadership roles, helps apply with AI-generated materials, and tracks the entire application pipeline.

### Goals
1. **Find relevant jobs automatically** - Scan job boards and surface matching positions
2. **Manage applications end-to-end** - Track pipeline from discovery to offer
3. **Generate tailored materials** - AI-customized cover letters and resumes
4. **Save time** - Semi-automated workflow with human review before submission

### Target Roles
- EdTech product roles (Product Manager, Product Lead, Learning Designer)
- AI in Education roles (AI/ML in educational applications)
- Education leadership/consulting (Director, Program Manager)
- *Not pure engineering roles*

### Target Locations
- Remote positions
- Spain / EU
- Spanish EdTech companies (Odilo, Innovamat, Smile and Learn, etc.)

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    jamelna.com                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │  /jobs (private, Google OAuth)                   │   │
│  │  - Dashboard UI                                  │   │
│  │  - Job browser & filters                         │   │
│  │  - Application tracker                           │   │
│  │  - Profile editor                                │   │
│  └─────────────────────────────────────────────────┘   │
└──────────────────────┬──────────────────────────────────┘
                       │ API calls
                       ▼
┌─────────────────────────────────────────────────────────┐
│                    Conductor                            │
│  - Google OAuth (shared)                                │
│  - AI generation (cover letters, resume tailoring)      │
│  - Job storage (Firestore)                              │
│  - RAG for matching (profile vs job descriptions)       │
│  - Email notifications (daily digest)                   │
└─────────────────────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────┐
│              Job Collection Layer                       │
│  - RSS feed aggregator (EdSurge, RemoteOK, etc.)       │
│  - Scrapers (Odilo, Duolingo, Innovamat careers)       │
│  - Manual URL submission                                │
│  - Cron job: daily scan                                 │
└─────────────────────────────────────────────────────────┘
```

**Key principle:** jamelna.com owns the UI and job-specific logic. Conductor provides AI capabilities and data storage as a reusable backend.

## Data Model

Stored in Conductor's Firestore:

```
users/{userId}/
  profile/
    - name, email, location
    - targetRoles: ["Product Manager", "AI Education Lead", ...]
    - targetLocations: ["Remote", "Spain", "EU"]
    - salaryRange: { min, max, currency }
    - skills: [{ name, level, yearsExp }]
    - experience: [{ title, company, dates, highlights }]
    - education: [{ degree, institution, year }]
    - languages: [{ language, proficiency }]
    - generatedSummary: "AI-generated profile summary"
    - resumeUrl: "/files/resume.pdf"
    - linkedInUrl: "..."

  jobs/{jobId}/
    - source: "edsurge" | "linkedin" | "manual" | ...
    - sourceUrl: "original posting URL"
    - title, company, location, remote: boolean
    - description, requirements, salary (if posted)
    - postedDate, scrapedDate
    - matchScore: 0-100 (AI-calculated)
    - matchReasons: ["15 years EdTech", "AI experience", ...]
    - status: "new" | "reviewing" | "applying" | "applied" |
              "interviewing" | "offer" | "rejected" | "withdrawn"
    - notes: "user notes"
    - appliedDate, lastActivity

  applications/{applicationId}/
    - jobId (reference)
    - coverLetter: { draft, final, generatedAt }
    - resumeVersion: { url, tailoredFor }
    - submittedVia: "company site" | "linkedin" | "email"
    - followUps: [{ date, type, notes }]
    - interviewNotes: [{ date, type, notes, interviewers }]

  sources/{sourceId}/
    - name: "Khan Academy Careers"
    - type: "rss" | "scraper" | "manual-only"
    - url: "https://khanacademy.org/careers/rss"
    - scrapeSelector: ".job-listing" (if type=scraper)
    - enabled: true
    - addedDate, lastChecked, jobsFound

  settings/
    - digestTime: "08:00"
    - digestEmail: "joe@jamelna.com"
    - minMatchScore: 60
    - pausedSources: []
```

## Job Collection System

### Sources (Prioritized)

| Priority | Source | Method | Target Roles |
|----------|--------|--------|--------------|
| 1 | EdSurge Jobs | RSS feed | EdTech product, leadership |
| 2 | ISTE Job Board | Scraper | Education leadership, CS ed |
| 3 | RemoteOK | RSS feed | Remote tech roles |
| 4 | WeWorkRemotely | RSS feed | Remote product/leadership |
| 5 | EU Institutions | RSS/scraper | EU education policy roles |
| 6 | Spanish EdTech careers | Scrapers | Direct company pages |
|   | - Odilo, Innovamat, Smile and Learn, Genially | | |
| 7 | LinkedIn (passive) | Manual URL | Any |
| 8 | Indeed/Glassdoor | Manual URL | Fallback |

### Collection Flow

```
Daily cron (6 AM)
    │
    ├─► Fetch RSS feeds
    ├─► Run scrapers for company career pages
    ├─► Deduplicate (by URL + company + title hash)
    │
    ▼
For each new job:
    ├─► AI extracts structured data (title, location, requirements)
    ├─► AI calculates match score against profile
    ├─► Store in Firestore with matchScore + matchReasons
    │
    ▼
8 AM: Send daily digest email to joe@jamelna.com
    └─► Jobs with matchScore ≥ 60, sorted by score
```

### Custom Sources

Users can add new sources via Settings UI:
- Paste careers page URL
- System auto-detects RSS availability
- Define CSS selector for scraping if needed
- Or mark as "manual only" bookmark

## Dashboard UI

### Navigation

```
┌──────────────────────────────────────────────────────────┐
│  Job Search                         [Profile] [Settings] │
├──────────────────────────────────────────────────────────┤
│  [Dashboard]  [All Jobs]  [My Applications]  [Sources]   │
└──────────────────────────────────────────────────────────┘
```

### Pages

**Dashboard (home):**
- Today's matches - new jobs sorted by match score
- Pipeline summary - Applied → Interviewing → Offers
- Quick actions - Add job URL, Update profile
- Recent activity

**All Jobs:**
- Filterable list: source, match score, location, date
- Each row: Title, Company, Match %, Location, Posted date
- Expand for full description + AI match analysis
- "Generate materials" button

**My Applications:**
- Kanban board: New → Applied → Interviewing → Offer/Rejected
- Drag to update status
- Click for full details, materials, notes

**Profile:**
- Editable fields for all profile data
- "Regenerate AI" option (preserves manual overrides)
- Resume upload

**Sources:**
- Active sources with status
- Toggle on/off
- Add new source

**Settings:**
- Digest time and email
- Minimum match score threshold
- Vacation/pause mode

## AI Features

### 1. Profile Generation (One-Time Setup)

Analyzes on first access:
- jamelna.com content (About, Services, Work pages)
- Project codebases (GYST, Conductor, Folio, CodeTale)
- Uploaded resume PDF

Outputs structured profile for user review and editing.

### 2. Job Matching

For each new job:
```
Input: Job description + User profile
Output:
  - matchScore: 78
  - matchReasons: [
      "15+ years EdTech experience matches requirement",
      "CS curriculum design directly relevant",
      "Spanish fluency matches EU market focus"
    ]
  - gaps: [
      "Role prefers PhD; you have Master's equivalent experience"
    ]
```

### 3. Cover Letter Generation

One-click generation that:
- Opens with hook relevant to company/role
- Maps experience to requirements
- Addresses gaps with mitigating strengths
- Maintains user's writing voice
- User edits, then saves final version

### 4. Resume Tailoring

Per-application suggestions:
- Which experiences to emphasize
- Bullet point rewrites for job keywords
- Skills to highlight
- Generates downloadable tailored PDF

## Email Notifications

### Daily Digest (8 AM → joe@jamelna.com)

```
Subject: 5 new jobs match your profile - Jan 6

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 HIGH MATCH (80%+)

Product Lead, AI Learning - Duolingo (Remote)
Match: 87% | Posted: Yesterday
✓ EdTech product experience
✓ AI implementation background
→ View & Apply: jamelna.com/jobs/abc123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 GOOD MATCH (60-79%)

Education Program Manager - Innovamat (Barcelona/Remote)
Match: 72% | Posted: 2 days ago
→ View: jamelna.com/jobs/def456

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Your Pipeline
Applied: 4 | Interviewing: 1 | Awaiting response: 3

→ View Dashboard: jamelna.com/jobs
```

### User Controls
- Digest time (default 8 AM)
- Minimum match score (default 60%)
- Pause digest (vacation mode)

## Tech Stack

### jamelna.com (Frontend + Job Logic)

```
Next.js 14 (existing jamelna-site)
├── /app/[locale]/jobs/          # Private dashboard
│   ├── page.tsx                 # Dashboard home
│   ├── all/page.tsx             # All jobs browser
│   ├── applications/page.tsx    # Kanban tracker
│   ├── profile/page.tsx         # Profile editor
│   ├── sources/page.tsx         # Manage sources
│   └── settings/page.tsx        # Preferences
├── /app/api/jobs/               # API routes (proxy to Conductor)
├── /lib/jobs/                   # Job-specific utilities
└── /components/jobs/            # UI components
```

### Conductor (AI Backend)

```
Existing infrastructure:
├── Google OAuth          → Reuse for jamelna.com auth
├── Firestore             → Store jobs, applications, profile
├── Claude API            → Match scoring, cover letters
├── Voyage embeddings     → Profile-to-job semantic matching
└── Email (new)           → Daily digest via Resend/SendGrid

New endpoints:
├── POST /api/jobs/match         # Score job against profile
├── POST /api/jobs/generate      # Cover letter / resume tailoring
├── GET  /api/jobs/digest        # Trigger digest (cron)
└── POST /api/jobs/scrape        # Fetch & parse job URL
```

### Job Collection (Cron)

```
Vercel Cron or external scheduler
├── 6 AM: Fetch RSS feeds + run scrapers
├── 6:30 AM: Score new jobs against profile
└── 8 AM: Send daily digest to joe@jamelna.com
```

### Shared Auth Flow

1. User visits jamelna.com/jobs
2. Redirects to Conductor OAuth
3. Conductor validates, returns token
4. jamelna.com stores session, calls Conductor APIs with token

## Implementation Phases

### Phase 1: Foundation (MVP)
- Google OAuth integration between jamelna.com and Conductor
- Profile data model + manual editor UI
- Manual job URL submission → AI extraction → storage
- Basic job list view with match scoring
- Single "Generate Cover Letter" button

*Outcome: Working tool with manual job entry*

### Phase 2: Automation
- RSS feed aggregator (EdSurge, RemoteOK, WeWorkRemotely)
- Scrapers for 3-5 key EdTech company career pages
- Daily cron job for collection + scoring
- Daily digest email to joe@jamelna.com

*Outcome: Passive job discovery begins*

### Phase 3: Full Pipeline
- Application tracker (Kanban board)
- Resume tailoring feature
- Custom source management UI
- Follow-up reminders
- Interview notes

*Outcome: Complete job search CRM*

### Phase 4: Polish
- AI profile generation from existing sources
- Writing style learning (match jamelna.com voice)
- Analytics (applications over time, conversion rates)
- Mobile-responsive refinements

*Outcome: Refined, personalized experience*

## Security & Privacy

- All job search data is private (Google OAuth required)
- Profile and application data stored in user's Firestore namespace
- No public endpoints for job data
- Cover letters and resumes are user-controlled

## Success Metrics

- Jobs surfaced per week with 60%+ match
- Time from job posted → user notified
- Applications submitted per week
- Interview conversion rate
