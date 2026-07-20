"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { profile } from '@/data/portfolio/profile';

const sections = [
  { id: 'home', label: 'index.tsx' },
  { id: 'about', label: 'about.tsx' },
  { id: 'experience', label: 'experience.tsx' },
  { id: 'projects', label: 'projects.tsx' },
  { id: 'services', label: 'services.tsx' },
  { id: 'skills', label: 'skills.tsx' },
  { id: 'contact', label: 'contact.tsx' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = document.querySelectorAll('section');
      let current = 'home';
      sectionElements.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id') || 'home';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#09090b] border-b border-outline-variant/30 h-12 flex items-end">
      <div className="flex w-full overflow-x-auto no-scrollbar h-full">
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <Link
              key={id}
              href={`#${id}`}
              className={`relative h-full flex items-center px-4 font-label-mono text-sm whitespace-nowrap border-r border-outline-variant/30 transition-colors ${
                isActive ? 'text-primary bg-[#18181b]' : 'text-on-surface-variant hover:bg-surface-variant/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`text-xs ${isActive ? 'text-[#eab308]' : 'text-on-surface-variant'}`}>
                  {'< >'}
                </span>
                {label}
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-0 w-full h-[2px] bg-primary"
                  transition={{ duration: 0.2 }}
                />
              )}
            </Link>
          );
        })}
      </div>
      
      {/* Right side controls */}
      <div className="hidden md:flex items-center gap-4 px-4 h-full bg-[#09090b] border-l border-outline-variant/30">
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-mono text-xs"
          aria-label="Search Command Palette"
        >
          <span className="material-symbols-outlined text-[14px]">search</span>
          ⌘K
        </button>
        <Link href={profile.links.resume} target="_blank" className="font-label-mono text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">download</span>
          {profile.links.resume.split('/').pop()}
        </Link>
      </div>
    </nav>
  );
}
