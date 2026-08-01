'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Heart, Sparkles, Gem, ShieldCheck } from 'lucide-react';

interface AnticipationLoaderProps {
  onComplete: () => void;
}

const STEPS = [
  { text: "Understanding your story & life context...", icon: Heart },
  { text: "Analyzing emotional intent vector...", icon: Sparkles },
  { text: "Evaluating 50 hybrid international & Indian luxury items...", icon: Gem },
  { text: "Curating 360° complete gift experiences & Memory Box...", icon: Crown },
  { text: "Preparing your luxury reveal...", icon: ShieldCheck }
];

export const AnticipationLoader: React.FC<AnticipationLoaderProps> = ({ onComplete }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);

  useEffect(() => {
    if (currentStepIdx < STEPS.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStepIdx((prev) => prev + 1);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentStepIdx, onComplete]);

  const StepIcon = STEPS[currentStepIdx].icon;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-8 glass-panel rounded-3xl border-gold-400/40 shadow-luxury max-w-2xl mx-auto my-12 relative overflow-hidden bg-gradient-to-b from-burgundy-900/40 via-obsidian-900 to-obsidian-950">
      
      {/* Center Animated Crown Badge */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gold-400/20 blur-xl animate-ping" />
        <div className="h-20 w-20 rounded-full bg-burgundy-800 border-2 border-gold-400 flex items-center justify-center text-gold-400 shadow-gold-glow relative z-10">
          <StepIcon className="h-9 w-9 animate-pulse" />
        </div>
      </div>

      {/* Dynamic Animated Step Text */}
      <div className="h-16 space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gold-400">
          STAGE {currentStepIdx + 1} OF 5 • CHARIS ATELIER
        </span>

        <AnimatePresence mode="wait">
          <motion.h3
            key={currentStepIdx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="font-serif-luxury text-xl sm:text-2xl font-bold text-silk-100"
          >
            {STEPS[currentStepIdx].text}
          </motion.h3>
        </AnimatePresence>
      </div>

      {/* Progress Line */}
      <div className="w-64 bg-obsidian-850 h-1.5 rounded-full overflow-hidden border border-gold-400/20">
        <motion.div
          animate={{ width: `${((currentStepIdx + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.5 }}
          className="bg-gold-gradient h-full rounded-full"
        />
      </div>

      <p className="text-xs text-silk-300/50 font-mono">
        Curating emotional alignment, bespoke wrapping, & handwritten calligraphic parchment...
      </p>

    </div>
  );
};
