"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Check,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";

export default function CartPage() {
  const { lang, formatPrice, toBnDigits } = useLanguage();
  const {
    items,
    itemsCount,
    subtotalUSD,
    subtotalBDT,
    discountUSD,
    discountBDT,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    shippingCity,
    shippingCostUSD,
    shippingCostBDT,
    setShippingCity,
    totalUSD,
    totalBDT,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState("");
  const [couponError, setCouponError] = useState("");

  const freeShippingThresholdUSD = 50.0;
  const amountNeededUSD = Math.max(0, freeShippingThresholdUSD - subtotalUSD);
  const progressPercent = Math.min(100, Math.round((subtotalUSD / freeShippingThresholdUSD) * 100));

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const ok = applyCoupon(inputCoupon);
    if (!ok) {
      setCouponError(
        lang === "bn"
          ? "অকার্যকর কুপন কোড। 'GLOW10' ব্যবহার করে দেখুন!"
          : "Invalid coupon code. Try using 'GLOW10'!"
      );
    } else {
      setCouponError("");
      setInputCoupon("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted mb-4">
            <Link href="/" className="hover:text-rose transition-colors">
              {lang === "bn" ? "হোম" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {lang === "bn" ? "শপিং ব্যাগ" : "Shopping Bag"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
            <h1
              className={`text-3xl md:text-4xl font-bold text-ink ${
                lang === "bn" ? "font-anek" : "font-bricolage"
              }`}
            >
              {lang === "bn" ? "আপনার শপিং ব্যাগ" : "Your Shopping Bag"}
            </h1>
            <span className="text-sm font-semibold text-muted">
              {lang === "bn"
                ? `মোট ${toBnDigits(itemsCount)} টি পণ্য`
                : `${itemsCount} total item${itemsCount === 1 ? "" : "s"}`}
            </span>
          </div>

          {items.length === 0 ? (
            /* Empty State */
            <div className="bg-blush-50/50 rounded-card-lg p-12 md:p-16 text-center border border-line flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm text-rose">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-ink mb-1">
                  {lang === "bn" ? "আপনার ব্যাগটি সম্পূর্ণ খালি" : "Your Shopping Bag is Empty"}
                </h2>
                <p className="text-muted text-sm max-w-sm">
                  {lang === "bn"
                    ? "আমাদের কিউরেটেড কালেকশন থেকে আপনার পছন্দের প্রসাধন সামগ্রী ব্যাগে যোগ করুন।"
                    : "Looks like you haven't added anything yet. Explore our bestselling skincare and beauty collections."}
                </p>
              </div>
              <Link
                href="/shop"
                className="mt-2 px-8 py-3 rounded-pill bg-ink text-white font-bold text-sm hover:bg-rose transition-colors shadow-pill inline-flex items-center gap-2"
              >
                <span>{lang === "bn" ? "কেনাকাটা শুরু করুন" : "Start Shopping"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* ================= LEFT: ITEMS LIST ================= */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                {/* Free Shipping Meter */}
                <div className="p-4 rounded-card bg-blush-100/70 border border-line flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-ink">
                    <span className="flex items-center gap-1.5 text-rose font-bold">
                      <Sparkles className="w-4 h-4" />
                      {amountNeededUSD === 0
                        ? lang === "bn"
                          ? "অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন!"
                          : "You've unlocked Free Dhaka Delivery!"
                        : lang === "bn"
                        ? `ফ্রি ঢাকা ডেলিভারির জন্য আর মাত্র ${formatPrice(amountNeededUSD, amountNeededUSD * 120)} যোগ করুন`
                        : `Add ${formatPrice(amountNeededUSD, amountNeededUSD * 120)} more for Free Dhaka Delivery`}
                    </span>
                    <span className="text-muted font-bold">
                      {lang === "bn" ? `${toBnDigits(progressPercent)}%` : `${progressPercent}%`}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Table Header (Desktop) */}
                <div className="hidden sm:grid grid-cols-12 text-xs font-bold uppercase tracking-wider text-muted pb-3 border-b border-line px-2">
                  <div className="col-span-6">{lang === "bn" ? "পণ্য" : "Product"}</div>
                  <div className="col-span-3 text-center">{lang === "bn" ? "পরিমাণ" : "Quantity"}</div>
                  <div className="col-span-3 text-right">{lang === "bn" ? "মোট" : "Total"}</div>
                </div>

                {/* Items */}
                <div className="divide-y divide-line border-b border-line">
                  {items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      {/* Product Info */}
                      <div className="sm:col-span-6 flex gap-4">
                        <div className="relative w-20 h-24 rounded-card bg-blush-100 shrink-0 overflow-hidden border border-line">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.titleEn}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-rose">
                              <ShoppingBag className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                              {item.brand}
                            </span>
                            <h3 className="font-bold text-sm text-ink line-clamp-2 hover:text-rose transition-colors">
                              <Link href={`/product/${item.slug || item.id}`}>
                                {lang === "bn" ? item.titleBn : item.titleEn}
                              </Link>
                            </h3>
                            <div className="flex gap-2 mt-1 text-[11px] text-muted">
                              {item.selectedSize && (
                                <span className="bg-blush-50 px-2 py-0.5 rounded-pill border border-line">
                                  {item.selectedSize}
                                </span>
                              )}
                              {item.selectedShade && (
                                <span className="bg-blush-50 px-2 py-0.5 rounded-pill border border-line">
                                  {item.selectedShade}
                                </span>
                              )}
                            </div>
                          </div>

                          <span className="text-xs font-semibold text-muted sm:hidden mt-2">
                            {formatPrice(item.priceUSD, item.priceBDT)} each
                          </span>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="sm:col-span-3 flex sm:justify-center items-center gap-2">
                        <div className="inline-flex items-center border border-line rounded-pill bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1,
                                item.selectedSize,
                                item.selectedShade
                              )
                            }
                            aria-label="Decrease quantity"
                            className="w-8 h-8 flex items-center justify-center hover:bg-blush-100 rounded-l-pill text-ink transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-ink">
                            {lang === "bn" ? toBnDigits(item.quantity) : item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1,
                                item.selectedSize,
                                item.selectedShade
                              )
                            }
                            aria-label="Increase quantity"
                            className="w-8 h-8 flex items-center justify-center hover:bg-blush-100 rounded-r-pill text-ink transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedShade)}
                          aria-label="Remove item"
                          className="text-muted hover:text-rose p-1.5 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Line Item Total */}
                      <div className="sm:col-span-3 text-right">
                        <span className="font-bold text-base md:text-lg text-ink font-bricolage">
                          {formatPrice(
                            item.priceUSD * item.quantity,
                            item.priceBDT * item.quantity
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping & Clear */}
                <div className="flex items-center justify-between text-xs font-bold pt-2">
                  <Link
                    href="/shop"
                    className="text-rose hover:underline inline-flex items-center gap-1.5"
                  >
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    <span>{lang === "bn" ? "আরও কেনাকাটা করুন" : "Continue Shopping"}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-muted hover:text-rose transition-colors"
                  >
                    {lang === "bn" ? "ব্যাগ খালি করুন" : "Clear All Items"}
                  </button>
                </div>
              </div>

              {/* ================= RIGHT: ORDER SUMMARY ================= */}
              <div className="lg:col-span-4 bg-blush-50/70 rounded-card-lg p-6 border border-line flex flex-col gap-5 sticky top-36">
                <h2 className="font-bold text-lg text-ink font-bricolage pb-3 border-b border-line">
                  {lang === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}
                </h2>

                {/* Coupon Code Section */}
                <div>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder={lang === "bn" ? "কুপন কোড (যেমন: GLOW10)" : "Promo code (e.g. GLOW10)"}
                      className="flex-1 h-10 px-3.5 rounded-pill bg-white border border-line text-xs outline-none focus:border-rose text-ink"
                    />
                    <button
                      type="submit"
                      className="px-4 h-10 rounded-pill bg-ink text-white font-bold text-xs hover:bg-rose transition-colors"
                    >
                      {lang === "bn" ? "প্রয়োগ" : "Apply"}
                    </button>
                  </form>
                  {couponError && (
                    <p className="text-[11px] text-rose font-medium mt-1">{couponError}</p>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between bg-success-bg text-success px-3 py-1.5 rounded-pill text-xs font-bold mt-2">
                      <span className="flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        {appliedCoupon} Applied (10% OFF)
                      </span>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Shipping Location Choice */}
                <div className="pt-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    {lang === "bn" ? "ডেলিভারি এলাকা:" : "Delivery Location:"}
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setShippingCity("dhaka")}
                      className={`p-2.5 rounded-card border font-bold text-left transition-all ${
                        shippingCity === "dhaka"
                          ? "bg-white border-rose text-rose shadow-xs"
                          : "bg-white/60 border-line text-muted"
                      }`}
                    >
                      <span>{lang === "bn" ? "ঢাকার ভেতরে" : "Inside Dhaka"}</span>
                      <span className="block text-[11px] font-normal text-muted mt-0.5">
                        {subtotalUSD >= 50
                          ? lang === "bn"
                            ? "ফ্রি ডেলিভারি"
                            : "Free"
                          : "$0.75 (~৳80)"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingCity("outside")}
                      className={`p-2.5 rounded-card border font-bold text-left transition-all ${
                        shippingCity === "outside"
                          ? "bg-white border-rose text-rose shadow-xs"
                          : "bg-white/60 border-line text-muted"
                      }`}
                    >
                      <span>{lang === "bn" ? "ঢাকার বাইরে" : "Outside Dhaka"}</span>
                      <span className="block text-[11px] font-normal text-muted mt-0.5">
                        {subtotalUSD >= 80
                          ? lang === "bn"
                            ? "ফ্রি ডেলিভারি"
                            : "Free"
                          : "$1.20 (~৳130)"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="flex flex-col gap-2.5 pt-3 border-t border-line text-sm">
                  <div className="flex justify-between text-muted">
                    <span>{lang === "bn" ? "উপমোট (Subtotal)" : "Subtotal"}</span>
                    <span className="font-semibold text-ink font-bricolage">
                      {formatPrice(subtotalUSD, subtotalBDT)}
                    </span>
                  </div>

                  {discountUSD > 0 && (
                    <div className="flex justify-between text-success">
                      <span>{lang === "bn" ? "ডিসকাউন্ট (১০%)" : "Promo Discount"}</span>
                      <span className="font-bold">
                        -{formatPrice(discountUSD, discountBDT)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted">
                    <span>{lang === "bn" ? "ডেলিভারি চার্জ" : "Shipping Estimate"}</span>
                    <span className="font-semibold text-ink">
                      {shippingCostUSD === 0 ? (
                        <span className="text-success font-bold">
                          {lang === "bn" ? "ফ্রি" : "FREE"}
                        </span>
                      ) : (
                        formatPrice(shippingCostUSD, shippingCostBDT)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-line font-bold text-base md:text-lg text-ink">
                    <span>{lang === "bn" ? "সর্বমোট (Total)" : "Estimated Total"}</span>
                    <span className="text-2xl font-bricolage text-ink">
                      {formatPrice(totalUSD, totalBDT)}
                    </span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full h-13 rounded-pill bg-ink hover:bg-rose text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-pill transition-all"
                >
                  <span>{lang === "bn" ? "চেকআউটে এগিয়ে যান" : "Proceed to Checkout"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <p className="text-[11px] text-muted text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-success" />
                  <span>
                    {lang === "bn"
                      ? "ক্যাশ অন ডেলিভারি ও বিকাশ উভয় মাধ্যমেই পেমেন্ট করা যাবে"
                      : "Cash on Delivery & bKash / Cards accepted"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
