'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, ShieldCheck, Bookmark, Share2, Star, CheckCircle, Truck, Heart, ArrowRight } from 'lucide-react';
import { Product } from '@/types';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { useAuthStore } from '@/stores/useAuthStore';
import Link from 'next/link';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const [acquisitionSuccess, setAcquisitionSuccess] = useState(false);

  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { user } = useAuthStore();
  const token = user?.access_token || 'active_session_token';

  if (!product) return null;

  const bookmarked = isBookmarked(product.id);
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAcquire = () => {
    setAcquisitionSuccess(true);
    setTimeout(() => setAcquisitionSuccess(false), 4000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-obsidian-950/80 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl glass-panel rounded-3xl border-gold-400/40 shadow-luxury overflow-hidden my-8"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-obsidian-950/80 border border-gold-400/30 text-silk-200 hover:text-gold-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 sm:p-10">
            
            {/* Left Image & Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-gold-400/30 shadow-luxury">
                <img
                  src={gallery[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-burgundy-800/90 border border-gold-400/40 text-gold-300 text-[10px] font-mono tracking-widest uppercase">
                  ⭐ {product.luxury_score} Sovereign Score
                </div>
              </div>

              {/* Gallery Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-16 w-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        activeImageIdx === idx ? 'border-gold-400 scale-105 shadow-gold-glow' : 'border-gold-400/20 opacity-60'
                      }`}
                    >
                      <img src={img} alt="Gallery" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Courier Delivery Guarantee */}
              <div className="p-4 rounded-xl bg-obsidian-850/80 border border-gold-400/20 flex items-start space-x-3">
                <Truck className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-semibold text-silk-100 block">White-Glove Courier Dispatch</span>
                  <span className="text-silk-300/70">{product.delivery}</span>
                </div>
              </div>
            </div>

            {/* Right Product Details Column */}
            <div className="space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-gold-400 tracking-widest">{product.category} • {product.brand}</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-full bg-obsidian-850 border border-gold-400/20 text-silk-300 hover:text-gold-300"
                      title="Share link"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => toggleBookmark(product, token)}
                      className={`p-2 rounded-full border transition-all ${
                        bookmarked ? 'bg-gold-400 text-obsidian-950 border-gold-400' : 'bg-obsidian-850 border-gold-400/20 text-silk-300 hover:text-gold-300'
                      }`}
                    >
                      <Bookmark className="h-4 w-4 fill-current" />
                    </button>
                  </div>
                </div>

                <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-silk-100">
                  {product.name}
                </h2>

                <div className="font-serif-luxury text-2xl font-bold gold-text-gradient">
                  ₹{product.price.toLocaleString('en-IN')} INR
                </div>

                <p className="text-xs sm:text-sm text-silk-300/80 leading-relaxed font-light">
                  {product.description}
                </p>

                {/* Craftsmanship Story Box */}
                <div className="p-4 rounded-xl bg-burgundy-900/40 border border-gold-400/30 space-y-2">
                  <div className="flex items-center space-x-2 text-gold-400 text-xs font-mono uppercase">
                    <Crown className="h-4 w-4" />
                    <span>The Heritage Story</span>
                  </div>
                  <p className="text-xs text-silk-200/90 italic font-serif-luxury leading-relaxed">
                    "{product.story}"
                  </p>
                </div>

                {/* Features List */}
                {product.features && product.features.length > 0 && (
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">Signature Specifications</span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-silk-300/80">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-3.5 w-3.5 text-gold-400 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-gold-400/10">
                {copied && (
                  <p className="text-xs text-gold-300 text-center font-mono">Product link copied to clipboard!</p>
                )}
                {acquisitionSuccess && (
                  <p className="text-xs text-emerald-400 text-center font-mono font-bold">
                    ✓ Private Client Concierge notified! Handover dispatch scheduled.
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAcquire}
                    className="flex-1 py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-gold-glow"
                  >
                    <Crown className="h-4 w-4" />
                    <span>Request Acquisition</span>
                  </button>

                  <Link
                    href="/messages"
                    onClick={onClose}
                    className="px-6 py-3.5 rounded-xl bg-obsidian-850 border border-gold-400/30 text-gold-300 font-semibold text-xs uppercase tracking-widest hover:bg-burgundy-800/60 transition-colors flex items-center justify-center space-x-2 text-center"
                  >
                    <span>Write AI Gift Card</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
