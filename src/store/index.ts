"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, color?: string, size?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getSubtotal: (products: Product[]) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.color === item.color &&
              i.size === item.size
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === color && i.size === size)
          ),
        })),
      updateQuantity: (productId, quantity, color, size) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.color === color && i.size === size
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      getSubtotal: (products) => {
        return get().items.reduce((sum, item) => {
          const product = products.find((p) => p.id === item.productId);
          return sum + (product?.price || 0) * item.quantity;
        }, 0);
      },
    }),
    { name: "nexus-cart" }
  )
);

interface WishlistState {
  items: string[];
  toggle: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) =>
        set((state) => ({
          items: state.items.includes(productId)
            ? state.items.filter((id) => id !== productId)
            : [...state.items, productId],
        })),
      isInWishlist: (productId) => get().items.includes(productId),
    }),
    { name: "nexus-wishlist" }
  )
);

interface CompareState {
  items: string[];
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useCompareStore = create<CompareState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (productId) =>
        set((state) =>
          state.items.length < 4 && !state.items.includes(productId)
            ? { items: [...state.items, productId] }
            : state
        ),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((id) => id !== productId) })),
      clear: () => set({ items: [] }),
      isInCompare: (productId) => get().items.includes(productId),
    }),
    { name: "nexus-compare" }
  )
);

interface UIState {
  isSearchOpen: boolean;
  isCartOpen: boolean;
  isMall3DOpen: boolean;
  currentFloor: number;
  theme: "dark" | "light";
  toggleSearch: () => void;
  toggleCart: () => void;
  toggleMall3D: () => void;
  setFloor: (floor: number) => void;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isCartOpen: false,
  isMall3DOpen: false,
  currentFloor: 0,
  theme: "dark",
  toggleSearch: () => set((s) => ({ isSearchOpen: !s.isSearchOpen })),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  toggleMall3D: () => set((s) => ({ isMall3DOpen: !s.isMall3DOpen })),
  setFloor: (floor) => set({ currentFloor: floor }),
  toggleTheme: () => set((s) => ({ theme: s.theme === "dark" ? "light" : "dark" })),
}));