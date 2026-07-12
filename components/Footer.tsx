import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-16 border-t border-outline-variant/30 bg-[#09090b]">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="font-label-mono text-xs text-on-surface-variant">
              Currently building. Open to opportunities.
            </span>
          </div>
          
          <div className="font-label-mono text-[10px] text-outline-variant">
            © {new Date().getFullYear()} Swayam Awari. All systems operational.
          </div>
        </div>

        <div className="flex flex-col gap-3 font-label-mono text-sm">
          <Link href="mailto:swayamawari@example.com" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="text-primary opacity-50 group-hover:opacity-100">$</span> contact --email
          </Link>
          <Link href="https://linkedin.com/in/swayam-awari" target="_blank" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="text-primary opacity-50 group-hover:opacity-100">$</span> contact --linkedin
          </Link>
          <Link href="https://github.com/swayam0" target="_blank" className="group flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <span className="text-primary opacity-50 group-hover:opacity-100">$</span> contact --github
          </Link>
        </div>

      </div>
    </footer>
  );
}
