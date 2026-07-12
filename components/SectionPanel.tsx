'use client';
import { motion } from 'framer-motion';

export default function SectionPanel({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className={`w-full bg-[#0d0d10] rounded-[24px] border border-white/[0.06] shadow-[0_0_40px_rgba(255,255,255,0.02)] px-6 py-12 md:p-24 ${className}`}
    >
      {children}
    </motion.section>
  );
}
