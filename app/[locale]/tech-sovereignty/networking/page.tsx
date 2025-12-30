'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';

// Core Pedagogical Principle Component
const CorePrinciple = () => (
  <div className="bg-gradient-to-r from-secret/20 to-secret/10 border border-secret/30 rounded-xl p-6 mb-8">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-secret/30 rounded-xl flex items-center justify-center">
        <svg className="w-6 h-6 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-bold text-text-heading mb-2">Core Pedagogical Principle: Understanding Over Memorization</h3>
        <p className="text-text-secondary mb-3">
          Every lesson in this curriculum prioritizes <strong>deep conceptual understanding</strong> over surface-level skills.
          Students should never just &quot;make it work&quot;—they must understand <em>why</em> it works, <em>what</em> is happening
          at each step, and <em>how</em> the hardware and software interact.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="bg-deep-card rounded-lg p-4 border border-secret/20">
            <h4 className="font-semibold text-secret-light mb-1">Ask &quot;Why?&quot;</h4>
            <p className="text-sm text-text-muted">Every configuration choice should be explainable. If a student can&apos;t explain why a setting exists, they haven&apos;t learned it.</p>
          </div>
          <div className="bg-deep-card rounded-lg p-4 border border-secret/20">
            <h4 className="font-semibold text-secret-light mb-1">Trace the Path</h4>
            <p className="text-sm text-text-muted">Students should be able to follow data from source to destination, understanding what happens at each step and in each device.</p>
          </div>
          <div className="bg-deep-card rounded-lg p-4 border border-secret/20">
            <h4 className="font-semibold text-secret-light mb-1">Predict & Verify</h4>
            <p className="text-sm text-text-muted">Before making changes, students predict what will happen. Understanding means being able to predict outcomes.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// UDL Framework Types
interface UDLEngagement {
  choiceAndAutonomy: string[];      // Ways students can make choices
  relevanceAndAuthenticity: string[]; // Real-world connections
  selfRegulation: string[];          // Tools for managing learning
}

interface UDLRepresentation {
  multipleFormats: string[];        // Different ways to present info
  vocabularySupport: string[];      // Key terms and scaffolding
  backgroundKnowledge: string[];    // Prior knowledge activation
}

interface UDLActionExpression {
  physicalOptions: string[];        // Alternative ways to participate
  expressionOptions: string[];      // Multiple ways to show learning
  executiveFunctionSupport: string[]; // Planning and organization aids
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
  videoResources?: VideoResource[]; // Optional video links for this activity
  steps: ActivityStep[];
  formativeAssessment?: string;
  differentiation?: {
    support: string;    // For struggling learners
    extension: string;  // For advanced learners
  };
}

// Grade Band Type
type GradeBand = '6-8' | '9-12' | '6-12'; // Middle School, High School, or Both

// Types
interface Lesson {
  title: string;
  duration: string;
  gradeBand: GradeBand; // Target grade level(s)
  objectives: string[];
  conceptualUnderstanding: string[]; // What students should deeply understand
  activities: string[];  // Keep for backward compatibility
  detailedActivities?: DetailedActivity[]; // New detailed activity structure
  materials: string[];
  udl?: UDLFramework; // Universal Design for Learning supports
}

interface Project {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  gradeBand: GradeBand; // Target grade level(s) for the overall project
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
    <div className="bg-gradient-to-r from-secret/10 to-primary/10 border border-secret/30 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-secret/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-secret" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-semibold text-secret-light">Universal Design for Learning (UDL) Supports</span>
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
        <div className="px-4 pb-4 space-y-4">
          {/* Engagement */}
          <div className="bg-deep-card rounded-lg p-4 border border-primary/20">
            <h6 className="text-sm font-semibold text-secret-light mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-secret/20 rounded-full flex items-center justify-center text-xs">1</span>
              Multiple Means of Engagement
              <span className="text-xs font-normal text-secret">(The &quot;Why&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-text-secondary mb-1">Choice & Autonomy</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.engagement.choiceAndAutonomy.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-secret/60">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-secondary mb-1">Relevance & Authenticity</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.engagement.relevanceAndAuthenticity.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-secret/60">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-secondary mb-1">Self-Regulation</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.engagement.selfRegulation.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-secret/60">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Representation */}
          <div className="bg-deep-card rounded-lg p-4 border border-secondary/20">
            <h6 className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs">2</span>
              Multiple Means of Representation
              <span className="text-xs font-normal text-primary">(The &quot;What&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-text-secondary mb-1">Multiple Formats</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.representation.multipleFormats.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-primary/60">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-secondary mb-1">Vocabulary Support</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.representation.vocabularySupport.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-primary/60">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-secondary mb-1">Background Knowledge</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.representation.backgroundKnowledge.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-primary/60">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action & Expression */}
          <div className="bg-deep-card rounded-lg p-4 border border-secret/20">
            <h6 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 bg-purple-500/100/20 rounded-full flex items-center justify-center text-xs">3</span>
              Multiple Means of Action & Expression
              <span className="text-xs font-normal text-purple-300">(The &quot;How&quot; of Learning)</span>
            </h6>
            <div className="grid md:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="font-medium text-text-secondary mb-1">Physical Options</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.actionExpression.physicalOptions.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-purple-300">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-secondary mb-1">Expression Options</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.actionExpression.expressionOptions.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-purple-300">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium text-text-secondary mb-1">Executive Function Support</p>
                <ul className="text-text-muted space-y-0.5">
                  {udl.actionExpression.executiveFunctionSupport.map((item, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-purple-300">•</span>
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
        className="w-full p-4 bg-gradient-to-r from-primary/10 to-primary/5 flex items-center justify-between text-left hover:from-primary/15 hover:to-primary/10 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
            {index + 1}
          </span>
          <div>
            <h6 className="font-semibold text-text-heading">{activity.title}</h6>
            <p className="text-xs text-text-muted">{activity.duration}</p>
          </div>
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
        <div className="p-4 bg-deep-card space-y-4">
          {/* Overview */}
          <div className="bg-deep-alt rounded-lg p-3">
            <p className="text-sm text-text-secondary">{activity.overview}</p>
          </div>

          {/* Video Resources (if available) */}
          {activity.videoResources && activity.videoResources.length > 0 && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
              <h6 className="text-sm font-semibold text-red-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Video Resources
              </h6>
              <div className="space-y-2">
                {activity.videoResources.map((video, i) => (
                  <a
                    key={i}
                    href={video.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-deep-card rounded p-2 hover:bg-warm/20 transition-colors border border-warm/30"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-red-300">{video.title}</p>
                        <p className="text-xs text-red-300">{video.description}</p>
                      </div>
                      <span className="flex-shrink-0 text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                        {video.duration}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Step-by-step instructions */}
          <div>
            <h6 className="text-sm font-semibold text-text-heading mb-3 flex items-center gap-2">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Step-by-Step Instructions
            </h6>
            <div className="space-y-3">
              {activity.steps.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs font-bold">
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
                      <div className="mt-2 bg-amber-500/10 border-l-2 border-amber-400 pl-3 py-1">
                        <p className="text-xs text-amber-300">
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
const LessonCard = ({ lesson, index }: { lesson: Lesson; index: number }) => (
  <div className="bg-deep-card border border-deep-border rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 bg-deep-alt text-white rounded-full flex items-center justify-center font-bold">
        {index + 1}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-text-heading">{lesson.title}</h4>
          <div className="flex items-center gap-2">
            <span className={`text-xs px-2 py-1 rounded font-medium ${
              lesson.gradeBand === '6-8'
                ? 'bg-secret/20 text-secret-light'
                : lesson.gradeBand === '9-12'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-purple-500/100/20 text-purple-300'
            }`}>
              {lesson.gradeBand === '6-8' ? 'Grades 6-8' : lesson.gradeBand === '9-12' ? 'Grades 9-12' : 'Grades 6-12'}
            </span>
            <span className="text-sm text-text-muted bg-deep-alt px-2 py-1 rounded">{lesson.duration}</span>
          </div>
        </div>

        <div className="space-y-4 mt-4">
          {/* Deep Understanding - Highlighted */}
          {lesson.conceptualUnderstanding && lesson.conceptualUnderstanding.length > 0 && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
              <h5 className="text-sm font-semibold text-indigo-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Deep Understanding Goals
              </h5>
              <p className="text-xs text-indigo-400 mb-2 italic">Students should be able to explain in their own words:</p>
              <ul className="text-sm text-indigo-300 space-y-1">
                {lesson.conceptualUnderstanding.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-1">&#9733;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* UDL Supports */}
          {lesson.udl && <UDLSection udl={lesson.udl} />}

          <div>
            <h5 className="text-sm font-medium text-text-secondary mb-1">Learning Objectives</h5>
            <ul className="text-sm text-text-muted space-y-1">
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
              <h5 className="text-sm font-medium text-text-secondary mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <h5 className="text-sm font-medium text-text-secondary mb-1">Activities</h5>
              <ul className="text-sm text-text-muted space-y-1">
                {lesson.activities.map((activity, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary">&#8226;</span>
                    {activity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h5 className="text-sm font-medium text-text-secondary mb-1">Materials Needed</h5>
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
    'Beginner': 'bg-green-500/20 text-green-300',
    'Intermediate': 'bg-yellow-500/20 text-yellow-300',
    'Advanced': 'bg-red-500/20 text-red-300',
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
              <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[project.difficulty] || 'bg-deep-alt text-text-secondary'}`}>
                {project.difficulty}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                project.gradeBand === '6-8'
                  ? 'bg-secret/20 text-secret-light'
                  : project.gradeBand === '9-12'
                    ? 'bg-primary/20 text-primary'
                    : 'bg-purple-500/100/20 text-purple-300'
              }`}>
                {project.gradeBand === '6-8' ? 'Grades 6-8' : project.gradeBand === '9-12' ? 'Grades 9-12' : 'Grades 6-12'}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-deep-alt text-text-heading">
                {project.duration}
              </span>
            </div>
            <p className="text-text-muted">{project.description}</p>
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
            <p className="text-text-muted leading-relaxed">{project.overview}</p>
          </div>

          {/* Learning Objectives */}
          <div>
            <h4 className="text-lg font-semibold text-text-heading mb-3">Learning Objectives</h4>
            <p className="text-sm text-text-muted mb-2">By the end of this project, students will be able to:</p>
            <ul className="space-y-2">
              {project.learningObjectives.map((objective, i) => (
                <li key={i} className="flex items-start gap-3 text-text-muted">
                  <span className="flex-shrink-0 w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center text-sm font-medium">
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
                <li key={i} className="flex items-center gap-2 text-text-muted">
                  <span className="text-slate-500">&#8226;</span>
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
                  <li key={i} className="flex items-center gap-2 text-text-muted">
                    <span className="text-green-500">&#10003;</span>
                    {material}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-heading mb-3">Optional Materials</h4>
              <ul className="space-y-2">
                {project.materials.optional.map((material, i) => (
                  <li key={i} className="flex items-center gap-2 text-text-muted">
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
                <h5 className="font-medium text-text-secondary mb-2">Formative Assessment (Ongoing)</h5>
                <ul className="space-y-1">
                  {project.assessment.formative.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="text-slate-500">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-text-secondary mb-2">Summative Assessment (Final)</h5>
                <p className="text-sm text-text-muted">{project.assessment.summative}</p>
              </div>
            </div>
          </div>

          {/* Extensions */}
          <div>
            <h4 className="text-lg font-semibold text-text-heading mb-3">Extensions & Challenges</h4>
            <p className="text-sm text-text-muted mb-2">For students who finish early or want to go deeper:</p>
            <ul className="space-y-2">
              {project.extensions.map((ext, i) => (
                <li key={i} className="flex items-start gap-2 text-text-muted">
                  <span className="text-purple-500">&#9733;</span>
                  {ext}
                </li>
              ))}
            </ul>
          </div>

          {/* Real World Connections */}
          <div className="bg-primary/10 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-text-heading mb-3">Real-World Connections</h4>
            <ul className="space-y-2">
              {project.realWorldConnections.map((connection, i) => (
                <li key={i} className="flex items-start gap-2 text-text-secondary">
                  <span className="text-primary">&#8594;</span>
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

// Main Page Component
export default function NetworkingCurriculum() {
  const t = useTranslations('techSovereignty');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const projectParam = searchParams.get('project');

  // Determine initial expanded project based on URL param or default to project-1
  const getInitialProject = () => {
    if (projectParam) {
      const projectNum = parseInt(projectParam);
      if (projectNum >= 1 && projectNum <= 4) {
        return `project-${projectNum}`;
      }
    }
    return 'project-1';
  };

  const [expandedProject, setExpandedProject] = React.useState<string | null>(getInitialProject());

  // Update expanded project when URL param changes and scroll to it
  React.useEffect(() => {
    if (projectParam) {
      const projectNum = parseInt(projectParam);
      if (projectNum >= 1 && projectNum <= 4) {
        const projectId = `project-${projectNum}`;
        setExpandedProject(projectId);
        // Scroll to the project after a short delay to allow rendering
        setTimeout(() => {
          const element = document.getElementById(projectId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      }
    }
  }, [projectParam]);

  // Project Data
  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'Build Your First Local Network',
      description: 'Set up a home network with a router, switch, and multiple devices. Learn IP addresses, DHCP, and basic network troubleshooting.',
      difficulty: 'Beginner',
      duration: '2-3 weeks',
      gradeBand: '6-8',
      overview: `In this foundational project, students will build a functional local area network (LAN) from scratch. They'll learn how devices communicate with each other, understand the role of routers and switches, and gain hands-on experience with network configuration. This project demystifies the "magic" of how the internet works at the local level and gives students confidence to troubleshoot common network issues.`,
      learningObjectives: [
        'Explain the difference between a router, switch, and modem',
        'Configure a router\'s basic settings including SSID, password, and security protocols',
        'Understand and assign IP addresses manually and through DHCP',
        'Connect multiple devices to a network and verify connectivity',
        'Use basic network diagnostic tools (ping, ipconfig/ifconfig)',
        'Troubleshoot common network connectivity issues',
      ],
      prerequisites: [
        'Basic computer literacy (file management, using a web browser)',
        'No prior networking experience required',
        'Curiosity about how the internet works',
      ],
      materials: {
        required: [
          'Router (any consumer-grade router will work)',
          'Ethernet cables (at least 3-4)',
          'At least 2 computers or devices with network capabilities',
          'Access to router admin panel (usually via web browser)',
        ],
        optional: [
          'Network switch (to expand available ports)',
          'Additional devices (phones, tablets, IoT devices)',
          'Label maker for cable organization',
          'Network cable tester',
        ],
      },
      lessons: [
        {
          title: 'Introduction to Networks: What Happens When You Go Online?',
          duration: '60 minutes',
          gradeBand: '6-8',
          conceptualUnderstanding: [
            'Why networks exist: the fundamental problem of connecting computers to share information',
            'How data is broken into "packets" and why this approach works better than sending whole files',
            'The difference between your local network and the broader internet—and where the boundary is',
          ],
          objectives: [
            'Define what a computer network is and why networks exist',
            'Identify the basic components of a home network',
            'Trace the path of data from their device to a website',
          ],
          activities: [
            'Discussion: What do you think happens when you open a website?',
            'Diagram activity: Draw your home network setup',
            'Video: "How the Internet Works" (simplified animation)',
            'Group activity: Human network simulation - students pass "packets" (paper messages) to each other',
          ],
          detailedActivities: [
            {
              title: 'Opening Discussion: What Happens When You Go Online?',
              duration: '10 minutes',
              overview: 'Activate prior knowledge and surface misconceptions by discussing what students think happens when they access a website.',
              steps: [
                {
                  instruction: 'Ask students to put away devices and sit in a circle or facing the board.',
                  duration: '1 min',
                },
                {
                  instruction: 'Pose the question: "When you type youtube.com into your browser and press Enter, what do you think happens? Where does the video come from?"',
                  teacherNotes: 'Accept all answers without judgment. Write key ideas on the board. Look for misconceptions like "the video is stored in my phone" or "the internet is in the cloud."',
                },
                {
                  instruction: 'Follow up with: "Where do you think YouTube\'s computers are physically located? How does the video get from there to your screen?"',
                  duration: '3 min',
                },
                {
                  instruction: 'Introduce the word "network" - explain that we\'re going to trace this journey together and understand each step.',
                },
                {
                  instruction: 'Create a "Curiosity Parking Lot" poster where students can add questions throughout the lesson.',
                  teacherNotes: 'This helps students who have tangential questions feel heard while keeping the lesson on track.',
                },
              ],
              formativeAssessment: 'Listen for common misconceptions to address. Note which students seem to have prior knowledge vs. those starting fresh.',
              differentiation: {
                support: 'Provide sentence starters: "I think the video comes from..." or "I think my phone connects to..."',
                extension: 'Ask students who show prior knowledge to explain their thinking in more detail, or to draw a quick diagram.',
              },
            },
            {
              title: 'Draw Your Home Network',
              duration: '15 minutes',
              overview: 'Students create visual representations of their home network setup, making the abstract concept of "network" concrete and personal.',
              steps: [
                {
                  instruction: 'Distribute blank paper and colored pencils/markers to each student.',
                  duration: '1 min',
                },
                {
                  instruction: 'Display a simple example diagram on the board showing: a device → router → modem → "internet cloud" → a server. Label each part.',
                  teacherNotes: 'Keep your example simple so students don\'t feel intimidated. Emphasize that messy diagrams are fine.',
                },
                {
                  instruction: 'Ask students to draw their own home setup: "Draw all the devices in your home that connect to the internet. Then draw how you think they connect to each other and to the internet."',
                  duration: '8 min',
                },
                {
                  instruction: 'Circulate and ask probing questions: "Where is your router? How does your phone connect - wire or WiFi? Where does the internet come into your house?"',
                  teacherNotes: 'Don\'t correct errors yet. The goal is to surface their mental models. Take note of interesting diagrams to share.',
                },
                {
                  instruction: 'Have 2-3 volunteers share their diagrams. Ask the class: "What\'s similar? What\'s different?"',
                  duration: '5 min',
                },
                {
                  instruction: 'Highlight that everyone has routers, modems, and devices - these are the building blocks of networks.',
                },
              ],
              formativeAssessment: 'Check diagrams for: devices included, connection types (wired/wireless), and whether they show connection to "outside" internet.',
              differentiation: {
                support: 'Provide a template with boxes labeled "Devices," "Router," "Modem," "Internet" that students can fill in.',
                extension: 'Challenge students to include IP addresses or to show the path of a specific piece of data.',
              },
            },
            {
              title: 'Video: How the Internet Works',
              duration: '12 minutes',
              overview: 'Watch a short animated video that explains the journey of data across the internet, providing a professional visual explanation to build on.',
              videoResources: [
                { title: 'How Does the Internet Work? (Lesics)', url: 'https://www.youtube.com/watch?v=x3c1ih2NJEg', duration: '11 min', description: 'Clear animation showing data packets, routers, and the physical infrastructure' },
                { title: 'How the Internet Works (BBC Ideas)', url: 'https://www.youtube.com/watch?v=7_LPdttKXPc', duration: '4 min', description: 'Short, engaging explanation suitable for younger audiences' },
                { title: 'Packets, Routers, and Reliability (Khan Academy)', url: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:routing-with-redundancy/v/the-internet-packet-routers-and-reliability', duration: '6 min', description: 'Focuses specifically on packet routing' },
              ],
              steps: [
                {
                  instruction: 'Distribute video viewing guide with 3 questions: (1) What are packets? (2) What does a router do? (3) How does data find its way?',
                  duration: '1 min',
                },
                {
                  instruction: 'Play one of the recommended videos (see video resources above). Suggested: "How Does the Internet Work?" by Lesics or the shorter BBC Ideas video for younger students.',
                  duration: '5 min',
                  teacherNotes: 'Preview the video before class. Pause if students look confused and ask "What did you just hear?"',
                },
                {
                  instruction: 'Pause after the video. Give students 2 minutes to complete their viewing guide independently.',
                  duration: '2 min',
                },
                {
                  instruction: 'Discuss answers as a class. Add new vocabulary to the word wall: PACKET, ROUTER, IP ADDRESS.',
                  duration: '4 min',
                },
                {
                  instruction: 'Connect back to their diagrams: "Now that you\'ve seen this, what would you add or change in your diagram?"',
                },
              ],
              formativeAssessment: 'Review viewing guides for accuracy. Note which concepts need reinforcement.',
              differentiation: {
                support: 'Provide a word bank for the viewing guide. Pair with a peer who can help with note-taking.',
                extension: 'Ask students to identify something in the video that wasn\'t covered in their diagram.',
              },
            },
            {
              title: 'Human Network Simulation: Passing Packets',
              duration: '20 minutes',
              overview: 'Students physically simulate how packets travel through a network, embodying the roles of devices, routers, and servers to understand the process kinesthetically.',
              steps: [
                {
                  instruction: 'Clear space in the classroom. Arrange chairs in a network topology: clusters of "devices" connected to "routers" which connect to each other.',
                  duration: '3 min',
                  teacherNotes: 'Draw the layout on the board first so students understand where to sit. Consider having router students stand.',
                },
                {
                  instruction: 'Assign roles: 4-5 "devices" (senders/receivers), 2-3 "routers", and 1 "server" (YouTube). Give routers special hats or signs.',
                },
                {
                  instruction: 'Explain the rules: Devices write messages on index cards. Messages must travel through routers to reach the server. Routers can only pass to adjacent routers or devices.',
                  duration: '2 min',
                },
                {
                  instruction: 'ROUND 1 - Simple Message: Have one device send a message "Get video" to the server. Server responds with "Here\'s your video" on a new card. Class observes the path.',
                  duration: '3 min',
                },
                {
                  instruction: 'ROUND 2 - Packets: Explain that real data is too big for one card. Have the server respond with a message split into 3 numbered cards (packets). Send them via different routes. Device must reassemble.',
                  duration: '5 min',
                  teacherNotes: 'This is the key insight! Packets can take different paths and arrive out of order.',
                },
                {
                  instruction: 'ROUND 3 - Add Chaos: Have a router "go down" (sit out). Watch how messages must find a new path. Discuss: "What just happened? How did the network adapt?"',
                  duration: '4 min',
                },
                {
                  instruction: 'Debrief: Return to seats. Ask: "What did you learn about how networks work? What surprised you?" Record key insights.',
                  duration: '3 min',
                },
              ],
              formativeAssessment: 'Can students explain why packets exist? Can they describe what happens when a router fails?',
              differentiation: {
                support: 'Pair struggling students with confident peers. Give simpler roles (devices rather than routers) initially.',
                extension: 'Have advanced students act as "network monitors" who track and report on packet paths and timing.',
              },
            },
          ],
          materials: ['Whiteboard/markers', 'Paper for diagrams', 'Index cards for packet simulation'],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Students choose which website journey to trace (gaming, social media, streaming)',
                'Option to work individually or in pairs for diagram activity',
                'Students decide their role in the packet simulation (sender, receiver, router)',
              ],
              relevanceAndAuthenticity: [
                'Connect to students\' daily internet use and frustrations (slow loading, buffering)',
                'Discuss real examples: "Why does my video call lag but my music keeps playing?"',
                'Relate to community needs: reliable internet for homework, job applications',
              ],
              selfRegulation: [
                'Provide a "curiosity parking lot" for questions that come up during the lesson',
                'Offer breaks during activities with movement options',
                'Self-assessment checkpoint: "Rate your understanding 1-5" before moving on',
              ],
            },
            representation: {
              multipleFormats: [
                'Video animation of data traveling through networks',
                'Physical packet-passing simulation with paper cards',
                'Visual diagram of home network components',
                'Verbal discussion and explanation',
              ],
              vocabularySupport: [
                'Word wall with key terms: network, packet, router, modem, internet',
                'Visual icons paired with each vocabulary word',
                'Analogies sheet: network = road system, packets = letters, router = post office',
              ],
              backgroundKnowledge: [
                'Start with familiar experience: "What happens when you open YouTube?"',
                'KWL chart: What do you Know, Want to know, Learned about networks',
                'Brief pre-assessment to identify prior knowledge and misconceptions',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'Packet simulation involves physical movement around room',
                'Option to draw digitally or on paper',
                'Standing vs. sitting options for discussion',
              ],
              expressionOptions: [
                'Draw a diagram OR write a step-by-step description',
                'Verbal explanation to partner OR written reflection',
                'Create a comic strip showing the packet journey',
              ],
              executiveFunctionSupport: [
                'Visual timer for each activity segment',
                'Checklist of activity steps displayed on board',
                'Graphic organizer for network diagram with labeled sections',
              ],
            },
          },
        },
        {
          title: 'Meet the Hardware: Routers, Switches, and Modems',
          duration: '75 minutes',
          gradeBand: '6-8',
          conceptualUnderstanding: [
            'What a router actually does: making decisions about where to send data (routing tables)',
            'Why switches exist: the problem of connecting multiple devices efficiently within a network',
            'How a modem translates digital data into signals that can travel over phone/cable/fiber lines',
            'Why these are separate devices (even when combined in one box) and what each chip/component does',
          ],
          objectives: [
            'Physically identify a router, switch, and modem',
            'Explain the function of each device in a network',
            'Understand the difference between wired and wireless connections',
          ],
          activities: [
            'Hardware inspection: Pass around and examine networking equipment',
            'Label the ports: Identify WAN, LAN, and other ports on a router',
            'Comparison chart: Router vs. Switch vs. Modem',
            'Hands-on: Connect a computer to a router via Ethernet cable',
          ],
          detailedActivities: [
            {
              title: 'Hardware Inspection Stations',
              duration: '20 minutes',
              overview: 'Students rotate through stations examining real networking hardware, developing tactile familiarity with the equipment they\'ll configure later.',
              steps: [
                {
                  instruction: 'Set up 3-4 stations around the room, each with a different piece of hardware: (1) Router, (2) Modem, (3) Switch (if available), (4) Cables & connectors.',
                  duration: '2 min before class',
                  teacherNotes: 'If you don\'t have enough hardware, combine stations or use high-quality photos printed large.',
                },
                {
                  instruction: 'Give each student an "Observation Sheet" with columns: Device Name, Ports I See, Lights/Indicators, Cables That Fit.',
                },
                {
                  instruction: 'Explain the rotation: "You\'ll have 4 minutes at each station. Pick up the device, look at all sides, plug in cables if available, and record what you observe."',
                  teacherNotes: 'Emphasize gentle handling. Model how to hold devices and examine ports.',
                },
                {
                  instruction: 'Start the rotation. Set a visible timer. Circulate and ask prompting questions: "What do you think that port is for? Why are there 4 of the same type?"',
                  duration: '16 min total (4 stations × 4 min)',
                },
                {
                  instruction: 'At the cable station, have students practice plugging Ethernet cables in until they hear the "click."',
                  teacherNotes: 'This is a skill that will be used repeatedly. Some students may never have handled network cables before.',
                },
                {
                  instruction: 'Return to seats with completed observation sheets for group discussion.',
                },
              ],
              formativeAssessment: 'Check observation sheets for completeness. Can students differentiate between port types?',
              differentiation: {
                support: 'Pre-fill some parts of the observation sheet. Pair with a more experienced peer.',
                extension: 'Have students hypothesize what each port type is for based on physical clues.',
              },
            },
            {
              title: 'Label the Ports: Port Identification Activity',
              duration: '15 minutes',
              overview: 'Students learn to identify and name the common ports on networking equipment, building vocabulary and practical identification skills.',
              steps: [
                {
                  instruction: 'Display a large image of a router\'s back panel on the board. Point to the WAN port (often blue or labeled "Internet").',
                },
                {
                  instruction: 'Ask: "This port looks different from the others. Any guesses what it\'s for?" Explain WAN = Wide Area Network = connection to the outside internet.',
                  duration: '2 min',
                },
                {
                  instruction: 'Point to the LAN ports (usually yellow, grouped together). Explain: LAN = Local Area Network = your home devices connect here.',
                  duration: '2 min',
                },
                {
                  instruction: 'Distribute blank router diagrams. Have students label: WAN port, LAN ports (number them), Power, Reset button, Antennas (if visible).',
                  duration: '5 min',
                  teacherNotes: 'Walk around and correct common errors. The WAN vs LAN distinction is crucial.',
                },
                {
                  instruction: 'Challenge question: "If you plug the internet cable into a LAN port instead of WAN, what happens?" Discuss why the distinction matters.',
                  duration: '3 min',
                },
                {
                  instruction: 'Quick game: Call out a port type, students point to it on their diagram. Speed rounds!',
                  duration: '3 min',
                },
              ],
              formativeAssessment: 'Can students correctly identify WAN vs LAN on a new device they haven\'t seen before?',
              differentiation: {
                support: 'Provide a color-coded key. WAN = blue, LAN = yellow for easy matching.',
                extension: 'Have students research what other ports might exist (USB, console port, fiber).',
              },
            },
            {
              title: 'Device Function Comparison Chart',
              duration: '15 minutes',
              overview: 'Students synthesize their observations into a structured comparison, clarifying the distinct purposes of each device type.',
              steps: [
                {
                  instruction: 'Draw a 4-column table on the board: Device | What It Does | Connects To | Analogy.',
                },
                {
                  instruction: 'Work through the MODEM row together: "What does a modem do? It translates signals. Connects to: wall jack & router. Analogy: translator between languages."',
                  duration: '3 min',
                },
                {
                  instruction: 'Have students work in pairs to complete the ROUTER row. After 3 minutes, collect answers and fill in the class chart.',
                  duration: '4 min',
                  teacherNotes: 'Router: directs traffic, connects to modem & devices, analogy: traffic cop or mail sorting office.',
                },
                {
                  instruction: 'Repeat for SWITCH: "A switch is like a router but simpler. It just connects multiple devices together on the same network. Analogy: power strip for network cables."',
                  duration: '3 min',
                },
                {
                  instruction: 'Discuss combo devices: "Many home routers are actually 3-in-1: modem + router + switch in one box. Look for separate sections in the back."',
                  duration: '2 min',
                },
                {
                  instruction: 'Students copy the completed chart into their notebooks as a reference.',
                  duration: '3 min',
                },
              ],
              formativeAssessment: 'Quiz students: "If you need to add more wired devices, which device do you add?" (Switch)',
              differentiation: {
                support: 'Provide a partially filled chart with blanks to complete.',
                extension: 'Ask students to add a row for access points or mesh systems.',
              },
            },
            {
              title: 'Hands-On: Connect a Computer to the Network',
              duration: '20 minutes',
              overview: 'Students practice the physical task of connecting a device to a network, reinforcing learning through direct experience.',
              steps: [
                {
                  instruction: 'Display the goal: "By the end of this activity, you will connect a laptop to the router and verify it has internet access."',
                },
                {
                  instruction: 'Model the process slowly: (1) Get an Ethernet cable. (2) Plug one end into a LAN port on the router - listen for the click. (3) Plug the other end into the laptop\'s Ethernet port.',
                  duration: '2 min',
                },
                {
                  instruction: 'Model verification: Open a browser, go to google.com. "If this loads, congratulations - you\'re connected!"',
                },
                {
                  instruction: 'Have students work in pairs. One connects, one observes and checks the work. Then switch roles.',
                  duration: '8 min',
                  teacherNotes: 'Circulate actively. Common issues: using WAN port instead of LAN, cable not clicked in fully.',
                },
                {
                  instruction: 'Troubleshooting challenge: Deliberately create a problem (unplug cable, use wrong port) and have a student diagnose and fix it.',
                  duration: '5 min',
                },
                {
                  instruction: 'Extension: Have students find the computer\'s IP address (ipconfig on Windows, ifconfig on Mac) and verify it matches the router\'s network.',
                  duration: '5 min',
                },
              ],
              formativeAssessment: 'Can every student successfully connect a device and verify connectivity?',
              differentiation: {
                support: 'Create a laminated step-by-step card with photos.',
                extension: 'Have students connect a device using WiFi and compare the process to wired.',
              },
            },
          ],
          materials: ['Router', 'Switch (if available)', 'Modem (or pictures)', 'Ethernet cables', 'Computers'],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Students choose which device to examine first',
                'Option to work with physical hardware or high-quality images/videos',
                'Choice of presenting findings verbally, in writing, or through demonstration',
              ],
              relevanceAndAuthenticity: [
                'Use the actual router/modem from the classroom or students\' homes',
                'Discuss: "What devices do you have at home? What do the blinking lights mean?"',
                'Connect to repair/reuse: understanding hardware empowers fixing vs. replacing',
              ],
              selfRegulation: [
                'Provide a "frustration meter" - check in if hands-on tasks feel overwhelming',
                'Model making mistakes: "It\'s okay if the cable doesn\'t click right away"',
                'Quiet exploration time before group sharing',
              ],
            },
            representation: {
              multipleFormats: [
                'Physical hardware for tactile learners',
                'Labeled diagrams and photos for visual learners',
                'Verbal explanation with analogies (router = traffic cop)',
                'Video teardown showing inside the devices',
              ],
              vocabularySupport: [
                'Visual port guide with color-coded labels',
                'Acronym decoder: WAN, LAN, DHCP, DNS',
                'Function cards: "I receive signals from the internet" = modem',
              ],
              backgroundKnowledge: [
                'Review: "Remember how data travels in packets from last lesson?"',
                'Show the journey: where does each device fit in the path?',
                'Connect new terms to familiar concepts: ports = doors, cables = hallways',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'Handle and examine physical hardware',
                'Point to features rather than naming them verbally',
                'Use assistive technology for fine motor challenges with cables',
              ],
              expressionOptions: [
                'Create labeled diagram of device ports',
                'Record short video explaining one device\'s function',
                'Write comparison paragraph or fill in comparison table',
              ],
              executiveFunctionSupport: [
                'Station rotation schedule posted visually',
                'Comparison chart template with categories pre-filled',
                'Step-by-step guide for cable connection task',
              ],
            },
          },
        },
        {
          title: 'IP Addresses: The Language of Networks',
          duration: '90 minutes',
          gradeBand: '6-8',
          conceptualUnderstanding: [
            'Why every device needs a unique address—what happens when software tries to send data without knowing where to send it',
            'How the binary math works: why IP addresses have the format they do (4 octets, 0-255)',
            'The design decision behind private vs public addresses: why your home uses 192.168.x.x and what NAT does',
            'What your computer is actually doing when it "looks up" its IP address',
          ],
          objectives: [
            'Explain what an IP address is and why it\'s needed',
            'Distinguish between public and private IP addresses',
            'Understand IPv4 address structure (octets, ranges)',
            'Find their device\'s IP address',
          ],
          activities: [
            'Analogy discussion: IP addresses as "home addresses" for devices',
            'Hands-on: Find your device\'s IP address using ipconfig (Windows) or ifconfig (Mac/Linux)',
            'Worksheet: Identify valid vs. invalid IP addresses',
            'Activity: What happens when two devices have the same IP? (IP conflict demonstration)',
          ],
          detailedActivities: [
            {
              title: 'The Address Analogy: Why Devices Need IP Addresses',
              duration: '15 minutes',
              overview: 'Build conceptual understanding by connecting IP addresses to familiar addressing systems students already understand.',
              steps: [
                {
                  instruction: 'Write on the board: "123 Main Street, Apt 4B, Springfield, IL 62701" Ask: "What is this? Why does it exist?"',
                  duration: '2 min',
                },
                {
                  instruction: 'Draw a parallel: "Every device on a network needs an address so data knows where to go. Just like mail needs an address to find your house."',
                },
                {
                  instruction: 'Show an IP address: 192.168.1.105. Ask: "This is an IP address. What do you notice about it? How many parts? What separates them?"',
                  duration: '3 min',
                  teacherNotes: 'Students should notice: 4 parts, separated by dots, all numbers.',
                },
                {
                  instruction: 'Explain the structure: "4 numbers, each 0-255, separated by dots. Each number is called an octet. It\'s like: Country.State.City.House"',
                  duration: '3 min',
                },
                {
                  instruction: 'Think-Pair-Share: "What do you think would happen if two devices had the same IP address?" Give 2 min to discuss, then share ideas.',
                  duration: '4 min',
                },
                {
                  instruction: 'Reveal: "It\'s called an IP conflict - data gets confused about where to go. We\'ll see this later in class."',
                },
              ],
              formativeAssessment: 'Can students explain why unique addresses are necessary in their own words?',
              differentiation: {
                support: 'Use a visual comparison chart: Home Address ↔ IP Address with side-by-side elements.',
                extension: 'Ask: "How many possible IP addresses exist?" (256^4 = ~4 billion). Why might this be a problem?',
              },
            },
            {
              title: 'Command Line: Find Your IP Address',
              duration: '25 minutes',
              overview: 'Students use command line tools to discover their own IP address, making the abstract concept concrete and personal.',
              steps: [
                {
                  instruction: 'Open command line on your demo computer. Windows: type "cmd" in Start menu. Mac: search "Terminal". Project your screen.',
                  duration: '2 min',
                },
                {
                  instruction: 'Type the command slowly: Windows: ipconfig | Mac/Linux: ifconfig or ip addr. Press Enter. Wait for the output.',
                  teacherNotes: 'Type slowly and explain each letter. Many students have never used command line before.',
                },
                {
                  instruction: 'Point to the output: "This is a lot of text! Don\'t panic. We\'re looking for ONE thing: IPv4 Address (Windows) or inet (Mac)."',
                  duration: '2 min',
                },
                {
                  instruction: 'Highlight your IP address in the output. "This is MY IP address on this network right now: 192.168.1.xxx"',
                },
                {
                  instruction: 'Distribute the Command Line Reference Card. Students open their command prompt/terminal.',
                  duration: '3 min',
                },
                {
                  instruction: 'Walk through the room as students run the command. Help those who get stuck. Have students write down their IP address.',
                  duration: '10 min',
                  teacherNotes: 'Common issues: typos in command, looking at wrong adapter (look for WiFi or Ethernet, not Bluetooth).',
                },
                {
                  instruction: 'Quick survey: "Raise your hand if your IP starts with 192.168..." Most should. Explain: this is a PRIVATE IP range.',
                  duration: '3 min',
                },
                {
                  instruction: 'Bonus: Have students visit whatismyip.com. "This shows your PUBLIC IP - the one the internet sees. Notice it\'s different!"',
                  duration: '3 min',
                },
              ],
              formativeAssessment: 'Every student should have their IP address written down. Check for correct format (4 octets).',
              differentiation: {
                support: 'Provide exact command on a card. Pair struggling students with successful ones.',
                extension: 'Have students find subnet mask and default gateway too. What do they think these are for?',
              },
            },
            {
              title: 'IP Address Validation Worksheet',
              duration: '20 minutes',
              overview: 'Students apply their understanding of IP address structure to identify valid and invalid addresses.',
              steps: [
                {
                  instruction: 'Review the rules on the board: (1) Four octets, (2) Each 0-255, (3) Separated by dots, (4) Numbers only.',
                  duration: '2 min',
                },
                {
                  instruction: 'Model an example: "Is 192.168.1.256 valid?" Walk through: First three octets OK... 256 > 255... INVALID!',
                  duration: '2 min',
                },
                {
                  instruction: 'Model another: "Is 10.0.0.1 valid?" All octets in range, four numbers, dots... VALID!',
                },
                {
                  instruction: 'Distribute worksheet. Part 1: Mark each address Valid or Invalid with explanation. Work independently for 8 minutes.',
                  duration: '8 min',
                  teacherNotes: 'Include tricky ones: 300.1.1.1 (invalid), 0.0.0.0 (valid), 192.168.1 (invalid - only 3), 192.168.1.1.1 (invalid - 5 parts).',
                },
                {
                  instruction: 'Review answers as a class. For each wrong answer, ask: "What rule did this break?"',
                  duration: '5 min',
                },
                {
                  instruction: 'Part 2: Private vs Public IP ranges. Show the chart: 10.x.x.x, 172.16-31.x.x, 192.168.x.x are private. Everything else is public.',
                  duration: '3 min',
                },
              ],
              formativeAssessment: 'Check worksheets for accuracy. Note which error types are most common.',
              differentiation: {
                support: 'Provide a checklist rubric for validation steps.',
                extension: 'Include IPv6 examples and ask students to research why IPv6 was created.',
              },
            },
            {
              title: 'IP Conflict Demonstration',
              duration: '25 minutes',
              overview: 'Students observe and understand what happens when two devices have the same IP address through a controlled experiment.',
              steps: [
                {
                  instruction: 'Set up: You need two computers on the same network. "We\'re going to break the network on purpose to see what happens."',
                  duration: '2 min',
                  teacherNotes: 'This is best done with teacher control. Students observe. Use devices that can be taken offline briefly.',
                },
                {
                  instruction: 'Show both computers working normally. Ping between them. Access a website on each. "Everything works because each has a unique IP."',
                  duration: '3 min',
                },
                {
                  instruction: 'On Computer B, manually set a STATIC IP address that is the SAME as Computer A. (Show students how in network settings.)',
                  duration: '5 min',
                  teacherNotes: 'Windows: Network Settings → Change adapter options → Properties → IPv4 → Use the following IP.',
                },
                {
                  instruction: 'Watch what happens. Try to ping Computer A. Try to access a website on both. What errors do you see?',
                  duration: '5 min',
                },
                {
                  instruction: 'Discuss observations: "What symptoms did you notice? Why did this happen?" (Data didn\'t know which computer to go to.)',
                  duration: '5 min',
                },
                {
                  instruction: 'Fix the problem: Change Computer B back to automatic (DHCP) or give it a different static IP. Verify both work again.',
                  duration: '3 min',
                },
                {
                  instruction: 'Debrief: "This is why DHCP exists - to automatically assign unique IPs. We\'ll learn about DHCP next lesson!"',
                  duration: '2 min',
                },
              ],
              formativeAssessment: 'Can students explain what causes an IP conflict and why it breaks network communication?',
              differentiation: {
                support: 'Provide a guided observation sheet with specific things to watch for.',
                extension: 'Research: How do networks detect and report IP conflicts automatically?',
              },
            },
          ],
          materials: ['Computers', 'Worksheet with IP exercises', 'Command line reference guide'],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Students choose to work on Windows, Mac, or Linux machines',
                'Option to pair with a partner or work independently on command line tasks',
                'Choice of analogy to explore: addresses like home addresses, phone numbers, or GPS coordinates',
              ],
              relevanceAndAuthenticity: [
                'Find your own device\'s IP address - "This is YOUR address on this network"',
                'Discuss: why do websites know your location? (IP geolocation)',
                'Real-world privacy: what your IP reveals about you',
              ],
              selfRegulation: [
                'Command line anxiety check-in: "It\'s normal if this feels weird at first"',
                'Pair struggling students with confident peers for support',
                'Celebrate small wins: "You found your IP! You just talked to your computer."',
              ],
            },
            representation: {
              multipleFormats: [
                'Visual address analogy with house/street/city/country = octet structure',
                'Physical number line showing 0-255 range for each octet',
                'Side-by-side command line output examples for different operating systems',
                'Animated visualization of IP conflict and resolution',
              ],
              vocabularySupport: [
                'Octet = 8 bits = one number in the address (0-255)',
                'Private vs Public visual chart with common ranges highlighted',
                'NAT explained with "receptionist" analogy - one public face, many internal lines',
              ],
              backgroundKnowledge: [
                'Review: devices need addresses like houses need addresses for mail delivery',
                'Binary preview: why computers think in 0s and 1s (optional deep dive)',
                'Connect to previous lesson: where in the network path does IP addressing happen?',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'Use pre-typed commands that can be copied rather than typed',
                'Voice-to-text option for written responses',
                'Partner typing for students with motor challenges',
              ],
              expressionOptions: [
                'Complete worksheet independently OR discuss answers verbally with teacher',
                'Explain IP addresses through drawing, writing, or recorded explanation',
                'Create flashcards for IP address ranges',
              ],
              executiveFunctionSupport: [
                'Command reference card with exact syntax for Windows/Mac/Linux',
                'Worksheet with fill-in-the-blank structure for complex questions',
                'Chunked activities with clear transitions between each',
              ],
            },
          },
        },
        {
          title: 'DHCP: Automatic Address Assignment',
          duration: '75 minutes',
          gradeBand: '6-8',
          conceptualUnderstanding: [
            'The four-step DHCP conversation: DISCOVER, OFFER, REQUEST, ACK—and what each message contains',
            'Why leases exist: the problem of devices joining and leaving networks, and how DHCP manages limited addresses',
            'What the DHCP server software is actually doing: maintaining a table of addresses and tracking assignments',
            'When and why you\'d want static IPs vs dynamic—the tradeoffs involved',
          ],
          objectives: [
            'Explain what DHCP is and why it exists',
            'Understand the DHCP lease process',
            'Configure DHCP settings on a router',
            'Compare static vs. dynamic IP assignment',
          ],
          activities: [
            'Scenario: "What if you had to manually configure every device?" discussion',
            'Router admin access: Navigate to DHCP settings',
            'Hands-on: View DHCP client list on router',
            'Experiment: Set a static IP on one device, observe DHCP on another',
          ],
          materials: ['Router with admin access', 'Multiple devices', 'Network diagram template'],
          detailedActivities: [
            {
              title: 'What If You Had To Configure Every Device?',
              duration: '15 minutes',
              overview: 'A scenario-based discussion that helps students understand the problem DHCP solves by imagining a world without automatic address assignment.',
              steps: [
                {
                  instruction: 'Set the scene by asking: "Imagine you\'re the IT person for a school with 500 students. Every student has a laptop, phone, and tablet. That\'s 1,500 devices. What happens when a new student joins?"',
                  duration: '2 min',
                  teacherNotes: 'Let students brainstorm the chaos - they\'ll quickly realize manual assignment doesn\'t scale'
                },
                {
                  instruction: 'Hand out scenario cards with situations: "Guest speaker brings laptop," "Student\'s phone dies, gets new one," "100 new Chromebooks arrive." Have pairs discuss: what would you need to track?',
                  duration: '4 min',
                  teacherNotes: 'Make physical cards or project scenarios. Emphasize the HUMAN time cost, not just technical complexity'
                },
                {
                  instruction: 'Create a class "manual IP ledger" on the board. Ask volunteers to add devices with names and IPs. Ask: "What happens if someone writes down the wrong IP? What if two people pick the same one?"',
                  duration: '4 min',
                  teacherNotes: 'Intentionally cause a conflict to demonstrate the problem'
                },
                {
                  instruction: 'Introduce DHCP as the automated solution. Write on board: "DHCP = a program that keeps the ledger automatically and never makes mistakes."',
                  duration: '2 min',
                  teacherNotes: 'Frame DHCP as solving a HUMAN problem, not just a technical one'
                },
                {
                  instruction: 'Quick prediction: "What information do you think DHCP needs to track for each device?" Collect answers on board.',
                  duration: '3 min',
                  teacherNotes: 'Students should identify: device ID (MAC), assigned IP, when it was assigned, when it expires'
                },
              ],
              formativeAssessment: 'Can students articulate why automatic address assignment is necessary? Do they understand the scaling problem?',
              differentiation: {
                support: 'Provide a visual comparison: "librarian manually writing checkout cards" vs "barcode scanner tracking automatically"',
                extension: 'Research: How many devices does a large university network handle? How many DHCP requests per second?'
              }
            },
            {
              title: 'The DORA Dance: Acting Out DHCP',
              duration: '20 minutes',
              overview: 'A kinesthetic activity where students physically act out the DHCP four-step handshake (Discover, Offer, Request, Acknowledge) to internalize the protocol.',
              steps: [
                {
                  instruction: 'Clear space in the room. Designate one area as "DHCP Server" (router) and the rest as "the network." Ask for 5 volunteer devices and 1 volunteer server.',
                  duration: '2 min',
                  teacherNotes: 'The server volunteer should be someone comfortable speaking up. Have a "pool" of IP address cards (192.168.1.100-105)'
                },
                {
                  instruction: 'DISCOVER step: New device student enters the network space and shouts "I NEED AN ADDRESS! CAN ANYONE HELP?" (broadcast). They don\'t know where the server is. All students point toward the server.',
                  duration: '3 min',
                  teacherNotes: 'Emphasize that Discover is a BROADCAST - the device doesn\'t know who will answer. That\'s why it\'s shouted to everyone.'
                },
                {
                  instruction: 'OFFER step: Server student holds up an IP card and says "I have 192.168.1.100 available! It\'s yours if you want it." Walk physically to the device.',
                  duration: '3 min',
                  teacherNotes: 'Point out the server is making an OFFER, not an assignment. The device hasn\'t accepted yet.'
                },
                {
                  instruction: 'REQUEST step: Device student reaches for the card and says "Yes! I want 192.168.1.100 please!" but doesn\'t take it yet.',
                  duration: '3 min',
                  teacherNotes: 'Why request when you could just take it? Because there might be multiple servers. This confirms which offer is accepted.'
                },
                {
                  instruction: 'ACK step: Server hands over the IP card and says "Confirmed! 192.168.1.100 is yours for 24 hours." Device holds up the card proudly.',
                  duration: '3 min',
                  teacherNotes: 'Emphasize the LEASE TIME. The device will need to renew before 24 hours or lose the address.'
                },
                {
                  instruction: 'Repeat with remaining volunteers so everyone sees the process multiple times. Then switch roles - previous devices become observers, new volunteers step in.',
                  duration: '6 min',
                  teacherNotes: 'With each repetition, have the class call out the step names: "DISCOVER! OFFER! REQUEST! ACK!"'
                },
              ],
              formativeAssessment: 'Have pairs recreate DORA at their desks using sticky notes. Each partner takes turns being device and server.',
              differentiation: {
                support: 'Create DORA cards with the step name and what to say. Students can read from the cards during the activity.',
                extension: 'Add complexity: What if the device\'s lease expires while it\'s still connected? Act out the renewal process (skip to REQUEST).'
              }
            },
            {
              title: 'Router Explorer: DHCP Settings Deep Dive',
              duration: '25 minutes',
              overview: 'Students access the router admin interface to find and understand DHCP settings, viewing the client list and understanding each configuration option.',
              steps: [
                {
                  instruction: 'Distribute the router admin guide handout showing login steps: 1) Connect to router WiFi, 2) Open browser to 192.168.1.1 (or router\'s gateway IP), 3) Enter admin credentials.',
                  duration: '3 min',
                  teacherNotes: 'Have credentials written on board or handout. Use a dedicated classroom router, not the school production network!'
                },
                {
                  instruction: 'Guide students to the DHCP settings page. Most routers: LAN Settings → DHCP. Have students screenshot or sketch the page layout.',
                  duration: '4 min',
                  teacherNotes: 'Router interfaces vary wildly. Show your specific router on projector while students follow along on their screens.'
                },
                {
                  instruction: 'Explore "DHCP Client List" - the live record of every device that has an address. For each entry, identify: Device name, MAC address, IP address, Lease time remaining.',
                  duration: '5 min',
                  teacherNotes: 'Ask: "Can you find your own device in the list? How did it know your device name?"'
                },
                {
                  instruction: 'Locate and discuss each DHCP setting: Enable/Disable toggle, IP Pool Start/End addresses, Lease Time, DNS server assignments. Create a labeled diagram.',
                  duration: '6 min',
                  teacherNotes: 'Have students annotate what each setting controls. "If pool is .100-.200, how many devices can connect?"'
                },
                {
                  instruction: 'Find "Address Reservation" or "Static DHCP" section. Explain: "This is how you give a specific device the same IP every time, while still using DHCP."',
                  duration: '4 min',
                  teacherNotes: 'Perfect for printers, servers, gaming consoles - devices that other things need to find reliably.'
                },
                {
                  instruction: 'Exit reflection: Each student writes one thing they found surprising about the DHCP settings and one question they still have.',
                  duration: '3 min',
                  teacherNotes: 'Collect these - they\'ll guide your review at the start of next lesson.'
                },
              ],
              formativeAssessment: 'Can students navigate to DHCP settings independently? Can they explain what the IP pool range means?',
              differentiation: {
                support: 'Provide annotated screenshots of each navigation step. Pair with a more confident student.',
                extension: 'Calculate: If lease time is 24 hours and you have 100 addresses in the pool, what\'s the maximum devices per day? When would this be a problem?'
              }
            },
            {
              title: 'Static vs Dynamic: The Great IP Experiment',
              duration: '25 minutes',
              overview: 'Students configure one device with a static IP and observe another using DHCP, comparing the setup process, benefits, and tradeoffs of each approach.',
              steps: [
                {
                  instruction: 'Split class into pairs. One device per pair will be "static team," the other "dynamic team." Explain: "We\'re going to see both approaches side by side."',
                  duration: '2 min',
                  teacherNotes: 'Ideally use a mix of Windows, Mac, and Chromebook so students see different interfaces'
                },
                {
                  instruction: 'DYNAMIC team: Go to network settings and confirm DHCP is enabled (usually "Obtain IP automatically"). Note the IP, subnet mask, gateway, and DNS currently assigned.',
                  duration: '4 min',
                  teacherNotes: 'This is the baseline - they\'re already using DHCP, just making it visible.'
                },
                {
                  instruction: 'STATIC team: Open network settings and switch from automatic to manual. Teacher provides the settings: IP (e.g., 192.168.1.50), Subnet (255.255.255.0), Gateway (192.168.1.1), DNS (8.8.8.8).',
                  duration: '6 min',
                  teacherNotes: 'Choose a static IP OUTSIDE the DHCP pool range to prevent conflicts. Walk through each field slowly.'
                },
                {
                  instruction: 'Both teams test: Can you browse the web? Can you ping the router (ping 192.168.1.1)? Can you ping each other? Record results.',
                  duration: '4 min',
                  teacherNotes: 'Both should work identically - this demonstrates that static and dynamic aren\'t about capability, just management.'
                },
                {
                  instruction: 'Experiment: Have STATIC team disconnect from WiFi and reconnect. Have DYNAMIC team do the same. Compare: Who keeps their IP? Who might get a new one?',
                  duration: '4 min',
                  teacherNotes: 'Static keeps same IP always. Dynamic usually keeps same (lease renewal) but COULD change if pool is contested.'
                },
                {
                  instruction: 'Discussion: When would you WANT a static IP? When is dynamic better? Create a two-column chart with class input.',
                  duration: '3 min',
                  teacherNotes: 'Static: servers, printers, devices others need to find. Dynamic: laptops, phones, guests, any device that moves between networks.'
                },
                {
                  instruction: 'STATIC team: Return your device to DHCP ("Obtain automatically"). Verify it works. Discuss: Why don\'t we leave it static?',
                  duration: '2 min',
                  teacherNotes: 'If students move to another network, their static IP won\'t work there! DHCP adapts automatically.'
                },
              ],
              formativeAssessment: 'Can students explain why a printer should have a static/reserved IP but a student laptop should use DHCP?',
              differentiation: {
                support: 'Provide step-by-step screenshots for both Windows and Mac static IP configuration. Work in trios instead of pairs.',
                extension: 'Research DHCP reservations - how is this different from setting static on the device itself? Which is easier to manage at scale?'
              }
            },
          ],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Students choose: explore DHCP settings first or understand the concept first',
                'Option to be the "teacher" explaining DORA to a partner',
                'Choice of which device to set up with static IP',
              ],
              relevanceAndAuthenticity: [
                'Scenario: Your printer keeps changing IP and you can\'t print - DHCP reservation solves this!',
                'Real admin task: viewing the DHCP client list shows all devices on your network',
                'Privacy angle: your device name appears in the router - what does it reveal?',
              ],
              selfRegulation: [
                'Router admin can feel powerful/scary - normalize caution and curiosity together',
                'Progress tracking: check off each DORA step as you observe it',
                'Pair experienced students with newcomers for router navigation',
              ],
            },
            representation: {
              multipleFormats: [
                'DORA dance: physical simulation where students act out Discover-Offer-Request-Acknowledge',
                'Animated video showing DHCP conversation with speech bubbles',
                'Router interface screenshots with highlighted areas',
                'Flowchart of DHCP process for visual learners',
              ],
              vocabularySupport: [
                'DORA acronym visual: Discover, Offer, Request, Acknowledge',
                'Lease = temporary rental of an address, with expiration date',
                'Static vs Dynamic comparison chart with pros/cons',
              ],
              backgroundKnowledge: [
                'Review: every device needs an IP, but who assigns it?',
                'Connect to previous lesson: DHCP automates what we did manually with ipconfig',
                'Real-world parallel: DHCP is like a hotel front desk assigning rooms',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'DORA role-play with students moving around room',
                'Touch-screen or mouse navigation of router interface',
                'Partner work where one person navigates, other documents',
              ],
              expressionOptions: [
                'Explain DHCP through a written story, diagram, or verbal walk-through',
                'Screenshot and annotate the router DHCP page',
                'Create a "DHCP troubleshooting guide" for future reference',
              ],
              executiveFunctionSupport: [
                'Step-by-step router navigation guide with screenshots',
                'DHCP client list template to record what you find',
                'Checklist: What to look for in DHCP settings',
              ],
            },
          },
        },
        {
          title: 'Building Your Network: Hands-On Setup',
          duration: '120 minutes',
          gradeBand: '6-8',
          conceptualUnderstanding: [
            'Why each security setting matters: what WPA2/WPA3 actually encrypts and how, why WPS is a vulnerability',
            'What the router firmware is doing when you change settings—config files, services restarting',
            'How wireless signals work: frequencies, channels, interference—why your network might be slow',
            'What happens at each step when a new device connects: the full authentication and IP assignment process',
          ],
          objectives: [
            'Physically set up a complete local network from scratch',
            'Configure router security settings (password, encryption)',
            'Connect multiple devices via wired and wireless connections',
            'Verify connectivity between all devices',
          ],
          activities: [
            'Reset router to factory settings (clean start)',
            'Initial setup wizard: Configure SSID, password, admin credentials',
            'Security configuration: Enable WPA3/WPA2, disable WPS',
            'Connect devices: At least 2 wired, 2 wireless',
            'Connectivity test: Ping between devices',
          ],
          materials: ['Router', 'Ethernet cables', '4+ devices', 'Setup checklist'],
          detailedActivities: [
            {
              title: 'Factory Reset: A Clean Start',
              duration: '15 minutes',
              overview: 'Students reset their router to factory defaults, learning why starting fresh prevents inherited misconfigurations and understanding what the reset actually erases.',
              steps: [
                {
                  instruction: 'Examine your router together. Find the reset button (usually recessed, needs paperclip). Do NOT press it yet. Ask: "Why might we want to erase all settings and start over?"',
                  duration: '2 min',
                  teacherNotes: 'Discuss: previous passwords/settings unknown, security best practice, learning purposes. Emphasize this erases EVERYTHING.'
                },
                {
                  instruction: 'Before resetting, document current settings: Write down the router model, current IP address (on label), and default credentials (usually on label or in manual).',
                  duration: '3 min',
                  teacherNotes: 'This teaches the habit of documenting BEFORE making changes. Professional network admins always do this.'
                },
                {
                  instruction: 'Perform the factory reset: Insert paperclip into reset hole, hold for 10-15 seconds (per your router\'s instructions). Watch for lights to flash indicating reset.',
                  duration: '2 min',
                  teacherNotes: 'Count out loud together: "1... 2... 3..." This builds patience and ensures they hold long enough.'
                },
                {
                  instruction: 'Wait for the router to reboot fully (1-3 minutes). Lights will cycle through startup sequence. Ask students: "What is the router doing right now?"',
                  duration: '3 min',
                  teacherNotes: 'Loading operating system, initializing hardware, starting network services. It\'s a small computer!'
                },
                {
                  instruction: 'Verify reset was successful: Connect to the router\'s default WiFi network (name on label). Open browser and go to the default gateway IP. You should see the setup wizard.',
                  duration: '3 min',
                  teacherNotes: 'If default network doesn\'t appear, the reset may not have worked. Try again, holding longer.'
                },
                {
                  instruction: 'Discussion: "What are the risks of NOT resetting a used router before deployment?" Record answers.',
                  duration: '2 min',
                  teacherNotes: 'Previous owner\'s passwords, unknown port forwards, possible malware, outdated firmware'
                },
              ],
              formativeAssessment: 'Can students explain what the factory reset erased and why starting clean is a security best practice?',
              differentiation: {
                support: 'Provide a labeled diagram showing where the reset button typically is on various router models.',
                extension: 'Research: What data persists even after factory reset? (Answer: usually nothing - but firmware version stays the same)'
              }
            },
            {
              title: 'Initial Setup Wizard: Your Network Identity',
              duration: '25 minutes',
              overview: 'Walk through the router\'s setup wizard step-by-step, making intentional choices about network name, passwords, and admin credentials.',
              steps: [
                {
                  instruction: 'Open the router admin page (usually 192.168.1.1 or 192.168.0.1). The setup wizard should launch automatically. If not, look for "Setup" or "Quick Setup" menu.',
                  duration: '2 min',
                  teacherNotes: 'If wizard doesn\'t appear, you may need to manually configure. Check router documentation.'
                },
                {
                  instruction: 'SSID (Network Name): Choose a name for your network. Discuss: Should you use your real name? Your address? Something funny? What does the SSID reveal about you?',
                  duration: '4 min',
                  teacherNotes: 'Privacy angle: "FBI_Surveillance_Van" is funny but "Johnson_Family_5G" tells everyone who lives there. Balance privacy with findability.'
                },
                {
                  instruction: 'WiFi Password: Create a strong password using the 3-random-words method (e.g., "bicycle-telescope-mango"). Type it, record it on paper, and save it somewhere safe.',
                  duration: '4 min',
                  teacherNotes: 'Explain: Passwords need to be typed on phone keyboards, so avoid special characters that are hard to find. Length > complexity.'
                },
                {
                  instruction: 'Admin Password (separate from WiFi password): Create a DIFFERENT strong password for router administration. Explain: "Anyone with this password controls your entire network."',
                  duration: '4 min',
                  teacherNotes: 'Critical security concept: WiFi password gets guests online, Admin password gives complete control. Never share admin password.'
                },
                {
                  instruction: 'Time Zone and Updates: Set correct time zone (needed for accurate logs). Check for firmware updates and install if available.',
                  duration: '5 min',
                  teacherNotes: 'Firmware updates patch security holes. This is like updating your phone - you want the latest security fixes.'
                },
                {
                  instruction: 'Review settings before clicking "Finish" or "Apply". The router will likely reboot. You\'ll need to reconnect using your NEW WiFi name and password.',
                  duration: '4 min',
                  teacherNotes: 'Common mistake: forgetting the new password! Make sure it\'s written down before applying.'
                },
                {
                  instruction: 'Verify: Connect to your new network. Can you reach the internet (try a website)? Can you log into admin panel with your new admin password?',
                  duration: '2 min',
                  teacherNotes: 'Both should work. If not, something went wrong in configuration.'
                },
              ],
              formativeAssessment: 'Can students explain why WiFi password and admin password should be different? Can they articulate what information their SSID reveals?',
              differentiation: {
                support: 'Provide pre-generated passwords using the 3-word method that students can choose from.',
                extension: 'Research: What\'s the difference between 2.4GHz and 5GHz SSIDs? Should they have the same or different names?'
              }
            },
            {
              title: 'Security Configuration: Locking Down Your Network',
              duration: '20 minutes',
              overview: 'Configure advanced security settings beyond the basic wizard, understanding why each setting matters for protecting your network.',
              steps: [
                {
                  instruction: 'Navigate to wireless security settings. Find the encryption type selector. Options typically include: Open (no password), WEP, WPA, WPA2, WPA3. Which is best?',
                  duration: '3 min',
                  teacherNotes: 'WPA3 is best, WPA2 is good. WEP is crackable in minutes. Open = anyone can join. Never use WEP or Open.'
                },
                {
                  instruction: 'Set encryption to WPA3 if available, otherwise WPA2. Explain: "Encryption scrambles all data between your device and router. Without it, anyone nearby can read your traffic."',
                  duration: '3 min',
                  teacherNotes: 'If devices don\'t support WPA3, use WPA2. Some routers offer "WPA2/WPA3 mixed mode" for compatibility.'
                },
                {
                  instruction: 'Find and DISABLE WPS (Wi-Fi Protected Setup). This is the button that lets devices connect without typing a password. Explain the vulnerability.',
                  duration: '4 min',
                  teacherNotes: 'WPS PIN can be brute-forced in hours. It\'s convenient but a major security hole. Always disable.'
                },
                {
                  instruction: 'Find "Remote Management" or "Remote Administration" and DISABLE it. Explain: "This would let someone on the internet access your router settings."',
                  duration: '3 min',
                  teacherNotes: 'Remote management is rarely needed for home networks. Keep your attack surface minimal.'
                },
                {
                  instruction: 'Review firewall settings. Confirm the firewall is ENABLED (usually is by default). Don\'t change specific rules yet - just verify it\'s on.',
                  duration: '3 min',
                  teacherNotes: 'The firewall blocks unsolicited incoming connections. It\'s your first line of defense.'
                },
                {
                  instruction: 'Create a security checklist together: What we enabled, what we disabled, and why. Post it near the router as a reference.',
                  duration: '4 min',
                  teacherNotes: 'This documentation habit is valuable. If something changes, you can compare to known-good state.'
                },
              ],
              formativeAssessment: 'Have students rate the security of different fictional network setups (Open vs WEP vs WPA2 + WPS enabled vs WPA3 + WPS disabled).',
              differentiation: {
                support: 'Provide a simple "Security Settings Scorecard" with checkboxes: Encryption [WPA2/3], WPS [Disabled], Remote Admin [Disabled].',
                extension: 'Research: How does WPA3 improve on WPA2? What\'s the KRACK attack and why doesn\'t it work on WPA3?'
              }
            },
            {
              title: 'Connect Your Devices: Wired and Wireless',
              duration: '30 minutes',
              overview: 'Connect multiple devices using both Ethernet cables and WiFi, understanding the tradeoffs between wired and wireless connections.',
              steps: [
                {
                  instruction: 'Identify the router\'s LAN ports (usually 4 ports, often yellow). These are for devices. Don\'t confuse with the WAN port (usually 1 port, often blue) - that\'s for internet.',
                  duration: '2 min',
                  teacherNotes: 'Common mistake: plugging computer into WAN port. It won\'t work! WAN = internet connection only.'
                },
                {
                  instruction: 'Connect Device 1 via Ethernet: Plug cable from router LAN port to computer. Check the computer\'s network settings - it should get an IP via DHCP automatically.',
                  duration: '4 min',
                  teacherNotes: 'Look for the IP assignment. Should be something like 192.168.1.x. If it\'s 169.254.x.x, DHCP isn\'t working.'
                },
                {
                  instruction: 'Connect Device 2 via Ethernet: Same process. Note the assigned IP address. It should be different from Device 1.',
                  duration: '3 min',
                  teacherNotes: 'Two wired devices now have IPs. They can already communicate with each other!'
                },
                {
                  instruction: 'Connect Device 3 via WiFi: On a phone or laptop, find your SSID in the WiFi list. Enter your password. Check that it gets an IP address.',
                  duration: '4 min',
                  teacherNotes: 'Compare the IP to the wired devices. Same range? That confirms it\'s on the same network.'
                },
                {
                  instruction: 'Connect Device 4 via WiFi: Repeat the process. Now you have 4 devices connected - 2 wired, 2 wireless.',
                  duration: '3 min',
                  teacherNotes: 'If you have more devices, connect more! The more the merrier for the connectivity test.'
                },
                {
                  instruction: 'Check the router\'s DHCP client list. Can you see all 4 devices listed? Match the IPs to your devices. Which is which?',
                  duration: '4 min',
                  teacherNotes: 'Device names might be cryptic (like "android-abc123"). Try renaming them in router for clarity.'
                },
                {
                  instruction: 'Discuss tradeoffs: Wired (faster, more stable, more secure) vs Wireless (convenient, mobile, limited by walls/distance). When would you choose each?',
                  duration: '5 min',
                  teacherNotes: 'Gaming PCs & work desktops = wired. Phones & laptops = wireless. Servers = definitely wired.'
                },
                {
                  instruction: 'Draw a network diagram showing all connected devices, their IP addresses, and connection types (solid line for wired, dashed for wireless).',
                  duration: '5 min',
                  teacherNotes: 'This documentation will be useful for the troubleshooting lesson. Keep these diagrams!'
                },
              ],
              formativeAssessment: 'Can students identify all connected devices in the DHCP list? Can they explain when wired vs wireless is preferable?',
              differentiation: {
                support: 'Provide a partially completed network diagram template for students to fill in.',
                extension: 'Set up a device with a static IP (outside DHCP range) and observe it doesn\'t appear in DHCP list but still works. Why?'
              }
            },
            {
              title: 'Connectivity Test: Can Everyone Communicate?',
              duration: '30 minutes',
              overview: 'Verify that all devices can communicate with each other using ping and file sharing tests, celebrating a fully functional network.',
              steps: [
                {
                  instruction: 'Gather all IP addresses from your network diagram. Each device should know its own IP. Create a matrix on the board: Device A can reach Device B, C, D?',
                  duration: '3 min',
                  teacherNotes: 'This matrix visualization helps students see the testing is systematic, not random.'
                },
                {
                  instruction: 'From Device 1 (wired), ping the router gateway (usually 192.168.1.1): "ping 192.168.1.1". Should get responses. This confirms Device 1 can reach the router.',
                  duration: '3 min',
                  teacherNotes: 'If ping fails here, check the cable connection and IP settings.'
                },
                {
                  instruction: 'From Device 1, ping Device 2 (wired): "ping 192.168.1.x". This tests wired-to-wired communication. Record success or failure.',
                  duration: '3 min',
                  teacherNotes: 'Both wired devices going through the same router switch should have no issues.'
                },
                {
                  instruction: 'From Device 1 (wired), ping Device 3 (wireless): This tests wired-to-wireless communication. The router is bridging between ethernet and WiFi.',
                  duration: '3 min',
                  teacherNotes: 'If this fails but wired-to-wired works, check if AP isolation is enabled (blocks WiFi devices from seeing each other).'
                },
                {
                  instruction: 'From Device 3 (wireless), ping Device 4 (wireless): Tests wireless-to-wireless. Both on the same WiFi network, going through the router.',
                  duration: '3 min',
                  teacherNotes: 'Again, AP isolation could cause issues here. Disable it if connectivity testing is the goal.'
                },
                {
                  instruction: 'From any device, ping an internet address: "ping 8.8.8.8" (Google DNS). This confirms internet connectivity is working.',
                  duration: '3 min',
                  teacherNotes: 'If local pings work but internet doesn\'t, check the WAN port connection to your modem/uplink.'
                },
                {
                  instruction: 'Optional challenge: Try accessing a shared folder. On Windows, share a folder and have another device browse to \\\\192.168.1.x. This tests more than just ICMP.',
                  duration: '7 min',
                  teacherNotes: 'File sharing tests TCP connections and SMB protocol. Firewalls might block this initially.'
                },
                {
                  instruction: 'Celebration! If all pings succeed, you\'ve built a working network from scratch. Take a group photo with your network hardware. Document what you accomplished.',
                  duration: '5 min',
                  teacherNotes: 'This is a real accomplishment! Many adults can\'t do this. Make it feel like a milestone.'
                },
              ],
              formativeAssessment: 'Complete connectivity matrix: can every device reach every other device? Can all devices reach the internet?',
              differentiation: {
                support: 'Provide a ping command reference card and pre-made connectivity matrix to fill in.',
                extension: 'Use traceroute instead of ping to see the path packets take. How many hops to reach 8.8.8.8?'
              }
            },
          ],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Students choose their network name (SSID) - personal or creative',
                'Divide roles: project manager, cable runner, device connector, security lead',
                'Choice of which devices to connect and test',
              ],
              relevanceAndAuthenticity: [
                'This is a skill you can use at home - set up networks for family/community',
                'Strong passwords = protecting your family from hackers',
                'Understanding security settings helps avoid scams and vulnerabilities',
              ],
              selfRegulation: [
                'Longer activity: build in stretch breaks and progress celebrations',
                'Frustration protocol: if stuck for 5 min, ask a peer, then ask teacher',
                'Reflection moments: "What worked? What was tricky?"',
              ],
            },
            representation: {
              multipleFormats: [
                'Video walkthrough of router setup wizard',
                'Physical demonstration by instructor',
                'Printed checklist with visual icons',
                'Screenshot examples of each settings screen',
              ],
              vocabularySupport: [
                'SSID = network name that appears on your phone/computer',
                'WPA2/WPA3 = encryption that scrambles your data',
                'WPS = easy connect button (convenient but hackable)',
              ],
              backgroundKnowledge: [
                'Review: router, DHCP, IP addresses all coming together now',
                'Preview what success looks like: all devices connected and can ping each other',
                'Recall the packet journey - now you\'re building the path',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'Cable running is active physical work',
                'Partner roles: one handles hardware, one handles software config',
                'Seated option for those who need it with device configuration role',
              ],
              expressionOptions: [
                'Document progress with photos, written log, or video narration',
                'Create a "setup guide" for someone else to follow',
                'Draw the final network diagram with all connections',
              ],
              executiveFunctionSupport: [
                'Multi-step checklist with check boxes for each task',
                'Timer for each major phase of setup',
                'Template for recording settings (write down SSID/password)',
              ],
            },
          },
        },
        {
          title: 'Network Troubleshooting: When Things Go Wrong',
          duration: '90 minutes',
          gradeBand: '6-8',
          conceptualUnderstanding: [
            'What ping actually does: sending ICMP packets and measuring round-trip time—and what each response means',
            'How traceroute reveals the network path: why packets have TTL and how routers respond when it expires',
            'The OSI/TCP-IP layers as a troubleshooting framework: which layer is broken when you see specific symptoms',
            'Why "turn it off and on again" often works: what state gets reset and why software/hardware gets into bad states',
          ],
          objectives: [
            'Use ping to test network connectivity',
            'Interpret common network error messages',
            'Follow a systematic troubleshooting methodology',
            'Document and resolve common network issues',
          ],
          activities: [
            'Tool introduction: ping, traceroute, ipconfig/ifconfig',
            'Troubleshooting scenarios: Instructor creates problems, students diagnose',
            'Flowchart creation: Build a "Network Not Working" decision tree',
            'Peer teaching: Students explain their troubleshooting process to each other',
          ],
          materials: ['Computers', 'Pre-created network problems', 'Troubleshooting flowchart template'],
          detailedActivities: [
            {
              title: 'The Network Detective Toolkit',
              duration: '25 minutes',
              overview: 'Introduction to essential network diagnostic commands: ping, traceroute, and ipconfig/ifconfig. Students learn what each tool reveals and when to use it.',
              steps: [
                {
                  instruction: 'Frame the lesson: "When the network breaks, we don\'t guess randomly. We use detective tools to gather clues systematically. Today you\'ll learn three essential tools."',
                  duration: '2 min',
                  teacherNotes: 'Emphasize: professional network admins use these exact same tools. Students are learning real skills.'
                },
                {
                  instruction: 'PING - "Are you there?" Open terminal/command prompt. Type: ping 8.8.8.8 - Watch the responses. What information do you see? (time, TTL, success/failure)',
                  duration: '5 min',
                  teacherNotes: 'Point out each part: Reply from, time in ms, TTL. Ask: "What would NO response mean?"'
                },
                {
                  instruction: 'Try ping variations: ping google.com (uses DNS), ping localhost (tests your own network stack), ping 192.168.1.1 (tests router). What does each tell you?',
                  duration: '5 min',
                  teacherNotes: 'Build diagnostic logic: if 8.8.8.8 works but google.com fails, DNS is the problem. If neither works, connection is down.'
                },
                {
                  instruction: 'TRACEROUTE (tracert on Windows): traceroute 8.8.8.8 - Watch the hops appear. Each line is a router your packets passed through. Count them!',
                  duration: '5 min',
                  teacherNotes: 'Explain: This shows the PATH, not just the destination. If a hop shows * * *, that router didn\'t respond (firewall or timeout).'
                },
                {
                  instruction: 'IPCONFIG (ifconfig on Mac/Linux): ipconfig /all - Find your IP address, subnet mask, gateway, and DNS servers. Circle the most important: gateway IP.',
                  duration: '5 min',
                  teacherNotes: 'The gateway is your first hop - your router. If you can\'t reach the gateway, you\'re completely disconnected locally.'
                },
                {
                  instruction: 'Create a "Tool Reference Card": Students make an index card with each command and what it tests. Ping = reachability. Traceroute = path. Ipconfig = my settings.',
                  duration: '3 min',
                  teacherNotes: 'Physical reference cards are valuable. Students can keep these beyond the class.'
                },
              ],
              formativeAssessment: 'Can students explain when to use ping vs traceroute vs ipconfig? What question does each tool answer?',
              differentiation: {
                support: 'Pre-made command reference cards. Pair with student comfortable with command line.',
                extension: 'Research: What is nslookup? What does it test that ping doesn\'t? Try it and explain the output.'
              }
            },
            {
              title: 'The Great Network Break: Troubleshooting Scenarios',
              duration: '30 minutes',
              overview: 'The instructor secretly creates network problems on classroom equipment. Students work in teams to diagnose and fix the issues using their new tools.',
              steps: [
                {
                  instruction: 'Explain the challenge: "I have secretly broken 4 different things on different stations. Your job is to figure out what\'s wrong and fix it. You have 25 minutes total."',
                  duration: '2 min',
                  teacherNotes: 'Prepare breaks in advance: unplugged cable, wrong DNS, static IP conflict, disabled WiFi. Label stations A-D.'
                },
                {
                  instruction: 'Divide into 4 teams. Each team starts at a different station. You have 6 minutes per station before rotating. Document every clue you find!',
                  duration: '1 min',
                  teacherNotes: 'Give each team a clipboard with a troubleshooting log: Station, Symptoms, Tools Used, Diagnosis, Fix'
                },
                {
                  instruction: 'Station A (Cable Problem): The ethernet cable is unplugged or loose. Students should check physical connections and see "No network connection" or 169.254.x.x IP.',
                  duration: '6 min',
                  teacherNotes: 'This teaches: ALWAYS check physical layer first. Ping will fail entirely. No IP or APIPA address.'
                },
                {
                  instruction: 'Station B (DNS Problem): Set DNS to 1.1.1.1 (wrong) or invalid IP. Ping 8.8.8.8 works but ping google.com fails. "DNS cannot resolve."',
                  duration: '6 min',
                  teacherNotes: 'This teaches: if IPs work but names don\'t, DNS is broken. Fix by changing DNS settings.'
                },
                {
                  instruction: 'Station C (IP Conflict): Set a static IP that conflicts with another device. Windows shows "IP conflict detected" or intermittent connectivity.',
                  duration: '6 min',
                  teacherNotes: 'This teaches: duplicate IPs cause chaos. Fix by switching to DHCP or choosing different static IP.'
                },
                {
                  instruction: 'Station D (WiFi Disabled): Turn off WiFi adapter or enter wrong password. No connection at all. Students should check adapter status.',
                  duration: '6 min',
                  teacherNotes: 'This teaches: check the obvious first. Is WiFi on? Is password correct? Basic but crucial.'
                },
                {
                  instruction: 'Debrief: Each team presents one problem they solved. What were the symptoms? What clue revealed the answer? What was the fix?',
                  duration: '5 min',
                  teacherNotes: 'Celebrate good diagnostic reasoning, even if teams didn\'t fully fix the issue.'
                },
              ],
              formativeAssessment: 'Troubleshooting log: Did teams correctly identify the problem? Did they use appropriate diagnostic tools?',
              differentiation: {
                support: 'Provide a hint card at each station (e.g., "Check the network settings dialog" for IP conflict station).',
                extension: 'Create a 5th problem for advanced students: wrong subnet mask causing partial connectivity.'
              }
            },
            {
              title: 'Build Your Troubleshooting Flowchart',
              duration: '20 minutes',
              overview: 'Students create a decision-tree flowchart for "Network Not Working" that they can use in the future, synthesizing everything learned.',
              steps: [
                {
                  instruction: 'Introduce decision trees: "A flowchart asks yes/no questions that lead you to the answer. Let\'s build one for network troubleshooting together."',
                  duration: '2 min',
                  teacherNotes: 'Show a simple example first: "Is it plugged in? Yes/No" - this models the thinking.'
                },
                {
                  instruction: 'Start with the entry point: "Network Not Working" at the top. First question: "Are cables connected and lights on?" (Physical layer check)',
                  duration: '3 min',
                  teacherNotes: 'Draw on board as class participates. If No → Fix physical connection. If Yes → continue.'
                },
                {
                  instruction: 'Second question: "Can you ping the gateway (router)?" If No → local network issue (wrong IP settings). If Yes → continue.',
                  duration: '3 min',
                  teacherNotes: 'This tests local network connectivity before going further.'
                },
                {
                  instruction: 'Third question: "Can you ping 8.8.8.8?" If No → internet connection issue (check modem, ISP). If Yes → continue.',
                  duration: '3 min',
                  teacherNotes: 'If gateway works but 8.8.8.8 doesn\'t, the router\'s uplink is the problem.'
                },
                {
                  instruction: 'Fourth question: "Can you ping google.com?" If No → DNS issue. If Yes → Network is actually working! Maybe the specific site is down.',
                  duration: '3 min',
                  teacherNotes: 'This completes the basic tree. Most network issues are caught by these 4 questions.'
                },
                {
                  instruction: 'Students create their own personal flowchart. They can follow the class example or customize it. Add color coding, icons, or additional branches.',
                  duration: '6 min',
                  teacherNotes: 'Provide blank flowchart templates with decision diamonds and action boxes.'
                },
              ],
              formativeAssessment: 'Does the flowchart logically progress from physical to DNS layer? Are the yes/no paths correctly resolved?',
              differentiation: {
                support: 'Provide a partially completed flowchart template with some boxes pre-filled.',
                extension: 'Add branches for "WiFi not working" (different from wired) and "Slow but connected" (different from completely down).'
              }
            },
            {
              title: 'Teach-Back: Explain Your Process',
              duration: '15 minutes',
              overview: 'Students pair up and teach each other how to troubleshoot a network problem, reinforcing learning through explanation.',
              steps: [
                {
                  instruction: 'Pair up students. Person A is the "Tech" who just fixed a problem. Person B is the "User" who needs to understand what was wrong.',
                  duration: '1 min',
                  teacherNotes: 'Assign pairs intentionally - mix experience levels for peer learning.'
                },
                {
                  instruction: 'Person A chooses one of today\'s scenarios (cable, DNS, IP conflict, WiFi). They explain: What were the symptoms? How did you diagnose it? What was the fix?',
                  duration: '4 min',
                  teacherNotes: 'Encourage the "User" to ask questions: "But how did you KNOW it was the cable?"'
                },
                {
                  instruction: 'Switch roles. Person B now explains a different scenario. Person A asks clarifying questions.',
                  duration: '4 min',
                  teacherNotes: 'Both partners should explain a scenario so both get practice teaching.'
                },
                {
                  instruction: 'Group reflection: "What was the hardest part to explain? What question from your partner made you think harder about the problem?"',
                  duration: '3 min',
                  teacherNotes: 'Teaching reveals gaps in understanding. Celebrate the insights gained from trying to explain.'
                },
                {
                  instruction: 'Exit ticket: Each student writes one troubleshooting tip they\'d give to a friend whose internet isn\'t working.',
                  duration: '3 min',
                  teacherNotes: 'Collect these - they\'ll show you what stuck with students and what needs review.'
                },
              ],
              formativeAssessment: 'Can students clearly explain a troubleshooting process? Can they answer follow-up questions about their reasoning?',
              differentiation: {
                support: 'Provide a structured template: "The symptom was... I tested... I found... I fixed it by..."',
                extension: 'Record a 60-second "Tech Support Tutorial" video explaining how to diagnose one problem.'
              }
            },
          ],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Students choose which troubleshooting scenario to tackle first',
                'Option to work solo (detective) or in pairs (discussion partner)',
                'Design your own troubleshooting flowchart layout',
              ],
              relevanceAndAuthenticity: [
                '"My internet isn\'t working!" - the most common tech support call, now you can solve it',
                'Troubleshooting skills transfer to all technology, not just networks',
                'Community value: be the person who can help when things break',
              ],
              selfRegulation: [
                'Normalize frustration: "Breaking things to learn is part of the process"',
                'Celebrate the process: "Great hypothesis, even if that wasn\'t the problem!"',
                'Model thinking aloud: instructor demonstrates troubleshooting mindset',
              ],
            },
            representation: {
              multipleFormats: [
                'Live demonstration of ping and traceroute output',
                'Annotated screenshots of common error messages',
                'Decision tree flowchart visual',
                'Video of real troubleshooting process',
              ],
              vocabularySupport: [
                'Ping = "Are you there?" message to a computer',
                'TTL = packet lifespan counter, prevents infinite loops',
                'Common error translation guide: "Request timed out" = no response',
              ],
              backgroundKnowledge: [
                'Review all previous concepts: this lesson uses everything learned so far',
                'The troubleshooting mindset: systematic not random guessing',
                'Layer model as diagnostic tool: start at physical, work up',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'Use copy/paste for commands to reduce typing errors',
                'Hands-on cable checking (is it plugged in?) for kinesthetic learners',
                'Movement break: trace the physical network path',
              ],
              expressionOptions: [
                'Verbal walk-through of troubleshooting logic',
                'Written troubleshooting report documenting the process',
                'Create a video tutorial of solving one problem',
              ],
              executiveFunctionSupport: [
                'Troubleshooting checklist: systematic steps to follow',
                'Flowchart template with decision boxes pre-drawn',
                'Timer for each scenario to maintain focus',
              ],
            },
          },
        },
        {
          title: 'Project Showcase & Reflection',
          duration: '60 minutes',
          gradeBand: '6-8',
          conceptualUnderstanding: [
            'How their small network mirrors the structure of the entire internet—same protocols, same principles',
            'What ISPs actually provide vs what you could theoretically do yourself',
            'The relationship between understanding technology and having power over it—why this knowledge matters for communities',
          ],
          objectives: [
            'Document their network setup with a diagram',
            'Present their network to the class',
            'Reflect on what they learned and how it connects to larger internet infrastructure',
          ],
          activities: [
            'Create network documentation: Diagram + written description',
            'Gallery walk: Students view each other\'s network setups',
            'Presentations: Each group explains their network and one interesting thing they learned',
            'Discussion: How does this connect to community networks?',
          ],
          materials: ['Paper/digital drawing tools', 'Presentation materials', 'Reflection worksheet'],
          detailedActivities: [
            {
              title: 'Network Documentation: Tell Your Story',
              duration: '20 minutes',
              overview: 'Students create comprehensive documentation of their network including diagrams, configuration details, and narrative description of what they built.',
              steps: [
                {
                  instruction: 'Distribute documentation templates with sections: Network Diagram, Device List, Configuration Summary, and "How We Built It" narrative.',
                  duration: '2 min',
                  teacherNotes: 'Provide both paper and digital options. Some students prefer drawing by hand, others digital tools.'
                },
                {
                  instruction: 'Network Diagram section: Draw your network topology. Include: router, all connected devices, connection types (wired = solid line, wireless = dashed), IP addresses.',
                  duration: '8 min',
                  teacherNotes: 'Show example diagrams ranging from simple to detailed. All are valid. Focus on clarity over artistic perfection.'
                },
                {
                  instruction: 'Device List: Create a table with: Device Name, MAC Address, IP Address, Connection Type (wired/wireless), Purpose (what does it do on your network?).',
                  duration: '4 min',
                  teacherNotes: 'This is professional documentation practice. Network admins maintain these records for real networks.'
                },
                {
                  instruction: 'Configuration Summary: List key settings you chose. SSID name, security type (WPA2/3), DHCP range, any special configurations like port forwards or reserved IPs.',
                  duration: '3 min',
                  teacherNotes: 'This tests recall of what was configured and why.'
                },
                {
                  instruction: '"How We Built It" narrative: Write 3-5 sentences describing the process. What order did you do things? What challenges did you face? What did you learn?',
                  duration: '3 min',
                  teacherNotes: 'Narrative reflection captures learning beyond technical details. Encourage honesty about struggles.'
                },
              ],
              formativeAssessment: 'Is the documentation complete enough that someone else could understand and reproduce the network setup?',
              differentiation: {
                support: 'Provide a heavily scaffolded template with example entries to model what goes in each section.',
                extension: 'Add a "Future Improvements" section: What would you add or change if you had more time/resources?'
              }
            },
            {
              title: 'Gallery Walk: Appreciating Each Other\'s Work',
              duration: '15 minutes',
              overview: 'Students post their network documentation around the room and walk around viewing each other\'s networks, leaving constructive feedback.',
              steps: [
                {
                  instruction: 'Post documentation on walls or tables around the room. Each station should have the team\'s documentation visible and a feedback sheet.',
                  duration: '2 min',
                  teacherNotes: 'Space stations apart so traffic flows smoothly. Label each station with team name/number.'
                },
                {
                  instruction: 'Explain gallery walk protocol: Move quietly, spend 2-3 minutes at each station. Read the documentation. Write one specific compliment and one question on the feedback sheet.',
                  duration: '2 min',
                  teacherNotes: 'Model good feedback: "I like how you labeled each IP address clearly" not just "nice job".'
                },
                {
                  instruction: 'Begin gallery walk. Play quiet background music. Students move at their own pace through all stations except their own.',
                  duration: '8 min',
                  teacherNotes: 'Circulate to ensure students are engaging meaningfully, not just writing "looks good" on everything.'
                },
                {
                  instruction: 'Return to your own station. Read the feedback you received. Select one question from the feedback to answer in your presentation.',
                  duration: '3 min',
                  teacherNotes: 'This gives students preview of what their peers found interesting or unclear - guides their presentation.'
                },
              ],
              formativeAssessment: 'Did students provide specific, constructive feedback? Did they identify genuine points of curiosity about peers\' networks?',
              differentiation: {
                support: 'Provide sentence starters: "I noticed that...", "I wonder why you chose...", "One thing I learned from your setup is..."',
                extension: 'Identify similarities and differences between your network and three others. What design choices varied?'
              }
            },
            {
              title: 'Network Presentations: Share Your Achievement',
              duration: '15 minutes',
              overview: 'Each team gives a brief presentation about their network, highlighting what they built and something interesting they learned.',
              steps: [
                {
                  instruction: 'Explain presentation format: Each team has 2 minutes. Include: quick overview of your network, one interesting thing you learned, answer one question from gallery walk feedback.',
                  duration: '2 min',
                  teacherNotes: '2 minutes is tight - helps keep presentations focused and maintains energy. Use a visible timer.'
                },
                {
                  instruction: 'First team presents. After each presentation, audience gives a round of applause. No Q&A during presentations to maintain pace.',
                  duration: '2 min',
                  teacherNotes: 'Celebrate each presentation. This is a real accomplishment worth acknowledging.'
                },
                {
                  instruction: 'Continue through remaining teams. If time allows, ask 1-2 follow-up questions after all presentations are complete.',
                  duration: '8 min',
                  teacherNotes: 'With 4-5 teams at 2 minutes each, this should fit. Adjust timing based on class size.'
                },
                {
                  instruction: 'Highlight patterns: "I noticed several teams mentioned X challenge" or "Everyone chose strong security settings." Celebrate collective learning.',
                  duration: '3 min',
                  teacherNotes: 'Synthesize themes across presentations. This reinforces that everyone learned similar core concepts.'
                },
              ],
              formativeAssessment: 'Did students demonstrate understanding in their presentations? Could they explain their network to others?',
              differentiation: {
                support: 'Provide presentation script template: "Our network has X devices. We learned that... We chose to... A question we received was..."',
                extension: 'Live demo: briefly show your network working (ping test, DHCP client list) during presentation.'
              }
            },
            {
              title: 'Connecting to the Bigger Picture: Community Networks',
              duration: '10 minutes',
              overview: 'Discussion connecting what students built to larger community network initiatives, showing how this knowledge enables digital self-determination.',
              steps: [
                {
                  instruction: 'Ask: "What you built is essentially a small version of what the internet is. If 100 people in a neighborhood each built networks like yours, could they connect them together?"',
                  duration: '2 min',
                  teacherNotes: 'Yes! That\'s basically what community mesh networks do. Your network can connect to other networks.'
                },
                {
                  instruction: 'Show examples of community networks: NYC Mesh, Detroit Community Technology Project, Guifi.net in Spain. What do these have in common with your network?',
                  duration: '3 min',
                  teacherNotes: 'Same protocols, same concepts, larger scale. Students have learned foundational skills.'
                },
                {
                  instruction: 'Discussion: "Why might a community want to build their own network instead of relying on big companies like Comcast or AT&T?"',
                  duration: '3 min',
                  teacherNotes: 'Control, cost, privacy, reaching underserved areas, community ownership. This is tech sovereignty.'
                },
                {
                  instruction: 'Reflection prompt: "How has your understanding of the internet changed since we started? What power do you now have that you didn\'t have before?"',
                  duration: '2 min',
                  teacherNotes: 'Understanding → power. They can now build, troubleshoot, and explain networks. That\'s real capability.'
                },
              ],
              formativeAssessment: 'Can students articulate why community networks matter? Do they see the connection between their project and larger movements?',
              differentiation: {
                support: 'Provide a simple comparison chart: "Your Network" vs "Community Mesh Network" with similar/different columns.',
                extension: 'Research a specific community network project. What problem were they solving? How did they organize?'
              }
            },
          ],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Choose presentation format: spoken, poster, video, or live demonstration',
                'Select which aspect of your network to highlight in the presentation',
                'Design your own documentation style and format',
              ],
              relevanceAndAuthenticity: [
                'Celebrate real accomplishment: "You built a working network!"',
                'Connect to future: this is the foundation for mesh networks, community ISPs',
                'Share with family: documentation can show others what you learned',
              ],
              selfRegulation: [
                'Reflection prompts: "What was hardest? What surprised you? What are you proud of?"',
                'Growth mindset: compare your knowledge now vs. day one',
                'Goal setting: what do you want to learn next?',
              ],
            },
            representation: {
              multipleFormats: [
                'Example network diagrams in different styles (simple, detailed, artistic)',
                'Video examples of good presentations',
                'Reflection question prompts displayed visually',
                'Community network examples for inspiration',
              ],
              vocabularySupport: [
                'Review glossary of all terms from the project',
                'Sentence starters for presentations and reflections',
                'Documentation template with labeled sections',
              ],
              backgroundKnowledge: [
                'Quick review: all the concepts we covered over the project',
                'Connection map: how does your network relate to the internet?',
                'Preview of what comes next in the curriculum',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'Gallery walk involves movement around room',
                'Seated presentation option for those who prefer',
                'Collaborative documentation: one person draws, one writes',
              ],
              expressionOptions: [
                'Present verbally OR create written/visual documentation only',
                'Individual reflection OR small group discussion',
                'Written reflection, verbal sharing, or artistic expression',
              ],
              executiveFunctionSupport: [
                'Documentation template with sections to complete',
                'Presentation outline with time allocations',
                'Reflection worksheet with guided questions',
              ],
            },
          },
        },
      ],
      assessment: {
        formative: [
          'Exit tickets after each lesson with 1-2 check-for-understanding questions',
          'Hands-on skill checks (Can they find an IP address? Configure a router?)',
          'Peer explanations: Students explain concepts to each other',
          'Troubleshooting demonstrations',
        ],
        summative: 'Students will set up a network from scratch, document it with a diagram, and present it to the class explaining the role of each component and their configuration choices. They must successfully demonstrate device-to-device communication.',
      },
      extensions: [
        'Set up a guest network with different security settings',
        'Research and configure port forwarding for a specific application',
        'Explore Quality of Service (QoS) settings',
        'Set up MAC address filtering',
        'Create a network monitoring dashboard',
      ],
      realWorldConnections: [
        'Small business owners need to set up and maintain office networks',
        'Understanding networking helps you make informed decisions about internet service providers',
        'Network troubleshooting skills are valuable in any technology-related career',
        'Community networks start with the same fundamentals—just at larger scale',
      ],
    },
    {
      id: 'project-2',
      title: 'Understanding Internet Protocols',
      description: 'Dive into TCP/IP, DNS, HTTP, and other protocols that make the internet work. Use packet sniffing tools to see data in motion.',
      difficulty: 'Intermediate',
      duration: '3-4 weeks',
      gradeBand: '9-12',
      overview: `This project takes students beneath the surface of the internet to understand the protocols that make global communication possible. Students will learn the TCP/IP model, explore how DNS translates human-readable addresses to IP addresses, and see HTTP requests and responses in real-time. By using packet analysis tools, students will develop a deeper appreciation for how data actually travels across networks.`,
      learningObjectives: [
        'Explain the four layers of the TCP/IP model and their functions',
        'Describe how DNS resolution works step by step',
        'Analyze HTTP requests and responses using developer tools',
        'Use Wireshark or similar tools to capture and interpret network packets',
        'Understand the difference between TCP and UDP and when each is used',
        'Explain how HTTPS provides security through encryption',
      ],
      prerequisites: [
        'Completion of Project 1 or equivalent networking knowledge',
        'Comfortable using command line tools',
        'Basic understanding of IP addresses and network concepts',
      ],
      materials: {
        required: [
          'Computer with administrative access',
          'Wireshark (free, open-source packet analyzer)',
          'Web browser with developer tools (Chrome, Firefox)',
          'Internet connection',
        ],
        optional: [
          'Second computer for traffic generation',
          'nslookup/dig command line tools',
          'HTTP client like curl or Postman',
          'Local web server (for HTTP experiments)',
        ],
      },
      lessons: [
        {
          title: 'The TCP/IP Model: A Layered Approach',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why engineers designed the internet in layers: the power of abstraction and why each layer only needs to "talk" to adjacent layers',
            'What encapsulation means physically: how headers are prepended at each layer and stripped at the destination',
            'Why this layered design allows the internet to evolve: how you can change one layer without breaking others',
            'What "protocol" actually means: an agreement between sender and receiver about format and behavior',
          ],
          objectives: [
            'Identify the four layers of the TCP/IP model',
            'Explain the responsibility of each layer',
            'Understand how data is encapsulated as it moves through layers',
          ],
          activities: [
            'Analogy: Sending a letter through the postal system (addressing, packaging, routing, delivery)',
            'Layer investigation: Research one layer in pairs and teach it to the class',
            'Encapsulation demonstration: Wrapping a "message" in envelopes representing each layer',
            'Diagram: Map real-world protocols to their layers',
          ],
          materials: ['TCP/IP model poster', 'Envelopes for demonstration', 'Protocol reference sheet'],
          detailedActivities: [
            {
              title: 'The Postal System Analogy: Understanding Layers',
              duration: '20 minutes',
              overview: 'Students discover layered communication through the familiar postal system analogy, mapping letter delivery to network layers.',
              steps: [
                {
                  instruction: 'Ask: "If you wanted to send a birthday card to a friend across the country, what steps happen between writing the message and your friend reading it?"',
                  duration: '3 min',
                  teacherNotes: 'Let students brainstorm: write message, put in envelope, write address, stamp, mailbox, truck, sorting facility, delivery, opening.'
                },
                {
                  instruction: 'Organize their answers into four groups: 1) Writing the message (content), 2) Addressing the envelope (who it\'s for), 3) Sorting and routing (path it takes), 4) Physical delivery (trucks, mailboxes).',
                  duration: '4 min',
                  teacherNotes: 'These map to Application, Transport, Internet, and Link layers. Don\'t name them yet - let the pattern emerge.'
                },
                {
                  instruction: 'Reveal: "You just discovered the four layers of the TCP/IP model!" Match each group to its layer: Application (content), Transport (reliable delivery), Internet (addressing/routing), Link (physical transmission).',
                  duration: '4 min',
                  teacherNotes: 'Point out: layers are INDEPENDENT. You can change the truck (link) without changing the address format (internet).'
                },
                {
                  instruction: 'Discussion: "Why might engineers design networks this way instead of having one giant system?" Collect answers.',
                  duration: '4 min',
                  teacherNotes: 'Key insight: layers allow parts to change independently. WiFi wasn\'t invented when TCP was - but it still works!'
                },
                {
                  instruction: 'Create a personal analogy card: Students write their own analogy for the layers (restaurant, factory, school, etc.) on an index card.',
                  duration: '5 min',
                  teacherNotes: 'Personal analogies help memory. Share a few examples with the class.'
                },
              ],
              formativeAssessment: 'Can students explain why layering makes networks more flexible? Can they map familiar systems to the four-layer structure?',
              differentiation: {
                support: 'Provide pre-printed postal system cards that students physically sort into four piles.',
                extension: 'Research the OSI 7-layer model. How does it compare? Why might some prefer one over the other?'
              }
            },
            {
              title: 'Layer Investigation: Become the Expert',
              duration: '30 minutes',
              overview: 'Students work in pairs to deeply research one layer, then teach it to the class, building collective expertise.',
              steps: [
                {
                  instruction: 'Divide class into four groups, one per layer: Application, Transport, Internet, Link. Each group will become experts on their layer.',
                  duration: '2 min',
                  teacherNotes: 'If class size allows, pair students within each group. Research is more effective with discussion partners.'
                },
                {
                  instruction: 'Distribute research guides with questions for each layer: "What does this layer do? What protocols live here? What does a header at this layer contain? What problem does it solve?"',
                  duration: '2 min',
                  teacherNotes: 'Layer-specific questions: Application (HTTP, FTP, DNS), Transport (TCP, UDP, ports), Internet (IP, routing), Link (Ethernet, WiFi, MAC)'
                },
                {
                  instruction: 'Research phase: Groups use provided resources (handouts, websites, textbook) to answer their research questions. Each person takes notes.',
                  duration: '12 min',
                  teacherNotes: 'Circulate to answer questions and keep groups on track. Redirect overly technical tangents.'
                },
                {
                  instruction: 'Prepare teaching moment: Groups have 5 minutes to create a 2-minute explanation of their layer. Can use the board, a poster, or just speak.',
                  duration: '5 min',
                  teacherNotes: 'Remind groups to keep it simple: name, main job, 2-3 example protocols, one interesting fact.'
                },
                {
                  instruction: 'Layer presentations: Each group teaches the class about their layer. Order: Link → Internet → Transport → Application (bottom up, like a packet being sent).',
                  duration: '9 min',
                  teacherNotes: 'After each presentation, class asks one clarifying question. Celebrate each group\'s contribution.'
                },
              ],
              formativeAssessment: 'Did each group accurately describe their layer\'s function? Can students now explain all four layers briefly?',
              differentiation: {
                support: 'Provide layer-specific fact sheets with key information highlighted. Group with confident readers.',
                extension: 'Research a protocol you haven\'t heard of that operates at your layer. Share one surprising thing about it.'
              }
            },
            {
              title: 'Encapsulation: Wrapping Data in Envelopes',
              duration: '25 minutes',
              overview: 'A physical demonstration where students wrap and unwrap "messages" in envelopes representing each layer, experiencing encapsulation hands-on.',
              steps: [
                {
                  instruction: 'Explain encapsulation: "When you send data, each layer adds its own information by wrapping the data like envelopes within envelopes. Let\'s do this physically."',
                  duration: '2 min',
                  teacherNotes: 'Show a diagram of headers being added at each layer. Then we\'ll do it for real.'
                },
                {
                  instruction: 'Prepare materials: Each pair gets 4 envelopes labeled (Application, Transport, Internet, Link) and a small paper with a "message" (e.g., "GET /index.html HTTP/1.1").',
                  duration: '2 min',
                  teacherNotes: 'Use differently sized envelopes or colors to make layers visible. Smallest inside, largest outside.'
                },
                {
                  instruction: 'Sending side - Application Layer: Put the message in the Application envelope. Write on the outside: "HTTP Request".',
                  duration: '3 min',
                  teacherNotes: 'The Application layer created the content. Now we need to make sure it arrives reliably.'
                },
                {
                  instruction: 'Sending side - Transport Layer: Put the Application envelope in the Transport envelope. Write: "Port 80 → Port 49152, Sequence #1".',
                  duration: '3 min',
                  teacherNotes: 'Transport adds port numbers (which app to deliver to) and sequence numbers (for reliability).'
                },
                {
                  instruction: 'Sending side - Internet Layer: Put the Transport envelope in the Internet envelope. Write: "From 192.168.1.5 To 93.184.216.34".',
                  duration: '3 min',
                  teacherNotes: 'Internet layer adds IP addresses - the global addressing system.'
                },
                {
                  instruction: 'Sending side - Link Layer: Put the Internet envelope in the Link envelope. Write: "From AA:BB:CC:DD:EE:FF To 11:22:33:44:55:66".',
                  duration: '3 min',
                  teacherNotes: 'Link layer adds MAC addresses - for local network delivery to the next hop.'
                },
                {
                  instruction: 'Now reverse: Receiving side. Open envelopes in order (Link → Internet → Transport → Application), reading each header and removing the envelope until you get the message.',
                  duration: '5 min',
                  teacherNotes: 'At each layer, the header is "processed" and removed. Final message arrives clean.'
                },
                {
                  instruction: 'Reflection: "What would happen if the Internet layer didn\'t exist?" (No way to route between networks) "What if Transport layer failed?" (No reliability, packets might be lost).',
                  duration: '4 min',
                  teacherNotes: 'This shows why each layer matters - remove one and the system breaks in specific ways.'
                },
              ],
              formativeAssessment: 'Can students explain what each envelope/header contains? Can they describe why we add headers going out and remove them coming in?',
              differentiation: {
                support: 'Pre-print the header information on each envelope so students just need to assemble in order.',
                extension: 'What if a packet needs to go through 5 routers? Which headers change at each hop? (Link layer changes, Internet stays same)'
              }
            },
            {
              title: 'Protocol Mapping: Where Does It Live?',
              duration: '15 minutes',
              overview: 'Students map common protocols to their correct layers, building familiarity with the protocol stack.',
              steps: [
                {
                  instruction: 'Draw the four-layer stack on the board. Hand out cards with protocol names: HTTP, TCP, UDP, IP, Ethernet, WiFi, DNS, FTP, ICMP, ARP.',
                  duration: '2 min',
                  teacherNotes: 'Have about 10-15 protocol cards. Can include some tricky ones like ICMP (Internet layer, not Transport).'
                },
                {
                  instruction: 'One by one, students come up and place their protocol card on the correct layer. Class can help with hints if needed.',
                  duration: '6 min',
                  teacherNotes: 'Application: HTTP, DNS, FTP. Transport: TCP, UDP. Internet: IP, ICMP. Link: Ethernet, WiFi, ARP.'
                },
                {
                  instruction: 'Review any misplacements together. Explain why each protocol belongs where it does. What\'s the protocol\'s main job?',
                  duration: '4 min',
                  teacherNotes: 'DNS can be tricky - it\'s Application layer (provides a service to apps) even though it helps with addressing.'
                },
                {
                  instruction: 'Copy the final diagram into notebooks. Add one sentence about what each protocol does.',
                  duration: '3 min',
                  teacherNotes: 'This becomes a reference sheet for future lessons.'
                },
              ],
              formativeAssessment: 'Can students correctly place protocols in layers? Can they articulate why a protocol belongs at a specific layer?',
              differentiation: {
                support: 'Provide a partially completed map with some protocols already placed as examples.',
                extension: 'Research three protocols not on our list. Where do they belong? Present your findings.'
              }
            },
          ],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Choose which layer to research and teach to the class',
                'Select analogy that resonates: postal system, Russian nesting dolls, or create your own',
                'Option to work in pairs or small groups for layer investigation',
              ],
              relevanceAndAuthenticity: [
                'Layers help troubleshoot: "Is the problem with the cable or the website?"',
                'Understanding layers = understanding how different parts of the internet can be fixed or replaced',
                'Real engineers use this model every day for design and debugging',
              ],
              selfRegulation: [
                'Abstraction is hard - normalize confusion and multiple explanations',
                'Check-in: "Which layer makes the most sense? Which is confusing?"',
                'Celebrate lightbulb moments when layers "click"',
              ],
            },
            representation: {
              multipleFormats: [
                'Physical envelope demonstration (tactile)',
                'Color-coded layer diagram (visual)',
                'Verbal walkthrough with analogies',
                'Video animation showing encapsulation',
              ],
              vocabularySupport: [
                'Layer names and one-word function: Application (content), Transport (reliability), Internet (addressing), Link (physical)',
                'Encapsulation = wrapping in envelopes, each layer adds its envelope',
                'Protocol = agreed-upon rules for communication',
              ],
              backgroundKnowledge: [
                'Review: how data travels as packets from Project 1',
                'Layers build on what you know: each adds one piece of the puzzle',
                'Postal analogy grounding: letter → envelope → address → truck route',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'Envelope wrapping/unwrapping is hands-on kinesthetic',
                'Layer role-play: students become layers processing a message',
                'Movement between "layer stations" in classroom',
              ],
              expressionOptions: [
                'Teach your assigned layer through presentation, diagram, or skit',
                'Create a layer cheat sheet for future reference',
                'Annotate the TCP/IP poster with your own explanations',
              ],
              executiveFunctionSupport: [
                'Layer reference card with consistent format for each',
                'Research guide with specific questions to answer about each layer',
                'Timer for research and presentation prep phases',
              ],
            },
          },
        },
        {
          title: 'DNS: The Internet\'s Phone Book',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why DNS is a distributed database, not a single server: how the hierarchy (root → TLD → authoritative) provides scalability and resilience',
            'What actually happens when you type a URL: the recursive resolver, caching, TTL values, and why pages sometimes load slowly the first time',
            'How DNS is a single point of control: why governments and ISPs can block sites via DNS, and what DNS-over-HTTPS changes',
            'Why running your own DNS resolver matters for privacy: what your ISP learns about you through DNS queries',
          ],
          objectives: [
            'Explain why DNS exists and the problem it solves',
            'Trace a DNS query from browser to resolution',
            'Use nslookup/dig to query DNS servers',
            'Understand DNS hierarchy (root, TLD, authoritative servers)',
          ],
          activities: [
            'Thought experiment: What if you had to memorize IP addresses for every website?',
            'Command line practice: Use nslookup to find IP addresses of popular sites',
            'DNS journey mapping: Diagram the path of a DNS query',
            'Research: What are the root DNS servers and where are they located?',
          ],
          materials: ['Computer with command line', 'DNS diagram template', 'List of domains to look up'],
          detailedActivities: [
            {
              title: 'Life Without DNS: The Memorization Challenge',
              duration: '15 minutes',
              overview: 'Students discover why DNS is essential by attempting to use the internet with only IP addresses, experiencing the problem DNS solves.',
              steps: [
                {
                  instruction: 'Challenge: "For the next 5 minutes, you can only access websites by typing their IP address. No domain names allowed. Let\'s see how far you get."',
                  duration: '1 min',
                  teacherNotes: 'Give them a few IP addresses to start: 142.250.80.46 (Google), 31.13.65.36 (Facebook). Watch the frustration build!'
                },
                {
                  instruction: 'Students try to browse using only IP addresses. They quickly realize: How do you find the IP for a site you want? How do you remember them? What if the IP changes?',
                  duration: '5 min',
                  teacherNotes: 'Let them struggle briefly. The point is visceral understanding of why names matter.'
                },
                {
                  instruction: 'Discuss: "What problems did you encounter?" Collect answers: can\'t remember IPs, don\'t know IPs for sites you want, IPs are meaningless.',
                  duration: '4 min',
                  teacherNotes: 'Key insight: humans are good with names, computers are good with numbers. We need a translation system.'
                },
                {
                  instruction: 'Introduce DNS: "DNS is the phone book of the internet. You look up a name, it gives you a number. Every time you visit a website, DNS happens first."',
                  duration: '3 min',
                  teacherNotes: 'If you have an old phone book, pass it around. This was how we found phone numbers before smartphones!'
                },
                {
                  instruction: 'Quick poll: "How many websites do you visit in a day? 10? 50? 100?" Each one required a DNS lookup. That\'s hundreds of lookups daily, invisibly.',
                  duration: '2 min',
                  teacherNotes: 'DNS is one of the most-used protocols, yet most people never think about it.'
                },
              ],
              formativeAssessment: 'Can students articulate why DNS is necessary? Do they understand the name-to-number translation problem?',
              differentiation: {
                support: 'Provide a handout with 5-10 common sites and their IP addresses. Students can at least try to use them.',
                extension: 'Research: What is the longest domain name registered? Why might long names be harder for DNS than short ones?'
              }
            },
            {
              title: 'nslookup Command Line Investigation',
              duration: '25 minutes',
              overview: 'Students use the nslookup command to query DNS servers directly, seeing how names resolve to IP addresses.',
              steps: [
                {
                  instruction: 'Open Terminal (Mac) or Command Prompt (Windows). Type: nslookup google.com - Observe the output. What information do you see?',
                  duration: '4 min',
                  teacherNotes: 'Output shows: Server (your DNS resolver), Address (resolver\'s IP), Name (what you asked for), Address (the answer).'
                },
                {
                  instruction: 'Identify the parts of the output: "Server" = who answered your question. "Address" under the name = the IP address you were looking for.',
                  duration: '3 min',
                  teacherNotes: 'The first "Server" line tells you WHO looked it up. Usually your ISP\'s DNS server.'
                },
                {
                  instruction: 'Try more domains: nslookup facebook.com, nslookup wikipedia.org, nslookup your-school.edu. Record each IP address you find.',
                  duration: '5 min',
                  teacherNotes: 'Notice: big sites often return multiple IPs. These are load balancing - multiple servers behind one name.'
                },
                {
                  instruction: 'Verify your answers: Copy an IP you found and paste it into your browser address bar. Does it take you to the right site?',
                  duration: '4 min',
                  teacherNotes: 'Most sites will work, but some require the domain name (virtual hosting). Explain this if students are confused.'
                },
                {
                  instruction: 'Try looking up a non-existent domain: nslookup thissitedefinitelydoesnotexist123456.com. What happens?',
                  duration: '3 min',
                  teacherNotes: 'You get an error (NXDOMAIN or "can\'t find"). DNS is honest about when a name doesn\'t exist.'
                },
                {
                  instruction: 'Advanced query: nslookup -type=NS google.com. This asks "who are Google\'s name servers?" Notice the ns1, ns2, etc.',
                  duration: '4 min',
                  teacherNotes: 'NS records point to the authoritative servers for a domain. Google runs their own.'
                },
                {
                  instruction: 'Record your findings in a table: Domain | IP Address(es) | Name Servers. This becomes your DNS investigation log.',
                  duration: '2 min',
                  teacherNotes: 'Documentation practice. Students will reference this later.'
                },
              ],
              formativeAssessment: 'Can students successfully use nslookup? Can they interpret the output and explain what the response means?',
              differentiation: {
                support: 'Provide exact command syntax on a reference card. Work in pairs with one student typing and one recording.',
                extension: 'Use the dig command (if available) for more detailed output. Compare dig vs nslookup - what extra info does dig show?'
              }
            },
            {
              title: 'The DNS Hierarchy Journey',
              duration: '30 minutes',
              overview: 'Students map the complete path of a DNS query from browser through the hierarchy of root, TLD, and authoritative servers.',
              steps: [
                {
                  instruction: 'Introduce the DNS hierarchy: "DNS isn\'t one big phone book - it\'s a hierarchy. Root servers → TLD servers (.com, .org) → Authoritative servers (specific domains)."',
                  duration: '3 min',
                  teacherNotes: 'Draw a tree diagram on the board: root at top, TLDs below, individual domains at the bottom.'
                },
                {
                  instruction: 'Role-play setup: Designate areas of the room as Root Server, .com TLD Server, example.com Authoritative Server, and User\'s Computer. Need 4 volunteers.',
                  duration: '3 min',
                  teacherNotes: 'Give each "server" a card with their role and what questions they can answer.'
                },
                {
                  instruction: 'User starts: "I want to visit example.com. Who has the IP?" User doesn\'t know where to start, so asks their local resolver (teacher role).',
                  duration: '2 min',
                  teacherNotes: 'The resolver is like a librarian who knows how to navigate the system.'
                },
                {
                  instruction: 'Resolver asks Root: "Where can I find info about .com domains?" Root answers: "I don\'t know example.com, but ask the .com TLD server."',
                  duration: '3 min',
                  teacherNotes: 'Root servers only know about TLDs. They\'re the starting point, not the answer.'
                },
                {
                  instruction: 'Resolver asks .com TLD: "Where is example.com?" TLD answers: "I don\'t have the IP, but example.com\'s authoritative server is at [address]."',
                  duration: '3 min',
                  teacherNotes: 'TLDs track which authoritative servers are responsible for each domain.'
                },
                {
                  instruction: 'Resolver asks Authoritative Server: "What is the IP for example.com?" Authoritative answers: "93.184.216.34! Here you go!"',
                  duration: '3 min',
                  teacherNotes: 'The authoritative server is the final authority. It has the actual answer.'
                },
                {
                  instruction: 'Resolver returns to User: "The IP for example.com is 93.184.216.34. I\'ll remember this for a while (caching) so I don\'t have to ask again."',
                  duration: '3 min',
                  teacherNotes: 'Caching is why DNS is fast. First lookup is slow, subsequent ones are instant.'
                },
                {
                  instruction: 'Students draw their own DNS journey diagram showing all the steps. Include: User, Resolver, Root, TLD, Authoritative, and all the arrows.',
                  duration: '8 min',
                  teacherNotes: 'Templates help. Key is understanding the sequence and what each server contributes.'
                },
                {
                  instruction: 'Discussion: "What would happen if the root servers went down?" "What if you could control the TLD servers?"',
                  duration: '2 min',
                  teacherNotes: 'Root server failure would be catastrophic. TLD control gives censorship power. This is why DNS is political!'
                },
              ],
              formativeAssessment: 'Can students trace a DNS query through all levels of the hierarchy? Do they understand what each server level provides?',
              differentiation: {
                support: 'Provide a partially completed journey diagram. Students fill in the missing arrows and labels.',
                extension: 'Research: Who controls the root servers? What is ICANN? Why is this controversial?'
              }
            },
            {
              title: 'DNS Privacy and Control: Why This Matters',
              duration: '20 minutes',
              overview: 'Students explore the privacy and censorship implications of DNS, understanding why running your own resolver matters.',
              steps: [
                {
                  instruction: 'Ask: "Your ISP runs the DNS resolver you probably use. What does that mean they can see?" Let students think.',
                  duration: '3 min',
                  teacherNotes: 'Answer: Every website you visit. Even if the content is encrypted, the DNS query is not (traditionally).'
                },
                {
                  instruction: 'Research: Have students look up "DNS blocking" or "DNS censorship." Find one example of a government blocking websites through DNS.',
                  duration: '5 min',
                  teacherNotes: 'Examples: Turkey, China, UK (adult content filter). This is real and widespread.'
                },
                {
                  instruction: 'Discussion: "If you change your DNS server, can you bypass blocks?" Test by using nslookup with a specific server: nslookup blocked-site.com 8.8.8.8',
                  duration: '4 min',
                  teacherNotes: 'Using a different DNS server (8.8.8.8 is Google\'s) can bypass ISP blocks. This is why some countries block all external DNS.'
                },
                {
                  instruction: 'Introduce DNS-over-HTTPS (DoH): "New technology encrypts DNS queries. Your ISP can no longer see what sites you\'re looking up."',
                  duration: '4 min',
                  teacherNotes: 'DoH is controversial: good for privacy, but makes it harder for organizations to filter content.'
                },
                {
                  instruction: 'Connect to tech sovereignty: "Running your own DNS resolver means YOU control this. No ISP logging, no government blocking your queries."',
                  duration: '4 min',
                  teacherNotes: 'Pi-hole, Unbound, and other tools let communities run private DNS. This is infrastructure you can control.'
                },
              ],
              formativeAssessment: 'Can students explain why DNS is a privacy concern? Can they describe how DNS enables censorship and how to bypass it?',
              differentiation: {
                support: 'Provide a pre-researched case study of DNS blocking for students to read rather than research themselves.',
                extension: 'Set up a Pi-hole on a Raspberry Pi and demonstrate ad blocking through DNS. How does this work?'
              }
            },
          ],
          udl: {
            engagement: {
              choiceAndAutonomy: [
                'Choose which websites to look up with nslookup',
                'Research DNS censorship in a country of your choice',
                'Design your own DNS hierarchy diagram style',
              ],
              relevanceAndAuthenticity: [
                'DNS censorship is real: some countries block sites through DNS',
                'Faster DNS = faster browsing - you can change your DNS server at home',
                'Privacy implications: your ISP sees every site you visit through DNS queries',
              ],
              selfRegulation: [
                'Command line work builds on previous lessons - connect to what you know',
                'Break complex hierarchy into digestible pieces',
                'Partner check-ins: explain your DNS journey diagram to a peer',
              ],
            },
            representation: {
              multipleFormats: [
                'Hierarchy diagram showing root → TLD → authoritative path',
                'Animation of DNS query bouncing between servers',
                'Command line output with annotations',
                'Physical "phone book" analogy with actual old phone book',
              ],
              vocabularySupport: [
                'Resolver = the server that looks up addresses for you',
                'TTL = how long to remember an answer before asking again',
                'Hierarchy levels: root (.), TLD (.com), domain (google)',
              ],
              backgroundKnowledge: [
                'Review: IP addresses from Project 1, now we see how names map to numbers',
                'Layer connection: DNS is an Application layer protocol',
                'Real-world grounding: phone books before smartphones',
              ],
            },
            actionExpression: {
              physicalOptions: [
                'nslookup commands are copy-paste friendly',
                'Diagram creation can be digital or on paper',
                'Partner work: one types commands, one records results',
              ],
              expressionOptions: [
                'Draw the DNS journey OR write it as a story OR explain verbally',
                'Create a "DNS for beginners" explainer in your preferred format',
                'Annotate a pre-made diagram instead of creating from scratch',
              ],
              executiveFunctionSupport: [
                'Command reference sheet with exact syntax',
                'DNS journey template with boxes to fill in',
                'Checklist of domains to look up',
              ],
            },
          },
        },
        {
          title: 'HTTP/HTTPS: The Language of the Web',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why HTTP is "stateless": what that means for web applications and why cookies/sessions were invented',
            'What headers actually are: metadata that controls caching, authentication, content negotiation—and how servers use them to track you',
            'How TLS encryption works conceptually: the handshake, certificate verification, and what "man-in-the-middle" attacks look like',
            'Why the browser shows a padlock: what it does and doesn\'t guarantee about a website\'s trustworthiness',
          ],
          objectives: [
            'Understand the request-response cycle of HTTP',
            'Identify HTTP methods (GET, POST, PUT, DELETE)',
            'Read and interpret HTTP headers',
            'Explain how HTTPS adds security to HTTP',
          ],
          activities: [
            'Browser developer tools: Inspect network traffic when loading a webpage',
            'HTTP request dissection: Break down a real request into its components',
            'Status code scavenger hunt: Find examples of 200, 404, 301, 500 responses',
            'Security comparison: View the difference between HTTP and HTTPS traffic',
          ],
          materials: ['Browser with developer tools', 'HTTP reference guide', 'Sample websites to analyze'],
          detailedActivities: [
            {
              title: 'Network Tab Exploration: What Happens When You Load a Page',
              duration: '25 minutes',
              overview: 'Students use browser developer tools to observe HTTP requests in real-time, discovering the hidden traffic behind every webpage.',
              steps: [
                {
                  instruction: 'Open Chrome/Firefox and press F12 to open Developer Tools. Navigate to the "Network" tab. Keep it open.',
                  duration: '2 min',
                  teacherNotes: 'Make sure students find the Network tab, not Console. Show on projector for visual reference.'
                },
                {
                  instruction: 'Clear the network log (icon may vary by browser). Now visit a website like wikipedia.org. Watch the requests populate in real-time!',
                  duration: '3 min',
                  teacherNotes: 'Students will be amazed at how many requests happen for one page. A single page can make 50-100+ requests.'
                },
                {
                  instruction: 'Count the requests: "How many requests did it take to load Wikipedia?" Look at the summary at the bottom (e.g., "45 requests, 1.2 MB transferred").',
                  duration: '3 min',
                  teacherNotes: 'Explain: Each row is a separate request - for HTML, images, stylesheets, JavaScript, fonts, etc.'
                },
                {
                  instruction: 'Click on the first request (usually the main HTML page). Explore the tabs: Headers, Preview, Response. What information is shown?',
                  duration: '5 min',
                  teacherNotes: 'Headers shows metadata, Preview shows rendered content, Response shows raw content.'
                },
                {
                  instruction: 'Find the Request Headers section. Identify: Request Method (GET), URL, User-Agent (what browser you\'re using), Accept-Language.',
                  duration: '4 min',
                  teacherNotes: 'User-Agent tells the server your browser. Accept-Language asks for content in your language.'
                },
                {
                  instruction: 'Find the Response Headers section. Identify: Status Code (200 OK), Content-Type, Cache-Control. What do these tell the browser?',
                  duration: '4 min',
                  teacherNotes: 'Content-Type tells browser how to interpret the response. Cache-Control says how long to remember it.'
                },
                {
                  instruction: 'Try filtering: Type "image" in the filter bar. Now you see only image requests. Try other filters: "css", "js".',
                  duration: '4 min',
                  teacherNotes: 'Filtering helps focus on specific types of content. Essential when debugging real websites.'
                },
              ],
              formativeAssessment: 'Can students navigate the Network tab and identify request/response headers? Can they explain what happens during a page load?',
              differentiation: {
                support: 'Provide annotated screenshots of the Network tab with key areas highlighted and labeled.',
                extension: 'Compare requests between HTTP and HTTPS sites. What differences do you notice in the headers?'
              }
            },
            {
              title: 'HTTP Request Dissection: Breaking Down the Components',
              duration: '30 minutes',
              overview: 'Students analyze the structure of HTTP requests and responses, understanding each component and its purpose.',
              steps: [
                {
                  instruction: 'Display a sample HTTP request on the projector. Identify the three parts: Request Line (method, path, version), Headers, Body (if any).',
                  duration: '4 min',
                  teacherNotes: 'Example: GET /index.html HTTP/1.1 \\n Host: example.com \\n User-Agent: Mozilla/5.0...'
                },
                {
                  instruction: 'Focus on HTTP Methods: GET (retrieve), POST (submit), PUT (update), DELETE (remove). Ask: "When would you use each?"',
                  duration: '5 min',
                  teacherNotes: 'GET: loading a page. POST: submitting a form. PUT: editing a profile. DELETE: removing a post.'
                },
                {
                  instruction: 'Hands-on: In the Network tab, right-click on a request and choose "Copy as cURL". Paste into a text editor. This is the raw request!',
                  duration: '4 min',
                  teacherNotes: 'cURL format shows the full request. Students can see headers they didn\'t know their browser was sending.'
                },
                {
                  instruction: 'Identify cookies in the headers. Find "Cookie:" header. Explain: "These are how websites remember who you are between requests."',
                  duration: '5 min',
                  teacherNotes: 'HTTP is stateless - cookies provide state. This is how login sessions work.'
                },
                {
                  instruction: 'Display a sample HTTP response. Identify: Status Line (HTTP/1.1 200 OK), Headers, Body (the actual content).',
                  duration: '4 min',
                  teacherNotes: 'Response body is what you see on the page. Headers control behavior like caching.'
                },
                {
                  instruction: 'Create a request/response diagram: Draw the client sending a request, server processing, server sending response. Label each component.',
                  duration: '5 min',
                  teacherNotes: 'This visual reinforces the back-and-forth nature of HTTP.'
                },
                {
                  instruction: 'Discuss: "Why is it called \'stateless\'?" Each request is independent. Server doesn\'t remember previous requests without cookies.',
                  duration: '3 min',
                  teacherNotes: 'Statelessness is a design choice. It keeps servers simple but requires workarounds for login state.'
                },
              ],
              formativeAssessment: 'Can students identify the parts of an HTTP request/response? Can they explain what stateless means?',
              differentiation: {
                support: 'Provide pre-formatted request/response templates with blanks to fill in component names.',
                extension: 'Use curl from the command line to make a request. Observe the raw response without a browser.'
              }
            },
            {
              title: 'Status Code Scavenger Hunt',
              duration: '25 minutes',
              overview: 'Students hunt for different HTTP status codes by visiting various URLs, building familiarity with the meaning of each code range.',
              steps: [
                {
                  instruction: 'Introduce status code ranges: 2xx = Success, 3xx = Redirect, 4xx = Client Error, 5xx = Server Error. These are the server\'s answers.',
                  duration: '3 min',
                  teacherNotes: 'The first digit tells you the category. This makes troubleshooting easier.'
                },
                {
                  instruction: 'Hunt for 200 OK: Visit any working website. In Network tab, the main HTML request should show 200. This means success!',
                  duration: '3 min',
                  teacherNotes: '200 is the most common code. It means "everything worked, here\'s your content."'
                },
                {
                  instruction: 'Hunt for 404 Not Found: Add a fake path to any website (e.g., google.com/thispagedoesnotexist). Find the 404 in the Network tab.',
                  duration: '4 min',
                  teacherNotes: '404 means the resource doesn\'t exist. A well-designed site shows a friendly error page.'
                },
                {
                  instruction: 'Hunt for 301/302 Redirect: Try visiting http://google.com (not https). Watch the redirect chain in Network tab. Find the 301!',
                  duration: '4 min',
                  teacherNotes: '301 = permanent redirect. Google forces HTTP to HTTPS. The browser follows automatically.'
                },
                {
                  instruction: 'Hunt for 403 Forbidden: Try accessing /admin or /private on various sites. Some return 403 = you\'re not allowed here.',
                  duration: '4 min',
                  teacherNotes: '403 means you don\'t have permission. Different from 404 - the page exists, you just can\'t see it.'
                },
                {
                  instruction: 'Discuss: "What would a 500 error mean?" Server broke while processing. This is the website\'s fault, not yours.',
                  duration: '3 min',
                  teacherNotes: '500 errors are rare to find intentionally. They indicate bugs or server problems.'
                },
                {
                  instruction: 'Create a status code reference card: Code | Name | Meaning | When You See It. Include 200, 301, 403, 404, 500.',
                  duration: '4 min',
                  teacherNotes: 'This becomes a quick reference for debugging. Professional developers use this daily.'
                },
              ],
              formativeAssessment: 'Did students find examples of different status codes? Can they explain what each code range means?',
              differentiation: {
                support: 'Provide specific URLs known to produce each status code, reducing hunting time.',
                extension: 'Research less common codes: 418 (I\'m a teapot), 429 (Too Many Requests), 503 (Service Unavailable).'
              }
            },
            {
              title: 'HTTPS: The Secure Layer',
              duration: '40 minutes',
              overview: 'Students explore how HTTPS adds encryption to HTTP, understanding certificates, the padlock icon, and what security guarantees HTTPS provides.',
              steps: [
                {
                  instruction: 'Compare URLs: Find a website that uses HTTPS (most now do). Click the padlock icon in the address bar. What information is shown?',
                  duration: '4 min',
                  teacherNotes: 'The padlock shows certificate info: who issued it, when it expires, what domain it\'s for.'
                },
                {
                  instruction: 'View the certificate details: Click "View Certificate" or similar. Find: Issued To, Issued By, Valid From/To.',
                  duration: '4 min',
                  teacherNotes: 'Certificates prove identity. A trusted third party (CA) vouches for the website.'
                },
                {
                  instruction: 'Discussion: "What does HTTPS actually encrypt?" Answer: the content AND headers of your requests, but NOT the domain name (visible in TLS handshake).',
                  duration: '4 min',
                  teacherNotes: 'Your ISP can still see WHICH site you visit, just not WHAT you do there. This is important for privacy understanding.'
                },
                {
                  instruction: 'Experiment: Try visiting http://example.com (not https). Does it redirect? Compare the Network tab traffic.',
                  duration: '4 min',
                  teacherNotes: 'Many sites now force HTTPS. Some still don\'t - those are less secure.'
                },
                {
                  instruction: 'Warning experiment: Visit a site with an invalid certificate (or use a privacy-focused browser with strict settings). Observe the warning page.',
                  duration: '5 min',
                  teacherNotes: 'Be careful with this. Use teacher-controlled example. Invalid certs trigger scary warnings for good reason.'
                },
                {
                  instruction: 'Discussion: "The padlock means the connection is encrypted. Does it mean the website is trustworthy?" Answer: NO! Scam sites can have padlocks too.',
                  duration: '5 min',
                  teacherNotes: 'Critical security lesson: HTTPS = encrypted, not HTTPS = safe. Phishing sites often have valid certificates.'
                },
                {
                  instruction: 'Create a diagram: Client ↔ Server with arrows showing encrypted tunnel. Label what\'s inside (protected) vs what\'s visible outside.',
                  duration: '6 min',
                  teacherNotes: 'Inside tunnel: content, headers, cookies. Outside tunnel: IP addresses, domain name (SNI).'
                },
                {
                  instruction: 'Reflection: "How has your understanding of the padlock icon changed?" Many students assume padlock = completely safe.',
                  duration: '4 min',
                  teacherNotes: 'Dispelling myths is important. Padlock means encrypted connection, period.'
                },
                {
                  instruction: 'Connect to tech sovereignty: "Who issues certificates? Who decides which CAs are trusted? This is another control point in the internet."',
                  duration: '4 min',
                  teacherNotes: 'Certificate authorities are trusted by your browser. Browsers decide who\'s trustworthy. That\'s centralized power.'
                },
              ],
              formativeAssessment: 'Can students explain what HTTPS encrypts vs doesn\'t encrypt? Do they understand that padlock ≠ trustworthy?',
              differentiation: {
                support: 'Provide an HTTPS vs HTTP comparison chart with what\'s encrypted/visible clearly marked.',
                extension: 'Research Let\'s Encrypt. How did free certificates change the web? What problems did it solve?'
              }
            },
          ],
        },
        {
          title: 'TCP vs. UDP: Reliable vs. Fast',
          duration: '75 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What "reliable delivery" means mechanically: sequence numbers, acknowledgments, retransmission timers—and the overhead cost',
            'Why UDP exists when TCP seems "better": the real-time constraint, and why a dropped video frame is better than a delayed one',
            'How congestion control works in TCP: why your download slows down when the network is busy, and how TCP "backs off"',
            'The engineering tradeoff: why application developers choose one over the other based on their specific needs',
          ],
          objectives: [
            'Explain how TCP ensures reliable data delivery',
            'Understand when UDP is preferred over TCP',
            'Identify which protocols use TCP vs. UDP',
          ],
          activities: [
            'Simulation: TCP three-way handshake with paper passing',
            'Comparison activity: Streaming video (UDP) vs. file download (TCP)',
            'Research: What protocols use UDP and why?',
            'Discussion: What would happen if video streaming used TCP?',
          ],
          materials: ['Handshake demonstration props', 'Protocol comparison chart', 'Video streaming for demonstration'],
          detailedActivities: [
            {
              title: 'The TCP Three-Way Handshake: Paper Passing Simulation',
              duration: '20 minutes',
              overview: 'Students physically act out TCP connection establishment, understanding why three messages are needed and what each accomplishes.',
              steps: [
                {
                  instruction: 'Set up the simulation: Two students sit facing each other. One is the "Client" wanting to connect, one is the "Server" waiting for connections. Give each a stack of paper slips.',
                  duration: '2 min',
                  teacherNotes: 'Clear desk space between them. The paper slips will be "packets" passed back and forth.'
                },
                {
                  instruction: 'Step 1 - SYN: Client writes "SYN - I want to connect. My sequence number is 100." and passes it to Server. Explain: Client is saying "Hello, can we talk?"',
                  duration: '3 min',
                  teacherNotes: 'SYN = synchronize. The sequence number will be used to track all future messages.'
                },
                {
                  instruction: 'Step 2 - SYN-ACK: Server writes "SYN-ACK - Yes, let\'s connect. Your 100 received. My sequence number is 200." and passes back. This acknowledges AND initiates.',
                  duration: '4 min',
                  teacherNotes: 'Server is saying "I heard you, AND here\'s my info too." Two-for-one message.'
                },
                {
                  instruction: 'Step 3 - ACK: Client writes "ACK - Got your 200. We\'re connected!" and passes to Server. Connection is now established.',
                  duration: '3 min',
                  teacherNotes: 'Why is this third message needed? So the server knows the client received its response.'
                },
                {
                  instruction: 'Discussion: "Why three messages? Why not two?" Draw out: Client needs to confirm it got Server\'s sequence number. Without step 3, Server doesn\'t know if Client heard.',
                  duration: '4 min',
                  teacherNotes: 'This is subtle but important. The handshake ensures BOTH sides are synchronized.'
                },
                {
                  instruction: 'Extend: Now have them send "data" with sequence numbers. Client sends "SEQ 101: Hello" then "SEQ 102: World". Server must ACK each one.',
                  duration: '4 min',
                  teacherNotes: 'This shows how sequence numbers enable reliability - if one gets lost, you know which to resend.'
                },
              ],
              formativeAssessment: 'Can students explain why three messages are necessary? Can they describe what would go wrong with only two?',
              differentiation: {
                support: 'Provide pre-written message templates so students just fill in sequence numbers.',
                extension: 'Act out what happens when a packet is "lost" (instructor intercepts it). How does TCP recover?'
              }
            },
            {
              title: 'UDP: The "Fire and Forget" Protocol',
              duration: '15 minutes',
              overview: 'Students contrast UDP with TCP by seeing how UDP skips all the handshaking and reliability, understanding when this tradeoff makes sense.',
              steps: [
                {
                  instruction: 'Same setup as before, but now using UDP rules. Client wants to send "Hello World" to Server. With UDP, Client just... sends it. No handshake first.',
                  duration: '2 min',
                  teacherNotes: 'Dramatically contrast: TCP had three messages before data. UDP? Zero. Just send.'
                },
                {
                  instruction: 'Client writes "Hello" and tosses it to Server. Then immediately writes "World" and tosses it. No waiting for acknowledgment.',
                  duration: '2 min',
                  teacherNotes: 'The "toss" can be slightly careless to emphasize UDP doesn\'t guarantee delivery.'
                },
                {
                  instruction: 'Simulate packet loss: Instructor intercepts "World" mid-flight. Server only gets "Hello". With UDP, that\'s it - no retransmission.',
                  duration: '3 min',
                  teacherNotes: 'UDP doesn\'t know or care that World was lost. The application has to deal with it.'
                },
                {
                  instruction: 'Discussion: "Why would anyone use UDP if packets can get lost?" Brainstorm: Speed matters more than completeness sometimes.',
                  duration: '4 min',
                  teacherNotes: 'Video calls: a dropped frame is better than waiting. Games: old position data is useless anyway.'
                },
                {
                  instruction: 'Create a comparison chart: TCP (reliable, ordered, slower, connection-oriented) vs UDP (unreliable, unordered, faster, connectionless).',
                  duration: '4 min',
                  teacherNotes: 'Neither is "better" - they\'re optimized for different use cases.'
                },
              ],
              formativeAssessment: 'Can students articulate the tradeoff? Do they understand why UDP exists despite not guaranteeing delivery?',
              differentiation: {
                support: 'Provide a pre-made comparison chart template to fill in.',
                extension: 'Research QUIC protocol - how does it try to get the best of both TCP and UDP?'
              }
            },
            {
              title: 'Real-World Comparison: Streaming vs Downloading',
              duration: '25 minutes',
              overview: 'Students observe the difference between TCP and UDP in action by comparing video streaming with file downloading.',
              steps: [
                {
                  instruction: 'Set up two activities: 1) Start downloading a large file (like a Linux ISO), 2) Start streaming a video on YouTube or similar.',
                  duration: '3 min',
                  teacherNotes: 'Use legitimate, school-appropriate sources. The download should be something you can pause/resume.'
                },
                {
                  instruction: 'Observe the download: Pause your internet briefly (disconnect WiFi). What happens to the download? It pauses. Reconnect - it resumes exactly where it left off.',
                  duration: '4 min',
                  teacherNotes: 'TCP reliability in action: every byte is tracked and none are lost, even with interruption.'
                },
                {
                  instruction: 'Observe the stream: With video playing, briefly degrade the connection (or simulate congestion). What happens? Quality drops, maybe buffering, but playback continues.',
                  duration: '4 min',
                  teacherNotes: 'Video streaming adapts: drops quality rather than pausing. Some frames are skipped entirely.'
                },
                {
                  instruction: 'Discussion: "If you\'re downloading software, would you want some bytes missing?" No! Corrupted file. "If you\'re watching video, do you need every frame?" Not really - you probably won\'t notice a few dropped frames.',
                  duration: '5 min',
                  teacherNotes: 'This is the core insight: some data is okay to lose, some isn\'t.'
                },
                {
                  instruction: 'Categorize common applications: Is this TCP or UDP? Web browsing (TCP), email (TCP), video calls (UDP), online gaming (UDP), file transfer (TCP), DNS queries (UDP).',
                  duration: '5 min',
                  teacherNotes: 'Some are tricky - streaming video often uses TCP now (HTTP-based streaming) but the concept still applies.'
                },
                {
                  instruction: 'Create a "Choose Your Protocol" decision tree: Does order matter? Is completeness required? Is latency critical? Each answer points to TCP or UDP.',
                  duration: '4 min',
                  teacherNotes: 'This becomes a reference for understanding any application\'s protocol choice.'
                },
              ],
              formativeAssessment: 'Can students predict which protocol an application uses based on its requirements?',
              differentiation: {
                support: 'Provide the decision tree structure with some branches pre-filled.',
                extension: 'Research: Netflix uses TCP (HTTPS streaming). How do they handle the latency issue? (Answer: buffering)'
              }
            },
            {
              title: 'Protocol Deep Dive Research',
              duration: '15 minutes',
              overview: 'Students research specific protocols to understand why they chose TCP or UDP, presenting their findings to the class.',
              steps: [
                {
                  instruction: 'Assign protocols to pairs/groups: VoIP (Voice over IP), FTP (File Transfer), DNS, TFTP, SMTP (Email), RTP (Real-time Transport).',
                  duration: '2 min',
                  teacherNotes: 'Mix of TCP and UDP protocols. Students will discover which uses which.'
                },
                {
                  instruction: 'Research questions: 1) Does this protocol use TCP or UDP? 2) WHY does it use that? 3) What would happen if it used the other?',
                  duration: '6 min',
                  teacherNotes: 'The WHY is most important. It should connect to the reliability/speed tradeoff.'
                },
                {
                  instruction: 'Quick presentations: Each group has 1 minute to share their protocol, what it uses, and why. Class can ask one follow-up question.',
                  duration: '5 min',
                  teacherNotes: 'Keep it snappy. The variety of answers reinforces that the choice depends on use case.'
                },
                {
                  instruction: 'Synthesis: "What patterns do we see? Which types of applications tend toward TCP? Which toward UDP?"',
                  duration: '2 min',
                  teacherNotes: 'Real-time, loss-tolerant → UDP. Reliable, complete data → TCP. This pattern should emerge.'
                },
              ],
              formativeAssessment: 'Did students correctly identify the transport protocol? Could they explain the reasoning behind the choice?',
              differentiation: {
                support: 'Provide a research guide with specific websites/pages to find the answers.',
                extension: 'Find a protocol that uses BOTH TCP and UDP (like DNS). When does it use each?'
              }
            },
          ],
        },
        {
          title: 'Packet Analysis with Wireshark - Part 1',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What packet capture actually does: how the network interface card can be put in "promiscuous mode" and what that means',
            'Why you can see all the layers at once: how Wireshark decodes encapsulated data and presents each layer\'s header',
            'What the different colors and protocols mean: how Wireshark identifies protocols and why it can decode so many formats',
            'The relationship between what you see and what\'s happening on the wire: raw bytes vs. decoded human-readable format',
          ],
          objectives: [
            'Install and configure Wireshark',
            'Capture network traffic on their interface',
            'Apply filters to isolate specific traffic',
            'Identify different protocol types in captured traffic',
          ],
          activities: [
            'Installation: Set up Wireshark with proper permissions',
            'First capture: Record traffic while browsing a website',
            'Filter practice: Isolate HTTP, DNS, and TCP traffic',
            'Packet inspection: Examine individual packets and their layers',
          ],
          materials: ['Wireshark software', 'Filter cheat sheet', 'Capture walkthrough guide'],
          detailedActivities: [
            {
              title: 'Wireshark Installation and First Launch',
              duration: '20 minutes',
              overview: 'Students install Wireshark and configure it for packet capture, understanding the permissions required and why.',
              steps: [
                {
                  instruction: 'Download Wireshark from wireshark.org. Choose the correct version for your operating system (Windows/Mac/Linux).',
                  duration: '3 min',
                  teacherNotes: 'Pre-download installers if network is slow. Verify checksums if teaching security awareness.'
                },
                {
                  instruction: 'Install Wireshark. On Windows, include Npcap when prompted. On Mac, you may need to grant accessibility permissions. Follow installer prompts.',
                  duration: '5 min',
                  teacherNotes: 'Npcap is required for packet capture on Windows. Without it, Wireshark is view-only.'
                },
                {
                  instruction: 'Discussion before launching: "Wireshark can see ALL network traffic on your interface. Why might this require special permissions?"',
                  duration: '3 min',
                  teacherNotes: 'Security concept: packet capture is powerful. It can see passwords on unencrypted connections.'
                },
                {
                  instruction: 'Launch Wireshark. You\'ll see a list of network interfaces. Identify your active interface (usually WiFi or Ethernet with activity shown).',
                  duration: '4 min',
                  teacherNotes: 'Active interfaces show a small activity graph. This helps identify which one to capture.'
                },
                {
                  instruction: 'Explore the interface: Menu bar, toolbar, interface list, recent captures. Don\'t capture yet - just get familiar.',
                  duration: '3 min',
                  teacherNotes: 'Point out: shark fin icon starts capture, red square stops. Filter bar will be used heavily.'
                },
                {
                  instruction: 'Ethics discussion: "With great power comes great responsibility. Capturing network traffic has legal and ethical implications. What are the rules?"',
                  duration: '2 min',
                  teacherNotes: 'Only capture your own traffic or traffic you have permission to analyze. Wiretapping laws exist!'
                },
              ],
              formativeAssessment: 'Can students launch Wireshark and identify their active network interface? Do they understand the permission requirements?',
              differentiation: {
                support: 'Provide step-by-step installation screenshots for each operating system.',
                extension: 'Research: What is "promiscuous mode"? When might you need it vs when is normal mode sufficient?'
              }
            },
            {
              title: 'Your First Packet Capture',
              duration: '25 minutes',
              overview: 'Students perform their first live packet capture while browsing a website, observing real network traffic in real-time.',
              steps: [
                {
                  instruction: 'Select your active network interface and click the shark fin (or double-click the interface) to start capturing. Watch packets flood in!',
                  duration: '2 min',
                  teacherNotes: 'The screen will fill with colored rows very quickly. This can be overwhelming - that\'s okay!'
                },
                {
                  instruction: 'Open a browser and visit http://example.com (a simple site). Watch Wireshark while the page loads. Notice the burst of activity.',
                  duration: '3 min',
                  teacherNotes: 'example.com is perfect for learning - it\'s simple and uses HTTP (not HTTPS), making traffic visible.'
                },
                {
                  instruction: 'Stop the capture (red square). Now you have a snapshot of all network traffic during that time. How many packets did you capture?',
                  duration: '2 min',
                  teacherNotes: 'Even a simple page load generates dozens of packets. A complex site generates hundreds or thousands.'
                },
                {
                  instruction: 'Explore the three panes: Packet List (top), Packet Details (middle), Packet Bytes (bottom). Click different packets and watch the details change.',
                  duration: '5 min',
                  teacherNotes: 'Packet List is overview, Details shows decoded headers, Bytes shows raw hex. Most work happens in Details.'
                },
                {
                  instruction: 'Find a packet with "HTTP" in the Protocol column. Click it. In Details, expand each layer: Ethernet, IP, TCP, HTTP. This is encapsulation made visible!',
                  duration: '6 min',
                  teacherNotes: 'Connect to TCP/IP lesson - each layer\'s header is right there. The "envelope" analogy is now concrete.'
                },
                {
                  instruction: 'Look at the colors. Wireshark color-codes by protocol. Blue/purple is usually TCP, light green is HTTP, yellow might be warnings. What patterns do you see?',
                  duration: '4 min',
                  teacherNotes: 'Colors help quickly identify traffic types. Customizable, but defaults are standard across the field.'
                },
                {
                  instruction: 'Save your capture: File → Save As. Save as .pcapng format. This capture file can be analyzed later or shared.',
                  duration: '3 min',
                  teacherNotes: 'PCAP files are industry standard. You\'ll download many for analysis in future lessons.'
                },
              ],
              formativeAssessment: 'Can students start/stop a capture and navigate the three panes? Can they identify the layers in the Packet Details?',
              differentiation: {
                support: 'Provide a labeled screenshot of the Wireshark interface with key areas highlighted.',
                extension: 'Start another capture and visit an HTTPS site. Can you see the HTTP content? Why or why not?'
              }
            },
            {
              title: 'Filter Mastery: Finding Needles in Haystacks',
              duration: '25 minutes',
              overview: 'Students learn to use display filters to isolate specific traffic, essential for analyzing large captures.',
              steps: [
                {
                  instruction: 'Start a new capture. Visit several websites, then stop. You now have mixed traffic. "How do we find just the HTTP traffic in this mess?"',
                  duration: '3 min',
                  teacherNotes: 'Without filters, finding specific traffic is nearly impossible. Filters are the core skill.'
                },
                {
                  instruction: 'In the filter bar, type: http - Press Enter. Notice only HTTP packets remain visible. The status bar shows "Displayed: X of Y packets".',
                  duration: '3 min',
                  teacherNotes: 'Display filters hide packets - they don\'t delete them. Clear the filter to see everything again.'
                },
                {
                  instruction: 'Try more filters: dns (show only DNS), tcp (show only TCP), udp (show only UDP). Clear between each to compare.',
                  duration: '4 min',
                  teacherNotes: 'Protocol filters are the simplest. Type the protocol name in lowercase.'
                },
                {
                  instruction: 'IP address filter: ip.addr == 93.184.216.34 (example.com\'s IP). This shows all traffic to/from that IP.',
                  duration: '4 min',
                  teacherNotes: 'Use the IP you found with nslookup. This isolates traffic to one destination.'
                },
                {
                  instruction: 'Port filter: tcp.port == 80 (HTTP port). This shows all traffic on port 80 regardless of protocol.',
                  duration: '3 min',
                  teacherNotes: 'Port filters are useful for finding specific services. 443 = HTTPS, 53 = DNS, etc.'
                },
                {
                  instruction: 'Combine filters: http && ip.addr == 93.184.216.34 - This shows only HTTP traffic to example.com. Powerful!',
                  duration: '4 min',
                  teacherNotes: 'Boolean operators: && (and), || (or), ! (not). Combine to build precise filters.'
                },
                {
                  instruction: 'Create a personal filter cheat sheet with: http, dns, tcp, udp, ip.addr==X, tcp.port==X, and the combination syntax.',
                  duration: '4 min',
                  teacherNotes: 'This reference card will be invaluable for future packet analysis work.'
                },
              ],
              formativeAssessment: 'Can students apply filters to isolate specific traffic? Can they combine filters with boolean operators?',
              differentiation: {
                support: 'Provide a pre-made filter cheat sheet. Focus on one filter at a time with practice.',
                extension: 'Research: What\'s the difference between display filters and capture filters? When would you use each?'
              }
            },
            {
              title: 'Packet Anatomy: Reading the Layers',
              duration: '20 minutes',
              overview: 'Students deeply examine individual packets, identifying information in each layer and connecting it to protocol concepts learned earlier.',
              steps: [
                {
                  instruction: 'Filter for http. Find a packet that says "GET" in the Info column. This is an HTTP request. Select it.',
                  duration: '2 min',
                  teacherNotes: 'GET requests are easy to find and understand. Perfect for demonstrating layer structure.'
                },
                {
                  instruction: 'Expand "Ethernet II" in Details. Find: Source MAC, Destination MAC. These are the Link layer addresses for this hop.',
                  duration: '3 min',
                  teacherNotes: 'Recall: MAC addresses are for local delivery. These might be your computer and your router.'
                },
                {
                  instruction: 'Expand "Internet Protocol". Find: Source IP, Destination IP, TTL, Protocol (TCP=6). These are the Internet layer fields.',
                  duration: '4 min',
                  teacherNotes: 'TTL decrements at each hop. Protocol tells us what\'s inside (6=TCP, 17=UDP).'
                },
                {
                  instruction: 'Expand "Transmission Control Protocol". Find: Source Port, Destination Port (80), Sequence Number, Acknowledgment, Flags (SYN, ACK, etc.).',
                  duration: '4 min',
                  teacherNotes: 'Connect to TCP lesson. These are the fields we talked about in the handshake activity!'
                },
                {
                  instruction: 'Expand "Hypertext Transfer Protocol". Find: Request Method (GET), Request URI (/), Host header. This is the Application layer content.',
                  duration: '4 min',
                  teacherNotes: 'This is what the web server sees. Method, path, and headers - just like in HTTP lesson.'
                },
                {
                  instruction: 'Look at the Bytes pane (bottom). Can you find the word "GET" in the hex dump? Find where the readable text appears.',
                  duration: '3 min',
                  teacherNotes: 'The right side shows ASCII. You can often read HTTP requests directly in the raw bytes.'
                },
              ],
              formativeAssessment: 'Can students identify information at each layer? Can they explain what role each field plays?',
              differentiation: {
                support: 'Provide a packet dissection worksheet with blanks to fill in for each layer\'s key fields.',
                extension: 'Find a TCP SYN packet (first packet of connection). Identify the flags. Find the corresponding SYN-ACK.'
              }
            },
          ],
        },
        {
          title: 'Packet Analysis with Wireshark - Part 2',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What "following a stream" means: how TCP reassembles ordered data from potentially out-of-order packets',
            'How to read the three-way handshake: what SYN, SYN-ACK, ACK really mean and why this "dance" is necessary',
            'What DNS packets reveal about your activity: every site you visit is broadcasted in plaintext (unless using encrypted DNS)',
            'Why traffic analysis is powerful: even without seeing content, patterns reveal behavior—this is what surveillance looks like',
          ],
          objectives: [
            'Follow a TCP stream to see complete conversations',
            'Capture and analyze a DNS query',
            'Identify the TCP three-way handshake in real traffic',
            'Export and document captured traffic',
          ],
          activities: [
            'TCP stream following: Watch a complete HTTP conversation',
            'DNS analysis: Capture and examine a DNS query and response',
            'Handshake hunting: Find and document a TCP three-way handshake',
            'Analysis report: Document findings from a capture session',
          ],
          materials: ['Wireshark', 'Analysis report template', 'Sample capture files'],
          detailedActivities: [
            {
              title: 'Following TCP Streams: The Complete Conversation',
              duration: '25 minutes',
              overview: 'Students learn to follow TCP streams to see complete HTTP conversations reassembled from individual packets.',
              steps: [
                {
                  instruction: 'Start a capture and visit http://example.com. Stop the capture. Filter for http. You see individual packets, but not the full conversation.',
                  duration: '3 min',
                  teacherNotes: 'HTTP conversations are spread across many packets. We need to reassemble them.'
                },
                {
                  instruction: 'Right-click on any HTTP packet and select "Follow" → "TCP Stream". A new window opens showing the complete conversation in readable format!',
                  duration: '4 min',
                  teacherNotes: 'The stream shows request (red) and response (blue). This is what was actually communicated.'
                },
                {
                  instruction: 'In the stream view, identify: the GET request, all headers, the server\'s response including the HTML content. This is the full HTTP exchange.',
                  duration: '5 min',
                  teacherNotes: 'Point out Content-Length, Server header, and the actual HTML. This is what your browser receives.'
                },
                {
                  instruction: 'Discussion: "Why were there so many packets for this simple exchange?" TCP breaks data into segments. Each packet carries a piece.',
                  duration: '3 min',
                  teacherNotes: 'Segmentation allows for reliable delivery - if one packet is lost, only that piece needs resending.'
                },
                {
                  instruction: 'Close the stream window. Notice Wireshark now has a filter applied showing only packets from that stream. Clear the filter.',
                  duration: '3 min',
                  teacherNotes: 'Following a stream automatically creates a filter. Useful for isolating specific conversations.'
                },
                {
                  instruction: 'Try following a different stream. Each TCP connection has its own stream. Multiple streams can exist to the same server (parallel connections).',
                  duration: '4 min',
                  teacherNotes: 'Modern browsers open multiple connections to speed up page loading. Each is a separate stream.'
                },
                {
                  instruction: 'Save a stream: In the stream window, click "Save As" to export the conversation as a text file for your report.',
                  duration: '3 min',
                  teacherNotes: 'Exported streams are useful for documentation and sharing findings.'
                },
              ],
              formativeAssessment: 'Can students follow a TCP stream and identify the request and response? Can they explain why streams are useful?',
              differentiation: {
                support: 'Provide a sample capture file with a known good HTTP conversation to practice on.',
                extension: 'Follow a stream from an HTTPS connection. What do you see? Why is it different?'
              }
            },
            {
              title: 'DNS Under the Microscope',
              duration: '20 minutes',
              overview: 'Students capture and analyze DNS traffic, seeing exactly what information is exposed when resolving domain names.',
              steps: [
                {
                  instruction: 'Start a new capture. Clear your DNS cache: Windows: ipconfig /flushdns, Mac: sudo dscacheutil -flushcache. This ensures fresh DNS queries.',
                  duration: '3 min',
                  teacherNotes: 'Flushing cache guarantees we\'ll see DNS queries for our target sites.'
                },
                {
                  instruction: 'Visit a website you haven\'t visited recently. Stop the capture. Filter: dns. You should see query and response packets.',
                  duration: '3 min',
                  teacherNotes: 'DNS uses UDP port 53. Queries are typically one packet, responses may be larger.'
                },
                {
                  instruction: 'Find a "Standard query" packet. Expand the DNS section in Details. Find: Query name (the domain you looked up), Query type (A = IPv4 address).',
                  duration: '4 min',
                  teacherNotes: 'This is what your DNS resolver sees every time you visit a site. In plaintext!'
                },
                {
                  instruction: 'Find the corresponding "Standard query response". Expand DNS. Find: Answers section with the IP address(es) returned.',
                  duration: '4 min',
                  teacherNotes: 'The answer contains the IP. Multiple IPs often indicate load balancing.'
                },
                {
                  instruction: 'Privacy discussion: "Your ISP runs your default DNS resolver. Looking at these packets, what does your ISP know about your browsing?"',
                  duration: '4 min',
                  teacherNotes: 'Answer: Every site you visit. Domain names in plaintext. Even with HTTPS, DNS reveals destinations.'
                },
                {
                  instruction: 'Capture several different site visits. Create a list of all domains queried. This is essentially your browsing history.',
                  duration: '2 min',
                  teacherNotes: 'This demonstrates the surveillance potential. ISPs, network admins, and attackers can see this.'
                },
              ],
              formativeAssessment: 'Can students find DNS queries and responses? Do they understand the privacy implications of plaintext DNS?',
              differentiation: {
                support: 'Provide a capture file with known DNS queries to analyze.',
                extension: 'Research DNS-over-HTTPS. Capture traffic while using a DoH-enabled browser. Can you still see DNS queries?'
              }
            },
            {
              title: 'Handshake Hunting: Finding the TCP Dance',
              duration: '20 minutes',
              overview: 'Students locate and document the TCP three-way handshake in real captured traffic, connecting theory to practice.',
              steps: [
                {
                  instruction: 'Use your existing capture or start a new one visiting http://example.com. Filter: tcp.flags.syn == 1 - This shows all packets with SYN flag set.',
                  duration: '3 min',
                  teacherNotes: 'SYN packets are the beginning of connections. There should be at least one for each TCP connection.'
                },
                {
                  instruction: 'Find a SYN packet (should say [SYN] in Info column). Note the source port and destination port (80 for HTTP).',
                  duration: '3 min',
                  teacherNotes: 'The source port is random (ephemeral), destination is the service port. This is the first handshake packet.'
                },
                {
                  instruction: 'Clear the filter. Find the next packet from the same connection (same ports, reversed). It should be [SYN, ACK] - the server\'s response.',
                  duration: '4 min',
                  teacherNotes: 'The server acknowledges our SYN and sends its own SYN. Two flags in one packet - efficiency!'
                },
                {
                  instruction: 'Find the third packet: [ACK] from client to server. Connection is now established. Compare to our paper exercise - it\'s the same dance!',
                  duration: '4 min',
                  teacherNotes: 'The three-way handshake complete. After this, data flows. Connect to the TCP lesson activity.'
                },
                {
                  instruction: 'Expand TCP details for each handshake packet. Find: Sequence numbers, Acknowledgment numbers. Watch how they increment.',
                  duration: '4 min',
                  teacherNotes: 'Seq numbers start random, then increment. Ack numbers confirm what was received. This is TCP in action.'
                },
                {
                  instruction: 'Document the handshake: Create a table with columns: Packet #, Source, Destination, Flags, Seq, Ack. Fill in for all three packets.',
                  duration: '2 min',
                  teacherNotes: 'This documentation will be part of the final analysis report.'
                },
              ],
              formativeAssessment: 'Can students locate the three-way handshake? Can they explain what each packet accomplishes?',
              differentiation: {
                support: 'Provide a screenshot with the three handshake packets highlighted and labeled.',
                extension: 'Find the connection teardown (FIN, FIN-ACK, ACK or RST). How does TCP end connections?'
              }
            },
            {
              title: 'Analysis Report: Documenting Your Findings',
              duration: '25 minutes',
              overview: 'Students create a professional analysis report documenting their packet capture findings, a skill used by network analysts.',
              steps: [
                {
                  instruction: 'Distribute the analysis report template with sections: Overview, Capture Details, Protocols Observed, Key Findings, Conclusions.',
                  duration: '2 min',
                  teacherNotes: 'Professional network analysts write reports. This practices that skill.'
                },
                {
                  instruction: 'Overview: Describe what you captured and why. "Captured traffic during a web browse session to analyze protocol behavior."',
                  duration: '3 min',
                  teacherNotes: 'Keep overview brief - who, what, when, why of the capture.'
                },
                {
                  instruction: 'Capture Details: Record number of packets, duration, interfaces used, any filters applied. Include the capture file name.',
                  duration: '3 min',
                  teacherNotes: 'Metadata is important for reproducibility. Someone else should be able to find this capture.'
                },
                {
                  instruction: 'Protocols Observed: List all protocols seen. For each, note: layer (application/transport/etc), count of packets, example use.',
                  duration: '5 min',
                  teacherNotes: 'Statistics menu in Wireshark helps with counts. Shows protocol distribution.'
                },
                {
                  instruction: 'Key Findings: Document 3 interesting observations. Examples: "Found complete HTTP conversation", "Observed 5 DNS queries", "Identified TCP handshake".',
                  duration: '6 min',
                  teacherNotes: 'This is the meat of the report. What did you discover? Include evidence from the capture.'
                },
                {
                  instruction: 'Conclusions: What did you learn? What surprised you? What questions do you still have?',
                  duration: '4 min',
                  teacherNotes: 'Reflection is important. Analysts always note what they learned and what needs more investigation.'
                },
                {
                  instruction: 'Share reports: Pairs exchange reports and provide feedback. Is it clear? Is it well-documented? Any missing information?',
                  duration: '2 min',
                  teacherNotes: 'Peer review improves quality and teaches reading technical documents.'
                },
              ],
              formativeAssessment: 'Is the report complete and professional? Does it accurately document the capture and findings?',
              differentiation: {
                support: 'Provide a partially completed example report as a model.',
                extension: 'Include screenshots from Wireshark in your report. Annotate them to highlight key packets.'
              }
            },
          ],
        },
        {
          title: 'Putting It All Together: Web Request Journey',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'How all the protocols work together: the layered cooperation from application (HTTP) through transport (TCP) to network (IP) to link (Ethernet/WiFi)',
            'Where decisions are made at each hop: what routers actually compute when forwarding packets, and how they know where to send things',
            'What "the cloud" really is: physical servers in data centers, connected by fiber cables and routers—there is no cloud, only other people\'s computers',
            'Why understanding this journey gives you power: knowing what happens helps you troubleshoot, protect your privacy, and build your own infrastructure',
          ],
          objectives: [
            'Trace a complete web request from browser to server and back',
            'Identify all protocols involved in loading a webpage',
            'Create a comprehensive diagram of internet communication',
          ],
          activities: [
            'Journey mapping: Document every step of loading a webpage',
            'Protocol identification: List all protocols used in loading google.com',
            'Comprehensive diagram: Create a poster showing the complete process',
            'Presentation: Explain the journey to the class',
          ],
          materials: ['Large paper for diagrams', 'Colored markers', 'Protocol reference materials'],
          detailedActivities: [
            {
              title: 'Journey Mapping: From Click to Content',
              duration: '30 minutes',
              overview: 'Students collaboratively map every step that occurs when loading a webpage, from clicking a link to seeing the page.',
              steps: [
                {
                  instruction: 'On a large whiteboard or paper, write "You type www.example.com and press Enter" at the left and "Page appears on screen" at the right. "What happens in between?"',
                  duration: '2 min',
                  teacherNotes: 'This is the challenge: fill in all the steps between these two events.'
                },
                {
                  instruction: 'Step 1 - DNS: "Before anything else, we need the IP address." Browser asks OS, OS asks resolver, resolver queries hierarchy. Add DNS boxes to the diagram.',
                  duration: '4 min',
                  teacherNotes: 'Draw arrows showing the DNS query path. Connect to DNS lesson. Return with IP address.'
                },
                {
                  instruction: 'Step 2 - TCP Handshake: "Now we have the IP, but we need a connection." Add SYN → SYN-ACK → ACK to the diagram.',
                  duration: '4 min',
                  teacherNotes: 'Three packets just to establish the connection. Connect to TCP lesson.'
                },
                {
                  instruction: 'Step 3 - TLS Handshake (if HTTPS): "For secure sites, encryption is negotiated." Add certificate exchange, key agreement to diagram.',
                  duration: '4 min',
                  teacherNotes: 'HTTPS adds more round trips. This is why HTTPS is slightly slower to start.'
                },
                {
                  instruction: 'Step 4 - HTTP Request: "Finally, we can ask for the page." Browser sends GET /. Add HTTP request arrow.',
                  duration: '3 min',
                  teacherNotes: 'This is what the user actually wanted - everything before was setup.'
                },
                {
                  instruction: 'Step 5 - Server Processing: "The server receives the request, finds the file, generates the response."',
                  duration: '3 min',
                  teacherNotes: 'Server-side processing varies hugely - could be milliseconds or seconds.'
                },
                {
                  instruction: 'Step 6 - HTTP Response: "Server sends back HTML, CSS, JavaScript, images - often in multiple responses." Add response arrows.',
                  duration: '4 min',
                  teacherNotes: 'The page isn\'t one response - it\'s many! Each resource is a separate request/response.'
                },
                {
                  instruction: 'Step 7 - Rendering: "Browser receives HTML, parses it, makes more requests for resources, builds the page."',
                  duration: '3 min',
                  teacherNotes: 'Rendering is complex. Modern pages make dozens of additional requests after the initial HTML.'
                },
                {
                  instruction: 'Review the complete diagram. Count: How many packets? How many round trips? How many different protocols?',
                  duration: '3 min',
                  teacherNotes: 'A simple page load might be 100+ packets. The complexity is usually invisible.'
                },
              ],
              formativeAssessment: 'Is the diagram complete from DNS to rendered page? Can students explain each step?',
              differentiation: {
                support: 'Provide a partially completed journey diagram with blank boxes to fill in.',
                extension: 'Add timing estimates to each step. What\'s the slowest part? What can be optimized?'
              }
            },
            {
              title: 'Protocol Scavenger Hunt',
              duration: '20 minutes',
              overview: 'Students identify every protocol involved in loading a complex webpage, categorizing them by layer.',
              steps: [
                {
                  instruction: 'Open Wireshark and start a capture. Visit google.com (or another feature-rich site). Stop the capture after the page fully loads.',
                  duration: '3 min',
                  teacherNotes: 'A complex site will show many protocols. Google is good because it uses HTTP/2, has many resources.'
                },
                {
                  instruction: 'Go to Statistics → Protocol Hierarchy. This shows every protocol seen in the capture, organized by layer.',
                  duration: '3 min',
                  teacherNotes: 'This is the treasure map. Students might see protocols they don\'t recognize.'
                },
                {
                  instruction: 'Create a protocol inventory: List every protocol shown. For each, note: what layer it belongs to, what percentage of traffic it represents.',
                  duration: '5 min',
                  teacherNotes: 'Common findings: Ethernet, IP, TCP, UDP, TLS, HTTP/2, DNS, QUIC, ICMP.'
                },
                {
                  instruction: 'Research unfamiliar protocols: Each student picks one protocol they don\'t recognize. Quick research: What does it do?',
                  duration: '5 min',
                  teacherNotes: 'QUIC, HTTP/2, and application-specific protocols are likely unknowns. Learning opportunity!'
                },
                {
                  instruction: 'Share findings: Go around the room. Each person explains one protocol they researched.',
                  duration: '4 min',
                  teacherNotes: 'Collective learning - everyone becomes expert on one protocol, class learns from each other.'
                },
              ],
              formativeAssessment: 'Can students identify protocols by layer? Did they successfully research unfamiliar protocols?',
              differentiation: {
                support: 'Provide a protocol reference sheet matching protocol names to descriptions.',
                extension: 'Compare protocol hierarchies between different sites. What protocols does YouTube use that Wikipedia doesn\'t?'
              }
            },
            {
              title: 'The Comprehensive Diagram',
              duration: '25 minutes',
              overview: 'Students create a detailed poster showing the complete web request journey with all protocols, devices, and paths.',
              steps: [
                {
                  instruction: 'Distribute large paper and colored markers. The goal: create a reference poster that explains web requests to someone who knows nothing.',
                  duration: '2 min',
                  teacherNotes: 'This is a synthesis activity. All knowledge from the unit comes together.'
                },
                {
                  instruction: 'Draw the devices: Your computer, your router, ISP router(s), internet (cloud), server. Use icons or labeled boxes.',
                  duration: '4 min',
                  teacherNotes: 'The "cloud" can be drawn as a cloud, but label it "many routers we don\'t control."'
                },
                {
                  instruction: 'Add the network layers: Use color coding. Blue = application (HTTP, DNS), green = transport (TCP, UDP), orange = network (IP), yellow = link (Ethernet, WiFi).',
                  duration: '5 min',
                  teacherNotes: 'Color coding helps viewers understand what operates at which layer.'
                },
                {
                  instruction: 'Draw the request path: Arrows showing data flowing from client to server. Label each arrow with the protocols used.',
                  duration: '4 min',
                  teacherNotes: 'Show how protocols are nested - HTTP inside TCP inside IP inside Ethernet.'
                },
                {
                  instruction: 'Draw the response path: Arrows going back. Note that the path might be different due to routing.',
                  duration: '3 min',
                  teacherNotes: 'Internet routing is not symmetric - packets can return via different paths.'
                },
                {
                  instruction: 'Add key facts: Include 2-3 important facts like "DNS happens first", "TCP ensures reliable delivery", "HTTPS encrypts content".',
                  duration: '4 min',
                  teacherNotes: 'These callouts highlight the most important concepts for viewers.'
                },
                {
                  instruction: 'Title and sign your diagram. Prepare a 1-minute explanation of your poster.',
                  duration: '3 min',
                  teacherNotes: 'Ownership and preparation for presentation.'
                },
              ],
              formativeAssessment: 'Does the diagram accurately represent the web request journey? Is it understandable to newcomers?',
              differentiation: {
                support: 'Provide a template with device outlines and layer sections pre-drawn.',
                extension: 'Add a "what can go wrong" section showing failure points: DNS fails, TCP times out, certificate invalid.'
              }
            },
            {
              title: 'Journey Presentations',
              duration: '15 minutes',
              overview: 'Students present their diagrams to the class, explaining the web request journey and fielding questions.',
              steps: [
                {
                  instruction: 'Gallery walk setup: Post all diagrams around the room. Students walk and observe for 5 minutes.',
                  duration: '5 min',
                  teacherNotes: 'This allows everyone to see different approaches before formal presentations.'
                },
                {
                  instruction: 'Select 3-4 diagrams with different approaches for formal presentation. Each presenter has 2 minutes to explain their diagram.',
                  duration: '8 min',
                  teacherNotes: 'Choose diagrams that emphasize different aspects or use different visualization styles.'
                },
                {
                  instruction: 'Synthesis: "What do all the diagrams have in common? What surprised you about someone else\'s approach?"',
                  duration: '2 min',
                  teacherNotes: 'Common elements reinforce core concepts. Different approaches show there\'s no single "right" way to visualize.'
                },
              ],
              formativeAssessment: 'Can students explain the journey clearly? Can they answer questions about specific steps?',
              differentiation: {
                support: 'Allow students to present in pairs for confidence.',
                extension: 'Explain what would be different if the user were on a VPN or using Tor.'
              }
            },
          ],
        },
        {
          title: 'Security Implications & Project Showcase',
          duration: '75 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What attackers on your network can actually see: the difference between metadata (visible) and content (encrypted with HTTPS)',
            'Why coffee shop WiFi is dangerous: ARP spoofing, evil twin attacks, and how your traffic can be intercepted',
            'What VPNs and Tor actually do: shifting trust, encrypting tunnels, and why they\'re not magic privacy solutions',
            'Why this matters for communities: surveillance, censorship, and the importance of infrastructure you control',
          ],
          objectives: [
            'Understand why HTTPS is important for privacy',
            'Identify security risks of unencrypted traffic',
            'Present their protocol analysis findings',
          ],
          activities: [
            'Security discussion: What can someone see on an unencrypted network?',
            'HTTPS inspection: What does encrypted traffic look like in Wireshark?',
            'Final presentations: Students present their journey diagrams',
            'Reflection: How does this knowledge help with tech sovereignty?',
          ],
          materials: ['Presentation materials', 'Reflection worksheet', 'Encrypted vs. unencrypted traffic examples'],
          detailedActivities: [
            {
              title: 'The Coffee Shop Threat Model',
              duration: '20 minutes',
              overview: 'Students explore what an attacker on a shared network can see, understanding the difference between encrypted and unencrypted traffic.',
              steps: [
                {
                  instruction: 'Scenario: "You\'re at a coffee shop using free WiFi. Someone at the next table has Wireshark running on their laptop. What can they see about your activity?"',
                  duration: '3 min',
                  teacherNotes: 'This is realistic - packet capture on shared WiFi is trivial. Make it concrete and slightly scary.'
                },
                {
                  instruction: 'List what\'s visible: MAC addresses of all devices, IP addresses, DNS queries (every site you visit), unencrypted HTTP content, even if not your own traffic.',
                  duration: '4 min',
                  teacherNotes: 'On shared networks, you can see EVERYONE\'s traffic. This is called "promiscuous mode" capture.'
                },
                {
                  instruction: 'What\'s protected by HTTPS: The content of your web pages, form data, login credentials. But NOT the fact that you visited the site (domain visible in DNS, TLS handshake).',
                  duration: '4 min',
                  teacherNotes: 'HTTPS is crucial but not complete privacy. Metadata still reveals a lot.'
                },
                {
                  instruction: 'Demonstrate: Show a capture with HTTP traffic (example.com) and HTTPS traffic (google.com). Point out what\'s readable vs encrypted.',
                  duration: '5 min',
                  teacherNotes: 'HTTP shows full content. HTTPS shows TLS Client Hello with SNI (domain) but content is encrypted gibberish.'
                },
                {
                  instruction: 'Discussion: "What could an attacker do with this information?" Steal credentials (if HTTP), profile your interests, know your bank/doctor/etc., targeted phishing.',
                  duration: '4 min',
                  teacherNotes: 'Make it real: knowing someone visits a specific health site or dating app is sensitive information.'
                },
              ],
              formativeAssessment: 'Can students articulate what\'s protected by HTTPS and what\'s not? Do they understand the coffee shop threat model?',
              differentiation: {
                support: 'Provide a comparison chart: "HTTP vs HTTPS: What\'s visible?"',
                extension: 'Research: What is an "evil twin" attack? How does it make the coffee shop threat even worse?'
              }
            },
            {
              title: 'VPNs and Tor: What They Actually Do',
              duration: '15 minutes',
              overview: 'Students understand how VPNs and Tor work at a network level, and what they protect (and don\'t protect).',
              steps: [
                {
                  instruction: 'Draw VPN on the board: Your computer → Encrypted tunnel → VPN Server → Internet. What can the coffee shop attacker see now?',
                  duration: '3 min',
                  teacherNotes: 'With VPN, local attacker sees encrypted tunnel to VPN server. All actual destinations are hidden.'
                },
                {
                  instruction: 'But the VPN provider sees everything. You\'ve shifted trust, not eliminated it. "Do you trust the coffee shop owner or the VPN company?"',
                  duration: '3 min',
                  teacherNotes: 'VPNs don\'t create privacy - they move the trust point. Some VPNs log everything!'
                },
                {
                  instruction: 'Draw Tor: Your computer → Node 1 → Node 2 → Node 3 → Internet. Each node only knows the previous and next hop. No single point knows everything.',
                  duration: '4 min',
                  teacherNotes: 'Tor is "onion routing" - layers of encryption peeled at each hop. More privacy than VPN, slower.'
                },
                {
                  instruction: 'Limitations of both: They don\'t protect against you logging into your personal accounts, cookies, fingerprinting. The website still knows it\'s you.',
                  duration: '3 min',
                  teacherNotes: 'Privacy tools are not magic. If you log into Facebook over Tor, Facebook still knows it\'s you.'
                },
                {
                  instruction: 'Connect to tech sovereignty: "Running your own VPN or Tor relay means YOU control part of this infrastructure."',
                  duration: '2 min',
                  teacherNotes: 'Community-run infrastructure is more trustworthy than commercial services with unknown logging policies.'
                },
              ],
              formativeAssessment: 'Can students explain what a VPN encrypts? Do they understand that VPNs shift trust rather than eliminate it?',
              differentiation: {
                support: 'Provide pre-drawn network diagrams for VPN and Tor.',
                extension: 'Research: What is "Tor over VPN" vs "VPN over Tor"? When would you use each?'
              }
            },
            {
              title: 'Final Presentations: Protocol Journeys',
              duration: '25 minutes',
              overview: 'Students present their comprehensive web request journey diagrams, demonstrating their understanding of internet protocols.',
              steps: [
                {
                  instruction: 'Setup: Post all journey diagrams created in previous lesson. Each presenter has their diagram visible.',
                  duration: '2 min',
                  teacherNotes: 'This is the culmination of the unit. Celebrate the work students have done.'
                },
                {
                  instruction: 'Presentation format: Each group has 3 minutes. Explain: Starting point, ending point, major steps, most interesting protocol, one thing that surprised you.',
                  duration: '1 min',
                  teacherNotes: 'Structure helps ensure presentations are focused and complete.'
                },
                {
                  instruction: 'Presentations: Groups present their diagrams. After each, 1-2 questions from the audience or instructor.',
                  duration: '18 min',
                  teacherNotes: 'Adjust time based on number of groups. Celebrate good insights and correct any misconceptions gently.'
                },
                {
                  instruction: 'Instructor synthesis: Highlight common themes, note creative approaches, reinforce key concepts that will carry forward.',
                  duration: '4 min',
                  teacherNotes: 'Connect to next project: "Now that you understand protocols, you can build infrastructure that uses them."'
                },
              ],
              formativeAssessment: 'Can students present their understanding clearly? Do presentations demonstrate accurate protocol knowledge?',
              differentiation: {
                support: 'Allow presenting in pairs. Provide note cards with key points to cover.',
                extension: 'Field advanced questions: "What if the server was in another country? What changes?"'
              }
            },
            {
              title: 'Reflection: Knowledge as Power',
              duration: '15 minutes',
              overview: 'Students reflect on how their understanding of network protocols contributes to tech sovereignty and community empowerment.',
              steps: [
                {
                  instruction: 'Reflection prompt 1: "Before this project, the internet was a magic black box. What do you understand now that you didn\'t before?"',
                  duration: '4 min',
                  teacherNotes: 'Written reflection. Give time for genuine thinking.'
                },
                {
                  instruction: 'Reflection prompt 2: "How does understanding protocols help communities control their own technology?"',
                  duration: '4 min',
                  teacherNotes: 'Connect to tech sovereignty theme: knowledge enables building, troubleshooting, making informed choices.'
                },
                {
                  instruction: 'Share out: Volunteers share one insight. Note recurring themes on the board.',
                  duration: '4 min',
                  teacherNotes: 'Common themes: "I can troubleshoot now", "I understand privacy better", "I can explain to others".'
                },
                {
                  instruction: 'Looking ahead: "In the next project, we\'ll use this knowledge to build mesh networks - community-owned infrastructure. Your protocol knowledge will be essential."',
                  duration: '3 min',
                  teacherNotes: 'Bridge to Project 3. The knowledge they built will be used, not just tested.'
                },
              ],
              formativeAssessment: 'Do reflections demonstrate genuine understanding growth? Can students connect knowledge to empowerment?',
              differentiation: {
                support: 'Provide sentence starters for reflection prompts.',
                extension: 'Write a "Letter to your past self" explaining what you now understand about how the internet works.'
              }
            },
          ],
        },
      ],
      assessment: {
        formative: [
          'Protocol identification quizzes',
          'Wireshark capture challenges (find specific traffic)',
          'Peer teaching sessions on assigned protocols',
          'Exit tickets with packet analysis questions',
        ],
        summative: 'Students will perform a complete packet capture session, document the capture with screenshots and annotations, and create a detailed diagram showing the journey of a web request. They must correctly identify at least 5 different protocols and explain their roles.',
      },
      extensions: [
        'Analyze traffic from different applications (games, streaming, messaging)',
        'Set up a local web server and analyze the traffic',
        'Research and present on a protocol not covered (FTP, SMTP, SSH)',
        'Investigate how VPNs change what you see in packet captures',
        'Explore IPv6 differences from IPv4',
      ],
      realWorldConnections: [
        'Network administrators use packet analysis daily for troubleshooting',
        'Security professionals analyze traffic to detect intrusions',
        'Understanding protocols helps you recognize phishing and security threats',
        'ISPs and governments can see unencrypted traffic—understanding this is crucial for privacy',
      ],
    },
    {
      id: 'project-3',
      title: 'Creating a Mesh Network',
      description: 'Build a resilient mesh network that doesn\'t depend on centralized infrastructure. Connect neighbors and share resources.',
      difficulty: 'Intermediate',
      duration: '4-6 weeks',
      gradeBand: '9-12',
      overview: `Mesh networks represent a fundamentally different approach to connectivity—one where every participant helps extend the network rather than depending on a central provider. In this project, students will build a small-scale mesh network using readily available hardware, learning about mesh routing protocols, network resilience, and the principles behind community wireless networks. This project directly connects to tech sovereignty by showing how communities can build their own communication infrastructure.`,
      learningObjectives: [
        'Explain the difference between hub-and-spoke and mesh network topologies',
        'Configure wireless devices to operate in mesh mode',
        'Understand mesh routing protocols (BATMAN, OLSR, or similar)',
        'Test network resilience by removing nodes and measuring recovery',
        'Plan coverage areas and optimal node placement',
        'Address common mesh network challenges (interference, bandwidth sharing)',
      ],
      prerequisites: [
        'Completion of Projects 1 and 2 or equivalent knowledge',
        'Comfort with command line and basic Linux operations',
        'Understanding of IP addressing and routing concepts',
      ],
      materials: {
        required: [
          '3+ wireless routers capable of mesh networking (GL.iNet, Ubiquiti, or similar)',
          'OpenWrt-compatible devices OR pre-configured mesh devices',
          'Ethernet cables for initial configuration',
          'Computers for configuration and testing',
        ],
        optional: [
          'Outdoor enclosures for weatherproofing',
          'Directional antennas for longer range',
          'PoE (Power over Ethernet) injectors',
          'Network mapping software',
          'Signal strength measurement app',
        ],
      },
      lessons: [
        {
          title: 'Network Topologies: Why Mesh Matters',
          duration: '75 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why topology matters: how the shape of a network determines its resilience, cost, and who controls it',
            'The single point of failure problem: why hub-and-spoke networks are vulnerable and what "decentralized" really means',
            'How mesh networks solve the control problem: no single party can shut down the network or deny access',
            'The tradeoff between simplicity and resilience: why mesh is harder to set up but harder to break',
          ],
          objectives: [
            'Compare different network topologies (star, bus, ring, mesh)',
            'Explain advantages and disadvantages of mesh networks',
            'Identify real-world examples of mesh networks',
          ],
          activities: [
            'Topology simulation: Groups create different network types with string and paper "nodes"',
            'Failure testing: What happens when a node fails in each topology?',
            'Case studies: Research community mesh networks (Guifi, NYC Mesh, Freifunk)',
            'Discussion: Why might communities choose mesh over traditional ISPs?',
          ],
          materials: ['String', 'Paper for nodes', 'Topology diagrams', 'Case study materials'],
          detailedActivities: [
            {
              title: 'Build the Topologies: A Kinesthetic Simulation',
              duration: '20 minutes',
              overview: 'Students physically construct different network topologies using string and paper "nodes" to viscerally understand how network shape affects behavior.',
              steps: [
                {
                  instruction: 'Divide class into 4 groups. Each group will build one topology: Star, Bus, Ring, and Mesh. Distribute materials: 6 paper "node" circles and 1 ball of string per group.',
                  duration: '2 min',
                  teacherNotes: 'Have premade node circles with "Computer" written on them. One node per group should be marked "Router" or "Switch" for hub-and-spoke demos.'
                },
                {
                  instruction: 'Star group: Place the "Router" node in the center. Connect all other nodes to ONLY the center node with string. No node should connect directly to another node.',
                  duration: '3 min',
                  teacherNotes: 'This is how most home networks work—everything connects through the router.'
                },
                {
                  instruction: 'Bus group: Lay out one long main string (the "bus"). Attach each node to the bus with a short string. Nodes connect to the bus, not to each other.',
                  duration: '3 min',
                  teacherNotes: 'Older network topology. If the bus cable fails, everything downstream is cut off.'
                },
                {
                  instruction: 'Ring group: Connect nodes in a circle—each node connects to exactly two neighbors. The last node connects back to the first.',
                  duration: '3 min',
                  teacherNotes: 'Data travels around the ring. Single point of failure in basic ring; dual-ring (FDDI) adds redundancy.'
                },
                {
                  instruction: 'Mesh group: Connect EVERY node to EVERY other node with string. This gets messy—that\'s the point! Count the connections needed.',
                  duration: '4 min',
                  teacherNotes: 'Full mesh with 6 nodes = 15 connections. Formula: n(n-1)/2. Expensive but extremely resilient.'
                },
                {
                  instruction: 'Gallery walk: Each group presents their topology. Others observe the physical structure. Instructor asks: "What happens if I cut this string?" for each type.',
                  duration: '5 min',
                  teacherNotes: 'Key insight: Star fails if center fails. Bus fails if backbone fails. Ring fails if any link fails. Mesh keeps working.'
                },
              ],
              formativeAssessment: 'Can each group explain what happens to their topology if one link is "cut"? Do students see why mesh is more resilient?',
              differentiation: {
                support: 'Provide topology diagram templates that students can trace with string. Label which nodes connect to which.',
                extension: 'Calculate the number of connections needed for a full mesh of 10, 20, 100 nodes. Why is full mesh impractical at scale? (Leads to partial mesh discussion.)'
              }
            },
            {
              title: 'The Failure Game: Simulating Network Outages',
              duration: '15 minutes',
              overview: 'Students simulate message passing through their topologies and experience firsthand what happens when nodes fail.',
              steps: [
                {
                  instruction: 'Each group selects one person to be "the internet" (the node that has the information everyone needs). Everyone else will try to send a "request" to that node.',
                  duration: '2 min',
                  teacherNotes: 'Use small paper "packets" that students pass along the strings to simulate data flow.'
                },
                {
                  instruction: 'Round 1: All links working. Pass a "request" packet from one end to "the internet" node and back. Count how many "hops" (string segments) it takes.',
                  duration: '3 min',
                  teacherNotes: 'Star: always 2 hops max. Bus: varies by position. Ring: up to n/2 hops. Mesh: often 1 hop (direct).'
                },
                {
                  instruction: 'Round 2: Instructor "fails" a critical node in each topology. Star: fail the center. Bus: cut the bus. Ring: cut any link. Mesh: remove any node.',
                  duration: '2 min',
                  teacherNotes: 'Have students put down or hide the "failed" string connection physically.'
                },
                {
                  instruction: 'Try to send the same request again. Which topologies can still deliver the packet? Which are completely broken?',
                  duration: '3 min',
                  teacherNotes: 'Only mesh survives with alternative paths. This is the "aha" moment for mesh resilience.'
                },
                {
                  instruction: 'Discussion: "If you were building a network for your community and you knew the central router might fail or be shut down, which topology would you choose? Why?"',
                  duration: '5 min',
                  teacherNotes: 'Connect to tech sovereignty: mesh can\'t be controlled or shut down by a single authority.'
                },
              ],
              formativeAssessment: 'Do students understand why mesh networks are resilient? Can they articulate the tradeoff (more connections = more complex)?',
              differentiation: {
                support: 'Walk through the failure scenarios step by step on the board before students try them.',
                extension: 'What about "partial mesh"? How many connections do you need for reasonable resilience without full mesh complexity?'
              }
            },
            {
              title: 'Real-World Mesh: NYC Mesh Case Study',
              duration: '20 minutes',
              overview: 'Students research and analyze NYC Mesh as a real-world example of community mesh networking, understanding how the theory translates to practice.',
              steps: [
                {
                  instruction: 'Show the NYC Mesh node map (nycmesh.net/map). Ask: "What do you notice? Why are nodes concentrated in certain areas?"',
                  duration: '3 min',
                  teacherNotes: 'Dense areas make mesh easier. Note the supernode locations—these provide backbone connectivity.'
                },
                {
                  instruction: 'Read together (or summarize): The NYC Mesh "How It Works" page. Key concepts: nodes, supernodes, hubs, volunteer installs.',
                  duration: '5 min',
                  teacherNotes: 'Emphasize: this is REAL infrastructure built by volunteers. Not theoretical—people use it for internet access.'
                },
                {
                  instruction: 'Discussion prompt: "NYC Mesh says \'We are not an ISP.\' What do they mean? How is a community network different from Verizon or Comcast?"',
                  duration: '5 min',
                  teacherNotes: 'Key differences: non-profit, community-owned, no surveillance, resilient, volunteer-driven.'
                },
                {
                  instruction: 'Small groups: Assign each group a different community network (Guifi.net, Freifunk, Detroit Community Tech). 5 minutes to find: Where? How big? What technology?',
                  duration: '5 min',
                  teacherNotes: 'Guifi is in Catalonia (huge!), Freifunk is German, Detroit focuses on underserved neighborhoods.'
                },
                {
                  instruction: 'Report back: Each group shares one surprising thing they learned. Synthesize: What do these projects have in common?',
                  duration: '2 min',
                  teacherNotes: 'Common themes: volunteer-driven, community ownership, filling gaps left by commercial ISPs, promoting digital equity.'
                },
              ],
              formativeAssessment: 'Can students explain what makes community mesh networks different from commercial ISPs? Do they understand the social/political dimensions?',
              differentiation: {
                support: 'Provide a structured note-taking template for the research (Network name, Location, # of nodes, Year started, Key technology).',
                extension: 'Research: What challenges do community networks face? Find one story of conflict with an ISP or regulatory challenge.'
              }
            },
            {
              title: 'Why Mesh for Our Community? Synthesis Discussion',
              duration: '20 minutes',
              overview: 'Students synthesize their learning to discuss why communities might choose mesh over traditional ISPs, connecting technical knowledge to community values.',
              steps: [
                {
                  instruction: 'Silent reflection (2 min): "Think of a community you belong to—school, neighborhood, family, online community. What would it mean for that community to own its own internet infrastructure?"',
                  duration: '3 min',
                  teacherNotes: 'Give genuine quiet time for reflection. This bridges technical learning to personal meaning.'
                },
                {
                  instruction: 'Pair-share: Discuss your reflection with a partner. Then discuss: What barriers might prevent a community from building their own network?',
                  duration: '4 min',
                  teacherNotes: 'Expected barriers: cost, technical knowledge, time, organization, legal issues, existing ISP contracts.'
                },
                {
                  instruction: 'Full class: Create a T-chart on the board: "Reasons FOR community mesh" vs. "Challenges to overcome." Populate from pair discussions.',
                  duration: '5 min',
                  teacherNotes: 'FOR: control, privacy, no monthly fees (after setup), resilience, community building, digital equity. CHALLENGES: upfront cost, expertise, maintenance, scale.'
                },
                {
                  instruction: 'Instructor synthesis: "This track is about moving from understanding these reasons to being able to actually build the infrastructure. By the end, you\'ll be able to set up a mesh network and plan a community deployment."',
                  duration: '3 min',
                  teacherNotes: 'Set expectation: this is a journey from theory to practice. Each lesson builds toward real capability.'
                },
                {
                  instruction: 'Exit ticket: "Write one reason why mesh networks support community independence, and one question you still have about how they work."',
                  duration: '5 min',
                  teacherNotes: 'Collect exit tickets to inform future lessons. Address common questions at start of next class.'
                },
              ],
              formativeAssessment: 'Do exit tickets demonstrate understanding of why mesh matters? Are questions about "how" (good—shows curiosity) or fundamental confusion about "what" (needs review)?',
              differentiation: {
                support: 'Provide sentence starters for exit ticket: "Mesh networks support community independence because..." / "I still wonder..."',
                extension: 'Write a persuasive paragraph: "Why my neighborhood should consider building a mesh network."'
              }
            },
          ],
        },
        {
          title: 'Introduction to OpenWrt',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What firmware actually is: the software that runs on embedded devices, and why routers have operating systems just like computers',
            'Why manufacturers lock down their firmware: business incentives vs. user freedom, and what "open source" means for hardware',
            'What OpenWrt enables that stock firmware doesn\'t: custom packages, advanced networking features, full control over your device',
            'The risks and power of replacing firmware: what can go wrong (bricking), and why it\'s worth learning',
          ],
          objectives: [
            'Understand what OpenWrt is and why it\'s used',
            'Successfully flash OpenWrt to a router (or understand the process)',
            'Navigate the OpenWrt web interface (LuCI)',
            'Configure basic wireless settings in OpenWrt',
          ],
          activities: [
            'Discussion: Why would we replace manufacturer firmware?',
            'Firmware installation: Flash OpenWrt to test router (or use pre-flashed devices)',
            'Interface exploration: Tour of LuCI web interface',
            'Configuration: Set up basic wireless network on OpenWrt',
          ],
          materials: ['OpenWrt-compatible router', 'Firmware files', 'Computer with Ethernet', 'Recovery instructions'],
          detailedActivities: [
            {
              title: 'Why Open Source Firmware? A Critical Discussion',
              duration: '20 minutes',
              overview: 'Students explore why manufacturer firmware is limiting and how open source alternatives like OpenWrt provide freedom and control.',
              steps: [
                {
                  instruction: 'Show a typical consumer router\'s web interface (screenshot or demo). Ask: "What CAN you configure here? What CAN\'T you configure?"',
                  duration: '4 min',
                  teacherNotes: 'Typical consumer routers limit you to: WiFi password, basic port forwarding, maybe parental controls. No VPN server, no advanced routing, no package installation.'
                },
                {
                  instruction: 'Discussion prompt: "Your router is a small computer running software. Why would the manufacturer limit what you can do with hardware you own?"',
                  duration: '4 min',
                  teacherNotes: 'Answers: Reduce support burden, upsell "business" features, planned obsolescence, prevent "misuse", security through obscurity.'
                },
                {
                  instruction: 'Show the OpenWrt package list (openwrt.org/packages). "This is what a router CAN do when you have full control." Highlight: VPN, ad-blocking, mesh networking, bandwidth monitoring.',
                  duration: '4 min',
                  teacherNotes: 'OpenWrt has thousands of packages. The same $30 router can become a VPN server, mesh node, network monitor, or IoT hub.'
                },
                {
                  instruction: 'Brief history: OpenWrt started in 2004 when Linksys released router source code (required by GPL). Volunteers built a full Linux distribution for routers.',
                  duration: '3 min',
                  teacherNotes: 'This is open source activism in action—using legal requirements (GPL) to create community-controlled technology.'
                },
                {
                  instruction: 'Connect to tech sovereignty: "When you control your router, you control your network. Your router sees ALL your traffic. Do you trust the manufacturer\'s software?"',
                  duration: '5 min',
                  teacherNotes: 'Some routers have been found with backdoors, some phone home with analytics. Open source is auditable.'
                },
              ],
              formativeAssessment: 'Can students articulate why controlling router firmware matters? Do they understand the relationship between device control and network privacy?',
              differentiation: {
                support: 'Create a comparison chart: Stock Firmware vs OpenWrt with specific features listed.',
                extension: 'Research: Find a news story about a router security vulnerability or backdoor. How might open source have helped?'
              }
            },
            {
              title: 'The Flashing Process: Understanding Firmware Installation',
              duration: '40 minutes',
              overview: 'Students either flash OpenWrt to a router or work through a detailed simulation understanding each step and its purpose.',
              steps: [
                {
                  instruction: 'Safety first: Explain "bricking"—if something goes wrong, the router might not boot. Show the recovery documentation. Emphasize: always have recovery instructions ready.',
                  duration: '5 min',
                  teacherNotes: 'Bricking is usually recoverable via TFTP or serial console, but it\'s scary. Manage expectations—this is real hardware hacking.'
                },
                {
                  instruction: 'Step 1: Identify your router model EXACTLY. Show how to find model and version number on the device. Go to OpenWrt Table of Hardware and find the correct firmware.',
                  duration: '8 min',
                  teacherNotes: 'Wrong firmware = bricked router. Version matters (e.g., v1 vs v2 might be completely different hardware internally).'
                },
                {
                  instruction: 'Step 2: Download firmware AND verify checksum. "Why verify? A corrupted file could brick your device." Show how to compare SHA256 checksums.',
                  duration: '7 min',
                  teacherNotes: 'Checksums verify file integrity. This is a good habit for any software download, not just firmware.'
                },
                {
                  instruction: 'Step 3: Connect via Ethernet (NOT WiFi). Access stock firmware web interface. Navigate to firmware upgrade section.',
                  duration: '5 min',
                  teacherNotes: 'WiFi might drop during flash, interrupting the process. Ethernet is stable and required.'
                },
                {
                  instruction: 'Step 4: Upload the OpenWrt firmware file. Watch the progress. DO NOT unplug power or close the browser. Wait for reboot.',
                  duration: '10 min',
                  teacherNotes: 'This is the scary part. The router will reboot multiple times. LEDs will blink. Wait at least 5 minutes before assuming failure.'
                },
                {
                  instruction: 'Step 5: Access OpenWrt at 192.168.1.1 via Ethernet. If it works, you\'ll see LuCI login. Default: no password. First task: set a root password!',
                  duration: '5 min',
                  teacherNotes: 'Success! If LuCI loads, the flash worked. Celebrate this moment—students just took control of their hardware.'
                },
              ],
              formativeAssessment: 'Can students explain why each step matters? Do they understand the risks and how to mitigate them?',
              differentiation: {
                support: 'Provide a printed checklist with each step. Work in pairs with instructor oversight.',
                extension: 'Research TFTP recovery for your router model. What would you do if the router seemed bricked?'
              }
            },
            {
              title: 'Exploring LuCI: The OpenWrt Web Interface',
              duration: '30 minutes',
              overview: 'Students explore the OpenWrt web interface, discovering the powerful configuration options now available to them.',
              steps: [
                {
                  instruction: 'Navigate the main menu: Status, Network, System, Services, and (if installed) additional packages. "This is your router\'s control center now."',
                  duration: '5 min',
                  teacherNotes: 'LuCI is comprehensive but can be overwhelming. Orient students before letting them explore.'
                },
                {
                  instruction: 'Status page tour: What information is available? Uptime, memory usage, connected clients, traffic graphs. Compare to what stock firmware showed.',
                  duration: '5 min',
                  teacherNotes: 'Stock firmware hides most of this. OpenWrt shows everything—the router has nothing to hide from you.'
                },
                {
                  instruction: 'Guided exploration: Network → Interfaces. See WAN (internet connection) and LAN (local network). Click around—what can you configure?',
                  duration: '8 min',
                  teacherNotes: 'DHCP settings, static leases, VLANs, bridges—all configurable. Don\'t change anything yet, just explore.'
                },
                {
                  instruction: 'System → Software. "This is the package manager. You can install new capabilities." Show how to search for packages (don\'t install yet).',
                  duration: '7 min',
                  teacherNotes: 'This is where mesh packages, VPN servers, ad blockers, etc. live. Thousands of options.'
                },
                {
                  instruction: 'Scavenger hunt: Find where you would configure: (1) WiFi password, (2) DHCP lease time, (3) System hostname, (4) Firewall rules.',
                  duration: '5 min',
                  teacherNotes: 'Answers: (1) Network→Wireless, (2) Network→Interfaces→LAN→DHCP, (3) System→System, (4) Network→Firewall.'
                },
              ],
              formativeAssessment: 'Can students navigate to key configuration pages? Do they understand the scope of what\'s now configurable?',
              differentiation: {
                support: 'Provide a "LuCI map" showing where common settings are located.',
                extension: 'Find the System → Startup page. What services are running? Research what each one does.'
              }
            },
            {
              title: 'First Configuration: Securing and Customizing Your Router',
              duration: '30 minutes',
              overview: 'Students make their first real configurations—setting up a secure, customized OpenWrt installation.',
              steps: [
                {
                  instruction: 'Priority 1: Set a root password. System → Administration. Use a strong password. "This protects SSH access to your router."',
                  duration: '5 min',
                  teacherNotes: 'Without a password, anyone on the network can SSH in and take control. This is CRITICAL.'
                },
                {
                  instruction: 'Set up WiFi: Network → Wireless. Create a network with custom SSID and WPA2/WPA3 password. Enable the interface.',
                  duration: '8 min',
                  teacherNotes: 'This is practical—students should leave with a working WiFi network they configured themselves.'
                },
                {
                  instruction: 'Customize: System → System. Set a meaningful hostname (e.g., "mesh-node-1" or "classroom-router"). Set timezone.',
                  duration: '5 min',
                  teacherNotes: 'Good hostnames matter when you have multiple routers. Naming conventions help organization.'
                },
                {
                  instruction: 'Test: Connect a device to your new WiFi network. Can you reach the internet? Can you access LuCI?',
                  duration: '7 min',
                  teacherNotes: 'This is the moment of truth. If internet works, the router is successfully configured as a basic AP/router.'
                },
                {
                  instruction: 'Reflection: "You now have a router running open source software that YOU configured. What would you like to add next?"',
                  duration: '5 min',
                  teacherNotes: 'Plant seeds for future lessons: mesh networking, ad-blocking, VPN, bandwidth monitoring. OpenWrt enables all of these.'
                },
              ],
              formativeAssessment: 'Does the router have a secure password and working WiFi? Can students explain what they configured and why?',
              differentiation: {
                support: 'Work through each step together as a class before students do it independently.',
                extension: 'Set up a guest WiFi network on a separate VLAN. Research how to isolate guest traffic from main network.'
              }
            },
          ],
        },
        {
          title: 'Mesh Routing Protocols',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why mesh needs special routing: traditional routing assumes stable paths, but mesh nodes come and go—the network must adapt',
            'How BATMAN/OLSR actually work: what information nodes share, how they calculate routes, and why "link quality" matters',
            'The difference between Layer 2 and Layer 3 mesh: why BATMAN-adv operates at Ethernet level and what that enables',
            'Why there\'s no "best" protocol: different tradeoffs for different situations (mobile nodes, fixed nodes, high traffic, etc.)',
          ],
          objectives: [
            'Explain how mesh routing differs from traditional routing',
            'Understand the basics of BATMAN-adv or OLSR protocols',
            'Describe how mesh nodes discover and communicate with each other',
          ],
          activities: [
            'Analogy: How does mail find its way without a central post office?',
            'Protocol research: Teams investigate BATMAN vs. OLSR',
            'Packet path tracing: Diagram how data might flow through a mesh',
            'Video: How mesh routing protocols work',
          ],
          materials: ['Protocol documentation', 'Mesh diagram templates', 'Educational videos'],
          detailedActivities: [
            {
              title: 'The Mail Carrier Analogy: How Routes Get Discovered',
              duration: '20 minutes',
              overview: 'Students explore how mesh routing works through a postal analogy that makes distributed route discovery intuitive.',
              steps: [
                {
                  instruction: 'Set the scene: "Imagine a town with no central post office. Every house must figure out how to deliver mail to every other house. How would you solve this?"',
                  duration: '3 min',
                  teacherNotes: 'Let students brainstorm. Common ideas: ask neighbors, follow someone who knows, pass messages along.'
                },
                {
                  instruction: 'Introduce the solution: "What if every house regularly tells its neighbors: \'I can reach these houses.\' And neighbors share what THEY can reach?"',
                  duration: '4 min',
                  teacherNotes: 'This is the core of distance-vector routing. Information propagates through neighbor-to-neighbor sharing.'
                },
                {
                  instruction: 'Act it out: Give 6 volunteers house labels (A-F). Initially, each only knows their direct neighbors. Round by round, they share what they know. Track how long until everyone knows all routes.',
                  duration: '8 min',
                  teacherNotes: 'This is convergence in action. After enough rounds, all nodes have complete routing information.'
                },
                {
                  instruction: 'Add a twist: "What if House C moves away or burns down?" Run another round. How does the network adapt?',
                  duration: '3 min',
                  teacherNotes: 'Nodes eventually notice C doesn\'t respond. They stop advertising routes through C. Network re-converges.'
                },
                {
                  instruction: 'Translate to mesh: "This is exactly how BATMAN and OLSR work. Nodes broadcast \'I can reach these destinations\' and build routing tables from what they hear."',
                  duration: '2 min',
                  teacherNotes: 'The analogy maps directly. "Originator messages" in BATMAN = announcements of reachability.'
                },
              ],
              formativeAssessment: 'Can students explain how routes get discovered without a central authority? Do they understand convergence?',
              differentiation: {
                support: 'Use a physical board game-style map where students can place "routing cards" showing what each node knows.',
                extension: 'What happens if two nodes announce conflicting information? Research "routing loops" and how protocols prevent them.'
              }
            },
            {
              title: 'BATMAN vs. OLSR: Protocol Deep Dive',
              duration: '25 minutes',
              overview: 'Teams research and compare the two major mesh routing protocols, building expertise they\'ll share with the class.',
              steps: [
                {
                  instruction: 'Divide class into two teams: Team BATMAN and Team OLSR. Each team will become experts on their protocol.',
                  duration: '2 min',
                  teacherNotes: 'Competition adds engagement. Each team wants to understand their protocol better than the other.'
                },
                {
                  instruction: 'Research phase: Using provided documentation, each team answers: (1) What layer does it operate at? (2) What messages does it send? (3) How does it measure link quality? (4) What makes it unique?',
                  duration: '12 min',
                  teacherNotes: 'BATMAN-adv: Layer 2, OGM (Originator Messages), TQ (Transmission Quality). OLSR: Layer 3, HELLO/TC messages, ETX metric.'
                },
                {
                  instruction: 'Presentations: Each team has 3 minutes to explain their protocol to the other team. Must include: name meaning, key innovation, and one strength.',
                  duration: '8 min',
                  teacherNotes: 'BATMAN = Better Approach To Mobile Ad-hoc Networking. OLSR = Optimized Link State Routing. Peer teaching reinforces learning.'
                },
                {
                  instruction: 'Class discussion: "When would you choose BATMAN over OLSR or vice versa?" Hint: think about network size, mobility, and what devices you\'re using.',
                  duration: '3 min',
                  teacherNotes: 'BATMAN-adv: simpler, Layer 2 (works like a big switch), good for most community networks. OLSR: more efficient for large networks, more complex.'
                },
              ],
              formativeAssessment: 'Can each team accurately explain their protocol? Do students understand the tradeoffs between them?',
              differentiation: {
                support: 'Provide a structured note-taking template with the research questions pre-filled.',
                extension: 'Research newer protocols like Babel or HWMP (used in 802.11s). How do they compare?'
              }
            },
            {
              title: 'Tracing Packets Through a Mesh: Diagram Activity',
              duration: '25 minutes',
              overview: 'Students diagram how packets would flow through a mesh network, reinforcing understanding of multi-hop routing.',
              steps: [
                {
                  instruction: 'Distribute mesh diagram templates showing 8 nodes in a partial mesh (not all nodes connected to all others). Label nodes A-H.',
                  duration: '2 min',
                  teacherNotes: 'Create asymmetric diagrams—some paths go through 2 hops, others through 4. Include varying link qualities.'
                },
                {
                  instruction: 'Scenario 1: "Node A wants to send a message to Node H. Trace ALL possible paths." Students draw arrows showing options.',
                  duration: '6 min',
                  teacherNotes: 'There should be multiple paths. This shows why mesh is resilient—options exist if one path fails.'
                },
                {
                  instruction: 'Add link quality: Mark each link with a quality score (1-100). "Now, which path would the routing protocol choose? Why?"',
                  duration: '6 min',
                  teacherNotes: 'Protocols don\'t just count hops—they consider quality. A 2-hop path through bad links might be worse than 3 hops through good links.'
                },
                {
                  instruction: 'Failure scenario: "Link B-E fails. How does traffic from A to H re-route?" Draw the new path.',
                  duration: '5 min',
                  teacherNotes: 'This is failover in action. The mesh finds an alternative. How quickly depends on protocol parameters.'
                },
                {
                  instruction: 'Share and compare: Groups show their diagrams. Did everyone find the same optimal path? Discuss any differences.',
                  duration: '6 min',
                  teacherNotes: 'Different assumptions about link quality lead to different optimal paths. This shows why metrics matter.'
                },
              ],
              formativeAssessment: 'Can students identify multiple paths through a mesh? Do they understand how link quality affects routing decisions?',
              differentiation: {
                support: 'Start with simpler 5-node diagrams. Pre-label some paths to get students started.',
                extension: 'What if Node D becomes congested? Research "load balancing" in mesh networks. Can traffic split across paths?'
              }
            },
            {
              title: 'Protocol in Action: Video Analysis and Discussion',
              duration: '20 minutes',
              overview: 'Students watch visualizations of mesh protocols in action, then discuss what they observed.',
              videoResources: [
                { title: 'BATMAN-adv - How It Works (Freifunk)', url: 'https://www.youtube.com/watch?v=oBrM8GBLzN8', duration: '8 min', description: 'Visual explanation of BATMAN-adv mesh protocol from Freifunk community' },
                { title: 'Understanding Mesh Networks (Ubiquiti)', url: 'https://www.youtube.com/watch?v=QYssxCbXpww', duration: '5 min', description: 'Clear explanation of mesh networking concepts and routing' },
                { title: 'How Mesh WiFi Systems Work (Techquickie)', url: 'https://www.youtube.com/watch?v=7-fMfFDqtLc', duration: '5 min', description: 'Consumer-focused but explains mesh routing basics well' },
              ],
              steps: [
                {
                  instruction: 'Watch one of the recommended videos on mesh protocols (see video resources above). Students take notes: What messages do you see being sent? What happens when a node moves?',
                  duration: '6 min',
                  teacherNotes: 'The Freifunk BATMAN-adv video is most technical; Techquickie is most accessible for beginners.'
                },
                {
                  instruction: 'Pause and discuss: "What did you notice about how often messages are sent? Why would the protocol send messages even when nothing changes?"',
                  duration: '4 min',
                  teacherNotes: 'Keepalive messages detect failures. If a node stops hearing from a neighbor, it knows that path is dead.'
                },
                {
                  instruction: 'Second video: Show a mesh reconfiguring when a node fails. "How quickly did the network adapt? What determined the recovery speed?"',
                  duration: '5 min',
                  teacherNotes: 'Recovery speed depends on message interval, timeout values, and network size. Tradeoff: faster detection = more overhead.'
                },
                {
                  instruction: 'Synthesis question: "Based on what you\'ve seen, why might a community choose mesh over traditional WiFi repeaters?"',
                  duration: '5 min',
                  teacherNotes: 'Key insights: automatic adaptation, no central controller, resilience, intelligent routing (not just rebroadcast).'
                },
              ],
              formativeAssessment: 'Can students describe what they saw in the video in protocol terms? Do they understand the dynamic nature of mesh routing?',
              differentiation: {
                support: 'Provide a viewing guide with specific things to watch for.',
                extension: 'Find your own video of mesh networking in action. Prepare 2 observations to share with the class.'
              }
            },
          ],
        },
        {
          title: 'Building Your First Mesh Node',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What the mesh software is actually doing: creating virtual interfaces, broadcasting discovery packets, maintaining neighbor tables',
            'Why configuration matters: how wrong settings can break mesh connectivity and how to debug when things don\'t work',
            'The relationship between radio settings and mesh performance: channels, power levels, and why they affect link quality',
            'What "mesh daemon" means: a background process that constantly runs the routing algorithm, updating paths as the network changes',
          ],
          objectives: [
            'Configure a router as a mesh node',
            'Install and configure mesh routing software',
            'Verify mesh daemon is running and discovering peers',
          ],
          activities: [
            'Software installation: Install BATMAN-adv or chosen mesh protocol',
            'Configuration: Set up mesh interface and parameters',
            'Verification: Check that mesh daemon is running',
            'Documentation: Record all configuration steps',
          ],
          materials: ['OpenWrt routers', 'Configuration guide', 'SSH access', 'Documentation template'],
          detailedActivities: [
            {
              title: 'Understanding What We\'re About to Build',
              duration: '15 minutes',
              overview: 'Before diving into configuration, students understand the components and how they fit together.',
              steps: [
                {
                  instruction: 'Draw the architecture on the board: Hardware (router) → Firmware (OpenWrt) → Kernel Module (BATMAN-adv) → Mesh Interface (bat0) → Application Layer (your devices)',
                  duration: '3 min',
                  teacherNotes: 'Layering helps students understand where problems might occur. If bat0 doesn\'t exist, the module isn\'t loaded.'
                },
                {
                  instruction: 'Explain what we\'ll configure: (1) Install BATMAN-adv package, (2) Create a wireless mesh interface, (3) Bridge it with the mesh protocol, (4) Set up a client access network.',
                  duration: '4 min',
                  teacherNotes: 'Give the roadmap before starting. Students should know what success looks like before beginning.'
                },
                {
                  instruction: 'Show the final state: "When this works, your router will announce itself to neighbors, discover other mesh nodes, and route traffic—all automatically."',
                  duration: '3 min',
                  teacherNotes: 'Paint the picture of success. This motivation helps carry through debugging frustrations.'
                },
                {
                  instruction: 'Safety note: "We\'re making significant changes. If something goes wrong, we can reset to defaults with failsafe mode. Let me show you how."',
                  duration: '5 min',
                  teacherNotes: 'Show failsafe mode boot procedure. Students should not fear experimentation—recovery is always possible.'
                },
              ],
              formativeAssessment: 'Can students describe the layers involved? Do they understand what "success" will look like?',
              differentiation: {
                support: 'Provide a printed diagram showing the architecture layers.',
                extension: 'What other mesh packages exist for OpenWrt? Research alternatives to BATMAN-adv.'
              }
            },
            {
              title: 'Installing BATMAN-adv: Package Management',
              duration: '25 minutes',
              overview: 'Students install the mesh routing software via OpenWrt\'s package manager, learning command-line package management.',
              steps: [
                {
                  instruction: 'SSH into your router: ssh root@192.168.1.1. Enter the password you set. "You\'re now in the router\'s command line."',
                  duration: '4 min',
                  teacherNotes: 'Some students may not have used SSH. Briefly explain: it\'s a secure remote shell, like being at the router\'s keyboard.'
                },
                {
                  instruction: 'Update package lists: opkg update. "This fetches the latest list of available software. Always update before installing."',
                  duration: '3 min',
                  teacherNotes: 'opkg is OpenWrt\'s package manager, similar to apt or yum. Stale lists = package not found errors.'
                },
                {
                  instruction: 'Search for BATMAN packages: opkg list | grep batman. "See all the BATMAN-related packages. We need batman-adv and batctl."',
                  duration: '4 min',
                  teacherNotes: 'batman-adv is the kernel module, batctl is the configuration tool. Both are needed.'
                },
                {
                  instruction: 'Install packages: opkg install kmod-batman-adv batctl. Watch the output. Were there errors?',
                  duration: '5 min',
                  teacherNotes: 'Common errors: out of space (need larger flash), dependency issues. Troubleshoot as a class if issues arise.'
                },
                {
                  instruction: 'Verify installation: batctl -v. You should see the version number. If not, troubleshoot—module not loaded?',
                  duration: '4 min',
                  teacherNotes: 'If batctl works, the package installed correctly. Version numbers help when debugging compatibility.'
                },
                {
                  instruction: 'Load the kernel module: modprobe batman-adv. Check it\'s loaded: lsmod | grep batman. Should see batman_adv.',
                  duration: '5 min',
                  teacherNotes: 'The kernel module must be loaded to create mesh interfaces. This can be automated later.'
                },
              ],
              formativeAssessment: 'Did students successfully install BATMAN-adv? Can they verify the module is loaded?',
              differentiation: {
                support: 'Provide command cheat sheet with exact commands to type.',
                extension: 'Explore what other network-related packages are available. What could you add to your mesh node?'
              }
            },
            {
              title: 'Creating the Mesh Interface',
              duration: '35 minutes',
              overview: 'Students configure the wireless interface for mesh mode and connect it to BATMAN-adv.',
              steps: [
                {
                  instruction: 'Open the wireless config: Edit /etc/config/wireless with vi or nano. Or use LuCI: Network → Wireless.',
                  duration: '3 min',
                  teacherNotes: 'Command line is more reliable for mesh config. But show LuCI too—some students are more comfortable there.'
                },
                {
                  instruction: 'Create a new wireless interface for mesh. Set mode to "mesh", mesh_id to a shared name (e.g., "community-mesh"), and encryption to "none" (for now).',
                  duration: '8 min',
                  teacherNotes: 'mesh_id is like SSID—all nodes with same mesh_id will peer. No encryption on mesh link for simplicity (encryption can be added later).'
                },
                {
                  instruction: 'Set the mesh interface to use BATMAN-adv: In the interface config, set option network \'bat0\' or similar.',
                  duration: '6 min',
                  teacherNotes: 'This tells OpenWrt to hand the mesh interface to BATMAN-adv rather than treating it as a normal interface.'
                },
                {
                  instruction: 'Configure the bat0 interface: Edit /etc/config/network to create the bat0 bridge. This is where devices will get IP addresses.',
                  duration: '8 min',
                  teacherNotes: 'bat0 is a virtual interface created by BATMAN-adv. We bridge it to LAN so clients can access the mesh.'
                },
                {
                  instruction: 'Apply changes: /etc/init.d/network restart. Watch for errors. Check iwinfo and batctl to see if interfaces came up.',
                  duration: '5 min',
                  teacherNotes: 'This is the scary part—config errors might make the router unreachable. Have failsafe procedure ready.'
                },
                {
                  instruction: 'Verify mesh interface exists: batctl if should show your mesh interface. If empty, something went wrong.',
                  duration: '5 min',
                  teacherNotes: 'batctl if shows interfaces participating in the mesh. Empty = configuration error. Debug systematically.'
                },
              ],
              formativeAssessment: 'Does batctl if show the mesh interface? Can students explain what each configuration step accomplished?',
              differentiation: {
                support: 'Provide complete configuration file snippets to copy.',
                extension: 'What is mesh_fwding? Research when you\'d disable forwarding on a mesh interface.'
              }
            },
            {
              title: 'Documentation and Checkpoint',
              duration: '25 minutes',
              overview: 'Students document their configuration thoroughly, creating a resource for themselves and others.',
              steps: [
                {
                  instruction: 'Create a documentation file (Google Doc, markdown, or paper). Title: "[Your Name]\'s Mesh Node Configuration".',
                  duration: '2 min',
                  teacherNotes: 'Documentation is a professional skill. When you come back in a week, you won\'t remember what you did.'
                },
                {
                  instruction: 'Section 1: Hardware. Document your router model, OpenWrt version, and any quirks you noticed.',
                  duration: '4 min',
                  teacherNotes: 'Different hardware = different configuration. This helps if you ever need to replicate or get help.'
                },
                {
                  instruction: 'Section 2: Configuration. Paste your /etc/config/network and /etc/config/wireless files. Annotate what each section does.',
                  duration: '8 min',
                  teacherNotes: 'Copy configs with cat /etc/config/network. Annotations turn raw config into understanding.'
                },
                {
                  instruction: 'Section 3: Verification. List the commands you used to verify success (batctl if, iwinfo, etc.) and what the output means.',
                  duration: '6 min',
                  teacherNotes: 'This becomes a troubleshooting guide. "If batctl if is empty, check that the wireless interface is up."'
                },
                {
                  instruction: 'Peer review: Exchange documentation with a partner. Could they configure a mesh node using your guide?',
                  duration: '5 min',
                  teacherNotes: 'Good documentation can be followed by someone else. Feedback improves clarity.'
                },
              ],
              formativeAssessment: 'Is the documentation complete enough for someone else to replicate the setup? Are verification steps clear?',
              differentiation: {
                support: 'Provide a documentation template with sections pre-labeled.',
                extension: 'Create a troubleshooting section: "If X happens, try Y." Document problems you encountered and how you solved them.'
              }
            },
          ],
        },
        {
          title: 'Connecting Mesh Nodes',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What happens when two mesh nodes "see" each other: the discovery process, link quality measurement, and route advertisement',
            'Why mesh networking is different from WiFi repeating: true mesh routes intelligently, repeaters just rebroadcast blindly',
            'How client devices connect through mesh: they see a regular WiFi network while the mesh handles routing transparently',
            'The debugging mindset: when things don\'t work, systematically checking each layer (radio, mesh, IP, application)',
          ],
          objectives: [
            'Successfully connect two mesh nodes',
            'Verify nodes can see and communicate with each other',
            'Test client device connectivity through the mesh',
          ],
          activities: [
            'Node pairing: Connect two configured mesh nodes',
            'Peer verification: Confirm nodes recognize each other',
            'Client testing: Connect a laptop/phone through the mesh',
            'Troubleshooting: Address any connectivity issues',
          ],
          materials: ['2+ configured mesh nodes', 'Client devices', 'Troubleshooting checklist'],
          detailedActivities: [
            {
              title: 'The First Connection: Moment of Truth',
              duration: '30 minutes',
              overview: 'Students experience the excitement (and potential frustration) of making two mesh nodes discover each other for the first time.',
              steps: [
                {
                  instruction: 'Setup check: Both nodes powered on? Same mesh_id configured? Same WiFi channel? On the same frequency band (2.4GHz or 5GHz)?',
                  duration: '5 min',
                  teacherNotes: 'These are the most common failure causes. A checklist prevents "obvious" problems.'
                },
                {
                  instruction: 'Position nodes within range of each other (start close, like 10 feet apart). Mesh won\'t work if nodes can\'t hear each other.',
                  duration: '2 min',
                  teacherNotes: 'Start close to eliminate range as a variable. Once it works, test distance limits.'
                },
                {
                  instruction: 'Check for discovery: On each node, run batctl n (neighbor list). Do you see the other node\'s MAC address?',
                  duration: '5 min',
                  teacherNotes: 'batctl n shows directly connected neighbors. If empty, the wireless mesh link isn\'t working.'
                },
                {
                  instruction: 'If no neighbors: Debug wireless first. Is the mesh interface up? (iwinfo). Is it on the correct channel? Try moving nodes closer.',
                  duration: '8 min',
                  teacherNotes: 'Work through the stack: physical (distance) → wireless (interface up) → mesh (correct config) → application (correct mesh_id).'
                },
                {
                  instruction: 'Success check: Run batctl o (originator table) on both nodes. Each should see the other with a "last seen" timestamp updating.',
                  duration: '5 min',
                  teacherNotes: 'batctl o shows all known mesh nodes, not just neighbors. This proves BATMAN-adv is working.'
                },
                {
                  instruction: 'Celebrate and document: You just made two independent devices form a network with no central controller!',
                  duration: '5 min',
                  teacherNotes: 'This is a milestone. The mesh protocol is working. Take a screenshot of batctl o showing both nodes.'
                },
              ],
              formativeAssessment: 'Do students see neighbors in batctl n? Can they articulate what "neighbor" vs "originator" means?',
              differentiation: {
                support: 'Create a decision-tree troubleshooting flowchart: "No neighbors? Check these things first..."',
                extension: 'What does the TQ (transmission quality) value mean in batctl o? How is it calculated?'
              }
            },
            {
              title: 'Testing Client Connectivity',
              duration: '30 minutes',
              overview: 'Students verify that end-user devices can connect through the mesh and reach resources on either side.',
              steps: [
                {
                  instruction: 'Connect a laptop to Node A\'s client WiFi network. Check that you get an IP address via DHCP. Note your IP.',
                  duration: '5 min',
                  teacherNotes: 'Client networks are separate from mesh links. Clients connect to a regular WiFi SSID, unaware of the mesh.'
                },
                {
                  instruction: 'Ping Node B\'s IP from your laptop. If it works, you\'re routing through the mesh!',
                  duration: '5 min',
                  teacherNotes: 'This proves end-to-end connectivity. Traffic goes: Laptop → Node A → Mesh → Node B.'
                },
                {
                  instruction: 'Connect a second device to Node B\'s client network. Can the two client devices ping each other?',
                  duration: '8 min',
                  teacherNotes: 'This is the real test. Two users on different nodes should communicate seamlessly. The mesh is transparent.'
                },
                {
                  instruction: 'Advanced test: Start a file transfer between the two clients. Use a large file. Monitor with batctl to see traffic flow.',
                  duration: '7 min',
                  teacherNotes: 'batctl statistics shows packet counts. You\'ll see TX/RX increasing during the transfer.'
                },
                {
                  instruction: 'Reflect: "A user on either node doesn\'t know they\'re on a mesh. They just have WiFi. The infrastructure is invisible."',
                  duration: '5 min',
                  teacherNotes: 'Good infrastructure is invisible. Users get connectivity; they don\'t need to understand how.'
                },
              ],
              formativeAssessment: 'Can clients on different nodes communicate? Do students understand the path traffic takes?',
              differentiation: {
                support: 'Provide a network diagram showing the expected traffic path.',
                extension: 'Trace the actual path with traceroute. What hops do you see? Research why mesh might or might not show in traceroute.'
              }
            },
            {
              title: 'Systematic Troubleshooting',
              duration: '35 minutes',
              overview: 'Students learn a systematic approach to debugging mesh network issues.',
              steps: [
                {
                  instruction: 'Introduce the debugging stack: Physical → Wireless → Mesh → IP → Application. "When something doesn\'t work, check each layer in order."',
                  duration: '4 min',
                  teacherNotes: 'This is how professionals debug. Don\'t jump to complex explanations when the cable might be unplugged.'
                },
                {
                  instruction: 'Physical layer: Is the router powered on? Are LEDs showing normal activity? Is it too far away?',
                  duration: '4 min',
                  teacherNotes: 'Start with the obvious. 90% of "broken" networks are actually power or distance issues.'
                },
                {
                  instruction: 'Wireless layer: Run iwinfo. Is the mesh interface up? What channel? What signal strength to neighbors?',
                  duration: '6 min',
                  teacherNotes: 'iwinfo shows wireless details. Signal strength below -80dBm is usually too weak for reliable mesh.'
                },
                {
                  instruction: 'Mesh layer: Run batctl if, batctl n, batctl o. Are interfaces in the mesh? Are neighbors visible? Are originators being learned?',
                  duration: '6 min',
                  teacherNotes: 'This checks BATMAN-adv specifically. Problems here = configuration issues.'
                },
                {
                  instruction: 'IP layer: Can you ping neighbor IPs? Is DHCP working? Are routes correct? Run ip route to see the routing table.',
                  duration: '6 min',
                  teacherNotes: 'Mesh might work perfectly but IP config is wrong. These are separate concerns.'
                },
                {
                  instruction: 'Practice: Intentionally break something (wrong channel, unplug, change mesh_id). Partner must debug it using the stack.',
                  duration: '9 min',
                  teacherNotes: 'Deliberate practice. The "breaker" should note what they changed so they can verify the "fixer" finds it.'
                },
              ],
              formativeAssessment: 'Can students work through the debugging stack systematically? Do they avoid jumping to conclusions?',
              differentiation: {
                support: 'Provide a troubleshooting checklist with commands for each layer.',
                extension: 'Create a "troubleshooting tree" decision diagram for common problems.'
              }
            },
            {
              title: 'Documentation: Recording Your First Mesh',
              duration: '25 minutes',
              overview: 'Students document their working two-node mesh, capturing the configuration and verification steps.',
              steps: [
                {
                  instruction: 'Update your documentation from last lesson. Add a section: "Two-Node Mesh Configuration."',
                  duration: '3 min',
                  teacherNotes: 'Documentation should grow with the project. Each lesson adds to the living document.'
                },
                {
                  instruction: 'Document the network diagram: Draw the topology. Label each node with hostname, IP, MAC. Show mesh links vs. client networks.',
                  duration: '7 min',
                  teacherNotes: 'Visual diagrams are essential for networks. They help others understand the setup at a glance.'
                },
                {
                  instruction: 'Document verification commands: List the commands you used to verify the mesh is working (batctl n, batctl o, ping, etc.) with expected output.',
                  duration: '8 min',
                  teacherNotes: 'This becomes a health-check procedure. "Run these commands and compare to expected output."'
                },
                {
                  instruction: 'Document problems encountered: What went wrong? How did you fix it? This section is gold for future troubleshooting.',
                  duration: '5 min',
                  teacherNotes: 'Mistakes are learning opportunities. Documenting them helps others (and future you) avoid the same problems.'
                },
                {
                  instruction: 'Share: Post documentation to class wiki, shared folder, or present key insights to the class.',
                  duration: '2 min',
                  teacherNotes: 'Collective documentation is more valuable than individual docs. Build a class knowledge base.'
                },
              ],
              formativeAssessment: 'Is the documentation clear and complete? Could someone replicate the two-node mesh from this guide?',
              differentiation: {
                support: 'Provide a documentation template with sections and prompts.',
                extension: 'Create a "quick start guide" version—the minimum steps to replicate this setup from scratch.'
              }
            },
          ],
        },
        {
          title: 'Expanding the Mesh',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'How the mesh self-organizes: automatic discovery, route calculation, and load distribution without central coordination',
            'Why more nodes can mean better performance: multi-path routing, bandwidth aggregation, and coverage expansion',
            'The scalability challenge: why mesh performance changes as the network grows (overhead, hop count, airtime)',
            'What visualization tools reveal: how to interpret mesh topology graphs and identify weak links or bottlenecks',
          ],
          objectives: [
            'Add a third (or more) node to the mesh',
            'Understand how the mesh automatically adapts to new nodes',
            'Visualize the mesh topology',
          ],
          activities: [
            'Node addition: Add third node to existing mesh',
            'Topology observation: Watch how routes change',
            'Visualization: Use mesh monitoring tools to see network graph',
            'Performance testing: Measure bandwidth across the mesh',
          ],
          materials: ['3+ mesh nodes', 'Monitoring tools', 'Bandwidth testing software'],
          detailedActivities: [
            {
              title: 'Adding the Third Node: Watching the Mesh Self-Organize',
              duration: '30 minutes',
              overview: 'Students add a third node and observe how the mesh automatically discovers and integrates it.',
              steps: [
                {
                  instruction: 'Before adding: Run batctl o on both existing nodes. Document the current state. Take a screenshot or note the originator table.',
                  duration: '3 min',
                  teacherNotes: 'Baseline documentation makes changes visible. "Before vs. after" shows the mesh adapting.'
                },
                {
                  instruction: 'Power on the third node. It should already be configured with the same mesh_id from previous lesson (or configure it now).',
                  duration: '5 min',
                  teacherNotes: 'If the node needs configuration, this is a good review. Otherwise, just power on.'
                },
                {
                  instruction: 'Position the third node. Try placing it where it can see only one of the existing nodes first. Check batctl n on all nodes.',
                  duration: '5 min',
                  teacherNotes: 'This creates a linear topology: A—B—C. Later, move it where it can see both, creating a triangle.'
                },
                {
                  instruction: 'Watch the originator table update: Run batctl o on all nodes repeatedly. Watch as the new node appears and TQ values stabilize.',
                  duration: '7 min',
                  teacherNotes: 'BATMAN-adv takes time to learn routes and stabilize TQ. Students can see convergence in action.'
                },
                {
                  instruction: 'Ping test: From a client on Node A, ping a client on Node C. Traffic must traverse the mesh. Verify with batctl.',
                  duration: '5 min',
                  teacherNotes: 'This proves the mesh is fully functional with three nodes. End-to-end connectivity works.'
                },
                {
                  instruction: 'Move the third node: Reposition it so it can see both existing nodes. Run batctl n. Does it now show two neighbors?',
                  duration: '5 min',
                  teacherNotes: 'This creates redundancy. If A-B link fails, A can reach B through C. The mesh just got more resilient.'
                },
              ],
              formativeAssessment: 'Do all three nodes appear in each other\'s originator tables? Can students explain why adding a node increases resilience?',
              differentiation: {
                support: 'Provide a worksheet to record the originator table at each step.',
                extension: 'Calculate the number of possible paths in a 3-node full mesh vs. a 4-node. How does path count grow?'
              }
            },
            {
              title: 'Visualizing the Mesh Topology',
              duration: '30 minutes',
              overview: 'Students use visualization tools to see the mesh network as a graph, making abstract routing concrete.',
              steps: [
                {
                  instruction: 'Install visualization tools: alfred and batadv-vis on all nodes (opkg install alfred batadv-vis). Or use the web-based approach.',
                  duration: '8 min',
                  teacherNotes: 'alfred distributes data, batadv-vis creates the graph. Alternative: graph batctl o output manually.'
                },
                {
                  instruction: 'Start the services: Run alfred and batadv-vis daemons. Verify they\'re running (ps | grep alfred).',
                  duration: '5 min',
                  teacherNotes: 'These services share information across the mesh to build a complete picture.'
                },
                {
                  instruction: 'Generate the visualization: Run batadv-vis to output a graph file. Or use the LuCI mesh visualization plugin if installed.',
                  duration: '5 min',
                  teacherNotes: 'Output can be in JSON or DOT format. DOT can be visualized with Graphviz.'
                },
                {
                  instruction: 'View the graph: Use an online Graphviz renderer or install Graphviz locally. You should see nodes and connections.',
                  duration: '7 min',
                  teacherNotes: 'The visual representation makes the topology tangible. Students can point to nodes and links.'
                },
                {
                  instruction: 'Interpret the graph: Which nodes are directly connected? What do the edge labels (TQ values) mean? Which link is weakest?',
                  duration: '5 min',
                  teacherNotes: 'TQ = Transmission Quality (0-255). Higher is better. Weak links are potential bottlenecks.'
                },
              ],
              formativeAssessment: 'Can students read the topology graph? Do they understand what TQ values indicate?',
              differentiation: {
                support: 'Provide a pre-rendered example graph with annotations explaining each element.',
                extension: 'Set up continuous monitoring: refresh the visualization every 10 seconds and observe changes.'
              }
            },
            {
              title: 'Performance Testing: Measuring the Mesh',
              duration: '35 minutes',
              overview: 'Students measure real-world performance metrics: bandwidth, latency, and jitter across the mesh.',
              steps: [
                {
                  instruction: 'Install iperf3 on nodes (opkg install iperf3). This is a network performance measurement tool.',
                  duration: '4 min',
                  teacherNotes: 'iperf3 is the standard tool for measuring network throughput. Essential for any network testing.'
                },
                {
                  instruction: 'Test 1: Direct link performance. Run iperf3 between two directly connected nodes. Record the bandwidth.',
                  duration: '6 min',
                  teacherNotes: 'Direct link = best case performance. This is your baseline. Expect 50-150 Mbps depending on hardware.'
                },
                {
                  instruction: 'Test 2: Multi-hop performance. Run iperf3 between nodes that must route through an intermediate node. Compare to direct.',
                  duration: '6 min',
                  teacherNotes: 'Multi-hop will be slower. Each hop halves available bandwidth (roughly). This is expected mesh behavior.'
                },
                {
                  instruction: 'Test 3: Latency (ping). Measure round-trip time between all node pairs. Which path has highest latency? Why?',
                  duration: '6 min',
                  teacherNotes: 'More hops = more latency. Also affected by link quality and congestion.'
                },
                {
                  instruction: 'Create a performance matrix: Build a table showing bandwidth between each node pair. This is your network baseline.',
                  duration: '8 min',
                  teacherNotes: 'For 3 nodes, there are 3 pairs (A-B, A-C, B-C). Document all of them.'
                },
                {
                  instruction: 'Discussion: "Based on these numbers, what applications would work well on this mesh? What wouldn\'t?"',
                  duration: '5 min',
                  teacherNotes: 'Web browsing, messaging, voice calls usually fine. 4K video streaming might struggle over multiple hops.'
                },
              ],
              formativeAssessment: 'Did students successfully measure performance? Can they explain why multi-hop is slower?',
              differentiation: {
                support: 'Provide iperf3 command examples ready to copy.',
                extension: 'Research jitter measurement. Why does jitter matter for VoIP and video calls?'
              }
            },
            {
              title: 'Planning for Growth: What If We Had More Nodes?',
              duration: '25 minutes',
              overview: 'Students discuss and plan how the network would scale, identifying challenges and solutions.',
              steps: [
                {
                  instruction: 'Discussion: "We have 3 nodes. What if we wanted 30? What challenges might we face?"',
                  duration: '5 min',
                  teacherNotes: 'Expected answers: more hops, more overhead, harder to manage, need more bandwidth, coverage gaps.'
                },
                {
                  instruction: 'Introduce scaling concepts: Supernodes (high-capacity backbone), gateway nodes (internet access), and hierarchical design.',
                  duration: '6 min',
                  teacherNotes: 'NYC Mesh uses supernodes for exactly this reason. Pure flat mesh doesn\'t scale infinitely.'
                },
                {
                  instruction: 'Sketch a 30-node network: Working in groups, draw a hypothetical scaled network. Where would you put supernodes? Gateways?',
                  duration: '8 min',
                  teacherNotes: 'This is design thinking. There\'s no single right answer, but some designs are better than others.'
                },
                {
                  instruction: 'Share designs: Groups present their 30-node network plans. Class discusses pros and cons of each approach.',
                  duration: '6 min',
                  teacherNotes: 'Compare approaches: centralized backbone vs. distributed, redundancy vs. simplicity.'
                },
              ],
              formativeAssessment: 'Do designs show understanding of scaling challenges? Do students consider redundancy and backbone capacity?',
              differentiation: {
                support: 'Provide a partially-completed network diagram to extend.',
                extension: 'Research how Guifi.net scaled to 35,000+ nodes. What architectural choices did they make?'
              }
            },
          ],
        },
        {
          title: 'Resilience Testing',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'How mesh protocols detect and recover from failures: timeout values, route invalidation, and convergence time',
            'Why resilience is the mesh\'s superpower: the mathematical difference between one path (fragile) and many paths (robust)',
            'What determines recovery speed: protocol parameters, network size, and how quickly bad routes get purged',
            'The limits of resilience: when too many nodes fail, partitions form—understanding graceful degradation',
          ],
          objectives: [
            'Test mesh network behavior when nodes fail',
            'Measure recovery time when nodes return',
            'Understand mesh network limitations',
          ],
          activities: [
            'Failure simulation: Remove a node and observe network behavior',
            'Recovery measurement: How quickly does traffic reroute?',
            'Multiple failure testing: What if two nodes fail?',
            'Documentation: Record resilience characteristics',
          ],
          materials: ['Functional mesh network', 'Stopwatch', 'Testing checklist', 'Traffic generation tools'],
          detailedActivities: [
            {
              title: 'Hypothesis: What Do We Expect to Happen?',
              duration: '15 minutes',
              overview: 'Before testing, students predict what will happen when nodes fail, grounding the experiment in expectations.',
              steps: [
                {
                  instruction: 'Draw your current mesh topology on the board. Label all nodes and links. Mark which nodes are directly connected.',
                  duration: '3 min',
                  teacherNotes: 'Visual reference for the experiments. Everyone should be looking at the same network.'
                },
                {
                  instruction: 'Prediction 1: "If we unplug Node B (middle node), what will happen to traffic from A to C?" Write predictions before testing.',
                  duration: '4 min',
                  teacherNotes: 'If A-B-C is linear, traffic should fail. If A and C have another path, it should reroute. Let students debate.'
                },
                {
                  instruction: 'Prediction 2: "How long will it take for the network to detect the failure and reroute?" 1 second? 10 seconds? 1 minute?',
                  duration: '4 min',
                  teacherNotes: 'BATMAN-adv default OGM interval is 1 second. Detection takes a few OGM intervals. Students often underestimate.'
                },
                {
                  instruction: 'Prediction 3: "What happens when Node B comes back online? Will the network automatically recover?"',
                  duration: '4 min',
                  teacherNotes: 'Yes, it should auto-recover. But how quickly? Will it return to the original path or keep the alternate?'
                },
              ],
              formativeAssessment: 'Do predictions show understanding of mesh behavior? Are students engaging with the uncertainty?',
              differentiation: {
                support: 'Provide multiple-choice predictions instead of open-ended.',
                extension: 'Calculate expected detection time based on OGM interval and timeout settings.'
              }
            },
            {
              title: 'Experiment 1: Single Node Failure',
              duration: '25 minutes',
              overview: 'Students systematically test what happens when one node fails, measuring detection and recovery times.',
              steps: [
                {
                  instruction: 'Setup: Start a continuous ping from a client on Node A to a client on Node C. Leave it running in a terminal.',
                  duration: '3 min',
                  teacherNotes: 'Continuous ping shows exactly when connectivity breaks and returns. Use ping -i 0.5 for faster updates.'
                },
                {
                  instruction: 'Baseline: Verify ping is working. Note the round-trip time. This is your "before" measurement.',
                  duration: '2 min',
                  teacherNotes: 'Document everything. Science needs baselines for comparison.'
                },
                {
                  instruction: 'Fail the node: Unplug Node B (or power it off). Start a stopwatch. Watch the ping output.',
                  duration: '3 min',
                  teacherNotes: 'Ping will start showing "Request timeout" or similar. Note when it started failing.'
                },
                {
                  instruction: 'Observe recovery (if possible): If A and C have an alternate path, watch for pings to resume. Time how long it takes.',
                  duration: '5 min',
                  teacherNotes: 'Recovery time is typically 10-30 seconds. If no alternate path, pings stay dead—that\'s also informative.'
                },
                {
                  instruction: 'Restore the node: Plug Node B back in. Start the stopwatch again. How long until the network stabilizes?',
                  duration: '5 min',
                  teacherNotes: 'Node must restart, join mesh, advertise routes, and be discovered by neighbors. Longer than failure detection.'
                },
                {
                  instruction: 'Document results: Record actual times vs. predictions. Were you right? What surprised you?',
                  duration: '7 min',
                  teacherNotes: 'Surprises are learning opportunities. Why was the prediction wrong? What did you learn?'
                },
              ],
              formativeAssessment: 'Did students successfully measure failure detection time? Can they explain why recovery takes longer than detection?',
              differentiation: {
                support: 'Provide a data recording sheet with columns for each measurement.',
                extension: 'Repeat the test 3 times and calculate average detection/recovery times.'
              }
            },
            {
              title: 'Experiment 2: Multiple Failures and Partition',
              duration: '25 minutes',
              overview: 'Students explore the limits of resilience by failing multiple nodes and observing network partition.',
              steps: [
                {
                  instruction: 'New hypothesis: "What if we fail two nodes? At what point does the network break completely?"',
                  duration: '3 min',
                  teacherNotes: 'This explores limits. Mesh is resilient but not invincible. Finding the breaking point is instructive.'
                },
                {
                  instruction: 'Identify critical nodes: Looking at your topology, which node, if failed, would cause the most damage? Why?',
                  duration: '4 min',
                  teacherNotes: 'Nodes with many connections are more critical. This is "betweenness centrality" in graph theory.'
                },
                {
                  instruction: 'Two-node failure test: With ping running, fail two nodes simultaneously. Does the network survive?',
                  duration: '6 min',
                  teacherNotes: 'Depending on topology, this might create a "partition"—two separate networks that can\'t reach each other.'
                },
                {
                  instruction: 'Partition detection: If partitioned, try pinging within each partition. Local communication should still work.',
                  duration: '5 min',
                  teacherNotes: 'Partitioned networks aren\'t completely dead—they\'re just two smaller networks. Graceful degradation.'
                },
                {
                  instruction: 'Recovery from partition: Restore one node. Watch the partition heal. How long until full connectivity returns?',
                  duration: '5 min',
                  teacherNotes: 'The mesh should automatically merge when a "bridge" node returns. This is self-healing in action.'
                },
                {
                  instruction: 'Reflection: "How would you design a network to be more resistant to partition? What tradeoffs are involved?"',
                  duration: '2 min',
                  teacherNotes: 'More connections = more resilience = more cost. There\'s no free lunch in network design.'
                },
              ],
              formativeAssessment: 'Do students understand network partition? Can they identify which nodes are most critical?',
              differentiation: {
                support: 'Demonstrate the partition concept on the board before physical testing.',
                extension: 'Research "k-connectivity"—how many nodes must fail to partition a network? Calculate for your topology.'
              }
            },
            {
              title: 'Documenting Resilience Characteristics',
              duration: '25 minutes',
              overview: 'Students create a comprehensive resilience report for their mesh network.',
              steps: [
                {
                  instruction: 'Create a "Resilience Report" document. This will be part of your final project documentation.',
                  duration: '2 min',
                  teacherNotes: 'Professional networks have SLAs (Service Level Agreements). This is a simplified version.'
                },
                {
                  instruction: 'Section 1: Topology. Include a diagram showing all nodes, connections, and which nodes are critical.',
                  duration: '5 min',
                  teacherNotes: 'The diagram should be updated from earlier lessons with new insights about criticality.'
                },
                {
                  instruction: 'Section 2: Failure Scenarios. Document each test: what failed, how long to detect, whether it recovered, how long to recover.',
                  duration: '8 min',
                  teacherNotes: 'Use a table format for easy comparison. Include predictions vs. actual results.'
                },
                {
                  instruction: 'Section 3: Limitations. What are the limits of this network\'s resilience? How many failures can it survive?',
                  duration: '5 min',
                  teacherNotes: 'Honest assessment of limits is valuable. Every network has failure modes.'
                },
                {
                  instruction: 'Section 4: Recommendations. If you were to improve this network\'s resilience, what would you add or change?',
                  duration: '5 min',
                  teacherNotes: 'Forward-looking section. Maybe: add a fourth node, relocate for better coverage, etc.'
                },
              ],
              formativeAssessment: 'Is the resilience report comprehensive? Does it include quantitative data from experiments?',
              differentiation: {
                support: 'Provide a report template with section headings and prompts.',
                extension: 'Calculate an "availability" percentage: if this network ran for a month, how much downtime would you expect from random node failures?'
              }
            },
          ],
        },
        {
          title: 'Planning for Coverage',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'How radio waves actually work: frequency, wavelength, and why walls/trees/weather affect signal strength differently',
            'Why line-of-sight matters: Fresnel zones, the physics of wireless propagation, and why rooftops are valuable',
            'The art of coverage planning: balancing node count, placement, cost, and redundancy—there\'s no perfect answer',
            'Why real-world testing beats calculations: theoretical coverage vs. actual performance, and how to iterate',
          ],
          objectives: [
            'Survey an area for mesh network deployment',
            'Understand factors affecting wireless coverage',
            'Create a node placement plan for a real or hypothetical area',
          ],
          activities: [
            'Site survey: Walk around with signal measurement app',
            'Obstacle analysis: Identify walls, trees, and other interference',
            'Coverage planning: Design a mesh network for the school or neighborhood',
            'Cost estimation: Calculate hardware needs for planned deployment',
          ],
          materials: ['Signal measurement app', 'Area map', 'Planning worksheet', 'Hardware cost reference'],
          detailedActivities: [
            {
              title: 'Wireless Propagation Basics: Why Signals Fade',
              duration: '20 minutes',
              overview: 'Students learn the physics of wireless signals and why real-world coverage differs from ideal calculations.',
              steps: [
                {
                  instruction: 'Demo: Use a flashlight to demonstrate line-of-sight. "Imagine this light is a WiFi signal. What happens when I put this book in the way?"',
                  duration: '3 min',
                  teacherNotes: 'Visible analogy. Some light passes through thin paper, none through thick book. Same with radio waves and walls.'
                },
                {
                  instruction: 'Explain Fresnel zones: "Radio waves need space around the line-of-sight. Even if you can SEE the other antenna, the signal might be blocked."',
                  duration: '5 min',
                  teacherNotes: 'Draw a football-shaped zone between antennas. Trees or buildings in that zone degrade signal even without blocking direct path.'
                },
                {
                  instruction: 'Material penetration: Show a chart of signal loss through different materials. Drywall: low loss. Concrete: medium. Metal: high. Water (rain, leaves): surprisingly high.',
                  duration: '5 min',
                  teacherNotes: '2.4GHz penetrates better but is more crowded. 5GHz is faster but blocked easier. Tradeoffs everywhere.'
                },
                {
                  instruction: 'Environment factors: "Weather affects signals. Rain absorbs 5GHz. Trees with wet leaves are worse than dry. Snow on roofs can block."',
                  duration: '4 min',
                  teacherNotes: 'Real networks must handle worst-case conditions. Design for rainy days, not sunny ones.'
                },
                {
                  instruction: 'The 6dB rule: "Every time you double the distance, you lose 6dB. Signal strength drops fast."',
                  duration: '3 min',
                  teacherNotes: 'Inverse square law in action. This is why node placement is so critical.'
                },
              ],
              formativeAssessment: 'Can students explain why a signal might fail even with line-of-sight? Do they understand material effects?',
              differentiation: {
                support: 'Provide a visual reference chart of signal loss through common materials.',
                extension: 'Research the formula for path loss in free space. Calculate expected signal at 100m vs. 500m.'
              }
            },
            {
              title: 'Site Survey: Walking the Coverage Area',
              duration: '30 minutes',
              overview: 'Students conduct a physical site survey, measuring signal strength and identifying obstacles.',
              steps: [
                {
                  instruction: 'Install a WiFi analyzer app on phones (WiFi Analyzer for Android, similar for iOS). Show how to read signal strength in dBm.',
                  duration: '5 min',
                  teacherNotes: '-30 to -50 dBm = excellent. -50 to -70 = good. -70 to -80 = weak. Below -80 = unreliable.'
                },
                {
                  instruction: 'Baseline measurement: At the location of your mesh node, what signal strength does the app show? This is your reference point.',
                  duration: '3 min',
                  teacherNotes: 'Measuring at the node itself should show strong signal. This confirms the app is working.'
                },
                {
                  instruction: 'Walking survey: Move around the coverage area (classroom, building, outdoor space). Record signal strength at marked points.',
                  duration: '12 min',
                  teacherNotes: 'Create a grid on a map. Students record measurements at each grid point. This becomes a coverage heatmap.'
                },
                {
                  instruction: 'Obstacle identification: At each point where signal dropped significantly, what\'s in the way? Note: wall type, distance, elevation difference.',
                  duration: '5 min',
                  teacherNotes: 'Connect the measurement to the obstacle. "Here the signal dropped because of the brick wall."'
                },
                {
                  instruction: 'Create coverage map: Plot measurements on the area map. Color-code: green (strong), yellow (adequate), red (weak/none).',
                  duration: '5 min',
                  teacherNotes: 'Visual representation of coverage. Gaps in green show where additional nodes are needed.'
                },
              ],
              formativeAssessment: 'Did students correctly measure and record signal strength? Can they correlate drops with obstacles?',
              differentiation: {
                support: 'Pre-mark measurement points on the map. Provide a recording template.',
                extension: 'Create a professional heatmap using online tools. Compare 2.4GHz vs. 5GHz coverage.'
              }
            },
            {
              title: 'Node Placement Planning',
              duration: '25 minutes',
              overview: 'Students use survey data to plan optimal node placement for their target coverage area.',
              steps: [
                {
                  instruction: 'Review coverage map: Where are the "red zones" (no signal)? These need to be addressed with additional nodes or different placement.',
                  duration: '4 min',
                  teacherNotes: 'Start with problems, then design solutions. Red zones are the priority.'
                },
                {
                  instruction: 'Identify potential node locations: Where could you place a node to cover the red zones? Consider: power availability, mounting options, visibility to other nodes.',
                  duration: '6 min',
                  teacherNotes: 'Practical constraints matter. A perfect location with no power is useless.'
                },
                {
                  instruction: 'Plan for redundancy: "A single node covering an area is a single point of failure. Can you add overlap with another node?"',
                  duration: '5 min',
                  teacherNotes: 'NYC Mesh principle: overlapping coverage provides resilience. Two weak signals can be better than one strong signal.'
                },
                {
                  instruction: 'Draw the proposed network: On the map, mark proposed node locations. Draw lines showing expected mesh links between nodes.',
                  duration: '5 min',
                  teacherNotes: 'This is the network design. It\'s a hypothesis to be tested—real deployment might need adjustments.'
                },
                {
                  instruction: 'Sanity check: Does every area have coverage? Can nodes reach each other? Is there a path to internet gateway (if needed)?',
                  duration: '5 min',
                  teacherNotes: 'Walk through the design logically. Common mistake: isolated nodes that can\'t reach the rest of the mesh.'
                },
              ],
              formativeAssessment: 'Does the node placement plan address coverage gaps? Is there redundancy in critical areas?',
              differentiation: {
                support: 'Provide a partially-completed plan that students extend.',
                extension: 'Use network planning software to model coverage. Compare predictions with survey data.'
              }
            },
            {
              title: 'Cost Estimation and Proposal',
              duration: '15 minutes',
              overview: 'Students estimate the cost of their planned deployment and create a simple proposal.',
              steps: [
                {
                  instruction: 'Equipment list: Based on your plan, list needed equipment. How many nodes? What type (indoor vs. outdoor)? Any special hardware (antennas, enclosures)?',
                  duration: '4 min',
                  teacherNotes: 'Use the equipment list from earlier lessons. Add items specific to outdoor deployment if needed.'
                },
                {
                  instruction: 'Price research: Look up prices for each item. Use vendor websites or provided reference sheet. Calculate total hardware cost.',
                  duration: '5 min',
                  teacherNotes: 'Realistic pricing teaches that infrastructure has real costs. Budget-friendly options exist but require tradeoffs.'
                },
                {
                  instruction: 'One-page proposal: Summarize your coverage plan in one page. Include: goal, node locations (with map), equipment list, estimated cost.',
                  duration: '4 min',
                  teacherNotes: 'Practice concise communication. Decision-makers want clarity, not pages of detail.'
                },
                {
                  instruction: 'Share proposals: Quick round-robin sharing. Each team has 1 minute to pitch their coverage plan.',
                  duration: '2 min',
                  teacherNotes: 'Brief presentations practice elevator pitches. "We can cover the school for $X with Y nodes because..."'
                },
              ],
              formativeAssessment: 'Are cost estimates realistic? Do proposals clearly communicate the plan?',
              differentiation: {
                support: 'Provide a proposal template with sections to fill in.',
                extension: 'Add operational costs: power, maintenance time, internet backhaul. Calculate monthly cost per user.'
              }
            },
          ],
        },
        {
          title: 'Community Mesh Networks & Project Showcase',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What makes community networks "community-owned": governance structures, member participation, and non-extractive models',
            'How successful networks solved real problems: funding, maintenance, growth, and keeping the community engaged',
            'The political dimension of infrastructure: why who owns the network matters for freedom, privacy, and resilience',
            'How your mesh project connects to global movements: from NYC Mesh to Guifi to Freifunk, you\'re part of something bigger',
          ],
          objectives: [
            'Research and present on an existing community mesh network',
            'Present their mesh network project',
            'Discuss how mesh networks support tech sovereignty',
          ],
          activities: [
            'Research presentations: Teams present on NYC Mesh, Guifi, Freifunk, or others',
            'Project demonstrations: Show working mesh network',
            'Future planning: How could this scale to a neighborhood?',
            'Discussion: Mesh networks as infrastructure independence',
          ],
          materials: ['Presentation materials', 'Working mesh network', 'Community network resources'],
          detailedActivities: [
            {
              title: 'Community Network Research: Learning from the Field',
              duration: '25 minutes',
              overview: 'Teams research real-world community mesh networks and prepare to share key insights with the class.',
              steps: [
                {
                  instruction: 'Assign community networks to teams: NYC Mesh (USA), Guifi.net (Spain), Freifunk (Germany), Detroit Community Technology Project (USA), Sarantaporo.gr (Greece).',
                  duration: '2 min',
                  teacherNotes: 'Each network has unique lessons. Assign based on team size and interest. Add local networks if relevant.'
                },
                {
                  instruction: 'Research questions: (1) When/why did they start? (2) How big are they now? (3) What technology do they use? (4) How are they organized? (5) What challenges did they overcome?',
                  duration: '15 min',
                  teacherNotes: 'Use the resources section added to this curriculum. Official sites, wikis, and news articles are good sources.'
                },
                {
                  instruction: 'Prepare a 3-minute presentation: Each team will teach the class about their network. Visual aids encouraged.',
                  duration: '5 min',
                  teacherNotes: 'Brief presentations force focus on what\'s most important. No death by PowerPoint.'
                },
                {
                  instruction: 'Identify one inspiring quote or principle from your network. NYC Mesh: "Installing is the main activity." What\'s yours?',
                  duration: '3 min',
                  teacherNotes: 'Principles distill wisdom. These quotes will stick with students longer than statistics.'
                },
              ],
              formativeAssessment: 'Did teams find accurate, substantive information? Can they articulate what makes each network unique?',
              differentiation: {
                support: 'Provide pre-selected links to key resources for each network.',
                extension: 'Contact the community network directly (via email or social media) with a question. Report back what you learn.'
              }
            },
            {
              title: 'Community Network Presentations',
              duration: '25 minutes',
              overview: 'Teams present their research, and the class synthesizes common patterns across successful community networks.',
              steps: [
                {
                  instruction: 'Presentations: Each team has 3 minutes. Present: origin story, current scale, technology, governance, key lesson.',
                  duration: '18 min',
                  teacherNotes: 'Keep time strictly. Five 3-minute presentations plus brief transitions. Encourage questions after all present.'
                },
                {
                  instruction: 'Q&A and clarifications: After all presentations, open floor for questions. Did anything surprise you? Confuse you?',
                  duration: '4 min',
                  teacherNotes: 'Cross-pollination of ideas. Students may have questions about networks other than the one they researched.'
                },
                {
                  instruction: 'Synthesis: "What do successful community networks have in common?" Instructor facilitates identification of patterns.',
                  duration: '3 min',
                  teacherNotes: 'Patterns: volunteer-driven, started small, community trust, solving real problems, sustainable funding model, governance.'
                },
              ],
              formativeAssessment: 'Were presentations informative? Can the class articulate common success factors?',
              differentiation: {
                support: 'Provide presentation structure: Slide 1 = Origin, Slide 2 = Technology, Slide 3 = Lesson.',
                extension: 'Write a reflection: "Which community network\'s approach would work best in our community? Why?"'
              }
            },
            {
              title: 'Project Showcase: Demonstrating Your Mesh Network',
              duration: '25 minutes',
              overview: 'Teams demonstrate their working mesh network, explaining what they built and what they learned.',
              steps: [
                {
                  instruction: 'Setup: Ensure mesh network is powered on and working. Run quick verification (batctl o, ping tests) before presenting.',
                  duration: '3 min',
                  teacherNotes: 'Live demos can fail. Have backup screenshots/documentation ready. But live demos are much more impressive when they work.'
                },
                {
                  instruction: 'Demonstration structure: (1) Show the physical setup, (2) Explain the topology, (3) Demonstrate connectivity (client-to-client ping), (4) Show resilience (unplug a node, watch recovery).',
                  duration: '12 min',
                  teacherNotes: 'Walking through the demo in logical order helps audience follow. Physical → Logical → Proof → Resilience.'
                },
                {
                  instruction: 'Explain challenges: What was hardest? What broke? How did you fix it? These stories are valuable.',
                  duration: '5 min',
                  teacherNotes: 'Struggle stories teach more than success stories. Normalize that building things is hard and iterative.'
                },
                {
                  instruction: 'Q&A from audience: Other teams and instructor ask questions. "How would you do it differently?" "What would you add?"',
                  duration: '5 min',
                  teacherNotes: 'Friendly questions help surface learning. Avoid gotcha questions—this is a celebration of achievement.'
                },
              ],
              formativeAssessment: 'Does the demo work? Can students explain what they built and why each component matters?',
              differentiation: {
                support: 'Provide a demo script with exactly what to show and say.',
                extension: 'Demo an advanced feature: monitoring dashboard, gateway to internet, encrypted mesh links.'
              }
            },
            {
              title: 'Connecting to Tech Sovereignty: Final Reflection',
              duration: '15 minutes',
              overview: 'Students reflect on how mesh networking connects to the larger goal of technology independence for communities.',
              steps: [
                {
                  instruction: 'Discussion prompt: "You just built infrastructure that doesn\'t depend on any company. Why does that matter?"',
                  duration: '4 min',
                  teacherNotes: 'Connect to big picture: privacy, resilience, community ownership, digital equity, independence from surveillance capitalism.'
                },
                {
                  instruction: 'Think-pair-share: "If your neighborhood had a community mesh network, how might daily life be different?"',
                  duration: '4 min',
                  teacherNotes: 'Practical imagination. Free internet access for everyone? Local services? No ISP bill? Community connection?'
                },
                {
                  instruction: 'Looking forward: "In Project 4, we\'ll plan a full community network—the organizational, legal, and social aspects, not just technical." Preview what\'s next.',
                  duration: '3 min',
                  teacherNotes: 'Bridge to next project. Technical skills are necessary but not sufficient. Governance matters.'
                },
                {
                  instruction: 'Exit reflection: "What\'s one thing you learned in this project that you\'ll remember five years from now?"',
                  duration: '4 min',
                  teacherNotes: 'Long-term retention question. Written reflection. These answers are gold for instructor feedback.'
                },
              ],
              formativeAssessment: 'Do reflections show understanding of why mesh networks matter beyond just technical achievement?',
              differentiation: {
                support: 'Provide sentence starters: "Mesh networks matter because..." "If my neighborhood had a mesh network..."',
                extension: 'Write a 500-word essay: "The case for community mesh networks as critical infrastructure."'
              }
            },
          ],
        },
      ],
      assessment: {
        formative: [
          'Configuration checkpoints at each build stage',
          'Peer review of documentation',
          'Troubleshooting challenges (fix intentionally broken configurations)',
          'Quiz on mesh concepts and protocols',
        ],
        summative: 'Students will build a functional 3+ node mesh network, document the configuration process, demonstrate resilience through node failure testing, and present a proposal for scaling the network to serve a real community area (school, neighborhood, etc.).',
      },
      extensions: [
        'Add a gateway node that provides internet access to the mesh',
        'Implement mesh network monitoring and visualization',
        'Research and test directional antennas for longer range links',
        'Explore cjdns or Yggdrasil for encrypted mesh networking',
        'Design a solar-powered outdoor mesh node',
      ],
      realWorldConnections: [
        'Community wireless networks like NYC Mesh, Guifi.net, and Freifunk use these exact principles',
        'Mesh networks have been deployed in disaster areas when traditional infrastructure fails',
        'Some cities are exploring community mesh as an alternative to ISP monopolies',
        'Understanding mesh networking is the first step toward building community internet infrastructure',
      ],
    },
    {
      id: 'project-4',
      title: 'Community Internet Infrastructure',
      description: 'Design and plan a community-owned ISP or wireless network. Understand legal, technical, and organizational requirements.',
      difficulty: 'Advanced',
      duration: '8-12 weeks',
      gradeBand: '9-12',
      overview: `This capstone project challenges students to think like community network architects. They'll research legal requirements, design network architecture, plan budgets, create governance structures, and develop outreach strategies. While students may not build a full community ISP, they will produce a comprehensive proposal that could actually be used to launch such an initiative. This project integrates technical knowledge with civic engagement, organizational design, and project management.`,
      learningObjectives: [
        'Research and summarize regulations affecting community internet projects',
        'Design a scalable network architecture for a defined community area',
        'Create a realistic budget including equipment, installation, and maintenance costs',
        'Develop a governance model for community ownership and decision-making',
        'Plan community outreach and member recruitment strategies',
        'Present a comprehensive proposal to stakeholders',
      ],
      prerequisites: [
        'Completion of Projects 1-3 or equivalent experience',
        'Basic understanding of budgeting and project planning',
        'Interest in community organizing and civic engagement',
      ],
      materials: {
        required: [
          'Computer with internet access for research',
          'Mapping tools (Google Earth, OpenStreetMap)',
          'Spreadsheet software for budgeting',
          'Presentation software',
        ],
        optional: [
          'Network design software (draw.io, Visio)',
          'Survey tools (Google Forms, etc.)',
          'Access to local community members for interviews',
          'Budget template from existing community networks',
        ],
      },
      lessons: [
        {
          title: 'What Does It Take? Community Network Case Studies',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'What "success" means for community networks: sustainability, coverage, governance—not just technical achievement',
            'The common patterns across successful projects: anchor institutions, volunteer core, incremental growth, community trust',
            'Why most community networks start small: the bootstrapping problem and how to build momentum from limited resources',
            'What differentiates surviving networks from abandoned ones: organizational health matters as much as technical quality',
          ],
          objectives: [
            'Analyze 2-3 successful community network projects',
            'Identify common challenges and success factors',
            'Understand different models (ISP, mesh, hybrid)',
          ],
          activities: [
            'Case study research: Teams investigate different community networks',
            'Expert video: Watch interviews with community network founders',
            'Comparison matrix: What do successful projects have in common?',
            'Discussion: Which model might work best for our community?',
          ],
          materials: ['Case study materials', 'Video resources', 'Comparison template'],
          detailedActivities: [
            {
              title: 'What Makes a Community Network Successful?',
              duration: '20 minutes',
              overview: 'Students define success criteria before analyzing case studies, moving beyond "it works" to sustainability and impact.',
              steps: [
                {
                  instruction: 'Brainstorm: "What does \'success\' mean for a community network?" Collect answers on the board without judgment.',
                  duration: '5 min',
                  teacherNotes: 'Expected answers: lots of users, fast speeds, low cost, still running. Guide toward deeper criteria.'
                },
                {
                  instruction: 'Introduce success dimensions: Technical (it works), Financial (sustainable), Social (community ownership), Scalable (can grow), Resilient (survives challenges).',
                  duration: '5 min',
                  teacherNotes: 'Many networks "work" technically but fail financially or socially. Success is multidimensional.'
                },
                {
                  instruction: 'Discussion: "A network with 1000 users but no governance vs. a network with 50 users and strong community—which is more successful?"',
                  duration: '5 min',
                  teacherNotes: 'Deliberately provocative. There\'s no single right answer. The goal is to complicate naive definitions of success.'
                },
                {
                  instruction: 'Create rubric: As a class, create a simple rubric (1-5 scale) for evaluating community networks. Categories: Technical, Financial, Governance, Community Impact.',
                  duration: '5 min',
                  teacherNotes: 'This rubric will be used to evaluate case studies. Students own the criteria.'
                },
              ],
              formativeAssessment: 'Can students articulate why "working" isn\'t enough for success? Does the rubric capture multiple dimensions?',
              differentiation: {
                support: 'Provide a pre-made rubric that students can modify rather than create from scratch.',
                extension: 'Research: How do funders evaluate community network success? What metrics do grant reports require?'
              }
            },
            {
              title: 'Deep Dive Case Studies',
              duration: '45 minutes',
              overview: 'Teams conduct in-depth research on assigned community networks using the class-created rubric.',
              videoResources: [
                {
                  title: 'NYC Mesh: Building Community-Owned Internet',
                  url: 'https://www.youtube.com/watch?v=RfPm2JpJPuU',
                  duration: '8 min',
                  description: 'Documentary on how NYC Mesh volunteers build and maintain community internet infrastructure.'
                },
                {
                  title: 'Detroit Community Technology Project',
                  url: 'https://www.youtube.com/watch?v=_aPSVlEJrFg',
                  duration: '5 min',
                  description: 'How Detroit communities are building their own digital infrastructure and training programs.'
                },
                {
                  title: 'guifi.net: The Story of a Commons',
                  url: 'https://www.youtube.com/watch?v=SjcpxZzJO4w',
                  duration: '12 min',
                  description: 'Documentary about the world\'s largest community network in Catalonia, Spain.'
                },
                {
                  title: 'B4RN: Broadband for the Rural North',
                  url: 'https://www.youtube.com/watch?v=bKmQSxxjlRc',
                  duration: '6 min',
                  description: 'How rural UK communities built their own fiber-optic broadband cooperative.'
                },
                {
                  title: 'Rhizomatica: Community Cellular Networks in Mexico',
                  url: 'https://www.youtube.com/watch?v=6BbEgC5rqxg',
                  duration: '10 min',
                  description: 'Indigenous communities in Oaxaca operating their own cellular telephone networks.'
                },
              ],
              steps: [
                {
                  instruction: 'Assign case studies: Detroit Community Technology Project, Rhizomatica (Mexico), B4RN (UK rural fiber), guifi.net (Spain), NYC Mesh.',
                  duration: '2 min',
                  teacherNotes: 'Each network has different strengths. Mix models: cooperative, nonprofit, informal collective.'
                },
                {
                  instruction: 'Provide research resources: Official websites, news articles, academic papers, video interviews with founders.',
                  duration: '3 min',
                  teacherNotes: 'Pre-curated resources save time and ensure quality. Add: Internet Society case studies, CNET profiles.'
                },
                {
                  instruction: 'Research phase: Teams answer key questions. When/why did they start? How big now? What technology? How funded? What governance? What challenges?',
                  duration: '25 min',
                  teacherNotes: 'Teams should divide research tasks. One person on history, one on tech, one on governance, etc.'
                },
                {
                  instruction: 'Apply rubric: Rate your network on each dimension of the class rubric. Prepare to justify your ratings.',
                  duration: '10 min',
                  teacherNotes: 'This forces structured analysis rather than impressionistic "they seem good." Evidence required.'
                },
                {
                  instruction: 'Identify the "secret sauce": What\'s the one thing that makes this network work? Prepare to share.',
                  duration: '5 min',
                  teacherNotes: 'Force synthesis. guifi: Network Commons License. Detroit: training and employment. NYC Mesh: volunteer culture.'
                },
              ],
              formativeAssessment: 'Did teams find substantive information? Can they justify their rubric ratings with evidence?',
              differentiation: {
                support: 'Provide a research guide with specific questions to answer for each source.',
                extension: 'Find and analyze a failed community network. What went wrong? How could it have been prevented?'
              }
            },
            {
              title: 'Case Study Presentations and Synthesis',
              duration: '35 minutes',
              overview: 'Teams present their findings, and the class identifies patterns across successful community networks.',
              steps: [
                {
                  instruction: 'Presentations: Each team has 4 minutes. Cover: origin story, current state, rubric ratings (with justification), "secret sauce."',
                  duration: '22 min',
                  teacherNotes: 'Strict timing. 5 presentations x 4 minutes + transitions. Encourage visuals and specific examples.'
                },
                {
                  instruction: 'Pattern identification: On the board, create a matrix. Rows = networks, columns = success factors. What patterns emerge?',
                  duration: '8 min',
                  teacherNotes: 'Common patterns: started with anchor institution, volunteer core team, solved a real problem, grew incrementally.'
                },
                {
                  instruction: 'Synthesis discussion: "What do all successful networks have in common? What differs?" Identify 3-5 common success factors.',
                  duration: '5 min',
                  teacherNotes: 'Capture these factors—they\'ll guide students\' own network planning.'
                },
              ],
              formativeAssessment: 'Were presentations informative and evidence-based? Did students identify meaningful patterns?',
              differentiation: {
                support: 'Provide presentation template with slides pre-labeled.',
                extension: 'Write a comparative analysis: "Lessons from X and Y networks for our community."'
              }
            },
            {
              title: 'Applying Lessons to Our Community',
              duration: '20 minutes',
              overview: 'Students begin thinking about which models and lessons apply to their own community context.',
              steps: [
                {
                  instruction: 'Reflection: "Which case study network is most similar to what might work in our community? Why?"',
                  duration: '5 min',
                  teacherNotes: 'Consider: urban vs. rural, resources available, existing community organizations, digital divide severity.'
                },
                {
                  instruction: 'Discussion: "What success factors from case studies do we already have in our community? What\'s missing?"',
                  duration: '8 min',
                  teacherNotes: 'Anchor institutions? Technical volunteers? Community trust? Funding sources? Be realistic about gaps.'
                },
                {
                  instruction: 'Exit ticket: "One insight from case studies I want to apply to our project + one question I still have."',
                  duration: '5 min',
                  teacherNotes: 'Written reflection ensures everyone engages. Questions guide future lessons.'
                },
                {
                  instruction: 'Preview: "Next lesson we tackle the legal landscape. Understanding what\'s allowed shapes what\'s possible."',
                  duration: '2 min',
                  teacherNotes: 'Bridge to next lesson. Legal context matters for choosing organizational structure.'
                },
              ],
              formativeAssessment: 'Do students see connections between case studies and their own context? Are questions thoughtful?',
              differentiation: {
                support: 'Provide a comparison template: "Case study X is like our community because..."',
                extension: 'Draft a one-paragraph "vision statement" for a community network in your area.'
              }
            },
          ],
        },
        {
          title: 'Legal Landscape: What Are We Allowed to Do?',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why telecommunications is regulated: spectrum is a shared resource, and incumbents have lobbied for rules that protect their business',
            'The difference between licensed and unlicensed spectrum: why you can run WiFi freely but can\'t broadcast on FM radio',
            'How legal structure shapes ownership: why cooperatives align with community values, and what "common carrier" means',
            'The political fight for community broadband: how ISPs lobby against municipal networks and what advocates are doing',
          ],
          objectives: [
            'Understand FCC regulations affecting community networks',
            'Research state and local laws and restrictions',
            'Identify potential legal structures (nonprofit, cooperative, LLC)',
          ],
          activities: [
            'Research: FCC rules on wireless and ISPs',
            'Guest speaker or video: Lawyer/advocate experienced with community networks',
            'State research: What are the laws in our state?',
            'Legal structure comparison: Nonprofit vs. cooperative vs. LLC',
          ],
          materials: ['FCC regulation summaries', 'State law resources', 'Legal structure comparison guide'],
          detailedActivities: [
            {
              title: 'Why Is Telecom Regulated? Understanding the Landscape',
              duration: '25 minutes',
              overview: 'Students understand why telecommunications is regulated and how regulations affect community network options.',
              steps: [
                {
                  instruction: 'Discussion starter: "Can anyone just start a radio station? A cable company? A cell phone network? Why or why not?"',
                  duration: '4 min',
                  teacherNotes: 'Students often don\'t know the difference between licensed (radio) and unlicensed (WiFi) spectrum.'
                },
                {
                  instruction: 'Explain spectrum basics: Radio waves are a shared resource. Without regulation, interference would make wireless unusable. FCC manages spectrum.',
                  duration: '6 min',
                  teacherNotes: 'Analogy: spectrum is like highway lanes. Without rules, everyone crashes. FCC assigns lanes and speed limits.'
                },
                {
                  instruction: 'Key distinction: Licensed vs. unlicensed. WiFi operates on unlicensed spectrum (anyone can use, power limited). Cell phones need licenses (exclusive use, expensive).',
                  duration: '6 min',
                  teacherNotes: 'This is why community networks use WiFi/mesh: no license needed. But power limits affect range.'
                },
                {
                  instruction: 'ISP regulations: Community networks can operate as ISPs, but there are rules. Research Title I vs. Title II classification. What does "common carrier" mean?',
                  duration: '6 min',
                  teacherNotes: 'Net neutrality debates live here. Title II = stricter rules but also protections. Landscape keeps changing.'
                },
                {
                  instruction: 'The political reality: Large ISPs lobby against community networks. Some states have laws restricting municipal broadband. Know your battlefield.',
                  duration: '3 min',
                  teacherNotes: 'This isn\'t neutral regulation—it\'s politics. Understanding who opposes community networks and why is important.'
                },
              ],
              formativeAssessment: 'Can students explain why WiFi is "free" but cell phones need licenses? Do they understand the political landscape?',
              differentiation: {
                support: 'Provide a simplified diagram of licensed vs. unlicensed spectrum with examples.',
                extension: 'Research: What lobbying have ISPs done against municipal broadband? Find specific examples.'
              }
            },
            {
              title: 'State and Local Law Research',
              duration: '35 minutes',
              overview: 'Students research the specific legal environment in their state, understanding what\'s allowed and restricted.',
              steps: [
                {
                  instruction: 'Introduce state variation: "19 states have laws restricting municipal broadband. Is yours one of them?" Provide list.',
                  duration: '4 min',
                  teacherNotes: 'States with restrictions: NC, TN, TX, and others. Some prohibit, others require referendums. Find your state\'s status.'
                },
                {
                  instruction: 'Research task: Teams research state-specific questions. (1) Municipal broadband restrictions? (2) Easement/right-of-way rules? (3) Required permits?',
                  duration: '15 min',
                  teacherNotes: 'Use state utility commission websites, community broadband resources, and local government sites.'
                },
                {
                  instruction: 'Local research: Beyond state law, what local permits are needed? Can you install equipment on utility poles? Rooftops?',
                  duration: '10 min',
                  teacherNotes: 'Local rules vary widely. Some cities are community-network-friendly, others create barriers. Find local resources.'
                },
                {
                  instruction: 'Share findings: Quick report from each team. Build a class summary of the local legal environment.',
                  duration: '6 min',
                  teacherNotes: 'Collect on board: "Allowed," "Restricted," "Unclear." This informs the project going forward.'
                },
              ],
              formativeAssessment: 'Did students find accurate state/local information? Can they identify key restrictions or opportunities?',
              differentiation: {
                support: 'Provide pre-researched state summaries; students verify and add local details.',
                extension: 'Compare your state to a "community-network-friendly" state. What policy changes would help?'
              }
            },
            {
              title: 'Choosing a Legal Structure',
              duration: '35 minutes',
              overview: 'Students compare organizational structures (nonprofit, cooperative, LLC) and their implications for community ownership.',
              steps: [
                {
                  instruction: 'Present options: Nonprofit 501(c)(3), Cooperative, LLC, Unincorporated collective. Each has tradeoffs for control, liability, taxes, funding.',
                  duration: '8 min',
                  teacherNotes: 'No single best answer. guifi uses foundation + license. Many use nonprofit. B4RN is member-owned coop.'
                },
                {
                  instruction: 'Comparison matrix: Create a chart. Columns: Structure. Rows: Ownership, Decision-making, Tax status, Liability protection, Funding access.',
                  duration: '10 min',
                  teacherNotes: 'Coops: member-owned, democratic, may pay taxes. Nonprofits: mission-driven, tax-exempt, grant-eligible. LLCs: flexible, taxable.'
                },
                {
                  instruction: 'Case study connections: "Which structure did each of our case study networks use? Why do you think they chose it?"',
                  duration: '7 min',
                  teacherNotes: 'Connect back to Lesson 1. Structure choices reflect values and constraints.'
                },
                {
                  instruction: 'Values discussion: "For a community network, which is most important: community control, tax benefits, grant access, or simplicity?"',
                  duration: '5 min',
                  teacherNotes: 'No right answer. Coops maximize control but are complex. Nonprofits access grants but have board governance. Tradeoffs.'
                },
                {
                  instruction: 'Preliminary preference: "Based on what we know, which structure seems best for our project? This is a hypothesis we might revise."',
                  duration: '5 min',
                  teacherNotes: 'Document the choice and reasoning. Revisit after learning more in later lessons.'
                },
              ],
              formativeAssessment: 'Can students explain tradeoffs between structures? Do they see connections between values and structure choice?',
              differentiation: {
                support: 'Provide a pre-filled comparison matrix; students add local considerations.',
                extension: 'Research: How does guifi.net\'s "Network Commons License" work? Is it applicable here?'
              }
            },
            {
              title: 'Legal Expert Perspective',
              duration: '25 minutes',
              overview: 'Students learn from a guest speaker or video featuring someone with legal expertise in community networks.',
              videoResources: [
                {
                  title: 'Community Broadband: Legal Pathways and Barriers',
                  url: 'https://www.youtube.com/watch?v=qVvdv-5HFFA',
                  duration: '18 min',
                  description: 'Institute for Local Self-Reliance on legal frameworks for community networks and state preemption laws.'
                },
                {
                  title: 'Municipal Broadband: Fighting for Community Networks',
                  url: 'https://www.youtube.com/watch?v=1B0u6nvcTsI',
                  duration: '12 min',
                  description: 'EFF discussion on the legal and political battles communities face when building their own networks.'
                },
                {
                  title: 'Cooperatives and Community Broadband',
                  url: 'https://www.youtube.com/watch?v=gY3Ot6MxEwo',
                  duration: '15 min',
                  description: 'How cooperative legal structures enable community ownership of telecommunications infrastructure.'
                },
              ],
              steps: [
                {
                  instruction: 'Guest speaker (if available): Local telecom lawyer, municipal broadband advocate, or community network legal expert.',
                  duration: '15 min',
                  teacherNotes: 'Ideal: someone with direct experience. Alternatives: EFF staff, community network board member, law school clinic.'
                },
                {
                  instruction: 'If no guest: Watch video interview with community network legal expert. Pause and discuss key points.',
                  duration: '15 min',
                  teacherNotes: 'Internet Archive, EFF, or community network YouTube channels have relevant interviews.'
                },
                {
                  instruction: 'Q&A: Prepare 3-5 questions in advance. Focus on practical advice: "What legal mistakes do new networks make?"',
                  duration: '7 min',
                  teacherNotes: 'Common advice: get liability insurance, document everything, understand pole attachment rules, don\'t overpromise.'
                },
                {
                  instruction: 'Key takeaways: Capture the most important legal advice. Add to project documentation.',
                  duration: '3 min',
                  teacherNotes: 'Legal issues aren\'t exciting but sinking a project over a preventable legal problem is worse.'
                },
              ],
              formativeAssessment: 'Did students engage meaningfully with legal perspectives? Can they identify key legal considerations for their project?',
              differentiation: {
                support: 'Provide a list of suggested questions for the speaker.',
                extension: 'Write a "legal considerations" memo for your project based on today\'s learning.'
              }
            },
          ],
        },
        {
          title: 'Defining Your Service Area',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why geography matters: density affects cost per household, terrain affects wireless propagation, existing infrastructure affects options',
            'The "digital divide" in your community: who lacks access, why they lack it, and what barriers exist beyond just cost',
            'What "anchor institutions" provide: not just buildings, but trust, legitimacy, power access, and community relationships',
            'How to scope achievably: why starting with a neighborhood is smarter than trying to cover a city from day one',
          ],
          objectives: [
            'Select and justify a target service area',
            'Analyze demographics and existing connectivity',
            'Identify potential anchor institutions and partners',
          ],
          activities: [
            'Mapping exercise: Define service area boundaries',
            'Demographic research: Who lives in the area? What are their connectivity needs?',
            'Anchor identification: Schools, libraries, businesses that could partner',
            'Need assessment: How many households lack adequate internet?',
          ],
          materials: ['Mapping tools', 'Demographic data sources', 'Partner identification worksheet'],
          detailedActivities: [
            {
              title: 'Understanding the Digital Divide Locally',
              duration: '20 minutes',
              overview: 'Students investigate who in their community lacks adequate internet access and why, grounding the project in real needs.',
              steps: [
                {
                  instruction: 'Discussion: "Who in this room has had their internet go out? Who has had slow internet that made homework impossible? Who knows someone without internet at home?"',
                  duration: '4 min',
                  teacherNotes: 'Personal connection matters. Many students have experienced the digital divide firsthand.'
                },
                {
                  instruction: 'Data research: Use FCC broadband maps, Census data, and local reports. What percentage of households lack broadband? Where are they concentrated?',
                  duration: '8 min',
                  teacherNotes: 'FCC maps are notoriously optimistic. Local reports and surveys are often more accurate.'
                },
                {
                  instruction: 'Beyond statistics: "The digital divide isn\'t just about having a connection. What other barriers exist?" Cost, digital literacy, language, trust, device access.',
                  duration: '5 min',
                  teacherNotes: 'A $70/month connection is useless to a family that can\'t afford it. Community networks must address affordability.'
                },
                {
                  instruction: 'Mapping the divide: On a local map, mark areas known to have poor connectivity or underserved populations.',
                  duration: '3 min',
                  teacherNotes: 'This becomes the foundation for service area selection. Connect data to geography.'
                },
              ],
              formativeAssessment: 'Do students understand the digital divide in their community? Can they identify both infrastructure and non-infrastructure barriers?',
              differentiation: {
                support: 'Provide pre-researched local data on broadband access.',
                extension: 'Interview a community member without home internet. What would connectivity change for them?'
              }
            },
            {
              title: 'Defining Service Area Boundaries',
              duration: '25 minutes',
              overview: 'Students select and justify a target service area, balancing impact, feasibility, and strategic considerations.',
              steps: [
                {
                  instruction: 'Introduce scoping principles: Start small to prove concept. Choose an area with clear need, anchor institutions, and achievable coverage.',
                  duration: '4 min',
                  teacherNotes: 'NYC Mesh started in one neighborhood. Guifi started in one town. Don\'t try to cover a city on day one.'
                },
                {
                  instruction: 'Mapping exercise: Using Google Earth, OpenStreetMap, or printed maps, draw potential service area boundaries.',
                  duration: '8 min',
                  teacherNotes: 'Consider natural boundaries (rivers, highways), administrative boundaries (neighborhoods), and practical boundaries (range limits).'
                },
                {
                  instruction: 'Criteria evaluation: For each potential area, assess: (1) Need level, (2) Population density, (3) Terrain/obstacles, (4) Anchor institution presence.',
                  duration: '8 min',
                  teacherNotes: 'Use a scoring matrix. Not all criteria are equal—decide which matter most for this project.'
                },
                {
                  instruction: 'Select and justify: Teams select their preferred service area and write a one-paragraph justification.',
                  duration: '5 min',
                  teacherNotes: 'The justification forces articulation of reasoning. This becomes part of the proposal.'
                },
              ],
              formativeAssessment: 'Is the selected area achievable? Does the justification show understanding of relevant factors?',
              differentiation: {
                support: 'Provide a list of potential service areas to choose from with pros/cons.',
                extension: 'Create a phased expansion plan: Phase 1 area, Phase 2, Phase 3.'
              }
            },
            {
              title: 'Identifying Anchor Institutions',
              duration: '25 minutes',
              overview: 'Students identify potential partner organizations that could provide resources, legitimacy, and access.',
              steps: [
                {
                  instruction: 'What is an anchor institution? Organizations with: physical presence, community trust, resources (roof space, electricity, funding), mission alignment.',
                  duration: '4 min',
                  teacherNotes: 'Schools, libraries, churches, community centers, housing authorities. NYC Mesh uses building roofs. Detroit works with community orgs.'
                },
                {
                  instruction: 'Brainstorm anchors: List every potential anchor institution in or near your service area. Cast a wide net.',
                  duration: '6 min',
                  teacherNotes: 'Don\'t filter yet. Libraries, schools, community colleges, churches, community development corps, housing projects, YMCAs.'
                },
                {
                  instruction: 'Evaluate fit: For top 5 candidates, assess: roof/tower access, electrical power, staff capacity, community trust, mission alignment.',
                  duration: '8 min',
                  teacherNotes: 'Not all anchors are equal. A trusted community org with poor roof access might be better than a tall building with no community connection.'
                },
                {
                  instruction: 'Outreach planning: "How would you approach these organizations? What would you ask for? What would you offer in return?"',
                  duration: '5 min',
                  teacherNotes: 'Community networks succeed when partnerships are mutually beneficial. What value does the network provide to anchors?'
                },
                {
                  instruction: 'Priority ranking: Select your top 3 anchor targets with reasoning.',
                  duration: '2 min',
                  teacherNotes: 'Add to project documentation. These become real outreach targets in later lessons.'
                },
              ],
              formativeAssessment: 'Have students identified realistic anchor partners? Do they understand mutual value in partnerships?',
              differentiation: {
                support: 'Provide a list of anchor institution types with evaluation criteria.',
                extension: 'Draft an initial outreach email to your top anchor. What would you say?'
              }
            },
            {
              title: 'Needs Assessment Planning',
              duration: '20 minutes',
              overview: 'Students plan how to gather community input on connectivity needs and preferences.',
              steps: [
                {
                  instruction: 'Why survey the community? You might think you know what they need, but you don\'t. Assumptions fail. Listening builds trust.',
                  duration: '3 min',
                  teacherNotes: 'guifi emphasizes: "Installing is the main activity." But you can\'t install without knowing where and what people want.'
                },
                {
                  instruction: 'What to ask: Current connectivity (or lack), what they\'d use internet for, what they\'d pay, concerns about privacy/security, interest in participating.',
                  duration: '5 min',
                  teacherNotes: 'Ask about barriers too. "Why don\'t you have internet?" might reveal: cost, availability, not knowing how, past bad experience.'
                },
                {
                  instruction: 'How to reach people: Door-to-door, community events, churches, schools, online (for those with access). Consider language and accessibility.',
                  duration: '5 min',
                  teacherNotes: 'Online surveys miss people without internet. In-person is harder but reaches everyone. Partner with trusted orgs.'
                },
                {
                  instruction: 'Draft survey questions: Create 5-10 questions that would help you understand community needs and interest.',
                  duration: '5 min',
                  teacherNotes: 'Keep it short. Long surveys get abandoned. Focus on actionable information.'
                },
                {
                  instruction: 'Pilot test: Exchange surveys with another team. Is it clear? Does it ask the right things?',
                  duration: '2 min',
                  teacherNotes: 'Peer review catches confusing questions. Iterate before deployment.'
                },
              ],
              formativeAssessment: 'Are survey questions clear and actionable? Does the outreach plan reach underserved populations?',
              differentiation: {
                support: 'Provide example survey questions from existing community network needs assessments.',
                extension: 'Conduct a mini needs assessment: survey 5 people in your target area and report findings.'
              }
            },
          ],
        },
        {
          title: 'Technical Architecture Design',
          duration: '150 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why fiber vs. wireless is a tradeoff, not a clear winner: cost, speed, maintenance, scalability—each has strengths',
            'What "backhaul" means and why it\'s critical: the connection to the broader internet and why it\'s often the bottleneck',
            'How to design for resilience: single points of failure, redundant paths, and why uptime matters for trust',
            'The relationship between architecture and ownership: technical choices embed power relationships and maintenance burdens',
          ],
          objectives: [
            'Design a network architecture for the service area',
            'Select appropriate technologies (fiber, wireless, hybrid)',
            'Plan backhaul and internet interconnection',
          ],
          activities: [
            'Technology selection: Compare fiber vs. fixed wireless vs. hybrid',
            'Architecture design: Create network topology diagram',
            'Backhaul planning: How will the network connect to the broader internet?',
            'Redundancy planning: What happens if something fails?',
          ],
          materials: ['Network design tools', 'Technology comparison guide', 'Architecture examples'],
          detailedActivities: [
            {
              title: 'Technology Options: Fiber vs. Wireless vs. Hybrid',
              duration: '35 minutes',
              overview: 'Students compare network technologies, understanding tradeoffs rather than seeking a single "best" answer.',
              steps: [
                {
                  instruction: 'Present the options: Fiber optic (wired), Fixed wireless, Mesh wireless, Hybrid approaches. Each has strengths and weaknesses.',
                  duration: '5 min',
                  teacherNotes: 'Avoid bias. Fiber is fastest but most expensive. Wireless is cheaper but weather-dependent. Mesh is resilient but slower.'
                },
                {
                  instruction: 'Create comparison matrix: Columns = Technologies. Rows = Speed, Cost (capital), Cost (operational), Scalability, Maintainability, Weather resistance, Community repairability.',
                  duration: '12 min',
                  teacherNotes: 'Fill in together. Use real numbers where possible. B4RN: fiber costs ~$2000/home. Wireless: maybe $200/home.'
                },
                {
                  instruction: 'Case study technology choices: What did our case study networks choose? NYC Mesh: fixed wireless + mesh. Guifi: fiber backbone + wireless last mile. B4RN: fiber throughout.',
                  duration: '8 min',
                  teacherNotes: 'Connect back to lesson 1. Each network\'s choice reflected their context: rural vs. urban, funding, labor availability.'
                },
                {
                  instruction: 'Apply to your service area: "Given your area\'s characteristics (density, terrain, budget constraints), which technology makes most sense?"',
                  duration: '7 min',
                  teacherNotes: 'There\'s no universal answer. Dense urban: fixed wireless often works. Rural: fiber might be only option for distance.'
                },
                {
                  instruction: 'Preliminary selection: Teams choose a primary technology and justify. This choice may evolve.',
                  duration: '3 min',
                  teacherNotes: 'Document reasoning. "We chose mesh because..." This becomes part of the proposal.'
                },
              ],
              formativeAssessment: 'Can students articulate tradeoffs between technologies? Is their selection appropriate for their context?',
              differentiation: {
                support: 'Provide a pre-filled comparison matrix with notes on when each technology works best.',
                extension: 'Research: What is CBRS spectrum? How might it change community network technology choices?'
              }
            },
            {
              title: 'Designing the Network Topology',
              duration: '40 minutes',
              overview: 'Students create network topology diagrams for their service area, applying principles from earlier lessons.',
              steps: [
                {
                  instruction: 'Review topology principles from Project 3: Single points of failure, redundant paths, hop count limits, backhaul capacity.',
                  duration: '5 min',
                  teacherNotes: 'Quick refresher. Apply the principles learned in mesh building to larger-scale design.'
                },
                {
                  instruction: 'Layer the design: Start with backhaul (connection to internet), then distribution (spreading through area), then access (connecting homes).',
                  duration: '5 min',
                  teacherNotes: 'Hierarchical design is common. Backbone → Distribution → Access. Like arteries → veins → capillaries.'
                },
                {
                  instruction: 'Map overlay: On your service area map, draw proposed node locations. Consider anchor institutions, rooftops, terrain.',
                  duration: '15 min',
                  teacherNotes: 'Use draw.io, Google My Maps, or paper. Show: nodes, links, user coverage areas. Color-code by type.'
                },
                {
                  instruction: 'Identify single points of failure: If any one node fails, who loses connectivity? Add redundant paths where critical.',
                  duration: '8 min',
                  teacherNotes: 'This is the resilience audit. Community trust depends on reliability. One failure shouldn\'t disconnect a neighborhood.'
                },
                {
                  instruction: 'Peer review: Exchange diagrams with another team. Can they understand it? Do they see problems you missed?',
                  duration: '7 min',
                  teacherNotes: 'Fresh eyes catch issues. Encourage constructive criticism.'
                },
              ],
              formativeAssessment: 'Does the topology diagram make sense? Does it have appropriate redundancy for critical paths?',
              differentiation: {
                support: 'Provide a template topology diagram for a similar-sized area.',
                extension: 'Create multiple topology options with different tradeoffs (cost vs. resilience). Present pros/cons of each.'
              }
            },
            {
              title: 'Backhaul and Internet Interconnection',
              duration: '35 minutes',
              overview: 'Students plan how their community network will connect to the broader internet.',
              steps: [
                {
                  instruction: 'What is backhaul? The connection between your network and the internet. Often the bottleneck and biggest cost.',
                  duration: '4 min',
                  teacherNotes: 'A mesh network is useless without internet access (for most users). Backhaul planning is critical.'
                },
                {
                  instruction: 'Backhaul options: (1) Buy from ISP, (2) Peer at an internet exchange, (3) Partner with institution that has bandwidth, (4) Multiple sources for redundancy.',
                  duration: '8 min',
                  teacherNotes: 'NYC Mesh: donated bandwidth from data centers. Rural networks: often must buy from an ISP. Each has different relationships.'
                },
                {
                  instruction: 'Research local options: What ISPs offer business/wholesale internet in your area? Are there local internet exchanges? What do anchor institutions pay?',
                  duration: '12 min',
                  teacherNotes: 'This is real research. Contact ISPs, check IX maps, ask potential partners about their bandwidth costs.'
                },
                {
                  instruction: 'Calculate bandwidth needs: How much bandwidth does your projected user base need? Assume 25Mbps minimum per household. 1Gbps backhaul = ~40 households concurrently.',
                  duration: '6 min',
                  teacherNotes: 'Not everyone uses internet simultaneously. Oversubscription ratios of 10:1 to 20:1 are common.'
                },
                {
                  instruction: 'Redundancy planning: What if your backhaul provider fails? Plan for failover or capacity from multiple sources.',
                  duration: '5 min',
                  teacherNotes: 'Single backhaul source = single point of failure. Even if expensive, consider backup connectivity.'
                },
              ],
              formativeAssessment: 'Do students understand backhaul options? Is their plan realistic for the local context?',
              differentiation: {
                support: 'Provide a list of common backhaul options with typical costs.',
                extension: 'Research internet exchange points. Where is the nearest IX? What would it take to peer there?'
              }
            },
            {
              title: 'Architecture Documentation',
              duration: '40 minutes',
              overview: 'Students document their network architecture design in a format suitable for the final proposal.',
              steps: [
                {
                  instruction: 'Create architecture section: This will be part of your final proposal. Professional format, clear diagrams.',
                  duration: '5 min',
                  teacherNotes: 'Set expectations for quality. This document might be shown to community members, funders, potential partners.'
                },
                {
                  instruction: 'Components to include: (1) Technology selection with justification, (2) Topology diagram, (3) Node locations, (4) Backhaul plan, (5) Capacity calculations.',
                  duration: '5 min',
                  teacherNotes: 'Checklist for completeness. Each component should be explained, not just shown.'
                },
                {
                  instruction: 'Work time: Draft the architecture section. Include both diagrams and explanatory text.',
                  duration: '20 min',
                  teacherNotes: 'Circulate and provide feedback. Common issues: unclear diagrams, unexplained choices, missing capacity planning.'
                },
                {
                  instruction: 'Peer feedback: Exchange drafts with another team. Use rubric: Clarity, Completeness, Feasibility, Resilience.',
                  duration: '8 min',
                  teacherNotes: 'Structured feedback using criteria. Written comments are more useful than verbal.'
                },
                {
                  instruction: 'Revision notes: Based on feedback, note what you\'ll revise. Revision happens as homework or in next session.',
                  duration: '2 min',
                  teacherNotes: 'Iteration is part of real design work. First drafts are never final.'
                },
              ],
              formativeAssessment: 'Is the architecture section clear, complete, and technically sound? Did peer feedback identify real issues?',
              differentiation: {
                support: 'Provide a template document with sections pre-labeled and prompts.',
                extension: 'Add a "Future Expansion" section: how would the architecture scale 10x?'
              }
            },
          ],
        },
        {
          title: 'Equipment Selection & Budget Planning - Part 1',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why hardware choices matter beyond price: open source firmware support, longevity, spare parts availability, community knowledge',
            'The real cost of "cheap" equipment: failure rates, power consumption, difficulty of management at scale',
            'Reading specifications critically: what marketing claims vs. real-world performance look like, and how to find honest reviews',
            'Why buying decisions are strategic: vendor lock-in, supply chain risks, and building local repair capability',
          ],
          objectives: [
            'Research and select specific equipment',
            'Understand equipment costs and capabilities',
            'Begin developing a capital budget',
          ],
          activities: [
            'Equipment research: Investigate router/AP options, cables, tools',
            'Vendor comparison: Get quotes or research prices',
            'Equipment list: Create comprehensive equipment list',
            'Capital budget: Begin spreadsheet with equipment costs',
          ],
          materials: ['Vendor catalogs/websites', 'Budget spreadsheet template', 'Equipment specification guide'],
          detailedActivities: [
            {
              title: 'Equipment Philosophy: Not Just About Price',
              duration: '20 minutes',
              overview: 'Students understand the strategic considerations in equipment selection beyond upfront cost.',
              steps: [
                {
                  instruction: 'Discussion: "You can buy a router for $20 or $200. What\'s the difference? Why might the expensive one be cheaper in the long run?"',
                  duration: '4 min',
                  teacherNotes: 'Cheap equipment fails more often, uses more power, has no open source firmware, lacks support, can\'t be repaired.'
                },
                {
                  instruction: 'Total Cost of Ownership (TCO): Equipment price + power over lifetime + maintenance + replacement rate + labor to manage.',
                  duration: '5 min',
                  teacherNotes: 'A $50 router that fails every 2 years and takes 2 hours to configure costs more than a $150 router that lasts 7 years.'
                },
                {
                  instruction: 'Community repairability: Can you fix it locally? Open source firmware means you\'re not dependent on manufacturer updates. Common parts mean you can swap components.',
                  duration: '4 min',
                  teacherNotes: 'Proprietary equipment means vendor lock-in. If they stop supporting it, you\'re stuck. Open source = community control.'
                },
                {
                  instruction: 'Case study examples: NYC Mesh uses specific hardware models that the community knows well. guifi shares equipment specs openly. What do they recommend?',
                  duration: '4 min',
                  teacherNotes: 'Look at community network wikis for equipment lists. They\'ve learned what works through experience.'
                },
                {
                  instruction: 'Buying principles: Prioritize (1) OpenWrt support, (2) Community track record, (3) Availability of spares, (4) Price.',
                  duration: '3 min',
                  teacherNotes: 'Price last, not first. Equipment is a tool; choose tools that serve long-term independence.'
                },
              ],
              formativeAssessment: 'Do students understand TCO vs. purchase price? Can they articulate why open source firmware matters?',
              differentiation: {
                support: 'Provide a "what to look for" checklist when evaluating equipment.',
                extension: 'Research a proprietary equipment failure story. What happened when a vendor discontinued support?'
              }
            },
            {
              title: 'Equipment Research and Selection',
              duration: '40 minutes',
              overview: 'Students research specific equipment options for their network design.',
              steps: [
                {
                  instruction: 'Equipment categories: Divide into teams. Each team researches one category: (1) Access points/CPE, (2) Backbone/distribution, (3) Power (PoE, solar, UPS), (4) Installation tools.',
                  duration: '5 min',
                  teacherNotes: 'Division of labor. Teams become experts in their category and share findings.'
                },
                {
                  instruction: 'Research sources: OpenWrt table of hardware, community network equipment lists (NYC Mesh wiki, guifi wiki), manufacturer sites, vendor catalogs.',
                  duration: '3 min',
                  teacherNotes: 'Start with community recommendations, then verify with specs. Avoid going straight to Amazon reviews.'
                },
                {
                  instruction: 'Research task: For your category, find 3-5 options. For each: Model name, price, key specs, OpenWrt support?, community network usage?, availability.',
                  duration: '20 min',
                  teacherNotes: 'Create a comparison table. This is real research—prices, specs, compatibility.'
                },
                {
                  instruction: 'Report back: Each team presents their top 2 recommendations with justification. Class discusses.',
                  duration: '10 min',
                  teacherNotes: 'Cross-pollination. Access point team learns from backbone team, etc.'
                },
                {
                  instruction: 'Preliminary equipment list: Based on presentations, create a master equipment list with your selected models.',
                  duration: '2 min',
                  teacherNotes: 'This list will be refined. For now, capture the leading candidates.'
                },
              ],
              formativeAssessment: 'Did teams find relevant equipment options? Are recommendations justified with evidence?',
              differentiation: {
                support: 'Provide a curated list of equipment options to evaluate rather than open research.',
                extension: 'Include outdoor enclosures, grounding equipment, and installation hardware in your research.'
              }
            },
            {
              title: 'Building the Capital Budget',
              duration: '35 minutes',
              overview: 'Students create a detailed capital budget spreadsheet for their network deployment.',
              steps: [
                {
                  instruction: 'Spreadsheet setup: Columns = Item, Description, Unit Price, Quantity, Extended Price. Categories = Core Infrastructure, Distribution, Access, Installation, Contingency.',
                  duration: '5 min',
                  teacherNotes: 'Professional budget format. Categories help organize and explain the budget.'
                },
                {
                  instruction: 'Populate from architecture: Reference your network topology. How many distribution nodes? How many access points? How many meters of cable?',
                  duration: '10 min',
                  teacherNotes: 'Quantities come from the design. This connects architecture decisions to financial reality.'
                },
                {
                  instruction: 'Add non-obvious costs: Installation tools (crimpers, ladder), test equipment (cable tester), spare parts (10-20% extra), initial consumables.',
                  duration: '8 min',
                  teacherNotes: 'First-time builders forget tools and spares. You need more than just the network equipment.'
                },
                {
                  instruction: 'Add contingency: Add 15-25% contingency for unexpected costs, price changes, shipping, and mistakes.',
                  duration: '4 min',
                  teacherNotes: 'Contingency is essential. Things always cost more than planned. Underfunded projects fail.'
                },
                {
                  instruction: 'Calculate total: Sum all extended prices. "This is what it costs to build the network—before any ongoing costs."',
                  duration: '3 min',
                  teacherNotes: 'Reveal the total. This is often eye-opening. Discuss: is this achievable? What could be phased?'
                },
                {
                  instruction: 'Reality check: Compare your total to case study budgets. Is it in the right ballpark? If way off, what might be missing or overestimated?',
                  duration: '5 min',
                  teacherNotes: 'Community networks often start with $5K-$20K for initial deployment. Much larger for scale.'
                },
              ],
              formativeAssessment: 'Is the budget complete and realistic? Does it include contingency and often-forgotten items?',
              differentiation: {
                support: 'Provide a partially-filled budget template with categories and example items.',
                extension: 'Create three budget scenarios: minimum viable, recommended, and ideal. What changes at each tier?'
              }
            },
            {
              title: 'Budget Documentation and Presentation',
              duration: '25 minutes',
              overview: 'Students finalize their capital budget documentation and prepare to explain it to stakeholders.',
              steps: [
                {
                  instruction: 'Format for presentation: Clean up the spreadsheet. Add notes explaining major line items. Create a summary section with category totals.',
                  duration: '8 min',
                  teacherNotes: 'The budget will be shown to potential funders and community members. Clarity matters.'
                },
                {
                  instruction: 'Create budget narrative: Write 2-3 paragraphs explaining: What the money buys, Why these choices were made, What contingency covers.',
                  duration: '8 min',
                  teacherNotes: 'Numbers without context are hard to evaluate. Narrative explains the reasoning.'
                },
                {
                  instruction: 'Practice pitch: In pairs, practice explaining the budget in 2 minutes. "We need $X to build a network that covers Y and serves Z households."',
                  duration: '6 min',
                  teacherNotes: 'Elevator pitch practice. Community members and funders don\'t want to read spreadsheets.'
                },
                {
                  instruction: 'Preview next lesson: "This was capital costs—buying the equipment. Next, we tackle operating costs—running the network. That\'s often bigger."',
                  duration: '3 min',
                  teacherNotes: 'Tease the reality that operating costs often exceed capital costs over time. Set up Part 2.'
                },
              ],
              formativeAssessment: 'Is the budget clearly documented? Can students explain it concisely to non-technical audiences?',
              differentiation: {
                support: 'Provide a narrative template with prompts for each paragraph.',
                extension: 'Create a visual budget breakdown (pie chart or bar chart) for the proposal.'
              }
            },
          ],
        },
        {
          title: 'Budget Planning - Part 2: Operations & Sustainability',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why operating costs often exceed capital costs: the long-term burden of bandwidth, power, support, and maintenance',
            'How pricing reflects values: sliding scales, equity considerations, and why "market rate" isn\'t the only option',
            'The sustainability paradox: community networks need money to survive but exist because commercial options failed the community',
            'What grants can and can\'t do: seed funding vs. operational support, and why diversified revenue matters',
          ],
          objectives: [
            'Calculate ongoing operational costs',
            'Develop a pricing model for services',
            'Create a sustainability plan',
          ],
          activities: [
            'Operating costs: Estimate power, bandwidth, maintenance, support',
            'Pricing research: What do ISPs and community networks charge?',
            'Revenue modeling: How many subscribers needed to break even?',
            'Grant research: What funding sources exist for community networks?',
          ],
          materials: ['Operating cost worksheet', 'Pricing examples', 'Grant database access'],
          detailedActivities: [
            {
              title: 'The Hidden Costs: Operating Expenses',
              duration: '30 minutes',
              overview: 'Students calculate ongoing operational costs that will determine long-term sustainability.',
              steps: [
                {
                  instruction: 'Reveal the truth: "Capital costs are what you see. Operating costs are what kills projects. Over 5 years, operations often cost 3-5x the initial build."',
                  duration: '3 min',
                  teacherNotes: 'This is often shocking. A $10K build might cost $30K in operations over 5 years.'
                },
                {
                  instruction: 'Bandwidth costs: Research wholesale internet costs. Calculate: Expected users × average bandwidth × hours/day × 30 days × cost/GB or monthly flat rate.',
                  duration: '8 min',
                  teacherNotes: 'Bandwidth is often the largest ongoing cost. Get real quotes from potential providers.'
                },
                {
                  instruction: 'Power costs: Estimate power consumption of all equipment. Use PoE calculators. Multiply by local electricity rates.',
                  duration: '5 min',
                  teacherNotes: 'Often overlooked. Outdoor equipment, especially, runs 24/7. Sum up all devices.'
                },
                {
                  instruction: 'Maintenance and replacement: Budget for equipment failure (5-10% replacement/year), troubleshooting labor, and updates.',
                  duration: '5 min',
                  teacherNotes: 'Things break. Having spare parts and labor time budgeted prevents surprises.'
                },
                {
                  instruction: 'Support and administration: Time for member support, billing if applicable, coordination, training volunteers.',
                  duration: '4 min',
                  teacherNotes: 'Even if volunteer-run, someone\'s time is valuable. Account for it.'
                },
                {
                  instruction: 'Create operating budget: Annual costs spreadsheet. Categories: Bandwidth, Power, Maintenance, Administration, Contingency.',
                  duration: '5 min',
                  teacherNotes: 'This is the "burn rate." How much does it cost per month to keep the lights on?'
                },
              ],
              formativeAssessment: 'Is the operating budget realistic? Did students research actual costs or just guess?',
              differentiation: {
                support: 'Provide typical cost ranges for each category based on network size.',
                extension: 'Calculate 5-year total cost of ownership including capital + operations. Present as cost per user per month.'
              }
            },
            {
              title: 'Pricing Models That Reflect Community Values',
              duration: '30 minutes',
              overview: 'Students develop pricing strategies that balance sustainability with accessibility.',
              steps: [
                {
                  instruction: 'Research existing models: What do community networks charge? NYC Mesh: suggested donation. B4RN: membership + monthly fee. guifi: complex contribution system.',
                  duration: '6 min',
                  teacherNotes: 'There\'s no one answer. Each model reflects different values and contexts.'
                },
                {
                  instruction: 'Discussion: "Should everyone pay the same? What about people who can\'t afford it? What about large contributors?"',
                  duration: '5 min',
                  teacherNotes: 'Values discussion. Sliding scale, sponsorship, tiered service, pay-what-you-can—each has tradeoffs.'
                },
                {
                  instruction: 'Calculate break-even: Given your operating costs and expected user count, what\'s the minimum average revenue per user?',
                  duration: '6 min',
                  teacherNotes: 'Math: Operating costs / users = cost per user. This is the floor. You need to cover this or fail.'
                },
                {
                  instruction: 'Design your pricing: Create a pricing structure. Consider: base rate, sliding scale, sponsorship levels, free tier, installation fees.',
                  duration: '8 min',
                  teacherNotes: 'No right answer. But it must cover costs OR have a plan for the gap (grants, sponsorships).'
                },
                {
                  instruction: 'Equity check: "Does your pricing make the network accessible to those who need it most?" If not, revise.',
                  duration: '5 min',
                  teacherNotes: 'Community networks exist to serve underserved communities. Pricing should reflect that mission.'
                },
              ],
              formativeAssessment: 'Is the pricing model sustainable? Does it reflect community values and accessibility goals?',
              differentiation: {
                support: 'Provide 2-3 pricing model templates to customize.',
                extension: 'Model 3 scenarios: 50% of projected users, 100%, 150%. How does sustainability change?'
              }
            },
            {
              title: 'Funding Sources and Grant Research',
              duration: '35 minutes',
              overview: 'Students research funding opportunities to support network startup and growth.',
              steps: [
                {
                  instruction: 'Funding landscape: Grants (government, foundation), member contributions, donations, sponsorships, in-kind support, earned revenue.',
                  duration: '5 min',
                  teacherNotes: 'Diversified funding is more resilient. Don\'t depend on one source.'
                },
                {
                  instruction: 'Research federal programs: USDA ReConnect, FCC programs, NTIA grants. Many have community broadband components.',
                  duration: '10 min',
                  teacherNotes: 'Federal funding changes with administrations. Check current programs and deadlines.'
                },
                {
                  instruction: 'Research foundation grants: Community Foundation, philanthropic funders focused on digital equity. Create a list of prospects.',
                  duration: '10 min',
                  teacherNotes: 'Foundation grants often fund planning and pilots. Harder to get for operations.'
                },
                {
                  instruction: 'In-kind support: What can anchor institutions provide? Free bandwidth, hosting, labor? What can local businesses contribute?',
                  duration: '5 min',
                  teacherNotes: 'Not everything needs to be purchased. Community resources are real resources.'
                },
                {
                  instruction: 'Create funding plan: List potential sources, estimated amounts, likelihood, timeline. Identify 2-3 priorities for first outreach.',
                  duration: '5 min',
                  teacherNotes: 'Funding is speculative. Having multiple options increases odds of success.'
                },
              ],
              formativeAssessment: 'Did students find realistic funding opportunities? Is the funding plan diversified?',
              differentiation: {
                support: 'Provide a curated list of funding sources with links and descriptions.',
                extension: 'Draft an outline for a grant application to one of the identified sources.'
              }
            },
            {
              title: 'Sustainability Planning: Beyond the First Year',
              duration: '25 minutes',
              overview: 'Students develop a long-term sustainability plan that ensures the network survives startup phase.',
              steps: [
                {
                  instruction: 'The sustainability challenge: "Many community projects launch with grants but die when funding ends. How do you build something that lasts?"',
                  duration: '3 min',
                  teacherNotes: 'Sustainability is harder than launch. The goal is an ongoing community resource, not a project.'
                },
                {
                  instruction: 'Revenue diversification: Plan for multiple revenue streams. What percentage from each? What if one fails?',
                  duration: '6 min',
                  teacherNotes: '80% from one source = fragile. 40-30-30 split = more resilient. Plan for the future.'
                },
                {
                  instruction: 'Growth projection: How will user base grow? When do you hit sustainability? What investments are needed to grow?',
                  duration: '6 min',
                  teacherNotes: 'Growth costs money before it generates money. Plan the trajectory.'
                },
                {
                  instruction: 'Risk analysis: What could threaten sustainability? Loss of key volunteers? Equipment failure? Funding gap? How do you mitigate?',
                  duration: '5 min',
                  teacherNotes: 'Think like an organization that plans to exist in 10 years, not a project that might end.'
                },
                {
                  instruction: 'Write sustainability section: One page for the proposal. Cover: revenue model, funding diversification, growth plan, risk mitigation.',
                  duration: '5 min',
                  teacherNotes: 'Funders want to know their investment creates something lasting. This section matters.'
                },
              ],
              formativeAssessment: 'Does the sustainability plan show long-term thinking? Are risks and mitigations realistic?',
              differentiation: {
                support: 'Provide a sustainability plan template with prompts for each section.',
                extension: 'Create a 5-year financial projection spreadsheet showing path to sustainability.'
              }
            },
          ],
        },
        {
          title: 'Governance & Organizational Structure',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why governance is as important as technology: how decisions get made determines who the network really serves',
            'Different governance models and their tradeoffs: cooperatives, nonprofits, informal collectives—each embeds different values',
            'The tension between efficiency and participation: why fast decisions and democratic input can conflict',
            'How to design for the long term: succession planning, preventing capture, and keeping the mission alive',
          ],
          objectives: [
            'Design a governance structure for community ownership',
            'Define roles and decision-making processes',
            'Plan for member participation and accountability',
          ],
          activities: [
            'Governance research: How do other community networks make decisions?',
            'Structure design: Create organizational chart',
            'Decision-making process: How will major decisions be made?',
            'Accountability: How will the network be accountable to members?',
          ],
          materials: ['Governance examples from other networks', 'Org chart template', 'Bylaws examples'],
          detailedActivities: [
            {
              title: 'Why Governance Matters: Power in Community Networks',
              duration: '20 minutes',
              overview: 'Students understand that governance structures determine who really controls and benefits from the network.',
              steps: [
                {
                  instruction: 'Opening question: "Who should make decisions about our community network? Who gets to decide when there\'s a disagreement?"',
                  duration: '4 min',
                  teacherNotes: 'Governance is about power. This is uncomfortable but essential. Don\'t skip it.'
                },
                {
                  instruction: 'Cautionary tales: Examples of projects where governance failed. Founder takeover, elite capture, volunteer burnout, mission drift.',
                  duration: '5 min',
                  teacherNotes: 'These are real patterns. Community networks have failed because of governance, not technology.'
                },
                {
                  instruction: 'The participation paradox: "More democracy = slower decisions. Fast decisions = less input. How do you balance?"',
                  duration: '5 min',
                  teacherNotes: 'This is a real tension. Some decisions need community input; others need quick action. Design for both.'
                },
                {
                  instruction: 'Key governance questions: Who can join? Who votes? How are leaders chosen? How are they removed? How are disputes resolved?',
                  duration: '4 min',
                  teacherNotes: 'These questions must be answered explicitly, or they\'ll be answered by power dynamics.'
                },
                {
                  instruction: 'Values check: "What values should governance embody?" List on board: transparency, accountability, accessibility, democracy, efficiency.',
                  duration: '2 min',
                  teacherNotes: 'Values guide structure. If transparency matters, meetings must be open. If accessibility matters, meetings must be accessible.'
                },
              ],
              formativeAssessment: 'Do students understand why governance matters beyond technical operations?',
              differentiation: {
                support: 'Share a specific case study of governance failure with discussion questions.',
                extension: 'Research: How does your favorite online community (Reddit, Discord, etc.) handle governance? What works/doesn\'t?'
              }
            },
            {
              title: 'Governance Models: Learning from Others',
              duration: '25 minutes',
              overview: 'Students research how successful community networks structure their governance.',
              steps: [
                {
                  instruction: 'Assign governance research: Teams investigate different models. (1) NYC Mesh (informal), (2) guifi.net (Foundation + License), (3) B4RN (Cooperative), (4) Detroit Community Tech (Nonprofit).',
                  duration: '3 min',
                  teacherNotes: 'Each model embeds different values and tradeoffs. Diversity of examples is the point.'
                },
                {
                  instruction: 'Research questions: How do they make decisions? Who can participate? How is leadership selected? What happens when someone disagrees?',
                  duration: '12 min',
                  teacherNotes: 'Look at bylaws, meeting notes, FAQs, interviews with organizers.'
                },
                {
                  instruction: 'Present findings: Each team has 2 minutes to explain their network\'s governance model.',
                  duration: '8 min',
                  teacherNotes: 'Quick presentations. Focus on key structural features, not every detail.'
                },
                {
                  instruction: 'Comparison discussion: "Which model aligns best with your values? Which seems most practical for your context?"',
                  duration: '2 min',
                  teacherNotes: 'There\'s no single right answer. Context matters.'
                },
              ],
              formativeAssessment: 'Can students explain different governance models? Do they see tradeoffs between them?',
              differentiation: {
                support: 'Provide governance summaries for each network rather than requiring research.',
                extension: 'Find and read actual bylaws from a community network. Summarize key provisions.'
              }
            },
            {
              title: 'Designing Your Governance Structure',
              duration: '30 minutes',
              overview: 'Students design a governance structure appropriate for their community network project.',
              steps: [
                {
                  instruction: 'Membership: Who can be a member? How do they join? What are member rights and responsibilities?',
                  duration: '5 min',
                  teacherNotes: 'Some networks: anyone in service area. Others: must contribute. Define clearly.'
                },
                {
                  instruction: 'Decision-making: What decisions need community vote? What can leadership decide? What requires supermajority?',
                  duration: '6 min',
                  teacherNotes: 'Categories: Operations (quick), Budget (leadership), Mission/major (community vote). Be specific.'
                },
                {
                  instruction: 'Leadership structure: What roles are needed? How are they selected? How long do terms last? How are they accountable?',
                  duration: '6 min',
                  teacherNotes: 'Minimum: some coordination role. Consider: treasurer, technical lead, outreach lead. Avoid overcomplicating.'
                },
                {
                  instruction: 'Meetings: How often? Open to all? How are decisions documented? How is participation supported (remote, translation, childcare)?',
                  duration: '5 min',
                  teacherNotes: 'Accessibility matters. If meetings are inaccessible, only certain people participate.'
                },
                {
                  instruction: 'Conflict resolution: What if someone violates rules? What if there\'s a disagreement? How is dispute resolved before it explodes?',
                  duration: '5 min',
                  teacherNotes: 'Every community has conflict. Plan for it before it happens. Mediation, escalation, removal processes.'
                },
                {
                  instruction: 'Draft governance summary: One page describing your proposed governance structure.',
                  duration: '3 min',
                  teacherNotes: 'This becomes part of the proposal. Not full bylaws, but key structural features.'
                },
              ],
              formativeAssessment: 'Is the governance structure coherent? Does it address key questions? Does it reflect stated values?',
              differentiation: {
                support: 'Provide a governance template with sections to fill in.',
                extension: 'Draft actual bylaws or articles of incorporation based on your structure.'
              }
            },
            {
              title: 'Accountability and Long-term Health',
              duration: '15 minutes',
              overview: 'Students plan for ongoing organizational health and accountability.',
              steps: [
                {
                  instruction: 'Accountability mechanisms: How will the network demonstrate it\'s serving the community? Annual meetings? Reports? Surveys?',
                  duration: '4 min',
                  teacherNotes: 'Transparency builds trust. What information will be public? Finances? Membership? Decisions?'
                },
                {
                  instruction: 'Succession planning: "What if the founder leaves? What if key volunteers burn out?" Plan for continuity.',
                  duration: '4 min',
                  teacherNotes: 'Single-leader projects die when the leader leaves. Build redundancy in leadership, not just technology.'
                },
                {
                  instruction: 'Preventing capture: How do you ensure the network stays mission-aligned? What if a faction tries to take over?',
                  duration: '4 min',
                  teacherNotes: 'Mission lock provisions, supermajority requirements for major changes, board composition requirements.'
                },
                {
                  instruction: 'Add to governance section: Paragraph on accountability, succession, and mission protection.',
                  duration: '3 min',
                  teacherNotes: 'These long-term considerations show mature thinking. Funders and community appreciate this.'
                },
              ],
              formativeAssessment: 'Does governance plan include long-term organizational health provisions?',
              differentiation: {
                support: 'Provide examples of accountability mechanisms from other organizations.',
                extension: 'Research "community land trusts" or other mission-lock models. How might those principles apply?'
              }
            },
          ],
        },
        {
          title: 'Community Outreach & Engagement',
          duration: '90 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why community buy-in can\'t be skipped: technical excellence without community trust leads to unused networks',
            'How to listen before you pitch: understanding real needs vs. assuming you know what people want',
            'The importance of diverse voices: who\'s at the table shapes what gets built and who benefits',
            'Building a movement, not just a network: how community organizing principles apply to technology projects',
          ],
          objectives: [
            'Develop a community outreach strategy',
            'Create materials for community presentation',
            'Plan member recruitment and onboarding',
          ],
          activities: [
            'Stakeholder mapping: Who needs to be involved?',
            'Outreach planning: How will we reach community members?',
            'Materials creation: Begin developing flyers, presentations, website content',
            'Recruitment strategy: How will we sign up founding members?',
          ],
          materials: ['Stakeholder mapping template', 'Outreach materials examples', 'Design tools'],
          detailedActivities: [
            {
              title: 'Stakeholder Mapping: Who Needs to Be Involved?',
              duration: '25 minutes',
              overview: 'Students identify all stakeholders and understand their different interests and influence.',
              steps: [
                {
                  instruction: 'Brainstorm stakeholders: List everyone who might care about the network. Community members, local government, businesses, schools, churches, existing ISPs, landlords.',
                  duration: '5 min',
                  teacherNotes: 'Cast wide. Include potential supporters AND potential opponents. Both matter.'
                },
                {
                  instruction: 'Map on grid: Create a 2x2 matrix. Axes: Interest level (high/low) and Influence (high/low). Place each stakeholder.',
                  duration: '8 min',
                  teacherNotes: 'High interest + high influence = key partners. High influence + low interest = need to be won over. Low/low = monitor.'
                },
                {
                  instruction: 'For key stakeholders: What do they want? What concerns might they have? What could convince them to support the project?',
                  duration: '7 min',
                  teacherNotes: 'Empathy exercise. Understand their perspective before approaching. What\'s in it for them?'
                },
                {
                  instruction: 'Prioritize outreach: Select top 5 stakeholders for initial outreach. Justify: Why these? What sequence?',
                  duration: '3 min',
                  teacherNotes: 'Order matters. Building support with some stakeholders helps when approaching others.'
                },
                {
                  instruction: 'Document: Add stakeholder map and outreach priorities to proposal.',
                  duration: '2 min',
                  teacherNotes: 'This shows strategic thinking. Funders want to see that you understand the landscape.'
                },
              ],
              formativeAssessment: 'Is the stakeholder map comprehensive? Do students understand different stakeholder interests?',
              differentiation: {
                support: 'Provide a stakeholder map template with example categories pre-filled.',
                extension: 'Identify potential opposition (ISPs, political opponents). How would you address their concerns or neutralize opposition?'
              }
            },
            {
              title: 'Listening First: Community Needs Assessment',
              duration: '25 minutes',
              overview: 'Students plan genuine community listening before pitching solutions.',
              steps: [
                {
                  instruction: 'The listening principle: "You think you know what the community needs. You might be wrong. Ask first."',
                  duration: '3 min',
                  teacherNotes: 'Arrogance kills community projects. The best networks emerged from community demand, not outsider ideas.'
                },
                {
                  instruction: 'Listening methods: Focus groups, community meetings, door-to-door conversations, surveys, partnering with trusted organizations.',
                  duration: '5 min',
                  teacherNotes: 'Different methods reach different people. Mix is important. Don\'t just survey online—you\'ll miss the disconnected.'
                },
                {
                  instruction: 'Question design: What would you ask? Focus on: current situation, needs, barriers, what they\'d value, concerns about any network project.',
                  duration: '8 min',
                  teacherNotes: 'Open-ended questions first, then specific. "Tell me about your internet situation" before "Would you pay $20/month?"'
                },
                {
                  instruction: 'Reaching marginalized voices: Who might not show up at a meeting? How do you reach them? Language, disability, time, transportation barriers.',
                  duration: '5 min',
                  teacherNotes: 'The people who most need the network are often hardest to reach. Extra effort is required.'
                },
                {
                  instruction: 'Plan a listening campaign: Where, when, how, who leads, how findings are used. Add to outreach plan.',
                  duration: '4 min',
                  teacherNotes: 'This is actionable planning. When will you actually talk to community members?'
                },
              ],
              formativeAssessment: 'Does the listening plan reach diverse community members? Are questions open and not leading?',
              differentiation: {
                support: 'Provide example listening questions from other community network assessments.',
                extension: 'Conduct an actual mini-listening session: interview 3 community members and report findings.'
              }
            },
            {
              title: 'Creating Outreach Materials',
              duration: '25 minutes',
              overview: 'Students develop materials to communicate the project to different audiences.',
              steps: [
                {
                  instruction: 'Audience analysis: Different stakeholders need different messages. What does a potential member need to hear vs. a funder vs. a city council member?',
                  duration: '4 min',
                  teacherNotes: 'One-size-fits-all messaging fails. Tailor the pitch to the audience\'s concerns.'
                },
                {
                  instruction: 'Core message development: What\'s the elevator pitch? 30 seconds to explain what the network is and why it matters.',
                  duration: '5 min',
                  teacherNotes: 'Practice saying it out loud. If you can\'t explain it simply, you don\'t understand it well enough.'
                },
                {
                  instruction: 'Materials brainstorm: Flyer, website, FAQ, presentation, social media. What do you need for which audiences?',
                  duration: '4 min',
                  teacherNotes: 'Different channels for different audiences. Elderly residents might need printed flyers; young people might need Instagram.'
                },
                {
                  instruction: 'Draft one piece: Create a one-page flyer or FAQ for community members. Keep it simple, visual, and focused on benefits.',
                  duration: '10 min',
                  teacherNotes: 'Actually create something. It doesn\'t have to be perfect—it has to exist.'
                },
                {
                  instruction: 'Peer feedback: Exchange materials with another team. Is it clear? Compelling? Does it answer obvious questions?',
                  duration: '2 min',
                  teacherNotes: 'Fresh eyes catch jargon and assumptions. If a peer doesn\'t get it, a community member won\'t either.'
                },
              ],
              formativeAssessment: 'Are materials clear and compelling for the target audience? Are they free of jargon?',
              differentiation: {
                support: 'Provide templates for community flyers and FAQs.',
                extension: 'Create materials in multiple languages appropriate for your community.'
              }
            },
            {
              title: 'Recruitment and Onboarding Strategy',
              duration: '15 minutes',
              overview: 'Students plan how to sign up founding members and get them actively involved.',
              steps: [
                {
                  instruction: 'The founding member challenge: First members are hardest. They\'re joining something that doesn\'t exist yet. What motivates them?',
                  duration: '3 min',
                  teacherNotes: 'Early adopters are special. They need to believe in the vision, not just want internet service.'
                },
                {
                  instruction: 'Recruitment channels: Where are potential founding members? Community events, churches, schools, partner organizations.',
                  duration: '4 min',
                  teacherNotes: 'Go where people already gather. Don\'t expect them to come to you.'
                },
                {
                  instruction: 'Onboarding process: Someone says "I\'m interested." Then what? Sign-up, orientation, how to participate, first action.',
                  duration: '5 min',
                  teacherNotes: 'Interest fades fast without action. Give new members something to DO immediately.'
                },
                {
                  instruction: 'Set targets: How many founding members do you need to launch? What\'s a realistic timeline to reach that number?',
                  duration: '3 min',
                  teacherNotes: 'Make it concrete. "50 founding members by June" is a measurable goal.'
                },
              ],
              formativeAssessment: 'Is the recruitment strategy realistic? Does onboarding give new members immediate action?',
              differentiation: {
                support: 'Provide an example onboarding flow from another community organization.',
                extension: 'Create an actual sign-up form for founding members.'
              }
            },
          ],
        },
        {
          title: 'Proposal Development',
          duration: '180 minutes (can be split)',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'How to tell a compelling story: why facts alone don\'t persuade, and how to connect technical plans to human needs',
            'Writing for different audiences: what a funder needs to see vs. what a community member cares about',
            'The iterative nature of planning: why this proposal is version 1.0, and how real projects evolve from initial plans',
            'From document to action: what makes a proposal that actually gets implemented vs. one that sits on a shelf',
          ],
          objectives: [
            'Compile all research into a cohesive proposal document',
            'Create professional presentation materials',
            'Practice presenting to stakeholders',
          ],
          activities: [
            'Document compilation: Bring together all project components',
            'Executive summary: Write a compelling summary',
            'Presentation creation: Develop slide deck for stakeholder presentation',
            'Peer review: Exchange proposals with another team for feedback',
          ],
          materials: ['Document templates', 'Presentation software', 'Peer review rubric'],
          detailedActivities: [
            {
              title: 'Document Structure and Assembly',
              duration: '45 minutes',
              overview: 'Students compile all their work into a cohesive, professional proposal document.',
              steps: [
                {
                  instruction: 'Review proposal structure: Executive Summary, Service Area, Technical Architecture, Budget, Governance, Outreach Plan, Sustainability, Appendices.',
                  duration: '5 min',
                  teacherNotes: 'Provide a table of contents template. Each section should flow logically to the next.'
                },
                {
                  instruction: 'Gather materials: Collect all draft sections from previous lessons. Identify gaps—what\'s missing or incomplete?',
                  duration: '8 min',
                  teacherNotes: 'This is a checkpoint. Some sections may need work. Prioritize what\'s essential.'
                },
                {
                  instruction: 'Consistency check: Are formatting, voice, and terminology consistent across sections? Apply a common style.',
                  duration: '7 min',
                  teacherNotes: 'Different people wrote different sections. Unify the voice. Use the same terms throughout.'
                },
                {
                  instruction: 'Gap filling: Write any missing connective text. Ensure transitions between sections are smooth.',
                  duration: '15 min',
                  teacherNotes: 'The proposal should read as one document, not a collection of separate pieces.'
                },
                {
                  instruction: 'Create appendices: Move detailed data (full budget spreadsheet, complete equipment list, raw survey data) to appendices.',
                  duration: '5 min',
                  teacherNotes: 'Main document should be readable; details go in appendices for those who want them.'
                },
                {
                  instruction: 'Format and polish: Headers, page numbers, table of contents, consistent fonts. Professional appearance matters.',
                  duration: '5 min',
                  teacherNotes: 'First impressions count. A sloppy document undermines credibility.'
                },
              ],
              formativeAssessment: 'Is the document complete and consistent? Does it flow as a coherent narrative?',
              differentiation: {
                support: 'Provide a fully-formatted template document with placeholder text in each section.',
                extension: 'Create multiple versions: full proposal, one-page summary, and community-facing brochure.'
              }
            },
            {
              title: 'Writing the Executive Summary',
              duration: '40 minutes',
              overview: 'Students write a compelling executive summary that captures the essence of the proposal.',
              steps: [
                {
                  instruction: 'Why executive summaries matter: Many readers only read this. It must stand alone and convince them to read more (or fund you).',
                  duration: '4 min',
                  teacherNotes: 'Busy funders, officials, and community members may only read the summary. It must work.'
                },
                {
                  instruction: 'Structure: (1) The problem/opportunity, (2) The proposed solution, (3) Why we can do this, (4) What we need, (5) Expected impact.',
                  duration: '5 min',
                  teacherNotes: 'Classic proposal structure. Each element should be 1-2 sentences, max.'
                },
                {
                  instruction: 'Start with impact: "X households in Y community lack affordable internet. This proposal addresses that gap with a community-owned network."',
                  duration: '5 min',
                  teacherNotes: 'Lead with the problem and impact, not the technical solution. People fund outcomes, not technology.'
                },
                {
                  instruction: 'Draft the summary: Write 250-500 words. Include key numbers (budget, households served, timeline). Be specific.',
                  duration: '15 min',
                  teacherNotes: 'Vague summaries are forgettable. "Serve 200 households with 100Mbps for $15K investment" is memorable.'
                },
                {
                  instruction: 'Peer review: Exchange summaries. Can you understand the project from the summary alone? Is it compelling?',
                  duration: '8 min',
                  teacherNotes: 'Feedback is essential. Rewrite based on what isn\'t clear.'
                },
                {
                  instruction: 'Revise: Incorporate feedback. Read aloud—does it flow? Does it excite you about the project?',
                  duration: '3 min',
                  teacherNotes: 'The summary should make you want to read more. If it doesn\'t, revise.'
                },
              ],
              formativeAssessment: 'Does the executive summary stand alone? Is it compelling and specific?',
              differentiation: {
                support: 'Provide sentence starters for each section of the executive summary.',
                extension: 'Write a 30-second "verbal executive summary" and practice delivering it.'
              }
            },
            {
              title: 'Creating the Presentation',
              duration: '50 minutes',
              overview: 'Students develop a slide deck for presenting their proposal to stakeholders.',
              steps: [
                {
                  instruction: 'Presentation structure: 10-12 slides max. Opening hook, problem, solution, how it works, budget, team/governance, ask, closing.',
                  duration: '5 min',
                  teacherNotes: 'Less is more. Each slide should make one point clearly.'
                },
                {
                  instruction: 'Visual design principles: Minimal text, strong visuals, consistent branding. If you\'re reading slides, you\'re doing it wrong.',
                  duration: '5 min',
                  teacherNotes: 'Slides support speaking—they don\'t replace it. Use images, diagrams, key numbers.'
                },
                {
                  instruction: 'Tell a story: Start with a person who needs this network. Return to them at the end. How does their life change?',
                  duration: '8 min',
                  teacherNotes: 'Stories are memorable. A real (or realistic) community member makes it concrete.'
                },
                {
                  instruction: 'Create slides: Build the deck. Focus on the most important points. Include maps, network diagrams, budget summary.',
                  duration: '22 min',
                  teacherNotes: 'Work time. Circulate and provide feedback on design and content.'
                },
                {
                  instruction: 'Add speaker notes: Write what you\'ll SAY for each slide. Don\'t memorize, but know the key points.',
                  duration: '7 min',
                  teacherNotes: 'Notes help during practice and ensure nothing is forgotten.'
                },
                {
                  instruction: 'Time check: Presentation should be 8-10 minutes. Run through mentally—is it too long? Too short?',
                  duration: '3 min',
                  teacherNotes: 'Time limits are real. Practice will reveal if cuts or additions are needed.'
                },
              ],
              formativeAssessment: 'Is the presentation clear, visual, and appropriately timed? Does it tell a story?',
              differentiation: {
                support: 'Provide a slide template with placeholders for each section.',
                extension: 'Add a demo video or live demonstration of the technical components.'
              }
            },
            {
              title: 'Peer Review and Revision',
              duration: '45 minutes',
              overview: 'Teams exchange proposals for detailed peer review and incorporate feedback.',
              steps: [
                {
                  instruction: 'Exchange proposals: Each team receives another team\'s full proposal document and presentation.',
                  duration: '2 min',
                  teacherNotes: 'Fresh eyes are essential. You\'re too close to your own work to see problems.'
                },
                {
                  instruction: 'Use review rubric: Assess on: Clarity, Completeness, Feasibility, Professionalism, Persuasiveness.',
                  duration: '3 min',
                  teacherNotes: 'Structured feedback is more useful than vague impressions.'
                },
                {
                  instruction: 'Detailed review: Read the entire proposal. Write specific feedback on each section. Note questions a reader might have.',
                  duration: '20 min',
                  teacherNotes: 'Be constructive but honest. Point out what works AND what needs improvement.'
                },
                {
                  instruction: 'Feedback exchange: Return proposals with feedback. Discuss: What was unclear? What was compelling? What\'s missing?',
                  duration: '10 min',
                  teacherNotes: 'Verbal discussion clarifies written feedback. Ask questions if comments aren\'t clear.'
                },
                {
                  instruction: 'Revision plan: Based on feedback, list revisions needed. Prioritize by impact. What must be fixed vs. nice to have?',
                  duration: '5 min',
                  teacherNotes: 'Not all feedback can be incorporated. Focus on what matters most.'
                },
                {
                  instruction: 'Make revisions: Begin incorporating high-priority feedback. Continue as homework if needed.',
                  duration: '5 min',
                  teacherNotes: 'Revision is where quality improves. Don\'t skip this.'
                },
              ],
              formativeAssessment: 'Was feedback specific and actionable? Did teams incorporate meaningful revisions?',
              differentiation: {
                support: 'Provide a detailed rubric with specific criteria for each rating.',
                extension: 'Seek feedback from someone outside the class—a teacher, parent, or community member.'
              }
            },
          ],
        },
        {
          title: 'Final Presentations & Community Feedback',
          duration: '120 minutes',
          gradeBand: '9-12',
          conceptualUnderstanding: [
            'Why presenting to real stakeholders matters: feedback from people with skin in the game is different from classroom feedback',
            'How to receive criticism productively: separating ego from ideas, and finding the signal in feedback',
            'The gap between planning and execution: what this project taught you about the real challenges ahead',
            'Your role in the larger movement: you now have knowledge and skills that your community needs—what will you do with them?',
          ],
          objectives: [
            'Present proposals to an authentic audience',
            'Receive and respond to feedback',
            'Reflect on the project and next steps',
          ],
          activities: [
            'Presentations: Each team presents their proposal',
            'Q&A: Field questions from audience',
            'Feedback collection: Gather input from community members/guests',
            'Reflection: What would you do differently? What are realistic next steps?',
          ],
          materials: ['Presentation setup', 'Feedback forms', 'Reflection worksheet'],
          detailedActivities: [
            {
              title: 'Presentation Setup and Practice',
              duration: '25 minutes',
              overview: 'Teams finalize presentations and do a final practice run before presenting to the audience.',
              steps: [
                {
                  instruction: 'Technical setup: Test projector, screen, audio. Ensure all presentations work. Have backup copies (USB, email, cloud).',
                  duration: '5 min',
                  teacherNotes: 'Technical failures happen. Always have backups and test before guests arrive.'
                },
                {
                  instruction: 'Final practice: Each team does one complete run-through. Time it. Adjust pacing if needed.',
                  duration: '12 min',
                  teacherNotes: 'This is the last chance to catch problems. Speak clearly, make eye contact, stay on time.'
                },
                {
                  instruction: 'Anticipate questions: "What questions might the audience ask? How will you answer?" Prepare brief responses to likely questions.',
                  duration: '5 min',
                  teacherNotes: 'Budget questions, feasibility concerns, governance details—prepare for these.'
                },
                {
                  instruction: 'Team roles: Who presents which section? Who handles Q&A? Who runs slides? Clear roles prevent awkwardness.',
                  duration: '3 min',
                  teacherNotes: 'Everyone should have a role. Practice smooth handoffs between speakers.'
                },
              ],
              formativeAssessment: 'Is the team prepared for technical issues? Are they ready for questions?',
              differentiation: {
                support: 'Provide a pre-presentation checklist to follow.',
                extension: 'Record the practice run and self-critique before the real presentation.'
              }
            },
            {
              title: 'Presentations to Authentic Audience',
              duration: '50 minutes',
              overview: 'Teams present their proposals to an audience that may include community members, local officials, or practitioners.',
              steps: [
                {
                  instruction: 'Welcome guests: Instructor introduces the project, explains what students have been working on, sets expectations for presentations.',
                  duration: '3 min',
                  teacherNotes: 'Guests need context. Explain the curriculum, the goal, and what they\'ll see.'
                },
                {
                  instruction: 'Presentations: Each team presents (8-10 minutes per team). Strict time limits. Instructor keeps time.',
                  duration: '35 min',
                  teacherNotes: 'For 3-4 teams, budget 8-10 minutes each. Enforce time limits fairly.'
                },
                {
                  instruction: 'Q&A after each presentation: 3-5 minutes of questions from audience. Encourage genuine engagement.',
                  duration: '12 min',
                  teacherNotes: 'Real questions from real stakeholders are invaluable learning. Guests often ask things instructors wouldn\'t.'
                },
              ],
              formativeAssessment: 'Did teams present professionally? Did they handle questions well?',
              differentiation: {
                support: 'Allow note cards for key points if needed.',
                extension: 'Present to a larger audience: school assembly, community board meeting, or recorded for online sharing.'
              }
            },
            {
              title: 'Structured Feedback Collection',
              duration: '20 minutes',
              overview: 'Students receive and process feedback from the audience using structured methods.',
              steps: [
                {
                  instruction: 'Distribute feedback forms: Guests provide written feedback on each proposal. Categories: Strengths, Questions, Suggestions.',
                  duration: '3 min',
                  teacherNotes: 'Written feedback persists. Verbal comments are forgotten. Provide forms and pens.'
                },
                {
                  instruction: 'Guest panel comments: If feasible, guests share brief overall impressions. What did they find compelling? What concerns do they have?',
                  duration: '8 min',
                  teacherNotes: 'This is public feedback—encouraging and constructive. Harsh criticism happens privately.'
                },
                {
                  instruction: 'Collect and distribute feedback: Gather all feedback forms. Distribute to teams so they can review.',
                  duration: '4 min',
                  teacherNotes: 'Teams should receive all feedback about their proposal, not just one reviewer\'s.'
                },
                {
                  instruction: 'Thank guests: Express appreciation for their time and input. Their participation made this meaningful.',
                  duration: '2 min',
                  teacherNotes: 'Guests volunteered their time. Gratitude matters. Consider thank-you notes later.'
                },
                {
                  instruction: 'Initial feedback review: Teams quickly review feedback. Initial reactions—what stands out?',
                  duration: '3 min',
                  teacherNotes: 'Quick look only. Deeper processing happens in the next activity.'
                },
              ],
              formativeAssessment: 'Did feedback provide useful insights? Can students identify actionable suggestions?',
              differentiation: {
                support: 'Provide a feedback form template with specific questions.',
                extension: 'Follow up with guests for more detailed conversations or mentorship.'
              }
            },
            {
              title: 'Reflection and Next Steps',
              duration: '25 minutes',
              overview: 'Students reflect on the project, what they learned, and what realistic next steps might be.',
              steps: [
                {
                  instruction: 'Process feedback: As a team, review all feedback. What themes emerge? What should you revise? What was validated?',
                  duration: '8 min',
                  teacherNotes: 'Look for patterns. One critic is an opinion; many critics pointing to the same thing is signal.'
                },
                {
                  instruction: 'Personal reflection: Individual writing. "What did I learn from this project that I didn\'t know before? What skills did I develop? What surprised me?"',
                  duration: '5 min',
                  teacherNotes: 'Individual reflection is private. It surfaces personal growth, not just team achievement.'
                },
                {
                  instruction: 'From classroom to reality: "If you wanted to actually build this network, what would be the first real-world step? Who would you talk to first?"',
                  duration: '5 min',
                  teacherNotes: 'The proposal is a starting point. What would make it real? Some students may actually pursue this.'
                },
                {
                  instruction: 'Connect to the movement: "You now have knowledge and skills that most people don\'t. How might you use them to help your community?"',
                  duration: '4 min',
                  teacherNotes: 'Tech sovereignty is bigger than one project. Students are now part of a global movement.'
                },
                {
                  instruction: 'Closing circle: Each student shares one thing they\'ll remember from this project.',
                  duration: '3 min',
                  teacherNotes: 'End on a positive, reflective note. Celebrate the accomplishment.'
                },
              ],
              formativeAssessment: 'Do reflections show genuine learning? Can students articulate realistic next steps?',
              differentiation: {
                support: 'Provide reflection prompts with sentence starters.',
                extension: 'Write a personal action plan: 3 things you\'ll do in the next 6 months to advance community tech sovereignty.'
              }
            },
          ],
        },
      ],
      assessment: {
        formative: [
          'Weekly progress check-ins and milestone reviews',
          'Peer feedback on draft sections',
          'Research quality evaluation',
          'Budget accuracy checks',
        ],
        summative: 'Students will produce a comprehensive Community Internet Proposal document (15-25 pages) including: Executive summary, service area analysis, technical architecture, equipment list and budget, governance structure, outreach plan, and sustainability model. Teams will present their proposal to an audience that may include community members, local officials, or community network practitioners.',
      },
      extensions: [
        'Contact a real community network for informational interview',
        'Present proposal to actual community stakeholders',
        'Develop a pilot project plan for a smaller initial deployment',
        'Research grant applications and write a sample grant proposal',
        'Create a community survey to gauge interest and needs',
      ],
      realWorldConnections: [
        'This exact process is how real community networks like Detroit Community Technology Project started',
        'Many rural areas are underserved by major ISPs—community networks fill this gap',
        'The skills learned here transfer to any community organizing or project planning work',
        'Some students have gone on to actually build community networks after projects like this',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-deep">
      {/* Header */}
      <div className="bg-deep text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Tech Sovereignty
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="bg-green-500/100 text-white text-sm px-3 py-1 rounded-full">Track A</span>
            <span className="bg-deep-alt text-sm px-3 py-1 rounded-full">4 Projects</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('tracks.networking.title')}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            {t('tracks.networking.description')}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <div className="bg-deep-card px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Duration</span>
              <p className="font-semibold">17-23 weeks total</p>
            </div>
            <div className="bg-deep-card px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Skill Level</span>
              <p className="font-semibold">Beginner to Advanced</p>
            </div>
            <div className="bg-deep-card px-4 py-2 rounded-lg">
              <span className="text-slate-400 text-sm">Projects</span>
              <p className="font-semibold">4 hands-on projects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Track Overview */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-deep-card rounded-xl border border-deep-border p-8 mb-12">
          <h2 className="text-2xl font-bold text-text-heading mb-4">Track Overview</h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            The Networking Fundamentals track takes students from zero networking knowledge to designing
            community-scale internet infrastructure. Students will build real networks, analyze real
            traffic, and develop proposals that could actually be implemented in their communities.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-text-heading mb-2">What You&apos;ll Learn</h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">&#10003;</span>
                  How data travels across networks and the internet
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">&#10003;</span>
                  Configure routers, switches, and network services
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">&#10003;</span>
                  Analyze network traffic using professional tools
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">&#10003;</span>
                  Build mesh networks that don&apos;t depend on ISPs
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">&#10003;</span>
                  Plan community-owned internet infrastructure
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-text-heading mb-2">Why This Matters</h3>
              <ul className="space-y-2 text-text-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#8594;</span>
                  Understanding networks is foundational to all tech sovereignty work
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#8594;</span>
                  Communities can build their own internet access
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#8594;</span>
                  Network knowledge helps you make informed privacy decisions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#8594;</span>
                  These skills are in high demand across many careers
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Pedagogical Principle */}
        <CorePrinciple />

        {/* Projects */}
        <h2 className="text-2xl font-bold text-text-heading mb-6">Projects & Lesson Plans</h2>
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

        {/* Educator Notes */}
        <div className="mt-12 bg-amber-500/10 rounded-xl border border-amber-500/30 p-8">
          <h2 className="text-2xl font-bold text-text-heading mb-4">Notes for Educators</h2>
          <div className="space-y-4 text-text-secondary">
            <p>
              <strong>Pacing:</strong> The suggested durations are flexible. Some groups may move faster or slower
              depending on prior experience and available time. It&apos;s better to ensure understanding than to rush
              through material.
            </p>
            <p>
              <strong>Equipment:</strong> Start with whatever equipment you have access to. Used routers from
              thrift stores or donated equipment work fine for most activities. OpenWrt can run on many older
              devices.
            </p>
            <p>
              <strong>Safety:</strong> When working with network traffic analysis, ensure students understand
              privacy implications. Only capture traffic on networks you own or have explicit permission to analyze.
            </p>
            <p>
              <strong>Adaptation:</strong> These lesson plans can be adapted for different contexts—classroom
              settings, after-school programs, community workshops, or self-directed learning. Adjust the formality
              and pacing to fit your situation.
            </p>
            <p>
              <strong>Community Connection:</strong> Look for opportunities to connect with local community
              networks, makerspaces, or technology professionals who could serve as guest speakers or mentors.
            </p>
          </div>
        </div>

        {/* Community Network Resources */}
        <div className="mt-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/30 p-8">
          <h2 className="text-2xl font-bold text-text-heading mb-2">Community Network Resources</h2>
          <p className="text-text-secondary mb-6">
            Learn from real-world community networks and access comprehensive guides for building your own.
            These resources inspired this curriculum and provide practical guidance for implementation.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* NYC Mesh */}
            <div className="bg-deep-card rounded-lg border border-primary/20 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-heading">NYC Mesh</h3>
              </div>
              <p className="text-sm text-text-muted mb-3">
                New York City&apos;s community-owned network. Volunteer-driven, neutral, private. See how they install, organize, and sustain a real mesh network.
              </p>
              <div className="space-y-2">
                <a
                  href="https://www.nycmesh.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary flex items-center gap-1"
                >
                  Main Site
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://www.nycmesh.net/blog/how/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary flex items-center gap-1"
                >
                  How It Works
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://wiki.nycmesh.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary flex items-center gap-1"
                >
                  Technical Wiki
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Internet Society DIY Toolkit */}
            <div className="bg-deep-card rounded-lg border border-primary/20 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-heading">ISOC DIY Toolkit</h3>
              </div>
              <p className="text-sm text-text-muted mb-3">
                The Internet Society&apos;s 10-step guide for building community networks. Covers community engagement, sustainability, governance, and technical setup.
              </p>
              <div className="space-y-2">
                <a
                  href="https://www.internetsociety.org/resources/community-network-diy-toolkit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary flex items-center gap-1"
                >
                  Complete Toolkit
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://www.internetsociety.org/blog/2024/02/build-a-community-network/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:text-primary flex items-center gap-1"
                >
                  Getting Started Guide
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Community Network Manual */}
            <div className="bg-deep-card rounded-lg border border-primary/20 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/100/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-heading">Technical Manuals</h3>
              </div>
              <p className="text-sm text-text-muted mb-3">
                In-depth technical guides covering LibreRouter, MAZI Toolkit, and community LTE. Published by UN IGF&apos;s Dynamic Coalition on Community Connectivity.
              </p>
              <div className="space-y-2">
                <a
                  href="https://direitorio.fgv.br/en/publication/community-network-manual-how-build-internet-yourself"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-300 hover:text-purple-300 flex items-center gap-1"
                >
                  Community Network Manual
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://librerouter.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-300 hover:text-purple-300 flex items-center gap-1"
                >
                  LibreRouter Project
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Other Community Networks */}
            <div className="bg-deep-card rounded-lg border border-primary/20 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-heading">Global Networks</h3>
              </div>
              <p className="text-sm text-text-muted mb-3">
                Learn from successful community networks around the world. Each has unique lessons about governance, technology, and sustainability.
              </p>
              <div className="space-y-2">
                <a
                  href="https://guifi.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
                >
                  Guifi.net (Spain)
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://freifunk.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
                >
                  Freifunk (Germany)
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://detroitcommunitytech.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
                >
                  Detroit Community Tech
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Technical Resources */}
            <div className="bg-deep-card rounded-lg border border-primary/20 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-heading">Technical Tools</h3>
              </div>
              <p className="text-sm text-text-muted mb-3">
                Open-source firmware, mesh protocols, and tools for building your own network infrastructure.
              </p>
              <div className="space-y-2">
                <a
                  href="https://openwrt.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  OpenWrt (Router Firmware)
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://www.open-mesh.org/projects/batman-adv/wiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  BATMAN-adv (Mesh Protocol)
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://www.wireshark.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  Wireshark (Traffic Analysis)
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Books & Reading */}
            <div className="bg-deep-card rounded-lg border border-primary/20 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-bold text-text-heading">Further Reading</h3>
              </div>
              <p className="text-sm text-text-muted mb-3">
                Books and comprehensive guides for deep learning about wireless networking and community-built infrastructure.
              </p>
              <div className="space-y-2">
                <a
                  href="http://wndw.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Wireless Networking in the Developing World
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://apc.org/en/pubs/telecommunications-reclaimed"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Telecommunications Reclaimed
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-primary/20 rounded-lg p-6 text-center">
            <h3 className="text-lg font-bold text-teal-900 mb-2">Ready to Build?</h3>
            <p className="text-sm text-teal-800 mb-4">
              Start with the curriculum above, then connect with existing community networks to learn from their experience.
              Remember NYC Mesh&apos;s core principle: <em>&quot;Installing is the main activity of a community network. Everything else you do should be about enabling more installs.&quot;</em>
            </p>
          </div>

          {/* Credits & Acknowledgments */}
          <div className="mt-8 bg-deep-alt rounded-lg p-6 border border-deep-border">
            <h3 className="text-lg font-bold text-text-heading mb-4">Acknowledgments & Credits</h3>
            <p className="text-sm text-text-muted mb-4">
              This curriculum was developed using open resources, documentation, and lessons learned from community networks around the world.
              We gratefully acknowledge the following organizations whose work has informed and inspired these materials:
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-text-heading mb-2">Community Networks</h4>
                <ul className="space-y-1 text-text-muted">
                  <li>
                    <a href="https://www.nycmesh.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">NYC Mesh</a>
                    {' '}- Documentation, install guides, and community organizing practices
                  </li>
                  <li>
                    <a href="https://guifi.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">guifi.net</a>
                    {' '}- Network commons model and cooperative governance structures
                  </li>
                  <li>
                    <a href="https://www.freifunk.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">Freifunk</a>
                    {' '}- Open source mesh networking and community building
                  </li>
                  <li>
                    <a href="https://b4rn.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">B4RN (Broadband for the Rural North)</a>
                    {' '}- Rural cooperative fiber network model
                  </li>
                  <li>
                    <a href="https://detroitcommunitytech.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">Detroit Community Technology Project</a>
                    {' '}- Digital stewards program and community training methodology
                  </li>
                  <li>
                    <a href="https://www.intnetwork.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">Rhizomatica</a>
                    {' '}- Indigenous community network and autonomous telecommunications
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-text-heading mb-2">Educational Resources</h4>
                <ul className="space-y-1 text-text-muted">
                  <li>
                    <a href="https://www.internetsociety.org/resources/community-network-diy-toolkit/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">Internet Society</a>
                    {' '}- Community Network DIY Toolkit and training materials
                  </li>
                  <li>
                    <a href="https://apc.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">Association for Progressive Communications (APC)</a>
                    {' '}- Community network policy advocacy and documentation
                  </li>
                  <li>
                    <a href="http://wndw.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">WNDW</a>
                    {' '}- Wireless Networking in the Developing World guide
                  </li>
                  <li>
                    <a href="https://open-mesh.org/projects/batman-adv/wiki" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">B.A.T.M.A.N. Project</a>
                    {' '}- BATMAN-adv mesh protocol documentation
                  </li>
                  <li>
                    <a href="https://openwrt.org" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary">OpenWrt Project</a>
                    {' '}- Open source router firmware and networking guides
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-text-muted mt-4 border-t border-deep-border pt-4">
              This curriculum is offered as an open educational resource. The lesson structures, activities, and pedagogical approaches
              are inspired by Universal Design for Learning (UDL) principles and best practices in project-based STEM education.
              We encourage educators to adapt these materials for their local contexts and to share improvements with the broader community.
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <Link
            href={`/${locale}/tech-sovereignty`}
            className="inline-flex items-center text-slate-600 hover:text-text-heading transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Tracks
          </Link>
          <Link
            href={`/${locale}/tech-sovereignty/self-hosted`}
            className="inline-flex items-center bg-deep text-white px-6 py-3 rounded-lg hover:bg-deep-card transition-colors"
          >
            Next: Self-Hosted Services
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Need to import React for useState
import React from 'react';
