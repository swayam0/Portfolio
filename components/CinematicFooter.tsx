'use client';
import Link from 'next/link';
export default function CinematicFooter() {
  return (
    <section className="relative w-full min-h-[50vh] flex flex-col items-center justify-center border-t border-white/5 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:24px_24px] bg-[#050505]">
      {/* Dark overlay to make the dots subtle */}
      <div className="absolute inset-0 bg-[#050505]/80 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-12 tracking-tight">
          Building things people actually ship.
        </h2>
        
        <a 
          href="mailto:swayamawari@gmail.com"
          className="text-xl md:text-2xl text-[#888] hover:text-amber-500 transition-colors border-b border-[#888]/30 hover:border-amber-500 pb-1 mb-16"
        >
          swayamawari@gmail.com
        </a>
        
        <div className="flex items-center gap-12 text-sm text-white/40 uppercase tracking-widest font-medium">
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <a href="https://github.com/swayam0" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/20 uppercase tracking-widest">
        © {new Date().getFullYear()} Swayam Awari
      </div>
    </section>
  );
}
