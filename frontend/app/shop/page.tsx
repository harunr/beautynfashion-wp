"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  X,
  Star,
  Plus,
  Check,
  SlidersHorizontal,
  Heart,
  Search,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { PRODUCTS, CATEGORIES, Product } from "@/lib/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("q") || "";

  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [saleOnly, setSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "rating">("featured");
  const [searchFilter, setSearchFilter] = useState<string>(initialQuery);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [addedItemId, setAddedItemId] = useState<number | null>(null);

  const brands = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(p.brand));
    return Array.from(set);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory !== "all" && p.categorySlug !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== "all" && p.brand !== selectedBrand) {
        return false;
      }
      // In-stock toggle
      if (inStockOnly && !p.inStock) {
        return false;
      }
      // Sale toggle
      if (saleOnly && !p.isSale) {
        return false;
      }
      // Search filter
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase().trim();
        const matchesEn = p.titleEn.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
        const matchesBn = p.titleBn.includes(q) || p.categoryBn.includes(q);
        if (!matchesEn && !matchesBn) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceUSD - b.priceUSD;
      if (sortBy === "price-desc") return b.priceUSD - a.priceUSD;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // "featured" keeps catalog order
    });
  }, [selectedCategory, selectedBrand, inStockOnly, saleOnly, sortBy, searchFilter]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 1800);
  };

  const clearAllFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setInStockOnly(false);
    setSaleOnly(false);
    setSearchFilter("");
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedBrand !== "all" ||
    inStockOnly ||
    saleOnly ||
    searchFilter.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* ================= HERO HEADER ================= */}
        <section className="bg-blush-50 py-10 md:py-14 border-b border-line">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="flex flex-col gap-3">
              {/* Breadcrumb */}
              <div className="text-xs text-muted flex items-center gap-2">
                <Link href="/" className="hover:text-rose transition-colors">
                  {lang === "bn" ? "হোম" : "Home"}
                </Link>
                <span>/</span>
                <span className="font-semibold text-ink">
                  {lang === "bn" ? "সকল পণ্য" : "All Products"}
                </span>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1
                    className={`text-3xl md:text-4xl lg:text-5xl font-bold text-ink ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {lang === "bn" ? "বিউটি ও স্কিনকেয়ার শপ" : "The Beauty & Wellness Store"}
                  </h1>
                  <p className="text-muted text-sm md:text-base mt-2 max-w-2xl">
                    {lang === "bn"
                      ? "ডার্মাটোলজিস্ট টেস্টেড, ১০০% খাঁটি ও প্রিমিয়াম উপাদানযুক্ত বিউটি কালেকশন।"
                      : "Clinically formulated, 100% authentic multi-brand beauty, skincare, and fragrances."}
                  </p>
                </div>

                <div className="text-sm font-semibold text-muted bg-white px-4 py-2 rounded-pill border border-line shadow-sm shrink-0 self-start md:self-auto">
                  {lang === "bn"
                    ? `${toBnDigits(filteredProducts.length)} টি পণ্য পাওয়া গেছে`
                    : `Showing ${filteredProducts.length} items`}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CATEGORY QUICK FILTER TABS ================= */}
        <section className="border-b border-line bg-white sticky top-[74px] md:top-[84px] z-30 shadow-xs">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`h-9 px-4 rounded-pill text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                  selectedCategory === "all"
                    ? "bg-ink text-white shadow-sm"
                    : "bg-[#F8F1F3] text-muted hover:text-ink"
                }`}
              >
                {lang === "bn" ? "সকল পণ্য" : "All Products"}
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`h-9 px-4 rounded-pill text-xs md:text-sm font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.slug
                      ? "bg-rose text-white shadow-sm"
                      : "bg-[#F8F1F3] text-muted hover:text-ink"
                  }`}
                >
                  {lang === "bn" ? cat.nameBn : cat.nameEn}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CATALOGUE LAYOUT ================= */}
        <section className="py-10 md:py-16">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            {/* Top Toolbar (Filter Trigger on Mobile + Sort by Dropdown) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden h-10 px-4 rounded-pill bg-[#F8F1F3] border border-line text-ink font-semibold text-xs flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "ফিল্টার" : "Filters"}</span>
                  {hasActiveFilters && (
                    <span className="w-2 h-2 rounded-full bg-rose" />
                  )}
                </button>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="text-xs text-rose font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>{lang === "bn" ? "সব ফিল্টার মুছুন" : "Clear filters"}</span>
                  </button>
                )}
              </div>

              {/* Sort By Select */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-muted hidden sm:inline">
                  {lang === "bn" ? "সাজান:" : "Sort by:"}
                </span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "featured" | "price-asc" | "price-desc" | "rating"
                    )
                  }
                  className="h-10 px-3.5 rounded-pill bg-[#F8F1F3] border border-line text-xs font-bold text-ink outline-none cursor-pointer"
                >
                  <option value="featured">
                    {lang === "bn" ? "সেরা পছন্দ (Featured)" : "Featured"}
                  </option>
                  <option value="price-asc">
                    {lang === "bn" ? "দাম: কম থেকে বেশি" : "Price: Low to High"}
                  </option>
                  <option value="price-desc">
                    {lang === "bn" ? "দাম: বেশি থেকে কম" : "Price: High to Low"}
                  </option>
                  <option value="rating">
                    {lang === "bn" ? "সেরা রেটিং (Highest Rated)" : "Highest Rated"}
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* ================= DESKTOP SIDEBAR FILTERS ================= */}
              <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-card border border-line sticky top-36">
                <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                  <h3 className="font-bold text-base text-ink font-bricolage flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-rose" />
                    <span>{lang === "bn" ? "ফিল্টার" : "Filter Products"}</span>
                  </h3>
                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="text-xs text-rose font-bold hover:underline"
                    >
                      {lang === "bn" ? "রিসেট" : "Reset"}
                    </button>
                  )}
                </div>

                {/* Brands Filter */}
                <div className="mb-6">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
                    {lang === "bn" ? "ব্র্যান্ড" : "Brand"}
                  </h4>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
                      <input
                        type="radio"
                        name="brand"
                        checked={selectedBrand === "all"}
                        onChange={() => setSelectedBrand("all")}
                        className="text-rose focus:ring-rose"
                      />
                      <span>{lang === "bn" ? "সকল ব্র্যান্ড" : "All Brands"}</span>
                    </label>
                    {brands.map((b) => (
                      <label key={b} className="flex items-center gap-2.5 text-xs text-ink cursor-pointer">
                        <input
                          type="radio"
                          name="brand"
                          checked={selectedBrand === b}
                          onChange={() => setSelectedBrand(b)}
                          className="text-rose focus:ring-rose"
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Toggles: In-stock & Sale */}
                <div className="pt-4 border-t border-line flex flex-col gap-3">
                  <label className="flex items-center justify-between text-xs font-semibold text-ink cursor-pointer">
                    <span>{lang === "bn" ? "কেবল ডিসকাউন্ট অফার" : "Special Offers Only"}</span>
                    <input
                      type="checkbox"
                      checked={saleOnly}
                      onChange={(e) => setSaleOnly(e.target.checked)}
                      className="rounded text-rose focus:ring-rose w-4 h-4"
                    />
                  </label>

                  <label className="flex items-center justify-between text-xs font-semibold text-ink cursor-pointer">
                    <span>{lang === "bn" ? "কেবল স্টকে থাকা পণ্য" : "In Stock Only"}</span>
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      className="rounded text-rose focus:ring-rose w-4 h-4"
                    />
                  </label>
                </div>
              </aside>

              {/* ================= PRODUCT GRID ================= */}
              <div className="lg:col-span-9">
                {filteredProducts.length === 0 ? (
                  <div className="bg-blush-50/60 rounded-card p-12 text-center border border-line flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-rose shadow-sm">
                      <Search className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-ink">
                        {lang === "bn" ? "কোনো পণ্য পাওয়া যায়নি" : "No products match your criteria"}
                      </h3>
                      <p className="text-muted text-xs md:text-sm mt-1 max-w-md">
                        {lang === "bn"
                          ? "ফিল্টার পরিবর্তন করুন অথবা সব ফিল্টার রিসেট করে পুনরায় চেষ্টা করুন।"
                          : "Try adjusting or clearing your filters to explore our full product catalog."}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearAllFilters}
                      className="px-6 py-2.5 rounded-pill bg-ink text-white font-bold text-xs hover:bg-rose transition-colors"
                    >
                      {lang === "bn" ? "সব ফিল্টার মুছুন" : "Reset All Filters"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredProducts.map((p) => {
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
                                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= MOBILE FILTER MODAL ================= */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-line flex items-center justify-between bg-blush-50">
              <h3 className="font-bold text-base text-ink">
                {lang === "bn" ? "ফিল্টার অপশন" : "Filters"}
              </h3>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center border border-line"
              >
                <X className="w-4 h-4 text-ink" />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto flex flex-col gap-6">
              {/* Categories */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
                  {lang === "bn" ? "ক্যাটাগরি" : "Category"}
                </h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-xs text-ink">
                    <input
                      type="radio"
                      name="m-cat"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="text-rose focus:ring-rose"
                    />
                    <span>{lang === "bn" ? "সকল ক্যাটাগরি" : "All Categories"}</span>
                  </label>
                  {CATEGORIES.map((cat) => (
                    <label key={cat.slug} className="flex items-center gap-2 text-xs text-ink">
                      <input
                        type="radio"
                        name="m-cat"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="text-rose focus:ring-rose"
                      />
                      <span>{lang === "bn" ? cat.nameBn : cat.nameEn}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-muted mb-3">
                  {lang === "bn" ? "ব্র্যান্ড" : "Brand"}
                </h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-xs text-ink">
                    <input
                      type="radio"
                      name="m-brand"
                      checked={selectedBrand === "all"}
                      onChange={() => setSelectedBrand("all")}
                      className="text-rose focus:ring-rose"
                    />
                    <span>{lang === "bn" ? "সকল ব্র্যান্ড" : "All Brands"}</span>
                  </label>
                  {brands.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-xs text-ink">
                      <input
                        type="radio"
                        name="m-brand"
                        checked={selectedBrand === b}
                        onChange={() => setSelectedBrand(b)}
                        className="text-rose focus:ring-rose"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-4 border-t border-line flex flex-col gap-3">
                <label className="flex items-center justify-between text-xs font-semibold text-ink">
                  <span>{lang === "bn" ? "কেবল ডিসকাউন্ট অফার" : "Special Offers Only"}</span>
                  <input
                    type="checkbox"
                    checked={saleOnly}
                    onChange={(e) => setSaleOnly(e.target.checked)}
                    className="rounded text-rose focus:ring-rose w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between text-xs font-semibold text-ink">
                  <span>{lang === "bn" ? "কেবল স্টকে থাকা পণ্য" : "In Stock Only"}</span>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-rose focus:ring-rose w-4 h-4"
                  />
                </label>
              </div>
            </div>

            <div className="p-4 border-t border-line bg-white">
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full h-11 rounded-pill bg-ink text-white font-bold text-xs"
              >
                {lang === "bn"
                  ? `${toBnDigits(filteredProducts.length)} টি পণ্য দেখুন`
                  : `Show ${filteredProducts.length} Results`}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ShopContent />
    </Suspense>
  );
}
