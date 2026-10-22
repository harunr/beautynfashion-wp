"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import { Search, ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  const { lang } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const categories = [
    { nameEn: "Serums & Treatments", nameBn: "সিরাম ও স্কিনকেয়ার", href: "/shop?cat=skincare" },
    { nameEn: "Hydrating Moisturizers", nameBn: "ময়েশ্চারাইজার", href: "/shop?cat=moisturizer" },
    { nameEn: "Foundation & Glow", nameBn: "ফাউন্ডেশন ও মেকআপ", href: "/shop?cat=makeup" },
    { nameEn: "Hair Nutrition", nameBn: "হেয়ার কেয়ার", href: "/shop?cat=hair-care" },
    { nameEn: "Special Offers", nameBn: "বিশেষ অফার", href: "/sale" },
  ];

  return (
    <div className="min-h-screen bg-sand text-ink flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-container mx-auto w-full px-4 md:px-8 py-16 md:py-24 flex items-center justify-center">
        <div className="max-w-lg w-full text-center space-y-6">
          {/* 404 Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-rose-50 text-rose border border-rose-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>404 Error</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold text-plum tracking-tight">
            404
          </h1>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink">
            {lang === "bn" ? "পৃষ্ঠাটি খুঁজে পাওয়া যায়নি" : "Page Not Found"}
          </h2>

          <p className="text-muted text-sm md:text-base leading-relaxed">
            {lang === "bn"
              ? "আপনি যে পৃষ্ঠাটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা লিঙ্কটি ভুল হতে পারে। আমাদের সার্চ বা নিচের জনপ্রিয় ক্যাটাগরিগুলো দেখতে পারেন।"
              : "The page you are looking for might have been moved, renamed, or is temporarily unavailable. Use the search bar below or explore popular categories."}
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={lang === "bn" ? "প্রসাধন বা ব্র্যান্ড খুঁজুন..." : "Search beauty products, brands..."}
              className="w-full h-12 pl-4 pr-12 rounded-pill bg-white border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm shadow-sm transition-all text-ink"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-1.5 top-1.5 w-9 h-9 rounded-full bg-rose text-white flex items-center justify-center hover:bg-rose-dark transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Category Chips */}
          <div className="pt-2">
            <p className="text-xs font-bold text-muted uppercase tracking-wider mb-3">
              {lang === "bn" ? "জনপ্রিয় ক্যাটাগরি" : "Popular Suggestions"}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat, i) => (
                <Link
                  key={i}
                  href={cat.href}
                  className="px-3.5 py-1.5 rounded-pill bg-white hover:bg-blush-100 border border-line text-xs font-medium text-ink hover:text-rose transition-all shadow-xs"
                >
                  {lang === "bn" ? cat.nameBn : cat.nameEn}
                </Link>
              ))}
            </div>
          </div>

          {/* Back Home CTA */}
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 h-11 bg-plum text-white text-sm font-bold rounded-pill hover:bg-plum-900 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === "bn" ? "হোমপেজে ফিরে যান" : "Back to Home"}</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
