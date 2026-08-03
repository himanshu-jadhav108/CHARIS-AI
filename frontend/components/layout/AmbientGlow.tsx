'use client';

import React from 'react';

export const AmbientGlow: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Glow 1: Top Left - Burgundy */}
      <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-burgundy-950/20 blur-[160px] animate-pulse" style={{ animationDuration: '10s' }} />
      
      {/* Glow 2: Bottom Right - Gold */}
      <div className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-gold-400/10 blur-[140px] animate-pulse" style={{ animationDuration: '14s' }} />
      
      {/* Glow 3: Center Ambient - Burgundy */}
      <div className="absolute top-[35%] left-[25%] w-[40vw] h-[40vw] rounded-full bg-burgundy-900/10 blur-[180px] animate-pulse" style={{ animationDuration: '12s' }} />
    </div>
  );
};
