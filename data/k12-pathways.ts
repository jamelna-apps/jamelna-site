export type GradeBand = 'elementary' | 'middle' | 'high';

export interface PathwayGradeBand {
  core: string[];       // Curriculum IDs from curricula.ts
  pathway: string[];    // Pathway-specific curriculum IDs
  skills: string[];     // Key skills for this grade band
}

export type PathwayIcon = 'brain' | 'shield' | 'bot' | 'chart' | 'globe';

export interface K12Pathway {
  id: string;
  name: string;
  description: string;
  icon: PathwayIcon;
  color: string;        // Tailwind color class (e.g., 'violet', 'emerald')
  grades: {
    elementary: PathwayGradeBand;
    middle: PathwayGradeBand;
    high: PathwayGradeBand;
  };
}

// Foundation skills present in ALL pathways across all grade bands
export const foundation = {
  elementary: {
    skills: ['Computational Thinking', 'Pattern Recognition', 'Data Patterns', 'Algorithms', 'Decomposition'],
    core: ['cs-unplugged', 'code-org', 'scratchjr', 'scratch'],
  },
  middle: {
    skills: ['Data Analysis', 'Problem Decomposition', 'Abstraction', 'Algorithm Design', 'Debugging'],
    core: ['scratch', 'code-org', 'bootstrap', 'harvard-creative-computing'],
  },
  high: {
    skills: ['Data Science Fundamentals', 'Statistical Thinking', 'Systems Analysis', 'Computational Modeling'],
    core: ['ap-csp', 'cmu-cs-academy', 'ecs'],
  },
};

export const k12Pathways: K12Pathway[] = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    description: 'Focus on machine learning, AI ethics, and intelligent systems',
    icon: 'brain',
    color: 'violet',
    grades: {
      elementary: {
        core: ['cs-unplugged', 'code-org', 'scratch'],
        pathway: ['ai4k12'],
        skills: ['Pattern recognition', 'Classification', 'Training data concepts', 'AI in everyday life'],
      },
      middle: {
        core: ['scratch', 'code-org', 'bootstrap'],
        pathway: ['ai4k12', 'mit-raise', 'app-inventor'],
        skills: ['Machine learning basics', 'AI ethics', 'Bias in data', 'Teachable Machine'],
      },
      high: {
        core: ['ap-csp', 'cmu-cs-academy'],
        pathway: ['elementsofai', 'mit-raise', 'bjc'],
        skills: ['Neural networks', 'NLP basics', 'Responsible AI', 'AI applications'],
      },
    },
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'Learn to protect systems, data, and digital infrastructure',
    icon: 'shield',
    color: 'emerald',
    grades: {
      elementary: {
        core: ['cs-unplugged', 'code-org', 'scratch'],
        pathway: ['cyber-org'],
        skills: ['Digital citizenship', 'Password safety', 'Online privacy', 'Recognizing threats'],
      },
      middle: {
        core: ['scratch', 'code-org', 'harvard-creative-computing'],
        pathway: ['cyber-org', 'raspberry-pi-foundation'],
        skills: ['Encryption basics', 'Network fundamentals', 'Social engineering', 'Secure coding'],
      },
      high: {
        core: ['ap-csp', 'ecs', 'cmu-cs-academy'],
        pathway: ['cyber-org', 'pltw-cs'],
        skills: ['Network security', 'Cryptography', 'Ethical hacking basics', 'Security careers'],
      },
    },
  },
  {
    id: 'robotics',
    name: 'Robotics',
    description: 'Build and program physical computing systems',
    icon: 'bot',
    color: 'orange',
    grades: {
      elementary: {
        core: ['cs-unplugged', 'code-org', 'scratch'],
        pathway: ['microbit', 'vex-robotics'],
        skills: ['Sensors and inputs', 'Motor control', 'Sequential programming', 'Physical computing'],
      },
      middle: {
        core: ['scratch', 'code-org', 'makecode'],
        pathway: ['vex-robotics', 'microbit', 'raspberry-pi-foundation', 'adafruit-learn'],
        skills: ['Sensor integration', 'Feedback loops', 'Mechanical design', 'Iterative testing'],
      },
      high: {
        core: ['ap-csp', 'cmu-cs-academy'],
        pathway: ['vex-robotics', 'raspberry-pi-foundation', 'adafruit-learn'],
        skills: ['Advanced robotics', 'Autonomous systems', 'Computer vision', 'Engineering design'],
      },
    },
  },
  {
    id: 'dataScience',
    name: 'Data Science',
    description: 'Analyze data to discover insights and tell stories',
    icon: 'chart',
    color: 'blue',
    grades: {
      elementary: {
        core: ['cs-unplugged', 'code-org', 'scratch'],
        pathway: ['google-cs-first'],
        skills: ['Data collection', 'Charts and graphs', 'Finding patterns', 'Asking questions'],
      },
      middle: {
        core: ['scratch', 'code-org', 'bootstrap'],
        pathway: ['bootstrap', 'project-guts', 'khan-academy-computing'],
        skills: ['Data visualization', 'Spreadsheet analysis', 'Statistical thinking', 'Data stories'],
      },
      high: {
        core: ['ap-csp', 'cmu-cs-academy'],
        pathway: ['bootstrap', 'replit-curriculum', 'khan-academy-computing'],
        skills: ['Python for data', 'Statistical analysis', 'Machine learning basics', 'Data ethics'],
      },
    },
  },
  {
    id: 'webDev',
    name: 'Web Development',
    description: 'Create websites and web applications',
    icon: 'globe',
    color: 'cyan',
    grades: {
      elementary: {
        core: ['cs-unplugged', 'code-org', 'scratch'],
        pathway: ['code-club', 'google-cs-first'],
        skills: ['Web basics', 'Digital content creation', 'Simple web pages', 'Internet safety'],
      },
      middle: {
        core: ['scratch', 'code-org', 'harvard-creative-computing'],
        pathway: ['code-club', 'raspberry-pi-foundation', 'khan-academy-computing', 'replit-curriculum'],
        skills: ['HTML & CSS', 'JavaScript basics', 'Responsive design', 'Web accessibility'],
      },
      high: {
        core: ['ap-csp', 'cmu-cs-academy', 'ecs'],
        pathway: ['khan-academy-computing', 'replit-curriculum', 'mobile-csp'],
        skills: ['Full-stack basics', 'Databases', 'APIs', 'Modern frameworks'],
      },
    },
  },
];

// Helper function to get a pathway by ID
export const getK12PathwayById = (id: string): K12Pathway | undefined => {
  return k12Pathways.find(p => p.id === id);
};

// Helper function to get all curriculum IDs for a pathway and grade band
export const getK12PathwayCurricula = (pathwayId: string, gradeBand: GradeBand): { core: string[]; pathway: string[] } | undefined => {
  const pathway = getK12PathwayById(pathwayId);
  if (!pathway) return undefined;
  return {
    core: pathway.grades[gradeBand].core,
    pathway: pathway.grades[gradeBand].pathway,
  };
};

// Helper to get foundation info for a grade band
export const getFoundation = (gradeBand: GradeBand) => {
  return foundation[gradeBand];
};

// Grade band labels
export const gradeBandLabels: Record<GradeBand, string> = {
  elementary: 'Elementary (K-5)',
  middle: 'Middle School (6-8)',
  high: 'High School (9-12)',
};
