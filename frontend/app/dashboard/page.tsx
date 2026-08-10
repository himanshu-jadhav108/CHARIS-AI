import type { Metadata } from 'next';
import { DashboardView } from '@/features/dashboard/DashboardView';

export const metadata: Metadata = {
  title: 'VIP Sovereign Client Dashboard | CHARIS',
  description: 'Manage recipient preference dossiers, review saved 1-of-1 vaulted luxury items, and track gifting diary alerts.',
};

export default function DashboardPage() {
  return <DashboardView />;
}
