'use client';
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function Spotlight() {
  const [isTouch, setIsTouch] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth trailing movement using springs
  const springConfig = { damping: 40, stiffness: 200, mass: 1.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check for touch or reduced motion
    const touchMedia = window.matchMedia('(pointer: coarse)');
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    setIsTouch(touchMedia.matches);
    setReduceMotion(motionMedia.matches);

    if (touchMedia.matches || motionMedia.matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (isTouch || reduceMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at calc(${smoothX} * 1px) calc(${smoothY} * 1px), rgba(245, 158, 11, 0.04), rgba(255, 255, 255, 0.01) 40%, transparent 70%)`,
        mixBlendMode: 'screen'
      }}
    />
  );
}
