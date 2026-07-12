'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const InteractiveNodeGraph = dynamic(() => import('./InteractiveNodeGraph'), {
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center font-label-mono text-xs text-outline-variant">Loading graph...</div>
});

const skills = {
  primary: ['TypeScript', 'Next.js', 'React', 'Python', 'FastAPI'],
  experienced: ['PostgreSQL', 'MongoDB', 'Node.js', 'Express', 'Tailwind CSS', 'Docker', 'Git'],
  familiar: ['PyTorch', 'TensorFlow', 'AWS', 'Redis', 'GraphQL', 'Prisma', 'Supabase']
};

export default function Skills() {
  return (
    <section className="py-unit-xl border-t border-outline-variant/20" id="skills">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="mb-unit-xl">
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest block mb-2">$ cat ./skills.json</span>
          <h2 className="font-display-lg-mobile md:font-headline-lg text-on-surface">Skills Matrix</h2>
        </div>
        
        <InteractiveNodeGraph />
        
        <div className="flex flex-col gap-16 md:gap-24 mt-24">
          {/* Primary */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-baseline"
          >
            <div className="md:w-1/4">
              <h3 className="font-label-mono text-sm uppercase tracking-widest text-primary">Primary</h3>
              <p className="text-on-surface-variant text-sm mt-2">Daily toolkit. Deeply comfortable architecture and building from scratch.</p>
            </div>
            <div className="md:w-3/4 flex flex-wrap gap-x-8 gap-y-4">
              {skills.primary.map((skill, i) => (
                <span key={i} className="font-headline-lg text-4xl md:text-5xl text-on-surface tracking-tight hover:text-primary transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Experienced */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-baseline border-t border-outline-variant/10 pt-16 md:pt-24"
          >
            <div className="md:w-1/4">
              <h3 className="font-label-mono text-sm uppercase tracking-widest text-on-surface-variant">Experienced</h3>
              <p className="text-outline text-sm mt-2">Solid production experience. Confident in debugging and integration.</p>
            </div>
            <div className="md:w-3/4 flex flex-wrap gap-x-6 gap-y-3">
              {skills.experienced.map((skill, i) => (
                <span key={i} className="font-headline-md text-2xl md:text-3xl text-on-surface-variant hover:text-on-surface transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Familiar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row gap-6 md:gap-12 md:items-baseline border-t border-outline-variant/10 pt-16 md:pt-24"
          >
            <div className="md:w-1/4">
              <h3 className="font-label-mono text-sm uppercase tracking-widest text-outline">Familiar</h3>
              <p className="text-outline/70 text-sm mt-2">Past usage or learning. Comfortable picking up when needed.</p>
            </div>
            <div className="md:w-3/4 flex flex-wrap gap-x-4 gap-y-2">
              {skills.familiar.map((skill, i) => (
                <span key={i} className="font-body-lg text-lg text-outline hover:text-on-surface-variant transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
