/**
 * Template constants for K-12 CS Education scope & sequence exports
 * Based on CSTA K-12 Standards and K-12 CS Framework research
 */

// Grade bands as defined by CSTA K-12 Standards
export const GRADE_BANDS = ['K-2', '3-5', '6-8', '9-12'] as const;
export type GradeBand = (typeof GRADE_BANDS)[number];

// Five Core Concept Areas from K-12 CS Framework
export const CSTA_CONCEPTS = [
  'Computing Systems',
  'Networks and the Internet',
  'Data and Analysis',
  'Algorithms and Programming',
  'Impacts of Computing',
] as const;
export type CSTAConcept = (typeof CSTA_CONCEPTS)[number];

// Seven Core Practices from K-12 CS Framework
export const CSTA_PRACTICES = [
  'Fostering an Inclusive Computing Culture',
  'Collaborating Around Computing',
  'Recognizing and Defining Computational Problems',
  'Developing and Using Abstractions',
  'Creating Computational Artifacts',
  'Testing and Refining Computational Artifacts',
  'Communicating About Computing',
] as const;
export type CSTAPractice = (typeof CSTA_PRACTICES)[number];

// Skill progression indicators (spiral curriculum approach)
export const SKILL_PROGRESSION = {
  I: 'Introduced',
  R: 'Reinforced',
  M: 'Mastered',
} as const;
export type SkillLevel = keyof typeof SKILL_PROGRESSION;

// Default instructional time recommendations by grade band
export const INSTRUCTIONAL_TIME = {
  'K-2': '30-45 min/week',
  '3-5': '45-60 min/week',
  '6-8': '60-90 min/week (or elective course)',
  '9-12': 'Full semester/year courses',
} as const;

// Key focus areas by grade band (from CSTA research)
export const GRADE_BAND_FOCUS = {
  'K-2': [
    'Computing concepts',
    'Basic algorithms',
    'Digital citizenship',
    'Simple sequences',
  ],
  '3-5': [
    'Sequences and events',
    'Loops and conditionals',
    'Debugging',
    'Data representation basics',
  ],
  '6-8': [
    'Protocols and communication',
    'Flowcharts and pseudocode',
    'Data representation',
    'Variables and control structures',
  ],
  '9-12': [
    'Procedures and parameters',
    'Data structures',
    'System design',
    'Algorithm efficiency',
  ],
} as const;

// Recommended curricula by grade band (based on research)
export const CURRICULUM_BY_GRADE = {
  'K-2': [
    { name: 'Code.org CS Fundamentals (Courses A-B)', provider: 'Code.org', free: true },
    { name: 'ScratchJr', provider: 'MIT Media Lab', free: true },
    { name: 'CS Unplugged (adapted)', provider: 'University of Canterbury', free: true },
  ],
  '3-5': [
    { name: 'Code.org CS Fundamentals (Courses C-F)', provider: 'Code.org', free: true },
    { name: 'Scratch', provider: 'MIT Media Lab', free: true },
    { name: 'CS Unplugged', provider: 'University of Canterbury', free: true },
  ],
  '6-8': [
    { name: 'Code.org CS Discoveries', provider: 'Code.org', free: true },
    { name: 'Bootstrap:Algebra', provider: 'Bootstrap', free: true },
    { name: 'Exploring Computer Science', provider: 'ECS', free: true },
  ],
  '9-12': [
    { name: 'AP Computer Science Principles', provider: 'College Board', free: false },
    { name: 'Code.org CSP', provider: 'Code.org', free: true },
    { name: 'Exploring Computer Science', provider: 'ECS', free: true },
    { name: 'Bootstrap:Data Science', provider: 'Bootstrap', free: true },
  ],
} as const;

// CSTA Standards prefix by grade band
export const CSTA_STANDARD_PREFIX = {
  'K-2': '1A',
  '3-5': '1B',
  '6-8': '2',
  '9-12': '3A',
} as const;

