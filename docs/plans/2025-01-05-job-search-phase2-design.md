# Job Search Companion - Phase 2 Design

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Date:** 2025-01-05
**Status:** Approved
**Goal:** Add profile import from multiple sources and automatic job discovery

**Architecture:** Extend existing Jobs MVP with profile import wizard (resume PDF + LinkedIn + jamelna.com) and daily cron-based job scanning across RSS feeds and scrapers.

**Tech Stack:** Next.js (jamelna-site), Conductor (API), Firebase Storage (resumes), Vercel Cron (scheduling), Cheerio (scraping)

---

## Part A: Profile Import Wizard

### User Flow

1. User clicks "Import Profile" button on Profile page
2. Modal wizard with 3 steps:
   - **Step 1**: Upload resume (PDF drag-drop or file picker)
   - **Step 2**: Paste LinkedIn profile URL (optional)
   - **Step 3**: Confirm jamelna.com pages to scan (pre-checked: About, Services, Work)
3. User clicks "Import" → Loading state while AI processes
4. Results screen shows extracted data in editable form:
   - Skills (with levels and years)
   - Experience entries
   - Education
   - Languages
   - Summary
5. User reviews, edits if needed, clicks "Save to Profile"

### AI Processing

**Resume (PDF):**
- Extract text from PDF using pdf-parse or similar
- Send to Claude with prompt to extract structured profile data
- Return: skills[], experience[], education[], summary

**LinkedIn URL:**
- Fetch profile page (may need proxy/scraping service for public profiles)
- Extract visible experience, skills, education
- Merge with resume data (dedupe by company+title)

**jamelna.com:**
- Fetch /en/about, /en/services, /en/work pages
- Extract relevant content (projects, expertise, experience mentions)
- AI synthesizes into additional skills and experience highlights

**Merge Strategy:**
- Combine all sources, prefer resume for dates/details
- Deduplicate experience by company name similarity
- Union of all skills, highest level wins if duplicate
- Summary generated fresh from combined data

### API Endpoint

```
POST /api/jobs/import-profile
Content-Type: multipart/form-data

Body:
- resumeFile: PDF file (optional)
- linkedInUrl: string (optional)
- websiteUrls: string[] (default: jamelna.com pages)

Response:
{
  "extracted": {
    "name": "Joe Meléndez",
    "summary": "...",
    "skills": [{ "name": "EdTech", "level": "expert", "yearsExp": 15 }, ...],
    "experience": [{ "title": "...", "company": "...", ... }, ...],
    "education": [...],
    "languages": [...]
  },
  "sources": {
    "resume": { "parsed": true, "fields": ["skills", "experience", "education"] },
    "linkedin": { "parsed": true, "fields": ["experience", "skills"] },
    "website": { "parsed": true, "pages": ["/en/about", "/en/services", "/en/work"] }
  }
}
```

### File Storage

- Resumes stored in Firebase Storage: `users/{userId}/resume.pdf`
- Profile updated with `resumeUrl` pointing to storage location

---

## Part B: Automatic Job Discovery

### Sources

| Source | Type | URL/Method | Priority |
|--------|------|------------|----------|
| EdSurge Jobs | RSS | `https://www.edsurge.com/jobs/rss` | High |
| RemoteOK | RSS | `https://remoteok.com/remote-jobs.rss` | Medium |
| WeWorkRemotely | RSS | `https://weworkremotely.com/categories/remote-jobs.rss` | Medium |
| ISTE Job Board | Scraper | Parse careers page HTML | High |
| Odilo | Scraper | careers.odilo.es or similar | High |
| Innovamat | Scraper | innovamat.com/careers | High |
| Smile and Learn | Scraper | Company careers page | Medium |
| Genially | Scraper | genial.ly/careers | Medium |

### Daily Cron Flow (6 AM UTC)

```
1. Fetch all RSS feeds in parallel
   └─ Parse XML, extract job entries

2. Run scrapers for company career pages
   └─ Cheerio parse HTML, extract job listings

3. For each job found:
   ├─ Generate hash from URL (dedupe key)
   ├─ Check if exists in Firestore → skip if yes
   ├─ AI extract structured data:
   │   └─ title, company, location, remote, requirements[], salary
   ├─ AI calculate match score against user profile:
   │   └─ matchScore (0-100), matchReasons[], gaps[]
   └─ Store in Firestore with status: 'new'

4. Log scan results:
   └─ { totalFound, newJobs, duplicatesSkipped, errors }
```

### Match Scoring Prompt

```
Given this job posting and user profile, calculate a match score.

Job:
{title, company, description, requirements}

Profile:
{skills, experience, targetRoles, targetLocations}

Return JSON:
{
  "matchScore": 0-100,
  "matchReasons": ["Reason 1", "Reason 2", ...],
  "gaps": ["Gap 1", ...]
}

Scoring guidelines:
- 80-100: Strong match, meets most requirements
- 60-79: Good match, meets core requirements
- 40-59: Partial match, missing some key requirements
- 0-39: Poor match, significant gaps
```

