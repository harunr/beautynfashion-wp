"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, Heart, ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { useStoreSettings } from "@/lib/wordpress/context";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  cartCount?: number;
}

export default function Header({ onOpenMobileMenu, cartCount }: HeaderProps) {
  const router = useRouter();
  const { lang, setLang, t, toBnDigits } = useLanguage();
  const { itemsCount, openCart, wishlistIds } = useCart();
  const settings = useStoreSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = settings.primary_menu && settings.primary_menu.length > 0
    ? settings.primary_menu
    : [
        { id: 1, title: "Shop All", url: "/shop" },
        { id: 2, title: "Skincare", url: "/category/skincare" },
        { id: 3, title: "Makeup", url: "/category/makeup" },
        { id: 4, title: "Hair Care", url: "/category/hair-care" },
        { id: 5, title: "Beauty Tools", url: "/category/beauty-tools" },
        { id: 6, title: "Journal", url: "/journal" },
        { id: 7, title: "Sale", url: "/sale" },
      ];

  const getMenuTitle = (item: { title: string; url: string }) => {
    if (lang === "bn") {
      const lower = item.title.toLowerCase();
      if (lower.includes("shop")) return t.nav.shopAll;
      if (lower.includes("skin")) return t.nav.skincare;
      if (lower.includes("make")) return t.nav.makeup;
      if (lower.includes("hair")) return t.nav.hairCare;
      if (lower.includes("tool")) return t.nav.beautyTools;
      if (lower.includes("journal")) return t.nav.journal;
      if (lower.includes("sale")) return t.nav.sale;
    }
    return item.title;
  };

  const searchPlaceholder =
    lang === "bn"
      ? settings.header_search_placeholder_bn || t.nav.searchPlaceholder
      : settings.header_search_placeholder_en || t.nav.searchPlaceholder;

  // Use dynamic cart count from CartContext or fallback to prop
  const effectiveCount = cartCount !== undefined ? cartCount : itemsCount;
  const formattedCount = lang === "bn" ? toBnDigits(effectiveCount) : effectiveCount.toString();
  const wishlistCount = wishlistIds.length;
  const formattedWishlist = lang === "bn" ? toBnDigits(wishlistCount) : wishlistCount.toString();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-line shadow-sm transition-all">
        <div className="max-w-container mx-auto h-[74px] md:h-[84px] px-4 md:px-8 lg:px-14 flex items-center justify-between gap-4">
          {/* Left: Mobile menu toggle + Logo */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (onOpenMobileMenu) {
                  onOpenMobileMenu();
                } else {
                  setMobileMenuOpen(true);
                }
              }}
              aria-label={lang === "bn" ? "মেনু খুলুন" : "Open navigation menu"}
              className="lg:hidden p-2 rounded-full hover:bg-blush-100 text-ink transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/" className="flex items-center" aria-label="ABeauty & Fashion Home">
              <Image
                src={settings.header_logo_url || "/logo.png"}
                alt="ABeauty & Fashion"
                width={160}
                height={44}
                priority
                className="h-9 md:h-11 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav
            aria-label={lang === "bn" ? "প্রধান মেনু" : "Main Navigation"}
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-[15px] font-medium"
          >
            {menuItems.map((item) => {
              const isSale = item.url.includes("sale");
              return (
                <Link
                  key={item.id || item.url}
                  href={item.url}
                  className={
                    isSale
                      ? "text-rose font-bold hover:text-rose-dark transition-colors"
                      : "hover:text-rose transition-colors"
                  }
                >
                  {getMenuTitle(item)}
                </Link>
              );
            })}
          </nav>

          {/* Right: Search, Language Switcher, Account, Wishlist, Cart */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Pill (Desktop Form) */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden sm:flex items-center gap-2 h-10 w-44 md:w-56 px-3.5 rounded-pill bg-[#F8F1F3] border border-transparent focus-within:border-line-strong transition-all"
            >
              <Search className="w-4 h-4 text-muted shrink-0" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className="bg-transparent border-0 outline-none w-full text-sm text-ink placeholder:text-muted"
              />
            </form>

            {/* Bilingual Switcher (Persistent Segmented Pill) */}
            <div
              role="group"
              aria-label="Language selector"
              className="inline-flex bg-[#F8F1F3] p-1 rounded-pill border border-[#EADBE0]/60 mx-1"
            >
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-current={lang === "en" ? "true" : undefined}
                className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-pill text-xs sm:text-[13px] font-bold transition-all ${
                  lang === "en"
                    ? "bg-ink text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("bn")}
                aria-current={lang === "bn" ? "true" : undefined}
                lang="bn"
                className={`h-7 sm:h-8 px-2.5 sm:px-3 rounded-pill text-xs sm:text-[13px] font-bold transition-all ${
                  lang === "bn"
                    ? "bg-ink text-white shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                বাং
              </button>
            </div>

            {/* Account Icon */}
            <Link
              href="/account"
              aria-label={t.nav.account}
              className="p-2 rounded-full hover:bg-blush-100 text-ink transition-colors hidden sm:inline-flex"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist Icon with Counter */}
            <Link
              href="/wishlist"
              aria-label={t.nav.wishlist}
              className="relative p-2 rounded-full hover:bg-blush-100 text-ink transition-colors inline-flex"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[17px] h-[17px] px-1 rounded-pill bg-rose text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {formattedWishlist}
                </span>
              )}
            </Link>

            {/* Cart Bag Button (Opens Slide-Over Sheet) */}
            <button
              type="button"
              onClick={openCart}
              aria-label={`${t.nav.bag}, ${formattedCount} items`}
              className="relative p-2 rounded-full hover:bg-blush-100 text-ink transition-colors inline-flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {effectiveCount > 0 && (
                <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 rounded-pill bg-rose text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {formattedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            {/* Mobile Header */}
            <div className="p-4 border-b border-line flex items-center justify-between bg-blush-50">
              <Image
                src={settings.header_logo_url || "/logo.png"}
                alt="ABeauty & Fashion"
                width={140}
                height={38}
                className="h-8 w-auto object-contain"
              />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-line"
              >
                <X className="w-4 h-4 text-ink" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-line">
              <form
                onSubmit={(e) => {
                  handleSearchSubmit(e);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 h-11 px-3.5 rounded-pill bg-[#F8F1F3] border border-line"
              >
                <Search className="w-4 h-4 text-muted shrink-0" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="bg-transparent border-0 outline-none w-full text-sm text-ink placeholder:text-muted"
                />
              </form>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-1">
              {menuItems.map((item) => {
                const isSale = item.url.includes("sale");
                return (
                  <Link
                    key={item.id || item.url}
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      isSale
                        ? "flex items-center justify-between p-3 rounded-card bg-rose/10 text-rose font-bold"
                        : "flex items-center justify-between p-3 rounded-card hover:bg-blush-50 font-semibold text-ink"
                    }
                  >
                    <span>{getMenuTitle(item)}</span>
                    {isSale ? (
                      <span className="text-xs bg-rose text-white px-2 py-0.5 rounded-pill">
                        {lang === "bn" ? "৪০% ছাড়" : "40% OFF"}
                      </span>
                    ) : (
                      <ArrowRight className="w-4 h-4 text-muted" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer with Hotline */}
            <div className="p-4 border-t border-line bg-blush-50/50 flex flex-col gap-3">
              {settings.header_hotline && (
                <div className="flex items-center justify-between text-xs text-muted pb-2 border-b border-line/60">
                  <span>{lang === "bn" ? "হটলাইন:" : "Hotline:"}</span>
                  <a
                    href={`tel:${settings.header_hotline.replace(/\s+/g, "")}`}
                    className="font-bold text-rose hover:underline"
                  >
                    {settings.header_hotline}
                  </a>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-rose p-2 rounded-lg bg-white border border-line/60"
                >
                  <Heart className="w-4 h-4 text-rose" />
                  <span>{t.nav.wishlist}</span>
                  {wishlistCount > 0 && (
                    <span className="ml-auto text-xs bg-rose text-white px-1.5 py-0.2 rounded-full font-bold">
                      {formattedWishlist}
                    </span>
                  )}
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-semibold text-ink hover:text-rose p-2 rounded-lg bg-white border border-line/60"
                >
                  <User className="w-4 h-4 text-muted" />
                  <span>{t.nav.account}</span>
                </Link>
              </div>
              <p className="text-[11px] text-muted">
                {lang === "bn"
                  ? "১০০% খাঁটি পণ্য ও দ্রুত ডেলিভারি গ্যারান্টি"
                  : "100% Authentic Luxury Beauty Guarantee"}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
