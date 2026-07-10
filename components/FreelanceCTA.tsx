import React from 'react';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

export default function FreelanceCTA() {
  return (
    <section className="py-unit-xl bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="glass-card rounded-2xl p-unit-xl md:p-24 relative overflow-hidden text-center">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-unit-md">Have a project you want to build?</h2>
            <p className="font-body-lg text-on-surface-variant mb-unit-xl">Tell me about your idea, business requirements, timeline, and goals. I&apos;ll help you architect the perfect solution.</p>
            <div className="flex flex-wrap justify-center gap-unit-md mb-unit-xl">
              <MagneticButton>
                <Link href="#contact" className="bg-primary text-on-primary px-unit-xl py-unit-md rounded-lg font-headline-md text-[18px] font-bold hover:opacity-90 transition-all block">Start a Project</Link>
              </MagneticButton>
              <Link href="#projects" className="border border-outline-variant text-on-surface px-unit-xl py-unit-md rounded-lg font-headline-md text-[18px] font-bold hover:bg-surface-variant transition-all">View My Work</Link>
            </div>
            <div className="flex flex-wrap justify-center gap-x-unit-xl gap-y-unit-md">
              <div className="flex items-center gap-2 text-[12px] font-label-mono text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Clear Communication
              </div>
              <div className="flex items-center gap-2 text-[12px] font-label-mono text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Responsive Development
              </div>
              <div className="flex items-center gap-2 text-[12px] font-label-mono text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Clean Code
              </div>
              <div className="flex items-center gap-2 text-[12px] font-label-mono text-on-surface-variant">
                <span className="material-symbols-outlined text-primary text-lg">check_circle</span> Regular Updates
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
