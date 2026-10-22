"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, Heart, ShoppingBag, Menu } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  cartCount?: number;
}

export default function Header({ onOpenMobileMenu, cartCount = 2 }: HeaderProps) {
  const { lang, setLang, t, toBnDigits } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const formattedCount = lang === "bn" ? toBnDigits(cartCount) : cartCount.toString();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-line shadow-sm transition-all">
      <div className="max-w-container mx-auto h-[74px] md:h-[84px] px-4 md:px-8 lg:px-14 flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Logo */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label={lang === "bn" ? "মেনু খুলুন" : "Open navigation menu"}
            className="lg:hidden p-2 rounded-full hover:bg-blush-100 text-ink transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          <Link href="/" className="flex items-center" aria-label="ABeauty & Fashion Home">
            <Image
              src="/logo.png"
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
          <Link href="/shop" className="hover:text-rose transition-colors">
            {t.nav.shopAll}
          </Link>
          <Link href="/category/skincare" className="hover:text-rose transition-colors">
            {t.nav.skincare}
          </Link>
          <Link href="/category/makeup" className="hover:text-rose transition-colors">
            {t.nav.makeup}
          </Link>
          <Link href="/category/hair-care" className="hover:text-rose transition-colors">
            {t.nav.hairCare}
          </Link>
          <Link href="/category/beauty-tools" className="hover:text-rose transition-colors">
            {t.nav.beautyTools}
          </Link>
          <Link href="/journal" className="hover:text-rose transition-colors">
            {t.nav.journal}
          </Link>
          <Link
            href="/sale"
            className="text-rose font-bold hover:text-rose-dark transition-colors"
          >
            {t.nav.sale}
          </Link>
        </nav>

        {/* Right: Search, Language Switcher, Account, Wishlist, Cart */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search Pill (Desktop) */}
          <div className="hidden sm:flex items-center gap-2 h-10 w-44 md:w-56 px-3.5 rounded-pill bg-[#F8F1F3] border border-transparent focus-within:border-line-strong transition-all">
            <Search className="w-4 h-4 text-muted shrink-0" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.nav.searchPlaceholder}
              className="bg-transparent border-0 outline-none w-full text-sm text-ink placeholder:text-muted"
            />
          </div>

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

          {/* Wishlist Icon */}
          <Link
            href="/wishlist"
            aria-label={t.nav.wishlist}
            className="p-2 rounded-full hover:bg-blush-100 text-ink transition-colors hidden sm:inline-flex"
          >
            <Heart className="w-5 h-5" />
          </Link>

          {/* Cart Bag Icon with Badge */}
          <Link
            href="/cart"
            aria-label={`${t.nav.bag}, ${formattedCount} items`}
            className="relative p-2 rounded-full hover:bg-blush-100 text-ink transition-colors inline-flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-0.5 min-w-[18px] h-[18px] px-1 rounded-pill bg-rose text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                {formattedCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
