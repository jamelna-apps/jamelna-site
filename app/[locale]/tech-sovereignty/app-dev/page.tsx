'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-zinc-800 border border-sky-500/30 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-sky-500/20 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Core Pedagogical Principle: Building for Community</h3>
        <p className="text-zinc-300 mb-3">
          Development skills empower communities to create their own tools rather than depending on outside solutions.
          Students learn to <strong className="text-white">identify needs</strong>, <strong className="text-white">design solutions</strong>,
          and <strong className="text-white">build software</strong> that serves their specific context.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-sky-300 mb-1">Problem-First Thinking</h4>
            <p className="text-sm text-zinc-500">Start with real problems, not technology. The best solutions come from understanding actual needs.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-sky-300 mb-1">Iterative Development</h4>
            <p className="text-sm text-zinc-500">Build small, test often, improve continuously. Perfect is the enemy of good enough to help.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-sky-300 mb-1">Sustainable Solutions</h4>
            <p className="text-sm text-zinc-500">Create tools others can understand, maintain, and adapt. Individual heroics don&apos;t scale.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Types
interface UDLFramework {
  engagement: { choiceAndAutonomy: string[]; relevanceAndAuthenticity: string[]; selfRegulation: string[]; };
  representation: { multipleFormats: string[]; vocabularySupport: string[]; backgroundKnowledge: string[]; };
  actionExpression: { physicalOptions: string[]; expressionOptions: string[]; executiveFunctionSupport: string[]; };
}

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
  differentiation?: { support: string; extension: string; };
}

interface Lesson {
  title: string;
  duration: string;
  gradeBand: '6-8' | '9-12' | '6-12';
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
  gradeBand: '6-8' | '9-12' | '6-12';
  overview: string;
  learningObjectives: string[];
  prerequisites: string[];
  materials: { required: string[]; optional: string[]; };
  lessons: Lesson[];
  assessment: { formative: string[]; summative: string; };
  extensions: string[];
  realWorldConnections: string[];
}

