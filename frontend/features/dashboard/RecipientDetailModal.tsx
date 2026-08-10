'use client';

import React from 'react';
import Link from 'next/link';
import { Award } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { RecipientProfileData } from './types';

interface RecipientDetailModalProps {
  recipient: RecipientProfileData | null;
  onClose: () => void;
}

export const RecipientDetailModal: React.FC<RecipientDetailModalProps> = ({
  recipient,
  onClose
}) => {
  if (!recipient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md overflow-y-auto">
      <div className="my-8 w-full max-w-2xl">
        <GlassCard className="p-8 sm:p-10 border-gold-400/40 space-y-8 relative">
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-silk-300/60 hover:text-silk-100 font-mono text-xs uppercase"
          >
            Close ×
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className={`h-16 w-16 rounded-full ${recipient.avatar_color} flex items-center justify-center text-silk-100 font-serif-luxury text-2xl font-bold border border-gold-400/30 shrink-0`}>
              {recipient.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-silk-100">
                {recipient.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-[10px] font-mono text-gold-400 bg-burgundy-900/30 px-2 py-0.5 rounded border border-gold-400/20">
                  {recipient.relationship}
                </span>
                <span className="text-[10px] font-mono text-silk-300/60 bg-obsidian-850 px-2 py-0.5 rounded">
                  {recipient.profession}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs border-t border-b border-gold-400/20 py-6">
            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Luxury Preference Style</span>
                <span className="text-silk-200 font-serif-luxury italic">&quot;{recipient.luxury_style}&quot;</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Interests & Fields</span>
                <span className="text-silk-200">{recipient.interests.join(', ')}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Hobbies</span>
                <span className="text-silk-200">{recipient.hobbies.join(', ')}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Favourite Brands</span>
                <span className="text-gold-300">{recipient.favourite_brands.join(', ')}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Favourite Colors</span>
                <span className="text-silk-200">{recipient.favourite_colours.join(', ')}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-silk-300/40 uppercase block">Personal Memory Notes</span>
                <span className="text-silk-200 font-light">{recipient.notes}</span>
              </div>
            </div>
          </div>

          {/* Vertical Gift Timeline */}
          <div className="space-y-4">
            <h4 className="font-serif-luxury text-lg font-bold text-silk-100 flex items-center space-x-2">
              <Award className="h-4.5 w-4.5 text-gold-400" />
              <span>Historical Curation Timeline</span>
            </h4>

            <div className="relative border-l border-gold-400/20 ml-3.5 pl-6 space-y-6">
              {recipient.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full bg-burgundy-900 border-2 border-gold-400/60 shadow-gold-glow" />
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-gold-400 font-bold">{item.year}</span>
                    <h5 className="font-serif-luxury text-sm font-semibold text-silk-100">{item.gift}</h5>
                    <p className="text-[10px] text-silk-300/50 uppercase font-mono">{item.occasion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Link
              href={`/consult?recipient=${recipient.id}`}
              className="px-6 py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-glow"
            >
              Initiate Current Consultation
            </Link>
          </div>

        </GlassCard>
      </div>
    </div>
  );
};
