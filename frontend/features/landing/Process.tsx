'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircleHeart, Cpu, Gift, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { staggerContainer, fadeInVariants } from '@/animations/framer';

export const Process: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Conversational Discovery",
      desc: "No static forms or search filters. Engage in a natural, fluid dialogue with CHARIS as it learns about your recipient's taste, personality, milestone, and emotional significance.",
      icon: MessageCircleHeart,
      tag: "Natural Dialogue"
    },
    {
      num: "02",
      title: "Haute Intelligence Curation",
      desc: "Our hybrid vector recommendation algorithm matches recipient profiles against 50 rare horological masterworks, fine jewelry, private escapes, and vaulted spirits.",
      icon: Cpu,
      tag: "Vector Scoring"
    },
    {
      num: "03",
      title: "Pinnacle Reveal & Artistry",
      desc: "Receive the top 3 bespoke recommendations complete with emotional meaning, custom stories, and AI-generated gold calligraphy gift card messages.",
      icon: Gift,
      tag: "White-Glove Handover"
    }
  ];

  return (
    <section className="py-24 relative bg-[var(--card-bg)] border-t border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center space-x-2 text-[var(--primary-accent)] text-xs font-mono uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" />
            <span>The CHARIS Experience</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-[var(--foreground)]">
            How True Luxury Giving Works
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-base font-light">
            A seamless three-stage journey designed with Mayfair concierge warmth and sovereign artificial intelligence.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div key={idx} variants={fadeInVariants}>
                <GlassCard className="h-full flex flex-col justify-between p-8 border-[var(--border-color)] group">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-3xl font-bold gold-text-gradient">{step.num}</span>
                      <div className="h-12 w-12 rounded-2xl bg-[var(--secondary-accent)] border border-[var(--border-color)] flex items-center justify-center text-[var(--primary-accent)] group-hover:scale-110 transition-transform">
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--primary-accent)] opacity-80 font-mono uppercase tracking-widest">{step.tag}</span>
                      <h3 className="font-serif-luxury text-xl font-semibold text-[var(--foreground)] mt-1 mb-3">{step.title}</h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>
                  <div className="pt-6 mt-6 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] text-[var(--primary-accent)] font-mono">
                    <span>STAGE {idx + 1} OF 3</span>
                    <span className="group-hover:translate-x-1 transition-transform">EXPLORE →</span>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};
