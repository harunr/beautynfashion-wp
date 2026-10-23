"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Trash2,
  Star,
  Check,
  ArrowRight,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { getProductById, Product } from "@/lib/data/products";

export default function WishlistPage() {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const { wishlistIds, toggleWishlist, addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState<number | null>(null);

  const wishlistedProducts = wishlistIds
    .map((id) => getProductById(id))
    .filter(Boolean) as Product[];

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

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted mb-4">
            <Link href="/" className="hover:text-rose transition-colors">
              {lang === "bn" ? "হোম" : "Home"}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">
              {lang === "bn" ? "পছন্দের তালিকা" : "Wishlist"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8">
            <div>
              <h1
                className={`text-3xl md:text-4xl font-bold text-ink ${
                  lang === "bn" ? "font-anek" : "font-bricolage"
                }`}
              >
                {lang === "bn" ? "আপনার পছন্দের তালিকা" : "Your Saved Wishlist"}
              </h1>
              <p className="text-muted text-sm mt-1">
                {lang === "bn"
                  ? "পছন্দের বিউটি প্রোডাক্টগুলো সংরক্ষণ করুন এবং যেকোনো সময় ব্যাগে যোগ করুন।"
                  : "Keep track of your favorite skincare rituals and save them for later."}
              </p>
            </div>

            <span className="text-sm font-semibold text-muted bg-blush-50 px-4 py-2 rounded-pill border border-line">
              {lang === "bn"
                ? `${toBnDigits(wishlistedProducts.length)} টি পণ্য সংরক্ষিত`
                : `${wishlistedProducts.length} items saved`}
            </span>
          </div>

          {wishlistedProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-blush-50/50 rounded-card-lg p-12 md:p-16 text-center border border-line flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
              <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm text-rose">
                <Heart className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-ink mb-1">
                  {lang === "bn" ? "আপনার পছন্দের তালিকা খালি" : "Your wishlist is empty"}
                </h2>
                <p className="text-muted text-sm max-w-sm">
                  {lang === "bn"
                    ? "যেকোনো পণ্যের ওপর হার্ট আইকন ক্লিক করে সহজেই এখানে সেভ করে রাখতে পারবেন।"
                    : "Tap the heart icon on any product to save it here for later."}
                </p>
              </div>
              <Link
                href="/shop"
                className="mt-2 px-8 py-3 rounded-pill bg-ink text-white font-bold text-sm hover:bg-rose transition-colors shadow-pill inline-flex items-center gap-2"
              >
                <span>{lang === "bn" ? "পণ্য দেখুন" : "Explore Collections"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistedProducts.map((p) => {
                const title = lang === "bn" ? p.titleBn : p.titleEn;
                const category = lang === "bn" ? p.categoryBn : p.categoryEn;
                const badge = lang === "bn" ? p.badgeBn : p.badgeEn;
                const ratingFormatted = lang === "bn" ? toBnDigits(p.rating) : p.rating;
                const reviewsFormatted = lang === "bn" ? toBnDigits(p.reviewsCount) : p.reviewsCount;

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

                        {/* Remove from Wishlist Button */}
                        <button
                          type="button"
                          onClick={() => toggleWishlist(p.id)}
                          aria-label="Remove from wishlist"
                          className="absolute right-3 top-3 w-8 h-8 rounded-full bg-white text-rose shadow-sm flex items-center justify-center hover:bg-rose hover:text-white transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
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

                    {/* Move to Bag CTA */}
                    <div className="pt-3 border-t border-line/60 flex flex-col gap-2">
                      <div className="flex items-baseline justify-between">
                        <span className="font-bold text-base md:text-lg text-ink font-bricolage">
                          {formatPrice(p.priceUSD, p.priceBDT)}
                        </span>
                        {p.wasUSD && (
                          <span className="text-strike text-xs line-through">
                            {formatPrice(p.wasUSD, p.wasBDT)}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(p, e)}
                        className="w-full h-10 rounded-pill bg-ink hover:bg-rose text-white font-bold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-sm"
                      >
                        {addedItemId === p.id ? (
                          <>
                            <Check className="w-4 h-4 text-success" />
                            <span>{lang === "bn" ? "যোগ করা হয়েছে!" : "Added!"}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>{lang === "bn" ? "ব্যাগে যোগ করুন" : "Move to Bag"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
