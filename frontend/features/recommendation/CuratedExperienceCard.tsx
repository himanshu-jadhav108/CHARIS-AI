'use client';

import React, { useState } from 'react';
import { Sparkles, Crown, Bookmark, Heart, Package, Flower2, Gift, Truck, ArrowRight } from 'lucide-react';
import { CuratedExperience, Product } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';
import { Tilt3DCard } from '@/components/3d/Tilt3DCard';
import { MemoryBoxCard } from './MemoryBoxCard';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { useAuthStore } from '@/stores/useAuthStore';

interface CuratedExperienceCardProps {
  experience: CuratedExperience;
  rank: number;
  recipientName: string;
  occasion: string;
  onOpenProduct: (product: Product) => void;
}

export const CuratedExperienceCard: React.FC<CuratedExperienceCardProps> = ({
  experience,
  rank,
  recipientName,
  occasion,
  onOpenProduct
}) => {
  const { product, match_score, luxury_score, tailored_reason, emotional_meaning, experience_package, memory_box } = experience;
  const [showMemoryBox, setShowMemoryBox] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { user } = useAuthStore();
  const token = user?.access_token || 'active_session_token';
  const bookmarked = isBookmarked(product.id);

  const rankTitles = ["CURATED PINNACLE EXPERIENCE #1", "CURATED ALTERNATIVE EXPERIENCE #2", "CURATED ARTISANAL EXPERIENCE #3"];

  return (
    <div className="space-y-6">
      
      <Tilt3DCard>
        <GlassCard className="p-0 border-gold-400/30 overflow-hidden group shadow-luxury">
          
          {/* Header Bar */}
          <div className="p-4 bg-obsidian-950/90 border-b border-gold-400/20 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-burgundy-800 border border-gold-400/40 text-gold-300 text-[10px] font-mono tracking-widest uppercase shadow-gold-glow">
              {rankTitles[rank - 1]}
            </span>
            <div className="flex items-center space-x-2 text-xs font-mono text-gold-300">
              <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
              <span>{match_score}% EMOTIONAL MATCH</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 sm:p-8">
            
            {/* Left Image Column */}
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold-400/30 shadow-luxury">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />

              <button
                onClick={() => toggleBookmark(product, token)}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
                  bookmarked ? 'bg-gold-400 text-obsidian-950 border-gold-400' : 'bg-obsidian-950/60 text-silk-100 border-gold-400/20'
                }`}
              >
                <Bookmark className="h-4 w-4 fill-current" />
              </button>

              <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-obsidian-950/90 text-gold-400 text-[10px] font-mono border border-gold-400/30">
                ⭐ {luxury_score}/10 Sovereign
              </span>
            </div>

            {/* Middle Product & Concierge Rationale Column */}
            <div className="space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-gold-400 tracking-widest">{product.category} • {product.brand}</span>
                <h3 className="font-serif-luxury text-xl font-bold text-silk-100 group-hover:text-gold-300 transition-colors mt-1">
                  {product.name}
                </h3>
                <div className="font-serif-luxury text-xl font-bold gold-text-gradient mt-1">
                  ₹{product.price.toLocaleString('en-IN')} INR
                </div>
                <p className="text-xs text-silk-300/70 font-light leading-relaxed mt-2 line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Rationale Box */}
              <div className="p-3.5 rounded-xl bg-obsidian-850/90 border border-gold-400/20 space-y-1.5">
                <div className="flex items-center space-x-1.5 text-gold-400 text-[10px] font-mono uppercase">
                  <Crown className="h-3.5 w-3.5" />
                  <span>Why This Fits {recipientName}</span>
                </div>
                <p className="text-xs text-silk-200/90 italic font-serif-luxury">
                  "{tailored_reason}"
                </p>
              </div>
            </div>

            {/* Right Complete Experience Package Column */}
            <div className="p-4 rounded-2xl bg-burgundy-950/40 border border-gold-400/25 space-y-3 flex flex-col justify-between">
              
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block border-b border-gold-400/20 pb-1.5">
                  360° Complete Experience Package
                </span>

                <div className="flex items-start space-x-2.5">
                  <Package className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-silk-100 block">Wrapping: {experience_package.luxury_wrapping.name}</span>
                    <span className="text-[11px] text-silk-300/60 leading-tight block">{experience_package.luxury_wrapping.ribbon}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Flower2 className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-silk-100 block">Floral Pairing</span>
                    <span className="text-[11px] text-silk-300/60 leading-tight block">{experience_package.flower_pairing.name}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5">
                  <Gift className="h-4 w-4 text-gold-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-silk-100 block">Artisanal Chocolates</span>
                    <span className="text-[11px] text-silk-300/60 leading-tight block">{experience_package.chocolate_pairing.name}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gold-400/15">
                <button
                  onClick={() => setShowMemoryBox(!showMemoryBox)}
                  className="w-full py-2.5 rounded-xl bg-burgundy-800/80 border border-gold-400/40 text-gold-300 font-mono text-xs hover:bg-burgundy-700 transition-colors flex items-center justify-center space-x-1.5"
                >
                  <Heart className="h-3.5 w-3.5" />
                  <span>{showMemoryBox ? 'Hide Signature Memory Box' : 'View Signature Memory Box'}</span>
                </button>

                <button
                  onClick={() => onOpenProduct(product)}
                  className="w-full py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center space-x-1.5 shadow-gold-glow"
                >
                  <span>Acquire Experience</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>

          </div>

        </GlassCard>
      </Tilt3DCard>

      {/* Signature Memory Box Drawer */}
      {showMemoryBox && memory_box && (
        <MemoryBoxCard
          memoryBox={memory_box}
          productName={product.name}
          recipientName={recipientName}
          occasion={occasion}
        />
      )}

    </div>
  );
};
