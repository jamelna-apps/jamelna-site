/**
 * Enhanced Curriculum Data for RAG
 *
 * Extended metadata for AI-powered curriculum recommendations including:
 * - Learning objectives and outcomes
 * - Prerequisites and requirements
 * - Implementation considerations
 * - CSTA standards alignment
 * - Teacher support resources
 */

export type GradeLevel = 'K-2' | '3-5' | '6-8' | '9-10' | '11-12';
export type Topic = 'cs' | 'ct' | 'ai' | 'cybersecurity' | 'robotics' | 'data' | 'web' | 'physical';

export interface CSTAAlignment {
  standards: string[]; // CSTA standard codes (e.g., "1A-CS-01")
  coverage: 'full' | 'partial' | 'supplementary';
}

export interface TeacherSupport {
  pdAvailable: boolean;
  pdCost: 'free' | 'paid' | 'varies';
  pdFormat: string[];
  lessonPlans: boolean;
  assessments: boolean;
  pacing: boolean;
}

export interface ImplementationDetails {
  classHours: string;
  prerequisiteKnowledge: string[];
  technologyRequirements: string[];
  classroomSetup: string;
  differentiationSupport: boolean;
}

export interface CurriculumEnhanced {
  id: string;
  name: string;
  organization: string;

  // Grade and topic information
  gradeLevels: GradeLevel[];
  gradeRange: string;
  topics: Topic[];

  // Detailed descriptions
  shortDescription: string;
  fullDescription: string;
  learningObjectives: string[];

  // Standards alignment
  cstaAlignment: CSTAAlignment;
  otherStandards: string[];

  // Implementation
  implementation: ImplementationDetails;
  teacherSupport: TeacherSupport;

  // Access and cost
  url: string;
  isFree: boolean;
  costNotes?: string;

  // Modules/Units
  modules: {
    name: string;
    description: string;
    hours: number;
    topics: string[];
  }[];

  // Best for scenarios
  bestFor: string[];
  limitations: string[];

  // Integration
  crossCurricularConnections: string[];

  // Metadata
  lastUpdated: string;
  languagesAvailable: string[];
}

