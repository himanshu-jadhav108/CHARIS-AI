'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Crown, Mail, Lock, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/common/GlassCard';
import { useAuthStore } from '@/stores/useAuthStore';

export const AuthView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotOpen, setForgotOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const router = useRouter();

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    router.push('/dashboard');
  };

  const handleGoogleMock = async () => {
    setIsLoading(true);
    await login('lord.harrison@mayfair.co.uk');
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16 relative overflow-hidden bg-gradient-to-b from-burgundy-950/20 via-obsidian-950 to-obsidian-950">
      
      {/* Background radial spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-burgundy-700/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="h-14 w-14 rounded-full bg-burgundy-800 border border-gold-400/50 flex items-center justify-center mx-auto text-gold-400 shadow-gold-glow">
            <Crown className="h-7 w-7" />
          </div>
          <h1 className="font-serif-luxury text-3xl sm:text-4xl font-bold gold-text-gradient">
            CHARIS VIP Access
          </h1>
          
          {/* Gifting Quote */}
          <p className="text-xs text-gold-300/80 italic font-serif-luxury max-w-xs mx-auto">
            &quot;The most memorable gifts are chosen with understanding, not impulse.&quot;
          </p>
        </div>

        <GlassCard className="p-8 space-y-5 border-gold-400/30">
          
          {/* Direct Input Form */}
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="font-mono text-[10px] uppercase text-gold-400 tracking-widest block mb-1">
                VIP Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alexander@mayfair.co.uk"
                  required
                  className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 pl-10 pr-4 py-3 text-xs text-silk-100 placeholder-silk-300/40 focus:outline-none focus:border-gold-400/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-mono text-[10px] uppercase text-gold-400 tracking-widest block">
                  Security Passkey
                </label>
                <button
                  type="button"
                  onClick={() => setForgotOpen(true)}
                  className="text-[9px] font-mono text-gold-300/70 hover:underline uppercase"
                >
                  Forgot Passkey?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gold-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full bg-obsidian-850 rounded-xl border border-gold-400/20 pl-10 pr-4 py-3 text-xs text-silk-100 placeholder-silk-300/40 focus:outline-none focus:border-gold-400/50"
                />
              </div>
            </div>

            {/* Extra Options Row */}
            <div className="flex items-center justify-between text-[11px] text-silk-300/60 font-mono">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-gold-400"
                />
                <span>Remember Credentials</span>
              </label>

              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gold-300 font-semibold hover:underline"
              >
                {isSignUp ? "Already a VIP? Sign In" : "Request Invitation"}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity flex items-center justify-center space-x-2 shadow-gold-glow"
            >
              <span>{isSignUp ? 'Request VIP Dossier' : 'Enter Sovereign Sanctuary'}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center space-x-3 text-xs text-silk-300/40 my-3">
            <div className="h-px bg-gold-400/20 flex-1" />
            <span className="font-mono uppercase text-[9px]">Or Secure Identity Provider</span>
            <div className="h-px bg-gold-400/20 flex-1" />
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleMock}
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-obsidian-850 border border-gold-400/30 text-silk-100 font-semibold text-xs uppercase tracking-wider hover:bg-burgundy-800/60 hover:border-gold-400/60 transition-all flex items-center justify-center space-x-3"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12s.7 2.3 1.9 4.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Sign In with Google</span>
          </button>

          <div className="pt-2 text-center text-[10px] font-mono text-silk-300/50 flex items-center justify-center space-x-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
            <span>256-Bit Encrypted Sovereign Vault</span>
          </div>

        </GlassCard>

      </div>

      {/* Forgot Passkey Modal Popup */}
      {forgotOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/80 backdrop-blur-md">
          <GlassCard className="max-w-sm w-full p-6 border-gold-400/40 space-y-4">
            <div className="text-center space-y-2">
              <Sparkles className="h-6 w-6 text-gold-400 mx-auto" />
              <h3 className="font-serif-luxury text-lg font-bold text-silk-100">Passkey Recovery</h3>
              <p className="text-xs text-silk-300/70">
                A verification link will be dispatched to your registered email to establish a new passkey.
              </p>
            </div>
            <button
              onClick={() => setForgotOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gold-gradient text-obsidian-950 font-mono text-xs uppercase hover:opacity-95"
            >
              Request Dispatch
            </button>
          </GlassCard>
        </div>
      )}

    </div>
  );
};
