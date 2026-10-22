"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import {
  ChevronRight,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Truck,
  Award,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const { lang, t, toBnDigits } = useLanguage();

  const values = [
    {
      icon: ShieldCheck,
      titleEn: "100% Guaranteed Authenticity",
      titleBn: "১০০% গ্যারান্টিযুক্ত মৌলিকতা",
      descEn: "We source directly from authorized global brand distributors. Every batch is certified with original security seals and verifications.",
      descBn: "আমরা সরাসরি আন্তর্জাতিক ব্র্যান্ডের অনুমোদিত ডিস্ট্রিবিউটর থেকে পণ্য সংগ্রহ করি। প্রতিটি পণ্য শতভাগ সিলযুক্ত ও পরীক্ষিত।",
    },
    {
      icon: Sparkles,
      titleEn: "Dermatologically Vetted",
      titleBn: "ডার্মাটোলজিস্ট অনুমোদিত মান",
      descEn: "Every skincare formulation in our portfolio is analyzed for ingredient safety, efficacy, and suitability for Asian skin climates.",
      descBn: "আমাদের প্রতিটি স্কিনকেয়ার সামগ্রী উপাদান সুরক্ষা, কার্যকারিতা ও এশীয় ত্বকের উপযোগিতা নিশ্চিত করে নির্বাচন করা হয়।",
    },
    {
      icon: HeartHandshake,
      titleEn: "Cruelty-Free & Ethical",
      titleBn: "অহিংস ও পরিবেশবান্ধব অঙ্গীকার",
      descEn: "We prioritize brands committed to ethical sourcing, cruelty-free testing protocols, and sustainable packaging initiatives.",
      descBn: "আমরা প্রাণি-নির্যাতনমুক্ত, পরিবেশবান্ধব ও টেকসই কাঁচামাল ব্যবহারে অঙ্গীকারবদ্ধ ব্র্যান্ডগুলোকে অগ্রাধিকার দিয়ে থাকি।",
    },
    {
      icon: Truck,
      titleEn: "Nationwide Rapid Delivery",
      titleBn: "সারা দেশে দ্রুততম ডেলিভারি",
      descEn: "From central Dhaka to all 64 districts of Bangladesh, our temperature-controlled supply chain ensures your cosmetics arrive fresh.",
      descBn: "ঢাকা থেকে শুরু করে বাংলাদেশের ৬৪টি জেলার প্রতিটি প্রান্তে নিয়ন্ত্রিত তাপমাত্রায় সতেজ পণ্য ডেলিভারি পৌঁছে দেওয়া হয়।",
    },
  ];

  return (
    <div className="min-h-screen bg-sand text-ink flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-container mx-auto w-full px-4 md:px-8 lg:px-14 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted mb-6 flex items-center gap-1.5">
          <Link href="/" className="hover:text-rose transition-colors">
            {t.nav.home}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-ink font-semibold">
            {lang === "bn" ? "আমাদের সম্পর্কে" : "About Us"}
          </span>
        </nav>

        {/* Hero Editorial Section */}
        <section className="mb-14 md:mb-20">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-rose">
              {lang === "bn" ? "আমাদের পরিচিতি ও দর্শন" : "Our Heritage & Philosophy"}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ink mt-3 mb-6 leading-tight">
              {lang === "bn"
                ? "বিশুদ্ধ সৌন্দর্য ও আভিজাত্যের নির্ভরযোগ্য ঠিকানা।"
                : "Curating the World's Finest Beauty & Fashion for Discerning Bangladesh."}
            </h1>
            <p className="text-base md:text-lg text-ink/80 leading-relaxed">
              {lang === "bn"
                ? "ABeauty & Fashion এর সূচনা হয়েছিল একটি স্পষ্ট অঙ্গীকার নিয়ে—বাংলাদেশে ভেজাল ও নিম্নমানের প্রসাধনীর অবসান ঘটিয়ে আন্তর্জাতিক মানের শতভাগ আসল স্কিনকেয়ার ও ফ্যাশন সামগ্রী প্রতিটি গ্রাহকের হাতে বিশ্বস্ততার সাথে পৌঁছে দেওয়া।"
                : "ABeauty & Fashion was founded with a single uncompromising mission: to put an end to counterfeit cosmetics and provide conscious individuals with direct access to genuine, scientifically-backed, and ethically-sourced beauty products."}
            </p>
          </div>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 py-8 px-6 bg-white rounded-card border border-line shadow-sm">
          <div className="text-center p-3 border-r border-line last:border-none">
            <div className="font-serif text-3xl md:text-4xl font-bold text-plum">
              {lang === "bn" ? `${toBnDigits(50)}+` : "50k+"}
            </div>
            <div className="text-xs text-muted mt-1">
              {lang === "bn" ? "সন্তুষ্ট গ্রাহক" : "Happy Customers"}
            </div>
          </div>
          <div className="text-center p-3 sm:border-r border-line last:border-none">
            <div className="font-serif text-3xl md:text-4xl font-bold text-rose">
              {lang === "bn" ? `${toBnDigits(100)}%` : "100%"}
            </div>
            <div className="text-xs text-muted mt-1">
              {lang === "bn" ? "আসল পণ্যের নিশ্চয়তা" : "Original & Authentic"}
            </div>
          </div>
          <div className="text-center p-3 border-r border-line last:border-none">
            <div className="font-serif text-3xl md:text-4xl font-bold text-plum">
              {lang === "bn" ? `${toBnDigits(120)}+` : "120+"}
            </div>
            <div className="text-xs text-muted mt-1">
              {lang === "bn" ? "গ্লোবাল ব্র্যান্ড" : "Premium Brands"}
            </div>
          </div>
          <div className="text-center p-3">
            <div className="font-serif text-3xl md:text-4xl font-bold text-plum">
              {lang === "bn" ? toBnDigits(64) : "64"}
            </div>
            <div className="text-xs text-muted mt-1">
              {lang === "bn" ? "জেলায় এক্সপ্রেস ডেলিভারি" : "Districts Covered"}
            </div>
          </div>
        </section>

        {/* Brand Values Grid */}
        <section className="mb-16 md:mb-24">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-rose">
              {lang === "bn" ? "আমাদের নীতি" : "What Defines Us"}
            </span>
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-ink mt-2">
              {lang === "bn" ? "আমাদের ৪টি মূল ভিত্তি" : "The Four Pillars of Our Craft"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-card p-6 md:p-8 border border-line shadow-sm hover:border-line-strong transition-all flex gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-50 text-rose flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink mb-1.5">
                      {lang === "bn" ? v.titleBn : v.titleEn}
                    </h3>
                    <p className="text-muted text-xs md:text-sm leading-relaxed">
                      {lang === "bn" ? v.descBn : v.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Founder Story Banner */}
        <section className="bg-plum text-white rounded-card p-8 md:p-12 mb-16 relative overflow-hidden shadow-sm">
          <div className="max-w-2xl relative z-10">
            <Award className="w-10 h-10 text-blush-300 mb-4" />
            <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight mb-4">
              {lang === "bn" ? "আমাদের প্রতিশ্রুতি" : "A Promise of Transparent Luxury"}
            </h2>
            <p className="text-white/85 text-sm md:text-base leading-relaxed mb-6 font-light">
              {lang === "bn"
                ? "আমরা বিশ্বাস করি প্রসাধন কেবল বাহ্যিক সাজ নয়, এটি আত্মবিশ্বাস ও স্বাস্থ্যের যত্ন। প্রতিটি পণ্য আমরা এমন যত্ন ও পরীক্ষা করে নির্বাচন করি যেন আপনি নিঃসঙ্কোচে আপনার প্রিয় ত্বকে তা ব্যবহার করতে পারেন।"
                : "True beauty begins with care and integrity. We treat skincare not as a luxury vanity, but as daily wellness and self-confidence. Every formula we curate is one we trust for our own families."}
            </p>
            <div className="pt-2">
              <span className="font-serif italic text-lg text-blush-200">
                — ABeauty & Fashion Editorial Board
              </span>
            </div>
          </div>
        </section>

        {/* CTA Shop Banner */}
        <section className="text-center py-10 bg-white rounded-card border border-line p-8 shadow-sm">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-3">
            {lang === "bn" ? "আপনার রূপচর্চার নতুন অভিজ্ঞতা শুরু করুন" : "Experience Authentic Radiance"}
          </h2>
          <p className="text-muted text-sm max-w-md mx-auto mb-6">
            {lang === "bn"
              ? "আমাদের বাছাইকৃত আন্তর্জাতিক প্রিমিয়াম স্কিনকেয়ার ও ফ্যাশন কালেকশন ঘুরে দেখুন।"
              : "Explore our hand-picked selection of dermatologically approved serums, moisturizers, and fashion."}
          </p>
          <Link
            href="/shop"
            className="inline-flex h-12 px-8 bg-rose text-white text-sm font-bold rounded-pill hover:bg-rose-dark transition-colors items-center gap-2 shadow-sm"
          >
            <span>{lang === "bn" ? "কালেকশন দেখুন" : "Explore The Collection"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
