'use client';

import { useState, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html, Points, PointMaterial, Line, RoundedBox, MeshTransmissionMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// --- Shared State ---
type Section = 'hero' | 'projects' | 'skills' | 'contact';

// --- Camera Controller ---
function CameraManager({ activeSection, targetPosition, targetLookAt }: { activeSection: Section, targetPosition?: THREE.Vector3, targetLookAt?: THREE.Vector3 }) {
  const { camera } = useThree();
  const vec = new THREE.Vector3();
  const lookVec = new THREE.Vector3();
  
  // Anchor points for sections
  const anchors: Record<Section, { pos: THREE.Vector3, look: THREE.Vector3 }> = {
    hero: { pos: new THREE.Vector3(0, 0, 8), look: new THREE.Vector3(0, 0, 0) },
    projects: { pos: new THREE.Vector3(0, 10, 8), look: new THREE.Vector3(0, 10, 0) },
    skills: { pos: new THREE.Vector3(15, 0, 8), look: new THREE.Vector3(15, 0, 0) },
    contact: { pos: new THREE.Vector3(-15, 0, 8), look: new THREE.Vector3(-15, 0, 0) },
  };

  useFrame((state, delta) => {
    // If a specific target is provided (e.g. clicking a project), go there
    // Otherwise go to the section anchor
    const targetP = targetPosition || anchors[activeSection].pos;
    const targetL = targetLookAt || anchors[activeSection].look;
    
    // Add subtle idle drift if not targeting a specific item
    if (!targetPosition) {
      const t = state.clock.getElapsedTime();
      targetP.x += Math.sin(t * 0.5) * 0.2;
      targetP.y += Math.cos(t * 0.3) * 0.2;
    }

    camera.position.lerp(targetP, 2 * delta);
    
    // Smooth lookat
    lookVec.lerp(targetL, 2 * delta);
    camera.lookAt(lookVec);
  });

  return null;
}

// --- Environment ---
function Environment() {
  // Particles
  const [sphere] = useState(() => {
    const points = new Float32Array(500 * 3);
    for (let i = 0; i < 500 * 3; i++) {
      points[i] = (Math.random() - 0.5) * 50;
    }
    return points;
  });

  const pointsRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#09090b', 10, 30]} />
      
      <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#4ade80" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.4} />
      </Points>

      {/* Grid Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#09090b" />
      </mesh>
      <gridHelper args={[100, 100, '#22c55e', '#22c55e']} position={[0, -4.99, 0]} material-opacity={0.1} material-transparent />
    </>
  );
}

// --- Hero Section ---
function HeroSection({ isActive }: { isActive: boolean }) {
  return (
    <group position={[0, 0, 0]}>
      <Text
        position={[0, 1, 0]}
        fontSize={1.5}
        color="#ffffff"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
        anchorX="center"
        anchorY="middle"
      >
        SWAYAM AWARI
        <meshStandardMaterial emissive="#ffffff" emissiveIntensity={0.5} toneMapped={false} />
      </Text>
      <Text
        position={[0, 0, 0]}
        fontSize={0.4}
        color="#4ade80"
        anchorX="center"
        anchorY="middle"
      >
        FULL-STACK & AI INTEGRATION ENGINEER
        <meshStandardMaterial emissive="#4ade80" emissiveIntensity={1} toneMapped={false} />
      </Text>
      
      {isActive && (
        <Html position={[0, -1.5, 0]} center transform distanceFactor={5}>
          <div className="flex gap-4 font-label-mono">
            <button className="px-6 py-2 bg-primary/10 border border-primary text-primary hover:bg-primary/20 hover:scale-105 transition-all rounded">
              [ View Work ]
            </button>
            <button className="px-6 py-2 bg-transparent border border-outline-variant text-on-surface hover:text-primary transition-all rounded">
              Contact
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}

// --- Projects Section ---
const PROJECTS = [
  { id: 'repolens', title: 'RepoLens', tech: 'Next.js / AI', desc: 'AI/RAG codebase Q&A system.', pos: new THREE.Vector3(-3, 10, 0) },
  { id: 'soul', title: 'Soul Academy', tech: 'Next.js / Payments', desc: 'Live client payment platform.', pos: new THREE.Vector3(-1, 10, -2) },
  { id: 'rankflow', title: 'RankFlow', tech: 'Python / LangChain', desc: 'Multi-agent ranking pipeline.', pos: new THREE.Vector3(1, 10, -2) },
  { id: 'clinical', title: 'ClinicalBridge', tech: 'FastAPI / FHIR', desc: 'FHIR simulation for healthcare testing.', pos: new THREE.Vector3(3, 10, 0) },
];

function ProjectsSection({ isActive, onSelectProject, selectedProject }: { isActive: boolean, onSelectProject: (p: any) => void, selectedProject: string | null }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current && !selectedProject && isActive) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {PROJECTS.map((proj) => {
        const isSelected = selectedProject === proj.id;
        const opacity = !selectedProject ? 1 : (isSelected ? 1 : 0.1);
        
        return (
          <group key={proj.id} position={proj.pos} onClick={(e) => { e.stopPropagation(); onSelectProject(isSelected ? null : proj); }}>
            <RoundedBox args={[1.5, 2, 0.1]} radius={0.05} scale={isSelected ? 1.2 : 1}>
              <meshStandardMaterial 
                color="#09090b" 
                emissive="#4ade80" 
                emissiveIntensity={isSelected ? 0.5 : 0.1}
                transparent
                opacity={0.8}
                wireframe={!isSelected}
              />
            </RoundedBox>
            
            {(!selectedProject || isSelected) && (
              <Html position={[0, 0, 0.1]} center transform distanceFactor={3} scale={isSelected ? 1 : 0.8} style={{ opacity }}>
                <div className="w-48 text-center pointer-events-none">
                  <h3 className={`font-label-mono ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{proj.title}</h3>
                  {isSelected && (
                    <div className="mt-2 text-xs text-on-surface-variant font-label-sans">
                      <p className="text-primary mb-1">{proj.tech}</p>
                      <p>{proj.desc}</p>
                      <button className="mt-4 px-3 py-1 border border-primary/50 text-primary pointer-events-auto hover:bg-primary/20">
                        [ close ]
                      </button>
                    </div>
                  )}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

// --- Skills Section ---
const SKILLS = [
  { id: 'next', label: 'Next.js', pos: [15, 1, 0] },
  { id: 'react', label: 'React', pos: [14, 0, 1] },
  { id: 'ts', label: 'TypeScript', pos: [16, -1, 0] },
  { id: 'py', label: 'Python', pos: [15, 2, -1] },
  { id: 'ai', label: 'AI/RAG', pos: [14, 1.5, -2] },
];
const CONNECTIONS = [
  ['next', 'react'], ['next', 'ts'], ['py', 'ai'], ['react', 'ai']
];

function SkillsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <group>
      {SKILLS.map((skill) => {
        const isHovered = hovered === skill.id;
        const isConnected = hovered && CONNECTIONS.some(c => c.includes(hovered) && c.includes(skill.id));
        const active = !hovered || isHovered || isConnected;

        return (
          <group key={skill.id} position={new THREE.Vector3(...skill.pos)} onPointerEnter={() => setHovered(skill.id)} onPointerLeave={() => setHovered(null)}>
            <mesh>
              <sphereGeometry args={[active ? 0.15 : 0.08, 16, 16]} />
              <meshStandardMaterial color={active ? '#4ade80' : '#18181b'} emissive={active ? '#4ade80' : '#000'} emissiveIntensity={active ? 1 : 0} toneMapped={false} />
            </mesh>
            <Html position={[0, -0.3, 0]} center style={{ opacity: active ? 1 : 0.2, transition: 'opacity 0.2s' }}>
              <div className="text-[10px] font-label-mono text-primary whitespace-nowrap">{skill.label}</div>
            </Html>
          </group>
        );
      })}
      
      {CONNECTIONS.map((conn, i) => {
        const p1 = SKILLS.find(s => s.id === conn[0])!.pos;
        const p2 = SKILLS.find(s => s.id === conn[1])!.pos;
        const isHovered = hovered === conn[0] || hovered === conn[1];
        const opacity = hovered ? (isHovered ? 0.8 : 0.1) : 0.3;
        
        return (
          <Line key={i} points={[p1, p2] as any} color="#4ade80" lineWidth={isHovered ? 2 : 1} transparent opacity={opacity} />
        );
      })}
    </group>
  );
}

// --- Main App Component ---
export default function Portfolio3D() {
  const [section, setSection] = useState<Section>('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);

  // Compute camera target overrides for selected project
  const targetPos = selectedProject ? new THREE.Vector3().copy(selectedProject.pos).add(new THREE.Vector3(0, 0, 3)) : undefined;
  const targetLook = selectedProject ? selectedProject.pos : undefined;

  return (
    <div className="w-screen h-screen bg-[#09090b] overflow-hidden">
      {/* 2D HUD Navigation */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2 font-label-mono text-xs">
        <div className="text-on-surface-variant mb-2">SYS.MENU</div>
        {(['hero', 'projects', 'skills', 'contact'] as Section[]).map((s) => (
          <button 
            key={s}
            onClick={() => { setSection(s); setSelectedProject(null); }}
            className={`text-left transition-colors ${section === s ? 'text-primary' : 'text-on-surface hover:text-primary/70'}`}
          >
            {section === s ? '> ' : '  '} {s.toUpperCase()}
          </button>
        ))}
      </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#09090b']} />
        
        <CameraManager activeSection={section} targetPosition={targetPos} targetLookAt={targetLook} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Environment />
        
        <HeroSection isActive={section === 'hero'} />
        <ProjectsSection isActive={section === 'projects'} selectedProject={selectedProject?.id} onSelectProject={setSelectedProject} />
        <SkillsSection />
        
        {/* Post Processing - Kept minimal for performance */}
        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={0.5} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
