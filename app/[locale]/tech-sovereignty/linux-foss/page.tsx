'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-zinc-800 border border-green-500/30 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Core Pedagogical Principle: Freedom Through Understanding</h3>
        <p className="text-zinc-300 mb-3">
          Linux and open source aren&apos;t just alternatives—they&apos;re a philosophy of <strong className="text-white">transparency</strong>,
          <strong className="text-white"> collaboration</strong>, and <strong className="text-white">user empowerment</strong>. Students learn not just how to use these tools,
          but why they matter for digital autonomy.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-green-300 mb-1">Understand the System</h4>
            <p className="text-sm text-zinc-500">With open source, you can see exactly how software works. No black boxes, no hidden behavior.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-green-300 mb-1">Modify and Adapt</h4>
            <p className="text-sm text-zinc-500">When something doesn&apos;t work for you, you have the freedom to change it or find someone who can.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-green-300 mb-1">Share and Collaborate</h4>
            <p className="text-sm text-zinc-500">The open source community thrives on sharing knowledge. Contributions help everyone.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// UDL Framework Types
interface UDLEngagement {
  choiceAndAutonomy: string[];
  relevanceAndAuthenticity: string[];
  selfRegulation: string[];
}

interface UDLRepresentation {
  multipleFormats: string[];
  vocabularySupport: string[];
  backgroundKnowledge: string[];
}

interface UDLActionExpression {
  physicalOptions: string[];
  expressionOptions: string[];
  executiveFunctionSupport: string[];
}

interface UDLFramework {
  engagement: UDLEngagement;
  representation: UDLRepresentation;
  actionExpression: UDLActionExpression;
}

// Activity Types
interface ActivityStep {
  instruction: string;
  teacherNotes?: string;
  duration?: string;
}

interface VideoResource {
  title: string;
  url: string;
  duration: string;
  description: string;
}

interface DetailedActivity {
  title: string;
  duration: string;
  overview: string;
  videoResources?: VideoResource[];
  steps: ActivityStep[];
  formativeAssessment?: string;
  differentiation?: {
    support: string;
    extension: string;
  };
}

type GradeBand = '6-8' | '9-12' | '6-12';

interface Lesson {
  title: string;
  duration: string;
  gradeBand: GradeBand;
  objectives: string[];
  conceptualUnderstanding: string[];
  activities: string[];
  detailedActivities?: DetailedActivity[];
  materials: string[];
  udl?: UDLFramework;
}

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  gradeBand: GradeBand;
  overview: string;
  learningObjectives: string[];
  prerequisites: string[];
  materials: {
    required: string[];
    optional: string[];
  };
  lessons: Lesson[];
  assessment: {
    formative: string[];
    summative: string;
  };
  extensions: string[];
  realWorldConnections: string[];
}

