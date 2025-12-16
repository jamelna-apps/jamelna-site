export type SupportedLocale = 'en' | 'es' | 'de' | 'zh' | 'pt';

export interface DistrictProfile {
  id?: string;
  schoolName: string;
  state: string;
  gradeLevels: string[];
  currentOfferings?: string;
  pathways?: string[];
  resources?: string;
}

// Curriculum URL lookup for AI to include in recommendations
export const CURRICULUM_URLS: Record<string, string> = {
  // Cross-grade curricula
  'Code.org': 'https://code.org/teach',
  'Scratch': 'https://scratch.mit.edu/educators',
  'AI4K12': 'https://ai4k12.org/',

  // Elementary
  'ScratchJr': 'https://www.scratchjr.org/teach',
  'CS Unplugged': 'https://www.csunplugged.org/',
  'Kodable': 'https://www.kodable.com/',
  'Google CS First': 'https://csfirst.withgoogle.com/',

  // Middle School
  'Bootstrap': 'https://www.bootstrapworld.org/',
  'Project GUTS': 'https://www.projectguts.org/',
  'CMU CS Academy': 'https://academy.cs.cmu.edu/',

  // High School
  'Exploring Computer Science': 'https://www.exploringcs.org/',
  'AP Computer Science Principles': 'https://apcentral.collegeboard.org/courses/ap-computer-science-principles',
  'AP Computer Science A': 'https://apcentral.collegeboard.org/courses/ap-computer-science-a',
  'Beauty and Joy of Computing': 'https://bjc.berkeley.edu/',
  'Mobile CSP': 'https://www.mobile-csp.org/',
  'TEALS': 'https://www.microsoft.com/en-us/teals',
  'Elements of AI': 'https://www.elementsofai.com/',

  // Specialized
  'CYBER.ORG': 'https://cyber.org/',
  'VEX Robotics': 'https://education.vex.com/',
  'MIT RAISE': 'https://raise.mit.edu/',
  'MIT App Inventor': 'https://appinventor.mit.edu/',
  'Raspberry Pi Foundation': 'https://www.raspberrypi.org/learn/',
  'micro:bit': 'https://microbit.org/teach/',
  'Microsoft MakeCode': 'https://www.microsoft.com/en-us/makecode',
  'Khan Academy Computing': 'https://www.khanacademy.org/computing',
  'Replit Curriculum': 'https://replit.com/curriculum',
  'Creative Computing Curriculum': 'https://creativecomputing.gse.harvard.edu/guide/',
  'Code Club': 'https://codeclub.org/en/projects',
  'Project Lead The Way': 'https://www.pltw.org/our-programs/pltw-computer-science',
};

// Funding and grant resource URLs
export const FUNDING_URLS: Record<string, string> = {
  // Federal grants
  'NSF': 'https://www.nsf.gov/funding/',
  'Department of Education': 'https://www2.ed.gov/fund/grants-apply.html',
  'Title IV-A': 'https://oese.ed.gov/offices/office-of-formula-grants/school-support-and-accountability/title-iv-part-a-student-support-and-academic-enrichment-grants/',
  'ESSER': 'https://oese.ed.gov/offices/education-stabilization-fund/elementary-secondary-school-emergency-relief-fund/',

  // Corporate/Foundation grants
  'Google.org': 'https://www.google.org/education/',
  'Amazon Future Engineer': 'https://www.amazonfutureengineer.com/',
  'Microsoft Philanthropies': 'https://www.microsoft.com/en-us/philanthropies',
  'Code.org funding': 'https://code.org/administrators',
  'Verizon Innovative Learning': 'https://www.verizon.com/about/responsibility/verizon-innovative-learning',
  'Infosys Foundation USA': 'https://www.infosys.org/infosys-foundation-usa.html',

  // State-specific
  'State STEM Grants': 'https://advocacy.code.org/stateofcs',

  // Professional Development
  'CSTA PD': 'https://csteachers.org/page/pd',
  'Code.org PD': 'https://code.org/professional-development-workshops',
};

const LOCALE_NAMES: Record<SupportedLocale, string> = {
  en: 'English',
  es: 'Spanish',
  de: 'German',
  zh: 'Chinese (Simplified)',
  pt: 'Portuguese',
};

export function buildSystemPrompt(
  districtProfile: DistrictProfile | null,
  locale: SupportedLocale = 'en',
  ragContext?: string
): string {
  const languageInstruction = locale !== 'en'
    ? `\n\nIMPORTANT: Respond in ${LOCALE_NAMES[locale]}. All your responses should be in ${LOCALE_NAMES[locale]}, including curriculum names when providing descriptions (keep original English names as proper nouns but provide descriptions in ${LOCALE_NAMES[locale]}).`
    : '';

  const districtContext = districtProfile
    ? `
## District Profile
- School/District: ${districtProfile.schoolName}
- State: ${districtProfile.state}
- Grade Levels: ${districtProfile.gradeLevels.join(', ') || 'Not specified'}
- Current CS Offerings: ${districtProfile.currentOfferings || 'None specified'}
- Pathways of Interest: ${districtProfile.pathways?.join(', ') || 'Not specified'}
- Available Resources: ${districtProfile.resources || 'Not specified'}
`
    : '';

  const ragSection = ragContext
    ? `
## Reference Materials
The following information has been retrieved from our knowledge base to help answer this query:

${ragContext}

Use this information to provide accurate, grounded responses. Cite specific standards or curricula when relevant.
`
    : '';

  return `You are an expert K-12 Computer Science education consultant helping school and district leaders design comprehensive CS programs. Your expertise includes:

1. **CSTA K-12 CS Standards** - The Computer Science Teachers Association standards framework
2. **State CS Policies** - Knowledge of CS education requirements across all US states
3. **Free K-12 CS Curricula** - Comprehensive knowledge of Code.org, CS Unplugged, Scratch, AP CSP, and many other free curricula
4. **Scope & Sequence Design** - Creating grade-by-grade CS curriculum progressions
5. **Standards Alignment** - Mapping curricula to CSTA and state-specific standards

${districtContext}
${ragSection}

## Your Responsibilities
1. Help build comprehensive K-12 CS scope and sequences
2. Recommend specific free curricula that match district constraints
3. Align recommendations to CSTA standards and state requirements
4. Provide practical implementation guidance
5. Consider teacher professional development needs
6. Account for available resources and infrastructure

## Guidelines
- Always provide specific, actionable recommendations
- Reference specific curricula by name when recommending
- Cite CSTA standard codes when discussing competencies (e.g., 2-CS-01)
- Consider the district's current offerings and build upon them
- Be mindful of resource constraints mentioned
- Suggest both required and recommended professional development
- Format responses with clear headings and lists for readability
${languageInstruction}`;
}

