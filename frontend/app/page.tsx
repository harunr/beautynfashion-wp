"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";

// Sample initial products from the design canvas
const sampleProducts = [
  {
    id: 1,
    titleEn: "Radiant Glow Niacinamide 10% Serum",
    titleBn: "রেডিয়েন্ট গ্লো নিয়াসিনামাইড ১০% সিরাম",
    categoryEn: "Skincare",
    categoryBn: "স্কিনকেয়ার",
    brand: "GlowRecipe",
    priceUSD: 34.0,
    priceBDT: 3850,
    wasUSD: 42.0,
    wasBDT: 4600,
    rating: 4.9,
    reviews: 128,
    badgeEn: "Bestseller",
    badgeBn: "বেস্টসেলার",
    isSale: false,
    tint: "bg-tint-1",
  },
  {
    id: 2,
    titleEn: "Hydra-Barrier Ceramide Moisturiser",
    titleBn: "হাইড্রো-ব্যারিয়ার সিরামাইড ময়েশ্চারাইজার",
    categoryEn: "Skincare",
    categoryBn: "স্কিনকেয়ার",
    brand: "CeraCare",
    priceUSD: 28.0,
    priceBDT: 3150,
    wasUSD: 35.0,
    wasBDT: 3900,
    rating: 4.8,
    reviews: 94,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    tint: "bg-tint-4",
  },
  {
    id: 3,
    titleEn: "Velvet Silk Matte Liquid Lipstick",
    titleBn: "ভেলভেট সিল্ক ম্যাট লিকুইড লিপস্টিক",
    categoryEn: "Makeup",
    categoryBn: "মেকআপ",
    brand: "LuxeShade",
    priceUSD: 22.0,
    priceBDT: 2450,
    wasUSD: 28.0,
    wasBDT: 3100,
    rating: 4.9,
    reviews: 215,
    badgeEn: "New",
    badgeBn: "নতুন",
    isSale: false,
    tint: "bg-tint-2",
  },
  {
    id: 4,
    titleEn: "Ionic Pro Salon Ceramic Hair Dryer",
    titleBn: "আয়নিক প্রো সেলুন সিরামিক হেয়ার ড্রায়ার",
    categoryEn: "Beauty Tools",
    categoryBn: "বিউটি টুলস",
    brand: "AuraStyle",
    priceUSD: 85.0,
    priceBDT: 9500,
    wasUSD: 110.0,
    wasBDT: 12200,
    rating: 5.0,
    reviews: 67,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    tint: "bg-tint-5",
  },
];

const categoryList = [
  { nameEn: "Skincare", nameBn: "স্কিনকেয়ার", tint: "bg-tint-1", slug: "skincare" },
  { nameEn: "Makeup", nameBn: "মেকআপ", tint: "bg-tint-2", slug: "makeup" },
  { nameEn: "Hair Care", nameBn: "হেয়ার কেয়ার", tint: "bg-tint-4", slug: "hair-care" },
  { nameEn: "Beauty Tools", nameBn: "বিউটি টুলস", tint: "bg-tint-5", slug: "beauty-tools" },
  { nameEn: "Fragrance", nameBn: "সুগন্ধি", tint: "bg-tint-6", slug: "fragrance" },
  { nameEn: "Bath & Body", nameBn: "বাথ ও বডি", tint: "bg-tint-3", slug: "bath-body" },
];

