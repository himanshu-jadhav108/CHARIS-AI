'use client';

import React, { useEffect } from 'react';
import { useThemeStore } from '@/stores/useThemeStore';

interface ThemeRootProps {
  children: React.ReactNode;
}

export const ThemeRoot: React.FC<ThemeRootProps> = ({ children }) => {
  const { theme, setTheme } = useThemeStore();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('charis-luxury-theme') as any;
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [setTheme]);

  return (
    <div className={`theme-${theme} min-h-screen flex flex-col justify-between`}>
      {children}
    </div>
  );
};
