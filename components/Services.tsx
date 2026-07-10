'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: '01',
    title: 'Full Stack Web Development',
    description: 'End-to-end web applications built with modern frameworks for speed and scalability. From scalable database architecture to seamless user interfaces, I handle the entire lifecycle of your application.',
    tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    icon: 'layers'
  },
  {
    id: '02',
    title: 'Frontend Engineering',
    description: 'Creating high-performance, responsive, and accessible user interfaces with clean, maintainable code. Specializing in complex state management, fluid animations, and pixel-perfect implementation.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: 'web'
  },
  {
    id: '03',
    title: 'Backend & APIs',
    description: 'Robust server-side logic, secure REST and GraphQL APIs, and scalable database architectures designed to handle heavy workloads and complex business logic.',
    tech: ['Node.js', 'Python', 'FastAPI', 'MongoDB', 'Redis'],
    icon: 'database'
  },
  {
    id: '04',
    title: 'AI Integration',
    description: 'Supercharging products with LLMs, custom AI assistants, and automated data processing. Turning raw AI capabilities into reliable, production-ready features.',
    tech: ['OpenAI', 'Gemini', 'LangChain', 'Vector DBs'],
    icon: 'psychology'
  }
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-unit-xl border-t border-outline-variant/20" id="services">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          
          <div className="md:w-1/3">
            <div className="sticky top-32">
              <span className="font-label-mono text-label-mono text-tertiary uppercase tracking-widest block mb-2">04. Capabilities</span>
              <h2 className="font-display-lg-mobile md:font-headline-lg text-on-surface">How I Can Help</h2>
              <p className="font-body-lg text-on-surface-variant mt-4">
                Technical services for startups, businesses, founders, and teams that need reliable, high-performance software solutions.
              </p>
              <div className="mt-8">
                <Link href="#contact" className="inline-flex items-center gap-2 text-primary font-label-mono text-sm group">
                  Discuss a Project <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col">
            {services.map((service, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <div 
                  key={service.id}
                  className="group border-b border-outline-variant/10 py-8 first:pt-0 cursor-default transition-colors hover:border-primary/30"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-8">
                    <span className={`font-label-mono text-sm tracking-widest transition-colors ${isHovered ? 'text-primary' : 'text-outline'}`}>
                      {service.id}
                    </span>
                    <div className="flex-1">
                      <h3 className={`font-headline-lg text-2xl md:text-3xl tracking-tight transition-colors ${isHovered ? 'text-on-surface' : 'text-on-surface/80'}`}>
                        {service.title}
                      </h3>
                      
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-in-out">
                        <div className="overflow-hidden">
                          <div className="pt-6">
                            <p className="font-body-md text-on-surface-variant max-w-xl">
                              {service.description}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                              {service.tech.map((tech, i) => (
                                <span key={i} className="px-3 py-1 bg-surface-container/50 border border-outline-variant/20 rounded font-label-mono text-xs text-on-surface-variant">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-outline-variant/20 text-outline group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5 transition-all">
                      <span className="material-symbols-outlined">{service.icon}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
