'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionPanel from './SectionPanel';
import ScrambleTag from './ScrambleTag';

import { projects as PROJECTS } from '../data/portfolio/projects';

export default function CinematicProjects() {
  return (
    <SectionPanel>
      <div id="projects" className="flex justify-center mb-20 pt-10">
        <span className="text-xs uppercase tracking-widest text-[#888] bg-[#111] px-4 py-2 rounded-full border border-white/5">
          Selected Works
        </span>
      </div>

      <div className="flex flex-col gap-32">
        {PROJECTS.map((project, i) => {
          
          if (project.layout === 'full') {
            return (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative w-full aspect-[21/9] md:aspect-[24/9] rounded-[24px] overflow-hidden border border-white/10 group flex items-end p-8 md:p-12"
              >
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent pointer-events-none" />
                <div className="relative z-10 w-full max-w-3xl">
                  <span className="text-xs uppercase tracking-widest text-amber-500 mb-3 block">{project.category}</span>
                  <h3 className="text-4xl md:text-5xl font-serif text-white mb-4">{project.title}</h3>
                  <p className="text-[#ddd] font-light leading-relaxed text-lg mb-6">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map(tech => (
                      <ScrambleTag key={tech} text={tech} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white" />
                    ))}
                  </div>
                  {project.caption && (
                    <p className="text-sm text-white/60 italic border-l border-amber-500/50 pl-4">
                      &quot;{project.caption}&quot;
                    </p>
                  )}
                </div>
              </motion.div>
            );
          }

          if (project.layout === 'stacked') {
            return (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-8 items-center text-center max-w-4xl mx-auto"
              >
                <div className="w-full relative aspect-video rounded-[24px] overflow-hidden border border-white/10 bg-[#050505]">
                  <Image 
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
                    unoptimized
                  />
                </div>
                <div className="w-full flex flex-col items-center">
                  <span className="text-xs uppercase tracking-widest text-amber-500 mb-3">{project.category}</span>
                  <h3 className="text-4xl font-serif text-white mb-6">{project.title}</h3>
                  <p className="text-[#888] font-light leading-relaxed text-lg mb-8 max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {project.stack.map(tech => (
                      <ScrambleTag key={tech} text={tech} className="px-3 py-1 rounded-full bg-[#111] border border-white/5 text-xs text-[#888]" />
                    ))}
                  </div>
                  {project.caption && (
                    <p className="text-sm text-white/30 italic">
                      &quot;{project.caption}&quot;
                    </p>
                  )}
                </div>
              </motion.div>
            );
          }

          const isLeft = project.layout === 'left';
          return (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full lg:w-1/2 relative aspect-[4/3] rounded-[24px] overflow-hidden border border-white/10 bg-[#050505]">
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
                  unoptimized
                />
              </div>
              <div className="w-full lg:w-1/2 flex flex-col">
                <span className="text-xs uppercase tracking-widest text-amber-500 mb-3">{project.category}</span>
                <h3 className="text-4xl font-serif text-white mb-6">{project.title}</h3>
                <p className="text-[#888] font-light leading-relaxed text-lg mb-8">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.stack.map(tech => (
                    <ScrambleTag key={tech} text={tech} className="px-3 py-1 rounded-full bg-[#111] border border-white/5 text-xs text-[#888]" />
                  ))}
                </div>
                {project.caption && (
                  <p className="text-sm text-white/30 italic border-l border-white/10 pl-4">
                    &quot;{project.caption}&quot;
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionPanel>
  );
}
