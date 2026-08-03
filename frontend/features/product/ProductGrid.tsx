'use client';

import React, { useState } from 'react';
import { Search, Filter, Bookmark, Sparkles, Crown } from 'lucide-react';
import { Product } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { useAuthStore } from '@/stores/useAuthStore';

interface ProductGridProps {
  products: Product[];
  onOpenProduct: (product: Product) => void;
}

const CATEGORIES = [
  'All',
  'Fine Horology',
  'High Jewelry',
  'Bespoke Experiences',
  'Rare Spirits',
  'Niche Parfumerie',
  'Leather Goods',
  'Couture Tech'
];

export const ProductGrid: React.FC<ProductGridProps> = ({ products, onOpenProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { user } = useAuthStore();
  const token = user?.access_token || 'active_session_token';

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-panel p-4 rounded-2xl border-gold-400/20">
        
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search watches, jewelry, rare spirits..."
            className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 pl-10 pr-4 py-2.5 text-xs text-silk-100 placeholder-silk-300/40 focus:outline-none focus:border-gold-400/50"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-burgundy-800 text-gold-300 border border-gold-400/40 shadow-gold-glow'
                  : 'bg-obsidian-850/80 text-silk-300/60 hover:text-gold-300 hover:bg-obsidian-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-3xl border-gold-400/20">
          <Crown className="h-12 w-12 text-gold-400/40 mx-auto mb-3" />
          <h3 className="font-serif-luxury text-xl font-bold text-silk-200">No Vault Items Found</h3>
          <p className="text-xs text-silk-300/60 mt-1">Try adjusting your search criteria or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const bookmarked = isBookmarked(p.id);
            return (
              <GlassCard
                key={p.id}
                onClick={() => onOpenProduct(p)}
                className="cursor-pointer border-gold-400/20 overflow-hidden group p-0 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBookmark(p, token);
                      }}
                      className={`p-2 rounded-full backdrop-blur-md border ${
                        bookmarked ? 'bg-gold-400 text-obsidian-950 border-gold-400' : 'bg-obsidian-950/60 text-silk-100 border-gold-400/20'
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5 fill-current" />
                    </button>
                  </div>

                  <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded bg-obsidian-950/80 text-gold-400 text-[10px] font-mono border border-gold-400/30">
                    ⭐ {p.luxury_score}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="flex justify-between text-[10px] font-mono text-gold-400 uppercase">
                    <span>{p.category}</span>
                    <span>{p.brand}</span>
                  </div>

                  <h3 className="font-serif-luxury font-bold text-base text-silk-100 line-clamp-1 group-hover:text-gold-300">
                    {p.name}
                  </h3>

                  <p className="text-xs text-silk-300/60 line-clamp-2 font-light">
                    {p.description}
                  </p>

                  <div className="pt-3 border-t border-gold-400/10 flex items-center justify-between">
                    <span className="font-serif-luxury font-bold text-base gold-text-gradient">
                      ₹{p.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[10px] font-mono text-gold-300 uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                      VIEW ITEM →
                    </span>
                  </div>
                </div>

              </GlassCard>
            );
          })}
        </div>
      )}

    </div>
  );
};
