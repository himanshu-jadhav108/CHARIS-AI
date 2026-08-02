import { create } from 'zustand';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    id: 'usr_guest_vip',
    email: 'vip.client@charis.luxury',
    full_name: 'Lord / Lady Alexander',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    tier: 'Charis VIP Sovereign Member',
    access_token: 'active_session_token'
  },
  isAuthenticated: true,
  login: async (email: string) => {
    try {
      const res = await fetch('http://localhost:8000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        const userData: User = await res.json();
        set({ user: userData, isAuthenticated: true });
      }
    } catch (err) {
      // Fallback local login
      const name = email.split('@')[0].replace('.', ' ').toUpperCase();
      set({
        user: {
          id: `usr_${Date.now()}`,
          email,
          full_name: `VIP Client (${name})`,
          tier: 'Charis Sovereign Member',
          avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
        },
        isAuthenticated: true
      });
    }
  },
  logout: () => set({ user: null, isAuthenticated: false }),
}));
