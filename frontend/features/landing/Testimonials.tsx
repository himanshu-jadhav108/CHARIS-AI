'use client';

import React from 'react';
import { Star, Crown } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: "Lord Harrison V.",
      title: "Sovereign Collector",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      quote: "CHARIS understood my wife's fascination with celestial horology within four sentences. The Vacheron perpetual calendar presented was nothing short of miraculous.",
      location: "Mayfair, London"
    },
    {
      name: "Lady Elizabeth Chen",
      title: "Patron of Haute Joaillerie",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      quote: "The private Louvre after-hours experience CHARIS recommended for our 20th anniversary brought my husband to tears. Apple-level execution with real warmth.",
      location: "Paris / Geneva"
    },
    {
      name: "Alexander von Berg",
      title: "Executive Chairman",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
      quote: "The AI Gift Card writer crafted a gold-lettered note that sounded as though it were penned by a 19th-century royal poet. Unbelievable precision.",
      location: "Zurich"
    }
  ];

  return (
    <section className="py-24 relative bg-[var(--background)] border-t border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[var(--primary-accent)] text-xs font-mono uppercase tracking-widest">
            <Crown className="h-4 w-4" />
            <span>Client Testimonials</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[var(--foreground)]">
            Voices of Discerning Patrons
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, idx) => (
            <GlassCard key={idx} className="flex flex-col justify-between p-8 border-[var(--border-color)]">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-[var(--primary-accent)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[var(--primary-accent)] text-[var(--primary-accent)]" />
                  ))}
                </div>
                <p className="text-xs text-[var(--foreground)] leading-relaxed italic font-serif-luxury opacity-90">
                  &quot;{r.quote}&quot;
                </p>
              </div>

              <div className="flex items-center space-x-4 pt-6 border-t border-[var(--border-color)] mt-6">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="h-10 w-10 rounded-full object-cover border border-[var(--border-color)]"
                />
                <div>
                  <h4 className="font-serif-luxury text-sm font-semibold text-[var(--foreground)]">{r.name}</h4>
                  <span className="text-[10px] text-[var(--primary-accent)] opacity-85 font-mono uppercase tracking-wider block">{r.title} • {r.location}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
};
