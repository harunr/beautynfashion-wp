"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Star,
  Plus,
  ArrowRight,
  Check,
  Heart,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { CATEGORIES, PRODUCTS, Product } from "@/lib/data/products";

export default function HomePage() {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItemId, setAddedItemId] = useState<number | null>(null);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 1800);
  };

  const trendingProducts = PRODUCTS.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative bg-blush-100 py-12 md:py-20 lg:py-24 border-b border-line overflow-hidden">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-white text-rose font-semibold text-xs md:text-sm tracking-wide shadow-sm w-fit border border-line">
                  <Sparkles className="w-4 h-4 text-rose" />
                  <span>{t.hero.eyebrow}</span>
                </div>

                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.12] ${
                    lang === "bn" ? "font-anek tracking-normal" : "font-bricolage"
                  }`}
                >
                  {t.hero.titlePrefix}
                  <span
                    className={`text-rose ${
                      lang === "en" ? "font-instrument italic font-normal" : ""
                    }`}
                  >
                    {t.hero.titleAccent}
                  </span>
                  {t.hero.titleSuffix}
                </h1>

                <p className="text-muted text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                  {t.hero.subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/shop"
                    className="h-13 sm:h-14 px-8 rounded-pill bg-ink text-white hover:bg-rose transition-all font-semibold text-sm md:text-base inline-flex items-center justify-center gap-2 shadow-pill"
                  >
                    <span>{t.hero.ctaShop}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/journal"
                    className="h-13 sm:h-14 px-7 rounded-pill bg-transparent text-ink border-2 border-ink hover:bg-ink hover:text-white transition-all font-semibold text-sm md:text-base inline-flex items-center justify-center"
                  >
                    {t.hero.ctaRoutine}
                  </Link>
                </div>

                {/* Hero Trust Bullets */}
                <div className="pt-6 border-t border-line flex flex-wrap items-center gap-5 md:gap-8 text-xs md:text-sm font-semibold text-ink">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose" />
                    <span>{t.hero.stat1}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-rose" />
                    <span>{t.hero.stat2}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-rose" />
                    <span>{t.hero.stat3}</span>
                  </div>
                </div>
              </div>

              {/* Hero Right Visual Artboard with Real Unsplash Beauty Photography */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full aspect-[4/5] max-w-[440px] rounded-card-lg overflow-hidden shadow-card border-4 border-white bg-blush-200">
                  <Image
                    src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=900&auto=format&fit=crop"
                    alt="Luxury skincare serum bottles and botanicals"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 440px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-black/20" />

                  {/* Floating Top Pill */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-pill shadow-md text-xs font-bold text-ink border border-line flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-rose" />
                    <span>100% Genuine Brands</span>
                  </div>

                  {/* Floating Middle Edit Card */}
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/90 backdrop-blur-md p-3 rounded-card shadow-lg max-w-[170px] border border-white/60 hidden sm:block">
                    <p className="text-[10px] font-bold text-rose uppercase tracking-wider">
                      {lang === "bn" ? "কিউরেটেড কালেকশন" : "Curated Edit"}
                    </p>
                    <p className="font-bold text-xs text-ink mt-0.5">
                      Glass Skin Rituals
                    </p>
                    <p className="text-[10px] text-muted mt-1">
                      Dermatologist Tested
                    </p>
                  </div>

                  {/* Floating Bottom Review Pill */}
                  <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3.5 rounded-card shadow-lg flex items-center gap-3 border border-line">
                    <div className="w-10 h-10 rounded-full bg-tint-4 flex items-center justify-center font-bold text-success text-xs shrink-0">
                      4.9★
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-ink">
                        {lang === "bn" ? "ভেরিফাইড কাস্টমার রিভিউ" : "Verified Customer Choice"}
                      </p>
                      <p className="text-muted">
                        {lang === "bn" ? "৯৮% ইতিবাচক অভিজ্ঞতা • ১০,০০০+ হ্যাপি কাস্টমার" : "98% Positive Feedback • 10,000+ Happy Customers"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORY TILES (PHOTOGRAPHIC) ================= */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2
                  className={`text-2xl md:text-3xl font-bold text-ink ${
                    lang === "bn" ? "font-anek" : "font-bricolage"
                  }`}
                >
                  {t.categories.title}
                </h2>
                <p className="text-muted text-sm mt-1">
                  {lang === "bn"
                    ? "প্রিমিয়াম স্কিনকেয়ার, মেকআপ ও সুগন্ধির সমৃদ্ধ সম্ভার"
                    : "Curated collections crafted for every skin type and ritual"}
                </p>
              </div>

              <Link
                href="/shop"
                className="text-sm font-semibold text-rose hover:text-rose-dark transition-colors inline-flex items-center gap-1"
              >
                <span>{t.nav.shopAll}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {CATEGORIES.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center text-center gap-3 p-3 rounded-card hover:bg-blush-50 transition-all border border-transparent hover:border-line"
                >
                  <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-md group-hover:scale-105 group-hover:shadow-lg transition-all border-2 border-white">
                    <Image
                      src={cat.image}
                      alt={cat.nameEn}
                      fill
                      sizes="(max-width: 768px) 112px, 120px"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <span className="font-bold text-sm md:text-base text-ink group-hover:text-rose transition-colors block">
                      {lang === "bn" ? cat.nameBn : cat.nameEn}
                    </span>
                    <span className="text-[11px] text-muted">
                      {lang === "bn" ? `${toBnDigits(cat.itemCount)}+ পণ্য` : `${cat.itemCount}+ Products`}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRENDING PRODUCTS (REAL DATA & IMAGES) ================= */}
        <section className="py-16 md:py-20 bg-blush-50/70 border-y border-line">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2
                  className={`text-2xl md:text-3xl font-bold text-ink ${
                    lang === "bn" ? "font-anek" : "font-bricolage"
                  }`}
                >
                  {t.products.trending}
                </h2>
                <p className="text-muted text-sm mt-1">
                  {lang === "bn"
                    ? "গ্রাহকদের পছন্দের সেরা স্কিনকেয়ার ও বিউটি কালেকশন"
                    : "Top-rated formula favorites chosen by our community"}
                </p>
              </div>

              <Link
                href="/shop"
                className="hidden sm:inline-flex text-sm font-semibold text-rose hover:text-rose-dark transition-colors items-center gap-1"
              >
                <span>{t.nav.shopAll}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {trendingProducts.map((p) => {
                const title = lang === "bn" ? p.titleBn : p.titleEn;
                const category = lang === "bn" ? p.categoryBn : p.categoryEn;
                const badge = lang === "bn" ? p.badgeBn : p.badgeEn;
                const ratingFormatted = lang === "bn" ? toBnDigits(p.rating) : p.rating;
                const reviewsFormatted = lang === "bn" ? toBnDigits(p.reviewsCount) : p.reviewsCount;
                const isItemWishlisted = isInWishlist(p.id);

                return (
                  <article
                    key={p.id}
                    className="group bg-white rounded-card p-4 border border-line hover:border-line-strong hover:shadow-card transition-all flex flex-col justify-between"
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

                        {/* Top Left Badge */}
                        {badge && (
                          <span
                            className={`absolute left-3 top-3 px-2.5 py-1 rounded-pill text-xs font-bold shadow-sm ${
                              p.isSale ? "bg-rose text-white" : "bg-white/95 text-ink"
                            }`}
                          >
                            {badge}
                          </span>
                        )}

                        {/* Top Right Wishlist Toggle */}
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
                        <span className="font-bold text-base md:text-lg text-ink font-bricolage">
                          {formatPrice(p.priceUSD, p.priceBDT)}
                        </span>
                        {p.wasUSD && (
                          <span className="text-strike text-xs line-through">
                            {formatPrice(p.wasUSD, p.wasBDT)}
                          </span>
                        )}
                      </div>

                      {lang === "bn" ? (
                        <span className="text-[11px] font-semibold text-success bg-success-bg px-2 py-0.5 rounded-pill">
                          ক্যাশ অন ডেলিভারি
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-muted">
                          In Stock
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= 3-STEP BEAUTY RITUAL BANNER ================= */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="bg-gradient-to-br from-blush-100 via-[#FFF5F6] to-blush-200 rounded-card-lg p-6 sm:p-10 lg:p-14 border border-line">
              <div className="max-w-2xl mb-10">
                <span className="text-rose font-bold text-xs uppercase tracking-wider bg-white px-3 py-1 rounded-pill shadow-sm border border-line">
                  {lang === "bn" ? "ডেইলি স্কিনকেয়ার রুটিন" : "The Daily Ritual"}
                </span>
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold text-ink mt-3 ${
                    lang === "bn" ? "font-anek" : "font-bricolage"
                  }`}
                >
                  {lang === "bn"
                    ? "৩ ধাপে নিখুঁত গ্লাস স্কিন কেয়ার রুটিন"
                    : "The 3-Step Glass Skin Formula for Bengali Humidity"}
                </h2>
                <p className="text-muted text-sm md:text-base mt-2">
                  {lang === "bn"
                    ? "গরমে ত্বক তেলতেলে না করে ভেতর থেকে উজ্জ্বলতা বাড়িয়ে তুলতে বিশেষজ্ঞদের পরামর্শ।"
                    : "Lightweight hydration, potent pore refinement, and mineral barrier defense tested for tropical weather."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="bg-white rounded-card p-5 border border-line shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-blush-100 text-rose font-bold text-xs flex items-center justify-center mb-3">
                      01
                    </span>
                    <h3 className="font-bold text-base text-ink mb-1">
                      {lang === "bn" ? "ব্যালেন্স ও টোনিং" : "Balance & Prep"}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-4">
                      {lang === "bn"
                        ? "বোটানিক্যাল রোজওয়াটার টোনার দিয়ে ত্বকের পিএইচ লেভেল নিয়ন্ত্রণ করুন।"
                        : "Organic Damask Rosewater toner to balance pH and prep skin for deep absorption."}
                    </p>
                  </div>
                  <Link
                    href="/product/botanical-rosewater-hydrating-toner"
                    className="text-xs font-bold text-rose hover:underline inline-flex items-center gap-1"
                  >
                    <span>{lang === "bn" ? "টোনার দেখুন" : "Shop Step 1"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-card p-5 border border-line shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-blush-100 text-rose font-bold text-xs flex items-center justify-center mb-3">
                      02
                    </span>
                    <h3 className="font-bold text-base text-ink mb-1">
                      {lang === "bn" ? "উজ্জ্বলতা ও অ্যান্টিঅক্সিডেন্ট" : "Target & Brighten"}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-4">
                      {lang === "bn"
                        ? "রেডিয়েন্স সি+ স্কোয়ালেন সিরাম মেছতা ও রোদে পোড়া দাগ দূর করে।"
                        : "High-potency THD Vitamin C and olive squalane to fade pigmentation."}
                    </p>
                  </div>
                  <Link
                    href="/product/radiance-c-squalane-serum"
                    className="text-xs font-bold text-rose hover:underline inline-flex items-center gap-1"
                  >
                    <span>{lang === "bn" ? "সিরাম দেখুন" : "Shop Step 2"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-card p-5 border border-line shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="w-8 h-8 rounded-full bg-blush-100 text-rose font-bold text-xs flex items-center justify-center mb-3">
                      03
                    </span>
                    <h3 className="font-bold text-base text-ink mb-1">
                      {lang === "bn" ? "সুরক্ষা ও ব্যারিয়ার রিপেয়ার" : "Shield & Hydrate"}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-4">
                      {lang === "bn"
                        ? "হাইড্রো-ব্যারিয়ার সিরামাইড ক্রিম ও এসপিএফ ৫০+ সানস্ক্রিন লাগান।"
                        : "Triple ceramide barrier lock followed by mineral non-nano zinc sunscreen."}
                    </p>
                  </div>
                  <Link
                    href="/product/hydra-barrier-ceramide-cream"
                    className="text-xs font-bold text-rose hover:underline inline-flex items-center gap-1"
                  >
                    <span>{lang === "bn" ? "ক্রিম দেখুন" : "Shop Step 3"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST VALUE PROPS ================= */}
        <section className="py-14 bg-white border-t border-line">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-start gap-4 p-4 rounded-card bg-blush-50/60 border border-line">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-rose">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm md:text-base mb-1">
                    {t.trust.authenticTitle}
                  </h4>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    {t.trust.authenticDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-card bg-blush-50/60 border border-line">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-rose">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm md:text-base mb-1">
                    {t.trust.shippingTitle}
                  </h4>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    {t.trust.shippingDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-card bg-blush-50/60 border border-line">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-rose">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm md:text-base mb-1">
                    {t.trust.supportTitle}
                  </h4>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    {t.trust.supportDesc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-card bg-blush-50/60 border border-line">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-rose">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-ink text-sm md:text-base mb-1">
                    {t.trust.secureTitle}
                  </h4>
                  <p className="text-xs md:text-sm text-muted leading-relaxed">
                    {t.trust.secureDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
