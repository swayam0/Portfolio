'use client';
import { motion } from 'framer-motion';
import SectionPanel from './SectionPanel';

const EXPERIENCES = [
  {
    role: 'Full-Stack Developer',
    company: 'Axaon Software',
    date: 'JUN 2026 — JUL 2026',
    description: 'Engineered and maintained robust web applications, focusing on scalable backend architecture and responsive frontend components.'
  },
  {
    role: 'AI/ML Intern',
    company: 'InternPro',
    date: 'DEC 2025 — MAY 2026',
    description: 'Development and integration of AI/ML capabilities into practical software applications, including model experimentation and data processing.'
  }
];

export default function CinematicExperience() {
  return (
    <SectionPanel>
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-xs uppercase tracking-widest text-[#888] bg-[#111] px-4 py-2 rounded-full border border-white/5 mb-6">
          Experience
        </span>
        <p className="text-sm text-white/30 italic">
          &quot;Freelancing while job-hunting is just working two full-time jobs with half the sleep.&quot;
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-[7px] top-4 bottom-4 w-px bg-white/10" />
        
        <div className="flex flex-col gap-16">
          {EXPERIENCES.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-2 w-[15px] h-[15px] rounded-full bg-[#050505] border-2 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />
              
              <div className="flex flex-col gap-2 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                  <h3 className="text-2xl font-serif text-white">{exp.role}</h3>
                  <span className="text-xs uppercase tracking-widest text-amber-500/80 font-medium">
                    {exp.date}
                  </span>
                </div>
                <h4 className="text-lg text-[#888] font-light">{exp.company}</h4>
              </div>
              
              <p className="text-[#888] font-light leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionPanel>
  );
}
