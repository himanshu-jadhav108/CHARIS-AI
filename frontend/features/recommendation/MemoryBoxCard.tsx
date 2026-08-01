'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Sparkles, Download, Share2, Heart, Check, BookOpen } from 'lucide-react';
import { MemoryBox } from '@/types';
import { GlassCard } from '@/components/common/GlassCard';

interface MemoryBoxCardProps {
  memoryBox: MemoryBox;
  productName: string;
  recipientName: string;
  occasion: string;
}

export const MemoryBoxCard: React.FC<MemoryBoxCardProps> = ({
  memoryBox,
  productName,
  recipientName,
  occasion
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPNG = async () => {
    setDownloading(true);
    try {
      // Clean native calligraphic keepsake card export
      const printWindow = window.open('', '_blank');
      if (printWindow && cardRef.current) {
        printWindow.document.write(`
          <html>
            <head>
              <title>CHARIS Memory Box - ${recipientName}</title>
              <style>
                body { background: #0B0B0E; color: #FAFAFC; font-family: Georgia, serif; padding: 40px; text-align: center; }
                .card { border: 2px solid #D4AF37; padding: 30px; border-radius: 20px; max-width: 600px; margin: auto; background: #121218; box-shadow: 0 0 30px rgba(212,175,55,0.2); }
                h1 { color: #D4AF37; letter-spacing: 2px; font-size: 24px; }
                .tag { font-family: monospace; color: #C5A059; font-size: 11px; text-transform: uppercase; }
                .box { background: rgba(74,14,23,0.3); border: 1px solid rgba(212,175,55,0.3); padding: 15px; border-radius: 12px; margin-top: 15px; text-align: left; font-size: 14px; line-height: 1.6; }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="tag">CHARIS SIGNATURE MEMORY BOX • HEIRLOOM KEEPSAKE</div>
                <h1>For ${recipientName} — ${occasion}</h1>
                <p style="color: #F3E5AB; font-size: 14px;">Selected Piece: ${productName}</p>
                <div class="box"><strong>Why This Gift Matters:</strong><br/>"${memoryBox.why_this_gift_matters}"</div>
                <div class="box"><strong>Emotional Narrative:</strong><br/>"${memoryBox.emotional_story}"</div>
                <div class="box"><strong>Personal Reflection:</strong><br/>${memoryBox.personal_reflection}</div>
              </div>
              <script>window.onload = function() { window.print(); }</script>
            </body>
          </html>
        `);
        printWindow.document.close();
      } else {
        window.print();
      }
    } catch (e) {
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <GlassCard className="p-0 border-gold-400/40 overflow-hidden shadow-luxury">
      
      {/* Printable / Capturable Parchment Area */}
      <div
        ref={cardRef}
        className="p-8 sm:p-10 space-y-6 bg-gradient-to-b from-burgundy-950 via-obsidian-900 to-obsidian-950 border-b border-gold-400/20 relative"
      >
        
        {/* Wax Stamp Seal Icon */}
        <div className="absolute top-6 right-6 h-12 w-12 rounded-full bg-burgundy-800 border-2 border-gold-400/60 flex items-center justify-center shadow-gold-glow">
          <Crown className="h-6 w-6 text-gold-400" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-[0.3em] block">
            CHARIS SIGNATURE MEMORY BOX • HEIRLOOM KEEPSAKE CARD
          </span>
          <h3 className="font-serif-luxury text-2xl font-bold text-silk-100">
            For {recipientName} • <span className="gold-text-gradient">{occasion}</span>
          </h3>
          <p className="text-xs text-gold-300/80 font-mono">
            Selected Piece: {productName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed pt-4 border-t border-gold-400/20">
          
          <div className="p-4 rounded-xl bg-obsidian-850/80 border border-gold-400/20 space-y-2">
            <div className="flex items-center space-x-1.5 text-gold-400 font-mono text-[10px] uppercase">
              <Heart className="h-3.5 w-3.5" />
              <span>Why This Gift Matters</span>
            </div>
            <p className="text-silk-200/90 font-serif-luxury italic">
              "{memoryBox.why_this_gift_matters}"
            </p>
          </div>

          <div className="p-4 rounded-xl bg-obsidian-850/80 border border-gold-400/20 space-y-2">
            <div className="flex items-center space-x-1.5 text-gold-400 font-mono text-[10px] uppercase">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Emotional Narrative</span>
            </div>
            <p className="text-silk-200/90 font-serif-luxury italic">
              "{memoryBox.emotional_story}"
            </p>
          </div>

        </div>

        <div className="p-4 rounded-xl bg-burgundy-900/50 border border-gold-400/30 text-xs space-y-1">
          <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">Personal Reflection & Unboxing Protocol</span>
          <p className="text-silk-200/90 font-light">
            {memoryBox.personal_reflection}
          </p>
        </div>

      </div>

      {/* Action Footer */}
      <div className="p-4 bg-obsidian-950 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-silk-300">
        <span className="text-gold-400 text-[10px] uppercase tracking-wider flex items-center space-x-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Sovereign Memory Artifact</span>
        </span>

        <div className="flex space-x-3 w-full sm:w-auto">
          <button
            onClick={handleShare}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-obsidian-850 border border-gold-400/30 text-silk-200 hover:text-gold-300 transition-colors flex items-center justify-center space-x-2 text-xs"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Share2 className="h-3.5 w-3.5 text-gold-400" />}
            <span>{copied ? 'Link Copied' : 'Share Memory Box'}</span>
          </button>

          <button
            onClick={handleDownloadPNG}
            disabled={downloading}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-gold-gradient text-obsidian-950 font-bold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 text-xs shadow-gold-glow"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{downloading ? 'Exporting Card...' : 'Download Keepsake PNG'}</span>
          </button>
        </div>
      </div>

    </GlassCard>
  );
};
