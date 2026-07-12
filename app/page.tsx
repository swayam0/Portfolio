'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import CinematicHero from '@/components/CinematicHero';
import CinematicAbout from '@/components/CinematicAbout';
import CinematicProjects from '@/components/CinematicProjects';
import CinematicExperience from '@/components/CinematicExperience';
import CinematicContact from '@/components/CinematicContact';
import CinematicFooter from '@/components/CinematicFooter';
import CinematicSkills from '@/components/CinematicSkills';
import CinematicNav from '@/components/CinematicNav';

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
          style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
          className="absolute top-0 left-0 w-full h-full bg-amber-500/50 rounded-full"
        />
        {/* The tracking dot */}
        <motion.div 
          style={{ top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
        />
      </div>

      <CinematicNav />

      <main id="home" className="relative z-10 flex flex-col items-center max-w-5xl mx-auto px-6 pt-32 pb-12 gap-24 md:gap-32">
        <CinematicHero />
        <CinematicAbout />
        <CinematicSkills />
        <CinematicProjects />
        <CinematicExperience />
        <CinematicContact />
      </main>
      
      <CinematicFooter />
    </div>
  );
}
