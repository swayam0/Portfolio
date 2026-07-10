'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="py-unit-xl border-t border-outline-variant/20" id="about">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <span className="font-label-mono text-label-mono text-primary uppercase tracking-widest block mb-2">01. About Me</span>
              <h2 className="font-display-lg-mobile md:font-headline-lg text-on-surface">
                Engineering <br className="hidden lg:block"/> with Product Sense.
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-unit-lg">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body-lg text-on-surface-variant text-lg md:text-xl leading-relaxed space-y-6"
            >
              <p>
                I am a technical architect and full-stack developer currently pursuing my B.Tech in Computer Science (2026). My approach bridges the gap between deep engineering rigor and intuitive product design.
              </p>
              <p>
                I don&apos;t just write code; I build systems. From architecting scalable microservices and high-performance APIs to crafting fluid, responsive interfaces, my goal is to deliver digital products that are as robust under the hood as they are striking on the screen.
              </p>
              <p>
                Whether it&apos;s integrating complex AI models or leading a team through a hackathon, I thrive in environments that demand rapid learning, precise execution, and an unwavering attention to detail.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 border-t border-outline-variant/10">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col"
              >
                <span className="font-headline-lg text-3xl md:text-4xl text-primary mb-1">8.75</span>
                <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest">CGPA</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col"
              >
                <span className="font-headline-lg text-3xl md:text-4xl text-tertiary mb-1">8+</span>
                <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest">Projects Shipped</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-col"
              >
                <span className="font-headline-lg text-3xl md:text-4xl text-primary mb-1">5+</span>
                <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest">Hackathons</span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex flex-col"
              >
                <span className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-1">15+</span>
                <span className="font-label-mono text-[10px] text-outline uppercase tracking-widest">Core Tech</span>
              </motion.div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
