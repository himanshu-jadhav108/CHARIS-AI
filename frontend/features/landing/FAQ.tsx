'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the CHARIS AI Concierge understand luxury preferences?",
      a: "CHARIS utilizes state-of-the-art hybrid vector embeddings trained on luxury horology, haute joaillerie, rare vintages, and bespoke escapes. It extracts emotional nuance, personality profiles, and milestone contexts dynamically through conversational dialogue."
    },
    {
      q: "Is CHARIS an e-commerce store?",
      a: "No. CHARIS is an invitation-only Sovereign AI Gift Concierge. We do not sell mass inventory. We curate 1-of-1 vaulted luxury items and facilitate white-glove private acquisition through authorized brand directors and private couriers."
    },
    {
      q: "Can CHARIS write custom gift card messages?",
      a: "Yes. Our AI Gift Card Writer can compose or refine gift messages across 6 distinct luxury tones (Romantic, Professional, Family, Friend, Luxury, and Heartfelt) rendered with digital gold calligraphy."
    },
    {
      q: "How are deliveries handled for high-value items?",
      a: "All items exceeding ₹2,50,000 are dispatched via private armored courier service with climate control and security personnel to ensure direct handover to the recipient."
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs font-mono uppercase tracking-widest">
            <HelpCircle className="h-4 w-4" />
            <span>Frequent Inquiries</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-silk-100">
            Everything You Need to Know
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <GlassCard
                key={idx}
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="cursor-pointer border-gold-400/20 p-6 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-base sm:text-lg font-semibold text-silk-100 pr-4">
                    {faq.q}
                  </h3>
                  <ChevronDown
                    className={`h-5 w-5 text-gold-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-silk-300/70 mt-4 leading-relaxed font-light border-t border-gold-400/10 pt-4">
                    {faq.a}
                  </p>
                )}
              </GlassCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
