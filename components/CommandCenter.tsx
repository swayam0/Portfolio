'use client';

import React, { useEffect, useState, useRef, FormEvent, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, ChevronRight, Briefcase, Code, Sparkles, Mail, ArrowRight } from 'lucide-react';

// Using window.va for vercel analytics if it exists, otherwise a safe no-op.
const trackEvent = (eventName: string, data?: Record<string, any>) => {
  try {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('event', eventName, data);
    }
  } catch (e) {
    // Ignore analytics errors silently
  }
};

type Evidence = {
  title: string;
  type: string;
  description: string;
  technologies?: string[];
  href?: string;
};

type Action = {
  label: string;
  type: string;
  href: string;
};

const SUGGESTED_PROMPTS = [
  "Why should I interview Swayam?",
  "Does Swayam have AI experience?",
  "What is Swayam's frontend stack?",
  "Does Swayam know backend development?",
  "View resume",
  "Contact Swayam"
];

export default function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentEvidence, setCurrentEvidence] = useState<Evidence[]>([]);
  const [currentActions, setCurrentActions] = useState<Action[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Focus Trapping & Keyboard interactions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (isOpen && e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
      
      // Trap Focus
      if (isOpen && e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        if (focusable.length > 0) {
          const first = focusable[0] as HTMLElement;
          const last = focusable[focusable.length - 1] as HTMLElement;
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      trackEvent('operator_opened');
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      // Restore focus to trigger
      triggerRef.current?.focus();
      
      setInput('');
      setCurrentAnswer('');
      setCurrentEvidence([]);
      setCurrentActions([]);
      setHasSearched(false);
      setErrorMsg('');
    }
  }, [isOpen]);

  const handleSubmit = async (e?: FormEvent, overrideQuery?: string) => {
    e?.preventDefault();
    const query = overrideQuery || input;
    if (!query.trim()) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setInput(query);
    setHasSearched(true);
    setIsStreaming(true);
    setCurrentAnswer('');
    setCurrentEvidence([]);
    setCurrentActions([]);
    setErrorMsg('');
    
    if (overrideQuery) {
      trackEvent('operator_quick_prompt_clicked', { prompt: query.substring(0, 50) });
    } else {
      trackEvent('operator_question_submitted');
    }

    try {
      const res = await fetch('/api/operator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
        signal: abortControllerRef.current.signal
      });

      if (!res.ok || !res.body) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.data || errData?.error || "Failed to fetch response");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let textBuffer = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          textBuffer += decoder.decode(value, { stream: true });
          const lines = textBuffer.split('\n');
          textBuffer = lines.pop() || '';
          
          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              const event = JSON.parse(line);
              switch (event.type) {
                case 'answer_delta':
                  setCurrentAnswer(prev => prev + event.data);
                  break;
                case 'evidence':
                  setCurrentEvidence(prev => {
                     // Ensure unique ids by title
                     const existing = new Set(prev.map(p => p.title));
                     const newEv = event.data.filter((d: any) => !existing.has(d.title));
                     return [...prev, ...newEv];
                  });
                  break;
                case 'actions':
                  setCurrentActions(event.data);
                  break;
                case 'error':
                  setErrorMsg(event.data);
                  trackEvent('operator_answer_failed', { error: event.data });
                  break;
                case 'complete':
                  trackEvent('operator_answer_completed');
                  break;
              }
            } catch (err) {
              console.error("Failed to parse NDJSON event", err);
            }
          }
          
          if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
        }
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        const msg = err.message || "Connection lost. Please try again.";
        setErrorMsg(msg);
        trackEvent('operator_answer_failed', { error: msg });
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'project': return <Briefcase className="w-4 h-4 text-amber-500" />;
      case 'skill': return <Code className="w-4 h-4 text-amber-500" />;
      default: return <Sparkles className="w-4 h-4 text-amber-500" />;
    }
  };

  const handleActionClick = (action: Action) => {
    if (action.href.includes('resume')) {
      trackEvent('operator_resume_opened');
    } else if (action.type === 'email') {
      trackEvent('operator_contact_clicked');
    }
  };

  return (
    <>
      <button 
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#111] hover:bg-[#1a1a1a] text-amber-500 border border-white/10 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:border-amber-500/30 group flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
        aria-label="Open AI Portfolio Operator"
        aria-expanded={isOpen}
      >
        <Terminal size={20} />
        <span className="text-xs font-mono tracking-widest uppercase opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto overflow-hidden transition-all duration-300 whitespace-nowrap hidden md:inline-block">
          Ctrl+K
        </span>
        <span className="text-xs font-mono tracking-widest uppercase opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto overflow-hidden transition-all duration-300 whitespace-nowrap md:hidden inline-block">
          Ask AI
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 px-4 pb-10 sm:pt-[10vh]">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="operator-title"
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] ring-1 ring-white/5 sm:h-auto h-[90vh]"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0a0a0a]">
                <div className="flex items-center gap-3">
                  <Terminal size={18} className="text-amber-500" aria-hidden="true" />
                  <h2 id="operator-title" className="text-sm font-medium text-white/90">Portfolio Operator</h2>
                  <div className="flex items-center gap-2 ml-2 px-2 py-1 bg-amber-500/10 rounded-full border border-amber-500/20" aria-hidden="true">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider text-amber-500">Active</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1 rounded" aria-hidden="true">ESC to close</span>
                  <button 
                    onClick={() => setIsOpen(false)} 
                    className="text-white/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded p-1"
                    aria-label="Close Portfolio Operator"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="p-4 sm:p-6 border-b border-white/5 bg-[#050505]">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                  <ChevronRight className="absolute left-2 w-6 h-6 text-amber-500" aria-hidden="true" />
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about projects, skills, or experience..."
                    aria-label="Ask a question about Swayam's portfolio"
                    className="w-full bg-transparent pl-10 pr-16 py-2 text-base sm:text-lg text-white placeholder-white/30 focus:outline-none font-light focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                  />
                  <button 
                    type="submit" 
                    className="absolute right-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider transition-colors disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                    disabled={isStreaming || !input.trim()}
                    aria-label="Submit question"
                  >
                    Enter
                  </button>
                </form>
              </div>

              {/* Content Area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth" aria-live={isStreaming ? "polite" : "off"} aria-atomic="false">
                {!hasSearched ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs uppercase tracking-widest text-white/40 mb-3" id="suggested-queries-label">Suggested Queries</h3>
                      <div className="flex flex-wrap gap-2" role="group" aria-labelledby="suggested-queries-label">
                        {SUGGESTED_PROMPTS.map(prompt => (
                          <button
                            key={prompt}
                            onClick={() => handleSubmit(undefined, prompt)}
                            className="text-left text-sm text-white/70 bg-white/5 border border-white/10 hover:border-amber-500/50 hover:text-white hover:bg-amber-500/5 px-4 py-2 rounded-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 pb-4">
                    {/* Screen reader only complete answer - avoid stuttering */}
                    <div className="sr-only" aria-live={!isStreaming ? "assertive" : "off"}>
                      {!isStreaming && currentAnswer ? `Answer: ${currentAnswer}` : ''}
                    </div>

                    {errorMsg && (
                       <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm" role="alert">
                         {errorMsg}
                       </div>
                    )}

                    <div className="prose prose-invert prose-p:leading-relaxed prose-p:text-white/80 max-w-none text-sm sm:text-base" aria-hidden="true">
                      <p>
                        {currentAnswer}
                        {isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-amber-500 animate-pulse align-middle" aria-hidden="true" />}
                      </p>
                    </div>
                    
                    {currentEvidence.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs uppercase tracking-widest text-white/40">Evidence</h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {currentEvidence.map((item, idx) => (
                            <a 
                              key={idx}
                              href={item.href || '#'} 
                              onClick={(e) => {
                                trackEvent('operator_evidence_clicked', { evidence: item.title });
                                if(item.href?.startsWith('#')) {
                                  e.preventDefault();
                                  setIsOpen(false);
                                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                                }
                              }}
                              className="group p-4 bg-white/5 border border-white/10 hover:border-amber-500/30 rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                {getIconForType(item.type)}
                                <span className="font-medium text-white/90">{item.title}</span>
                              </div>
                              <p className="text-sm text-white/60 mb-3">{item.description}</p>
                              {item.technologies && item.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {item.technologies.map(tech => (
                                    <span key={tech} className="text-[10px] px-2 py-0.5 rounded-md bg-black/50 border border-white/10 text-white/60">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {currentActions.length > 0 && (
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                        {currentActions.map((action, idx) => (
                          <a 
                            key={idx} 
                            href={action.href}
                            target={action.type === 'link' && !action.href.startsWith('#') ? '_blank' : undefined}
                            rel={action.type === 'link' && !action.href.startsWith('#') ? 'noopener noreferrer' : undefined}
                            onClick={(e) => { 
                              handleActionClick(action);
                              if(action.href.startsWith('#')) {
                                e.preventDefault();
                                setIsOpen(false);
                                document.querySelector(action.href)?.scrollIntoView({ behavior: 'smooth' });
                              } else {
                                setIsOpen(false); 
                              }
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-black font-medium text-sm rounded-lg hover:bg-amber-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                          >
                            {action.label}
                            {action.type === 'email' ? <Mail size={14} aria-hidden="true" /> : <ArrowRight size={14} aria-hidden="true" />}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
