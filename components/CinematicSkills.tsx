'use client';
import { motion } from 'framer-motion';
import SectionPanel from './SectionPanel';
import ScrambleTag from './ScrambleTag';

import { skills as SKILLS_CATEGORIES } from '../data/portfolio/skills';

export default function CinematicSkills() {
  return (
    <SectionPanel>
      <div id="skills" className="flex justify-center mb-16 pt-10">
        <span className="text-xs uppercase tracking-widest text-[#888] bg-[#111] px-4 py-2 rounded-full border border-white/5">
          Stack
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {SKILLS_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-lg font-serif text-white/90">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map(skill => (
                <ScrambleTag
                  key={skill}
                  text={skill}
                  className="px-3 py-1 rounded-full bg-[#111] border border-white/5 text-xs text-[#888] hover:text-white hover:border-white/20 transition-colors"
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionPanel>
  );
}