### API Endpoints

```
POST /api/jobs/scan
  - Triggers manual job scan
  - Returns: { jobsFound, newJobs, errors }

GET /api/jobs/sources
  - Returns configured sources with status
  - Response: { sources: [{ id, name, type, enabled, lastChecked, jobsFound }] }

POST /api/jobs/sources/:id/toggle
  - Enable/disable a source
  - Body: { enabled: boolean }
```

### Vercel Cron Configuration

```json
// vercel.json
{
  "crons": [{
    "path": "/api/cron/scan-jobs",
    "schedule": "0 6 * * *"
  }]
}
```

---

## Part C: UI Changes

### Profile Page

Add to top of profile form:

```
┌─────────────────────────────────────────────────────────┐
│  Your Profile                        [Import Profile]   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Import Status:                                         │
│  ┌─────────────────┐  ┌─────────────────┐              │
│  │ Resume          │  │ LinkedIn        │              │
│  │ resume.pdf ✓    │  │ Connected ✓     │              │
│  │ Uploaded Jan 5  │  │ Last sync Jan 5 │              │
│  │ [Re-upload]     │  │ [Update URL]    │              │
│  └─────────────────┘  └─────────────────┘              │
│                                                         │
│  [Existing profile form...]                             │
└─────────────────────────────────────────────────────────┘
```

### Import Profile Modal

```
┌─────────────────────────────────────────────────────────┐
│  Import Profile                                    [X]  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Step 1 of 3: Upload Resume                             │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │                                                 │   │
│  │     📄 Drag & drop your resume (PDF)           │   │
│  │        or click to browse                       │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [Skip]                                       [Next →]  │
└─────────────────────────────────────────────────────────┘
```

### Dashboard Additions

```
┌─────────────────────────────────────────────────────────┐
│  Dashboard                              Last scan: 6 AM │
│                                          [Scan Now]     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Today's Matches (3 new jobs)                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Product Lead, AI Learning        Duolingo       │   │
│  │ 87% match • Remote • EdSurge                    │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │ Education PM                     Innovamat      │   │
│  │ 74% match • Barcelona • Scraper                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  [View All Jobs →]                                      │
└─────────────────────────────────────────────────────────┘
```

### Settings Page (New)

```
┌─────────────────────────────────────────────────────────┐
│  Settings                                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Job Sources                                            │
│  ┌─────────────────────────────────────────────────┐   │
│  │ [✓] EdSurge Jobs          Last: 6 AM, 12 found │   │
│  │ [✓] RemoteOK              Last: 6 AM, 45 found │   │
│  │ [✓] WeWorkRemotely        Last: 6 AM, 23 found │   │
│  │ [✓] ISTE Job Board        Last: 6 AM, 8 found  │   │
│  │ [✓] Odilo                 Last: 6 AM, 2 found  │   │
│  │ [✓] Innovamat             Last: 6 AM, 3 found  │   │
│  │ [ ] Smile and Learn       Disabled             │   │
│  │ [✓] Genially              Last: 6 AM, 1 found  │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  Minimum Match Score: [60%  ▼]                         │
│  (Jobs below this won't appear in dashboard)           │
│                                                         │
│  [Scan Now]                                             │
└─────────────────────────────────────────────────────────┘
```

---

## Implementation Order

### Phase 2A: Profile Import (Build First)
1. Firebase Storage setup for resume uploads
2. PDF text extraction endpoint
3. LinkedIn URL scraping/parsing
4. jamelna.com page fetching
5. AI profile extraction prompt
6. Import wizard UI components
7. Profile page updates

### Phase 2B: Job Discovery (Build Second)
1. RSS feed fetcher utility
2. Scraper utilities for each company
3. Job deduplication logic
4. Match scoring AI integration
5. Firestore job storage with sources
6. Cron job endpoint
7. Dashboard "Today's Matches" UI
8. Settings page with source toggles
9. Manual "Scan Now" button

---

## Technical Notes

**Scraping Considerations:**
- Use server-side fetching (not client-side) to avoid CORS
- Respect robots.txt where applicable
- Add delays between requests (1 req/sec per domain)
- Handle failures gracefully - log and continue

**LinkedIn Limitations:**
- Public profile scraping may be rate-limited
- Consider using LinkedIn URL as manual reference only
- Or use a third-party service (Proxycurl, etc.) if needed

**RSS Feed Reliability:**
- Some feeds may change structure - add error handling
- Cache feed results to avoid re-processing unchanged items

**Match Score Caching:**
- Re-score jobs when profile is updated
- Store scoring version to know when recalculation needed
