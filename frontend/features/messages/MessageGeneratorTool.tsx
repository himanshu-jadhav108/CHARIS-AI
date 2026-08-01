'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check, Feather, Crown, RefreshCw, Download } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { generateGiftCardMessage } from '@/services/api';

const TONES = [
  { id: 'Luxury', label: 'Luxury & Estate', desc: 'Sophisticated, timeless high-society elegance' },
  { id: 'Romantic', label: 'Deep Romance', desc: 'Passionate, tender, deeply intimate' },
  { id: 'Professional', label: 'Executive Esteem', desc: 'Respectful, distinguished leadership recognition' },
  { id: 'Family', label: 'Family Heritage', desc: 'Warm enduring love, gratitude, family anchor' },
  { id: 'Friend', label: 'Warm Friendship', desc: 'Joyful, sincere, warm celebration' },
  { id: 'Heartfelt', label: 'Heartfelt Soul', desc: 'Profoundly moving, authentic, soul-touching' }
];

export const MessageGeneratorTool: React.FC = () => {
  const [recipientName, setRecipientName] = useState('Lady Elizabeth');
  const [occasion, setOccasion] = useState('40th Milestone Birthday');
  const [giftName, setGiftName] = useState('Vacheron Celestial Perpetual Calendar');
  const [selectedTone, setSelectedTone] = useState('Luxury');
  const [existingMessage, setExistingMessage] = useState('');
  
  const [generatedMessage, setGeneratedMessage] = useState(
    `Presented to Lady Elizabeth,\n\nTo commemorate your 40th Milestone Birthday, may this handcrafted timekeeper stand as an enduring tribute to your incomparable grace, distinction, and timeless elegance.\n\nWith highest compliments,`
  );
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    const msg = await generateGiftCardMessage({
      recipient_name: recipientName,
      occasion: occasion,
      gift_name: giftName,
      tone: selectedTone,
      existing_message: existingMessage
    });
    setGeneratedMessage(msg);
    setIsGenerating(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      
      {/* Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-800/80 border border-gold-400/40 text-gold-300 text-xs font-mono uppercase tracking-widest shadow-gold-glow">
          <Feather className="h-4 w-4 text-gold-400" />
          <span>Calligraphic Message Artistry</span>
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-silk-100">
          AI Luxury Gift Card Writer
        </h2>
        <p className="text-xs sm:text-sm text-silk-300/75 max-w-xl mx-auto leading-relaxed">
          Compose or refine bespoke gift messages rendered in digital gold calligraphy.
          Select from 6 curated luxury tones to match your sentiment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Controls Column */}
        <GlassCard className="p-6 sm:p-8 space-y-6 border-gold-400/30">
          <div className="flex items-center space-x-2 border-b border-gold-400/20 pb-4">
            <Crown className="h-5 w-5 text-gold-400" />
            <h3 className="font-serif-luxury text-lg font-bold text-silk-100">Message Parameters</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-mono text-gold-400 uppercase tracking-widest block mb-1">Recipient Name</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 px-3.5 py-2.5 text-silk-100 focus:outline-none focus:border-gold-400/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-gold-400 uppercase tracking-widest block mb-1">Occasion</label>
                <input
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 px-3.5 py-2.5 text-silk-100 focus:outline-none focus:border-gold-400/50"
                />
              </div>
              <div>
                <label className="font-mono text-gold-400 uppercase tracking-widest block mb-1">Gift Piece</label>
                <input
                  type="text"
                  value={giftName}
                  onChange={(e) => setGiftName(e.target.value)}
                  className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 px-3.5 py-2.5 text-silk-100 focus:outline-none focus:border-gold-400/50"
                />
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="font-mono text-gold-400 uppercase tracking-widest block mb-2">Select Luxury Tone</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TONES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTone(t.id)}
                    className={`p-3 rounded-xl text-left border transition-all ${
                      selectedTone === t.id
                        ? 'bg-burgundy-800/90 border-gold-400 text-gold-300 shadow-gold-glow'
                        : 'bg-obsidian-850/60 border-gold-400/20 text-silk-300/70 hover:text-silk-100'
                    }`}
                  >
                    <span className="font-serif-luxury font-bold text-xs block">{t.label}</span>
                    <span className="text-[9px] text-silk-300/50 line-clamp-1">{t.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional draft improvement */}
            <div>
              <label className="font-mono text-gold-400 uppercase tracking-widest block mb-1">Refine Existing Notes (Optional)</label>
              <textarea
                value={existingMessage}
                onChange={(e) => setExistingMessage(e.target.value)}
                placeholder="Paste your rough draft here to polish with AI gold calligraphy..."
                className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 p-3 text-silk-100 focus:outline-none focus:border-gold-400/50 h-20 resize-none text-xs"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-gold-glow"
            >
              {isGenerating ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              <span>{isGenerating ? 'Composing Calligraphy...' : 'Generate AI Message'}</span>
            </button>
          </div>
        </GlassCard>

        {/* Live Calligraphy Envelope Card Preview */}
        <div className="space-y-4">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl border-gold-400/50 shadow-luxury relative overflow-hidden bg-gradient-to-b from-burgundy-900/40 via-obsidian-900 to-obsidian-950">
            
            {/* Wax Seal Emblem */}
            <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-burgundy-800 border-2 border-gold-400/60 flex items-center justify-center shadow-gold-glow">
              <Crown className="h-6 w-6 text-gold-400" />
            </div>

            <div className="space-y-6">
              <span className="text-[10px] font-mono text-gold-400/80 uppercase tracking-[0.3em] block border-b border-gold-400/20 pb-3">
                CHARIS Calligraphic Parchment • {selectedTone} Tone
              </span>

              <div className="font-serif-luxury text-base sm:text-lg text-silk-100 leading-relaxed whitespace-pre-line italic font-light">
                {generatedMessage}
              </div>

              <div className="pt-6 border-t border-gold-400/20 flex justify-between items-end text-xs font-mono text-gold-300/80">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-silk-300/50 block">COMMEMORATING</span>
                  <span>{occasion}</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-widest text-silk-300/50 block">ESTATE HANDOVER</span>
                  <span>White-Glove Sealed</span>
                </div>
              </div>
            </div>

          </div>

          {/* Action Row */}
          <div className="flex space-x-3">
            <button
              onClick={handleCopy}
              className="flex-1 py-3 rounded-xl bg-obsidian-850 border border-gold-400/30 text-gold-300 font-semibold text-xs uppercase tracking-widest hover:bg-burgundy-800/60 transition-colors flex items-center justify-center space-x-2"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Message Text'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
