"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const STORAGE_KEY = "artbyurska.cart.v1";

type Listener = () => void;
let listeners: Listener[] = [];
let cached: string[] | undefined;
const EMPTY: string[] = [];

function readFromStorage(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function getSnapshot(): string[] {
  if (cached === undefined) cached = readFromStorage();
  return cached;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function subscribe(listener: Listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function setSlugs(next: string[]) {
  cached = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

interface CartContextValue {
  slugs: string[];
  add: (slug: string) => void;
  remove: (slug: string) => void;
  has: (slug: string) => boolean;
  clear: () => void;
  count: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const slugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const value = useMemo<CartContextValue>(
    () => ({
      slugs,
      add: (slug) => {
        if (!slugs.includes(slug)) setSlugs([...slugs, slug]);
      },
      remove: (slug) => setSlugs(slugs.filter((s) => s !== slug)),
      has: (slug) => slugs.includes(slug),
      clear: () => setSlugs([]),
      count: slugs.length,
    }),
    [slugs]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
