'use client';
import { motion } from 'framer-motion';
import SectionPanel from './SectionPanel';

export default function CinematicExperience() {
  return (
    <SectionPanel>
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
          <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-white ring-4 ring-[#0d0d10]" />
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
          <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-[#333] ring-4 ring-[#0d0d10]" />
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
            <h3 className="text-2xl font-light text-white">AI/ML Intern</h3>
            <span className="text-xs uppercase tracking-widest text-[#888] mt-1 md:mt-0">Dec 2025 – May 2026</span>
          </div>
          <div className="text-[#888] mb-4">InternPro</div>
          <p className="text-[#888] font-light leading-relaxed">
            Worked on the development and integration of AI/ML capabilities into practical software applications, including model experimentation, data processing, backend integration, and application development.
          </p>
        </div>

      </motion.div>
    </SectionPanel>
  );
}
