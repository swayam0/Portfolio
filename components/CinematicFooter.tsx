'use client';
import { motion } from 'framer-motion';

export default function CinematicFooter() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#0a0a0a] border-t border-white/5 py-32 mt-32">
      {/* Giant Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-thin tracking-widest text-white/[0.02] select-none pointer-events-none whitespace-nowrap">
        SWAYAM
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-light text-white mb-12">
          Building things people actually ship.
        </h2>
        
        <a 
          href="mailto:swayamawari@gmail.com" 
          className="text-xl md:text-2xl text-[#888] hover:text-white border-b border-[#888]/30 hover:border-white transition-all pb-2 mb-16"
        >
          swayamawari@gmail.com
        </a>

        <div className="flex items-center gap-8 text-xs uppercase tracking-widest text-[#555]">
          <a href="https://github.com/swayam0" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
        </div>
        
        <div className="mt-16 text-[#333] text-xs">
          © {new Date().getFullYear()} Swayam Awari. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
