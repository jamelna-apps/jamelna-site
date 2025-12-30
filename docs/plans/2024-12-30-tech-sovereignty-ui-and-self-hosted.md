# Tech Sovereignty UI Improvements & Self-Hosted Services Curriculum

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Improve the Tech Sovereignty section UI consistency, hierarchy, and mobile experience, then build the complete Self-Hosted Services curriculum.

**Architecture:** Phase 1 refactors the main landing page with a sticky TOC, consistent colors, and cleaner visual hierarchy. Phase 2 creates a new curriculum page following the networking page's structure with 4 projects, detailed lessons, UDL framework supports, and teacher notes.

**Tech Stack:** Next.js 16, React, TypeScript, Tailwind CSS, next-intl for i18n

---

## Phase 1: UI Improvements

### Task 1: Add Sticky Table of Contents

**Files:**
- Modify: `app/[locale]/tech-sovereignty/page.tsx`

**Step 1: Add TOC component after imports**

```tsx
// Add after line 148 (after TrackSection component)

// Table of Contents Component
function TableOfContents() {
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const links = [
    { id: 'why', label: 'Why Tech Sovereignty' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'tools', label: 'Tools' },
    { id: 'educators', label: 'For Educators' },
    { id: 'community', label: 'Community' },
  ];

  return (
    <nav className="hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={`#${link.id}`}
              className={`block text-xs px-3 py-1.5 rounded-full transition-all ${
                activeSection === link.id
                  ? 'bg-secret text-white'
                  : 'text-text-muted hover:text-text-secondary hover:bg-deep-card'
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

**Step 2: Add IDs to sections and render TOC**

In the return statement, add `id="why"` to the "Why Tech Sovereignty" section (line 260), `id="educators"` to the educators section (line 456), and `id="community"` to the community section (line 513).

Add `<TableOfContents />` right after the opening `<main>` tag.

**Step 3: Verify locally**

Run: `npm run dev`
Navigate to: `http://localhost:3000/tech-sovereignty`
Expected: Sticky TOC visible on right side on desktop, highlights active section while scrolling

**Step 4: Commit**

```bash
git add app/[locale]/tech-sovereignty/page.tsx
git commit -m "feat(tech-sovereignty): add sticky table of contents navigation"
```

---

### Task 2: Fix Color Consistency in Track Icons

**Files:**
- Modify: `app/[locale]/tech-sovereignty/page.tsx`

**Step 1: Standardize icon colors to use consistent Tailwind classes**

Find and replace the TrackSection calls (lines 317-382):

Replace `text-accent-cyan` with `text-primary` (App Dev track, line 361)
Replace `text-highlight-orange` with `text-warm` (Community track, line 374)
Replace `bg-accent/20` with `bg-primary/20` (App Dev track, line 368)
Replace `bg-highlight-orange/20` with `bg-warm/20` (Community track, already correct at 381)

**Step 2: Fix hardware tools dot color**

Line 444: Replace `bg-text-muted` with `bg-primary/50`

**Step 3: Verify locally**

Run: `npm run dev`
Expected: All track icons use consistent color palette (primary, secret, warm)

**Step 4: Commit**

```bash
git add app/[locale]/tech-sovereignty/page.tsx
git commit -m "fix(tech-sovereignty): standardize track icon colors"
```

---

### Task 3: Improve Visual Hierarchy - Dim Coming Soon Tracks

**Files:**
- Modify: `app/[locale]/tech-sovereignty/page.tsx`

**Step 1: Add trackAvailable prop usage in TrackSection**

Update TrackSection component (around line 111) to accept and use opacity:

```tsx
function TrackSection({ icon, title, description, projects, color, trackLink, trackAvailable }: TrackSectionProps) {
  const allComingSoon = projects.every(p => p.status === 'coming-soon');

  return (
    <div className={`mb-12 ${allComingSoon ? 'opacity-70' : ''}`}>
      {/* ... rest unchanged */}
    </div>
  );
}
```

**Step 2: Verify locally**

Run: `npm run dev`
Expected: Self-Hosted, AI, App Dev, and Community tracks appear slightly dimmed

**Step 3: Commit**

```bash
git add app/[locale]/tech-sovereignty/page.tsx
git commit -m "feat(tech-sovereignty): dim coming-soon tracks for visual hierarchy"
```

---

### Task 4: Standardize Tool Grid Columns

**Files:**
- Modify: `app/[locale]/tech-sovereignty/page.tsx`

**Step 1: Make all tool grids use 3 columns consistently**

Line 425 (LLM Tools): Change `md:grid-cols-4` to `md:grid-cols-3`

This makes all tool sections use `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`

**Step 2: Verify locally**

Expected: All tool category grids have same column count

**Step 3: Commit**

```bash
git add app/[locale]/tech-sovereignty/page.tsx
git commit -m "fix(tech-sovereignty): standardize tool grid columns to 3"
```

---

### Task 5: Improve Mobile Spacing and Typography

**Files:**
- Modify: `app/[locale]/tech-sovereignty/page.tsx`

**Step 1: Tighten hero spacing on mobile**

Line 224: Change `py-20` to `py-12 md:py-20`
Line 236: Add responsive text: Change `text-xl md:text-2xl` to `text-lg sm:text-xl md:text-2xl`

**Step 2: Improve track section mobile layout**

Line 141: Change `ml-0 md:ml-16` to `ml-0` (remove desktop indent for cleaner look)

**Step 3: Verify on mobile viewport**

Open dev tools, set viewport to 375px width
Expected: Better spacing, readable text sizes

**Step 4: Commit**

```bash
git add app/[locale]/tech-sovereignty/page.tsx
git commit -m "fix(tech-sovereignty): improve mobile spacing and typography"
```

---

### Task 6: Deploy UI Improvements

**Step 1: Run build to verify no errors**

```bash
cd /Users/jmelendez/Documents/Projects/jamelna/jamelna-site
npm run build
```

Expected: Build succeeds with no TypeScript errors

**Step 2: Deploy to Vercel**

```bash
vercel --prod
```

Expected: Deployment succeeds

**Step 3: Verify live site**

Navigate to: `https://jamelna.com/tech-sovereignty`
Test: Sticky TOC, color consistency, mobile layout

---

## Phase 2: Self-Hosted Services Curriculum

### Task 7: Create Self-Hosted Page File Structure

**Files:**
- Create: `app/[locale]/tech-sovereignty/self-hosted/page.tsx`

**Step 1: Create directory and file**

```bash
mkdir -p app/[locale]/tech-sovereignty/self-hosted
touch app/[locale]/tech-sovereignty/self-hosted/page.tsx
```

**Step 2: Add base structure (copy from networking and adapt)**

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border border-purple-200 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">Core Pedagogical Principle: Ownership Through Understanding</h3>
        <p className="text-gray-700 mb-3">
          Self-hosting isn&apos;t just about running software—it&apos;s about understanding <strong>what your data is</strong>,
          <strong> where it lives</strong>, and <strong>who has access to it</strong>. Students learn to make informed
          decisions about digital autonomy.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-1">Data Awareness</h4>
            <p className="text-sm text-gray-600">Understand what data services collect, where it&apos;s stored, and why that matters for privacy and autonomy.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-1">Service Architecture</h4>
            <p className="text-sm text-gray-600">Learn how web services work: clients, servers, databases, and the flow of information between them.</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="font-semibold text-purple-800 mb-1">Trade-off Analysis</h4>
            <p className="text-sm text-gray-600">Evaluate convenience vs. control, understanding when self-hosting makes sense and when it doesn&apos;t.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function SelfHostedPage() {
  const locale = useLocale();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Tracks
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <span className="text-purple-200 text-sm font-medium">Track B</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Self-Hosted Services</h1>
          <p className="text-xl text-purple-100 max-w-3xl">
            Take control of your digital life by running your own cloud storage, communication tools,
            and web applications. Learn the skills to break free from big tech dependencies.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <CorePrinciple />

        {/* Projects will go here - Task 8-11 */}
        <div className="text-center py-20 text-gray-500">
          <p>Curriculum content loading...</p>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between">
          <Link
            href={`/${locale}/tech-sovereignty/networking`}
            className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Networking
          </Link>
          <Link
            href={`/${locale}/tech-sovereignty/ai`}
            className="text-gray-600 hover:text-purple-600 transition-colors flex items-center gap-1"
          >
            Next: AI/LLM Independence
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
```

**Step 3: Verify page loads**

Run: `npm run dev`
Navigate to: `http://localhost:3000/tech-sovereignty/self-hosted`
Expected: Page renders with header, hero, and placeholder content

**Step 4: Commit**

```bash
git add app/[locale]/tech-sovereignty/self-hosted/page.tsx
git commit -m "feat(tech-sovereignty): scaffold self-hosted services page"
```

---

### Task 8: Add Type Definitions and Shared Components

**Files:**
- Modify: `app/[locale]/tech-sovereignty/self-hosted/page.tsx`

**Step 1: Add all type definitions after CorePrinciple component**

Copy the type definitions from networking page (lines 43-132):
- UDLEngagement, UDLRepresentation, UDLActionExpression, UDLFramework
- ActivityStep, VideoResource, DetailedActivity
- GradeBand, Lesson, Project

**Step 2: Add UDLSection component**

Copy UDLSection component from networking page (lines 134-251)

**Step 3: Add DetailedActivityCard component**

Copy DetailedActivityCard from networking page (approx lines 252-350)

**Step 4: Add LessonCard component**

Copy LessonCard from networking page

**Step 5: Add ProjectSection component**

Copy ProjectSection from networking page

**Step 6: Verify no TypeScript errors**

Run: `npx tsc --noEmit`
Expected: No errors

**Step 7: Commit**

```bash
git add app/[locale]/tech-sovereignty/self-hosted/page.tsx
git commit -m "feat(self-hosted): add type definitions and shared components"
```

---

### Task 9: Build Project 1 - Personal Cloud Storage with Nextcloud

**Files:**
- Modify: `app/[locale]/tech-sovereignty/self-hosted/page.tsx`

**Step 1: Add Project 1 data**

Add this constant before the component's return statement:

```tsx
const project1: Project = {
  id: 'personal-cloud',
  title: 'Project 1: Personal Cloud Storage with Nextcloud',
  description: 'Set up your own cloud storage system that replaces Google Drive, Dropbox, and iCloud',
  difficulty: 'Beginner',
  duration: '2-3 weeks',
  gradeBand: '6-12',
  overview: `Students will deploy and configure Nextcloud, an open-source cloud storage platform,
    learning about file synchronization, user authentication, and data sovereignty. By the end,
    they'll have a working personal cloud accessible from any device.`,
  learningObjectives: [
    'Understand how cloud storage works (sync protocols, file versioning, conflict resolution)',
    'Configure a web server (Apache/Nginx) to serve a PHP application',
    'Set up user authentication and access controls',
    'Implement HTTPS with SSL certificates for secure data transmission',
    'Compare self-hosted vs commercial cloud storage (privacy, cost, reliability trade-offs)'
  ],
  prerequisites: [
    'Basic understanding of files and folders',
    'Familiarity with web browsers',
    'Completed Track A Project 1 (networking basics) recommended'
  ],
  materials: {
    required: [
      'Raspberry Pi 4 (4GB+ RAM) or old laptop/desktop',
      'MicroSD card (32GB+) or SSD for Pi',
      'Ethernet cable or WiFi connection',
      'USB storage drive (for actual cloud storage)'
    ],
    optional: [
      'Domain name (for external access)',
      'Dynamic DNS service account',
      'SSL certificate (or use Let\'s Encrypt)'
    ]
  },
  lessons: [
    {
      title: 'Lesson 1: What is Cloud Storage, Really?',
      duration: '90 minutes',
      gradeBand: '6-12',
      objectives: [
        'Define cloud storage and identify its key components',
        'Trace the path of a file from device to cloud and back',
        'Compare commercial cloud services with self-hosted alternatives',
        'Identify privacy implications of storing data on third-party servers'
      ],
      conceptualUnderstanding: [
        'Cloud storage is just "someone else\'s computer" - understanding server infrastructure',
        'Sync vs backup: why files appear on all your devices',
        'The trade-off triangle: convenience, privacy, and control'
      ],
      activities: [
        'Map the journey of a photo from phone to Google Photos',
        'Read and discuss terms of service for major cloud providers',
        'Design your ideal cloud storage system on paper'
      ],
      detailedActivities: [
        {
          title: 'Activity 1: Where Does Your Data Actually Go?',
          duration: '25 minutes',
          overview: 'Students trace the physical and logical path of a file uploaded to cloud storage',
          steps: [
            {
              instruction: 'Open discussion: "When you save a photo to iCloud/Google Photos, where does it go?"',
              teacherNotes: 'Collect responses without correcting yet. Most students think "the cloud" is abstract.',
              duration: '5 min'
            },
            {
              instruction: 'Show a map of Google/Apple data centers. Explain that "the cloud" is physical buildings with millions of hard drives.',
              teacherNotes: 'Use Google\'s data center virtual tour video if available.',
              duration: '5 min'
            },
            {
              instruction: 'Draw diagram together: Phone → Internet → Data Center → Storage Array → Your File',
              teacherNotes: 'Have students copy this into their notebooks. This becomes a reference diagram.',
              duration: '10 min'
            },
            {
              instruction: 'Discuss: What could go wrong at each step? Who has access at each point?',
              teacherNotes: 'Guide toward: ISP can see metadata, company employees could access files, government subpoenas, data breaches.',
              duration: '5 min'
            }
          ],
          formativeAssessment: 'Can students explain why "the cloud" is a misleading term?',
          differentiation: {
            support: 'Provide pre-drawn diagram template for students to label',
            extension: 'Research and present on a specific data center incident or breach'
          }
        },
        {
          title: 'Activity 2: Terms of Service Detective',
          duration: '30 minutes',
          overview: 'Students analyze real ToS documents to understand data rights',
          steps: [
            {
              instruction: 'Distribute printed excerpts from Google Drive, Dropbox, and iCloud ToS (pre-selected relevant sections)',
              teacherNotes: 'Prepare excerpts focusing on: data usage rights, sharing with third parties, government requests, account termination.',
              duration: '5 min'
            },
            {
              instruction: 'In pairs, highlight: 1) What rights you give them 2) What they can do with your data 3) When they can delete your account',
              teacherNotes: 'Circulate and help with legal language. Pre-define difficult terms.',
              duration: '15 min'
            },
            {
              instruction: 'Each pair shares most surprising finding with class',
              duration: '10 min'
            }
          ],
          formativeAssessment: 'Can students identify at least one concerning clause in each ToS?'
        },
        {
          title: 'Activity 3: Design Your Ideal Cloud',
          duration: '25 minutes',
          overview: 'Students design their ideal cloud storage system, setting up the project motivation',
          steps: [
            {
              instruction: 'Prompt: "If you could design your own cloud storage, what features would it have?"',
              duration: '5 min'
            },
            {
              instruction: 'Students sketch their design including: where data is stored, who can access it, how it syncs',
              duration: '15 min'
            },
            {
              instruction: 'Gallery walk: students view others\' designs and leave sticky note feedback',
              duration: '5 min'
            }
          ],
          formativeAssessment: 'Do designs show understanding of the client-server model?',
          differentiation: {
            support: 'Provide template with prompts: "My files are stored in ___", "To access them I need ___"',
            extension: 'Include security measures, backup strategies, or multi-user access in design'
          }
        }
      ],
      materials: [
        'Printed ToS excerpts from major cloud providers',
        'World map showing data center locations',
        'Blank paper for design activity',
        'Sticky notes for gallery walk'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: [
            'Choose which cloud provider ToS to analyze in depth',
            'Design cloud system for personal use case (photos, documents, music)'
          ],
          relevanceAndAuthenticity: [
            'Analyze services students actually use daily',
            'Connect to news stories about data breaches'
          ],
          selfRegulation: [
            'Reflection prompt: What surprised you most today?',
            'Goal setting: What do you want your cloud storage to be like?'
          ]
        },
        representation: {
          multipleFormats: [
            'Visual diagrams of data flow',
            'Written ToS analysis',
            'Verbal class discussion'
          ],
          vocabularySupport: [
            'Word wall: server, client, sync, encrypt, ToS, data center',
            'Pre-teach legal terminology in ToS'
          ],
          backgroundKnowledge: [
            'Start with familiar apps (Photos, Drive) before abstract concepts',
            'Connect to physical experiences (file cabinets, mailboxes)'
          ]
        },
        actionExpression: {
          physicalOptions: [
            'Digital or paper-based ToS analysis',
            'Standing gallery walk or seated pair share'
          ],
          expressionOptions: [
            'Sketch, write, or verbally describe cloud design',
            'Individual or pair work for ToS activity'
          ],
          executiveFunctionSupport: [
            'Checklist for ToS analysis points',
            'Timer visible for activity transitions',
            'Graphic organizer for design activity'
          ]
        }
      }
    },
    // Lessons 2-5 would follow similar structure
    {
      title: 'Lesson 2: Preparing Your Server Hardware',
      duration: '90 minutes',
      gradeBand: '6-12',
      objectives: [
        'Set up Raspberry Pi or repurpose old computer as server',
        'Install and configure Raspberry Pi OS or Ubuntu Server',
        'Understand server vs desktop operating systems',
        'Configure SSH for remote management'
      ],
      conceptualUnderstanding: [
        'A server is just a computer that serves files/services to other computers',
        'Headless operation: why servers don\'t need monitors',
        'Security considerations for always-on devices'
      ],
      activities: [
        'Assemble and boot Raspberry Pi',
        'Install operating system from scratch',
        'Configure SSH and test remote connection'
      ],
      materials: [
        'Raspberry Pi 4 with power supply',
        'MicroSD card and card reader',
        'Ethernet cable',
        'Separate computer for SSH access'
      ]
    },
    {
      title: 'Lesson 3: Installing Nextcloud',
      duration: '90 minutes',
      gradeBand: '6-12',
      objectives: [
        'Understand LAMP/LEMP stack components',
        'Install Apache web server and PHP',
        'Set up MariaDB database',
        'Deploy Nextcloud via web installer'
      ],
      conceptualUnderstanding: [
        'Web applications need: web server + language runtime + database',
        'How HTTP requests flow through the stack',
        'Configuration files: where settings live'
      ],
      activities: [
        'Install web server and verify it works',
        'Configure PHP with required extensions',
        'Create database and user for Nextcloud'
      ],
      materials: [
        'Prepared server from Lesson 2',
        'Nextcloud installation documentation (printed or accessible)'
      ]
    },
    {
      title: 'Lesson 4: Securing Your Cloud',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Configure HTTPS with Let\'s Encrypt',
        'Understand SSL/TLS certificates and encryption',
        'Set up firewall rules',
        'Configure Nextcloud security hardening options'
      ],
      conceptualUnderstanding: [
        'Encryption in transit vs at rest',
        'Certificate authorities and trust chains',
        'Defense in depth: multiple security layers'
      ],
      activities: [
        'Generate and install SSL certificate',
        'Configure firewall with UFW',
        'Run Nextcloud security scan and fix issues'
      ],
      materials: [
        'Domain name (or use DuckDNS for free subdomain)',
        'Nextcloud security documentation'
      ]
    },
    {
      title: 'Lesson 5: Using and Maintaining Your Cloud',
      duration: '90 minutes',
      gradeBand: '6-12',
      objectives: [
        'Install sync clients on multiple devices',
        'Configure automated backups',
        'Set up users and sharing permissions',
        'Create maintenance routine (updates, monitoring)'
      ],
      conceptualUnderstanding: [
        'Sync conflict resolution: what happens with simultaneous edits',
        'Backup vs sync: why you need both',
        'The responsibility of self-hosting: you\'re the IT department now'
      ],
      activities: [
        'Install desktop and mobile sync clients',
        'Create test files and verify sync',
        'Set up automated backup to external drive'
      ],
      materials: [
        'Mobile devices for testing',
        'External USB drive for backups'
      ]
    }
  ],
  assessment: {
    formative: [
      'Exit tickets after each lesson',
      'Diagram checks: can students draw data flow?',
      'Configuration file annotations: explain what each setting does'
    ],
    summative: 'Working Nextcloud installation that students can demonstrate: upload file from phone, access from computer, explain the path data takes'
  },
  extensions: [
    'Set up Nextcloud Talk for video calls',
    'Install collaborative document editing (Collabora or OnlyOffice)',
    'Configure external access through router port forwarding',
    'Set up two-factor authentication'
  ],
  realWorldConnections: [
    'Disroot.org - volunteer-run privacy-focused services',
    'Schools and organizations running their own Nextcloud instances',
    'The European Union\'s push for digital sovereignty'
  ]
};
```

**Step 2: Render Project 1 in the page**

Replace the placeholder div with:

```tsx
<ProjectSection project={project1} defaultExpanded={true} />
```

**Step 3: Verify locally**

Run: `npm run dev`
Expected: Project 1 renders with all lessons expandable

**Step 4: Commit**

```bash
git add app/[locale]/tech-sovereignty/self-hosted/page.tsx
git commit -m "feat(self-hosted): add Project 1 - Personal Cloud Storage with Nextcloud"
```

---

### Task 10: Build Project 2 - Private Communication with Matrix

**Files:**
- Modify: `app/[locale]/tech-sovereignty/self-hosted/page.tsx`

**Step 1: Add Project 2 data**

```tsx
const project2: Project = {
  id: 'private-communication',
  title: 'Project 2: Private Communication with Matrix',
  description: 'Deploy your own encrypted chat server using Matrix and Element',
  difficulty: 'Intermediate',
  duration: '3-4 weeks',
  gradeBand: '9-12',
  overview: `Students set up a Matrix homeserver for private, encrypted communication.
    They'll learn about end-to-end encryption, federation, and how modern chat systems work.`,
  learningObjectives: [
    'Understand end-to-end encryption and key exchange',
    'Configure a Matrix homeserver (Synapse or Dendrite)',
    'Set up federation with other Matrix servers',
    'Compare centralized vs federated communication systems'
  ],
  prerequisites: [
    'Completed Project 1 (server basics)',
    'Understanding of client-server architecture',
    'Basic Linux command line skills'
  ],
  materials: {
    required: [
      'Server from Project 1 (or new Raspberry Pi)',
      'Domain name',
      'SSL certificate'
    ],
    optional: [
      'TURN server for voice/video calls',
      'Additional storage for media files'
    ]
  },
  lessons: [
    {
      title: 'Lesson 1: How Does Chat Actually Work?',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Trace message flow in centralized systems (iMessage, WhatsApp)',
        'Understand federation: how email-style systems work',
        'Explain end-to-end encryption at a conceptual level'
      ],
      conceptualUnderstanding: [
        'Centralized: your messages go through one company\'s servers',
        'Federated: your server talks to other servers (like email)',
        'E2EE: even the server can\'t read your messages'
      ],
      activities: [
        'Diagram message flow for SMS, WhatsApp, and email',
        'Encryption demonstration with physical envelopes',
        'Research Matrix protocol basics'
      ],
      materials: ['Envelopes and locks for encryption demo']
    },
    {
      title: 'Lesson 2: Installing Matrix Synapse',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Install Synapse homeserver using Docker',
        'Configure PostgreSQL database',
        'Set up reverse proxy with Nginx'
      ],
      conceptualUnderstanding: [
        'Docker: running software in isolated containers',
        'Why Matrix uses PostgreSQL instead of SQLite',
        'Reverse proxy: one public entry point for multiple services'
      ],
      activities: [
        'Install Docker and Docker Compose',
        'Deploy Synapse with compose file',
        'Configure Nginx reverse proxy'
      ],
      materials: ['Docker Compose file for Synapse']
    },
    {
      title: 'Lesson 3: Federation and Identity',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Configure DNS for Matrix federation',
        'Set up .well-known endpoints',
        'Test federation with matrix.org'
      ],
      conceptualUnderstanding: [
        'SRV records: how servers find each other',
        'Matrix IDs: @user:server.com format',
        'Federation delegation: running server on a subdomain'
      ],
      activities: [
        'Configure DNS records for federation',
        'Test federation using Element web',
        'Join a public Matrix room from your server'
      ],
      materials: ['DNS management access']
    },
    {
      title: 'Lesson 4: Security and Privacy',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Enable and verify end-to-end encryption',
        'Set up device verification',
        'Configure message retention policies'
      ],
      conceptualUnderstanding: [
        'Cross-signing: verifying devices belong to users',
        'Key backup: recovering encrypted history',
        'Metadata: what\'s encrypted vs what\'s visible'
      ],
      activities: [
        'Enable encryption in a room',
        'Practice device verification process',
        'Test that server admin cannot read encrypted messages'
      ],
      materials: ['Multiple devices for verification testing']
    }
  ],
  assessment: {
    formative: [
      'Can students explain the difference between centralized and federated?',
      'Configuration file review: explain each setting',
      'Diagram check: show message flow with encryption'
    ],
    summative: 'Working Matrix server that can: create encrypted rooms, federate with matrix.org, demonstrate that admin cannot read E2EE messages'
  },
  extensions: [
    'Set up TURN server for voice/video calls',
    'Install Matrix bridges (IRC, Slack, Discord)',
    'Configure SSO with your Nextcloud from Project 1',
    'Set up Element web client on your domain'
  ],
  realWorldConnections: [
    'German government\'s Matrix deployment for healthcare',
    'French government\'s Tchap (Matrix-based) messaging',
    'Mozilla moving to Matrix for community chat'
  ]
};
```

**Step 2: Add to rendered projects**

**Step 3: Commit**

```bash
git add app/[locale]/tech-sovereignty/self-hosted/page.tsx
git commit -m "feat(self-hosted): add Project 2 - Private Communication with Matrix"
```

---

### Task 11: Build Project 3 - Personal Website with Static Site Generator

**Files:**
- Modify: `app/[locale]/tech-sovereignty/self-hosted/page.tsx`

**Overview:** Students learn to create and host their own website using Hugo/Jekyll, understanding static vs dynamic sites, CDNs, and web hosting.

*Follow same structure as Tasks 9-10*

---

### Task 12: Build Project 4 - Home Automation Dashboard

**Files:**
- Modify: `app/[locale]/tech-sovereignty/self-hosted/page.tsx`

**Overview:** Students deploy Home Assistant, learning about IoT, local-first automation, and privacy implications of smart home devices.

*Follow same structure as Tasks 9-10*

---

### Task 13: Update Main Page Links and Deploy

**Files:**
- Modify: `app/[locale]/tech-sovereignty/page.tsx`

**Step 1: Update selfHostedProjects to show as available**

Change all status values from 'coming-soon' to 'available' and add links:

```tsx
const selfHostedProjects: Project[] = [
  { ..., status: 'available', link: `/${locale}/tech-sovereignty/self-hosted?project=1` },
  // etc
];
```

**Step 2: Add trackLink and trackAvailable to Self-Hosted TrackSection**

```tsx
<TrackSection
  // ...existing props
  trackLink={`/${locale}/tech-sovereignty/self-hosted`}
  trackAvailable={true}
/>
```

**Step 3: Build and deploy**

```bash
npm run build
vercel --prod
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat(tech-sovereignty): complete Self-Hosted Services track curriculum"
```

---

## Verification Checklist

- [ ] Sticky TOC visible on desktop, hidden on mobile
- [ ] Track colors consistent (primary, secret, warm)
- [ ] Tool grids all 3 columns on desktop
- [ ] Coming soon tracks visually dimmed
- [ ] Mobile spacing improved
- [ ] Self-hosted page loads at /tech-sovereignty/self-hosted
- [ ] All 4 projects have full lesson plans
- [ ] UDL sections expand/collapse correctly
- [ ] Navigation between tracks works
- [ ] Site builds without errors
- [ ] Deployed to production