// UDL Section Component (Full 3-part expanded)
const UDLSection = ({ udl }: { udl: UDLFramework }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="bg-zinc-950 border border-sky-500/30 rounded-lg overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-sky-300">Universal Design for Learning (UDL) Supports</span>
        </div>
        <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4 border border-sky-500/20">
            <h6 className="text-sm font-semibold text-sky-300 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-sky-500/20 rounded-full flex items-center justify-center text-xs">1</span>
              Multiple Means of Engagement <span className="text-xs font-normal text-zinc-500">(The &quot;Why&quot;)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div><p className="font-medium text-zinc-300 mb-1">Choice & Autonomy</p><ul className="text-zinc-500 space-y-0.5">{udl.engagement.choiceAndAutonomy.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-sky-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Relevance</p><ul className="text-zinc-500 space-y-0.5">{udl.engagement.relevanceAndAuthenticity.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-sky-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Self-Regulation</p><ul className="text-zinc-500 space-y-0.5">{udl.engagement.selfRegulation.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-sky-400">•</span>{item}</li>)}</ul></div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 border border-orange-500/20">
            <h6 className="text-sm font-semibold text-orange-400 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-xs">2</span>
              Multiple Means of Representation <span className="text-xs font-normal text-zinc-500">(The &quot;What&quot;)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div><p className="font-medium text-zinc-300 mb-1">Multiple Formats</p><ul className="text-zinc-500 space-y-0.5">{udl.representation.multipleFormats.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-orange-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Vocabulary Support</p><ul className="text-zinc-500 space-y-0.5">{udl.representation.vocabularySupport.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-orange-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Background Knowledge</p><ul className="text-zinc-500 space-y-0.5">{udl.representation.backgroundKnowledge.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-orange-400">•</span>{item}</li>)}</ul></div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 border border-purple-500/20">
            <h6 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-xs">3</span>
              Multiple Means of Action & Expression <span className="text-xs font-normal text-zinc-500">(The &quot;How&quot;)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div><p className="font-medium text-zinc-300 mb-1">Physical Options</p><ul className="text-zinc-500 space-y-0.5">{udl.actionExpression.physicalOptions.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-purple-300">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Expression Options</p><ul className="text-zinc-500 space-y-0.5">{udl.actionExpression.expressionOptions.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-purple-300">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Executive Function</p><ul className="text-zinc-500 space-y-0.5">{udl.actionExpression.executiveFunctionSupport.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-purple-300">•</span>{item}</li>)}</ul></div>
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
    <div className="border border-zinc-700 rounded-lg overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 bg-zinc-950 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors">
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
          <div><h6 className="font-semibold text-white">{activity.title}</h6><p className="text-xs text-zinc-500">{activity.duration}</p></div>
        </div>
        <svg className={`w-5 h-5 text-sky-400 transform transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="p-4 bg-zinc-800 space-y-4">
          <div className="bg-zinc-950 rounded-lg p-3"><p className="text-sm text-zinc-300">{activity.overview}</p></div>
          {activity.videoResources && activity.videoResources.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h6 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Video Resources
              </h6>
              <div className="space-y-2">{activity.videoResources.map((video, i) => (
                <a key={i} href={video.url} target="_blank" rel="noopener noreferrer" className="block bg-zinc-800 rounded p-2 hover:bg-red-500/20 transition-colors border border-red-500/30">
                  <div className="flex items-start justify-between gap-2"><div><p className="text-sm font-medium text-red-300">{video.title}</p><p className="text-xs text-red-300">{video.description}</p></div><span className="flex-shrink-0 text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">{video.duration}</span></div>
                </a>
              ))}</div>
            </div>
          )}
          <div>
            <h6 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              Step-by-Step Instructions
            </h6>
            <div className="space-y-3">{activity.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-sky-500/20 text-sky-400 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                <div className="flex-1">
                  <p className="text-sm text-zinc-300">{step.instruction}</p>
                  {step.duration && <span className="inline-block mt-1 text-xs text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded">{step.duration}</span>}
                  {step.teacherNotes && <div className="mt-2 bg-amber-500/10 border-l-2 border-amber-400 pl-3 py-1"><p className="text-xs text-amber-300"><span className="font-semibold">Teacher Note:</span> {step.teacherNotes}</p></div>}
                </div>
              </div>
            ))}</div>
          </div>
          {activity.formativeAssessment && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-green-300 mb-1 flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Check for Understanding</h6>
              <p className="text-xs text-green-300">{activity.formativeAssessment}</p>
            </div>
          )}
          {activity.differentiation && (
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-3"><h6 className="text-xs font-semibold text-sky-300 mb-1">Support (Struggling Learners)</h6><p className="text-xs text-sky-300">{activity.differentiation.support}</p></div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3"><h6 className="text-xs font-semibold text-purple-300 mb-1">Extension (Advanced Learners)</h6><p className="text-xs text-purple-300">{activity.differentiation.extension}</p></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Lesson Card Component
const LessonCard = ({ lesson, index, projectId }: { lesson: Lesson; index: number; projectId: string }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div id={`${projectId}-lesson-${index + 1}`} className="bg-zinc-800 border border-zinc-700 rounded-lg overflow-hidden scroll-mt-24">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-700 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-950 text-white rounded-full flex items-center justify-center font-bold">{index + 1}</div>
          <div>
            <h4 className="font-semibold text-white">{lesson.title}</h4>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span>{lesson.duration}</span>
              <span className={`text-xs px-2 py-1 rounded font-medium ${lesson.gradeBand === '6-8' ? 'bg-sky-500/20 text-sky-300' : lesson.gradeBand === '9-12' ? 'bg-orange-500/20 text-orange-400' : 'bg-purple-500/20 text-purple-300'}`}>
                {lesson.gradeBand === '6-8' ? 'Grades 6-8' : lesson.gradeBand === '9-12' ? 'Grades 9-12' : 'Grades 6-12'}
              </span>
            </div>
          </div>
        </div>
        <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="p-4 border-t border-zinc-700 space-y-4">
          {lesson.conceptualUnderstanding && lesson.conceptualUnderstanding.length > 0 && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                Deep Understanding Goals
              </h5>
              <p className="text-xs text-indigo-400 mb-2 italic">Students should be able to explain in their own words:</p>
              <ul className="text-sm text-indigo-300 space-y-1">{lesson.conceptualUnderstanding.map((item, i) => <li key={i} className="flex items-start gap-2"><span className="text-indigo-500 mt-1">★</span>{item}</li>)}</ul>
            </div>
          )}
          {lesson.udl && <UDLSection udl={lesson.udl} />}
          <div><h5 className="text-sm font-medium text-zinc-300 mb-1">Learning Objectives</h5><ul className="text-sm text-zinc-500 space-y-1">{lesson.objectives.map((obj, i) => <li key={i} className="flex items-start gap-2"><span className="text-green-500 mt-1">✓</span>{obj}</li>)}</ul></div>
          {lesson.detailedActivities && lesson.detailedActivities.length > 0 ? (
            <div>
              <h5 className="text-sm font-medium text-zinc-300 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Detailed Activities
              </h5>
              <div className="space-y-3">{lesson.detailedActivities.map((activity, i) => <DetailedActivityCard key={i} activity={activity} index={i} />)}</div>
            </div>
          ) : (
            <div><h5 className="font-medium text-sky-300 mb-2">Activities</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.activities.map((activity, i) => <li key={i}>{activity}</li>)}</ul></div>
          )}
          <div><h5 className="font-medium text-sky-300 mb-2">Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.materials.map((material, i) => <li key={i}>{material}</li>)}</ul></div>
        </div>
      )}
    </div>
  );
};

// Project Section Component
const ProjectSection = ({ project, isExpanded, onToggle }: { project: Project; isExpanded: boolean; onToggle: () => void }) => (
  <div id={project.id} className="bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden scroll-mt-24">
    <button onClick={onToggle} className="w-full p-6 flex items-center justify-between text-left hover:bg-zinc-700 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-300' : project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-red-500/20 text-red-300'}`}>{project.difficulty}</span>
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
        <div className="bg-zinc-950 rounded-lg p-4"><h4 className="font-semibold text-white mb-2">Project Overview</h4><p className="text-zinc-400 text-sm">{project.overview}</p></div>
        <div><h4 className="font-semibold text-white mb-3">Learning Objectives</h4><ul className="grid md:grid-cols-2 gap-2">{project.learningObjectives.map((obj, i) => (<li key={i} className="flex items-start gap-2 text-sm text-zinc-400"><svg className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{obj}</li>))}</ul></div>
        {project.prerequisites.length > 0 && <div><h4 className="font-semibold text-white mb-3">Prerequisites</h4><ul className="flex flex-wrap gap-2">{project.prerequisites.map((prereq, i) => <li key={i} className="text-xs px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full">{prereq}</li>)}</ul></div>}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-zinc-950 rounded-lg p-4"><h5 className="font-medium text-sky-300 mb-2">Required Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.materials.required.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
          <div className="bg-zinc-950 rounded-lg p-4"><h5 className="font-medium text-sky-300 mb-2">Optional Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.materials.optional.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
        </div>
        <div><h4 className="font-semibold text-white mb-3">Lessons</h4><div className="space-y-3">{project.lessons.map((lesson, i) => <LessonCard key={i} lesson={lesson} index={i} projectId={project.id} />)}</div></div>
        <div className="bg-zinc-950 rounded-lg p-4"><h4 className="font-semibold text-white mb-3">Assessment</h4><div className="grid md:grid-cols-2 gap-4"><div><h5 className="font-medium text-sky-300 mb-2">Formative Assessment</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.assessment.formative.map((a, i) => <li key={i}>{a}</li>)}</ul></div><div><h5 className="font-medium text-sky-300 mb-2">Summative Assessment</h5><p className="text-sm text-zinc-400">{project.assessment.summative}</p></div></div></div>
        <div><h4 className="font-semibold text-white mb-3">Real-World Connections</h4><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.realWorldConnections.map((conn, i) => <li key={i}>{conn}</li>)}</ul></div>
      </div>
    )}
  </div>
);

// Project Data
const project1: Project = {
  id: 'project-1',
  title: 'Project 1: Web Development Fundamentals',
  description: 'Learn the building blocks of the web: HTML, CSS, and JavaScript. Create your first interactive webpage.',
  difficulty: 'Beginner',
  duration: '3-4 weeks',
  gradeBand: '6-12',
  overview: 'Students learn how websites work from the ground up, understanding the structure (HTML), style (CSS), and behavior (JavaScript) that make up every webpage. They build their first site from scratch.',
  learningObjectives: [
    'Understand how web browsers render pages',
    'Write semantic HTML to structure content',
    'Apply CSS for layout and styling',
    'Add interactivity with basic JavaScript',
    'Use browser developer tools for debugging',
    'Deploy a website for others to access'
  ],
  prerequisites: ['Basic computer literacy', 'Typing skills'],
  materials: {
    required: ['Computer with modern browser', 'Text editor (VS Code recommended)', 'Internet connection'],
    optional: ['GitHub account for deployment', 'Design software for mockups']
  },
  lessons: [
    {
      title: 'How the Web Works',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Explain client-server model', 'Understand HTTP requests/responses', 'Identify HTML, CSS, and JS roles'],
      conceptualUnderstanding: ['Browsers request resources from servers', 'HTML is content, CSS is style, JS is behavior', 'Developer tools reveal page structure'],
      activities: ['Exploration: Inspect your favorite website', 'Diagram: Client-server communication', 'Analysis: Identify HTML, CSS, JS'],
      materials: ['Browser with dev tools', 'Diagram templates'],
      detailedActivities: [
        {
          title: 'Opening: What Happens When You Visit a Website?',
          duration: '12 minutes',
          overview: 'Students explore what actually happens behind the scenes when they type a URL and press Enter.',
          videoResources: [
            { title: 'How the Internet Works in 5 Minutes', url: 'https://www.youtube.com/watch?v=7_LPdttKXPc', duration: '4:58', description: 'Simple visual explanation of web requests' }
          ],
          steps: [
            { instruction: 'Ask students: "What do you think happens when you type google.com and press Enter?" Record guesses on the board.', duration: '3 min', teacherNotes: 'Most students think the website lives "in the internet" - this is the misconception we\'ll address.' },
            { instruction: 'Show the video explaining client-server communication. Pause to highlight: your computer (client) asks another computer (server) for files.', duration: '5 min' },
            { instruction: 'Introduce the analogy: "Visiting a website is like ordering food. You (client) give your order (request) to the restaurant (server), and they send back your food (response)."', duration: '2 min' },
            { instruction: 'Quick check: "In our analogy, what would a 404 error be?" (Restaurant doesn\'t have that dish)', duration: '2 min' }
          ],
          formativeAssessment: 'Students can explain client-server model using the restaurant analogy.',
          differentiation: { support: 'Provide a visual diagram showing client-server communication.', extension: 'Research what DNS does and why we need it.' }
        },
        {
          title: 'Exploring Developer Tools',
          duration: '20 minutes',
          overview: 'Students use browser developer tools to peek behind the curtain of their favorite websites.',
          steps: [
            { instruction: 'Demonstrate opening developer tools (Right-click > Inspect or F12). Show the Elements panel.', duration: '3 min', teacherNotes: 'Chrome DevTools recommended, but works in Firefox and Edge too.' },
            { instruction: 'Navigate to the Network tab. Refresh the page and watch all the requests appear. "Each line is your browser asking the server for a file."', duration: '4 min' },
            { instruction: 'Click on a request to see details: URL, status code (200 = success), file type, size.', duration: '3 min' },
            { instruction: 'Students explore: Visit their favorite website, open DevTools, count how many requests are made on page load.', duration: '8 min', teacherNotes: 'Social media sites often have 100+ requests. This surprises students!' },
            { instruction: 'Share findings: "Who had the most requests? What types of files were requested?"', duration: '2 min' }
          ],
          formativeAssessment: 'Students can identify network requests and explain what they represent.',
          differentiation: { support: 'Pair students and provide a guided worksheet.', extension: 'Find the largest file being loaded and explain why it might be so big.' }
        },
        {
          title: 'HTML, CSS, and JavaScript: The Three Languages',
          duration: '15 minutes',
          overview: 'Students discover the three languages of the web by disabling CSS and JavaScript.',
          steps: [
            { instruction: 'On a news website, right-click and inspect an element. Show the HTML in the Elements panel.', duration: '3 min' },
            { instruction: 'Demonstrate disabling CSS (DevTools > Elements > Styles > uncheck all). Watch the page become unstyled plain text.', duration: '3 min', teacherNotes: 'The page becomes like a Word document from the 1990s. Great visual impact!' },
            { instruction: 'Re-enable CSS. Now disable JavaScript (Settings > Debugger > Disable JavaScript). Try interactive features - they won\'t work.', duration: '4 min' },
            { instruction: 'Summarize: "HTML is the skeleton (structure), CSS is the skin and clothes (appearance), JavaScript is the muscles (interactivity)."', duration: '3 min' },
            { instruction: 'Exit ticket: Students draw and label a simple diagram showing what each language does.', duration: '2 min' }
          ],
          formativeAssessment: 'Students can identify the role of HTML, CSS, and JS in any webpage.',
          differentiation: { support: 'Provide the skeleton/skin/muscles analogy as a handout.', extension: 'Find and disable JavaScript on a game website - observe what breaks.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose websites to explore', 'Freedom in what requests to investigate', 'Personal interest in site selection'],
          relevanceAndAuthenticity: ['Uses real websites students visit daily', 'Skills directly applicable to understanding technology', 'Demystifies the web'],
          selfRegulation: ['DevTools provide immediate feedback', 'Exploration promotes curiosity', 'Exit ticket promotes reflection']
        },
        representation: {
          multipleFormats: ['Video explanation', 'Live demonstration', 'Hands-on exploration'],
          vocabularySupport: ['Client-server explained with restaurant analogy', 'Technical terms introduced with everyday comparisons', 'Visual diagrams support understanding'],
          backgroundKnowledge: ['Connects to daily web usage experience', 'No programming knowledge required', 'Builds from familiar (using websites) to new (understanding how they work)']
        },
        actionExpression: {
          physicalOptions: ['Keyboard or mouse navigation', 'Individual or paired exploration', 'Drawing or writing for exit ticket'],
          expressionOptions: ['Verbal sharing or written documentation', 'Diagram or text explanation', 'Group discussion or individual reflection'],
          executiveFunctionSupport: ['Step-by-step DevTools introduction', 'Clear sequence of activities', 'Analogies provide mental frameworks']
        }
      }
    },
    {
      title: 'HTML: Structure and Semantics',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Write valid HTML documents', 'Use semantic elements appropriately', 'Structure content logically'],
      conceptualUnderstanding: ['HTML provides meaning and structure', 'Semantic elements improve accessibility', 'Proper structure helps search engines'],
      activities: ['Coding: First HTML page', 'Practice: Semantic element selection', 'Building: Multi-section page'],
      materials: ['Text editor', 'HTML reference'],
      detailedActivities: [
        {
          title: 'Your First HTML Document',
          duration: '20 minutes',
          overview: 'Students create their first HTML file from scratch, learning the essential structure.',
          videoResources: [
            { title: 'HTML in 100 Seconds', url: 'https://www.youtube.com/watch?v=ok-plXXHlWw', duration: '2:22', description: 'Fast-paced overview of HTML basics' }
          ],
          steps: [
            { instruction: 'Create a new file called "index.html" in VS Code (or your text editor).', duration: '2 min', teacherNotes: 'Ensure all students have VS Code or similar installed. Have alternatives ready.' },
            { instruction: 'Type the HTML boilerplate: <!DOCTYPE html>, <html>, <head>, <body>. Explain each part.', duration: '5 min', teacherNotes: 'DOCTYPE tells the browser it\'s HTML5. Head is metadata. Body is visible content.' },
            { instruction: 'Inside <body>, add: <h1>Hello World</h1> and <p>This is my first webpage.</p>', duration: '3 min' },
            { instruction: 'Save and open the file in a browser. Celebrate: "You just built your first webpage!"', duration: '3 min' },
            { instruction: 'Practice: Add more elements - another paragraph, a list (<ul><li>), a link (<a href>).', duration: '5 min' },
            { instruction: 'View source in the browser to confirm your HTML is being read correctly.', duration: '2 min' }
          ],
          formativeAssessment: 'All students have a working HTML file displaying in the browser.',
          differentiation: { support: 'Provide the boilerplate code to copy. Focus on understanding, not typing.', extension: 'Add an image with the <img> tag.' }
        },
        {
          title: 'Semantic Elements: Meaning Matters',
          duration: '20 minutes',
          overview: 'Students learn why using the right HTML elements matters for accessibility and SEO.',
          steps: [
            { instruction: 'Demo: Show two pages - one using all <div>s, one using semantic elements (<header>, <nav>, <main>, <article>, <footer>). They look the same.', duration: '4 min' },
            { instruction: 'Now demonstrate a screen reader on both pages. The semantic version is navigable; the div soup is confusing.', duration: '5 min', teacherNotes: 'Use ChromeVox or NVDA. This is powerful - students hear the difference.' },
            { instruction: 'Discuss: "Who benefits from semantic HTML?" (Blind users, search engines, future developers, mobile readers)', duration: '3 min' },
            { instruction: 'Challenge: Give students a list of content types (navigation, main article, sidebar, footer). They identify the right semantic element for each.', duration: '5 min' },
            { instruction: 'Quick quiz: "Which is better: <div class=\'header\'> or <header>?" Explain why.', duration: '3 min' }
          ],
          formativeAssessment: 'Students can identify appropriate semantic elements for different content types.',
          differentiation: { support: 'Provide a semantic elements cheat sheet with examples.', extension: 'Research ARIA roles and when to use them.' }
        },
        {
          title: 'Building a Multi-Section Page',
          duration: '20 minutes',
          overview: 'Students apply their learning to create a structured page about themselves.',
          steps: [
            { instruction: 'Students create a new file: "about.html". It will be a personal introduction page.', duration: '2 min' },
            { instruction: 'Plan the structure first: Header (name), Nav (links to sections), Main (with sections for bio, interests, goals), Footer (contact).', duration: '5 min' },
            { instruction: 'Code the structure using semantic elements. Content can be placeholder text for now.', duration: '10 min', teacherNotes: 'Walk around and help students structure their content logically.' },
            { instruction: 'Validate HTML using the W3C validator (validator.w3.org). Fix any errors.', duration: '3 min' }
          ],
          formativeAssessment: 'Pages validate without errors and use appropriate semantic elements.',
          differentiation: { support: 'Provide a template with the structure to fill in.', extension: 'Add multiple pages with navigation between them.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Personal page content choices', 'Element experimentation encouraged', 'Individual pace during building'],
          relevanceAndAuthenticity: ['Creating something personal', 'Skills used in real web development', 'Understanding accessibility impacts real people'],
          selfRegulation: ['W3C validator provides automated feedback', 'Screen reader demo reveals impact', 'Iterative improvement encouraged']
        },
        representation: {
          multipleFormats: ['Video overview', 'Live coding demonstration', 'Hands-on practice'],
          vocabularySupport: ['Semantic explained through meaning and purpose', 'Element names connected to their function', 'Accessibility terminology introduced'],
          backgroundKnowledge: ['Builds on Lesson 1 understanding', 'No prior coding required', 'Content from personal experience']
        },
        actionExpression: {
          physicalOptions: ['Typing code or copying templates', 'Individual or paired work', 'Using validation tools'],
          expressionOptions: ['Personal page content reflects interests', 'Technical or creative focus', 'Simple or complex structure'],
          executiveFunctionSupport: ['Step-by-step file creation', 'Planning before coding', 'Validation as checkpoint']
        }
      }
    },
    {
      title: 'CSS: Styling and Layout',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Apply CSS to HTML elements', 'Use selectors and properties', 'Create responsive layouts'],
      conceptualUnderstanding: ['CSS controls visual presentation', 'Selectors target specific elements', 'Flexbox and Grid enable layouts'],
      activities: ['Styling: Add CSS to HTML page', 'Practice: Selector challenges', 'Building: Responsive layout'],
      materials: ['CSS reference', 'Layout exercises'],
      detailedActivities: [
        {
          title: 'Adding Style to Your Page',
          duration: '20 minutes',
          overview: 'Students learn to connect CSS to HTML and apply their first styles.',
          videoResources: [
            { title: 'CSS in 100 Seconds', url: 'https://www.youtube.com/watch?v=OEV8gMkCHXQ', duration: '2:32', description: 'Quick overview of CSS capabilities' }
          ],
          steps: [
            { instruction: 'Create a new file: "style.css" in the same folder as your HTML.', duration: '2 min' },
            { instruction: 'Link CSS to HTML: Add <link rel="stylesheet" href="style.css"> in the <head>.', duration: '3 min' },
            { instruction: 'Add your first rule: body { background-color: lightblue; }. Save and refresh. It works!', duration: '3 min' },
            { instruction: 'Explain CSS syntax: selector { property: value; }. The selector picks what to style, the property says what to change, the value says how.', duration: '4 min' },
            { instruction: 'Practice: Change h1 color, p font-size, add padding to main. Experiment freely.', duration: '6 min', teacherNotes: 'Let students play. Discovery is powerful. Help those who are stuck.' },
            { instruction: 'Introduce browser inspect to see styles live. Change values in DevTools to preview instantly.', duration: '2 min' }
          ],
          formativeAssessment: 'Students can write CSS rules and see them applied to their page.',
          differentiation: { support: 'Provide a CSS starter file with commented properties to try.', extension: 'Try CSS custom properties (variables) for colors.' }
        },
        {
          title: 'Selectors: Targeting Elements',
          duration: '15 minutes',
          overview: 'Students learn to precisely target elements for styling.',
          steps: [
            { instruction: 'Review selector types: element (p), class (.intro), id (#header), combined (nav a).', duration: '4 min' },
            { instruction: 'Add classes to your HTML: <p class="intro"> for the first paragraph.', duration: '3 min' },
            { instruction: 'Style by class: .intro { font-weight: bold; }. Compare to styling all p elements.', duration: '3 min' },
            { instruction: 'Selector challenge game: Given HTML, write the selector that would target specific elements.', duration: '5 min', teacherNotes: 'Make this interactive - show HTML, students race to write the correct selector.' }
          ],
          formativeAssessment: 'Students can write selectors to target specific elements.',
          differentiation: { support: 'Provide a selector reference card.', extension: 'Explore pseudo-classes like :hover and :first-child.' }
        },
        {
          title: 'Layout with Flexbox',
          duration: '25 minutes',
          overview: 'Students learn modern layout with Flexbox, creating responsive designs.',
          videoResources: [
            { title: 'Flexbox in 100 Seconds', url: 'https://www.youtube.com/watch?v=K74l26pE4YA', duration: '1:53', description: 'Visual introduction to Flexbox' }
          ],
          steps: [
            { instruction: 'The problem: How do we put things side by side? Show the difficulty of layout before Flexbox.', duration: '3 min' },
            { instruction: 'The solution: Add display: flex; to a container. Watch children line up horizontally.', duration: '4 min' },
            { instruction: 'Key properties: justify-content (horizontal), align-items (vertical), flex-wrap (wrapping).', duration: '5 min' },
            { instruction: 'Practice: Create a navigation bar using Flexbox. Items should spread across evenly.', duration: '8 min', teacherNotes: 'nav { display: flex; justify-content: space-between; }' },
            { instruction: 'Responsive challenge: Make the nav stack vertically on small screens using flex-direction.', duration: '5 min' }
          ],
          formativeAssessment: 'Students create a responsive navigation with Flexbox.',
          differentiation: { support: 'Provide Flexbox cheat sheet with visual examples.', extension: 'Create a complete page layout using Flexbox.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Color and style choices personal', 'Free experimentation encouraged', 'Individual creative expression'],
          relevanceAndAuthenticity: ['Styling their own personal page', 'CSS used on every website', 'Visual results are immediately satisfying'],
          selfRegulation: ['DevTools preview promotes iteration', 'Selector challenge provides feedback', 'Building toward personal project']
        },
        representation: {
          multipleFormats: ['Videos for overview', 'Live coding demonstration', 'Interactive challenges'],
          vocabularySupport: ['Selector types named and exemplified', 'Properties connected to visual changes', 'Flexbox terms explained spatially'],
          backgroundKnowledge: ['Builds on HTML from Lesson 2', 'No prior CSS required', 'Visual feedback aids understanding']
        },
        actionExpression: {
          physicalOptions: ['Typing or copy-pasting code', 'DevTools experimentation', 'Individual or paired work'],
          expressionOptions: ['Personal style choices', 'Simple or complex layouts', 'Written rules or DevTools editing'],
          executiveFunctionSupport: ['Step-by-step introduction of concepts', 'Challenge games structure practice', 'Clear property-value relationship']
        }
      }
    },
    {
      title: 'JavaScript: Interactivity',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Add JavaScript to pages', 'Respond to user events', 'Manipulate page content'],
      conceptualUnderstanding: ['JavaScript runs in the browser', 'Events trigger code execution', 'DOM manipulation changes pages'],
      activities: ['Coding: First JavaScript', 'Practice: Event handling', 'Building: Interactive feature'],
      materials: ['JavaScript reference', 'Event examples'],
      detailedActivities: [
        {
          title: 'Your First JavaScript',
          duration: '18 minutes',
          overview: 'Students write their first JavaScript, understanding how it connects to HTML.',
          videoResources: [
            { title: 'JavaScript in 100 Seconds', url: 'https://www.youtube.com/watch?v=DHjqpvDnNGE', duration: '2:20', description: 'Quick introduction to JavaScript' }
          ],
          steps: [
            { instruction: 'Create "script.js" and link it to your HTML with <script src="script.js"></script> before </body>.', duration: '3 min', teacherNotes: 'Script goes at the end of body so HTML loads first.' },
            { instruction: 'Change to: alert("Welcome to my page!"); This creates a popup. More visible, but annoying!', duration: '3 min' },
            { instruction: 'Better approach: Select an element and change it. document.querySelector("h1").textContent = "Changed by JS!";', duration: '5 min', teacherNotes: 'This is the key insight - JS can read and change the page.' },
            { instruction: 'Practice: Use querySelector to change another element on your page.', duration: '4 min' }
          ],
          formativeAssessment: 'Students can add JavaScript that modifies page content.',
          differentiation: { support: 'Provide code snippets to copy and modify.', extension: 'Change multiple elements with different selectors.' }
        },
        {
          title: 'Responding to Events',
          duration: '22 minutes',
          overview: 'Students learn to make pages respond to user actions like clicks.',
          steps: [
            { instruction: 'Add a button to your HTML: <button id="myBtn">Click Me</button>', duration: '2 min' },
            { instruction: 'In JavaScript, select it and add an event listener:', duration: '5 min', teacherNotes: 'document.querySelector("#myBtn").addEventListener("click", function() { alert("Clicked!"); });' },
            { instruction: 'Explain: "We\'re telling the browser: when this button is clicked, run this code."', duration: '3 min' },
            { instruction: 'Replace alert with something useful: Change text content, toggle a class, update a counter.', duration: '7 min', teacherNotes: 'Show: let count = 0; and incrementing on click.' },
            { instruction: 'Other events: Try "mouseover", "mouseout", "keypress". What other events might be useful?', duration: '5 min' }
          ],
          formativeAssessment: 'Students create a button that responds to clicks with visible feedback.',
          differentiation: { support: 'Provide working event listener code to study and modify.', extension: 'Create a click counter that persists between page loads using localStorage.' }
        },
        {
          title: 'Building an Interactive Feature',
          duration: '20 minutes',
          overview: 'Students combine their learning to add a meaningful interactive feature to their page.',
          steps: [
            { instruction: 'Present options: Dark/light mode toggle, expandable sections, form validation, interactive quiz.', duration: '3 min' },
            { instruction: 'Students choose one feature to implement for their personal page.', duration: '2 min' },
            { instruction: 'Guided implementation: Teacher provides pseudocode, students translate to real JavaScript.', duration: '12 min', teacherNotes: 'For dark mode: 1. Get button, 2. Add click listener, 3. Toggle class on body, 4. CSS handles the rest.' },
            { instruction: 'Test and debug. Use console.log to understand what\'s happening.', duration: '3 min' }
          ],
          formativeAssessment: 'Students have a working interactive feature on their personal page.',
          differentiation: { support: 'Provide complete code for one feature, students customize it.', extension: 'Implement multiple features or create something original.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Choice of interactive feature', 'Personal page customization', 'Creative implementation options'],
          relevanceAndAuthenticity: ['Adding real functionality to their site', 'JavaScript powers all web apps', 'Immediate visible results'],
          selfRegulation: ['Console.log for debugging promotes self-assessment', 'Event feedback is immediate', 'Iteration encouraged']
        },
        representation: {
          multipleFormats: ['Video introduction', 'Live coding', 'Pseudocode translation'],
          vocabularySupport: ['Event listener explained through analogy', 'DOM explained as page\'s structure in JS', 'Function purpose clarified'],
          backgroundKnowledge: ['Builds on HTML/CSS knowledge', 'No prior JavaScript required', 'Step-by-step introduction']
        },
        actionExpression: {
          physicalOptions: ['Typing or adapting provided code', 'Console testing', 'Choice of feature complexity'],
          expressionOptions: ['Different features for different interests', 'Simple or complex implementations', 'Original ideas welcome'],
          executiveFunctionSupport: ['Pseudocode before real code', 'Step-by-step debugging', 'Clear cause-effect relationship']
        }
      }
    },
    {
      title: 'Building and Deploying',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Combine HTML, CSS, and JS', 'Test across browsers', 'Deploy to the web'],
      conceptualUnderstanding: ['Real sites combine all three technologies', 'Testing catches problems', 'Deployment makes sites accessible'],
      activities: ['Building: Complete personal site', 'Testing: Cross-browser checks', 'Deployment: Publish online'],
      materials: ['Deployment platform', 'Testing checklist'],
      detailedActivities: [
        {
          title: 'Final Build Review',
          duration: '15 minutes',
          overview: 'Students ensure their site is complete and review best practices.',
          steps: [
            { instruction: 'Checklist review: HTML validated? CSS organized? JS working? Content complete?', duration: '5 min' },
            { instruction: 'Peer review: Exchange sites with a partner. Each person identifies one strength and one improvement.', duration: '7 min', teacherNotes: 'Structured peer review: "I liked..." and "I wonder if..."' },
            { instruction: 'Make final adjustments based on feedback.', duration: '3 min' }
          ],
          formativeAssessment: 'Sites pass validation and peer review.',
          differentiation: { support: 'Provide a detailed completion checklist.', extension: 'Add advanced features discovered during the project.' }
        },
        {
          title: 'Cross-Browser Testing',
          duration: '15 minutes',
          overview: 'Students learn why and how to test in multiple browsers.',
          steps: [
            { instruction: 'Open your site in at least two different browsers (Chrome, Firefox, Safari, Edge).', duration: '3 min' },
            { instruction: 'Look for differences: Do colors look the same? Does layout work? Do interactive features function?', duration: '5 min', teacherNotes: 'Common issues: fonts, flexbox prefix, CSS features support.' },
            { instruction: 'Test on mobile: Use browser DevTools responsive mode. Does your site work on phone screens?', duration: '5 min' },
            { instruction: 'Document any issues found and discuss as class: What were common problems?', duration: '2 min' }
          ],
          formativeAssessment: 'Students identify cross-browser issues and understand why they occur.',
          differentiation: { support: 'Focus on just two browsers and desktop view.', extension: 'Test on actual mobile devices if available.' }
        },
        {
          title: 'Deploying to the Web',
          duration: '25 minutes',
          overview: 'Students publish their site for the world to access.',
          videoResources: [
            { title: 'Deploy Website Free', url: 'https://www.youtube.com/watch?v=OILKtvESvl4', duration: '5:32', description: 'How to deploy a website for free' }
          ],
          steps: [
            { instruction: 'Options overview: GitHub Pages (free, requires GitHub), Netlify (free, drag-and-drop), or Vercel.', duration: '4 min' },
            { instruction: 'For Netlify: Create account, drag your project folder onto the dashboard. That\'s it!', duration: '8 min', teacherNotes: 'Netlify drop is the simplest: netlify.com/drop' },
            { instruction: 'Get your URL. Share it with the class. Your site is now live on the internet!', duration: '3 min' },
            { instruction: 'Test the deployed site - does everything still work? Sometimes paths break during deployment.', duration: '5 min' },
            { instruction: 'Celebration: Share URLs. Everyone has now published to the web!', duration: '5 min' }
          ],
          formativeAssessment: 'All students have a live URL for their personal site.',
          differentiation: { support: 'Walk through deployment step-by-step with students who need help.', extension: 'Set up a custom domain or automatic deployment from GitHub.' }
        },
        {
          title: 'Reflection and Next Steps',
          duration: '5 minutes',
          overview: 'Students reflect on their accomplishment and consider what\'s next.',
          steps: [
            { instruction: 'Exit ticket: "One thing I\'m proud of" and "One thing I want to learn next."', duration: '3 min' },
            { instruction: 'Share resources for continued learning: freeCodeCamp, MDN Web Docs, YouTube tutorials.', duration: '2 min' }
          ],
          formativeAssessment: 'Reflections show recognition of learning and curiosity for more.',
          differentiation: { support: 'Focus on celebration of accomplishment.', extension: 'Plan specific next project to build.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Deployment platform choice', 'Personal site content', 'Next steps direction'],
          relevanceAndAuthenticity: ['Publishing creates real-world artifact', 'Shareable URL for portfolio', 'Professional skill development'],
          selfRegulation: ['Cross-browser testing promotes quality awareness', 'Peer review provides feedback', 'Reflection promotes metacognition']
        },
        representation: {
          multipleFormats: ['Video deployment guide', 'Written checklist', 'Live demonstration'],
          vocabularySupport: ['Deployment terminology explained', 'Browser differences clarified', 'Testing concepts introduced'],
          backgroundKnowledge: ['Applies all previous lessons', 'No prior deployment experience needed', 'Clear step-by-step process']
        },
        actionExpression: {
          physicalOptions: ['Multiple deployment platforms', 'Browser choices for testing', 'Written or verbal reflection'],
          expressionOptions: ['Simple or advanced deployment', 'Brief or detailed reflection', 'Celebration style preference'],
          executiveFunctionSupport: ['Checklist ensures completeness', 'Step-by-step deployment guide', 'Peer review catches issues']
        }
      }
    }
  ],
  assessment: { formative: ['HTML validation', 'CSS challenges', 'JavaScript exercises', 'Cross-browser testing'], summative: 'Create and deploy a personal portfolio website that includes multiple pages, responsive design, and at least one interactive feature. Include documentation of your development process.' },
  extensions: ['Learn CSS frameworks', 'Explore JavaScript libraries', 'Study web accessibility'],
  realWorldConnections: ['Every website uses these technologies', 'Web development is a valuable career skill', 'Understanding the web helps evaluate online tools']
};

const project2: Project = {
  id: 'project-2',
  title: 'Project 2: Database-Driven Applications',
  description: 'Learn to store, retrieve, and manage data. Build applications that remember information.',
  difficulty: 'Intermediate',
  duration: '3-4 weeks',
  gradeBand: '9-12',
  overview: 'Students learn how applications store and manage data, from simple file storage to databases. They build applications that persist information and serve multiple users.',
  learningObjectives: [
    'Understand why applications need persistent storage',
    'Design data structures for different needs',
    'Use databases to store and retrieve data',
    'Implement basic CRUD operations',
    'Consider data privacy and security',
    'Connect frontends to data backends'
  ],
  prerequisites: ['Completed Project 1', 'Basic programming concepts'],
  materials: {
    required: ['Computer with Node.js or Python', 'Text editor', 'Database (SQLite for simplicity)'],
    optional: ['Postman for API testing', 'Database visualization tool']
  },
  lessons: [
    {
      title: 'Data and Storage Concepts',
      duration: '50 minutes',
      gradeBand: '9-12',
      objectives: ['Understand persistent storage need', 'Compare storage options', 'Design data structures'],
      conceptualUnderstanding: ['Apps need to remember things', 'Different storage suits different needs', 'Data design affects everything'],
      activities: ['Analysis: Where does data live?', 'Comparison: Files vs databases', 'Design: Data for a sample app'],
      materials: ['Storage comparison chart', 'Design templates'],
      detailedActivities: [
        {
          title: 'The Problem: Apps That Forget',
          duration: '12 minutes',
          overview: 'Students experience the need for persistent storage firsthand.',
          steps: [
            { instruction: 'Demo: Build a quick to-do list in JavaScript (use localStorage demo). Add items, then refresh the page. Everything is gone!', duration: '4 min', teacherNotes: 'This "magic disappearing data" moment is memorable and motivating.' },
            { instruction: 'Discussion: "Why did our data disappear? Where did it go?" Lead to understanding that browser JavaScript is temporary.', duration: '3 min' },
            { instruction: 'Think-pair-share: "What apps do you use that remember information? Where does that data live?"', duration: '3 min' },
            { instruction: 'Reveal the concept: Persistent storage - data that survives closing the app, restarting your computer, even outlasting your phone.', duration: '2 min' }
          ],
          formativeAssessment: 'Students can articulate why apps need persistent storage.',
          differentiation: { support: 'Provide everyday examples: contacts, photos, saved games.', extension: 'Research where different types of data are actually stored.' }
        },
        {
          title: 'Storage Options Comparison',
          duration: '20 minutes',
          overview: 'Students learn the spectrum of storage options and when to use each.',
          videoResources: [
            { title: 'Databases Explained', url: 'https://www.youtube.com/watch?v=wR0jg0eQsZA', duration: '6:23', description: 'Overview of database types and use cases' }
          ],
          steps: [
            { instruction: 'Present the storage spectrum: Browser storage (localStorage) → Files → SQLite → Server databases (PostgreSQL, MongoDB).', duration: '5 min' },
            { instruction: 'For each option, discuss: How much data? How many users? Does it need to be searchable? Does it need to be backed up?', duration: '6 min' },
            { instruction: 'Scenario activity: Given app descriptions, students decide which storage option fits best.', duration: '7 min', teacherNotes: 'Personal notes app = localStorage. Photo storage = files. Social media = server database.' },
            { instruction: 'Key insight: "Start simple, scale up only when needed. SQLite is often enough!"', duration: '2 min' }
          ],
          formativeAssessment: 'Students can recommend appropriate storage for different scenarios.',
          differentiation: { support: 'Provide a decision flowchart for storage selection.', extension: 'Research CAP theorem and distributed storage challenges.' }
        },
        {
          title: 'Designing Data Structures',
          duration: '18 minutes',
          overview: 'Students practice thinking about how to organize data before writing any code.',
          steps: [
            { instruction: 'Introduce the concept: "Before you code, you plan. What data will your app need?"', duration: '2 min' },
            { instruction: 'Example walkthrough: Design data for a simple contact book app. What fields? What types? What relationships?', duration: '5 min', teacherNotes: 'Contacts: id, name, phone, email, group. Groups: id, name. Contact can be in one group.' },
            { instruction: 'Practice: Students design data for a library book tracker (books, borrowers, checkouts).', duration: '8 min' },
            { instruction: 'Share and critique: Exchange designs with a partner. What did they miss? What did they get right?', duration: '3 min' }
          ],
          formativeAssessment: 'Data designs include appropriate fields, types, and relationships.',
          differentiation: { support: 'Provide a template with questions to answer for each entity.', extension: 'Design for a more complex scenario with multiple relationships.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Scenario selection for storage comparison', 'Own data design for practice', 'Partner critique exchange'],
          relevanceAndAuthenticity: ['Uses apps students know', 'Design skills apply to any app', 'Connects to real-world data challenges'],
          selfRegulation: ['Disappearing data demo reveals problem', 'Peer critique provides feedback', 'Design-before-code promotes planning']
        },
        representation: {
          multipleFormats: ['Video overview', 'Live demonstration', 'Hands-on design activity'],
          vocabularySupport: ['Persistent storage explained through contrast', 'Storage types compared with use cases', 'Data design terms introduced gradually'],
          backgroundKnowledge: ['Builds on Project 1 JavaScript knowledge', 'No prior database experience needed', 'Connects to everyday app usage']
        },
        actionExpression: {
          physicalOptions: ['Written or diagrammed data designs', 'Individual or paired work', 'Paper or digital planning'],
          expressionOptions: ['Table format or diagram format', 'Simple or detailed designs', 'Verbal or written critique'],
          executiveFunctionSupport: ['Flowchart for storage decisions', 'Design template structure', 'Clear scenario parameters']
        }
      }
    },
    {
      title: 'Introduction to Databases',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Set up a database', 'Understand tables and schemas', 'Write basic SQL queries'],
      conceptualUnderstanding: ['Databases organize data in tables', 'Schemas define structure', 'SQL is the database language'],
      activities: ['Setup: Create first database', 'Practice: Basic SQL queries', 'Building: Design tables'],
      materials: ['SQLite', 'SQL reference'],
      detailedActivities: [
        {
          title: 'Setting Up SQLite',
          duration: '15 minutes',
          overview: 'Students create their first database file.',
          videoResources: [
            { title: 'SQLite Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=byHcYRpMgI4', duration: '8:12', description: 'Getting started with SQLite' }
          ],
          steps: [
            { instruction: 'Explain SQLite: "A database that lives in a single file. No server needed. Perfect for learning and small apps."', duration: '2 min' },
            { instruction: 'Install DB Browser for SQLite (sqlitebrowser.org) or use command line sqlite3.', duration: '5 min', teacherNotes: 'DB Browser is more visual and beginner-friendly.' },
            { instruction: 'Create a new database: mydata.db. This single file IS your database.', duration: '3 min' },
            { instruction: 'Quick check: "Where does the database live? What happens if you move or delete the file?"', duration: '2 min' },
            { instruction: 'Compare: "This file is like your whole app\'s memory. Treat it carefully!"', duration: '3 min' }
          ],
          formativeAssessment: 'All students have a working SQLite database file.',
          differentiation: { support: 'Use DB Browser GUI for visual interface.', extension: 'Set up SQLite through command line only.' }
        },
        {
          title: 'Tables and Schemas',
          duration: '20 minutes',
          overview: 'Students learn how databases organize data into tables with defined structures.',
          steps: [
            { instruction: 'Analogy: "A database is like a spreadsheet. Tables are sheets. Columns are headers. Rows are data entries."', duration: '3 min' },
            { instruction: 'Create first table: CREATE TABLE contacts (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT);', duration: '5 min' },
            { instruction: 'Explain each part: Table name, column names, data types, primary key (unique identifier).', duration: '4 min' },
            { instruction: 'Practice: Students create a "books" table with id, title, author, year.', duration: '5 min' },
            { instruction: 'Schema view: Show the table structure. "This is your contract - the data must follow this format."', duration: '3 min' }
          ],
          formativeAssessment: 'Students create a valid table with appropriate columns and types.',
          differentiation: { support: 'Provide SQL syntax card with common data types.', extension: 'Add constraints like NOT NULL and UNIQUE.' }
        },
        {
          title: 'Basic SQL Queries',
          duration: '25 minutes',
          overview: 'Students learn to ask questions of their database using SQL.',
          steps: [
            { instruction: 'Insert data: INSERT INTO contacts (name, email) VALUES ("Alice", "alice@email.com");', duration: '4 min' },
            { instruction: 'Add several more entries so we have data to query.', duration: '3 min' },
            { instruction: 'Basic SELECT: SELECT * FROM contacts; - "Give me everything from contacts."', duration: '3 min' },
            { instruction: 'Filtering: SELECT * FROM contacts WHERE name = "Alice"; - "Only entries named Alice."', duration: '4 min' },
            { instruction: 'Specific columns: SELECT name, email FROM contacts; - "Just names and emails."', duration: '3 min' },
            { instruction: 'Practice challenges: Students write queries to find specific data. (Find all books by a specific author, etc.)', duration: '6 min' },
            { instruction: 'Key insight: "SQL lets you ask the database questions. The better your question, the better your answer."', duration: '2 min' }
          ],
          formativeAssessment: 'Students can write SELECT queries with WHERE clauses.',
          differentiation: { support: 'Provide query templates with blanks to fill in.', extension: 'Try ORDER BY, LIMIT, and LIKE for pattern matching.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Own table design for practice', 'Query challenge selection', 'Tool choice (GUI or CLI)'],
          relevanceAndAuthenticity: ['Skills used in professional development', 'SQLite used in real apps', 'Foundation for all database work'],
          selfRegulation: ['Immediate query results provide feedback', 'Schema enforcement catches errors', 'Practice challenges build confidence']
        },
        representation: {
          multipleFormats: ['Video introduction', 'Live SQL demonstration', 'Hands-on practice'],
          vocabularySupport: ['Spreadsheet analogy grounds concepts', 'SQL keywords explained in English', 'Data types connected to real data'],
          backgroundKnowledge: ['Builds on Lesson 1 data design', 'No prior SQL experience needed', 'Step-by-step query construction']
        },
        actionExpression: {
          physicalOptions: ['GUI database browser or command line', 'Typing or copying SQL', 'Individual pace'],
          expressionOptions: ['Simple or complex queries', 'Basic or creative table designs', 'Written or diagrammed understanding'],
          executiveFunctionSupport: ['Clear SQL syntax patterns', 'Step-by-step progression', 'Challenge ladders with increasing difficulty']
        }
      }
    },
    {
      title: 'CRUD Operations',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Implement Create operations', 'Implement Read operations', 'Implement Update and Delete'],
      conceptualUnderstanding: ['CRUD covers most data operations', 'Each operation has SQL equivalent', 'Applications combine these operations'],
      activities: ['Coding: Create and Read', 'Coding: Update and Delete', 'Building: Complete CRUD'],
      materials: ['CRUD examples', 'Test data'],
      detailedActivities: [
        {
          title: 'Understanding CRUD',
          duration: '10 minutes',
          overview: 'Students learn the four fundamental operations of data management.',
          steps: [
            { instruction: 'Introduce CRUD: Create, Read, Update, Delete. "These four operations cover 90% of what apps do with data."', duration: '3 min' },
            { instruction: 'Map to SQL: Create = INSERT, Read = SELECT, Update = UPDATE, Delete = DELETE', duration: '2 min' },
            { instruction: 'Real-world examples: Twitter post (create), view feed (read), edit profile (update), delete tweet (delete).', duration: '3 min' },
            { instruction: 'Quick quiz: Students identify CRUD operations in apps they use daily.', duration: '2 min' }
          ],
          formativeAssessment: 'Students can identify which CRUD operation different app features use.',
          differentiation: { support: 'Provide a CRUD reference card with examples.', extension: 'Research how CRUD maps to REST API methods.' }
        },
        {
          title: 'Create and Read in Practice',
          duration: '20 minutes',
          overview: 'Students implement C and R operations on their database.',
          steps: [
            { instruction: 'Create (INSERT): Add new entries to the contacts table from Lesson 2.', duration: '4 min' },
            { instruction: 'Practice: Add at least 10 contacts with varied data to have good test data.', duration: '5 min' },
            { instruction: 'Read (SELECT): Retrieve contacts. All contacts, contacts by name, contacts with specific criteria.', duration: '5 min' },
            { instruction: 'Challenge: Write queries for realistic scenarios. "Find all contacts with gmail addresses." "List contacts alphabetically."', duration: '6 min' }
          ],
          formativeAssessment: 'Students have populated database and can query it effectively.',
          differentiation: { support: 'Provide sample data to insert.', extension: 'Add computed queries like COUNT or GROUP BY.' }
        },
        {
          title: 'Update and Delete Operations',
          duration: '20 minutes',
          overview: 'Students learn to modify and remove data safely.',
          steps: [
            { instruction: 'Update (UPDATE): UPDATE contacts SET email = "newemail@test.com" WHERE id = 1;', duration: '4 min' },
            { instruction: 'Critical lesson: What happens if you forget WHERE? UPDATE contacts SET email = "same@email.com"; - everyone\'s email changed!', duration: '3 min', teacherNotes: 'Demonstrate this mistake in a safe way. Very memorable!' },
            { instruction: 'Delete (DELETE): DELETE FROM contacts WHERE id = 5;', duration: '3 min' },
            { instruction: 'Same warning: What happens if you forget WHERE? DELETE FROM contacts; - gone forever!', duration: '3 min' },
            { instruction: 'Best practice: Always SELECT first to see what you\'re about to change, then UPDATE or DELETE.', duration: '3 min' },
            { instruction: 'Practice: Students update and delete with proper safety checks.', duration: '4 min' }
          ],
          formativeAssessment: 'Students can safely update and delete data using WHERE clauses.',
          differentiation: { support: 'Provide a safety checklist for UPDATE/DELETE operations.', extension: 'Learn about transactions and ROLLBACK.' }
        },
        {
          title: 'Building a Complete CRUD Interface',
          duration: '10 minutes',
          overview: 'Students connect CRUD operations to a simple application concept.',
          steps: [
            { instruction: 'Plan: Map out a simple app\'s screens and which CRUD operations each needs.', duration: '3 min' },
            { instruction: 'Example: Contact book app - Add contact (Create), View all (Read), Edit contact (Update), Remove contact (Delete).', duration: '3 min' },
            { instruction: 'Exit ticket: "Design the CRUD operations for a simple to-do app. What SQL does each need?"', duration: '4 min' }
          ],
          formativeAssessment: 'Students can map app features to CRUD operations and SQL.',
          differentiation: { support: 'Provide app feature list to map to CRUD.', extension: 'Plan more complex operations like bulk delete or search.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Challenge query selection', 'Own data for practice', 'Exit ticket app choice'],
          relevanceAndAuthenticity: ['CRUD used in all data apps', 'Safety lessons prevent real mistakes', 'Directly applicable skills'],
          selfRegulation: ['SELECT-before-UPDATE promotes carefulness', 'Mistake demonstrations show consequences', 'Exit ticket promotes planning']
        },
        representation: {
          multipleFormats: ['Live SQL demonstration', 'Visual query results', 'Real-world examples'],
          vocabularySupport: ['CRUD acronym explained and mapped', 'SQL commands connected to operations', 'Safety practices named and explained'],
          backgroundKnowledge: ['Builds on Lesson 2 SQL knowledge', 'Connects to app features students know', 'Step-by-step progression']
        },
        actionExpression: {
          physicalOptions: ['Typing queries or using GUI', 'Individual practice pace', 'Written or verbal exit ticket'],
          expressionOptions: ['Simple or complex queries', 'Conservative or adventurous data changes', 'Detailed or summary CRUD plans'],
          executiveFunctionSupport: ['Safety checklist for dangerous operations', 'Clear operation-to-SQL mapping', 'Planning before doing']
        }
      }
    },
    {
      title: 'Connecting Frontend to Backend',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Create API endpoints', 'Connect frontend to API', 'Handle errors gracefully'],
      conceptualUnderstanding: ['APIs connect frontends to backends', 'HTTP methods map to CRUD', 'Error handling improves UX'],
      activities: ['Building: Simple API', 'Integration: Frontend calls', 'Polish: Error handling'],
      materials: ['API framework', 'Integration examples'],
      detailedActivities: [
        {
          title: 'Understanding APIs',
          duration: '15 minutes',
          overview: 'Students learn what APIs are and how they connect frontend and backend.',
          videoResources: [
            { title: 'APIs for Beginners', url: 'https://www.youtube.com/watch?v=GZvSYJDk-us', duration: '8:23', description: 'Clear explanation of APIs and how they work' }
          ],
          steps: [
            { instruction: 'Recall client-server from Project 1. Now we add a middle layer: the API.', duration: '2 min' },
            { instruction: 'Explain: "API = Application Programming Interface. A contract for how programs talk to each other."', duration: '3 min' },
            { instruction: 'Restaurant analogy extended: Menu (API documentation), Waiter (API), Kitchen (database). You never go to the kitchen yourself.', duration: '3 min' },
            { instruction: 'HTTP methods map to CRUD: GET = Read, POST = Create, PUT/PATCH = Update, DELETE = Delete.', duration: '4 min' },
            { instruction: 'Quick check: "If I want to create a new user, which HTTP method?" "If I want to delete a post?"', duration: '3 min' }
          ],
          formativeAssessment: 'Students can map CRUD to HTTP methods.',
          differentiation: { support: 'Provide HTTP method reference card.', extension: 'Research RESTful API design principles.' }
        },
        {
          title: 'Creating Simple API Endpoints',
          duration: '20 minutes',
          overview: 'Students create their first API endpoints using a simple framework.',
          steps: [
            { instruction: 'Setup: Install Express.js (Node) or Flask (Python) based on class preference.', duration: '4 min', teacherNotes: 'Express: npm install express. Flask: pip install flask.' },
            { instruction: 'First endpoint: GET /contacts - returns all contacts from the database.', duration: '5 min' },
            { instruction: 'Add more endpoints: POST /contacts (create), GET /contacts/:id (single contact), DELETE /contacts/:id.', duration: '8 min' },
            { instruction: 'Test with browser or curl/Postman. See the JSON responses.', duration: '3 min' }
          ],
          formativeAssessment: 'Students have working GET and POST endpoints.',
          differentiation: { support: 'Provide starter code to modify.', extension: 'Add input validation to POST endpoint.' }
        },
        {
          title: 'Connecting the Frontend',
          duration: '15 minutes',
          overview: 'Students connect their HTML/JavaScript frontend to the API.',
          steps: [
            { instruction: 'Display the data: Loop through contacts and add them to the page.', duration: '5 min' },
            { instruction: 'Create new contact: Use fetch with method: "POST" and body containing the new data.', duration: '5 min', teacherNotes: 'This connects everything - user types, JS calls API, API writes to database.' }
          ],
          formativeAssessment: 'Frontend displays data from the API.',
          differentiation: { support: 'Provide fetch code snippets to adapt.', extension: 'Add loading states and optimistic updates.' }
        },
        {
          title: 'Error Handling',
          duration: '10 minutes',
          overview: 'Students learn to handle things going wrong gracefully.',
          steps: [
            { instruction: 'What can go wrong? Network error, server error, bad data, not found.', duration: '2 min' },
            { instruction: 'Add try/catch to fetch calls. Display friendly error messages instead of crashing.', duration: '4 min' },
            { instruction: 'Backend: Return appropriate status codes (404 for not found, 400 for bad request, 500 for server error).', duration: '4 min' }
          ],
          formativeAssessment: 'App handles errors without crashing and shows helpful messages.',
          differentiation: { support: 'Provide error handling template code.', extension: 'Implement retry logic for network errors.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Framework choice (Express or Flask)', 'Own app data to work with', 'Error message wording'],
          relevanceAndAuthenticity: ['Professional web development skills', 'Every app uses APIs', 'Full-stack understanding'],
          selfRegulation: ['Testing endpoints provides feedback', 'Error handling promotes defensive thinking', 'Building on previous lessons']
        },
        representation: {
          multipleFormats: ['Video API explanation', 'Live coding demonstration', 'Hands-on integration'],
          vocabularySupport: ['API explained through restaurant analogy', 'HTTP methods connected to CRUD', 'JSON format explained'],
          backgroundKnowledge: ['Builds on Project 1 JavaScript', 'Connects to Lesson 3 CRUD operations', 'Client-server understanding from earlier']
        },
        actionExpression: {
          physicalOptions: ['Express or Flask or both', 'Postman or browser testing', 'Individual or paired coding'],
          expressionOptions: ['Simple or elaborate endpoints', 'Basic or sophisticated error handling', 'Minimal or full API'],
          executiveFunctionSupport: ['Clear endpoint pattern', 'Step-by-step integration', 'Error checklist']
        }
      }
    }
  ],
  assessment: { formative: ['Database setup', 'SQL query accuracy', 'CRUD implementation', 'API functionality'], summative: 'Build a complete data-driven application (e.g., task manager, inventory system, or community directory) with database storage, API backend, and web frontend.' },
  extensions: ['Explore different databases', 'Add user authentication', 'Implement data validation'],
  realWorldConnections: ['Most applications are database-driven', 'Data skills are highly valuable', 'Understanding databases helps protect privacy']
};

const project3: Project = {
  id: 'project-3',
  title: 'Project 3: Community Tool Development',
  description: 'Identify a real community need and build a tool to address it. Practice the full development lifecycle.',
  difficulty: 'Intermediate',
  duration: '4-6 weeks',
  gradeBand: '9-12',
  overview: 'Students work with real community members to identify needs, design solutions, and build working tools. This project emphasizes the human side of development—understanding users and creating sustainable solutions.',
  learningObjectives: [
    'Conduct user research to identify needs',
    'Translate needs into technical requirements',
    'Design user-friendly interfaces',
    'Develop working prototypes',
    'Gather and incorporate feedback',
    'Plan for maintenance and sustainability'
  ],
  prerequisites: ['Completed Projects 1 and 2', 'Basic full-stack knowledge'],
  materials: {
    required: ['Computer with development environment', 'Access to community members', 'Prototyping tools'],
    optional: ['Design software', 'Project management tools']
  },
  lessons: [
    {
      title: 'User Research and Need Finding',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: ['Conduct user interviews', 'Identify pain points', 'Document needs clearly'],
      conceptualUnderstanding: ['Users know their problems', 'Good research reveals real needs', 'Documentation enables solutions'],
      activities: ['Planning: Interview questions', 'Fieldwork: Community interviews', 'Synthesis: Need statements'],
      materials: ['Interview guide', 'Documentation templates'],
      detailedActivities: [
        {
          title: 'Introduction to User Research',
          duration: '20 minutes',
          overview: 'Students learn why building for users starts with understanding them.',
          videoResources: [
            { title: 'User Research Basics', url: 'https://www.youtube.com/watch?v=U9ZG19XTbd4', duration: '7:45', description: 'Introduction to user research methods' }
          ],
          steps: [
            { instruction: 'Ask: "Who knows what users want better - the developer or the user?" Discuss why assumptions often fail.', duration: '4 min', teacherNotes: 'Most will say developer. They\'ll learn otherwise!' },
            { instruction: 'Share example: A famous product failure due to not talking to users. (Google Glass, Microsoft Zune, etc.)', duration: '4 min' },
            { instruction: 'Introduce user research: "Before building anything, we ask the people who will use it what they actually need."', duration: '4 min' },
            { instruction: 'Types of research: Interviews (deep), surveys (broad), observation (behavior). Today we focus on interviews.', duration: '5 min' },
            { instruction: 'Key mindset: "You are not your user." Write this down.', duration: '3 min' }
          ],
          formativeAssessment: 'Students can articulate why user research matters.',
          differentiation: { support: 'Provide product failure case studies to read.', extension: 'Research different user research methodologies.' }
        },
        {
          title: 'Designing Interview Questions',
          duration: '25 minutes',
          overview: 'Students craft questions that reveal real needs, not just opinions.',
          steps: [
            { instruction: 'Good vs bad questions: "Would you use an app for X?" (bad - hypothetical) vs "Tell me about the last time you had problem X" (good - concrete).', duration: '5 min' },
            { instruction: 'The "5 Whys" technique: Keep asking "why" to get to root causes.', duration: '4 min' },
            { instruction: 'Open vs closed questions: "How do you feel about..." (open) vs "Do you like..." (closed - yes/no).', duration: '4 min' },
            { instruction: 'Practice: Students brainstorm topics for community tools, then write 5-7 interview questions.', duration: '10 min', teacherNotes: 'Topics: school organization, local business support, community events, etc.' },
            { instruction: 'Peer review: Exchange questions with partner. Are they open-ended? Do they ask about real experiences?', duration: '2 min' }
          ],
          formativeAssessment: 'Interview questions are open-ended and focus on experiences, not hypotheticals.',
          differentiation: { support: 'Provide question templates and examples.', extension: 'Design a complete interview protocol with intro, warm-up, main questions, and wrap-up.' }
        },
        {
          title: 'Conducting Interviews',
          duration: '30 minutes',
          overview: 'Students practice interviewing skills with each other, then plan real community interviews.',
          steps: [
            { instruction: 'Interview best practices: Listen more than talk, follow up on interesting threads, don\'t lead the witness.', duration: '5 min' },
            { instruction: 'Practice round: Pairs interview each other about a school frustration. 5 minutes each, then debrief.', duration: '12 min' },
            { instruction: 'Debrief: What did you learn that surprised you? Was it hard not to suggest solutions?', duration: '5 min' },
            { instruction: 'Plan real interviews: Identify 2-3 community members to interview. How will you reach them? When?', duration: '5 min' },
            { instruction: 'Homework assignment: Conduct at least 2 interviews before next class. Record or take detailed notes.', duration: '3 min' }
          ],
          formativeAssessment: 'Students demonstrate active listening in practice interviews.',
          differentiation: { support: 'Pair less confident students with more confident ones for practice.', extension: 'Practice interviewing someone unfamiliar, not a classmate.' }
        },
        {
          title: 'Synthesizing Findings',
          duration: '15 minutes',
          overview: 'Students learn to identify patterns and create need statements.',
          steps: [
            { instruction: 'After interviews (or using provided sample data), identify patterns: What problems came up multiple times?', duration: '5 min' },
            { instruction: 'Create "need statements": "[User type] needs a way to [action] because [reason]."', duration: '5 min', teacherNotes: 'Example: "Parents need a way to find afterschool activities because coordinating across multiple websites is overwhelming."' },
            { instruction: 'Prioritize: Which needs are most important? Most common? Most addressable?', duration: '3 min' },
            { instruction: 'Exit ticket: Write your top need statement that will guide your project.', duration: '2 min' }
          ],
          formativeAssessment: 'Need statements are specific, user-focused, and based on research.',
          differentiation: { support: 'Provide need statement template with examples.', extension: 'Create personas representing different user types.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Topic selection for research', 'Interview subject selection', 'Need prioritization'],
          relevanceAndAuthenticity: ['Real community members interviewed', 'Problems from actual experience', 'Skills used by professional product teams'],
          selfRegulation: ['Peer review of questions', 'Debrief after practice', 'Exit ticket reflection']
        },
        representation: {
          multipleFormats: ['Video introduction', 'Live demonstration', 'Practice exercises'],
          vocabularySupport: ['User research terms explained', 'Good vs bad question examples', 'Need statement template'],
          backgroundKnowledge: ['Connects to students\' own frustrations', 'No prior research experience needed', 'Builds from familiar to formal']
        },
        actionExpression: {
          physicalOptions: ['Written or verbal interviews', 'Recording or notes', 'Individual or paired practice'],
          expressionOptions: ['Different interview styles', 'Various synthesis formats', 'Simple or detailed need statements'],
          executiveFunctionSupport: ['Question templates', 'Interview protocol', 'Synthesis framework']
        }
      }
    },
    {
      title: 'Requirements and Design',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Write user stories', 'Create wireframes', 'Plan technical approach'],
      conceptualUnderstanding: ['Requirements bridge needs and code', 'Visual design precedes coding', 'Planning saves time'],
      activities: ['Writing: User stories', 'Designing: Wireframes', 'Planning: Technical architecture'],
      materials: ['User story templates', 'Wireframing tools'],
      detailedActivities: [
        {
          title: 'From Needs to User Stories',
          duration: '20 minutes',
          overview: 'Students translate research findings into actionable development tasks.',
          steps: [
            { instruction: 'Review need statements from Lesson 1. These are our foundation.', duration: '3 min' },
            { instruction: 'Introduce user stories: "As a [user], I want to [action] so that [benefit]."', duration: '4 min' },
            { instruction: 'Example: Need "Parents need to find activities" becomes "As a parent, I want to search activities by day and age so that I can find options that fit my schedule."', duration: '4 min' },
            { instruction: 'Practice: Students write 5-7 user stories for their project, covering main functionality.', duration: '7 min' },
            { instruction: 'Prioritize with MoSCoW: Must have, Should have, Could have, Won\'t have (this time).', duration: '2 min' }
          ],
          formativeAssessment: 'User stories are specific, actionable, and traceable to user needs.',
          differentiation: { support: 'Provide user story examples for similar projects.', extension: 'Add acceptance criteria to each user story.' }
        },
        {
          title: 'Wireframing the Interface',
          duration: '25 minutes',
          overview: 'Students sketch their application before coding.',
          videoResources: [
            { title: 'Wireframing Basics', url: 'https://www.youtube.com/watch?v=8-vTd7GRk-w', duration: '6:32', description: 'How to create effective wireframes' }
          ],
          steps: [
            { instruction: 'Why wireframe? "It\'s easier to change a sketch than rewrite code. Plan first, build second."', duration: '3 min' },
            { instruction: 'Wireframe vocabulary: Boxes for content, lines for text, X for images. Keep it simple.', duration: '3 min' },
            { instruction: 'Start with key screens: What are the 3-4 main screens users will see?', duration: '3 min' },
            { instruction: 'Students sketch wireframes for their main screens. Paper and pen is fine!', duration: '12 min', teacherNotes: 'Walk around offering feedback. Watch for over-complication.' },
            { instruction: 'Peer review: Show wireframes to partner. Can they understand the flow without explanation?', duration: '4 min' }
          ],
          formativeAssessment: 'Wireframes clearly show main screens and user flow.',
          differentiation: { support: 'Provide wireframe templates with common components.', extension: 'Use digital wireframing tools like Figma or Balsamiq.' }
        },
        {
          title: 'Technical Planning',
          duration: '15 minutes',
          overview: 'Students plan the technical architecture before coding begins.',
          steps: [
            { instruction: 'Review what we know: HTML/CSS/JS for frontend, database for storage, API to connect them.', duration: '3 min' },
            { instruction: 'Data model: What data does this app need to store? Quick sketch of tables/fields.', duration: '4 min' },
            { instruction: 'API endpoints: What operations does the frontend need? List the basic CRUD endpoints.', duration: '4 min' },
            { instruction: 'Technology choices: Will we use SQLite or something else? Express or Flask? Why?', duration: '2 min' },
            { instruction: 'Exit ticket: One-page project plan including: need statement, user stories, wireframe, data model.', duration: '2 min' }
          ],
          formativeAssessment: 'Technical plans align with user stories and wireframes.',
          differentiation: { support: 'Provide technical planning template.', extension: 'Research additional technologies that might help (authentication, file upload, etc.).' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Project direction based on research', 'Wireframe style choice', 'Technology selection'],
          relevanceAndAuthenticity: ['Planning real project they\'ll build', 'Professional development practices', 'Skills used in industry'],
          selfRegulation: ['Peer review provides feedback', 'MoSCoW prioritization promotes focus', 'Exit ticket consolidates planning']
        },
        representation: {
          multipleFormats: ['Video wireframing guide', 'Template examples', 'Hands-on sketching'],
          vocabularySupport: ['User story formula explained', 'Wireframe conventions shown', 'Technical terms reviewed'],
          backgroundKnowledge: ['Builds on Projects 1-2 technical knowledge', 'Connects to Lesson 1 research', 'Step-by-step planning process']
        },
        actionExpression: {
          physicalOptions: ['Paper or digital wireframes', 'Written or verbal planning', 'Individual or team work'],
          expressionOptions: ['Simple or detailed wireframes', 'Basic or elaborate planning', 'Different tool choices'],
          executiveFunctionSupport: ['User story template', 'Wireframe conventions', 'Project plan outline']
        }
      }
    },
    {
      title: 'Iterative Development',
      duration: '120+ minutes',
      gradeBand: '9-12',
      objectives: ['Build in small increments', 'Test frequently', 'Incorporate feedback quickly'],
      conceptualUnderstanding: ['Small steps reduce risk', 'Frequent testing catches issues', 'Feedback improves direction'],
      activities: ['Sprint: Build core feature', 'Testing: User feedback session', 'Iteration: Improve based on feedback'],
      materials: ['Development environment', 'Testing protocols'],
      detailedActivities: [
        {
          title: 'Sprint Planning',
          duration: '15 minutes',
          overview: 'Students plan what they can realistically build in a focused development session.',
          steps: [
            { instruction: 'Review MoSCoW list. What\'s the smallest useful thing we can build first?', duration: '3 min' },
            { instruction: 'Define MVP (Minimum Viable Product): The simplest version that provides value.', duration: '3 min' },
            { instruction: 'Break MVP into tasks: Database setup, API endpoint, frontend display. Order matters!', duration: '5 min' },
            { instruction: 'Estimate: Which tasks can we complete today? Be conservative.', duration: '2 min' },
            { instruction: 'Commit: Each student writes down their specific goals for this sprint.', duration: '2 min' }
          ],
          formativeAssessment: 'Sprint goals are specific, achievable, and aligned with MVP.',
          differentiation: { support: 'Provide task breakdown examples.', extension: 'Plan for contingencies if tasks are faster/slower than expected.' }
        },
        {
          title: 'Building the Core Feature',
          duration: '60 minutes',
          overview: 'Students implement their planned MVP functionality.',
          steps: [
            { instruction: 'Start with the backend: Database and API endpoints first.', duration: '20 min', teacherNotes: 'Circulate and help students who get stuck. Encourage using Project 2 code as reference.' },
            { instruction: 'Test the backend: Use Postman or curl to verify API works before building frontend.', duration: '10 min' },
            { instruction: 'Build the frontend: Connect to API, display data, handle basic interactions.', duration: '25 min' },
            { instruction: 'Quick demo: Show your progress to a partner. Does it work? What\'s missing?', duration: '5 min' }
          ],
          formativeAssessment: 'Core functionality works end-to-end.',
          differentiation: { support: 'Provide starter code and code snippets.', extension: 'Add polish like loading states and error handling.' }
        },
        {
          title: 'User Feedback Session',
          duration: '30 minutes',
          overview: 'Students get their work in front of users for immediate feedback.',
          steps: [
            { instruction: 'Prepare: What questions do you want answered? What are you unsure about?', duration: '5 min' },
            { instruction: 'Find users: Recruit 2-3 people who weren\'t involved in building. Classmates, other students, teachers.', duration: '5 min' },
            { instruction: 'Test: Watch silently as they try to use your app. Don\'t help! Note confusion points.', duration: '12 min' },
            { instruction: 'Debrief: Ask what they liked, what confused them, what they wished it did.', duration: '5 min' },
            { instruction: 'Document: Write down the top 3 things to improve based on feedback.', duration: '3 min' }
          ],
          formativeAssessment: 'Students gather actionable feedback from real users.',
          differentiation: { support: 'Provide user testing script.', extension: 'Conduct A/B testing with different interface variations.' }
        },
        {
          title: 'Iteration Sprint',
          duration: '15+ minutes',
          overview: 'Students incorporate feedback and improve their application.',
          steps: [
            { instruction: 'Prioritize feedback: What\'s critical? What\'s nice-to-have? What can wait?', duration: '3 min' },
            { instruction: 'Plan fixes: For top issues, what\'s the fastest path to improvement?', duration: '3 min' },
            { instruction: 'Implement: Make the most important improvements. Test as you go.', duration: '7 min' },
            { instruction: 'Reflection: What did you learn from user feedback that you wouldn\'t have discovered alone?', duration: '2 min' }
          ],
          formativeAssessment: 'Improvements address the most critical user feedback.',
          differentiation: { support: 'Focus on one critical fix.', extension: 'Complete multiple iterations of the feedback loop.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['MVP definition', 'Implementation approach', 'Feedback incorporation priorities'],
          relevanceAndAuthenticity: ['Building something real', 'User feedback is meaningful', 'Professional development practice'],
          selfRegulation: ['Sprint planning promotes organization', 'User testing reveals blind spots', 'Iteration promotes growth mindset']
        },
        representation: {
          multipleFormats: ['Planning documents', 'Working code', 'User feedback'],
          vocabularySupport: ['Sprint terminology explained', 'MVP concept clarified', 'Iteration process named'],
          backgroundKnowledge: ['Applies Projects 1-2 skills', 'Connects to Lesson 2 planning', 'Structured development process']
        },
        actionExpression: {
          physicalOptions: ['Typing code', 'Paper planning', 'Verbal user interviews'],
          expressionOptions: ['Different technology choices', 'Various feature priorities', 'Simple or elaborate MVP'],
          executiveFunctionSupport: ['Sprint planning template', 'Task breakdown structure', 'Feedback documentation']
        }
      }
    },
    {
      title: 'Deployment and Handoff',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Deploy the application', 'Document for maintainers', 'Train users'],
      conceptualUnderstanding: ['Deployment makes tools available', 'Documentation enables sustainability', 'Training ensures adoption'],
      activities: ['Deployment: Launch tool', 'Documentation: Maintainer guide', 'Training: User session'],
      materials: ['Deployment platform', 'Documentation templates'],
      detailedActivities: [
        {
          title: 'Final Deployment',
          duration: '20 minutes',
          overview: 'Students deploy their application for real-world use.',
          steps: [
            { instruction: 'Pre-deployment checklist: All features working? No console errors? Data seeded?', duration: '5 min' },
            { instruction: 'Deploy: Use Netlify, Vercel, or similar. For backend, consider Railway, Render, or similar free tiers.', duration: '10 min', teacherNotes: 'This may require more time if students haven\'t deployed backends before.' },
            { instruction: 'Test live: Visit the deployed URL. Everything working? Fix any deployment-specific issues.', duration: '3 min' },
            { instruction: 'Share URL with your original interviewees. "We built this based on your feedback!"', duration: '2 min' }
          ],
          formativeAssessment: 'Application is live and accessible at a public URL.',
          differentiation: { support: 'Walk through deployment step-by-step.', extension: 'Set up custom domain and HTTPS.' }
        },
        {
          title: 'Documentation for Maintainers',
          duration: '20 minutes',
          overview: 'Students write documentation so others can understand and maintain the code.',
          steps: [
            { instruction: 'Why documentation? "If you\'re hit by a bus, can someone else keep your project running?"', duration: '2 min' },
            { instruction: 'README essentials: What the project does, how to install, how to run, how to contribute.', duration: '5 min' },
            { instruction: 'Students write README.md for their project. Include setup instructions, environment variables, etc.', duration: '10 min' },
            { instruction: 'Code comments: Add comments to complex or non-obvious parts of the code.', duration: '3 min' }
          ],
          formativeAssessment: 'A new developer could set up and run the project from documentation alone.',
          differentiation: { support: 'Provide README template to fill in.', extension: 'Add architecture diagrams and API documentation.' }
        },
        {
          title: 'User Training and Handoff',
          duration: '20 minutes',
          overview: 'Students ensure their community can actually use and benefit from the tool.',
          steps: [
            { instruction: 'Create simple user guide: Screenshots, step-by-step instructions for common tasks.', duration: '8 min' },
            { instruction: 'Training session: Walk through the app with intended users. Watch for confusion.', duration: '8 min', teacherNotes: 'This could be done in class with role-playing or with actual community members.' },
            { instruction: 'Handoff questions: Who maintains this? How do users get help? What happens after this class?', duration: '2 min' },
            { instruction: 'Exit reflection: What did you build? Who does it help? What would you do differently?', duration: '2 min' }
          ],
          formativeAssessment: 'Users can accomplish tasks with the tool without developer assistance.',
          differentiation: { support: 'Focus on one key user task.', extension: 'Create video tutorial.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Documentation format', 'Training approach', 'Handoff planning'],
          relevanceAndAuthenticity: ['Real deployment for real users', 'Documentation skills used professionally', 'Lasting community impact'],
          selfRegulation: ['Checklist ensures completeness', 'User training reveals gaps', 'Reflection promotes metacognition']
        },
        representation: {
          multipleFormats: ['Written documentation', 'Visual guides', 'Live training'],
          vocabularySupport: ['README conventions explained', 'Deployment terms clarified', 'Handoff process named'],
          backgroundKnowledge: ['Applies Project 1 deployment skills', 'Connects to all prior lessons', 'Professional practices introduced']
        },
        actionExpression: {
          physicalOptions: ['Written or video documentation', 'Live or recorded training', 'Various deployment platforms'],
          expressionOptions: ['Simple or comprehensive documentation', 'Basic or elaborate training', 'Minimal or complete handoff'],
          executiveFunctionSupport: ['Deployment checklist', 'README template', 'User guide outline']
        }
      }
    }
  ],
  assessment: { formative: ['User research quality', 'Design documentation', 'Development progress', 'User feedback'], summative: 'Deliver a working community tool with user research documentation, design artifacts, deployed application, maintainer documentation, and reflection on the development process.' },
  extensions: ['Add advanced features', 'Open source the project', 'Train community maintainers'],
  realWorldConnections: ['Real development serves real people', 'User research is essential', 'Sustainability matters more than features']
};

const project4: Project = {
  id: 'project-4',
  title: 'Project 4: Open Source Contribution',
  description: 'Contribute to existing open source projects. Learn collaborative development practices.',
  difficulty: 'Advanced',
  duration: '4-6 weeks',
  gradeBand: '9-12',
  overview: 'Students learn to work within existing codebases, following open source practices. They make meaningful contributions to real projects while learning professional development workflows.',
  learningObjectives: [
    'Navigate large codebases',
    'Follow contribution guidelines',
    'Use Git for collaboration',
    'Write clear pull requests',
    'Respond to code review feedback',
    'Become part of developer communities'
  ],
  prerequisites: ['Completed Projects 1-3', 'Git basics', 'Comfortable reading code'],
  materials: {
    required: ['Computer with Git', 'GitHub account', 'Text editor'],
    optional: ['Multiple monitors for reference', 'Note-taking system']
  },
  lessons: [
    {
      title: 'Finding and Understanding Projects',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Find beginner-friendly projects', 'Read project documentation', 'Understand project structure'],
      conceptualUnderstanding: ['Good projects welcome newcomers', 'Documentation explains how things work', 'Code structure reveals design'],
      activities: ['Exploration: Browse GitHub', 'Reading: Project documentation', 'Analysis: Code structure'],
      materials: ['GitHub access', 'Project selection criteria'],
      detailedActivities: [
        {
          title: 'Why Contribute to Open Source?',
          duration: '10 minutes',
          overview: 'Students learn the value of open source contribution.',
          videoResources: [
            { title: 'How to Start Contributing to Open Source', url: 'https://www.youtube.com/watch?v=GbqSvJs-6W4', duration: '8:12', description: 'Beginner guide to open source contribution' }
          ],
          steps: [
            { instruction: 'Ask: "How many of you use free software? Where does that software come from?"', duration: '2 min' },
            { instruction: 'Explain open source: Software whose code is public. Anyone can see it, use it, improve it.', duration: '3 min' },
            { instruction: 'Benefits of contributing: Learn from real code, build portfolio, help others, join community.', duration: '3 min' },
            { instruction: 'Key insight: "Every expert was once a beginner. Projects WANT your contributions."', duration: '2 min' }
          ],
          formativeAssessment: 'Students can articulate why open source contribution is valuable.',
          differentiation: { support: 'Provide examples of famous open source projects.', extension: 'Research the history and philosophy of open source.' }
        },
        {
          title: 'Finding the Right Project',
          duration: '25 minutes',
          overview: 'Students learn to identify beginner-friendly projects.',
          steps: [
            { instruction: 'Criteria for good first projects: Active maintainers, good documentation, "good first issue" labels, welcoming community.', duration: '5 min' },
            { instruction: 'Resources: GitHub Explore, Good First Issues (goodfirstissue.dev), Up For Grabs (up-for-grabs.net).', duration: '4 min' },
            { instruction: 'Explore: Students browse these resources and identify 3-5 potential projects.', duration: '10 min', teacherNotes: 'Look for JavaScript, Python, or documentation projects for accessibility.' },
            { instruction: 'Evaluate: For each project, check: Last commit? Open issues? CONTRIBUTING.md file? Code of conduct?', duration: '4 min' },
            { instruction: 'Select: Choose one project to focus on. Share your choice with a partner.', duration: '2 min' }
          ],
          formativeAssessment: 'Students select an appropriate project with clear rationale.',
          differentiation: { support: 'Provide a curated list of beginner-friendly projects.', extension: 'Find projects in a specific language or domain of interest.' }
        },
        {
          title: 'Understanding Project Structure',
          duration: '25 minutes',
          overview: 'Students learn to navigate and understand an unfamiliar codebase.',
          steps: [
            { instruction: 'Start with README: What does this project do? How do you install and run it?', duration: '5 min' },
            { instruction: 'Read CONTRIBUTING.md: What are the rules for contributing? What\'s the process?', duration: '5 min' },
            { instruction: 'Explore the code: Look at folder structure. What goes where? Can you find the main file?', duration: '8 min', teacherNotes: 'Help students recognize common patterns: src/, tests/, docs/, etc.' },
            { instruction: 'Try to run it: Follow the setup instructions. Did it work? What errors did you encounter?', duration: '5 min' },
            { instruction: 'Exit ticket: Summarize your chosen project: What it does, how it\'s structured, how to contribute.', duration: '2 min' }
          ],
          formativeAssessment: 'Students can explain their chosen project\'s purpose and structure.',
          differentiation: { support: 'Walk through one project structure together.', extension: 'Diagram the project architecture.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Project selection', 'Domain of interest', 'Exploration approach'],
          relevanceAndAuthenticity: ['Real projects used by real people', 'Portfolio-building opportunity', 'Professional development practice'],
          selfRegulation: ['Criteria guide selection', 'Exit ticket promotes reflection', 'Structure analysis builds understanding']
        },
        representation: {
          multipleFormats: ['Video introduction', 'Live exploration', 'Documentation reading'],
          vocabularySupport: ['Open source terminology explained', 'GitHub conventions clarified', 'Code structure patterns named'],
          backgroundKnowledge: ['Builds on Projects 1-3 development skills', 'GitHub familiarity helpful but not required', 'Step-by-step exploration process']
        },
        actionExpression: {
          physicalOptions: ['Browser exploration', 'Local clone and run', 'Documentation reading'],
          expressionOptions: ['Written or verbal project summaries', 'Different projects of interest', 'Various depth of exploration'],
          executiveFunctionSupport: ['Project selection criteria', 'Exploration checklist', 'Exit ticket template']
        }
      }
    },
    {
      title: 'Git Workflow for Collaboration',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Fork and clone repositories', 'Create feature branches', 'Keep forks synchronized'],
      conceptualUnderstanding: ['Forks enable independent work', 'Branches isolate changes', 'Sync prevents conflicts'],
      activities: ['Setup: Fork and clone', 'Practice: Branch workflow', 'Maintenance: Sync with upstream'],
      materials: ['Git reference', 'Workflow diagram'],
      detailedActivities: [
        {
          title: 'Forking and Cloning',
          duration: '15 minutes',
          overview: 'Students create their own copy of a project to work on.',
          videoResources: [
            { title: 'Git Fork and Pull Request Tutorial', url: 'https://www.youtube.com/watch?v=nT8KGYVurIU', duration: '7:34', description: 'Visual guide to fork-based workflow' }
          ],
          steps: [
            { instruction: 'Explain forking: "You can\'t edit someone else\'s project directly. First, copy it to your account."', duration: '2 min' },
            { instruction: 'Fork: Click "Fork" on your chosen project\'s GitHub page. You now have your own copy.', duration: '3 min' },
            { instruction: 'Clone YOUR fork: git clone [your-fork-url]. This creates a local copy.', duration: '3 min' },
            { instruction: 'Add upstream: git remote add upstream [original-repo-url]. This connects to the original.', duration: '3 min' },
            { instruction: 'Verify: git remote -v should show both origin (your fork) and upstream (original).', duration: '2 min' },
            { instruction: 'Quick check: "What\'s the difference between origin and upstream?"', duration: '2 min' }
          ],
          formativeAssessment: 'Students have forked, cloned, and configured upstream remote.',
          differentiation: { support: 'Walk through each step together with screen sharing.', extension: 'Explain the difference between SSH and HTTPS remotes.' }
        },
        {
          title: 'Branch Workflow',
          duration: '25 minutes',
          overview: 'Students learn to isolate work in branches.',
          steps: [
            { instruction: 'Why branches? "You never work on main directly. Branches let you experiment safely."', duration: '3 min' },
            { instruction: 'Create branch: git checkout -b feature/my-change. Naming convention matters!', duration: '4 min' },
            { instruction: 'Make a small change: Edit README or fix a typo. Add, commit, push.', duration: '6 min' },
            { instruction: 'Push branch: git push origin feature/my-change. Your branch now exists on GitHub.', duration: '4 min' },
            { instruction: 'Practice cycle: Create another branch, make a change, push. Get comfortable with the flow.', duration: '6 min' },
            { instruction: 'Key rule: "One branch = one logical change. Small, focused branches are easier to review."', duration: '2 min' }
          ],
          formativeAssessment: 'Students create and push multiple feature branches.',
          differentiation: { support: 'Provide git command cheat sheet.', extension: 'Practice rebasing and squashing commits.' }
        },
        {
          title: 'Staying in Sync',
          duration: '20 minutes',
          overview: 'Students learn to keep their fork updated with the original project.',
          steps: [
            { instruction: 'The problem: The original project keeps changing. Your fork gets behind. Conflicts arise.', duration: '3 min' },
            { instruction: 'Fetch upstream: git fetch upstream. This gets latest changes without merging.', duration: '3 min' },
            { instruction: 'Merge to main: git checkout main, then git merge upstream/main.', duration: '4 min' },
            { instruction: 'Push updated main: git push origin main. Your fork is now current.', duration: '3 min' },
            { instruction: 'Update branch: git checkout feature/my-change, then git merge main. Resolve conflicts if any.', duration: '5 min' },
            { instruction: 'Best practice: "Sync before starting new work, and before submitting a pull request."', duration: '2 min' }
          ],
          formativeAssessment: 'Students can sync their fork with upstream.',
          differentiation: { support: 'Create a sync script students can use.', extension: 'Practice resolving merge conflicts deliberately.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Branch naming', 'Change content', 'Practice pace'],
          relevanceAndAuthenticity: ['Real Git workflow used professionally', 'Working with actual projects', 'Building collaboration skills'],
          selfRegulation: ['Command verification steps', 'Practice cycles build comfort', 'Sync routine prevents problems']
        },
        representation: {
          multipleFormats: ['Video tutorial', 'Live demonstration', 'Hands-on practice'],
          vocabularySupport: ['Git terminology explained with analogies', 'Commands connected to concepts', 'Workflow visualized'],
          backgroundKnowledge: ['Basic Git from previous projects', 'GitHub interface familiarity', 'Step-by-step command guidance']
        },
        actionExpression: {
          physicalOptions: ['Command line or GUI tools', 'Different practice repositories', 'Individual or paired work'],
          expressionOptions: ['Different branch names and changes', 'Various practice intensity', 'Written or verbal understanding check'],
          executiveFunctionSupport: ['Command cheat sheet', 'Workflow diagram', 'Sync checklist']
        }
      }
    },
    {
      title: 'Making Your First Contribution',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: ['Find an appropriate issue', 'Make the required changes', 'Submit a pull request'],
      conceptualUnderstanding: ['Good first issues are labeled', 'Small changes are easier to review', 'Clear PRs get merged faster'],
      activities: ['Selection: Choose an issue', 'Development: Make changes', 'Submission: Create PR'],
      materials: ['Issue tracker', 'PR template'],
      detailedActivities: [
        {
          title: 'Finding the Right Issue',
          duration: '20 minutes',
          overview: 'Students identify an appropriate issue to work on.',
          steps: [
            { instruction: 'Browse issues: Go to your project\'s Issues tab. Look for "good first issue" or "beginner" labels.', duration: '5 min' },
            { instruction: 'Evaluate: Is the issue clearly described? Is it claimed by someone else? Is it still relevant?', duration: '4 min' },
            { instruction: 'Comment: "I\'d like to work on this issue." This claims it and starts conversation.', duration: '3 min' },
            { instruction: 'If no good issues: Check if documentation needs updating, or ask maintainers where help is needed.', duration: '3 min' },
            { instruction: 'Select: Choose one specific issue to work on. Write down exactly what needs to be done.', duration: '5 min' }
          ],
          formativeAssessment: 'Students have claimed an appropriate issue.',
          differentiation: { support: 'Provide a curated list of specific issues.', extension: 'Find issues in multiple projects to compare opportunities.' }
        },
        {
          title: 'Making the Changes',
          duration: '40 minutes',
          overview: 'Students implement the fix or feature for their chosen issue.',
          steps: [
            { instruction: 'Sync first: Make sure your fork is up to date with upstream.', duration: '3 min' },
            { instruction: 'Create branch: git checkout -b fix/issue-123 (use issue number in branch name).', duration: '2 min' },
            { instruction: 'Understand the code: Find where the change needs to be made. Read surrounding code.', duration: '8 min', teacherNotes: 'Help students who are struggling to navigate unfamiliar code.' },
            { instruction: 'Make the change: Keep it small and focused. Only change what\'s needed for this issue.', duration: '15 min' },
            { instruction: 'Test: Run the project\'s tests if they have them. Manually verify your change works.', duration: '7 min' },
            { instruction: 'Commit: Write a clear commit message explaining what and why.', duration: '3 min' },
            { instruction: 'Push: git push origin fix/issue-123.', duration: '2 min' }
          ],
          formativeAssessment: 'Students have made focused, tested changes.',
          differentiation: { support: 'Pair students for code navigation.', extension: 'Add tests for the change.' }
        },
        {
          title: 'Creating the Pull Request',
          duration: '30 minutes',
          overview: 'Students submit their work for review.',
          steps: [
            { instruction: 'On GitHub, click "Compare & pull request" or go to Pull Requests > New.', duration: '3 min' },
            { instruction: 'Title: Clear and concise. "Fix typo in README" or "Add dark mode toggle".', duration: '3 min' },
            { instruction: 'Description: What does this PR do? Why? Reference the issue with "Fixes #123".', duration: '5 min' },
            { instruction: 'Fill in template: If the project has a PR template, answer all questions.', duration: '5 min' },
            { instruction: 'Screenshots: If it\'s a visual change, add before/after screenshots.', duration: '4 min' },
            { instruction: 'Review your own PR: Look at the "Files changed" tab. Does it look right?', duration: '5 min' },
            { instruction: 'Submit! Then wait. Maintainers are often busy. Be patient but follow up after a week.', duration: '5 min' }
          ],
          formativeAssessment: 'Students submit a clear, well-documented pull request.',
          differentiation: { support: 'Provide PR description template.', extension: 'Research good PR practices and PR etiquette.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Issue selection', 'Implementation approach', 'PR description style'],
          relevanceAndAuthenticity: ['Contributing to real projects', 'Work visible publicly', 'Professional development practice'],
          selfRegulation: ['Issue claiming creates accountability', 'Self-review before submission', 'Patience during review']
        },
        representation: {
          multipleFormats: ['GitHub interface', 'Code changes', 'Written description'],
          vocabularySupport: ['PR terminology explained', 'Issue reference syntax', 'Commit message conventions'],
          backgroundKnowledge: ['Applies Lesson 2 Git workflow', 'Builds on project structure understanding', 'Step-by-step PR process']
        },
        actionExpression: {
          physicalOptions: ['Command line or GitHub interface', 'Typing or templates', 'Individual or paired work'],
          expressionOptions: ['Different issues and changes', 'Simple or detailed PR descriptions', 'Various documentation approaches'],
          executiveFunctionSupport: ['PR template structure', 'Self-review checklist', 'Clear submission steps']
        }
      }
    },
    {
      title: 'Code Review and Iteration',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Respond to review feedback', 'Make requested changes', 'Learn from the process'],
      conceptualUnderstanding: ['Code review improves quality', 'Feedback is learning opportunity', 'Persistence leads to success'],
      activities: ['Response: Address feedback', 'Revision: Update PR', 'Reflection: Document learnings'],
      materials: ['PR conversation', 'Learning journal'],
      detailedActivities: [
        {
          title: 'Understanding Code Review',
          duration: '15 minutes',
          overview: 'Students learn how to receive and respond to code review feedback.',
          steps: [
            { instruction: 'Code review purpose: "It\'s not criticism of you. It\'s improving the code together."', duration: '3 min' },
            { instruction: 'Common feedback types: Style changes, better approaches, questions about decisions, bugs.', duration: '4 min' },
            { instruction: 'Example review: Walk through a real code review conversation. Show back-and-forth.', duration: '5 min' },
            { instruction: 'Mindset: "Every piece of feedback is a learning opportunity. Embrace it."', duration: '3 min' }
          ],
          formativeAssessment: 'Students understand code review as collaborative improvement.',
          differentiation: { support: 'Role-play a code review conversation.', extension: 'Review someone else\'s PR yourself.' }
        },
        {
          title: 'Responding to Feedback',
          duration: '25 minutes',
          overview: 'Students practice making changes based on review comments.',
          steps: [
            { instruction: 'Check your PR: Do you have any review comments? If not, use a sample review.', duration: '3 min' },
            { instruction: 'For each comment: Understand what\'s being asked. Ask clarifying questions if needed.', duration: '5 min' },
            { instruction: 'Make changes: On the same branch, make the requested changes. Commit with clear message.', duration: '10 min' },
            { instruction: 'Push: git push updates your PR automatically. Comment to let reviewer know.', duration: '3 min' },
            { instruction: 'If you disagree: Explain your reasoning respectfully. Sometimes you\'re right, sometimes they are.', duration: '4 min' }
          ],
          formativeAssessment: 'Students address feedback professionally and update their PR.',
          differentiation: { support: 'Work through feedback together.', extension: 'Practice giving constructive code review.' }
        },
        {
          title: 'Reflection and Documentation',
          duration: '20 minutes',
          overview: 'Students document their learning from the contribution process.',
          steps: [
            { instruction: 'Learning journal: What did you learn technically? What did you learn about collaboration?', duration: '5 min' },
            { instruction: 'Share: In small groups, discuss your contribution experiences. What surprised you?', duration: '6 min' },
            { instruction: 'Portfolio: Add your contribution to your portfolio. Screenshot, link, and description.', duration: '5 min' },
            { instruction: 'Next steps: Identify 2-3 more issues or projects you\'d like to contribute to.', duration: '4 min' }
          ],
          formativeAssessment: 'Students articulate learning and plan future contributions.',
          differentiation: { support: 'Provide reflection prompts.', extension: 'Blog post or video about your contribution experience.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Response style', 'Reflection format', 'Future project selection'],
          relevanceAndAuthenticity: ['Real feedback from real developers', 'Portfolio building', 'Professional communication skills'],
          selfRegulation: ['Feedback reception requires emotional management', 'Reflection promotes growth', 'Planning future contributions']
        },
        representation: {
          multipleFormats: ['Written feedback', 'Conversation discussion', 'Personal reflection'],
          vocabularySupport: ['Code review terminology', 'Professional communication norms', 'Disagreement language'],
          backgroundKnowledge: ['Builds on all prior lessons', 'Connects to real-world development', 'Processing feedback skills']
        },
        actionExpression: {
          physicalOptions: ['Code changes or discussion responses', 'Written or verbal reflection', 'Individual or group sharing'],
          expressionOptions: ['Different reflection styles', 'Various portfolio formats', 'Simple or detailed learning documentation'],
          executiveFunctionSupport: ['Feedback response checklist', 'Reflection prompts', 'Portfolio template']
        }
      }
    }
  ],
  assessment: { formative: ['Project selection rationale', 'Git workflow execution', 'PR quality', 'Review response'], summative: 'Complete a meaningful contribution to an open source project. Document the full process from project selection through merged PR (or detailed review feedback), including what you learned and how you grew as a developer.' },
  extensions: ['Become a regular contributor', 'Help review others\' PRs', 'Start your own open source project'],
  realWorldConnections: ['Most software builds on open source', 'Open source experience is valued', 'Contribution builds reputation']
};

const projects: Project[] = [project1, project2, project3, project4];

// Main Page Component
export default function AppDevPage() {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get('project');
  const getInitialProject = () => { if (projectParam) { const n = parseInt(projectParam); if (n >= 1 && n <= 4) return `project-${n}`; } return projects[0]?.id || null; };
  const [expandedProject, setExpandedProject] = React.useState<string | null>(getInitialProject());

  React.useEffect(() => {
    if (projectParam) { const n = parseInt(projectParam); if (n >= 1 && n <= 4) { const id = `project-${n}`; setExpandedProject(id); setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 100); } }
  }, [projectParam]);

  return (
    <main className="min-h-screen bg-zinc-900 pt-16">
      <div className="bg-zinc-950 border-b border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href={`/${locale}/tech-sovereignty`} className="inline-flex items-center text-sm text-zinc-500 hover:text-sky-400 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to All Tracks
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-sky-600 to-sky-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
            <span className="text-sky-200/80 text-sm font-medium">Track D</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">App Development</h1>
          <p className="text-xl text-white/90 max-w-3xl">Build applications that serve your community—from websites to data-driven tools. Learn to identify needs and create solutions.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <CorePrinciple />
        <div className="space-y-6">{projects.map((project) => (<ProjectSection key={project.id} project={project} isExpanded={expandedProject === project.id} onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)} />))}</div>
      </div>

      <div className="bg-zinc-950 border-t border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between">
          <Link href={`/${locale}/tech-sovereignty/ai-llm`} className="text-zinc-500 hover:text-sky-400 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Previous: AI/LLM
          </Link>
          <Link href={`/${locale}/tech-sovereignty/linux-foss`} className="text-zinc-500 hover:text-sky-400 transition-colors flex items-center gap-1">
            Next: Linux/FOSS
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
