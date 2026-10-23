"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/lib/data/products";

export interface CartItem {
  id: number;
  slug: string;
  titleEn: string;
  titleBn: string;
  brand: string;
  categoryEn: string;
  categoryBn: string;
  image: string;
  priceUSD: number;
  priceBDT: number;
  quantity: number;
  selectedSize?: string;
  selectedShade?: string;
}

interface CartContextType {
  items: CartItem[];
  itemsCount: number;
  subtotalUSD: number;
  subtotalBDT: number;
  discountUSD: number;
  discountBDT: number;
  couponCode: string;
  appliedCoupon: string | null;
  shippingCity: "dhaka" | "outside";
  shippingCostUSD: number;
  shippingCostBDT: number;
  totalUSD: number;
  totalBDT: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (
    product: Product,
    quantity?: number,
    selectedSize?: string,
    selectedShade?: string
  ) => void;
  removeFromCart: (
    id: number,
    selectedSize?: string,
    selectedShade?: string
  ) => void;
  updateQuantity: (
    id: number,
    quantity: number,
    selectedSize?: string,
    selectedShade?: string
  ) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setShippingCity: (city: "dhaka" | "outside") => void;
  // Wishlist
  wishlistIds: number[];
  toggleWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_CART_KEY = "abf_cart_items_v2";
const LOCAL_STORAGE_WISHLIST_KEY = "abf_wishlist_ids_v2";

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Start with empty state and hydrate on mount to prevent SSR mismatch
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [shippingCity, setShippingCity] = useState<"dhaka" | "outside">("dhaka");
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      } else {
        // Seed initial sample cart with 2 top products for instant user gratification
        setItems([
          {
            id: 11,
            slug: "radiance-c-squalane-serum",
            titleEn: "Radiance C+ Squalane Serum 30ml",
            titleBn: "রেডিয়েন্স সি+ স্কোয়ালেন সিরাম ৩০ মি.লি.",
            brand: "GlowRecipe",
            categoryEn: "Skincare",
            categoryBn: "স্কিনকেয়ার",
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
            priceUSD: 38.0,
            priceBDT: 4500,
            quantity: 1,
            selectedSize: "30ml",
          },
          {
            id: 13,
            slug: "velvet-matte-lip-stain-berry-flush",
            titleEn: "Velvet Matte Lip Stain #04 Berry Flush",
            titleBn: "ভেলভেট ম্যাট লিপ স্টেন #০৪ বেরি ফ্লাশ",
            brand: "LuxeShade",
            categoryEn: "Makeup",
            categoryBn: "মেকআপ",
            image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop",
            priceUSD: 24.0,
            priceBDT: 2800,
            quantity: 1,
            selectedShade: "Berry Flush",
          },
        ]);
      }

      const storedWishlist = localStorage.getItem(LOCAL_STORAGE_WISHLIST_KEY);
      if (storedWishlist) {
        setWishlistIds(JSON.parse(storedWishlist));
      } else {
        setWishlistIds([11, 16]);
      }
    } catch {
      // Storage unavailable fallback
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync cart to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items, isHydrated]);

  // Sync wishlist to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch {
      // Ignore
    }
  }, [wishlistIds, isHydrated]);

  const itemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalUSD = items.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);
  const subtotalBDT = items.reduce((sum, item) => sum + item.priceBDT * item.quantity, 0);

  // Discount calculation (GLOW10 gives 10% discount)
  let discountUSD = 0;
  let discountBDT = 0;
  if (appliedCoupon === "GLOW10") {
    discountUSD = Math.round(subtotalUSD * 0.1 * 100) / 100;
    discountBDT = Math.round(subtotalBDT * 0.1);
  }

  // Shipping calculation
  // Dhaka: $0.75 (৳80), Free over $50 (৳6000)
  // Outside: $1.20 (৳130), Free over $80 (৳9500)
  let shippingCostUSD = 0;
  let shippingCostBDT = 0;
  if (items.length > 0) {
    if (shippingCity === "dhaka") {
      if (subtotalUSD < 50) {
        shippingCostUSD = 0.75;
        shippingCostBDT = 80;
      }
    } else {
      if (subtotalUSD < 80) {
        shippingCostUSD = 1.2;
        shippingCostBDT = 130;
      }
    }
  }

  const totalUSD = Math.max(0, subtotalUSD - discountUSD + shippingCostUSD);
  const totalBDT = Math.max(0, subtotalBDT - discountBDT + shippingCostBDT);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string,
    selectedShade?: string
  ) => {
    setItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) =>
          it.id === product.id &&
          it.selectedSize === selectedSize &&
          it.selectedShade === selectedShade
      );

      const mainImage = product.images[0]?.src || "";

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }

      return [
        ...prev,
        {
          id: product.id,
          slug: product.slug,
          titleEn: product.titleEn,
          titleBn: product.titleBn,
          brand: product.brand,
          categoryEn: product.categoryEn,
          categoryBn: product.categoryBn,
          image: mainImage,
          priceUSD: product.priceUSD,
          priceBDT: product.priceBDT,
          quantity,
          selectedSize,
          selectedShade,
        },
      ];
    });

    // Auto open slide-over sheet when added
    setIsCartOpen(true);
  };

  const removeFromCart = (
    id: number,
    selectedSize?: string,
    selectedShade?: string
  ) => {
    setItems((prev) =>
      prev.filter(
        (it) =>
          !(
            it.id === id &&
            it.selectedSize === selectedSize &&
            it.selectedShade === selectedShade
          )
      )
    );
  };

  const updateQuantity = (
    id: number,
    quantity: number,
    selectedSize?: string,
    selectedShade?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, selectedSize, selectedShade);
      return;
    }
    setItems((prev) =>
      prev.map((it) => {
        if (
          it.id === id &&
          it.selectedSize === selectedSize &&
          it.selectedShade === selectedShade
        ) {
          return { ...it, quantity };
        }
        return it;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === "GLOW10" || clean === "ABF10") {
      setAppliedCoupon("GLOW10");
      setCouponCode(clean);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const toggleWishlist = (id: number) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isInWishlist = (id: number) => wishlistIds.includes(id);

  return (
    <CartContext.Provider
      value={{
        items,
        itemsCount,
        subtotalUSD,
        subtotalBDT,
        discountUSD,
        discountBDT,
        couponCode,
        appliedCoupon,
        shippingCity,
        shippingCostUSD,
        shippingCostBDT,
        totalUSD,
        totalBDT,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        setShippingCity,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
