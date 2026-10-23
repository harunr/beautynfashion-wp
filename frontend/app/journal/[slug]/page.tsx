"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Clock,
  User,
  Sparkles,
  ShoppingBag,
  Plus,
  Check,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { getArticleBySlug, ARTICLES } from "@/lib/data/articles";
import { getProductById, Product } from "@/lib/data/products";
import { getBreadcrumbSchema } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

export default function ArticleDetailPage({ params }: { params: { slug: string } }) {
  const { lang, formatPrice } = useLanguage();
  const { addToCart } = useCart();
  const [addedItemId, setAddedItemId] = useState<number | null>(null);

  const rawArticle = getArticleBySlug(params.slug) || ARTICLES[0];
  const article = rawArticle;

  const title = lang === "bn" ? article.titleBn : article.titleEn;
  const directAnswer =
    lang === "bn" ? article.summaryDirectAnswerBn : article.summaryDirectAnswerEn;
  const content = lang === "bn" ? article.contentBn : article.contentEn;

  // Retrieve featured products
  const featuredProducts = article.featuredProductIds
    .map((id) => getProductById(id))
    .filter(Boolean) as Product[];

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedItemId(product.id);
    setTimeout(() => setAddedItemId(null), 1800);
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Journal", item: "/journal" },
    { name: article.titleEn, item: `/journal/${article.slug}` },
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
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
            <Link href="/journal" className="hover:text-rose transition-colors">
              {lang === "bn" ? "জার্নাল" : "Journal"}
            </Link>
            <span>/</span>
            <span className="font-semibold text-ink line-clamp-1 max-w-xs sm:max-w-md">
              {title}
            </span>
          </div>
        </nav>

        {/* ================= ARTICLE HEADER ================= */}
        <article className="py-10 md:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col gap-4">
              <span className="bg-blush-100 text-rose px-3 py-1 rounded-pill text-xs font-bold w-fit border border-line">
                {lang === "bn" ? article.categoryBn : article.categoryEn}
              </span>

              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold text-ink leading-tight ${
                  lang === "bn" ? "font-anek" : "font-bricolage"
                }`}
              >
                {title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-muted pt-2 border-b border-line pb-4">
                <span className="flex items-center gap-1.5 font-semibold text-ink">
                  <User className="w-4 h-4 text-rose" />
                  {article.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-card-lg overflow-hidden my-8 shadow-card border border-line bg-blush-100">
              <Image
                src={article.image}
                alt={article.titleEn}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            {/* ================= DIRECT ANSWER BOX (AEO / GEO OPTIMIZED) ================= */}
            <div className="bg-blush-50 border-l-4 border-rose p-5 rounded-r-card mb-8 shadow-sm">
              <div className="flex items-center gap-2 text-rose font-bold text-xs uppercase tracking-wider mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>{lang === "bn" ? "এক নজরে মূল নির্দেশিকা (Summary)" : "Key Takeaway (AEO Summary)"}</span>
              </div>
              <p className="text-ink text-sm sm:text-base leading-relaxed font-medium">
                {directAnswer}
              </p>
            </div>

            {/* Body Sections */}
            <div className="flex flex-col gap-6 text-sm sm:text-base leading-relaxed text-ink/90">
              {content.map((sec, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h2
                    className={`text-xl sm:text-2xl font-bold text-ink mt-3 ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {sec.heading}
                  </h2>
                  <p className="text-muted leading-relaxed">{sec.text}</p>
                </div>
              ))}
            </div>

            {/* ================= FEATURED PRODUCTS IN THIS RITUAL ================= */}
            {featuredProducts.length > 0 && (
              <div className="mt-14 pt-8 border-t border-line">
                <div className="flex items-center gap-2 mb-6">
                  <ShoppingBag className="w-5 h-5 text-rose" />
                  <h3
                    className={`text-xl sm:text-2xl font-bold text-ink ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {lang === "bn"
                      ? "এই আর্টিকেলে উল্লেখিত প্রোডাক্টসমূহ"
                      : "Featured Products in This Ritual"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {featuredProducts.map((p) => {
                    const pTitle = lang === "bn" ? p.titleBn : p.titleEn;
                    return (
                      <div
                        key={p.id}
                        className="flex gap-3.5 p-3.5 rounded-card bg-blush-50/60 border border-line hover:border-line-strong transition-all items-center justify-between"
                      >
                        <div className="relative w-16 h-16 rounded-card overflow-hidden bg-white shrink-0 border border-line">
                          <Image
                            src={p.images[0]?.src || ""}
                            alt={p.titleEn}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0 pr-2">
                          <span className="text-[10px] font-bold uppercase text-muted tracking-wider block">
                            {p.brand}
                          </span>
                          <Link
                            href={`/product/${p.slug || p.id}`}
                            className="font-bold text-xs sm:text-sm text-ink line-clamp-1 hover:text-rose transition-colors"
                          >
                            {pTitle}
                          </Link>
                          <span className="font-bold text-xs text-rose font-bricolage block mt-0.5">
                            {formatPrice(p.priceUSD, p.priceBDT)}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => handleQuickAdd(p, e)}
                          aria-label={`Add ${pTitle} to bag`}
                          className="w-9 h-9 rounded-full bg-white hover:bg-rose hover:text-white text-ink border border-line flex items-center justify-center shrink-0 shadow-sm transition-colors"
                        >
                          {addedItemId === p.id ? (
                            <Check className="w-4 h-4 text-success" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
