'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CHARS = '!<>-_\\\\/[]{}—=+*^?#_';

export default function ScrambleTag({ 
  text, 
  className = "" 
}: { 
  text: string;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(motionMedia.matches);
  }, []);

  useEffect(() => {
    if (!isInView || reduceMotion) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = 10;
    let interval: NodeJS.Timeout;

    interval = setInterval(() => {
      setDisplayText((prev) => {
        return text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += text.length / maxIterations;
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, text, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {reduceMotion ? text : displayText}
    </span>
  );
}
