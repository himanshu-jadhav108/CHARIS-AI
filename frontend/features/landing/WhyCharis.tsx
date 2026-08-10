import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, ShieldAlert, Sparkles, Award, Gem, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const WhyCharis: React.FC = () => {
  const comparisons = [
    {
      feature: "Gifting Approach",
      traditional: "Generic e-commerce category search filters & forms",
      charis: "Warm, empathetic natural conversation with AI Concierge"
    },
    {
      feature: "Selection Depth",
      traditional: "Mass-market products with affiliate links",
      charis: "50 Vaulted items: Horology, High Jewelry, Escapes & Vintages"
    },
    {
      feature: "Emotional Curation",
      traditional: "Algorithmic popularity & inventory clearance push",
      charis: "Bespoke match score based on desired emotional impact"
    },
    {
      feature: "Presentation",
      traditional: "Standard cardboard shipping box",
      charis: "White-glove armored courier + AI Gold Calligraphy Card"
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          
          {/* Sovereign VIP Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[var(--secondary-accent)] border border-[var(--border-color)] text-[var(--primary-accent)] text-xs font-mono tracking-widest uppercase mb-4 shadow-gold-glow">
            <Sparkles className="h-3.5 w-3.5 text-[var(--primary-accent)]" />
            <span>Sovereign Luxury AI Gift Concierge</span>
            <span className="h-1 w-1 rounded-full bg-[var(--primary-accent)]" />
            <span className="text-[var(--text-muted)]">Invite Only</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[var(--foreground)]">
            Why Discerning Clients Choose CHARIS
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base font-light">
            We rejected the transactional noise of e-commerce to build a sovereign sanctuary for gifting.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border-[var(--border-color)] shadow-luxury">
          <div className="grid grid-cols-3 gap-4 pb-6 border-b border-[var(--border-color)] font-serif-luxury text-sm sm:text-base font-bold">
            <div className="text-[var(--text-muted)]">Dimension</div>
            <div className="text-red-400/80 flex items-center space-x-1.5">
              <ShieldAlert className="h-4 w-4" />
              <span>Standard E-Commerce</span>
            </div>
            <div className="gold-text-gradient flex items-center space-x-1.5">
              <Sparkles className="h-4 w-4 text-[var(--primary-accent)]" />
              <span>CHARIS Concierge</span>
            </div>
          </div>

          <div className="divide-y divide-[var(--border-color)]">
            {comparisons.map((row, idx) => (
              <div key={idx} className="grid grid-cols-3 gap-4 py-5 text-xs sm:text-sm items-center">
                <div className="font-medium text-[var(--foreground)]">{row.feature}</div>
                <div className="text-[var(--text-muted)] opacity-70 flex items-start space-x-2">
                  <X className="h-4 w-4 text-red-400/70 shrink-0 mt-0.5" />
                  <span>{row.traditional}</span>
                </div>
                <div className="text-[var(--foreground)] flex items-start space-x-2 font-medium">
                  <Check className="h-4 w-4 text-[var(--primary-accent)] shrink-0 mt-0.5" />
                  <span>{row.charis}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Catalog Vault CTA */}
          <div className="pt-8 mt-6 border-t border-[var(--border-color)] flex justify-center">
            <Link
              href="/catalog"
              className="px-8 py-3.5 rounded-full bg-[var(--secondary-accent)] border border-[var(--border-color)] text-[var(--foreground)] font-semibold text-xs uppercase tracking-widest hover:text-[var(--primary-accent)] hover:border-[var(--border-hover)] transition-all duration-300 flex items-center space-x-2"
            >
              <Gem className="h-4 w-4 text-[var(--primary-accent)]" />
              <span>Explore 50 Sovereign Items in Vault</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1 text-[var(--primary-accent)]" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};
