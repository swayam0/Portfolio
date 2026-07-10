'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

const featuredProjects = [
  {
    id: '01',
    title: 'AstroVastu Web Platform',
    category: 'Solo-built',
    description: 'End-to-end solo-built webinar and consultation platform — architected and shipped independently, from live streaming infrastructure (Agora RTC) to secure chat and PDF report delivery.',
    stack: ['Next.js 16', 'Agora RTC', 'Tailwind', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop',
    link: '#',
    github: '#'
  },
  {
    id: '02',
    title: 'Soul Academy',
    category: 'Client Project',
    description: 'Full-stack platform built for a live client, featuring Paytm payment integration, authentication, and a custom admin dashboard. Resolved critical production payment bugs post-launch.',
    stack: ['Next.js', 'Node.js', 'Paytm', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    link: 'https://soulacademy.in',
    github: '#'
  }
];

const primaryProjects = [
  {
    id: '03',
    title: 'AI-Based Public Grievance Analysis',
    description: 'Full-stack application utilizing DistilBERT for NLP-based complaint classification, sentiment analysis, and urgency detection. Features an admin dashboard, priority queue, and real-time status tracking.',
    stack: ['FastAPI', 'Next.js', 'Celery', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop',
    link: '#',
    github: 'https://github.com/swayam0/public-grievance-ai'
  },
  {
    id: '04',
    title: 'Codelura',
    description: 'Modern full-stack platform for learning and content delivery. Integrates AI capabilities like automated blog summaries, tag generation, SEO optimization, and job description engineering.',
    stack: ['Next.js 16', 'Node.js', 'Express', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop',
    link: '#',
    github: 'https://github.com/swayam0/Codelura'
  },
  {
    id: '05',
    title: 'Yantra',
    description: 'AI-native learning platform prototype combining a Python microservice, Pyodide in-browser execution, and Sarvam STT/TTS voice integration.',
    stack: ['Supabase', 'Python', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
    github: 'https://github.com/swayam0/Yantra',
    link: '#'
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-unit-xl bg-surface-container-lowest" id="projects" ref={containerRef}>
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-unit-xl">
        <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest block mb-2">03. Selected Works</span>
        <h2 className="font-display-lg-mobile md:font-headline-lg text-on-surface">Featured Projects</h2>
      </div>

      {/* Desktop Sticky Layout & Mobile Stack Layout for Featured Projects */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-32">
        {featuredProjects.map((project, index) => {
          return (
            <div key={project.id} className="flex flex-col lg:flex-row gap-unit-lg lg:gap-24 relative">
              {/* Sticky Image Section (Desktop) / Normal Image (Mobile) */}
              <div className="lg:w-3/5 lg:sticky lg:top-32 h-fit mb-8 lg:mb-0 relative group">
                <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-xl group-hover:bg-primary/10 transition duration-700"></div>
                <div className="relative aspect-[16/10] w-full glass-card rounded-2xl overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>
                </div>
              </div>
              
              {/* Scrolling Content Section */}
              <div className="lg:w-2/5 flex flex-col justify-center pb-24 lg:pb-64">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-label-mono text-xl text-outline-variant">{project.id}</span>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-label-mono rounded-full uppercase tracking-tighter">
                      {project.category}
                    </span>
                  </div>
                  
                  <h3 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-6">{project.title}</h3>
                  <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-10">
                    <p className="font-label-mono text-[10px] text-outline uppercase tracking-widest mb-3">Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map(tech => (
                        <span key={tech} className="px-3 py-1 bg-surface-container border border-outline-variant/50 rounded-full text-xs font-label-mono text-on-surface">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <MagneticButton>
                      <Link href={project.link} className="glow-button bg-primary text-on-primary px-6 py-3 rounded-lg font-headline-md text-sm hover:bg-primary-container transition-all flex items-center gap-2 block">
                        View Project <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </Link>
                    </MagneticButton>
                    <MagneticButton>
                      <Link href={project.github} className="border border-outline-variant text-on-surface px-6 py-3 rounded-lg font-headline-md text-sm hover:bg-surface-variant transition-all flex items-center gap-2 block">
                        GitHub <span className="material-symbols-outlined text-sm">code</span>
                      </Link>
                    </MagneticButton>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Projects Grid */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 border-t border-outline-variant/30 pt-16"
        >
          <h2 className="font-headline-md text-2xl text-on-surface">Other Projects</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-unit-lg">
          {primaryProjects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full"
            >
              <div className="aspect-[16/9] overflow-hidden border-b border-outline-variant/30 relative">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-surface/20 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-headline-md text-xl text-on-surface mb-3">{project.title}</h3>
                <p className="font-body-md text-on-surface-variant mb-8 flex-grow">{project.description}</p>
                <div className="flex flex-col gap-6 mt-auto">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map(tech => (
                      <span key={tech} className="px-3 py-1 bg-surface-container border border-outline-variant/50 rounded-full text-[10px] font-label-mono text-on-surface-variant">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-4 border-t border-outline-variant/20 pt-4">
                    {project.github && project.github !== '#' && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-mono text-xs uppercase tracking-widest">
                        <span className="material-symbols-outlined text-[16px]">code</span> Code
                      </Link>
                    )}
                    {project.link && project.link !== '#' && (
                      <Link href={project.link} target="_blank" rel="noopener noreferrer" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-mono text-xs uppercase tracking-widest">
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span> Live
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
