'use client';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', href: '#home', type: 'scroll' },
  { label: 'Skills', href: '#skills', type: 'scroll' },
  { label: 'Projects', href: '#projects', type: 'scroll' },
  { label: 'Contact', href: '#contact', type: 'scroll' },
];

export default function CinematicNav() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is near the top of the viewport
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          <button 
            onClick={scrollToTop}
            className="text-white font-serif text-xl tracking-tighter hover:text-amber-500 transition-colors"
          >
            SA<span className="text-amber-500">.</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-medium transition-colors uppercase tracking-widest relative ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                  onClick={(e) => {
                    // We'll let native anchor scroll handle it, or we can wire smooth scroll later as requested
                    setActiveSection(item.href.replace('#', ''));
                  }}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-amber-500 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Mobile Nav Toggle */}
          <button 
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden flex flex-col gap-6">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.href.replace('#', ''));
                  setIsMobileMenuOpen(false);
                }}
                className={`text-2xl font-serif transition-colors ${
                  isActive ? 'text-amber-500' : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
