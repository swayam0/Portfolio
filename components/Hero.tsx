'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import dynamic from 'next/dynamic';
import MagneticButton from './MagneticButton';

const AbstractNodeCanvas = dynamic(() => import('./AbstractNodeCanvas'), {
  ssr: false,
});

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden" id="home">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <AbstractNodeCanvas />
        </Suspense>
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-surface/50 via-surface/80 to-surface z-0 pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full pt-20">
        <motion.div 
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-unit-sm px-unit-md py-unit-xs glass-card rounded-full mb-unit-lg">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-mono text-label-mono text-on-surface-variant text-[10px] md:text-[12px]">Software Engineer • Full Stack Developer</span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mb-unit-lg">
            I build reliable software and digital products.
          </motion.h1>
          
          <motion.p variants={itemVariants} className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-unit-xl">
            I develop full-stack applications, backend systems, business websites, and AI-powered features for companies, startups, and users.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-unit-md items-start sm:items-center mb-unit-xl">
            <MagneticButton>
              <Link href="#projects" className="glow-button bg-primary text-on-primary px-unit-lg py-unit-sm rounded-lg font-headline-md text-[16px] font-bold hover:bg-primary-container transition-all flex items-center gap-2 block">
                View Projects
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="#contact" className="border border-outline-variant text-on-surface px-unit-lg py-unit-sm rounded-lg font-headline-md text-[16px] font-bold hover:bg-surface-variant transition-all block">
                Start a Project
              </Link>
            </MagneticButton>
            <Link href="/resume.pdf" target="_blank" className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-colors underline underline-offset-4 ml-0 sm:ml-4 mt-4 sm:mt-0">
              Download Resume
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-unit-lg border-t border-outline-variant/30 max-w-xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-outline uppercase text-[10px] font-label-mono mb-1 tracking-wider">Status</p>
                <p className="text-tertiary font-label-mono text-xs">Currently taking on 1-2 freelance projects — responds within 24 hours.</p>
              </div>
              <div>
                <p className="text-outline uppercase text-[10px] font-label-mono mb-1 tracking-wider">Career Focus</p>
                <p className="text-primary font-label-mono text-xs">Software Engineering</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-outline uppercase text-[10px] font-label-mono mb-2 tracking-wider">Core Connect</p>
                <div className="flex gap-4">
                  <Link href="https://github.com/swayam0" target="_blank" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-mono text-xs">
                    GitHub <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </Link>
                  <Link href="https://linkedin.com/in/swayam-awari" target="_blank" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1 font-label-mono text-xs">
                    LinkedIn <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
