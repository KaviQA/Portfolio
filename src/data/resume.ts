/*
  Single source of truth for all portfolio content.
  Extracted from Kavi B's resume; every metric
  below appears in the resume.
*/

export const identity = {
  name: 'Kavi B',
  role: 'Quality Analyst',
  location: 'Coimbatore, India',
  email: 'kavi09k2@gmail.com',
  phone: '+91 8122271389',
  phoneHref: 'tel:+918122271389',
  github: 'https://github.com/KaviQA',
  linkedin: 'www.linkedin.com/in/kavi-b-653448272',
  resumeFile: '/Kavi-B-Resume.pdf',
} as const;

export const metrics = [
  {
    value: 6,
    prefix: '+',
    suffix: ' Years',
    label: 'Testing Experience',
    detail: 'Manual & Automation Testing Enthusiast',
  },
  {
    value: 3,
    prefix: '',
    suffix: '',
    label: 'domains tested',
    detail: 'StreamCollab (Retail/Vendor), Learn & Play (Education), Invypro (Supply Chain)',
  },
  {
    value: 2,
    prefix: '',
    suffix: '',
    label: 'Automation Frameworks',
    detail: 'Playwright + TypeScript, Selenium + Java',
  },
  {
    value: 100,
    prefix: '',
    suffix: '%',
    label: 'Module Coverage',
    detail: 'End-to-end testing across all StreamCollab modules',
  },
] as const;

export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  points: string[];
  chips: string[];
}

export const experience: Role[] = [
  {
    company: 'Simplain India Private Limited',
    title: 'Quality Analyst',
    period: 'Jun 2024 - present',
    location: 'Coimbatore, India',
    summary:
      'Leading end-to-end QA on the StreamCollab vendor collaboration platform, covering manual and automation testing across multiple modules.',
    points: [
      'Test the StreamCollab vendor collaboration platform end to end, covering vendor onboarding, item management, contract, and invoice modules.',
      'Automate test cases using Playwright with TypeScript, following both keyword-driven and data-driven approaches.',
      'Built a reusable Page Object Model architecture in Playwright to keep locators and test logic consistent across all StreamCollab modules.',
      'Designed data-driven test scripts that pull test data from external JSON/CSV files to run the same automation flow across multiple scenarios.',
      'Implemented parallel test execution in Playwright to cut full regression suite runtime.',
      'Added automatic screenshots and video capture on test failures to speed up debugging.',
      'Integrated automated test suites into GitLab CI/CD pipelines, triggering regression runs on every merge using Docker containers for consistent execution.',
      'Manage test cases and test suites in JIRA Xray, and track defects in JIRA.',
      'Test APIs using Postman and run performance tests using JMeter.',
      'Validate backend data directly in PostgreSQL and Oracle databases.',
      'Track builds and deployments through GitLab CI/CD, including Server Runner and Docker containers.',
      'Review user behaviour data in Microsoft Clarity to guide test coverage and UX-related test cases.',
    ],
    chips: ['Manual Testing', 'Automation Testing', 'API Testing', 'Performance Testing', 'Playwright + TypeScript', 'JIRA Xray', 'Postman', 'JMeter', 'PostgreSQL', 'Oracle', 'GitLab CI/CD', 'Microsoft Clarity', 'CI/CD'],
  },
  {
    company: 'Way2Smile Solution Pvt Ltd',
    title: 'Quality Analyst - Lead',
    period: 'Sep 2023 - Mar 2024',
    location: 'Chennai, India',
    summary:
      'Led QA activities for the Learn & Play education platform across web and mobile apps.',
    points: [
      'Led QA activities for the Learn & Play education platform across web and mobile apps.',
      'Planned and executed manual test cases covering functional, regression, integration, and UAT testing.',
      'Worked directly with clients to clarify requirements and manage project scope.',
      'Tracked defects and prepared daily status reports and test summary reports.',
    ],
    chips: ['Manual Testing', 'UAT', 'Client Coordination', 'Cross-browser Testing'],
  },
  {
    company: 'Sensiple Software Solution Pvt Ltd',
    title: 'Software Test Engineer',
    period: 'Sep 2019 - Mar 2023',
    location: 'India',
    summary:
      'Built automation frameworks and executed testing across web applications using Selenium, Java, and Cucumber BDD.',
    points: [
      'Built automation scripts for web applications using Selenium WebDriver and Java.',
      'Wrote test cases in Gherkin using the Cucumber BDD framework, with Maven as the build tool.',
      'Built the Page Object Model framework from scratch and created reusable automated test scripts.',
      'Designed test cases using Boundary Value Analysis, Equivalence Class Partitioning, Decision Table, and State Transition techniques.',
      'Worked in an Agile team with a solid understanding of STLC and SDLC.',
      'Tracked all automation testing activity in JIRA.',
    ],
    chips: ['Selenium WebDriver', 'Cucumber BDD', 'Java', 'Maven'],
  },
];

