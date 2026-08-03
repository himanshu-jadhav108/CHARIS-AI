'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Crown, Compass, Bookmark, MessageSquare, User, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useBookmarkStore } from '@/stores/useBookmarkStore';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { bookmarkedProducts } = useBookmarkStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/consult', label: 'AI Concierge', icon: Sparkles },
    { href: '/dashboard', label: 'Dashboard', icon: Crown },
    { href: '/catalog', label: 'Luxury Vault', icon: Compass },
    { href: '/messages', label: 'Gift Message Artistry', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-obsidian-950/75 border-b border-gold-400/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 rounded-full bg-burgundy-800 border border-gold-400/50 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <img 
                src="/logo.png" 
                alt="CHARIS Logo" 
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                className="h-full w-full object-cover z-10" 
              />
              <Crown className="h-5 w-5 text-gold-400 absolute" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl font-bold tracking-widest gold-text-gradient">
                CHARIS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-gold-300/70 uppercase">
                Luxury AI Concierge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-burgundy-700/60 text-gold-300 border border-gold-400/40 shadow-gold-glow'
                      : 'text-silk-300/70 hover:text-gold-300 hover:bg-obsidian-800/60'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Bookmarks Counter */}
            <Link
              href="/catalog?bookmarked=true"
              className="relative p-2.5 rounded-full bg-obsidian-850 border border-gold-400/20 text-silk-300/80 hover:text-gold-300 hover:border-gold-400/40 transition-colors"
              title="Saved Gifts"
            >
              <Bookmark className="h-4 w-4" />
              {bookmarkedProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold-400 text-obsidian-950 font-bold text-[10px] flex items-center justify-center">
                  {bookmarkedProducts.length}
                </span>
              )}
            </Link>

            {/* Auth / User Badge */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3 bg-obsidian-850/80 p-1.5 pr-4 rounded-full border border-gold-400/30">
                <img
                  src={user.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={user.full_name}
                  className="h-8 w-8 rounded-full object-cover border border-gold-400/40"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-silk-100 line-clamp-1">{user.full_name}</span>
                  <span className="text-[9px] text-gold-400/90 tracking-wider uppercase font-mono">{user.tier}</span>
                </div>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-5 py-2.5 rounded-full bg-gold-gradient text-obsidian-950 font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-gold-glow"
              >
                VIP Access
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-silk-300 hover:text-gold-400"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-gold-400/20 px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-silk-200 hover:bg-burgundy-800/50 hover:text-gold-300"
              >
                <Icon className="h-4 w-4 text-gold-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
