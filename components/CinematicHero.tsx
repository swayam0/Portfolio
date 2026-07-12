'use client';
import { motion } from 'framer-motion';

export default function CinematicHero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif text-white leading-[0.85] tracking-tighter -ml-1 md:-ml-2">
            Swayam<br />Awari<span className="text-amber-500">.</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-5 max-w-2xl pl-6 md:pl-8 border-l border-amber-500/40"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light tracking-tight leading-snug">
            I ship resilient products from end to end.
          </h2>
          <p className="text-[#888] text-lg font-light leading-relaxed">
            Final-year CS student building full-stack + AI/agent products, split between freelance client work and job hunting.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <a href="#work" className="px-8 py-4 rounded-full bg-amber-600 text-white font-medium text-sm hover:bg-amber-500 transition-colors">
            Explore Work ↘
          </a>
          <a href="/resume.pdf" className="px-8 py-4 rounded-full bg-white/5 text-white border border-white/10 font-medium text-sm hover:bg-white/10 transition-colors">
            View Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}
