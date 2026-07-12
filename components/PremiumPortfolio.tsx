'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'RepoLens',
    description: 'AI/RAG codebase Q&A tool that analyzes entire repositories and answers questions contextually based on the code.',
    stack: ['Next.js', 'LangChain', 'FAISS', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070',
    link: '#',
    glowColor: 'rgba(59, 130, 246, 0.15)' // Blue glow
  },
  {
    title: 'Soul Academy',
    description: 'Full-stack platform built for a live client, featuring comprehensive course delivery and automated report generation.',
    stack: ['Next.js', 'Node.js', 'Razorpay'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070',
    link: '#',
    glowColor: 'rgba(16, 185, 129, 0.15)' // Emerald glow
  },
  {
    title: 'RankFlow',
    description: 'Multi-agent ranking pipeline for optimizing and re-ranking search and recommendation outputs in real-time.',
    stack: ['Python', 'FastAPI', 'LangChain'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
    link: '#',
    glowColor: 'rgba(139, 92, 246, 0.15)' // Violet glow
  }
];

export default function PremiumPortfolio() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="bg-black min-h-screen" />;

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-white/30 selection:text-white">
      
      {/* Subtle Background Glows (Avishkar Style) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 md:py-40">
        
        {/* HERO SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur-sm text-xs font-medium text-zinc-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for new opportunities
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight text-white mb-6">
            SWAYAM AWARI
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            Software Engineer crafting intelligent digital experiences with modern web technologies and AI.
          </p>
          
          <div className="flex items-center gap-4">
            <Link href="mailto:swayamawari@gmail.com" className="px-6 py-3 rounded-full bg-white text-black font-medium hover:scale-105 transition-transform">
              Get in touch
            </Link>
            <Link href="https://github.com/swayam0" target="_blank" className="px-6 py-3 rounded-full border border-zinc-800 bg-zinc-950/50 backdrop-blur hover:bg-zinc-900 transition-colors">
              GitHub
            </Link>
          </div>
        </motion.section>

        {/* EXPERIENCE TIMELINE */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-12">Experience</h2>
          
          <div className="relative border-l border-zinc-800 ml-3 md:ml-0 space-y-12 pb-4">
            
            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-600 ring-4 ring-black" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-xl font-medium text-white">Software Engineer</h3>
                <span className="text-zinc-500 text-sm">Alpixn • 2024 - Present</span>
              </div>
              <p className="text-zinc-400 font-light leading-relaxed max-w-2xl">
                Building scalable microservices, optimizing frontend performance, and architecting robust state management systems for high-traffic applications.
              </p>
            </div>

            <div className="relative pl-8 md:pl-12">
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-800 ring-4 ring-black" />
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4 mb-2">
                <h3 className="text-xl font-medium text-white">Frontend Developer</h3>
                <span className="text-zinc-500 text-sm">Axaon Software • 2023 - 2024</span>
              </div>
              <p className="text-zinc-400 font-light leading-relaxed max-w-2xl">
                Spearheaded the migration to Next.js 13 App Router, achieving a 40% improvement in Core Web Vitals and enhancing overall UX.
              </p>
            </div>

          </div>
        </motion.section>


        {/* PROJECTS SECTION */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-12">Selected Work</h2>
          
          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <div key={i} className="group relative rounded-3xl border border-white/5 bg-zinc-950/40 backdrop-blur-md overflow-hidden p-2">
                {/* Custom Backlight for Image Container */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl rounded-full"
                  style={{ background: project.glowColor, transform: 'scale(0.8)' }}
                />
                
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="p-8 md:p-12 order-2 md:order-1">
                    <h3 className="text-3xl font-light text-white mb-4">{project.title}</h3>
                    <p className="text-zinc-400 font-light leading-relaxed mb-8">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map(tech => (
                        <span key={tech} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs text-zinc-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden order-1 md:order-2 border border-white/10">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* CORE STACK */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32"
        >
          <h2 className="text-xs font-semibold tracking-widest text-zinc-500 uppercase mb-12">Core Stack</h2>
          <div className="flex flex-wrap gap-3">
            {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'AWS', 'Docker', 'Tailwind CSS'].map(tech => (
              <div key={tech} className="px-6 py-3 rounded-full border border-white/10 bg-zinc-900/50 backdrop-blur text-sm text-zinc-300 hover:bg-zinc-800 transition-colors">
                {tech}
              </div>
            ))}
          </div>
        </motion.section>

        {/* FOOTER */}
        <motion.footer 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative py-32 text-center overflow-hidden border-t border-white/5"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-zinc-900/40 tracking-tighter select-none z-0">
            SWAYAM
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8">Let&apos;s build something extraordinary.</h2>
            <Link href="mailto:swayamawari@gmail.com" className="inline-block text-xl text-zinc-400 hover:text-white border-b border-transparent hover:border-white transition-all pb-1">
              swayamawari@gmail.com
            </Link>
          </div>
        </motion.footer>

      </div>
    </div>
  );
}
