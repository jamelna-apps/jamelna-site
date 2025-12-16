/**
 * CSTA K-12 Computer Science Standards (2017)
 * Source: https://www.csteachers.org/page/standards
 *
 * Standards are organized by:
 * - Grade Band: K-2 (1A), 3-5 (1B), 6-8 (2), 9-10 (3A), 11-12 (3B)
 * - Concept Area: Computing Systems (CS), Networks (NI), Data and Analysis (DA),
 *                 Algorithms and Programming (AP), Impacts of Computing (IC)
 */

export interface CSTAStandard {
  id: string;
  code: string;
  gradeBand: 'K-2' | '3-5' | '6-8' | '9-10' | '11-12';
  conceptArea: 'CS' | 'NI' | 'DA' | 'AP' | 'IC';
  conceptAreaName: string;
  subconcept: string;
  practice: string;
  standardText: string;
  clarification?: string;
}

export const conceptAreas = {
  CS: 'Computing Systems',
  NI: 'Networks and the Internet',
  DA: 'Data and Analysis',
  AP: 'Algorithms and Programming',
  IC: 'Impacts of Computing',
};

export const gradeBands = {
  '1A': 'K-2',
  '1B': '3-5',
  '2': '6-8',
  '3A': '9-10',
  '3B': '11-12',
};

