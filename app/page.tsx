'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import CinematicAbout from '@/components/CinematicAbout';
import CinematicProjects from '@/components/CinematicProjects';
import CinematicExperience from '@/components/CinematicExperience';
import BuildLog from '@/components/BuildLog';
import CinematicContact from '@/components/CinematicContact';
import CinematicFooter from '@/components/CinematicFooter';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-[#050505] text-[#888] font-sans selection:bg-white/30 selection:text-white relative">
      
      {/* Background Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)]" />
      </div>

      {/* Global Scroll Indicator (Appears between panels) */}
      <div className="fixed left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-white/[0.03] z-0 hidden lg:block">
        <motion.div 
          className="w-full bg-white/20 origin-top"
          style={{ scaleY, height: '100%' }}
        />
      </div>

      <main className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-6 pt-32 pb-12 gap-24 md:gap-32">
        <CinematicHero />
        <CinematicAbout />
        <CinematicProjects />
        <CinematicExperience />
        <BuildLog />
        <CinematicContact />
      </main>
      
      <CinematicFooter />
    </div>
  );
}