export default function HomePage() {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const handleQuickAdd = (id: number) => {
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="bg-blush-100 py-12 md:py-20 lg:py-24 border-b border-line overflow-hidden">
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
                    href="/routine"
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

              {/* Hero Right Visual Artboard */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full aspect-[4/5] max-w-[440px] rounded-card-lg bg-gradient-to-br from-blush-200 to-tint-1 p-6 flex flex-col justify-between overflow-hidden shadow-card border border-white">
                  {/* Floating Top Pill */}
                  <div className="self-end bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-pill shadow-sm text-xs font-bold text-ink">
                    100% Genuine Brands
                  </div>

                  {/* Centered Graphic Element */}
                  <div className="my-auto flex flex-col items-center text-center gap-3">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/60 flex items-center justify-center shadow-inner">
                      <Sparkles className="w-16 h-16 text-rose" />
                    </div>
                    <span className="font-bricolage text-xl md:text-2xl font-bold text-plum-900">
                      The Glow Edit
                    </span>
                    <span className="text-xs md:text-sm text-muted font-medium">
                      Multi-brand Curated Beauty
                    </span>
                  </div>

                  {/* Floating Bottom Review Pill */}
                  <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-card shadow-sm flex items-center gap-3 border border-line">
                    <div className="w-10 h-10 rounded-full bg-tint-4 flex items-center justify-center font-bold text-success text-xs">
                      4.9★
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-ink">
                        {lang === "bn" ? "ভেরিফাইড কাস্টমার রিভিউ" : "Verified Customer Choice"}
                      </p>
                      <p className="text-muted">
                        {lang === "bn" ? "৯৮% ইতিবাচক অভিজ্ঞতা" : "98% Positive Feedback"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORY TILES ================= */}
        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="flex items-center justify-between mb-10">
              <h2
                className={`text-2xl md:text-3xl font-bold text-ink ${
                  lang === "bn" ? "font-anek" : "font-bricolage"
                }`}
              >
                {t.categories.title}
              </h2>
              <Link
                href="/shop"
                className="text-sm font-semibold text-rose hover:text-rose-dark transition-colors inline-flex items-center gap-1"
              >
                <span>{t.nav.shopAll}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {categoryList.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/category/${cat.slug}`}
                  className="group flex flex-col items-center text-center gap-3 p-4 rounded-card hover:bg-blush-50 transition-all border border-transparent hover:border-line"
                >
                  <div
                    className={`w-24 h-24 md:w-28 md:h-28 rounded-full ${cat.tint} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <Sparkles className="w-8 h-8 text-rose/70" />
                  </div>
                  <span className="font-semibold text-sm md:text-base text-ink group-hover:text-rose transition-colors">
                    {lang === "bn" ? cat.nameBn : cat.nameEn}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRENDING PRODUCTS ================= */}
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
              {sampleProducts.map((p) => {
                const title = lang === "bn" ? p.titleBn : p.titleEn;
                const category = lang === "bn" ? p.categoryBn : p.categoryEn;
                const badge = lang === "bn" ? p.badgeBn : p.badgeEn;
                const ratingFormatted = lang === "bn" ? toBnDigits(p.rating) : p.rating;
                const reviewsFormatted = lang === "bn" ? toBnDigits(p.reviews) : p.reviews;

                return (
                  <article
                    key={p.id}
                    className="group bg-white rounded-card p-4 border border-line hover:border-line-strong hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Frame */}
                      <div
                        className={`relative w-full aspect-[4/5] rounded-[20px] ${p.tint} p-4 flex items-center justify-center overflow-hidden mb-4`}
                      >
                        {/* Badge */}
                        <span
                          className={`absolute left-3 top-3 px-2.5 py-1 rounded-pill text-xs font-bold shadow-sm ${
                            p.isSale ? "bg-rose text-white" : "bg-white text-ink"
                          }`}
                        >
                          {badge}
                        </span>

                        <Sparkles className="w-14 h-14 text-rose/40 group-hover:scale-110 transition-transform duration-300" />

                        {/* Quick Add Button */}
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(p.id)}
                          aria-label={`Add ${title} to bag`}
                          className="absolute right-3 bottom-3 w-10 h-10 rounded-full bg-white text-ink hover:bg-rose hover:text-white shadow-md flex items-center justify-center transition-colors"
                        >
                          {addedItem === p.id ? (
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
                        <Link href={`/product/${p.id}`}>{title}</Link>
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
                        <span className="font-bold text-base md:text-lg text-ink">
                          {formatPrice(p.priceUSD, p.priceBDT)}
                        </span>
                        {p.wasUSD && (
                          <span className="text-strike text-xs line-through">
                            {formatPrice(p.wasUSD, p.wasBDT)}
                          </span>
                        )}
                      </div>

                      {lang === "bn" && (
                        <span className="text-[11px] font-semibold text-success bg-success-bg px-2 py-0.5 rounded-pill">
                          ক্যাশ অন ডেলিভারি
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= TRUST VALUE PROPS ================= */}
        <section className="py-14 bg-white">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