export const cstaStandards: CSTAStandard[] = [
  // K-2 (Grade Band 1A)
  // Computing Systems
  {
    id: '1a-cs-01',
    code: '1A-CS-01',
    gradeBand: 'K-2',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Devices',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Select and operate appropriate software to perform a variety of tasks, and recognize that users have different needs and preferences for the technology they use.',
  },
  {
    id: '1a-cs-02',
    code: '1A-CS-02',
    gradeBand: 'K-2',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Hardware and Software',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Use appropriate terminology in identifying and describing the function of common physical components of computing systems (hardware).',
  },
  {
    id: '1a-cs-03',
    code: '1A-CS-03',
    gradeBand: 'K-2',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Troubleshooting',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Describe basic hardware and software problems using accurate terminology.',
  },

  // Networks and the Internet
  {
    id: '1a-ni-04',
    code: '1A-NI-04',
    gradeBand: 'K-2',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Network Communication and Organization',
    practice: 'Communicating About Computing',
    standardText:
      'Explain what passwords are and why we use them, and use strong passwords to protect devices and information from unauthorized access.',
  },

  // Data and Analysis
  {
    id: '1a-da-05',
    code: '1A-DA-05',
    gradeBand: 'K-2',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Collection',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Store, copy, search, retrieve, modify, and delete information using a computing device and define the information stored as data.',
  },
  {
    id: '1a-da-06',
    code: '1A-DA-06',
    gradeBand: 'K-2',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Visualization and Transformation',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Collect and present the same data in various visual formats.',
  },
  {
    id: '1a-da-07',
    code: '1A-DA-07',
    gradeBand: 'K-2',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Inference and Models',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Identify and describe patterns in data visualizations, such as charts or graphs, to make predictions.',
  },

  // Algorithms and Programming
  {
    id: '1a-ap-08',
    code: '1A-AP-08',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Algorithms',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Model daily processes by creating and following algorithms (sets of step-by-step instructions) to complete tasks.',
  },
  {
    id: '1a-ap-09',
    code: '1A-AP-09',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Variables',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Model the way programs store and manipulate data by using numbers or other symbols to represent information.',
  },
  {
    id: '1a-ap-10',
    code: '1A-AP-10',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Control',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Develop programs with sequences and simple loops, to express ideas or address a problem.',
  },
  {
    id: '1a-ap-11',
    code: '1A-AP-11',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Decompose (break down) the steps needed to solve a problem into a precise sequence of instructions.',
  },
  {
    id: '1a-ap-12',
    code: '1A-AP-12',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Develop plans that describe a program\'s sequence of events, goals, and expected outcomes.',
  },
  {
    id: '1a-ap-13',
    code: '1A-AP-13',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Give attribution when using the ideas and creations of others while developing programs.',
  },
  {
    id: '1a-ap-14',
    code: '1A-AP-14',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Debug (identify and fix) errors in an algorithm or program that includes sequences and simple loops.',
  },
  {
    id: '1a-ap-15',
    code: '1A-AP-15',
    gradeBand: 'K-2',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Communicating About Computing',
    standardText:
      'Using correct terminology, describe steps taken and choices made during the iterative process of program development.',
  },

  // Impacts of Computing
  {
    id: '1a-ic-16',
    code: '1A-IC-16',
    gradeBand: 'K-2',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Culture',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Compare how people live and work before and after the implementation or adoption of new computing technology.',
  },
  {
    id: '1a-ic-17',
    code: '1A-IC-17',
    gradeBand: 'K-2',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Social Interactions',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Work respectfully and responsibly with others online.',
  },
  {
    id: '1a-ic-18',
    code: '1A-IC-18',
    gradeBand: 'K-2',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Keep login information private, and log off of devices appropriately.',
  },

  // 3-5 (Grade Band 1B)
  // Computing Systems
  {
    id: '1b-cs-01',
    code: '1B-CS-01',
    gradeBand: '3-5',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Devices',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Describe how internal and external parts of computing devices function to form a system.',
  },
  {
    id: '1b-cs-02',
    code: '1B-CS-02',
    gradeBand: '3-5',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Hardware and Software',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Model how computer hardware and software work together as a system to accomplish tasks.',
  },
  {
    id: '1b-cs-03',
    code: '1B-CS-03',
    gradeBand: '3-5',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Troubleshooting',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Determine potential solutions to solve simple hardware and software problems using common troubleshooting strategies.',
  },

  // Networks and the Internet
  {
    id: '1b-ni-04',
    code: '1B-NI-04',
    gradeBand: '3-5',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Network Communication and Organization',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Model how information is broken down into smaller pieces, transmitted as packets through multiple devices over networks and the Internet, and reassembled at the destination.',
  },
  {
    id: '1b-ni-05',
    code: '1B-NI-05',
    gradeBand: '3-5',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Discuss real-world cybersecurity problems and how personal information can be protected.',
  },

  // Data and Analysis
  {
    id: '1b-da-06',
    code: '1B-DA-06',
    gradeBand: '3-5',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Collection',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Organize and present collected data visually to highlight relationships and support a claim.',
  },
  {
    id: '1b-da-07',
    code: '1B-DA-07',
    gradeBand: '3-5',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Visualization and Transformation',
    practice: 'Communicating About Computing',
    standardText:
      'Use data to highlight or propose cause-and-effect relationships, predict outcomes, or communicate an idea.',
  },

  // Algorithms and Programming
  {
    id: '1b-ap-08',
    code: '1B-AP-08',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Algorithms',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Compare and refine multiple algorithms for the same task and determine which is the most appropriate.',
  },
  {
    id: '1b-ap-09',
    code: '1B-AP-09',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Variables',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Create programs that use variables to store and modify data.',
  },
  {
    id: '1b-ap-10',
    code: '1B-AP-10',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Control',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Create programs that include sequences, events, loops, and conditionals.',
  },
  {
    id: '1b-ap-11',
    code: '1B-AP-11',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Decompose (break down) problems into smaller, manageable subproblems to facilitate the program development process.',
  },
  {
    id: '1b-ap-12',
    code: '1B-AP-12',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Modify, remix, or incorporate portions of an existing program into one\'s own work, to develop something new or add more advanced features.',
  },
  {
    id: '1b-ap-13',
    code: '1B-AP-13',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Use an iterative process to plan the development of a program by including others\' perspectives and considering user preferences.',
  },
  {
    id: '1b-ap-14',
    code: '1B-AP-14',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Observe intellectual property rights and give appropriate attribution when creating or remixing programs.',
  },
  {
    id: '1b-ap-15',
    code: '1B-AP-15',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Test and debug (identify and fix errors) a program or algorithm to ensure it runs as intended.',
  },
  {
    id: '1b-ap-16',
    code: '1B-AP-16',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Take on varying roles, with teacher guidance, when collaborating with peers during the design, implementation, and review stages of program development.',
  },
  {
    id: '1b-ap-17',
    code: '1B-AP-17',
    gradeBand: '3-5',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Communicating About Computing',
    standardText:
      'Describe choices made during program development using code comments, presentations, and demonstrations.',
  },

  // Impacts of Computing
  {
    id: '1b-ic-18',
    code: '1B-IC-18',
    gradeBand: '3-5',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Culture',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Discuss computing technologies that have changed the world, and express how those technologies influence, and are influenced by, cultural practices.',
  },
  {
    id: '1b-ic-19',
    code: '1B-IC-19',
    gradeBand: '3-5',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Social Interactions',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Brainstorm ways to improve the accessibility and usability of technology products for the diverse needs and wants of users.',
  },
  {
    id: '1b-ic-20',
    code: '1B-IC-20',
    gradeBand: '3-5',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Seek diverse perspectives for the purpose of improving computational artifacts.',
  },
  {
    id: '1b-ic-21',
    code: '1B-IC-21',
    gradeBand: '3-5',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Use public domain or creative commons media, and refrain from copying or using material created by others without permission.',
  },

  // 6-8 (Grade Band 2)
  // Computing Systems
  {
    id: '2-cs-01',
    code: '2-CS-01',
    gradeBand: '6-8',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Devices',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Recommend improvements to the design of computing devices, based on an analysis of how users interact with the devices.',
  },
  {
    id: '2-cs-02',
    code: '2-CS-02',
    gradeBand: '6-8',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Hardware and Software',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Design projects that combine hardware and software components to collect and exchange data.',
  },
  {
    id: '2-cs-03',
    code: '2-CS-03',
    gradeBand: '6-8',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Troubleshooting',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Systematically identify and fix problems with computing devices and their components.',
  },

  // Networks and the Internet
  {
    id: '2-ni-04',
    code: '2-NI-04',
    gradeBand: '6-8',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Network Communication and Organization',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Model the role of protocols in transmitting data across networks and the Internet.',
  },
  {
    id: '2-ni-05',
    code: '2-NI-05',
    gradeBand: '6-8',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Explain how physical and digital security measures protect electronic information.',
  },
  {
    id: '2-ni-06',
    code: '2-NI-06',
    gradeBand: '6-8',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Apply multiple methods of encryption to model the secure transmission of information.',
  },

  // Data and Analysis
  {
    id: '2-da-07',
    code: '2-DA-07',
    gradeBand: '6-8',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Storage',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Represent data using multiple encoding schemes.',
  },
  {
    id: '2-da-08',
    code: '2-DA-08',
    gradeBand: '6-8',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Collection',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Collect data using computational tools and transform the data to make it more useful and reliable.',
  },
  {
    id: '2-da-09',
    code: '2-DA-09',
    gradeBand: '6-8',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Visualization and Transformation',
    practice: 'Communicating About Computing',
    standardText:
      'Refine computational models based on the data they have generated.',
  },

  // Algorithms and Programming
  {
    id: '2-ap-10',
    code: '2-AP-10',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Algorithms',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Use flowcharts and/or pseudocode to address complex problems as algorithms.',
  },
  {
    id: '2-ap-11',
    code: '2-AP-11',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Variables',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Create clearly named variables that represent different data types and perform operations on their values.',
  },
  {
    id: '2-ap-12',
    code: '2-AP-12',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Control',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Design and iteratively develop programs that combine control structures, including nested loops and compound conditionals.',
  },
  {
    id: '2-ap-13',
    code: '2-AP-13',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Decompose problems and subproblems into parts to facilitate the design, implementation, and review of programs.',
  },
  {
    id: '2-ap-14',
    code: '2-AP-14',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Create procedures with parameters to organize code and make it easier to reuse.',
  },
  {
    id: '2-ap-15',
    code: '2-AP-15',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Seek and incorporate feedback from team members and users to refine a solution that meets user needs.',
  },
  {
    id: '2-ap-16',
    code: '2-AP-16',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Incorporate existing code, media, and libraries into original programs, and give attribution.',
  },
  {
    id: '2-ap-17',
    code: '2-AP-17',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Systematically test and refine programs using a range of test cases.',
  },
  {
    id: '2-ap-18',
    code: '2-AP-18',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Distribute tasks and maintain a project timeline when collaboratively developing computational artifacts.',
  },
  {
    id: '2-ap-19',
    code: '2-AP-19',
    gradeBand: '6-8',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Communicating About Computing',
    standardText:
      'Document programs in order to make them easier to follow, test, and debug.',
  },

  // Impacts of Computing
  {
    id: '2-ic-20',
    code: '2-IC-20',
    gradeBand: '6-8',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Culture',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Compare tradeoffs associated with computing technologies that affect people\'s everyday activities and career options.',
  },
  {
    id: '2-ic-21',
    code: '2-IC-21',
    gradeBand: '6-8',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Social Interactions',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Discuss issues of bias and accessibility in the design of existing technologies.',
  },
  {
    id: '2-ic-22',
    code: '2-IC-22',
    gradeBand: '6-8',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Collaborate with many contributors through strategies such as crowdsourcing or surveys when creating a computational artifact.',
  },
  {
    id: '2-ic-23',
    code: '2-IC-23',
    gradeBand: '6-8',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Describe tradeoffs between allowing information to be public and keeping information private and secure.',
  },

  // 9-10 (Grade Band 3A)
  // Computing Systems
  {
    id: '3a-cs-01',
    code: '3A-CS-01',
    gradeBand: '9-10',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Devices',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Explain how abstractions hide the underlying implementation details of computing systems embedded in everyday objects.',
  },
  {
    id: '3a-cs-02',
    code: '3A-CS-02',
    gradeBand: '9-10',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Hardware and Software',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Compare levels of abstraction and interactions between application software, system software, and hardware layers.',
  },
  {
    id: '3a-cs-03',
    code: '3A-CS-03',
    gradeBand: '9-10',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Troubleshooting',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Develop guidelines that convey systematic troubleshooting strategies that others can use to identify and fix errors.',
  },

  // Networks and the Internet
  {
    id: '3a-ni-04',
    code: '3A-NI-04',
    gradeBand: '9-10',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Network Communication and Organization',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Evaluate the scalability and reliability of networks, by describing the relationship between routers, switches, servers, topology, and addressing.',
  },
  {
    id: '3a-ni-05',
    code: '3A-NI-05',
    gradeBand: '9-10',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Give examples to illustrate how sensitive data can be affected by malware and other attacks.',
  },
  {
    id: '3a-ni-06',
    code: '3A-NI-06',
    gradeBand: '9-10',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Recommend security measures to address various scenarios based on factors such as efficiency, feasibility, and ethical considerations.',
  },
  {
    id: '3a-ni-07',
    code: '3A-NI-07',
    gradeBand: '9-10',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Compare various security measures, considering tradeoffs between the usability and security of a computing system.',
  },
  {
    id: '3a-ni-08',
    code: '3A-NI-08',
    gradeBand: '9-10',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Communicating About Computing',
    standardText:
      'Explain tradeoffs when selecting and implementing cybersecurity recommendations.',
  },

  // Data and Analysis
  {
    id: '3a-da-09',
    code: '3A-DA-09',
    gradeBand: '9-10',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Storage',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Translate between different bit representations of real-world phenomena, such as characters, numbers, and images.',
  },
  {
    id: '3a-da-10',
    code: '3A-DA-10',
    gradeBand: '9-10',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Collection',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Evaluate the tradeoffs in how data elements are organized and where data is stored.',
  },
  {
    id: '3a-da-11',
    code: '3A-DA-11',
    gradeBand: '9-10',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Visualization and Transformation',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Create interactive data visualizations using software tools to help others better understand real-world phenomena.',
  },
  {
    id: '3a-da-12',
    code: '3A-DA-12',
    gradeBand: '9-10',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Inference and Models',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Create computational models that represent the relationships among different elements of data collected from a phenomenon or process.',
  },

  // Algorithms and Programming
  {
    id: '3a-ap-13',
    code: '3A-AP-13',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Algorithms',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Create prototypes that use algorithms to solve computational problems by leveraging prior student knowledge and personal interests.',
  },
  {
    id: '3a-ap-14',
    code: '3A-AP-14',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Variables',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Use lists to simplify solutions, generalizing computational problems instead of repeatedly using simple variables.',
  },
  {
    id: '3a-ap-15',
    code: '3A-AP-15',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Control',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Justify the selection of specific control structures when tradeoffs involve implementation, readability, and program performance, and explain the benefits and drawbacks of choices made.',
  },
  {
    id: '3a-ap-16',
    code: '3A-AP-16',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Design and iteratively develop computational artifacts for practical intent, personal expression, or to address a societal issue by using events to initiate instructions.',
  },
  {
    id: '3a-ap-17',
    code: '3A-AP-17',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Decompose problems into smaller components through systematic analysis, using constructs such as procedures, modules, and/or objects.',
  },
  {
    id: '3a-ap-18',
    code: '3A-AP-18',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Create artifacts by using procedures within a program, combinations of data and procedures, or independent but interrelated programs.',
  },
  {
    id: '3a-ap-19',
    code: '3A-AP-19',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Systematically design and develop programs for broad audiences by incorporating feedback from users.',
  },
  {
    id: '3a-ap-20',
    code: '3A-AP-20',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Evaluate licenses that limit or restrict use of computational artifacts when using resources such as libraries.',
  },
  {
    id: '3a-ap-21',
    code: '3A-AP-21',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Evaluate and refine computational artifacts to make them more usable and accessible.',
  },
  {
    id: '3a-ap-22',
    code: '3A-AP-22',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Design and develop computational artifacts working in team roles using collaborative tools.',
  },
  {
    id: '3a-ap-23',
    code: '3A-AP-23',
    gradeBand: '9-10',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Communicating About Computing',
    standardText:
      'Document design decisions using text, graphics, presentations, and/or demonstrations in the development of complex programs.',
  },

  // Impacts of Computing
  {
    id: '3a-ic-24',
    code: '3A-IC-24',
    gradeBand: '9-10',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Culture',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Evaluate the ways computing impacts personal, ethical, social, economic, and cultural practices.',
  },
  {
    id: '3a-ic-25',
    code: '3A-IC-25',
    gradeBand: '9-10',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Social Interactions',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Test and refine computational artifacts to reduce bias and equity deficits.',
  },
  {
    id: '3a-ic-26',
    code: '3A-IC-26',
    gradeBand: '9-10',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Social Interactions',
    practice: 'Communicating About Computing',
    standardText:
      'Demonstrate ways a given algorithm applies to problems across disciplines.',
  },
  {
    id: '3a-ic-27',
    code: '3A-IC-27',
    gradeBand: '9-10',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Use tools and methods for collaboration on a project to increase connectivity of people in different cultures and career fields.',
  },
  {
    id: '3a-ic-28',
    code: '3A-IC-28',
    gradeBand: '9-10',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Explain the beneficial and harmful effects that intellectual property laws can have on innovation.',
  },
  {
    id: '3a-ic-29',
    code: '3A-IC-29',
    gradeBand: '9-10',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Explain the privacy concerns related to the collection and generation of data through automated processes that may not be evident to users.',
  },
  {
    id: '3a-ic-30',
    code: '3A-IC-30',
    gradeBand: '9-10',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Evaluate the social and economic implications of privacy in the context of safety, law, or ethics.',
  },

  // 11-12 (Grade Band 3B)
  // Computing Systems
  {
    id: '3b-cs-01',
    code: '3B-CS-01',
    gradeBand: '11-12',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Devices',
    practice: 'Recognizing and Defining Computational Problems',
    standardText:
      'Categorize the roles of operating system software.',
  },
  {
    id: '3b-cs-02',
    code: '3B-CS-02',
    gradeBand: '11-12',
    conceptArea: 'CS',
    conceptAreaName: 'Computing Systems',
    subconcept: 'Hardware and Software',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Illustrate ways computing systems implement logic, input, and output through hardware components.',
  },

  // Networks and the Internet
  {
    id: '3b-ni-03',
    code: '3B-NI-03',
    gradeBand: '11-12',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Network Communication and Organization',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Describe the issues that impact network functionality (e.g., bandwidth, load, delay, topology).',
  },
  {
    id: '3b-ni-04',
    code: '3B-NI-04',
    gradeBand: '11-12',
    conceptArea: 'NI',
    conceptAreaName: 'Networks and the Internet',
    subconcept: 'Cybersecurity',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Compare ways software developers protect devices and information from unauthorized access.',
  },

  // Data and Analysis
  {
    id: '3b-da-05',
    code: '3B-DA-05',
    gradeBand: '11-12',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Collection',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Use data analysis tools and techniques to identify patterns in data representing complex systems.',
  },
  {
    id: '3b-da-06',
    code: '3B-DA-06',
    gradeBand: '11-12',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Visualization and Transformation',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Select data collection tools and techniques to generate data sets that support a claim or communicate information.',
  },
  {
    id: '3b-da-07',
    code: '3B-DA-07',
    gradeBand: '11-12',
    conceptArea: 'DA',
    conceptAreaName: 'Data and Analysis',
    subconcept: 'Inference and Models',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Evaluate the ability of models and simulations to test and support the refinement of hypotheses.',
  },

  // Algorithms and Programming
  {
    id: '3b-ap-08',
    code: '3B-AP-08',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Algorithms',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Describe how artificial intelligence drives many software and physical systems.',
  },
  {
    id: '3b-ap-09',
    code: '3B-AP-09',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Algorithms',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Implement an artificial intelligence algorithm to play a game against a human opponent or solve a problem.',
  },
  {
    id: '3b-ap-10',
    code: '3B-AP-10',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Algorithms',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Use and adapt classic algorithms to solve computational problems.',
  },
  {
    id: '3b-ap-11',
    code: '3B-AP-11',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Variables',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Evaluate algorithms in terms of their efficiency, correctness, and clarity.',
  },
  {
    id: '3b-ap-12',
    code: '3B-AP-12',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Variables',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Compare and contrast fundamental data structures and their uses.',
  },
  {
    id: '3b-ap-13',
    code: '3B-AP-13',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Control',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Illustrate the flow of execution of a recursive algorithm.',
  },
  {
    id: '3b-ap-14',
    code: '3B-AP-14',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Developing and Using Abstractions',
    standardText:
      'Construct solutions to problems using student-created components, such as procedures, modules, and/or objects.',
  },
  {
    id: '3b-ap-15',
    code: '3B-AP-15',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Analyze a large-scale computational problem and identify generalizable patterns that can be applied to a solution.',
  },
  {
    id: '3b-ap-16',
    code: '3B-AP-16',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Modularity',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Demonstrate code reuse by creating programming solutions using libraries and APIs.',
  },
  {
    id: '3b-ap-17',
    code: '3B-AP-17',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Creating Computational Artifacts',
    standardText:
      'Plan and develop programs for broad audiences using a software life cycle process.',
  },
  {
    id: '3b-ap-18',
    code: '3B-AP-18',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Explain security issues that might lead to compromised computer programs.',
  },
  {
    id: '3b-ap-19',
    code: '3B-AP-19',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Develop programs for multiple computing platforms.',
  },
  {
    id: '3b-ap-20',
    code: '3B-AP-20',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Testing and Refining Computational Artifacts',
    standardText:
      'Use version control systems, integrated development environments (IDEs), and collaborative tools and practices (code documentation) in a group software project.',
  },
  {
    id: '3b-ap-21',
    code: '3B-AP-21',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Collaborating Around Computing',
    standardText:
      'Develop and use a series of test cases to verify that a program performs according to its design specifications.',
  },
  {
    id: '3b-ap-22',
    code: '3B-AP-22',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Communicating About Computing',
    standardText:
      'Modify an existing program to add additional functionality and discuss intended and unintended implications (e.g., breaking combability).',
  },
  {
    id: '3b-ap-23',
    code: '3B-AP-23',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Communicating About Computing',
    standardText:
      'Evaluate key qualities of a program through a process such as a code review.',
  },
  {
    id: '3b-ap-24',
    code: '3B-AP-24',
    gradeBand: '11-12',
    conceptArea: 'AP',
    conceptAreaName: 'Algorithms and Programming',
    subconcept: 'Program Development',
    practice: 'Communicating About Computing',
    standardText:
      'Compare multiple programming languages and discuss how their features make them suitable for solving different types of problems.',
  },

  // Impacts of Computing
  {
    id: '3b-ic-25',
    code: '3B-IC-25',
    gradeBand: '11-12',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Culture',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Evaluate computational artifacts to maximize their beneficial effects and minimize harmful effects on society.',
  },
  {
    id: '3b-ic-26',
    code: '3B-IC-26',
    gradeBand: '11-12',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Culture',
    practice: 'Fostering an Inclusive Computing Culture',
    standardText:
      'Evaluate the impact of equity, access, and influence on the distribution of computing resources in a global society.',
  },
  {
    id: '3b-ic-27',
    code: '3B-IC-27',
    gradeBand: '11-12',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Social Interactions',
    practice: 'Communicating About Computing',
    standardText:
      'Predict how computational innovations that have revolutionized aspects of our culture might evolve.',
  },
  {
    id: '3b-ic-28',
    code: '3B-IC-28',
    gradeBand: '11-12',
    conceptArea: 'IC',
    conceptAreaName: 'Impacts of Computing',
    subconcept: 'Safety, Law, and Ethics',
    practice: 'Communicating About Computing',
    standardText:
      'Debate laws and regulations that impact the development and use of software.',
  },
];

