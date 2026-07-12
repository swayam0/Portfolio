export type Project = {
  id: string;
  title: string;
  category: string;
  description: string;
  caption?: string;
  stack: string[];
  image: string;
  layout: 'left' | 'right' | 'full' | 'stacked';
};

export const projects: Project[] = [
  {
    id: "soul-academy",
    title: 'Soul Academy',
    category: 'Full-Stack Client Work',
    description: 'Delivered a production-ready e-learning and automated astrology report platform. Architected the full payment-to-fulfillment pipeline.',
    caption: 'where I learned Paytm\'s sandbox docs lie to you',
    stack: ['Next.js', 'Node.js', 'Razorpay', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600',
    layout: 'left'
  },
  {
    id: "neelachal-vastu",
    title: 'Neelachal Vastu Shastra',
    category: 'Interactive Web',
    description: 'Designed and engineered a high-conversion webinar funnel featuring embedded Three.js interactions to elevate the brand perception.',
    caption: 'balancing WebGL performance with marketing conversion rates',
    stack: ['React', 'Three.js', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600',
    layout: 'right'
  },
  {
    id: "repolens",
    title: 'RepoLens',
    category: 'AI / Tooling',
    description: 'Engineered a semantic code search and Q&A tool that ingests entire repositories. Reduces onboarding time by answering contextual codebase queries.',
    caption: 'demo coming soon — currently fighting rate limits',
    stack: ['Next.js', 'LangChain', 'FAISS', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600',
    layout: 'stacked'
  },
  {
    id: "rankflow",
    title: 'RankFlow',
    category: 'AI Pipeline',
    description: 'Built a multi-agent system to optimize and re-rank search results dynamically. Submitted as part of the INDIA RUNS initiative.',
    caption: 'making LLMs argue with each other for better search relevancy',
    stack: ['Python', 'FastAPI', 'LangChain'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1600',
    layout: 'left'
  },
  {
    id: "clinicalbridge",
    title: 'ClinicalBridge',
    category: 'Healthcare RAG',
    description: 'Prototyped a secure retrieval-augmented generation and Model Context Protocol system tailored for clinical data workflows.',
    caption: 'navigating the nightmare of healthcare data compliance',
    stack: ['Python', 'Vector DB', 'MCP'],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600',
    layout: 'right'
  }
];
