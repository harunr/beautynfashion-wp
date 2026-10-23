"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ArrowRight, BookOpen, User } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { ARTICLES } from "@/lib/data/articles";

export default function JournalListPage() {
  const { lang } = useLanguage();
  const featuredArticle = ARTICLES[0];
  const remainingArticles = ARTICLES.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* ================= JOURNAL HERO ================= */}
        <section className="bg-blush-50 py-12 md:py-16 border-b border-line">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <div className="max-w-2xl flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-white text-rose font-bold text-xs w-fit border border-line shadow-sm">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{lang === "bn" ? "বিউটি ও স্কিনকেয়ার জার্নাল" : "The Editorial Journal"}</span>
              </div>

              <h1
                className={`text-3xl sm:text-4xl md:text-5xl font-bold text-ink ${
                  lang === "bn" ? "font-anek" : "font-bricolage"
                }`}
              >
                {lang === "bn"
                  ? "বিজ্ঞানসম্মত বিউটি গাইড ও ত্বকের যত্ন"
                  : "Science-Backed Beauty Insights & Rituals"}
              </h1>

              <p className="text-muted text-sm md:text-base leading-relaxed">
                {lang === "bn"
                  ? "ডার্মাটোলজিস্ট ও রূপ বিশেষজ্ঞদের পরামর্শে তৈরি সঠিক প্রোডাক্ট বাছাই ও যত্নের রূপরেখা।"
                  : "Dermatologist-authored guides on active ingredients, tropical skincare routines, and undertone matching."}
              </p>
            </div>
          </div>
        </section>

        {/* ================= FEATURED COVER STORY ================= */}
        {featuredArticle && (
          <section className="py-10 md:py-14 border-b border-line">
            <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-blush-100/50 rounded-card-lg p-6 sm:p-8 lg:p-10 border border-line">
                <div className="lg:col-span-7 relative aspect-[16/10] rounded-card overflow-hidden shadow-md">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.titleEn}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-pill text-xs font-bold text-rose shadow-sm">
                    {lang === "bn" ? featuredArticle.categoryBn : featuredArticle.categoryEn}
                  </span>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1 font-semibold text-ink">
                      <User className="w-3.5 h-3.5 text-rose" />
                      {featuredArticle.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2
                    className={`text-2xl sm:text-3xl font-bold text-ink hover:text-rose transition-colors leading-tight ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    <Link href={`/journal/${featuredArticle.slug}`}>
                      {lang === "bn" ? featuredArticle.titleBn : featuredArticle.titleEn}
                    </Link>
                  </h2>

                  <p className="text-muted text-sm leading-relaxed">
                    {lang === "bn" ? featuredArticle.excerptBn : featuredArticle.excerptEn}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/journal/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-pill bg-ink text-white font-bold text-xs hover:bg-rose transition-all shadow-pill"
                    >
                      <span>{lang === "bn" ? "সম্পূর্ণ আর্টিকেল পড়ুন" : "Read Full Story"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= ARTICLES GRID ================= */}
        <section className="py-12 md:py-16">
          <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
            <h3
              className={`text-xl sm:text-2xl font-bold text-ink mb-8 ${
                lang === "bn" ? "font-anek" : "font-bricolage"
              }`}
            >
              {lang === "bn" ? "সর্বশেষ প্রকাশিত গাইডসমূহ" : "Latest Editorial Guides"}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingArticles.map((art) => (
                <article
                  key={art.slug}
                  className="group bg-white rounded-card overflow-hidden border border-line hover:border-line-strong hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] bg-blush-100 overflow-hidden">
                      <Image
                        src={art.image}
                        alt={art.titleEn}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/95 px-2.5 py-0.5 rounded-pill text-[11px] font-bold text-rose shadow-sm">
                        {lang === "bn" ? art.categoryBn : art.categoryEn}
                      </span>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-2 text-[11px] text-muted mb-2">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{art.readTime}</span>
                        <span>•</span>
                        <span>{art.date}</span>
                      </div>

                      <h4 className="font-bold text-base text-ink group-hover:text-rose transition-colors line-clamp-2 leading-snug mb-2">
                        <Link href={`/journal/${art.slug}`}>
                          {lang === "bn" ? art.titleBn : art.titleEn}
                        </Link>
                      </h4>

                      <p className="text-muted text-xs leading-relaxed line-clamp-3">
                        {lang === "bn" ? art.excerptBn : art.excerptEn}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-line/60">
                    <Link
                      href={`/journal/${art.slug}`}
                      className="text-xs font-bold text-rose hover:text-rose-dark transition-colors inline-flex items-center gap-1.5 mt-3"
                    >
                      <span>{lang === "bn" ? "বিস্তারিত পড়ুন" : "Read Article"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
