'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Sparkles, Crown, Compass, Bookmark, MessageSquare, User, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useBookmarkStore } from '@/stores/useBookmarkStore';
import { useThemeStore } from '@/stores/useThemeStore';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { bookmarkedProducts } = useBookmarkStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useThemeStore();

  const navLinks = [
    { href: '/catalog', label: 'Luxury Vault', icon: Compass },
    { href: '/consult', label: 'AI Concierge', icon: Sparkles },
    { href: '/messages', label: 'Gift Message Artistry', icon: MessageSquare },
    ...(isAuthenticated ? [{ href: '/dashboard', label: 'Dashboard', icon: Crown }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-[var(--card-bg)] border-b border-[var(--border-color)] text-[var(--foreground)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative h-10 w-10 rounded-full bg-burgundy-800 border border-gold-400/50 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="CHARIS Logo" 
                fill
                sizes="40px"
                className="object-cover z-10" 
              />
              <Crown className="h-5 w-5 text-gold-400 absolute z-20" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-luxury text-2xl font-bold tracking-widest gold-text-gradient">
                CHARIS
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[var(--primary-accent)] opacity-80 uppercase font-mono">
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
                      : 'text-[var(--text-muted)] hover:text-[var(--primary-accent)] hover:bg-[var(--secondary-accent)]'
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
              className="relative p-2.5 rounded-full bg-[var(--secondary-accent)] border border-[var(--border-color)] text-[var(--foreground)] hover:text-[var(--primary-accent)] hover:border-[var(--border-hover)] transition-colors mr-2"
              title="Saved Gifts"
            >
              <Bookmark className="h-4 w-4" />
              {bookmarkedProducts.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gold-400 text-obsidian-950 font-bold text-[10px] flex items-center justify-center">
                  {bookmarkedProducts.length}
                </span>
              )}
            </Link>

            {/* Global Theme Selector */}
            <div className="relative">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                suppressHydrationWarning
                className="bg-[var(--secondary-accent)] text-[var(--primary-accent)] text-[10px] uppercase tracking-wider font-mono border border-[var(--border-color)] rounded-full px-3.5 py-2 focus:outline-none focus:border-[var(--border-hover)] cursor-pointer"
              >
                <option value="Classic-Luxury">Classic</option>
                <option value="Royal-Burgundy">Burgundy</option>
                <option value="Midnight-Black">Midnight</option>
                <option value="Ivory-Gold">Ivory Gold (Light)</option>
                <option value="Elegant-Light">Elegant Light</option>
              </select>
            </div>

            {/* Auth / User Badge */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3 bg-[var(--secondary-accent)] p-1.5 pr-4 rounded-full border border-[var(--border-color)]">
                <Image
                  src={user.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                  alt={user.full_name}
                  width={32}
                  height={32}
                  className="rounded-full object-cover border border-gold-400/40"
                />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-[var(--foreground)] line-clamp-1">{user.full_name}</span>
                  <span className="text-[9px] text-[var(--primary-accent)] tracking-wider uppercase font-mono">{user.tier}</span>
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
              className="p-2.5 rounded-lg text-[var(--foreground)] hover:text-[var(--primary-accent)]"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-[var(--border-color)] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--secondary-accent)] hover:text-[var(--primary-accent)]"
              >
                <Icon className="h-4 w-4 text-[var(--primary-accent)]" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
