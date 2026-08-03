'use client';

import React, { useState } from 'react';
import { useConsultStore } from '@/stores/useConsultStore';
import { ChatBox } from '@/features/chat/ChatBox';
import { PreferenceSidebar } from '@/features/chat/PreferenceSidebar';
import { RecommendationReveal } from '@/features/recommendation/RecommendationReveal';
import { ProductDetailModal } from '@/features/product/ProductDetailModal';
import { Product } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';
import { Crown, Sparkles, UserCheck, UserPlus } from 'lucide-react';

export default function ConsultPage() {
  const { preferences, isComplete, recommendations, resetConsultation, sendMessage } = useConsultStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recipientChosen, setRecipientChosen] = useState(false);

  const savedRecipients = [
    { name: 'Ananya Sharma', relationship: 'Mother', details: 'Luxury Tea Collector • B-Day 14 Oct' },
    { name: 'Rajiv Malhotra', relationship: 'Father', details: 'Entrepreneur & Watch Enthusiast • B-Day 03 Dec' }
  ];

  const handleSelectRecipient = (name: string, relationship: string) => {
    setRecipientChosen(true);
    sendMessage(`I am curating a special gesture for my ${relationship}, ${name}.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {!recipientChosen && !isComplete ? (
        <div className="max-w-xl mx-auto my-16 space-y-6">
          <div className="text-center space-y-3">
            <div className="h-12 w-12 rounded-full bg-burgundy-800 border border-gold-400/40 flex items-center justify-center mx-auto text-gold-400">
              <Crown className="h-6 w-6" />
            </div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold gold-text-gradient">
              Initiate Curation Dossier
            </h2>
            <p className="text-xs text-silk-300/75 max-w-sm mx-auto">
              Welcome back. Would you like to curate a gift for a registered recipient or establish a new profile?
            </p>
          </div>

          <div className="space-y-4">
            {savedRecipients.map((rec, idx) => (
              <GlassCard
                key={idx}
                onClick={() => handleSelectRecipient(rec.name, rec.relationship)}
                className="cursor-pointer border-gold-400/20 p-5 hover:border-gold-400/50 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-full bg-burgundy-800/60 flex items-center justify-center text-gold-400 border border-gold-400/30">
                    <UserCheck className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-serif-luxury font-bold text-sm text-silk-100">{rec.name}</h4>
                    <span className="text-[10px] text-silk-300/50 font-mono uppercase">{rec.details}</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-gold-300 uppercase">SELECT →</span>
              </GlassCard>
            ))}

            <GlassCard
              onClick={() => setRecipientChosen(true)}
              className="cursor-pointer border-gold-400/20 p-5 hover:border-gold-400/50 flex items-center justify-between bg-burgundy-900/10"
            >
              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-obsidian-850 flex items-center justify-center text-gold-400 border border-gold-400/30">
                  <UserPlus className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="font-serif-luxury font-bold text-sm text-silk-100">Create New Recipient Dossier</h4>
                  <span className="text-[10px] text-silk-300/50 font-mono uppercase">Start a completely fresh profile</span>
                </div>
              </div>
              <span className="text-[10px] font-mono text-gold-300 uppercase">START →</span>
            </GlassCard>
          </div>
        </div>
      ) : (
        <>
          {isComplete && recommendations && recommendations.length > 0 ? (
            <RecommendationReveal
              recommendations={recommendations}
              recipientName={preferences.recipient}
              onOpenProduct={setSelectedProduct}
              onReset={() => {
                resetConsultation();
                setRecipientChosen(false);
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Main Chat Interface */}
              <div className="lg:col-span-2">
                <ChatBox />
              </div>

              {/* Live Extracted Preference Sidebar */}
              <div className="space-y-6">
                <PreferenceSidebar preferences={preferences} isComplete={isComplete} />
              </div>

            </div>
          )}
        </>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
