"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/lib/cart/context";
import { useLanguage } from "@/lib/i18n/context";

export default function CartDrawer() {
  const {
    items,
    itemsCount,
    subtotalUSD,
    subtotalBDT,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
  } = useCart();
  const { lang, formatPrice, toBnDigits } = useLanguage();

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const freeShippingThresholdUSD = 50;
  const amountNeededUSD = Math.max(0, freeShippingThresholdUSD - subtotalUSD);
  const freeShippingPercent = Math.min(100, Math.round((subtotalUSD / freeShippingThresholdUSD) * 100));

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-line flex items-center justify-between bg-blush-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-rose" />
            <h2 className="font-bold text-lg text-ink font-bricolage">
              {lang === "bn" ? "আপনার শপিং ব্যাগ" : "Your Shopping Bag"}
            </h2>
            <span className="bg-rose text-white text-xs font-bold px-2 py-0.5 rounded-pill">
              {lang === "bn" ? toBnDigits(itemsCount) : itemsCount}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close bag"
            className="w-9 h-9 rounded-full bg-white hover:bg-blush-100 flex items-center justify-center text-ink transition-colors border border-line"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="p-4 bg-blush-100/70 border-b border-line text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium text-ink">
            <span className="flex items-center gap-1.5 font-bold text-rose">
              <Sparkles className="w-3.5 h-3.5" />
              {amountNeededUSD === 0
                ? lang === "bn"
                  ? "অভিনন্দন! আপনি ফ্রি ডেলিভারি পাচ্ছেন!"
                  : "You've unlocked Free Dhaka Delivery!"
                : lang === "bn"
                ? `ফ্রি ডেলিভারির জন্য আর ${formatPrice(amountNeededUSD, amountNeededUSD * 120)} যোগ করুন`
                : `Add ${formatPrice(amountNeededUSD, amountNeededUSD * 120)} more for Free Dhaka Delivery`}
            </span>
            <span className="text-muted font-bold">
              {lang === "bn" ? `${toBnDigits(freeShippingPercent)}%` : `${freeShippingPercent}%`}
            </span>
          </div>
          <div className="w-full h-1.5 bg-white rounded-full overflow-hidden">
            <div
              className="h-full bg-rose rounded-full transition-all duration-500"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-line">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 gap-4">
              <div className="w-20 h-20 rounded-full bg-blush-100 flex items-center justify-center text-rose/70">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-ink">
                  {lang === "bn" ? "আপনার ব্যাগটি খালি" : "Your bag is empty"}
                </h3>
                <p className="text-muted text-sm mt-1 max-w-xs">
                  {lang === "bn"
                    ? "আপনার পছন্দের বিউটি ও স্কিনকেয়ার প্রোডাক্টগুলো ব্যাগে যোগ করুন।"
                    : "Looks like you haven't added anything yet. Explore our curated collections!"}
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="mt-2 px-6 py-2.5 rounded-pill bg-ink text-white font-semibold text-sm hover:bg-rose transition-colors"
              >
                {lang === "bn" ? "কেনাকাটা শুরু করুন" : "Start Shopping"}
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div key={`${item.id}-${item.selectedSize}-${item.selectedShade}-${idx}`} className="py-4 flex gap-3.5">
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-card overflow-hidden bg-blush-100 shrink-0 border border-line">
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

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-muted">
                        {item.brand}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedShade)}
                        aria-label="Remove item"
                        className="text-muted hover:text-rose transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <Link
                      href={`/product/${item.slug || item.id}`}
                      onClick={closeCart}
                      className="font-bold text-sm text-ink line-clamp-2 hover:text-rose transition-colors leading-snug mt-0.5"
                    >
                      {lang === "bn" ? item.titleBn : item.titleEn}
                    </Link>

                    {/* Variant Pills */}
                    {(item.selectedSize || item.selectedShade) && (
                      <div className="flex items-center gap-1.5 mt-1 text-[11px] text-muted">
                        {item.selectedSize && (
                          <span className="bg-blush-100 px-2 py-0.5 rounded-pill font-medium">
                            {item.selectedSize}
                          </span>
                        )}
                        {item.selectedShade && (
                          <span className="bg-blush-100 px-2 py-0.5 rounded-pill font-medium">
                            {item.selectedShade}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between pt-2">
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
                        className="w-7 h-7 flex items-center justify-center hover:bg-blush-100 rounded-l-pill text-ink transition-colors"
                      >
                        <Minus className="w-3 h-3" />
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
                        className="w-7 h-7 flex items-center justify-center hover:bg-blush-100 rounded-r-pill text-ink transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="font-bold text-sm md:text-base text-ink">
                      {formatPrice(
                        item.priceUSD * item.quantity,
                        item.priceBDT * item.quantity
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-line bg-white flex flex-col gap-3 shadow-lg">
            <div className="flex items-baseline justify-between">
              <span className="font-medium text-sm text-muted">
                {lang === "bn" ? "উপমোট (Subtotal)" : "Subtotal"}
              </span>
              <span className="font-bold text-lg md:text-xl text-ink font-bricolage">
                {formatPrice(subtotalUSD, subtotalBDT)}
              </span>
            </div>

            <p className="text-[11px] text-muted flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0" />
              <span>
                {lang === "bn"
                  ? "ক্যাশ অন ডেলিভারি ও বিকাশ পেমেন্ট প্রযোজ্য"
                  : "Taxes & shipping calculated at checkout • COD available"}
              </span>
            </p>

            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full h-12 rounded-pill bg-ink hover:bg-rose text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-pill transition-all"
              >
                <span>{lang === "bn" ? "অর্ডার সম্পন্ন করুন" : "Checkout Now"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full h-10 rounded-pill bg-blush-100 hover:bg-blush-200 text-ink font-semibold text-xs inline-flex items-center justify-center transition-colors"
              >
                {lang === "bn" ? "সম্পূর্ণ ব্যাগ দেখুন" : "View Full Bag"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
