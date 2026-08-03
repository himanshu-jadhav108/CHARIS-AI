'use client';

import React, { useState } from 'react';
import { Sparkles, Crown, Bookmark, ArrowRight, Heart, Star, ShieldCheck } from 'lucide-react';
import { RecommendationItem, Product } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { useAuthStore } from '@/stores/useAuthStore';

interface GiftCardProps {
  item: RecommendationItem;
  rank: number;
  onOpenProduct: (product: Product) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ item, rank, onOpenProduct }) => {
  const { product, match_score, luxury_score, tailored_reason, emotional_meaning, story } = item;
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { user } = useAuthStore();
  const token = user?.access_token || 'active_session_token';
  const bookmarked = isBookmarked(product.id);

  const rankBadges = ["PINNACLE MATCH #1", "SELECTION #2", "SELECTION #3"];

  return (
    <GlassCard className="flex flex-col justify-between border-gold-400/30 overflow-hidden group p-0">
      
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/20 to-transparent" />

        {/* Top Badges Bar */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-burgundy-800/90 border border-gold-400/40 text-gold-300 text-[10px] font-mono tracking-widest uppercase shadow-gold-glow">
            {rankBadges[rank - 1] || `#${rank} MATCH`}
          </span>

          <button
            onClick={() => toggleBookmark(product, token)}
            className={`p-2 rounded-full backdrop-blur-md border transition-all ${
              bookmarked
                ? 'bg-gold-400 text-obsidian-950 border-gold-400 shadow-gold-glow'
                : 'bg-obsidian-950/60 text-silk-100 border-gold-400/20 hover:text-gold-300'
            }`}
          >
            <Bookmark className="h-4 w-4 fill-current" />
          </button>
        </div>

        {/* Match Percentage Glow Pill */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="px-3 py-1 rounded-full bg-obsidian-950/90 border border-gold-400/50 backdrop-blur-md text-gold-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-gold-glow">
            <Sparkles className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
            <span>{match_score}% MATCH</span>
          </div>
          <span className="text-[10px] font-mono text-silk-300/80 bg-obsidian-950/70 px-2 py-1 rounded-full">
            ⭐ {luxury_score}/10 SOVEREIGN
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-gold-400 tracking-widest">{product.category} • {product.brand}</span>
            <span className="font-serif-luxury font-bold text-lg gold-text-gradient">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
          </div>

          <h3 className="font-serif-luxury text-xl font-bold text-silk-100 group-hover:text-gold-300 transition-colors">
            {product.name}
          </h3>

          <p className="text-xs text-silk-300/70 font-light leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Tailored AI Rationale Section */}
        <div className="p-4 rounded-xl bg-obsidian-850/90 border border-gold-400/20 space-y-2">
          <div className="flex items-center space-x-1.5 text-gold-400 text-[10px] font-mono uppercase tracking-wider">
            <Crown className="h-3.5 w-3.5" />
            <span>Tailored Concierge Rationale</span>
          </div>
          <p className="text-xs text-silk-200/90 italic font-serif-luxury">
            "{tailored_reason}"
          </p>
          <div className="pt-2 border-t border-gold-400/10 flex items-center space-x-1.5 text-[11px] text-gold-300/80">
            <Heart className="h-3 w-3 text-burgundy-500 shrink-0" />
            <span className="truncate">{emotional_meaning}</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => onOpenProduct(product)}
          className="w-full py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-gold-glow mt-4"
        >
          <span>View Details & Acquisition</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

      </div>

    </GlassCard>
  );
};
