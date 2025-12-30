'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-deep-card border border-secret/30 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-secret/20 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-text-heading mb-2">Core Pedagogical Principle: Ownership Through Understanding</h3>
        <p className="text-text-secondary mb-3">
          Self-hosting isn&apos;t just about running software—it&apos;s about understanding <strong className="text-text-heading">what your data is</strong>,
          <strong className="text-text-heading"> where it lives</strong>, and <strong className="text-text-heading">who has access to it</strong>. Students learn to make informed
          decisions about digital autonomy.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-deep-alt rounded-lg p-4 border border-deep-border">
            <h4 className="font-semibold text-secret-light mb-1">Data Awareness</h4>
            <p className="text-sm text-text-muted">Understand what data services collect, where it&apos;s stored, and why that matters for privacy and autonomy.</p>
          </div>
          <div className="bg-deep-alt rounded-lg p-4 border border-deep-border">
            <h4 className="font-semibold text-secret-light mb-1">Service Architecture</h4>
            <p className="text-sm text-text-muted">Learn how web services work: clients, servers, databases, and the flow of information between them.</p>
          </div>
          <div className="bg-deep-alt rounded-lg p-4 border border-deep-border">
            <h4 className="font-semibold text-secret-light mb-1">Trade-off Analysis</h4>
            <p className="text-sm text-text-muted">Evaluate convenience vs. control, understanding when self-hosting makes sense and when it doesn&apos;t.</p>
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
interface TeacherNotes {
  commonMisconceptions?: string[];
  keyTakeaways?: string[];
  preparationTips?: string[];
}

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
  teacherNotes?: TeacherNotes;
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
    <div className="bg-deep-alt border border-primary/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-deep-card transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-primary">Universal Design for Learning (UDL) Supports</span>
        </div>
        <svg
          className={`w-5 h-5 text-primary transform transition-transform ${expanded ? 'rotate-180' : ''}`}
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
          <div className="bg-deep-card rounded-lg p-4 border border-deep-border">
            <h6 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs">1</span>
              Multiple Means of Engagement
              <span className="text-xs font-normal text-text-muted">(The &quot;Why&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-text-heading mb-1">Choice & Autonomy</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.engagement.choiceAndAutonomy.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-1">Relevance & Authenticity</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.engagement.relevanceAndAuthenticity.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-1">Self-Regulation</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.engagement.selfRegulation.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-primary">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Representation */}
          <div className="bg-deep-card rounded-lg p-4 border border-deep-border">
            <h6 className="text-sm font-semibold text-secret mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-secret/20 text-secret rounded-full flex items-center justify-center text-xs">2</span>
              Multiple Means of Representation
              <span className="text-xs font-normal text-text-muted">(The &quot;What&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-text-heading mb-1">Multiple Formats</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.representation.multipleFormats.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-secret">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-1">Vocabulary Support</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.representation.vocabularySupport.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-secret">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-1">Background Knowledge</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.representation.backgroundKnowledge.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-secret">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action & Expression */}
          <div className="bg-deep-card rounded-lg p-4 border border-deep-border">
            <h6 className="text-sm font-semibold text-warm mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-warm/20 text-warm rounded-full flex items-center justify-center text-xs">3</span>
              Multiple Means of Action & Expression
              <span className="text-xs font-normal text-text-muted">(The &quot;How&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-text-heading mb-1">Physical Options</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.actionExpression.physicalOptions.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-warm">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-1">Expression Options</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.actionExpression.expressionOptions.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-warm">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-heading mb-1">Executive Function Support</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.actionExpression.executiveFunctionSupport.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-warm">•</span>
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
    <div className="border border-deep-border rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 bg-deep-alt flex items-center justify-between text-left hover:bg-deep-card transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-secret text-white rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <div>
            <h6 className="font-semibold text-text-heading">{activity.title}</h6>
            <p className="text-xs text-text-muted">{activity.duration}</p>
          </div>
        </div>
        <svg
          className={`w-5 h-5 text-secret transform transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="p-4 bg-deep-card space-y-4">
          {/* Overview */}
          <div className="bg-deep-alt rounded-lg p-3">
            <p className="text-sm text-text-secondary">{activity.overview}</p>
          </div>

          {/* Step-by-step instructions */}
          <div>
            <h6 className="text-sm font-semibold text-text-heading mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Step-by-Step Instructions
            </h6>
            <div className="space-y-3">
              {activity.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-secret/20 text-secret rounded-full flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-text-secondary">{step.instruction}</p>
                    {step.duration && (
                      <span className="inline-block mt-1 text-xs text-text-muted bg-deep-alt px-2 py-0.5 rounded">
                        {step.duration}
                      </span>
                    )}
                    {step.teacherNotes && (
                      <div className="mt-2 bg-warm/10 border-l-2 border-warm pl-3 py-1">
                        <p className="text-xs text-warm">
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
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Check for Understanding
              </h6>
              <p className="text-xs text-text-secondary">{activity.formativeAssessment}</p>
            </div>
          )}

          {/* Differentiation */}
          {activity.differentiation && (
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-warm/10 border border-warm/30 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-warm mb-1">Support (Struggling Learners)</h6>
                <p className="text-xs text-text-muted">{activity.differentiation.support}</p>
              </div>
              <div className="bg-secret/10 border border-secret/30 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-secret-light mb-1">Extension (Advanced Learners)</h6>
                <p className="text-xs text-text-muted">{activity.differentiation.extension}</p>
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
  <div className="bg-deep-card border border-deep-border rounded-lg p-6 hover:border-secret/30 transition-colors">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-secret text-white rounded-full flex items-center justify-center font-bold">
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-text-heading">{lesson.title}</h4>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              lesson.gradeBand === '6-8'
                ? 'bg-primary/20 text-primary'
                : lesson.gradeBand === '9-12'
                  ? 'bg-secret/20 text-secret-light'
                  : 'bg-warm/20 text-warm'
            }`}>
              {lesson.gradeBand === '6-8' ? 'Grades 6-8' : lesson.gradeBand === '9-12' ? 'Grades 9-12' : 'Grades 6-12'}
            </span>
            <span className="text-sm text-text-muted bg-deep-alt px-2 py-1 rounded">{lesson.duration}</span>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {/* Deep Understanding - Highlighted */}
          {lesson.conceptualUnderstanding && lesson.conceptualUnderstanding.length > 0 && (
            <div className="bg-secret/10 border border-secret/30 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-secret-light mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Deep Understanding Goals
              </h5>
              <p className="text-xs text-text-muted mb-2 italic">Students should be able to explain in their own words:</p>
              <ul className="text-sm text-text-secondary space-y-1">
                {lesson.conceptualUnderstanding.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secret mt-1">&#9733;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* UDL Supports */}
          {lesson.udl && <UDLSection udl={lesson.udl} />}

          <div>
            <h5 className="text-sm font-medium text-text-heading mb-1">Learning Objectives</h5>
            <ul className="text-sm text-text-secondary space-y-1">
              {lesson.objectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#10003;</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Detailed Activities (if available) */}
          {lesson.detailedActivities && lesson.detailedActivities.length > 0 ? (
            <div>
              <h5 className="text-sm font-medium text-text-heading mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <h5 className="text-sm font-medium text-text-heading mb-1">Activities</h5>
              <ul className="text-sm text-text-secondary space-y-1">
                {lesson.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-secret">&#8226;</span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h5 className="text-sm font-medium text-text-heading mb-1">Materials Needed</h5>
            <div className="flex flex-wrap gap-2">
              {lesson.materials.map((material, i) => (
                <span key={i} className="text-xs bg-deep-alt text-text-muted px-2 py-1 rounded">
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
    'Beginner': 'bg-primary/20 text-primary',
    'Intermediate': 'bg-warm/20 text-warm',
    'Advanced': 'bg-red-500/20 text-red-400',
  };

  return (
    <div id={project.id} className="bg-deep-card border border-deep-border rounded-xl overflow-hidden scroll-mt-24">
      {/* Project Header */}
      <button
        onClick={onToggle}
        className="w-full p-6 text-left hover:bg-deep-alt transition-colors"
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h3 className="text-xl font-bold text-text-heading">{project.title}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[project.difficulty] || 'bg-deep-alt text-text-muted'}`}>
                {project.difficulty}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                project.gradeBand === '6-8'
                  ? 'bg-primary/20 text-primary'
                  : project.gradeBand === '9-12'
                    ? 'bg-secret/20 text-secret-light'
                    : 'bg-warm/20 text-warm'
              }`}>
                {project.gradeBand === '6-8' ? 'Grades 6-8' : project.gradeBand === '9-12' ? 'Grades 9-12' : 'Grades 6-12'}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-deep-alt text-text-muted">
                {project.duration}
              </span>
            </div>
            <p className="text-text-secondary">{project.description}</p>
          </div>
          <div className="ml-4 text-text-muted">
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
        <div className="border-t border-deep-border p-6 space-y-8">
          {/* Overview */}
          <div>
            <h4 className="text-lg font-semibold text-text-heading mb-3">Project Overview</h4>
            <p className="text-text-secondary leading-relaxed">{project.overview}</p>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="text-lg font-semibold text-text-heading mb-3">Learning Objectives</h4>
            <p className="text-sm text-text-muted mb-2">By the end of this project, students will be able to:</p>
            <ul className="space-y-2">
              {project.learningObjectives.map((objective, i) => (
                <li key={i} className="flex items-start gap-3 text-text-secondary">
                  <span className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                    {i + 1}
                  </span>
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          <div>
            <h4 className="text-lg font-semibold text-text-heading mb-3">Prerequisites</h4>
            <ul className="space-y-1">
              {project.prerequisites.map((prereq, i) => (
                <li key={i} className="flex items-center gap-2 text-text-secondary">
                  <span className="text-text-muted">&#8226;</span>
                  {prereq}
                </li>
              ))}
            </ul>
          </div>

          {/* Materials */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-text-heading mb-3">Required Materials</h4>
              <ul className="space-y-2">
                {project.materials.required.map((material, i) => (
                  <li key={i} className="flex items-center gap-2 text-text-secondary">
                    <span className="text-primary">&#10003;</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-heading mb-3">Optional Materials</h4>
              <ul className="space-y-2">
                {project.materials.optional.map((material, i) => (
                  <li key={i} className="flex items-center gap-2 text-text-secondary">
                    <span className="text-text-muted">&#9675;</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lessons */}
          <div>
            <h4 className="text-lg font-semibold text-text-heading mb-4">Lesson Plans</h4>
            <div className="space-y-4">
              {project.lessons.map((lesson, i) => (
                <LessonCard key={i} lesson={lesson} index={i} />
              ))}
            </div>
          </div>

          {/* Assessment */}
          <div className="bg-deep-alt rounded-lg p-6">
            <h4 className="text-lg font-semibold text-text-heading mb-4">Assessment</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-text-heading mb-2">Formative Assessment (Ongoing)</h5>
                <ul className="space-y-1">
                  {project.assessment.formative.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-text-muted">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-text-heading mb-2">Summative Assessment (Final)</h5>
                <p className="text-sm text-text-secondary">{project.assessment.summative}</p>
              </div>
            </div>
          </div>

          {/* Extensions */}
          <div>
            <h4 className="text-lg font-semibold text-text-heading mb-3">Extensions & Challenges</h4>
            <p className="text-sm text-text-muted mb-2">For students who finish early or want to go deeper:</p>
            <ul className="space-y-2">
              {project.extensions.map((ext, i) => (
                <li key={i} className="flex items-start gap-2 text-text-secondary">
                  <span className="text-secret">&#9733;</span>
                  {ext}
                </li>
              ))}
            </ul>
          </div>

          {/* Real World Connections */}
          <div className="bg-secret/10 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-text-heading mb-3">Real-World Connections</h4>
            <ul className="space-y-2">
              {project.realWorldConnections.map((connection, i) => (
                <li key={i} className="flex items-start gap-2 text-text-secondary">
                  <span className="text-secret">&#8594;</span>
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

// Project 2: Private Communication with Matrix
const project2: Project = {
  id: 'private-communication',
  title: 'Project 2: Private Communication with Matrix',
  description: 'Deploy your own encrypted chat server using Matrix and Element',
  difficulty: 'Intermediate',
  duration: '3-4 weeks',
  gradeBand: '9-12',
  overview: `Students set up a Matrix homeserver for private, encrypted communication. They'll learn about end-to-end encryption, federation, and how modern chat systems work. Unlike centralized services like WhatsApp or Discord, Matrix allows servers to talk to each other—just like email. This project teaches both the technical skills and the conceptual understanding needed to make informed choices about communication privacy.`,
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
      'Domain name with DNS access',
      'SSL certificate (Let\'s Encrypt)'
    ],
    optional: [
      'TURN server for voice/video calls',
      'Additional storage for media files',
      'Second device for testing verification'
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
        'E2EE: even the server operator cannot read your messages'
      ],
      activities: [
        'Message Flow Diagrams',
        'Physical Encryption Demo',
        'Research Matrix Protocol'
      ],
      detailedActivities: [
        {
          title: 'Message Flow Diagrams',
          duration: '25 minutes',
          overview: 'Students diagram how messages travel in different systems to understand the trust relationships involved.',
          steps: [
            { instruction: 'In groups, draw the path a text message takes from your phone to your friend\'s phone via SMS', teacherNotes: 'Have students consider: who can read this message at each step?' },
            { instruction: 'Draw the same diagram for WhatsApp', teacherNotes: 'Discuss: what does "end-to-end encrypted" mean in WhatsApp\'s case?' },
            { instruction: 'Draw how email works between two different providers (Gmail to Outlook)', teacherNotes: 'This is the federation model—servers talking to servers' },
            { instruction: 'Discuss as class: which model gives you the most control?', teacherNotes: 'There\'s no "right" answer—convenience vs control trade-offs' }
          ],
          formativeAssessment: 'Students can correctly identify where messages are readable in each system'
        },
        {
          title: 'Physical Encryption Demo',
          duration: '30 minutes',
          overview: 'Using physical objects, demonstrate how encryption protects message content even from the delivery service.',
          steps: [
            { instruction: 'Set up 3 stations: Sender, Server (you), Recipient', teacherNotes: 'You\'ll act as the "server" passing messages' },
            { instruction: 'Round 1: Pass a folded note (unencrypted). Can the server read it? Yes.', duration: '5 min' },
            { instruction: 'Round 2: Put note in envelope, seal it (basic encryption). Server can see sender/recipient but not content.', duration: '5 min' },
            { instruction: 'Round 3: Give sender and recipient matching locks they set up beforehand (E2EE). Even if server opens envelope, content is locked.', teacherNotes: 'This is how key exchange works—keys established before server involved' },
            { instruction: 'Discussion: What information can the server ALWAYS see? (Metadata)', teacherNotes: 'Even E2EE reveals who talks to whom and when' }
          ],
          formativeAssessment: 'Students can explain why E2EE is different from regular encryption',
          differentiation: {
            support: 'Provide pre-drawn diagrams showing the envelope analogy',
            extension: 'Research how Signal Protocol achieves forward secrecy'
          }
        },
        {
          title: 'Research Matrix Protocol',
          duration: '30 minutes',
          overview: 'Students explore the Matrix ecosystem to understand what they\'ll be building.',
          steps: [
            { instruction: 'Visit matrix.org and read the "What is Matrix?" page', teacherNotes: 'Focus on federation and interoperability concepts' },
            { instruction: 'Find 3 organizations that use Matrix for official communication', teacherNotes: 'German healthcare, French government (Tchap), Mozilla' },
            { instruction: 'Compare Matrix to other options: Signal, Discord, Slack', teacherNotes: 'Make a table: centralized?, E2EE?, self-hostable?, bridges?' },
            { instruction: 'Write 1 paragraph: Why might a school want to run their own Matrix server?', teacherNotes: 'Look for: data ownership, privacy, independence from companies' }
          ]
        }
      ],
      materials: ['Envelopes, paper, small locks with keys for encryption demo', 'Computers for research portion'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose which messaging systems to compare', 'Select research focus area'],
          relevanceAndAuthenticity: ['Discuss apps students actually use', 'Real organization case studies'],
          selfRegulation: ['Reflection on own messaging habits', 'Privacy preference assessment']
        },
        representation: {
          multipleFormats: ['Physical demonstrations', 'Visual diagrams', 'Written explanations'],
          vocabularySupport: ['Glossary of encryption terms', 'Analogy reference sheet'],
          backgroundKnowledge: ['Review of client-server model from Project 1', 'Comparison to familiar apps']
        },
        actionExpression: {
          physicalOptions: ['Draw on paper or digital whiteboard', 'Physical participation in demo'],
          expressionOptions: ['Diagram, written explanation, or verbal presentation'],
          executiveFunctionSupport: ['Research questions provided', 'Comparison table template']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Students often think "encrypted" means no one can read messages—clarify transport vs E2E encryption',
          'Some students believe WhatsApp is private because Facebook "can\'t read messages"—discuss metadata',
          'Federation can be confused with decentralization—they\'re related but distinct'
        ],
        keyTakeaways: [
          'Trust is distributed differently in centralized vs federated systems',
          'E2EE protects content but not metadata',
          'Self-hosting gives maximum control but requires more work'
        ],
        preparationTips: [
          'Test the envelope demo beforehand—timing matters',
          'Have backup examples of Matrix deployments ready',
          'Prepare to discuss current events related to messaging privacy'
        ]
      }
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
        'Why Matrix uses PostgreSQL instead of SQLite for production',
        'Reverse proxy: one public entry point routing to multiple services'
      ],
      activities: [
        'Docker Architecture Review',
        'Deploy Synapse Stack',
        'Configure Nginx Reverse Proxy'
      ],
      detailedActivities: [
        {
          title: 'Docker Architecture Review',
          duration: '15 minutes',
          overview: 'Understand why we use Docker for deploying complex services.',
          steps: [
            { instruction: 'Diagram the difference between running software directly vs in Docker', teacherNotes: 'Focus on isolation and reproducibility' },
            { instruction: 'Discuss: why might Synapse need multiple containers? (web server, database, Synapse itself)', teacherNotes: 'This is the microservices pattern' },
            { instruction: 'Review docker-compose.yml structure from Project 1', teacherNotes: 'Reinforce that compose orchestrates multiple containers' }
          ]
        },
        {
          title: 'Deploy Synapse Stack',
          duration: '45 minutes',
          overview: 'Use Docker Compose to deploy a complete Matrix homeserver.',
          steps: [
            { instruction: 'Create project directory: mkdir ~/matrix && cd ~/matrix', teacherNotes: 'Separate from Nextcloud to keep things organized' },
            { instruction: 'Create docker-compose.yml with Synapse, PostgreSQL, and Nginx', teacherNotes: 'Provide template—students modify for their domain' },
            { instruction: 'Generate Synapse configuration: docker run --rm -v ./data:/data matrixdotorg/synapse generate', teacherNotes: 'Explain what each generated file does' },
            { instruction: 'Modify homeserver.yaml: set server_name to your domain', teacherNotes: 'server_name cannot be changed later!' },
            { instruction: 'Start the stack: docker-compose up -d', teacherNotes: 'Check logs if issues arise' },
            { instruction: 'Create first admin user: docker exec -it synapse register_new_matrix_user -c /data/homeserver.yaml http://localhost:8008', teacherNotes: 'Save these credentials securely!' }
          ],
          formativeAssessment: 'Students can explain what each container in the stack does',
          differentiation: {
            support: 'Provide complete docker-compose.yml to modify rather than write from scratch',
            extension: 'Configure persistent logging and log rotation'
          }
        },
        {
          title: 'Configure Nginx Reverse Proxy',
          duration: '25 minutes',
          overview: 'Set up Nginx to route Matrix traffic and handle SSL.',
          steps: [
            { instruction: 'Explain the reverse proxy concept: one public port, multiple internal services', teacherNotes: 'Draw diagram: internet → nginx:443 → synapse:8008' },
            { instruction: 'Add Nginx configuration for Matrix endpoints', teacherNotes: 'Key endpoints: /_matrix, /_synapse' },
            { instruction: 'Configure SSL with Let\'s Encrypt (or reuse existing certificate)', teacherNotes: 'Matrix requires HTTPS for federation' },
            { instruction: 'Test: curl https://yourdomain/_matrix/client/versions', teacherNotes: 'Should return JSON with supported versions' }
          ]
        }
      ],
      materials: ['Server with Docker from Project 1', 'Docker Compose file template', 'Nginx configuration template'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose server name/branding', 'Decide on resource limits'],
          relevanceAndAuthenticity: ['Students run their own chat server', 'Real production setup patterns'],
          selfRegulation: ['Troubleshooting checklist', 'Success verification steps']
        },
        representation: {
          multipleFormats: ['Architecture diagrams', 'Command-line walkthrough', 'Configuration file comments'],
          vocabularySupport: ['Docker terminology glossary', 'Matrix-specific terms explained'],
          backgroundKnowledge: ['Review of Docker concepts from Project 1', 'Database basics']
        },
        actionExpression: {
          physicalOptions: ['Command-line or GUI tools', 'Pair programming option'],
          expressionOptions: ['Document setup process', 'Create architecture diagram'],
          executiveFunctionSupport: ['Step-by-step checklist', 'Verification commands at each stage']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Students may think server_name is just a display name—it\'s the permanent identity',
          'PostgreSQL may seem unnecessary for small installs—explain performance at scale',
          'Reverse proxy seems like extra complexity—explain security and flexibility benefits'
        ],
        keyTakeaways: [
          'Container orchestration makes complex deployments manageable',
          'Databases handle persistence while application handles logic',
          'Reverse proxies are standard practice for production services'
        ],
        preparationTips: [
          'Test the full deployment on your own server first',
          'Have pre-built docker-compose.yml files ready for troubleshooting',
          'Prepare for DNS propagation delays if students are setting up new domains'
        ]
      }
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
        'SRV records: how servers discover each other',
        'Matrix IDs: @user:server.com format and why it matters',
        'Federation delegation: running your server on a subdomain while using main domain for IDs'
      ],
      activities: [
        'Understanding Matrix Federation',
        'Configure DNS Records',
        'Test Federation'
      ],
      detailedActivities: [
        {
          title: 'Understanding Matrix Federation',
          duration: '20 minutes',
          overview: 'Learn how Matrix servers find and communicate with each other.',
          steps: [
            { instruction: 'Compare Matrix federation to email: @user:server.com ≈ user@server.com', teacherNotes: 'The analogy is very close' },
            { instruction: 'Diagram: what happens when @alice:server-a.com messages @bob:server-b.com?', teacherNotes: 'Server A must find Server B, then deliver message' },
            { instruction: 'Discuss: why is this better than everyone using matrix.org?', teacherNotes: 'Independence, privacy, resilience' },
            { instruction: 'Research: find the DNS records used for Matrix federation (SRV, .well-known)', teacherNotes: 'Two methods: SRV records or .well-known files' }
          ]
        },
        {
          title: 'Configure DNS Records',
          duration: '30 minutes',
          overview: 'Set up the DNS records needed for your server to join the federation.',
          steps: [
            { instruction: 'Add SRV record: _matrix._tcp.yourdomain → your server IP', teacherNotes: 'Format: _matrix._tcp.domain. 3600 IN SRV 10 0 443 matrix.domain.' },
            { instruction: 'Or configure .well-known/matrix/server endpoint', teacherNotes: '.well-known is simpler if you have web hosting already' },
            { instruction: 'Add .well-known/matrix/client for client discovery', teacherNotes: 'Helps Element and other clients find your server' },
            { instruction: 'Test DNS resolution: dig _matrix._tcp.yourdomain SRV', teacherNotes: 'May need to wait for DNS propagation' }
          ],
          formativeAssessment: 'Students can explain why both server and client discovery endpoints are needed'
        },
        {
          title: 'Test Federation',
          duration: '35 minutes',
          overview: 'Verify your server can communicate with the wider Matrix network.',
          steps: [
            { instruction: 'Use federation tester: federationtester.matrix.org', teacherNotes: 'Shows exactly what\'s working or broken' },
            { instruction: 'Log into Element web (element.io) with your Matrix account', teacherNotes: 'Use your @user:yourdomain.com ID' },
            { instruction: 'Join a public room on matrix.org (like #matrix:matrix.org)', teacherNotes: 'This proves federation is working' },
            { instruction: 'Invite a classmate from a different server to a room on yours', teacherNotes: 'Test both directions of federation' },
            { instruction: 'Document what worked and any issues encountered', teacherNotes: 'Troubleshooting federation is a valuable skill' }
          ],
          differentiation: {
            support: 'Pair students for troubleshooting, provide step-by-step DNS guide',
            extension: 'Set up federation with multiple Matrix servers, explore server ACLs'
          }
        }
      ],
      materials: ['DNS management access', 'Federation tester website', 'Element web access'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose federation testing partners', 'Select public rooms to join'],
          relevanceAndAuthenticity: ['Connect with global Matrix network', 'Real federation like real services'],
          selfRegulation: ['Federation checklist', 'Troubleshooting flowchart']
        },
        representation: {
          multipleFormats: ['DNS record examples', 'Federation flow diagrams', 'Video tutorials'],
          vocabularySupport: ['DNS terminology glossary', 'Matrix federation terms'],
          backgroundKnowledge: ['Review of DNS from networking unit', 'Email federation comparison']
        },
        actionExpression: {
          physicalOptions: ['Use DNS management GUI or command line', 'Test via web or CLI tools'],
          expressionOptions: ['Write documentation or create video walkthrough'],
          executiveFunctionSupport: ['Step-by-step DNS setup guide', 'Verification checkpoints']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Students may think federation happens automatically—it requires correct configuration',
          'SRV records and .well-known seem redundant—they\'re alternative methods, not both required',
          'Federation issues are often blamed on Matrix—usually it\'s DNS or firewall configuration'
        ],
        keyTakeaways: [
          'Federation is what makes Matrix decentralized—any server can talk to any other',
          'DNS is the foundation of server discovery on the internet',
          'Testing federation early prevents harder debugging later'
        ],
        preparationTips: [
          'Have DNS propagation checking tools bookmarked',
          'Set up a test account on matrix.org for federation testing',
          'Prepare troubleshooting guide for common federation issues'
        ]
      }
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
        'Cross-signing: cryptographically verifying that devices belong to users',
        'Key backup: recovering encrypted message history on new devices',
        'Metadata: understanding what encryption protects vs what remains visible'
      ],
      activities: [
        'Understanding E2EE in Matrix',
        'Device Verification Workshop',
        'Admin Powers and Limitations'
      ],
      detailedActivities: [
        {
          title: 'Understanding E2EE in Matrix',
          duration: '20 minutes',
          overview: 'Deep dive into how Matrix implements end-to-end encryption.',
          steps: [
            { instruction: 'Review: in Lesson 1, we discussed E2EE conceptually. Now let\'s see the implementation.', teacherNotes: 'Connect back to envelope demo' },
            { instruction: 'Explain Olm/Megolm: how Matrix encrypts messages', teacherNotes: 'Olm for 1:1 key exchange, Megolm for group efficiency' },
            { instruction: 'Discuss: what does the server see in an encrypted room?', teacherNotes: 'Metadata: who, when, room membership—but not content' },
            { instruction: 'As server admin, try to read an encrypted message from the database', teacherNotes: 'They\'ll see encrypted blobs—proves E2EE works!' }
          ]
        },
        {
          title: 'Device Verification Workshop',
          duration: '35 minutes',
          overview: 'Practice the security rituals that make E2EE trustworthy.',
          steps: [
            { instruction: 'Create an encrypted room with a partner', teacherNotes: 'Enable encryption when creating the room' },
            { instruction: 'Start device verification process in Element', teacherNotes: 'Click the shield icon next to their name' },
            { instruction: 'Compare security keys using emoji or QR code', teacherNotes: 'This proves you\'re talking to the real person, not an attacker' },
            { instruction: 'Discuss: why is verification important? What attacks does it prevent?', teacherNotes: 'Man-in-the-middle attacks' },
            { instruction: 'Set up cross-signing for your own devices', teacherNotes: 'Once set up, new devices can be verified from verified devices' },
            { instruction: 'Test key backup: log out, log back in, verify message history', teacherNotes: 'Without backup, encrypted history is lost on logout' }
          ],
          formativeAssessment: 'Students can explain what verification proves and why it matters'
        },
        {
          title: 'Admin Powers and Limitations',
          duration: '30 minutes',
          overview: 'Understand what a server admin can and cannot access.',
          steps: [
            { instruction: 'Log into your Synapse admin interface', teacherNotes: 'Via Synapse Admin or command line' },
            { instruction: 'List what admin can do: see users, rooms, server stats', teacherNotes: 'Powerful administrative capabilities' },
            { instruction: 'Demonstrate what admin CANNOT do: read E2EE message content', teacherNotes: 'Query database directly to show encrypted blobs' },
            { instruction: 'Configure message retention policies', teacherNotes: 'Even if you can\'t read messages, you can delete them' },
            { instruction: 'Discussion: what responsibilities come with running a server?', teacherNotes: 'Legal, ethical, community standards' }
          ],
          differentiation: {
            support: 'Guided admin interface tour with screenshots',
            extension: 'Research legal implications of hosting communication services'
          }
        }
      ],
      materials: ['Multiple devices for verification testing', 'Element client on each device', 'Database access for admin demonstration'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose verification method (emoji/QR)', 'Select retention policy approach'],
          relevanceAndAuthenticity: ['Real security practices used by journalists and activists', 'Actual privacy protection'],
          selfRegulation: ['Security checklist', 'Verification completion tracker']
        },
        representation: {
          multipleFormats: ['Live demonstration', 'Written guides', 'Video tutorials'],
          vocabularySupport: ['Encryption glossary', 'Key management terms'],
          backgroundKnowledge: ['Encryption concepts from Lesson 1', 'Database concepts from Project 1']
        },
        actionExpression: {
          physicalOptions: ['QR code or emoji verification', 'GUI or CLI administration'],
          expressionOptions: ['Document security setup', 'Create user guide for classmates'],
          executiveFunctionSupport: ['Step-by-step verification guide', 'Admin tasks checklist']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Students may think encryption is automatic—it must be enabled per-room in Matrix',
          'Verification seems paranoid—explain targeted attacks on high-value targets',
          'Server admin = all-powerful is wrong—E2EE specifically limits admin power'
        ],
        keyTakeaways: [
          'E2EE protects content even from the server operator',
          'Verification is how you know encryption is working correctly',
          'Running a server comes with responsibilities, not just powers'
        ],
        preparationTips: [
          'Have multiple test devices ready',
          'Create a cheat sheet for Element\'s verification UI',
          'Prepare database queries that demonstrate encrypted content'
        ]
      }
    }
  ],
  assessment: {
    formative: [
      'Can students explain the difference between centralized and federated communication?',
      'Configuration file review: can students explain each setting in homeserver.yaml?',
      'Diagram check: can students show message flow with encryption?'
    ],
    summative: 'Working Matrix server that can: create encrypted rooms, federate with matrix.org, demonstrate that admin cannot read E2EE messages'
  },
  extensions: [
    'Set up TURN server for voice/video calls (coturn)',
    'Install Matrix bridges (IRC, Slack, Discord)',
    'Configure SSO integration with your Nextcloud from Project 1',
    'Set up Element web client on your own domain',
    'Explore Matrix Spaces for organizing rooms'
  ],
  realWorldConnections: [
    'German government\'s Matrix deployment for healthcare communication',
    'French government\'s Tchap (Matrix-based) official messaging system',
    'Mozilla\'s migration from IRC to Matrix for community chat',
    'Open source communities using Matrix for real-time collaboration'
  ]
};

// Project 3: Personal Website with Static Site Generator
const project3: Project = {
  id: 'personal-website',
  title: 'Project 3: Personal Website with Static Site Generator',
  description: 'Build and host your own website using Hugo or Jekyll without relying on social media platforms',
  difficulty: 'Beginner',
  duration: '2-3 weeks',
  gradeBand: '6-12',
  overview: `Students create their own personal website using a static site generator, learning the difference between static and dynamic websites. They'll understand how the web works at a fundamental level, host their site without depending on social media platforms, and gain digital ownership skills that last a lifetime. This project is accessible to younger students while still teaching important concepts.`,
  learningObjectives: [
    'Understand the difference between static and dynamic websites',
    'Use a static site generator (Hugo or Jekyll) to build a website',
    'Deploy a website using GitHub Pages or similar free hosting',
    'Explain how DNS and web hosting work together'
  ],
  prerequisites: [
    'Basic computer skills',
    'Text editing fundamentals',
    'No prior coding experience required'
  ],
  materials: {
    required: [
      'Computer with internet access',
      'Text editor (VS Code recommended)',
      'GitHub account (free)'
    ],
    optional: [
      'Custom domain name',
      'Raspberry Pi for self-hosting',
      'Basic HTML/CSS knowledge'
    ]
  },
  lessons: [
    {
      title: 'Lesson 1: How Does the Web Work?',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Explain what happens when you visit a website',
        'Distinguish between static and dynamic websites',
        'Understand why owning your own website matters'
      ],
      conceptualUnderstanding: [
        'Browsers request files from servers using URLs',
        'Static sites: pre-built HTML files served as-is',
        'Dynamic sites: server generates HTML on each request',
        'Your website = your digital home that you control'
      ],
      activities: [
        'Web Request Journey',
        'Static vs Dynamic Comparison',
        'Why Own Your Website?'
      ],
      detailedActivities: [
        {
          title: 'Web Request Journey',
          duration: '20 minutes',
          overview: 'Trace what happens from typing a URL to seeing a webpage.',
          steps: [
            { instruction: 'Open browser developer tools (F12), go to Network tab', teacherNotes: 'This reveals the hidden communication' },
            { instruction: 'Type a simple URL and watch the requests flow', teacherNotes: 'Notice HTML, CSS, JS, images loading separately' },
            { instruction: 'Draw a diagram: Your Computer → DNS → Server → Response', teacherNotes: 'Each step is a real network hop' },
            { instruction: 'Discuss: what if the server is slow or down?', teacherNotes: 'Leads into static vs dynamic discussion' }
          ],
          formativeAssessment: 'Students can explain the journey of a web request'
        },
        {
          title: 'Static vs Dynamic Comparison',
          duration: '20 minutes',
          overview: 'Understand the key differences between static and dynamic websites.',
          steps: [
            { instruction: 'Visit a static site (like a documentation site) and view source', teacherNotes: 'HTML is all there, readable' },
            { instruction: 'Visit a dynamic site (like Twitter) and view source', teacherNotes: 'Often just JavaScript, content loads later' },
            { instruction: 'Create a comparison table: speed, complexity, hosting cost, security', teacherNotes: 'Static wins on most metrics for simple sites' },
            { instruction: 'Discussion: when would you need a dynamic site?', teacherNotes: 'User accounts, real-time data, personalization' }
          ],
          differentiation: {
            support: 'Provide pre-made comparison table to fill in',
            extension: 'Research how CDNs make static sites even faster'
          }
        },
        {
          title: 'Why Own Your Website?',
          duration: '15 minutes',
          overview: 'Discuss digital ownership and why personal websites matter.',
          steps: [
            { instruction: 'List all the places students share content online', teacherNotes: 'Instagram, TikTok, YouTube, etc.' },
            { instruction: 'Discuss: who owns that content? What happens if the platform closes?', teacherNotes: 'MySpace, Vine are historical examples' },
            { instruction: 'Your website = content you control forever', teacherNotes: 'Even if hosting moves, you keep everything' },
            { instruction: 'Brainstorm: what would you put on your personal website?', teacherNotes: 'Portfolio, blog, projects, art, etc.' }
          ]
        }
      ],
      materials: ['Computers with browsers', 'Whiteboard for diagrams'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose websites to analyze', 'Select personal website topic'],
          relevanceAndAuthenticity: ['Connect to platforms students use', 'Real ownership concerns'],
          selfRegulation: ['Reflection on digital presence', 'Goal setting for personal site']
        },
        representation: {
          multipleFormats: ['Visual network diagrams', 'Browser developer tools', 'Discussion'],
          vocabularySupport: ['Web terminology glossary', 'HTTP/HTML basics explained'],
          backgroundKnowledge: ['Start from everyday browsing experience']
        },
        actionExpression: {
          physicalOptions: ['Draw diagrams on paper or digitally', 'Type or speak observations'],
          expressionOptions: ['Written notes, verbal discussion, or visual diagrams'],
          executiveFunctionSupport: ['Structured comparison table', 'Step-by-step browser inspection']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Students may think websites are "in the cloud" without physical servers',
          'Static sounds boring or limited—emphasize that most sites can be static',
          'Some think you need to code to have a website—generators handle that'
        ],
        keyTakeaways: [
          'Every website is files served from a computer somewhere',
          'Static sites are simpler, faster, cheaper, and more secure',
          'Owning your website gives you digital independence'
        ],
        preparationTips: [
          'Have examples of static and dynamic sites ready',
          'Test browser dev tools in the classroom browser',
          'Prepare discussion about platform closures (Vine, MySpace)'
        ]
      }
    },
    {
      title: 'Lesson 2: Setting Up Your Site Generator',
      duration: '90 minutes',
      gradeBand: '6-12',
      objectives: [
        'Install and configure Hugo or Jekyll',
        'Create a new site with a theme',
        'Understand the file structure of a static site'
      ],
      conceptualUnderstanding: [
        'Site generators turn content files into HTML',
        'Themes provide design without coding',
        'Content is separate from presentation',
        'Markdown: simple text formatting'
      ],
      activities: [
        'Install Hugo/Jekyll',
        'Create Your First Site',
        'Explore the File Structure'
      ],
      detailedActivities: [
        {
          title: 'Install Hugo/Jekyll',
          duration: '25 minutes',
          overview: 'Set up the static site generator on student computers.',
          steps: [
            { instruction: 'For Hugo: download binary or use package manager', teacherNotes: 'Hugo is a single binary, easier for classroom setup' },
            { instruction: 'Verify installation: hugo version', teacherNotes: 'Should show version number' },
            { instruction: 'Discuss what a site generator does', teacherNotes: 'Takes your content + theme = complete website' },
            { instruction: 'Compare to alternatives: writing HTML by hand vs. using Wix/Squarespace', teacherNotes: 'Generator is middle ground: control + convenience' }
          ],
          formativeAssessment: 'Students can run hugo version successfully'
        },
        {
          title: 'Create Your First Site',
          duration: '40 minutes',
          overview: 'Initialize a new Hugo site and add a theme.',
          steps: [
            { instruction: 'Run: hugo new site mywebsite', teacherNotes: 'Creates folder structure' },
            { instruction: 'Explore the generated folders: content, themes, static, config', teacherNotes: 'Each has a purpose' },
            { instruction: 'Add a theme: git clone a theme into themes folder', teacherNotes: 'Recommend simple themes like Ananke or PaperMod' },
            { instruction: 'Update config.toml with theme name and site title', teacherNotes: 'Config controls site-wide settings' },
            { instruction: 'Run: hugo server', teacherNotes: 'Live preview at localhost:1313' },
            { instruction: 'Open browser and see your site!', teacherNotes: 'Celebrate this milestone!' }
          ],
          differentiation: {
            support: 'Provide pre-configured config.toml files',
            extension: 'Explore theme customization options'
          }
        },
        {
          title: 'Explore the File Structure',
          duration: '20 minutes',
          overview: 'Understand what each folder and file does.',
          steps: [
            { instruction: 'content/: where your posts and pages live', teacherNotes: 'This is what you edit day-to-day' },
            { instruction: 'themes/: design and layout files', teacherNotes: 'You can customize or swap these' },
            { instruction: 'static/: images, CSS, JS that don\'t change', teacherNotes: 'Files here copy directly to output' },
            { instruction: 'public/: the generated site (after hugo build)', teacherNotes: 'This is what gets uploaded to hosting' },
            { instruction: 'Create a diagram showing how files flow', teacherNotes: 'content + theme → hugo → public' }
          ]
        }
      ],
      materials: ['Computers with Hugo installed', 'Terminal/command line access', 'Text editor'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose site name and theme', 'Personalize config settings'],
          relevanceAndAuthenticity: ['Building their actual website', 'Real tool used professionally'],
          selfRegulation: ['Checkpoint: site running locally', 'Troubleshooting checklist']
        },
        representation: {
          multipleFormats: ['Command-line walkthrough', 'File structure diagrams', 'Live preview'],
          vocabularySupport: ['Command-line terminology', 'Hugo-specific terms'],
          backgroundKnowledge: ['Connect to Lesson 1 concepts', 'File/folder basics']
        },
        actionExpression: {
          physicalOptions: ['Type commands or use GUI file manager', 'Pair programming option'],
          expressionOptions: ['Document setup process', 'Screenshot progress'],
          executiveFunctionSupport: ['Step-by-step command list', 'Expected output examples']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Students may confuse the source files with the generated output',
          'hugo server vs hugo build confusion—one is preview, one is production',
          'Theme installation can fail if not in correct folder'
        ],
        keyTakeaways: [
          'Site generators automate the tedious parts of web development',
          'Content and design are intentionally separate',
          'Local preview lets you test before publishing'
        ],
        preparationTips: [
          'Pre-download Hugo binaries for faster classroom setup',
          'Have theme zip files available if git clone is slow',
          'Test the full workflow on classroom computers beforehand'
        ]
      }
    },
    {
      title: 'Lesson 3: Creating Content with Markdown',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: [
        'Write content using Markdown syntax',
        'Create posts and pages for your site',
        'Add images and links to your content'
      ],
      conceptualUnderstanding: [
        'Markdown: simple formatting that converts to HTML',
        'Front matter: metadata at the top of content files',
        'Content organization: posts, pages, sections'
      ],
      activities: [
        'Markdown Basics',
        'Create Your First Post',
        'Add Images and Links'
      ],
      detailedActivities: [
        {
          title: 'Markdown Basics',
          duration: '20 minutes',
          overview: 'Learn the simple syntax for formatting text.',
          steps: [
            { instruction: 'Create a test.md file in a text editor', teacherNotes: 'Any editor works, VS Code has nice preview' },
            { instruction: 'Practice: # Heading, **bold**, *italic*, - lists', teacherNotes: 'Start with most common elements' },
            { instruction: 'Preview the Markdown (VS Code preview or online tool)', teacherNotes: 'See how it converts to formatted text' },
            { instruction: 'Discussion: why use Markdown instead of Word?', teacherNotes: 'Portable, version-controllable, future-proof' }
          ],
          formativeAssessment: 'Students can format a paragraph with headings, bold, and lists'
        },
        {
          title: 'Create Your First Post',
          duration: '25 minutes',
          overview: 'Add content to your Hugo site.',
          steps: [
            { instruction: 'Run: hugo new posts/my-first-post.md', teacherNotes: 'Creates file with front matter template' },
            { instruction: 'Open the file and examine the front matter', teacherNotes: 'Title, date, draft status' },
            { instruction: 'Write 2-3 paragraphs about something you care about', teacherNotes: 'Personal interest makes it engaging' },
            { instruction: 'Set draft: false in front matter', teacherNotes: 'Otherwise post won\'t appear' },
            { instruction: 'Check hugo server preview', teacherNotes: 'Post should appear on home page' }
          ],
          differentiation: {
            support: 'Provide topic prompts and sentence starters',
            extension: 'Create multiple posts with categories/tags'
          }
        },
        {
          title: 'Add Images and Links',
          duration: '15 minutes',
          overview: 'Enhance your posts with media and navigation.',
          steps: [
            { instruction: 'Add an image to static/images/ folder', teacherNotes: 'Can be personal photo or free stock' },
            { instruction: 'Reference in Markdown: ![Alt text](/images/photo.jpg)', teacherNotes: 'Path starts from site root' },
            { instruction: 'Add a link: [Link text](https://example.com)', teacherNotes: 'Can be internal or external' },
            { instruction: 'Preview and verify images/links work', teacherNotes: 'Common issue: wrong path' }
          ]
        }
      ],
      materials: ['Text editor with Markdown preview', 'Sample images to use'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose post topics', 'Select images'],
          relevanceAndAuthenticity: ['Writing about personal interests', 'Real content for their site'],
          selfRegulation: ['Markdown cheat sheet', 'Preview before publish']
        },
        representation: {
          multipleFormats: ['Written syntax guide', 'Live preview', 'Before/after comparisons'],
          vocabularySupport: ['Markdown syntax reference card', 'Front matter explanation'],
          backgroundKnowledge: ['Connect to word processing familiarity']
        },
        actionExpression: {
          physicalOptions: ['Type or use Markdown editor with buttons', 'Voice-to-text for content'],
          expressionOptions: ['Write original content or adapt existing'],
          executiveFunctionSupport: ['Post template', 'Checklist: front matter, content, images']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Markdown seems harder than Word—it\'s actually simpler once learned',
          'Image paths confuse students—always start from site root',
          'draft: true in front matter hides posts—common gotcha'
        ],
        keyTakeaways: [
          'Markdown is a universal, future-proof format',
          'Front matter controls how content appears',
          'Preview locally before publishing'
        ],
        preparationTips: [
          'Print Markdown cheat sheets for desks',
          'Have sample images ready to share',
          'Prepare example front matter for different post types'
        ]
      }
    },
    {
      title: 'Lesson 4: Publishing Your Site',
      duration: '90 minutes',
      gradeBand: '6-12',
      objectives: [
        'Build the final site files',
        'Deploy to GitHub Pages (free hosting)',
        'Optionally configure a custom domain'
      ],
      conceptualUnderstanding: [
        'hugo build creates the deployable files',
        'GitHub Pages hosts static sites for free',
        'DNS connects your domain to your hosting',
        'Your site is now live on the real internet!'
      ],
      activities: [
        'Build Your Site',
        'Deploy to GitHub Pages',
        'Custom Domain Setup (Optional)'
      ],
      detailedActivities: [
        {
          title: 'Build Your Site',
          duration: '15 minutes',
          overview: 'Generate the final HTML files for deployment.',
          steps: [
            { instruction: 'Run: hugo (without server)', teacherNotes: 'Creates/updates public folder' },
            { instruction: 'Explore the public/ folder', teacherNotes: 'This is your complete website' },
            { instruction: 'Open public/index.html in browser', teacherNotes: 'Works without server—it\'s just files!' },
            { instruction: 'Discuss: these files can go on any web server', teacherNotes: 'Flexibility of static sites' }
          ],
          formativeAssessment: 'Students have a public/ folder with their complete site'
        },
        {
          title: 'Deploy to GitHub Pages',
          duration: '50 minutes',
          overview: 'Put your site on the internet for free using GitHub.',
          steps: [
            { instruction: 'Create GitHub account if needed', teacherNotes: 'Free, requires email verification' },
            { instruction: 'Create new repository named username.github.io', teacherNotes: 'Special name gives you free hosting' },
            { instruction: 'Upload public/ folder contents to repository', teacherNotes: 'Can use web upload or git' },
            { instruction: 'Enable GitHub Pages in repository settings', teacherNotes: 'Deploy from main branch' },
            { instruction: 'Wait 1-2 minutes, then visit https://username.github.io', teacherNotes: 'Your site is live!' },
            { instruction: 'Celebrate! Share your URL with classmates', teacherNotes: 'This is a real accomplishment!' }
          ],
          differentiation: {
            support: 'Use GitHub web interface for uploads',
            extension: 'Set up GitHub Actions for automatic deployment'
          }
        },
        {
          title: 'Custom Domain Setup (Optional)',
          duration: '20 minutes',
          overview: 'Connect your own domain name to your site.',
          steps: [
            { instruction: 'If you have a domain, access DNS settings', teacherNotes: 'This is optional/advanced' },
            { instruction: 'Add CNAME record pointing to username.github.io', teacherNotes: 'Or A records for apex domain' },
            { instruction: 'Add custom domain in GitHub Pages settings', teacherNotes: 'GitHub will verify DNS' },
            { instruction: 'Enable HTTPS', teacherNotes: 'GitHub provides free SSL certificates' }
          ]
        }
      ],
      materials: ['GitHub accounts', 'Completed Hugo site', 'Optional: domain name'],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choose repository name', 'Decide on custom domain'],
          relevanceAndAuthenticity: ['Site is live on real internet', 'Shareable with family/friends'],
          selfRegulation: ['Deployment checklist', 'Verification steps']
        },
        representation: {
          multipleFormats: ['Step-by-step screenshots', 'Video walkthrough option', 'Written guide'],
          vocabularySupport: ['GitHub terminology', 'DNS basics explained'],
          backgroundKnowledge: ['Connect to web request journey from Lesson 1']
        },
        actionExpression: {
          physicalOptions: ['Web interface or command line', 'Pair deployment'],
          expressionOptions: ['Document process', 'Help classmates deploy'],
          executiveFunctionSupport: ['Deployment checklist', 'Troubleshooting FAQ']
        }
      },
      teacherNotes: {
        commonMisconceptions: [
          'Students may think GitHub is only for code—it hosts any files',
          'username.github.io naming is required for free hosting to work',
          'DNS propagation takes time—custom domains don\'t work instantly'
        ],
        keyTakeaways: [
          'Static sites can be hosted for free',
          'Your site is now globally accessible',
          'You own this content and can move it anywhere'
        ],
        preparationTips: [
          'Create a demo GitHub account for walkthrough',
          'Have troubleshooting guide ready for common issues',
          'Prepare celebration activity when sites go live'
        ]
      }
    }
  ],
  assessment: {
    formative: [
      'Can students explain static vs dynamic websites?',
      'Site preview working locally?',
      'Content formatted correctly in Markdown?'
    ],
    summative: 'Published personal website with at least 3 posts, working navigation, and accessible at a public URL'
  },
  extensions: [
    'Add a custom theme or modify existing one',
    'Set up comments using Disqus or utterances',
    'Create a portfolio section with project showcases',
    'Add an RSS feed for subscribers',
    'Self-host on Raspberry Pi with Nginx'
  ],
  realWorldConnections: [
    'Many developers and writers use static site generators for blogs',
    'Major documentation sites use Hugo/Jekyll (Kubernetes, Bootstrap)',
    'The "IndieWeb" movement promotes personal website ownership',
    'College application portfolios benefit from personal websites'
  ]
};

// Projects array
const projects: Project[] = [project1, project2, project3];

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
    <main className="min-h-screen bg-deep">
      {/* Header */}
      <div className="bg-deep-alt border-b border-deep-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center text-sm text-text-muted hover:text-secret transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Tracks
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-secret to-secret-light text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <span className="text-secret-light/80 text-sm font-medium">Track B</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Self-Hosted Services</h1>
          <p className="text-xl text-white/90 max-w-3xl">
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
          <div className="text-center py-20 text-text-muted">
            <p>Curriculum content coming soon...</p>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="bg-deep-alt border-t border-deep-border">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between">
          <Link
            href={`/${locale}/tech-sovereignty/networking`}
            className="text-text-muted hover:text-secret transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous: Networking
          </Link>
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="text-text-muted hover:text-secret transition-colors flex items-center gap-1"
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
