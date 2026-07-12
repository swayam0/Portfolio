'use client';
import { motion } from 'framer-motion';

const LOGS = [
  { time: '12h ago', message: 'shipped Soul Academy → prod' },
  { time: '2d ago', message: 'validating ShipProof w/ agency outreach' },
  { time: '5d ago', message: 'RankFlow → INDIA RUNS submission' },
  { time: '1w ago', message: 'refactored clinical RAG pipeline memory' },
];

export default function BuildLog() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full bg-[#0a0a0a] rounded-[24px] border border-white/5 p-6 md:p-8 font-mono text-sm"
    >
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-white/60">terminal // recent momentum</span>
      </div>
      
      <div className="flex flex-col gap-4">
        {LOGS.map((log, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
            <span className="text-[#444] w-16 shrink-0">{log.time}</span>
            <span className="text-[#888]">{log.message}</span>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
