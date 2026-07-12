"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const bootLines = [
  { text: "$ whoami", type: "input" },
  { text: "> Swayam Awari — Full-Stack & AI Integration Engineer", type: "output" },
  { text: "$ status --current", type: "input" },
  { text: "> Open to full-time + freelance", type: "output" },
];

export default function TerminalBoot({ onComplete }: { onComplete: () => void }) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= bootLines.length) {
      setIsTyping(false);
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }

    const currentLine = bootLines[currentLineIndex];
    let charIndex = 0;
    
    if (currentLine.type === 'output') {
      // Output lines appear instantly or very fast
      setDisplayedText(currentLine.text);
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setDisplayedText("");
      }, 500);
      return () => clearTimeout(timer);
    } else {
      // Input lines type out
      const typeInterval = setInterval(() => {
        if (charIndex <= currentLine.text.length) {
          setDisplayedText(currentLine.text.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            setCurrentLineIndex(prev => prev + 1);
            setDisplayedText("");
          }, 300);
        }
      }, 30);
      return () => clearInterval(typeInterval);
    }
  }, [currentLineIndex, onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-center bg-[#09090b] px-margin-mobile md:px-margin-desktop">
      <div className="w-full max-w-4xl mx-auto font-label-mono text-sm md:text-base">
        {bootLines.slice(0, currentLineIndex).map((line, i) => (
          <div key={i} className={`mb-2 ${line.type === 'output' ? 'text-on-surface-variant' : 'text-primary'}`}>
            {line.text}
          </div>
        ))}
        
        {currentLineIndex < bootLines.length && (
          <div className="mb-2 text-primary flex items-center">
            <span>{displayedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 h-4 bg-primary ml-1"
            />
          </div>
        )}
      </div>
    </div>
  );
}
