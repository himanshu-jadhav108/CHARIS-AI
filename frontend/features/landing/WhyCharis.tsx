'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldAlert, Sparkles, Award } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const WhyCharis: React.FC = () => {
  const comparisons = [
    {
      feature: "Gifting Approach",
      traditional: "Generic e-commerce category search filters & forms",
      charis: "Warm, empathetic natural conversation with AI Concierge"
    },
    {
      feature: "Selection Depth",
      traditional: "Mass-market products with affiliate links",
      charis: "50 Vaulted items: Horology, High Jewelry, Escapes & Vintages"
    },
    {
      feature: "Emotional Curation",
      traditional: "Algorithmic popularity & inventory clearance push",
      charis: "Bespoke match score based on desired emotional impact"
    },
    {
      feature: "Presentation",
      traditional: "Standard cardboard shipping box",
      charis: "White-glove armored courier + AI Gold Calligraphy Card"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-mono uppercase tracking-widest">
            <Award className="h-4 w-4" />
            <span>Uncompromising Distinction</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-silk-100">
            Why Discerning Clients Choose CHARIS
          </h2>
          <p className="text-silk-300/70 text-sm sm:text-base font-light">
            We rejected the transactional noise of e-commerce to build a sovereign sanctuary for gifting.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border-gold-400/30 shadow-luxury">
          <div className="grid grid-cols-3 gap-4 pb-6 border-b border-gold-400/20 font-serif-luxury text-sm sm:text-base font-bold">
            <div className="text-silk-300/60">Dimension</div>
            <div className="text-red-400/70 flex items-center space-x-1.5">
              <ShieldAlert className="h-4 w-4" />
              <span>Standard E-Commerce</span>
            </div>
            <div className="gold-text-gradient flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-gold-400" />
              <span>CHARIS Concierge</span>
            </div>
          </div>

          <div className="divide-y divide-gold-400/10">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4 py-5 text-xs sm:text-sm items-center">
                <div className="font-medium text-silk-200">{row.feature}</div>
                <div className="text-silk-300/50 flex items-start space-x-2">
                  <X className="h-4 w-4 text-red-400/60 shrink-0 mt-0.5" />
                  <span>{row.traditional}</span>
                </div>
                <div className="text-gold-200 flex items-start space-x-2 font-medium">
                  <Check className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                  <span>{row.charis}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
