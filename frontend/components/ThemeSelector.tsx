'use client';

import React from 'react';
import { Palette, Crown } from 'lucide-react';
import { useThemeStore, LuxuryTheme } from '@/stores/useThemeStore';

export const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  const themes: { id: LuxuryTheme; label: string; desc: string; previewClass: string }[] = [
    { id: 'Classic-Luxury', label: 'Classic Luxury', desc: 'Obsidian, gold, and silk white', previewClass: 'bg-obsidian-900 border-gold-400' },
    { id: 'Royal-Burgundy', label: 'Royal Burgundy', desc: 'Deep burgundy, gold, and cream', previewClass: 'bg-burgundy-900 border-gold-400' },
    { id: 'Midnight-Black', label: 'Midnight Black', desc: 'Matte black and sleek silver', previewClass: 'bg-black border-slate-400' },
    { id: 'Ivory-Gold', label: 'Ivory Gold', desc: 'Warm ivory and champagne gold', previewClass: 'bg-[#FAF8F5] border-gold-400' },
    { id: 'Elegant-Light', label: 'Elegant Light', desc: 'Silk white and soft gold accents', previewClass: 'bg-white border-gold-500' }
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border-gold-400/20 space-y-4">
      <div className="flex items-center space-x-2 border-b border-gold-400/20 pb-3">
        <Palette className="h-4.5 w-4.5 text-gold-400" />
        <h4 className="font-serif-luxury font-bold text-xs uppercase tracking-widest text-silk-100">
          Concierge Theme Atelier
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        {themes.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-burgundy-800/80 border-gold-400 text-gold-300 shadow-gold-glow'
                  : 'bg-obsidian-850/60 border-gold-400/10 text-silk-300/70 hover:text-silk-100 hover:border-gold-400/30'
              }`}
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <span className={`h-4.5 w-4.5 rounded-full border ${t.previewClass}`} />
                <span className="font-serif-luxury font-bold text-xs">{t.label}</span>
              </div>
              <span className="text-[10px] text-silk-300/50 leading-tight block">{t.desc}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
