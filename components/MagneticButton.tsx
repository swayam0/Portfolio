'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: any;
  href?: string;
  target?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export default function MagneticButton({ 
  children, 
  className = ''
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  
  // Spring configuration for smooth, slightly delayed magnetic pull
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointers and no reduced motion preference
    setIsActive(window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Limit movement to max ~6px
    const distanceX = ((clientX - centerX) / (width / 2)) * 6;
    const distanceY = ((clientY - centerY) / (height / 2)) * 6;
    
    x.set(distanceX);
    y.set(distanceY);
  };

  const handleMouseLeave = () => {
    if (!isActive) return;
    x.set(0);
    y.set(0);
  };

  // The outer div catches the mouse events and defines the hover bounds,
  // the inner motion component actually moves.
  return (
    <div 
      className={`inline-block relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={ref}
    >
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}
