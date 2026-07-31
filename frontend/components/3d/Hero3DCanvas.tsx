'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles } from 'lucide-react';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[480px] flex items-center justify-center pointer-events-auto"
    >
      {/* Ambient Radial Glow */}
      <div className="absolute w-72 h-72 rounded-full bg-gold-400/20 blur-[100px] pointer-events-none animate-pulse-subtle" />
      <div className="absolute w-96 h-96 rounded-full bg-burgundy-700/25 blur-[120px] pointer-events-none" />

      {/* 3D Floating Luxury Gift Box Sculpture (CSS 3D + Parallax Layering) */}
      <motion.div
        animate={{
          rotateY: [0, 15, -15, 0],
          rotateX: [5, -5, 5],
          y: [0, -12, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative w-64 h-64 sm:w-80 sm:h-80 preserve-3d cursor-pointer group"
      >
        
        {/* Main Box Outer Container */}
        <div className="w-full h-full glass-panel rounded-3xl border-2 border-gold-400/50 shadow-luxury flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-burgundy-900/80 via-obsidian-900 to-obsidian-950 group-hover:border-gold-400 transition-all duration-500">
          
          {/* Metallic Gold Ribbon Strands */}
          <div className="absolute inset-x-0 h-12 bg-gold-gradient opacity-90 shadow-gold-glow flex items-center justify-center">
            <div className="w-full h-0.5 bg-burgundy-900/40" />
          </div>
          <div className="absolute inset-y-0 w-12 bg-gold-gradient opacity-90 shadow-gold-glow flex items-center justify-center">
            <div className="h-full w-0.5 bg-burgundy-900/40" />
          </div>

          {/* Center Royal Crown Crest Emblem */}
          <div className="relative z-10 h-20 w-20 rounded-full bg-burgundy-800 border-2 border-gold-400 flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform duration-500">
            <Crown className="h-10 w-10 text-gold-400" />
          </div>

          {/* Floating Gold Sparkle Orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-6 right-6 text-gold-300"
          >
            <Sparkles className="h-6 w-6" />
          </motion.div>

          <motion.div
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-6 left-6 text-gold-400"
          >
            <Sparkles className="h-5 w-5" />
          </motion.div>

        </div>

        {/* Floating Ring Base Accent */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-72 h-10 rounded-[100%] border border-gold-400/30 bg-gold-400/5 blur-sm -z-10" />

      </motion.div>

      {/* Floating Status Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-obsidian-950/90 border border-gold-400/40 backdrop-blur-md text-[10px] font-mono text-gold-300 uppercase tracking-widest flex items-center space-x-2 shadow-gold-glow">
        <span className="h-2 w-2 rounded-full bg-gold-400 animate-ping" />
        <span>CHARIS 3D Vault Atelier</span>
      </div>

    </div>
  );
};
