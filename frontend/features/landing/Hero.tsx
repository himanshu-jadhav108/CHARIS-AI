'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Gem } from 'lucide-react';
import { Hero3DCanvas } from '@/components/3d/Hero3DCanvas';
import { fadeInVariants } from '@/animations/framer';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-8 pb-20">
      
      {/* Background Glow Ambient Lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-burgundy-700/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* VIP Sovereign Pill Badge */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-obsidian-850/80 border border-gold-400/30 text-gold-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-gold-glow"
        >
          <Sparkles className="h-3.5 w-3.5 text-gold-400" />
          <span>Sovereign Luxury AI Gift Concierge</span>
          <span className="h-1 w-1 rounded-full bg-gold-400" />
          <span className="text-silk-300/60">Invite Only</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.15] max-w-5xl mx-auto mb-6 text-silk-100"
        >
          The Art of Giving, <br />
          <span className="gold-text-gradient italic font-normal">Elevated by Intelligence & Emotion.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-base sm:text-xl text-silk-300/75 max-w-2xl mx-auto leading-relaxed mb-10 font-light"
        >
          Discover 360° complete luxury gift experiences and signature Memory Box keepsakes through natural conversation.
          CHARIS pairs the warmth of Mayfair private client directors with sovereign artificial intelligence.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-12"
        >
          <Link
            href="/consult"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-all duration-300 flex items-center justify-center space-x-3 shadow-gold-glow group"
          >
            <span>Begin Your Consultation</span>
            <ArrowRight className="h-4 w-4 text-obsidian-950 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/catalog"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-obsidian-850/80 border border-gold-400/30 text-silk-200 font-semibold text-xs uppercase tracking-widest hover:text-gold-300 hover:border-gold-400/60 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Gem className="h-4 w-4 text-gold-400" />
            <span>Explore 50 Sovereign Items</span>
          </Link>
        </motion.div>

        {/* 3D Interactive Luxury Sculpture Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          <Hero3DCanvas />
        </motion.div>

      </div>
    </section>
  );
};
