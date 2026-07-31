import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'CHARIS | Sovereign AI Luxury Gift Concierge',
  description: 'Discover extraordinary 1-of-1 luxury gifts through natural conversation. Combining Mayfair concierge warmth with artificial intelligence.',
  keywords: ['Luxury Gifts', 'AI Concierge', 'Fine Horology', 'High Jewelry', 'Bespoke Escapes', 'Rare Spirits'],
};

import { ThemeRoot } from '@/components/layout/ThemeRoot';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-gold-400 selection:text-obsidian-950">
        <ThemeRoot>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeRoot>
      </body>
    </html>
  );
}
