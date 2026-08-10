'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Crown, UserPlus, Plus } from 'lucide-react';
import { User } from '@/types';

interface DashboardHeaderProps {
  user: User | null;
  onOpenAddModal: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onOpenAddModal }) => {
  return (
    <div className="glass-panel p-8 sm:p-10 rounded-3xl border-gold-400/40 shadow-luxury flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-r from-burgundy-900/60 via-obsidian-900 to-obsidian-950">
      
      {/* Approved Logo Watermark inside Banner */}
      <div className="absolute -right-10 -bottom-10 opacity-5 h-48 w-48 pointer-events-none">
        <Image src="/logo.png" alt="Watermark" fill className="object-contain" />
      </div>

      <div className="space-y-3 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-burgundy-800 border border-gold-400/40 text-gold-300 text-[10px] font-mono tracking-widest uppercase">
          <Crown className="h-3.5 w-3.5 text-gold-400" />
          <span>{user?.tier || 'Charis VIP Sovereign Member'}</span>
        </div>

        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-silk-100">
          Welcome Back, <span className="gold-text-gradient">{user?.full_name || 'Alexander von Montgomery'}</span>
        </h1>

        <p className="text-xs sm:text-sm text-silk-300/75 max-w-xl font-light">
          Your private luxury client lounge is active. Review your saved gift records, manage recipient profiles, or initiate a new curating consultation below.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto relative z-10">
        <button
          onClick={onOpenAddModal}
          className="px-6 py-3.5 rounded-full bg-obsidian-850 border border-gold-400/30 text-gold-300 text-xs font-mono uppercase tracking-widest hover:bg-burgundy-800/50 transition-colors flex items-center justify-center space-x-2"
        >
          <UserPlus className="h-4 w-4" />
          <span>Add Someone Special</span>
        </button>

        <Link
          href="/consult"
          className="px-8 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-gold-glow"
        >
          <Plus className="h-4 w-4" />
          <span>Begin Consultation</span>
        </Link>
      </div>
    </div>
  );
};
