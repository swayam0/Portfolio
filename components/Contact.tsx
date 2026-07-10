"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error' | 'rate-limited'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiry: '',
    message: '',
    projectType: '',
    budget: '',
    timeline: '',
    honeypot: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', company: '', inquiry: '', message: '', projectType: '', budget: '', timeline: '', honeypot: '' });
      } else if (response.status === 429) {
        setFormStatus('rate-limited');
        setErrorMessage(data.error || 'Too many submissions. Please try again later.');
      } else {
        setFormStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <section className="py-24 md:py-32 border-t border-outline-variant/20 bg-surface-container-lowest" id="contact">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/2">
            <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest block mb-4">08. Contact</span>
            
            <h2 className="font-headline-lg text-4xl md:text-5xl text-on-surface mb-8 tracking-tight">
              Ready to build <br className="hidden md:block" /> something exceptional?
            </h2>
            
            <p className="font-body-lg text-on-surface-variant max-w-lg mb-12">
              Whether you have a specific project in mind, need technical architecture advice, or are looking to hire a full-stack engineer, I&apos;m ready to talk.
            </p>
            
            <div className="space-y-8">
              <div>
                <p className="font-label-mono text-xs text-outline uppercase tracking-widest mb-2">Direct Email</p>
                <a href="mailto:swayamawari1@gmail.com" className="font-headline-md text-2xl text-on-surface hover:text-primary transition-colors">
                  swayamawari1@gmail.com
                </a>
              </div>
              
              <div>
                <p className="font-label-mono text-xs text-outline uppercase tracking-widest mb-2">Socials</p>
                <div className="flex gap-6">
                  <a href="https://linkedin.com/in/swayam-awari" target="_blank" rel="noopener noreferrer" className="font-headline-md text-lg text-on-surface hover:text-primary transition-colors flex items-center gap-1">
                    LinkedIn <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                  </a>
                  <a href="https://github.com/swayam0" target="_blank" rel="noopener noreferrer" className="font-headline-md text-lg text-on-surface hover:text-primary transition-colors flex items-center gap-1">
                    GitHub <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="bg-surface p-8 md:p-12 rounded-2xl border border-outline-variant/20 shadow-xl shadow-black/20">
              <h3 className="font-headline-md text-2xl text-on-surface mb-8">Send a Message</h3>
              
              <div aria-live="polite" className="sr-only">
                {formStatus === 'success' && 'Message sent successfully.'}
                {(formStatus === 'error' || formStatus === 'rate-limited') && `Error: ${errorMessage}`}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Honeypot field for anti-spam */}
                <input 
                  type="text" 
                  id="honeypot" 
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1} 
                  autoComplete="off" 
                  style={{ display: 'none' }} 
                  aria-hidden="true" 
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="name" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Name *</label>
                    <input 
                      id="name"
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      maxLength={100}
                      className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 text-on-surface transition-colors focus:ring-0 focus:outline-none font-body-md" 
                      placeholder="Jane Doe"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="email" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Email *</label>
                    <input 
                      id="email"
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={handleChange}
                      maxLength={150}
                      className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 text-on-surface transition-colors focus:ring-0 focus:outline-none font-body-md" 
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="company" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Company / Organization (Optional)</label>
                  <input 
                    id="company"
                    type="text" 
                    value={formData.company}
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 text-on-surface transition-colors focus:ring-0 focus:outline-none font-body-md" 
                    placeholder="Acme Corp"
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="inquiry" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Inquiry Type *</label>
                  <div className="relative">
                    <select 
                      id="inquiry"
                      value={formData.inquiry}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 pr-8 text-on-surface transition-colors focus:ring-0 focus:outline-none font-body-md appearance-none"
                      style={{ colorScheme: 'dark' }}
                      required
                    >
                      <option value="" disabled className="bg-[#121212] text-gray-400">Select an option...</option>
                      <option value="career" className="bg-[#121212] text-white">Career Opportunity / Hiring</option>
                      <option value="freelance" className="bg-[#121212] text-white">Freelance Project</option>
                      <option value="consulting" className="bg-[#121212] text-white">Technical Consulting</option>
                      <option value="other" className="bg-[#121212] text-white">Other</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline pointer-events-none">expand_more</span>
                  </div>
                </div>

                <AnimatePresence>
                  {formData.inquiry === 'freelance' && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden"
                    >
                      <div className="space-y-1">
                        <label htmlFor="projectType" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Project Type</label>
                        <div className="relative">
                          <select id="projectType" value={formData.projectType} onChange={handleChange} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 pr-8 text-on-surface text-sm transition-colors focus:outline-none appearance-none" style={{ colorScheme: 'dark' }}>
                            <option value="" disabled className="bg-[#121212] text-gray-400">Select...</option>
                            <option value="web-app" className="bg-[#121212] text-white">Web App</option>
                            <option value="backend" className="bg-[#121212] text-white">Backend API</option>
                            <option value="ai-integration" className="bg-[#121212] text-white">AI Integration</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">expand_more</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="budget" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Budget</label>
                        <div className="relative">
                          <select id="budget" value={formData.budget} onChange={handleChange} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 pr-8 text-on-surface text-sm transition-colors focus:outline-none appearance-none" style={{ colorScheme: 'dark' }}>
                            <option value="" disabled className="bg-[#121212] text-gray-400">Select...</option>
                            <option value="<1k" className="bg-[#121212] text-white">&lt; $1k</option>
                            <option value="1k-5k" className="bg-[#121212] text-white">$1k - $5k</option>
                            <option value="5k+" className="bg-[#121212] text-white">$5k+</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">expand_more</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label htmlFor="timeline" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Timeline</label>
                        <div className="relative">
                          <select id="timeline" value={formData.timeline} onChange={handleChange} className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 pr-8 text-on-surface text-sm transition-colors focus:outline-none appearance-none" style={{ colorScheme: 'dark' }}>
                            <option value="" disabled className="bg-[#121212] text-gray-400">Select...</option>
                            <option value="asap" className="bg-[#121212] text-white">ASAP</option>
                            <option value="1-3-months" className="bg-[#121212] text-white">1-3 Months</option>
                            <option value="flexible" className="bg-[#121212] text-white">Flexible</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-0 top-1/2 -translate-y-1/2 text-outline text-sm pointer-events-none">expand_more</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="space-y-1 pt-4">
                  <label htmlFor="message" className="font-label-mono text-[11px] text-outline uppercase tracking-widest">Message *</label>
                  <textarea 
                    id="message"
                    rows={4} 
                    required 
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={3000}
                    className="w-full bg-transparent border-b border-outline-variant/30 focus:border-primary px-0 py-3 text-on-surface transition-colors focus:ring-0 focus:outline-none font-body-md resize-none"
                    placeholder="Tell me about your requirements..."
                  ></textarea>
                </div>
                
                <div className="pt-6">
                  <MagneticButton>
                    <button 
                      type="submit" 
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      className="group relative inline-flex items-center justify-center px-8 py-4 w-full md:w-auto font-label-mono text-sm tracking-widest uppercase text-on-primary bg-primary overflow-hidden rounded disabled:opacity-50 transition-opacity"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        {formStatus === 'submitting' ? 'Sending...' : formStatus === 'success' ? 'Message Sent' : 'Submit Inquiry'}
                        {formStatus === 'idle' && <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
                        {formStatus === 'success' && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out"></div>
                    </button>
                  </MagneticButton>
                  
                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-tertiary text-xs font-label-mono mt-4 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Thank you. I&apos;ll be in touch shortly.
                      </motion.p>
                    )}
                    {(formStatus === 'error' || formStatus === 'rate-limited') && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-error text-xs font-label-mono mt-4 flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[14px]">error</span>
                        {errorMessage}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
