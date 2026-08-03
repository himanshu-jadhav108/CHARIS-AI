import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  goldGlow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  hoverEffect = true,
  goldGlow = false,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'glass-panel rounded-2xl p-6 transition-all duration-300 relative overflow-hidden',
          hoverEffect && 'glass-panel-hover',
          goldGlow && 'gold-border-glow',
          className
        )
      )}
      {...props}
    >
      {/* Subtle background ambient light */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />
      {children}
    </div>
  );
};
