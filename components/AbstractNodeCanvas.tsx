'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function NodeMesh({ count = 100 }) {
  const points = useRef<THREE.Points>(null);
  const lines = useRef<THREE.LineSegments>(null);

  // Generate random points in a sphere
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color = new THREE.Color();
    const radius = 2.5;

    for (let i = 0; i < count; i++) {
      // Random position in sphere
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color mapping based on position
      color.setHSL((x / radius + 1) * 0.2 + 0.6, 0.8, 0.6); // Indigo to purple to blue
      col[i * 3] = color.r;
      col[i * 3 + 1] = color.g;
      col[i * 3 + 2] = color.b;
    }
    return [pos, col];
  }, [count]);

  // Connect close nodes
  const lineIndices = useMemo(() => {
    const indices = [];
    const maxDistance = 1.2;

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          indices.push(i, j);
        }
      }
    }
    return new Uint16Array(indices);
  }, [count, positions]);

  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (points.current && lines.current) {
      // Idle slow rotation
      points.current.rotation.y += delta * 0.05;
      points.current.rotation.x += delta * 0.02;
      lines.current.rotation.y = points.current.rotation.y;
      lines.current.rotation.x = points.current.rotation.x;

      // React to mouse movement
      const targetRotationY = mouse.x * 0.5;
      const targetRotationX = -mouse.y * 0.5;

      points.current.rotation.y += (targetRotationY - points.current.rotation.y + (state.clock.elapsedTime * 0.05)) * 0.05;
      points.current.rotation.x += (targetRotationX - points.current.rotation.x + (state.clock.elapsedTime * 0.02)) * 0.05;
      lines.current.rotation.y = points.current.rotation.y;
      lines.current.rotation.x = points.current.rotation.x;
    }
  });

  return (
    <group>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={lines}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[lineIndices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#6366F1"
          transparent
          opacity={0.15}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

export default function AbstractNodeCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none md:pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]} // Optimize for performance
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <NodeMesh count={150} />
      </Canvas>
    </div>
  );
}
