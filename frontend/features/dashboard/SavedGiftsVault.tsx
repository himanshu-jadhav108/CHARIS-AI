'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bookmark, Clock, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { Product } from '@/types';
import { RecipientProfileData } from './types';

interface SavedGiftsVaultProps {
  bookmarkedProducts: Product[];
  recipients: RecipientProfileData[];
}

export const SavedGiftsVault: React.FC<SavedGiftsVaultProps> = ({
  bookmarkedProducts,
  recipients
}) => {
  return (
    <div className="space-y-8">
      
      {/* Saved Gifts Vault */}
      <GlassCard className="p-6 border-gold-400/30 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gold-400/20">
          <div className="flex items-center space-x-2">
            <Bookmark className="h-5 w-5 text-gold-400" />
            <h3 className="font-serif-luxury text-base font-bold text-silk-100">Saved Gifts Vault</h3>
          </div>
          <span className="text-xs font-mono text-gold-300 font-bold">{bookmarkedProducts.length} Saved</span>
        </div>

        {bookmarkedProducts.length === 0 ? (
          <div className="text-center py-6 text-xs text-silk-300/40 space-y-2">
            <Sparkles className="h-6 w-6 text-gold-400/40 mx-auto" />
            <p>No saved gifts yet. Start a consultation to save recommendations.</p>
            <Link href="/catalog" className="text-gold-400 font-mono underline block pt-2">
              Browse Vault Catalog →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {bookmarkedProducts.map((p) => (
              <div key={p.id} className="flex items-center space-x-3 p-2.5 rounded-xl bg-obsidian-850 border border-gold-400/20">
                <Image src={p.image} alt={p.name} width={40} height={40} className="rounded-lg object-cover border border-gold-400/30" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-luxury text-xs font-bold text-silk-100 truncate">{p.name}</h4>
                  <span className="text-[10px] font-mono text-gold-400">₹{p.price.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Gifting Registry Log */}
      <GlassCard className="p-6 border-gold-400/30 space-y-4">
        <div className="flex items-center space-x-2 pb-3 border-b border-gold-400/20">
          <Clock className="h-5 w-5 text-gold-400" />
          <h3 className="font-serif-luxury text-base font-bold text-silk-100">Gifting Registry Log</h3>
        </div>

        <div className="space-y-4">
          {recipients.map((rec) => (
            <div key={rec.id} className="text-xs space-y-1 pb-3 border-b border-gold-400/10 last:border-b-0 last:pb-0">
              <div className="flex justify-between font-serif-luxury font-semibold text-silk-100">
                <span>{rec.name}</span>
                <span className="gold-text-gradient">{rec.relationship}</span>
              </div>
              <div className="flex justify-between text-[10px] text-silk-300/50 font-mono">
                <span>{rec.last_gift}</span>
                <span>{rec.birthday}</span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

    </div>
  );
};
