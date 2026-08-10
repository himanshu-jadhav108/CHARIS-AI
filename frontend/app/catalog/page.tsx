import type { Metadata } from 'next';
import { CatalogView } from '@/features/product/CatalogView';

export const metadata: Metadata = {
  title: 'The Luxury Vault Collection | CHARIS',
  description: 'Explore 50 vaulted 1-of-1 luxury gifts spanning fine horology, haute joaillerie, bespoke private escapes, and rare vintages.',
};

export default function CatalogPage() {
  return <CatalogView />;
}
