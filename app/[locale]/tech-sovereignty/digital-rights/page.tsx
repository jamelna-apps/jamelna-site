'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-zinc-800 border border-amber-500/30 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Core Pedagogical Principle: Rights Through Knowledge</h3>
        <p className="text-zinc-300 mb-3">
          Understanding digital rights isn&apos;t just about protecting yourself—it&apos;s about <strong className="text-white">informed citizenship</strong>
          in a digital age. Students learn to critically evaluate technology&apos;s impact on <strong className="text-white">privacy</strong>,
          <strong className="text-white"> freedom</strong>, and <strong className="text-white">democracy</strong>.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-amber-300 mb-1">Know Your Rights</h4>
            <p className="text-sm text-zinc-500">Understand what rights you have in digital spaces and how laws protect (or fail to protect) them.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-amber-300 mb-1">Question Technology</h4>
            <p className="text-sm text-zinc-500">Develop critical thinking about how technology affects individuals and society.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-amber-300 mb-1">Take Action</h4>
            <p className="text-sm text-zinc-500">Learn effective ways to advocate for digital rights in your community and beyond.</p>
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
    <div className="bg-zinc-950 border border-amber-500/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-amber-300">Universal Design for Learning (UDL) Supports</span>
        </div>
        <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="p-4 border-t border-zinc-700 grid md:grid-cols-3 gap-4">
          <div>
            <h5 className="font-medium text-amber-300 mb-2">Engagement</h5>
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
            <h5 className="font-medium text-amber-300 mb-2">Representation</h5>
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
            <h5 className="font-medium text-amber-300 mb-2">Action & Expression</h5>
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
          <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center text-amber-400 text-xs font-bold">
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
          {activity.videoResources && activity.videoResources.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-red-300 mb-2">Video Resources</h6>
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
          <div className="space-y-2">
            <h6 className="text-xs font-semibold text-amber-300">Step-by-Step Instructions</h6>
            {activity.steps.map((step, i) => (
              <div key={i} className="bg-zinc-900 rounded p-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs text-amber-400 font-bold">{i + 1}.</span>
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
          {activity.formativeAssessment && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-amber-300 mb-1">Check for Understanding</h6>
              <p className="text-xs text-amber-300">{activity.formativeAssessment}</p>
            </div>
          )}
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
          <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center text-amber-400 font-bold text-sm">
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
            <h5 className="font-medium text-amber-300 mb-2">Learning Objectives</h5>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-amber-300 mb-2">Conceptual Understanding</h5>
            <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
              {lesson.conceptualUnderstanding.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </div>
          {lesson.detailedActivities && lesson.detailedActivities.length > 0 ? (
            <div>
              <h5 className="font-medium text-amber-300 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <h5 className="font-medium text-amber-300 mb-2">Activities</h5>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                {lesson.activities.map((activity, i) => <li key={i}>{activity}</li>)}
              </ul>
            </div>
          )}
          <div>
            <h5 className="font-medium text-amber-300 mb-2">Materials</h5>
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
                  <svg className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <h5 className="font-medium text-amber-300 mb-2">Required Materials</h5>
              <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                {project.materials.required.map((m, i) => <li key={i}>{m}</li>)}
              </ul>
            </div>
            <div className="bg-zinc-950 rounded-lg p-4">
              <h5 className="font-medium text-amber-300 mb-2">Optional Materials</h5>
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
                <h5 className="font-medium text-amber-300 mb-2">Formative Assessment</h5>
                <ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">
                  {project.assessment.formative.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-amber-300 mb-2">Summative Assessment</h5>
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
  title: 'Project 1: Understanding Digital Privacy',
  description: 'Learn what personal data is, who collects it, and how to protect yourself online.',
  difficulty: 'Beginner',
  duration: '3-4 weeks',
  gradeBand: '6-12',
  overview: 'Students explore the landscape of personal data collection, understanding what information is gathered about them, how it is used, and what tools and strategies can help protect their privacy. This project builds awareness and practical skills for navigating the digital world.',
  learningObjectives: [
    'Identify types of personal data collected online',
    'Understand how tracking technologies work',
    'Evaluate privacy settings on common platforms',
    'Use basic privacy protection tools',
    'Create a personal privacy plan',
    'Articulate why privacy matters for individuals and society'
  ],
  prerequisites: [
    'Basic internet usage',
    'Email account'
  ],
  materials: {
    required: [
      'Computer with internet access',
      'Web browser',
      'Access to privacy-focused tools (browser extensions, etc.)'
    ],
    optional: [
      'Smartphone for mobile privacy exploration',
      'Multiple browsers for comparison'
    ]
  },
  lessons: [
    {
      title: 'What is Personal Data?',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Define personal data and personally identifiable information (PII)',
        'Categorize different types of data (provided, observed, inferred)',
        'Understand why personal data has value',
        'Identify data they create through daily activities'
      ],
      conceptualUnderstanding: [
        'Personal data includes any information that can identify or relate to a person',
        'We generate data constantly—through purchases, browsing, location, and more',
        'Data has economic value, which is why companies collect it',
        'Aggregated data can reveal more than individual pieces alone'
      ],
      activities: [
        'Brainstorm: What data do you create in a typical day?',
        'Categorization: Sort examples into data types',
        'Case study: How companies use personal data',
        'Reflection: What surprised you about data collection?'
      ],
      detailedActivities: [
        {
          title: 'Brainstorm: Your Data Day',
          duration: '12 minutes',
          overview: 'Students discover how much personal data they create through everyday activities.',
          videoResources: [
            { title: 'What is Personal Data?', url: 'https://www.youtube.com/watch?v=4MI3sCvmjhM', duration: '4 min', description: 'Clear explanation of personal data types' },
          ],
          steps: [
            { instruction: 'Ask students to close their eyes and think through their morning routine.', duration: '1 min' },
            { instruction: 'Walk through: "You wake up, check your phone. What data is created? GPS location, app usage, messages..."', duration: '3 min' },
            { instruction: 'Students list every piece of data they might have created since waking up.', duration: '4 min' },
            { instruction: 'Share findings as a class. Add overlooked items (Wi-Fi connections, payment data, etc.).', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify at least 10 types of data they create daily?',
          differentiation: { support: 'Provide a sample daily schedule with data points highlighted.', extension: 'Track actual data creation for 24 hours and report back.' },
        },
        {
          title: 'Data Type Categorization',
          duration: '15 minutes',
          overview: 'Students sort data examples into three categories: provided, observed, and inferred.',
          steps: [
            { instruction: 'Introduce three categories: Provided (you gave it), Observed (collected automatically), Inferred (derived from patterns).', duration: '3 min' },
            { instruction: 'Examples: Provided = name on form. Observed = location tracking. Inferred = predicted interests.', duration: '2 min' },
            { instruction: 'Distribute sorting cards. Groups categorize 15-20 data examples.', duration: '6 min' },
            { instruction: 'Review answers. Discuss ambiguous cases (is search history observed or provided?).', duration: '4 min' },
          ],
          formativeAssessment: 'Can students correctly categorize data types?',
          differentiation: { support: 'Color-coded cards with category hints.', extension: 'Create their own examples for each category.' },
        },
        {
          title: 'Case Study: Data in Action',
          duration: '15 minutes',
          overview: 'Students analyze real examples of how companies use personal data.',
          steps: [
            { instruction: 'Present case study options: targeted advertising, price discrimination, recommendation systems.', duration: '2 min' },
            { instruction: 'Groups read their assigned case study (or choose one).', duration: '5 min' },
            { instruction: 'Groups answer: What data is collected? How is it used? Who benefits?', duration: '5 min' },
            { instruction: 'Brief share-out from each group.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain the data flow in their case study?',
          differentiation: { support: 'Provide guided questions for case analysis.', extension: 'Research and find additional case studies.' },
        },
      ],
      materials: [
        'Data type sorting activity',
        'Case study handouts'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose which case study to analyze'],
          relevanceAndAuthenticity: ['Connect to services students actually use'],
          selfRegulation: ['Privacy journal throughout unit']
        },
        representation: {
          multipleFormats: ['Visual diagrams', 'Written examples', 'Video explainers'],
          vocabularySupport: ['Privacy terminology glossary'],
          backgroundKnowledge: ['Review of how websites work']
        },
        actionExpression: {
          physicalOptions: ['Discussion', 'Written reflection', 'Visual mapping'],
          expressionOptions: ['Create infographic', 'Write summary', 'Present findings'],
          executiveFunctionSupport: ['Lesson outline', 'Clear objectives']
        }
      }
    },
    {
      title: 'Tracking Technologies Explained',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Explain how cookies work',
        'Understand browser fingerprinting',
        'Identify tracking pixels and web beacons',
        'See tracking in action using browser tools'
      ],
      conceptualUnderstanding: [
        'Cookies are small files websites store on your device',
        'Third-party cookies enable cross-site tracking',
        'Fingerprinting identifies you without cookies by analyzing browser characteristics',
        'Tracking is often invisible but can be revealed with the right tools'
      ],
      activities: [
        'Demo: View cookies in browser developer tools',
        'Experiment: Visit sites and observe tracking',
        'Test: Check your browser fingerprint uniqueness',
        'Discussion: Is all tracking bad? What are legitimate uses?'
      ],
      detailedActivities: [
        {
          title: 'Viewing Cookies in Developer Tools',
          duration: '12 minutes',
          overview: 'Students use browser developer tools to see cookies in action.',
          videoResources: [
            { title: 'How Cookies Track You', url: 'https://www.youtube.com/watch?v=I01XMRo2ESg', duration: '5 min', description: 'Visual explanation of cookie tracking' },
          ],
          steps: [
            { instruction: 'Open browser developer tools (F12 or right-click > Inspect).', duration: '2 min' },
            { instruction: 'Navigate to Application/Storage tab and find Cookies section.', duration: '2 min' },
            { instruction: 'Visit a news site. Count how many cookies are created.', duration: '3 min', teacherNotes: 'Popular news sites often have 50+ cookies.' },
            { instruction: 'Identify first-party vs third-party cookies by domain.', duration: '3 min' },
            { instruction: 'Delete cookies and refresh - observe them return.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students find and identify cookies in developer tools?',
          differentiation: { support: 'Provide step-by-step guide with screenshots.', extension: 'Decode cookie contents and explain what they store.' },
        },
        {
          title: 'Browser Fingerprint Test',
          duration: '15 minutes',
          overview: 'Students test how unique their browser fingerprint is.',
          steps: [
            { instruction: 'Explain fingerprinting: Identifying you by browser characteristics, no cookies needed.', duration: '3 min' },
            { instruction: 'Visit EFF\'s Cover Your Tracks (coveryourtracks.eff.org).', duration: '2 min' },
            { instruction: 'Run the test and view results. How unique is your fingerprint?', duration: '4 min' },
            { instruction: 'Discuss what factors make fingerprints unique: fonts, plugins, screen size, etc.', duration: '3 min' },
            { instruction: 'Compare results with classmates. Are any fingerprints the same?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain what browser fingerprinting is?',
          differentiation: { support: 'Pre-run test and show example results.', extension: 'Research fingerprint resistance techniques.' },
        },
        {
          title: 'Discussion: Is Tracking Always Bad?',
          duration: '10 minutes',
          overview: 'Students discuss legitimate uses of tracking and ethical considerations.',
          steps: [
            { instruction: 'Present scenario: "A website remembers your shopping cart. Is that bad?"', duration: '2 min' },
            { instruction: 'List examples of helpful tracking: login sessions, preferences, fraud prevention.', duration: '3 min' },
            { instruction: 'Think-Pair-Share: When is tracking helpful vs harmful?', duration: '3 min' },
            { instruction: 'Introduce consent: Should you have a choice?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students articulate both benefits and concerns about tracking?',
          differentiation: { support: 'Provide scenario cards for discussion.', extension: 'Research GDPR consent requirements.' },
        },
      ],
      materials: [
        'Browser with developer tools',
        'EFF Cover Your Tracks tool',
        'Cookie viewing extension'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose websites to investigate'],
          relevanceAndAuthenticity: ['Analyze sites they actually visit'],
          selfRegulation: ['Track what they discover']
        },
        representation: {
          multipleFormats: ['Live demo', 'Written explanation', 'Interactive tools'],
          vocabularySupport: ['Cookie, fingerprint, tracker definitions'],
          backgroundKnowledge: ['How web requests work']
        },
        actionExpression: {
          physicalOptions: ['Hands-on exploration', 'Observation', 'Note-taking'],
          expressionOptions: ['Document findings', 'Create diagram', 'Explain to partner'],
          executiveFunctionSupport: ['Exploration checklist']
        }
      }
    },
    {
      title: 'Privacy Settings Deep Dive',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Navigate privacy settings on major platforms',
        'Understand what each setting controls',
        'Make informed choices about privacy/convenience tradeoffs',
        'Enable meaningful privacy protections'
      ],
      conceptualUnderstanding: [
        'Default settings often favor data collection over privacy',
        'Settings can be complex and change frequently',
        'Some privacy features require sacrificing convenience',
        'Privacy settings vary significantly between platforms'
      ],
      activities: [
        'Guided tour: Walk through Google privacy settings',
        'Exploration: Examine settings on platforms you use',
        'Comparison: How do different platforms approach privacy?',
        'Action: Adjust settings based on your preferences'
      ],
      detailedActivities: [
        {
          title: 'Google Privacy Settings Tour',
          duration: '20 minutes',
          overview: 'Students explore the extensive privacy settings in their Google accounts.',
          videoResources: [
            { title: 'Google Privacy Settings Guide', url: 'https://www.youtube.com/watch?v=NesTWiKfpD0', duration: '6 min', description: 'Step-by-step Google privacy walkthrough' },
          ],
          steps: [
            { instruction: 'Navigate to myaccount.google.com > Data & privacy.', duration: '2 min' },
            { instruction: 'Explore Web & App Activity. Discuss what Google tracks.', duration: '4 min', teacherNotes: 'Show the Activity Controls page - this is eye-opening for students.' },
            { instruction: 'Examine Location History. Is it enabled? What has been tracked?', duration: '4 min' },
            { instruction: 'View YouTube History settings.', duration: '3 min' },
            { instruction: 'Check Ad personalization settings.', duration: '3 min' },
            { instruction: 'Optional: Download your Google data (takeout.google.com) to see everything.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students navigate to and explain three privacy settings?',
          differentiation: { support: 'Provide checklist with direct links.', extension: 'Compare Google settings to Apple/Microsoft equivalents.' },
        },
        {
          title: 'Platform Comparison',
          duration: '15 minutes',
          overview: 'Students compare privacy settings across different platforms.',
          steps: [
            { instruction: 'Assign groups to different platforms: Instagram, TikTok, Discord, etc.', duration: '2 min' },
            { instruction: 'Groups find and document privacy settings available.', duration: '6 min' },
            { instruction: 'Compare: Which platform has more/fewer options? Which is easiest to understand?', duration: '4 min' },
            { instruction: 'Share findings with class.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain how privacy settings differ across platforms?',
          differentiation: { support: 'Assign simpler platforms like email.', extension: 'Create a comparison chart and recommend improvements.' },
        },
        {
          title: 'Action: Adjust Your Settings',
          duration: '15 minutes',
          overview: 'Students make informed decisions about their own privacy settings.',
          steps: [
            { instruction: 'Review the settings you explored. Which do you want to change?', duration: '3 min' },
            { instruction: 'Make changes based on your personal preferences (no requirement to change).', duration: '7 min', teacherNotes: 'Respect that some students may not want to change settings. Emphasize choice.' },
            { instruction: 'Document what you changed and why.', duration: '3 min' },
            { instruction: 'Reflection: What was surprising? What was difficult?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students articulate why they made or did not make changes?',
          differentiation: { support: 'Focus on just one platform.', extension: 'Help family members adjust their settings.' },
        },
      ],
      materials: [
        'Accounts on platforms to review',
        'Privacy settings checklist'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose which platforms to focus on'],
          relevanceAndAuthenticity: ['Configure their actual accounts'],
          selfRegulation: ['Privacy settings before/after comparison']
        },
        representation: {
          multipleFormats: ['Step-by-step guides', 'Screenshots', 'Video walkthroughs'],
          vocabularySupport: ['Setting terminology explained'],
          backgroundKnowledge: ['Review of how platforms use data']
        },
        actionExpression: {
          physicalOptions: ['Individual work', 'Pair exploration'],
          expressionOptions: ['Create settings guide', 'Screenshot documentation'],
          executiveFunctionSupport: ['Platform-specific checklists']
        }
      }
    },
    {
      title: 'Privacy Protection Tools',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Identify categories of privacy tools',
        'Install and configure a privacy-focused browser extension',
        'Understand VPNs and when to use them',
        'Evaluate the effectiveness of different tools'
      ],
      conceptualUnderstanding: [
        'No single tool provides complete privacy',
        'Tools work at different layers (browser, network, encryption)',
        'Some tools have tradeoffs (speed, compatibility)',
        'Threat model determines which tools are appropriate'
      ],
      activities: [
        'Overview: Categories of privacy tools',
        'Hands-on: Install and test a tracker blocker',
        'Discussion: VPNs—what they do and don\'t protect',
        'Evaluation: Compare before and after tracker blocking'
      ],
      detailedActivities: [
        {
          title: 'Categories of Privacy Tools',
          duration: '10 minutes',
          overview: 'Students learn about different types of privacy protection tools.',
          steps: [
            { instruction: 'Present tool categories: Browser extensions, VPNs, Encrypted messaging, Privacy browsers.', duration: '3 min' },
            { instruction: 'Explain what each category protects: Extensions block trackers, VPNs hide IP, etc.', duration: '4 min' },
            { instruction: 'Discuss: No single tool protects everything. You need multiple layers.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students name a tool for each category?',
          differentiation: { support: 'Visual chart of tool categories.', extension: 'Research advanced tools like Tor.' },
        },
        {
          title: 'Install a Tracker Blocker',
          duration: '20 minutes',
          overview: 'Students install and configure a browser extension to block tracking.',
          videoResources: [
            { title: 'uBlock Origin Tutorial', url: 'https://www.youtube.com/watch?v=2lisQQmWQkY', duration: '5 min', description: 'How to install and use uBlock Origin' },
          ],
          steps: [
            { instruction: 'Navigate to browser extension store (Chrome Web Store, Firefox Add-ons).', duration: '2 min' },
            { instruction: 'Search for and install uBlock Origin (open source, trusted).', duration: '3 min', teacherNotes: 'Explain why uBlock Origin is recommended over other blockers.' },
            { instruction: 'Visit a website and see what uBlock blocked.', duration: '3 min' },
            { instruction: 'Explore the popup dashboard: blocked requests, domains.', duration: '4 min' },
            { instruction: 'Test: Visit a tracker-heavy site before and after enabling.', duration: '5 min' },
            { instruction: 'Discuss: What happens if a site breaks? Whitelist feature.', duration: '3 min' },
          ],
          formativeAssessment: 'Did students successfully install and use the extension?',
          differentiation: { support: 'Step-by-step screenshot guide.', extension: 'Configure advanced blocking rules.' },
        },
        {
          title: 'VPN Demonstration and Discussion',
          duration: '15 minutes',
          overview: 'Students understand what VPNs do and when to use them.',
          steps: [
            { instruction: 'Explain VPN basics: Creates encrypted tunnel, hides IP address.', duration: '3 min' },
            { instruction: 'Demonstrate: Show IP address before and after VPN (use whatismyip.com).', duration: '3 min' },
            { instruction: 'Discuss limitations: VPN provider sees traffic, does not protect from everything.', duration: '3 min' },
            { instruction: 'When to use VPN: Public Wi-Fi, region restrictions, hiding from ISP.', duration: '3 min' },
            { instruction: 'Warning: Free VPNs often sell your data. Discuss trustworthy options.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain what a VPN does and does not protect?',
          differentiation: { support: 'VPN analogy (secure mail envelope).', extension: 'Compare VPN protocols and providers.' },
        },
      ],
      materials: [
        'Recommended privacy extensions list',
        'VPN explanation materials',
        'Testing tools'
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose which tools to try'],
          relevanceAndAuthenticity: ['Install on their actual devices'],
          selfRegulation: ['Document tool effectiveness']
        },
        representation: {
          multipleFormats: ['Installation guides', 'Video tutorials', 'Comparison charts'],
          vocabularySupport: ['VPN, encryption, blocking terms'],
          backgroundKnowledge: ['How network traffic works']
        },
        actionExpression: {
          physicalOptions: ['Hands-on installation', 'Observation demo'],
          expressionOptions: ['Write tool review', 'Create comparison', 'Present findings'],
          executiveFunctionSupport: ['Step-by-step installation guides']
        }
      }
    }
  ],
  assessment: {
    formative: [
      'Data inventory: Comprehensive list of personal data they generate',
      'Tracking observation: Document tracking found on specific sites',
      'Settings audit: Evidence of reviewing and adjusting privacy settings',
      'Tool testing: Results of privacy tool effectiveness tests'
    ],
    summative: 'Create a comprehensive Personal Privacy Plan that includes: data inventory, threat assessment, privacy goals, specific actions taken (settings changed, tools installed), and reflection on tradeoffs made. Present the plan and demonstrate one privacy tool.'
  },
  extensions: [
    'Research privacy laws in different countries',
    'Explore advanced privacy tools (Tor, encrypted messaging)',
    'Create privacy guides for family members',
    'Investigate data broker industry'
  ],
  realWorldConnections: [
    'Data breaches affect millions of people every year',
    'Privacy laws like GDPR and CCPA give people new rights',
    'Privacy careers exist in law, technology, and policy',
    'Personal privacy choices affect the whole digital ecosystem'
  ]
};

const project2: Project = {
  id: 'project-2',
  title: 'Project 2: Digital Citizenship & Ethics',
  description: 'Navigate online identity, misinformation, and ethical technology use.',
  difficulty: 'Intermediate',
  duration: '3-4 weeks',
  gradeBand: '6-12',
  overview: 'Students examine what it means to be a responsible digital citizen, from managing online identity to combating misinformation and understanding the ethical implications of technology. This project develops critical thinking skills essential for the modern information environment.',
  learningObjectives: [
    'Understand the concept of digital identity and reputation',
    'Develop skills to identify misinformation and verify sources',
    'Recognize and respond appropriately to cyberbullying',
    'Understand basic intellectual property concepts',
    'Apply ethical frameworks to technology decisions',
    'Practice responsible digital citizenship'
  ],
  prerequisites: [
    'Basic internet usage',
    'Social media familiarity helpful'
  ],
  materials: {
    required: [
      'Computer with internet access',
      'Access to fact-checking resources',
      'Case study materials'
    ],
    optional: [
      'Social media accounts for analysis',
      'News aggregator access'
    ]
  },
  lessons: [
    {
      title: 'Online Identity and Reputation',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Distinguish between online and offline identity',
        'Understand how digital footprints form',
        'Evaluate the permanence of online content',
        'Develop strategies for managing online presence'
      ],
      conceptualUnderstanding: [
        'Online identity is constructed through our actions and content',
        'Digital footprints are difficult or impossible to fully erase',
        'Future employers, schools, and others may view online presence',
        'Thoughtful curation of online identity is a valuable skill'
      ],
      activities: [
        'Discussion: Who are you online vs. offline?',
        'Search: Find your own digital footprint (safely)',
        'Scenario analysis: How might this post affect your future?',
        'Planning: Strategies for positive digital presence'
      ],
      detailedActivities: [
        {
          title: 'Online vs. Offline Identity Discussion',
          duration: '15 minutes',
          overview: 'Students explore how their online identity differs from their offline identity and why this matters.',
          videoResources: [
            { title: 'Digital Identity Explained', url: 'https://www.youtube.com/watch?v=hNP1bLmv0qs', duration: '5 min', description: 'Understanding how we present ourselves online' },
          ],
          steps: [
            { instruction: 'Ask: "How do you describe yourself online vs. in person? Are they the same?"', duration: '3 min' },
            { instruction: 'Discuss different platforms: How might you appear differently on Instagram vs. LinkedIn vs. gaming?', duration: '4 min', teacherNotes: 'Highlight that multiple online identities are normal.' },
            { instruction: 'Introduce concept: Online identity is constructed, curated, and persistent.', duration: '4 min' },
            { instruction: 'Reflection: What aspects of yourself do you emphasize online? What do you hide?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students articulate differences between their online and offline presentations?',
          differentiation: { support: 'Provide identity comparison worksheet.', extension: 'Research how public figures manage multiple online identities.' },
        },
        {
          title: 'Digital Footprint Discovery',
          duration: '20 minutes',
          overview: 'Students safely explore what information about them exists online.',
          steps: [
            { instruction: 'Explain digital footprints: Active (what you post) vs. Passive (what others collect).', duration: '4 min' },
            { instruction: 'Guided search: Students search their own name (with safety guidelines).', duration: '8 min', teacherNotes: 'Have students search in incognito mode. Remind them this is private reflection.' },
            { instruction: 'Discuss: What did you find? Were you surprised? What might others find?', duration: '4 min' },
            { instruction: 'Introduce: Data brokers and how information spreads beyond your control.', duration: '4 min' },
          ],
          formativeAssessment: 'Did students discover their digital footprint is larger than expected?',
          differentiation: { support: 'Provide search guide with specific sites to check.', extension: 'Research how to request data deletion from data brokers.' },
        },
        {
          title: 'Future Impact Scenario Analysis',
          duration: '15 minutes',
          overview: 'Students analyze scenarios to understand how online content affects future opportunities.',
          steps: [
            { instruction: 'Present scenarios: Social media posts affecting college admission, job offers, relationships.', duration: '3 min' },
            { instruction: 'Small groups analyze: What went wrong? How could this have been prevented?', duration: '6 min' },
            { instruction: 'Share findings: What patterns do we see across scenarios?', duration: '3 min' },
            { instruction: 'Exit ticket: One thing you will do differently based on what you learned.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify how online actions have real-world consequences?',
          differentiation: { support: 'Provide scenario analysis framework.', extension: 'Create a digital presence improvement plan.' },
        },
      ],
      materials: [
        'Search activity guidelines',
        'Scenario cards',
        'Digital presence planning worksheet'
      ]
    },
    {
      title: 'Combating Misinformation',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Define misinformation, disinformation, and malinformation',
        'Identify common misinformation patterns',
        'Apply fact-checking techniques (SIFT method)',
        'Understand why misinformation spreads'
      ],
      conceptualUnderstanding: [
        'Misinformation is false information regardless of intent',
        'Emotional content spreads faster than factual content',
        'Lateral reading is more effective than vertical reading',
        'Everyone is vulnerable to misinformation on unfamiliar topics'
      ],
      activities: [
        'Exercise: Identify misinformation in examples',
        'Learn: SIFT method (Stop, Investigate, Find, Trace)',
        'Practice: Fact-check real claims',
        'Discussion: Why do people share false information?'
      ],
      detailedActivities: [
        {
          title: 'Understanding Misinformation Types',
          duration: '15 minutes',
          overview: 'Students learn to distinguish between misinformation, disinformation, and malinformation.',
          videoResources: [
            { title: 'How Misinformation Spreads', url: 'https://www.youtube.com/watch?v=cSKGa_7XJkg', duration: '6 min', description: 'TED-Ed explanation of how false information spreads online' },
          ],
          steps: [
            { instruction: 'Define terms: Misinformation (false, no intent), Disinformation (false, intentional), Malinformation (true but harmful).', duration: '4 min' },
            { instruction: 'Show examples: Categorize each as mis-, dis-, or malinformation.', duration: '5 min', teacherNotes: 'Use current, relevant examples appropriate for age group.' },
            { instruction: 'Discuss: Why does intent matter? Why might someone spread false info intentionally?', duration: '4 min' },
            { instruction: 'Quick assessment: Students categorize 3 new examples.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students correctly categorize information types?',
          differentiation: { support: 'Provide definition reference cards.', extension: 'Research historical examples of disinformation campaigns.' },
        },
        {
          title: 'SIFT Method Training',
          duration: '20 minutes',
          overview: 'Students learn and practice the SIFT method for evaluating online information.',
          videoResources: [
            { title: 'SIFT Method Explained', url: 'https://www.youtube.com/watch?v=yBU2sDlUbp8', duration: '5 min', description: 'Mike Caulfield explains the SIFT method for fact-checking' },
          ],
          steps: [
            { instruction: 'Introduce SIFT: Stop, Investigate the source, Find better coverage, Trace claims.', duration: '5 min' },
            { instruction: 'Model: Walk through SIFT on a questionable claim together.', duration: '6 min', teacherNotes: 'Demonstrate lateral reading—opening new tabs to verify.' },
            { instruction: 'Practice: Students apply SIFT to provided examples in pairs.', duration: '7 min' },
            { instruction: 'Debrief: What did SIFT reveal? What was surprising?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students apply all four SIFT steps independently?',
          differentiation: { support: 'Provide SIFT checklist worksheet.', extension: 'Create SIFT tutorial for younger students.' },
        },
        {
          title: 'Real-Time Fact-Checking Practice',
          duration: '15 minutes',
          overview: 'Students fact-check real claims using professional fact-checking resources.',
          steps: [
            { instruction: 'Introduce fact-checking sites: Snopes, PolitiFact, FactCheck.org, AP Fact Check.', duration: '3 min' },
            { instruction: 'Distribute claims to fact-check. Mix of true, false, and partly true.', duration: '2 min' },
            { instruction: 'Students fact-check using SIFT and fact-checking sites.', duration: '7 min' },
            { instruction: 'Share results: What did you find? Were any claims surprising?', duration: '3 min' },
          ],
          formativeAssessment: 'Did students successfully verify or debunk claims using multiple sources?',
          differentiation: { support: 'Provide simpler, clearly false/true claims.', extension: 'Fact-check claims from their own social media feeds.' },
        },
        {
          title: 'Why Misinformation Spreads',
          duration: '10 minutes',
          overview: 'Students examine psychological and social factors that cause misinformation to spread.',
          steps: [
            { instruction: 'Discuss: Why do people share information without checking it first?', duration: '3 min' },
            { instruction: 'Introduce concepts: Confirmation bias, emotional engagement, social pressure.', duration: '4 min', teacherNotes: 'We believe things that match what we already think.' },
            { instruction: 'Exit ticket: What will you do before sharing something online?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify factors that make them vulnerable to misinformation?',
          differentiation: { support: 'Provide sharing decision flowchart.', extension: 'Research how platforms algorithmically amplify misinformation.' },
        },
      ],
      materials: [
        'Misinformation examples',
        'SIFT method reference',
        'Fact-checking websites'
      ]
    },
    {
      title: 'Cyberbullying and Digital Wellness',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Define cyberbullying and its forms',
        'Recognize signs of cyberbullying',
        'Know how to respond as target, bystander, or witness',
        'Understand digital wellness and healthy technology use'
      ],
      conceptualUnderstanding: [
        'Cyberbullying has unique characteristics (anonymity, permanence, audience)',
        'Bystanders play a crucial role in stopping bullying',
        'Healthy technology use requires intentional boundaries',
        'Support resources exist and should be used when needed'
      ],
      activities: [
        'Scenarios: Identify cyberbullying situations',
        'Role-play: Practice bystander intervention',
        'Reflection: Personal technology habits and wellness',
        'Resource mapping: Where to get help'
      ],
      detailedActivities: [
        {
          title: 'Understanding Cyberbullying',
          duration: '15 minutes',
          overview: 'Students learn to identify cyberbullying and understand what makes it different from traditional bullying.',
          videoResources: [
            { title: 'What is Cyberbullying?', url: 'https://www.youtube.com/watch?v=vtP-S9OS0o0', duration: '4 min', description: 'Common Sense Media overview of cyberbullying' },
          ],
          steps: [
            { instruction: 'Define cyberbullying: Repeated, intentional harm using digital technology.', duration: '3 min' },
            { instruction: 'Discuss unique features: 24/7 access, anonymity, larger audience, permanence.', duration: '4 min', teacherNotes: 'Unlike traditional bullying, you cannot escape it by going home.' },
            { instruction: 'Show examples of different forms: Harassment, impersonation, outing, exclusion.', duration: '4 min' },
            { instruction: 'Quick check: Is this cyberbullying? Students evaluate scenarios.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students identify cyberbullying vs. conflict vs. joking?',
          differentiation: { support: 'Provide cyberbullying identification checklist.', extension: 'Research cyberbullying laws in your state.' },
        },
        {
          title: 'Bystander Intervention Practice',
          duration: '20 minutes',
          overview: 'Students practice strategies for safely intervening when they witness cyberbullying.',
          steps: [
            { instruction: 'Discuss bystander effect: Why do people not intervene?', duration: '3 min' },
            { instruction: 'Introduce intervention strategies: Direct, distract, delegate, delay, document.', duration: '5 min' },
            { instruction: 'Role-play scenarios: Groups practice different intervention strategies.', duration: '8 min', teacherNotes: 'Emphasize safety—not all situations require direct intervention.' },
            { instruction: 'Debrief: What felt natural? What was hard? What would you actually do?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students identify appropriate intervention strategies for different situations?',
          differentiation: { support: 'Provide intervention strategy cards.', extension: 'Create bystander intervention training for peers.' },
        },
        {
          title: 'Digital Wellness Reflection',
          duration: '15 minutes',
          overview: 'Students reflect on their own technology habits and develop wellness strategies.',
          steps: [
            { instruction: 'Silent reflection: How much time do you spend on screens? How does it make you feel?', duration: '3 min' },
            { instruction: 'Introduce digital wellness concepts: Screen time, notifications, comparison, FOMO.', duration: '4 min' },
            { instruction: 'Small group discussion: What unhealthy patterns do you notice in yourself or others?', duration: '4 min' },
            { instruction: 'Personal planning: Identify one digital wellness goal and specific action.', duration: '4 min' },
          ],
          formativeAssessment: 'Did students identify specific digital wellness challenges and solutions?',
          differentiation: { support: 'Provide digital wellness self-assessment.', extension: 'Track digital habits for a week using screen time tools.' },
        },
        {
          title: 'Resource Mapping',
          duration: '10 minutes',
          overview: 'Students identify resources for help with cyberbullying and digital wellness.',
          steps: [
            { instruction: 'Brainstorm: Where can someone get help? Adults, hotlines, websites, apps.', duration: '3 min' },
            { instruction: 'Compile resource list: School counselor, Crisis Text Line, StopBullying.gov.', duration: '4 min', teacherNotes: 'Include both school-specific and external resources.' },
            { instruction: 'Exit ticket: Who would you talk to if you experienced cyberbullying?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify multiple help resources?',
          differentiation: { support: 'Provide pre-made resource card.', extension: 'Create resource poster for classroom or school.' },
        },
      ],
      materials: [
        'Scenario cards',
        'Role-play guidelines',
        'Resource directory'
      ]
    },
    {
      title: 'Intellectual Property and Fair Use',
      duration: '50-60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Define copyright and its purpose',
        'Understand fair use and its limitations',
        'Find and use Creative Commons content',
        'Give proper attribution to creators'
      ],
      conceptualUnderstanding: [
        'Copyright protects creators\' control over their work',
        'Fair use allows limited use without permission for specific purposes',
        'Creative Commons licenses provide alternatives to full copyright',
        'Attribution respects creators and builds trust'
      ],
      activities: [
        'Introduction: Why intellectual property exists',
        'Exercise: Is this fair use? Analyze scenarios',
        'Search: Find CC-licensed images for a project',
        'Practice: Write proper attributions'
      ],
      detailedActivities: [
        {
          title: 'Understanding Copyright',
          duration: '15 minutes',
          overview: 'Students learn what copyright is, why it exists, and what it protects.',
          videoResources: [
            { title: 'Copyright Basics', url: 'https://www.youtube.com/watch?v=GPNWvU2EpkU', duration: '5 min', description: 'Simple explanation of copyright law for students' },
          ],
          steps: [
            { instruction: 'Ask: Who owns this song? This photo? This video? How do you know?', duration: '3 min' },
            { instruction: 'Explain copyright: Automatic protection for original creative works.', duration: '4 min', teacherNotes: 'Copyright happens automatically upon creation—no registration needed.' },
            { instruction: 'Discuss what copyright protects: Art, music, writing, code, photos, videos.', duration: '4 min' },
            { instruction: 'Quick check: Is this copyrighted? Students evaluate different works.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students identify what types of works are protected by copyright?',
          differentiation: { support: 'Provide copyright basics reference card.', extension: 'Research differences between copyright, trademark, and patent.' },
        },
        {
          title: 'Fair Use Analysis',
          duration: '15 minutes',
          overview: 'Students learn the four factors of fair use and apply them to real scenarios.',
          steps: [
            { instruction: 'Introduce fair use: Limited use without permission for specific purposes.', duration: '3 min' },
            { instruction: 'Explain four factors: Purpose, nature of work, amount used, market effect.', duration: '5 min', teacherNotes: 'Fair use is complex—factors are weighed together, not checked off.' },
            { instruction: 'Scenario analysis: Groups analyze whether examples are fair use.', duration: '5 min' },
            { instruction: 'Share results: Why is fair use hard to determine? It depends!', duration: '2 min' },
          ],
          formativeAssessment: 'Can students apply fair use factors to evaluate scenarios?',
          differentiation: { support: 'Provide fair use factor checklist.', extension: 'Research famous fair use court cases.' },
        },
        {
          title: 'Finding Creative Commons Content',
          duration: '15 minutes',
          overview: 'Students learn to find and use Creative Commons licensed content properly.',
          videoResources: [
            { title: 'Creative Commons Explained', url: 'https://www.youtube.com/watch?v=AeTlXtEOplA', duration: '4 min', description: 'How Creative Commons licenses work' },
          ],
          steps: [
            { instruction: 'Introduce Creative Commons: Creators choosing to share with conditions.', duration: '3 min' },
            { instruction: 'Explain license types: CC BY, CC BY-SA, CC BY-NC, CC0 (public domain).', duration: '4 min' },
            { instruction: 'Practice search: Find CC images using search tools (Openverse, Unsplash).', duration: '5 min' },
            { instruction: 'Discussion: Why would a creator use CC? When would you use CC for your work?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students find and identify appropriate CC-licensed content?',
          differentiation: { support: 'Provide CC license comparison chart.', extension: 'Create original content and license it under CC.' },
        },
        {
          title: 'Attribution Practice',
          duration: '10 minutes',
          overview: 'Students learn to write proper attributions for Creative Commons content.',
          steps: [
            { instruction: 'Why attribution matters: Respecting creators, building trust, following the license.', duration: '2 min' },
            { instruction: 'Model proper attribution: Title, Author, Source, License (TASL).', duration: '3 min' },
            { instruction: 'Practice: Write attributions for 3 CC-licensed works.', duration: '3 min' },
            { instruction: 'Exit ticket: Show an attribution you wrote for one of your searches.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students write complete, accurate attributions?',
          differentiation: { support: 'Provide attribution template.', extension: 'Create attribution generator tool or guide for peers.' },
        },
      ],
      materials: [
        'Fair use guidelines',
        'Creative Commons search tools',
        'Attribution examples'
      ]
    }
  ],
  assessment: {
    formative: [
      'Digital footprint audit: Analysis of their online presence',
      'Fact-checking exercise: Successfully verify/debunk claims',
      'Scenario responses: Appropriate cyberbullying intervention strategies',
      'Attribution practice: Correctly attribute CC content'
    ],
    summative: 'Create a Digital Citizenship Guide for peers that covers online identity, misinformation, digital wellness, and intellectual property. Include practical tips, resources, and examples. Present one section to the class with interactive demonstration.'
  },
  extensions: [
    'Research content moderation and platform responsibility',
    'Explore deepfakes and AI-generated content',
    'Create anti-misinformation campaign for school',
    'Study digital wellness research and statistics'
  ],
  realWorldConnections: [
    'Employers regularly check social media of candidates',
    'Misinformation affects elections, health, and public safety',
    'Cyberbullying has real mental health consequences',
    'Content creators depend on intellectual property protection'
  ]
};

const project3: Project = {
  id: 'project-3',
  title: 'Project 3: Surveillance & Civil Liberties',
  description: 'Examine how surveillance technologies affect rights and freedoms.',
  difficulty: 'Advanced',
  duration: '4-5 weeks',
  gradeBand: '9-12',
  overview: 'Students critically examine surveillance technologies and their impact on civil liberties. Through historical context, legal analysis, and contemporary case studies, they develop informed perspectives on the balance between security and privacy.',
  learningObjectives: [
    'Trace the history of surveillance technology',
    'Understand Fourth Amendment protections and their limitations',
    'Analyze major privacy laws (GDPR, CCPA)',
    'Evaluate arguments for and against surveillance programs',
    'Understand encryption and why it matters for freedom',
    'Form evidence-based opinions on surveillance issues'
  ],
  prerequisites: [
    'Completed Project 1 or equivalent privacy knowledge',
    'Basic civics understanding helpful'
  ],
  materials: {
    required: [
      'Computer with internet access',
      'Case study materials',
      'Legal document excerpts'
    ],
    optional: [
      'Access to news archives',
      'Guest speaker (lawyer, advocate, etc.)'
    ]
  },
  lessons: [
    {
      title: 'History of Surveillance',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Trace surveillance from analog to digital era',
        'Identify key moments that expanded surveillance capabilities',
        'Understand how technology changes surveillance scale',
        'Connect historical patterns to current practices'
      ],
      conceptualUnderstanding: [
        'Surveillance has existed throughout history but technology changed its scale',
        'Wars and crises often expand surveillance powers',
        'Mass digital surveillance is historically unprecedented',
        'Understanding history helps predict future developments'
      ],
      activities: [
        'Timeline: Key moments in surveillance history',
        'Case study: COINTELPRO and its lessons',
        'Discussion: How did 9/11 change surveillance?',
        'Analysis: What enables mass surveillance today?'
      ],
      detailedActivities: [
        {
          title: 'Surveillance Timeline Construction',
          duration: '20 minutes',
          overview: 'Students build a timeline tracing surveillance from ancient to digital times.',
          videoResources: [
            { title: 'History of Surveillance', url: 'https://www.youtube.com/watch?v=QxYWvL8lS4o', duration: '8 min', description: 'Documentary excerpt on surveillance history' },
          ],
          steps: [
            { instruction: 'Brainstorm: What forms did surveillance take before computers?', duration: '3 min' },
            { instruction: 'Introduce key eras: Analog (mail, wiretaps), Cold War (SIGINT), Digital (internet), Post-9/11 (mass collection).', duration: '7 min', teacherNotes: 'Emphasize how each era built on previous capabilities.' },
            { instruction: 'Groups place events on timeline: Church Committee, ECHELON, Patriot Act, Snowden revelations.', duration: '7 min' },
            { instruction: 'Discuss patterns: What triggers surveillance expansion? What causes reform?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify patterns in surveillance expansion?',
          differentiation: { support: 'Provide pre-made event cards with dates.', extension: 'Research surveillance in authoritarian regimes.' },
        },
        {
          title: 'COINTELPRO Case Study',
          duration: '15 minutes',
          overview: 'Students examine the FBI\'s COINTELPRO program to understand surveillance abuse.',
          steps: [
            { instruction: 'Introduce COINTELPRO: FBI program targeting civil rights and antiwar activists.', duration: '4 min' },
            { instruction: 'Primary source analysis: Examine actual COINTELPRO documents.', duration: '5 min', teacherNotes: 'Focus on the letter to MLK as an example of abuse.' },
            { instruction: 'Discussion: How was COINTELPRO discovered? What reforms followed?', duration: '4 min' },
            { instruction: 'Connection: Could something like this happen today? How/why not?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students articulate the dangers of unchecked surveillance power?',
          differentiation: { support: 'Provide annotated document summaries.', extension: 'Research the Church Committee and its recommendations.' },
        },
        {
          title: 'Post-9/11 Transformation',
          duration: '15 minutes',
          overview: 'Students analyze how 9/11 transformed surveillance powers and practices.',
          steps: [
            { instruction: 'Before/after: What surveillance looked like pre- and post-9/11.', duration: '4 min' },
            { instruction: 'Key legislation: Patriot Act, FISA Amendments Act, and their provisions.', duration: '5 min' },
            { instruction: 'Snowden revelations: What did we learn in 2013?', duration: '4 min', teacherNotes: 'PRISM, upstream collection, metadata programs.' },
            { instruction: 'Quick reflection: Were you surprised by any of this history?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students explain how 9/11 changed surveillance law and practice?',
          differentiation: { support: 'Provide before/after comparison chart.', extension: 'Research current NSA programs and their legal basis.' },
        },
        {
          title: 'Modern Mass Surveillance',
          duration: '10 minutes',
          overview: 'Students analyze what makes modern mass surveillance unprecedented.',
          steps: [
            { instruction: 'Discuss: What technological capabilities enable mass surveillance today?', duration: '3 min' },
            { instruction: 'Scale comparison: How much data is collected now vs. historically?', duration: '3 min' },
            { instruction: 'Exit ticket: What lesson from history is most important for today?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students connect historical patterns to current capabilities?',
          differentiation: { support: 'Provide guided reflection questions.', extension: 'Research emerging surveillance technologies (AI, biometrics).' },
        },
      ],
      materials: [
        'Historical timeline',
        'COINTELPRO documents',
        'Post-9/11 analysis'
      ]
    },
    {
      title: 'Legal Frameworks: Fourth Amendment and Beyond',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Explain the Fourth Amendment and reasonable expectation of privacy',
        'Understand how courts have interpreted privacy in the digital age',
        'Compare US privacy law to GDPR and other frameworks',
        'Identify gaps in current legal protections'
      ],
      conceptualUnderstanding: [
        'The Fourth Amendment protects against unreasonable searches',
        'Digital data challenges traditional privacy frameworks',
        '"Third-party doctrine" creates privacy gaps',
        'Different countries approach privacy rights differently'
      ],
      activities: [
        'Reading: Fourth Amendment and key cases',
        'Analysis: Carpenter v. United States implications',
        'Comparison: GDPR vs. US privacy law',
        'Discussion: What should the law protect?'
      ],
      detailedActivities: [
        {
          title: 'Fourth Amendment Foundation',
          duration: '15 minutes',
          overview: 'Students learn the Fourth Amendment and how courts interpret "reasonable expectation of privacy."',
          videoResources: [
            { title: 'Fourth Amendment Explained', url: 'https://www.youtube.com/watch?v=hXZ4LS1aVXY', duration: '6 min', description: 'Overview of Fourth Amendment protections' },
          ],
          steps: [
            { instruction: 'Read Fourth Amendment aloud. What does "unreasonable searches and seizures" mean?', duration: '3 min' },
            { instruction: 'Introduce "reasonable expectation of privacy" test from Katz v. United States.', duration: '4 min', teacherNotes: 'Two-part test: subjective expectation + objectively reasonable.' },
            { instruction: 'Apply the test: Do you have privacy expectation in your texts? Emails? Location?', duration: '5 min' },
            { instruction: 'Discuss: How well does a 1791 amendment protect 2024 digital life?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students apply the reasonable expectation test to digital scenarios?',
          differentiation: { support: 'Provide simplified test explanation.', extension: 'Research Katz and its impact on surveillance law.' },
        },
        {
          title: 'Third-Party Doctrine Problem',
          duration: '15 minutes',
          overview: 'Students examine how the third-party doctrine creates privacy gaps in digital data.',
          steps: [
            { instruction: 'Introduce third-party doctrine: Information shared with others has no privacy protection.', duration: '4 min' },
            { instruction: 'Apply to digital life: Phone records, email metadata, location data—all shared with companies.', duration: '4 min', teacherNotes: 'This is why phone metadata collection was legal before Carpenter.' },
            { instruction: 'Carpenter v. United States: How did this case narrow the doctrine?', duration: '5 min' },
            { instruction: 'Discussion: What digital data should be protected? What gaps remain?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students identify privacy gaps created by third-party doctrine?',
          differentiation: { support: 'Provide doctrine explainer with examples.', extension: 'Research other countries approaches to third-party data.' },
        },
        {
          title: 'Global Privacy Comparison',
          duration: '20 minutes',
          overview: 'Students compare US privacy law to GDPR and other international frameworks.',
          videoResources: [
            { title: 'GDPR Explained', url: 'https://www.youtube.com/watch?v=acijNEErf-c', duration: '5 min', description: 'What the EU\'s privacy regulation requires' },
          ],
          steps: [
            { instruction: 'Overview of US approach: Sectoral, no comprehensive federal privacy law.', duration: '4 min' },
            { instruction: 'Introduce GDPR: Rights-based, comprehensive, consent-focused, strong enforcement.', duration: '6 min' },
            { instruction: 'Comparison activity: Create chart comparing key provisions.', duration: '6 min' },
            { instruction: 'Discussion: Which approach better protects citizens? What are tradeoffs?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students articulate key differences between US and EU approaches?',
          differentiation: { support: 'Provide pre-made comparison chart with gaps to fill.', extension: 'Research US state privacy laws like CCPA.' },
        },
        {
          title: 'Law Reform Discussion',
          duration: '10 minutes',
          overview: 'Students consider what privacy law should protect in the digital age.',
          steps: [
            { instruction: 'Brainstorm: What digital privacy protections are most needed?', duration: '3 min' },
            { instruction: 'Discuss: How should the Constitution be interpreted for technologies that did not exist in 1791?', duration: '4 min' },
            { instruction: 'Exit ticket: One privacy protection you believe law should guarantee.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students propose specific privacy protections with rationale?',
          differentiation: { support: 'Provide reform proposal options.', extension: 'Draft a student privacy bill of rights.' },
        },
      ],
      materials: [
        'Constitutional excerpts',
        'Case summaries',
        'GDPR overview'
      ]
    },
    {
      title: 'Government and Corporate Surveillance',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Distinguish between government and corporate surveillance',
        'Understand key government surveillance programs',
        'Analyze corporate data collection practices',
        'Examine the relationship between government and corporations'
      ],
      conceptualUnderstanding: [
        'Government surveillance serves security and law enforcement goals',
        'Corporate surveillance primarily serves commercial goals',
        'The lines between government and corporate surveillance blur',
        'Both types of surveillance raise civil liberties concerns'
      ],
      activities: [
        'Research: Major surveillance programs revealed by Snowden',
        'Analysis: How do companies track users?',
        'Case study: Government requests for corporate data',
        'Debate: Is corporate surveillance as concerning as government?'
      ],
      detailedActivities: [
        {
          title: 'Government Surveillance Programs',
          duration: '20 minutes',
          overview: 'Students learn about major government surveillance programs revealed by Edward Snowden.',
          videoResources: [
            { title: 'Snowden Revelations Explained', url: 'https://www.youtube.com/watch?v=XGxs0LBwYMc', duration: '7 min', description: 'Overview of NSA programs revealed in 2013' },
          ],
          steps: [
            { instruction: 'Introduction: Who is Edward Snowden? What did he reveal?', duration: '4 min' },
            { instruction: 'Key programs: PRISM (collecting from companies), Upstream (intercepting backbone), Metadata programs.', duration: '7 min', teacherNotes: 'Focus on scope: collecting data on millions, not just targets.' },
            { instruction: 'Discussion: Were these programs legal? Were they ethical? Are they effective?', duration: '5 min' },
            { instruction: 'Current status: What changed after the revelations? What continues?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students explain key surveillance programs and their scope?',
          differentiation: { support: 'Provide program summary cards.', extension: 'Research Five Eyes alliance and international cooperation.' },
        },
        {
          title: 'Corporate Data Collection',
          duration: '15 minutes',
          overview: 'Students analyze how companies collect and use personal data.',
          steps: [
            { instruction: 'Brainstorm: What data do Google, Facebook, Amazon collect about you?', duration: '3 min' },
            { instruction: 'Data collection methods: First-party, third-party cookies, device fingerprinting, purchase data.', duration: '5 min' },
            { instruction: 'Business model: "If you are not paying, you are the product."', duration: '4 min', teacherNotes: 'Surveillance capitalism - data as the new oil.' },
            { instruction: 'Quick activity: Read a privacy policy excerpt. What data is collected?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify corporate data collection methods?',
          differentiation: { support: 'Provide data collection visual.', extension: 'Request your data from a company (Google Takeout, etc.).' },
        },
        {
          title: 'Government-Corporate Connection',
          duration: '15 minutes',
          overview: 'Students examine how government accesses corporate data and the blurring lines.',
          steps: [
            { instruction: 'Data requests: How does government get data from companies?', duration: '4 min' },
            { instruction: 'Transparency reports: What do company reports tell us?', duration: '4 min' },
            { instruction: 'Case study: Apple vs. FBI or similar data request conflict.', duration: '5 min' },
            { instruction: 'Discussion: Should companies resist government requests? When?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students explain how government accesses corporate data?',
          differentiation: { support: 'Provide case study summary.', extension: 'Analyze a company transparency report.' },
        },
        {
          title: 'Comparing Surveillance Concerns',
          duration: '10 minutes',
          overview: 'Students debate which type of surveillance is more concerning.',
          steps: [
            { instruction: 'Quick debate prep: Government surveillance vs. corporate surveillance—which is worse?', duration: '3 min' },
            { instruction: 'Mini debate: Students argue assigned positions.', duration: '5 min' },
            { instruction: 'Exit ticket: Your actual view and reasoning. Are they equally concerning?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students articulate arguments for both positions?',
          differentiation: { support: 'Provide argument starter cards.', extension: 'Write a longer position paper on surveillance concerns.' },
        },
      ],
      materials: [
        'Snowden revelations summary',
        'Corporate tracking analysis',
        'Data request examples'
      ]
    },
    {
      title: 'Encryption and Digital Freedom',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Understand what encryption does and why it matters',
        'Examine the "going dark" debate',
        'Evaluate proposals for encryption backdoors',
        'Connect encryption to free speech and privacy rights'
      ],
      conceptualUnderstanding: [
        'Encryption protects communication from interception',
        'Strong encryption cannot have "good guy only" backdoors',
        'Encryption enables journalism, activism, and commerce',
        'The encryption debate involves security tradeoffs'
      ],
      activities: [
        'Demo: How encryption works (conceptually)',
        'Case study: Apple vs. FBI',
        'Analysis: Arguments for and against backdoors',
        'Discussion: Who should have access to encrypted data?'
      ],
      detailedActivities: [
        {
          title: 'How Encryption Works',
          duration: '15 minutes',
          overview: 'Students learn the basics of encryption and why it is essential for digital security.',
          videoResources: [
            { title: 'Encryption Explained Simply', url: 'https://www.youtube.com/watch?v=ZghMPWGXexs', duration: '6 min', description: 'Visual explanation of how encryption protects data' },
          ],
          steps: [
            { instruction: 'Demo: Simple cipher activity. Students encode/decode messages.', duration: '4 min' },
            { instruction: 'Introduce modern encryption: Public/private keys, end-to-end encryption.', duration: '5 min', teacherNotes: 'Analogy: Public key is a mailbox anyone can drop into; private key is the only key to open it.' },
            { instruction: 'Where is encryption used? HTTPS, messaging apps, disk encryption, VPNs.', duration: '4 min' },
            { instruction: 'Discussion: What would happen without encryption?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students explain why encryption matters for everyday security?',
          differentiation: { support: 'Use physical cipher activity.', extension: 'Research different encryption algorithms and their strengths.' },
        },
        {
          title: 'Apple vs. FBI Case Study',
          duration: '15 minutes',
          overview: 'Students analyze the conflict between Apple and FBI over iPhone encryption.',
          steps: [
            { instruction: 'Background: 2015 San Bernardino shooting and FBI request for Apple\'s help.', duration: '4 min' },
            { instruction: 'FBI position: We need access to this phone for national security.', duration: '3 min' },
            { instruction: 'Apple position: Creating a backdoor weakens security for all users.', duration: '3 min', teacherNotes: 'Once created, a backdoor cannot be limited to just good guys.' },
            { instruction: 'Resolution: FBI found another way in. But what if they had not?', duration: '2 min' },
            { instruction: 'Discussion: Who was right? What would you have decided?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students articulate both positions in the Apple-FBI conflict?',
          differentiation: { support: 'Provide case study summary with timeline.', extension: 'Research similar encryption conflicts in other countries.' },
        },
        {
          title: 'The Backdoor Debate',
          duration: '20 minutes',
          overview: 'Students evaluate arguments for and against encryption backdoors.',
          videoResources: [
            { title: 'Going Dark Debate', url: 'https://www.youtube.com/watch?v=g1GgnbN9oNw', duration: '5 min', description: 'Both sides of the encryption backdoor debate' },
          ],
          steps: [
            { instruction: 'Explain "going dark": Law enforcement concerns about inaccessible encrypted data.', duration: '4 min' },
            { instruction: 'Arguments for backdoors: Public safety, catching criminals, terrorism prevention.', duration: '4 min' },
            { instruction: 'Arguments against: Technical impossibility of "good guy only" backdoors, authoritarian abuse, economic harm.', duration: '4 min' },
            { instruction: 'Expert perspectives: Why do most security experts oppose backdoors?', duration: '4 min', teacherNotes: 'Key point: You cannot make a door that only good guys can use.' },
            { instruction: 'Quick vote: Where do students stand? Discuss.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students evaluate backdoor proposals using security principles?',
          differentiation: { support: 'Provide argument cards for both sides.', extension: 'Research technical proposals for "lawful access" and their critiques.' },
        },
        {
          title: 'Encryption and Human Rights',
          duration: '10 minutes',
          overview: 'Students connect encryption to free speech, press freedom, and human rights.',
          steps: [
            { instruction: 'Who depends on encryption? Journalists, activists, dissidents, abuse victims.', duration: '3 min' },
            { instruction: 'Global perspective: What happens in countries without encryption protections?', duration: '4 min' },
            { instruction: 'Exit ticket: Is encryption a human right? Defend your answer.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students connect encryption to broader rights and freedoms?',
          differentiation: { support: 'Provide use case examples.', extension: 'Research UN statements on encryption and human rights.' },
        },
      ],
      materials: [
        'Encryption explainer',
        'Apple vs. FBI case study',
        'Policy position papers'
      ]
    },
    {
      title: 'Balancing Security and Freedom',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Articulate arguments on multiple sides of surveillance debates',
        'Evaluate effectiveness of surveillance programs',
        'Consider alternative approaches to security',
        'Form and defend evidence-based positions'
      ],
      conceptualUnderstanding: [
        'Security and privacy are not zero-sum',
        'Surveillance effectiveness is often overstated',
        'Rights-respecting alternatives often exist',
        'Informed citizens must engage with these tradeoffs'
      ],
      activities: [
        'Structured debate: Surveillance program scenario',
        'Analysis: Evidence on surveillance effectiveness',
        'Exploration: Privacy-preserving security approaches',
        'Reflection: Your position and reasoning'
      ],
      detailedActivities: [
        {
          title: 'Structured Surveillance Debate',
          duration: '25 minutes',
          overview: 'Students debate a realistic surveillance policy scenario using structured debate format.',
          steps: [
            { instruction: 'Present scenario: City considers deploying AI-powered surveillance cameras in public spaces.', duration: '3 min' },
            { instruction: 'Assign positions: Pro-deployment (safety benefits) vs. Anti-deployment (civil liberties concerns).', duration: '2 min' },
            { instruction: 'Preparation: Groups develop arguments using course materials.', duration: '5 min', teacherNotes: 'Encourage use of evidence from previous lessons.' },
            { instruction: 'Debate: Opening statements, rebuttals, closing arguments.', duration: '12 min' },
            { instruction: 'Debrief: What arguments were most persuasive? What was missing?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students construct evidence-based arguments for assigned positions?',
          differentiation: { support: 'Provide argument starters for each side.', extension: 'Add stakeholder roles: police, civil liberties lawyer, community member.' },
        },
        {
          title: 'Evaluating Surveillance Effectiveness',
          duration: '15 minutes',
          overview: 'Students examine evidence on whether mass surveillance programs actually work.',
          videoResources: [
            { title: 'Does Mass Surveillance Work?', url: 'https://www.youtube.com/watch?v=V9_PjdU3Mpo', duration: '6 min', description: 'Research on surveillance program effectiveness' },
          ],
          steps: [
            { instruction: 'Present claims: "Surveillance keeps us safe" - how do we evaluate this?', duration: '3 min' },
            { instruction: 'Review evidence: Studies on NSA metadata program, CCTV effectiveness, predictive policing.', duration: '6 min', teacherNotes: 'Key finding: Mass collection often less effective than targeted investigation.' },
            { instruction: 'Discussion: Why might effectiveness be overstated? Who benefits from the overstatement?', duration: '4 min' },
            { instruction: 'Reflection: Does effectiveness even matter if rights are violated?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students critically evaluate effectiveness claims?',
          differentiation: { support: 'Provide study summaries.', extension: 'Research and present on specific program effectiveness studies.' },
        },
        {
          title: 'Rights-Respecting Alternatives',
          duration: '10 minutes',
          overview: 'Students explore security approaches that protect both safety and rights.',
          steps: [
            { instruction: 'Challenge assumption: Is it security OR privacy? Or can we have both?', duration: '2 min' },
            { instruction: 'Introduce alternatives: Targeted warrants, privacy-preserving analytics, community policing.', duration: '4 min' },
            { instruction: 'Discuss: Why might these alternatives be less popular with governments?', duration: '2 min' },
            { instruction: 'Quick brainstorm: Other approaches that balance security and freedom?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students identify alternatives to mass surveillance?',
          differentiation: { support: 'Provide alternatives overview.', extension: 'Research specific privacy-preserving technologies.' },
        },
        {
          title: 'Personal Position Statement',
          duration: '10 minutes',
          overview: 'Students articulate and defend their own evidence-based position on surveillance.',
          steps: [
            { instruction: 'Reflection: What is your position on surveillance? Has it changed during this project?', duration: '3 min' },
            { instruction: 'Write: Brief position statement with key supporting evidence.', duration: '4 min' },
            { instruction: 'Share: Volunteers share positions. Notice the range of views.', duration: '2 min' },
            { instruction: 'Exit ticket: One action you will take as an informed citizen on this issue.', duration: '1 min' },
          ],
          formativeAssessment: 'Can students articulate evidence-based positions on surveillance?',
          differentiation: { support: 'Provide position statement template.', extension: 'Write longer op-ed on surveillance policy.' },
        },
      ],
      materials: [
        'Debate guidelines',
        'Effectiveness studies',
        'Alternative approaches overview'
      ]
    }
  ],
  assessment: {
    formative: [
      'Timeline completion: Accurate historical understanding',
      'Legal analysis: Correct application of Fourth Amendment concepts',
      'Surveillance comparison: Thoughtful government/corporate analysis',
      'Encryption debate: Articulate multiple perspectives'
    ],
    summative: 'Write a policy brief on a surveillance issue of your choice. Include: historical context, legal analysis, stakeholder perspectives, evidence evaluation, and policy recommendations. Present to the class and defend your position in Q&A.'
  },
  extensions: [
    'Research surveillance in other countries',
    'Explore facial recognition technology debates',
    'Study the role of courts in surveillance oversight',
    'Interview professionals in privacy/security fields'
  ],
  realWorldConnections: [
    'Surveillance debates shape legislation and court decisions',
    'Technology companies make privacy decisions affecting billions',
    'Journalists and activists depend on secure communications',
    'Every citizen has a stake in these policy decisions'
  ]
};

const project4: Project = {
  id: 'project-4',
  title: 'Project 4: Digital Advocacy & Activism',
  description: 'Learn to effectively advocate for digital rights in your community.',
  difficulty: 'Advanced',
  duration: '4-5 weeks',
  gradeBand: '9-12',
  overview: 'Students become advocates for digital rights, learning how technology policy is made, who the key organizations are, and how to effectively participate in advocacy. The project culminates in a real advocacy campaign on an issue they care about.',
  learningObjectives: [
    'Understand how technology policy is made',
    'Identify key digital rights organizations and their work',
    'Analyze effective advocacy strategies',
    'Plan and execute an awareness campaign',
    'Communicate complex issues to general audiences',
    'Participate in democratic processes around technology'
  ],
  prerequisites: [
    'Completed Projects 1-3 recommended',
    'Understanding of digital rights issues'
  ],
  materials: {
    required: [
      'Computer with internet access',
      'Campaign planning materials',
      'Presentation tools'
    ],
    optional: [
      'Social media accounts for campaign',
      'Access to local officials or organizations'
    ]
  },
  lessons: [
    {
      title: 'How Technology Policy is Made',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Identify where technology policy is made (legislative, regulatory, judicial)',
        'Understand the role of different stakeholders',
        'Trace how a tech policy issue moves through the system',
        'Recognize opportunities for public input'
      ],
      conceptualUnderstanding: [
        'Technology policy involves multiple branches and levels of government',
        'Industry, advocacy groups, and public all influence policy',
        'The policy process offers many intervention points',
        'Understanding the process is essential for effective advocacy'
      ],
      activities: [
        'Mapping: Who makes tech policy and how?',
        'Case study: Trace a recent tech law from proposal to passage',
        'Research: Current tech bills and their status',
        'Discussion: Where can citizens have the most impact?'
      ],
      detailedActivities: [
        {
          title: 'Policy Landscape Mapping',
          duration: '15 minutes',
          overview: 'Students map out where and how technology policy is made.',
          videoResources: [
            { title: 'How Laws Are Made', url: 'https://www.youtube.com/watch?v=Otbml6WIQPo', duration: '5 min', description: 'The legislative process explained' },
          ],
          steps: [
            { instruction: 'Brainstorm: Where does technology policy come from? Who decides?', duration: '3 min' },
            { instruction: 'Introduce three branches: Legislature (laws), Executive (regulations), Judiciary (rulings).', duration: '4 min', teacherNotes: 'Also mention state vs. federal and international levels.' },
            { instruction: 'Introduce stakeholders: Industry lobbyists, advocacy groups, academics, public.', duration: '4 min' },
            { instruction: 'Map the ecosystem: Draw relationships between branches and stakeholders.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students identify multiple venues where tech policy is made?',
          differentiation: { support: 'Provide ecosystem diagram to fill in.', extension: 'Research how a specific country makes tech policy.' },
        },
        {
          title: 'Legislative Case Study',
          duration: '20 minutes',
          overview: 'Students trace a tech policy from problem identification to enacted law.',
          steps: [
            { instruction: 'Present case: A recent tech law (COPPA, state privacy law, etc.).', duration: '4 min' },
            { instruction: 'Trace the journey: Problem identified → Bill introduced → Hearings → Amendments → Vote → Implementation.', duration: '8 min', teacherNotes: 'Emphasize how long it takes and how many decision points exist.' },
            { instruction: 'Identify stakeholder influence: Where did industry, advocates, public have impact?', duration: '5 min' },
            { instruction: 'Discussion: Was this a good law? What could have been better?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students trace a law through the policy process?',
          differentiation: { support: 'Provide case study timeline.', extension: 'Research the lobbying behind the law.' },
        },
        {
          title: 'Current Legislation Research',
          duration: '15 minutes',
          overview: 'Students research current tech bills and their status.',
          steps: [
            { instruction: 'Introduce tracking tools: Congress.gov, state legislature sites, advocacy trackers.', duration: '3 min' },
            { instruction: 'Research: Find 2-3 current tech bills. What do they do? Where are they in the process?', duration: '8 min' },
            { instruction: 'Share findings: What issues are legislators working on right now?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students find and interpret current legislation status?',
          differentiation: { support: 'Provide list of bills to research.', extension: 'Sign up for alerts on a bill you care about.' },
        },
        {
          title: 'Citizen Impact Points',
          duration: '10 minutes',
          overview: 'Students identify where citizens can most effectively influence tech policy.',
          steps: [
            { instruction: 'Review process: Where are the decision points? Which are open to public?', duration: '3 min' },
            { instruction: 'Discuss: Comment periods, hearings, elections, direct contact—what works?', duration: '4 min' },
            { instruction: 'Exit ticket: One way you could influence technology policy.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify realistic influence opportunities?',
          differentiation: { support: 'Provide influence point examples.', extension: 'Submit a public comment on a current rule.' },
        },
      ],
      materials: [
        'Policy process diagram',
        'Case study materials',
        'Current legislation tracker'
      ]
    },
    {
      title: 'Digital Rights Organizations',
      duration: '50-60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Identify major digital rights organizations',
        'Understand different approaches to advocacy',
        'Evaluate organization effectiveness and focus',
        'Find organizations aligned with specific interests'
      ],
      conceptualUnderstanding: [
        'Many organizations work on digital rights from different angles',
        'Some focus on litigation, others on legislation, others on education',
        'Organizations have different political perspectives',
        'Coalition work amplifies advocacy effectiveness'
      ],
      activities: [
        'Research: Profile major digital rights organizations',
        'Comparison: Different organizational approaches',
        'Analysis: Recent wins and ongoing campaigns',
        'Mapping: Which organizations work on which issues?'
      ],
      detailedActivities: [
        {
          title: 'Organization Research',
          duration: '20 minutes',
          overview: 'Students research and profile major digital rights organizations.',
          videoResources: [
            { title: 'Digital Rights Advocacy', url: 'https://www.youtube.com/watch?v=qXJwRWyQvNg', duration: '5 min', description: 'Overview of digital rights organizations and their work' },
          ],
          steps: [
            { instruction: 'Introduce key organizations: EFF, ACLU, Access Now, Fight for the Future, etc.', duration: '5 min' },
            { instruction: 'Assign groups to research one organization each.', duration: '2 min' },
            { instruction: 'Research: Mission, focus areas, notable wins, current campaigns, how to get involved.', duration: '10 min' },
            { instruction: 'Quick share: Each group presents their organization in 2 minutes.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students summarize an organization\'s mission and approach?',
          differentiation: { support: 'Provide research template.', extension: 'Research international digital rights organizations.' },
        },
        {
          title: 'Approach Comparison',
          duration: '15 minutes',
          overview: 'Students compare different organizational approaches to digital rights advocacy.',
          steps: [
            { instruction: 'Identify approaches: Litigation (courts), Legislation (lobbying), Education (public awareness), Direct action.', duration: '4 min' },
            { instruction: 'Categorize: Which organizations use which approaches?', duration: '4 min', teacherNotes: 'Many use multiple approaches. EFF litigates and educates. ACLU litigates and lobbies.' },
            { instruction: 'Discuss: What are strengths and weaknesses of each approach?', duration: '4 min' },
            { instruction: 'Reflection: Which approach appeals to you and why?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students compare different advocacy approaches?',
          differentiation: { support: 'Provide approach comparison chart.', extension: 'Analyze why certain approaches work for certain issues.' },
        },
        {
          title: 'Recent Wins and Campaigns',
          duration: '15 minutes',
          overview: 'Students analyze recent digital rights victories and ongoing campaigns.',
          steps: [
            { instruction: 'Present 2-3 recent digital rights wins: Net neutrality fight, privacy legislation, etc.', duration: '5 min' },
            { instruction: 'Analysis: What made these campaigns successful? Who was involved?', duration: '5 min' },
            { instruction: 'Current campaigns: What issues are organizations working on right now?', duration: '3 min' },
            { instruction: 'Exit ticket: One campaign you might want to support and why.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students identify factors in successful advocacy campaigns?',
          differentiation: { support: 'Provide campaign case study summaries.', extension: 'Interview someone who worked on a digital rights campaign.' },
        },
      ],
      materials: [
        'Organization research guide',
        'Comparison framework',
        'Recent campaign examples'
      ]
    },
    {
      title: 'Effective Advocacy Strategies',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: [
        'Analyze what makes advocacy campaigns effective',
        'Understand different advocacy tactics',
        'Learn to frame issues for different audiences',
        'Identify potential allies and opponents'
      ],
      conceptualUnderstanding: [
        'Effective advocacy combines multiple strategies',
        'Messaging must be tailored to different audiences',
        'Building coalitions strengthens campaigns',
        'Timing and targeting matter for campaign success'
      ],
      activities: [
        'Case study: Successful digital rights campaigns',
        'Analysis: What made these campaigns work?',
        'Exercise: Reframe an issue for different audiences',
        'Planning: Identify stakeholders for an issue you care about'
      ],
      detailedActivities: [
        {
          title: 'Campaign Case Study Analysis',
          duration: '20 minutes',
          overview: 'Students analyze successful digital rights campaigns to identify effective strategies.',
          videoResources: [
            { title: 'Successful Advocacy Campaigns', url: 'https://www.youtube.com/watch?v=BGP2V8n-NVQ', duration: '6 min', description: 'What makes advocacy campaigns succeed' },
          ],
          steps: [
            { instruction: 'Present 2 campaign case studies: SOPA/PIPA blackout, net neutrality, privacy legislation.', duration: '6 min' },
            { instruction: 'Analysis questions: Who was involved? What tactics were used? What was the outcome?', duration: '6 min', teacherNotes: 'SOPA: Internet companies + users + advocates coordinated unprecedented action.' },
            { instruction: 'Identify success factors: Timing, coalition, message, target, tactics.', duration: '5 min' },
            { instruction: 'Discussion: What can we learn and apply to our own campaigns?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify specific factors that made campaigns successful?',
          differentiation: { support: 'Provide case study summary with analysis questions.', extension: 'Research a failed campaign and analyze why it failed.' },
        },
        {
          title: 'Message Framing Exercise',
          duration: '20 minutes',
          overview: 'Students practice framing the same issue for different audiences.',
          steps: [
            { instruction: 'Introduce framing: Same issue, different emphasis depending on audience.', duration: '4 min' },
            { instruction: 'Example: Privacy issue framed for teens (safety), parents (protect kids), businesses (trust).', duration: '4 min' },
            { instruction: 'Practice: Choose an issue. Write 3 different framings for 3 different audiences.', duration: '8 min', teacherNotes: 'Audiences: elected officials, media, general public, business leaders.' },
            { instruction: 'Share and feedback: Which framings are most effective? Why?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students effectively frame the same issue for different audiences?',
          differentiation: { support: 'Provide framing template with audience prompts.', extension: 'Create messaging for opposing audiences on contentious issue.' },
        },
        {
          title: 'Stakeholder Mapping',
          duration: '15 minutes',
          overview: 'Students identify allies, opponents, and persuadables for an issue they care about.',
          steps: [
            { instruction: 'Choose an issue: What digital rights topic do you care about?', duration: '2 min' },
            { instruction: 'Map stakeholders: Who are allies (already agree)? Opponents (never agree)? Persuadables (might be convinced)?', duration: '6 min' },
            { instruction: 'Strategy: Where should you focus energy? (Usually persuadables, not opponents)', duration: '4 min', teacherNotes: 'Key insight: Do not waste time convincing opponents. Move persuadables.' },
            { instruction: 'Exit ticket: One persuadable stakeholder and how you might reach them.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students categorize stakeholders and identify strategic priorities?',
          differentiation: { support: 'Provide stakeholder mapping template.', extension: 'Research what messages have worked with your persuadable group.' },
        },
      ],
      materials: [
        'Campaign case studies',
        'Framing exercise worksheet',
        'Stakeholder mapping template'
      ]
    },
    {
      title: 'Planning Your Campaign',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Select an issue for your advocacy campaign',
        'Define clear campaign goals and metrics',
        'Develop messaging and materials',
        'Create an action plan with timeline'
      ],
      conceptualUnderstanding: [
        'Campaigns need clear, achievable goals',
        'Good planning increases campaign effectiveness',
        'Materials should be professional and accessible',
        'Flexibility allows responding to opportunities'
      ],
      activities: [
        'Selection: Choose your campaign issue',
        'Goal setting: What does success look like?',
        'Development: Create campaign messages and materials',
        'Planning: Build your campaign timeline and action plan'
      ],
      detailedActivities: [
        {
          title: 'Issue Selection',
          duration: '20 minutes',
          overview: 'Students select and refine an issue for their advocacy campaign.',
          steps: [
            { instruction: 'Review issues from the course: Privacy, surveillance, digital inclusion, access, rights.', duration: '3 min' },
            { instruction: 'Individual reflection: What issue do you care most about? Why?', duration: '4 min' },
            { instruction: 'Narrow focus: Broad issues need to be specific. "Privacy" → "Student data privacy in our school."', duration: '5 min', teacherNotes: 'Help students find achievable scope. Start local and specific.' },
            { instruction: 'Feasibility check: Can you actually influence this? What would success look like?', duration: '5 min' },
            { instruction: 'Finalize: Write your campaign issue in one clear sentence.', duration: '3 min' },
          ],
          formativeAssessment: 'Is the selected issue specific and achievable enough for a student campaign?',
          differentiation: { support: 'Provide issue brainstorm list.', extension: 'Research existing campaigns on your issue to learn from.' },
        },
        {
          title: 'Goal Setting and Metrics',
          duration: '20 minutes',
          overview: 'Students define SMART goals and metrics for their campaign.',
          steps: [
            { instruction: 'Introduce SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound.', duration: '4 min' },
            { instruction: 'Draft goal: What specifically do you want to achieve? By when?', duration: '6 min' },
            { instruction: 'Define metrics: How will you know if you are making progress?', duration: '5 min', teacherNotes: 'Examples: Signatures collected, views, officials contacted, policy changed.' },
            { instruction: 'Peer feedback: Are goals specific enough? Achievable?', duration: '5 min' },
          ],
          formativeAssessment: 'Are campaign goals SMART?',
          differentiation: { support: 'Provide goal-setting template.', extension: 'Create tiered goals: minimum, target, stretch.' },
        },
        {
          title: 'Message and Materials Development',
          duration: '30 minutes',
          overview: 'Students create core messages and campaign materials.',
          videoResources: [
            { title: 'Creating Effective Campaign Materials', url: 'https://www.youtube.com/watch?v=H5c4cY_kJGg', duration: '5 min', description: 'Tips for compelling advocacy materials' },
          ],
          steps: [
            { instruction: 'Core message: What is the one thing you want people to know/do?', duration: '5 min' },
            { instruction: 'Talking points: 3-5 key facts and arguments supporting your position.', duration: '8 min' },
            { instruction: 'Materials creation: Choose and create 2-3 materials (infographic, social posts, flyer, petition).', duration: '12 min' },
            { instruction: 'Peer review: Is the message clear? Are materials professional?', duration: '5 min' },
          ],
          formativeAssessment: 'Are messages clear and materials professional?',
          differentiation: { support: 'Provide material templates.', extension: 'Create coordinated multi-platform materials.' },
        },
        {
          title: 'Action Plan Creation',
          duration: '20 minutes',
          overview: 'Students create detailed action plans with timelines.',
          steps: [
            { instruction: 'Identify tactics: What actions will you take? (Petition, social media, contact officials, event)', duration: '5 min' },
            { instruction: 'Create timeline: What will you do in week 1? Week 2? Etc.', duration: '7 min' },
            { instruction: 'Assign responsibilities: If working in a group, who does what?', duration: '4 min' },
            { instruction: 'Exit ticket: First action you will take and when.', duration: '4 min' },
          ],
          formativeAssessment: 'Is the action plan specific, realistic, and sequenced appropriately?',
          differentiation: { support: 'Provide action plan template.', extension: 'Build in contingency plans for different scenarios.' },
        },
      ],
      materials: [
        'Campaign planning template',
        'Messaging development guide',
        'Material creation tools'
      ]
    },
    {
      title: 'Executing and Evaluating Your Campaign',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: [
        'Launch campaign elements',
        'Engage target audiences',
        'Track campaign metrics',
        'Reflect on effectiveness and lessons learned'
      ],
      conceptualUnderstanding: [
        'Execution requires adapting to circumstances',
        'Engagement is more valuable than reach alone',
        'Metrics help evaluate what works',
        'Reflection improves future advocacy'
      ],
      activities: [
        'Launch: Execute your campaign plan',
        'Engagement: Respond to audience and track progress',
        'Evaluation: Measure against your goals',
        'Presentation: Share your campaign and results'
      ],
      detailedActivities: [
        {
          title: 'Campaign Launch',
          duration: '25 minutes',
          overview: 'Students launch their campaign elements and begin implementation.',
          steps: [
            { instruction: 'Final preparation: Review materials, check links, confirm everything is ready.', duration: '5 min' },
            { instruction: 'Launch actions: Post content, send emails, activate petition, contact targets.', duration: '12 min', teacherNotes: 'This may extend beyond class time. Have students document what they do.' },
            { instruction: 'Initial monitoring: Check for responses, shares, any immediate feedback.', duration: '5 min' },
            { instruction: 'Troubleshoot: Address any technical or messaging issues that arise.', duration: '3 min' },
          ],
          formativeAssessment: 'Did students successfully launch their campaign elements?',
          differentiation: { support: 'Provide launch checklist.', extension: 'Coordinate launch with partner organizations.' },
        },
        {
          title: 'Engagement and Tracking',
          duration: '20 minutes',
          overview: 'Students engage with their audience and track campaign metrics.',
          steps: [
            { instruction: 'Review engagement: Who responded? What are they saying?', duration: '5 min' },
            { instruction: 'Respond: Answer questions, thank supporters, handle criticism.', duration: '6 min', teacherNotes: 'Model professional, gracious responses even to critics.' },
            { instruction: 'Track metrics: Update tracking spreadsheet with current numbers.', duration: '5 min' },
            { instruction: 'Adjust: What is working? What is not? Should you change tactics?', duration: '4 min' },
          ],
          formativeAssessment: 'Are students engaging thoughtfully with their audience?',
          differentiation: { support: 'Provide response templates.', extension: 'A/B test different messages or tactics.' },
        },
        {
          title: 'Campaign Evaluation',
          duration: '20 minutes',
          overview: 'Students evaluate their campaign against their original goals.',
          videoResources: [
            { title: 'Evaluating Advocacy Campaigns', url: 'https://www.youtube.com/watch?v=KMhGdKqXQQw', duration: '5 min', description: 'How to measure advocacy campaign success' },
          ],
          steps: [
            { instruction: 'Review goals: What did you set out to achieve?', duration: '3 min' },
            { instruction: 'Measure results: Compare actual metrics to target metrics.', duration: '5 min' },
            { instruction: 'Analyze: What worked? What did not? Why?', duration: '6 min' },
            { instruction: 'Document lessons learned: What would you do differently next time?', duration: '6 min' },
          ],
          formativeAssessment: 'Can students honestly evaluate their campaign success and failures?',
          differentiation: { support: 'Provide evaluation framework.', extension: 'Create recommendations for continuing the campaign.' },
        },
        {
          title: 'Campaign Presentations',
          duration: '25 minutes',
          overview: 'Students present their campaigns and results to the class.',
          steps: [
            { instruction: 'Prepare: Final touches on presentation materials.', duration: '5 min' },
            { instruction: 'Present: Each student/group presents their campaign (3-5 min each).', duration: '15 min', teacherNotes: 'Focus on: Issue, strategy, actions taken, results, lessons learned.' },
            { instruction: 'Q&A: Classmates ask questions and provide feedback.', duration: '3 min' },
            { instruction: 'Celebration: Acknowledge the courage and work of becoming advocates.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students clearly communicate their campaign journey and learning?',
          differentiation: { support: 'Provide presentation outline.', extension: 'Present to a broader audience (school assembly, community group).' },
        },
      ],
      materials: [
        'Campaign materials',
        'Tracking tools',
        'Presentation template'
      ]
    }
  ],
  assessment: {
    formative: [
      'Policy mapping: Accurate understanding of policy process',
      'Organization profiles: Comprehensive research on key groups',
      'Campaign plan: Clear goals, appropriate strategies',
      'Progress check-ins: Campaign development milestones'
    ],
    summative: 'Execute and document a digital rights advocacy campaign. Final presentation includes: issue background, campaign strategy, materials created, actions taken, results achieved, and reflection on lessons learned. Demonstrate evidence of real engagement (signatures collected, officials contacted, awareness raised, etc.).'
  },
  extensions: [
    'Testify at a local government hearing',
    'Organize a school-wide digital rights event',
    'Create ongoing relationship with advocacy organization',
    'Mentor younger students in digital rights'
  ],
  realWorldConnections: [
    'Citizens have successfully changed technology policies',
    'Advocacy skills transfer to any issue area',
    'Digital rights organizations actively recruit young advocates',
    'Informed civic participation strengthens democracy'
  ]
};

// Projects array
const projects: Project[] = [project1, project2, project3, project4];

// Main Page Component
export default function DigitalRightsPage() {
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
            className="inline-flex items-center text-sm text-zinc-500 hover:text-amber-400 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Tracks
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-amber-600 to-amber-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-amber-200/80 text-sm font-medium">Track F</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Digital Rights & Advocacy</h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Understand your digital rights, recognize threats to online freedom, and learn to
            advocate effectively for privacy and civil liberties in the digital age.
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
            href={`/${locale}/tech-sovereignty/linux-foss`}
            className="text-zinc-500 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Linux/FOSS
          </Link>
          <Link
            href={`/${locale}/tech-sovereignty/community`}
            className="text-zinc-500 hover:text-amber-400 transition-colors flex items-center gap-1"
          >
            Next: Community Building
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
