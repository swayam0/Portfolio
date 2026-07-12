'use client';
import { motion } from 'framer-motion';

export default function CinematicAbout() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="w-full bg-[#0a0a0a] rounded-[24px] border border-white/5 p-8 md:p-12"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-light text-white mb-6">Full-Stack & AI Engineer.</h2>
          <p className="text-[#888] font-light leading-relaxed text-lg">
            My current technical focus lies heavily in Next.js, FastAPI, and building resilient LangChain/RAG pipelines. I enjoy operating across the entire stack, from writing multi-agent workflows to polishing glassmorphic UIs. Right now, I&apos;m balancing active freelance contracts with building my own product, ShipProof, while gearing up for the upcoming placement season.
          </p>
        </div>
        <div className="md:col-span-1 flex flex-col gap-6 text-sm">
          <div>
            <h3 className="text-white font-medium mb-1">Location</h3>
            <p className="text-[#888]">India</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Status</h3>
            <p className="text-[#888]">Open to freelance + full-time roles</p>
          </div>
          <div>
            <h3 className="text-white font-medium mb-1">Connect</h3>
            <div className="flex gap-4 text-[#888]">
              <a href="https://github.com/swayam0" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/5">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Currently Juggling</p>
        <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-[#888] text-sm">Freelance Client Work</span>
          <span className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-[#888] text-sm">Building ShipProof</span>
          <span className="px-4 py-2 rounded-full bg-[#111] border border-white/10 text-[#888] text-sm">CIL Exam Prep</span>
        </div>
      </div>
    </motion.section>
  );
}
