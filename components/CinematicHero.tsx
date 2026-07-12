'use client';
import { motion } from 'framer-motion';

export default function CinematicHero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-full flex flex-col items-center text-center py-32"
    >
      <h1 className="text-4xl sm:text-6xl md:text-8xl font-thin tracking-[0.2em] text-white mb-8 uppercase">
        Swayam Awari
      </h1>
      <p className="text-[#888] font-light text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mb-12">
        Final-year CS student building full-stack + AI/agent products, split between freelance client work and job hunting.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-[#050505] font-medium text-sm hover:scale-105 transition-transform">
          Explore Work ↘
        </button>
        <button className="w-full sm:w-auto px-8 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors">
          View Resume
        </button>
      </div>
    </motion.section>
  );
}
