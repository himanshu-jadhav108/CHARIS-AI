import { create } from 'zustand';
import { ChatMessage, PreferencesState, CuratedExperience } from '@/types';
import { useAuthStore } from '@/stores/useAuthStore';

interface ConsultState {
  consultationId: string | null;
  messages: ChatMessage[];
  preferences: PreferencesState;
  quickReplies: string[];
  isComplete: boolean;
  recommendations: CuratedExperience[] | null;
  isLoading: boolean;
  
  sendMessage: (text: string) => Promise<void>;
  resetConsultation: () => void;
  setSession: (id: string, messages: ChatMessage[], prefs: PreferencesState, recs: CuratedExperience[] | null) => void;
}

const INITIAL_WELCOME: ChatMessage = {
  id: 'msg_init',
  sender: 'concierge',
  text: "Welcome to CHARIS. I am your private AI Sovereign Concierge. It is an absolute privilege to assist you today in curating a sublime 360° gift experience and Memory Box for someone truly exceptional.\n\nTo begin our journey, who is this extraordinary gift for?",
  timestamp: 'Just now'
};

const INITIAL_QUICK_REPLIES = [
  "My Wife / Partner",
  "My Husband / Partner",
  "My Mother",
  "My Father",
  "Key Business Leader / Executive",
  "Self-Reward"
];

export const useConsultStore = create<ConsultState>((set, get) => ({
  consultationId: null,
  messages: [INITIAL_WELCOME],
  preferences: {},
  quickReplies: INITIAL_QUICK_REPLIES,
  isComplete: false,
  recommendations: null,
  isLoading: false,

  sendMessage: async (text: string) => {
    const { messages, consultationId, preferences } = get();

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    set({
      messages: [...messages, userMsg],
      isLoading: true,
      quickReplies: []
    });

    try {
      const user = useAuthStore.getState().user;
      const token = user?.access_token || 'active_session_token';
      const userId = user?.id || 'guest_vip';
      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';
      if (process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_API_BASE_URL) {
        console.error('[CHARIS CONFIG ERROR] NEXT_PUBLIC_API_BASE_URL is missing in production environment.');
      }

      const res = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          consultation_id: consultationId,
          user_id: userId,
          message: text
        })
      });

      if (res.ok) {
        const data = await res.json();
        
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'concierge',
          text: data.ai_message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        set({
          consultationId: data.consultation_id,
          messages: [...get().messages, aiMsg],
          preferences: data.preferences,
          isComplete: data.is_complete,
          quickReplies: data.suggested_quick_replies || [],
          recommendations: data.recommendations || null,
          isLoading: false
        });
      } else {
        throw new Error('API server returned error');
      }
    } catch (err) {
      console.warn("Using offline agent simulation for consultation");
      setTimeout(() => {
        const aiMsg: ChatMessage = {
          id: `ai_${Date.now()}`,
          sender: 'concierge',
          text: `Splendid preference. I have updated your emotional profile. What investment budget tier in Indian Rupees (₹) do you have in mind for this bespoke curation?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        set({
          messages: [...get().messages, aiMsg],
          preferences: { ...preferences, recipient: text },
          quickReplies: ["₹75,000 - ₹2,50,000", "₹2,50,000 - ₹10,00,000", "₹10,00,000 - ₹50,00,000"],
          isLoading: false
        });
      }, 1000);
    }
  },

  resetConsultation: () => {
    set({
      consultationId: null,
      messages: [INITIAL_WELCOME],
      preferences: {},
      quickReplies: INITIAL_QUICK_REPLIES,
      isComplete: false,
      recommendations: null,
      isLoading: false
    });
  },

  setSession: (id, messages, prefs, recs) => {
    set({
      consultationId: id,
      messages,
      preferences: prefs,
      isComplete: !!recs,
      recommendations: recs
    });
  }
}));
