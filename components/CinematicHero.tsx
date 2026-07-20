'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
import Hero3D from './Hero3D';
import { profile } from '@/data/portfolio/profile';

const QUOTES = [
  "currently has 4 tabs open about the same bug",
  "last deploy: today, 2am, don't ask",
  "probably writing a prompt right now",
  "refusing to center a div since 2021",
  "coffee to code ratio critically unbalanced",
];

export default function CinematicHero() {
  const [hoverQuote, setHoverQuote] = useState("");
  const [displayedQuote, setDisplayedQuote] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isHovered && hoverQuote) {
      let i = 0;
      const type = () => {
        setDisplayedQuote(hoverQuote.substring(0, i));
        i++;
        if (i <= hoverQuote.length) {
          timeout = setTimeout(type, 30);
        }
      };
      type();
    } else {
      setDisplayedQuote("");
    }
    return () => clearTimeout(timeout);
  }, [isHovered, hoverQuote]);

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden">
      <Hero3D />
      <div className="max-w-5xl relative z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl text-amber-500 font-medium tracking-tight inline-block cursor-default relative pointer-events-auto"
            onMouseEnter={() => {
              if (!isHovered) {
                setHoverQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
                setIsHovered(true);
              }
            }}
            onMouseLeave={() => setIsHovered(false)}
          >
            Swayam Awari
            {isHovered && (
              <span className="absolute left-full ml-6 top-1/2 -translate-y-1/2 text-sm text-[#888] font-mono whitespace-nowrap hidden md:inline-block tracking-normal">
                &gt; {displayedQuote}<span className="animate-pulse">_</span>
              </span>
            )}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] tracking-tighter -ml-1">
            I build things that work.<br />
            <span className="text-white/80">Then I make sure they keep working.</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-8 max-w-3xl"
        >
          <p className="text-[#888] text-lg md:text-xl font-light leading-relaxed max-w-2xl">
            Full-stack + AI engineer, split between freelance client work and full-time job hunting.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-6 pointer-events-auto"
        >
          <MagneticButton>
            <a href="#projects" className="px-8 py-4 rounded-full bg-amber-600 text-white font-medium text-sm hover:bg-amber-500 transition-colors inline-block">
              Explore Work ↘
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-medium text-sm hover:bg-white/10 transition-colors inline-block">
              View Resume
            </a>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
