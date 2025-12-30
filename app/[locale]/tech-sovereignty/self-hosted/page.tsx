'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

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

// Detailed Activity Structure
interface ActivityStep {
  instruction: string;
  teacherNotes?: string;
  duration?: string;
}

interface DetailedActivity {
  title: string;
  duration: string;
  overview: string;
  steps: ActivityStep[];
  formativeAssessment?: string;
  differentiation?: {
    support: string;
    extension: string;
  };
}

// Grade Band Type
type GradeBand = '6-8' | '9-12' | '6-12';

// Types
interface Lesson {
  title: string;
  duration: string;
  gradeBand: GradeBand;
  objectives: string[];
  conceptualUnderstanding?: string[];
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
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-emerald-50/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-emerald-800">Universal Design for Learning (UDL) Supports</span>
        </div>
        <svg
          className={`w-5 h-5 text-emerald-600 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Engagement */}
          <div className="bg-white rounded-lg p-4 border border-emerald-100">
            <h6 className="text-sm font-semibold text-emerald-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center text-xs">1</span>
              Multiple Means of Engagement
              <span className="text-xs font-normal text-emerald-600">(The &quot;Why&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-gray-700 mb-1">Choice & Autonomy</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.engagement.choiceAndAutonomy.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Relevance & Authenticity</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.engagement.relevanceAndAuthenticity.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Self-Regulation</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.engagement.selfRegulation.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Representation */}
          <div className="bg-white rounded-lg p-4 border border-blue-100">
            <h6 className="text-sm font-semibold text-blue-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs">2</span>
              Multiple Means of Representation
              <span className="text-xs font-normal text-blue-600">(The &quot;What&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-gray-700 mb-1">Multiple Formats</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.representation.multipleFormats.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-blue-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Vocabulary Support</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.representation.vocabularySupport.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-blue-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Background Knowledge</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.representation.backgroundKnowledge.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-blue-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action & Expression */}
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h6 className="text-sm font-semibold text-purple-700 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-xs">3</span>
              Multiple Means of Action & Expression
              <span className="text-xs font-normal text-purple-600">(The &quot;How&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-gray-700 mb-1">Physical Options</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.actionExpression.physicalOptions.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-purple-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Expression Options</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.actionExpression.expressionOptions.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-purple-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-gray-700 mb-1">Executive Function Support</p>
                <ul className="text-gray-600 space-y-0.5">
                  {udl.actionExpression.executiveFunctionSupport.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-purple-400">•</span>
                      {item}
                    </li>
                  ))}
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
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 bg-gradient-to-r from-purple-50 to-fuchsia-50 flex items-center justify-between text-left hover:from-purple-100 hover:to-fuchsia-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <div>
            <h6 className="font-semibold text-gray-900">{activity.title}</h6>
            <p className="text-xs text-gray-500">{activity.duration}</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-purple-600 transform transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="p-4 bg-white space-y-4">
          {/* Overview */}
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-sm text-gray-700">{activity.overview}</p>
          </div>

          {/* Step-by-step instructions */}
          <div>
            <h6 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Step-by-Step Instructions
            </h6>
            <div className="space-y-3">
              {activity.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{step.instruction}</p>
                    {step.duration && (
                      <span className="inline-block mt-1 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {step.duration}
                      </span>
                    )}
                    {step.teacherNotes && (
                      <div className="mt-2 bg-amber-50 border-l-2 border-amber-400 pl-3 py-1">
                        <p className="text-xs text-amber-800">
                          <span className="font-semibold">Teacher Note:</span> {step.teacherNotes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formative Assessment */}
          {activity.formativeAssessment && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-green-800 mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check for Understanding
              </h6>
              <p className="text-xs text-green-700">{activity.formativeAssessment}</p>
            </div>
          )}

          {/* Differentiation */}
          {activity.differentiation && (
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-orange-800 mb-1">Support (Struggling Learners)</h6>
                <p className="text-xs text-orange-700">{activity.differentiation.support}</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-purple-800 mb-1">Extension (Advanced Learners)</h6>
                <p className="text-xs text-purple-700">{activity.differentiation.extension}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Lesson Card Component
const LessonCard = ({ lesson, index }: { lesson: Lesson; index: number }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900">{lesson.title}</h4>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              lesson.gradeBand === '6-8'
                ? 'bg-emerald-100 text-emerald-700'
                : lesson.gradeBand === '9-12'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-purple-100 text-purple-700'
            }`}>
              {lesson.gradeBand === '6-8' ? 'Grades 6-8' : lesson.gradeBand === '9-12' ? 'Grades 9-12' : 'Grades 6-12'}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{lesson.duration}</span>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {/* Deep Understanding - Highlighted */}
          {lesson.conceptualUnderstanding && lesson.conceptualUnderstanding.length > 0 && (
            <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-purple-800 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Deep Understanding Goals
              </h5>
              <p className="text-xs text-purple-600 mb-2 italic">Students should be able to explain in their own words:</p>
              <ul className="text-sm text-purple-900 space-y-1">
                {lesson.conceptualUnderstanding.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">&#9733;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* UDL Supports */}
          {lesson.udl && <UDLSection udl={lesson.udl} />}

          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-1">Learning Objectives</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">&#10003;</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Activities (if available) */}
          {lesson.detailedActivities && lesson.detailedActivities.length > 0 ? (
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <h5 className="text-sm font-medium text-gray-700 mb-1">Activities</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                {lesson.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-500">&#8226;</span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h5 className="text-sm font-medium text-gray-700 mb-1">Materials Needed</h5>
            <div className="flex flex-wrap gap-2">
              {lesson.materials.map((material, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {material}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Project Section Component
const ProjectSection = ({ project, isExpanded, onToggle }: { project: Project; isExpanded: boolean; onToggle: () => void }) => {
  const difficultyColors: Record<string, string> = {
    'Beginner': 'bg-green-100 text-green-800',
    'Intermediate': 'bg-yellow-100 text-yellow-800',
    'Advanced': 'bg-red-100 text-red-800',
  };

  return (
    <div id={project.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden scroll-mt-24">
      {/* Project Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[project.difficulty] || 'bg-gray-100 text-gray-800'}`}>
                {project.difficulty}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                project.gradeBand === '6-8'
                  ? 'bg-emerald-100 text-emerald-700'
                  : project.gradeBand === '9-12'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-purple-100 text-purple-700'
              }`}>
                {project.gradeBand === '6-8' ? 'Grades 6-8' : project.gradeBand === '9-12' ? 'Grades 9-12' : 'Grades 6-12'}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-800">
                {project.duration}
              </span>
            </div>
            <p className="text-gray-600">{project.description}</p>
          </div>
          <div className="ml-4 text-gray-400">
            <svg
              className={`w-6 h-6 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-6 space-y-8">
          {/* Overview */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Project Overview</h4>
            <p className="text-gray-600 leading-relaxed">{project.overview}</p>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Learning Objectives</h4>
            <p className="text-sm text-gray-500 mb-2">By the end of this project, students will be able to:</p>
            <ul className="space-y-2">
              {project.learningObjectives.map((objective, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Prerequisites</h4>
            <ul className="space-y-1">
              {project.prerequisites.map((prereq, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <span className="text-slate-500">&#8226;</span>
                  {prereq}
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Required Materials</h4>
              <ul className="space-y-2">
                {project.materials.required.map((material, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <span className="text-green-500">&#10003;</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Optional Materials</h4>
              <ul className="space-y-2">
                {project.materials.optional.map((material, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-600">
                    <span className="text-gray-400">&#9675;</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lessons */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Lesson Plans</h4>
            <div className="space-y-4">
              {project.lessons.map((lesson, i) => (
                <LessonCard key={i} lesson={lesson} index={i} />
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-slate-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Assessment</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Formative Assessment (Ongoing)</h5>
                <ul className="space-y-1">
                  {project.assessment.formative.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-slate-500">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Summative Assessment (Final)</h5>
                <p className="text-sm text-gray-600">{project.assessment.summative}</p>
              </div>
            </div>
          </div>

          {/* Extensions */}
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Extensions & Challenges</h4>
            <p className="text-sm text-gray-500 mb-2">For students who finish early or want to go deeper:</p>
            <ul className="space-y-2">
              {project.extensions.map((ext, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600">
                  <span className="text-purple-500">&#9733;</span>
                  {ext}
                </li>
              ))}
            </ul>
          </div>

          {/* Real World Connections */}
          <div className="bg-purple-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Real-World Connections</h4>
            <ul className="space-y-2">
              {project.realWorldConnections.map((connection, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-purple-500">&#8594;</span>
                  {connection}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

// Project 1: Personal Cloud Storage with Nextcloud
const project1: Project = {
  id: 'project-1',
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

// Projects array
const projects: Project[] = [project1];

// Main Page Component
export default function SelfHostedPage() {
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
          <div className="text-center py-20 text-gray-500">
            <p>Curriculum content coming soon...</p>
          </div>
        )}
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
            href={`/${locale}/tech-sovereignty`}
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
