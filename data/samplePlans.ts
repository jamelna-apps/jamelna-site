/**
 * Sample CS Education Plans for different school contexts
 * Showcases what the AI planner can generate for various school types
 */

export interface SamplePlan {
  id: string;
  profile: {
    schoolName: string;
    location: string;
    type: 'urban' | 'suburban' | 'rural';
    resources: 'high' | 'moderate' | 'limited';
    gradeLevels: string[];
    studentCount: string;
    highlights: string[];
  };
  plan: {
    executiveSummary: string;
    scopeSequence: {
      gradeLevel: string;
      focus: string;
      curricula: string[];
      timeAllocation: string;
    }[];
    subjectIntegration: {
      subject: string;
      activities: string[];
      standards: string[];
    }[];
    staffGuidance: {
      role: string;
      responsibilities: string[];
    }[];
    pathways: {
      name: string;
      progression: string[];
    }[];
    implementation: {
      phase: string;
      timeline: string;
      actions: string[];
    }[];
    fundingRecommendations: string[];
    successMetrics: string[];
  };
}

export const samplePlans: SamplePlan[] = [
  // 1. Urban High-Resource District
  {
    id: 'urban-high-resource',
    profile: {
      schoolName: 'Metro STEM Academy',
      location: 'Chicago, IL',
      type: 'urban',
      resources: 'high',
      gradeLevels: ['K-12'],
      studentCount: '2,400 students',
      highlights: [
        '1:1 Chromebooks all grades',
        'Dedicated CS teacher per building',
        '$50,000 annual CS budget',
        'Strong tech industry partnerships',
      ],
    },
    plan: {
      executiveSummary:
        'Metro STEM Academy is positioned to become a regional leader in K-12 CS education. With strong existing infrastructure and industry partnerships, the focus should be on developing comprehensive pathway programs leading to AP CS and industry certifications, while ensuring equitable access across all student populations.',
      scopeSequence: [
        {
          gradeLevel: 'K-2',
          focus: 'Computational Thinking Foundations',
          curricula: ['Code.org CS Fundamentals', 'ScratchJr', 'CS Unplugged'],
          timeAllocation: '45 min/week integrated + 1 hour/week dedicated',
        },
        {
          gradeLevel: '3-5',
          focus: 'Block-Based Programming & Digital Citizenship',
          curricula: ['Code.org CS Fundamentals', 'Scratch', 'Google CS First'],
          timeAllocation: '2 hours/week dedicated CS time',
        },
        {
          gradeLevel: '6-8',
          focus: 'App Development & Physical Computing',
          curricula: ['Code.org CS Discoveries', 'micro:bit', 'App Inventor'],
          timeAllocation: 'Semester-long CS course + STEM electives',
        },
        {
          gradeLevel: '9-12',
          focus: 'Multiple Pathways to Industry Certification',
          curricula: ['AP CS Principles', 'AP CS A', 'AWS Cloud Practitioner', 'CompTIA IT Fundamentals'],
          timeAllocation: 'Full course sequence with internship opportunities',
        },
      ],
      subjectIntegration: [
        {
          subject: 'Mathematics',
          activities: [
            'Use Desmos for graphing and function exploration',
            'Bootstrap:Algebra for algebraic thinking through coding',
            'Data analysis projects with Python in statistics',
          ],
          standards: ['CSTA 2-DA-08', 'CSTA 3A-DA-12'],
        },
        {
          subject: 'Science',
          activities: [
            'Sensor data collection with micro:bit in labs',
            'Computational modeling of ecosystems',
            'Physics simulations with Python',
          ],
          standards: ['CSTA 2-DA-07', 'CSTA 3A-AP-18'],
        },
        {
          subject: 'English Language Arts',
          activities: [
            'Interactive storytelling with Scratch',
            'Digital journalism and multimedia projects',
            'Analyzing AI bias in language models',
          ],
          standards: ['CSTA 2-IC-21', 'CSTA 3A-IC-25'],
        },
      ],
      staffGuidance: [
        {
          role: 'Dedicated CS Teachers',
          responsibilities: [
            'Lead all CS courses and pathway development',
            'Coordinate with classroom teachers for integration',
            'Manage industry partnership programs',
            'Coach CS competition teams',
          ],
        },
        {
          role: 'Classroom Teachers',
          responsibilities: [
            'Integrate CS concepts into subject areas',
            'Collaborate on cross-curricular projects',
            'Identify students for CS pathway recruitment',
          ],
        },
        {
          role: 'Librarians/Media Specialists',
          responsibilities: [
            'Curate CS resources and maintain makerspace',
            'Support digital citizenship instruction',
            'Host coding clubs and Hour of Code events',
          ],
        },
      ],
      pathways: [
        {
          name: 'Software Development',
          progression: [
            'K-5: Block-based programming fundamentals',
            '6-8: CS Discoveries + App Inventor projects',
            '9-10: AP CS Principles',
            '11-12: AP CS A + Internship',
          ],
        },
        {
          name: 'Cybersecurity',
          progression: [
            'K-5: Digital citizenship foundations',
            '6-8: CyberStart challenges',
            '9-10: Cybersecurity Essentials',
            '11-12: CompTIA Security+ preparation',
          ],
        },
        {
          name: 'AI & Data Science',
          progression: [
            'K-5: AI literacy with Machine Learning for Kids',
            '6-8: Data exploration with CODAP',
            '9-10: AI for All curriculum',
            '11-12: Python for Data Science + Capstone project',
          ],
        },
      ],
      implementation: [
        {
          phase: 'Phase 1: Foundation',
          timeline: 'Year 1',
          actions: [
            'Hire additional CS specialist for middle school',
            'Establish industry advisory board',
            'Launch AP CS Principles pilot',
            'Train 20 teachers in CS integration',
          ],
        },
        {
          phase: 'Phase 2: Expansion',
          timeline: 'Years 2-3',
          actions: [
            'Add AP CS A and cybersecurity pathway',
            'Expand industry internship program',
            'Implement CS integration across all subjects',
            'Establish student-run tech support team',
          ],
        },
        {
          phase: 'Phase 3: Excellence',
          timeline: 'Years 4-5',
          actions: [
            'Achieve 50% student participation in CS pathway',
            'Launch dual enrollment program with local university',
            'Host regional CS education conference',
            'Establish peer district mentorship program',
          ],
        },
      ],
      fundingRecommendations: [
        'Apply for NSF CSforAll RPP grant ($1M+) for regional partnership',
        'Leverage ESSER funds for initial infrastructure',
        'Partner with tech companies for equipment donations',
        'Apply for Google.org CS education grants',
        'Establish corporate sponsorship program',
      ],
      successMetrics: [
        '80% of students complete CS course by graduation',
        '50% AP CS exam pass rate within 3 years',
        '30% of underrepresented students in advanced CS courses',
        '20 industry partnerships established',
        '100% of teachers complete CS integration training',
      ],
    },
  },

  // 2. Suburban Moderate-Resource District
  {
    id: 'suburban-moderate',
    profile: {
      schoolName: 'Riverside Unified School District',
      location: 'Austin, TX',
      type: 'suburban',
      resources: 'moderate',
      gradeLevels: ['K-12'],
      studentCount: '8,500 students across 12 schools',
      highlights: [
        '1:1 devices in grades 3-12',
        'No dedicated CS teachers yet',
        '$15,000 annual budget for CS',
        'Strong PTO support',
      ],
    },
    plan: {
      executiveSummary:
        'Riverside USD can build a sustainable CS program by training existing teachers and leveraging free curricula. The phased approach focuses on elementary integration first, then expanding middle and high school offerings. The strong PTO support and Texas state CS requirements create urgency and opportunity.',
      scopeSequence: [
        {
          gradeLevel: 'K-2',
          focus: 'Unplugged Activities & Basic Sequencing',
          curricula: ['Code.org CS Fundamentals (Courses A-C)', 'CS Unplugged', 'Hello Ruby books'],
          timeAllocation: '30 min/week integrated into existing subjects',
        },
        {
          gradeLevel: '3-5',
          focus: 'Block Programming & Computational Thinking',
          curricula: ['Code.org CS Fundamentals (Courses D-F)', 'Scratch', 'Typing.com'],
          timeAllocation: '45 min/week dedicated + integration in math/science',
        },
        {
          gradeLevel: '6-8',
          focus: 'CS Explorations & Digital Literacy',
          curricula: ['Code.org CS Discoveries (Units 1-4)', 'Google Applied Digital Skills'],
          timeAllocation: 'One semester required CS course',
        },
        {
          gradeLevel: '9-12',
          focus: 'CS Principles & Career Exploration',
          curricula: ['Code.org CS Principles', 'CMU CS Academy', 'Career exploration modules'],
          timeAllocation: 'One-year elective course',
        },
      ],
      subjectIntegration: [
        {
          subject: 'Mathematics',
          activities: [
            'Use Scratch for geometry and coordinate plane lessons',
            'Spreadsheet projects for data analysis',
            'Algorithm visualization for problem-solving',
          ],
          standards: ['CSTA 1B-AP-10', 'CSTA 2-AP-13'],
        },
        {
          subject: 'Science',
          activities: [
            'Data collection apps for science fair projects',
            'Simulation games for ecosystem modeling',
            'Weather data analysis with spreadsheets',
          ],
          standards: ['CSTA 1B-DA-06', 'CSTA 2-DA-08'],
        },
        {
          subject: 'Social Studies',
          activities: [
            'Digital citizenship in current events discussions',
            'Geographic data visualization projects',
            'Research on technology impact on society',
          ],
          standards: ['CSTA 1B-IC-18', 'CSTA 2-IC-21'],
        },
      ],
      staffGuidance: [
        {
          role: 'Elementary Teachers',
          responsibilities: [
            'Complete Code.org CS Fundamentals training (free, 6-hour workshop)',
            'Integrate 30-45 minutes of CS weekly',
            'Participate in monthly CS integration PLCs',
          ],
        },
        {
          role: 'Middle School Math/Science Teachers',
          responsibilities: [
            'Complete CS Discoveries training (free, 20-hour summer workshop)',
            'Teach semester CS course on rotation',
            'Integrate CS projects into core subjects',
          ],
        },
        {
          role: 'High School CTE/Math Teachers',
          responsibilities: [
            'Obtain CS certification through state alternative pathway',
            'Teach CS Principles as elective',
            'Connect students to industry resources',
          ],
        },
        {
          role: 'Counselors',
          responsibilities: [
            'Include CS courses in college planning discussions',
            'Promote CS to underrepresented students',
            'Share CS career pathway information',
          ],
        },
      ],
      pathways: [
        {
          name: 'General CS Pathway',
          progression: [
            'K-5: CS Fundamentals integration',
            '6: CS Discoveries Semester 1',
            '7-8: CS elective or club participation',
            '9-10: CS Principles',
            '11-12: Advanced elective or dual enrollment',
          ],
        },
        {
          name: 'Web Development Focus',
          progression: [
            '6-8: Web design basics in CS Discoveries',
            '9-10: HTML/CSS/JavaScript course',
            '11-12: Full-stack web development',
          ],
        },
      ],
      implementation: [
        {
          phase: 'Phase 1: Elementary Launch',
          timeline: 'Year 1',
          actions: [
            'Train all K-5 teachers in Code.org CS Fundamentals',
            'Establish monthly CS integration PLC',
            'Launch Hour of Code district-wide event',
            'Apply for Code.org regional partner support',
          ],
        },
        {
          phase: 'Phase 2: Middle School Rollout',
          timeline: 'Year 2',
          actions: [
            'Train 6 middle school teachers in CS Discoveries',
            'Pilot required semester CS course at 2 schools',
            'Start after-school coding clubs',
            'Expand to all middle schools',
          ],
        },
        {
          phase: 'Phase 3: High School Implementation',
          timeline: 'Years 3-4',
          actions: [
            'Support 2 teachers obtaining CS certification',
            'Launch CS Principles at all high schools',
            'Establish CS student ambassador program',
            'Develop dual enrollment partnership',
          ],
        },
      ],
      fundingRecommendations: [
        'Apply for Texas TEA CS grant funding (up to $25K)',
        'Use Title II funds for teacher training',
        'Leverage PTO for coding club materials and competitions',
        'Apply for DonorsChoose grants for classroom materials',
        'Partner with local tech companies for volunteer hours',
      ],
      successMetrics: [
        '100% of elementary teachers trained in 2 years',
        '90% of middle schoolers complete semester CS course',
        'CS Principles offered at all high schools by Year 3',
        'Equal gender representation in high school CS',
        '25% increase in students expressing CS career interest',
      ],
    },
  },

  // 3. Rural Limited-Resource School
  {
    id: 'rural-limited',
    profile: {
      schoolName: 'Prairie Valley K-12 School',
      location: 'Broken Bow, NE',
      type: 'rural',
      resources: 'limited',
      gradeLevels: ['K-12'],
      studentCount: '340 students',
      highlights: [
        'Shared computer lab (25 devices)',
        'No dedicated CS funding',
        'Limited internet bandwidth',
        'Multi-grade classrooms',
      ],
    },
    plan: {
      executiveSummary:
        'Prairie Valley can build an effective CS program using unplugged activities, free resources, and creative scheduling. The small school environment enables personalized learning and cross-grade collaboration. Focus on offline-capable tools and activities that work with limited technology.',
      scopeSequence: [
        {
          gradeLevel: 'K-2',
          focus: 'Computational Thinking Through Play',
          curricula: ['CS Unplugged', 'Robot Turtles board game', 'Kodable (offline mode)'],
          timeAllocation: '20 min/day integrated into morning meeting or math',
        },
        {
          gradeLevel: '3-5',
          focus: 'Block Programming & Problem Solving',
          curricula: ['Code.org offline activities', 'Scratch offline version', 'Pencil Code'],
          timeAllocation: '30 min twice weekly (computer lab rotation)',
        },
        {
          gradeLevel: '6-8',
          focus: 'App Design & Physical Computing',
          curricula: ['CS Unplugged advanced', 'MIT App Inventor (offline projects)', 'micro:bit (5 classroom set)'],
          timeAllocation: '1 hour twice weekly in combined class',
        },
        {
          gradeLevel: '9-12',
          focus: 'CS Principles & Career Connections',
          curricula: ['CMU CS Academy (works offline)', 'CodeHS free tier', 'Virtual job shadows'],
          timeAllocation: 'Year-long elective course (combined grades)',
        },
      ],
      subjectIntegration: [
        {
          subject: 'Mathematics',
          activities: [
            'Algorithm design with word problems',
            'Binary counting and number systems',
            'Spreadsheet math projects',
          ],
          standards: ['CSTA 1A-AP-08', 'CSTA 1B-DA-06'],
        },
        {
          subject: 'Science/Agriculture',
          activities: [
            'Data collection for farm and weather tracking',
            'Simple sensor projects with micro:bit',
            'Computational thinking in scientific method',
          ],
          standards: ['CSTA 1B-DA-07', 'CSTA 2-DA-08'],
        },
        {
          subject: 'English Language Arts',
          activities: [
            'Flowchart storytelling and narrative design',
            'Digital portfolio creation',
            'Technical writing for procedures',
          ],
          standards: ['CSTA 1B-AP-11', 'CSTA 2-AP-17'],
        },
      ],
      staffGuidance: [
        {
          role: 'K-6 Teacher (Multi-grade)',
          responsibilities: [
            'Complete free CS Unplugged training (self-paced, 3 hours)',
            'Integrate computational thinking into daily instruction',
            'Facilitate peer tutoring between grade levels',
            'Lead monthly "CS Day" activities',
          ],
        },
        {
          role: '7-12 Math/Science Teacher',
          responsibilities: [
            'Complete Nebraska CS certification pathway',
            'Teach combined-grade CS elective',
            'Integrate CS into math and science courses',
            'Connect students with virtual mentors',
          ],
        },
        {
          role: 'School Librarian (Part-time)',
          responsibilities: [
            'Manage computer lab schedule for CS activities',
            'Curate offline CS resources and books',
            'Coordinate Hour of Code event',
          ],
        },
      ],
      pathways: [
        {
          name: 'Ag-Tech Focus',
          progression: [
            'K-5: Computational thinking and basic coding',
            '6-8: Data collection and sensor projects',
            '9-10: Precision agriculture technology',
            '11-12: CS + Agriculture dual pathway',
          ],
        },
        {
          name: 'General CS Pathway',
          progression: [
            'K-5: CS Unplugged and block coding',
            '6-8: App design and physical computing',
            '9-12: CS Principles + Career exploration',
          ],
        },
      ],
      implementation: [
        {
          phase: 'Phase 1: Foundation Building',
          timeline: 'Year 1',
          actions: [
            'Purchase 5 micro:bit classroom kit ($150)',
            'Download offline versions of Code.org and Scratch',
            'Train both teachers in CS Unplugged methods',
            'Establish virtual mentorship with Nebraska Extension',
          ],
        },
        {
          phase: 'Phase 2: Program Development',
          timeline: 'Year 2',
          actions: [
            'Launch combined 9-12 CS elective',
            'Apply for Nebraska CS incentive grant ($5,000)',
            'Establish partnership with community college',
            'Host community showcase of student projects',
          ],
        },
        {
          phase: 'Phase 3: Sustainability',
          timeline: 'Year 3+',
          actions: [
            'Pursue dual enrollment agreement',
            'Develop ag-tech specialization',
            'Share resources with regional schools',
            'Establish annual CS competition',
          ],
        },
      ],
      fundingRecommendations: [
        'Apply for Nebraska Computer Science Incentive Grant ($5,000)',
        'Apply for USDA Rural Development grants for ag-tech',
        'Request micro:bit donation from micro:bit Educational Foundation',
        'DonorsChoose for offline coding materials',
        'Local FFA/4-H partnership for ag-tech projects',
      ],
      successMetrics: [
        'All students K-8 receive weekly CS instruction',
        '50% of high schoolers enroll in CS elective',
        'Establish 5 virtual industry mentor relationships',
        'Student projects presented at county fair',
        'Teacher earns CS certification within 2 years',
      ],
    },
  },

  // 4. Urban Title I School (Limited Resources)
  {
    id: 'urban-title1',
    profile: {
      schoolName: 'MLK Community Academy',
      location: 'Detroit, MI',
      type: 'urban',
      resources: 'limited',
      gradeLevels: ['K-8'],
      studentCount: '450 students',
      highlights: [
        '85% free/reduced lunch',
        'Shared Chromebook carts (1:3 ratio)',
        'Strong community partnerships',
        'After-school program',
      ],
    },
    plan: {
      executiveSummary:
        'MLK Community Academy can leverage free resources, community partnerships, and the strong after-school program to provide equitable CS education. Focus on culturally relevant computing and connecting CS to community problem-solving. The limited devices require creative scheduling and unplugged activities.',
      scopeSequence: [
        {
          gradeLevel: 'K-2',
          focus: 'Culturally Relevant Computational Thinking',
          curricula: ['CS Unplugged', 'ScratchJr (rotation schedule)', 'Coding with Culture activities'],
          timeAllocation: '20 min daily unplugged + 30 min weekly with devices',
        },
        {
          gradeLevel: '3-5',
          focus: 'Digital Storytelling & Community Connection',
          curricula: ['Code.org CS Fundamentals', 'Scratch community projects', 'Google CS First storytelling'],
          timeAllocation: '45 min twice weekly (device rotation)',
        },
        {
          gradeLevel: '6-8',
          focus: 'App Development for Community Impact',
          curricula: ['Code.org CS Discoveries', 'App Inventor community projects', 'Digital citizenship'],
          timeAllocation: 'Daily CS class (part of STEM block)',
        },
      ],
      subjectIntegration: [
        {
          subject: 'Mathematics',
          activities: [
            'Culturally relevant math through coding games',
            'Data analysis of community issues',
            'Financial literacy spreadsheet projects',
          ],
          standards: ['CSTA 1B-DA-06', 'CSTA 2-DA-08'],
        },
        {
          subject: 'Social Studies',
          activities: [
            'Mapping community resources with data visualization',
            'Digital storytelling of family/community history',
            'Analyzing technology access equity',
          ],
          standards: ['CSTA 1B-IC-18', 'CSTA 2-IC-21'],
        },
        {
          subject: 'English Language Arts',
          activities: [
            'Interactive storytelling with Scratch',
            'Podcasting and digital journalism',
            'Writing about technology and society',
          ],
          standards: ['CSTA 1B-AP-11', 'CSTA 2-IC-22'],
        },
      ],
      staffGuidance: [
        {
          role: 'Classroom Teachers',
          responsibilities: [
            'Complete Code.org training (substitute coverage provided)',
            'Integrate CS into content areas',
            'Identify and support students for CS enrichment',
            'Connect CS to culturally relevant themes',
          ],
        },
        {
          role: 'After-School Coordinator',
          responsibilities: [
            'Lead coding club 3 days/week',
            'Coordinate community volunteer mentors',
            'Organize family coding nights',
            'Manage competition team participation',
          ],
        },
        {
          role: 'Community Partners',
          responsibilities: [
            'Provide volunteer mentors for after-school program',
            'Host field trips to tech workplaces',
            'Support family digital literacy workshops',
            'Sponsor competition participation',
          ],
        },
      ],
      pathways: [
        {
          name: 'Community Tech Pathway',
          progression: [
            'K-2: Computational thinking and digital citizenship',
            '3-5: Digital storytelling and basic programming',
            '6-8: App development for community impact',
            'After-school: Advanced projects and competitions',
          ],
        },
      ],
      implementation: [
        {
          phase: 'Phase 1: After-School Launch',
          timeline: 'Semester 1',
          actions: [
            'Launch after-school coding club (20 students)',
            'Recruit 5 community volunteer mentors',
            'Partner with local tech company for field trip',
            'Host family coding night event',
          ],
        },
        {
          phase: 'Phase 2: Classroom Integration',
          timeline: 'Year 1',
          actions: [
            'Train all K-5 teachers in Code.org',
            'Develop device sharing schedule',
            'Integrate CS into math and ELA standards',
            'Establish peer tutoring program',
          ],
        },
        {
          phase: 'Phase 3: Middle School Focus',
          timeline: 'Year 2',
          actions: [
            'Add dedicated middle school CS class',
            'Launch community app development projects',
            'Participate in regional CS competition',
            'Host community showcase event',
          ],
        },
      ],
      fundingRecommendations: [
        'Apply for CSforAll SCRIPT grant ($75K)',
        'Use Title I funds for teacher training and devices',
        'Partner with local tech companies for equipment donations',
        'Apply for Black Girls CODE partnership',
        'Community foundation grants for after-school expansion',
      ],
      successMetrics: [
        '100% of students receive CS instruction by Year 2',
        'After-school coding club grows to 50 students',
        'Equal participation across genders and grades',
        'Students present community impact projects annually',
        '3 students advance to regional competitions',
      ],
    },
  },

  // 5. Suburban High-Resource Elementary
  {
    id: 'suburban-high-elementary',
    profile: {
      schoolName: 'Maple Grove Elementary',
      location: 'Palo Alto, CA',
      type: 'suburban',
      resources: 'high',
      gradeLevels: ['K-5'],
      studentCount: '650 students',
      highlights: [
        '1:1 iPads all grades',
        'Part-time STEM specialist',
        '$25,000 annual CS budget',
        'Active makerspace',
        'Parent volunteer tech support',
      ],
    },
    plan: {
      executiveSummary:
        'Maple Grove Elementary is positioned to provide exemplary early CS education. With strong resources and parent support, the focus should be on developmentally appropriate computational thinking, equitable access within the school, and establishing foundation skills that will serve students throughout their K-12 journey.',
      scopeSequence: [
        {
          gradeLevel: 'K',
          focus: 'Pre-Coding & Sequencing',
          curricula: ['ScratchJr', 'Kodable', 'Bee-Bot robots', 'CS Unplugged'],
          timeAllocation: '20 min daily during centers',
        },
        {
          gradeLevel: '1-2',
          focus: 'Block-Based Programming Foundations',
          curricula: ['Code.org Course A-C', 'ScratchJr advanced', 'Ozobot'],
          timeAllocation: '30 min daily + weekly STEM lab',
        },
        {
          gradeLevel: '3-4',
          focus: 'Creative Computing & Digital Citizenship',
          curricula: ['Scratch', 'Code.org Course D-E', 'Google CS First'],
          timeAllocation: '45 min daily + weekly STEM lab',
        },
        {
          gradeLevel: '5',
          focus: 'Physical Computing & Capstone Projects',
          curricula: ['Scratch advanced', 'micro:bit', 'Makey Makey', 'CS Discoveries preview'],
          timeAllocation: '1 hour daily + capstone project quarter',
        },
      ],
      subjectIntegration: [
        {
          subject: 'Mathematics',
          activities: [
            'Geometry with Scratch coordinate plane',
            'Fraction games with Scratch',
            'Data collection and graphing projects',
            'Estimation and measurement with robots',
          ],
          standards: ['CSTA 1A-AP-08', 'CSTA 1B-DA-06'],
        },
        {
          subject: 'Science',
          activities: [
            'Animal habitat simulations in Scratch',
            'Weather data collection with sensors',
            'Plant growth experiments with data logging',
            'Simple machines with physical computing',
          ],
          standards: ['CSTA 1A-DA-05', 'CSTA 1B-DA-07'],
        },
        {
          subject: 'Language Arts',
          activities: [
            'Interactive storytelling projects',
            'Digital book reports with Scratch',
            'Vocabulary games and flashcard apps',
            'Collaborative writing with peer feedback',
          ],
          standards: ['CSTA 1A-AP-11', 'CSTA 1B-AP-12'],
        },
        {
          subject: 'Art',
          activities: [
            'Digital art with Scratch pen tool',
            'Animation projects',
            'Interactive art installations',
            'Generative art exploration',
          ],
          standards: ['CSTA 1A-AP-10', 'CSTA 1B-AP-15'],
        },
      ],
      staffGuidance: [
        {
          role: 'STEM Specialist',
          responsibilities: [
            'Lead weekly STEM lab sessions for all grades',
            'Coordinate curriculum across classrooms',
            'Manage makerspace and equipment',
            'Train classroom teachers in CS integration',
            'Lead enrichment and competition teams',
          ],
        },
        {
          role: 'Classroom Teachers',
          responsibilities: [
            'Integrate CS into daily instruction',
            'Co-teach during STEM lab time',
            'Reinforce computational thinking vocabulary',
            'Communicate with families about CS learning',
          ],
        },
        {
          role: 'Parent Volunteers',
          responsibilities: [
            'Assist during coding activities',
            'Lead lunch-time coding clubs',
            'Support Hour of Code events',
            'Help with makerspace supervision',
          ],
        },
        {
          role: 'Librarian',
          responsibilities: [
            'Curate CS-related books and resources',
            'Teach digital citizenship and research skills',
            'Support coding activities during library time',
            'Maintain digital resource access',
          ],
        },
      ],
      pathways: [
        {
          name: 'Foundation Pathway (All Students)',
          progression: [
            'K: Pre-coding with robots and sequencing',
            '1: Block-based introduction',
            '2: Creative projects with Scratch',
            '3: Problem-solving with code',
            '4: Collaborative coding projects',
            '5: Physical computing capstone',
          ],
        },
        {
          name: 'Enrichment Pathway',
          progression: [
            'Lunch coding club',
            'After-school robotics team',
            'Summer CS camp',
            'Competition participation (First LEGO League Jr.)',
          ],
        },
      ],
      implementation: [
        {
          phase: 'Phase 1: Standardization',
          timeline: 'Semester 1',
          actions: [
            'Align all classrooms to curriculum standards',
            'Train all classroom teachers in CS integration',
            'Establish weekly STEM lab schedule',
            'Launch parent volunteer training program',
          ],
        },
        {
          phase: 'Phase 2: Enhancement',
          timeline: 'Year 1',
          actions: [
            'Add physical computing to grades 4-5',
            'Launch First LEGO League Jr. team',
            'Develop cross-curricular project library',
            'Host parent education workshop series',
          ],
        },
        {
          phase: 'Phase 3: Excellence',
          timeline: 'Year 2+',
          actions: [
            'Develop student leadership program',
            'Create 5th grade capstone showcase',
            'Establish feeder pathway to middle school',
            'Share curriculum with district schools',
          ],
        },
      ],
      fundingRecommendations: [
        'PTO technology fund for equipment upgrades',
        'Apply for Google.org CS education grants',
        'Corporate sponsorship for robotics team',
        'District STEM initiative funding',
        'Local education foundation grants',
      ],
      successMetrics: [
        '100% of students meet grade-level CS standards',
        'All students complete capstone project in 5th grade',
        'Equal participation in enrichment activities by gender',
        '90% of 5th graders express interest in continued CS',
        'Parent satisfaction rating above 4.5/5',
      ],
    },
  },

  // 6. Rural Moderate-Resource High School
  {
    id: 'rural-moderate-high',
    profile: {
      schoolName: 'Mountain View High School',
      location: 'Bozeman, MT',
      type: 'rural',
      resources: 'moderate',
      gradeLevels: ['9-12'],
      studentCount: '400 students',
      highlights: [
        '1:1 Chromebooks',
        'One CTE teacher interested in CS',
        '$8,000 annual budget',
        'Strong outdoor/environmental focus',
        'Partnership with Montana State University',
      ],
    },
    plan: {
      executiveSummary:
        'Mountain View High School can leverage its environmental focus and university partnership to build a unique CS program. The pathway should connect CS to outdoor/environmental applications and leverage dual enrollment opportunities. Distance learning can supplement local offerings.',
      scopeSequence: [
        {
          gradeLevel: '9',
          focus: 'CS Foundations & Digital Literacy',
          curricula: ['Code.org CS Discoveries (semester)', 'Google Applied Digital Skills'],
          timeAllocation: 'One semester required course',
        },
        {
          gradeLevel: '10',
          focus: 'CS Principles & Applications',
          curricula: ['Code.org CS Principles', 'Environmental data projects'],
          timeAllocation: 'Year-long elective',
        },
        {
          gradeLevel: '11',
          focus: 'Applied Computing & Specialization',
          curricula: ['Python for Data Science', 'GIS and mapping', 'AP CS Principles (if demand)'],
          timeAllocation: 'Year-long elective + dual enrollment option',
        },
        {
          gradeLevel: '12',
          focus: 'Capstone & Career Preparation',
          curricula: ['Dual enrollment with MSU', 'Capstone project', 'Industry certifications'],
          timeAllocation: 'Dual enrollment + senior project',
        },
      ],
      subjectIntegration: [
        {
          subject: 'Environmental Science',
          activities: [
            'Sensor data collection for wildlife monitoring',
            'GIS mapping of local ecosystems',
            'Climate data analysis projects',
            'Citizen science data projects',
          ],
          standards: ['CSTA 3A-DA-11', 'CSTA 3A-DA-12'],
        },
        {
          subject: 'Mathematics',
          activities: [
            'Statistical analysis with Python',
            'Modeling population dynamics',
            'Data visualization projects',
            'Algorithm efficiency analysis',
          ],
          standards: ['CSTA 3A-AP-17', 'CSTA 3A-DA-11'],
        },
        {
          subject: 'Agriculture/CTE',
          activities: [
            'Precision agriculture technology',
            'Drone programming basics',
            'Farm data management systems',
            'AgTech career exploration',
          ],
          standards: ['CSTA 3A-AP-18', 'CSTA 3A-IC-24'],
        },
      ],
      staffGuidance: [
        {
          role: 'CTE Teacher (CS Lead)',
          responsibilities: [
            'Complete Montana CS certification (state-funded program)',
            'Teach all CS courses',
            'Coordinate dual enrollment with MSU',
            'Lead robotics/CS club',
            'Connect students with industry mentors',
          ],
        },
        {
          role: 'Science Teachers',
          responsibilities: [
            'Collaborate on data science integration',
            'Co-lead environmental computing projects',
            'Support cross-curricular CS activities',
          ],
        },
        {
          role: 'Math Teachers',
          responsibilities: [
            'Integrate computational thinking into algebra/statistics',
            'Support Python use in advanced math',
            'Identify students for CS recruitment',
          ],
        },
        {
          role: 'Counselor',
          responsibilities: [
            'Promote CS courses to all students',
            'Coordinate dual enrollment enrollment',
            'Share CS career information',
            'Track student pathways',
          ],
        },
      ],
      pathways: [
        {
          name: 'Environmental Computing',
          progression: [
            '9: CS Discoveries + intro to data collection',
            '10: CS Principles + GIS basics',
            '11: Data Science + environmental capstone',
            '12: Dual enrollment + research project',
          ],
        },
        {
          name: 'AgTech Pathway',
          progression: [
            '9: CS Discoveries',
            '10: CS Principles + precision ag intro',
            '11: Applied computing for agriculture',
            '12: Industry certification + internship',
          ],
        },
        {
          name: 'General CS/Software',
          progression: [
            '9: CS Discoveries',
            '10: CS Principles',
            '11: Python programming',
            '12: AP CS A (distance) or dual enrollment',
          ],
        },
      ],
      implementation: [
        {
          phase: 'Phase 1: Course Development',
          timeline: 'Year 1',
          actions: [
            'CTE teacher completes CS certification',
            'Launch required 9th grade CS semester',
            'Establish dual enrollment partnership with MSU',
            'Start after-school CS club',
          ],
        },
        {
          phase: 'Phase 2: Pathway Expansion',
          timeline: 'Year 2',
          actions: [
            'Add CS Principles elective',
            'Launch environmental computing projects',
            'Participate in statewide CS competitions',
            'Develop industry mentorship program',
          ],
        },
        {
          phase: 'Phase 3: Specialization',
          timeline: 'Year 3+',
          actions: [
            'Add advanced Python/Data Science course',
            'Establish AP CS A through Montana Digital Academy',
            'Launch senior capstone program',
            'Create regional rural CS network',
          ],
        },
      ],
      fundingRecommendations: [
        'Apply for Montana OPI CS Implementation grant ($10,000)',
        'Perkins CTE funding for CS courses',
        'NSF environmental education grants',
        'USDA rural development for ag-tech focus',
        'Local outdoor industry sponsorships',
      ],
      successMetrics: [
        '100% of freshmen complete CS semester by Year 2',
        '40% of students take additional CS elective',
        '20% participate in dual enrollment CS',
        'Environmental computing project presented at state fair',
        'Industry mentorship established for 50% of upperclassmen',
      ],
    },
  },
];

// Helper function to get plans by type
export function getPlansByType(type: 'urban' | 'suburban' | 'rural'): SamplePlan[] {
  return samplePlans.filter((plan) => plan.profile.type === type);
}

// Helper function to get plans by resource level
export function getPlansByResources(level: 'high' | 'moderate' | 'limited'): SamplePlan[] {
  return samplePlans.filter((plan) => plan.profile.resources === level);
}
