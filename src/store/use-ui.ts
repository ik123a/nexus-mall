import { create } from "zustand";

type UIState = {
  isCommandOpen: boolean;
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;
  currency: "USD" | "EUR" | "GBP" | "BTC" | "ETH";
  language: "en" | "es" | "fr" | "de" | "ja";
  setCommandOpen: (v: boolean) => void;
  setCartOpen: (v: boolean) => void;
  setMobileMenuOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  setCurrency: (c: UIState["currency"]) => void;
  setLanguage: (l: UIState["language"]) => void;
};

export const useUI = create<UIState>((set) => ({
  isCommandOpen: false,
  isCartOpen: false,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  currency: "USD",
  language: "en",
  setCommandOpen: (v) => set({ isCommandOpen: v }),
  setCartOpen: (v) => set({ isCartOpen: v }),
  setMobileMenuOpen: (v) => set({ isMobileMenuOpen: v }),
  setSearchOpen: (v) => set({ isSearchOpen: v }),
  setCurrency: (c) => set({ currency: c }),
  setLanguage: (l) => set({ language: l }),
}));
