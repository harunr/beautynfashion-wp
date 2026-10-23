"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Plus,
  Check,
  Heart,
  Timer,
  Tag,
  ShieldCheck,
  Truck,
  Gift,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { getSaleProducts, Product } from "@/lib/data/products";

export default function SalePage() {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItemId, setAddedItemId] = useState<number | null>(null);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 36,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [priceTier, setPriceTier] = useState<"all" | "under30" | "highDiscount">("all");

  const saleProducts = getSaleProducts().filter((p) => {
    if (priceTier === "under30") return p.priceUSD <= 30;
    if (priceTier === "highDiscount") {
      if (!p.wasUSD) return false;
      const pct = (p.wasUSD - p.priceUSD) / p.wasUSD;
      return pct >= 0.2; // 20%+ discount
    }
    return true;
  });

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* ================= SALE HERO BANNER ================= */}
        <section className="bg-gradient-to-br from-rose via-rose-dark to-[#7D1E36] text-white py-12 md:py-16">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              <div className="max-w-xl flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white/15 backdrop-blur-md text-white text-xs font-bold w-fit">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "সীমিত সময়ের বিশেষ অফার" : "Flash Sale • Limited Time"}</span>
                </div>

                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
                    lang === "bn" ? "font-anek" : "font-bricolage"
                  }`}
                >
                  {lang === "bn" ? "প্রিমিয়াম বিউটি সেল — ৪০% পর্যন্ত ছাড়" : "The Luxury Beauty Sale — Up to 40% OFF"}
                </h1>

                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  {lang === "bn"
                    ? "সেরা সিরাম, লিপস্টিক, স্ক্যাল্প অয়েল ও ফেসিয়াল ডিভাইসে বিশেষ ডিসকাউন্ট। স্টক সীমিত!"
                    : "Save on top-rated skincare elixirs, velvet lip stains, and salon-grade styling devices."}
                </p>
              </div>

              {/* Countdown Timer Box */}
              <div className="bg-white/10 backdrop-blur-md p-5 rounded-card-lg border border-white/20 flex flex-col items-center gap-3 shrink-0">
                <span className="text-xs uppercase tracking-wider font-bold text-white/90 flex items-center gap-1.5">
                  <Timer className="w-4 h-4" />
                  {lang === "bn" ? "অফারের বাকি সময়:" : "Offer Ends In:"}
                </span>

                <div className="flex items-center gap-2 text-ink">
                  <div className="bg-white rounded-card w-14 h-14 flex flex-col items-center justify-center font-bricolage font-bold text-xl shadow-sm">
                    <span>{lang === "bn" ? toBnDigits(timeLeft.hours) : String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase text-muted font-normal">
                      {lang === "bn" ? "ঘণ্টা" : "Hours"}
                    </span>
                  </div>
                  <span className="text-white font-bold text-xl">:</span>
                  <div className="bg-white rounded-card w-14 h-14 flex flex-col items-center justify-center font-bricolage font-bold text-xl shadow-sm">
                    <span>{lang === "bn" ? toBnDigits(timeLeft.minutes) : String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase text-muted font-normal">
                      {lang === "bn" ? "মিনিট" : "Mins"}
                    </span>
                  </div>
                  <span className="text-white font-bold text-xl">:</span>
                  <div className="bg-white rounded-card w-14 h-14 flex flex-col items-center justify-center font-bricolage font-bold text-xl shadow-sm">
                    <span>{lang === "bn" ? toBnDigits(timeLeft.seconds) : String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase text-muted font-normal">
                      {lang === "bn" ? "সেকেন্ড" : "Secs"}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-white/80">
                  {lang === "bn" ? "কুপন কোড: GLOW10 দিয়ে অতিরিক্ত ১০% ছাড়!" : "Use coupon GLOW10 for extra 10% OFF"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROMO PERKS STRIP ================= */}
        <section className="bg-blush-50 py-3.5 border-b border-line text-xs font-semibold text-ink">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14 flex flex-wrap items-center justify-around gap-4">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-rose" />
              <span>{lang === "bn" ? "$50+ অর্ডারে ফ্রি ঢাকা ডেলিভারি" : "Free Dhaka delivery on $50+"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-4 h-4 text-rose" />
              <span>{lang === "bn" ? "প্রতি অর্ডারে ফ্রি ডিলাক্স স্যাম্পল" : "Complimentary sample with every order"}</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-rose" />
              <span>{lang === "bn" ? "১০০% খাঁটি পণ্য ও ক্যাশ অন ডেলিভারি" : "100% Authentic Guarantee & COD"}</span>
            </div>
          </div>
        </section>

        {/* ================= SALE FILTER TABS ================= */}
        <section className="py-8 bg-white border-b border-line">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPriceTier("all")}
                className={`h-9 px-4 rounded-pill text-xs font-bold transition-all ${
                  priceTier === "all"
                    ? "bg-ink text-white shadow-sm"
                    : "bg-[#F8F1F3] text-muted hover:text-ink"
                }`}
              >
                {lang === "bn" ? "সব অফার পণ্য" : "All Sale Products"} ({saleProducts.length})
              </button>
              <button
                type="button"
                onClick={() => setPriceTier("under30")}
                className={`h-9 px-4 rounded-pill text-xs font-bold transition-all ${
                  priceTier === "under30"
                    ? "bg-rose text-white shadow-sm"
                    : "bg-[#F8F1F3] text-muted hover:text-ink"
                }`}
              >
                {lang === "bn" ? "$30 এর নিচে (~৳3600)" : "Under $30"}
              </button>
              <button
                type="button"
                onClick={() => setPriceTier("highDiscount")}
                className={`h-9 px-4 rounded-pill text-xs font-bold transition-all ${
                  priceTier === "highDiscount"
                    ? "bg-rose text-white shadow-sm"
                    : "bg-[#F8F1F3] text-muted hover:text-ink"
                }`}
              >
                {lang === "bn" ? "২০% এর বেশি ছাড়" : "20%+ OFF"}
              </button>
            </div>

            <span className="text-xs text-muted font-semibold">
              {lang === "bn"
                ? `${toBnDigits(saleProducts.length)} টি ডিসকাউন্ট পণ্য পাওয়া গেছে`
                : `${saleProducts.length} deals available`}
            </span>
          </div>
        </section>

        {/* ================= SALE PRODUCTS GRID ================= */}
        <section className="py-12 md:py-16">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {saleProducts.map((p) => {
                const title = lang === "bn" ? p.titleBn : p.titleEn;
                const category = lang === "bn" ? p.categoryBn : p.categoryEn;
                const ratingFormatted = lang === "bn" ? toBnDigits(p.rating) : p.rating;
                const reviewsFormatted = lang === "bn" ? toBnDigits(p.reviewsCount) : p.reviewsCount;
                const isItemWishlisted = isInWishlist(p.id);

                // Savings calculation
                let savingsText = "";
                if (p.wasUSD && p.wasUSD > p.priceUSD) {
                  const savedUSD = p.wasUSD - p.priceUSD;
                  savingsText =
                    lang === "bn"
                      ? `সাশ্রয় ${formatPrice(savedUSD, savedUSD * 120)}`
                      : `Save ${formatPrice(savedUSD, savedUSD * 120)}`;
                }

                return (
                  <article
                    key={p.id}
                    className="group bg-white rounded-card p-4 border border-line hover:border-rose/50 hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div className="relative w-full aspect-[4/5] rounded-[20px] bg-blush-100 overflow-hidden mb-4 border border-line">
                        <Link href={`/product/${p.slug || p.id}`}>
                          <Image
                            src={p.images[0]?.src || ""}
                            alt={p.images[0]?.alt || p.titleEn}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </Link>

                        {/* Top Left Sale Tag */}
                        <span className="absolute left-3 top-3 px-2.5 py-1 rounded-pill text-xs font-bold shadow-sm bg-rose text-white">
                          {savingsText || (lang === "bn" ? "অফার" : "Sale")}
                        </span>

                        {/* Wishlist Button */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(p.id)}
                          aria-label={isItemWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                          className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-ink shadow-sm flex items-center justify-center transition-colors"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isItemWishlisted ? "fill-rose text-rose" : "text-muted"
                            }`}
                          />
                        </button>

                        {/* Quick Add Button */}
                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(p, e)}
                          aria-label={`Add ${title} to bag`}
                          className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-white text-ink hover:bg-rose hover:text-white shadow-md flex items-center justify-center transition-colors"
                        >
                          {addedItemId === p.id ? (
                            <Check className="w-5 h-5 text-success" />
                          ) : (
                            <Plus className="w-5 h-5" />
                          )}
                        </button>
                      </div>

                      {/* Brand & Category */}
                      <div className="flex items-center justify-between text-xs text-muted mb-1">
                        <span className="font-semibold uppercase tracking-wider">{p.brand}</span>
                        <span>{category}</span>
                      </div>

                      {/* Product Title */}
                      <h3 className="font-bold text-sm md:text-base text-ink line-clamp-2 mb-2 group-hover:text-rose transition-colors">
                        <Link href={`/product/${p.slug || p.id}`}>{title}</Link>
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-1.5 text-xs text-muted mb-3">
                        <Star className="w-3.5 h-3.5 fill-rose text-rose" />
                        <span className="font-bold text-ink">{ratingFormatted}</span>
                        <span>
                          ({reviewsFormatted} {t.products.reviews})
                        </span>
                      </div>
                    </div>

                    {/* Price Row */}
                    <div className="pt-2 border-t border-line/60 flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-base md:text-lg text-rose font-bricolage">
                          {formatPrice(p.priceUSD, p.priceBDT)}
                        </span>
                        {p.wasUSD && (
                          <span className="text-strike text-xs line-through">
                            {formatPrice(p.wasUSD, p.wasBDT)}
                          </span>
                        )}
                      </div>

                      <span className="text-[11px] font-semibold text-success bg-success-bg px-2 py-0.5 rounded-pill">
                        {lang === "bn" ? "ক্যাশ অন ডেলিভারি" : "In Stock"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