// Helper functions
export function getStandardsByGradeBand(
  gradeBand: CSTAStandard['gradeBand']
): CSTAStandard[] {
  return cstaStandards.filter((s) => s.gradeBand === gradeBand);
}

export function getStandardsByConceptArea(
  conceptArea: CSTAStandard['conceptArea']
): CSTAStandard[] {
  return cstaStandards.filter((s) => s.conceptArea === conceptArea);
}

export function getStandardByCode(code: string): CSTAStandard | undefined {
  return cstaStandards.find(
    (s) => s.code.toLowerCase() === code.toLowerCase()
  );
}

export function formatStandardForRAG(standard: CSTAStandard): string {
  return `CSTA Standard ${standard.code} (${standard.gradeBand}):
Concept Area: ${standard.conceptAreaName}
Subconcept: ${standard.subconcept}
Practice: ${standard.practice}
Standard: ${standard.standardText}${standard.clarification ? `\nClarification: ${standard.clarification}` : ''}`;
}

/**
 * Generate all CSTA standard documents for RAG
 */
export function generateCSTARAGDocuments(): Array<{
  id: string;
  docType: 'csta';
  content: string;
  metadata: {
    code: string;
    gradeBand: CSTAStandard['gradeBand'];
    conceptArea: CSTAStandard['conceptArea'];
    subconcept: string;
  };
}> {
  return cstaStandards.map((standard) => ({
    id: `csta-${standard.id}`,
    docType: 'csta' as const,
    content: formatStandardForRAG(standard),
    metadata: {
      code: standard.code,
      gradeBand: standard.gradeBand,
      conceptArea: standard.conceptArea,
      subconcept: standard.subconcept,
    },
  }));
}
