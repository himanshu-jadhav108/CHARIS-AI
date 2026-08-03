import { create } from 'zustand';
import { Product } from '@/types';

interface BookmarkState {
  bookmarkedProducts: Product[];
  toggleBookmark: (product: Product) => void;
  isBookmarked: (productId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarkedProducts: [],
  toggleBookmark: (product: Product) => {
    const { bookmarkedProducts } = get();
    const exists = bookmarkedProducts.some((p) => p.id === product.id);

    if (exists) {
      set({ bookmarkedProducts: bookmarkedProducts.filter((p) => p.id !== product.id) });
    } else {
      set({ bookmarkedProducts: [...bookmarkedProducts, product] });
    }
  },
  isBookmarked: (productId: string) => {
    return get().bookmarkedProducts.some((p) => p.id === productId);
  }
}));
