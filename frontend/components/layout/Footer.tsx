import React from 'react';
import Link from 'next/link';
import { Crown, ShieldCheck, Gem, Sparkles, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-obsidian-950 border-t border-gold-400/20 pt-16 pb-12 text-silk-300/70 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-gold-400/10 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-obsidian-850 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-serif-luxury text-lg text-silk-100 font-semibold">White-Glove Guarantee</h4>
            <p className="text-xs text-silk-300/60 max-w-xs">Every recommendation is verified for genuine provenance and personal courier handover.</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-obsidian-850 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="font-serif-luxury text-lg text-silk-100 font-semibold">AI Intelligence Vault</h4>
            <p className="text-xs text-silk-300/60 max-w-xs">Autonomous agentic intelligence trained on luxury horology, haute joaillerie, and rare gastronomy.</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-obsidian-850 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <Gem className="h-6 w-6" />
            </div>
            <h4 className="font-serif-luxury text-lg text-silk-100 font-semibold">1-of-1 Bespoke Curation</h4>
            <p className="text-xs text-silk-300/60 max-w-xs">No generic catalog items. Only rare, high-emotion luxury pieces crafted for discerning givers.</p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-gold-400" />
              <span className="font-serif-luxury text-2xl font-bold gold-text-gradient">CHARIS</span>
            </div>
            <p className="text-xs leading-relaxed text-silk-300/60">
              The world's premier AI Luxury Gift Concierge. Elevating the art of giving through natural conversation and haute intelligence.
            </p>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4 font-mono">Experience</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/consult" className="hover:text-gold-300 transition-colors">Start Consultation</Link></li>
              <li><Link href="/catalog" className="hover:text-gold-300 transition-colors">The 50 Vault Items</Link></li>
              <li><Link href="/messages" className="hover:text-gold-300 transition-colors">AI Gift Message Writer</Link></li>
              <li><Link href="/dashboard" className="hover:text-gold-300 transition-colors">VIP Sovereign Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-4 font-mono">Curated Vault</h5>
            <ul className="space-y-2.5 text-xs">
              <li><span className="hover:text-gold-300 cursor-pointer">Fine Horology</span></li>
              <li><span className="hover:text-gold-300 cursor-pointer">Haute Joaillerie</span></li>
              <li><span className="hover:text-gold-300 cursor-pointer">Bespoke Escapes</span></li>
              <li><span className="hover:text-gold-300 cursor-pointer">Rare Vintages & Spirits</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest text-gold-400 font-semibold mb-2 font-mono">Private Client Dispatch</h5>
            <p className="text-xs text-silk-300/60">Subscribe to receive invitation-only drops of rare vintage acquisitions.</p>
            <div className="flex items-center rounded-xl bg-obsidian-850 border border-gold-400/30 p-1">
              <input
                type="email"
                placeholder="concierge@mayfair.com"
                className="bg-transparent px-3 py-2 text-xs text-silk-100 placeholder-silk-300/40 focus:outline-none w-full"
              />
              <button className="p-2 rounded-lg bg-gold-400 text-obsidian-950 font-bold hover:bg-gold-300 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gold-400/10 flex flex-col md:flex-row justify-between items-center text-xs text-silk-300/40 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} CHARIS Luxury Concierge Inc. All rights reserved. Apple-level precision meets bespoke warmth.</p>
          <div className="flex space-x-6">
            <span className="hover:text-gold-300 cursor-pointer">Privacy Dossier</span>
            <span className="hover:text-gold-300 cursor-pointer">Terms of Curation</span>
            <span className="hover:text-gold-300 cursor-pointer">White-Glove Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
