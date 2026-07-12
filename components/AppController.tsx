'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Portfolio2D from './Portfolio2D';

const Portfolio3D = dynamic(() => import('./Portfolio3D'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-[#09090b] flex flex-col items-center justify-center z-50">
      <div className="text-primary font-label-mono mb-4 animate-pulse">Initializing environment...</div>
      <div className="w-48 h-1 bg-outline-variant/30 rounded overflow-hidden">
        <div className="h-full bg-primary animate-pulse w-full"></div>
      </div>
    </div>
  )
});

export default function AppController() {
  const [capabilities, setCapabilities] = useState<'checking' | '3d' | '2d'>('checking');

  useEffect(() => {
    // Fast initial check for client
    const checkCapabilities = () => {
      if (window.innerWidth < 768) return '2d';
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return '2d';

      const hwConcurrency = navigator.hardwareConcurrency || 4;
      const deviceMem = (navigator as any).deviceMemory || 4;
      
      if (hwConcurrency < 4 || deviceMem < 4) return '2d';

      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) return '2d';
      } catch (e) {
        return '2d';
      }

      return '3d';
    };

    setCapabilities(checkCapabilities());
  }, []);

  if (capabilities === 'checking') {
    return <div className="fixed inset-0 bg-[#09090b]" />;
  }

  if (capabilities === '2d') {
    return <Portfolio2D />;
  }

  return (
    <>
      <button 
        onClick={() => setCapabilities('2d')}
        className="fixed top-4 right-4 z-50 text-[10px] font-label-mono text-primary/70 hover:text-primary bg-[#18181b]/50 border border-outline-variant/30 px-3 py-1.5 rounded transition-all backdrop-blur-md"
      >
        [ Switch to Simple View ]
      </button>
      <Portfolio3D />
    </>
  );
}
