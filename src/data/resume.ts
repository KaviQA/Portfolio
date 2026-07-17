/*
  Single source of truth for all portfolio content.
  Extracted verbatim from DAVID_johnson_Resume_2026-07-12.pdf; every metric
  below appears in the resume.
*/

export const identity = {
  name: 'David Johnson',
  role: 'AI Engineer',
  location: 'Chennai, India',
  email: 'davidrajjohnson94@gmail.com',
  phone: '+91 95002 65092',
  phoneHref: 'tel:+919500265092',
  github: 'https://github.com/DAVJES94',
  linkedin: 'https://www.linkedin.com/in/david-raj-j/',
  resumeFile: '/David-Johnson-Resume.pdf',
} as const;

export const metrics = [
  {
    value: 38,
    prefix: '+',
    suffix: '%',
    label: 'retrieval precision',
    detail: 'citation-backed enterprise RAG',
  },
  {
    value: 42,
    prefix: '-',
    suffix: '%',
    label: 'query latency',
    detail: 'Chroma and Pinecone tuning',
  },
  {
    value: 2,
    prefix: '',
    suffix: 'x',
    label: 'vector DB throughput',
    detail: 'same infrastructure, doubled',
  },
  {
    value: 40,
    prefix: '-',
    suffix: '%',
    label: 'manual analyst effort',
    detail: 'LLM summarization tooling',
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
    company: 'Contus Tech',
    title: 'AI Engineer',
    period: 'Jun 2025 - present',
    location: 'Chennai',
    summary:
      'Production agent infrastructure: MCP servers, LangGraph orchestration, and voice pipelines for enterprise systems.',
    points: [
      'Built and deployed custom MCP servers for secure tool access to Gmail, Google Calendar, Google Drive, Dropbox, internal enterprise APIs, and STT/TTS voice pipelines.',
      'Wired MCP tools into LangGraph agent nodes for context-aware tool calling, voice-agent communication, and multi-step automated workflows.',
      'Shipped webhook-driven action tools that use LLM function calling to extract structured parameters and execute backend API workflows.',
      'Engineered an async FastAPI backend that absorbs large volumes of concurrent LLM, MCP, and distributed voice-agent requests.',
      'Designed an enterprise RAG workflow with citation-backed answers, then tuned Chroma and Pinecone to cut latency 42% and double throughput.',
    ],
    chips: ['+38% retrieval precision', '-42% latency', '2x throughput'],
  },
  {
    company: 'WellSpring Systems',
    title: 'ML Engineer',
    period: 'Mar 2023 - May 2025',
    location: 'Chennai',
    summary:
      'GenAI for security operations: detection agents, playbook-grounded RAG, and LLM reasoning over live threat data.',
    points: [
      'Built autonomous GenAI agents for phishing and XSS detection with LSTM networks: 89% accuracy, 20% fewer false positives.',
      'Developed a LangGraph-powered RAG system over cybersecurity playbooks, keeping incident handling consistent across 10+ scenarios.',
      'Created LLM summarization and analytics tools enriched with MITRE ATT&CK tactics and CVE data, cutting manual reporting effort 40%.',
      'Implemented a threat reasoning engine that correlates alerts and suggests actions, reducing mean time to investigate by 35%.',
    ],
    chips: ['89% detection accuracy', '-35% MTTI', '10+ playbook scenarios'],
  },
];

export interface Project {
  name: string;
  period: string;
  tagline: string;
  points: string[];
  stack: string[];
  /* which generative panel the card renders */
  visual: 'rings' | 'graph' | 'scan';
}

export const projects: Project[] = [
  {
    name: 'Study Mate AI',
    period: 'Jan - Feb 2026',
    tagline:
      'An AI tutoring backend: concept explanations, quiz generation, and PDF question answering over a semantic retrieval pipeline.',
    points: [
      'FastAPI and LangChain services expose tutoring, quiz, and document QA endpoints backed by large language models.',
      'RAG pipeline on ChromaDB with embedding models runs semantic search over educational documents for grounded answers.',
      'Fully containerized with Docker for reproducible deploys and clean integration with vector DBs and model providers.',
    ],
    stack: [
      'LLMs',
      'RAG',
      'LangChain',
      'FastAPI',
      'React',
      'MongoDB',
      'ChromaDB',
      'Docker',
    ],
    visual: 'rings',
  },
  {
    name: 'MCP Multi-Tool Agent',
    period: 'Nov - Dec 2025',
    tagline:
      'One conversational agent that works across Gmail, Google Calendar, Google Drive, and Dropbox through custom MCP servers.',
    points: [
      'Context-aware tool routing chooses the right MCP server from user intent and current workflow state.',
      'Message parsing and input validation guard every parameter before a tool is allowed to execute.',
      'LangGraph keeps workflows consistent with full tool-call traceability and error recovery pathways.',
    ],
    stack: ['MCP', 'LangChain', 'LangGraph', 'Tool Orchestration'],
    visual: 'graph',
  },
  {
    name: 'KnowYourBite',
    period: 'Mar - Apr 2025',
    tagline:
      'Photograph a food label; get ingredient risks, safe consumption limits, and age-based dietary guidance back.',
    points: [
      'PaddleOCR extracts nutrition and ingredient data from packaging photos, including tabular label layouts.',
      'Real-time web search and aggregation score ingredient health risks behind a Streamlit analysis frontend.',
      'Docker Compose services deployed on AWS ECS with images in ECR, publicly reachable end to end.',
    ],
    stack: [
      'PaddleOCR',
      'Python',
      'FastAPI',
      'Streamlit',
      'OpenCV',
      'Docker',
      'AWS ECS',
      'NLP',
    ],
    visual: 'scan',
  },
];

export const skillGroups = [
  {
    title: 'Agents & Orchestration',
    note: 'the layer I live in',
    items: [
      'LangChain',
      'LangGraph',
      'MCP servers',
      'RAG workflows',
      'Tool orchestration',
      'LLM fine-tuning',
      'ReAct agents',
    ],
  },
  {
    title: 'Modeling',
    note: 'under the hood',
    items: [
      'PyTorch',
      'TensorFlow',
      'Transformers',
      'NLP',
      'Supervised & unsupervised learning',
      'EDA',
    ],
  },
  {
    title: 'Serving & Infrastructure',
    note: 'how it ships',
    items: [
      'FastAPI',
      'Flask',
      'Docker',
      'AWS ECR / ECS',
      'SageMaker & Bedrock',
      'MLflow',
      'MLOps',
      'Linux',
    ],
  },
  {
    title: 'Data',
    note: 'where it lives',
    items: ['Python', 'SQL', 'MongoDB', 'ChromaDB', 'Pinecone'],
  },
] as const;

export const education = [
  {
    school: 'Scaler Academy',
    program: 'Advanced Data Science and Machine Learning',
    period: '2023 - 2025',
  },
  {
    school: 'Guvi Geek Network',
    program: 'IIT-M Advanced Programming and Master Data Science',
    period: '2021 - 2022',
  },
  {
    school: 'Saveetha Engineering College',
    program: 'B.E. Electrical and Electronics Engineering',
    period: '2012 - 2016',
  },
] as const;

export const languages = ['English', 'Tamil'] as const;
