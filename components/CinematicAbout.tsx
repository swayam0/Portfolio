'use client';
import { motion } from 'framer-motion';

export default function CinematicAbout() {
  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Bio Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-2 bg-[#0d0d10] rounded-[24px] border border-white/[0.06] shadow-[0_0_40px_rgba(255,255,255,0.02)] p-8 md:p-12 flex flex-col justify-center"
        >
          <h2 className="text-3xl font-light text-white mb-6">Full-Stack & AI Engineer.</h2>
          <p className="text-[#888] font-light leading-relaxed text-lg">
            My technical focus lies heavily in Next.js, FastAPI, and building resilient LangChain/RAG pipelines. I enjoy operating across the entire stack, from writing multi-agent workflows to polishing glassmorphic UIs. Right now, I&apos;m splitting my time across freelance client work, product validation, and campus placement prep.
          </p>
        </motion.div>

        {/* Metadata Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="md:col-span-1 bg-[#0d0d10] rounded-[24px] border border-white/[0.06] shadow-[0_0_40px_rgba(255,255,255,0.02)] p-8 md:p-12 flex flex-col gap-8 justify-center"
        >
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">Location</h3>
            <p className="text-[#ddd] font-medium">India</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">Status</h3>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-[#ddd] font-medium text-sm">Open to roles</p>
            </div>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2">Connect</h3>
            <div className="flex gap-4 text-[#888] text-sm mt-1">
              <a href="https://github.com/swayam0" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Currently Juggling Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="w-full bg-[#0d0d10] rounded-[24px] border border-white/[0.06] shadow-[0_0_40px_rgba(255,255,255,0.02)] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/60">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 22v-5m0-10V2m-2 7l-3-3m10 0l-3 3M5 12H2m20 0h-3m-1 7l-3-3m-8 0l-3 3"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium text-lg">Currently Juggling</h3>
            <p className="text-[#888] text-sm">What I&apos;m focused on this month</p>
          </div>
        </div>
        <div className="flex flex-wrap md:justify-end gap-3">
          <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#ddd] text-sm font-medium whitespace-nowrap">Freelancing</span>
          <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#ddd] text-sm font-medium whitespace-nowrap">Building ShipProof</span>
          <span className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-[#ddd] text-sm font-medium whitespace-nowrap">CIL Exam Prep</span>
        </div>
      </motion.div>
    </section>
  );
}