export interface Project {
  name: string;
  period: string;
  tagline: string;
  points: string[];
  stack: string[];
  /* which generative panel the card renders */
  visual: 'timeline' | 'nodes' | 'wave' | 'rings' | 'graph' | 'scan';
}

export const projects: Project[] = [
  {
    name: 'StreamCollab',
    period: '2024 - present',
    tagline:
      'A vendor collaboration platform for retailers, wholesalers, and CPG manufacturers covering Trade Fund Management, Master Data Collaboration, and Operation Automation.',
    points: [
      'Tested all modules including Vendor Onboarding, Item Management, the Contract (Deals/Rebate) Module, and the Invoice Module.',
      'Automated the Item Master module and all module screens end-to-end using Playwright with TypeScript, following keyword-driven and data-driven approaches.',
      'Set up and tracked automation runs through GitLab CI/CD, using Server Runner and Docker containers.',
      'Used Microsoft Clarity to review user behaviour and guide test coverage decisions.',
    ],
    stack: [
      'Selenium',
      'Core Java',
      'Playwright',
      'TypeScript',
      'JIRA Xray',
      'Postman',
      'JMeter',
      'PostgreSQL',
      'Oracle',
      'GitLab CI/CD',
      'Docker',
      'Microsoft Clarity',
    ],
    visual: 'timeline',
  },
  {
    name: 'Learn & Play',
    period: '2023 - 2024',
    tagline:
      'An educational platform connecting parents with local schools, tutoring, and extracurricular activities, including live sessions and courses.',
    points: [
      'Built the QA strategy for the project, including test scenarios, test cases, and testing methodology.',
      'Planned and executed manual test cases across functional, regression, integration, and UAT testing.',
      'Tested across Chrome, Firefox, Safari, Edge, and Internet Explorer to confirm consistent behaviour.',
      'Reviewed test reports, prepared test summary reports, and tracked progress in Azure DevOps.',
    ],
    stack: [
      'Manual Testing',
      'Cross-browser Testing',
      'Azure DevOps',
      'Functional Testing',
      'Regression Testing',
      'UAT',
    ],
    visual: 'nodes',
  },
  {
    name: 'Invypro',
    period: '2019 - 2023',
    tagline:
      'An inventory management platform helping businesses manage stock across multiple stores and warehouses with tracking, restocking, and transfers.',
    points: [
      'Analysed user stories and prepared test scenarios, test cases, and test data.',
      'Built automation scripts using Selenium WebDriver with Cucumber, writing feature files and step definitions.',
      'Created reusable Page Object Model components in Java and ran the automation suite using Maven.',
      'Ran continuous integration tests after every build using Jenkins.',
    ],
    stack: [
      'Selenium WebDriver',
      'Java',
      'Cucumber BDD',
      'Maven',
      'Jenkins',
      'POM',
      'Agile/Scrum',
    ],
    visual: 'rings',
  },
];

export const skillGroups = [
  {
    title: 'Automation Tools',
    note: 'core expertise',
    items: [
      'Selenium WebDriver',
      'Playwright + TypeScript',
      'Keyword Driven',
      'Data Driven',
      'Page Object Model',
    ],
  },
  {
    title: 'Frameworks & Languages',
    note: 'building blocks',
    items: [
      'Cucumber BDD',
      'TestNG',
      'JUnit',
      'Core Java',
      'TypeScript',
      'Maven',
    ],
  },
  {
    title: 'API & Performance Testing',
    note: 'quality beyond UI',
    items: [
      'Postman (API Testing)',
      'JMeter (Performance Testing)',
      'PostgreSQL',
      'Oracle',
    ],
  },
  {
    title: 'Tools & Methodology',
    note: 'how it ships',
    items: [
      'JIRA / Xray',
      'Git / GitLab',
      'Jenkins',
      'GitLab CI/CD',
      'Docker',
      'Microsoft Clarity',
      'Agile / Scrum',
    ],
  },
] as const;

export const education = [
  {
    school: 'Dr.N.G.P Institute of Technology',
    program: 'Bachelor of Engineering - Mechanical Engineering',
    period: '2014 - 2018',
  },
] as const;

export const languages = ['English', 'Tamil'] as const;
