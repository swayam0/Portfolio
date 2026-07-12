'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';
import TerminalBoot from './TerminalBoot';

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
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#09090b]" id="home">
      {/* CSS Noise Texture Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />
      
      {/* Subtle Gradient Mesh */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <motion.div
            key="boot"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="absolute inset-0 z-50"
          >
            <TerminalBoot onComplete={() => setBootComplete(true)} />
          </motion.div>
        ) : (
          <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full pt-20">
            <motion.div 
              className="max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-unit-sm px-unit-md py-unit-xs border border-primary/20 rounded-full mb-unit-lg bg-primary/5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-mono text-primary text-[10px] md:text-[12px] uppercase tracking-wider">System Online • Ready</span>
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="font-display-lg-mobile md:font-display-lg text-on-surface tracking-tight mb-unit-lg leading-tight">
                Engineering <span className="text-primary">Reliable</span><br />
                Digital Products.
              </motion.h1>
              
              <motion.p variants={itemVariants} className="font-body-lg text-on-surface-variant max-w-2xl mb-unit-xl">
                I develop full-stack applications, backend systems, business websites, and AI-powered features for companies, startups, and users.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-unit-md items-start sm:items-center mb-unit-xl">
                <MagneticButton>
                  <Link href="#projects" className="bg-primary text-on-primary px-unit-lg py-unit-sm rounded-lg font-label-mono text-[14px] uppercase tracking-wider font-bold hover:bg-primary/90 transition-all flex items-center gap-2 block">
                    View Work
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="#contact" className="border border-outline-variant text-on-surface px-unit-lg py-unit-sm rounded-lg font-label-mono text-[14px] uppercase tracking-wider font-bold hover:bg-surface-variant transition-all block">
                    Contact
                  </Link>
                </MagneticButton>
              </motion.div>

              <motion.div variants={itemVariants} className="pt-unit-lg border-t border-outline-variant/30 max-w-xl">
                <div className="flex flex-col sm:flex-row flex-wrap gap-8">
                  <div>
                    <p className="text-outline uppercase text-[10px] font-label-mono mb-1 tracking-wider">Status</p>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <p className="text-primary font-label-mono text-xs whitespace-nowrap">Open to full-time + freelance.</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-outline uppercase text-[10px] font-label-mono mb-2 tracking-wider">Connect</p>
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
        )}
      </AnimatePresence>
    </section>
  );
}
