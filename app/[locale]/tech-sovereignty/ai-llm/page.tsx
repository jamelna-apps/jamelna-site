'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-zinc-800 border border-orange-500/30 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Core Pedagogical Principle: Understanding Over Magic</h3>
        <p className="text-zinc-300 mb-3">
          AI isn&apos;t magic—it&apos;s <strong className="text-white">mathematics and data</strong>. Students learn how these systems actually work,
          their <strong className="text-white">capabilities and limitations</strong>, and how to run them <strong className="text-white">locally</strong> without
          depending on cloud services or surrendering their data.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-orange-300 mb-1">Demystify AI</h4>
            <p className="text-sm text-zinc-500">Understand what&apos;s actually happening when AI generates text, images, or makes predictions.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-orange-300 mb-1">Run Locally</h4>
            <p className="text-sm text-zinc-500">Keep your data private by running AI models on your own hardware—no cloud required.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-orange-300 mb-1">Think Critically</h4>
            <p className="text-sm text-zinc-500">Recognize AI limitations, biases, and appropriate use cases. Know when not to use AI.</p>
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
    <div className="bg-zinc-950 border border-orange-500/30 rounded-lg overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-orange-300">Universal Design for Learning (UDL) Supports</span>
        </div>
        <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          <div className="bg-zinc-800 rounded-lg p-4 border border-orange-500/20">
            <h6 className="text-sm font-semibold text-orange-300 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center text-xs">1</span>
              Multiple Means of Engagement <span className="text-xs font-normal text-zinc-500">(The &quot;Why&quot;)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div><p className="font-medium text-zinc-300 mb-1">Choice & Autonomy</p><ul className="text-zinc-500 space-y-0.5">{udl.engagement.choiceAndAutonomy.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-orange-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Relevance</p><ul className="text-zinc-500 space-y-0.5">{udl.engagement.relevanceAndAuthenticity.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-orange-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Self-Regulation</p><ul className="text-zinc-500 space-y-0.5">{udl.engagement.selfRegulation.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-orange-400">•</span>{item}</li>)}</ul></div>
            </div>
          </div>
          <div className="bg-zinc-800 rounded-lg p-4 border border-sky-500/20">
            <h6 className="text-sm font-semibold text-sky-400 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-sky-500/20 rounded-full flex items-center justify-center text-xs">2</span>
              Multiple Means of Representation <span className="text-xs font-normal text-zinc-500">(The &quot;What&quot;)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div><p className="font-medium text-zinc-300 mb-1">Multiple Formats</p><ul className="text-zinc-500 space-y-0.5">{udl.representation.multipleFormats.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-sky-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Vocabulary Support</p><ul className="text-zinc-500 space-y-0.5">{udl.representation.vocabularySupport.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-sky-400">•</span>{item}</li>)}</ul></div>
              <div><p className="font-medium text-zinc-300 mb-1">Background Knowledge</p><ul className="text-zinc-500 space-y-0.5">{udl.representation.backgroundKnowledge.map((item, i) => <li key={i} className="flex items-start gap-1"><span className="text-sky-400">•</span>{item}</li>)}</ul></div>
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
          <span className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</span>
          <div><h6 className="font-semibold text-white">{activity.title}</h6><p className="text-xs text-zinc-500">{activity.duration}</p></div>
        </div>
        <svg className={`w-5 h-5 text-orange-400 transform transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              Step-by-Step Instructions
            </h6>
            <div className="space-y-3">{activity.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
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
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3"><h6 className="text-xs font-semibold text-orange-300 mb-1">Support (Struggling Learners)</h6><p className="text-xs text-orange-300">{activity.differentiation.support}</p></div>
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
              <span className={`text-xs px-2 py-1 rounded font-medium ${lesson.gradeBand === '6-8' ? 'bg-orange-500/20 text-orange-300' : lesson.gradeBand === '9-12' ? 'bg-sky-500/20 text-sky-400' : 'bg-purple-500/20 text-purple-300'}`}>
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
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Detailed Activities
              </h5>
              <div className="space-y-3">{lesson.detailedActivities.map((activity, i) => <DetailedActivityCard key={i} activity={activity} index={i} />)}</div>
            </div>
          ) : (
            <div><h5 className="font-medium text-orange-300 mb-2">Activities</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.activities.map((activity, i) => <li key={i}>{activity}</li>)}</ul></div>
          )}
          <div><h5 className="font-medium text-orange-300 mb-2">Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.materials.map((material, i) => <li key={i}>{material}</li>)}</ul></div>
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
        <div><h4 className="font-semibold text-white mb-3">Learning Objectives</h4><ul className="grid md:grid-cols-2 gap-2">{project.learningObjectives.map((obj, i) => (<li key={i} className="flex items-start gap-2 text-sm text-zinc-400"><svg className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{obj}</li>))}</ul></div>
        {project.prerequisites.length > 0 && <div><h4 className="font-semibold text-white mb-3">Prerequisites</h4><ul className="flex flex-wrap gap-2">{project.prerequisites.map((prereq, i) => <li key={i} className="text-xs px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full">{prereq}</li>)}</ul></div>}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-zinc-950 rounded-lg p-4"><h5 className="font-medium text-orange-300 mb-2">Required Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.materials.required.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
          <div className="bg-zinc-950 rounded-lg p-4"><h5 className="font-medium text-orange-300 mb-2">Optional Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.materials.optional.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
        </div>
        <div><h4 className="font-semibold text-white mb-3">Lessons</h4><div className="space-y-3">{project.lessons.map((lesson, i) => <LessonCard key={i} lesson={lesson} index={i} projectId={project.id} />)}</div></div>
        <div className="bg-zinc-950 rounded-lg p-4"><h4 className="font-semibold text-white mb-3">Assessment</h4><div className="grid md:grid-cols-2 gap-4"><div><h5 className="font-medium text-orange-300 mb-2">Formative Assessment</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.assessment.formative.map((a, i) => <li key={i}>{a}</li>)}</ul></div><div><h5 className="font-medium text-orange-300 mb-2">Summative Assessment</h5><p className="text-sm text-zinc-400">{project.assessment.summative}</p></div></div></div>
        <div><h4 className="font-semibold text-white mb-3">Real-World Connections</h4><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.realWorldConnections.map((conn, i) => <li key={i}>{conn}</li>)}</ul></div>
      </div>
    )}
  </div>
);

// Project Data
const project1: Project = {
  id: 'project-1',
  title: 'Project 1: Understanding AI Models',
  description: 'Learn how large language models work, their capabilities and limitations, and the ethical considerations of AI deployment.',
  difficulty: 'Beginner',
  duration: '2-3 weeks',
  gradeBand: '6-12',
  overview: 'Students explore what AI actually is, how language models are trained, and what they can and cannot do. This foundation helps students approach AI as a tool to be understood rather than magic to be feared or blindly trusted.',
  learningObjectives: [
    'Explain what artificial intelligence and machine learning mean',
    'Describe how language models are trained on text data',
    'Identify capabilities and limitations of current AI systems',
    'Recognize AI-generated content and potential biases',
    'Evaluate appropriate and inappropriate uses of AI',
    'Understand the environmental and social costs of AI'
  ],
  prerequisites: ['Basic computer literacy'],
  materials: {
    required: ['Computer with internet access', 'Access to AI chatbot (ChatGPT, Claude, or local alternative)', 'Note-taking materials'],
    optional: ['Articles on AI ethics', 'Examples of AI failures']
  },
  lessons: [
    {
      title: 'What is AI? Separating Hype from Reality',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Define AI, ML, and LLM', 'Trace the history of AI development', 'Distinguish marketing claims from technical reality'],
      conceptualUnderstanding: ['AI is pattern recognition and prediction, not thinking', 'Current AI has no understanding or consciousness', 'AI capabilities have grown but fundamental limitations remain'],
      activities: ['Discussion: What do you think AI can do?', 'Timeline: Key moments in AI history', 'Myth-busting: Testing AI claims'],
      materials: ['AI timeline handout', 'Claim testing worksheet'],
      detailedActivities: [
        {
          title: 'Opening Discussion: What Can AI Do?',
          duration: '12 minutes',
          overview: 'Students share their existing beliefs and experiences with AI, establishing a baseline for myth-busting later in the lesson.',
          videoResources: [
            { title: 'What is Artificial Intelligence?', url: 'https://www.youtube.com/watch?v=2ePf9rue1Ao', duration: '5:23', description: 'PBS crash course overview of AI fundamentals' },
            { title: 'AI Explained in 5 Minutes', url: 'https://www.youtube.com/watch?v=ad79nYk2keg', duration: '5:14', description: 'Simple explanation suitable for beginners' }
          ],
          steps: [
            { instruction: 'Ask students to write down 3 things they believe AI can do on sticky notes (one per note).', duration: '3 min', teacherNotes: 'Encourage honest responses - no judgment. Common answers include "think like humans," "be creative," "know everything."' },
            { instruction: 'Have students post their notes on a class board, grouping similar claims together.', duration: '3 min', teacherNotes: 'Create rough categories: abilities, limitations, fears, hopes.' },
            { instruction: 'Read through the grouped claims as a class. Ask: "Which of these do you think are actually true?"', duration: '4 min', teacherNotes: 'Don\'t correct misconceptions yet - we\'ll test them later.' },
            { instruction: 'Introduce the lesson\'s essential question: "What can AI actually do, and what is just marketing hype?"', duration: '2 min' }
          ],
          formativeAssessment: 'Observe student responses for common misconceptions about AI capabilities. Note claims that need addressing.',
          differentiation: { support: 'Provide sentence starters: "I think AI can..." or show example AI interactions first.', extension: 'Ask students to categorize claims into "proven" vs "speculated" based on their prior knowledge.' }
        },
        {
          title: 'AI Timeline Activity',
          duration: '18 minutes',
          overview: 'Students explore the history of AI, discovering that many "new" concepts have been around for decades, building context for current capabilities.',
          steps: [
            { instruction: 'Distribute the AI timeline handout with key dates: 1950 (Turing Test), 1956 (AI coined), 1997 (Deep Blue), 2011 (Watson), 2022 (ChatGPT).', duration: '2 min' },
            { instruction: 'In pairs, students research one era using provided QR codes or links. Each pair gets a different era.', duration: '8 min', teacherNotes: 'Pre-select reliable sources. Have backup printed materials for limited internet.' },
            { instruction: 'Each pair shares one surprising fact from their era with the class.', duration: '6 min', teacherNotes: 'Listen for misconceptions to address in myth-busting.' },
            { instruction: 'Discuss as a class: "Why do you think AI has been around for 70+ years but only recently became a big deal?"', duration: '2 min', teacherNotes: 'Key insight: computing power and data availability changed, not the fundamental ideas.' }
          ],
          formativeAssessment: 'Can students identify that AI is not new, and that current capabilities are evolution not revolution?',
          differentiation: { support: 'Provide pre-filled timeline with spaces for students to add just one fact per era.', extension: 'Research AI winters and why AI funding and interest has cycled historically.' }
        },
        {
          title: 'Myth-Busting: Testing AI Claims',
          duration: '18 minutes',
          overview: 'Students test specific claims from the opening discussion by interacting with actual AI systems, discovering the gap between perception and reality.',
          videoResources: [
            { title: 'AI Cannot Do This', url: 'https://www.youtube.com/watch?v=RBNuhhmBB3I', duration: '8:12', description: 'Examples of AI failures and limitations' }
          ],
          steps: [
            { instruction: 'Select 3-4 testable claims from the opening discussion (e.g., "AI can do math," "AI knows facts," "AI is creative").', duration: '2 min', teacherNotes: 'Choose claims that will reveal clear limitations.' },
            { instruction: 'Demonstrate testing one claim live with ChatGPT, Claude, or local AI. Show both success and failure cases.', duration: '5 min', teacherNotes: 'Try: Ask it to count letters in a word (often wrong), do multi-step math (errors), or recall a recent event (hallucinations).' },
            { instruction: 'Students test remaining claims in small groups, documenting results.', duration: '8 min', teacherNotes: 'Circulate to ensure students are testing fairly - not setting up the AI to succeed or fail.' },
            { instruction: 'Share findings: What claims held up? What didn\'t? Update the class board with reality checks.', duration: '3 min' }
          ],
          formativeAssessment: 'Students can articulate at least one specific limitation of AI they discovered through testing.',
          differentiation: { support: 'Provide specific test prompts for each claim with expected outcomes.', extension: 'Design their own tests for claims not yet tested, predict outcomes before testing.' }
        },
        {
          title: 'Closing: Building Our AI Reality Framework',
          duration: '5 minutes',
          overview: 'Students synthesize learning into a framework for evaluating AI claims going forward.',
          steps: [
            { instruction: 'Introduce three questions to ask about any AI claim: (1) Has this been demonstrated or just promised? (2) What are the failure modes? (3) Who benefits from me believing this?', duration: '3 min' },
            { instruction: 'Exit ticket: Students write one thing they believed about AI before class that they now question.', duration: '2 min', teacherNotes: 'Collect exit tickets to assess learning and plan next lesson emphasis.' }
          ],
          formativeAssessment: 'Exit ticket responses show shift from uncritical acceptance to healthy skepticism.',
          differentiation: { support: 'Provide the exit ticket as multiple choice with "What I thought" and "What I learned" columns.', extension: 'Write a social media post debunking one AI myth for their peers.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose which AI claims to investigate', 'Multiple valid perspectives welcomed in discussions', 'Self-directed testing of hypotheses'],
          relevanceAndAuthenticity: ['Uses AI tools students encounter daily', 'Connects to real media coverage and marketing claims', 'Prepares students for technology decisions they\'ll face'],
          selfRegulation: ['Framework questions provide ongoing self-checking', 'Exit ticket promotes metacognition about belief changes', 'Peer discussion normalizes uncertainty']
        },
        representation: {
          multipleFormats: ['Video resources supplement verbal instruction', 'Visual timeline provides spatial/temporal context', 'Hands-on testing provides experiential learning'],
          vocabularySupport: ['AI, ML, LLM defined with everyday analogies', 'Technical terms introduced gradually with examples', 'Glossary handout available for reference'],
          backgroundKnowledge: ['Opens by activating prior knowledge', 'Timeline builds historical context', 'No assumption of technical background']
        },
        actionExpression: {
          physicalOptions: ['Sticky notes for those who prefer writing', 'Verbal sharing for those who prefer speaking', 'Digital or paper timeline options'],
          expressionOptions: ['Testing can be done individually or in groups', 'Findings shared verbally, written, or visually', 'Exit ticket allows private reflection'],
          executiveFunctionSupport: ['Structured timeline with clear sections', 'Step-by-step testing protocol provided', 'Framework questions scaffold evaluation']
        }
      }
    },
    {
      title: 'How Language Models Learn',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Explain training data and its importance', 'Understand tokens and prediction', 'Recognize how training data affects outputs'],
      conceptualUnderstanding: ['LLMs predict the next word based on patterns', 'Training data determines what the model knows', 'Biases in training data appear in outputs'],
      activities: ['Demo: Tokenization visualization', 'Exercise: Predict the next word game', 'Analysis: Where does training data come from?'],
      materials: ['Tokenizer demo', 'Prediction exercises'],
      detailedActivities: [
        {
          title: 'Hook: The Prediction Game',
          duration: '10 minutes',
          overview: 'Students experience word prediction firsthand, building intuition for how language models work before introducing technical concepts.',
          steps: [
            { instruction: 'Write on the board: "The cat sat on the ___." Ask students to call out what word comes next.', duration: '1 min', teacherNotes: 'Most will say "mat" - this is the point! Patterns are predictable.' },
            { instruction: 'Try increasingly complex sentences: "The scientist discovered a new ___." "After the rain, the ___."', duration: '3 min', teacherNotes: 'Multiple valid answers show language is probabilistic, not deterministic.' },
            { instruction: 'Ask: "How did you know what words might come next?" Lead discussion toward patterns, experience, and context.', duration: '3 min' },
            { instruction: 'Reveal: "You just did what an AI language model does - predict what comes next based on patterns you\'ve learned."', duration: '3 min', teacherNotes: 'Connect human intuition to machine process to demystify AI.' }
          ],
          formativeAssessment: 'Students can articulate that prediction is based on patterns learned from experience.',
          differentiation: { support: 'Use very common phrases with obvious completions first.', extension: 'Ask students to create sentences with multiple equally valid completions.' }
        },
        {
          title: 'Tokenization: How AI Reads Text',
          duration: '15 minutes',
          overview: 'Students discover that AI doesn\'t read words like humans do - it breaks text into tokens, which fundamentally affects its capabilities.',
          videoResources: [
            { title: 'What are Tokens in AI?', url: 'https://www.youtube.com/watch?v=zduSFxRajkE', duration: '4:26', description: 'Visual explanation of tokenization in LLMs' }
          ],
          steps: [
            { instruction: 'Open the OpenAI Tokenizer (platform.openai.com/tokenizer) or similar tool on the projector.', duration: '2 min' },
            { instruction: 'Type a simple sentence and show how it\'s broken into tokens. Color coding shows the breaks.', duration: '3 min', teacherNotes: 'Start with "Hello world" then try "strawberry" to show it becomes ["str", "aw", "berry"].' },
            { instruction: 'Have students predict: Will their name be one token or multiple? Test several names.', duration: '4 min', teacherNotes: 'Common names = 1 token, unusual names = multiple. This explains why AI struggles with uncommon names.' },
            { instruction: 'Challenge: Ask AI "How many R\'s in strawberry?" then show the tokenization explains the wrong answer.', duration: '4 min', teacherNotes: 'Key insight: AI can\'t see individual letters because it sees tokens, not characters.' },
            { instruction: 'Discussion: What other tasks might be hard for AI because of tokenization?', duration: '2 min' }
          ],
          formativeAssessment: 'Students can explain why AI makes certain errors (like counting letters) based on tokenization.',
          differentiation: { support: 'Provide a pre-made worksheet showing token breakdowns of common words.', extension: 'Explore how tokenization differs across languages and why this matters for non-English speakers.' }
        },
        {
          title: 'Training Data Deep Dive',
          duration: '20 minutes',
          overview: 'Students investigate where AI training data comes from and how this affects what the model "knows" and believes.',
          videoResources: [
            { title: 'AI Training Data Explained', url: 'https://www.youtube.com/watch?v=Rjq2Igl3fQ4', duration: '6:45', description: 'Overview of how LLMs are trained on internet text' }
          ],
          steps: [
            { instruction: 'Present the scale: GPT-4 trained on hundreds of billions of words. Ask: "Where could that much text come from?"', duration: '3 min', teacherNotes: 'Accept guesses: books, websites, social media, Wikipedia, etc. - all correct!' },
            { instruction: 'Show a diagram of common training data sources: web crawls, books, code repositories, academic papers.', duration: '3 min' },
            { instruction: 'In groups, students investigate a potential bias: Give each group a scenario (e.g., "Ask AI about a nurse - what gender does it assume?").', duration: '8 min', teacherNotes: 'Other scenarios: occupation stereotypes, cultural assumptions, historical perspectives.' },
            { instruction: 'Groups share findings. Discuss: "If AI learned from the internet, what biases might it have learned?"', duration: '4 min', teacherNotes: 'Connect to training data - AI reflects patterns in its training data, including biases.' },
            { instruction: 'Key takeaway: AI doesn\'t have opinions - it has patterns from data. Garbage in, garbage out.', duration: '2 min' }
          ],
          formativeAssessment: 'Students can identify at least one bias in AI outputs and connect it to training data.',
          differentiation: { support: 'Provide specific prompts to test for each bias scenario.', extension: 'Research how AI companies try to reduce bias and evaluate effectiveness.' }
        },
        {
          title: 'Synthesis: Building a Mental Model',
          duration: '15 minutes',
          overview: 'Students create a visual or written explanation of how LLMs work, consolidating their understanding.',
          steps: [
            { instruction: 'Provide three model options: (1) Draw a diagram showing data → training → tokens → prediction. (2) Write a "explain like I\'m 10" paragraph. (3) Create a comparison: "An LLM is like ___ because ___."', duration: '2 min' },
            { instruction: 'Students work individually or in pairs on their chosen format.', duration: '8 min', teacherNotes: 'Circulate and ask probing questions to deepen understanding.' },
            { instruction: 'Gallery walk or share-out: Students present their mental models.', duration: '5 min', teacherNotes: 'Highlight accurate models and gently correct misconceptions.' }
          ],
          formativeAssessment: 'Mental models demonstrate understanding of training data, tokenization, and prediction.',
          differentiation: { support: 'Provide a partially completed diagram to fill in.', extension: 'Explain what would happen if training data changed (e.g., only trained on children\'s books).' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Three mental model formats to choose from', 'Self-selected bias investigation topics', 'Individual or pair work options'],
          relevanceAndAuthenticity: ['Tokenization explains real AI failures students may have noticed', 'Bias investigation connects to social issues', 'Understanding enables informed AI use'],
          selfRegulation: ['Prediction game builds metacognition about learning', 'Mental model creation promotes self-assessment', 'Gallery walk provides peer feedback']
        },
        representation: {
          multipleFormats: ['Tokenizer visual tool', 'Video explanations available', 'Diagrams, text, and interactive demos'],
          vocabularySupport: ['Token defined through hands-on experience', 'Training data explained with concrete examples', 'Prediction framed through familiar game'],
          backgroundKnowledge: ['Builds from human prediction (familiar) to machine prediction (new)', 'No programming knowledge required', 'Mathematical concepts avoided']
        },
        actionExpression: {
          physicalOptions: ['Typing in tokenizer for hands-on learners', 'Drawing diagrams for visual learners', 'Verbal discussion for auditory learners'],
          expressionOptions: ['Three mental model formats accommodate different strengths', 'Written, visual, or analogical expression', 'Individual reflection or collaborative work'],
          executiveFunctionSupport: ['Step-by-step activities with clear timings', 'Structured bias investigation protocol', 'Mental model templates available']
        }
      }
    },
    {
      title: 'Capabilities and Limitations',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Identify what AI does well', 'Recognize common failure modes', 'Understand hallucinations and confabulation'],
      conceptualUnderstanding: ['AI excels at pattern-matching tasks', 'AI fails at reasoning, math, and factual accuracy', 'Confident-sounding outputs can be completely wrong'],
      activities: ['Testing: Try to break an AI', 'Documentation: Catalog failure types', 'Discussion: When should you trust AI?'],
      materials: ['AI access', 'Testing prompts', 'Failure catalog template'],
      detailedActivities: [
        {
          title: 'Opening: The Confidence Problem',
          duration: '8 minutes',
          overview: 'Students observe that AI responds confidently even when wrong, establishing the need for critical evaluation.',
          steps: [
            { instruction: 'Ask AI a factual question it will get wrong (e.g., "What is the population of [small local town] as of 2024?").', duration: '2 min', teacherNotes: 'Choose something local and specific that AI is likely to confabulate about.' },
            { instruction: 'Read the confident response. Ask: "Does this answer sound confident? How confident on a scale of 1-10?"', duration: '2 min' },
            { instruction: 'Reveal the actual answer. Discuss: "The AI was completely wrong but sounded completely sure. Why is this dangerous?"', duration: '4 min', teacherNotes: 'Key insight: Confidence ≠ accuracy. AI doesn\'t know what it doesn\'t know.' }
          ],
          formativeAssessment: 'Students recognize that AI confidence is not an indicator of accuracy.',
          differentiation: { support: 'Prepare multiple examples in case the first doesn\'t demonstrate the point clearly.', extension: 'Ask students to find examples from their own experience where AI was confidently wrong.' }
        },
        {
          title: 'Systematic Testing: What AI Can\'t Do',
          duration: '22 minutes',
          overview: 'Students conduct structured tests to discover and categorize AI limitations.',
          videoResources: [
            { title: 'GPT-4 Fails These Tests', url: 'https://www.youtube.com/watch?v=uo_HXuOPDno', duration: '7:34', description: 'Compilation of AI failure modes with explanations' }
          ],
          steps: [
            { instruction: 'Distribute the "AI Failure Catalog" template with categories: Math/Logic, Facts, Reasoning, Spatial, Common Sense, Self-Awareness.', duration: '2 min' },
            { instruction: 'Model testing the Math/Logic category: "If I have 3 apples and give away 2, then buy 5 more, how many do I have?" Follow up with harder variants.', duration: '5 min', teacherNotes: 'Multi-step math often fails. Try logic puzzles too.' },
            { instruction: 'In groups of 3-4, students test one assigned category using provided prompts and their own invented tests.', duration: '10 min', teacherNotes: 'Circulate to ensure fair testing - don\'t set up AI to fail or succeed artificially.' },
            { instruction: 'Each group shares their most surprising failure and adds it to the class catalog.', duration: '5 min', teacherNotes: 'Build a shared document or board of AI limitations.' }
          ],
          formativeAssessment: 'Each group can articulate at least two specific failures in their category with explanations.',
          differentiation: { support: 'Provide specific test prompts for each category with expected outcomes.', extension: 'Attempt to find the boundary - what\'s the simplest version of the task AI can handle?' }
        },
        {
          title: 'Understanding Hallucinations',
          duration: '12 minutes',
          overview: 'Students learn why AI generates false information confidently, understanding the mechanism behind hallucinations.',
          steps: [
            { instruction: 'Define hallucination: "When AI generates information that seems plausible but is completely made up."', duration: '2 min' },
            { instruction: 'Demonstrate: Ask AI for a citation on a specific topic. "Give me an academic paper about [topic] with author and year."', duration: '3 min', teacherNotes: 'AI often generates fake paper titles, authors, and journals that sound real but don\'t exist.' },
            { instruction: 'Attempt to find the cited paper. Show that it doesn\'t exist.', duration: '3 min', teacherNotes: 'Use Google Scholar to search. The paper won\'t be found.' },
            { instruction: 'Explain why this happens: AI predicts plausible text, not true text. It knows what a citation looks like, not what citations exist.', duration: '4 min', teacherNotes: 'Connect back to Lesson 2: prediction from patterns, not knowledge of facts.' }
          ],
          formativeAssessment: 'Students can explain why hallucinations occur in terms of prediction vs. knowledge.',
          differentiation: { support: 'Provide a side-by-side of real vs. hallucinated citation to spot the difference.', extension: 'Research strategies professionals use to verify AI-generated information.' }
        },
        {
          title: 'Building a Trust Framework',
          duration: '8 minutes',
          overview: 'Students create guidelines for when to trust AI and when to verify, synthesizing the lesson\'s learnings.',
          steps: [
            { instruction: 'As a class, brainstorm: "Based on what we learned, when SHOULD you trust AI? When should you NOT?"', duration: '3 min', teacherNotes: 'Good for: drafts, brainstorming, explanation of concepts. Bad for: facts, citations, math, recent events.' },
            { instruction: 'Create a class "AI Trust Checklist" with verification steps.', duration: '3 min' },
            { instruction: 'Exit ticket: "Name one task you\'d now do differently knowing AI limitations."', duration: '2 min' }
          ],
          formativeAssessment: 'Trust checklist reflects understanding of capabilities and limitations.',
          differentiation: { support: 'Provide a partially completed checklist to add to.', extension: 'Create a decision tree: "Should I trust this AI output?" with branches.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Groups choose additional tests beyond provided prompts', 'Students contribute their own failure examples', 'Multiple ways to contribute to class catalog'],
          relevanceAndAuthenticity: ['Tests real AI tools students use', 'Trust framework applicable to daily life', 'Develops critical media literacy'],
          selfRegulation: ['Trust checklist provides ongoing self-assessment tool', 'Exit ticket promotes reflection on behavior change', 'Catalog provides reference for future use']
        },
        representation: {
          multipleFormats: ['Live demonstration of failures', 'Written failure catalog', 'Video examples of AI limitations'],
          vocabularySupport: ['Hallucination defined with concrete examples', 'Confabulation explained through demonstration', 'Categories labeled with examples'],
          backgroundKnowledge: ['Builds on Lesson 2 understanding of prediction', 'No technical knowledge required', 'Examples use everyday scenarios']
        },
        actionExpression: {
          physicalOptions: ['Hands-on AI testing', 'Written documentation', 'Verbal group sharing'],
          expressionOptions: ['Group or individual testing', 'Written or visual catalog contributions', 'Checklist or decision tree output'],
          executiveFunctionSupport: ['Structured testing protocol with categories', 'Template for organizing findings', 'Clear time limits for each activity']
        }
      }
    },
    {
      title: 'Ethics and Impact of AI',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Examine environmental costs of AI', 'Discuss labor and copyright issues', 'Consider societal impacts'],
      conceptualUnderstanding: ['AI training requires massive energy', 'AI models are built on others\' creative work', 'AI deployment affects jobs and society'],
      activities: ['Research: Environmental cost of AI', 'Case study: AI and creative industries', 'Debate: Should AI use be regulated?'],
      materials: ['Research materials', 'Case studies'],
      detailedActivities: [
        {
          title: 'Opening: The Hidden Costs',
          duration: '10 minutes',
          overview: 'Students discover that AI has significant hidden costs beyond money—environmental, labor, and social impacts.',
          videoResources: [
            { title: 'The Environmental Cost of AI', url: 'https://www.youtube.com/watch?v=QXaYLBljftI', duration: '6:28', description: 'Overview of AI\'s carbon footprint and water usage' }
          ],
          steps: [
            { instruction: 'Show statistic: Training GPT-4 used as much electricity as 1,000 US homes use in a year.', duration: '2 min', teacherNotes: 'Source this from recent research. Numbers vary but scale is consistent.' },
            { instruction: 'Ask: "What else might that electricity have been used for? Who pays these costs?"', duration: '3 min' },
            { instruction: 'Introduce the three hidden costs we\'ll explore: Environmental, Labor, and Social.', duration: '2 min' },
            { instruction: 'Quick poll: "Before today, had you thought about any of these costs?" Discuss why these costs are hidden.', duration: '3 min', teacherNotes: 'Companies don\'t advertise costs; users don\'t see the infrastructure.' }
          ],
          formativeAssessment: 'Students acknowledge AI has costs beyond purchase price or subscription.',
          differentiation: { support: 'Provide visual comparison of AI energy use vs. everyday activities.', extension: 'Research energy costs of their own AI usage patterns.' }
        },
        {
          title: 'Case Study Rotation: Three Perspectives',
          duration: '20 minutes',
          overview: 'Students explore AI ethics through three lenses: environment, labor, and creative industries.',
          steps: [
            { instruction: 'Divide class into three groups. Each receives a case study packet on one topic.', duration: '2 min' },
            { instruction: 'Group A - Environment: Data center water usage, carbon footprint, e-waste. Group B - Labor: Content moderators, training data labelers, gig workers. Group C - Creative: Artists\' work in training data, copyright issues, job displacement.', duration: '1 min' },
            { instruction: 'Groups read their case study and discuss: What\'s the problem? Who\'s affected? What should be done?', duration: '10 min', teacherNotes: 'Circulate to ensure groups stay focused and understand the material.' },
            { instruction: 'Each group presents a 2-minute summary to the class.', duration: '6 min' },
            { instruction: 'Discuss connections: "How are these three issues related?"', duration: '1 min', teacherNotes: 'All involve externalized costs - someone else pays for "free" or cheap AI.' }
          ],
          formativeAssessment: 'Groups can articulate the problem, affected parties, and potential solutions for their topic.',
          differentiation: { support: 'Provide guided reading questions for case studies.', extension: 'Research recent news about their case study topic.' }
        },
        {
          title: 'Structured Debate: Should AI Be Regulated?',
          duration: '15 minutes',
          overview: 'Students engage in structured debate, practicing argumentation while exploring AI governance.',
          steps: [
            { instruction: 'Present the debate question: "Should governments regulate AI development and use?"', duration: '1 min' },
            { instruction: 'Quick individual reflection: Where do you stand? (spectrum from "no regulation" to "heavy regulation")', duration: '2 min' },
            { instruction: 'Assign debate positions (regardless of personal views): Half the class argues FOR regulation, half argues AGAINST.', duration: '1 min', teacherNotes: 'Assigning positions prevents echo chambers and develops argumentation skills.' },
            { instruction: 'Groups prepare arguments using case study evidence. Each side gets 3 minutes to prepare.', duration: '3 min' },
            { instruction: 'Structured debate: Each side gets 2 minutes to present, then 2 minutes for rebuttal.', duration: '6 min' },
            { instruction: 'Debrief: "Did hearing the other side change your personal view at all? Why or why not?"', duration: '2 min' }
          ],
          formativeAssessment: 'Students use evidence from case studies to support their arguments.',
          differentiation: { support: 'Provide argument starters for each position.', extension: 'Research actual AI regulation (EU AI Act, etc.) and evaluate it.' }
        },
        {
          title: 'Personal Reflection: My AI Principles',
          duration: '5 minutes',
          overview: 'Students synthesize learning into personal guidelines for ethical AI use.',
          steps: [
            { instruction: 'Individual reflection: "Based on what you learned, write 2-3 personal principles for your own AI use."', duration: '3 min', teacherNotes: 'Examples: "I will verify AI-generated facts," "I will consider whose work trained this AI," "I will think about environmental cost."' },
            { instruction: 'Optional sharing: Volunteers share one principle with the class.', duration: '2 min' }
          ],
          formativeAssessment: 'Principles reflect understanding of at least one ethical dimension of AI use.',
          differentiation: { support: 'Provide sentence starters: "When using AI, I will..." or "I will not use AI when..."', extension: 'Create an "AI Ethics Pledge" for the school or class.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Personal principles reflect individual values', 'Debate positions develop empathy for multiple views', 'Voluntary sharing respects comfort levels'],
          relevanceAndAuthenticity: ['Connects to real ongoing policy debates', 'Personal principles apply to students\' daily AI use', 'Case studies use real examples and data'],
          selfRegulation: ['Personal principles provide self-governance framework', 'Debate reflection encourages perspective-taking', 'Position spectrum builds self-awareness']
        },
        representation: {
          multipleFormats: ['Video introduction of concepts', 'Written case studies', 'Visual statistics and comparisons'],
          vocabularySupport: ['Externalized costs explained with examples', 'Regulation defined with concrete examples', 'Technical terms minimized'],
          backgroundKnowledge: ['Builds on previous lessons\' understanding', 'No economics or policy background assumed', 'Local examples where possible']
        },
        actionExpression: {
          physicalOptions: ['Standing spectrum for initial position', 'Seated debate participation', 'Written reflection option'],
          expressionOptions: ['Verbal debate or written arguments', 'Group presentation or individual notes', 'Public sharing or private principles'],
          executiveFunctionSupport: ['Structured debate format with clear timings', 'Case study packets organized by topic', 'Principle templates provided']
        }
      }
    }
  ],
  assessment: { formative: ['AI definition quiz', 'Capability/limitation sorting', 'Failure documentation', 'Ethics discussion participation'], summative: 'Create an "AI Reality Check" guide that explains what AI is, how it works, what it can and cannot do, and ethical considerations. Include specific examples and test results.' },
  extensions: ['Research specific AI architectures', 'Explore AI in specific industries', 'Study AI regulation worldwide'],
  realWorldConnections: ['AI is being deployed in hiring, healthcare, and justice', 'Understanding AI helps evaluate claims and products', 'AI literacy is increasingly important for all careers']
};

const project2: Project = {
  id: 'project-2',
  title: 'Project 2: Running Local LLMs',
  description: 'Use Ollama or similar tools to run open-source AI models on your own computer. Compare performance and capabilities.',
  difficulty: 'Intermediate',
  duration: '2-3 weeks',
  gradeBand: '9-12',
  overview: 'Students set up and run AI models locally, learning about hardware requirements, model selection, and the benefits of local inference. They compare local models to cloud services and understand the privacy implications.',
  learningObjectives: [
    'Install and configure Ollama or similar local AI tools',
    'Select appropriate models for different hardware',
    'Run inference locally and understand resource usage',
    'Compare local and cloud AI services',
    'Understand privacy benefits of local AI',
    'Evaluate model quality and capabilities'
  ],
  prerequisites: ['Completed Project 1', 'Basic command line familiarity helpful'],
  materials: {
    required: ['Computer with 8GB+ RAM (16GB+ recommended)', 'Terminal/command line access', 'Internet for initial downloads'],
    optional: ['GPU for faster inference', 'Multiple computers for comparison']
  },
  lessons: [
    {
      title: 'Introduction to Local AI',
      duration: '50 minutes',
      gradeBand: '9-12',
      objectives: ['Understand local vs cloud AI', 'Learn about model formats and sizes', 'Assess hardware requirements'],
      conceptualUnderstanding: ['Local AI keeps data on your machine', 'Model size affects quality and speed', 'Different hardware enables different models'],
      activities: ['Discussion: Why run AI locally?', 'Assessment: Check your hardware specs', 'Research: Model size comparison'],
      materials: ['Hardware checklist', 'Model comparison chart'],
      detailedActivities: [
        {
          title: 'Hook: Where Does Your Data Go?',
          duration: '10 minutes',
          overview: 'Students trace what happens when they use cloud AI, building motivation for local alternatives.',
          steps: [
            { instruction: 'Ask: "When you use ChatGPT, where does your conversation go?" Map the journey on the board: your device → internet → OpenAI servers → training data?', duration: '3 min', teacherNotes: 'Most students don\'t realize their conversations may be used for training.' },
            { instruction: 'Share examples of sensitive uses: medical questions, personal writing, business ideas. Ask: "Would you want these stored on someone else\'s computer?"', duration: '3 min' },
            { instruction: 'Introduce the alternative: "What if AI could run entirely on your own computer, with data never leaving your machine?"', duration: '2 min' },
            { instruction: 'Quick poll: "What concerns you most about cloud AI?" Privacy, cost, internet dependency, or censorship?', duration: '2 min', teacherNotes: 'All are valid concerns that local AI addresses.' }
          ],
          formativeAssessment: 'Students can articulate at least one privacy concern with cloud AI.',
          differentiation: { support: 'Provide a visual diagram of cloud vs. local data flow.', extension: 'Research specific company policies about training data from user conversations.' }
        },
        {
          title: 'Understanding Model Sizes and Formats',
          duration: '15 minutes',
          overview: 'Students learn how AI models vary in size and what that means for performance.',
          videoResources: [
            { title: 'Running LLMs Locally', url: 'https://www.youtube.com/watch?v=Coj72EzmX20', duration: '8:42', description: 'Overview of local AI options and hardware requirements' }
          ],
          steps: [
            { instruction: 'Explain model parameters: "A 7B model has 7 billion parameters - think of these as the model\'s learned patterns."', duration: '3 min', teacherNotes: 'Avoid getting too technical. Parameters = brain cells analogy works.' },
            { instruction: 'Show the size spectrum: 1B (tiny) → 7B (good for most tasks) → 13B (better quality) → 70B (near-commercial quality). Relate to file sizes and RAM needs.', duration: '4 min' },
            { instruction: 'Introduce quantization: "Compressing models to use less memory, like MP3 vs. WAV for audio." Q4 = smallest, Q8 = highest quality.', duration: '4 min', teacherNotes: 'Q4 models are often "good enough" for most users.' },
            { instruction: 'Activity: Calculate what model size their computers could run. RAM needed ≈ model size in GB + 2GB overhead.', duration: '4 min' }
          ],
          formativeAssessment: 'Students can estimate what model size their hardware supports.',
          differentiation: { support: 'Provide a simple chart: 8GB RAM = 7B Q4, 16GB RAM = 13B Q4 or 7B Q8.', extension: 'Research GGUF vs. other model formats and their trade-offs.' }
        },
        {
          title: 'Hardware Assessment Activity',
          duration: '15 minutes',
          overview: 'Students discover their own computer\'s specifications and plan what local AI they could run.',
          steps: [
            { instruction: 'Distribute the hardware checklist. Walk through how to find: RAM, CPU type, GPU (if any), available storage.', duration: '3 min', teacherNotes: 'Windows: Task Manager. Mac: About This Mac. Linux: htop or system info.' },
            { instruction: 'Students check their own devices (or assigned school computers) and fill in the checklist.', duration: '5 min' },
            { instruction: 'Using the model compatibility chart, students identify what models they could run locally.', duration: '4 min', teacherNotes: 'Even 8GB RAM can run useful models. No one is "too weak" for local AI.' },
            { instruction: 'Discussion: "What surprised you about the hardware requirements? Is local AI more or less accessible than you expected?"', duration: '3 min' }
          ],
          formativeAssessment: 'Completed hardware checklist with realistic model recommendations.',
          differentiation: { support: 'Pair students who struggle with tech with more confident peers.', extension: 'Research GPU acceleration and how it changes the calculus.' }
        },
        {
          title: 'Comparing Local AI Options',
          duration: '10 minutes',
          overview: 'Students explore the ecosystem of local AI tools and understand their options.',
          steps: [
            { instruction: 'Present the main options: Ollama (easiest), LM Studio (GUI-based), llama.cpp (technical), GPT4All (beginner-friendly).', duration: '4 min', teacherNotes: 'We\'ll use Ollama next lesson, but students should know alternatives exist.' },
            { instruction: 'Quick comparison: Ease of use vs. control trade-off. Ollama = easy but less control. llama.cpp = hard but full control.', duration: '3 min' },
            { instruction: 'Exit ticket: "Which tool would you choose and why? What model size could you run?"', duration: '3 min' }
          ],
          formativeAssessment: 'Students can name at least two local AI tools and explain their choice.',
          differentiation: { support: 'Recommend Ollama for all beginners - simplest path.', extension: 'Research how to run models through Python for programmatic access.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students assess their own hardware', 'Choice of which tool seems most appealing', 'Personal privacy concerns drive motivation'],
          relevanceAndAuthenticity: ['Uses students\' actual devices', 'Addresses real privacy concerns', 'Enables immediate practical application'],
          selfRegulation: ['Hardware checklist provides self-assessment', 'Model recommendations match individual situations', 'Exit ticket promotes planning']
        },
        representation: {
          multipleFormats: ['Video overview of concepts', 'Visual size comparison charts', 'Hands-on hardware checking'],
          vocabularySupport: ['Parameters explained with analogy', 'Quantization compared to audio compression', 'Technical terms introduced gradually'],
          backgroundKnowledge: ['Builds on Project 1 AI understanding', 'No prior hardware knowledge assumed', 'Step-by-step system check instructions']
        },
        actionExpression: {
          physicalOptions: ['Digital or paper hardware checklist', 'Individual or paired device checking', 'Multiple tool options for different comfort levels'],
          expressionOptions: ['Written exit ticket or verbal explanation', 'Technical or non-technical language accepted', 'Diagram or text for data flow'],
          executiveFunctionSupport: ['Structured checklist format', 'Clear steps for finding system info', 'Decision chart for model selection']
        }
      }
    },
    {
      title: 'Installing Ollama',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Download and install Ollama', 'Pull your first model', 'Run basic inference'],
      conceptualUnderstanding: ['Ollama simplifies local model management', 'Models are downloaded once and run locally', 'Different models have different capabilities'],
      activities: ['Installation: Set up Ollama', 'First model: Pull and test llama2 or similar', 'Exploration: Try different prompts'],
      materials: ['Ollama installation guide', 'Test prompts'],
      detailedActivities: [
        {
          title: 'Installation Walkthrough',
          duration: '20 minutes',
          overview: 'Students install Ollama on their computers with step-by-step guidance.',
          videoResources: [
            { title: 'Ollama Installation Guide', url: 'https://www.youtube.com/watch?v=h_GTxRFYETY', duration: '5:18', description: 'Step-by-step Ollama setup for all platforms' }
          ],
          steps: [
            { instruction: 'Navigate to ollama.ai and download the installer for your operating system.', duration: '3 min', teacherNotes: 'Have backup USB drives with installers for slow/restricted internet.' },
            { instruction: 'Run the installer. Windows: Run .exe. Mac: Drag to Applications. Linux: curl command.', duration: '5 min', teacherNotes: 'Linux command: curl -fsSL https://ollama.ai/install.sh | sh' },
            { instruction: 'Open terminal/command prompt. Type "ollama" and press Enter. Confirm you see the help text.', duration: '3 min', teacherNotes: 'If "command not found," troubleshoot PATH or restart terminal.' },
            { instruction: 'Help students who encounter issues. Common problems: antivirus blocking, admin rights needed, restart required.', duration: '7 min', teacherNotes: 'Have a troubleshooting document ready. Pair struggling students with successful ones.' },
            { instruction: 'Checkpoint: Everyone should see "ollama help" output before proceeding.', duration: '2 min' }
          ],
          formativeAssessment: 'All students have Ollama responding to the "ollama" command.',
          differentiation: { support: 'Pair students for installation support. Provide printed step-by-step guide.', extension: 'Explore Ollama configuration options and environment variables.' }
        },
        {
          title: 'Pulling Your First Model',
          duration: '15 minutes',
          overview: 'Students download their first AI model and understand what\'s happening.',
          steps: [
            { instruction: 'Explain: "We\'ll download a model. This is a one-time download - the model then lives on your computer."', duration: '2 min' },
            { instruction: 'Run: ollama pull llama3.2:3b (or appropriate model for available hardware). Watch the download progress.', duration: '8 min', teacherNotes: 'llama3.2:3b is ~2GB, fast to download. Use smaller if bandwidth limited.' },
            { instruction: 'While downloading, explain: "This 2GB file contains billions of learned patterns. Once downloaded, it\'s yours to use forever, offline."', duration: '3 min' },
            { instruction: 'Verify: ollama list - shows downloaded models.', duration: '2 min' }
          ],
          formativeAssessment: 'Students have at least one model showing in "ollama list."',
          differentiation: { support: 'Pre-download models to USB for bandwidth-limited situations.', extension: 'Pull multiple models to compare later.' }
        },
        {
          title: 'First Conversation with Local AI',
          duration: '15 minutes',
          overview: 'Students interact with their locally-running AI for the first time.',
          steps: [
            { instruction: 'Run: ollama run llama3.2:3b (or your chosen model). Wait for the ">>>" prompt.', duration: '2 min' },
            { instruction: 'Type a simple question: "What is the capital of France?" See the response stream.', duration: '2 min', teacherNotes: 'Watch their reactions - first local AI is exciting!' },
            { instruction: 'Point out: "This is running entirely on your computer. No internet needed. Try turning off WiFi and asking another question."', duration: '3 min', teacherNotes: 'Offline demonstration is powerful - proves it\'s truly local.' },
            { instruction: 'Free exploration: Students try various prompts. Encourage testing things that failed on cloud AI.', duration: '6 min' },
            { instruction: 'Discussion: "How does this feel different from using ChatGPT or Claude? What did you notice?"', duration: '2 min' }
          ],
          formativeAssessment: 'Students successfully conduct a conversation with locally-running AI.',
          differentiation: { support: 'Provide prompt ideas for students unsure what to ask.', extension: 'Try system prompts to customize the AI\'s behavior.' }
        },
        {
          title: 'Understanding What\'s Happening',
          duration: '10 minutes',
          overview: 'Students build a mental model of local AI operation.',
          steps: [
            { instruction: 'Open Activity Monitor (Mac) or Task Manager (Windows) while running Ollama. Show the memory and CPU usage.', duration: '3 min', teacherNotes: 'This makes the local processing tangible and visible.' },
            { instruction: 'Explain the process: Model loaded to RAM → Your text tokenized → Processed through model → Response generated → Displayed.', duration: '3 min' },
            { instruction: 'Exit ticket: Draw or write what happens when you ask local AI a question. Include: where data goes, what processes it, where results come from.', duration: '4 min' }
          ],
          formativeAssessment: 'Exit ticket shows understanding that all processing happens locally.',
          differentiation: { support: 'Provide a fill-in-the-blank diagram of the process.', extension: 'Research how GPU acceleration changes this process.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Free exploration time with chosen prompts', 'Students set their own pace during installation', 'Choice of what questions to ask AI'],
          relevanceAndAuthenticity: ['Installing real tools used by professionals', 'Running AI on own hardware is empowering', 'Offline capability has immediate value'],
          selfRegulation: ['Checkpoints ensure progress before moving on', 'Activity Monitor shows concrete feedback', 'Exit ticket promotes reflection']
        },
        representation: {
          multipleFormats: ['Video installation guide', 'Written step-by-step instructions', 'Live demonstration by teacher'],
          vocabularySupport: ['Commands explained before executing', 'Terminal output interpreted together', 'New terms introduced in context'],
          backgroundKnowledge: ['No prior command line experience required', 'Each step explained before doing', 'Troubleshooting addresses common issues']
        },
        actionExpression: {
          physicalOptions: ['Typing commands or copy-paste', 'Individual or paired work', 'Written or drawn exit ticket'],
          expressionOptions: ['Free-form exploration or structured prompts', 'Technical or non-technical exit ticket', 'Discussion or written reflection'],
          executiveFunctionSupport: ['Sequential steps clearly marked', 'Checkpoints prevent getting lost', 'Commands provided exactly as typed']
        }
      }
    },
    {
      title: 'Model Selection and Comparison',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Compare different model sizes', 'Test models on same prompts', 'Measure response time and quality'],
      conceptualUnderstanding: ['Larger models are generally better but slower', 'Different models excel at different tasks', 'Quantization trades quality for speed'],
      activities: ['Testing: Same prompts across models', 'Measurement: Track response times', 'Evaluation: Rate output quality'],
      materials: ['Multiple models', 'Comparison worksheet'],
      detailedActivities: [
        {
          title: 'Setting Up the Comparison',
          duration: '15 minutes',
          overview: 'Students download multiple models to enable systematic comparison.',
          steps: [
            { instruction: 'As a class, choose 3 models to compare. Recommended: llama3.2:1b (tiny), llama3.2:3b (small), and one larger if hardware permits.', duration: '3 min', teacherNotes: 'Adjust based on class hardware. Even 1b vs 3b shows clear differences.' },
            { instruction: 'Pull the additional models. Students can split this task - different students pull different models, then share observations.', duration: '8 min' },
            { instruction: 'Distribute the comparison worksheet with: model name, response time, quality rating (1-5), and notes columns.', duration: '2 min' },
            { instruction: 'Review the test prompts we\'ll use: (1) Simple fact, (2) Creative writing, (3) Reasoning problem, (4) Code generation.', duration: '2 min', teacherNotes: 'Same prompts across models enables fair comparison.' }
          ],
          formativeAssessment: 'Students have multiple models ready and understand the testing protocol.',
          differentiation: { support: 'Provide specific models and prompts - reduce decision fatigue.', extension: 'Add specialized models like CodeLlama to the comparison.' }
        },
        {
          title: 'Systematic Testing',
          duration: '25 minutes',
          overview: 'Students run the same prompts through different models, measuring and rating results.',
          videoResources: [
            { title: 'Comparing Open Source LLMs', url: 'https://www.youtube.com/watch?v=QP1sFMkpP9M', duration: '10:23', description: 'Benchmark comparison of popular open source models' }
          ],
          steps: [
            { instruction: 'Test 1 - Simple Fact: "What is photosynthesis?" Run on each model, time the response, rate quality.', duration: '5 min', teacherNotes: 'Use a stopwatch or phone timer. First word to last word.' },
            { instruction: 'Test 2 - Creative Writing: "Write a haiku about computers." Compare creativity across models.', duration: '5 min', teacherNotes: 'Quality differences become apparent in creative tasks.' },
            { instruction: 'Test 3 - Reasoning: "If all roses are flowers and some flowers are red, are all roses red?" Compare accuracy.', duration: '5 min', teacherNotes: 'Smaller models often fail logic tests. This is expected!' },
            { instruction: 'Test 4 - Code: "Write a Python function to check if a number is prime." Compare code quality.', duration: '6 min', teacherNotes: 'Don\'t worry if students don\'t know Python - they can assess structure.' },
            { instruction: 'Record all results on the comparison worksheet.', duration: '4 min' }
          ],
          formativeAssessment: 'Completed comparison worksheets with data for all tests across multiple models.',
          differentiation: { support: 'Work in pairs with one person prompting and one recording.', extension: 'Design additional test categories to explore.' }
        },
        {
          title: 'Analyzing Results',
          duration: '15 minutes',
          overview: 'Students identify patterns in their data and draw conclusions about model selection.',
          steps: [
            { instruction: 'In small groups, share results. Do you see similar patterns? Where do results differ?', duration: '5 min', teacherNotes: 'Variation is expected and interesting - discuss why.' },
            { instruction: 'Class discussion: What patterns emerged? (Usually: bigger = better quality but slower, smaller = faster but more errors)', duration: '5 min' },
            { instruction: 'Key insight: "There\'s no best model - there\'s the best model for your task and hardware."', duration: '2 min' },
            { instruction: 'Exit reflection: "Based on your results, which model would you use for (a) quick questions, (b) important writing, (c) offline use on low-power device?"', duration: '3 min' }
          ],
          formativeAssessment: 'Students can justify model choice based on task requirements.',
          differentiation: { support: 'Provide a decision matrix template.', extension: 'Research how professionals choose models for production systems.' }
        },
        {
          title: 'Understanding Quantization',
          duration: '5 minutes',
          overview: 'Students learn how quantization enables running larger models on limited hardware.',
          steps: [
            { instruction: 'Brief explanation: Q4 vs Q8 quantization - trading precision for size, like JPEG quality settings.', duration: '2 min' },
            { instruction: 'If time permits, demonstrate: same model at different quantization levels. Note size and quality differences.', duration: '3 min', teacherNotes: 'This can be homework if time is short.' }
          ],
          formativeAssessment: 'Students understand quantization as a trade-off, not just "worse."',
          differentiation: { support: 'Stick to the JPEG analogy - visual learners understand compression.', extension: 'Research different quantization methods (GPTQ, AWQ, GGUF).' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Groups choose how to divide testing work', 'Students rate quality based on own judgment', 'Reflection allows personal conclusions'],
          relevanceAndAuthenticity: ['Data-driven decision making is a real skill', 'Results directly inform future model choices', 'Scientific method applied to technology'],
          selfRegulation: ['Systematic worksheet keeps testing organized', 'Group comparison reveals personal biases', 'Reflection promotes metacognition']
        },
        representation: {
          multipleFormats: ['Video context for benchmarking', 'Numerical data (time)', 'Qualitative data (ratings)'],
          vocabularySupport: ['Quantization explained through analogy', 'Technical terms connected to observable results', 'Benchmark terminology introduced naturally'],
          backgroundKnowledge: ['Builds on installation from previous lesson', 'No statistics background needed', 'Coding knowledge not required for evaluation']
        },
        actionExpression: {
          physicalOptions: ['Typing prompts or voice input', 'Paper or digital worksheets', 'Individual or paired testing'],
          expressionOptions: ['Numerical ratings or written descriptions', 'Group discussion or written reflection', 'Simple or detailed analysis'],
          executiveFunctionSupport: ['Structured testing protocol', 'Worksheet organizes data collection', 'Clear sequence of test prompts']
        }
      }
    },
    {
      title: 'Privacy and Practical Applications',
      duration: '50 minutes',
      gradeBand: '9-12',
      objectives: ['Understand privacy benefits', 'Identify practical use cases', 'Plan a local AI workflow'],
      conceptualUnderstanding: ['Local AI never sends data to external servers', 'Many tasks work well with smaller local models', 'Local AI works offline'],
      activities: ['Analysis: What data stays private?', 'Brainstorm: Use cases for local AI', 'Planning: Design a local AI workflow'],
      materials: ['Privacy comparison chart', 'Use case templates'],
      detailedActivities: [
        {
          title: 'Privacy Deep Dive',
          duration: '15 minutes',
          overview: 'Students analyze exactly what data stays private with local AI versus what\'s exposed with cloud services.',
          videoResources: [
            { title: 'Why Data Privacy Matters', url: 'https://www.youtube.com/watch?v=KMtrY6lbjcY', duration: '6:15', description: 'Overview of personal data privacy in the AI era' }
          ],
          steps: [
            { instruction: 'Create two columns on board: "Cloud AI" and "Local AI". What data is exposed in each case?', duration: '4 min', teacherNotes: 'Cloud: prompts, responses, IP address, usage patterns, possibly training. Local: nothing leaves device.' },
            { instruction: 'Scenario analysis: "Imagine asking AI to help with: (1) medical symptoms, (2) legal questions, (3) business plans, (4) personal journal." Which would you want private?', duration: '5 min' },
            { instruction: 'Discuss: Terms of service often allow using your data for training. With local AI, there are no terms of service.', duration: '3 min' },
            { instruction: 'Key insight: "Privacy isn\'t just about secrets - it\'s about controlling your own information."', duration: '3 min' }
          ],
          formativeAssessment: 'Students can articulate specific privacy advantages of local AI.',
          differentiation: { support: 'Provide the two-column comparison pre-filled with one example each.', extension: 'Research actual privacy policies of major AI companies.' }
        },
        {
          title: 'Use Case Brainstorm',
          duration: '15 minutes',
          overview: 'Students identify practical applications for local AI in their lives, school, and community.',
          steps: [
            { instruction: 'Individual brainstorm: List 5 ways you could use local AI. Think about: school, personal projects, family, community.', duration: '4 min', teacherNotes: 'Examples: homework help, writing, translation, coding, research summaries.' },
            { instruction: 'Group sharing: Combine lists, identify common themes and unique ideas.', duration: '4 min' },
            { instruction: 'Class compilation: Create a master list categorized by domain (education, productivity, creative, etc.).', duration: '4 min' },
            { instruction: 'Reality check: For each category, ask "Would cloud AI work for this, or is local AI specifically valuable?"', duration: '3 min', teacherNotes: 'Some use cases are privacy-sensitive; others just benefit from offline access.' }
          ],
          formativeAssessment: 'Students contribute at least one viable local AI use case.',
          differentiation: { support: 'Provide category prompts to spark ideas.', extension: 'Identify use cases that could benefit their broader community.' }
        },
        {
          title: 'Designing Your Local AI Workflow',
          duration: '15 minutes',
          overview: 'Students plan how they\'ll actually use local AI, creating a personal implementation strategy.',
          steps: [
            { instruction: 'Choose one use case from the brainstorm that you want to implement.', duration: '2 min' },
            { instruction: 'Plan the workflow: What model will you use? When will you use it? What prompts will be most useful?', duration: '6 min', teacherNotes: 'Use the workflow template provided.' },
            { instruction: 'Identify barriers: What might stop you from actually using this? (Hardware, time, habit, forgetting Ollama exists)', duration: '4 min' },
            { instruction: 'Share one workflow with a partner. Give feedback: Is this realistic? What could improve it?', duration: '3 min' }
          ],
          formativeAssessment: 'Completed workflow plan with specific model, use case, and barrier mitigation.',
          differentiation: { support: 'Provide a fill-in-the-blank workflow template.', extension: 'Plan multiple workflows for different contexts.' }
        },
        {
          title: 'Project Wrap-Up and Reflection',
          duration: '5 minutes',
          overview: 'Students synthesize their learning from the entire project.',
          steps: [
            { instruction: 'Quick review: What did we learn across all four lessons? (Privacy, installation, model selection, applications)', duration: '2 min' },
            { instruction: 'Exit ticket: "One thing I\'ll do differently now that I know about local AI."', duration: '3 min' }
          ],
          formativeAssessment: 'Exit ticket shows intention to apply learning.',
          differentiation: { support: 'Offer multiple choice exit ticket options.', extension: 'Write a brief guide for teaching someone else about local AI.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose their own use case to develop', 'Personal workflow reflects individual needs', 'Partner feedback is peer-driven'],
          relevanceAndAuthenticity: ['Privacy scenarios use realistic situations', 'Use cases come from students\' actual lives', 'Workflow is immediately implementable'],
          selfRegulation: ['Barrier identification promotes realistic planning', 'Exit ticket promotes commitment', 'Partner feedback provides external perspective']
        },
        representation: {
          multipleFormats: ['Video on privacy concepts', 'Visual comparison charts', 'Written workflow templates'],
          vocabularySupport: ['Privacy terms defined with examples', 'Workflow terminology explained', 'Technical and non-technical language bridges'],
          backgroundKnowledge: ['Builds on all previous lessons', 'Privacy concepts accessible to all', 'No assumption of prior productivity system experience']
        },
        actionExpression: {
          physicalOptions: ['Written or verbal brainstorming', 'Digital or paper workflow planning', 'Individual or partner work'],
          expressionOptions: ['List, diagram, or narrative format for use cases', 'Detailed or simple workflow plans', 'Written or verbal exit ticket'],
          executiveFunctionSupport: ['Structured brainstorm categories', 'Workflow template provides scaffolding', 'Barrier identification prevents over-optimism']
        }
      }
    }
  ],
  assessment: { formative: ['Successful installation', 'Model comparison results', 'Quality evaluations', 'Privacy analysis'], summative: 'Create a "Local AI Setup Guide" for your school or community, including hardware recommendations, installation steps, model suggestions for different use cases, and privacy benefits.' },
  extensions: ['Try different local AI tools (LM Studio, etc.)', 'Explore specialized models', 'Set up local AI for a specific workflow'],
  realWorldConnections: ['Many organizations run AI locally for privacy', 'Local AI works in air-gapped environments', 'Understanding local AI enables informed choices']
};

const project3: Project = {
  id: 'project-3',
  title: 'Project 3: Fine-tuning for Community Needs',
  description: 'Customize AI models for specific community applications—local language, cultural context, or specialized knowledge.',
  difficulty: 'Advanced',
  duration: '4-6 weeks',
  gradeBand: '9-12',
  overview: 'Students learn how to adapt AI models for specific needs, understanding the concepts of fine-tuning, prompt engineering, and retrieval-augmented generation. They create models that serve their community\'s unique requirements.',
  learningObjectives: [
    'Understand fine-tuning concepts and approaches',
    'Create effective prompts for specific tasks',
    'Implement retrieval-augmented generation (RAG)',
    'Prepare and curate training data',
    'Evaluate model performance on specific tasks',
    'Consider ethical implications of customization'
  ],
  prerequisites: ['Completed Projects 1 and 2', 'Comfortable with command line', 'Basic understanding of data formats'],
  materials: {
    required: ['Computer with 16GB+ RAM', 'Local AI setup from Project 2', 'Text data for customization'],
    optional: ['GPU for faster training', 'Domain-specific documents']
  },
  lessons: [
    {
      title: 'Customization Approaches',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Compare fine-tuning, RAG, and prompt engineering', 'Understand when to use each approach', 'Plan a customization strategy'],
      conceptualUnderstanding: ['Fine-tuning changes model weights', 'RAG adds external knowledge at runtime', 'Prompt engineering guides existing capabilities'],
      activities: ['Comparison: Three approaches side by side', 'Analysis: Match approach to use case', 'Planning: Choose approach for project'],
      materials: ['Approach comparison guide', 'Use case scenarios'],
      detailedActivities: [
        {
          title: 'The Customization Challenge',
          duration: '10 minutes',
          overview: 'Students encounter a problem that generic AI can\'t solve well, motivating the need for customization.',
          steps: [
            { instruction: 'Demo: Ask local AI about something very local/specific - your school mascot history, local community events, or a niche topic. Show the generic or wrong response.', duration: '3 min', teacherNotes: 'Choose something students care about that AI genuinely doesn\'t know.' },
            { instruction: 'Discussion: "Why doesn\'t AI know about [topic]?" Lead to understanding that training data didn\'t include it.', duration: '3 min' },
            { instruction: 'Introduce the question: "How can we make AI work better for our specific needs?" Present three approaches.', duration: '4 min' }
          ],
          formativeAssessment: 'Students articulate why generic AI fails on specific/local knowledge.',
          differentiation: { support: 'Use a topic students are already experts in.', extension: 'Research what training data popular models actually used.' }
        },
        {
          title: 'Three Approaches Comparison',
          duration: '25 minutes',
          overview: 'Students learn the three main ways to customize AI: prompt engineering, RAG, and fine-tuning.',
          videoResources: [
            { title: 'RAG vs Fine-Tuning Explained', url: 'https://www.youtube.com/watch?v=T-D1OfcDW1M', duration: '11:42', description: 'When to use RAG vs fine-tuning for AI customization' }
          ],
          steps: [
            { instruction: 'Explain Prompt Engineering: "Giving better instructions to get better results." Demo: Same question with and without system prompt.', duration: '6 min', teacherNotes: 'Analogy: Like giving a new employee very detailed job instructions.' },
            { instruction: 'Explain RAG (Retrieval-Augmented Generation): "Giving AI access to your documents at question time." Draw diagram: question → find relevant docs → add to prompt → answer.', duration: '7 min', teacherNotes: 'Analogy: Like giving someone access to a reference library while they answer questions.' },
            { instruction: 'Explain Fine-Tuning: "Training the model further on your specific data." Show that this changes the model itself.', duration: '6 min', teacherNotes: 'Analogy: Like sending someone to specialized training before their job.' },
            { instruction: 'Comparison table: Fill in together - cost, difficulty, flexibility, data needed, best use cases for each approach.', duration: '6 min' }
          ],
          formativeAssessment: 'Students can describe each approach in their own words and identify a key difference.',
          differentiation: { support: 'Provide the comparison table partially filled in.', extension: 'Research hybrid approaches that combine multiple methods.' }
        },
        {
          title: 'Matching Approaches to Use Cases',
          duration: '15 minutes',
          overview: 'Students practice choosing the right customization approach for different scenarios.',
          steps: [
            { instruction: 'Present scenario cards, each describing a customization need. Students work in pairs to recommend an approach.', duration: '8 min', teacherNotes: 'Examples: Customer service bot (RAG), creative writing style (fine-tuning), one-time task (prompt engineering).' },
            { instruction: 'Groups share recommendations and reasoning. Discuss disagreements - often multiple approaches could work!', duration: '5 min' },
            { instruction: 'Key insight: "Start simple (prompt engineering), add complexity (RAG), resort to fine-tuning only when necessary."', duration: '2 min' }
          ],
          formativeAssessment: 'Students justify approach choices with relevant criteria.',
          differentiation: { support: 'Provide a decision flowchart to guide thinking.', extension: 'Create their own scenario cards for classmates.' }
        },
        {
          title: 'Planning Your Project',
          duration: '10 minutes',
          overview: 'Students begin thinking about what customization they want to build.',
          steps: [
            { instruction: 'Individual reflection: "What local/community knowledge would you want AI to have access to?"', duration: '3 min' },
            { instruction: 'Choose a preliminary project idea and which approach would work best.', duration: '4 min' },
            { instruction: 'Exit ticket: Share your project idea and approach choice in one sentence.', duration: '3 min' }
          ],
          formativeAssessment: 'Project ideas demonstrate understanding of approach capabilities.',
          differentiation: { support: 'Provide example project ideas to spark thinking.', extension: 'Plan how you\'d evaluate if the customization worked.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose project ideas based on interests', 'Multiple valid approaches accepted', 'Scenario cards allow exploration'],
          relevanceAndAuthenticity: ['Uses local knowledge gaps as motivation', 'Project ideas address real needs', 'Skills applicable to many domains'],
          selfRegulation: ['Comparison table supports systematic thinking', 'Exit ticket promotes commitment to a direction', 'Decision criteria guide choices']
        },
        representation: {
          multipleFormats: ['Video explanation', 'Diagrams of each approach', 'Hands-on demonstration'],
          vocabularySupport: ['RAG spelled out and explained', 'Analogies for each approach', 'Technical terms introduced with examples'],
          backgroundKnowledge: ['Builds on local AI from Project 2', 'No prior ML knowledge assumed', 'Concepts introduced from simple to complex']
        },
        actionExpression: {
          physicalOptions: ['Hands-on demonstration observation', 'Written or verbal scenario matching', 'Individual or paired work'],
          expressionOptions: ['Table, list, or verbal comparison', 'Written or verbal exit ticket', 'Diagram or text project plan'],
          executiveFunctionSupport: ['Comparison table organizes information', 'Decision flowchart available', 'Clear sequence from simple to complex']
        }
      }
    },
    {
      title: 'Prompt Engineering Deep Dive',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Write effective system prompts', 'Use few-shot examples', 'Test and iterate prompts'],
      conceptualUnderstanding: ['Prompts dramatically affect output', 'Examples teach the model patterns', 'Iteration improves results'],
      activities: ['Practice: Write system prompts', 'Experimentation: Few-shot learning', 'Testing: Prompt A/B testing'],
      materials: ['Prompt templates', 'Testing framework'],
      detailedActivities: [
        {
          title: 'The Power of System Prompts',
          duration: '15 minutes',
          overview: 'Students discover how dramatically system prompts change AI behavior.',
          videoResources: [
            { title: 'Prompt Engineering Guide', url: 'https://www.youtube.com/watch?v=_ZvnD96BPQo', duration: '15:23', description: 'Comprehensive guide to writing effective prompts' }
          ],
          steps: [
            { instruction: 'Demo: Ask the same question with no system prompt, then with "You are a helpful teacher who explains things simply," then with "You are a formal academic researcher."', duration: '5 min', teacherNotes: 'The difference should be dramatic and visible.' },
            { instruction: 'Discussion: "What changed? Why?" Lead students to understand that system prompts set context and tone.', duration: '3 min' },
            { instruction: 'Anatomy of a system prompt: Role, context, constraints, output format. Dissect the demo prompts.', duration: '5 min' },
            { instruction: 'Quick practice: Write a system prompt to make AI act as a sports commentator, then test it.', duration: '2 min' }
          ],
          formativeAssessment: 'Students create a system prompt that noticeably changes AI behavior.',
          differentiation: { support: 'Provide a system prompt template with blanks to fill in.', extension: 'Explore edge cases where system prompts fail or can be bypassed.' }
        },
        {
          title: 'Few-Shot Learning',
          duration: '20 minutes',
          overview: 'Students learn to teach AI new patterns by providing examples in the prompt.',
          steps: [
            { instruction: 'Explain few-shot learning: "Showing the AI examples of what you want, so it learns the pattern."', duration: '3 min', teacherNotes: 'Zero-shot = no examples. Few-shot = a few examples. Works surprisingly well.' },
            { instruction: 'Demo: Ask AI to convert dates to a specific format without examples (often fails), then with 2-3 examples (usually works).', duration: '5 min' },
            { instruction: 'Practice task: Students create few-shot prompts for a specific formatting task of their choice.', duration: '8 min', teacherNotes: 'Ideas: Convert text to bullet points, summarize in exactly 3 sentences, translate to emoji.' },
            { instruction: 'Share results: What patterns did the AI learn? What didn\'t work?', duration: '4 min' }
          ],
          formativeAssessment: 'Students successfully use few-shot examples to achieve a specific output format.',
          differentiation: { support: 'Provide pre-written examples for students to adapt.', extension: 'Experiment with how many examples are needed for reliable results.' }
        },
        {
          title: 'Prompt Testing and Iteration',
          duration: '20 minutes',
          overview: 'Students learn systematic approaches to improving prompts through testing.',
          steps: [
            { instruction: 'Introduce the concept: "Good prompts don\'t appear magically - they\'re refined through testing."', duration: '2 min' },
            { instruction: 'A/B testing demo: Same underlying task, two different prompts. Run each 3 times, compare results.', duration: '5 min', teacherNotes: 'AI outputs vary, so multiple runs reveal reliability.' },
            { instruction: 'Students choose a task and write two competing prompts. Test each multiple times, track results.', duration: '10 min' },
            { instruction: 'Discussion: What made the winning prompt better? Common patterns: specificity, examples, output format.', duration: '3 min' }
          ],
          formativeAssessment: 'Students identify what made one prompt perform better than another.',
          differentiation: { support: 'Provide a testing template with columns for prompt, results, rating.', extension: 'Create a prompt optimization rubric for future use.' }
        },
        {
          title: 'Community Prompt Challenge',
          duration: '5 minutes',
          overview: 'Students apply prompt engineering to their project idea from Lesson 1.',
          steps: [
            { instruction: 'Revisit your project idea. Write a system prompt that would help AI with your community knowledge task.', duration: '3 min' },
            { instruction: 'Exit ticket: Share your prompt and one thing you\'d test to improve it.', duration: '2 min' }
          ],
          formativeAssessment: 'Project-relevant system prompts show integration of lesson learning.',
          differentiation: { support: 'Provide prompt starters relevant to common project types.', extension: 'Write multiple prompt variations to test next session.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose their few-shot task', 'Freedom in A/B testing approach', 'Project-connected final activity'],
          relevanceAndAuthenticity: ['Prompt engineering is immediately useful', 'Skills transfer to any AI interaction', 'Community project connection'],
          selfRegulation: ['Testing promotes self-assessment', 'Iteration builds persistence', 'Exit ticket promotes reflection']
        },
        representation: {
          multipleFormats: ['Video introduction', 'Live demonstrations', 'Written prompt templates'],
          vocabularySupport: ['Few-shot defined with examples', 'Technical terms introduced in context', 'Analogies to teaching and learning'],
          backgroundKnowledge: ['Builds on Project 2 local AI skills', 'No programming needed', 'Concepts accessible through experimentation']
        },
        actionExpression: {
          physicalOptions: ['Typing prompts or dictating', 'Individual or paired work', 'Digital or paper tracking'],
          expressionOptions: ['Written or verbal prompt creation', 'Numerical or descriptive result tracking', 'Simple or detailed analysis'],
          executiveFunctionSupport: ['Prompt templates provide structure', 'Testing protocol is systematic', 'Clear activity sequence']
        }
      }
    },
    {
      title: 'Building a RAG System',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: ['Understand RAG architecture', 'Create document embeddings', 'Query relevant documents'],
      conceptualUnderstanding: ['RAG retrieves relevant context for each query', 'Embeddings capture semantic meaning', 'Retrieved context improves accuracy'],
      activities: ['Setup: Document embedding', 'Building: Simple RAG pipeline', 'Testing: Query with context'],
      materials: ['RAG toolkit', 'Sample documents'],
      detailedActivities: [
        {
          title: 'Understanding RAG Architecture',
          duration: '20 minutes',
          overview: 'Students learn how RAG systems work conceptually before building one.',
          videoResources: [
            { title: 'RAG Explained Simply', url: 'https://www.youtube.com/watch?v=T-D1OfcDW1M', duration: '8:15', description: 'Visual explanation of Retrieval-Augmented Generation' }
          ],
          steps: [
            { instruction: 'Draw the RAG pipeline on board: Documents → Embeddings → Vector Store → Query → Retrieve → Augment Prompt → Generate', duration: '5 min', teacherNotes: 'Use simple terms: "smart searching" for embeddings, "find similar" for retrieval.' },
            { instruction: 'Explain embeddings: "Converting text to numbers that capture meaning." Demo: "cat" and "kitten" are close, "cat" and "democracy" are far.', duration: '5 min' },
            { instruction: 'Why this works: "Instead of training the model on your data, you give it relevant information when it needs it."', duration: '4 min' },
            { instruction: 'Comparison to human research: "Like looking up sources before answering a question vs. just guessing from memory."', duration: '3 min' },
            { instruction: 'Check understanding: Have students explain RAG to a partner in their own words.', duration: '3 min' }
          ],
          formativeAssessment: 'Students can explain RAG pipeline in simple terms.',
          differentiation: { support: 'Provide a visual diagram handout to annotate.', extension: 'Research different embedding models and their trade-offs.' }
        },
        {
          title: 'Preparing Your Documents',
          duration: '15 minutes',
          overview: 'Students gather and prepare documents for their RAG system.',
          steps: [
            { instruction: 'Discuss: What documents would be useful for your project? Community info, school handbook, local history, etc.', duration: '3 min' },
            { instruction: 'Demonstrate document chunking: "Long documents are split into smaller pieces for better retrieval."', duration: '4 min', teacherNotes: 'Show that searching whole documents is less precise than searching chunks.' },
            { instruction: 'Students gather 3-5 documents relevant to their project idea. Can be text files, web pages (saved), or PDFs.', duration: '6 min', teacherNotes: 'Have sample documents ready for students who need them.' },
            { instruction: 'Organize documents in a folder structure ready for processing.', duration: '2 min' }
          ],
          formativeAssessment: 'Students have documents ready for embedding.',
          differentiation: { support: 'Provide pre-prepared document sets on various topics.', extension: 'Research optimal chunk sizes and overlap strategies.' }
        },
        {
          title: 'Building the RAG Pipeline',
          duration: '35 minutes',
          overview: 'Students use a simple RAG tool to embed documents and query them.',
          steps: [
            { instruction: 'Setup: Open Ollama with embedding support. Verify: ollama pull nomic-embed-text (or similar embedding model).', duration: '5 min', teacherNotes: 'Alternative: Use a simple Python script or a GUI tool like PrivateGPT or AnythingLLM.' },
            { instruction: 'Process documents: Run the embedding tool on your document folder. Watch as documents are converted to vectors.', duration: '10 min', teacherNotes: 'This may take a few minutes depending on document size.' },
            { instruction: 'First query: Ask a question that requires information from your documents. See the relevant chunks retrieved.', duration: '8 min' },
            { instruction: 'Analyze the response: Did it use the right context? Is the answer better than without RAG?', duration: '5 min' },
            { instruction: 'Iteration: Try queries that work well and queries that don\'t. Note patterns.', duration: '7 min' }
          ],
          formativeAssessment: 'Students successfully query their RAG system and get contextually-informed responses.',
          differentiation: { support: 'Provide step-by-step command reference and troubleshooting guide.', extension: 'Experiment with different chunk sizes or embedding models.' }
        },
        {
          title: 'Testing and Refinement',
          duration: '20 minutes',
          overview: 'Students systematically test their RAG system and identify improvements.',
          steps: [
            { instruction: 'Create test questions: Write 5 questions your RAG system should be able to answer from your documents.', duration: '5 min' },
            { instruction: 'Run tests: Ask each question, rate the answer quality (1-5), note what went right or wrong.', duration: '8 min' },
            { instruction: 'Identify patterns: What types of questions work well? What fails? Discuss as class.', duration: '5 min', teacherNotes: 'Common issues: documents missing info, chunks too large/small, wrong context retrieved.' },
            { instruction: 'Exit reflection: What would you improve about your RAG system? What documents would help?', duration: '2 min' }
          ],
          formativeAssessment: 'Students identify specific strengths and weaknesses of their RAG implementation.',
          differentiation: { support: 'Provide a test result tracking template.', extension: 'Research advanced RAG techniques like reranking or hybrid search.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose their own document topics', 'Test questions reflect personal interests', 'Iteration allows exploration'],
          relevanceAndAuthenticity: ['Documents address real community knowledge', 'RAG is used in production AI systems', 'Skills immediately applicable'],
          selfRegulation: ['Testing protocol promotes self-assessment', 'Rating scale provides feedback', 'Reflection identifies next steps']
        },
        representation: {
          multipleFormats: ['Video explanation', 'Visual pipeline diagram', 'Hands-on building'],
          vocabularySupport: ['Embeddings explained with analogy', 'RAG acronym unpacked', 'Technical terms introduced gradually'],
          backgroundKnowledge: ['Builds on prior lessons', 'No programming required with right tools', 'Concepts connected to everyday research']
        },
        actionExpression: {
          physicalOptions: ['Command line or GUI tools available', 'Individual or paired work', 'Written or verbal testing notes'],
          expressionOptions: ['Technical or non-technical documentation', 'Numerical or descriptive quality ratings', 'Written or verbal reflection'],
          executiveFunctionSupport: ['Step-by-step building guide', 'Test template structures evaluation', 'Clear activity sequence with checkpoints']
        }
      }
    },
    {
      title: 'Community Application Project',
      duration: '120+ minutes',
      gradeBand: '9-12',
      objectives: ['Identify community need', 'Implement customization', 'Test with real users', 'Document the solution'],
      conceptualUnderstanding: ['AI should serve real needs', 'User feedback improves systems', 'Documentation enables replication'],
      activities: ['Discovery: Community AI needs', 'Implementation: Build solution', 'Testing: User feedback', 'Documentation: Share learnings'],
      materials: ['Project planning template', 'User testing guide'],
      detailedActivities: [
        {
          title: 'Community Needs Discovery',
          duration: '25 minutes',
          overview: 'Students identify genuine community needs that customized AI could address.',
          steps: [
            { instruction: 'Brainstorm: What knowledge is specific to our community/school that AI doesn\'t know? What questions do people ask repeatedly?', duration: '8 min', teacherNotes: 'Ideas: school schedules, local history, community resources, club information.' },
            { instruction: 'Feasibility check: For each idea, ask "Could we actually get this information? Who would use this?"', duration: '7 min' },
            { instruction: 'Form project teams (2-3 students) around shared interests or complementary skills.', duration: '5 min' },
            { instruction: 'Each team creates a one-paragraph project proposal: What need? Who benefits? What approach?', duration: '5 min' }
          ],
          formativeAssessment: 'Project proposals identify real needs with feasible approaches.',
          differentiation: { support: 'Provide example projects from other communities.', extension: 'Conduct brief interviews with potential users to validate need.' }
        },
        {
          title: 'Implementation Planning and Building',
          duration: '50 minutes',
          overview: 'Teams plan and begin building their customized AI solution.',
          steps: [
            { instruction: 'Planning: Teams complete a project plan including: approach (prompt engineering, RAG, or hybrid), documents/data needed, timeline, success metrics.', duration: '12 min', teacherNotes: 'Provide planning template.' },
            { instruction: 'Document gathering: Teams collect necessary documents, write content, or identify information sources.', duration: '15 min', teacherNotes: 'This may extend outside class time.' },
            { instruction: 'Implementation: Using skills from Lessons 2 and 3, teams build their customization. System prompts, RAG setup, or both.', duration: '20 min', teacherNotes: 'Circulate to help teams troubleshoot.' },
            { instruction: 'Progress check: Teams demonstrate current state to another team for quick feedback.', duration: '3 min' }
          ],
          formativeAssessment: 'Teams have a working prototype or clear progress toward one.',
          differentiation: { support: 'Provide technical assistance and simpler project scopes.', extension: 'Add advanced features like conversation memory or multiple document sources.' }
        },
        {
          title: 'User Testing',
          duration: '25 minutes',
          overview: 'Teams get feedback from real users on their customized AI.',
          steps: [
            { instruction: 'Prepare: Create 3-5 test questions or scenarios for users to try.', duration: '5 min' },
            { instruction: 'Testing: Teams swap projects or recruit outside users. Watch silently as they interact, note confusion and successes.', duration: '12 min', teacherNotes: 'Emphasize: observe, don\'t help. Real users won\'t have you there.' },
            { instruction: 'Feedback collection: What worked? What confused users? What would they want improved?', duration: '5 min' },
            { instruction: 'Brief team debrief: Identify top 2-3 improvements based on feedback.', duration: '3 min' }
          ],
          formativeAssessment: 'Teams gather actionable feedback from real users.',
          differentiation: { support: 'Provide user testing script and feedback forms.', extension: 'Conduct A/B testing between prompt variations.' }
        },
        {
          title: 'Documentation and Presentation',
          duration: '20+ minutes',
          overview: 'Teams document their project for others to learn from and potentially replicate.',
          steps: [
            { instruction: 'Document: Teams create a brief write-up including: problem addressed, approach used, what worked, what didn\'t, lessons learned.', duration: '10 min' },
            { instruction: 'Presentations: Each team gives a 2-3 minute presentation showing their project and key learnings.', duration: 'Variable', teacherNotes: 'Adjust based on number of teams.' },
            { instruction: 'Class reflection: What patterns did we see across projects? What would we do differently?', duration: '5 min' },
            { instruction: 'Future planning: How could these projects continue? Who else might benefit?', duration: '5 min' }
          ],
          formativeAssessment: 'Documentation enables someone else to understand and potentially replicate the project.',
          differentiation: { support: 'Provide documentation template with specific prompts.', extension: 'Create a tutorial or video walkthrough of the project.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Teams choose their own project focus', 'Multiple valid approaches accepted', 'Creative freedom in implementation'],
          relevanceAndAuthenticity: ['Projects address real community needs', 'User testing with real people', 'Documentation creates lasting value'],
          selfRegulation: ['Project planning promotes organization', 'User feedback provides external perspective', 'Reflection promotes growth mindset']
        },
        representation: {
          multipleFormats: ['Written proposals', 'Working prototypes', 'Verbal presentations'],
          vocabularySupport: ['Templates guide documentation', 'Technical concepts reviewed as needed', 'Peer explanation builds understanding'],
          backgroundKnowledge: ['Synthesizes all prior lessons', 'Templates scaffold complex tasks', 'Examples from other communities provide models']
        },
        actionExpression: {
          physicalOptions: ['Various roles within teams', 'Building, testing, or documenting', 'Typed or handwritten documentation'],
          expressionOptions: ['Technical or non-technical documentation', 'Presentation or demo or write-up', 'Individual contributions within team'],
          executiveFunctionSupport: ['Project planning template', 'Timeline structure', 'Checkpoint progress reviews']
        }
      }
    }
  ],
  assessment: { formative: ['Prompt engineering results', 'RAG system functionality', 'Community needs analysis', 'Implementation progress'], summative: 'Complete a community AI project that customizes an AI model for a specific local need. Include needs assessment, implementation documentation, user testing results, and reflection on impact and limitations.' },
  extensions: ['Explore actual fine-tuning with LoRA', 'Build multi-modal applications', 'Create community AI guidelines'],
  realWorldConnections: ['Organizations customize AI for specific domains', 'Local knowledge improves AI usefulness', 'Community-driven AI development is growing']
};

const project4: Project = {
  id: 'project-4',
  title: 'Project 4: Building AI-Powered Tools',
  description: 'Create practical applications using local AI: document assistants, translation tools, educational aids, or community resources.',
  difficulty: 'Advanced',
  duration: '6-8 weeks',
  gradeBand: '9-12',
  overview: 'Students design and build practical applications powered by local AI. They learn to integrate AI into larger systems, create user interfaces, and deploy solutions that serve real needs while maintaining privacy.',
  learningObjectives: [
    'Design AI-powered applications',
    'Integrate AI with other software',
    'Create user interfaces for AI tools',
    'Handle errors and edge cases',
    'Deploy and maintain AI applications',
    'Evaluate real-world impact'
  ],
  prerequisites: ['Completed Projects 1-3', 'Basic programming (Python recommended)', 'Web basics helpful'],
  materials: {
    required: ['Computer with local AI setup', 'Python or similar programming language', 'Text editor or IDE'],
    optional: ['Web framework', 'Database for persistence']
  },
  lessons: [
    {
      title: 'Application Design',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Identify problems AI can solve', 'Design user experience', 'Plan technical architecture'],
      conceptualUnderstanding: ['Good AI apps solve real problems', 'UX matters as much as AI quality', 'Architecture enables scaling'],
      activities: ['Brainstorm: AI application ideas', 'Design: User flow and interface', 'Planning: Technical architecture'],
      materials: ['Design templates', 'Architecture patterns'],
      detailedActivities: [
        {
          title: 'Problem-First Design',
          duration: '15 minutes',
          overview: 'Students learn to start with real problems, not cool technology, when designing AI applications.',
          videoResources: [
            { title: 'Designing AI Products', url: 'https://www.youtube.com/watch?v=HcqpanDadyQ', duration: '12:34', description: 'UX principles for AI-powered applications' }
          ],
          steps: [
            { instruction: 'Opening question: "What problem do you want to solve?" NOT "What can I build with AI?" Discuss why this order matters.', duration: '3 min', teacherNotes: 'Technology-first thinking leads to solutions looking for problems.' },
            { instruction: 'Bad example analysis: Show an AI app that\'s technically impressive but doesn\'t solve a real problem. Discuss why it failed.', duration: '4 min' },
            { instruction: 'Good example analysis: Show a simple AI app that solves a genuine need. Discuss what makes it successful.', duration: '4 min' },
            { instruction: 'Individual brainstorm: List 3 real problems in your daily life, school, or community that AI might help with.', duration: '4 min' }
          ],
          formativeAssessment: 'Problem statements are specific and user-focused, not technology-focused.',
          differentiation: { support: 'Provide example problem categories: communication, organization, learning, accessibility.', extension: 'Interview a potential user to validate the problem exists.' }
        },
        {
          title: 'User Experience Design',
          duration: '20 minutes',
          overview: 'Students design how users will interact with their AI application.',
          steps: [
            { instruction: 'Choose one problem from your brainstorm. Define your user: Who are they? When would they use this? What do they need?', duration: '5 min' },
            { instruction: 'Sketch the user flow: Open app → [what happens] → User gets value. Keep it simple - 3-5 steps maximum.', duration: '8 min', teacherNotes: 'Paper sketches are fine. Focus on flow, not polish.' },
            { instruction: 'Identify AI\'s role: Where in the flow does AI help? What does AI do that couldn\'t be done without it?', duration: '4 min' },
            { instruction: 'Peer review: Share sketches with a partner. Can they understand the flow? What\'s confusing?', duration: '3 min' }
          ],
          formativeAssessment: 'User flows are clear and AI adds specific value at identifiable points.',
          differentiation: { support: 'Provide a user flow template with boxes to fill in.', extension: 'Design for multiple user types with different needs.' }
        },
        {
          title: 'Technical Architecture',
          duration: '20 minutes',
          overview: 'Students plan the technical components needed to build their application.',
          steps: [
            { instruction: 'Introduce the basic architecture: User Interface → Application Logic → AI Model. Draw on board.', duration: '4 min', teacherNotes: 'Keep it simple. Three boxes with arrows between them.' },
            { instruction: 'For your app, fill in each box: What UI (web, chat, voice)? What logic (prompting, RAG, processing)? What model (Ollama, API)?', duration: '8 min' },
            { instruction: 'Identify unknowns: What don\'t you know how to do? What will you need to learn or find help with?', duration: '4 min', teacherNotes: 'Honesty about unknowns is important for project planning.' },
            { instruction: 'Create a simple project plan: What will you build first? Second? Third?', duration: '4 min' }
          ],
          formativeAssessment: 'Architecture diagrams show understanding of component roles.',
          differentiation: { support: 'Provide architecture templates for common app types.', extension: 'Research additional components: database, authentication, deployment.' }
        },
        {
          title: 'Project Proposal',
          duration: '5 minutes',
          overview: 'Students finalize their project proposal for the remaining lessons.',
          steps: [
            { instruction: 'Complete the project proposal form: Problem, User, Solution, AI Role, Architecture, First Step.', duration: '4 min' },
            { instruction: 'Exit share: One sentence describing your app to the class.', duration: '1 min' }
          ],
          formativeAssessment: 'Proposals are specific, feasible, and user-focused.',
          differentiation: { support: 'One-on-one check-in to validate feasibility.', extension: 'Plan stretch goals beyond minimum viable product.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose their own project problems', 'Multiple valid architectural approaches', 'Personal relevance drives motivation'],
          relevanceAndAuthenticity: ['Problems come from real life', 'Design skills transfer to any project', 'Building something personally meaningful'],
          selfRegulation: ['Peer review provides external feedback', 'Unknown identification promotes self-awareness', 'Project planning builds organization']
        },
        representation: {
          multipleFormats: ['Video introduction', 'Visual sketching', 'Written proposals'],
          vocabularySupport: ['Architecture terms explained simply', 'UX terminology introduced with examples', 'Technical terms connected to concrete components'],
          backgroundKnowledge: ['Builds on all prior projects', 'No prior design experience assumed', 'Examples provide models to adapt']
        },
        actionExpression: {
          physicalOptions: ['Paper or digital sketching', 'Written or verbal proposals', 'Individual or collaborative design'],
          expressionOptions: ['Visual or text-based architecture', 'Simple or detailed user flows', 'Brief or comprehensive proposals'],
          executiveFunctionSupport: ['Structured design process', 'Templates for each deliverable', 'Clear sequence of activities']
        }
      }
    },
    {
      title: 'AI Integration Basics',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: ['Call AI models from code', 'Handle responses programmatically', 'Manage context and history'],
      conceptualUnderstanding: ['APIs enable AI integration', 'Response handling requires parsing', 'Context management affects quality'],
      activities: ['Coding: First AI API call', 'Practice: Response handling', 'Building: Conversation history'],
      materials: ['API documentation', 'Code examples'],
      detailedActivities: [
        {
          title: 'Understanding APIs',
          duration: '15 minutes',
          overview: 'Students learn what APIs are and how they enable AI integration.',
          videoResources: [
            { title: 'What is an API?', url: 'https://www.youtube.com/watch?v=s7wmiS2mSXY', duration: '6:12', description: 'Simple explanation of APIs for beginners' }
          ],
          steps: [
            { instruction: 'Explain APIs: "A way for programs to talk to each other. Like a waiter taking your order to the kitchen."', duration: '4 min', teacherNotes: 'Restaurant analogy works well. You don\'t go into the kitchen; the waiter (API) handles it.' },
            { instruction: 'Show the Ollama API: When you type "ollama run", there\'s an API behind it that your code can use directly.', duration: '4 min' },
            { instruction: 'Demo: Show a curl command calling the Ollama API. Explain each part: URL, method, data, response.', duration: '5 min', teacherNotes: 'curl http://localhost:11434/api/generate -d \'{"model": "llama3.2:3b", "prompt": "Hello"}\'' },
            { instruction: 'Check understanding: What does the API let us do that the terminal doesn\'t?', duration: '2 min', teacherNotes: 'Answer: automation, integration with other code, programmatic control.' }
          ],
          formativeAssessment: 'Students can explain what an API does in their own words.',
          differentiation: { support: 'Provide a visual diagram of the API request/response cycle.', extension: 'Research REST vs. GraphQL APIs.' }
        },
        {
          title: 'First API Call from Code',
          duration: '30 minutes',
          overview: 'Students write their first code that calls an AI model.',
          steps: [
            { instruction: 'Setup: Open Python (or JavaScript) environment. Verify Ollama is running.', duration: '5 min', teacherNotes: 'Students can use Replit, VS Code, or any Python environment. Jupyter notebooks work well.' },
            { instruction: 'Live coding: Write a simple Python script that calls the Ollama API and prints the response.', duration: '10 min', teacherNotes: 'Use requests library in Python. Show the code line by line.' },
            { instruction: 'Students follow along, typing the code themselves. Debug issues as a class.', duration: '10 min', teacherNotes: 'Common issues: Ollama not running, wrong port, JSON parsing.' },
            { instruction: 'Success check: Everyone should see AI output printed from their code.', duration: '5 min' }
          ],
          formativeAssessment: 'All students have working code that calls the AI and receives a response.',
          differentiation: { support: 'Provide complete code to copy if students get stuck. Focus on understanding, not typing speed.', extension: 'Add error handling for when Ollama isn\'t running.' }
        },
        {
          title: 'Handling Responses',
          duration: '25 minutes',
          overview: 'Students learn to parse and use AI responses in their applications.',
          steps: [
            { instruction: 'Examine the response: Print the full JSON response. Identify the fields: model, response, done, etc.', duration: '5 min' },
            { instruction: 'Extract the text: Show how to get just the response text from the JSON object.', duration: '5 min' },
            { instruction: 'Streaming responses: Explain that AI generates text word-by-word. Show how to handle streaming.', duration: '8 min', teacherNotes: 'Streaming is more complex but provides better UX. Can simplify by just waiting for complete response.' },
            { instruction: 'Practice: Modify code to ask a question and display a formatted response.', duration: '7 min' }
          ],
          formativeAssessment: 'Students can extract and format AI response text.',
          differentiation: { support: 'Stick to non-streaming responses for simplicity.', extension: 'Implement real-time streaming display.' }
        },
        {
          title: 'Building Conversation History',
          duration: '20 minutes',
          overview: 'Students implement conversation memory so AI remembers prior messages.',
          steps: [
            { instruction: 'Problem: Run your code twice with related questions. Notice AI doesn\'t remember the first question.', duration: '3 min', teacherNotes: 'This is surprising to students - AI has no built-in memory between calls.' },
            { instruction: 'Solution: Store messages in a list. Send all previous messages with each new request.', duration: '7 min', teacherNotes: 'Show the messages array format: [{"role": "user", "content": "..."}, {"role": "assistant", "content": "..."}]' },
            { instruction: 'Implement: Add conversation history to your code. Test that AI remembers context.', duration: '8 min' },
            { instruction: 'Exit reflection: Why is conversation history important for your project? How will you use it?', duration: '2 min' }
          ],
          formativeAssessment: 'Students have working conversation history implementation.',
          differentiation: { support: 'Provide the history management code to integrate.', extension: 'Add a way to clear or summarize history to manage context length.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students modify example code as they prefer', 'Test with questions of personal interest', 'Apply to their project context'],
          relevanceAndAuthenticity: ['Building blocks for real applications', 'Skills used by professional developers', 'Direct application to their project'],
          selfRegulation: ['Debug process promotes problem-solving', 'Success checks provide clear milestones', 'Exit reflection connects to personal goals']
        },
        representation: {
          multipleFormats: ['Video API explanation', 'Live coding demonstration', 'Written code examples'],
          vocabularySupport: ['API explained with analogy', 'JSON structure visualized', 'Programming terms defined in context'],
          backgroundKnowledge: ['Basic Python/JavaScript helpful but not required', 'Code provided to type along', 'Each concept builds on the previous']
        },
        actionExpression: {
          physicalOptions: ['Typing code or copying provided code', 'Solo or pair programming', 'Different IDE/environment options'],
          expressionOptions: ['Code comments or no comments', 'Variable names of choice', 'Testing with chosen questions'],
          executiveFunctionSupport: ['Step-by-step coding guidance', 'Clear checkpoints throughout', 'Debug help available']
        }
      }
    },
    {
      title: 'Building the Interface',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: ['Create user input handling', 'Display AI responses', 'Add loading states and error handling'],
      conceptualUnderstanding: ['Interfaces make AI accessible', 'Feedback improves user experience', 'Error handling prevents frustration'],
      activities: ['Building: Input interface', 'Integration: Display responses', 'Polish: Loading and errors'],
      materials: ['UI components', 'Error handling patterns'],
      detailedActivities: [
        {
          title: 'Choosing Your Interface',
          duration: '15 minutes',
          overview: 'Students select and set up the interface type for their application.',
          steps: [
            { instruction: 'Present options: Command line (simplest), Web interface (most flexible), Chat interface (familiar to users), Gradio (easiest for beginners).', duration: '5 min', teacherNotes: 'Gradio is excellent for beginners - Python-based, minimal code.' },
            { instruction: 'Demo each option briefly. Show what each looks like and complexity involved.', duration: '6 min' },
            { instruction: 'Students choose based on their project needs and comfort level.', duration: '2 min' },
            { instruction: 'Setup: Initialize the chosen interface framework.', duration: '2 min', teacherNotes: 'Gradio: pip install gradio. Web: basic HTML. CLI: already set up.' }
          ],
          formativeAssessment: 'Students choose appropriate interface for their project and skill level.',
          differentiation: { support: 'Recommend Gradio for those new to interfaces.', extension: 'Try a more complex framework like Streamlit or React.' }
        },
        {
          title: 'Input Handling',
          duration: '25 minutes',
          overview: 'Students build the user input component of their interface.',
          videoResources: [
            { title: 'Building AI Interfaces', url: 'https://www.youtube.com/watch?v=MgdmUD2AqjI', duration: '10:45', description: 'Creating user interfaces for AI applications' }
          ],
          steps: [
            { instruction: 'For Gradio: Create a text input and button. Show the minimal code needed.', duration: '8 min', teacherNotes: 'gr.Interface or gr.Blocks with gr.Textbox and gr.Button' },
            { instruction: 'Connect input to your AI function from Lesson 2.', duration: '8 min' },
            { instruction: 'Test: Submit a question and verify AI is called (even if display isn\'t working yet).', duration: '4 min' },
            { instruction: 'Refinement: Add placeholder text, labels, or input validation as appropriate for your app.', duration: '5 min' }
          ],
          formativeAssessment: 'Input successfully triggers AI call.',
          differentiation: { support: 'Provide complete input handling code to adapt.', extension: 'Add multiple input types (text, file upload, sliders).' }
        },
        {
          title: 'Displaying Responses',
          duration: '25 minutes',
          overview: 'Students build the output display for AI responses.',
          steps: [
            { instruction: 'Add output component: Text area, markdown display, or chat history as appropriate.', duration: '8 min' },
            { instruction: 'Connect AI response to display. Update output when response is received.', duration: '10 min' },
            { instruction: 'Test: Full flow from input to displayed output should work now.', duration: '4 min' },
            { instruction: 'Formatting: Add basic styling to make output readable (font size, spacing, etc.).', duration: '3 min' }
          ],
          formativeAssessment: 'AI responses display correctly in the interface.',
          differentiation: { support: 'Focus on basic text display, skip formatting.', extension: 'Add markdown rendering or syntax highlighting.' }
        },
        {
          title: 'Loading States and Error Handling',
          duration: '25 minutes',
          overview: 'Students add polish that makes the application feel professional and robust.',
          steps: [
            { instruction: 'Add loading indicator: Show "thinking..." or spinner while waiting for AI response.', duration: '7 min', teacherNotes: 'Users need feedback that something is happening during the AI wait time.' },
            { instruction: 'Add error handling: What if AI fails? Display a friendly error message instead of crashing.', duration: '8 min' },
            { instruction: 'Edge cases: What if user submits empty input? Too long input? Handle gracefully.', duration: '6 min' },
            { instruction: 'Test all states: Normal, loading, error, edge cases. Make sure each works.', duration: '4 min' }
          ],
          formativeAssessment: 'Application handles all states gracefully without crashing.',
          differentiation: { support: 'Focus on basic error handling only.', extension: 'Add retry logic, better error messages, or timeout handling.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose interface type', 'Styling decisions are personal', 'Error messages reflect their app personality'],
          relevanceAndAuthenticity: ['Building real, usable software', 'UX principles from professional development', 'Creating something they can show others'],
          selfRegulation: ['Testing promotes self-assessment', 'Error handling requires anticipating problems', 'Polish reflects pride in work']
        },
        representation: {
          multipleFormats: ['Video demonstrations', 'Live coding', 'Written code examples'],
          vocabularySupport: ['Interface terms defined with examples', 'Code patterns named and explained', 'Error handling concepts introduced'],
          backgroundKnowledge: ['Builds on Lesson 2 code', 'Framework basics taught as needed', 'No prior UI experience assumed']
        },
        actionExpression: {
          physicalOptions: ['Different framework options', 'Typing or adapting code', 'Solo or pair work'],
          expressionOptions: ['Simple or complex interfaces', 'Minimal or polished styling', 'Basic or advanced error handling'],
          executiveFunctionSupport: ['Step-by-step building process', 'Clear test points throughout', 'Modular code structure']
        }
      }
    },
    {
      title: 'Testing and Deployment',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Test AI application thoroughly', 'Handle edge cases', 'Deploy for others to use'],
      conceptualUnderstanding: ['Testing reveals problems', 'Edge cases require planning', 'Deployment enables impact'],
      activities: ['Testing: Comprehensive test plan', 'Fixing: Edge case handling', 'Deployment: Share application'],
      materials: ['Test plan template', 'Deployment guide'],
      detailedActivities: [
        {
          title: 'Creating a Test Plan',
          duration: '15 minutes',
          overview: 'Students learn systematic testing approaches for AI applications.',
          steps: [
            { instruction: 'Introduce testing categories: Happy path (normal use), Edge cases (unusual input), Error cases (things that should fail).', duration: '4 min' },
            { instruction: 'Students create a test plan for their app. List 3 happy path tests, 3 edge cases, 3 error cases.', duration: '8 min', teacherNotes: 'Provide examples: empty input, very long input, special characters, AI failure.' },
            { instruction: 'Share test plans in pairs. Did your partner think of edge cases you missed?', duration: '3 min' }
          ],
          formativeAssessment: 'Test plans cover multiple categories with specific test cases.',
          differentiation: { support: 'Provide test case templates for common app types.', extension: 'Research automated testing approaches.' }
        },
        {
          title: 'Running Tests and Fixing Issues',
          duration: '25 minutes',
          overview: 'Students execute their test plan and fix discovered issues.',
          steps: [
            { instruction: 'Execute each test case. Record results: Pass, Fail, or Unexpected behavior.', duration: '10 min' },
            { instruction: 'Prioritize issues: What\'s critical (app crashes)? Important (bad UX)? Nice to fix (minor)?', duration: '3 min' },
            { instruction: 'Fix critical issues. Most common: missing error handling, unhandled input types.', duration: '10 min', teacherNotes: 'Circulate to help students debug.' },
            { instruction: 'Re-test fixed issues. Verify fixes work without breaking other things.', duration: '2 min' }
          ],
          formativeAssessment: 'Critical issues identified and fixed.',
          differentiation: { support: 'Pair stronger and weaker programmers for debugging.', extension: 'Fix all issues, including minor ones.' }
        },
        {
          title: 'Deployment Options',
          duration: '20 minutes',
          overview: 'Students make their application accessible to others.',
          steps: [
            { instruction: 'Present deployment options: Share code (GitHub), Host locally (show on your computer), Cloud deploy (Gradio sharing, Replit).', duration: '5 min', teacherNotes: 'Gradio has built-in sharing that creates temporary public URLs.' },
            { instruction: 'For Gradio: Enable sharing with share=True. Get a public URL others can access.', duration: '8 min', teacherNotes: 'Alternative: Deploy to Hugging Face Spaces, Replit, or Streamlit Cloud.' },
            { instruction: 'Test deployment: Access your app from another device or have a neighbor try it.', duration: '5 min' },
            { instruction: 'Document: Create simple instructions for others to use your app.', duration: '2 min' }
          ],
          formativeAssessment: 'Application is accessible by someone other than the creator.',
          differentiation: { support: 'Focus on demo-able local deployment.', extension: 'Set up persistent cloud hosting.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students create their own test cases', 'Prioritize which fixes to tackle', 'Choose deployment method'],
          relevanceAndAuthenticity: ['Testing is professional software practice', 'Deployment makes work shareable', 'Creating something others can use'],
          selfRegulation: ['Testing reveals blind spots', 'Prioritization requires judgment', 'Deployment is a milestone']
        },
        representation: {
          multipleFormats: ['Written test plans', 'Interactive testing', 'Deployment documentation'],
          vocabularySupport: ['Testing terms defined with examples', 'Deployment options explained simply', 'Common issues named and explained'],
          backgroundKnowledge: ['Builds on completed application', 'No prior testing knowledge assumed', 'Deployment concepts introduced from simple to complex']
        },
        actionExpression: {
          physicalOptions: ['Written or verbal test plans', 'Solo or paired testing', 'Various deployment options'],
          expressionOptions: ['Brief or detailed test documentation', 'Minimal or comprehensive fixes', 'Simple or advanced deployment'],
          executiveFunctionSupport: ['Test plan template', 'Prioritization framework', 'Step-by-step deployment guide']
        }
      }
    },
    {
      title: 'Evaluation and Iteration',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Gather user feedback', 'Measure impact', 'Plan improvements'],
      conceptualUnderstanding: ['Real use reveals issues', 'Feedback drives improvement', 'Iteration improves quality'],
      activities: ['Collection: User feedback', 'Analysis: Usage patterns', 'Planning: Next version'],
      materials: ['Feedback forms', 'Analytics tools'],
      detailedActivities: [
        {
          title: 'Gathering User Feedback',
          duration: '20 minutes',
          overview: 'Students collect feedback from real users of their application.',
          steps: [
            { instruction: 'Recruit 2-3 users: classmates, teachers, family members who weren\'t involved in building.', duration: '3 min' },
            { instruction: 'User testing: Watch them use your app (silently). Note: Where do they hesitate? What confuses them? What delights them?', duration: '10 min', teacherNotes: 'Resist the urge to help. Real users won\'t have you there.' },
            { instruction: 'Post-use interview: What did you like? What was frustrating? What would you want added?', duration: '5 min' },
            { instruction: 'Document key feedback points.', duration: '2 min' }
          ],
          formativeAssessment: 'Students gather specific, actionable feedback from real users.',
          differentiation: { support: 'Provide feedback interview questions.', extension: 'Create a structured survey for quantitative feedback.' }
        },
        {
          title: 'Analyzing Results',
          duration: '15 minutes',
          overview: 'Students synthesize feedback and identify patterns.',
          steps: [
            { instruction: 'Group feedback: What themes emerged? Multiple users with the same issue = high priority.', duration: '5 min' },
            { instruction: 'Categorize: UX issues, AI quality issues, missing features, good things to keep.', duration: '5 min' },
            { instruction: 'Compare to goals: Does your app solve the original problem? What evidence supports this?', duration: '5 min' }
          ],
          formativeAssessment: 'Students identify patterns and prioritize issues from feedback.',
          differentiation: { support: 'Provide a feedback analysis template.', extension: 'Create a formal user research report.' }
        },
        {
          title: 'Planning Version 2',
          duration: '15 minutes',
          overview: 'Students create an improvement plan based on feedback.',
          steps: [
            { instruction: 'Prioritize improvements: What would have the biggest impact? What\'s feasible to build?', duration: '5 min' },
            { instruction: 'Create a "Version 2" feature list: Must have, Should have, Nice to have.', duration: '6 min' },
            { instruction: 'Reality check: Given your time and skills, what could you actually build?', duration: '4 min' }
          ],
          formativeAssessment: 'Improvement plans are realistic and user-driven.',
          differentiation: { support: 'Focus on 1-2 key improvements.', extension: 'Create a full product roadmap with multiple versions.' }
        },
        {
          title: 'Project Reflection and Showcase',
          duration: '10 minutes',
          overview: 'Students reflect on the full project experience and share their work.',
          steps: [
            { instruction: 'Personal reflection: What did you learn? What are you proud of? What would you do differently?', duration: '4 min' },
            { instruction: 'Quick showcase: Each student gives a 30-second demo of their app.', duration: 'Variable', teacherNotes: 'Adjust based on class size.' },
            { instruction: 'Celebrate: Building an AI application from scratch is a significant accomplishment!', duration: '2 min' }
          ],
          formativeAssessment: 'Reflections demonstrate learning and growth.',
          differentiation: { support: 'Written reflection instead of verbal.', extension: 'Create a portfolio piece documenting the project.' }
        }
      ],
      udl: {
        engagement: {
          choiceAndAutonomy: ['Students choose feedback participants', 'Prioritization reflects personal judgment', 'Showcase format is flexible'],
          relevanceAndAuthenticity: ['Real user feedback is meaningful', 'Iteration reflects professional practice', 'Accomplishment is worth celebrating'],
          selfRegulation: ['Feedback provides external perspective', 'Reflection promotes metacognition', 'Planning requires self-awareness']
        },
        representation: {
          multipleFormats: ['Verbal and written feedback', 'Categorization structures', 'Visual showcase'],
          vocabularySupport: ['User research terms introduced', 'Prioritization framework explained', 'Iteration concept defined'],
          backgroundKnowledge: ['Applies all prior lessons', 'No formal research experience assumed', 'Simple methods for meaningful results']
        },
        actionExpression: {
          physicalOptions: ['Verbal or written feedback collection', 'Solo or paired analysis', 'Demo or poster showcase'],
          expressionOptions: ['Brief or detailed reflection', 'Simple or comprehensive v2 plan', 'Minimal or elaborate showcase'],
          executiveFunctionSupport: ['Feedback collection protocol', 'Analysis template', 'Prioritization framework']
        }
      }
    }
  ],
  assessment: { formative: ['Design documents', 'Working integration', 'Interface functionality', 'Test results'], summative: 'Build and deploy a complete AI-powered application that serves a real need. Include design documentation, working code, user testing results, and reflection on the development process and impact.' },
  extensions: ['Add advanced features', 'Scale for more users', 'Open source your application'],
  realWorldConnections: ['AI applications are everywhere', 'Building AI tools is a valuable skill', 'Local AI apps protect privacy']
};

const projects: Project[] = [project1, project2, project3, project4];

// Main Page Component
export default function AILLMPage() {
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
          <Link href={`/${locale}/tech-sovereignty`} className="inline-flex items-center text-sm text-zinc-500 hover:text-orange-400 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to All Tracks
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-orange-600 to-orange-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <span className="text-orange-200/80 text-sm font-medium">Track C</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">AI/LLM Independence</h1>
          <p className="text-xl text-white/90 max-w-3xl">Run powerful AI models on your own hardware—no cloud required, no data leaving your community. Understand how AI works and use it on your own terms.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <CorePrinciple />
        <div className="space-y-6">{projects.map((project) => (<ProjectSection key={project.id} project={project} isExpanded={expandedProject === project.id} onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)} />))}</div>
      </div>

      <div className="bg-zinc-950 border-t border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between">
          <Link href={`/${locale}/tech-sovereignty/self-hosted`} className="text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Previous: Self-Hosted
          </Link>
          <Link href={`/${locale}/tech-sovereignty/app-dev`} className="text-zinc-500 hover:text-orange-400 transition-colors flex items-center gap-1">
            Next: App Development
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
