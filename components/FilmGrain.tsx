'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function FilmGrain() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionMedia.matches);
  }, []);

  return (
    <motion.div
      initial={{ opacity: reduceMotion ? 0.03 : 0 }}
      animate={{ opacity: 0.03 }}
      transition={{ duration: 1 }}
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
      }}
    />
  );
}
