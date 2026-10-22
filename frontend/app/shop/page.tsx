"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Filter,
  X,
  Star,
  Plus,
  Check,
  ChevronDown,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";

interface Product {
  id: number;
  titleEn: string;
  titleBn: string;
  type: string;
  concern: string;
  ingredient: string;
  brand: string;
  priceUSD: number;
  priceBDT: number;
  wasUSD?: number;
  wasBDT?: number;
  rating: number;
  reviews: number;
  badgeEn?: string;
  badgeBn?: string;
  isSale: boolean;
  inStock: boolean;
  tint: string;
}

const shopCatalogue: Product[] = [
  {
    id: 1,
    titleEn: "Radiant Glow Niacinamide 10% Serum",
    titleBn: "রেডিয়েন্ট গ্লো নিয়াসিনামাইড ১০% সিরাম",
    type: "serums",
    concern: "dullness",
    ingredient: "niacinamide",
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
    inStock: true,
    tint: "bg-tint-1",
  },
  {
    id: 2,
    titleEn: "Hydra-Barrier Ceramide Moisturiser",
    titleBn: "হাইড্রো-ব্যারিয়ার সিরামাইড ময়েশ্চারাইজার",
    type: "moisturisers",
    concern: "dryness",
    ingredient: "ceramides",
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
    inStock: true,
    tint: "bg-tint-4",
  },
  {
    id: 3,
    titleEn: "Gentle Foaming Amino Acid Cleanser",
    titleBn: "জেন্টল ফোমিং অ্যামিনো অ্যাসিড ক্লিনজার",
    type: "cleansers",
    concern: "breakouts",
    ingredient: "salicylic",
    brand: "PureClean",
    priceUSD: 24.0,
    priceBDT: 2700,
    rating: 4.7,
    reviews: 82,
    isSale: false,
    inStock: true,
    tint: "bg-tint-6",
  },
  {
    id: 4,
    titleEn: "Triple Hyaluronic Plumping Dew Serum",
    titleBn: "ট্রিপল হায়ালুরোনিক প্লাম্পিং ডিউ সিরাম",
    type: "serums",
    concern: "dryness",
    ingredient: "hyaluronic",
    brand: "AquaGlow",
    priceUSD: 32.0,
    priceBDT: 3600,
    wasUSD: 38.0,
    wasBDT: 4200,
    rating: 4.9,
    reviews: 156,
    badgeEn: "Bestseller",
    badgeBn: "বেস্টসেলার",
    isSale: true,
    inStock: true,
    tint: "bg-tint-1",
  },
  {
    id: 5,
    titleEn: "Overnight Retinol 0.3% Recovery Oil",
    titleBn: "ওভারনাইট রেটিনল ০.৩% রিকভারি অয়েল",
    type: "serums",
    concern: "fine-lines",
    ingredient: "retinol",
    brand: "DermaLuxe",
    priceUSD: 46.0,
    priceBDT: 5150,
    rating: 4.8,
    reviews: 64,
    badgeEn: "New",
    badgeBn: "নতুন",
    isSale: false,
    inStock: true,
    tint: "bg-tint-5",
  },
  {
    id: 6,
    titleEn: "Invisible Daily UV Shield SPF 50+",
    titleBn: "ইনভিজিবল ডেইলি ইউভি শিল্ড এসপিএফ ৫০+",
    type: "sunscreen",
    concern: "dullness",
    ingredient: "niacinamide",
    brand: "SolGuard",
    priceUSD: 26.0,
    priceBDT: 2950,
    rating: 4.9,
    reviews: 210,
    badgeEn: "Top Rated",
    badgeBn: "টপ রেটেড",
    isSale: false,
    inStock: true,
    tint: "bg-tint-3",
  },
];

