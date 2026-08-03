import { create } from 'zustand';
import { Product } from '@/types';
import { fetchBookmarksApi, toggleBookmarkApi } from '@/services/api';

interface BookmarkState {
  bookmarkedProducts: Product[];
  fetchBookmarks: (token: string) => Promise<void>;
  toggleBookmark: (product: Product, token: string) => Promise<void>;
  isBookmarked: (productId: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarkedProducts: [],

  fetchBookmarks: async (token: string) => {
    try {
      const data = await fetchBookmarksApi(token);
      set({ bookmarkedProducts: data || [] });
    } catch (err) {
      console.warn("Failed to fetch bookmarks from server, using local list", err);
    }
  },

  toggleBookmark: async (product: Product, token: string) => {
    const { bookmarkedProducts } = get();
    const exists = bookmarkedProducts.some((p) => p.id === product.id);

    // Optimistic UI update
    if (exists) {
      set({ bookmarkedProducts: bookmarkedProducts.filter((p) => p.id !== product.id) });
    } else {
      set({ bookmarkedProducts: [...bookmarkedProducts, product] });
    }

    try {
      await toggleBookmarkApi(product.id, token);
    } catch (err) {
      console.error("Failed to toggle bookmark on server, rolling back", err);
      // Rollback optimistic update
      if (exists) {
        set({ bookmarkedProducts: [...get().bookmarkedProducts, product] });
      } else {
        set({ bookmarkedProducts: get().bookmarkedProducts.filter((p) => p.id !== product.id) });
      }
    }
  },

  isBookmarked: (productId: string) => {
    return get().bookmarkedProducts.some((p) => p.id === productId);
  }
}));
