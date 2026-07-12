'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device supports touch
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'input' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('input')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <motion.div
        animate={{
          scale: isHovering ? 1.5 : 1,
          borderRadius: isHovering ? "0%" : "50%",
          rotate: isHovering ? 90 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="w-full h-full border border-primary flex items-center justify-center bg-primary/10"
      >
        {isHovering && <div className="w-[1px] h-3 bg-primary" />}
      </motion.div>
    </motion.div>
  );
}
