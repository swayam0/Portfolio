export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
};

export const experience: Experience[] = [
  {
    id: "alpixn",
    company: "Alpixn (Soul Academy)",
    role: "Full Stack Developer (Contract)",
    period: "2024 - Present",
    description: "Developed and architected a production e-learning platform and automated astrology report system, including Paytm and Razorpay integration.",
    tech: ["Next.js", "Node.js", "MongoDB", "Razorpay", "TypeScript"]
  },
  {
    id: "axaon",
    company: "Axaon Software",
    role: "Remote Developer",
    period: "2023 - 2024",
    description: "Developed and maintained full-stack web applications, collaborating remotely with cross-functional teams.",
    tech: ["React", "Node.js", "Express", "PostgreSQL"]
  },
  {
    id: "internpro",
    company: "InternPro",
    role: "AI/ML Intern",
    period: "2023",
    description: "Worked on various machine learning models and data processing pipelines.",
    tech: ["Python", "TensorFlow", "Pandas", "Scikit-Learn"]
  }
];
