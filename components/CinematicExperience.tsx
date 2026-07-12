'use client';
import { motion } from 'framer-motion';

export default function CinematicExperience() {
  return (
    <section className="w-full bg-[#0a0a0a] rounded-[24px] border border-white/5 p-8 md:p-12">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-[#888] bg-[#111] px-4 py-2 rounded-full border border-white/5 mb-6 inline-block">
          Experience
        </span>
        <p className="text-sm text-white/30 italic max-w-xl mx-auto">
          &quot;balancing full-time roles with freelance gigs forces you to write code that doesn&apos;t break at 3 AM&quot;
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto relative border-l border-white/10 ml-4 md:ml-auto"
      >
        
        <div className="relative pl-8 pb-16">
          <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-[#0a0a0a]" />
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
            <h3 className="text-2xl font-light text-white">Software Engineer</h3>
            <span className="text-xs uppercase tracking-widest text-[#888] mt-1 md:mt-0">June 2026 – Present</span>
          </div>
          <div className="text-[#888] mb-4">Axaon Software</div>
          <p className="text-[#888] font-light leading-relaxed">
            Currently architecting robust state management systems and optimizing performance across high-traffic frontend applications.
          </p>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#333] ring-4 ring-[#0a0a0a]" />
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
            <h3 className="text-2xl font-light text-white">Frontend Developer</h3>
            <span className="text-xs uppercase tracking-widest text-[#888] mt-1 md:mt-0">2023 – 2024</span>
          </div>
          <div className="text-[#888] mb-4">Alpixn</div>
          <p className="text-[#888] font-light leading-relaxed">
            Spearheaded migration to Next.js App Router and optimized core web vitals for critical client applications.
          </p>
        </div>

      </motion.div>
    </section>
  );
}
