'use client';
import { motion } from 'framer-motion';
import SectionPanel from './SectionPanel';

export default function CinematicAbout() {
  return (
    <SectionPanel>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-4xl font-serif text-white mb-8">Full-Stack & AI Engineer.</h2>
          <p className="text-[#888] font-light leading-relaxed text-lg mb-6">
            My current technical focus lies heavily in Next.js, FastAPI, and building resilient LangChain/RAG pipelines. I enjoy operating across the entire stack, from writing multi-agent workflows to polishing glassmorphic UIs.
          </p>
          <p className="text-[#888] font-light leading-relaxed text-lg">
            Right now, I&apos;m splitting my time across freelance client work, product validation, and campus placement prep.
          </p>
        </div>
        
        <div className="md:col-span-1 flex flex-col gap-8 text-sm border-l border-white/5 pl-8">
          <div>
            <h3 className="text-white/40 uppercase tracking-widest text-xs mb-2">Location</h3>
            <p className="text-[#ddd] font-medium">India</p>
          </div>
          <div>
            <h3 className="text-white/40 uppercase tracking-widest text-xs mb-2">Status</h3>
            <p className="text-amber-500 font-medium">Open to freelance + full-time roles</p>
          </div>
          <div>
            <h3 className="text-white/40 uppercase tracking-widest text-xs mb-2">Connect</h3>
            <div className="flex flex-col gap-2 text-[#888]">
              <a href="https://github.com/swayam0" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10 border-t border-white/5">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-6">Currently Juggling</p>
        <div className="flex flex-wrap gap-4">
          <span className="px-5 py-2.5 rounded-full bg-[#111] border border-white/5 text-[#888] text-sm">Freelancing</span>
          <span className="px-5 py-2.5 rounded-full bg-[#111] border border-white/5 text-[#888] text-sm">Job Hunting</span>
          <span className="px-5 py-2.5 rounded-full bg-[#111] border border-white/5 text-[#888] text-sm">Final-Year Student</span>
        </div>
      </div>
    </SectionPanel>
  );
}
