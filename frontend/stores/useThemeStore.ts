import { create } from 'zustand';

export type LuxuryTheme = 
  | 'Classic-Luxury'
  | 'Royal-Burgundy'
  | 'Midnight-Black'
  | 'Ivory-Gold'
  | 'Elegant-Light';

interface ThemeState {
  theme: LuxuryTheme;
  setTheme: (theme: LuxuryTheme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'Classic-Luxury',
  setTheme: (theme: LuxuryTheme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('charis-luxury-theme', theme);
    }
    set({ theme });
  }
}));
