export type SkillCategory = {
  id: string;
  name: string;
  skills: string[];
};

export const skills: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    skills: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'backend',
    name: 'Backend',
    skills: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'WebSockets'],
  },
  {
    id: 'ai-ml',
    name: 'AI / ML',
    skills: ['LangChain', 'RAG Pipelines', 'Agent Orchestration', 'OpenAI', 'Vector Embeddings'],
  },
  {
    id: 'other-tools',
    name: 'Other / Tools',
    skills: ['MongoDB', 'PostgreSQL', 'Prisma', 'Git', 'Vercel'],
  },
];
