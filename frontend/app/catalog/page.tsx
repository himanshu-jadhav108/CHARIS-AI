'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Crown, Sparkles, Gem } from 'lucide-react';
import { ProductGrid } from '@/features/product/ProductGrid';
import { ProductDetailModal } from '@/features/product/ProductDetailModal';
import { fetchProducts } from '@/services/api';
import { Product } from '@/types';
import { useBookmarkStore } from '@/stores/useBookmarkStore';

function CatalogContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const bookmarkedOnly = searchParams.get('bookmarked') === 'true';

  const { bookmarkedProducts } = useBookmarkStore();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const displayProducts = bookmarkedOnly ? bookmarkedProducts : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Title Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-burgundy-800/80 border border-gold-400/40 text-gold-300 text-xs font-mono uppercase tracking-widest shadow-gold-glow">
          <Gem className="h-4 w-4 text-gold-400" />
          <span>{bookmarkedOnly ? 'Bookmarked Vault Dossier' : 'The 50 Sovereign Items'}</span>
        </div>
        <h1 className="font-serif-luxury text-3xl sm:text-5xl font-bold text-silk-100">
          {bookmarkedOnly ? 'Your Saved Luxury Gifts' : 'The CHARIS Vault Collection'}
        </h1>
        <p className="text-xs sm:text-sm text-silk-300/75 max-w-xl mx-auto leading-relaxed">
          {bookmarkedOnly
            ? 'Access your saved high-end horology, haute joaillerie, and bespoke experiences.'
            : 'Explore our pre-loaded collection of 50 rare, high-emotion luxury pieces spanning fine horology, haute joaillerie, bespoke experiences, and rare vintages.'}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-24 space-y-3">
          <Sparkles className="h-8 w-8 text-gold-400 animate-spin mx-auto" />
          <p className="text-xs font-mono text-gold-300">Accessing Vault Dossiers...</p>
        </div>
      ) : (
        <ProductGrid
          products={displayProducts}
          onOpenProduct={setSelectedProduct}
        />
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center py-24 space-y-3">
        <Sparkles className="h-8 w-8 text-gold-400 animate-spin mx-auto" />
        <p className="text-xs font-mono text-gold-300">Accessing Vault Dossiers...</p>
      </div>
    }>
      <CatalogContent />
    </Suspense>
  );
}
