'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';
import { useAuthStore } from '@/stores/useAuthStore';

interface ThemeRootProps {
  children: React.ReactNode;
}

import { AmbientGlow } from '@/components/layout/AmbientGlow';

export const ThemeRoot: React.FC<ThemeRootProps> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initializeAuth();
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('charis-luxury-theme') as any;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [setTheme, initializeAuth]);

  return (
    <div className={`theme-${theme} min-h-screen flex flex-col justify-between relative bg-[var(--background)] transition-colors duration-500`}>
      <AmbientGlow />
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        {children}
      </div>
    </div>
  );
};
