'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Crown, Sparkles, MessageSquare, ArrowLeft, Heart } from 'lucide-react';
import { CuratedExperience, Product } from '@/types';
import { CuratedExperienceCard } from './CuratedExperienceCard';
import { AnticipationLoader } from './AnticipationLoader';
import { staggerContainer, fadeInVariants } from '@/animations/framer';
import Link from 'next/link';

interface RecommendationRevealProps {
  recommendations: CuratedExperience[];
  recipientName?: string;
  onOpenProduct: (product: Product) => void;
  onReset: () => void;
}

export const RecommendationReveal: React.FC<RecommendationRevealProps> = ({
  recommendations,
  recipientName,
  onOpenProduct,
  onReset
}) => {
  const [anticipating, setAnticipating] = useState(true);

  const handleAnticipationComplete = () => {
    setAnticipating(false);
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#F3E5AB', '#D4AF37', '#4A0E17', '#C5A059']
    });
  };

  if (anticipating) {
    return <AnticipationLoader onComplete={handleAnticipationComplete} />;
  }

  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="space-y-12 py-8">
      
      {/* Header Banner */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInVariants}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-800/80 border border-gold-400/40 text-gold-300 text-xs font-mono uppercase tracking-widest shadow-gold-glow">
          <Crown className="h-4 w-4 text-gold-400" />
          <span>Curated Especially For You</span>
        </div>

        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-silk-100">
          Complete Gift Experiences for <br />
          <span className="gold-text-gradient italic font-normal">{recipientName || 'Your Special Recipient'}</span>
        </h2>

        <p className="text-xs sm:text-sm text-silk-300/75 max-w-xl mx-auto leading-relaxed font-light">
          Evaluated across 50 hybrid international & Indian luxury items. Every recommendation features a core product, bespoke wrapping, floral pairing, artisanal chocolates, and signature Memory Box keepsake.
        </p>

        <div className="pt-4 flex justify-center space-x-4">
          <Link
            href="/messages"
            className="px-5 py-2.5 rounded-full bg-obsidian-850 border border-gold-400/30 text-gold-300 text-xs font-mono hover:bg-burgundy-800/60 transition-colors flex items-center space-x-2"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Craft Gift Message with AI</span>
          </Link>

          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-full bg-obsidian-900 border border-gold-400/20 text-silk-300/70 text-xs font-mono hover:text-gold-300 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Refine Gift Profile</span>
          </button>
        </div>
      </motion.div>

      {/* Experience Cards Stack */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="space-y-8 max-w-6xl mx-auto"
      >
        {recommendations.map((exp, idx) => (
          <motion.div key={exp.product.id || idx} variants={fadeInVariants}>
            <CuratedExperienceCard
              experience={exp}
              rank={idx + 1}
              recipientName={recipientName || 'Recipient'}
              occasion={exp.experience_package?.greeting_card_text ? 'Special Milestone' : 'Celebration'}
              onOpenProduct={onOpenProduct}
            />
          </motion.div>
        ))}
      </motion.div>

    </div>
  );
};
