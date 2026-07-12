'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const nodes = {
  stack: [
    { id: 't1', label: 'FastAPI' },
    { id: 't2', label: 'Next.js' },
    { id: 't3', label: 'LangChain' },
    { id: 't4', label: 'PostgreSQL' },
    { id: 't5', label: 'Docker' },
    { id: 't6', label: 'Node.js' }
  ],
  projects: [
    { id: 'p1', label: 'RepoLens', stack: ['t2', 't3'] },
    { id: 'p2', label: 'Soul Academy', stack: ['t2', 't6'] },
    { id: 'p3', label: 'RankFlow', stack: ['t1', 't3', 't4'] },
    { id: 'p4', label: 'ClinicalBridge', stack: ['t1', 't2', 't5'] }
  ]
};

export default function InteractiveNodeGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Helper to determine if a line should be active
  const isLineActive = (stackId: string, projectId: string) => {
    if (!hoveredNode) return true;
    if (hoveredNode === stackId) return true;
    if (hoveredNode === projectId) return true;
    return false;
  };

  // Helper to determine if a node should be dimmed
  const isNodeDimmed = (type: 'stack' | 'project', id: string) => {
    if (!hoveredNode) return false;
    if (hoveredNode === id) return false;

    if (type === 'stack') {
      // If hovering a project, dim stack nodes not used by it
      const proj = nodes.projects.find(p => p.id === hoveredNode);
      if (proj && !proj.stack.includes(id)) return true;
      // If hovering another stack, dim this one
      if (nodes.stack.find(s => s.id === hoveredNode)) return true;
    } else {
      // If hovering a stack, dim projects that don't use it
      if (nodes.stack.find(s => s.id === hoveredNode)) {
        const proj = nodes.projects.find(p => p.id === id);
        if (proj && !proj.stack.includes(hoveredNode)) return true;
      }
      // If hovering another project, dim this one
      if (nodes.projects.find(p => p.id === hoveredNode)) return true;
    }
    return false;
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto py-20 flex flex-col items-center">
      <div className="w-full flex justify-between items-center relative min-h-[400px]">
        
        {/* SVG Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ overflow: 'visible' }}>
          {nodes.projects.map((proj, pIdx) => {
            return proj.stack.map(stackId => {
              const sIdx = nodes.stack.findIndex(s => s.id === stackId);
              if (sIdx === -1) return null;
              
              // Approximate coordinates for the bezier curve
              const y1 = (100 / (nodes.stack.length - 1)) * sIdx;
              const y2 = (100 / (nodes.projects.length - 1)) * pIdx;
              
              const active = isLineActive(stackId, proj.id);
              const isHovered = hoveredNode === stackId || hoveredNode === proj.id;

              return (
                <path
                  key={`${stackId}-${proj.id}`}
                  d={`M 0,${y1}% C 50%,${y1}% 50%,${y2}% 100%,${y2}%`}
                  fill="none"
                  stroke={active ? (isHovered ? '#4ade80' : '#3f3f46') : '#18181b'}
                  strokeWidth={active && isHovered ? 2 : 1}
                  className="transition-all duration-300"
                />
              );
            });
          })}
        </svg>

        {/* Stack Nodes (Left) */}
        <div className="flex flex-col justify-between h-full absolute left-0 top-0 bottom-0 z-10 w-32 items-start">
          {nodes.stack.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredNode(item.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`px-3 py-1.5 rounded font-label-mono text-xs cursor-pointer transition-all duration-300 border ${
                isNodeDimmed('stack', item.id)
                  ? 'bg-transparent text-outline-variant border-transparent'
                  : hoveredNode === item.id
                  ? 'bg-primary/10 text-primary border-primary/50 scale-110 shadow-lg shadow-primary/20'
                  : 'bg-[#18181b] text-on-surface border-outline-variant/30 hover:border-outline-variant/60'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>

        {/* Project Nodes (Right) */}
        <div className="flex flex-col justify-between h-full absolute right-0 top-0 bottom-0 z-10 w-40 items-end">
          {nodes.projects.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredNode(item.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className={`px-3 py-1.5 rounded font-label-mono text-xs cursor-pointer transition-all duration-300 border ${
                isNodeDimmed('project', item.id)
                  ? 'bg-transparent text-outline-variant border-transparent'
                  : hoveredNode === item.id
                  ? 'bg-primary/10 text-primary border-primary/50 scale-110 shadow-lg shadow-primary/20'
                  : 'bg-[#18181b] text-on-surface border-outline-variant/30 hover:border-outline-variant/60'
              }`}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-12 font-label-mono text-xs text-outline-variant text-center">
        Hover over a node to see connections.
      </p>
    </div>
  );
}
