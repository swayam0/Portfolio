'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const ANNOTATIONS = [
  { id: 1, x: 15, y: 25, text: "8px off on top padding" },
  { id: 2, x: 45, y: 65, text: "Font-weight 500 instead of 600" },
  { id: 3, x: 75, y: 85, text: "Button color drifted from #4ade80 to #22c55e" },
];

export default function DesignedVsShipped() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return; // Only trigger if mouse is held down
    updateSlider(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    updateSlider(e.touches[0].clientX);
  };

  const updateSlider = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <section className="py-20 bg-[#0a0a0c] border-t border-[#4ade80]/10">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12">
          <div className="text-[#4ade80] mb-4 tracking-widest text-sm font-label-mono uppercase">
            &gt; QA.diff_analyzer_v1
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter">
            Designed vs. Shipped
          </h2>
          <p className="text-gray-400 font-body text-lg max-w-2xl">
            A live demo of the QA logic behind ShipProof — the tool I'm building for agencies to catch design drift automatically.
          </p>
        </div>

        {/* Comparison Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#4ade80]/30 select-none cursor-ew-resize bg-black"
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onTouchMove={handleTouchMove}
          style={{ touchAction: 'none' }} // Prevent scrolling while sliding on mobile
        >
          {/* Base Layer: Shipped (Live) */}
          <div className="absolute inset-0">
            <Image 
              src="/designed-vs-shipped/live-hero.png"
              alt="Live Shipped Version"
              fill
              className="object-cover object-top opacity-70" // Slightly dim to make annotations pop
              priority
              unoptimized
            />
          </div>

          {/* Top Layer: Designed (Figma) */}
          <div 
            className="absolute inset-0 border-r border-[#4ade80]"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <Image 
              src="/designed-vs-shipped/figma-hero.png"
              alt="Figma Design"
              fill
              className="object-cover object-top opacity-70"
              priority
              unoptimized
            />
          </div>

          {/* Custom Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-[#4ade80] shadow-[0_0_10px_#4ade80] flex items-center justify-center -ml-[2px]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="w-8 h-8 bg-[#0a0a0c] border-2 border-[#4ade80] rounded-full flex items-center justify-center text-[#4ade80]">
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
            </div>
          </div>

          {/* Annotations Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {ANNOTATIONS.map((ann) => (
              <div 
                key={ann.id}
                className="absolute group pointer-events-auto"
                style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
              >
                {/* Marker Dot */}
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-[0_0_8px_rgba(239,68,68,0.8)] cursor-pointer hover:scale-125 transition-transform animate-pulse" />
                
                {/* Tooltip */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-max max-w-[200px]">
                  <div className="bg-[#0a0a0c] border border-red-500/50 text-white text-xs font-label-mono p-3 rounded shadow-xl">
                    <span className="text-red-400 block mb-1">Issue Detected:</span>
                    {ann.text}
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="w-2 h-2 bg-[#0a0a0c] border-r border-b border-red-500/50 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                </div>
              </div>
            ))}
          </div>
          
          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur border border-[#4ade80]/30 text-[#4ade80] font-label-mono text-xs rounded pointer-events-none">
            DESIGNED (Figma)
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur border border-gray-600 text-gray-300 font-label-mono text-xs rounded pointer-events-none">
            SHIPPED (Live)
          </div>

        </div>

      </div>
    </section>
  );
}
