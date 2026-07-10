"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

export default function Header() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `font-label-mono text-label-mono transition-colors duration-300 ${
      isActive
        ? 'text-primary border-b-2 border-primary pb-1'
        : 'text-on-surface-variant hover:text-primary'
    }`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 h-20 flex items-center">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex justify-between items-center w-full">
        <Link href="#" className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
          Swayam Awari
        </Link>
        <div className="hidden lg:flex gap-unit-lg items-center">
          <Link href="#home" className={getLinkClass('home')}>Home</Link>
          <Link href="#about" className={getLinkClass('about')}>About</Link>
          <Link href="#experience" className={getLinkClass('experience')}>Experience</Link>
          <Link href="#projects" className={getLinkClass('projects')}>Projects</Link>
          <Link href="#services" className={getLinkClass('services')}>Services</Link>
          <Link href="#skills" className={getLinkClass('skills')}>Skills</Link>
          <Link href="#contact" className={getLinkClass('contact')}>Contact</Link>
        </div>
        <div className="flex items-center gap-unit-md">
          <button 
            onClick={() => window.dispatchEvent(new CustomEvent('open-command-palette'))}
            className="hidden md:flex items-center gap-2 px-3 py-2 text-on-surface-variant hover:text-primary transition-colors font-label-mono text-xs border border-outline-variant/30 rounded-lg hover:bg-surface-variant"
            aria-label="Search Command Palette"
          >
            <span className="material-symbols-outlined text-sm">search</span>
            <span>⌘K</span>
          </button>
          <Link href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden lg:block border border-outline-variant text-on-surface px-unit-md py-unit-sm rounded-lg font-label-mono text-label-mono hover:bg-surface-variant transition-all">
            Download Resume
          </Link>
          <MagneticButton>
            <Link href="#contact" className="bg-primary text-on-primary px-unit-md py-unit-sm rounded-lg font-label-mono text-label-mono hover:opacity-90 transition-all shadow-lg shadow-primary/20 block">
              Hire Me
            </Link>
          </MagneticButton>
        </div>
      </div>
    </nav>
  );
}
