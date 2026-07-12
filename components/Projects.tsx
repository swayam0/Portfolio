'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

const featuredProjects = [
  {
    id: '01',
    title: 'RepoLens',
    description: 'AI/RAG codebase Q&A tool that analyzes entire repositories and answers questions contextually based on the code.',
    stack: ['Next.js', 'LangChain', 'RAG/FAISS', 'OpenAI'],
    metric: '100+ Repos Analyzed',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
    link: '#',
    github: '#'
  },
  {
    id: '02',
    title: 'Soul Academy',
    description: 'Full-stack platform built for a live client, featuring comprehensive course delivery and automated report generation.',
    stack: ['Next.js', 'Node.js', 'Paytm/Razorpay', 'Tailwind'],
    metric: 'Payment integration: Paytm/Razorpay',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    link: 'https://soulacademy.in',
    github: '#'
  },
  {
    id: '03',
    title: 'RankFlow',
    description: 'Multi-agent ranking pipeline for optimizing and re-ranking search and recommendation outputs in real-time.',
    stack: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL'],
    metric: '50ms avg response time',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    link: '#',
    github: '#'
  },
  {
    id: '04',
    title: 'ClinicalBridge',
    description: 'FHIR simulation engine mapping patient records to synthetic clinical data for rigorous healthcare software testing.',
    stack: ['Next.js', 'FastAPI', 'FHIR', 'Docker'],
    metric: '10k+ synthetic records generated',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop',
    link: '#',
    github: '#'
  }
];

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.95, 1, 1]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="lg:sticky lg:top-24 min-h-[70vh] flex flex-col justify-center py-12 mb-20 bg-[#09090b]"
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center w-full">
        {/* Code / Screenshot window with terminal header */}
        <div className="w-full lg:w-1/2 border border-outline-variant/30 rounded-xl overflow-hidden bg-[#18181b] shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-outline-variant/30 bg-[#09090b]">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            <div className="ml-4 font-label-mono text-xs text-on-surface-variant opacity-50">
              {project.title.toLowerCase().replace(/\s+/g, '-')}.tsx
            </div>
          </div>
          <div className="aspect-[4/3] relative overflow-hidden bg-black/50">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <span className="font-label-mono text-xl text-primary opacity-50">/{project.id}</span>
          </div>
          <h3 className="font-headline-lg text-4xl lg:text-5xl text-on-surface tracking-tight">{project.title}</h3>
          
          <div className="p-4 border-l-2 border-primary bg-primary/5 rounded-r-lg">
            <p className="font-label-mono text-primary text-xs uppercase tracking-wider mb-1">Key Metric</p>
            <p className="font-body-lg text-on-surface">{project.metric}</p>
          </div>

          <p className="font-body-lg text-on-surface-variant leading-relaxed">
            {project.description}
          </p>

          <div>
            <p className="font-label-mono text-[10px] text-outline uppercase tracking-widest mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech: string) => (
                <span key={tech} className="px-3 py-1 bg-[#18181b] border border-outline-variant/30 rounded-md text-xs font-label-mono text-primary">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 mt-4">
            {project.link && project.link !== '#' && (
              <Link href={project.link} target="_blank" className="font-label-mono text-sm px-6 py-3 bg-primary text-[#052e16] rounded-md font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
                Deploy <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
              </Link>
            )}
            {project.github && project.github !== '#' && (
              <Link href={project.github} target="_blank" className="font-label-mono text-sm px-6 py-3 border border-outline-variant/50 text-on-surface rounded-md hover:bg-surface-variant/50 transition-colors flex items-center gap-2">
                Source <span className="material-symbols-outlined text-[16px]">code</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section className="py-32 bg-[#09090b] relative" id="projects">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-20 relative z-10">
        <span className="font-label-mono text-primary uppercase tracking-widest block mb-2">$ ls ./projects</span>
        <h2 className="font-headline-lg text-4xl lg:text-5xl text-on-surface">Selected Works</h2>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
        <div className="absolute left-[3rem] top-0 bottom-0 w-[1px] bg-outline-variant/10 hidden lg:block z-0"></div>
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
