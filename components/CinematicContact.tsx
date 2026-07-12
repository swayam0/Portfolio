'use client';
import { motion } from 'framer-motion';
import SectionPanel from './SectionPanel';

export default function CinematicContact() {
  return (
    <SectionPanel>
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#888] bg-[#111] px-4 py-2 rounded-full border border-white/5 mb-8 inline-block">
          Get in Touch
        </span>
        <h2 className="text-4xl md:text-5xl font-light text-white mb-6">Let&apos;s build something.</h2>
        <p className="text-[#888] font-light leading-relaxed text-lg mb-10">
          Whether you have a freelance project in mind, need a robust AI pipeline, or just want to chat about tech, my inbox is open.
        </p>
        <a 
          href="mailto:swayamawari@gmail.com"
          className="px-8 py-4 rounded-full bg-white text-[#050505] font-medium text-sm hover:scale-105 transition-transform"
        >
          swayamawari@gmail.com
        </a>
      </div>
    </SectionPanel>
  );
}
