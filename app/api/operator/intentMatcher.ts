import { profile, projects, skills, experience } from "../../../data/portfolio";

// --- Evidence Registry ---
export const EVIDENCE_REGISTRY = new Map<string, any>();
projects.forEach(p => EVIDENCE_REGISTRY.set(`project_${p.id}`, { title: p.title, type: "project", description: p.description, technologies: p.stack, href: `#projects` }));
skills.forEach(s => EVIDENCE_REGISTRY.set(`skill_${s.id}`, { title: s.name, type: "skill", description: s.skills.join(", "), technologies: [], href: `#skills` }));
experience.forEach(e => EVIDENCE_REGISTRY.set(`exp_${e.id}`, { title: e.company, type: "experience", description: `${e.role} (${e.period}) - ${e.description}`, technologies: e.tech, href: `#experience` }));

export const ACTION_REGISTRY = new Map<string, any>([
  ["resume", { label: "View Resume (PDF)", type: "link", href: "/resume.pdf" }],
  ["email", { label: `Email ${profile.email}`, type: "email", href: `mailto:${profile.email}` }],
  ["linkedin", { label: "LinkedIn", type: "link", href: profile.links.linkedin }],
  ["github", { label: "GitHub", type: "link", href: profile.links.github }],
  ["nav_home", { label: "Scroll to Top", type: "link", href: "#" }],
  ["nav_experience", { label: "View Experience", type: "link", href: "#experience" }],
  ["nav_skills", { label: "View Skills", type: "link", href: "#skills" }],
  ["nav_projects", { label: "View Projects", type: "link", href: "#projects" }],
  ["nav_contact", { label: "Contact Form", type: "link", href: "#contact" }]
]);

// --- Deterministic Intents ---
export const INTENTS = [
  {
    id: "why_hire",
    keywords: ["why hire", "why interview", "why should we interview", "best work"],
    answer: "Swayam combines full-stack product engineering with practical AI development. His work includes AI-powered civic technology, developer platforms, and production-focused web applications. He emphasizes reliable systems and modern interaction design.",
    evidence: ["project_repolens", "project_soul-academy"],
    actions: ["resume"]
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "send me contact details"],
    answer: "You can reach out to Swayam via email or connect on LinkedIn.",
    evidence: [],
    actions: ["email", "linkedin"]
  },
  {
    id: "frontend",
    keywords: ["frontend stack", "front end", "ui", "react", "tailwindcss"],
    answer: "Swayam's primary frontend stack includes Next.js, React, TypeScript, Tailwind CSS, and Framer Motion for animations.",
    evidence: ["skill_frontend"],
    actions: []
  },
  {
    id: "backend",
    keywords: ["server-side", "backend", "node", "express", "fastapi", "database"],
    answer: "Yes, Swayam is experienced in backend development. He builds APIs and microservices using Node.js, Express, FastAPI, and integrates with databases like MongoDB and PostgreSQL.",
    evidence: ["project_soul-academy", "skill_backend"],
    actions: []
  },
  {
    id: "ai",
    keywords: ["ai experience", "machine learning", "llm", "rag", "langchain"],
    answer: "Yes, Swayam has significant AI experience, focusing on integrating LLMs into production apps. He has built RAG pipelines, multi-agent systems, and semantic search tools.",
    evidence: ["project_repolens", "project_rankflow"],
    actions: []
  },
  {
    id: "nextjs",
    keywords: ["next.js", "nextjs", "next js"],
    answer: "Swayam has built several projects with Next.js, including his client work for Soul Academy and the RepoLens AI search tool.",
    evidence: ["project_soul-academy", "project_repolens"],
    actions: []
  },
  {
    id: "typescript",
    keywords: ["typescript", "ts work"],
    answer: "TypeScript is standard in Swayam's modern web stack. He uses it heavily in projects like Soul Academy and this very portfolio to ensure type safety and scalable architecture.",
    evidence: ["project_soul-academy"],
    actions: []
  },
  {
    id: "resume",
    keywords: ["view resume", "open cv", "download resume", "download cv"],
    answer: "Here is Swayam's latest resume.",
    evidence: [],
    actions: ["resume"]
  },
  {
    id: "nav_home",
    keywords: ["go home", "scroll to top", "navigate home"],
    answer: "Navigating to the top of the page.",
    evidence: [],
    actions: ["nav_home"]
  },
  {
    id: "nav_experience",
    keywords: ["view experience", "show experience", "work history", "job history"],
    answer: "Here is Swayam's professional experience.",
    evidence: [],
    actions: ["nav_experience"]
  },
  {
    id: "nav_skills",
    keywords: ["view skills", "show skills", "tech stack"],
    answer: "Here is an overview of Swayam's skills and tech stack.",
    evidence: [],
    actions: ["nav_skills"]
  },
  {
    id: "nav_projects",
    keywords: ["view projects", "show projects", "portfolio projects"],
    answer: "Here are Swayam's featured projects.",
    evidence: [],
    actions: ["nav_projects"]
  },
  {
    id: "nav_contact",
    keywords: ["hire", "freelance project", "start a project"],
    answer: "Let's work together! You can reach Swayam via the contact form or email.",
    evidence: [],
    actions: ["nav_contact", "email"]
  }
];

export function matchIntent(query: string) {
  const normalized = query.toLowerCase().replace(/[^\w\s]/g, "");
  let bestMatch = null;
  let maxScore = 0;

  for (const intent of INTENTS) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const kw = keyword.toLowerCase().replace(/[^\w\s]/g, "");
      if (normalized.includes(kw)) {
        if (new RegExp(`\\b${kw}\\b`).test(normalized)) {
          score += 2;
        } else {
          score += 1;
        }
      }
    }
    if (score > maxScore) {
      maxScore = score;
      bestMatch = intent;
    }
  }

  if (maxScore >= 2 && bestMatch) {
    return bestMatch;
  }
  return null;
}
