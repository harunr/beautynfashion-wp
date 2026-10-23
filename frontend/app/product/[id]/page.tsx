"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { getProductSchema, getBreadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<"30ml" | "50ml">("30ml");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToBag, setAddedToBag] = useState(false);

  // Accordion toggle states
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    details: true,
    howToUse: false,
    ingredients: false,
    shipping: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const product = {
    id: params.id,
    titleEn: "Radiant Glow Niacinamide 10% + Zinc Serum",
    titleBn: "রেডিয়েন্ট গ্লো নিয়াসিনামাইড ১০% + জিংক সিরাম",
    brand: "GlowRecipe",
    categoryEn: "Skincare • Serums",
    categoryBn: "স্কিনকেয়ার • সিরাম",
    rating: 4.9,
    reviewsCount: 212,
    basePriceUSD: selectedSize === "30ml" ? 28.0 : 42.0,
    basePriceBDT: selectedSize === "30ml" ? 3150 : 4750,
    wasPriceUSD: selectedSize === "30ml" ? 35.0 : 50.0,
    wasPriceBDT: selectedSize === "30ml" ? 3900 : 5600,
    descriptionEn:
      "A lightweight, water-based serum clinically proven to refine pore appearance, regulate sebum production, and brighten uneven skin tone with 10% pure Niacinamide and 1% soothing Zinc PCA.",
    descriptionBn:
      "হালকা ও দ্রুত শোষণযোগ্য ওয়াটার-বেসড সিরাম যা লোমকূপের দৃশ্যমানতা কমাতে, ত্বকের অতিরিক্ত তেল নিয়ন্ত্রণ করতে এবং রোদে পোড়া ভাব দূর করে উজ্জ্বলতা বাড়াতে কার্যকরী। এতে রয়েছে ১০% নিয়াসিনামাইড ও ১% জিংক পিসিএ।",
    tags: [
      { en: "Hydrating", bn: "হাইড্রেটিং" },
      { en: "Pore-Refining", bn: "পোর-রিফাইনিং" },
      { en: "Fragrance-Free", bn: "সুগন্ধিমুক্ত" },
      { en: "Dermatologist Tested", bn: "ডার্মাটোলজিস্ট টেস্টেড" },
    ],
    details: {
      en: "Formulated without parabens, sulfates, synthetic fragrance, or essential oils. Non-comedogenic and ideal for daily morning and evening use.",
      bn: "প্যারাবেন, সালফেট, কৃত্রিম সুগন্ধি বা ক্ষতিকর কেমিক্যাল মুক্ত। নন-কমেডোজেনিক এবং প্রতিদিন সকাল ও রাতে ব্যবহারের জন্য সম্পূর্ণ নিরাপদ।",
    },
    howToUse: {
      en: "Apply 2-3 drops to clean face in the morning and evening before heavier creams. Gently pat into skin until absorbed. Follow with moisturizer and SPF.",
      bn: "সকাল ও রাতে মুখ পরিষ্কার করার পর ২-৩ ফোঁটা সিরাম পুরো মুখে আলতো করে মেখে নিন। ক্রিম বা ময়েশ্চারাইজার ব্যবহারের আগে সিরাম লাগান। দিনে অবশ্যই সানস্ক্রিন ব্যবহার করুন।",
    },
    ingredients:
      "Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan Gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin.",
  };

  const images = [
    { tint: "bg-tint-1", label: "Front" },
    { tint: "bg-tint-2", label: "Texture" },
    { tint: "bg-tint-4", label: "In Hand" },
    { tint: "bg-tint-6", label: "Packaging" },
  ];

  const handleAddToCart = () => {
    setAddedToBag(true);
    setTimeout(() => setAddedToBag(false), 2000);
  };

  const productSchema = getProductSchema({
    id: params.id,
    name: product.titleEn,
    description: product.descriptionEn,
    price: product.basePriceUSD,
    regularPrice: product.wasPriceUSD,
    sku: `ABF-SK-00${params.id}`,
    category: "Skincare",
    rating: product.rating,
    reviewCount: product.reviewsCount,
    inStock: true,
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.titleEn, url: `/product/${params.id}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-line bg-blush-50/50 py-3.5">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <nav aria-label="Breadcrumb" className="text-xs md:text-sm text-muted flex items-center gap-2">
              <Link href="/" className="hover:text-rose transition-colors">
                {lang === "bn" ? "হোম" : "Home"}
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-rose transition-colors">
                {lang === "bn" ? "স্কিনকেয়ার" : "Skincare"}
              </Link>
              <span>/</span>
              <span className="text-ink font-semibold line-clamp-1">
                {lang === "bn" ? product.titleBn : product.titleEn}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-10 md:py-16">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
              {/* Product Gallery Area */}
              <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
                {/* Thumbnails vertical rail */}
                <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-visible">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(idx)}
                      className={`w-18 h-18 md:w-20 md:h-24 rounded-card ${img.tint} flex items-center justify-center border-2 transition-all p-2 ${
                        activeImage === idx ? "border-ink shadow-sm" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <Sparkles className="w-6 h-6 text-rose" />
                    </button>
                  ))}
                </div>

                {/* Main Image Showcase */}
                <div
                  className={`relative flex-1 aspect-[4/5] rounded-card-lg ${images[activeImage].tint} p-8 flex items-center justify-center overflow-hidden border border-line shadow-card`}
                >
                  <span className="absolute left-4 top-4 px-3 py-1 rounded-pill bg-white text-xs font-bold text-ink shadow-sm">
                    {lang === "bn" ? "বেস্টসেলার" : "Bestseller"}
                  </span>

                  <Sparkles className="w-28 h-28 md:w-36 md:h-36 text-rose/50" />

                  <span className="absolute bottom-4 left-4 text-xs font-bold text-muted bg-white/80 backdrop-blur-sm px-3 py-1 rounded-pill">
                    {lang === "bn" ? "১০০% আসল প্রোডাক্টের নিশ্চয়তা" : "100% Authentic Guarantee"}
                  </span>
                </div>
              </div>

              {/* Product Details & Actions */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose">
                    {lang === "bn" ? product.categoryBn : product.categoryEn}
                  </span>
                  <h1
                    className={`text-2xl sm:text-3xl md:text-4xl font-bold text-ink mt-2 leading-tight ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {lang === "bn" ? product.titleBn : product.titleEn}
                  </h1>

                  {/* Rating summary */}
                  <div className="flex items-center gap-2 mt-3 text-xs md:text-sm">
                    <div className="flex items-center text-rose">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-rose" />
                      ))}
                    </div>
                    <span className="font-bold text-ink">
                      {lang === "bn" ? toBnDigits(product.rating) : product.rating}
                    </span>
                    <span className="text-muted">
                      ({lang === "bn" ? toBnDigits(product.reviewsCount) : product.reviewsCount}{" "}
                      {t.products.reviews})
                    </span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pb-4 border-b border-line">
                  <span className="text-2xl md:text-3xl font-bold text-ink font-bricolage">
                    {formatPrice(product.basePriceUSD, product.basePriceBDT)}
                  </span>
                  <span className="text-strike text-sm md:text-base line-through">
                    {formatPrice(product.wasPriceUSD, product.wasPriceBDT)}
                  </span>
                  <span className="text-xs text-muted font-medium ml-1">
                    {lang === "bn" ? "ট্যাক্স সহ • ফ্রি ডেলিভারি অফার" : "Tax included"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm md:text-base text-muted leading-relaxed">
                  {lang === "bn" ? product.descriptionBn : product.descriptionEn}
                </p>

                {/* Benefit Pills */}
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-pill bg-[#F8F1F3] text-ink text-xs font-semibold border border-line"
                    >
                      {lang === "bn" ? tag.bn : tag.en}
                    </span>
                  ))}
                </div>

                {/* Variant Size Picker */}
                <div className="space-y-2.5 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted">
                    {lang === "bn" ? "সাইজ নির্বাচন করুন:" : "Select Size:"}
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedSize("30ml")}
                      className={`flex flex-col items-start px-4 py-2.5 rounded-card border-2 text-xs md:text-sm transition-all ${
                        selectedSize === "30ml"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <span className="font-bold text-ink">30 ml</span>
                      <span className="text-muted text-[11px]">
                        {formatPrice(28.0, 3150)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedSize("50ml")}
                      className={`flex flex-col items-start px-4 py-2.5 rounded-card border-2 text-xs md:text-sm transition-all ${
                        selectedSize === "50ml"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <span className="font-bold text-ink">50 ml</span>
                      <span className="text-muted text-[11px]">
                        {formatPrice(42.0, 4750)}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Quantity and Add to Bag Actions */}
                <div className="flex items-center gap-4 pt-3">
                  {/* Stepper */}
                  <div className="flex items-center h-14 px-3 rounded-pill bg-[#F8F1F3] border border-line">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="p-1 hover:text-rose transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-ink">
                      {lang === "bn" ? toBnDigits(quantity) : quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase quantity"
                      className="p-1 hover:text-rose transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 h-14 rounded-pill bg-ink text-white hover:bg-rose transition-all font-semibold text-sm md:text-base flex items-center justify-center gap-2 shadow-pill"
                  >
                    {addedToBag ? (
                      <>
                        <Check className="w-5 h-5 text-success" />
                        <span>{lang === "bn" ? "ব্যাগে যোগ করা হয়েছে!" : "Added to Bag!"}</span>
                      </>
                    ) : (
                      <span>{t.products.addToBag}</span>
                    )}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    aria-label="Toggle wishlist"
                    className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isWishlisted
                        ? "border-rose bg-blush-100 text-rose"
                        : "border-line hover:border-ink text-ink bg-white"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose" : ""}`} />
                  </button>
                </div>

                {/* Trust Badges Bar */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-card bg-blush-50/70 border border-line text-xs font-semibold text-ink">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-rose" />
                    <span>{lang === "bn" ? "সারা দেশে ক্যাশ অন ডেলিভারি" : "Cash on Delivery Available"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-rose" />
                    <span>{lang === "bn" ? "১০০% অথেনটিক পণ্য" : "100% Authentic Product"}</span>
                  </div>
                </div>

                {/* Accordions: Details, How to use, Ingredients, Shipping */}
                <div className="space-y-3 pt-4 border-t border-line">
                  {/* Details Accordion */}
                  <div className="border-b border-line pb-3">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("details")}
                      className="w-full flex items-center justify-between text-left py-2 font-bold text-sm md:text-base text-ink"
                    >
                      <span>{lang === "bn" ? "প্রোডাক্টের বিবরণ ও গুণাগুণ" : "Details & Formula Highlights"}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform ${
                          openAccordions.details ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.details && (
                      <p className="text-xs md:text-sm text-muted mt-2 leading-relaxed pb-2">
                        {lang === "bn" ? product.details.bn : product.details.en}
                      </p>
                    )}
                  </div>

                  {/* How to use Accordion */}
                  <div className="border-b border-line pb-3">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("howToUse")}
                      className="w-full flex items-center justify-between text-left py-2 font-bold text-sm md:text-base text-ink"
                    >
                      <span>{lang === "bn" ? "ব্যবহারের সঠিক নিয়ম" : "How to Apply"}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform ${
                          openAccordions.howToUse ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.howToUse && (
                      <p className="text-xs md:text-sm text-muted mt-2 leading-relaxed pb-2">
                        {lang === "bn" ? product.howToUse.bn : product.howToUse.en}
                      </p>
                    )}
                  </div>

                  {/* Ingredients Accordion */}
                  <div className="border-b border-line pb-3">
                    <button
                      type="button"
                      onClick={() => toggleAccordion("ingredients")}
                      className="w-full flex items-center justify-between text-left py-2 font-bold text-sm md:text-base text-ink"
                    >
                      <span>{lang === "bn" ? "উপাদানসমূহ (Ingredients)" : "Full Ingredients (INCI)"}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform ${
                          openAccordions.ingredients ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openAccordions.ingredients && (
                      <p className="text-xs text-muted mt-2 leading-relaxed font-mono pb-2">
                        {product.ingredients}
                      </p>
                    )}
                  </div>
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
