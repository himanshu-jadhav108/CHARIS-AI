import React from 'react';
import Link from 'next/link';
import { Crown, ShieldCheck, Gem, Sparkles, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border-color)] pt-16 pb-12 text-[var(--text-muted)] text-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-[var(--border-color)] text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-[var(--secondary-accent)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary-accent)]">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="font-serif-luxury text-lg text-[var(--foreground)] font-semibold">White-Glove Guarantee</h4>
            <p className="text-xs text-[var(--text-muted)] max-w-xs">Every recommendation is verified for genuine provenance and personal courier handover.</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-[var(--secondary-accent)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary-accent)]">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="font-serif-luxury text-lg text-[var(--foreground)] font-semibold">AI Intelligence Vault</h4>
            <p className="text-xs text-[var(--text-muted)] max-w-xs">Autonomous agentic intelligence trained on luxury horology, haute joaillerie, and rare gastronomy.</p>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-[var(--secondary-accent)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary-accent)]">
              <Gem className="h-6 w-6" />
            </div>
            <h4 className="font-serif-luxury text-lg text-[var(--foreground)] font-semibold">1-of-1 Bespoke Curation</h4>
            <p className="text-xs text-[var(--text-muted)] max-w-xs">No generic catalog items. Only rare, high-emotion luxury pieces crafted for discerning givers.</p>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 py-12">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Crown className="h-6 w-6 text-[var(--primary-accent)]" />
              <span className="font-serif-luxury text-2xl font-bold gold-text-gradient">CHARIS</span>
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              The world&apos;s premier AI Luxury Gift Concierge. Elevating the art of giving through natural conversation and haute intelligence.
            </p>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-widest text-[var(--primary-accent)] font-semibold mb-4 font-mono">Experience</h5>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/consult" className="hover:text-[var(--primary-accent)] transition-colors">Start Consultation</Link></li>
              <li><Link href="/catalog" className="hover:text-[var(--primary-accent)] transition-colors">The 50 Vault Items</Link></li>
              <li><Link href="/messages" className="hover:text-[var(--primary-accent)] transition-colors">AI Gift Message Writer</Link></li>
              <li><Link href="/dashboard" className="hover:text-[var(--primary-accent)] transition-colors">VIP Sovereign Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-widest text-[var(--primary-accent)] font-semibold mb-4 font-mono">Curated Vault</h5>
            <ul className="space-y-2.5 text-xs">
              <li><span className="hover:text-[var(--primary-accent)] cursor-pointer">Fine Horology</span></li>
              <li><span className="hover:text-[var(--primary-accent)] cursor-pointer">Haute Joaillerie</span></li>
              <li><span className="hover:text-[var(--primary-accent)] cursor-pointer">Bespoke Escapes</span></li>
              <li><span className="hover:text-[var(--primary-accent)] cursor-pointer">Rare Vintages & Spirits</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="text-xs uppercase tracking-widest text-[var(--primary-accent)] font-semibold mb-2 font-mono">Private Client Dispatch</h5>
            <p className="text-xs text-[var(--text-muted)]">Subscribe to receive invitation-only drops of rare vintage acquisitions.</p>
            <div className="flex items-center rounded-xl bg-[var(--secondary-accent)] border border-[var(--border-color)] p-1">
              <input
                type="email"
                placeholder="concierge@mayfair.com"
                className="bg-transparent px-3 py-2 text-xs text-[var(--foreground)] placeholder-[var(--text-muted)] focus:outline-none w-full"
              />
              <button className="p-2 rounded-lg bg-gold-400 text-obsidian-950 font-bold hover:bg-gold-300 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-muted)] opacity-80 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} CHARIS Luxury Concierge Inc. All rights reserved. Sovereign precision meets bespoke warmth.</p>
          <div className="flex space-x-6">
            <span className="hover:text-[var(--primary-accent)] cursor-pointer">Privacy Dossier</span>
            <span className="hover:text-[var(--primary-accent)] cursor-pointer">Terms of Curation</span>
            <span className="hover:text-[var(--primary-accent)] cursor-pointer">White-Glove Protocol</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
