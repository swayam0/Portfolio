'use client';
import { motion } from 'framer-motion';
import SectionPanel from './SectionPanel';
import ContactForm from './ContactForm';

export default function CinematicContact() {
  return (
    <SectionPanel>
      <div id="contact" className="flex flex-col items-center text-center max-w-2xl mx-auto pt-10">
        <span className="text-xs uppercase tracking-widest text-[#888] bg-[#111] px-4 py-2 rounded-full border border-white/5 mb-8 inline-block">
          Get in Touch
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Let&apos;s build something.</h2>
        <p className="text-[#888] font-light leading-relaxed text-lg mb-4">
          Whether you have a freelance project in mind, need a robust AI pipeline, or just want to chat about tech, my inbox is open.
        </p>
      </div>
      <ContactForm />
    </SectionPanel>
  );
}
