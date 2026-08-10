'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Heart } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { RecipientProfileData } from './types';

interface RecipientRegistryProps {
  recipients: RecipientProfileData[];
  onOpenAddModal: () => void;
  onSelectRecipient: (rec: RecipientProfileData) => void;
}

export const RecipientRegistry: React.FC<RecipientRegistryProps> = ({
  recipients,
  onOpenAddModal,
  onSelectRecipient
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-serif-luxury text-xl font-bold text-silk-100 flex items-center space-x-2">
        <Crown className="h-5 w-5 text-gold-400" />
        <span>People You Care About</span>
      </h3>

      {recipients.length === 0 ? (
        <GlassCard className="p-10 text-center space-y-4 border-gold-400/20">
          <div className="h-16 w-16 rounded-full bg-burgundy-900/40 border border-gold-400/30 flex items-center justify-center mx-auto text-gold-400">
            <Heart className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h4 className="font-serif-luxury text-lg font-bold text-silk-100">Establish Gifting Profiles</h4>
            <p className="text-xs text-silk-300/70 max-w-sm mx-auto">
              CHARIS remembers the people who matter most to you. Create your first recipient profile and let your AI concierge track birthdays, preferences, and meaningful moments.
            </p>
          </div>
          <button
            onClick={onOpenAddModal}
            className="px-6 py-2.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95"
          >
            Create Your First Recipient
          </button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {recipients.map((rec) => (
            <GlassCard key={rec.id} className="p-6 border-gold-400/20 space-y-4 hover:border-gold-400/40 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className={`h-11 w-11 rounded-full ${rec.avatar_color} flex items-center justify-center text-silk-100 font-serif-luxury font-bold border border-gold-400/30`}>
                    {rec.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-serif-luxury text-base font-bold text-silk-100">{rec.name}</h4>
                    <span className="text-[9px] font-mono text-gold-400 uppercase tracking-widest bg-burgundy-900/30 px-2 py-0.5 rounded border border-gold-400/20">{rec.relationship}</span>
                  </div>
                </div>

                <p className="text-xs text-silk-300/70 leading-relaxed italic">
                  &quot;{rec.lifestyle}&quot;
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-gold-400/10 pt-3">
                  <div>
                    <span className="text-silk-300/40 uppercase block">Birthday</span>
                    <span className="text-silk-200">{rec.birthday}</span>
                  </div>
                  <div>
                    <span className="text-silk-300/40 uppercase block">Last Gift</span>
                    <span className="text-gold-300">{rec.last_gift}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Link
                  href={`/consult?recipient=${rec.id}`}
                  className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold font-mono text-[10px] text-center hover:opacity-95 transition-opacity"
                >
                  Continue
                </Link>
                <button
                  onClick={() => onSelectRecipient(rec)}
                  className="flex-1 py-2.5 rounded-xl bg-obsidian-850 border border-gold-400/20 text-silk-200 hover:text-gold-300 font-mono text-[10px] transition-colors"
                >
                  View Profile
                </button>
              </div>

            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
