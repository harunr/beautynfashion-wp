"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ShieldCheck,
  Truck,
  Heart,
  ChevronDown,
  Sparkles,
  Check,
  Plus,
  Minus,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import {
  getProductById,
  getProductBySlug,
  getRelatedProducts,
  PRODUCTS,
} from "@/lib/data/products";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Find product by slug or id, fallback to product #11
  const rawProduct =
    getProductBySlug(params.id) ||
    getProductById(params.id) ||
    PRODUCTS[0];

  const product = rawProduct;

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [selectedShade, setSelectedShade] = useState<string | undefined>(
    product.shades?.[0]?.nameEn
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Accordion state
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    howToUse: false,
    ingredients: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isWishlisted = isInWishlist(product.id);

  // Price adjustment if size is larger
  const isLargeSize = selectedSize?.includes("50ml") || selectedSize?.includes("100ml");
  const priceUSD = isLargeSize ? product.priceUSD * 1.35 : product.priceUSD;
  const priceBDT = isLargeSize ? Math.round(product.priceBDT * 1.35) : product.priceBDT;
  const wasUSD = product.wasUSD
    ? isLargeSize
      ? product.wasUSD * 1.35
      : product.wasUSD
    : undefined;
  const wasBDT = product.wasBDT
    ? isLargeSize
      ? Math.round(product.wasBDT * 1.35)
      : product.wasBDT
    : undefined;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedShade);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const relatedProducts = getRelatedProducts(product.id, product.categorySlug, 4);

  const title = lang === "bn" ? product.titleBn : product.titleEn;
  const categoryTitle = lang === "bn" ? product.categoryBn : product.categoryEn;
  const ratingFormatted = lang === "bn" ? toBnDigits(product.rating) : product.rating;
  const reviewsFormatted = lang === "bn" ? toBnDigits(product.reviewsCount) : product.reviewsCount;
  const stockFormatted = lang === "bn" ? toBnDigits(product.stockQuantity) : product.stockQuantity;

  // SEO Schemas
  const productSchema = getProductSchema({
    id: product.id,
    name: product.titleEn,
    description: product.descriptionEn,
    price: product.priceUSD,
    regularPrice: product.wasUSD,
    sku: product.sku,
    category: product.categoryEn,
    rating: product.rating,
    reviewCount: product.reviewsCount,
    inStock: product.inStock,
    images: product.images.map((img) => img.src),
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: product.categoryEn, item: `/category/${product.categorySlug}` },
    { name: product.titleEn, item: `/product/${product.slug || product.id}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* ================= BREADCRUMBS ================= */}
        <nav
          aria-label="Breadcrumbs"
          className="bg-blush-50/70 border-b border-line py-3 text-xs"
        >
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14 flex items-center gap-2 text-muted">
            <Link href="/" className="hover:text-rose transition-colors">
              {lang === "bn" ? "হোম" : "Home"}
            </Link>
            <span>/</span>
            <Link
              href={`/category/${product.categorySlug}`}
              className="hover:text-rose transition-colors"
            >
              {categoryTitle}
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink line-clamp-1 max-w-xs sm:max-w-md">
              {title}
            </span>
          </div>
        </nav>

        {/* ================= MAIN PRODUCT DETAIL ================= */}
        <section className="py-10 md:py-16">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* ================= LEFT: IMAGE GALLERY ================= */}
              <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
                {/* Thumbnails */}
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 pb-2 sm:pb-0">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-card overflow-hidden bg-blush-100 transition-all border-2 ${
                        activeImageIdx === idx
                          ? "border-rose shadow-sm"
                          : "border-line opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Hero Image */}
                <div className="relative flex-1 aspect-[4/5] rounded-card-lg overflow-hidden bg-blush-100 border border-line shadow-card">
                  {product.images[activeImageIdx] && (
                    <Image
                      src={product.images[activeImageIdx].src}
                      alt={product.images[activeImageIdx].alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}

                  {/* Badge */}
                  {product.badgeEn && (
                    <span
                      className={`absolute left-4 top-4 px-3 py-1.5 rounded-pill text-xs font-bold shadow-sm ${
                        product.isSale ? "bg-rose text-white" : "bg-white/95 text-ink"
                      }`}
                    >
                      {lang === "bn" ? product.badgeBn : product.badgeEn}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    className="absolute right-4 top-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-ink shadow-md flex items-center justify-center transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-rose text-rose" : "text-muted"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* ================= RIGHT: PRODUCT DETAILS & BUY BOX ================= */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                {/* Brand & Category */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted mb-2">
                    <span className="text-rose">{product.brand}</span>
                    <span>SKU: {product.sku}</span>
                  </div>

                  <h1
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold text-ink leading-tight ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {title}
                  </h1>

                  {/* Rating & Stock */}
                  <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center text-rose">
                        <Star className="w-4 h-4 fill-rose" />
                        <Star className="w-4 h-4 fill-rose" />
                        <Star className="w-4 h-4 fill-rose" />
                        <Star className="w-4 h-4 fill-rose" />
                        <Star className="w-4 h-4 fill-rose" />
                      </div>
                      <span className="font-bold text-ink">{ratingFormatted}</span>
                      <span className="text-muted">
                        ({reviewsFormatted} {t.products.reviews})
                      </span>
                    </div>

                    <span className="text-line">•</span>

                    <span className="font-bold text-success flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      {lang === "bn"
                        ? `স্টকে আছে (আর মাত্র ${stockFormatted} টি)`
                        : `In Stock (${stockFormatted} left)`}
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 py-3 border-y border-line">
                  <span className="text-3xl sm:text-4xl font-bold text-ink font-bricolage">
                    {formatPrice(priceUSD, priceBDT)}
                  </span>
                  {wasUSD && (
                    <span className="text-lg text-strike line-through">
                      {formatPrice(wasUSD, wasBDT)}
                    </span>
                  )}
                  {product.isSale && (
                    <span className="px-2.5 py-1 rounded-pill bg-rose/10 text-rose font-bold text-xs">
                      {lang === "bn" ? "বিশেষ অফার" : "Special Offer"}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-muted text-sm leading-relaxed">
                  {lang === "bn" ? product.shortDescBn : product.shortDescEn}
                </p>

                {/* Key Tags */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-pill bg-blush-50 border border-line text-xs font-medium text-ink"
                    >
                      {lang === "bn" ? tag.bn : tag.en}
                    </span>
                  ))}
                </div>

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-2">
                      {lang === "bn" ? "সাইজ নির্বাচন করুন:" : "Select Size:"}
                    </label>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`h-10 px-4 rounded-pill text-xs font-bold border transition-all ${
                            selectedSize === size
                              ? "bg-ink text-white border-ink shadow-sm"
                              : "bg-white text-ink border-line hover:border-line-strong"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shade Selector */}
                {product.shades && product.shades.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold uppercase tracking-wider text-ink">
                        {lang === "bn" ? "শেড:" : "Shade:"}
                      </span>
                      <span className="font-medium text-muted">
                        {lang === "bn"
                          ? product.shades.find((s) => s.nameEn === selectedShade)?.nameBn
                          : selectedShade}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      {product.shades.map((shade) => (
                        <button
                          key={shade.nameEn}
                          type="button"
                          onClick={() => setSelectedShade(shade.nameEn)}
                          aria-label={shade.nameEn}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                            selectedShade === shade.nameEn
                              ? "ring-2 ring-ink ring-offset-2 scale-110"
                              : "opacity-80 hover:opacity-100"
                          }`}
                          style={{ backgroundColor: shade.color }}
                        >
                          {selectedShade === shade.nameEn && (
                            <Check className="w-4 h-4 text-white drop-shadow" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Bag CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {/* Quantity Counter */}
                  <div className="inline-flex items-center border border-line rounded-pill bg-white h-13 px-2 self-start sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-9 h-9 flex items-center justify-center hover:bg-blush-100 rounded-full text-ink transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-ink">
                      {lang === "bn" ? toBnDigits(quantity) : quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="w-9 h-9 flex items-center justify-center hover:bg-blush-100 rounded-full text-ink transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 h-13 rounded-pill bg-ink text-white hover:bg-rose transition-all font-bold text-sm md:text-base inline-flex items-center justify-center gap-2 shadow-pill"
                  >
                    {addedSuccess ? (
                      <>
                        <Check className="w-5 h-5 text-success" />
                        <span>{lang === "bn" ? "ব্যাগে যোগ করা হয়েছে!" : "Added to Bag!"}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>{lang === "bn" ? "ব্যাগে যোগ করুন" : "Add to Bag"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Fast Delivery & Trust Highlights */}
                <div className="p-4 rounded-card bg-blush-50/70 border border-line flex flex-col gap-2.5 text-xs">
                  <div className="flex items-center gap-2.5 text-ink font-semibold">
                    <Truck className="w-4 h-4 text-rose shrink-0" />
                    <span>
                      {lang === "bn"
                        ? "ঢাকার ভেতরে ২৪-৪৮ ঘণ্টায় ও বাইরে ৩-৪ দিনে ডেলিভারি"
                        : "Fast Delivery: 24-48h in Dhaka, 3-4 days nationwide"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-ink font-semibold">
                    <ShieldCheck className="w-4 h-4 text-rose shrink-0" />
                    <span>
                      {lang === "bn"
                        ? "১০০% খাঁটি পণ্য ও ক্যাশ অন ডেলিভারি সুবিধা"
                        : "100% Authentic Guarantee & Cash on Delivery"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-ink font-semibold">
                    <RotateCcw className="w-4 h-4 text-rose shrink-0" />
                    <span>
                      {lang === "bn"
                        ? "৭ দিনের সহজ রিটার্ন ও পরিবর্তন সুবিধা"
                        : "7-Day Hassle-Free Exchange Policy"}
                    </span>
                  </div>
                </div>

                {/* ================= ACCORDIONS ================= */}
                <div className="border-t border-line divide-y divide-line pt-2">
                  {/* Accordion 1: Details */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("details")}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-ink"
                    >
                      <span>{lang === "bn" ? "উপাদান ও বিবরণ" : "Formula Details & Benefits"}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform ${
                          openAccordions.details ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.details && (
                      <div className="pt-3 text-xs text-muted leading-relaxed flex flex-col gap-2">
                        <p>{lang === "bn" ? product.descriptionBn : product.descriptionEn}</p>
                        <p>{lang === "bn" ? product.detailsBn : product.detailsEn}</p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 2: How to Use */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("howToUse")}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-ink"
                    >
                      <span>{lang === "bn" ? "ব্যবহারবিধি (How to Use)" : "How to Apply"}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform ${
                          openAccordions.howToUse ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.howToUse && (
                      <div className="pt-3 text-xs text-muted leading-relaxed">
                        <p>{lang === "bn" ? product.howToUseBn : product.howToUseEn}</p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 3: Full Ingredients */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("ingredients")}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-ink"
                    >
                      <span>{lang === "bn" ? "সম্পূর্ণ উপাদান তালিকা" : "Full Ingredients (INCI)"}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform ${
                          openAccordions.ingredients ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.ingredients && (
                      <div className="pt-3 text-xs text-muted leading-relaxed font-mono bg-blush-50/50 p-3 rounded-card">
                        <p>{product.ingredientsEn}</p>
                      </div>
                    )}
                  </div>

                  {/* Accordion 4: Shipping & Payment */}
                  <div className="py-4">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("shipping")}
                      className="w-full flex items-center justify-between text-left font-bold text-sm text-ink"
                    >
                      <span>{lang === "bn" ? "ডেলিভারি ও পেমেন্ট" : "Shipping & Payment"}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform ${
                          openAccordions.shipping ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.shipping && (
                      <div className="pt-3 text-xs text-muted leading-relaxed flex flex-col gap-1.5">
                        <p>
                          <strong>{lang === "bn" ? "ঢাকার ভেতরে:" : "Inside Dhaka:"}</strong> $0.75 (~৳80). {lang === "bn" ? "$50 বা ৳6000 টাকার অর্ডারে ফ্রি ডেলিভারি।" : "Free on orders over $50."}
                        </p>
                        <p>
                          <strong>{lang === "bn" ? "ঢাকার বাইরে:" : "Outside Dhaka:"}</strong> $1.20 (~৳130). {lang === "bn" ? "$80 বা ৳9500 টাকার অর্ডারে ফ্রি ডেলিভারি।" : "Free on orders over $80."}
                        </p>
                        <p>
                          <strong>{lang === "bn" ? "পেমেন্ট মাধ্যম:" : "Payment Methods:"}</strong> {lang === "bn" ? "ক্যাশ অন ডেলিভারি (COD), বিকাশ, নগদ ও ভিসা/মাস্টারকার্ড।" : "Cash on Delivery, bKash, Nagad, Visa & MasterCard."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RELATED PRODUCTS ================= */}
        {relatedProducts.length > 0 && (
          <section className="py-16 bg-blush-50/60 border-t border-line">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2
                    className={`text-2xl md:text-3xl font-bold text-ink ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {lang === "bn" ? "সম্পর্কিত অন্যান্য পণ্য" : "You May Also Adore"}
                  </h2>
                  <p className="text-muted text-xs md:text-sm mt-1">
                    {lang === "bn"
                      ? "একই ক্যাটাগরির অন্যান্য জনপ্রিয় ও পরীক্ষিত ফর্মুলা"
                      : "Handpicked formula pairings from the same collection"}
                  </p>
                </div>

                <Link
                  href={`/category/${product.categorySlug}`}
                  className="text-xs md:text-sm font-semibold text-rose hover:text-rose-dark transition-colors inline-flex items-center gap-1"
                >
                  <span>{lang === "bn" ? "আরও দেখুন" : "View All"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => {
                  const relTitle = lang === "bn" ? rel.titleBn : rel.titleEn;
                  const relCategory = lang === "bn" ? rel.categoryBn : rel.categoryEn;

                  return (
                    <article
                      key={rel.id}
                      className="group bg-white rounded-card p-4 border border-line hover:border-line-strong hover:shadow-card transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative w-full aspect-[4/5] rounded-[20px] bg-blush-100 overflow-hidden mb-3 border border-line">
                          <Link href={`/product/${rel.slug || rel.id}`}>
                            <Image
                              src={rel.images[0]?.src || ""}
                              alt={rel.titleEn}
                              fill
                              sizes="(max-width: 640px) 100vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>
                        </div>
                        <span className="text-[11px] font-bold uppercase text-muted tracking-wider block mb-1">
                          {rel.brand}
                        </span>
                        <h3 className="font-bold text-sm text-ink line-clamp-2 hover:text-rose transition-colors mb-2">
                          <Link href={`/product/${rel.slug || rel.id}`}>{relTitle}</Link>
                        </h3>
                      </div>
                      <div className="pt-2 border-t border-line/60 flex items-baseline justify-between">
                        <span className="font-bold text-base text-ink font-bricolage">
                          {formatPrice(rel.priceUSD, rel.priceBDT)}
                        </span>
                        <span className="text-[11px] font-semibold text-rose">
                          {relCategory}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
