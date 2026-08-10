'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';

export const OccasionsDiary: React.FC = () => {
  const upcomingOccasions = [
    { name: "Ananya's Royal Tea Curation", daysLeft: 6, target: "Ananya Sharma" },
    { name: "Rajiv's Milestone Jubilee", daysLeft: 18, target: "Rajiv Malhotra" }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Calendar className="h-5 w-5 text-gold-400" />
        <h3 className="font-serif-luxury text-xl font-bold text-silk-100">Upcoming Special Occasions</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {upcomingOccasions.map((occ, idx) => (
          <GlassCard key={idx} className="p-5 border-gold-400/20 flex flex-col justify-between relative overflow-hidden bg-gradient-to-r from-burgundy-950/20 to-transparent">
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-gold-400 bg-burgundy-800/80 px-2 py-0.5 rounded border border-gold-400/30">
                DIARY ALERT
              </span>
              <h4 className="font-serif-luxury text-base font-bold text-silk-100">{occ.name}</h4>
              <p className="text-xs text-silk-300/70">{occ.target} • In {occ.daysLeft} Days</p>
            </div>
            <Link
              href="/consult"
              className="mt-4 text-xs font-mono text-gold-300 flex items-center space-x-1.5 hover:underline"
            >
              <span>Proactively Curate Ideas</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
