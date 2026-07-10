'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Command = {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  action: () => void;
  icon: string;
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Navigation commands
  const commands: Command[] = [
    { id: 'nav-home', title: 'Home', category: 'Navigation', keywords: ['home', 'start'], icon: 'home', action: () => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'nav-about', title: 'View About', category: 'Navigation', keywords: ['about', 'bio', 'who'], icon: 'person', action: () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'nav-experience', title: 'View Experience', category: 'Navigation', keywords: ['experience', 'work', 'job', 'intern'], icon: 'work', action: () => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'nav-projects', title: 'View Projects', category: 'Navigation', keywords: ['projects', 'portfolio', 'work'], icon: 'grid_view', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'nav-services', title: 'View Services', category: 'Navigation', keywords: ['services', 'offer', 'freelance'], icon: 'design_services', action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'nav-skills', title: 'View Skills', category: 'Navigation', keywords: ['skills', 'tech', 'stack'], icon: 'code', action: () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'nav-contact', title: 'View Contact', category: 'Navigation', keywords: ['contact', 'email', 'message'], icon: 'mail', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    
    // Projects
    { id: 'proj-1', title: 'AI-Based Public Grievance Analysis', category: 'Projects', keywords: ['ai', 'nlp', 'distilbert', 'grievance'], icon: 'analytics', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'proj-2', title: 'Codelura', category: 'Projects', keywords: ['codelura', 'learning', 'platform', 'ai'], icon: 'school', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'proj-3', title: 'Yantra', category: 'Projects', keywords: ['yantra', 'ai', 'learning', 'voice'], icon: 'record_voice_over', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'proj-4', title: 'AstroVastu Web Platform', category: 'Projects', keywords: ['astrovastu', 'webinar', 'live'], icon: 'video_camera_front', action: () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) },
    
    // Actions
    { id: 'act-freelance', title: 'Start a Freelance Project', category: 'Actions', keywords: ['freelance', 'hire', 'contract'], icon: 'handshake', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
    { id: 'act-resume', title: 'Download Resume', category: 'Actions', keywords: ['resume', 'cv', 'pdf'], icon: 'download', action: () => window.open('/resume.pdf', '_blank') },
    { id: 'act-github', title: 'Open GitHub', category: 'Actions', keywords: ['github', 'code', 'repo'], icon: 'code', action: () => window.open('https://github.com/swayam0', '_blank') },
    { id: 'act-linkedin', title: 'Open LinkedIn', category: 'Actions', keywords: ['linkedin', 'social', 'connect'], icon: 'group', action: () => window.open('https://linkedin.com/in/swayam-awari', '_blank') },
    { id: 'act-email', title: 'Copy Email Address', category: 'Actions', keywords: ['email', 'copy', 'address'], icon: 'content_copy', action: () => { navigator.clipboard.writeText('swayamawari1@gmail.com'); alert('Email copied!'); } },
  ];

  const filteredCommands = query 
    ? commands.filter(cmd => 
        cmd.title.toLowerCase().includes(query.toLowerCase()) || 
        cmd.keywords.some(kw => kw.toLowerCase().includes(query.toLowerCase()))
      )
    : commands;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      if (e.type === 'open-command-palette') {
        setIsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleKeyDown as any);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleKeyDown as any);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleExecute = useCallback((cmd: Command) => {
    setIsOpen(false);
    setTimeout(() => {
      cmd.action();
    }, 150);
  }, []);

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        handleExecute(filteredCommands[activeIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 bg-surface/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="w-full max-w-2xl bg-surface-container rounded-xl border border-outline-variant/30 shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[60vh]"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            onKeyDown={handleModalKeyDown}
          >
            <div className="flex items-center px-4 py-3 border-b border-outline-variant/20">
              <span className="material-symbols-outlined text-outline mr-3">search</span>
              <input
                ref={inputRef}
                type="text"
                className="flex-1 bg-transparent text-on-surface font-body-lg placeholder:text-outline focus:outline-none"
                placeholder="Search commands..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-autocomplete="list"
                aria-controls="command-palette-results"
                aria-activedescendant={filteredCommands[activeIndex]?.id}
              />
              <div className="flex items-center gap-1">
                <span className="px-2 py-1 bg-surface rounded text-[10px] font-label-mono text-outline uppercase border border-outline-variant/20">ESC</span>
              </div>
            </div>

            <div 
              className="overflow-y-auto p-2" 
              id="command-palette-results"
              role="listbox"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-on-surface-variant font-body-md">
                  No commands found for &quot;{query}&quot;
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={cmd.id}
                      id={cmd.id}
                      role="option"
                      aria-selected={isActive}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant'
                      }`}
                      onClick={() => handleExecute(cmd)}
                      onMouseEnter={() => setActiveIndex(index)}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`material-symbols-outlined text-[18px] ${isActive ? 'text-primary' : 'text-outline'}`}>
                          {cmd.icon}
                        </span>
                        <span className={`font-body-md ${isActive ? 'text-on-surface' : ''}`}>
                          {cmd.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-label-mono uppercase tracking-wider opacity-50 hidden sm:block">
                        {cmd.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="px-4 py-3 bg-surface-container-lowest border-t border-outline-variant/20 flex gap-4 text-[10px] font-label-mono text-outline uppercase tracking-wider">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">keyboard_return</span> Execute
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">unfold_more</span> Navigate
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
