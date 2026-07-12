'use client';

import { useState } from 'react';
import MagneticButton from './MagneticButton';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: 'Freelance Project',
    budget: '',
    message: '',
    honeypot: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          inquiry: 'Freelance Project',
          budget: '',
          message: '',
          honeypot: ''
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-12">
      {status === 'success' ? (
        <div className="p-8 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center">
          <h3 className="text-2xl font-serif text-white mb-2">Message Received</h3>
          <p className="text-[#888] font-light">
            Thanks for reaching out! I&apos;ll get back to you as soon as possible.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-6 px-6 py-2 rounded-full border border-white/10 hover:border-white/30 text-white/60 hover:text-white transition-colors text-sm"
          >
            Send another message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Honeypot field - hidden from real users */}
          <input
            type="text"
            name="honeypot"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={handleChange}
          />
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="name" className="text-sm text-[#888] uppercase tracking-widest">Name <span className="text-amber-500">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="email" className="text-sm text-[#888] uppercase tracking-widest">Email <span className="text-amber-500">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="inquiry" className="text-sm text-[#888] uppercase tracking-widest">Inquiry Type <span className="text-amber-500">*</span></label>
            <select
              id="inquiry"
              name="inquiry"
              required
              value={formData.inquiry}
              onChange={handleChange}
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
            >
              <option value="Freelance Project">Freelance Project</option>
              <option value="Job Opportunity">Job Opportunity</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {formData.inquiry === 'Freelance Project' && (
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className="text-sm text-[#888] uppercase tracking-widest">Budget Range (Optional)</label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
              >
                <option value="">Select a range</option>
                <option value="<$500">&lt;$500</option>
                <option value="$500-2k">$500 - $2k</option>
                <option value="$2k-5k">$2k - $5k</option>
                <option value="$5k+">$5k+</option>
              </select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm text-[#888] uppercase tracking-widest">Message <span className="text-amber-500">*</span></label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500/50 transition-colors resize-y"
              placeholder="Tell me about your project or opportunity..."
            />
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm">There was an issue sending your message. Please try again or email directly.</p>
          )}

          <MagneticButton className="w-full md:w-auto self-end mt-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full px-8 py-4 rounded-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:hover:bg-amber-600 text-white font-medium text-sm transition-colors"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </MagneticButton>
        </form>
      )}

      <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-[#888]">
        <p>Prefer direct email?</p>
        <div className="flex gap-6">
          <a href="mailto:swayamawari@gmail.com" className="hover:text-white transition-colors">swayamawari@gmail.com</a>
          <a href="https://linkedin.com/in/swayam-awari" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/swayam0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </div>
  );
}