export default function ShopPage() {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();

  // Filter States
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [addedItem, setAddedItem] = useState<number | null>(null);

  const handleToggle = (list: string[], setList: (val: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearAllFilters = () => {
    setSelectedTypes([]);
    setSelectedConcerns([]);
    setSelectedIngredients([]);
    setOnSaleOnly(false);
  };

  const filteredProducts = useMemo(() => {
    return shopCatalogue.filter((p) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
      if (selectedConcerns.length > 0 && !selectedConcerns.includes(p.concern)) return false;
      if (selectedIngredients.length > 0 && !selectedIngredients.includes(p.ingredient)) return false;
      if (onSaleOnly && !p.isSale) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceUSD - b.priceUSD;
      if (sortBy === "price-desc") return b.priceUSD - a.priceUSD;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [selectedTypes, selectedConcerns, selectedIngredients, onSaleOnly, sortBy]);

  const activeFilterCount =
    selectedTypes.length + selectedConcerns.length + selectedIngredients.length + (onSaleOnly ? 1 : 0);

  const handleQuickAdd = (id: number) => {
    setAddedItem(id);
    setTimeout(() => setAddedItem(null), 1800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Category Header Banner */}
        <section className="bg-blush-100 py-10 md:py-14 border-b border-line">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <nav aria-label="Breadcrumb" className="text-muted text-xs md:text-sm flex items-center gap-2 mb-4">
              <Link href="/" className="hover:text-rose transition-colors">
                {lang === "bn" ? "হোম" : "Home"}
              </Link>
              <span>/</span>
              <span className="text-ink font-semibold">{t.nav.shopAll}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-tight ${
                    lang === "bn" ? "font-anek" : "font-bricolage"
                  }`}
                >
                  {lang === "bn" ? (
                    <>
                      স্কিন<span className="text-rose">কেয়ার</span>
                    </>
                  ) : (
                    <>
                      Skin<span className="font-instrument italic text-rose">care</span>
                    </>
                  )}
                </h1>
                <p className="text-muted text-sm md:text-base mt-2">
                  {lang === "bn"
                    ? "ক্লিনজার, সিরাম ও ময়েশ্চারাইজার — আপনার ত্বকের জন্য কার্যকরী ও নির্ভরযোগ্য কালেকশন।"
                    : "Cleansers, serums, and moisturisers for every skin type — build a clean routine that works."}
                </p>
              </div>

              {/* Horizontal Category Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {["all", "cleansers", "serums", "moisturisers", "sunscreen"].map((typeKey) => {
                  const isActive =
                    typeKey === "all" ? selectedTypes.length === 0 : selectedTypes.includes(typeKey);
                  const labels: Record<string, { en: string; bn: string }> = {
                    all: { en: "All Skincare", bn: "সব স্কিনকেয়ার" },
                    cleansers: { en: "Cleansers", bn: "ক্লিনজার" },
                    serums: { en: "Serums", bn: "সিরাম" },
                    moisturisers: { en: "Moisturisers", bn: "ময়েশ্চারাইজার" },
                    sunscreen: { en: "Sunscreen", bn: "সানস্ক্রিন" },
                  };

                  return (
                    <button
                      key={typeKey}
                      type="button"
                      onClick={() => {
                        if (typeKey === "all") {
                          setSelectedTypes([]);
                        } else {
                          setSelectedTypes([typeKey]);
                        }
                      }}
                      className={`h-9 px-4 rounded-pill text-xs md:text-sm font-semibold transition-all border ${
                        isActive
                          ? "bg-ink text-white border-ink"
                          : "bg-white text-ink border-line hover:border-ink"
                      }`}
                    >
                      {lang === "bn" ? labels[typeKey].bn : labels[typeKey].en}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Shop Main Layout: Sidebar Filters + Products Grid */}
        <section className="py-10 md:py-14">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            {/* Top Filter Actions Bar (Mobile trigger & Sort) */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-line gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden h-10 px-4 rounded-pill border border-line bg-white font-semibold text-xs flex items-center gap-2 hover:border-ink transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4 text-rose" />
                  <span>{lang === "bn" ? "ফিল্টার" : "Filters"}</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose text-white text-[10px] flex items-center justify-center font-bold">
                      {lang === "bn" ? toBnDigits(activeFilterCount) : activeFilterCount}
                    </span>
                  )}
                </button>

                <p className="text-xs md:text-sm text-muted">
                  {lang === "bn" ? (
                    <>মোট <strong>{toBnDigits(filteredProducts.length)}</strong> টি পণ্য পাওয়া গেছে</>
                  ) : (
                    <>Showing <strong>{filteredProducts.length}</strong> products</>
                  )}
                </p>
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <span className="text-muted hidden sm:inline">{lang === "bn" ? "সাজান:" : "Sort by:"}</span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-10 pl-3 pr-8 rounded-pill bg-[#F8F1F3] border border-transparent font-medium text-ink text-xs md:text-sm outline-none appearance-none cursor-pointer focus:border-line-strong"
                  >
                    <option value="popular">{lang === "bn" ? "জনপ্রিয়তা" : "Most Popular"}</option>
                    <option value="rating">{lang === "bn" ? "সর্বোচ্চ রেটিং" : "Customer Rating"}</option>
                    <option value="price-asc">{lang === "bn" ? "দাম: কম থেকে বেশি" : "Price: Low to High"}</option>
                    <option value="price-desc">{lang === "bn" ? "দাম: বেশি থেকে কম" : "Price: High to Low"}</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-8 pb-4">
                <span className="text-xs font-bold text-muted uppercase tracking-wider mr-1">
                  {lang === "bn" ? "সক্রিয় ফিল্টার:" : "Active:"}
                </span>

                {selectedTypes.map((tKey) => (
                  <button
                    key={tKey}
                    type="button"
                    onClick={() => handleToggle(selectedTypes, setSelectedTypes, tKey)}
                    className="h-7 px-3 rounded-pill bg-blush-100 text-ink text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-light transition-colors"
                  >
                    <span className="capitalize">{tKey}</span>
                    <X className="w-3 h-3 text-muted" />
                  </button>
                ))}

                {selectedConcerns.map((cKey) => (
                  <button
                    key={cKey}
                    type="button"
                    onClick={() => handleToggle(selectedConcerns, setSelectedConcerns, cKey)}
                    className="h-7 px-3 rounded-pill bg-blush-100 text-ink text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-light transition-colors"
                  >
                    <span className="capitalize">{cKey}</span>
                    <X className="w-3 h-3 text-muted" />
                  </button>
                ))}

                {selectedIngredients.map((iKey) => (
                  <button
                    key={iKey}
                    type="button"
                    onClick={() => handleToggle(selectedIngredients, setSelectedIngredients, iKey)}
                    className="h-7 px-3 rounded-pill bg-blush-100 text-ink text-xs font-semibold flex items-center gap-1.5 hover:bg-rose-light transition-colors"
                  >
                    <span className="capitalize">{iKey}</span>
                    <X className="w-3 h-3 text-muted" />
                  </button>
                ))}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-xs font-semibold text-rose hover:underline ml-2"
                >
                  {lang === "bn" ? "সব মুছুন" : "Clear all"}
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Desktop Sidebar Filters */}
              <aside
                aria-label="Product filters"
                className="hidden lg:flex lg:col-span-3 flex-col gap-8 sticky top-28 bg-white"
              >
                <div className="flex items-center justify-between pb-3 border-b border-line">
                  <span className="font-bricolage text-lg font-bold text-ink flex items-center gap-2">
                    <Filter className="w-4 h-4 text-rose" />
                    <span>{lang === "bn" ? "ফিল্টার" : "Filters"}</span>
                  </span>
                  {activeFilterCount > 0 && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-xs font-semibold text-rose hover:underline"
                    >
                      {lang === "bn" ? "সব মুছুন" : "Clear all"}
                    </button>
                  )}
                </div>

                {/* Filter Block: Product Type */}
                <fieldset className="flex flex-col gap-3">
                  <legend className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                    {lang === "bn" ? "পণ্যের ধরন" : "Product Type"}
                  </legend>
                  {[
                    { key: "serums", labelEn: "Serums & Oils", labelBn: "সিরাম ও অয়েল" },
                    { key: "moisturisers", labelEn: "Moisturisers & Creams", labelBn: "ময়েশ্চারাইজার ও ক্রিম" },
                    { key: "cleansers", labelEn: "Cleansers", labelBn: "ক্লিনজার" },
                    { key: "sunscreen", labelEn: "Sunscreen / SPF", labelBn: "সানস্ক্রিন / এসপিএফ" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 text-sm text-ink cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(item.key)}
                        onChange={() => handleToggle(selectedTypes, setSelectedTypes, item.key)}
                        className="w-4 h-4 rounded text-rose accent-rose cursor-pointer"
                      />
                      <span>{lang === "bn" ? item.labelBn : item.labelEn}</span>
                    </label>
                  ))}
                </fieldset>

                {/* Filter Block: Skin Concern */}
                <fieldset className="flex flex-col gap-3 pt-6 border-t border-line">
                  <legend className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                    {lang === "bn" ? "ত্বকের সমস্যা" : "Skin Concern"}
                  </legend>
                  {[
                    { key: "dryness", labelEn: "Dryness & Dehydration", labelBn: "শুষ্ক ত্বক" },
                    { key: "dullness", labelEn: "Dullness & Uneven Tone", labelBn: "উজ্জ্বলতার অভাব" },
                    { key: "breakouts", labelEn: "Acne & Breakouts", labelBn: "ব্রণ ও দাগ" },
                    { key: "fine-lines", labelEn: "Fine Lines & Aging", labelBn: "বয়সের ছাপ প্রতিরোধ" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 text-sm text-ink cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedConcerns.includes(item.key)}
                        onChange={() => handleToggle(selectedConcerns, setSelectedConcerns, item.key)}
                        className="w-4 h-4 rounded text-rose accent-rose cursor-pointer"
                      />
                      <span>{lang === "bn" ? item.labelBn : item.labelEn}</span>
                    </label>
                  ))}
                </fieldset>

                {/* Filter Block: Key Ingredients */}
                <fieldset className="flex flex-col gap-3 pt-6 border-t border-line">
                  <legend className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                    {lang === "bn" ? "মূল উপাদান" : "Key Ingredients"}
                  </legend>
                  {[
                    { key: "niacinamide", label: "Niacinamide" },
                    { key: "hyaluronic", label: "Hyaluronic Acid" },
                    { key: "ceramides", label: "Ceramides" },
                    { key: "retinol", label: "Retinol" },
                    { key: "salicylic", label: "Salicylic Acid" },
                  ].map((item) => (
                    <label key={item.key} className="flex items-center gap-3 text-sm text-ink cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={selectedIngredients.includes(item.key)}
                        onChange={() => handleToggle(selectedIngredients, setSelectedIngredients, item.key)}
                        className="w-4 h-4 rounded text-rose accent-rose cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </fieldset>

                {/* Filter Block: Special Offers */}
                <div className="pt-6 border-t border-line">
                  <label className="flex items-center gap-3 text-sm text-ink cursor-pointer select-none font-semibold">
                    <input
                      type="checkbox"
                      checked={onSaleOnly}
                      onChange={(e) => setOnSaleOnly(e.target.checked)}
                      className="w-4 h-4 rounded text-rose accent-rose cursor-pointer"
                    />
                    <span className="text-rose">{lang === "bn" ? "শুধু স্পেশাল অফার" : "On Sale Only"}</span>
                  </label>
                </div>
              </aside>

              {/* Product Grid Area */}
              <div className="lg:col-span-9">
                {filteredProducts.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center justify-center bg-blush-50 rounded-card p-8 border border-line">
                    <Sparkles className="w-12 h-12 text-rose mb-3 opacity-60" />
                    <h3 className="font-bricolage text-xl font-bold text-ink mb-1">
                      {lang === "bn" ? "কোনো পণ্য খুঁজে পাওয়া যায়নি" : "No matching products found"}
                    </h3>
                    <p className="text-muted text-sm max-w-sm mb-5">
                      {lang === "bn"
                        ? "আপনার ফিল্টারের সাথে মিলে এমন কোনো পণ্য মেলেনি। ফিল্টার রিসেট করে আবার দেখুন।"
                        : "Try adjusting your filters or search criteria to explore more items."}
                    </p>
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="h-11 px-6 rounded-pill bg-ink text-white font-semibold text-xs hover:bg-rose transition-colors"
                    >
                      {lang === "bn" ? "সব ফিল্টার সরান" : "Reset All Filters"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((p) => {
                      const title = lang === "bn" ? p.titleBn : p.titleEn;
                      const badge = lang === "bn" ? p.badgeBn : p.badgeEn;
                      const ratingFormatted = lang === "bn" ? toBnDigits(p.rating) : p.rating;
                      const reviewsFormatted = lang === "bn" ? toBnDigits(p.reviews) : p.reviews;

                      return (
                        <article
                          key={p.id}
                          className="group bg-white rounded-card p-4 border border-line hover:border-line-strong hover:shadow-card transition-all flex flex-col justify-between"
                        >
                          <div>
                            {/* Image Container */}
                            <div
                              className={`relative w-full aspect-[4/5] rounded-[20px] ${p.tint} p-4 flex items-center justify-center overflow-hidden mb-4`}
                            >
                              {badge && (
                                <span
                                  className={`absolute left-3 top-3 px-2.5 py-1 rounded-pill text-xs font-bold shadow-sm ${
                                    p.isSale ? "bg-rose text-white" : "bg-white text-ink"
                                  }`}
                                >
                                  {badge}
                                </span>
                              )}

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
                              <span className="capitalize">{p.type}</span>
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
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile Filter Bottom Sheet Dialog */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end lg:hidden bg-ink/50 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-h-[85vh] bg-white rounded-t-card-lg p-6 overflow-y-auto flex flex-col gap-6 shadow-modal">
            <div className="flex items-center justify-between pb-4 border-b border-line">
              <span className="font-bricolage text-xl font-bold text-ink">
                {lang === "bn" ? "ফিল্টার করুন" : "Filter Products"}
              </span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 rounded-full hover:bg-blush-100 text-ink"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product Type Filter */}
            <fieldset className="flex flex-col gap-3">
              <legend className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                {lang === "bn" ? "পণ্যের ধরন" : "Product Type"}
              </legend>
              {[
                { key: "serums", labelEn: "Serums & Oils", labelBn: "সিরাম ও অয়েল" },
                { key: "moisturisers", labelEn: "Moisturisers & Creams", labelBn: "ময়েশ্চারাইজার ও ক্রিম" },
                { key: "cleansers", labelEn: "Cleansers", labelBn: "ক্লিনজার" },
                { key: "sunscreen", labelEn: "Sunscreen / SPF", labelBn: "সানস্ক্রিন / এসপিএফ" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 text-sm text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(item.key)}
                    onChange={() => handleToggle(selectedTypes, setSelectedTypes, item.key)}
                    className="w-4 h-4 rounded text-rose accent-rose"
                  />
                  <span>{lang === "bn" ? item.labelBn : item.labelEn}</span>
                </label>
              ))}
            </fieldset>

            {/* Skin Concern Filter */}
            <fieldset className="flex flex-col gap-3 pt-4 border-t border-line">
              <legend className="font-bold text-xs uppercase tracking-wider text-muted mb-2">
                {lang === "bn" ? "ত্বকের সমস্যা" : "Skin Concern"}
              </legend>
              {[
                { key: "dryness", labelEn: "Dryness & Dehydration", labelBn: "শুষ্ক ত্বক" },
                { key: "dullness", labelEn: "Dullness & Uneven Tone", labelBn: "উজ্জ্বলতার অভাব" },
                { key: "breakouts", labelEn: "Acne & Breakouts", labelBn: "ব্রণ ও দাগ" },
                { key: "fine-lines", labelEn: "Fine Lines & Aging", labelBn: "বয়সের ছাপ প্রতিরোধ" },
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3 text-sm text-ink cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedConcerns.includes(item.key)}
                    onChange={() => handleToggle(selectedConcerns, setSelectedConcerns, item.key)}
                    className="w-4 h-4 rounded text-rose accent-rose"
                  />
                  <span>{lang === "bn" ? item.labelBn : item.labelEn}</span>
                </label>
              ))}
            </fieldset>

            {/* Apply & Reset Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-line mt-auto">
              <button
                type="button"
                onClick={clearAllFilters}
                className="h-12 px-5 rounded-pill border border-line text-ink font-semibold text-xs hover:border-ink"
              >
                {lang === "bn" ? "রিসেট" : "Reset"}
              </button>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 h-12 rounded-pill bg-ink text-white font-semibold text-xs hover:bg-rose transition-colors"
              >
                {lang === "bn"
                  ? `ফলাফল দেখুন (${toBnDigits(filteredProducts.length)})`
                  : `Show Results (${filteredProducts.length})`}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
