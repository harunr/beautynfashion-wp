"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Star,
  Plus,
  Check,
  Heart,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import {
  CATEGORIES,
  getProductsByCategory,
  Product,
} from "@/lib/data/products";
import { getBreadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [addedItemId, setAddedItemId] = useState<number | null>(null);

  const category = CATEGORIES.find((c) => c.slug === params.slug);
  const products = getProductsByCategory(params.slug);

  const catName = category
    ? lang === "bn"
      ? category.nameBn
      : category.nameEn
    : params.slug;

  const catDesc = category
    ? lang === "bn"
      ? category.descriptionBn
      : category.descriptionEn
    : "";

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 1800);
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: category?.nameEn || "Category", item: `/category/${params.slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <JsonLd data={breadcrumbSchema} />
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* ================= CATEGORY HERO BANNER ================= */}
        <section className="relative bg-blush-100 py-12 md:py-20 border-b border-line overflow-hidden">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Content */}
              <div className="md:col-span-8 flex flex-col gap-3">
                {/* Breadcrumbs */}
                <div className="text-xs text-muted flex items-center gap-2 mb-1">
                  <Link href="/" className="hover:text-rose transition-colors">
                    {lang === "bn" ? "হোম" : "Home"}
                  </Link>
                  <span>/</span>
                  <Link href="/shop" className="hover:text-rose transition-colors">
                    {lang === "bn" ? "শপ" : "Shop"}
                  </Link>
                  <span>/</span>
                  <span className="font-semibold text-ink">{catName}</span>
                </div>

                <h1
                  className={`text-3xl sm:text-4xl md:text-5xl font-bold text-ink ${
                    lang === "bn" ? "font-anek" : "font-bricolage"
                  }`}
                >
                  {catName}
                </h1>

                <p className="text-muted text-sm md:text-base max-w-xl leading-relaxed">
                  {catDesc}
                </p>

                <div className="pt-2 flex items-center gap-3 text-xs font-semibold text-ink">
                  <span className="px-3 py-1 rounded-pill bg-white border border-line shadow-sm">
                    {lang === "bn"
                      ? `${toBnDigits(products.length)} টি পণ্য উপলব্ধ`
                      : `${products.length} Products Available`}
                  </span>
                  <span className="text-rose font-bold">100% Genuine Imported Brands</span>
                </div>
              </div>

              {/* Right Photographic Badge */}
              {category && (
                <div className="md:col-span-4 flex justify-center md:justify-end">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-card border-4 border-white bg-blush-200">
                    <Image
                      src={category.image}
                      alt={category.nameEn}
                      fill
                      sizes="180px"
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ================= CATEGORY SWITCHER PILLS ================= */}
        <section className="border-b border-line bg-white sticky top-[74px] md:top-[84px] z-30 shadow-xs">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
              <Link
                href="/shop"
                className="h-8 sm:h-9 px-4 rounded-pill text-xs font-bold whitespace-nowrap bg-[#F8F1F3] text-muted hover:text-ink transition-colors inline-flex items-center"
              >
                {lang === "bn" ? "সব দেখুন" : "View All"}
              </Link>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className={`h-8 sm:h-9 px-4 rounded-pill text-xs font-bold whitespace-nowrap transition-all inline-flex items-center ${
                    c.slug === params.slug
                      ? "bg-ink text-white shadow-sm"
                      : "bg-[#F8F1F3] text-muted hover:text-ink"
                  }`}
                >
                  {lang === "bn" ? c.nameBn : c.nameEn}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ================= PRODUCT GRID ================= */}
        <section className="py-12 md:py-16">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            {products.length === 0 ? (
              <div className="bg-blush-50/60 rounded-card p-12 text-center border border-line flex flex-col items-center justify-center gap-4">
                <Sparkles className="w-12 h-12 text-rose" />
                <h3 className="font-bold text-lg text-ink">
                  {lang === "bn" ? "এই ক্যাটাগরিতে নতুন পণ্য যুক্ত হচ্ছে" : "New items arriving soon in this category"}
                </h3>
                <p className="text-muted text-xs md:text-sm max-w-md">
                  {lang === "bn"
                    ? "আমাদের কিউরেটর দল নিয়মিত নতুন আন্তর্জাতিক প্রসাধন সামগ্রী যুক্ত করছেন।"
                    : "Our international beauty team is constantly curating fresh arrivals. Explore our other popular categories!"}
                </p>
                <Link
                  href="/shop"
                  className="px-6 py-2.5 rounded-pill bg-ink text-white font-bold text-xs hover:bg-rose transition-colors"
                >
                  {lang === "bn" ? "সকল পণ্য দেখুন" : "Explore All Products"}
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p) => {
                  const title = lang === "bn" ? p.titleBn : p.titleEn;
                  const categoryName = lang === "bn" ? p.categoryBn : p.categoryEn;
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

                          {/* Badge */}
                          {badge && (
                            <span
                              className={`absolute left-3 top-3 px-2.5 py-1 rounded-pill text-xs font-bold shadow-sm ${
                                p.isSale ? "bg-rose text-white" : "bg-white/95 text-ink"
                              }`}
                            >
                              {badge}
                            </span>
                          )}

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
                          <span>{categoryName}</span>
                        </div>

                        {/* Title */}
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
        </section>
      </main>

      <Footer />
    </div>
  );
}
