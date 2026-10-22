"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  Gift,
  Tag,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";

interface CartItem {
  id: number;
  titleEn: string;
  titleBn: string;
  brand: string;
  size: string;
  priceUSD: number;
  priceBDT: number;
  quantity: number;
  tint: string;
}

export default function CartPage() {
  const { lang, formatPrice, toBnDigits } = useLanguage();

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      titleEn: "Radiant Glow Niacinamide 10% + Zinc Serum",
      titleBn: "রেডিয়েন্ট গ্লো নিয়াসিনামাইড ১০% + জিংক সিরাম",
      brand: "GlowRecipe",
      size: "30 ml",
      priceUSD: 28.0,
      priceBDT: 3150,
      quantity: 1,
      tint: "bg-tint-1",
    },
    {
      id: 2,
      titleEn: "Hydra-Barrier Ceramide Moisturiser",
      titleBn: "হাইড্রো-ব্যারিয়ার সিরামাইড ময়েশ্চারাইজার",
      brand: "CeraCare",
      size: "50 ml",
      priceUSD: 24.0,
      priceBDT: 2700,
      quantity: 1,
      tint: "bg-tint-4",
    },
  ]);

  const [giftWrap, setGiftWrap] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // Free shipping thresholds
  const shippingThresholdUSD = 50.0;
  const shippingThresholdBDT = 2000;

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotalUSD = cartItems.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  const subtotalBDT = cartItems.reduce((acc, item) => acc + item.priceBDT * item.quantity, 0);

  const giftWrapFeeUSD = giftWrap ? 3.0 : 0;
  const giftWrapFeeBDT = giftWrap ? 350 : 0;

  const currentThreshold = lang === "bn" ? shippingThresholdBDT : shippingThresholdUSD;
  const currentSubtotal = lang === "bn" ? subtotalBDT : subtotalUSD;
  const isFreeShipping = currentSubtotal >= currentThreshold;
  const progressPercent = Math.min(100, (currentSubtotal / currentThreshold) * 100);
  const remainingForFree = Math.max(0, currentThreshold - currentSubtotal);

  const shippingCostUSD = isFreeShipping || cartItems.length === 0 ? 0 : 5.0;
  const shippingCostBDT = isFreeShipping || cartItems.length === 0 ? 0 : 60;

  const totalUSD = subtotalUSD + giftWrapFeeUSD + shippingCostUSD;
  const totalBDT = subtotalBDT + giftWrapFeeBDT + shippingCostBDT;

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header cartCount={totalItemCount} />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
          <h1
            className={`text-3xl md:text-4xl font-bold text-ink mb-6 ${
              lang === "bn" ? "font-anek" : "font-bricolage"
            }`}
          >
            {lang === "bn" ? "আপনার শপিং ব্যাগ" : "Shopping Bag"}
            <span className="text-muted font-normal text-lg md:text-xl ml-2">
              ({lang === "bn" ? toBnDigits(totalItemCount) : totalItemCount})
            </span>
          </h1>

          {/* Free Shipping Progress Indicator */}
          <div className="mb-8 p-4 md:p-5 rounded-card bg-blush-50 border border-line">
            <div className="flex items-center gap-2 mb-2 text-xs md:text-sm font-semibold text-ink">
              <Truck className="w-4 h-4 text-rose shrink-0" />
              <span>
                {isFreeShipping
                  ? lang === "bn"
                    ? "🎉 অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন!"
                    : "🎉 You have unlocked Free Shipping!"
                  : lang === "bn"
                  ? `ফ্রি ডেলিভারির জন্য আর মাত্র ৳${toBnDigits(remainingForFree.toLocaleString("en-US"))} এর পণ্য যোগ করুন`
                  : `Add $${remainingForFree.toFixed(2)} more to unlock Free Shipping!`}
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-line overflow-hidden">
              <div
                className="h-full bg-rose transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center justify-center bg-blush-50/50 rounded-card p-8 border border-line">
              <Sparkles className="w-12 h-12 text-rose/50 mb-3" />
              <h2 className="font-bricolage text-xl font-bold text-ink mb-2">
                {lang === "bn" ? "আপনার শপিং ব্যাগ খালি" : "Your bag is currently empty"}
              </h2>
              <p className="text-muted text-sm max-w-sm mb-6">
                {lang === "bn"
                  ? "আপনার পছন্দের বিউটি ও স্কিনকেয়ার প্রোডাক্ট দেখতে শপ ব্রাউজ করুন।"
                  : "Explore our curated skincare and beauty collection to find your holy-grail items."}
              </p>
              <Link
                href="/shop"
                className="h-12 px-7 rounded-pill bg-ink text-white font-semibold text-sm hover:bg-rose transition-colors inline-flex items-center gap-2"
              >
                <span>{lang === "bn" ? "শপিং শুরু করুন" : "Start Shopping"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Cart Items List */}
              <div className="lg:col-span-8 flex flex-col gap-4">
                {cartItems.map((item) => {
                  const title = lang === "bn" ? item.titleBn : item.titleEn;

                  return (
                    <div
                      key={item.id}
                      className="p-4 md:p-5 rounded-card bg-white border border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-line-strong"
                    >
                      {/* Image & Details */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-20 h-24 md:w-24 md:h-28 rounded-card ${item.tint} p-2 flex items-center justify-center shrink-0 border border-line`}
                        >
                          <Sparkles className="w-8 h-8 text-rose/50" />
                        </div>

                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-rose">
                            {item.brand}
                          </span>
                          <h3 className="font-bold text-sm md:text-base text-ink line-clamp-1 mt-0.5">
                            {title}
                          </h3>
                          <span className="text-xs text-muted block mt-0.5">
                            {lang === "bn" ? "সাইজ:" : "Size:"} {item.size}
                          </span>
                          <span className="font-bold text-sm text-ink block sm:hidden mt-2">
                            {formatPrice(item.priceUSD, item.priceBDT)}
                          </span>
                        </div>
                      </div>

                      {/* Controls: Stepper, Price & Remove */}
                      <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 pt-3 sm:pt-0 border-t sm:border-0 border-line">
                        {/* Stepper */}
                        <div className="flex items-center h-10 px-2 rounded-pill bg-[#F8F1F3] border border-line">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 hover:text-rose transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-bold text-xs text-ink">
                            {lang === "bn" ? toBnDigits(item.quantity) : item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 hover:text-rose transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Total per Item */}
                        <span className="font-bold text-sm md:text-base text-ink hidden sm:block min-w-[70px] text-right font-bricolage">
                          {formatPrice(item.priceUSD * item.quantity, item.priceBDT * item.quantity)}
                        </span>

                        {/* Remove Icon */}
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label="Remove item"
                          className="p-2 rounded-full hover:bg-blush-100 text-muted hover:text-rose transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Gift Wrap Checkbox */}
                <div className="p-4 rounded-card bg-blush-50/60 border border-line flex items-center justify-between">
                  <label className="flex items-center gap-3 text-xs md:text-sm font-semibold text-ink cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="w-4 h-4 rounded text-rose accent-rose cursor-pointer"
                    />
                    <div className="flex items-center gap-1.5">
                      <Gift className="w-4 h-4 text-rose" />
                      <span>{lang === "bn" ? "গিফট র‍্যাপিং যোগ করুন" : "Add Luxury Gift Wrapping"}</span>
                    </div>
                  </label>
                  <span className="text-xs font-bold text-ink">
                    +{formatPrice(3.0, 350)}
                  </span>
                </div>

                {/* Coupon Input Box */}
                <div className="p-4 rounded-card bg-white border border-line flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Tag className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder={lang === "bn" ? "কুপন কোড (যেমন: GLOW2026)" : "Coupon code (e.g. GLOW2026)"}
                      className="w-full h-11 pl-10 pr-3 rounded-pill bg-[#F8F1F3] border border-transparent text-xs md:text-sm outline-none focus:border-line-strong uppercase font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (couponCode.trim()) setCouponApplied(true);
                    }}
                    className="w-full sm:w-auto h-11 px-6 rounded-pill bg-ink text-white font-semibold text-xs hover:bg-rose transition-colors"
                  >
                    {lang === "bn" ? "কুপন প্রয়োগ করুন" : "Apply Coupon"}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-xs text-success font-semibold px-2">
                    {lang === "bn" ? "✓ কুপন কোড সফলভাবে যোগ করা হয়েছে!" : "✓ Coupon applied successfully!"}
                  </p>
                )}
              </div>

              {/* Right Column: Order Summary Card */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="p-6 rounded-card-lg bg-blush-50 border border-line shadow-card flex flex-col gap-5">
                  <h2
                    className={`text-xl font-bold text-ink ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {lang === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}
                  </h2>

                  <div className="space-y-3 text-xs md:text-sm text-ink pb-4 border-b border-line">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">{lang === "bn" ? "সাবটোটাল" : "Subtotal"}</span>
                      <span className="font-bold">{formatPrice(subtotalUSD, subtotalBDT)}</span>
                    </div>

                    {giftWrap && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted">{lang === "bn" ? "গিফট র‍্যাপিং" : "Gift Wrapping"}</span>
                        <span className="font-bold">{formatPrice(giftWrapFeeUSD, giftWrapFeeBDT)}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-muted">{lang === "bn" ? "ডেলিভারি চার্জ" : "Estimated Shipping"}</span>
                      <span className={`font-bold ${isFreeShipping ? "text-success" : ""}`}>
                        {isFreeShipping
                          ? lang === "bn"
                            ? "ফ্রি"
                            : "FREE"
                          : formatPrice(shippingCostUSD, shippingCostBDT)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-base font-bold text-ink">
                      {lang === "bn" ? "সর্বমোট" : "Estimated Total"}
                    </span>
                    <span className="text-2xl font-bold text-ink font-bricolage">
                      {formatPrice(totalUSD, totalBDT)}
                    </span>
                  </div>

                  {/* Checkout Button */}
                  <Link
                    href="/checkout"
                    className="w-full h-14 rounded-pill bg-ink text-white hover:bg-rose transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-pill"
                  >
                    <span>{lang === "bn" ? "চেকআউট এগিয়ে যান" : "Proceed to Checkout"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Security Highlights */}
                  <div className="pt-3 border-t border-line flex flex-col gap-2 text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose" />
                      <span>{lang === "bn" ? "নিরাপদ ও এনক্রিপ্টেড পেমেন্ট" : "Secure 256-bit encrypted checkout"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-rose" />
                      <span>{lang === "bn" ? "ক্যাশ অন ডেলিভারি সুবিধা" : "Cash on Delivery Available"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