export const curriculaEnhanced: CurriculumEnhanced[] = [
  // === K-12 COMPREHENSIVE ===
  {
    id: 'code-org',
    name: 'Code.org',
    organization: 'Code.org',
    gradeLevels: ['K-2', '3-5', '6-8', '9-10', '11-12'],
    gradeRange: 'K-12',
    topics: ['cs', 'ct', 'ai', 'data', 'web'],
    shortDescription: 'Comprehensive free K-12 CS curriculum with courses for every grade level.',
    fullDescription: 'Code.org offers a complete K-12 computer science pathway including CS Fundamentals (K-5), CS Discoveries (6-10), CS Principles (9-12), and CS A (10-12). The curriculum emphasizes equity and broadening participation in computing. Each course includes unplugged activities, block-based coding progressing to text-based languages, and extensive teacher support. The platform tracks student progress and provides automatic grading for many activities.',
    learningObjectives: [
      'Understand foundational computing concepts through developmentally appropriate activities',
      'Develop problem-solving and algorithmic thinking skills',
      'Create interactive projects using block-based and text-based programming',
      'Explore the impact of computing on society',
      'Build collaborative skills through pair programming'
    ],
    cstaAlignment: {
      standards: [
        '1A-CS-01', '1A-CS-02', '1A-CS-03', '1A-AP-08', '1A-AP-09', '1A-AP-10', '1A-AP-11', '1A-AP-12', '1A-AP-13', '1A-AP-14', '1A-AP-15',
        '1B-CS-01', '1B-CS-02', '1B-CS-03', '1B-AP-08', '1B-AP-09', '1B-AP-10', '1B-AP-11', '1B-AP-12', '1B-AP-13', '1B-AP-14', '1B-AP-15', '1B-AP-16', '1B-AP-17',
        '2-CS-01', '2-CS-02', '2-CS-03', '2-NI-04', '2-NI-05', '2-NI-06', '2-DA-07', '2-DA-08', '2-DA-09', '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13', '2-AP-14', '2-AP-15', '2-AP-16', '2-AP-17', '2-AP-18', '2-AP-19', '2-IC-20', '2-IC-21', '2-IC-22', '2-IC-23',
        '3A-CS-01', '3A-CS-02', '3A-CS-03', '3A-NI-04', '3A-NI-05', '3A-NI-06', '3A-NI-07', '3A-NI-08', '3A-DA-09', '3A-DA-10', '3A-DA-11', '3A-DA-12', '3A-AP-13', '3A-AP-14', '3A-AP-15', '3A-AP-16', '3A-AP-17', '3A-AP-18', '3A-AP-19', '3A-AP-20', '3A-AP-21', '3A-AP-22', '3A-AP-23', '3A-IC-24', '3A-IC-25', '3A-IC-26', '3A-IC-27', '3A-IC-28', '3A-IC-29', '3A-IC-30',
        '3B-AP-08', '3B-AP-09', '3B-AP-10', '3B-AP-11', '3B-AP-12', '3B-AP-13', '3B-AP-14', '3B-AP-15', '3B-AP-16', '3B-AP-17', '3B-AP-21', '3B-AP-22', '3B-AP-23', '3B-AP-24'
      ],
      coverage: 'full'
    },
    otherStandards: ['ISTE Standards', 'Common Core Math', 'Common Core ELA'],
    implementation: {
      classHours: 'CS Fundamentals: 15-20 hours/year; CS Discoveries: 125+ hours; CS Principles: 150+ hours; CS A: 150+ hours',
      prerequisiteKnowledge: ['No prior CS knowledge required'],
      technologyRequirements: ['Internet-connected devices', 'Modern web browser', '1:1 or 2:1 student-to-device ratio'],
      classroomSetup: 'Computer lab or laptops/tablets with internet. Some unplugged activities require no devices.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online self-paced', 'In-person workshops', 'Virtual workshops'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://code.org/teach',
    isFree: true,
    modules: [
      { name: 'CS Fundamentals Course A', description: 'Pre-readers course introducing sequencing, loops, and events', hours: 12, topics: ['sequencing', 'loops', 'events', 'debugging'] },
      { name: 'CS Fundamentals Course B', description: 'Beginning readers course building on Course A concepts', hours: 12, topics: ['loops', 'conditionals', 'events', 'debugging'] },
      { name: 'CS Fundamentals Course C', description: 'Building computational thinking with sprites and events', hours: 14, topics: ['sprites', 'events', 'loops', 'conditionals'] },
      { name: 'CS Fundamentals Course D', description: 'Functions, variables, and more complex projects', hours: 14, topics: ['functions', 'variables', 'nested loops', 'debugging'] },
      { name: 'CS Fundamentals Course E', description: 'Advanced concepts including functions with parameters', hours: 15, topics: ['functions', 'parameters', 'for loops', 'binary'] },
      { name: 'CS Fundamentals Course F', description: 'Capstone course with complex problem solving', hours: 15, topics: ['variables', 'functions', 'sprites', 'project development'] },
      { name: 'CS Discoveries Unit 1: Problem Solving', description: 'Problem solving process and pair programming', hours: 10, topics: ['problem solving', 'pair programming', 'collaboration'] },
      { name: 'CS Discoveries Unit 2: Web Development', description: 'HTML, CSS, and responsive design', hours: 25, topics: ['HTML', 'CSS', 'web design', 'digital citizenship'] },
      { name: 'CS Discoveries Unit 3: Interactive Animations', description: 'Game Lab introduction with sprites and animations', hours: 25, topics: ['sprites', 'animations', 'user input', 'game design'] },
      { name: 'CS Discoveries Unit 4: AI & Machine Learning', description: 'Introduction to AI concepts and machine learning', hours: 25, topics: ['AI', 'machine learning', 'ethics', 'training data'] },
      { name: 'CS Discoveries Unit 5: Data', description: 'Data collection, visualization, and analysis', hours: 20, topics: ['data collection', 'visualization', 'analysis', 'privacy'] },
      { name: 'CS Discoveries Unit 6: Physical Computing', description: 'Physical computing with Adafruit Circuit Playground', hours: 20, topics: ['physical computing', 'sensors', 'circuits', 'IoT'] },
      { name: 'CS Principles Unit 1: Digital Information', description: 'How computers represent and transmit information', hours: 15, topics: ['binary', 'compression', 'pixels', 'digital representation'] },
      { name: 'CS Principles Unit 2: The Internet', description: 'How the internet works', hours: 15, topics: ['protocols', 'packets', 'DNS', 'cybersecurity'] },
      { name: 'CS Principles Unit 3: Intro to App Design', description: 'Event-driven programming and app development', hours: 25, topics: ['app design', 'events', 'UI/UX', 'prototyping'] },
      { name: 'CS Principles Unit 4: Variables, Lists, Loops', description: 'Core programming constructs', hours: 25, topics: ['variables', 'lists', 'loops', 'traversals'] },
      { name: 'CS Principles Unit 5: Building Apps', description: 'Creating complete apps with data', hours: 25, topics: ['app development', 'data storage', 'algorithms', 'project management'] },
      { name: 'CS Principles Unit 6: Algorithms', description: 'Algorithm design and efficiency', hours: 15, topics: ['sorting', 'searching', 'efficiency', 'algorithm analysis'] },
      { name: 'CS Principles Unit 7: Parameters and Return', description: 'Functions with parameters and return values', hours: 15, topics: ['functions', 'parameters', 'return values', 'abstraction'] },
      { name: 'CS Principles Unit 8: Create PT Prep', description: 'Prepare for the Create Performance Task', hours: 10, topics: ['project planning', 'documentation', 'iteration'] },
      { name: 'CS Principles Unit 9: Data', description: 'Data analysis and visualization', hours: 15, topics: ['data analysis', 'visualization', 'patterns', 'decisions'] },
      { name: 'CS Principles Unit 10: Cybersecurity', description: 'Security principles and ethical hacking', hours: 10, topics: ['encryption', 'authentication', 'vulnerabilities', 'ethics'] }
    ],
    bestFor: [
      'Schools seeking a complete K-12 CS pathway',
      'Districts with limited CS teacher experience',
      'Schools prioritizing equity and broadening participation',
      'Teachers new to CS education seeking strong PD support',
      'Schools needing AP CSP curriculum'
    ],
    limitations: [
      'Requires consistent internet access',
      'Some advanced CS A content not as comprehensive as dedicated Java courses',
      'Platform-dependent (cannot fully run offline)'
    ],
    crossCurricularConnections: ['Math (algorithmic thinking)', 'ELA (technical writing)', 'Art (digital design)', 'Science (data analysis)'],
    lastUpdated: '2024',
    languagesAvailable: ['English', 'Spanish', 'Arabic', 'Chinese', 'Portuguese', 'Many others']
  },

  {
    id: 'scratch',
    name: 'Scratch Curriculum',
    organization: 'MIT Media Lab',
    gradeLevels: ['K-2', '3-5', '6-8'],
    gradeRange: 'K-8',
    topics: ['cs', 'ct'],
    shortDescription: 'Creative computing curriculum using the block-based Scratch programming language.',
    fullDescription: 'Scratch is a visual programming language and online community developed by MIT Media Lab. The curriculum focuses on creative computing, allowing students to program interactive stories, games, and animations. The Creative Computing Curriculum Guide provides educators with activities, strategies, and frameworks for introducing creative computing using Scratch.',
    learningObjectives: [
      'Express ideas through creative computing projects',
      'Develop computational thinking through iteration and debugging',
      'Learn fundamental programming concepts through block-based coding',
      'Collaborate and share projects with a global community',
      'Explore multimedia through animation, sound, and interactive design'
    ],
    cstaAlignment: {
      standards: [
        '1A-AP-08', '1A-AP-09', '1A-AP-10', '1A-AP-11', '1A-AP-12', '1A-AP-13', '1A-AP-14', '1A-AP-15',
        '1B-AP-08', '1B-AP-09', '1B-AP-10', '1B-AP-11', '1B-AP-12', '1B-AP-13', '1B-AP-14', '1B-AP-15', '1B-AP-16', '1B-AP-17',
        '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13', '2-AP-14', '2-AP-15', '2-AP-16', '2-AP-17'
      ],
      coverage: 'partial'
    },
    otherStandards: ['ISTE Standards', 'National Core Arts Standards'],
    implementation: {
      classHours: '20+ hours (flexible, project-based)',
      prerequisiteKnowledge: ['Basic computer skills', 'Ability to read (for text-based instructions)'],
      technologyRequirements: ['Internet-connected devices', 'Modern web browser', 'Scratch offline editor available'],
      classroomSetup: 'Computer lab or tablets. Can work offline with downloaded editor.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online resources', 'ScratchEd community', 'In-person workshops through partners'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://scratch.mit.edu/educators',
    isFree: true,
    modules: [
      { name: 'Explore', description: 'Introduction to Scratch environment and remixing', hours: 2, topics: ['exploration', 'remixing', 'Scratch interface'] },
      { name: 'Create', description: 'Making original projects - animations, games, stories', hours: 10, topics: ['animation', 'games', 'storytelling', 'sprites'] },
      { name: 'Collaborate', description: 'Sharing projects and working together', hours: 4, topics: ['collaboration', 'feedback', 'community'] },
      { name: 'Debug', description: 'Finding and fixing errors in projects', hours: 4, topics: ['debugging', 'testing', 'iteration'] }
    ],
    bestFor: [
      'Elementary and middle school introductory CS',
      'Creative arts integration with computing',
      'Project-based learning environments',
      'English Language Learners (visual programming)',
      'Schools with limited CS teacher expertise'
    ],
    limitations: [
      'Less structured than some curricula - requires teacher facilitation',
      'Does not transition to text-based programming',
      'Best for introducing concepts, not advanced CS topics'
    ],
    crossCurricularConnections: ['Art (animation, design)', 'Music (sound, composition)', 'ELA (storytelling)', 'Math (geometry, coordinates)'],
    lastUpdated: '2024',
    languagesAvailable: ['70+ languages including English, Spanish, Chinese, Arabic']
  },

  {
    id: 'ai4k12',
    name: 'AI4K12',
    organization: 'AI4K12.org (AAAI & CSTA)',
    gradeLevels: ['K-2', '3-5', '6-8', '9-10', '11-12'],
    gradeRange: 'K-12',
    topics: ['ai', 'cs', 'ct', 'data'],
    shortDescription: 'AI education resources organized around the Five Big Ideas in AI.',
    fullDescription: 'AI4K12 is a collaborative effort to develop national guidelines for AI education in K-12, funded by the National Science Foundation. The initiative organizes AI concepts around Five Big Ideas: Perception, Representation & Reasoning, Learning, Natural Interaction, and Societal Impact. It provides curated resources, demonstrations, and activities for teaching AI at different grade levels.',
    learningObjectives: [
      'Understand how computers perceive the world through sensors',
      'Learn how AI systems represent and reason about knowledge',
      'Explore how machines learn from data',
      'Understand natural language and human-computer interaction',
      'Analyze the societal impacts of AI systems'
    ],
    cstaAlignment: {
      standards: [
        '1A-DA-05', '1A-DA-06', '1A-DA-07',
        '1B-DA-06', '1B-DA-07',
        '2-DA-07', '2-DA-08', '2-DA-09', '2-IC-20', '2-IC-21', '2-IC-22', '2-IC-23',
        '3A-DA-09', '3A-DA-10', '3A-DA-11', '3A-DA-12', '3A-IC-24', '3A-IC-25', '3A-IC-26', '3A-IC-27', '3A-IC-28', '3A-IC-29', '3A-IC-30'
      ],
      coverage: 'supplementary'
    },
    otherStandards: ['AI4K12 Five Big Ideas Framework', 'K-12 CS Framework'],
    implementation: {
      classHours: 'Varies by activity (flexible modules)',
      prerequisiteKnowledge: ['Basic digital literacy'],
      technologyRequirements: ['Internet-connected devices for demos', 'Some activities work unplugged'],
      classroomSetup: 'Flexible - many activities can be done unplugged or with minimal technology',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online resources', 'Conference workshops'],
      lessonPlans: true,
      assessments: false,
      pacing: false
    },
    url: 'https://ai4k12.org/',
    isFree: true,
    modules: [
      { name: 'Big Idea 1: Perception', description: 'How computers perceive the world', hours: 5, topics: ['sensors', 'computer vision', 'speech recognition'] },
      { name: 'Big Idea 2: Representation & Reasoning', description: 'How AI represents and uses knowledge', hours: 5, topics: ['knowledge representation', 'search', 'planning'] },
      { name: 'Big Idea 3: Learning', description: 'How machines learn from data', hours: 10, topics: ['machine learning', 'training data', 'classification', 'neural networks'] },
      { name: 'Big Idea 4: Natural Interaction', description: 'How AI enables human-computer interaction', hours: 5, topics: ['NLP', 'chatbots', 'gesture recognition'] },
      { name: 'Big Idea 5: Societal Impact', description: 'The impacts of AI on society', hours: 5, topics: ['ethics', 'bias', 'privacy', 'future of work'] }
    ],
    bestFor: [
      'Integrating AI into existing CS curriculum',
      'Schools wanting to add AI education without full course',
      'Teachers looking for AI demonstrations and activities',
      'Districts developing AI literacy programs'
    ],
    limitations: [
      'Not a complete standalone curriculum',
      'Requires teacher to assemble activities into coherent lessons',
      'Some demos require internet connectivity'
    ],
    crossCurricularConnections: ['Science (data collection, sensors)', 'Math (statistics, probability)', 'Social Studies (ethics, policy)', 'ELA (language processing)'],
    lastUpdated: '2024',
    languagesAvailable: ['English']
  },

  // === ELEMENTARY ===
  {
    id: 'scratchjr',
    name: 'ScratchJr',
    organization: 'Tufts University & MIT Media Lab',
    gradeLevels: ['K-2'],
    gradeRange: 'K-2',
    topics: ['cs', 'ct'],
    shortDescription: 'Introductory programming app for young children ages 5-7.',
    fullDescription: 'ScratchJr is a visual programming language designed for young children (ages 5-7). It allows children to create interactive stories and games by snapping together graphical programming blocks. The interface is designed for developing literacy with pre-readers, using icons instead of text. The curriculum includes activities for early childhood educators.',
    learningObjectives: [
      'Create interactive stories using sequencing',
      'Understand cause and effect through programming',
      'Develop problem-solving skills through creative play',
      'Learn basic computational concepts appropriate for pre-readers',
      'Express creativity through digital media'
    ],
    cstaAlignment: {
      standards: [
        '1A-AP-08', '1A-AP-09', '1A-AP-10', '1A-AP-11', '1A-AP-12', '1A-AP-14', '1A-AP-15'
      ],
      coverage: 'partial'
    },
    otherStandards: ['ISTE Standards', 'Head Start Early Learning Outcomes', 'Common Core ELA (Kindergarten)'],
    implementation: {
      classHours: '8-20 hours (flexible)',
      prerequisiteKnowledge: ['None - designed for pre-readers'],
      technologyRequirements: ['iPad or Android tablet', 'Chromebook version available'],
      classroomSetup: 'Tablets (ideally 1:1 or 1:2). Works offline once app is installed.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online curriculum guides', 'Educator resources'],
      lessonPlans: true,
      assessments: false,
      pacing: true
    },
    url: 'https://www.scratchjr.org/teach',
    isFree: true,
    modules: [
      { name: 'Getting Started', description: 'Interface exploration and first program', hours: 2, topics: ['interface', 'sequencing', 'motion'] },
      { name: 'Animation Projects', description: 'Creating animated scenes and stories', hours: 4, topics: ['animation', 'backgrounds', 'characters'] },
      { name: 'Interactive Stories', description: 'Adding interactivity and multiple pages', hours: 4, topics: ['events', 'pages', 'storytelling'] },
      { name: 'Games', description: 'Creating simple interactive games', hours: 4, topics: ['game design', 'collisions', 'scoring'] }
    ],
    bestFor: [
      'Pre-K through 2nd grade classrooms',
      'Early childhood programs',
      'Schools without 1:1 laptop access (tablets work)',
      'English Language Learners (icon-based interface)',
      'Students with reading difficulties'
    ],
    limitations: [
      'Limited to tablet devices',
      'Simpler than full Scratch - cannot grow with students',
      'Limited collaboration features',
      'Maximum complexity is constrained by design'
    ],
    crossCurricularConnections: ['ELA (storytelling)', 'Math (sequencing, counting)', 'Art (character design)', 'Social-Emotional Learning'],
    lastUpdated: '2023',
    languagesAvailable: ['English', 'Spanish', 'Catalan', 'Dutch', 'German', 'Italian', 'Japanese', 'Portuguese', 'Thai', 'Others']
  },

  {
    id: 'cs-unplugged',
    name: 'CS Unplugged',
    organization: 'CS Unplugged (University of Canterbury)',
    gradeLevels: ['K-2', '3-5', '6-8'],
    gradeRange: 'K-8',
    topics: ['cs', 'ct'],
    shortDescription: 'Free activities teaching CS through games and puzzles without computers.',
    fullDescription: 'CS Unplugged is a collection of free teaching materials that teach Computer Science through engaging games, puzzles, and activities that use cards, string, crayons, and physical movement. The materials are designed to be used without computers, making them accessible to any classroom. Activities cover binary numbers, algorithms, data compression, and more.',
    learningObjectives: [
      'Understand CS concepts through hands-on activities',
      'Develop algorithmic thinking without programming',
      'Learn binary representation and encoding',
      'Explore sorting and searching algorithms kinesthetically',
      'Understand data structures through physical manipulation'
    ],
    cstaAlignment: {
      standards: [
        '1A-CS-01', '1A-CS-02', '1A-DA-05', '1A-DA-06', '1A-AP-08', '1A-AP-09', '1A-AP-10', '1A-AP-11',
        '1B-CS-01', '1B-CS-02', '1B-DA-06', '1B-DA-07', '1B-AP-08', '1B-AP-09', '1B-AP-10', '1B-AP-11',
        '2-DA-07', '2-DA-08', '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13'
      ],
      coverage: 'partial'
    },
    otherStandards: ['CSTA Unplugged Activity Mappings'],
    implementation: {
      classHours: 'Varies by activity (30-60 min each)',
      prerequisiteKnowledge: ['None'],
      technologyRequirements: ['None - unplugged activities'],
      classroomSetup: 'Regular classroom with space for movement activities. Materials: paper, markers, cards.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online guides', 'YouTube videos', 'Downloadable lesson plans'],
      lessonPlans: true,
      assessments: false,
      pacing: false
    },
    url: 'https://www.csunplugged.org/',
    isFree: true,
    modules: [
      { name: 'Binary Numbers', description: 'Understanding base-2 representation', hours: 2, topics: ['binary', 'number systems', 'encoding'] },
      { name: 'Image Representation', description: 'How computers store images', hours: 2, topics: ['pixels', 'color', 'compression'] },
      { name: 'Text Compression', description: 'Reducing file sizes', hours: 2, topics: ['compression', 'patterns', 'efficiency'] },
      { name: 'Error Detection', description: 'Finding and fixing errors in data', hours: 2, topics: ['parity', 'error detection', 'checksums'] },
      { name: 'Sorting Algorithms', description: 'Different ways to sort data', hours: 3, topics: ['sorting', 'algorithms', 'efficiency'] },
      { name: 'Searching Algorithms', description: 'Finding items in data', hours: 2, topics: ['linear search', 'binary search', 'efficiency'] },
      { name: 'Finite State Automata', description: 'Simple computing machines', hours: 2, topics: ['state machines', 'patterns', 'languages'] }
    ],
    bestFor: [
      'Schools without adequate technology',
      'Introducing CS concepts before programming',
      'Kinesthetic learners',
      'Classes with limited time for full CS curriculum',
      'Teachers without CS background'
    ],
    limitations: [
      'No programming practice',
      'Activities can feel disconnected without careful facilitation',
      'Students may not see connection to real computing',
      'Less engaging for students who prefer hands-on technology'
    ],
    crossCurricularConnections: ['Math (binary, algorithms)', 'PE (movement activities)', 'Art (pixel art)', 'Music (patterns, compression)'],
    lastUpdated: '2024',
    languagesAvailable: ['English', 'Chinese', 'French', 'German', 'Italian', 'Japanese', 'Korean', 'Polish', 'Portuguese', 'Spanish', 'Turkish', 'Many others']
  },

  {
    id: 'google-cs-first',
    name: 'Google CS First',
    organization: 'Google',
    gradeLevels: ['3-5', '6-8'],
    gradeRange: 'Grades 4-8',
    topics: ['cs', 'ct'],
    shortDescription: 'Free video-based CS curriculum using Scratch for students ages 9-14.',
    fullDescription: 'CS First is a free computer science curriculum designed for students ages 9-14. It uses Scratch programming and video-based lessons that make coding easy to teach for educators with no prior CS experience. The curriculum is organized into themed activities like Game Design, Animation, Art, and Social Media, making it engaging and relevant to students.',
    learningObjectives: [
      'Create interactive projects using block-based programming',
      'Apply computational thinking to creative problems',
      'Learn programming concepts through themed activities',
      'Develop collaborative skills through pair programming',
      'Build confidence with technology and coding'
    ],
    cstaAlignment: {
      standards: [
        '1B-AP-08', '1B-AP-09', '1B-AP-10', '1B-AP-11', '1B-AP-12', '1B-AP-13', '1B-AP-14', '1B-AP-15', '1B-AP-16', '1B-AP-17',
        '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13', '2-AP-14', '2-AP-15', '2-AP-16', '2-AP-17'
      ],
      coverage: 'partial'
    },
    otherStandards: ['ISTE Standards'],
    implementation: {
      classHours: '10-12 hours per theme (8 activities each)',
      prerequisiteKnowledge: ['Basic computer skills', 'Ability to follow video instructions'],
      technologyRequirements: ['Internet-connected computers', 'Headphones recommended for video instruction'],
      classroomSetup: 'Computer lab or 1:1 devices. Headphones helpful for video-based instruction.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online self-paced courses', 'Video tutorials'],
      lessonPlans: true,
      assessments: false,
      pacing: true
    },
    url: 'https://csfirst.withgoogle.com/',
    isFree: true,
    modules: [
      { name: 'Game Design', description: 'Create arcade-style games', hours: 12, topics: ['game mechanics', 'scoring', 'user input', 'collision'] },
      { name: 'Animation', description: 'Tell stories through animated characters', hours: 10, topics: ['animation', 'timing', 'storytelling', 'sound'] },
      { name: 'Art', description: 'Create digital art and interactive displays', hours: 10, topics: ['art', 'patterns', 'randomness', 'creativity'] },
      { name: 'Storytelling', description: 'Create interactive stories', hours: 10, topics: ['narrative', 'dialogue', 'characters', 'settings'] },
      { name: 'Music & Sound', description: 'Compose music and create sound effects', hours: 10, topics: ['music', 'loops', 'beats', 'sound design'] },
      { name: 'Social Media', description: 'Create social media-style projects', hours: 10, topics: ['profiles', 'feeds', 'interaction', 'digital citizenship'] },
      { name: 'Sports', description: 'Build sports-themed games and activities', hours: 10, topics: ['physics', 'scoring', 'competition', 'timing'] },
      { name: 'Fashion', description: 'Design fashion-themed interactive projects', hours: 10, topics: ['design', 'customization', 'creativity', 'user choice'] }
    ],
    bestFor: [
      'Teachers without CS background',
      'After-school programs and clubs',
      'Summer camps',
      'Schools seeking structured, engaging CS activities',
      'Classrooms wanting student-paced learning'
    ],
    limitations: [
      'Requires consistent internet access for videos',
      'Less flexible than open-ended Scratch projects',
      'Does not progress to text-based programming',
      'Limited depth for students who want more challenge'
    ],
    crossCurricularConnections: ['Art (digital design)', 'Music (composition)', 'ELA (storytelling)', 'Math (game mechanics)'],
    lastUpdated: '2024',
    languagesAvailable: ['English', 'Spanish', 'Arabic', 'Portuguese', 'Indonesian', 'Italian', 'Japanese', 'Korean', 'Turkish', 'Vietnamese']
  },

  // === MIDDLE SCHOOL ===
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    organization: 'Bootstrap',
    gradeLevels: ['6-8', '9-10', '11-12'],
    gradeRange: 'Grades 6-12',
    topics: ['cs', 'ct', 'data'],
    shortDescription: 'CS curriculum integrating with math and science classes.',
    fullDescription: 'Bootstrap is a curriculum that integrates computing into existing math and science classes. It uses a functional programming approach with languages like Pyret and WeScheme. Bootstrap:Algebra reinforces algebra concepts through programming. Bootstrap:Data Science teaches data analysis with real datasets. Bootstrap:Physics combines programming with physics simulations.',
    learningObjectives: [
      'Apply programming to reinforce mathematical concepts',
      'Use computational methods for data analysis',
      'Understand functions as a mathematical and programming concept',
      'Develop systematic approaches to problem solving',
      'Create simulations and models using code'
    ],
    cstaAlignment: {
      standards: [
        '2-DA-07', '2-DA-08', '2-DA-09', '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13', '2-AP-14', '2-AP-15', '2-AP-16', '2-AP-17', '2-AP-18', '2-AP-19',
        '3A-DA-09', '3A-DA-10', '3A-DA-11', '3A-DA-12', '3A-AP-13', '3A-AP-14', '3A-AP-15', '3A-AP-16', '3A-AP-17', '3A-AP-18'
      ],
      coverage: 'partial'
    },
    otherStandards: ['Common Core Math Standards', 'NGSS (for Physics)', 'ISTE Standards'],
    implementation: {
      classHours: 'Bootstrap:Algebra: 25-30 hours; Bootstrap:Data Science: 30+ hours; Bootstrap:Physics: 25+ hours',
      prerequisiteKnowledge: ['Varies by course - Algebra requires pre-algebra knowledge'],
      technologyRequirements: ['Internet-connected devices', 'Modern web browser'],
      classroomSetup: 'Computer lab or 1:1 devices. Can be integrated into existing math or science periods.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online self-paced', 'In-person workshops', 'Virtual workshops'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://www.bootstrapworld.org/',
    isFree: true,
    modules: [
      { name: 'Bootstrap:Algebra - Unit 1', description: 'Functions, variables, and the design recipe', hours: 10, topics: ['functions', 'variables', 'circles of evaluation'] },
      { name: 'Bootstrap:Algebra - Unit 2', description: 'Defining functions and contracts', hours: 10, topics: ['function definition', 'contracts', 'testing'] },
      { name: 'Bootstrap:Algebra - Unit 3', description: 'Game development with algebra', hours: 10, topics: ['coordinates', 'movement', 'game mechanics'] },
      { name: 'Bootstrap:Data Science - Unit 1', description: 'Introduction to data and Pyret', hours: 8, topics: ['data types', 'tables', 'Pyret basics'] },
      { name: 'Bootstrap:Data Science - Unit 2', description: 'Displaying data', hours: 8, topics: ['charts', 'visualization', 'graph types'] },
      { name: 'Bootstrap:Data Science - Unit 3', description: 'Analyzing data', hours: 8, topics: ['statistics', 'measures', 'analysis'] },
      { name: 'Bootstrap:Data Science - Unit 4', description: 'Grouped data and advanced analysis', hours: 8, topics: ['grouping', 'filtering', 'correlations'] },
      { name: 'Bootstrap:Physics - Core', description: 'Physics simulations with programming', hours: 25, topics: ['motion', 'forces', 'energy', 'simulations'] }
    ],
    bestFor: [
      'Math teachers wanting to integrate CS',
      'Science teachers teaching physics or data science',
      'Schools without dedicated CS teachers',
      'Programs emphasizing STEM integration',
      'Districts wanting to reach more students through integration'
    ],
    limitations: [
      'Uses functional programming (Pyret/WeScheme) rather than mainstream languages',
      'Requires math/science teacher buy-in',
      'Less standalone CS - integrated approach',
      'May not satisfy dedicated CS course requirements'
    ],
    crossCurricularConnections: ['Algebra (functions, variables)', 'Statistics (data analysis)', 'Physics (simulations)', 'Science (data literacy)'],
    lastUpdated: '2024',
    languagesAvailable: ['English']
  },

  {
    id: 'cmu-cs-academy',
    name: 'CMU CS Academy',
    organization: 'Carnegie Mellon University',
    gradeLevels: ['6-8', '9-10', '11-12'],
    gradeRange: 'Grades 7-12',
    topics: ['cs', 'ct'],
    shortDescription: 'Free Python curriculum with graphics-first approach.',
    fullDescription: 'CMU CS Academy offers a free, online, graphics-based computer science curriculum developed by Carnegie Mellon University. It uses a "graphics-first" approach where students create visual programs from day one using a custom Python graphics library. The curriculum includes CS0 for beginners and CS1 for more advanced students.',
    learningObjectives: [
      'Write Python code using text-based programming',
      'Create visual and interactive programs',
      'Apply computational thinking to solve problems',
      'Debug and test programs systematically',
      'Develop algorithmic thinking skills'
    ],
    cstaAlignment: {
      standards: [
        '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13', '2-AP-14', '2-AP-15', '2-AP-16', '2-AP-17', '2-AP-18', '2-AP-19',
        '3A-AP-13', '3A-AP-14', '3A-AP-15', '3A-AP-16', '3A-AP-17', '3A-AP-18', '3A-AP-19', '3A-AP-20', '3A-AP-21', '3A-AP-22', '3A-AP-23'
      ],
      coverage: 'full'
    },
    otherStandards: ['ISTE Standards'],
    implementation: {
      classHours: 'CS0: 100+ hours; CS1: 150+ hours',
      prerequisiteKnowledge: ['CS0: None; CS1: Basic programming experience or CS0 completion'],
      technologyRequirements: ['Internet-connected computers', 'Modern web browser'],
      classroomSetup: 'Computer lab or 1:1 devices with internet access.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online self-paced', 'Virtual workshops', 'In-person workshops'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://academy.cs.cmu.edu/',
    isFree: true,
    modules: [
      { name: 'CS0 Unit 1: Drawing', description: 'Introduction to Python and graphics', hours: 15, topics: ['drawing', 'shapes', 'colors', 'coordinates'] },
      { name: 'CS0 Unit 2: Properties', description: 'Variables and properties', hours: 15, topics: ['variables', 'properties', 'gradients'] },
      { name: 'CS0 Unit 3: Animations', description: 'Creating animated graphics', hours: 15, topics: ['animation', 'events', 'timers'] },
      { name: 'CS0 Unit 4: Conditionals', description: 'Making decisions in code', hours: 15, topics: ['conditionals', 'booleans', 'comparisons'] },
      { name: 'CS0 Unit 5: Loops', description: 'Repetition and patterns', hours: 15, topics: ['loops', 'patterns', 'iteration'] },
      { name: 'CS0 Unit 6: Custom Functions', description: 'Creating reusable code', hours: 15, topics: ['functions', 'parameters', 'abstraction'] },
      { name: 'CS1 Advanced Topics', description: 'Data structures and algorithms', hours: 75, topics: ['lists', 'dictionaries', 'recursion', 'algorithms'] }
    ],
    bestFor: [
      'Schools wanting rigorous, college-prep CS curriculum',
      'Teachers seeking well-supported Python curriculum',
      'Students who want visual feedback while learning',
      'High schools offering CS as elective',
      'Districts wanting free but comprehensive curriculum'
    ],
    limitations: [
      'Uses custom graphics library (not standard Python)',
      'Requires consistent internet access',
      'May be challenging for younger students without scaffolding',
      'Less gaming/app focus than some curricula'
    ],
    crossCurricularConnections: ['Math (geometry, algebra)', 'Art (digital design)', 'Physics (simulations)'],
    lastUpdated: '2024',
    languagesAvailable: ['English', 'Spanish (partial)']
  },

  // === HIGH SCHOOL ===
  {
    id: 'ecs',
    name: 'Exploring Computer Science',
    organization: 'Exploring CS',
    gradeLevels: ['9-10', '11-12'],
    gradeRange: 'Grades 9-12',
    topics: ['cs', 'ct', 'data', 'web', 'robotics'],
    shortDescription: 'Introductory CS course focused on equity and broadening participation.',
    fullDescription: 'Exploring Computer Science (ECS) is a year-long introductory high school course that emphasizes inquiry and equity. Developed with NSF funding, it focuses on broadening participation in computing among underrepresented groups. The curriculum includes six units covering human-computer interaction, problem solving, web design, programming, computing and data analysis, and robotics.',
    learningObjectives: [
      'Understand how computers impact daily life and society',
      'Develop problem-solving strategies and algorithmic thinking',
      'Create web pages and interactive programs',
      'Analyze data and understand its role in computing',
      'Explore physical computing through robotics'
    ],
    cstaAlignment: {
      standards: [
        '2-CS-01', '2-CS-02', '2-CS-03', '2-NI-04', '2-NI-05', '2-NI-06', '2-DA-07', '2-DA-08', '2-DA-09',
        '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13', '2-AP-14', '2-AP-15', '2-AP-16', '2-AP-17', '2-AP-18', '2-AP-19',
        '2-IC-20', '2-IC-21', '2-IC-22', '2-IC-23',
        '3A-CS-01', '3A-CS-02', '3A-AP-13', '3A-AP-14', '3A-AP-15', '3A-IC-24', '3A-IC-25', '3A-IC-26'
      ],
      coverage: 'full'
    },
    otherStandards: ['K-12 CS Framework'],
    implementation: {
      classHours: '180 hours (full year course)',
      prerequisiteKnowledge: ['None - designed for all students'],
      technologyRequirements: ['Computer lab', 'Internet access', 'Optional robotics kits for Unit 6'],
      classroomSetup: 'Computer lab with 1:1 access. Robotics unit requires physical computing kits.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'varies',
      pdFormat: ['In-person workshops (40+ hours)', 'Ongoing support communities'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://www.exploringcs.org/',
    isFree: true,
    costNotes: 'Curriculum is free; PD may have costs depending on provider',
    modules: [
      { name: 'Unit 1: Human Computer Interaction', description: 'Computers and society, interface design', hours: 30, topics: ['HCI', 'accessibility', 'design thinking'] },
      { name: 'Unit 2: Problem Solving', description: 'Algorithmic thinking and problem decomposition', hours: 30, topics: ['algorithms', 'problem solving', 'debugging'] },
      { name: 'Unit 3: Web Design', description: 'HTML, CSS, and web development', hours: 30, topics: ['HTML', 'CSS', 'web design', 'accessibility'] },
      { name: 'Unit 4: Introduction to Programming', description: 'Programming fundamentals with Scratch', hours: 30, topics: ['Scratch', 'programming', 'events', 'variables'] },
      { name: 'Unit 5: Computing and Data Analysis', description: 'Data collection and analysis', hours: 30, topics: ['data', 'spreadsheets', 'visualization', 'analysis'] },
      { name: 'Unit 6: Robotics', description: 'Physical computing with robots', hours: 30, topics: ['robotics', 'sensors', 'programming', 'engineering'] }
    ],
    bestFor: [
      'Schools prioritizing equity in CS education',
      'Introducing CS to diverse student populations',
      'Schools without prior CS offerings',
      'Districts wanting research-backed equity-focused curriculum',
      'Preparing students for AP CS courses'
    ],
    limitations: [
      'Requires significant PD commitment (40+ hours)',
      'Unit 6 requires robotics equipment purchase',
      'Less programming depth than other curricula',
      'May not satisfy AP course requirements'
    ],
    crossCurricularConnections: ['Social Studies (computing impact)', 'Math (data analysis)', 'Art (web design)', 'Science (robotics)'],
    lastUpdated: '2023',
    languagesAvailable: ['English']
  },

  {
    id: 'ap-csp',
    name: 'AP Computer Science Principles',
    organization: 'College Board',
    gradeLevels: ['9-10', '11-12'],
    gradeRange: 'Grades 9-12',
    topics: ['cs', 'ct', 'data', 'cybersecurity'],
    shortDescription: 'College Board introductory CS course emphasizing computational thinking.',
    fullDescription: 'AP Computer Science Principles is an introductory college-level computing course that introduces students to the breadth of computer science. The course covers computational thinking, programming fundamentals, the internet, data analysis, and the impact of computing. Multiple free curricula are available including Code.org, Beauty and Joy of Computing, Mobile CSP, and UTeach.',
    learningObjectives: [
      'Develop computational thinking skills for problem solving',
      'Create computational artifacts using programming',
      'Understand how the internet works and impacts society',
      'Analyze data to discover patterns and trends',
      'Evaluate the benefits and risks of computing innovations'
    ],
    cstaAlignment: {
      standards: [
        '3A-CS-01', '3A-CS-02', '3A-CS-03', '3A-NI-04', '3A-NI-05', '3A-NI-06', '3A-NI-07', '3A-NI-08',
        '3A-DA-09', '3A-DA-10', '3A-DA-11', '3A-DA-12',
        '3A-AP-13', '3A-AP-14', '3A-AP-15', '3A-AP-16', '3A-AP-17', '3A-AP-18', '3A-AP-19', '3A-AP-20', '3A-AP-21', '3A-AP-22', '3A-AP-23',
        '3A-IC-24', '3A-IC-25', '3A-IC-26', '3A-IC-27', '3A-IC-28', '3A-IC-29', '3A-IC-30'
      ],
      coverage: 'full'
    },
    otherStandards: ['College Board AP CSP Framework'],
    implementation: {
      classHours: '150+ hours (full year)',
      prerequisiteKnowledge: ['None officially required; algebra helpful'],
      technologyRequirements: ['Computer lab', 'Internet access', 'Specific tools depend on curriculum choice'],
      classroomSetup: 'Computer lab with 1:1 access.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'varies',
      pdFormat: ['Varies by curriculum provider', 'College Board workshops'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://apcentral.collegeboard.org/courses/ap-computer-science-principles',
    isFree: true,
    costNotes: 'AP exam fee applies; curricula are generally free',
    modules: [
      { name: 'Big Idea 1: Creative Development', description: 'Design and create computational artifacts', hours: 25, topics: ['collaboration', 'program design', 'development process'] },
      { name: 'Big Idea 2: Data', description: 'Data representation and analysis', hours: 25, topics: ['binary', 'data compression', 'data analysis', 'metadata'] },
      { name: 'Big Idea 3: Algorithms and Programming', description: 'Fundamental programming concepts', hours: 50, topics: ['variables', 'control structures', 'procedures', 'algorithms'] },
      { name: 'Big Idea 4: Computer Systems and Networks', description: 'How computers and the internet work', hours: 25, topics: ['internet', 'protocols', 'cybersecurity', 'computing devices'] },
      { name: 'Big Idea 5: Impact of Computing', description: 'Social, ethical, and legal implications', hours: 25, topics: ['digital divide', 'bias', 'privacy', 'intellectual property'] }
    ],
    bestFor: [
      'High schools wanting college-credit CS course',
      'Broadening participation in CS',
      'Students with no prior programming experience',
      'Schools wanting AP designation',
      'Preparation for more advanced CS courses'
    ],
    limitations: [
      'Multiple curriculum options can be confusing',
      'Create Performance Task discontinued after 2023',
      'Exam content changes year to year',
      'Less programming depth than AP CS A'
    ],
    crossCurricularConnections: ['Math (algorithmic thinking)', 'Social Studies (computing impact)', 'Art (creative projects)', 'Science (data analysis)'],
    lastUpdated: '2024',
    languagesAvailable: ['English']
  },

  {
    id: 'ap-csa',
    name: 'AP Computer Science A',
    organization: 'College Board',
    gradeLevels: ['9-10', '11-12'],
    gradeRange: 'Grades 10-12',
    topics: ['cs'],
    shortDescription: 'College-level Java programming course for AP credit.',
    fullDescription: 'AP Computer Science A is an introductory college-level computer programming course. Students cultivate their understanding of coding through analyzing, writing, and testing code as they explore concepts like modularity, variables, and control structures. The course uses Java programming language.',
    learningObjectives: [
      'Design and implement solutions to problems using Java',
      'Use and implement commonly used algorithms',
      'Develop and select appropriate algorithms and data structures',
      'Code fluently in an object-oriented paradigm',
      'Read and understand complex programs'
    ],
    cstaAlignment: {
      standards: [
        '3B-AP-08', '3B-AP-09', '3B-AP-10', '3B-AP-11', '3B-AP-12', '3B-AP-13', '3B-AP-14', '3B-AP-15', '3B-AP-16', '3B-AP-17',
        '3B-AP-21', '3B-AP-22', '3B-AP-23', '3B-AP-24'
      ],
      coverage: 'full'
    },
    otherStandards: ['College Board AP CS A Framework'],
    implementation: {
      classHours: '150+ hours (full year)',
      prerequisiteKnowledge: ['Strong algebra skills', 'Recommended: prior programming experience or AP CSP'],
      technologyRequirements: ['Computer lab', 'Java development environment (IDE)'],
      classroomSetup: 'Computer lab with 1:1 access and Java IDE installed.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'varies',
      pdFormat: ['College Board workshops', 'Code.org PD', 'TEALS program'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://apcentral.collegeboard.org/courses/ap-computer-science-a',
    isFree: true,
    costNotes: 'AP exam fee applies; curricula vary in cost',
    modules: [
      { name: 'Unit 1: Primitive Types', description: 'Variables, data types, and expressions', hours: 12, topics: ['variables', 'data types', 'operators', 'casting'] },
      { name: 'Unit 2: Using Objects', description: 'Object-oriented concepts and String class', hours: 15, topics: ['objects', 'methods', 'String', 'wrapper classes'] },
      { name: 'Unit 3: Boolean Expressions and if Statements', description: 'Conditional logic', hours: 15, topics: ['boolean', 'if statements', 'compound expressions'] },
      { name: 'Unit 4: Iteration', description: 'Loops and iteration', hours: 18, topics: ['while loops', 'for loops', 'nested loops', 'iteration'] },
      { name: 'Unit 5: Writing Classes', description: 'Creating custom classes', hours: 20, topics: ['classes', 'constructors', 'methods', 'encapsulation'] },
      { name: 'Unit 6: Array', description: 'One-dimensional arrays', hours: 12, topics: ['arrays', 'traversal', 'algorithms'] },
      { name: 'Unit 7: ArrayList', description: 'Dynamic arrays', hours: 12, topics: ['ArrayList', 'traversal', 'algorithms'] },
      { name: 'Unit 8: 2D Array', description: 'Two-dimensional arrays', hours: 10, topics: ['2D arrays', 'nested loops', 'traversal'] },
      { name: 'Unit 9: Inheritance', description: 'Class hierarchies and polymorphism', hours: 18, topics: ['inheritance', 'polymorphism', 'super', 'Object class'] },
      { name: 'Unit 10: Recursion', description: 'Recursive methods and thinking', hours: 8, topics: ['recursion', 'base case', 'recursive case'] }
    ],
    bestFor: [
      'Students pursuing CS in college',
      'Students wanting programming depth',
      'Schools with experienced CS teachers',
      'Students who have completed AP CSP or ECS',
      'Preparing for technical careers'
    ],
    limitations: [
      'Requires stronger math background',
      'Java-specific (not other languages)',
      'Can be challenging without prior programming',
      'Requires qualified instructor'
    ],
    crossCurricularConnections: ['Math (logic, algebra)', 'Science (computational methods)'],
    lastUpdated: '2024',
    languagesAvailable: ['English']
  },

  {
    id: 'bjc',
    name: 'Beauty and Joy of Computing',
    organization: 'UC Berkeley',
    gradeLevels: ['9-10', '11-12'],
    gradeRange: 'Grades 9-12',
    topics: ['cs', 'ct', 'ai'],
    shortDescription: 'AP CSP curriculum using Snap! with emphasis on social implications.',
    fullDescription: 'The Beauty and Joy of Computing (BJC) is an AP Computer Science Principles curriculum developed at UC Berkeley. It uses Snap!, an extended version of Scratch that adds powerful features like first-class lists and procedures. The curriculum emphasizes both the technical beauty of computing and its social implications, including topics like privacy, encryption, and the digital divide.',
    learningObjectives: [
      'Understand and apply core CS concepts using visual programming',
      'Transition from blocks to text-based programming',
      'Analyze social and ethical implications of computing',
      'Create sophisticated programs using abstraction',
      'Explore advanced CS topics like recursion and higher-order functions'
    ],
    cstaAlignment: {
      standards: [
        '3A-CS-01', '3A-CS-02', '3A-CS-03', '3A-NI-04', '3A-NI-05', '3A-NI-06', '3A-NI-07', '3A-NI-08',
        '3A-DA-09', '3A-DA-10', '3A-DA-11', '3A-DA-12',
        '3A-AP-13', '3A-AP-14', '3A-AP-15', '3A-AP-16', '3A-AP-17', '3A-AP-18', '3A-AP-19', '3A-AP-20', '3A-AP-21', '3A-AP-22', '3A-AP-23',
        '3A-IC-24', '3A-IC-25', '3A-IC-26', '3A-IC-27', '3A-IC-28', '3A-IC-29', '3A-IC-30'
      ],
      coverage: 'full'
    },
    otherStandards: ['College Board AP CSP Framework'],
    implementation: {
      classHours: '150+ hours (full year)',
      prerequisiteKnowledge: ['None required'],
      technologyRequirements: ['Internet-connected computers', 'Modern web browser'],
      classroomSetup: 'Computer lab with 1:1 access.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online course', 'In-person workshops'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://bjc.berkeley.edu/',
    isFree: true,
    modules: [
      { name: 'Unit 1: Introduction to Programming', description: 'Snap! basics and abstraction', hours: 20, topics: ['Snap!', 'abstraction', 'sprites', 'scripts'] },
      { name: 'Unit 2: Abstraction', description: 'Building complex programs from simple parts', hours: 25, topics: ['procedures', 'abstraction', 'generalization'] },
      { name: 'Unit 3: Data Structures', description: 'Lists and higher-order functions', hours: 25, topics: ['lists', 'HOFs', 'map', 'filter', 'reduce'] },
      { name: 'Unit 4: How the Internet Works', description: 'Protocols, packets, and security', hours: 20, topics: ['internet', 'protocols', 'encryption', 'security'] },
      { name: 'Unit 5: Algorithms and Simulation', description: 'Algorithm analysis and modeling', hours: 25, topics: ['algorithms', 'efficiency', 'simulation', 'modeling'] },
      { name: 'Unit 6: Recursion', description: 'Recursive programming patterns', hours: 20, topics: ['recursion', 'fractals', 'tree structures'] },
      { name: 'Unit 7: Fractals and Recursion', description: 'Advanced recursive graphics', hours: 15, topics: ['fractals', 'recursion', 'graphics'] },
      { name: 'Social Implications Labs', description: 'Ethics and impact of computing', hours: 25, topics: ['privacy', 'AI', 'digital divide', 'bias'] }
    ],
    bestFor: [
      'AP CSP courses emphasizing social implications',
      'Schools wanting visual programming for high school',
      'Teachers interested in computer science ethics',
      'Students interested in both programming and societal impact',
      'Preparing students for Berkeley-style CS education'
    ],
    limitations: [
      'Snap! is less common than other languages',
      'May need supplementing for text-based programming',
      'Requires buy-in for social implications focus',
      'Less direct industry applicability than Python/Java'
    ],
    crossCurricularConnections: ['Social Studies (ethics, policy)', 'Math (recursion, algorithms)', 'Art (fractal graphics)', 'Civics (digital citizenship)'],
    lastUpdated: '2024',
    languagesAvailable: ['English', 'Spanish', 'Chinese', 'German']
  },

  // === SPECIALIZED: CYBERSECURITY ===
  {
    id: 'cyber-org',
    name: 'CYBER.ORG',
    organization: 'CYBER.ORG (formerly NICERC)',
    gradeLevels: ['K-2', '3-5', '6-8', '9-10', '11-12'],
    gradeRange: 'K-12',
    topics: ['cybersecurity', 'cs'],
    shortDescription: 'Comprehensive K-12 cybersecurity curriculum aligned to NICE Framework.',
    fullDescription: 'CYBER.ORG provides free, comprehensive cybersecurity curriculum for K-12 educators. The curriculum is aligned to the NICE Cybersecurity Workforce Framework and provides age-appropriate activities from digital citizenship in elementary school to advanced cybersecurity concepts in high school. Resources include lesson plans, hands-on activities, and virtual labs.',
    learningObjectives: [
      'Understand cybersecurity fundamentals and best practices',
      'Learn about cyber threats and defense strategies',
      'Develop digital citizenship and online safety skills',
      'Explore cybersecurity career pathways',
      'Practice hands-on cybersecurity skills in safe environments'
    ],
    cstaAlignment: {
      standards: [
        '1A-NI-04', '1B-NI-05', '2-NI-05', '2-NI-06',
        '3A-NI-04', '3A-NI-05', '3A-NI-06', '3A-NI-07', '3A-NI-08',
        '3B-NI-03', '3B-NI-04'
      ],
      coverage: 'supplementary'
    },
    otherStandards: ['NICE Cybersecurity Workforce Framework', 'ISTE Standards'],
    implementation: {
      classHours: 'Varies by grade band (modular)',
      prerequisiteKnowledge: ['Varies by level'],
      technologyRequirements: ['Internet-connected devices', 'Virtual lab access for advanced courses'],
      classroomSetup: 'Computer lab for hands-on activities. Some lessons work unplugged.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online self-paced', 'Virtual workshops', 'In-person workshops'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://cyber.org/',
    isFree: true,
    modules: [
      { name: 'Elementary: Cyber Safety', description: 'Digital citizenship and online safety', hours: 10, topics: ['passwords', 'privacy', 'digital footprint', 'safety'] },
      { name: 'Middle School: Cyber Literacy', description: 'Cybersecurity fundamentals', hours: 20, topics: ['threats', 'defense', 'encryption basics', 'ethics'] },
      { name: 'High School: Cybersecurity Fundamentals', description: 'Introduction to cybersecurity', hours: 50, topics: ['networking', 'threats', 'defense', 'cryptography'] },
      { name: 'High School: Advanced Cybersecurity', description: 'In-depth cybersecurity skills', hours: 75, topics: ['penetration testing', 'forensics', 'incident response'] },
      { name: 'CyberStart', description: 'Gamified cybersecurity challenges', hours: 20, topics: ['CTF', 'challenges', 'hands-on skills'] }
    ],
    bestFor: [
      'Schools adding cybersecurity to CS program',
      'Pathways to cybersecurity careers',
      'Digital citizenship education K-12',
      'Career and Technical Education programs',
      'Schools near cybersecurity employers'
    ],
    limitations: [
      'Specialized focus - not general CS',
      'Advanced courses require technical setup',
      'May need network administrator support',
      'Best as supplement to core CS curriculum'
    ],
    crossCurricularConnections: ['Social Studies (privacy, policy)', 'Math (cryptography)', 'Business (risk management)', 'Ethics'],
    lastUpdated: '2024',
    languagesAvailable: ['English']
  },

  // === SPECIALIZED: AI ===
  {
    id: 'mit-raise',
    name: 'MIT RAISE',
    organization: 'MIT',
    gradeLevels: ['6-8', '9-10', '11-12'],
    gradeRange: 'Grades 6-12',
    topics: ['ai', 'cs', 'ct', 'data'],
    shortDescription: 'Responsible AI curriculum focusing on ethics and social impact.',
    fullDescription: 'MIT RAISE (Responsible AI for Social Empowerment and Education) provides free AI literacy curriculum for middle and high school students. The curriculum emphasizes both technical understanding of AI and critical examination of AI\'s social impacts. Activities include hands-on machine learning experiments and discussions about AI ethics, bias, and fairness.',
    learningObjectives: [
      'Understand how AI and machine learning systems work',
      'Critically evaluate AI applications in society',
      'Recognize bias and fairness issues in AI systems',
      'Create AI-powered applications using accessible tools',
      'Discuss ethical implications of AI development'
    ],
    cstaAlignment: {
      standards: [
        '2-DA-08', '2-DA-09', '2-IC-21', '2-IC-22', '2-IC-23',
        '3A-DA-09', '3A-DA-10', '3A-DA-11', '3A-DA-12',
        '3A-IC-24', '3A-IC-25', '3A-IC-26', '3A-IC-27', '3A-IC-28', '3A-IC-29', '3A-IC-30'
      ],
      coverage: 'supplementary'
    },
    otherStandards: ['AI4K12 Five Big Ideas Framework'],
    implementation: {
      classHours: '20-40 hours (modular)',
      prerequisiteKnowledge: ['Basic digital literacy'],
      technologyRequirements: ['Internet-connected devices', 'Modern web browser'],
      classroomSetup: 'Computer lab or 1:1 devices. Many activities can be done with shared devices.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online resources', 'Virtual workshops'],
      lessonPlans: true,
      assessments: false,
      pacing: true
    },
    url: 'https://raise.mit.edu/',
    isFree: true,
    modules: [
      { name: 'Introduction to AI', description: 'What is AI and where do we see it?', hours: 5, topics: ['AI definitions', 'AI in daily life', 'history of AI'] },
      { name: 'Machine Learning Basics', description: 'How machines learn from data', hours: 10, topics: ['training data', 'classification', 'supervised learning'] },
      { name: 'AI Ethics', description: 'Fairness, bias, and responsibility', hours: 10, topics: ['bias', 'fairness', 'transparency', 'accountability'] },
      { name: 'Creative AI', description: 'AI for art, music, and creativity', hours: 5, topics: ['generative AI', 'creativity', 'human-AI collaboration'] },
      { name: 'AI and Society', description: 'Impact of AI on jobs, privacy, and democracy', hours: 10, topics: ['automation', 'privacy', 'surveillance', 'governance'] }
    ],
    bestFor: [
      'Adding AI literacy to existing CS programs',
      'Social studies integration with computing',
      'Schools emphasizing ethics education',
      'Preparing students for AI-influenced workforce',
      'Discussion-based learning environments'
    ],
    limitations: [
      'Not a standalone CS curriculum',
      'Less hands-on programming than some alternatives',
      'Requires teacher comfort with ethical discussions',
      'Rapidly evolving field may outpace materials'
    ],
    crossCurricularConnections: ['Social Studies (ethics, policy)', 'Science (data analysis)', 'ELA (argumentation)', 'Art (creative AI)'],
    lastUpdated: '2024',
    languagesAvailable: ['English']
  },

  // === SPECIALIZED: PHYSICAL COMPUTING ===
  {
    id: 'microbit',
    name: 'micro:bit Educational Foundation',
    organization: 'micro:bit Educational Foundation',
    gradeLevels: ['3-5', '6-8'],
    gradeRange: 'Grades 3-8',
    topics: ['cs', 'ct', 'robotics', 'physical'],
    shortDescription: 'Physical computing curriculum using the BBC micro:bit device.',
    fullDescription: 'The micro:bit Educational Foundation provides curriculum and resources for teaching physical computing using the BBC micro:bit, a pocket-sized programmable computer. The curriculum supports both block-based (MakeCode) and Python programming. Activities range from simple LED displays to complex IoT projects with sensors and wireless communication.',
    learningObjectives: [
      'Program physical computing devices',
      'Understand inputs, outputs, and sensors',
      'Create interactive projects with real-world applications',
      'Transition from blocks to text-based programming',
      'Design and build computing solutions to problems'
    ],
    cstaAlignment: {
      standards: [
        '1B-CS-02', '1B-CS-03', '1B-AP-10', '1B-AP-11', '1B-AP-12', '1B-AP-15',
        '2-CS-02', '2-CS-03', '2-AP-10', '2-AP-11', '2-AP-13', '2-AP-16', '2-AP-17'
      ],
      coverage: 'partial'
    },
    otherStandards: ['UK National Curriculum Computing', 'ISTE Standards'],
    implementation: {
      classHours: 'Varies (modular lessons)',
      prerequisiteKnowledge: ['Basic computer skills'],
      technologyRequirements: ['micro:bit devices', 'Computers for programming', 'Internet for MakeCode editor'],
      classroomSetup: 'Computers or tablets plus micro:bit devices. 1:1 or 2:1 device ratio recommended.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online courses', 'Video tutorials', 'Lesson plans'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://microbit.org/teach/',
    isFree: true,
    costNotes: 'Curriculum is free; micro:bit hardware purchase required (~$20/device)',
    modules: [
      { name: 'First Steps', description: 'Introduction to micro:bit and programming', hours: 5, topics: ['interface', 'LED display', 'buttons', 'first programs'] },
      { name: 'Make It Code It', description: 'Core programming concepts', hours: 10, topics: ['variables', 'conditionals', 'loops', 'functions'] },
      { name: 'Sensors and Inputs', description: 'Using micro:bit sensors', hours: 10, topics: ['accelerometer', 'compass', 'light sensor', 'temperature'] },
      { name: 'Radio Communication', description: 'Wireless projects', hours: 5, topics: ['radio', 'communication', 'networking', 'protocols'] },
      { name: 'Python Introduction', description: 'Transitioning to text-based coding', hours: 10, topics: ['Python', 'syntax', 'debugging', 'text-based programming'] }
    ],
    bestFor: [
      'Schools wanting hands-on physical computing',
      'STEM integration with computing',
      'Engaging kinesthetic learners',
      'Transitioning from Scratch to text-based programming',
      'Budget-conscious physical computing programs'
    ],
    limitations: [
      'Requires hardware purchase',
      'Devices need management and charging',
      'Limited to micro:bit capabilities',
      'Less comprehensive than full CS curriculum'
    ],
    crossCurricularConnections: ['Science (sensors, data)', 'Math (data analysis)', 'Art (wearables, displays)', 'Engineering (design process)'],
    lastUpdated: '2024',
    languagesAvailable: ['English', 'Many others through community']
  },

  {
    id: 'raspberry-pi-foundation',
    name: 'Raspberry Pi Foundation Learning',
    organization: 'Raspberry Pi Foundation',
    gradeLevels: ['K-2', '3-5', '6-8', '9-10', '11-12'],
    gradeRange: 'K-12',
    topics: ['cs', 'ct', 'robotics', 'web', 'physical'],
    shortDescription: 'Comprehensive free computing education from Scratch to Python and physical computing.',
    fullDescription: 'The Raspberry Pi Foundation provides free computing education resources including projects, lesson plans, and a complete Computing Curriculum. Resources cover Scratch, Python, web development (HTML/CSS), and physical computing with Raspberry Pi. The curriculum is designed for the UK National Curriculum but maps well to CSTA standards.',
    learningObjectives: [
      'Progress from visual to text-based programming',
      'Create web applications with HTML, CSS, and JavaScript',
      'Build physical computing projects',
      'Understand computing systems and networks',
      'Apply computational thinking to real-world problems'
    ],
    cstaAlignment: {
      standards: [
        '1A-AP-08', '1A-AP-09', '1A-AP-10', '1A-AP-11', '1A-AP-12', '1A-AP-14', '1A-AP-15',
        '1B-AP-08', '1B-AP-09', '1B-AP-10', '1B-AP-11', '1B-AP-12', '1B-AP-13', '1B-AP-14', '1B-AP-15', '1B-AP-16', '1B-AP-17',
        '2-CS-01', '2-CS-02', '2-CS-03', '2-NI-04', '2-NI-05', '2-AP-10', '2-AP-11', '2-AP-12', '2-AP-13', '2-AP-14', '2-AP-15', '2-AP-16', '2-AP-17', '2-AP-18', '2-AP-19',
        '3A-CS-01', '3A-CS-02', '3A-NI-04', '3A-AP-13', '3A-AP-14', '3A-AP-15', '3A-AP-16', '3A-AP-17', '3A-AP-18'
      ],
      coverage: 'full'
    },
    otherStandards: ['UK National Curriculum Computing', 'ISTE Standards'],
    implementation: {
      classHours: 'Varies by pathway and grade level',
      prerequisiteKnowledge: ['Varies by level'],
      technologyRequirements: ['Computers for programming', 'Optional Raspberry Pi for physical computing'],
      classroomSetup: 'Computer lab or 1:1 devices. Raspberry Pi optional for physical computing projects.',
      differentiationSupport: true
    },
    teacherSupport: {
      pdAvailable: true,
      pdCost: 'free',
      pdFormat: ['Online courses (free certification)', 'In-person workshops through partners'],
      lessonPlans: true,
      assessments: true,
      pacing: true
    },
    url: 'https://www.raspberrypi.org/learn/',
    isFree: true,
    costNotes: 'All digital resources free; Raspberry Pi hardware optional (~$35-75)',
    modules: [
      { name: 'Scratch Path', description: 'Visual programming projects', hours: 30, topics: ['Scratch', 'games', 'animation', 'storytelling'] },
      { name: 'Python Path', description: 'Text-based programming introduction', hours: 40, topics: ['Python', 'turtle graphics', 'text games', 'data'] },
      { name: 'Web Development Path', description: 'HTML, CSS, and web design', hours: 30, topics: ['HTML', 'CSS', 'accessibility', 'responsive design'] },
      { name: 'Physical Computing Path', description: 'Raspberry Pi projects', hours: 40, topics: ['GPIO', 'sensors', 'motors', 'cameras', 'IoT'] },
      { name: 'Computing Curriculum', description: 'Complete year-by-year curriculum', hours: 200, topics: ['comprehensive computing', 'UK National Curriculum'] }
    ],
    bestFor: [
      'Schools wanting free comprehensive curriculum',
      'Physical computing integration',
      'Teachers seeking online PD certification',
      'Progression from primary through secondary',
      'Code clubs and extracurricular programs'
    ],
    limitations: [
      'UK-centric curriculum structure',
      'Physical computing requires hardware purchase',
      'Less US-specific context',
      'May need adaptation for US standards'
    ],
    crossCurricularConnections: ['Science (physical computing)', 'Art (digital making)', 'Math (programming)', 'Design Technology'],
    lastUpdated: '2024',
    languagesAvailable: ['English', 'Community translations available']
  }
];

// === HELPER FUNCTIONS ===

export const getCurriculumById = (id: string): CurriculumEnhanced | undefined => {
  return curriculaEnhanced.find(c => c.id === id);
};

export const filterByGradeLevel = (curricula: CurriculumEnhanced[], level: GradeLevel): CurriculumEnhanced[] => {
  return curricula.filter(c => c.gradeLevels.includes(level));
};

export const filterByTopic = (curricula: CurriculumEnhanced[], topic: Topic): CurriculumEnhanced[] => {
  return curricula.filter(c => c.topics.includes(topic));
};

export const filterFreeOnly = (curricula: CurriculumEnhanced[]): CurriculumEnhanced[] => {
  return curricula.filter(c => c.isFree);
};

export const filterByCSTAStandard = (curricula: CurriculumEnhanced[], standardCode: string): CurriculumEnhanced[] => {
  return curricula.filter(c => c.cstaAlignment.standards.includes(standardCode));
};

export const getCurriculaForScenario = (scenario: string): CurriculumEnhanced[] => {
  return curriculaEnhanced.filter(c => c.bestFor.some(s =>
    s.toLowerCase().includes(scenario.toLowerCase())
  ));
};

// === RAG FORMATTING ===

/**
 * Format a curriculum for RAG document storage
 */
export function formatCurriculumForRAG(curriculum: CurriculumEnhanced): string {
  const lines: string[] = [];

  lines.push(`CURRICULUM: ${curriculum.name}`);
  lines.push(`Organization: ${curriculum.organization}`);
  lines.push(`Grade Range: ${curriculum.gradeRange}`);
  lines.push(`Topics: ${curriculum.topics.join(', ')}`);
  lines.push(`Free: ${curriculum.isFree ? 'Yes' : 'No'}`);
  lines.push('');
  lines.push(`DESCRIPTION: ${curriculum.fullDescription}`);
  lines.push('');
  lines.push('LEARNING OBJECTIVES:');
  curriculum.learningObjectives.forEach(obj => {
    lines.push(`- ${obj}`);
  });
  lines.push('');
  lines.push(`CSTA ALIGNMENT: ${curriculum.cstaAlignment.coverage} coverage`);
  lines.push(`Standards: ${curriculum.cstaAlignment.standards.slice(0, 10).join(', ')}${curriculum.cstaAlignment.standards.length > 10 ? '...' : ''}`);
  lines.push('');
  lines.push('IMPLEMENTATION:');
  lines.push(`- Class Hours: ${curriculum.implementation.classHours}`);
  lines.push(`- Prerequisites: ${curriculum.implementation.prerequisiteKnowledge.join(', ')}`);
  lines.push(`- Technology: ${curriculum.implementation.technologyRequirements.join(', ')}`);
  lines.push(`- Classroom Setup: ${curriculum.implementation.classroomSetup}`);
  lines.push('');
  lines.push('TEACHER SUPPORT:');
  lines.push(`- Professional Development: ${curriculum.teacherSupport.pdAvailable ? 'Available' : 'Not available'} (${curriculum.teacherSupport.pdCost})`);
  lines.push(`- PD Formats: ${curriculum.teacherSupport.pdFormat.join(', ')}`);
  lines.push(`- Lesson Plans: ${curriculum.teacherSupport.lessonPlans ? 'Yes' : 'No'}`);
  lines.push(`- Assessments: ${curriculum.teacherSupport.assessments ? 'Yes' : 'No'}`);
  lines.push('');
  lines.push('MODULES:');
  curriculum.modules.forEach(mod => {
    lines.push(`- ${mod.name} (${mod.hours} hours): ${mod.description}`);
  });
  lines.push('');
  lines.push('BEST FOR:');
  curriculum.bestFor.forEach(scenario => {
    lines.push(`- ${scenario}`);
  });
  lines.push('');
  lines.push('LIMITATIONS:');
  curriculum.limitations.forEach(limit => {
    lines.push(`- ${limit}`);
  });
  lines.push('');
  lines.push(`URL: ${curriculum.url}`);

  return lines.join('\n');
}

/**
 * Generate all curriculum documents for RAG
 */
export function generateCurriculumRAGDocuments(): Array<{
  id: string;
  docType: 'curriculum';
  content: string;
  metadata: {
    name: string;
    organization: string;
    gradeLevels: GradeLevel[];
    topics: Topic[];
    isFree: boolean;
    cstaStandards: string[];
  };
}> {
  return curriculaEnhanced.map(curriculum => ({
    id: `curriculum-${curriculum.id}`,
    docType: 'curriculum' as const,
    content: formatCurriculumForRAG(curriculum),
    metadata: {
      name: curriculum.name,
      organization: curriculum.organization,
      gradeLevels: curriculum.gradeLevels,
      topics: curriculum.topics,
      isFree: curriculum.isFree,
      cstaStandards: curriculum.cstaAlignment.standards
    }
  }));
}
