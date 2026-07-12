import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product } from "@/types";
import { products } from "@/constants/products";

type CartState = {
  items: CartItem[];
  wishlist: string[];
  compare: string[];
  recentlyViewed: string[];
  add: (productId: string, opts?: { color?: string; size?: string }) => void;
  remove: (productId: string, opts?: { color?: string; size?: string }) => void;
  updateQty: (productId: string, qty: number, opts?: { color?: string; size?: string }) => void;
  clear: () => void;
  toggleWishlist: (id: string) => void;
  toggleCompare: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      compare: [],
      recentlyViewed: [],
      add: (productId, opts) =>
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === productId && i.color === opts?.color && i.size === opts?.size,
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
          return {
            items: [...state.items, { productId, quantity: 1, color: opts?.color, size: opts?.size }],
          };
        }),
      remove: (productId, opts) =>
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === opts?.color && i.size === opts?.size),
          ),
        })),
      updateQty: (productId, qty, opts) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter(
                  (i) => !(i.productId === productId && i.color === opts?.color && i.size === opts?.size),
                )
              : state.items.map((i) =>
                  i.productId === productId && i.color === opts?.color && i.size === opts?.size
                    ? { ...i, quantity: qty }
                    : i,
                ),
        })),
      clear: () => set({ items: [] }),
      toggleWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter((x) => x !== id)
            : [id, ...state.wishlist],
        })),
      toggleCompare: (id) =>
        set((state) => ({
          compare: state.compare.includes(id)
            ? state.compare.filter((x) => x !== id)
            : state.compare.length >= 4
              ? state.compare
              : [...state.compare, id],
        })),
      addRecentlyViewed: (id) =>
        set((state) => ({
          recentlyViewed: [id, ...state.recentlyViewed.filter((x) => x !== id)].slice(0, 8),
        })),
    }),
    { name: "nexus-cart" },
  ),
);

// Helper to compute cart totals
export const useCartTotals = () => {
  const items = useCart((s) => s.items);
  return items.reduce(
    (acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return acc;
      acc.subtotal += product.price * item.quantity;
      acc.count += item.quantity;
      return acc;
    },
    { subtotal: 0, count: 0 },
  );
};

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);