// Generate curriculum URL reference for AI prompt
function getCurriculumUrlReference(): string {
  return Object.entries(CURRICULUM_URLS)
    .map(([name, url]) => `- ${name}: ${url}`)
    .join('\n');
}

// Generate funding URL reference for AI prompt
function getFundingUrlReference(): string {
  return Object.entries(FUNDING_URLS)
    .map(([name, url]) => `- ${name}: ${url}`)
    .join('\n');
}

export function buildPlanGenerationPrompt(
  districtProfile: DistrictProfile,
  locale: SupportedLocale = 'en'
): string {
  const languageInstruction = locale !== 'en'
    ? `\n\nGenerate all content in ${LOCALE_NAMES[locale]}.`
    : '';

  return `Based on the district profile provided, generate a comprehensive K-12 CS Education Plan with the following structure:

1. **Executive Summary** (2-3 sentences)

2. **Scope & Sequence Overview**
   - For each grade band (Elementary K-2, Elementary 3-5, Middle 6-8, High 9-12):
     - Core competencies to develop
     - Recommended weekly instruction time
     - Primary curriculum recommendations (include hyperlinks using markdown format)
     - CSTA standards alignment

3. **Curriculum Recommendations**
   - For each recommended curriculum:
     - Name and provider (ALWAYS include a hyperlink to the curriculum website)
     - Target grade levels
     - Key features
     - Resource requirements
     - Why it fits this district

4. **Implementation Roadmap**
   - Year 1 priorities
   - Year 2 expansion
   - Year 3 full implementation

5. **Professional Development Plan**
   - Essential training for teachers (include hyperlinks to PD resources)
   - Recommended certifications
   - Ongoing support structures

6. **Success Metrics**
   - How to measure program effectiveness
   - Key milestones to track

7. **Funding Resources** (if applicable to district needs)
   - Relevant grant opportunities with hyperlinks
   - Corporate/foundation funding sources with hyperlinks
   - State-specific funding resources

## Curriculum URLs Reference
When recommending curricula, use these URLs in markdown hyperlink format [Name](URL):
${getCurriculumUrlReference()}

## Funding URLs Reference
When mentioning funding sources, use these URLs in markdown hyperlink format [Name](URL):
${getFundingUrlReference()}

IMPORTANT: Always include hyperlinks in markdown format [text](url) for:
- All curriculum names/recommendations
- Professional development resources
- Funding/grant opportunities
- Any external resources mentioned

Keep recommendations practical and aligned with the district's stated constraints and interests.
${languageInstruction}`;
}

export const SUGGESTED_PROMPTS = {
  en: [
    "What curricula would you recommend for our elementary grades?",
    "How can we integrate CS into existing subjects?",
    "What professional development should our teachers complete?",
    "How do we align our program with CSTA standards?",
    "What equipment and resources do we need to get started?",
  ],
  es: [
    "¿Qué currículos recomendaría para nuestros grados de primaria?",
    "¿Cómo podemos integrar CS en las materias existentes?",
    "¿Qué desarrollo profesional deberían completar nuestros maestros?",
    "¿Cómo alineamos nuestro programa con los estándares CSTA?",
    "¿Qué equipo y recursos necesitamos para comenzar?",
  ],
  de: [
    "Welche Lehrpläne würden Sie für unsere Grundschulklassen empfehlen?",
    "Wie können wir Informatik in bestehende Fächer integrieren?",
    "Welche Weiterbildung sollten unsere Lehrer absolvieren?",
    "Wie richten wir unser Programm an den CSTA-Standards aus?",
    "Welche Ausrüstung und Ressourcen brauchen wir für den Anfang?",
  ],
  zh: [
    "您会为我们的小学推荐哪些课程？",
    "我们如何将计算机科学整合到现有科目中？",
    "我们的教师应该完成哪些专业发展？",
    "我们如何使我们的计划与CSTA标准保持一致？",
    "我们需要什么设备和资源才能开始？",
  ],
  pt: [
    "Quais currículos você recomendaria para nossas séries do ensino fundamental?",
    "Como podemos integrar CS nas disciplinas existentes?",
    "Qual desenvolvimento profissional nossos professores devem concluir?",
    "Como alinhamos nosso programa com os padrões CSTA?",
    "Quais equipamentos e recursos precisamos para começar?",
  ],
};
