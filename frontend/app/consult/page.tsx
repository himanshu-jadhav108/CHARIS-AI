import type { Metadata } from 'next';
import { ConsultView } from '@/features/chat/ConsultView';

export const metadata: Metadata = {
  title: 'AI Sovereign Concierge Consultation | CHARIS',
  description: 'Engage in natural, fluid conversation with CHARIS AI to discover 1-of-1 vaulted gift curations tailored to emotional significance.',
};

export default function ConsultPage() {
  return <ConsultView />;
}
