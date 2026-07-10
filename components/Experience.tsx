'use client';

import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
  {
    role: 'AI/ML Intern',
    company: 'InternPro',
    period: 'Dec 2025 - May 2026',
    description: 'Worked on the development and integration of AI/ML capabilities into practical software applications, including model experimentation, data processing, backend integration, and application development.',
    tech: ['Python', 'Machine Learning', 'Data Processing', 'API Integration']
  }
];

export default function Experience() {
  return (
    <section className="py-unit-xl border-t border-outline-variant/20" id="experience">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-unit-xl">
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest block mb-2">02. Career Path</span>
          <h2 className="font-display-lg-mobile md:font-headline-lg text-on-surface">Experience</h2>
        </div>
        
        <div className="flex flex-col border-t border-outline-variant/20">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 py-12 md:py-16 border-b border-outline-variant/10 hover:bg-surface-container-lowest transition-colors"
            >
              <div className="md:col-span-3 flex flex-col md:pt-1">
                <span className="font-label-mono text-sm text-outline tracking-wider mb-2">{exp.period}</span>
                <span className="font-headline-md text-primary">{exp.company}</span>
              </div>
              
              <div className="md:col-span-9 flex flex-col">
                <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-6 group-hover:text-primary transition-colors">
                  {exp.role}
                </h3>
                <p className="font-body-lg text-on-surface-variant max-w-3xl leading-relaxed mb-6">
                  {exp.description}
                </p>
                <div className="mb-2" />
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-surface-container border border-outline-variant/20 rounded font-label-mono text-xs text-on-surface-variant">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
