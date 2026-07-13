'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate a random sphere of points
function ParticleSystem({ count = 3000 }) {
  const points = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const particlesPerRing = count / 3;
      const ringIndex = Math.floor(i / particlesPerRing);
      
      const r = 12 + (Math.random() - 0.5) * 0.8;
      const angle = Math.random() * Math.PI * 2;
      
      // Base circle on XZ plane
      let x = Math.cos(angle) * r;
      let y = (Math.random() - 0.5) * 1.2; // Thickness of the ring
      let z = Math.sin(angle) * r;

      // Rotate rings to form an atom shape
      if (ringIndex === 1) {
         const angleX = Math.PI / 3; // 60 degrees
         const newY = y * Math.cos(angleX) - z * Math.sin(angleX);
         const newZ = y * Math.sin(angleX) + z * Math.cos(angleX);
         y = newY; z = newZ;
      } else if (ringIndex === 2) {
         const angleX = -Math.PI / 3; // -60 degrees
         const newY = y * Math.cos(angleX) - z * Math.sin(angleX);
         const newZ = y * Math.sin(angleX) + z * Math.cos(angleX);
         y = newY; z = newZ;
      }
      
      p[i * 3] = x;
      p[i * 3 + 1] = y;
      p[i * 3 + 2] = z;
    }
    return p;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      // Subtle constant rotation
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.02;
      
      // Interactive mouse follow for slight parallax
      const mouseX = (state.pointer.x * Math.PI) / 10;
      const mouseY = (state.pointer.y * Math.PI) / 10;
      
      // Smooth interpolation towards mouse position
      points.current.rotation.y += (mouseX - points.current.rotation.y) * 0.01;
      points.current.rotation.x += (mouseY - points.current.rotation.x) * 0.01;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#f59e0b" // amber-500
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none" style={{ opacity: 0.5 }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <ParticleSystem />
      </Canvas>
    </div>
  );
}