// UDL Section Component
const UDLSection = ({ udl }: { udl: UDLFramework }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-zinc-950 border border-green-500/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-green-300">Universal Design for Learning (UDL) Supports</span>
        </div>
        <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="p-4 border-t border-zinc-700 grid md:grid-cols-3 gap-4">
          <div>
            <h5 className="font-medium text-green-300 mb-2">Engagement</h5>
            <div className="space-y-2 text-sm text-zinc-400">
              <div>
                <span className="text-zinc-500">Choice & Autonomy:</span>
                <ul className="list-disc list-inside ml-2">
                  {udl.engagement.choiceAndAutonomy.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-green-300 mb-2">Representation</h5>
            <div className="space-y-2 text-sm text-zinc-400">
              <div>
                <span className="text-zinc-500">Multiple Formats:</span>
                <ul className="list-disc list-inside ml-2">
                  {udl.representation.multipleFormats.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <h5 className="font-medium text-green-300 mb-2">Action & Expression</h5>
            <div className="space-y-2 text-sm text-zinc-400">
              <div>
                <span className="text-zinc-500">Expression Options:</span>
                <ul className="list-disc list-inside ml-2">
                  {udl.actionExpression.expressionOptions.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Detailed Activity Card Component
const DetailedActivityCard = ({ activity, index }: { activity: DetailedActivity; index: number }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-zinc-950 border border-zinc-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 text-xs font-bold">
            {index + 1}
          </div>
          <div>
            <h6 className="text-sm font-medium text-white">{activity.title}</h6>
            <span className="text-xs text-zinc-500">{activity.duration}</span>
          </div>
        </div>
        <svg className={`w-4 h-4 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="p-3 border-t border-zinc-700 space-y-3">
          <p className="text-xs text-zinc-400 italic">{activity.overview}</p>

          {/* Video Resources */}
          {activity.videoResources && activity.videoResources.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-red-300 mb-2 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 7l-7 5 7 5V7z M14 5H2c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z" />
                </svg>
                Video Resources
              </h6>
              <div className="space-y-2">
                {activity.videoResources.map((video, i) => (
                  <a key={i} href={video.url} target="_blank" rel="noopener noreferrer" className="block bg-zinc-900 rounded p-2 hover:bg-zinc-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-red-300 font-medium">{video.title}</span>
                      <span className="text-xs text-zinc-500">{video.duration}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{video.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Steps */}
          <div className="space-y-2">
            <h6 className="text-xs font-semibold text-green-300">Step-by-Step Instructions</h6>
            {activity.steps.map((step, i) => (
              <div key={i} className="bg-zinc-900 rounded p-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs text-green-400 font-bold">{i + 1}.</span>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-300">{step.instruction}</p>
                    {step.duration && <span className="text-xs text-zinc-500">({step.duration})</span>}
                    {step.teacherNotes && (
                      <p className="text-xs text-amber-400 mt-1 italic">💡 {step.teacherNotes}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Formative Assessment */}
          {activity.formativeAssessment && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-green-300 mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check for Understanding
              </h6>
              <p className="text-xs text-green-300">{activity.formativeAssessment}</p>
            </div>
          )}

          {/* Differentiation */}
          {activity.differentiation && (
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-orange-300 mb-1">Support (Struggling Learners)</h6>
                <p className="text-xs text-orange-300">{activity.differentiation.support}</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-purple-300 mb-1">Extension (Advanced Learners)</h6>
                <p className="text-xs text-purple-300">{activity.differentiation.extension}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Lesson Card Component
const LessonCard = ({ lesson, index }: { lesson: Lesson; index: number }) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-700 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 font-bold text-sm">
            {index + 1}
          </div>
          <div>
            <h4 className="font-semibold text-white">{lesson.title}</h4>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span>{lesson.duration}</span>
              <span className="text-xs px-2 py-0.5 bg-zinc-700 rounded">Grades {lesson.gradeBand}</span>
            </div>
          </div>
        </div>
        <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="p-4 border-t border-zinc-700 space-y-4">
          <div>
            <h5 className="font-medium text-green-300 mb-2">Learning Objectives</h5>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-green-300 mb-2">Conceptual Understanding</h5>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {lesson.conceptualUnderstanding.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          {/* Detailed Activities (if available) */}
          {lesson.detailedActivities && lesson.detailedActivities.length > 0 ? (
            <div>
              <h5 className="font-medium text-green-300 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Detailed Activities
              </h5>
              <div className="space-y-3">
                {lesson.detailedActivities.map((activity, i) => (
                  <DetailedActivityCard key={i} activity={activity} index={i} />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h5 className="font-medium text-green-300 mb-2">Activities</h5>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                {lesson.activities.map((activity, i) => <li key={i}>{activity}</li>)}
              </ul>
            </div>
          )}
          <div>
            <h5 className="font-medium text-green-300 mb-2">Materials</h5>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {lesson.materials.map((material, i) => <li key={i}>{material}</li>)}
            </ul>
          </div>
          {lesson.udl && <UDLSection udl={lesson.udl} />}
        </div>
      )}
    </div>
  );
};

// Project Section Component
const ProjectSection = ({ project, isExpanded, onToggle }: { project: Project; isExpanded: boolean; onToggle: () => void }) => {
  return (
    <div id={project.id} className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden scroll-mt-24">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between text-left hover:bg-zinc-700 transition-colors"
      >
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white">{project.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' :
              project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {project.difficulty}
            </span>
          </div>
          <p className="text-zinc-400 text-sm">{project.description}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-zinc-500">
            <span>{project.duration}</span>
            <span>Grades {project.gradeBand}</span>
            <span>{project.lessons.length} lessons</span>
          </div>
        </div>
        <svg className={`w-6 h-6 text-zinc-500 transition-transform ml-4 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="p-6 border-t border-zinc-700 space-y-6">
          {/* Overview */}
          <div className="bg-zinc-950 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-2">Project Overview</h4>
            <p className="text-zinc-400 text-sm">{project.overview}</p>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="font-semibold text-white mb-3">Learning Objectives</h4>
            <ul className="grid md:grid-cols-2 gap-2">
              {project.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          {project.prerequisites.length > 0 && (
            <div>
              <h4 className="font-semibold text-white mb-3">Prerequisites</h4>
              <ul className="flex flex-wrap gap-2">
                {project.prerequisites.map((prereq, i) => (
                  <li key={i} className="text-xs px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full">{prereq}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Materials */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-zinc-950 rounded-lg p-4">
              <h5 className="font-medium text-green-300 mb-2">Required Materials</h5>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                {project.materials.required.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
            <div className="bg-zinc-950 rounded-lg p-4">
              <h5 className="font-medium text-green-300 mb-2">Optional Materials</h5>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                {project.materials.optional.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
          </div>

          {/* Lessons */}
          <div>
            <h4 className="font-semibold text-white mb-3">Lessons</h4>
            <div className="space-y-3">
              {project.lessons.map((lesson, i) => (
                <LessonCard key={i} lesson={lesson} index={i} />
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-zinc-950 rounded-lg p-4">
            <h4 className="font-semibold text-white mb-3">Assessment</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-green-300 mb-2">Formative Assessment</h5>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  {project.assessment.formative.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-green-300 mb-2">Summative Assessment</h5>
                <p className="text-sm text-zinc-400">{project.assessment.summative}</p>
              </div>
            </div>
          </div>

          {/* Real World Connections */}
          <div>
            <h4 className="font-semibold text-white mb-3">Real-World Connections</h4>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {project.realWorldConnections.map((conn, i) => <li key={i}>{conn}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Project Data
const project1: Project = {
  id: 'project-1',
  title: 'Project 1: Linux Desktop Environment',
  description: 'Set up and customize a Linux desktop environment. Learn the foundations of open-source operating systems.',
  difficulty: 'Beginner',
  duration: '3-4 weeks',
  gradeBand: '6-12',
  overview: 'Students will install and configure a Linux distribution, learning about desktop environments, file management, and software installation. This project emphasizes understanding the user-facing aspects of Linux while building confidence for deeper exploration.',
  learningObjectives: [
    'Understand what Linux is and how it differs from proprietary operating systems',
    'Successfully install Linux in a virtual machine or dual-boot configuration',
    'Navigate the desktop environment and file system',
    'Install and manage software using package managers',
    'Customize the desktop environment to personal preferences',
    'Understand the philosophy behind free and open-source software'
  ],
  prerequisites: [
    'Basic computer literacy',
    'Familiarity with file/folder concepts'
  ],
  materials: {
    required: [
      'Computer with virtualization support (or dedicated machine)',
      'USB drive (8GB+) for installation media',
      'Internet connection for downloads',
      'Linux distribution ISO (Ubuntu, Linux Mint, or Fedora recommended)'
    ],
    optional: [
      'Secondary monitor',
      'External hard drive for backups',
      'Raspberry Pi for dedicated experimentation'
    ]
  },
  lessons: [
    {
      title: 'What is Linux? Understanding Open Source',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Define what an operating system does',
        'Explain the difference between proprietary and open-source software',
        'Describe the history and philosophy of Linux',
        'Identify major Linux distributions and their purposes'
      ],
      conceptualUnderstanding: [
        'Operating systems are the foundation that all other software runs on',
        'Open source means anyone can view, modify, and distribute the code',
        'Linux powers most of the internet, Android phones, and supercomputers',
        'Different distributions serve different needs (servers, desktops, education)'
      ],
      activities: [
        'Discussion: What operating systems do students currently use?',
        'Timeline activity: Key moments in Linux and open source history',
        'Exploration: Visit distrowatch.com and compare distributions',
        'Reflection: Why might someone choose open source over proprietary software?'
      ],
      detailedActivities: [
        {
          title: 'Opening Discussion: What Operating Systems Do You Use?',
          duration: '10 minutes',
          overview: 'Activate prior knowledge by discussing what operating systems students currently use and what they think an OS does.',
          steps: [
            {
              instruction: 'Ask students to put away devices and sit facing the board.',
              duration: '1 min',
            },
            {
              instruction: 'Pose the question: "What operating system does your phone use? What about your computer at home?"',
              teacherNotes: 'Most students will say iOS, Android, Windows, or Mac. Write these on the board.',
            },
            {
              instruction: 'Follow up: "What do you think the operating system actually does? Why do we need one?"',
              duration: '3 min',
              teacherNotes: 'Guide toward understanding: OS manages hardware, runs programs, provides interface.',
            },
            {
              instruction: 'Reveal surprise: "Android is actually built on Linux! So is Chrome OS, most of the internet servers, and even some cars."',
            },
            {
              instruction: 'Create a "What We Want to Know" poster where students can add questions throughout the lesson.',
              teacherNotes: 'This surfaces curiosity and gives students agency in their learning.',
            },
          ],
          formativeAssessment: 'Listen for misconceptions about what an OS does. Note which students have heard of Linux before.',
          differentiation: {
            support: 'Provide sentence starters: "I think the operating system..." or "My phone uses..."',
            extension: 'Ask students who know Linux to share what they know without dominating the discussion.',
          },
        },
        {
          title: 'Timeline Activity: Key Moments in Open Source History',
          duration: '15 minutes',
          overview: 'Students create a collaborative timeline of important events in Linux and open source history, making the abstract concept of "open source" concrete through storytelling.',
          videoResources: [
            { title: 'Revolution OS (Documentary Clip)', url: 'https://www.youtube.com/watch?v=4ZHloJVhcRY', duration: '5 min', description: 'Classic documentary about Linux and open source movement' },
            { title: 'The Story of Linux', url: 'https://www.youtube.com/watch?v=o8NPllzkFhE', duration: '3 min', description: 'Short animated history of Linux' },
          ],
          steps: [
            {
              instruction: 'Distribute timeline cards to groups - each card has a key event (1983: GNU Project, 1991: Linux announcement, 1998: Open Source term coined, etc.).',
              duration: '2 min',
            },
            {
              instruction: 'Give groups 3 minutes to read their card and discuss: "Why was this event important?"',
              duration: '3 min',
            },
            {
              instruction: 'Have groups place their events on a large classroom timeline in chronological order.',
              duration: '3 min',
              teacherNotes: 'Physical movement helps kinesthetic learners. Consider having students stand by their event.',
            },
            {
              instruction: 'Walk through the timeline as a class, with each group briefly explaining their event.',
              duration: '5 min',
            },
            {
              instruction: 'Highlight key people: Linus Torvalds, Richard Stallman. Show their photos and brief bios.',
              duration: '2 min',
              teacherNotes: 'Humanizing the story helps students remember and connect emotionally.',
            },
          ],
          formativeAssessment: 'Can students explain why one event led to another? Do they understand the difference between "free" (freedom) and "free" (price)?',
          differentiation: {
            support: 'Provide a completed timeline template that students can reference. Pair struggling readers with stronger ones.',
            extension: 'Challenge students to research and add one more event to the timeline.',
          },
        },
        {
          title: 'Distribution Exploration: DistroWatch Research',
          duration: '15 minutes',
          overview: 'Students explore the diversity of Linux distributions, discovering that there are hundreds of variations for different purposes.',
          steps: [
            {
              instruction: 'Display DistroWatch.com on the projector. Explain that this site tracks hundreds of different Linux distributions.',
              duration: '2 min',
            },
            {
              instruction: 'Demonstrate how to navigate the site: popularity rankings, distribution pages, screenshots.',
            },
            {
              instruction: 'Assign each student or pair to research one distribution using a provided worksheet: Name, Purpose, Target Audience, Special Features, Screenshot.',
              duration: '8 min',
              teacherNotes: 'Suggested distributions: Ubuntu, Linux Mint, Fedora, Elementary OS, Kali Linux, Raspberry Pi OS.',
            },
            {
              instruction: 'Quick share: Each group has 30 seconds to tell the class about their distribution.',
              duration: '4 min',
            },
            {
              instruction: 'Close discussion: "Why do you think there are so many different versions of Linux instead of just one?"',
              teacherNotes: 'Guide toward understanding that open source allows customization for different needs.',
            },
          ],
          formativeAssessment: 'Check worksheets for accurate information. Can students explain why different distributions exist?',
          differentiation: {
            support: 'Provide a partially completed worksheet with key information already filled in.',
            extension: 'Have students compare two distributions and create a Venn diagram of similarities and differences.',
          },
        },
        {
          title: 'Reflection: Why Open Source Matters',
          duration: '10 minutes',
          overview: 'Students reflect on the philosophical and practical reasons for choosing open source software, connecting to broader themes of technology sovereignty.',
          steps: [
            {
              instruction: 'Present the "Four Freedoms" of free software: Run, Study, Distribute, Modify. Display on board with simple icons.',
              duration: '2 min',
            },
            {
              instruction: 'Think-Pair-Share: "Which of these freedoms do you think is most important? Why?"',
              duration: '4 min',
            },
            {
              instruction: 'Whole class discussion: "What might be some reasons a person or organization would choose open source over proprietary software?"',
              duration: '3 min',
              teacherNotes: 'Guide toward: privacy, cost, customization, learning, community, avoiding vendor lock-in.',
            },
            {
              instruction: 'Exit ticket: "Write one thing you learned today and one question you still have."',
              duration: '1 min',
            },
          ],
          formativeAssessment: 'Review exit tickets to identify gaps in understanding and questions for next lesson.',
          differentiation: {
            support: 'Provide a reflection template with prompts: "Open source is important because..." "I still want to know..."',
            extension: 'Ask students to research one open source project they use daily and explain how it benefits from being open.',
          },
        },
      ],
      materials: [
        'Projector or shared screen',
        'Distrowatch.com access',
        'Timeline handout'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: [
            'Students choose which distribution to research',
            'Option to work individually or in pairs for exploration',
            'Choice of reflection format (written, verbal, visual)',
          ],
          relevanceAndAuthenticity: [
            'Connect to devices they use daily (Android = Linux)',
            'Discuss open source software students already use (Firefox, VLC, etc.)',
            'Relate to community control and technology sovereignty themes',
          ],
          selfRegulation: [
            'Checkpoint questions throughout lesson',
            '"What We Want to Know" poster for ongoing questions',
            'Exit ticket self-assessment',
          ],
        },
        representation: {
          multipleFormats: [
            'Video introduction to history',
            'Physical timeline activity',
            'Interactive website exploration',
            'Written reflection',
          ],
          vocabularySupport: [
            'Glossary of key terms: kernel, distribution, open source, proprietary',
            'Visual icons for the Four Freedoms',
            'Word wall updated throughout lesson',
          ],
          backgroundKnowledge: [
            'Review of what operating systems do',
            'Connect to familiar devices (phones, computers)',
            'Brief pre-assessment of Linux familiarity',
          ],
        },
        actionExpression: {
          physicalOptions: [
            'Physical timeline placement activity',
            'Verbal discussion participation',
            'Written or digital worksheet completion',
          ],
          expressionOptions: [
            'Create poster summarizing lesson',
            'Write reflection paragraph',
            'Record short video explanation',
            'Draw visual representation of open source concept',
          ],
          executiveFunctionSupport: [
            'Lesson outline provided at start',
            'Clear objectives stated',
            'Visual timer for activities',
            'Checklist of tasks for exploration activity',
          ],
        },
      },
    },
    {
      title: 'Installing Linux: Virtual Machine Setup',
      duration: '60-90 minutes',
      gradeBand: '6-12',
      objectives: [
        'Explain what a virtual machine is and its benefits',
        'Download and install VirtualBox or similar software',
        'Create a virtual machine with appropriate settings',
        'Install a Linux distribution step by step'
      ],
      conceptualUnderstanding: [
        'Virtual machines let you run one OS inside another safely',
        'Installation involves partitioning, formatting, and configuring',
        'The installer guides you through choices about language, timezone, and users',
        'Virtual machines are perfect for learning without risk'
      ],
      activities: [
        'Demo: Teacher walks through VM creation',
        'Hands-on: Students create their own virtual machine',
        'Installation: Follow the Linux installer together',
        'Troubleshooting: Common issues and how to resolve them'
      ],
      detailedActivities: [
        {
          title: 'Introduction: What is a Virtual Machine?',
          duration: '10 minutes',
          overview: 'Students learn what virtualization is and why it is the safest way to experiment with new operating systems.',
          videoResources: [
            { title: 'What is a Virtual Machine?', url: 'https://www.youtube.com/watch?v=yIVXjl4SwVo', duration: '6 min', description: 'Clear explanation of VMs with animations' },
            { title: 'VirtualBox Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=sB_5fqiysi4', duration: '10 min', description: 'Step-by-step VirtualBox installation guide' },
          ],
          steps: [
            {
              instruction: 'Ask: "What would happen if we installed a new operating system directly on this computer? What risks might there be?"',
              duration: '2 min',
              teacherNotes: 'Students should identify risks: data loss, breaking the current system, taking a long time.',
            },
            {
              instruction: 'Introduce virtual machines: "A VM is like a computer inside your computer. It has its own CPU, memory, and hard drive - but they are all simulated."',
            },
            {
              instruction: 'Draw a simple diagram on the board showing: Hardware → Host OS → VirtualBox → Guest OS (Linux).',
              duration: '2 min',
            },
            {
              instruction: 'Explain the benefits: Safe to experiment, easy to start over, can run multiple operating systems.',
            },
            {
              instruction: 'Show a brief video explaining virtualization (see video resources above).',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Can students explain in their own words what a virtual machine is and why we are using one?',
          differentiation: {
            support: 'Provide a diagram handout that students can annotate during explanation.',
            extension: 'Ask students to research other uses of virtualization (cloud computing, server consolidation).',
          },
        },
        {
          title: 'Demo: Creating a Virtual Machine',
          duration: '15 minutes',
          overview: 'Teacher demonstrates the complete process of creating a VM in VirtualBox, explaining each step and common pitfalls.',
          steps: [
            {
              instruction: 'Open VirtualBox on the teacher computer projected for all to see.',
              duration: '1 min',
            },
            {
              instruction: 'Click "New" to create a new VM. Explain: "First we name our VM and choose what type of OS we will install."',
            },
            {
              instruction: 'Set memory: "I am giving this VM 4GB of RAM. Your computer has to share its memory with the VM."',
              teacherNotes: 'Adjust memory based on available RAM. 2GB minimum, 4GB recommended for smooth experience.',
            },
            {
              instruction: 'Create virtual hard disk: "This is like giving our VM its own hard drive. 25GB is enough for learning."',
              duration: '2 min',
            },
            {
              instruction: 'Configure settings: Display, Network (bridged or NAT), and most importantly - mount the Linux ISO.',
              duration: '3 min',
              teacherNotes: 'Emphasize where the ISO goes - this is a common mistake. Show the "Storage" settings.',
            },
            {
              instruction: 'Start the VM and show that it boots from the ISO into the Linux installer.',
              duration: '2 min',
            },
            {
              instruction: 'Pause and answer questions before students begin their own installations.',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Have students verbally walk through the steps they just observed before starting their own.',
          differentiation: {
            support: 'Provide a printed step-by-step guide with screenshots for each step.',
            extension: 'Allow advanced students to help others as "VM support technicians."',
          },
        },
        {
          title: 'Hands-On: Create Your Own Virtual Machine',
          duration: '20 minutes',
          overview: 'Students create their own virtual machine following the demonstrated steps, with teacher support for troubleshooting.',
          steps: [
            {
              instruction: 'Distribute the installation checklist and ensure students have the Linux ISO file accessible.',
              duration: '2 min',
            },
            {
              instruction: 'Students open VirtualBox and click "New" to begin creating their VM.',
            },
            {
              instruction: 'Circulate the room to help with common issues: not enough memory, forgot to mount ISO, wrong OS type selected.',
              duration: '12 min',
              teacherNotes: 'Most common issue is forgetting to mount the ISO. Second is not allocating enough memory.',
            },
            {
              instruction: 'Checkpoint: All students should have a VM created and ready to boot (not yet installed).',
              duration: '3 min',
            },
            {
              instruction: 'Quick troubleshooting session: "Who ran into a problem? Let us solve it together."',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Every student should have a VM created with the correct settings. Visual check of screens.',
          differentiation: {
            support: 'Pair struggling students with successful ones. Have a few pre-configured VMs ready as backup.',
            extension: 'Challenge students to configure additional VM settings like shared folders or clipboard.',
          },
        },
        {
          title: 'Guided Installation: Installing Linux',
          duration: '30 minutes',
          overview: 'Students install Linux in their VMs together as a class, with the teacher guiding through each installer screen.',
          steps: [
            {
              instruction: 'Everyone starts their VM together. Wait for the Linux installer to appear.',
              duration: '3 min',
              teacherNotes: 'Make sure everyone is at the same screen before proceeding. "Raise your hand when you see the installer."',
            },
            {
              instruction: 'Walk through language selection, keyboard layout, and "Install Linux" option together.',
              duration: '3 min',
            },
            {
              instruction: 'Explain partitioning: "Erase disk and install - this is safe because it is only the virtual hard disk, not your real one!"',
              teacherNotes: 'This is a key learning moment. Emphasize that the VM provides safety.',
            },
            {
              instruction: 'Set timezone, create username and password. Discuss password security briefly.',
              duration: '3 min',
            },
            {
              instruction: 'Begin installation. While waiting (10-15 min), show slideshow of Linux features or discuss questions.',
              duration: '15 min',
              teacherNotes: 'This is a good time for an open Q&A or to show Linux features.',
            },
            {
              instruction: 'When installation completes, restart the VM together and celebrate first boot into Linux!',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Every student should have a working Linux installation that boots to the desktop.',
          differentiation: {
            support: 'Provide video recording of installation process that students can pause and rewatch.',
            extension: 'Ask students to note differences between Linux installer and Windows/Mac installer process.',
          },
        },
      ],
      materials: [
        'VirtualBox or VMware (free)',
        'Linux ISO file',
        '20GB+ free disk space per student machine'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: [
            'Choice of Linux distribution to install',
            'Option to customize VM name and settings',
            'Students can help peers as "support technicians"',
          ],
          relevanceAndAuthenticity: [
            'Building real skills used in IT careers',
            'VMs are used in professional software development',
            'Learning to experiment safely with technology',
          ],
          selfRegulation: [
            'Checklist for installation steps',
            'Checkpoint questions at key stages',
            'Self-assessment: "Rate your confidence 1-5"',
          ],
        },
        representation: {
          multipleFormats: [
            'Live demonstration by teacher',
            'Written step-by-step guide with screenshots',
            'Video tutorial backup for self-paced review',
          ],
          vocabularySupport: [
            'Terms defined: VM, ISO, partition, bootloader, host, guest',
            'Visual glossary with icons',
            'Diagram of VM architecture',
          ],
          backgroundKnowledge: [
            'Review of computer hardware concepts',
            'Brief explanation of how operating systems boot',
            'Connection to previous lesson on Linux distributions',
          ],
        },
        actionExpression: {
          physicalOptions: [
            'Individual installation on own computer',
            'Pair programming option',
            'Teacher-led for those who prefer',
          ],
          expressionOptions: [
            'Screenshot documentation of process',
            'Written notes and reflections',
            'Peer teaching by helping others',
          ],
          executiveFunctionSupport: [
            'Step-by-step checklist',
            'Clear stopping points with class sync',
            'Visual timer for each activity segment',
          ],
        },
      },
    },
    {
      title: 'Exploring the Desktop Environment',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Navigate the Linux desktop environment',
        'Use the file manager to organize files',
        'Understand the home directory structure',
        'Customize basic desktop settings'
      ],
      conceptualUnderstanding: [
        'Desktop environments are separate from the core OS (you can choose different ones)',
        'Linux uses a hierarchical file system starting at root (/)',
        'User files live in /home/username with standard folders',
        'Settings and customization give users control over their experience'
      ],
      activities: [
        'Guided tour: Navigate desktop, panels, and menus',
        'File management: Create folders, move files, understand permissions',
        'Scavenger hunt: Find specific system information',
        'Customization: Change wallpaper, themes, and panel layout'
      ],
      detailedActivities: [
        {
          title: 'Guided Tour: The Linux Desktop',
          duration: '12 minutes',
          overview: 'Students explore the main components of the Linux desktop environment, learning terminology and navigation.',
          videoResources: [
            { title: 'Ubuntu Desktop Tour', url: 'https://www.youtube.com/watch?v=lmeDvSgN6zY', duration: '5 min', description: 'Overview of GNOME desktop environment' },
            { title: 'Linux Mint Desktop Guide', url: 'https://www.youtube.com/watch?v=eQgyJnLPvPI', duration: '7 min', description: 'Tour of Cinnamon desktop for beginners' },
          ],
          steps: [
            {
              instruction: 'Have students boot their Linux VM and log in. Everyone should have the desktop visible.',
              duration: '2 min',
            },
            {
              instruction: 'Point out key areas: panel/taskbar, application menu, system tray, desktop icons (if present), dock.',
              teacherNotes: 'Different distributions have different layouts. Focus on common elements.',
            },
            {
              instruction: 'Demonstrate: Open the application menu and show categories of applications.',
              duration: '2 min',
            },
            {
              instruction: 'Open the file manager and explain: "This is like Windows Explorer or Mac Finder - it shows your files."',
            },
            {
              instruction: 'Navigate to Home folder. Explain the folder structure: Documents, Downloads, Pictures, etc.',
              duration: '2 min',
            },
            {
              instruction: 'Quick poll: "What looks familiar? What looks different from Windows or Mac?"',
              duration: '2 min',
            },
          ],
          formativeAssessment: 'Can students identify the application menu, file manager, and system tray?',
          differentiation: {
            support: 'Provide a labeled screenshot that students can reference while exploring.',
            extension: 'Ask students to find and open three applications not demonstrated by the teacher.',
          },
        },
        {
          title: 'File Management Practice',
          duration: '15 minutes',
          overview: 'Students practice creating, moving, and organizing files and folders, building muscle memory for common operations.',
          steps: [
            {
              instruction: 'Challenge 1: Create a new folder called "MyProject" in your Documents folder.',
              duration: '2 min',
              teacherNotes: 'Show right-click context menu method and keyboard shortcut (Ctrl+Shift+N).',
            },
            {
              instruction: 'Challenge 2: Inside MyProject, create three subfolders: "Images", "Notes", "Code".',
              duration: '2 min',
            },
            {
              instruction: 'Challenge 3: Download a file from the internet (teacher provides safe link) and move it to the appropriate folder.',
              duration: '3 min',
            },
            {
              instruction: 'Demonstrate drag-and-drop moving vs. cut-paste (Ctrl+X, Ctrl+V).',
            },
            {
              instruction: 'Challenge 4: Rename one of your folders to something more specific.',
              duration: '2 min',
            },
            {
              instruction: 'Introduce the address bar: type /home to see all user folders. Explain absolute paths.',
              duration: '2 min',
            },
            {
              instruction: 'Show hidden files with Ctrl+H. Explain that files starting with . are hidden by default.',
              teacherNotes: 'This is a key Linux concept that differs from Windows.',
            },
          ],
          formativeAssessment: 'Walk around and verify folder structure. Students should have MyProject with three subfolders.',
          differentiation: {
            support: 'Provide step-by-step written instructions for each challenge.',
            extension: 'Have students create a more complex folder structure for an imaginary school project.',
          },
        },
        {
          title: 'Scavenger Hunt: Explore Your System',
          duration: '15 minutes',
          overview: 'Students complete a scavenger hunt to find information about their Linux system, encouraging self-directed exploration.',
          steps: [
            {
              instruction: 'Distribute scavenger hunt worksheet with 10 questions about their system.',
              duration: '1 min',
            },
            {
              instruction: 'Questions include: What version of Linux are you running? How much RAM does your VM have? What is your username? What is the home folder path?',
              teacherNotes: 'Sample questions: CPU info, disk space, screen resolution, default web browser.',
            },
            {
              instruction: 'Students work individually or in pairs to find the answers. They may not ask the teacher - they must explore!',
              duration: '10 min',
            },
            {
              instruction: 'Hint: Most information can be found in Settings/System Settings, or by right-clicking the desktop.',
              teacherNotes: 'Circulate and give general hints ("try the Settings app") but do not give direct answers.',
            },
            {
              instruction: 'Review answers as a class. Discuss: "What was hard to find? Where would you look next time?"',
              duration: '4 min',
            },
          ],
          formativeAssessment: 'Score scavenger hunts. Note which questions were most difficult - may need extra instruction.',
          differentiation: {
            support: 'Reduce questions to 5, and provide hints for each question.',
            extension: 'Add bonus questions: Find the kernel version, find available disk space, find system uptime.',
          },
        },
        {
          title: 'Customization: Make It Yours',
          duration: '15 minutes',
          overview: 'Students personalize their Linux desktop, reinforcing that they have control over their computing environment.',
          steps: [
            {
              instruction: 'Open desktop settings (right-click desktop or Settings app).',
              duration: '1 min',
            },
            {
              instruction: 'Task 1: Change your wallpaper. Download a new image or use built-in options.',
              duration: '3 min',
            },
            {
              instruction: 'Task 2: Change the theme or color scheme. Show where to find appearance settings.',
              duration: '3 min',
              teacherNotes: 'Different distros have different theming options. Focus on what is available in your chosen distro.',
            },
            {
              instruction: 'Task 3: Customize the panel - add/remove items, change position or size.',
              duration: '3 min',
            },
            {
              instruction: 'Task 4: Add a favorite application to your dock or panel for quick access.',
              duration: '2 min',
            },
            {
              instruction: 'Gallery walk: Students show their customized desktops to neighbors.',
              duration: '3 min',
              teacherNotes: 'Celebrate creativity! This builds ownership of their Linux environment.',
            },
          ],
          formativeAssessment: 'Every student should have made at least two visible customizations to their desktop.',
          differentiation: {
            support: 'Provide a short list of specific customizations to make with step-by-step instructions.',
            extension: 'Challenge students to install additional themes using the package manager.',
          },
        },
      ],
      materials: [
        'Working Linux installation',
        'Scavenger hunt worksheet'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: [
            'Choose customization options',
            'Self-directed scavenger hunt exploration',
            'Option to work alone or in pairs',
          ],
          relevanceAndAuthenticity: [
            'Making the environment personal and comfortable',
            'Skills transfer to any operating system',
            'Control over your own technology',
          ],
          selfRegulation: [
            'Self-check: Can you find X?',
            'Scavenger hunt provides self-paced challenge',
            'Reflection on exploration process',
          ],
        },
        representation: {
          multipleFormats: [
            'Teacher-led visual tour',
            'Written scavenger hunt worksheet',
            'Hands-on exploration',
            'Video resources for reference',
          ],
          vocabularySupport: [
            'File system terms glossary: folder, directory, path, root, home',
            'Desktop environment terminology',
            'Visual diagram of folder hierarchy',
          ],
          backgroundKnowledge: [
            'Compare to Windows/Mac file systems',
            'Review file and folder concepts',
            'Connect to previous lesson on installation',
          ],
        },
        actionExpression: {
          physicalOptions: [
            'Mouse navigation or keyboard shortcuts',
            'Standing/walking during gallery walk',
            'Choice of input method',
          ],
          expressionOptions: [
            'Screenshot tour of customized desktop',
            'Written guide to favorite features',
            'Peer walkthrough demonstration',
          ],
          executiveFunctionSupport: [
            'Exploration checklist',
            'Scavenger hunt provides structured goals',
            'Clear tasks with defined outcomes',
          ],
        },
      },
    },
    {
      title: 'Installing Software: Package Managers',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Understand what package managers do',
        'Use graphical software center to install applications',
        'Introduction to command-line package management',
        'Compare to how software is installed on other platforms'
      ],
      conceptualUnderstanding: [
        'Package managers handle downloading, installing, updating, and removing software',
        'Repositories are trusted sources of software maintained by the distribution',
        'Dependencies are other packages a program needs to run',
        'This system is more secure and efficient than downloading from random websites'
      ],
      activities: [
        'Discussion: How do you install software on Windows/Mac?',
        'Hands-on: Use Software Center to install applications',
        'Introduction: Basic apt/dnf commands in terminal',
        'Comparison: Package manager vs app stores vs downloading installers'
      ],
      detailedActivities: [
        {
          title: 'Discussion: How Do You Usually Install Software?',
          duration: '8 minutes',
          overview: 'Activate prior knowledge by discussing how students install software on other platforms, setting up a comparison.',
          steps: [
            {
              instruction: 'Ask: "How do you install a new app on your phone? What about on a Windows or Mac computer?"',
              duration: '2 min',
              teacherNotes: 'Expected answers: App Store, download from website, Google Play.',
            },
            {
              instruction: 'Follow-up: "What problems have you encountered? Viruses? Fake software? Paying for something you thought was free?"',
              duration: '2 min',
            },
            {
              instruction: 'Introduce the concept: "Linux has a different approach. Software comes from trusted sources called repositories."',
            },
            {
              instruction: 'Analogy: "Think of it like a library. The library curates books (software), and you borrow (install) from a trusted collection."',
              duration: '2 min',
            },
            {
              instruction: 'Key terms on board: Repository, Package, Package Manager, Dependency.',
              teacherNotes: 'Return to these terms throughout the lesson to reinforce vocabulary.',
            },
          ],
          formativeAssessment: 'Can students explain what a "repository" is in their own words?',
          differentiation: {
            support: 'Provide the library analogy in writing with visual diagram.',
            extension: 'Ask students to think of downsides to this approach (less software choice, slower updates).',
          },
        },
        {
          title: 'Hands-On: Software Center Installation',
          duration: '15 minutes',
          overview: 'Students use the graphical Software Center to search for and install applications, building confidence with the GUI approach.',
          videoResources: [
            { title: 'How to Install Software on Ubuntu', url: 'https://www.youtube.com/watch?v=V-_O7nl0Ii0', duration: '4 min', description: 'Guide to Ubuntu Software Center' },
          ],
          steps: [
            {
              instruction: 'Open the Software Center (Software, Discover, or similar depending on distro).',
              duration: '1 min',
            },
            {
              instruction: 'Browse categories. Ask: "What kinds of software do you see? Games? Office? Development?"',
              duration: '2 min',
            },
            {
              instruction: 'Task: Search for and install VLC Media Player. Walk through the process together.',
              duration: '3 min',
              teacherNotes: 'VLC is safe, useful, and available on all distros. Good first install.',
            },
            {
              instruction: 'Point out key information: ratings, size, permissions requested.',
            },
            {
              instruction: 'Task: Each student installs ONE application of their choice from an approved list.',
              duration: '5 min',
              teacherNotes: 'Approved list suggestions: GIMP, Audacity, LibreOffice, Chromium, Blender, Inkscape.',
            },
            {
              instruction: 'Find and launch the installed application. Verify it works!',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Every student should have successfully installed and launched an application.',
          differentiation: {
            support: 'Provide step-by-step screenshots for installing VLC.',
            extension: 'Have students install a second application and compare the installation experience.',
          },
        },
        {
          title: 'Introduction: Terminal Package Management',
          duration: '15 minutes',
          overview: 'Students learn basic command-line package management, discovering the power and efficiency of terminal-based installation.',
          videoResources: [
            { title: 'apt vs apt-get Explained', url: 'https://www.youtube.com/watch?v=Wdwc9pGi0Hg', duration: '5 min', description: 'Clear explanation of apt commands' },
          ],
          steps: [
            {
              instruction: 'Open a terminal. Explain: "Everything the Software Center does, we can do faster with commands."',
              duration: '1 min',
            },
            {
              instruction: 'Demonstrate: sudo apt update (or dnf check-update). Explain: "This refreshes the list of available software."',
              teacherNotes: 'Explain sudo briefly - it runs commands as administrator.',
            },
            {
              instruction: 'Demonstrate: sudo apt install cowsay (or dnf install cowsay). A fun, harmless program.',
              duration: '2 min',
            },
            {
              instruction: 'Run cowsay "Hello Linux" to show it worked. Students enjoy this!',
              teacherNotes: 'Using a fun program makes the terminal feel less intimidating.',
            },
            {
              instruction: 'Students try: sudo apt install sl (Steam Locomotive - another fun command).',
              duration: '3 min',
            },
            {
              instruction: 'Show apt search [keyword] to find packages by name.',
              duration: '2 min',
            },
            {
              instruction: 'Show apt remove [package] to uninstall. Remove sl as practice.',
              duration: '2 min',
            },
            {
              instruction: 'Quick reference card: update, install, remove, search commands.',
              teacherNotes: 'Students can keep this reference for future use.',
            },
          ],
          formativeAssessment: 'Can students successfully install and uninstall a package using the terminal?',
          differentiation: {
            support: 'Pair students and have them type commands together. Provide command cheat sheet.',
            extension: 'Have students find and install a useful package on their own using apt search.',
          },
        },
        {
          title: 'Comparison and Reflection',
          duration: '12 minutes',
          overview: 'Students compare package managers to other software installation methods, understanding the tradeoffs.',
          steps: [
            {
              instruction: 'Create a comparison table on the board: Package Manager vs App Store vs Downloading from Website.',
              duration: '2 min',
            },
            {
              instruction: 'Discuss as class: Security (who verifies the software?), Cost (is it free?), Updates (how do you get them?).',
              duration: '4 min',
            },
            {
              instruction: 'Discuss: Dependencies. "What if VLC needs another piece of software to run? Package manager handles this automatically."',
              teacherNotes: 'Use analogy: recipe ingredients that are gathered automatically.',
            },
            {
              instruction: 'Think-Pair-Share: "Which method do you prefer? Why?"',
              duration: '3 min',
            },
            {
              instruction: 'Exit ticket: "Name one advantage and one disadvantage of Linux package managers."',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Review exit tickets. Can students articulate tradeoffs?',
          differentiation: {
            support: 'Provide a partially completed comparison table for students to fill in.',
            extension: 'Research: What is Flatpak or Snap? How are they different from apt/dnf?',
          },
        },
      ],
      materials: [
        'Working Linux installation',
        'List of suggested applications to install',
        'Command reference sheet'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: [
            'Choose which applications to install',
            'Option to use GUI or terminal',
            'Select topics for comparison discussion',
          ],
          relevanceAndAuthenticity: [
            'Install software they actually want to use',
            'Learn skills for managing any Linux system',
            'Compare to familiar experiences on phone/other computers',
          ],
          selfRegulation: [
            'Verify installation success independently',
            'Self-check using terminal commands',
            'Exit ticket reflection',
          ],
        },
        representation: {
          multipleFormats: [
            'GUI demonstration with Software Center',
            'Terminal commands with real-time output',
            'Written command reference card',
            'Comparison table on board',
          ],
          vocabularySupport: [
            'Package, repository, dependency definitions with examples',
            'Library analogy for repository concept',
            'Command syntax breakdown',
          ],
          backgroundKnowledge: [
            'Review of what software installation involves',
            'Connect to app stores students already use',
            'Build on previous file system knowledge',
          ],
        },
        actionExpression: {
          physicalOptions: [
            'GUI-only option for those uncomfortable with terminal',
            'Terminal-focused option for those who want efficiency',
            'Mixed approach combining both',
          ],
          expressionOptions: [
            'Document installed software with screenshots',
            'Write comparison between methods',
            'Verbal explanation to partner',
          ],
          executiveFunctionSupport: [
            'Clear steps for each installation method',
            'Checklist of commands to try',
            'Structured comparison activity',
          ],
        },
      },
    }
  ],
  assessment: {
    formative: [
      'Installation checkpoint: Did the VM boot successfully?',
      'Navigation quiz: Can students find specific files and settings?',
      'Package management: Successfully install a requested application',
      'Observation: Student engagement and troubleshooting attempts'
    ],
    summative: 'Create a "Linux Desktop Guide" for a new user, including screenshots and explanations of key features, customizations made, and at least 5 recommended applications with reasons for each recommendation.'
  },
  extensions: [
    'Try a different desktop environment (KDE, XFCE, etc.)',
    'Set up dual-boot on a real machine (with guidance)',
    'Explore accessibility features in Linux',
    'Research Linux use in specific industries (servers, embedded systems, etc.)'
  ],
  realWorldConnections: [
    'Linux runs most web servers, including sites students use daily',
    'Android phones are based on the Linux kernel',
    'Many companies use Linux for development and deployment',
    'Linux skills are valuable in IT, cybersecurity, and development careers'
  ]
};

const project2: Project = {
  id: 'project-2',
  title: 'Project 2: Command Line Mastery',
  description: 'Develop proficiency with the terminal, shell scripting basics, and automation.',
  difficulty: 'Intermediate',
  duration: '4-5 weeks',
  gradeBand: '9-12',
  overview: 'Students move beyond the graphical interface to harness the power of the command line. They will learn essential terminal commands, understand shell scripting, and discover how automation can save time and reduce errors.',
  learningObjectives: [
    'Navigate the file system using terminal commands',
    'Perform file operations (create, copy, move, delete) via command line',
    'Understand and modify file permissions',
    'Use pipes and redirection to combine commands',
    'Write basic shell scripts for automation',
    'Understand why the command line remains essential in computing'
  ],
  prerequisites: [
    'Completed Project 1 or equivalent Linux familiarity',
    'Basic understanding of file systems'
  ],
  materials: {
    required: [
      'Linux system (VM or native)',
      'Terminal emulator',
      'Text editor (nano, vim, or GUI editor)'
    ],
    optional: [
      'SSH client for remote practice',
      'Second machine or VM for networking exercises'
    ]
  },
  lessons: [
    {
      title: 'Terminal Basics: Navigation and Files',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Open and use the terminal',
        'Navigate directories with cd, pwd, ls',
        'Create and remove files and directories',
        'Understand absolute vs relative paths'
      ],
      conceptualUnderstanding: [
        'The terminal provides direct access to the operating system',
        'Commands follow patterns: command [options] [arguments]',
        'Everything in Linux is a file (even devices)',
        'Paths can be absolute (from /) or relative (from current directory)'
      ],
      activities: [
        'Introduction: What is a shell? Why use it?',
        'Practice: Navigate the file system',
        'Exercise: Create a directory structure for a project',
        'Challenge: Navigate using only terminal commands'
      ],
      detailedActivities: [
        {
          title: 'Introduction: What is a Shell?',
          duration: '10 minutes',
          overview: 'Students learn what the shell is and why the command line remains essential even with modern graphical interfaces.',
          videoResources: [
            { title: 'What is the Linux Terminal?', url: 'https://www.youtube.com/watch?v=oxuRxtrO2Ag', duration: '8 min', description: 'Beginner-friendly introduction to the terminal' },
          ],
          steps: [
            {
              instruction: 'Ask: "Who has seen a hacker movie where someone types commands on a black screen? That is the terminal!"',
              duration: '1 min',
            },
            {
              instruction: 'Open the terminal. Explain: "The shell is a program that reads your commands and tells the computer what to do."',
            },
            {
              instruction: 'Demonstrate typing a simple command: echo "Hello World"',
              teacherNotes: 'This shows cause and effect. Type, press Enter, see result.',
            },
            {
              instruction: 'Ask: "Why would anyone use this instead of clicking with a mouse?"',
              duration: '2 min',
            },
            {
              instruction: 'List reasons on board: Speed, Automation, Remote access, Power/flexibility, Required for servers.',
              duration: '2 min',
            },
            {
              instruction: 'Explain the command structure: command [options] [arguments]. Use ls -la /home as example.',
              teacherNotes: 'Break down each part. "ls" = command, "-la" = options, "/home" = argument.',
            },
          ],
          formativeAssessment: 'Can students identify the command, options, and arguments in a sample command?',
          differentiation: {
            support: 'Provide a visual diagram of command structure for reference.',
            extension: 'Have students find the man page for a command and identify its options.',
          },
        },
        {
          title: 'Navigation Practice: Finding Your Way',
          duration: '20 minutes',
          overview: 'Students practice essential navigation commands: pwd, ls, cd, mastering movement through the file system.',
          steps: [
            {
              instruction: 'Introduce pwd (print working directory): "This tells you where you are, like a GPS for the terminal."',
              duration: '2 min',
            },
            {
              instruction: 'Demonstrate ls (list): "This shows what is in the current directory." Show ls, ls -l, ls -la differences.',
              duration: '3 min',
            },
            {
              instruction: 'Introduce cd (change directory): cd Documents, cd .., cd ~, cd /',
              duration: '3 min',
              teacherNotes: 'Emphasize the special directories: .. (parent), ~ (home), / (root).',
            },
            {
              instruction: 'Practice round 1: Navigate to your home directory, list contents, go into Documents.',
              duration: '3 min',
            },
            {
              instruction: 'Introduce tab completion: "Start typing a directory name and press Tab to autocomplete."',
              teacherNotes: 'This is a game-changer for students. Demonstrate double-Tab for options.',
            },
            {
              instruction: 'Explain absolute vs relative paths with examples: /home/student/Documents vs Documents',
              duration: '3 min',
            },
            {
              instruction: 'Practice round 2: Students navigate to /etc, list contents, return home using absolute path.',
              duration: '4 min',
            },
          ],
          formativeAssessment: 'Students should be able to navigate to any directory and back without getting lost.',
          differentiation: {
            support: 'Provide a command cheat sheet with examples. Pair struggling students.',
            extension: 'Challenge students to find specific files in /etc using only navigation commands.',
          },
        },
        {
          title: 'Creating and Removing: mkdir, rmdir, touch, rm',
          duration: '15 minutes',
          overview: 'Students learn to create and remove files and directories, understanding the permanence of command-line operations.',
          steps: [
            {
              instruction: 'Warning: "Unlike the GUI, there is no trash can in terminal! rm deletes permanently."',
              teacherNotes: 'This is critical safety information. Repeat multiple times.',
            },
            {
              instruction: 'Demonstrate mkdir: Create a folder called "project" in home directory.',
              duration: '2 min',
            },
            {
              instruction: 'Demonstrate touch: Create an empty file called "notes.txt" inside project.',
            },
            {
              instruction: 'Students practice: Create their own directory structure: project/src, project/docs, project/data',
              duration: '4 min',
            },
            {
              instruction: 'Demonstrate rm and rmdir: Remove a file, remove an empty directory.',
              duration: '2 min',
            },
            {
              instruction: 'Warning about rm -r: "This deletes everything inside. Be VERY careful. Never run on / !"',
              teacherNotes: 'Tell horror stories of accidental deletion. Emphasize double-checking before rm -r.',
            },
            {
              instruction: 'Practice cleanup: Remove one file and one empty directory you created.',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Can students create a directory structure and clean it up safely?',
          differentiation: {
            support: 'Use a sandboxed directory where mistakes cannot cause real damage.',
            extension: 'Introduce mv for renaming and cp for copying files.',
          },
        },
        {
          title: 'Navigation Challenge: Terminal-Only Treasure Hunt',
          duration: '15 minutes',
          overview: 'Students complete a treasure hunt navigating only with terminal commands, finding hidden files and directories.',
          steps: [
            {
              instruction: 'Distribute challenge sheet with clues leading to different directories.',
              duration: '1 min',
              teacherNotes: 'Pre-create hidden files in various locations for students to find.',
            },
            {
              instruction: 'Example clue: "Start at the root of all things (/). Find the directory that holds user data."',
            },
            {
              instruction: 'Students work individually or in pairs to follow clues using only terminal commands.',
              duration: '10 min',
            },
            {
              instruction: 'Each clue leads to a file with the next clue or a final prize (ASCII art, secret message).',
              teacherNotes: 'Use cat to read clue files. Include hidden files (starting with .) for bonus points.',
            },
            {
              instruction: 'Debrief: "What commands did you use most? What was tricky?"',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Did students complete the treasure hunt? Note which commands gave them trouble.',
          differentiation: {
            support: 'Provide a command reference card. Offer hints after 3 minutes of being stuck.',
            extension: 'Create additional bonus challenges or have advanced students create clues for others.',
          },
        },
      ],
      materials: [
        'Terminal access',
        'Command reference card'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose order of practice tasks', 'Work individually or in pairs', 'Optional bonus challenges'],
          relevanceAndAuthenticity: ['Skills used daily by developers', 'Foundation for system administration', 'Empowers deeper computer control'],
          selfRegulation: ['Self-check at each practice round', 'Treasure hunt provides immediate feedback', 'Reflection on difficulties'],
        },
        representation: {
          multipleFormats: ['Live demonstration', 'Written reference card', 'Video backup', 'Hands-on practice'],
          vocabularySupport: ['Command glossary: pwd, ls, cd, mkdir, rmdir, touch, rm', 'Path terminology explained', 'Option flags decoded'],
          backgroundKnowledge: ['Connect to GUI file manager concepts', 'Review file/folder structure from Project 1', 'Explain why servers often have no GUI'],
        },
        actionExpression: {
          physicalOptions: ['Typing commands', 'Paper-based planning before typing', 'Verbal walkthrough of steps'],
          expressionOptions: ['Complete treasure hunt', 'Write own navigation guide', 'Teach a command to partner'],
          executiveFunctionSupport: ['Checklist of commands to learn', 'Step-by-step task breakdown', 'Command history to review'],
        },
      },
    },
    {
      title: 'File Operations and Permissions',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Copy, move, and rename files',
        'Read and understand permission strings',
        'Modify permissions with chmod',
        'Understand user, group, and other permissions'
      ],
      conceptualUnderstanding: [
        'Permissions control who can read, write, or execute files',
        'Linux is multi-user, so permissions are essential for security',
        'The permission system uses rwx for read, write, execute',
        'sudo allows temporary elevated privileges'
      ],
      activities: [
        'Demo: Reading permission output from ls -l',
        'Practice: Set up a shared folder with specific permissions',
        'Scenario: Create files only certain users can access',
        'Discussion: Why are permissions important?'
      ],
      detailedActivities: [
        {
          title: 'File Operations: cp, mv, and Managing Files',
          duration: '15 minutes',
          overview: 'Students learn to copy, move, and rename files efficiently using terminal commands.',
          steps: [
            {
              instruction: 'Create practice files: touch file1.txt file2.txt file3.txt in a new practice folder.',
              duration: '2 min',
            },
            {
              instruction: 'Demonstrate cp: Copy file1.txt to backup.txt. Explain syntax: cp source destination.',
            },
            {
              instruction: 'Demonstrate cp -r for directories: "The -r flag means recursive - copy everything inside."',
              duration: '2 min',
            },
            {
              instruction: 'Demonstrate mv for moving: Move file2.txt to a subfolder.',
            },
            {
              instruction: 'Reveal mv for renaming: "mv is also how you rename files! mv oldname.txt newname.txt"',
              teacherNotes: 'This surprises students - there is no separate rename command.',
            },
            {
              instruction: 'Practice: Copy a directory, move files between folders, rename a file.',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Can students successfully copy, move, and rename files and directories?',
          differentiation: {
            support: 'Provide a visual guide showing cp and mv syntax patterns.',
            extension: 'Introduce wildcards: cp *.txt backup/ to copy all text files.',
          },
        },
        {
          title: 'Understanding Permission Strings',
          duration: '20 minutes',
          overview: 'Students decode the permission strings shown by ls -l, understanding what each character means.',
          videoResources: [
            { title: 'Linux Permissions Explained', url: 'https://www.youtube.com/watch?v=D-VqgvBMV7g', duration: '8 min', description: 'Clear walkthrough of rwx permissions' },
          ],
          steps: [
            {
              instruction: 'Run ls -l and display output on projector. "What do all these letters and numbers mean?"',
              duration: '2 min',
            },
            {
              instruction: 'Break down the permission string: -rwxr-xr-- = type + owner + group + others.',
              duration: '3 min',
              teacherNotes: 'Draw this on the board with color coding for each section.',
            },
            {
              instruction: 'Explain each permission: r = read, w = write, x = execute. What each means for files vs directories.',
              duration: '3 min',
            },
            {
              instruction: 'Class exercise: Decode these permissions and explain who can do what: -rw-r--r--, drwxr-x---, -rwx------',
              duration: '5 min',
            },
            {
              instruction: 'Introduce the concept of users, groups, and others. "Why have three levels?"',
              duration: '3 min',
            },
            {
              instruction: 'Show id command to see your user and group membership.',
            },
          ],
          formativeAssessment: 'Give students permission strings to decode independently.',
          differentiation: {
            support: 'Provide a permission decoder reference card with visual examples.',
            extension: 'Introduce octal notation: 644, 755, 700 and how they map to rwx.',
          },
        },
        {
          title: 'Modifying Permissions with chmod',
          duration: '15 minutes',
          overview: 'Students learn to change file permissions using chmod, understanding when and why to modify access.',
          steps: [
            {
              instruction: 'Create a test file: echo "secret" > secret.txt',
              duration: '1 min',
            },
            {
              instruction: 'Check current permissions: ls -l secret.txt',
            },
            {
              instruction: 'Demonstrate symbolic chmod: chmod u+x secret.txt (add execute for user).',
              duration: '2 min',
            },
            {
              instruction: 'Explain the syntax: who (u/g/o/a) + operation (+/-/=) + permission (r/w/x).',
            },
            {
              instruction: 'Practice: Remove write permission for others: chmod o-w filename',
              duration: '3 min',
            },
            {
              instruction: 'Introduce numeric mode: chmod 755 = rwxr-xr-x. Explain the number system.',
              duration: '3 min',
              teacherNotes: '4=read, 2=write, 1=execute. Add them up for each position.',
            },
            {
              instruction: 'Scenario: Make a script executable so you can run it: chmod +x myscript.sh',
              duration: '2 min',
            },
          ],
          formativeAssessment: 'Students set specific permissions on a test file using both symbolic and numeric modes.',
          differentiation: {
            support: 'Focus only on symbolic mode. Provide examples to copy.',
            extension: 'Set up a shared folder where users can read but only owner can write.',
          },
        },
        {
          title: 'Discussion: Why Permissions Matter',
          duration: '10 minutes',
          overview: 'Students discuss real-world scenarios where file permissions prevent problems or enable collaboration.',
          steps: [
            {
              instruction: 'Scenario 1: "A hacker gets into your system but only as a regular user. Why is this still bad but not catastrophic?"',
              duration: '3 min',
            },
            {
              instruction: 'Scenario 2: "You are working on a group project. How would you set up a shared folder?"',
              duration: '3 min',
            },
            {
              instruction: 'Briefly introduce sudo: "When you need to break the rules temporarily."',
              teacherNotes: 'Do not go deep into sudo yet - just plant the seed.',
            },
            {
              instruction: 'Exit discussion: "What would happen if everyone could read and write every file on your computer?"',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Can students articulate why permissions exist and give examples of when they matter?',
          differentiation: {
            support: 'Provide scenario cards with guided questions.',
            extension: 'Research a real security incident caused by incorrect file permissions.',
          },
        },
      ],
      materials: [
        'Permission reference guide',
        'Practice file set'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose practice scenarios', 'Individual or pair work', 'Optional advanced challenges'],
          relevanceAndAuthenticity: ['Security is real-world critical', 'Shared project scenarios', 'Server administration context'],
          selfRegulation: ['Permission decoder self-check', 'Scenario reflection', 'Understanding verification'],
        },
        representation: {
          multipleFormats: ['Visual permission breakdown', 'Hands-on practice', 'Video explanation', 'Discussion scenarios'],
          vocabularySupport: ['Permission terminology glossary', 'Visual diagram of user/group/other', 'Command syntax patterns'],
          backgroundKnowledge: ['Connect to file operations from previous lesson', 'Explain multi-user systems', 'Compare to phone app permissions'],
        },
        actionExpression: {
          physicalOptions: ['Terminal practice', 'Paper-based permission decoding', 'Verbal scenario discussion'],
          expressionOptions: ['Write permission explanation', 'Demonstrate chmod to partner', 'Create security scenario'],
          executiveFunctionSupport: ['Structured permission decoder', 'Step-by-step chmod guide', 'Scenario response template'],
        },
      },
    },
    {
      title: 'Text Processing and Pipes',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Use cat, head, tail, and less to view files',
        'Search with grep',
        'Chain commands with pipes (|)',
        'Redirect output to files'
      ],
      conceptualUnderstanding: [
        'Small, focused commands can be combined for complex tasks',
        'Pipes send output from one command as input to another',
        'Redirection saves output to files or reads from files',
        'This philosophy of combining simple tools is core to Unix/Linux'
      ],
      activities: [
        'Demo: Viewing and searching log files',
        'Practice: Find specific information in large files',
        'Challenge: Chain multiple commands to extract data',
        'Project: Process a real data file'
      ],
      detailedActivities: [
        {
          title: 'Text Viewing Commands: cat, head, tail, less',
          duration: '15 minutes',
          overview: 'Students learn multiple ways to view file contents, choosing the right tool for different situations.',
          steps: [
            {
              instruction: 'Create or provide a sample log file with many lines of text.',
              duration: '1 min',
              teacherNotes: 'Use /var/log/syslog (if accessible) or create a sample file.',
            },
            {
              instruction: 'Demonstrate cat for small files: cat myfile.txt "This shows the entire file at once."',
            },
            {
              instruction: 'Show the problem with cat on large files: Try cat on a large log. "Too much! Cannot read it all."',
              duration: '2 min',
            },
            {
              instruction: 'Introduce head: "Shows the first 10 lines." Demonstrate head -n 20 for 20 lines.',
              duration: '2 min',
            },
            {
              instruction: 'Introduce tail: "Shows the last 10 lines - great for logs!" Demonstrate tail -f for following live logs.',
              teacherNotes: 'tail -f is magical for watching logs update in real time.',
            },
            {
              instruction: 'Introduce less: "A pager that lets you scroll through large files." Show navigation keys.',
              duration: '3 min',
            },
            {
              instruction: 'Practice: View the first 5 lines, last 20 lines, and browse through a file with less.',
              duration: '4 min',
            },
          ],
          formativeAssessment: 'Can students choose the appropriate viewing command for different file sizes?',
          differentiation: {
            support: 'Provide a quick reference showing when to use each command.',
            extension: 'Explore more less features: search with /, go to line with g, quit with q.',
          },
        },
        {
          title: 'Searching with grep',
          duration: '15 minutes',
          overview: 'Students learn to search for patterns in files using grep, one of the most powerful Unix tools.',
          videoResources: [
            { title: 'grep Command Tutorial', url: 'https://www.youtube.com/watch?v=VGgTmxXp7xQ', duration: '7 min', description: 'Practical grep examples for beginners' },
          ],
          steps: [
            {
              instruction: 'Explain grep: "Search for a word or pattern and show matching lines."',
            },
            {
              instruction: 'Basic example: grep "error" logfile.txt - Find all lines containing "error".',
              duration: '2 min',
            },
            {
              instruction: 'Add options: grep -i for case-insensitive, grep -n for line numbers, grep -c for count.',
              duration: '3 min',
            },
            {
              instruction: 'Practice: Find all lines with "warning" in a log file. How many are there?',
              duration: '3 min',
            },
            {
              instruction: 'Introduce grep -r for recursive search: "Search all files in a directory and subdirectories."',
              duration: '2 min',
            },
            {
              instruction: 'Challenge: Find a specific word in all .txt files in your home directory.',
              duration: '4 min',
            },
          ],
          formativeAssessment: 'Can students find specific text in files using grep with appropriate options?',
          differentiation: {
            support: 'Provide grep syntax examples on a reference card.',
            extension: 'Introduce basic regular expressions: grep "^Error" for lines starting with Error.',
          },
        },
        {
          title: 'The Power of Pipes',
          duration: '20 minutes',
          overview: 'Students learn to chain commands together with pipes, understanding the Unix philosophy of small tools working together.',
          steps: [
            {
              instruction: 'Explain the pipe symbol: "| takes output from one command and feeds it as input to another."',
              duration: '2 min',
            },
            {
              instruction: 'Simple example: ls | head - List directory but show only first 10 items.',
              duration: '2 min',
            },
            {
              instruction: 'More powerful: cat logfile.txt | grep "error" | head -5 - Find errors, show first 5.',
              duration: '3 min',
              teacherNotes: 'Walk through each step: what does each command add?',
            },
            {
              instruction: 'Introduce wc (word count): ls | wc -l counts files. grep "error" log.txt | wc -l counts errors.',
              duration: '3 min',
            },
            {
              instruction: 'Introduce sort and uniq: cat names.txt | sort | uniq removes duplicates.',
              duration: '3 min',
            },
            {
              instruction: 'Challenge: Create a pipe chain that finds unique IP addresses in a log file.',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Can students construct a multi-step pipe to solve a data extraction problem?',
          differentiation: {
            support: 'Provide step-by-step breakdown of each pipe component.',
            extension: 'Use awk or cut to extract specific columns from data.',
          },
        },
        {
          title: 'Redirection: Saving Output',
          duration: '10 minutes',
          overview: 'Students learn to save command output to files and read input from files using redirection.',
          steps: [
            {
              instruction: 'Explain > redirection: "Saves output to a file instead of displaying it."',
            },
            {
              instruction: 'Example: ls > filelist.txt - Saves directory listing to a file.',
              duration: '2 min',
            },
            {
              instruction: 'Warning: > overwrites! >> appends to the file instead.',
              teacherNotes: 'This is a common source of data loss. Emphasize the difference.',
            },
            {
              instruction: 'Combine with pipes: grep "error" log.txt | sort > errors_sorted.txt',
              duration: '2 min',
            },
            {
              instruction: 'Brief intro to input redirection: command < file reads input from file.',
              duration: '2 min',
            },
            {
              instruction: 'Practice: Save the last 20 lines of a log file to a new file.',
              duration: '2 min',
            },
          ],
          formativeAssessment: 'Can students save command output to a file and append without overwriting?',
          differentiation: {
            support: 'Visual diagram showing > vs >> behavior.',
            extension: 'Explore 2>&1 for redirecting error output.',
          },
        },
      ],
      materials: [
        'Sample data files',
        'Pipe and redirection reference'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose which commands to practice first', 'Select data files of interest', 'Optional advanced challenges'],
          relevanceAndAuthenticity: ['Real log analysis skills', 'Data processing used in every tech job', 'Automation foundation'],
          selfRegulation: ['Self-check command output', 'Verify results independently', 'Reflection on efficiency'],
        },
        representation: {
          multipleFormats: ['Live demo', 'Pipe flow diagrams', 'Written reference', 'Video backup'],
          vocabularySupport: ['Pipe terminology explained', 'Command glossary', 'Symbol reference (| > >> <)'],
          backgroundKnowledge: ['Build on file navigation', 'Connect to permission concepts', 'Explain standard streams (stdin/stdout)'],
        },
        actionExpression: {
          physicalOptions: ['Terminal practice', 'Diagram pipe chains on paper first', 'Verbal walkthrough'],
          expressionOptions: ['Complete data challenges', 'Create cheat sheet', 'Teach partner a pipe chain'],
          executiveFunctionSupport: ['Step-by-step command building', 'Checklist of tools to try', 'Output verification'],
        },
      },
    },
    {
      title: 'Introduction to Shell Scripting',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Create and run a basic shell script',
        'Use variables and command substitution',
        'Implement conditional logic (if statements)',
        'Create loops for repetitive tasks'
      ],
      conceptualUnderstanding: [
        'Scripts automate repetitive command sequences',
        'Variables store data for reuse',
        'Conditionals let scripts make decisions',
        'Loops repeat actions efficiently'
      ],
      activities: [
        'First script: Hello World and basic structure',
        'Variables: Store and use information',
        'Conditionals: Script that responds to input',
        'Loops: Process multiple files automatically'
      ],
      detailedActivities: [
        {
          title: 'Your First Shell Script',
          duration: '20 minutes',
          overview: 'Students create their first shell script, learning the basic structure and how to make scripts executable.',
          videoResources: [
            { title: 'Bash Scripting Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=tK9Oc6AEnR4', duration: '10 min', description: 'Getting started with bash scripting' },
          ],
          steps: [
            {
              instruction: 'Explain what a script is: "A file containing commands that run automatically, one after another."',
              duration: '2 min',
            },
            {
              instruction: 'Create hello.sh using nano: nano hello.sh',
              teacherNotes: 'Use nano for beginners. Mention vim as advanced option.',
            },
            {
              instruction: 'Write the script: #!/bin/bash on first line (shebang), then echo "Hello, World!"',
              duration: '3 min',
            },
            {
              instruction: 'Save and exit nano (Ctrl+O, Ctrl+X). Try to run: ./hello.sh - get permission denied!',
            },
            {
              instruction: 'Make it executable: chmod +x hello.sh. Now run it: ./hello.sh',
              duration: '2 min',
            },
            {
              instruction: 'Explain the shebang: "Tells the system which program should run this script."',
              duration: '2 min',
            },
            {
              instruction: 'Practice: Create a script that prints your name and today\'s date (use date command).',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Every student should have created and executed their first shell script.',
          differentiation: {
            support: 'Provide the exact script to type. Check for typos that break execution.',
            extension: 'Add multiple echo commands and include the output of whoami.',
          },
        },
        {
          title: 'Variables: Storing and Using Information',
          duration: '20 minutes',
          overview: 'Students learn to use variables to store data and make scripts more flexible.',
          steps: [
            {
              instruction: 'Explain variables: "A box that holds information we can use later."',
            },
            {
              instruction: 'Demonstrate variable assignment: name="Student" (no spaces around =!).',
              duration: '2 min',
              teacherNotes: 'The no-spaces rule trips up beginners. Emphasize it.',
            },
            {
              instruction: 'Using variables: echo "Hello, $name" - the $ means "get the value".',
              duration: '2 min',
            },
            {
              instruction: 'Command substitution: today=$(date) stores the output of date in a variable.',
              duration: '3 min',
            },
            {
              instruction: 'User input: read -p "Enter your name: " username - stores input in variable.',
              duration: '3 min',
            },
            {
              instruction: 'Practice: Create a greeting script that asks for a name and says hello.',
              duration: '5 min',
            },
            {
              instruction: 'Special variables: $1, $2 for command-line arguments. ./script.sh arg1 arg2',
              duration: '3 min',
            },
          ],
          formativeAssessment: 'Can students write a script that uses variables from user input?',
          differentiation: {
            support: 'Provide template script with blanks to fill in.',
            extension: 'Use $# to count arguments and display a helpful usage message if wrong count.',
          },
        },
        {
          title: 'Conditionals: Making Decisions',
          duration: '25 minutes',
          overview: 'Students learn to add decision-making to scripts using if statements.',
          steps: [
            {
              instruction: 'Explain conditionals: "The script can make different choices based on conditions."',
              duration: '2 min',
            },
            {
              instruction: 'Basic if syntax: if [ condition ]; then ... fi (note the spaces inside brackets!).',
              teacherNotes: 'Spaces are required inside [ ]. This is a common error.',
            },
            {
              instruction: 'Simple example: Check if a file exists: if [ -f myfile.txt ]; then echo "File exists"; fi',
              duration: '3 min',
            },
            {
              instruction: 'Add else: if [ -f myfile.txt ]; then echo "Found"; else echo "Not found"; fi',
              duration: '3 min',
            },
            {
              instruction: 'Comparison operators: -eq, -ne, -lt, -gt for numbers. = and != for strings.',
              duration: '3 min',
            },
            {
              instruction: 'Practice: Script that checks if a command-line argument is provided.',
              duration: '5 min',
            },
            {
              instruction: 'More complex: Check if user enters "yes" or "no" and respond accordingly.',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Can students write a script with at least one if/else decision?',
          differentiation: {
            support: 'Provide if-statement template. Focus on one type of comparison.',
            extension: 'Use elif for multiple conditions. Combine conditions with && and ||.',
          },
        },
        {
          title: 'Loops: Automating Repetition',
          duration: '25 minutes',
          overview: 'Students learn to repeat actions automatically using for and while loops.',
          steps: [
            {
              instruction: 'Explain loops: "Do something multiple times without writing it out each time."',
              duration: '2 min',
            },
            {
              instruction: 'For loop with list: for name in Alice Bob Carol; do echo "Hello $name"; done',
              duration: '3 min',
            },
            {
              instruction: 'For loop with files: for file in *.txt; do echo "Found: $file"; done',
              duration: '3 min',
              teacherNotes: 'This is powerful! Process all files matching a pattern.',
            },
            {
              instruction: 'While loop: counter=1; while [ $counter -le 5 ]; do echo $counter; counter=$((counter+1)); done',
              duration: '4 min',
            },
            {
              instruction: 'Practice: Create a script that lists all .txt files in a directory with their sizes.',
              duration: '5 min',
            },
            {
              instruction: 'Practical example: Rename all .txt files to add a date prefix.',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Can students write a loop that processes multiple files?',
          differentiation: {
            support: 'Focus only on for loops. Provide syntax templates.',
            extension: 'Create a script that reads lines from a file and processes each one.',
          },
        },
      ],
      materials: [
        'Text editor',
        'Scripting reference guide'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose script topics', 'Pick practice challenges', 'Individual or pair work'],
          relevanceAndAuthenticity: ['Automation saves real time', 'Foundation for DevOps', 'Problem-solving skills'],
          selfRegulation: ['Test scripts incrementally', 'Debug errors independently', 'Reflect on efficiency gains'],
        },
        representation: {
          multipleFormats: ['Live coding demo', 'Written syntax reference', 'Video tutorials', 'Code templates'],
          vocabularySupport: ['Script terminology glossary', 'Syntax breakdown diagrams', 'Error message explanations'],
          backgroundKnowledge: ['Build on pipe and command knowledge', 'Connect to automation concept', 'Compare to other programming'],
        },
        actionExpression: {
          physicalOptions: ['Type scripts', 'Copy and modify templates', 'Verbal walkthrough before typing'],
          expressionOptions: ['Complete coding challenges', 'Create documentation', 'Teach concept to partner'],
          executiveFunctionSupport: ['Script templates', 'Debugging checklist', 'Incremental development steps'],
        },
      },
    },
    {
      title: 'Practical Automation Project',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Identify tasks suitable for automation',
        'Design a solution using learned commands',
        'Write and test a complete script',
        'Document the script for others to understand'
      ],
      conceptualUnderstanding: [
        'Good automation saves time and reduces errors',
        'Scripts should be documented and maintainable',
        'Testing is essential before deploying automation',
        'The best scripts are reusable and adaptable'
      ],
      activities: [
        'Planning: Choose an automation task',
        'Development: Write the script incrementally',
        'Testing: Verify with different inputs',
        'Documentation: Add comments and create usage guide'
      ],
      detailedActivities: [
        {
          title: 'Project Planning: Choosing What to Automate',
          duration: '20 minutes',
          overview: 'Students identify a repetitive task and plan a script to automate it.',
          steps: [
            {
              instruction: 'Brainstorm: "What repetitive tasks do you do on a computer? Organizing files? Backups? Reports?"',
              duration: '5 min',
            },
            {
              instruction: 'Present project options: (1) File organizer by extension, (2) Backup script, (3) System info reporter, (4) Log analyzer.',
              duration: '3 min',
              teacherNotes: 'Students can propose their own ideas if approved.',
            },
            {
              instruction: 'Planning template: What inputs? What outputs? What steps in between?',
              duration: '5 min',
            },
            {
              instruction: 'Pseudocode: Write out the steps in plain English before coding.',
              duration: '5 min',
            },
            {
              instruction: 'Approval: Check plans with teacher before proceeding to development.',
              duration: '2 min',
            },
          ],
          formativeAssessment: 'Does the student have a clear, achievable plan with defined inputs and outputs?',
          differentiation: {
            support: 'Provide pre-planned project with pseudocode to follow.',
            extension: 'Design a more complex project with multiple features.',
          },
        },
        {
          title: 'Incremental Development',
          duration: '35 minutes',
          overview: 'Students build their scripts step by step, testing at each stage.',
          steps: [
            {
              instruction: 'Start with the shebang and a simple echo to confirm the script runs.',
              duration: '2 min',
            },
            {
              instruction: 'Add one feature at a time. Test after EACH addition.',
              teacherNotes: 'Emphasize: Never write a whole script then test. Build incrementally.',
            },
            {
              instruction: 'Work time: Students develop their scripts with teacher circulating for support.',
              duration: '25 min',
            },
            {
              instruction: 'Checkpoint: At 15-minute mark, everyone should have a working partial script.',
              duration: '3 min',
            },
            {
              instruction: 'Debugging help: Share common errors and solutions with the class.',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Is the student building incrementally? Does each version work before moving on?',
          differentiation: {
            support: 'Pair with advanced student. Provide code snippets to adapt.',
            extension: 'Add error handling and edge case management.',
          },
        },
        {
          title: 'Testing and Edge Cases',
          duration: '15 minutes',
          overview: 'Students test their scripts with various inputs, including unexpected ones.',
          steps: [
            {
              instruction: 'Test with expected input: Does it work correctly?',
              duration: '3 min',
            },
            {
              instruction: 'Test with no input: What happens? Does it handle this gracefully?',
              duration: '3 min',
            },
            {
              instruction: 'Test with unexpected input: Wrong file type, missing directory, etc.',
              duration: '3 min',
            },
            {
              instruction: 'Add basic error handling: Check if files exist before processing.',
              duration: '4 min',
            },
            {
              instruction: 'Peer testing: Trade scripts with a partner and try to break each other\'s code.',
              duration: '2 min',
            },
          ],
          formativeAssessment: 'Does the script handle edge cases without crashing or doing unexpected things?',
          differentiation: {
            support: 'Focus on basic testing. Skip advanced error handling.',
            extension: 'Add detailed error messages explaining what went wrong.',
          },
        },
        {
          title: 'Documentation and Presentation',
          duration: '20 minutes',
          overview: 'Students add comments to their scripts and prepare to share their work.',
          steps: [
            {
              instruction: 'Add header comment: Script name, purpose, author, date.',
              duration: '3 min',
            },
            {
              instruction: 'Comment complex sections: Explain WHY, not just WHAT.',
              duration: '5 min',
              teacherNotes: 'Good comments explain intent, not obvious syntax.',
            },
            {
              instruction: 'Create usage message: What does the script do? How do you run it?',
              duration: '4 min',
            },
            {
              instruction: 'Prepare demonstration: Show the script solving a real problem.',
              duration: '3 min',
            },
            {
              instruction: 'Present to class: 2-minute demo per student or group.',
              duration: '5 min',
            },
          ],
          formativeAssessment: 'Is the script documented well enough that someone else could use it?',
          differentiation: {
            support: 'Provide documentation template to fill in.',
            extension: 'Create a man-page style documentation or README.',
          },
        },
      ],
      materials: [
        'All previous materials',
        'Project planning template'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose project topic', 'Define scope independently', 'Work alone or in pairs'],
          relevanceAndAuthenticity: ['Solve real problems', 'Create useful tools', 'Build portfolio piece'],
          selfRegulation: ['Self-managed project timeline', 'Testing checkpoints', 'Reflection on process'],
        },
        representation: {
          multipleFormats: ['Planning template', 'Code examples', 'Peer demonstrations', 'Written documentation'],
          vocabularySupport: ['Project planning terms', 'Documentation standards', 'Testing terminology'],
          backgroundKnowledge: ['Build on all previous lessons', 'Connect to real-world automation', 'Reference professional practices'],
        },
        actionExpression: {
          physicalOptions: ['Typing code', 'Diagramming on paper', 'Verbal presentation'],
          expressionOptions: ['Working script', 'Written documentation', 'Peer teaching', 'Live demonstration'],
          executiveFunctionSupport: ['Project timeline', 'Development checkpoints', 'Testing checklist', 'Documentation template'],
        },
      },
    }
  ],
  assessment: {
    formative: [
      'Navigation challenges: Complete timed file system tasks',
      'Permission scenarios: Correctly set up access controls',
      'Pipe puzzles: Extract specific data using command chains',
      'Script checkpoints: Working code at each stage'
    ],
    summative: 'Create an automation script that solves a real problem (backup files, organize downloads, generate reports, etc.). Include documentation, error handling, and a demonstration of the script in action.'
  },
  extensions: [
    'Learn vim or emacs for terminal-based editing',
    'Explore advanced bash features (arrays, functions)',
    'Set up scheduled tasks with cron',
    'Write scripts that work across different Linux distributions'
  ],
  realWorldConnections: [
    'System administrators use command line daily',
    'DevOps relies heavily on scripting and automation',
    'Many development workflows use terminal tools',
    'Command line skills transfer to macOS and Windows (PowerShell)'
  ]
};

const project3: Project = {
  id: 'project-3',
  title: 'Project 3: Open Source Ecosystem',
  description: 'Explore how open source projects work and make your first contribution.',
  difficulty: 'Intermediate',
  duration: '3-4 weeks',
  gradeBand: '6-12',
  overview: 'Students learn how the open source ecosystem functions, from licensing to community governance. They will explore GitHub, find projects that interest them, and work toward making their first contribution.',
  learningObjectives: [
    'Understand different open source licenses and their implications',
    'Navigate GitHub and find projects',
    'Read and understand project documentation',
    'Contribute to a project (documentation, translation, code)',
    'Communicate effectively with open source communities',
    'Appreciate the collaborative nature of open source development'
  ],
  prerequisites: [
    'Basic computer literacy',
    'Helpful: familiarity with command line'
  ],
  materials: {
    required: [
      'Computer with internet access',
      'GitHub account',
      'Git installed (or GitHub Desktop)'
    ],
    optional: [
      'Code editor for code contributions',
      'Translation tools for localization work'
    ]
  },
  lessons: [
    {
      title: 'Understanding Open Source Licenses',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: [
        'Explain what a software license does',
        'Compare major open source licenses (GPL, MIT, Apache)',
        'Understand "copyleft" vs "permissive" licenses',
        'Find and read the license of a project'
      ],
      conceptualUnderstanding: [
        'Without a license, code is copyrighted and cannot be freely used',
        'Open source licenses grant specific freedoms to users',
        'Copyleft licenses require derivative works to remain open',
        'License choice reflects project philosophy and goals'
      ],
      activities: [
        'Introduction: Why licenses matter',
        'Comparison: GPL vs MIT - what are the differences?',
        'Exercise: Find licenses of software you use',
        'Discussion: What license would you choose for your project?'
      ],
      detailedActivities: [
        {
          title: 'Why Licenses Matter',
          duration: '12 minutes',
          overview: 'Students discover why software needs licenses and what happens without them.',
          videoResources: [
            { title: 'Open Source Licenses Explained', url: 'https://www.youtube.com/watch?v=8cQ4WJ5FMpo', duration: '7 min', description: 'Quick overview of major open source licenses' },
          ],
          steps: [
            { instruction: 'Ask: "If I write code and put it online, can anyone use it? What are the rules?"', duration: '2 min' },
            { instruction: 'Explain default copyright: Without a license, you technically own all rights.', teacherNotes: 'This surprises most students.' },
            { instruction: 'Show GitHub repositories without licenses - what does that mean for users?', duration: '3 min' },
            { instruction: 'Introduce licenses as "permission slips" that define what others can do.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain why publishing code without a license creates legal uncertainty?',
          differentiation: { support: 'Use simple analogy: license like borrowing vs owning.', extension: 'Research public domain and CC0.' },
        },
        {
          title: 'License Comparison: GPL vs MIT vs Apache',
          duration: '20 minutes',
          overview: 'Students compare the three most popular open source licenses.',
          steps: [
            { instruction: 'Distribute license comparison chart with empty cells to fill.', duration: '2 min' },
            { instruction: 'Explain MIT: "You can do almost anything, just keep the copyright notice."', duration: '3 min' },
            { instruction: 'Explain GPL: "If you modify and share, you must share the source too (copyleft)."', duration: '4 min', teacherNotes: 'The "viral" nature of GPL is key to understand.' },
            { instruction: 'Explain Apache: "Like MIT plus patent protection and trademark rules."', duration: '3 min' },
            { instruction: 'Group activity: Sort example scenarios by which license allows the action.', duration: '6 min' },
          ],
          formativeAssessment: 'Can students correctly identify which license allows/forbids a given action?',
          differentiation: { support: 'Provide completed chart for reference.', extension: 'Compare LGPL, AGPL, and creative commons licenses.' },
        },
        {
          title: 'Exercise: Finding Real Licenses',
          duration: '10 minutes',
          overview: 'Students find and read licenses of software they actually use.',
          steps: [
            { instruction: 'List 5 open source tools students might use: Firefox, VLC, VS Code, Android, Linux.', duration: '1 min' },
            { instruction: 'Show where to find licenses: GitHub repo, About page, legal folder.', duration: '2 min' },
            { instruction: 'Students search for and identify the license of two programs of their choice.', duration: '5 min' },
            { instruction: 'Share findings: What surprised you?', duration: '2 min' },
          ],
          formativeAssessment: 'Did students correctly identify licenses for their chosen software?',
          differentiation: { support: 'Provide direct links to license pages.', extension: 'Find a project that changed licenses and explain why.' },
        },
      ],
      materials: [
        'License comparison chart',
        'Example projects with different licenses'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose software to research'], relevanceAndAuthenticity: ['Connect to software they use'], selfRegulation: ['Self-check license identification'] },
        representation: { multipleFormats: ['Video explanation', 'Written chart', 'Interactive exercise'], vocabularySupport: ['License terminology glossary'], backgroundKnowledge: ['Copyright basics'] },
        actionExpression: { physicalOptions: ['Written chart completion', 'Verbal discussion'], expressionOptions: ['Research presentation', 'Comparison writing'], executiveFunctionSupport: ['License comparison template'] },
      },
    },
    {
      title: 'How Open Source Projects Work',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: [
        'Describe the structure of an open source project',
        'Identify key roles (maintainers, contributors, users)',
        'Understand how decisions are made in open source',
        'Read a project\'s contribution guidelines'
      ],
      conceptualUnderstanding: [
        'Projects have governance structures that vary widely',
        'Maintainers review and approve changes',
        'Contributors can help in many ways beyond code',
        'Documentation and community guidelines help new contributors'
      ],
      activities: [
        'Case study: Explore a popular open source project',
        'Roles: Identify different contributors and their work',
        'Reading: Find and understand contribution guidelines',
        'Discussion: What makes a welcoming open source project?'
      ],
      detailedActivities: [
        {
          title: 'Case Study: Anatomy of an Open Source Project',
          duration: '20 minutes',
          overview: 'Students explore a real open source project to understand its structure.',
          steps: [
            { instruction: 'Choose a popular project: VS Code, React, or Linux kernel.', duration: '2 min' },
            { instruction: 'Navigate the repository: README, LICENSE, CONTRIBUTING, issues, pull requests.', duration: '5 min', teacherNotes: 'Walk through each section, explaining its purpose.' },
            { instruction: 'Look at recent commits: Who is making changes? How often?', duration: '3 min' },
            { instruction: 'Find the governance model: Who makes decisions? How are maintainers chosen?', duration: '5 min' },
            { instruction: 'Document findings on project analysis worksheet.', duration: '5 min' },
          ],
          formativeAssessment: 'Can students identify the key files and structure of an open source repository?',
          differentiation: { support: 'Provide guided tour with screenshots.', extension: 'Compare governance of two different projects.' },
        },
        {
          title: 'Roles in Open Source',
          duration: '15 minutes',
          overview: 'Students identify different roles and how people contribute.',
          steps: [
            { instruction: 'List roles on board: Creator, Maintainer, Contributor, User, Commenter, Sponsor.', duration: '2 min' },
            { instruction: 'For each role, discuss: What do they do? How do they help the project?', duration: '5 min' },
            { instruction: 'Look at contributors page of a project: How many people helped?', duration: '3 min' },
            { instruction: 'Discussion: Which role would you want to play? Why?', duration: '5 min' },
          ],
          formativeAssessment: 'Can students explain the difference between maintainer and contributor?',
          differentiation: { support: 'Role cards with descriptions.', extension: 'Research notable maintainers and their backgrounds.' },
        },
        {
          title: 'Reading Contribution Guidelines',
          duration: '15 minutes',
          overview: 'Students learn to read and understand CONTRIBUTING.md files.',
          steps: [
            { instruction: 'Find CONTRIBUTING.md in a real project (suggest: First Contributions repo).', duration: '2 min' },
            { instruction: 'Identify key sections: How to report bugs, how to submit code, code style rules.', duration: '4 min' },
            { instruction: 'Compare two projects\' guidelines: What\'s different? What\'s similar?', duration: '5 min' },
            { instruction: 'Discuss: Why do projects have these rules?', duration: '4 min', teacherNotes: 'Emphasize: rules make collaboration smoother.' },
          ],
          formativeAssessment: 'Can students find and interpret contribution guidelines for a new project?',
          differentiation: { support: 'Highlight key sections in advance.', extension: 'Draft contribution guidelines for a hypothetical project.' },
        },
      ],
      materials: [
        'Example project repositories',
        'Governance comparison chart'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose project to analyze'], relevanceAndAuthenticity: ['Real-world project exploration'], selfRegulation: ['Analysis checklist'] },
        representation: { multipleFormats: ['Live navigation', 'Written worksheets', 'Comparison activities'], vocabularySupport: ['Role definitions'], backgroundKnowledge: ['Review licensing from previous lesson'] },
        actionExpression: { physicalOptions: ['Browser exploration', 'Written analysis'], expressionOptions: ['Worksheet completion', 'Verbal presentation'], executiveFunctionSupport: ['Project analysis template'] },
      },
    },
    {
      title: 'Finding Projects and Making Contributions',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Use GitHub to find projects',
        'Identify "good first issues"',
        'Fork a repository and make changes',
        'Submit a pull request'
      ],
      conceptualUnderstanding: [
        'GitHub is the largest host of open source projects',
        'Projects label beginner-friendly issues to help new contributors',
        'Forking creates your own copy to work on',
        'Pull requests propose your changes for review'
      ],
      activities: [
        'Exploration: Browse GitHub Explore and trending projects',
        'Search: Find projects with good-first-issue labels',
        'Practice: Fork a repository',
        'Hands-on: Make and submit a small contribution'
      ],
      detailedActivities: [
        {
          title: 'Exploring GitHub',
          duration: '15 minutes',
          overview: 'Students learn to navigate GitHub and discover projects.',
          videoResources: [
            { title: 'GitHub for Beginners', url: 'https://www.youtube.com/watch?v=w3jLJU7DT5E', duration: '8 min', description: 'Introduction to GitHub interface' },
          ],
          steps: [
            { instruction: 'Everyone logs into their GitHub account (create if needed).', duration: '2 min' },
            { instruction: 'Navigate to GitHub Explore. Discuss: What kinds of projects are trending?', duration: '3 min' },
            { instruction: 'Search for projects by topic: #education, #python, #games.', duration: '3 min' },
            { instruction: 'Find "awesome" lists - curated collections of resources.', duration: '3 min' },
            { instruction: 'Bookmark 3 projects that interest you.', duration: '4 min' },
          ],
          formativeAssessment: 'Did students find projects that match their interests?',
          differentiation: { support: 'Provide specific project links to explore.', extension: 'Analyze star history and contributor activity.' },
        },
        {
          title: 'Finding Good First Issues',
          duration: '15 minutes',
          overview: 'Students learn to find beginner-friendly contribution opportunities.',
          steps: [
            { instruction: 'Explain labels: "good first issue", "help wanted", "beginner-friendly".', duration: '2 min' },
            { instruction: 'Show how to filter issues by label on GitHub.', duration: '3 min' },
            { instruction: 'Visit goodfirstissue.dev or firsttimersonly.com for curated lists.', duration: '3 min', teacherNotes: 'These sites aggregate beginner-friendly issues.' },
            { instruction: 'Each student finds one issue they could potentially work on.', duration: '5 min' },
            { instruction: 'Share findings: What kind of issues did you find?', duration: '2 min' },
          ],
          formativeAssessment: 'Did each student identify a potentially workable issue?',
          differentiation: { support: 'Provide curated list of issues.', extension: 'Evaluate issue complexity and estimate effort.' },
        },
        {
          title: 'Forking and Making Changes',
          duration: '20 minutes',
          overview: 'Students practice the fork-and-pull-request workflow.',
          steps: [
            { instruction: 'Demonstrate forking a practice repository (suggest: First Contributions).', duration: '3 min' },
            { instruction: 'Clone the fork locally or use GitHub\'s web editor.', duration: '3 min' },
            { instruction: 'Make a simple change: add your name to a contributors list or fix a typo.', duration: '5 min' },
            { instruction: 'Commit the change with a descriptive message.', duration: '3 min' },
            { instruction: 'Create a pull request back to the original repository.', duration: '4 min' },
            { instruction: 'Celebrate: You made your first contribution!', duration: '2 min' },
          ],
          formativeAssessment: 'Did every student successfully submit a pull request?',
          differentiation: { support: 'Use GitHub Desktop for simpler workflow.', extension: 'Make multiple commits and create a meaningful PR.' },
        },
      ],
      materials: [
        'GitHub account',
        'Git/GitHub Desktop',
        'Good first issue resources'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose projects of interest'], relevanceAndAuthenticity: ['Real contributions to real projects'], selfRegulation: ['Track contribution progress'] },
        representation: { multipleFormats: ['Video tutorials', 'Live demo', 'Step-by-step guide'], vocabularySupport: ['GitHub terminology: fork, clone, PR, merge'], backgroundKnowledge: ['Review project structure from previous lesson'] },
        actionExpression: { physicalOptions: ['Web interface or desktop app'], expressionOptions: ['Code changes or documentation'], executiveFunctionSupport: ['Contribution checklist'] },
      },
    },
    {
      title: 'Contributing Beyond Code',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: [
        'Identify non-code ways to contribute',
        'Improve documentation or translations',
        'Report and triage bugs effectively',
        'Help others in community forums'
      ],
      conceptualUnderstanding: [
        'Code is only one part of a successful project',
        'Documentation helps users and reduces support burden',
        'Translation makes software accessible to more people',
        'Community support is valuable contribution'
      ],
      activities: [
        'Brainstorm: What does a project need besides code?',
        'Practice: Improve a README or documentation',
        'Exercise: Write a good bug report',
        'Exploration: Find a project needing translation'
      ],
      detailedActivities: [
        {
          title: 'Brainstorm: Non-Code Contributions',
          duration: '10 minutes',
          overview: 'Students discover the many ways to contribute without writing code.',
          steps: [
            { instruction: 'Pose question: "Besides writing code, what does a project need to succeed?"', duration: '2 min' },
            { instruction: 'Create list on board: Documentation, translations, bug reports, design, testing, community support, tutorials.', duration: '4 min' },
            { instruction: 'Discuss: Which contributions are most valuable? Why?', duration: '3 min' },
            { instruction: 'Emphasize: Many projects need these more than code!', teacherNotes: 'Documentation and translation are often undersupplied.' },
          ],
          formativeAssessment: 'Can students name at least 5 non-code ways to contribute?',
          differentiation: { support: 'Provide contribution type cards.', extension: 'Research how major projects recruit non-code contributors.' },
        },
        {
          title: 'Documentation Improvement Practice',
          duration: '15 minutes',
          overview: 'Students practice improving documentation.',
          steps: [
            { instruction: 'Find a project with incomplete or unclear documentation.', duration: '3 min' },
            { instruction: 'Identify one specific improvement: typo fix, clearer instructions, better examples.', duration: '3 min' },
            { instruction: 'Draft the improvement in a text editor.', duration: '5 min' },
            { instruction: 'Share with a partner: Is the improvement helpful?', duration: '4 min' },
          ],
          formativeAssessment: 'Did students identify a real improvement opportunity?',
          differentiation: { support: 'Provide a README with obvious errors to fix.', extension: 'Submit the documentation fix as a real PR.' },
        },
        {
          title: 'Writing Effective Bug Reports',
          duration: '15 minutes',
          overview: 'Students learn to write clear, actionable bug reports.',
          steps: [
            { instruction: 'Show example of a bad bug report: "It doesn\'t work. Fix it."', duration: '2 min' },
            { instruction: 'Introduce bug report template: Steps to reproduce, Expected behavior, Actual behavior, Environment.', duration: '4 min' },
            { instruction: 'Practice: Write a bug report for a hypothetical or real issue.', duration: '6 min' },
            { instruction: 'Peer review: Trade reports and evaluate clarity.', duration: '3 min' },
          ],
          formativeAssessment: 'Are bug reports complete and reproducible?',
          differentiation: { support: 'Fill-in-the-blank template.', extension: 'Attach screenshots, logs, or minimal reproducible examples.' },
        },
      ],
      materials: [
        'Documentation guidelines',
        'Bug report template'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose contribution type'], relevanceAndAuthenticity: ['Real projects need this help'], selfRegulation: ['Self-assess contribution quality'] },
        representation: { multipleFormats: ['Templates', 'Examples', 'Peer feedback'], vocabularySupport: ['Bug report terminology'], backgroundKnowledge: ['Review project exploration skills'] },
        actionExpression: { physicalOptions: ['Writing', 'Editing', 'Translating'], expressionOptions: ['Various contribution types'], executiveFunctionSupport: ['Bug report template', 'Documentation checklist'] },
      },
    }
  ],
  assessment: {
    formative: [
      'License quiz: Match licenses to their characteristics',
      'Project analysis: Document structure of an open source project',
      'Contribution attempt: Evidence of contribution process',
      'Community interaction: Professional communication demonstrated'
    ],
    summative: 'Make a meaningful contribution to an open source project and document the entire process: finding the project, understanding its needs, making the contribution, and interacting with the community. Reflect on what you learned.'
  },
  extensions: [
    'Start your own open source project',
    'Become a regular contributor to a project',
    'Help organize or attend an open source event',
    'Mentor other new contributors'
  ],
  realWorldConnections: [
    'Many employers value open source contributions on resumes',
    'Open source powers critical infrastructure worldwide',
    'Contributing builds real skills and professional networks',
    'Open source communities offer mentorship and learning opportunities'
  ]
};

const project4: Project = {
  id: 'project-4',
  title: 'Project 4: System Administration Basics',
  description: 'Learn to manage a Linux system: users, services, security, and maintenance.',
  difficulty: 'Advanced',
  duration: '4-5 weeks',
  gradeBand: '9-12',
  overview: 'Students take on the role of system administrator, learning to manage users, services, and security. This project builds practical skills for maintaining Linux systems in home, educational, or professional environments.',
  learningObjectives: [
    'Create and manage user accounts and groups',
    'Understand and work with systemd services',
    'Configure basic network settings',
    'Implement security best practices',
    'Set up backup strategies',
    'Troubleshoot common system issues'
  ],
  prerequisites: [
    'Completed Projects 1 and 2',
    'Comfortable with command line',
    'Understanding of file permissions'
  ],
  materials: {
    required: [
      'Linux system with sudo access',
      'Terminal',
      'Network access'
    ],
    optional: [
      'Second machine or VM for networking',
      'External drive for backups'
    ]
  },
  lessons: [
    {
      title: 'User and Group Management',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Create, modify, and delete user accounts',
        'Manage group membership',
        'Set up sudo access appropriately',
        'Understand /etc/passwd, /etc/shadow, /etc/group'
      ],
      conceptualUnderstanding: [
        'Multi-user systems need access controls',
        'Groups simplify permission management',
        'Sudo provides controlled administrative access',
        'User data is stored in system files'
      ],
      activities: [
        'Demo: Creating users with useradd',
        'Practice: Set up users and groups for a scenario',
        'Security: Configure sudo access safely',
        'Exploration: Examine user configuration files'
      ],
      detailedActivities: [
        {
          title: 'Creating and Managing Users',
          duration: '20 minutes',
          overview: 'Students learn to create and manage user accounts from the command line.',
          videoResources: [
            { title: 'Linux User Management Tutorial', url: 'https://www.youtube.com/watch?v=jwnvKOjmtEA', duration: '10 min', description: 'Complete guide to user management' },
          ],
          steps: [
            { instruction: 'Review why multi-user systems need user accounts.', duration: '2 min' },
            { instruction: 'Demonstrate: sudo useradd -m -s /bin/bash newuser', duration: '3 min', teacherNotes: '-m creates home directory, -s sets shell' },
            { instruction: 'Set password: sudo passwd newuser', duration: '2 min' },
            { instruction: 'Students create two test users with proper home directories.', duration: '5 min' },
            { instruction: 'Demonstrate usermod for modifications: usermod -aG groupname username', duration: '3 min' },
            { instruction: 'Demonstrate userdel for deletion: userdel -r username', duration: '2 min' },
            { instruction: 'Discuss: What happens to files when a user is deleted?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students create a user with home directory and appropriate shell?',
          differentiation: { support: 'Provide command templates.', extension: 'Create users with specific UIDs and home locations.' },
        },
        {
          title: 'Groups and Permissions',
          duration: '15 minutes',
          overview: 'Students learn how groups simplify permission management.',
          steps: [
            { instruction: 'Explain groups: Simplify managing access for multiple users.', duration: '2 min' },
            { instruction: 'Create a group: sudo groupadd projectteam', duration: '2 min' },
            { instruction: 'Add users to group: sudo usermod -aG projectteam user1', duration: '2 min' },
            { instruction: 'Create shared directory with group ownership and set permissions.', duration: '4 min' },
            { instruction: 'Test: Can group members access? Can non-members?', duration: '3 min' },
            { instruction: 'View groups: groups username, cat /etc/group', duration: '2 min' },
          ],
          formativeAssessment: 'Can students set up a shared folder accessible only to group members?',
          differentiation: { support: 'Step-by-step worksheet.', extension: 'Set up complex permission scenario with multiple groups.' },
        },
        {
          title: 'Sudo Access and Security',
          duration: '15 minutes',
          overview: 'Students configure sudo access safely.',
          steps: [
            { instruction: 'Review: sudo runs commands as root. Why is this dangerous?', duration: '2 min' },
            { instruction: 'Examine /etc/sudoers with sudo visudo.', duration: '3 min', teacherNotes: 'Never edit sudoers directly!' },
            { instruction: 'Add user to sudo group: sudo usermod -aG sudo username', duration: '2 min' },
            { instruction: 'Demonstrate limited sudo access for specific commands only.', duration: '4 min' },
            { instruction: 'Discuss best practices: Least privilege, audit logs.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students grant appropriate sudo access without giving full root?',
          differentiation: { support: 'Use sudo group membership only.', extension: 'Configure command-specific sudo rules.' },
        },
      ],
      materials: [
        'User management commands reference',
        'Scenario descriptions'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose scenario to implement'], relevanceAndAuthenticity: ['Real sysadmin skill'], selfRegulation: ['Verify user setup independently'] },
        representation: { multipleFormats: ['Demo', 'Reference card', 'Video'], vocabularySupport: ['User/group terminology'], backgroundKnowledge: ['Permissions from Project 2'] },
        actionExpression: { physicalOptions: ['Terminal commands'], expressionOptions: ['Document setup', 'Present solution'], executiveFunctionSupport: ['Command reference', 'Checklist'] },
      },
    },
    {
      title: 'Services and Systemd',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Understand what services/daemons are',
        'Use systemctl to manage services',
        'Read service status and logs',
        'Enable and disable services at boot'
      ],
      conceptualUnderstanding: [
        'Services run in the background to provide functionality',
        'Systemd is the init system on most modern Linux distros',
        'Logs help diagnose service problems',
        'Managing what starts at boot affects system performance and security'
      ],
      activities: [
        'Exploration: List running services',
        'Practice: Start, stop, and restart services',
        'Troubleshooting: Use journalctl to read logs',
        'Configuration: Enable/disable services'
      ],
      detailedActivities: [
        {
          title: 'Understanding Services and Daemons',
          duration: '15 minutes',
          overview: 'Students learn what services are and why they matter.',
          videoResources: [
            { title: 'Systemd Explained', url: 'https://www.youtube.com/watch?v=Kzpm-rGAXos', duration: '12 min', description: 'Comprehensive systemd tutorial' },
          ],
          steps: [
            { instruction: 'Define daemon: A background process that provides functionality.', duration: '2 min' },
            { instruction: 'Examples: web server (nginx), SSH server (sshd), database (mysql).', duration: '2 min' },
            { instruction: 'List running services: systemctl list-units --type=service', duration: '3 min' },
            { instruction: 'Discuss: Which services are running? What might they do?', duration: '3 min' },
            { instruction: 'Explain systemd: Modern init system, manages services.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain what a service is and list running services?',
          differentiation: { support: 'Provide service glossary.', extension: 'Research a specific daemon in depth.' },
        },
        {
          title: 'Managing Services with systemctl',
          duration: '20 minutes',
          overview: 'Students practice starting, stopping, and managing services.',
          steps: [
            { instruction: 'Check service status: systemctl status servicename', duration: '3 min' },
            { instruction: 'Start a service: sudo systemctl start servicename', duration: '3 min' },
            { instruction: 'Stop a service: sudo systemctl stop servicename', duration: '3 min' },
            { instruction: 'Restart a service: sudo systemctl restart servicename', duration: '2 min' },
            { instruction: 'Practice with a safe service: sshd or cups.', duration: '5 min', teacherNotes: 'Avoid stopping critical services!' },
            { instruction: 'Enable at boot: sudo systemctl enable servicename', duration: '2 min' },
            { instruction: 'Disable at boot: sudo systemctl disable servicename', duration: '2 min' },
          ],
          formativeAssessment: 'Can students start, stop, and check the status of a service?',
          differentiation: { support: 'Provide command reference card.', extension: 'Write a custom systemd service file.' },
        },
        {
          title: 'Reading Logs with journalctl',
          duration: '15 minutes',
          overview: 'Students learn to troubleshoot using system logs.',
          steps: [
            { instruction: 'View all logs: journalctl', duration: '2 min' },
            { instruction: 'View logs for specific service: journalctl -u servicename', duration: '3 min' },
            { instruction: 'View recent logs: journalctl -n 50 (last 50 lines)', duration: '2 min' },
            { instruction: 'Follow logs live: journalctl -f', duration: '2 min' },
            { instruction: 'Practice: Find error messages for a misconfigured service.', duration: '4 min' },
            { instruction: 'Discuss: How do logs help troubleshoot problems?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students find relevant log entries for a service problem?',
          differentiation: { support: 'Highlight key journalctl options.', extension: 'Filter logs by time range and priority.' },
        },
      ],
      materials: [
        'Systemd commands reference',
        'Log analysis guide'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose service to manage'], relevanceAndAuthenticity: ['Server management skill'], selfRegulation: ['Self-diagnose service issues'] },
        representation: { multipleFormats: ['Demo', 'Reference', 'Video'], vocabularySupport: ['Service terminology'], backgroundKnowledge: ['Process concept from OS'] },
        actionExpression: { physicalOptions: ['Terminal practice'], expressionOptions: ['Troubleshooting documentation'], executiveFunctionSupport: ['Command checklist'] },
      },
    },
    {
      title: 'Network Configuration',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'View network configuration',
        'Understand IP addressing and DNS',
        'Configure static IP addresses',
        'Troubleshoot network connectivity'
      ],
      conceptualUnderstanding: [
        'Network configuration determines how machines communicate',
        'IP addresses identify devices on a network',
        'DNS translates domain names to IP addresses',
        'Network tools help diagnose connectivity issues'
      ],
      activities: [
        'Exploration: ip, nmcli, and network configuration',
        'Configuration: Set a static IP',
        'Troubleshooting: Use ping, traceroute, and dig',
        'Practice: Fix a network problem scenario'
      ],
      detailedActivities: [
        {
          title: 'Viewing Network Configuration',
          duration: '15 minutes',
          overview: 'Students learn to examine current network settings.',
          steps: [
            { instruction: 'View IP addresses: ip addr (or ip a)', duration: '3 min' },
            { instruction: 'View routing table: ip route', duration: '2 min' },
            { instruction: 'View DNS settings: cat /etc/resolv.conf', duration: '2 min' },
            { instruction: 'Use hostname -I to see IP addresses quickly.', duration: '2 min' },
            { instruction: 'Discuss: What information does each command provide?', duration: '3 min' },
            { instruction: 'Introduction to nmcli for NetworkManager.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students find their IP address and default gateway?',
          differentiation: { support: 'Annotated output examples.', extension: 'Compare ip and ifconfig (legacy) output.' },
        },
        {
          title: 'Network Troubleshooting Tools',
          duration: '20 minutes',
          overview: 'Students learn essential network diagnostic tools.',
          videoResources: [
            { title: 'Linux Network Troubleshooting', url: 'https://www.youtube.com/watch?v=PS1RIR2aAa4', duration: '8 min', description: 'Network diagnostic commands' },
          ],
          steps: [
            { instruction: 'Introduce ping: Test connectivity to a host.', duration: '3 min' },
            { instruction: 'Practice: ping google.com, ping local router.', duration: '3 min' },
            { instruction: 'Introduce traceroute: See the path packets take.', duration: '3 min' },
            { instruction: 'Practice: traceroute google.com', duration: '3 min' },
            { instruction: 'Introduce dig/nslookup: DNS lookups.', duration: '3 min' },
            { instruction: 'Troubleshooting scenario: Diagnose a connectivity issue.', duration: '5 min', teacherNotes: 'Is it DNS? Gateway? Interface?' },
          ],
          formativeAssessment: 'Can students systematically diagnose where a network problem exists?',
          differentiation: { support: 'Troubleshooting flowchart.', extension: 'Use tcpdump or wireshark for packet analysis.' },
        },
        {
          title: 'Static IP Configuration',
          duration: '15 minutes',
          overview: 'Students configure a static IP address.',
          steps: [
            { instruction: 'Discuss: When do you need static vs DHCP?', duration: '2 min' },
            { instruction: 'Show nmcli method: nmcli con mod "Connection" ipv4.addresses IP/CIDR', duration: '4 min' },
            { instruction: 'Set gateway and DNS: nmcli con mod "Connection" ipv4.gateway GATEWAY', duration: '3 min' },
            { instruction: 'Change method to manual: nmcli con mod "Connection" ipv4.method manual', duration: '2 min' },
            { instruction: 'Apply and test: nmcli con up "Connection"', duration: '3 min' },
            { instruction: 'Verify with ip addr and ping.', duration: '1 min' },
          ],
          formativeAssessment: 'Can students configure and verify a static IP address?',
          differentiation: { support: 'Pre-written commands to adapt.', extension: 'Configure using netplan (Ubuntu) or /etc/network/interfaces.' },
        },
      ],
      materials: [
        'Network commands reference',
        'Network diagram'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose troubleshooting scenario'], relevanceAndAuthenticity: ['Real network skills'], selfRegulation: ['Systematic diagnosis approach'] },
        representation: { multipleFormats: ['Demo', 'Diagrams', 'Reference'], vocabularySupport: ['IP, DNS, gateway terminology'], backgroundKnowledge: ['Basic networking concepts'] },
        actionExpression: { physicalOptions: ['Terminal practice'], expressionOptions: ['Troubleshooting documentation'], executiveFunctionSupport: ['Diagnostic flowchart'] },
      },
    },
    {
      title: 'Security Fundamentals',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Keep systems updated',
        'Configure basic firewall rules',
        'Understand SSH security',
        'Review security logs'
      ],
      conceptualUnderstanding: [
        'Updates patch security vulnerabilities',
        'Firewalls control network access',
        'SSH keys are more secure than passwords',
        'Logs reveal security incidents'
      ],
      activities: [
        'Practice: Update system packages',
        'Configuration: Set up ufw firewall rules',
        'Security: Configure SSH key authentication',
        'Analysis: Review auth.log for issues'
      ],
      detailedActivities: [
        {
          title: 'System Updates',
          duration: '15 minutes',
          overview: 'Students learn the importance of keeping systems updated.',
          steps: [
            { instruction: 'Discuss: Why are updates important? What do they fix?', duration: '2 min' },
            { instruction: 'Update package lists: sudo apt update', duration: '2 min' },
            { instruction: 'View available upgrades: apt list --upgradable', duration: '2 min' },
            { instruction: 'Perform upgrade: sudo apt upgrade', duration: '5 min' },
            { instruction: 'Discuss: Security updates vs feature updates.', duration: '2 min' },
            { instruction: 'Automate updates: unattended-upgrades package.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students update a system and explain why it matters?',
          differentiation: { support: 'Command cheat sheet.', extension: 'Configure automatic security updates.' },
        },
        {
          title: 'Firewall Configuration with UFW',
          duration: '20 minutes',
          overview: 'Students configure basic firewall rules.',
          videoResources: [
            { title: 'UFW Firewall Tutorial', url: 'https://www.youtube.com/watch?v=XtRXm2kEaPw', duration: '8 min', description: 'Practical UFW guide' },
          ],
          steps: [
            { instruction: 'Explain firewalls: Control what network traffic is allowed.', duration: '2 min' },
            { instruction: 'Check status: sudo ufw status', duration: '2 min' },
            { instruction: 'Enable UFW: sudo ufw enable (careful - can lock you out!)', duration: '2 min', teacherNotes: 'Allow SSH first if working remotely!' },
            { instruction: 'Allow a service: sudo ufw allow ssh', duration: '3 min' },
            { instruction: 'Deny a port: sudo ufw deny 23', duration: '2 min' },
            { instruction: 'View rules: sudo ufw status numbered', duration: '2 min' },
            { instruction: 'Practice: Set up rules for a web server scenario.', duration: '5 min' },
          ],
          formativeAssessment: 'Can students configure firewall rules for a given scenario?',
          differentiation: { support: 'Provide rule templates.', extension: 'Use iptables directly for advanced rules.' },
        },
        {
          title: 'SSH Key Authentication',
          duration: '15 minutes',
          overview: 'Students set up passwordless SSH with keys.',
          steps: [
            { instruction: 'Generate key pair: ssh-keygen -t ed25519', duration: '3 min' },
            { instruction: 'Explain public vs private keys.', duration: '2 min' },
            { instruction: 'Copy public key: ssh-copy-id user@server', duration: '3 min' },
            { instruction: 'Test passwordless login.', duration: '2 min' },
            { instruction: 'Discuss: Why are keys more secure than passwords?', duration: '3 min' },
            { instruction: 'Bonus: Disable password auth in sshd_config.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students set up SSH key authentication?',
          differentiation: { support: 'Step-by-step guide.', extension: 'Set up SSH agent for key management.' },
        },
      ],
      materials: [
        'Security checklist',
        'Firewall commands reference'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Choose security measures'], relevanceAndAuthenticity: ['Real security skills'], selfRegulation: ['Security checklist'] },
        representation: { multipleFormats: ['Demo', 'Reference', 'Video'], vocabularySupport: ['Security terminology'], backgroundKnowledge: ['Permissions and networking'] },
        actionExpression: { physicalOptions: ['Terminal practice'], expressionOptions: ['Security audit documentation'], executiveFunctionSupport: ['Security checklist'] },
      },
    },
    {
      title: 'Backup and Recovery',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Design a backup strategy',
        'Use rsync for backups',
        'Automate backups with cron',
        'Practice recovery procedures'
      ],
      conceptualUnderstanding: [
        'Backups protect against data loss',
        'Different backup strategies suit different needs',
        'Automation ensures backups happen consistently',
        'Testing recovery is as important as making backups'
      ],
      activities: [
        'Planning: Design backup strategy for a scenario',
        'Hands-on: Use rsync for incremental backups',
        'Automation: Schedule backups with cron',
        'Testing: Practice restoring from backup'
      ],
      detailedActivities: [
        {
          title: 'Designing a Backup Strategy',
          duration: '15 minutes',
          overview: 'Students learn to plan backups for different scenarios.',
          steps: [
            { instruction: 'Discuss: What could cause data loss? Hardware failure, ransomware, human error.', duration: '3 min' },
            { instruction: 'Introduce 3-2-1 rule: 3 copies, 2 media types, 1 offsite.', duration: '3 min' },
            { instruction: 'Compare full vs incremental vs differential backups.', duration: '4 min' },
            { instruction: 'Planning exercise: Design backup strategy for a small business.', duration: '5 min' },
          ],
          formativeAssessment: 'Can students design a backup strategy for a given scenario?',
          differentiation: { support: 'Backup strategy template.', extension: 'Research cloud backup solutions.' },
        },
        {
          title: 'Using rsync for Backups',
          duration: '20 minutes',
          overview: 'Students learn to use rsync for efficient file synchronization.',
          videoResources: [
            { title: 'rsync Tutorial', url: 'https://www.youtube.com/watch?v=qE77MbDnljA', duration: '10 min', description: 'Complete rsync guide' },
          ],
          steps: [
            { instruction: 'Introduce rsync: Fast, incremental file transfer.', duration: '2 min' },
            { instruction: 'Basic syntax: rsync -av source/ destination/', duration: '3 min' },
            { instruction: 'Practice: Sync a folder to a backup location.', duration: '4 min' },
            { instruction: 'Explain options: -a (archive), -v (verbose), --delete (mirror).', duration: '3 min', teacherNotes: '--delete removes files from dest if not in source!' },
            { instruction: 'Remote backups: rsync -av source/ user@server:destination/', duration: '4 min' },
            { instruction: 'Dry run: rsync -avn to preview without executing.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students set up an rsync backup for a directory?',
          differentiation: { support: 'Provide working rsync commands.', extension: 'Set up rsync over SSH with key auth.' },
        },
        {
          title: 'Automating with cron',
          duration: '15 minutes',
          overview: 'Students schedule automatic backups using cron.',
          steps: [
            { instruction: 'Introduce cron: Scheduler for recurring tasks.', duration: '2 min' },
            { instruction: 'Explain cron syntax: minute hour day month weekday command.', duration: '4 min' },
            { instruction: 'Edit crontab: crontab -e', duration: '2 min' },
            { instruction: 'Add backup job: 0 2 * * * rsync -a /data /backup/', duration: '3 min', teacherNotes: 'This runs at 2 AM daily.' },
            { instruction: 'Verify: crontab -l', duration: '2 min' },
            { instruction: 'Discuss: What time should backups run? How often?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students create a cron job for scheduled backups?',
          differentiation: { support: 'Cron syntax cheat sheet.', extension: 'Create backup rotation with dated folders.' },
        },
        {
          title: 'Testing Recovery',
          duration: '10 minutes',
          overview: 'Students practice restoring from backups.',
          steps: [
            { instruction: 'Key concept: Untested backup is not a backup!', duration: '1 min' },
            { instruction: 'Delete test files (in safe location).', duration: '2 min' },
            { instruction: 'Restore from backup using rsync.', duration: '3 min' },
            { instruction: 'Verify files are correctly restored.', duration: '2 min' },
            { instruction: 'Discuss: How often should you test restores?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students successfully restore files from their backup?',
          differentiation: { support: 'Guided restore steps.', extension: 'Test recovery time and document RTO/RPO.' },
        },
      ],
      materials: [
        'Rsync reference',
        'Cron syntax guide',
        'Backup planning worksheet'
      ],
      udl: {
        engagement: { choiceAndAutonomy: ['Design own backup strategy'], relevanceAndAuthenticity: ['Protect real data'], selfRegulation: ['Test and verify backups'] },
        representation: { multipleFormats: ['Demo', 'Reference', 'Video'], vocabularySupport: ['Backup terminology'], backgroundKnowledge: ['File system and scheduling'] },
        actionExpression: { physicalOptions: ['Terminal practice'], expressionOptions: ['Backup documentation'], executiveFunctionSupport: ['Backup checklist'] },
      },
    }
  ],
  assessment: {
    formative: [
      'User setup: Correctly configured users and permissions',
      'Service management: Start and troubleshoot a service',
      'Network configuration: Working static IP setup',
      'Security audit: Complete security checklist'
    ],
    summative: 'Set up and document a complete Linux server: create appropriate users, configure services, secure the system with firewall and SSH keys, and implement automated backups. Present the system to the class, demonstrating each component.'
  },
  extensions: [
    'Set up a home server for real use',
    'Explore containerization with Docker',
    'Learn configuration management (Ansible)',
    'Pursue Linux certification (Linux+, RHCSA)'
  ],
  realWorldConnections: [
    'Sysadmin skills are in high demand',
    'These skills apply to cloud servers (AWS, GCP, Azure)',
    'Home servers can replace cloud services for privacy',
    'Understanding systems helps with any technical career'
  ]
};

// Projects array
const projects: Project[] = [project1, project2, project3, project4];

// Main Page Component
export default function LinuxFOSSPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get('project');

  const getInitialProject = () => {
    if (projectParam) {
      const projectNum = parseInt(projectParam);
      if (projectNum >= 1 && projectNum <= 4) {
        return `project-${projectNum}`;
      }
    }
    return projects.length > 0 ? projects[0].id : null;
  };

  const [expandedProject, setExpandedProject] = React.useState<string | null>(getInitialProject());

  React.useEffect(() => {
    if (projectParam) {
      const projectNum = parseInt(projectParam);
      if (projectNum >= 1 && projectNum <= 4) {
        const projectId = `project-${projectNum}`;
        setExpandedProject(projectId);
        setTimeout(() => {
          const element = document.getElementById(projectId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [projectParam]);

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      {/* Header */}
      <div className="bg-zinc-950 border-b border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center text-sm text-zinc-500 hover:text-green-400 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Tracks
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-600 to-green-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-green-200/80 text-sm font-medium">Track E</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Linux & FOSS Foundations</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Discover the power of open source software and Linux. Learn to use, customize, and
            contribute to the tools that power most of the internet.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <CorePrinciple />

        {/* Projects */}
        {projects.length > 0 ? (
          <div className="space-y-6">
            {projects.map((project) => (
              <ProjectSection
                key={project.id}
                project={project}
                isExpanded={expandedProject === project.id}
                onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-zinc-500">
            <p>Curriculum content coming soon...</p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="bg-zinc-950 border-t border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between">
          <Link
            href={`/${locale}/tech-sovereignty/app-dev`}
            className="text-zinc-500 hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: App Development
          </Link>
          <Link
            href={`/${locale}/tech-sovereignty/digital-rights`}
            className="text-zinc-500 hover:text-green-400 transition-colors flex items-center gap-1"
          >
            Next: Digital Rights
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
