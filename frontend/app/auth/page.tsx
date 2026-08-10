import type { Metadata } from 'next';
import { AuthView } from '@/features/auth/AuthView';

export const metadata: Metadata = {
  title: 'VIP Access & Sovereign Sanctuary | CHARIS',
  description: 'Enter your private sovereign portal. Access vaulted gift recommendations, private client records, and AI concierge services.',
};

export default function AuthPage() {
  return <AuthView />;
}
