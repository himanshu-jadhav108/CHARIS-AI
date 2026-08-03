'use client';

import React from 'react';
import { Crown, User, Calendar, DollarSign, Sparkles, Heart, Tag } from 'lucide-react';
import { PreferencesState } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';

interface PreferenceSidebarProps {
  preferences: PreferencesState;
  isComplete: boolean;
}

export const PreferenceSidebar: React.FC<PreferenceSidebarProps> = ({ preferences, isComplete }) => {
  const fields = [
    { label: 'Recipient', value: preferences.recipient, icon: User },
    { label: 'Occasion', value: preferences.occasion, icon: Calendar },
    { label: 'Investment Budget', value: preferences.budget, icon: DollarSign },
    { label: 'Desired Impact', value: preferences.desired_emotional_impact, icon: Heart },
  ];

  const filledCount = fields.filter((f) => !!f.value).length;
  const progressPct = Math.min(Math.round((filledCount / 4) * 100), 100);

  return (
    <GlassCard className="p-6 border-gold-400/30 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gold-400/20">
        <div className="flex items-center space-x-2">
          <Crown className="h-5 w-5 text-gold-400" />
          <h3 className="font-serif-luxury text-base font-bold text-silk-100">Recipient Dossier</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-burgundy-800 border border-gold-400/30 text-gold-300">
          LIVE AI
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-gold-300">
          <span>CURATION INTELLIGENCE</span>
          <span>{progressPct}%</span>
        </div>
        <div className="w-full bg-obsidian-850 h-2 rounded-full overflow-hidden border border-gold-400/20">
          <div
            className="bg-gold-gradient h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Extracted Fields */}
      <div className="space-y-3">
        {fields.map((field, idx) => {
          const Icon = field.icon;
          return (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-xs transition-all ${
                field.value
                  ? 'bg-obsidian-850/90 border-gold-400/40 text-silk-100'
                  : 'bg-obsidian-900/40 border-gold-400/10 text-silk-300/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-3.5 w-3.5 text-gold-400" />
                  <span className="font-mono text-[10px] uppercase text-silk-300/70">{field.label}</span>
                </div>
                {field.value && <Sparkles className="h-3 w-3 text-gold-400 animate-pulse" />}
              </div>
              <p className="mt-1 font-serif-luxury font-semibold pl-5 text-sm">
                {field.value || 'Awaiting input...'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Personality & Hobbies Tags */}
      {preferences.personality && preferences.personality.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-gold-400/10">
          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">Extracted Aesthetic Tags</span>
          <div className="flex flex-wrap gap-1.5">
            {preferences.personality.map((tag, idx) => (
              <span key={idx} className="px-2.5 py-1 rounded-full bg-burgundy-800/60 border border-gold-400/30 text-gold-300 text-[10px] font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Completeness Badge */}
      {isComplete && (
        <div className="p-3 rounded-xl bg-gold-400/10 border border-gold-400/40 text-center space-y-1">
          <Sparkles className="h-4 w-4 text-gold-400 mx-auto animate-spin" />
          <p className="text-xs font-serif-luxury font-bold gold-text-gradient">Ready for Recommendation Reveal</p>
          <span className="text-[10px] text-silk-300/60 block">50 Vault Items Evaluated</span>
        </div>
      )}

    </GlassCard>
  );
};
