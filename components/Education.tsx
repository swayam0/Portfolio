import React from 'react';

export default function Education() {
  return (
    <section className="py-unit-xl bg-surface-container-lowest">
      <div className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-unit-xl">
          <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest">06. Education</span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">Academic Journey</h2>
        </div>

        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-outline-variant/30 relative overflow-hidden flex flex-col sm:flex-row items-center sm:items-start gap-8 text-center sm:text-left group hover:border-primary/50 transition-colors duration-500 shadow-2xl">
          <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 border border-primary/20">
            <span className="material-symbols-outlined text-5xl text-primary">school</span>
          </div>
          
          <div className="flex-1 relative z-10 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
              <h4 className="font-headline-lg text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">B.Tech in Computer Science</h4>
              <span className="font-label-mono text-xs tracking-wider uppercase px-4 py-1.5 rounded-full bg-surface-variant/80 text-on-surface inline-block self-center sm:self-auto border border-outline-variant/50">
                Expected 2026
              </span>
            </div>
            
            <p className="text-on-surface-variant font-body-lg mb-8 leading-relaxed max-w-2xl mx-auto sm:mx-0">
              Specializing in Artificial Intelligence and Machine Learning, focusing on building practical, scalable systems and algorithms.
            </p>
            
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-6 border-t border-outline-variant/20">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-widest text-outline font-label-mono mb-1">Cumulative CGPA</span>
                <span className="text-3xl font-bold text-on-surface font-headline-md tracking-tighter">
                  8.75<span className="text-on-surface-variant text-xl font-normal">/10</span>
                </span>
              </div>
            </div>
          </div>
          
          {/* Abstract decorative elements */}
          <div className="absolute -right-32 -top-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] group-hover:bg-primary/20 transition-colors duration-700 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
}