// Plan interface matching PlannerWizard.tsx
export interface Plan {
  id: string;
  title: string;
  version?: number;
  executiveSummary?: string;
  rawContent?: string;
  scopeSequence?: ScopeSequenceEntry[];
  curriculumRecommendations?: CurriculumRecommendation[];
  implementationRoadmap?: ImplementationPhase[];
  professionalDevelopment?: ProfessionalDevelopment;
  successMetrics?: SuccessMetrics;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScopeSequenceEntry {
  gradeLevel: string;
  competencies: string[];
  instructionTime: string;
  curricula: string[];
  standards: string[];
}

export interface CurriculumRecommendation {
  name: string;
  provider: string;
  gradeLevels: string[];
  features: string[];
  resources: string;
  rationale: string;
}

export interface ImplementationPhase {
  phase: string;
  title: string;
  priorities: string[];
}

export interface ProfessionalDevelopment {
  essential?: string[];
  certifications?: string[];
  support?: string[];
}

export interface SuccessMetrics {
  measurements?: string[];
  milestones?: string[];
}

// District profile interface (basic - legacy)
export interface DistrictProfile {
  id: string;
  schoolName: string;
  city?: string;
  state: string;
  gradeLevels: string[];
  currentOfferings?: string;
  pathways: string[];
  resources?: string;
}

// Enhanced district profile types
export type GradeLevel = 'elementary' | 'middle' | 'high';

export type SubjectArea =
  | 'math'
  | 'science'
  | 'ela'
  | 'socialStudies'
  | 'art'
  | 'music'
  | 'pe'
  | 'worldLanguages'
  | 'cte'
  | 'specialEducation'
  | 'libraryMedia';

export type StaffRole =
  | 'librarians'
  | 'counselors'
  | 'instructionalCoaches'
  | 'paraprofessionals'
  | 'afterSchoolStaff'
  | 'administration';

export type TeacherCountRange = '0' | '1-5' | '6-10' | '11-20' | '21-50' | '50+';

export type CSStatus =
  | 'none'
  | 'informal'
  | 'someLevels'
  | 'comprehensive';

export type CSActivity =
  | 'hourOfCode'
  | 'codingClubs'
  | 'roboticsTeams'
  | 'techIntegration'
  | 'computerLab'
  | 'oneToOne'
  | 'makerspace';

export type PDExperience =
  | 'none'
  | 'hourOfCodeFacilitation'
  | 'codeOrgTraining'
  | 'scratchTraining'
  | 'stateCertification'
  | 'graduateCoursework'
  | 'otherWorkshops';

export type DeviceLevel =
  | 'veryLimited'
  | 'limited'
  | 'moderate'
  | 'strong';

export type DeviceType =
  | 'desktops'
  | 'chromebooks'
  | 'ipads'
  | 'laptops'
  | 'byod'
  | 'roboticsKits'
  | 'makerspaceEquipment';

export type ReliabilityLevel = 'unreliable' | 'moderate' | 'reliable';

export type Initiative =
  | 'stemSteam'
  | 'pbl'
  | 'makerEd'
  | 'designThinking'
  | 'sel'
  | 'culturallyResponsive'
  | 'giftedTalented'
  | 'specialEdInclusion'
  | 'ellSupport'
  | 'cte'
  | 'serviceLearning'
  | 'industryMentorship';

export type CultureTrait =
  | 'teacherCollaboration'
  | 'innovationFriendly'
  | 'parentInvolvement'
  | 'communityPartnerships'
  | 'equityFocus'
  | 'dataDriven'
  | 'teacherAutonomy';

export type TimelineGoal =
  | 'exploring'
  | 'pilotThisYear'
  | 'fullIn1to2Years'
  | 'fullIn3to5Years';

export type BudgetRange =
  | 'none'
  | 'minimal'
  | 'moderate'
  | 'significant';

export type CSGoal =
  | 'meetStateRequirements'
  | 'prepareForCareers'
  | 'computationalThinking'
  | 'increaseEquity'
  | 'stemPathway'
  | 'enhanceCurriculum'
  | 'competitions';

export type Challenge =
  | 'lackTrainedTeachers'
  | 'noScheduleTime'
  | 'limitedTechnology'
  | 'noCurriculumGuidance'
  | 'budgetConstraints'
  | 'adminBuyIn'
  | 'parentUnderstanding';

export type Pathway =
  | 'robotics'
  | 'cybersecurity'
  | 'ai'
  | 'dataScience'
  | 'webDev'
  | 'gameDev'
  | 'itSupport'
  | 'digitalMedia';

export type StateRequirementStatus =
  | 'notSure'
  | 'none'
  | 'recommended'
  | 'required';

// Funding and partnerships types
export type FundingSource =
  | 'districtBudget'
  | 'ptoFundraising'
  | 'localBusinessSponsors'
  | 'corporateGrants'
  | 'federalGrants'
  | 'stateGrants'
  | 'foundationGrants'
  | 'crowdfunding';

export type GrantInterest =
  | 'nsf'
  | 'doe'
  | 'googleOrg'
  | 'amazonFuture'
  | 'microsoftPhilanthropies'
  | 'codeOrg'
  | 'stateSTEM'
  | 'localFoundations';

export type PartnershipType =
  | 'localUniversities'
  | 'communityColleges'
  | 'techCompanies'
  | 'localBusinesses'
  | 'nonprofits'
  | 'libraries'
  | 'museums'
  | 'governmentAgencies'
  | 'communityOrganizations';

export type PartnershipGoal =
  | 'mentorship'
  | 'internships'
  | 'guestSpeakers'
  | 'equipmentDonations'
  | 'funding'
  | 'curriculum'
  | 'facilitiesAccess'
  | 'afterSchoolPrograms';

// Enhanced district profile interface
export interface EnhancedDistrictProfile {
  // Basics
  id: string;
  schoolName: string;
  city: string;
  state: string;
  gradeLevels: GradeLevel[];
  implementationTimeline: TimelineGoal;

  // School Structure
  subjectsTaught: SubjectArea[];
  teacherCounts: {
    elementary: TeacherCountRange;
    middle: TeacherCountRange;
    high: TeacherCountRange;
  };
  otherStaff: StaffRole[];

  // Current State
  currentCSStatus: CSStatus;
  existingActivities: CSActivity[];
  previousPD: PDExperience[];

  // Technology
  deviceAvailability: DeviceLevel;
  deviceTypes: DeviceType[];
  internetReliability: ReliabilityLevel;

  // School Culture & Initiatives
  existingInitiatives: Initiative[];
  cultureCharacteristics: CultureTrait[];
  existingPartnerships?: string;

  // Goals & Constraints
  budget: BudgetRange;
  primaryGoals: CSGoal[];
  challenges: Challenge[];

  // Pathways
  pathways: Pathway[];
  wantFeederPathways: boolean;
  industryPartners?: string;

  // State Alignment
  stateRequirements: StateRequirementStatus;
  alignToStateStandards: boolean;

  // Funding & Partnerships (NEW)
  currentFundingSources: FundingSource[];
  grantInterest: GrantInterest[];
  seekingPartnerships: boolean;
  partnershipTypes: PartnershipType[];
  partnershipGoals: PartnershipGoal[];
  existingCommunityConnections?: string;

  // Metadata
  createdAt?: string;
  updatedAt?: string;
}
