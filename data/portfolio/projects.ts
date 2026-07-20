export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  caption?: string;
  stack: string[];
  image: string;
  layout: 'left' | 'right' | 'full' | 'stacked';
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "mockable",
    title: 'Mockable (InternPro)',
    category: 'AI Interview Simulation',
    description: 'Built Mockable, an AI interview simulation platform generating role-specific technical and behavioral mock interviews. Designed an LLM-based scoring pipeline that evaluated technical and communication responses against a structured rubric.',
    caption: 'secure REST APIs powering real-time performance tracking',
    stack: ['Node.js', 'MongoDB', 'React', 'LLMs'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600',
    layout: 'left',
    tags: ['AI/ML', 'Full-Stack']
  },
  {
    id: "repolens",
    title: 'RepoLens',
    category: 'AI Codebase Q&A Platform',
    description: 'Built a RAG-powered platform that ingests public GitHub repositories and indexes their codebase in memory, enabling natural-language Q&A over the code. Engineered document ingestion and semantic retrieval pipelines with LangChain and FAISS, returning answers with exact file and line citations.',
    caption: 'production-ready FastAPI backend & React frontend',
    stack: ['FastAPI', 'LangChain', 'FAISS', 'Gemini', 'React'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600',
    layout: 'stacked',
    tags: ['AI/ML', 'Full-Stack']
  },
  {
    id: "clinicalbridge",
    title: 'ClinicalBridge',
    category: 'Healthcare RAG Assistant',
    description: 'Developed a RAG-powered healthcare assistant that answers natural-language questions about patient records with cited, evidence-based responses. Implemented retrieval over simulated FHIR-style patient profiles using LangChain and ChromaDB, powered by Gemini 1.5 Flash.',
    caption: 'persistent per-patient conversation context with 3D visualization',
    stack: ['FastAPI', 'LangChain', 'ChromaDB', 'Gemini', 'Next.js', 'Three.js'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600',
    layout: 'right',
    tags: ['AI/ML', 'Full-Stack']
  },
  {
    id: "yantra-ai",
    title: 'Yantra AI',
    category: 'Open Source Contribution',
    description: 'Implemented persistent, Supabase-backed collaborative "Python Rooms" enabling multiple users to code together in real time. Cut initial page load time through deferred Pyodide initialization and lazy loading.',
    caption: 'improved accessibility and WCAG compliance across UI',
    stack: ['Node.js', 'Python', 'MongoDB', 'Next.js'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600',
    layout: 'left',
    tags: ['Open Source', 'Full-Stack']
  },
  {
    id: "neelachal-vastu",
    title: 'Neelachal Vastu Shastra',
    category: 'Interactive Web',
    description: 'Designed and engineered a high-conversion webinar funnel featuring embedded Three.js interactions to elevate the brand perception.',
    caption: 'balancing WebGL performance with marketing conversion rates',
    stack: ['React', 'Three.js', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600',
    layout: 'right',
    tags: ['Full-Stack', 'Freelance']
  }
];
