'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-zinc-800 border border-rose-500/30 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-white mb-2">Core Pedagogical Principle: Technology Serves Community</h3>
        <p className="text-zinc-300 mb-3">
          Technology is only meaningful when it <strong className="text-white">strengthens communities</strong>. Students learn to assess community needs,
          build <strong className="text-white">inclusive tech programs</strong>, create <strong className="text-white">support networks</strong>, and develop
          governance models that ensure technology serves everyone—not just the technically savvy.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-rose-300 mb-1">Assess Needs</h4>
            <p className="text-sm text-zinc-500">Understand what your community actually needs—not what tech companies want to sell.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-rose-300 mb-1">Include Everyone</h4>
            <p className="text-sm text-zinc-500">Build programs that reach all community members regardless of age, ability, or background.</p>
          </div>
          <div className="bg-zinc-950 rounded-lg p-4 border border-zinc-700">
            <h4 className="font-semibold text-rose-300 mb-1">Sustain Together</h4>
            <p className="text-sm text-zinc-500">Create governance structures that keep technology accountable to community needs.</p>
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
  differentiation?: {
    support: string;
    extension: string;
  };
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

// UDL Section Component
const UDLSection = ({ udl }: { udl: UDLFramework }) => {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div className="bg-zinc-950 border border-rose-500/30 rounded-lg overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-rose-300">Universal Design for Learning (UDL) Supports</span>
        </div>
        <svg className={`w-5 h-5 text-zinc-500 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="p-4 border-t border-zinc-700 grid md:grid-cols-3 gap-4">
          <div><h5 className="font-medium text-rose-300 mb-2">Engagement</h5><ul className="list-disc list-inside text-sm text-zinc-400">{udl.engagement.choiceAndAutonomy.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
          <div><h5 className="font-medium text-rose-300 mb-2">Representation</h5><ul className="list-disc list-inside text-sm text-zinc-400">{udl.representation.multipleFormats.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
          <div><h5 className="font-medium text-rose-300 mb-2">Action & Expression</h5><ul className="list-disc list-inside text-sm text-zinc-400">{udl.actionExpression.expressionOptions.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
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
      <button onClick={() => setExpanded(!expanded)} className="w-full p-3 flex items-center justify-between text-left hover:bg-zinc-800 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-rose-500/20 rounded-full flex items-center justify-center text-rose-400 text-xs font-bold">{index + 1}</div>
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
                    <div className="flex items-center justify-between"><span className="text-xs text-red-300 font-medium">{video.title}</span><span className="text-xs text-zinc-500">{video.duration}</span></div>
                    <p className="text-xs text-zinc-500 mt-1">{video.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
          <div className="space-y-2">
            <h6 className="text-xs font-semibold text-rose-300">Step-by-Step Instructions</h6>
            {activity.steps.map((step, i) => (
              <div key={i} className="bg-zinc-900 rounded p-2">
                <div className="flex items-start gap-2">
                  <span className="text-xs text-rose-400 font-bold">{i + 1}.</span>
                  <div className="flex-1">
                    <p className="text-xs text-zinc-300">{step.instruction}</p>
                    {step.duration && <span className="text-xs text-zinc-500">({step.duration})</span>}
                    {step.teacherNotes && <p className="text-xs text-rose-400 mt-1 italic">💡 {step.teacherNotes}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {activity.formativeAssessment && (
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-3">
              <h6 className="text-xs font-semibold text-rose-300 mb-1">Check for Understanding</h6>
              <p className="text-xs text-rose-300">{activity.formativeAssessment}</p>
            </div>
          )}
          {activity.differentiation && (
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-orange-300 mb-1">Support</h6>
                <p className="text-xs text-orange-300">{activity.differentiation.support}</p>
              </div>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
                <h6 className="text-xs font-semibold text-purple-300 mb-1">Extension</h6>
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
      <button onClick={() => setExpanded(!expanded)} className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-700 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-rose-500/20 rounded-lg flex items-center justify-center text-rose-400 font-bold text-sm">{index + 1}</div>
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
          <div><h5 className="font-medium text-rose-300 mb-2">Learning Objectives</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}</ul></div>
          <div><h5 className="font-medium text-rose-300 mb-2">Conceptual Understanding</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.conceptualUnderstanding.map((item, i) => <li key={i}>{item}</li>)}</ul></div>
          {lesson.detailedActivities && lesson.detailedActivities.length > 0 ? (
            <div>
              <h5 className="font-medium text-rose-300 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                Detailed Activities
              </h5>
              <div className="space-y-3">{lesson.detailedActivities.map((activity, i) => <DetailedActivityCard key={i} activity={activity} index={i} />)}</div>
            </div>
          ) : (
            <div><h5 className="font-medium text-rose-300 mb-2">Activities</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.activities.map((activity, i) => <li key={i}>{activity}</li>)}</ul></div>
          )}
          <div><h5 className="font-medium text-rose-300 mb-2">Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{lesson.materials.map((material, i) => <li key={i}>{material}</li>)}</ul></div>
          {lesson.udl && <UDLSection udl={lesson.udl} />}
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
        <div><h4 className="font-semibold text-white mb-3">Learning Objectives</h4><ul className="grid md:grid-cols-2 gap-2">{project.learningObjectives.map((obj, i) => (<li key={i} className="flex items-start gap-2 text-sm text-zinc-400"><svg className="w-4 h-4 text-rose-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>{obj}</li>))}</ul></div>
        {project.prerequisites.length > 0 && <div><h4 className="font-semibold text-white mb-3">Prerequisites</h4><ul className="flex flex-wrap gap-2">{project.prerequisites.map((prereq, i) => <li key={i} className="text-xs px-3 py-1 bg-zinc-700 text-zinc-300 rounded-full">{prereq}</li>)}</ul></div>}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-zinc-950 rounded-lg p-4"><h5 className="font-medium text-rose-300 mb-2">Required Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.materials.required.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
          <div className="bg-zinc-950 rounded-lg p-4"><h5 className="font-medium text-rose-300 mb-2">Optional Materials</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.materials.optional.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
        </div>
        <div><h4 className="font-semibold text-white mb-3">Lessons</h4><div className="space-y-3">{project.lessons.map((lesson, i) => <LessonCard key={i} lesson={lesson} index={i} />)}</div></div>
        <div className="bg-zinc-950 rounded-lg p-4"><h4 className="font-semibold text-white mb-3">Assessment</h4><div className="grid md:grid-cols-2 gap-4"><div><h5 className="font-medium text-rose-300 mb-2">Formative Assessment</h5><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.assessment.formative.map((a, i) => <li key={i}>{a}</li>)}</ul></div><div><h5 className="font-medium text-rose-300 mb-2">Summative Assessment</h5><p className="text-sm text-zinc-400">{project.assessment.summative}</p></div></div></div>
        <div><h4 className="font-semibold text-white mb-3">Real-World Connections</h4><ul className="list-disc list-inside text-sm text-zinc-400 space-y-1">{project.realWorldConnections.map((conn, i) => <li key={i}>{conn}</li>)}</ul></div>
      </div>
    )}
  </div>
);

// Project Data
const project1: Project = {
  id: 'project-1',
  title: 'Project 1: Community Technology Assessment',
  description: 'Learn to assess your community\'s technology needs, existing resources, and gaps. Build a comprehensive picture of where technology can help.',
  difficulty: 'Beginner',
  duration: '3-4 weeks',
  gradeBand: '6-12',
  overview: 'Students learn to conduct community needs assessments—identifying what technology resources exist, what gaps need filling, and what the community actually wants. This foundation ensures all future tech initiatives serve real needs rather than assumed ones.',
  learningObjectives: [
    'Design and conduct community surveys and interviews',
    'Map existing technology resources and infrastructure',
    'Identify digital divide gaps in the community',
    'Analyze data to prioritize community needs',
    'Present findings to community stakeholders',
    'Understand asset-based community development'
  ],
  prerequisites: ['Basic computer skills'],
  materials: {
    required: ['Survey tools (paper or digital)', 'Interview recording equipment', 'Mapping materials', 'Data analysis tools'],
    optional: ['Community meeting space', 'Translation services', 'Transportation for site visits']
  },
  lessons: [
    {
      title: 'Introduction to Community Assessment',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Understand why assessment matters', 'Learn asset-based approaches', 'Identify stakeholder groups'],
      conceptualUnderstanding: ['Communities have existing strengths to build on', 'Needs assessment prevents wasted resources', 'Diverse voices must be included'],
      activities: ['Discussion: What do we think our community needs?', 'Mapping: Identify community stakeholders', 'Planning: Assessment approach'],
      detailedActivities: [
        {
          title: 'Opening Discussion: Community Needs',
          duration: '15 minutes',
          overview: 'Students explore preconceptions about community technology needs before learning systematic assessment.',
          steps: [
            { instruction: 'Ask: "What technology does our community need?" Collect initial ideas.', duration: '3 min' },
            { instruction: 'Challenge: "How do we actually know this? Who told us? Did we ask everyone?"', duration: '3 min', teacherNotes: 'This reveals assumptions students may have.' },
            { instruction: 'Introduce asset-based assessment: Start with what community has, not what it lacks.', duration: '5 min' },
            { instruction: 'Discuss: Why do many tech projects fail? (Often: they solved wrong problem)', duration: '4 min' },
          ],
          formativeAssessment: 'Can students articulate why assessment before action matters?',
          differentiation: { support: 'Provide examples of failed tech projects.', extension: 'Research a failed community tech project.' },
        },
        {
          title: 'Stakeholder Mapping',
          duration: '20 minutes',
          overview: 'Students create a map of community stakeholders who should be part of technology decisions.',
          videoResources: [
            { title: 'Stakeholder Mapping Guide', url: 'https://www.youtube.com/watch?v=v7dJj8qVtEw', duration: '5 min', description: 'How to identify and map stakeholders' },
          ],
          steps: [
            { instruction: 'Introduce stakeholder categories: users, decision-makers, affected parties, resources.', duration: '3 min' },
            { instruction: 'Brainstorm stakeholders in our community. Write each on a sticky note.', duration: '5 min' },
            { instruction: 'Arrange on power/interest grid: who has power? who is affected?', duration: '7 min' },
            { instruction: 'Discuss: Who is missing? Whose voice is often left out?', duration: '5 min', teacherNotes: 'Highlight marginalized voices.' },
          ],
          formativeAssessment: 'Did students identify diverse stakeholder groups including marginalized voices?',
          differentiation: { support: 'Pre-fill some common stakeholders.', extension: 'Create stakeholder interview questions.' },
        },
        {
          title: 'Assessment Planning',
          duration: '15 minutes',
          overview: 'Students begin planning how they will conduct a community technology assessment.',
          steps: [
            { instruction: 'Preview assessment methods: surveys, interviews, observation, focus groups.', duration: '3 min' },
            { instruction: 'Groups choose a community context for their assessment project.', duration: '4 min' },
            { instruction: 'Begin drafting: What do we want to learn? From whom?', duration: '5 min' },
            { instruction: 'Exit ticket: One thing you want to learn about community tech needs.', duration: '3 min' },
          ],
          formativeAssessment: 'Do students have a focused question for their assessment?',
          differentiation: { support: 'Provide question starters.', extension: 'Draft multiple assessment questions.' },
        },
      ],
      materials: ['Stakeholder mapping template', 'Community asset inventory']
    },
    {
      title: 'Survey Design and Implementation',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Design effective survey questions', 'Plan survey distribution', 'Address accessibility'],
      conceptualUnderstanding: ['Good questions yield useful data', 'Surveys must reach diverse populations', 'Accessibility ensures inclusion'],
      activities: ['Workshop: Write survey questions', 'Review: Peer feedback on surveys', 'Planning: Distribution strategy'],
      detailedActivities: [
        {
          title: 'Survey Question Workshop',
          duration: '25 minutes',
          overview: 'Students learn principles of effective survey design and practice writing unbiased, clear questions.',
          videoResources: [
            { title: 'Survey Question Design Basics', url: 'https://www.youtube.com/watch?v=sLxoLT3ORGU', duration: '6 min', description: 'How to write clear, unbiased survey questions' },
          ],
          steps: [
            { instruction: 'Present "bad" survey question examples. Students identify problems.', duration: '5 min', teacherNotes: 'Use leading questions, double-barrels, and jargon as examples.' },
            { instruction: 'Introduce 5 principles: Clear, Specific, Unbiased, One topic, Answerable.', duration: '5 min' },
            { instruction: 'Students draft 5 questions for their community assessment topic.', duration: '10 min' },
            { instruction: 'Pair share: Exchange questions with partner, identify any issues.', duration: '5 min' },
          ],
          formativeAssessment: 'Do student questions follow the 5 principles?',
          differentiation: { support: 'Provide question templates and sentence starters.', extension: 'Design different question types: Likert, multiple choice, open-ended.' },
        },
        {
          title: 'Accessibility and Inclusion Review',
          duration: '15 minutes',
          overview: 'Students audit their surveys for accessibility and cultural responsiveness.',
          steps: [
            { instruction: 'Introduce accessibility considerations: reading level, language, format options.', duration: '3 min' },
            { instruction: 'Use readability checker tool on draft questions. Aim for 6th grade level.', duration: '4 min' },
            { instruction: 'Discuss: Who might be excluded by our current survey? How do we fix this?', duration: '4 min', teacherNotes: 'Consider: non-English speakers, people with disabilities, elderly, youth.' },
            { instruction: 'Revise surveys to address accessibility gaps.', duration: '4 min' },
          ],
          formativeAssessment: 'Did students identify and address at least one accessibility barrier?',
          differentiation: { support: 'Provide accessibility checklist.', extension: 'Create surveys in multiple languages or formats.' },
        },
        {
          title: 'Distribution Strategy Planning',
          duration: '20 minutes',
          overview: 'Students plan how to distribute surveys to reach diverse community members.',
          steps: [
            { instruction: 'Review stakeholder map from Lesson 1. Who needs to receive surveys?', duration: '3 min' },
            { instruction: 'Brainstorm distribution channels: online, paper, in-person, phone.', duration: '5 min' },
            { instruction: 'Match channels to stakeholder groups. Where do they already go?', duration: '5 min', teacherNotes: 'Libraries, community centers, churches, schools, grocery stores.' },
            { instruction: 'Create distribution plan with timeline and responsibilities.', duration: '5 min' },
            { instruction: 'Exit ticket: How will you reach the hardest-to-reach group?', duration: '2 min' },
          ],
          formativeAssessment: 'Does the plan include strategies for reaching marginalized groups?',
          differentiation: { support: 'Pre-identify community distribution points.', extension: 'Calculate sample size needed for valid results.' },
        },
      ],
      materials: ['Survey design guide', 'Accessibility checklist']
    },
    {
      title: 'Interview and Focus Group Skills',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Conduct effective interviews', 'Facilitate focus groups', 'Record and document findings'],
      conceptualUnderstanding: ['Interviews reveal deeper insights', 'Focus groups surface group dynamics', 'Good documentation preserves data'],
      activities: ['Practice: Interview role-play', 'Simulation: Mini focus group', 'Documentation: Note-taking practice'],
      detailedActivities: [
        {
          title: 'Interview Fundamentals and Role-Play',
          duration: '25 minutes',
          overview: 'Students learn interviewing techniques and practice through structured role-play exercises.',
          videoResources: [
            { title: 'Conducting Community Interviews', url: 'https://www.youtube.com/watch?v=9t-_hYjAKww', duration: '7 min', description: 'Best practices for community-based interviewing' },
          ],
          steps: [
            { instruction: 'Discuss: Why interviews over surveys? (Depth, follow-up, relationship building)', duration: '3 min' },
            { instruction: 'Introduce interview principles: Open questions, active listening, neutral probes.', duration: '5 min' },
            { instruction: 'Model: Teacher demonstrates interview with volunteer student.', duration: '5 min', teacherNotes: 'Intentionally make some mistakes to discuss.' },
            { instruction: 'Pairs practice: One interviews, one plays community member role. Switch.', duration: '10 min' },
            { instruction: 'Debrief: What worked? What was hard?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students ask follow-up questions based on responses?',
          differentiation: { support: 'Provide interview question cards.', extension: 'Interview someone outside the classroom.' },
        },
        {
          title: 'Focus Group Simulation',
          duration: '20 minutes',
          overview: 'Students experience and facilitate a mini focus group to understand group dynamics.',
          steps: [
            { instruction: 'Introduce focus groups: What they are, when to use them, roles needed.', duration: '3 min' },
            { instruction: 'Assign roles: 1 facilitator, 1 note-taker, 4-6 participants per group.', duration: '2 min' },
            { instruction: 'Run mini focus group: "What technology do students need at school?"', duration: '10 min', teacherNotes: 'Rotate facilitator role if time permits.' },
            { instruction: 'Discuss group dynamics: Who talked most? Who stayed quiet? How to balance?', duration: '5 min' },
          ],
          formativeAssessment: 'Did facilitator ensure all participants contributed?',
          differentiation: { support: 'Provide facilitation script.', extension: 'Design focus group for specific community audience.' },
        },
        {
          title: 'Documentation Practice',
          duration: '15 minutes',
          overview: 'Students learn techniques for capturing interview and focus group data accurately.',
          steps: [
            { instruction: 'Discuss documentation options: Notes, audio, video, transcription.', duration: '3 min' },
            { instruction: 'Practice: Watch short video clip, take notes using template.', duration: '5 min' },
            { instruction: 'Compare notes: What did others capture that you missed?', duration: '4 min', teacherNotes: 'Emphasize that multiple note-takers improve accuracy.' },
            { instruction: 'Discuss consent and privacy when recording community members.', duration: '3 min' },
          ],
          formativeAssessment: 'Did students capture key themes and quotes accurately?',
          differentiation: { support: 'Provide structured note-taking template.', extension: 'Practice transcription from audio recording.' },
        },
      ],
      materials: ['Interview guide template', 'Focus group facilitation guide']
    },
    {
      title: 'Data Analysis and Presentation',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Analyze qualitative and quantitative data', 'Identify patterns and priorities', 'Create compelling presentations'],
      conceptualUnderstanding: ['Data tells stories about community needs', 'Patterns reveal priorities', 'Presentations drive action'],
      activities: ['Analysis: Code interview data', 'Synthesis: Identify key themes', 'Creation: Build presentation'],
      detailedActivities: [
        {
          title: 'Qualitative Data Coding',
          duration: '20 minutes',
          overview: 'Students learn to code interview and focus group data to identify themes and patterns.',
          videoResources: [
            { title: 'Coding Qualitative Data', url: 'https://www.youtube.com/watch?v=lYzhgMZii3o', duration: '8 min', description: 'Introduction to thematic coding for beginners' },
          ],
          steps: [
            { instruction: 'Introduce coding: Reading data line-by-line and labeling themes.', duration: '3 min' },
            { instruction: 'Model: Code a sample interview excerpt together as a class.', duration: '5 min', teacherNotes: 'Use highlighters or colored sticky notes.' },
            { instruction: 'Students practice coding their own interview or focus group data.', duration: '10 min' },
            { instruction: 'Share codes: What themes are emerging? Any surprising findings?', duration: '2 min' },
          ],
          formativeAssessment: 'Can students identify at least 3 distinct themes in their data?',
          differentiation: { support: 'Provide pre-defined code categories.', extension: 'Create coding hierarchy with sub-themes.' },
        },
        {
          title: 'Quantitative Analysis and Synthesis',
          duration: '20 minutes',
          overview: 'Students analyze survey data and synthesize findings across all data sources.',
          steps: [
            { instruction: 'Calculate basic statistics from survey data: percentages, averages, modes.', duration: '5 min' },
            { instruction: 'Create simple visualizations: bar charts, pie charts for key findings.', duration: '7 min' },
            { instruction: 'Synthesis: What do surveys and interviews tell us together?', duration: '5 min', teacherNotes: 'Look for places where data sources agree or conflict.' },
            { instruction: 'Prioritize: Which needs are most urgent? Most impactful? Most feasible?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain what their data reveals about community needs?',
          differentiation: { support: 'Use spreadsheet templates with formulas.', extension: 'Calculate statistical significance or correlations.' },
        },
        {
          title: 'Presentation Creation',
          duration: '20 minutes',
          overview: 'Students create compelling presentations of findings for community stakeholders.',
          steps: [
            { instruction: 'Discuss: Who is your audience? What do they need to know? What action do you want?', duration: '3 min' },
            { instruction: 'Outline presentation: Problem, Methods, Findings, Recommendations, Next Steps.', duration: '5 min' },
            { instruction: 'Create slides or visual materials. Focus on clarity and impact.', duration: '10 min', teacherNotes: 'Remind: Less text, more visuals. One idea per slide.' },
            { instruction: 'Exit ticket: What is the single most important finding to communicate?', duration: '2 min' },
          ],
          formativeAssessment: 'Does the presentation clearly communicate actionable recommendations?',
          differentiation: { support: 'Provide presentation template.', extension: 'Create multiple versions for different audiences.' },
        },
      ],
      materials: ['Data analysis template', 'Presentation tools']
    }
  ],
  assessment: { formative: ['Survey quality review', 'Interview practice evaluation', 'Data analysis exercises', 'Peer feedback'], summative: 'Conduct a community technology assessment including surveys, interviews, and data analysis. Present findings and recommendations to community stakeholders or class.' },
  extensions: ['Compare assessments across communities', 'Create ongoing assessment tools', 'Develop community dashboard'],
  realWorldConnections: ['Nonprofits use assessments for grant applications', 'Cities conduct assessments for planning', 'Assessment skills transfer to many careers']
};

const project2: Project = {
  id: 'project-2',
  title: 'Project 2: Digital Inclusion Programs',
  description: 'Design and implement programs that bring technology access and skills to underserved community members—bridging the digital divide.',
  difficulty: 'Intermediate',
  duration: '4-5 weeks',
  gradeBand: '6-12',
  overview: 'Students design and pilot digital inclusion programs that address gaps identified in the community assessment. They learn to create accessible, culturally responsive programs that meet people where they are.',
  learningObjectives: [
    'Design accessible technology training programs',
    'Create culturally responsive curriculum',
    'Address barriers to technology adoption',
    'Implement pilot programs',
    'Evaluate program effectiveness',
    'Build sustainable program models'
  ],
  prerequisites: ['Completed Project 1 or equivalent community assessment'],
  materials: {
    required: ['Training curriculum materials', 'Access to technology for training', 'Evaluation tools', 'Meeting space'],
    optional: ['Translation services', 'Childcare for participants', 'Transportation assistance']
  },
  lessons: [
    {
      title: 'Understanding Digital Inclusion',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Define digital inclusion beyond access', 'Identify barriers to adoption', 'Learn from successful programs'],
      conceptualUnderstanding: ['Digital inclusion requires access, skills, and support', 'Barriers are often non-technical', 'Successful programs meet people where they are'],
      activities: ['Research: Digital inclusion case studies', 'Analysis: Barrier identification', 'Discussion: What works and why'],
      detailedActivities: [
        {
          title: 'The Three Pillars of Digital Inclusion',
          duration: '15 minutes',
          overview: 'Students explore digital inclusion as more than just device access—understanding skills, support, and relevance.',
          videoResources: [
            { title: 'What is Digital Inclusion?', url: 'https://www.youtube.com/watch?v=qXJ9VxOTNcs', duration: '5 min', description: 'Overview of the digital divide and inclusion framework' },
          ],
          steps: [
            { instruction: 'Present scenario: "A senior receives a free tablet. Is digital inclusion achieved?"', duration: '2 min' },
            { instruction: 'Discuss: What else does the senior need to actually use the tablet?', duration: '3 min', teacherNotes: 'Guide toward: skills training, ongoing support, relevant content.' },
            { instruction: 'Introduce 3 pillars: Access + Skills + Support = Digital Inclusion.', duration: '5 min' },
            { instruction: 'Add 4th element: Relevance—technology must matter to the person.', duration: '3 min' },
            { instruction: 'Quick check: Examples of inclusion programs that missed one pillar.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students explain why access alone is insufficient?',
          differentiation: { support: 'Provide pillar diagram visual.', extension: 'Research programs that address all 4 elements.' },
        },
        {
          title: 'Barrier Analysis Activity',
          duration: '20 minutes',
          overview: 'Students analyze real barriers to technology adoption in different community groups.',
          steps: [
            { instruction: 'Assign groups different community personas: elderly, immigrant family, person with disability, low-income family.', duration: '2 min' },
            { instruction: 'Groups brainstorm: What barriers does this person face in using technology?', duration: '8 min', teacherNotes: 'Push beyond "no computer"—cost, language, fear, relevance.' },
            { instruction: 'Categories: Technical barriers vs. non-technical barriers (cost, trust, relevance, skills, time).', duration: '4 min' },
            { instruction: 'Groups present: What surprised you about the barriers this group faces?', duration: '6 min' },
          ],
          formativeAssessment: 'Did students identify non-technical barriers alongside technical ones?',
          differentiation: { support: 'Provide barrier category cards.', extension: 'Interview a real community member about their barriers.' },
        },
        {
          title: 'Case Study Discussion',
          duration: '15 minutes',
          overview: 'Students examine successful digital inclusion programs and identify success factors.',
          steps: [
            { instruction: 'Present 2-3 brief case studies of successful programs.', duration: '5 min' },
            { instruction: 'Think-pair-share: What made these programs work? What would fail in our context?', duration: '5 min' },
            { instruction: 'Create class list: Success factors for digital inclusion programs.', duration: '3 min' },
            { instruction: 'Exit ticket: One barrier from your community that a program should address.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students articulate specific success factors?',
          differentiation: { support: 'Provide case study summary sheets.', extension: 'Research additional programs independently.' },
        },
      ],
      materials: ['Case study collection', 'Barrier analysis framework']
    },
    {
      title: 'Designing Accessible Programs',
      duration: '60 minutes',
      gradeBand: '6-12',
      objectives: ['Apply universal design principles', 'Create multilingual materials', 'Address diverse learning needs'],
      conceptualUnderstanding: ['Universal design benefits everyone', 'Language access is essential', 'Multiple learning modalities increase success'],
      activities: ['Design: Program structure', 'Creation: Accessible materials', 'Review: Accessibility audit'],
      detailedActivities: [
        {
          title: 'Universal Design Principles',
          duration: '20 minutes',
          overview: 'Students learn universal design principles and apply them to technology training program design.',
          videoResources: [
            { title: 'Universal Design for Learning', url: 'https://www.youtube.com/watch?v=bDvKnY0g6e4', duration: '6 min', description: 'Introduction to UDL principles in educational settings' },
          ],
          steps: [
            { instruction: 'Show examples of universal design in everyday life (curb cuts, automatic doors).', duration: '3 min', teacherNotes: 'Curb cuts help wheelchairs, strollers, delivery carts—everyone benefits.' },
            { instruction: 'Introduce 7 principles of universal design. Students identify examples.', duration: '6 min' },
            { instruction: 'Apply to technology training: How do these principles change how we design programs?', duration: '6 min' },
            { instruction: 'Groups draft program structure using at least 3 universal design principles.', duration: '5 min' },
          ],
          formativeAssessment: 'Can students apply universal design principles to program design?',
          differentiation: { support: 'Provide principle cards with examples.', extension: 'Research how major tech companies apply universal design.' },
        },
        {
          title: 'Creating Multilingual and Multimodal Materials',
          duration: '20 minutes',
          overview: 'Students create training materials accessible to diverse language and learning preferences.',
          steps: [
            { instruction: 'Discuss language access: What languages are spoken in our community?', duration: '3 min' },
            { instruction: 'Explore material formats: Written, visual, video, audio, hands-on.', duration: '4 min' },
            { instruction: 'Practice: Create same instruction in 3 different formats.', duration: '8 min', teacherNotes: 'Example: "How to connect to WiFi" as text, diagram, and verbal.' },
            { instruction: 'Discuss: How do we handle translation? Professional vs. community translators.', duration: '5 min' },
          ],
          formativeAssessment: 'Did students create materials in multiple formats effectively?',
          differentiation: { support: 'Provide templates for each format.', extension: 'Create materials in another language students speak.' },
        },
        {
          title: 'Accessibility Audit',
          duration: '20 minutes',
          overview: 'Students audit sample program materials for accessibility and propose improvements.',
          steps: [
            { instruction: 'Distribute accessibility checklist and sample training materials.', duration: '2 min' },
            { instruction: 'Groups audit materials: What accessibility barriers exist?', duration: '8 min' },
            { instruction: 'Identify top 3 accessibility issues and propose fixes.', duration: '5 min' },
            { instruction: 'Share findings: What common issues did we find across materials?', duration: '3 min' },
            { instruction: 'Exit ticket: One accessibility improvement you will make to your own materials.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students identify accessibility barriers and propose solutions?',
          differentiation: { support: 'Provide annotated example of an accessibility audit.', extension: 'Use screen reader to test digital materials.' },
        },
      ],
      materials: ['Universal design guide', 'Accessibility checklist']
    },
    {
      title: 'Cultural Responsiveness',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Understand cultural factors in technology adoption', 'Design culturally responsive curriculum', 'Build trust with communities'],
      conceptualUnderstanding: ['Culture shapes technology use', 'Trust must be earned over time', 'Community partners are essential'],
      activities: ['Discussion: Cultural considerations', 'Design: Culturally responsive elements', 'Planning: Community partnerships'],
      detailedActivities: [
        {
          title: 'Culture and Technology Use',
          duration: '15 minutes',
          overview: 'Students explore how cultural factors influence technology adoption and use patterns.',
          steps: [
            { instruction: 'Share examples: How do different cultures use technology differently?', duration: '3 min', teacherNotes: 'Communication styles, privacy expectations, generational differences.' },
            { instruction: 'Discuss: What assumptions might we make that do not hold across cultures?', duration: '5 min' },
            { instruction: 'Introduce cultural humility: We are always learning, never experts on others\' cultures.', duration: '4 min' },
            { instruction: 'Reflection: What cultural groups exist in our community? What do we know/not know?', duration: '3 min' },
          ],
          formativeAssessment: 'Can students identify cultural factors that affect technology use?',
          differentiation: { support: 'Provide cultural factor examples.', extension: 'Research technology use patterns in specific cultural communities.' },
        },
        {
          title: 'Designing Culturally Responsive Programs',
          duration: '20 minutes',
          overview: 'Students adapt program designs to be culturally responsive for specific community groups.',
          videoResources: [
            { title: 'Culturally Responsive Teaching', url: 'https://www.youtube.com/watch?v=nhaedWvvQUs', duration: '5 min', description: 'Principles of culturally responsive practice' },
          ],
          steps: [
            { instruction: 'Present culturally responsive design principles: relevance, representation, respect, relationship.', duration: '4 min' },
            { instruction: 'Groups choose a cultural community and review their program design.', duration: '3 min' },
            { instruction: 'Adapt: What changes would make this program more culturally responsive?', duration: '8 min' },
            { instruction: 'Share adaptations: What did each group change and why?', duration: '5 min' },
          ],
          formativeAssessment: 'Did groups make meaningful cultural adaptations?',
          differentiation: { support: 'Provide adaptation prompt questions.', extension: 'Consult with community member about cultural appropriateness.' },
        },
        {
          title: 'Building Community Partnerships',
          duration: '15 minutes',
          overview: 'Students plan how to build authentic partnerships with community organizations.',
          steps: [
            { instruction: 'Discuss: Why are community partners essential for culturally responsive programs?', duration: '3 min' },
            { instruction: 'Map potential partners: Cultural organizations, faith communities, community centers.', duration: '5 min' },
            { instruction: 'Draft outreach plan: How do we approach partners respectfully?', duration: '4 min', teacherNotes: 'Emphasize listening, not just asking for access.' },
            { instruction: 'Exit ticket: One partnership you will pursue and your first step.', duration: '3 min' },
          ],
          formativeAssessment: 'Do students have a realistic partnership outreach plan?',
          differentiation: { support: 'Provide sample outreach script.', extension: 'Make initial contact with potential partner.' },
        },
      ],
      materials: ['Cultural responsiveness framework', 'Partnership guide']
    },
    {
      title: 'Pilot Implementation',
      duration: '90+ minutes',
      gradeBand: '6-12',
      objectives: ['Implement pilot program', 'Gather participant feedback', 'Iterate based on learning'],
      conceptualUnderstanding: ['Pilots reveal what works in practice', 'Feedback drives improvement', 'Iteration is part of the process'],
      activities: ['Implementation: Run pilot session', 'Feedback: Gather participant input', 'Reflection: Document learnings'],
      detailedActivities: [
        {
          title: 'Pre-Pilot Preparation',
          duration: '15 minutes',
          overview: 'Students finalize logistics and prepare mentally for running their first pilot session.',
          steps: [
            { instruction: 'Review pilot checklist: Materials ready? Space set up? Participants confirmed?', duration: '5 min' },
            { instruction: 'Assign roles: Who leads? Who takes notes? Who handles tech support?', duration: '3 min' },
            { instruction: 'Anticipate challenges: What might go wrong? How will we adapt?', duration: '4 min', teacherNotes: 'No internet, participant arrives late, technology fails.' },
            { instruction: 'Reminder: Pilots are for learning, not perfection. Embrace mistakes.', duration: '3 min' },
          ],
          formativeAssessment: 'Is the group prepared to handle unexpected situations?',
          differentiation: { support: 'Provide detailed pilot checklist.', extension: 'Create contingency plans for each potential issue.' },
        },
        {
          title: 'Running the Pilot Session',
          duration: '45-60 minutes',
          overview: 'Students implement their digital inclusion program with real participants.',
          videoResources: [
            { title: 'Facilitating Adult Learning', url: 'https://www.youtube.com/watch?v=JW5JT0qc_7Y', duration: '7 min', description: 'Tips for teaching adult learners effectively' },
          ],
          steps: [
            { instruction: 'Welcome participants. Build rapport before diving into content.', duration: '5 min' },
            { instruction: 'Deliver program content according to plan. Adapt as needed.', duration: '30-40 min', teacherNotes: 'Remind students: slow down, check for understanding, be patient.' },
            { instruction: 'Designated observer takes notes on what works, what does not, participant reactions.', duration: 'Ongoing' },
            { instruction: 'Close with appreciation and brief verbal feedback.', duration: '5-10 min' },
          ],
          formativeAssessment: 'Did the session achieve its learning objectives for participants?',
          differentiation: { support: 'Teacher provides more hands-on facilitation support.', extension: 'Student leads session with minimal support.' },
        },
        {
          title: 'Feedback Collection and Reflection',
          duration: '20-30 minutes',
          overview: 'Students gather formal feedback and reflect on what they learned from the pilot.',
          steps: [
            { instruction: 'Distribute feedback forms to participants. Offer verbal option for non-writers.', duration: '5 min' },
            { instruction: 'Team debrief: What worked well? What would we change immediately?', duration: '8 min' },
            { instruction: 'Review observer notes: What patterns do we see in participant engagement?', duration: '5 min' },
            { instruction: 'Document: Write down 3 specific changes for next iteration.', duration: '5 min' },
            { instruction: 'Celebrate: Acknowledge what went well and the courage to try.', duration: '2 min' },
          ],
          formativeAssessment: 'Did students identify specific, actionable improvements?',
          differentiation: { support: 'Provide structured debrief questions.', extension: 'Analyze feedback data quantitatively.' },
        },
      ],
      materials: ['Pilot program materials', 'Feedback tools']
    },
    {
      title: 'Evaluation and Sustainability',
      duration: '50 minutes',
      gradeBand: '6-12',
      objectives: ['Evaluate program outcomes', 'Plan for sustainability', 'Document for replication'],
      conceptualUnderstanding: ['Evaluation proves impact', 'Sustainability requires planning', 'Documentation enables scaling'],
      activities: ['Evaluation: Assess outcomes', 'Planning: Sustainability model', 'Documentation: Program guide'],
      detailedActivities: [
        {
          title: 'Outcome Evaluation',
          duration: '20 minutes',
          overview: 'Students evaluate their pilot program outcomes using data collected during implementation.',
          steps: [
            { instruction: 'Review evaluation questions: What did we want to achieve? Did we achieve it?', duration: '3 min' },
            { instruction: 'Analyze feedback data: Calculate satisfaction scores, identify themes in comments.', duration: '8 min' },
            { instruction: 'Compare to objectives: How well did outcomes match our intended goals?', duration: '4 min' },
            { instruction: 'Identify successes and areas for improvement. Be honest about both.', duration: '5 min' },
          ],
          formativeAssessment: 'Can students honestly assess both successes and shortcomings?',
          differentiation: { support: 'Provide evaluation question prompts.', extension: 'Calculate effect size or statistical significance.' },
        },
        {
          title: 'Sustainability Planning',
          duration: '15 minutes',
          overview: 'Students create plans to sustain their program beyond the initial pilot.',
          videoResources: [
            { title: 'Program Sustainability Basics', url: 'https://www.youtube.com/watch?v=3xKZ8KQH0BA', duration: '5 min', description: 'Key elements of sustainable community programs' },
          ],
          steps: [
            { instruction: 'Identify sustainability factors: Resources, people, partners, funding needed.', duration: '4 min' },
            { instruction: 'Map current vs. needed resources: What gap exists?', duration: '4 min' },
            { instruction: 'Brainstorm sustainability strategies: Volunteers, grants, partnerships, fee structures.', duration: '4 min' },
            { instruction: 'Draft sustainability plan with specific action items.', duration: '3 min' },
          ],
          formativeAssessment: 'Does the sustainability plan address key resource needs?',
          differentiation: { support: 'Provide sustainability planning template.', extension: 'Research grant opportunities for the program.' },
        },
        {
          title: 'Documentation for Replication',
          duration: '15 minutes',
          overview: 'Students create documentation that would allow others to replicate their program.',
          steps: [
            { instruction: 'Discuss: Why document? (Scaling, handoff, improvement over time)', duration: '2 min' },
            { instruction: 'Identify documentation components: Overview, materials, procedures, lessons learned.', duration: '3 min' },
            { instruction: 'Begin drafting program guide. Focus on what someone new would need to know.', duration: '7 min', teacherNotes: 'Remind: Write for someone who was not there.' },
            { instruction: 'Exit ticket: One thing you learned that you want to remember for future programs.', duration: '3 min' },
          ],
          formativeAssessment: 'Could someone unfamiliar with the program replicate it from the documentation?',
          differentiation: { support: 'Provide documentation outline template.', extension: 'Create video documentation of key procedures.' },
        },
      ],
      materials: ['Evaluation framework', 'Sustainability planning template']
    }
  ],
  assessment: { formative: ['Program design review', 'Materials accessibility audit', 'Pilot observation', 'Participant feedback analysis'], summative: 'Design and pilot a digital inclusion program addressing a specific community need. Include program design, materials, pilot results, and sustainability plan.' },
  extensions: ['Scale program to more participants', 'Train community members as facilitators', 'Develop online/hybrid versions'],
  realWorldConnections: ['Libraries run digital literacy programs', 'Community centers offer tech training', 'Digital navigators help people access services']
};

const project3: Project = {
  id: 'project-3',
  title: 'Project 3: Community Tech Support Networks',
  description: 'Build peer-to-peer technology support systems—training community members to help each other with tech problems.',
  difficulty: 'Intermediate',
  duration: '4-5 weeks',
  gradeBand: '9-12',
  overview: 'Students create sustainable tech support networks by training community members to help each other. They learn to design support systems, create training materials, and build networks that outlast any individual effort.',
  learningObjectives: [
    'Design peer support models',
    'Create technical troubleshooting guides',
    'Train community tech helpers',
    'Build referral networks',
    'Establish communication systems',
    'Plan for network sustainability'
  ],
  prerequisites: ['Basic technical troubleshooting skills', 'Communication skills'],
  materials: {
    required: ['Training materials', 'Troubleshooting guides', 'Communication tools', 'Tracking system'],
    optional: ['Meeting space', 'Stipends for tech helpers', 'Equipment for repairs']
  },
  lessons: [
    {
      title: 'Peer Support Models',
      duration: '50 minutes',
      gradeBand: '9-12',
      objectives: ['Understand peer support approaches', 'Identify model components', 'Plan network structure'],
      conceptualUnderstanding: ['Peer support scales community capacity', 'Structure enables sustainability', 'Different models suit different contexts'],
      activities: ['Research: Peer support models', 'Analysis: What works in our context', 'Design: Network structure'],
      detailedActivities: [
        {
          title: 'Exploring Peer Support Models',
          duration: '15 minutes',
          overview: 'Students research different peer support models used in community technology programs.',
          videoResources: [
            { title: 'Digital Navigator Programs', url: 'https://www.youtube.com/watch?v=WlrHQ3YJbhk', duration: '6 min', description: 'How libraries train community members as digital navigators' },
          ],
          steps: [
            { instruction: 'Present 3 peer support models: Digital Navigators, Tech Help Desk, Repair Cafe.', duration: '5 min' },
            { instruction: 'Groups research one model: How does it work? Who are the helpers? How are they trained?', duration: '7 min' },
            { instruction: 'Quick share: Each group presents their model in 1 minute.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students explain the key components of their assigned model?',
          differentiation: { support: 'Provide model summary sheets.', extension: 'Research additional peer support models.' },
        },
        {
          title: 'Analyzing Context Fit',
          duration: '20 minutes',
          overview: 'Students analyze which peer support model best fits their community context.',
          steps: [
            { instruction: 'Review community assessment data: What tech support needs exist?', duration: '4 min' },
            { instruction: 'Create comparison matrix: Models vs. community needs, resources, culture.', duration: '8 min', teacherNotes: 'Consider: volunteer availability, space, expertise needed.' },
            { instruction: 'Discuss: Which model fits best? Could we combine elements from multiple models?', duration: '5 min' },
            { instruction: 'Groups make initial model selection with justification.', duration: '3 min' },
          ],
          formativeAssessment: 'Is the model selection well-justified based on community context?',
          differentiation: { support: 'Provide comparison matrix template.', extension: 'Interview community member about support needs.' },
        },
        {
          title: 'Network Structure Design',
          duration: '15 minutes',
          overview: 'Students begin designing the structure of their tech support network.',
          steps: [
            { instruction: 'Identify key roles: Coordinators, helpers, specialists, referral contacts.', duration: '3 min' },
            { instruction: 'Draft organizational structure: Who reports to whom? How are decisions made?', duration: '6 min' },
            { instruction: 'Map initial network: Who do we know who could fill these roles?', duration: '4 min' },
            { instruction: 'Exit ticket: One person you will invite to join the network and why.', duration: '2 min' },
          ],
          formativeAssessment: 'Does the network structure include clear roles and decision-making processes?',
          differentiation: { support: 'Provide role description templates.', extension: 'Design governance structure for the network.' },
        },
      ],
      materials: ['Model comparison guide', 'Network design template']
    },
    {
      title: 'Creating Support Resources',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Develop troubleshooting guides', 'Create FAQ documents', 'Build resource directories'],
      conceptualUnderstanding: ['Good resources enable self-service', 'Clear language improves accessibility', 'Resources reduce repeat questions'],
      activities: ['Creation: Troubleshooting flowcharts', 'Writing: FAQ documents', 'Compilation: Resource directory'],
      detailedActivities: [
        {
          title: 'Troubleshooting Flowchart Creation',
          duration: '25 minutes',
          overview: 'Students create visual troubleshooting guides for common tech problems.',
          videoResources: [
            { title: 'Creating Troubleshooting Flowcharts', url: 'https://www.youtube.com/watch?v=qVLv_oKf6RU', duration: '5 min', description: 'How to design effective decision trees for tech support' },
          ],
          steps: [
            { instruction: 'Brainstorm: What are the most common tech problems in our community?', duration: '4 min' },
            { instruction: 'Select top 3 problems for flowchart creation.', duration: '2 min' },
            { instruction: 'Model: Walk through creating a flowchart for "WiFi not working."', duration: '5 min', teacherNotes: 'Show decision points: Is router on? Are other devices connecting?' },
            { instruction: 'Groups create troubleshooting flowcharts for assigned problems.', duration: '10 min' },
            { instruction: 'Peer review: Does the flowchart cover the most common scenarios?', duration: '4 min' },
          ],
          formativeAssessment: 'Are flowcharts logical and accessible to non-technical users?',
          differentiation: { support: 'Provide flowchart templates.', extension: 'Create flowcharts for advanced problems.' },
        },
        {
          title: 'FAQ Document Development',
          duration: '20 minutes',
          overview: 'Students write clear, jargon-free FAQ documents for community tech support.',
          steps: [
            { instruction: 'Review: What makes a good FAQ? (Clear language, anticipates follow-ups)', duration: '3 min' },
            { instruction: 'Brainstorm questions community members frequently ask.', duration: '5 min' },
            { instruction: 'Write FAQ entries: Question + clear answer + where to get more help.', duration: '8 min', teacherNotes: 'Test: Can a non-technical person understand this?' },
            { instruction: 'Peer review for jargon and clarity. Revise as needed.', duration: '4 min' },
          ],
          formativeAssessment: 'Are FAQ entries understandable by non-technical community members?',
          differentiation: { support: 'Provide FAQ entry template.', extension: 'Create multilingual FAQ versions.' },
        },
        {
          title: 'Resource Directory Compilation',
          duration: '15 minutes',
          overview: 'Students compile directories of local tech support resources for referrals.',
          steps: [
            { instruction: 'Identify resource categories: Free WiFi, computer access, classes, repair, etc.', duration: '3 min' },
            { instruction: 'Research local resources: Where can community members get help we cannot provide?', duration: '7 min' },
            { instruction: 'Create directory format: Name, location, hours, what they offer, cost.', duration: '3 min' },
            { instruction: 'Exit ticket: One resource you discovered that you will recommend to community members.', duration: '2 min' },
          ],
          formativeAssessment: 'Does the directory include diverse resources for different needs?',
          differentiation: { support: 'Provide starter list of resources.', extension: 'Verify resources by calling or visiting.' },
        },
      ],
      materials: ['Guide templates', 'FAQ framework']
    },
    {
      title: 'Training Tech Helpers',
      duration: '90 minutes',
      gradeBand: '9-12',
      objectives: ['Design training curriculum', 'Deliver training sessions', 'Assess helper readiness'],
      conceptualUnderstanding: ['Training multiplies impact', 'Practice builds confidence', 'Ongoing support sustains helpers'],
      activities: ['Design: Training curriculum', 'Delivery: Training session', 'Assessment: Readiness check'],
      detailedActivities: [
        {
          title: 'Training Curriculum Design',
          duration: '30 minutes',
          overview: 'Students design a training curriculum to prepare community members as tech helpers.',
          videoResources: [
            { title: 'Train the Trainer Basics', url: 'https://www.youtube.com/watch?v=sWbUDq4S6Y8', duration: '8 min', description: 'Principles for training adult volunteers effectively' },
          ],
          steps: [
            { instruction: 'Identify skills tech helpers need: Technical skills, soft skills, boundaries.', duration: '5 min' },
            { instruction: 'Prioritize: What must they know on day one vs. learn over time?', duration: '5 min' },
            { instruction: 'Design curriculum outline: Sessions, topics, activities, assessments.', duration: '12 min', teacherNotes: 'Include: Communication skills, knowing limits, when to refer.' },
            { instruction: 'Create one training activity in detail.', duration: '8 min' },
          ],
          formativeAssessment: 'Does the curriculum address both technical and interpersonal skills?',
          differentiation: { support: 'Provide curriculum outline template.', extension: 'Create complete training materials for one session.' },
        },
        {
          title: 'Training Delivery Practice',
          duration: '40 minutes',
          overview: 'Students practice delivering training to prepare for training actual community helpers.',
          steps: [
            { instruction: 'Review effective training techniques: Modeling, practice, feedback.', duration: '5 min' },
            { instruction: 'Groups prepare to deliver one training segment (10-15 min each).', duration: '10 min' },
            { instruction: 'Deliver training segments. Rest of class plays trainees.', duration: '20 min', teacherNotes: 'Rotate so everyone practices delivering.' },
            { instruction: 'Debrief: What worked well? What would you change?', duration: '5 min' },
          ],
          formativeAssessment: 'Can students effectively communicate technical concepts to non-experts?',
          differentiation: { support: 'Provide training script template.', extension: 'Deliver training to actual community volunteers.' },
        },
        {
          title: 'Readiness Assessment Design',
          duration: '20 minutes',
          overview: 'Students create assessments to ensure helpers are ready before working with community members.',
          steps: [
            { instruction: 'Discuss: What does "ready" mean? What should helpers demonstrate?', duration: '4 min' },
            { instruction: 'Design assessment criteria: Knowledge, skills, attitudes, boundaries.', duration: '6 min' },
            { instruction: 'Create assessment method: Role-play scenario, written test, observation.', duration: '6 min' },
            { instruction: 'Exit ticket: How will you support helpers who are not yet ready?', duration: '4 min' },
          ],
          formativeAssessment: 'Does the assessment measure readiness for real-world support situations?',
          differentiation: { support: 'Provide assessment rubric template.', extension: 'Create multiple assessment scenarios.' },
        },
      ],
      materials: ['Training curriculum', 'Assessment tools']
    },
    {
      title: 'Network Operations',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Establish communication systems', 'Create referral processes', 'Build tracking mechanisms'],
      conceptualUnderstanding: ['Communication enables coordination', 'Referrals connect to expertise', 'Tracking shows impact'],
      activities: ['Setup: Communication channels', 'Design: Referral process', 'Implementation: Tracking system'],
      detailedActivities: [
        {
          title: 'Communication System Setup',
          duration: '20 minutes',
          overview: 'Students establish communication channels for coordinating tech support network operations.',
          steps: [
            { instruction: 'Identify communication needs: Urgent requests, scheduling, knowledge sharing.', duration: '3 min' },
            { instruction: 'Compare tools: Group chat, email list, shared calendar, messaging apps.', duration: '5 min', teacherNotes: 'Consider: What tools will helpers already know how to use?' },
            { instruction: 'Select and set up primary communication channels.', duration: '8 min' },
            { instruction: 'Create communication norms: Response times, appropriate use, escalation.', duration: '4 min' },
          ],
          formativeAssessment: 'Are communication channels accessible to all network participants?',
          differentiation: { support: 'Provide tool comparison chart.', extension: 'Create communication protocol document.' },
        },
        {
          title: 'Referral Process Design',
          duration: '20 minutes',
          overview: 'Students create processes for referring requests to specialized helpers or external resources.',
          videoResources: [
            { title: 'Building Referral Networks', url: 'https://www.youtube.com/watch?v=z7F9q0UaXCU', duration: '6 min', description: 'How to create effective referral systems in community organizations' },
          ],
          steps: [
            { instruction: 'Map expertise: Who knows what? Create helper skill inventory.', duration: '5 min' },
            { instruction: 'Design referral flowchart: How does a request move to the right person?', duration: '8 min' },
            { instruction: 'Create warm handoff protocol: How do we transfer requests without losing people?', duration: '4 min', teacherNotes: 'Emphasize: Never just give a phone number—make the connection.' },
            { instruction: 'Test: Walk through a scenario using the referral process.', duration: '3 min' },
          ],
          formativeAssessment: 'Does the referral process ensure requests reach appropriate helpers?',
          differentiation: { support: 'Provide referral flowchart template.', extension: 'Build relationships with external referral partners.' },
        },
        {
          title: 'Tracking System Implementation',
          duration: '20 minutes',
          overview: 'Students implement systems to track network activity and demonstrate impact.',
          steps: [
            { instruction: 'Discuss: Why track? (Improvement, accountability, funding, motivation)', duration: '3 min' },
            { instruction: 'Identify metrics: What should we track? (Requests, resolution, satisfaction)', duration: '4 min' },
            { instruction: 'Select tracking tool: Spreadsheet, form, app. Keep it simple!', duration: '5 min' },
            { instruction: 'Create tracking workflow: When and how do we record information?', duration: '5 min', teacherNotes: 'Tracking that is too complex will not get done.' },
            { instruction: 'Exit ticket: One insight you hope to learn from tracking data.', duration: '3 min' },
          ],
          formativeAssessment: 'Is the tracking system simple enough to be consistently used?',
          differentiation: { support: 'Provide spreadsheet template.', extension: 'Create dashboard to visualize tracking data.' },
        },
      ],
      materials: ['Communication tools', 'Referral protocol', 'Tracking template']
    },
    {
      title: 'Sustainability and Growth',
      duration: '50 minutes',
      gradeBand: '9-12',
      objectives: ['Plan ongoing recruitment', 'Design recognition systems', 'Build network resilience'],
      conceptualUnderstanding: ['Recruitment replaces departing helpers', 'Recognition motivates volunteers', 'Resilience survives change'],
      activities: ['Planning: Recruitment strategy', 'Design: Recognition program', 'Analysis: Resilience factors'],
      detailedActivities: [
        {
          title: 'Recruitment Strategy Development',
          duration: '15 minutes',
          overview: 'Students create strategies for ongoing recruitment to sustain and grow the network.',
          steps: [
            { instruction: 'Discuss: Why do volunteers leave? How do we replace them?', duration: '3 min' },
            { instruction: 'Identify recruitment targets: Who would be good helpers? Where do we find them?', duration: '4 min' },
            { instruction: 'Create recruitment pitch: Why should someone join this network?', duration: '4 min', teacherNotes: 'Focus on benefits: skills, community connection, purpose.' },
            { instruction: 'Design recruitment timeline: When and how will we recruit new helpers?', duration: '4 min' },
          ],
          formativeAssessment: 'Does the recruitment strategy address ongoing helper turnover?',
          differentiation: { support: 'Provide recruitment pitch template.', extension: 'Create recruitment materials (flyer, social post).' },
        },
        {
          title: 'Recognition Program Design',
          duration: '20 minutes',
          overview: 'Students design systems to recognize and appreciate tech helpers, sustaining motivation.',
          videoResources: [
            { title: 'Volunteer Recognition Best Practices', url: 'https://www.youtube.com/watch?v=_BQ7VYtPQCI', duration: '5 min', description: 'How to keep volunteers engaged through meaningful recognition' },
          ],
          steps: [
            { instruction: 'Discuss: What motivates volunteers? (Purpose, connection, skill-building, recognition)', duration: '4 min' },
            { instruction: 'Brainstorm recognition approaches: Public, private, formal, informal, tangible.', duration: '5 min' },
            { instruction: 'Design recognition program: Regular appreciation, milestones, special achievements.', duration: '7 min' },
            { instruction: 'Create first recognition activity to implement immediately.', duration: '4 min' },
          ],
          formativeAssessment: 'Does the recognition program address different motivational needs?',
          differentiation: { support: 'Provide recognition ideas list.', extension: 'Research effective volunteer recognition practices.' },
        },
        {
          title: 'Resilience Analysis',
          duration: '15 minutes',
          overview: 'Students analyze potential threats to network sustainability and plan for resilience.',
          steps: [
            { instruction: 'Identify threats: What could cause this network to fail?', duration: '4 min', teacherNotes: 'Key person leaves, funding cut, burnout, conflict, scope creep.' },
            { instruction: 'Prioritize: Which threats are most likely and most damaging?', duration: '3 min' },
            { instruction: 'Develop mitigation strategies for top 3 threats.', duration: '5 min' },
            { instruction: 'Exit ticket: One thing you will do to make the network more resilient.', duration: '3 min' },
          ],
          formativeAssessment: 'Did students identify realistic threats and develop practical mitigation strategies?',
          differentiation: { support: 'Provide threat category prompts.', extension: 'Create network resilience plan document.' },
        },
      ],
      materials: ['Recruitment plan template', 'Recognition ideas']
    }
  ],
  assessment: { formative: ['Resource quality review', 'Training delivery observation', 'Network setup verification', 'Helper feedback'], summative: 'Build and launch a community tech support network including trained helpers, support resources, communication systems, and sustainability plan. Document network operations and early outcomes.' },
  extensions: ['Expand to new neighborhoods', 'Specialize helpers by topic', 'Create repair cafe model'],
  realWorldConnections: ['Tech support networks exist in many communities', 'Libraries train digital navigators', 'Repair cafes reduce e-waste']
};

const project4: Project = {
  id: 'project-4',
  title: 'Project 4: Collaborative Technology Governance',
  description: 'Develop governance structures that keep technology accountable to community needs—ensuring tech serves people, not the other way around.',
  difficulty: 'Advanced',
  duration: '5-6 weeks',
  gradeBand: '9-12',
  overview: 'Students explore how communities can govern technology—making decisions about what technologies to adopt, how to use them ethically, and how to ensure they serve everyone. They develop governance proposals for their own communities.',
  learningObjectives: [
    'Understand technology governance models',
    'Design participatory decision-making processes',
    'Create technology use policies',
    'Build accountability mechanisms',
    'Address privacy and ethics issues',
    'Advocate for community interests'
  ],
  prerequisites: ['Understanding of community technology issues', 'Basic facilitation skills'],
  materials: {
    required: ['Governance framework templates', 'Policy examples', 'Facilitation materials', 'Documentation tools'],
    optional: ['Legal consultation', 'Technical expertise', 'Community meeting space']
  },
  lessons: [
    {
      title: 'Technology Governance Landscape',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Survey technology governance models', 'Identify key governance functions', 'Analyze governance failures'],
      conceptualUnderstanding: ['Governance shapes technology outcomes', 'Different models suit different scales', 'Failures teach important lessons'],
      activities: ['Research: Governance case studies', 'Analysis: Functions comparison', 'Discussion: What went wrong?'],
      detailedActivities: [
        {
          title: 'Exploring Governance Models',
          duration: '20 minutes',
          overview: 'Students research different approaches to technology governance at community, organizational, and city levels.',
          videoResources: [
            { title: 'Community Technology Governance', url: 'https://www.youtube.com/watch?v=bK8N_F3pYxs', duration: '7 min', description: 'How communities can govern technology decisions democratically' },
          ],
          steps: [
            { instruction: 'Define governance: Who decides what technology we use and how?', duration: '3 min' },
            { instruction: 'Present governance spectrum: Top-down corporate to bottom-up community control.', duration: '5 min' },
            { instruction: 'Groups research one model: City tech office, school board, community cooperative.', duration: '8 min' },
            { instruction: 'Quick share: Key features of each model.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students describe different governance approaches and their trade-offs?',
          differentiation: { support: 'Provide model summary cards.', extension: 'Research governance models from different countries.' },
        },
        {
          title: 'Governance Functions Analysis',
          duration: '20 minutes',
          overview: 'Students identify the key functions any technology governance system must perform.',
          steps: [
            { instruction: 'Brainstorm: What decisions need to be made about community technology?', duration: '4 min', teacherNotes: 'Adoption, access, privacy, training, maintenance, retirement.' },
            { instruction: 'Categorize into governance functions: Selection, Implementation, Oversight, Accountability.', duration: '6 min' },
            { instruction: 'Compare: How do different models handle these functions differently?', duration: '6 min' },
            { instruction: 'Discuss: Which functions are most important? Most often neglected?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students identify essential governance functions?',
          differentiation: { support: 'Provide function categories in advance.', extension: 'Create comprehensive governance function framework.' },
        },
        {
          title: 'Learning from Governance Failures',
          duration: '20 minutes',
          overview: 'Students analyze technology governance failures to learn what to avoid.',
          steps: [
            { instruction: 'Present 2-3 governance failure case studies (surveillance overreach, failed systems, exclusion).', duration: '6 min' },
            { instruction: 'Groups analyze: What governance failure led to this outcome?', duration: '6 min' },
            { instruction: 'Identify patterns: What common governance weaknesses do we see?', duration: '4 min' },
            { instruction: 'Exit ticket: One governance principle you will prioritize in your community.', duration: '4 min' },
          ],
          formativeAssessment: 'Can students connect governance failures to specific missing safeguards?',
          differentiation: { support: 'Provide case study analysis questions.', extension: 'Research additional governance failure cases.' },
        },
      ],
      materials: ['Case study collection', 'Governance framework comparison']
    },
    {
      title: 'Participatory Decision-Making',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Design inclusive decision processes', 'Facilitate community input', 'Balance expertise and democracy'],
      conceptualUnderstanding: ['Participation legitimizes decisions', 'Inclusion requires intentional design', 'Technical and democratic expertise both matter'],
      activities: ['Design: Decision process', 'Practice: Facilitation techniques', 'Discussion: Balancing inputs'],
      detailedActivities: [
        {
          title: 'Designing Inclusive Decision Processes',
          duration: '20 minutes',
          overview: 'Students design decision-making processes that include diverse community voices.',
          videoResources: [
            { title: 'Participatory Democracy in Action', url: 'https://www.youtube.com/watch?v=kpFlBXy_dOQ', duration: '6 min', description: 'Examples of participatory decision-making in communities' },
          ],
          steps: [
            { instruction: 'Discuss: Who is typically excluded from technology decisions? Why?', duration: '4 min' },
            { instruction: 'Review inclusion strategies: Multiple meeting times, childcare, translation, online/offline.', duration: '5 min' },
            { instruction: 'Design a decision process for "Should we adopt facial recognition at school?"', duration: '8 min', teacherNotes: 'Who gets input? How? When? Who decides?' },
            { instruction: 'Peer review: What groups might still be excluded from this process?', duration: '3 min' },
          ],
          formativeAssessment: 'Does the process design intentionally include marginalized voices?',
          differentiation: { support: 'Provide process design template.', extension: 'Research how cities have done participatory tech decisions.' },
        },
        {
          title: 'Facilitation Practice',
          duration: '25 minutes',
          overview: 'Students practice facilitating community input on technology decisions.',
          steps: [
            { instruction: 'Review facilitation principles: Neutral, inclusive, time-aware, summarizing.', duration: '4 min' },
            { instruction: 'Model: Teacher facilitates a mini discussion with common challenges.', duration: '5 min' },
            { instruction: 'Practice: Students take turns facilitating 5-minute discussions.', duration: '12 min', teacherNotes: 'Topics: public WiFi, surveillance cameras, social media policies.' },
            { instruction: 'Debrief: What facilitation techniques worked well?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students facilitate without imposing their own views?',
          differentiation: { support: 'Provide facilitation phrase cards.', extension: 'Handle intentional disruptors in role-play.' },
        },
        {
          title: 'Balancing Expertise and Democracy',
          duration: '15 minutes',
          overview: 'Students grapple with the tension between technical expertise and democratic participation.',
          steps: [
            { instruction: 'Present dilemma: Community wants to adopt insecure technology. What do experts do?', duration: '3 min' },
            { instruction: 'Discuss: When should experts override community preferences? When should they not?', duration: '5 min' },
            { instruction: 'Develop principles: How do we balance expertise and democracy in our governance?', duration: '4 min' },
            { instruction: 'Exit ticket: One way to ensure expert input without expert domination.', duration: '3 min' },
          ],
          formativeAssessment: 'Can students articulate the tensions and potential solutions?',
          differentiation: { support: 'Provide discussion prompts.', extension: 'Research how other domains balance expertise and democracy.' },
        },
      ],
      materials: ['Process design template', 'Facilitation guide']
    },
    {
      title: 'Policy Development',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Analyze existing technology policies', 'Draft community technology policies', 'Consider enforcement mechanisms'],
      conceptualUnderstanding: ['Policies codify community values', 'Good policies are clear and enforceable', 'Policies need regular review'],
      activities: ['Analysis: Existing policies', 'Drafting: Policy elements', 'Review: Peer feedback'],
      detailedActivities: [
        {
          title: 'Analyzing Existing Policies',
          duration: '20 minutes',
          overview: 'Students analyze real technology policies to understand their structure and effectiveness.',
          videoResources: [
            { title: 'Technology Policy Analysis', url: 'https://www.youtube.com/watch?v=G7X7BfX3rU4', duration: '6 min', description: 'How to evaluate technology policies for effectiveness' },
          ],
          steps: [
            { instruction: 'Distribute sample policies: School AUP, city surveillance policy, library privacy policy.', duration: '3 min' },
            { instruction: 'Groups analyze: What does it cover? What does it leave out? Is it clear?', duration: '8 min', teacherNotes: 'Look for: Who it applies to, what is prohibited, consequences, exceptions.' },
            { instruction: 'Rate policies: Would you know if you were following them? Could you enforce them?', duration: '5 min' },
            { instruction: 'Discuss: What makes a policy good vs. bad?', duration: '4 min' },
          ],
          formativeAssessment: 'Can students identify strengths and weaknesses in existing policies?',
          differentiation: { support: 'Provide policy analysis worksheet.', extension: 'Find and analyze your own school or city policy.' },
        },
        {
          title: 'Policy Drafting Workshop',
          duration: '25 minutes',
          overview: 'Students draft technology policies for their community or school.',
          steps: [
            { instruction: 'Identify policy need: What technology issue in our community needs a policy?', duration: '4 min' },
            { instruction: 'Review policy elements: Purpose, scope, definitions, rules, exceptions, consequences.', duration: '5 min' },
            { instruction: 'Draft policy sections. Start with purpose and scope.', duration: '10 min' },
            { instruction: 'Add specific rules and enforcement mechanisms.', duration: '6 min' },
          ],
          formativeAssessment: 'Does the draft policy include all essential elements?',
          differentiation: { support: 'Provide policy template with sections.', extension: 'Draft a complete, implementation-ready policy.' },
        },
        {
          title: 'Peer Review and Revision',
          duration: '15 minutes',
          overview: 'Students give and receive feedback on policy drafts.',
          steps: [
            { instruction: 'Exchange policy drafts with another group.', duration: '1 min' },
            { instruction: 'Review using checklist: Clear? Enforceable? Fair? Complete?', duration: '6 min' },
            { instruction: 'Provide written feedback with specific suggestions.', duration: '3 min' },
            { instruction: 'Discuss feedback and plan revisions.', duration: '3 min' },
            { instruction: 'Exit ticket: One change you will make based on feedback.', duration: '2 min' },
          ],
          formativeAssessment: 'Can students give constructive, specific feedback on policies?',
          differentiation: { support: 'Provide peer review checklist.', extension: 'Revise and prepare policy for real submission.' },
        },
      ],
      materials: ['Policy examples', 'Drafting template']
    },
    {
      title: 'Accountability and Ethics',
      duration: '50 minutes',
      gradeBand: '9-12',
      objectives: ['Design accountability mechanisms', 'Address privacy concerns', 'Create ethical guidelines'],
      conceptualUnderstanding: ['Accountability requires transparency', 'Privacy protection builds trust', 'Ethics guide difficult decisions'],
      activities: ['Design: Accountability structures', 'Development: Privacy protections', 'Creation: Ethical guidelines'],
      detailedActivities: [
        {
          title: 'Designing Accountability Mechanisms',
          duration: '15 minutes',
          overview: 'Students design systems to ensure technology governance remains accountable to the community.',
          steps: [
            { instruction: 'Discuss: What does accountability mean? To whom should tech governance be accountable?', duration: '3 min' },
            { instruction: 'Review accountability mechanisms: Reporting, audits, oversight boards, public meetings.', duration: '4 min' },
            { instruction: 'Design accountability system for your governance proposal.', duration: '5 min', teacherNotes: 'Consider: Who reviews? How often? What triggers review?' },
            { instruction: 'Discuss: How do we ensure accountability mechanisms have teeth?', duration: '3 min' },
          ],
          formativeAssessment: 'Does the accountability system include meaningful oversight?',
          differentiation: { support: 'Provide accountability mechanism options.', extension: 'Research accountability mechanisms in existing governance structures.' },
        },
        {
          title: 'Privacy Protection Development',
          duration: '20 minutes',
          overview: 'Students develop privacy protections as part of technology governance.',
          videoResources: [
            { title: 'Privacy by Design Principles', url: 'https://www.youtube.com/watch?v=d9F0rkBr-lQ', duration: '6 min', description: 'How to build privacy into technology systems from the start' },
          ],
          steps: [
            { instruction: 'Introduce privacy principles: Minimization, purpose limitation, transparency, control.', duration: '4 min' },
            { instruction: 'Apply to governance: What data does our governance need? How do we protect it?', duration: '6 min' },
            { instruction: 'Audit: Review your governance proposal for privacy implications.', duration: '6 min' },
            { instruction: 'Add privacy safeguards to address identified risks.', duration: '4 min' },
          ],
          formativeAssessment: 'Did students identify and address privacy risks in their proposal?',
          differentiation: { support: 'Provide privacy audit checklist.', extension: 'Create data retention and deletion policies.' },
        },
        {
          title: 'Ethical Guidelines Creation',
          duration: '15 minutes',
          overview: 'Students create ethical guidelines to guide difficult technology decisions.',
          steps: [
            { instruction: 'Discuss: What ethical dilemmas might our governance face?', duration: '3 min', teacherNotes: 'Surveillance vs. safety, access vs. security, speed vs. inclusion.' },
            { instruction: 'Review ethics frameworks: Harm reduction, fairness, autonomy, transparency.', duration: '4 min' },
            { instruction: 'Draft ethical principles for your governance proposal.', duration: '5 min' },
            { instruction: 'Exit ticket: One ethical line you will never cross, even under pressure.', duration: '3 min' },
          ],
          formativeAssessment: 'Are ethical principles clear enough to guide real decisions?',
          differentiation: { support: 'Provide ethical principle examples.', extension: 'Create decision trees for ethical dilemmas.' },
        },
      ],
      materials: ['Accountability framework', 'Privacy checklist', 'Ethics template']
    },
    {
      title: 'Advocacy and Implementation',
      duration: '60 minutes',
      gradeBand: '9-12',
      objectives: ['Develop advocacy strategies', 'Plan governance implementation', 'Build coalitions'],
      conceptualUnderstanding: ['Advocacy creates change', 'Implementation requires resources', 'Coalitions amplify voices'],
      activities: ['Strategy: Advocacy planning', 'Planning: Implementation steps', 'Building: Coalition mapping'],
      detailedActivities: [
        {
          title: 'Advocacy Strategy Development',
          duration: '20 minutes',
          overview: 'Students develop strategies to advocate for their governance proposals.',
          videoResources: [
            { title: 'Tech Advocacy Strategies', url: 'https://www.youtube.com/watch?v=4iyMWV3B-RU', duration: '7 min', description: 'How to effectively advocate for technology policy changes' },
          ],
          steps: [
            { instruction: 'Identify decision-makers: Who has power to adopt your proposal?', duration: '4 min' },
            { instruction: 'Map interests: What do decision-makers care about? How does your proposal help?', duration: '5 min' },
            { instruction: 'Choose tactics: Testimony, petition, media, demonstration, direct engagement.', duration: '5 min', teacherNotes: 'Match tactics to context and culture.' },
            { instruction: 'Create advocacy message: Clear ask, compelling reason, specific action.', duration: '6 min' },
          ],
          formativeAssessment: 'Is the advocacy strategy tailored to the specific decision-makers?',
          differentiation: { support: 'Provide advocacy tactic cards.', extension: 'Create complete advocacy campaign plan.' },
        },
        {
          title: 'Implementation Planning',
          duration: '20 minutes',
          overview: 'Students create concrete implementation plans for their governance proposals.',
          steps: [
            { instruction: 'Identify implementation phases: Pilot, expansion, full implementation.', duration: '4 min' },
            { instruction: 'Map resources needed: People, money, technology, time.', duration: '5 min' },
            { instruction: 'Identify potential barriers and how to overcome them.', duration: '5 min' },
            { instruction: 'Create timeline with milestones and responsibilities.', duration: '6 min' },
          ],
          formativeAssessment: 'Is the implementation plan realistic and actionable?',
          differentiation: { support: 'Provide implementation plan template.', extension: 'Create detailed budget and resource plan.' },
        },
        {
          title: 'Coalition Building',
          duration: '20 minutes',
          overview: 'Students identify and plan outreach to potential coalition partners.',
          steps: [
            { instruction: 'Brainstorm potential allies: Who else cares about this issue?', duration: '4 min' },
            { instruction: 'Map coalition partners: Individuals, organizations, institutions.', duration: '5 min', teacherNotes: 'Consider: Libraries, advocacy groups, neighborhood associations.' },
            { instruction: 'Plan outreach: How will you approach each potential partner?', duration: '6 min' },
            { instruction: 'Draft coalition invitation: Why should they join? What do they contribute?', duration: '3 min' },
            { instruction: 'Exit ticket: First coalition partner you will contact and when.', duration: '2 min' },
          ],
          formativeAssessment: 'Did students identify diverse coalition partners with complementary strengths?',
          differentiation: { support: 'Provide partner brainstorm categories.', extension: 'Make initial outreach to potential partners.' },
        },
      ],
      materials: ['Advocacy toolkit', 'Implementation plan template']
    }
  ],
  assessment: { formative: ['Governance analysis', 'Process design review', 'Policy draft feedback', 'Advocacy strategy review'], summative: 'Develop a comprehensive technology governance proposal for your community or school including decision-making processes, policies, accountability mechanisms, and implementation plan. Present to relevant stakeholders.' },
  extensions: ['Implement governance proposal', 'Connect with regional networks', 'Advocate for policy changes'],
  realWorldConnections: ['Cities create technology governance offices', 'Schools develop acceptable use policies', 'Communities organize for digital rights']
};

const projects: Project[] = [project1, project2, project3, project4];

// Main Page Component
export default function CommunityBuildingPage() {
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
          <Link href={`/${locale}/tech-sovereignty`} className="inline-flex items-center text-sm text-zinc-500 hover:text-rose-400 transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to All Tracks
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-600 to-rose-400 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <span className="text-rose-200/80 text-sm font-medium">Track G</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Community Building</h1>
          <p className="text-xl text-white/90 max-w-3xl">Build inclusive technology programs that serve everyone in your community. Learn to assess needs, bridge digital divides, and create governance that keeps technology accountable to people.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <CorePrinciple />
        <div className="space-y-6">{projects.map((project) => (<ProjectSection key={project.id} project={project} isExpanded={expandedProject === project.id} onToggle={() => setExpandedProject(expandedProject === project.id ? null : project.id)} />))}</div>
      </div>

      <div className="bg-zinc-950 border-t border-zinc-700">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between">
          <Link href={`/${locale}/tech-sovereignty/digital-rights`} className="text-zinc-500 hover:text-rose-400 transition-colors flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Previous: Digital Rights
          </Link>
          <Link href={`/${locale}/tech-sovereignty`} className="text-zinc-500 hover:text-rose-400 transition-colors flex items-center gap-1">
            All Tracks
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
