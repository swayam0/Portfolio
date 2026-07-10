import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-unit-xl border-t border-outline-variant/30 bg-surface">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-unit-md">
        <div className="flex flex-col items-center md:items-start">
          <span className="font-headline-md text-headline-md font-bold text-on-surface">Swayam Awari</span>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 text-center md:text-left">
            Building reliable software and digital products for businesses, teams, and users.
          </p>
          <p className="text-[12px] text-outline mt-2">© {new Date().getFullYear()} Swayam Awari. All rights reserved.</p>
        </div>
        <div className="flex gap-unit-lg">
          <Link href="https://github.com/swayam0" target="_blank" rel="noopener noreferrer" className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-[2px]">
            GitHub
          </Link>
          <Link href="https://linkedin.com/in/swayam-awari" target="_blank" rel="noopener noreferrer" className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-[2px]">
            LinkedIn
          </Link>
          <Link href="https://www.instagram.com/swayamawari?igsh=YzZmaDRhcng5enNi" target="_blank" rel="noopener noreferrer" className="font-label-mono text-label-mono text-on-surface-variant hover:text-primary transition-transform hover:-translate-y-[2px]">
            Instagram
          </Link>
        </div>
      </div>
    </footer>
  );
}
