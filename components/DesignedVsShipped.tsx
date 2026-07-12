'use client';

import React from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const ANNOTATIONS = [
  { id: 1, x: 15, y: 25, text: "8px off on top padding" },
  { id: 2, x: 45, y: 65, text: "Font-weight 500 instead of 600" },
  { id: 3, x: 75, y: 85, text: "Button color drifted to incorrect blue shade" },
];

export default function DesignedVsShipped() {
  return (
    <div className="w-full">


      {/* Comparison Container */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/5 bg-zinc-950/40 backdrop-blur-md">
        
        <ReactCompareSlider
          className="w-full h-full"
          itemOne={<ReactCompareSliderImage src="/designed-vs-shipped/figma-hero.png" alt="Designed (Figma)" className="object-cover object-top opacity-80" />}
          itemTwo={<ReactCompareSliderImage src="/designed-vs-shipped/live-hero.png" alt="Shipped (Live)" className="object-cover object-top opacity-80" />}
        />

        {/* Annotations Layer */}
        <div className="absolute inset-0 pointer-events-none">
          {ANNOTATIONS.map((ann) => (
            <div 
              key={ann.id}
              className="absolute group pointer-events-auto"
              style={{ left: `${ann.x}%`, top: `${ann.y}%` }}
            >
              {/* Marker Dot */}
              <div className="w-3 h-3 bg-red-500 rounded-full border border-zinc-900 shadow-[0_0_12px_rgba(239,68,68,0.6)] cursor-pointer hover:scale-150 transition-all duration-300" />
              
              {/* Tooltip */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none w-max max-w-[220px] z-10">
                <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 text-white text-xs font-light p-3 rounded-lg shadow-2xl">
                  <span className="text-red-400 font-medium block mb-1">Drift Detected:</span>
                  <span className="text-zinc-300">{ann.text}</span>
                </div>
                {/* Tooltip Arrow */}
                <div className="w-2 h-2 bg-zinc-900/90 border-r border-b border-white/10 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
              </div>
            </div>
          ))}
        </div>
        
        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white font-light text-xs rounded-full pointer-events-none z-10">
          Designed (Figma)
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 text-white font-light text-xs rounded-full pointer-events-none z-10">
          Shipped (Live)
        </div>

      </div>
    </div>
  );
}
