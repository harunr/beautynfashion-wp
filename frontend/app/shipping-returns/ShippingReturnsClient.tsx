"use client";

import React from "react";
import Link from "next/link";
import { Truck, RotateCcw, ShieldCheck, ChevronRight } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { WordPressPage } from "@/lib/wordpress/pages";

export default function ShippingReturnsClient({ wpPage }: { wpPage: WordPressPage | null }) {
  const { lang } = useLanguage();

  const hasWpContent = wpPage?.content && wpPage.content.trim().length > 50;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-rose transition-colors">
              {lang === "bn" ? "হোম" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-ink">
              {lang === "bn" ? "ডেলিভারি ও রিটার্ন পলিসি" : "Shipping & Returns"}
            </span>
          </div>

          <h1
            className={`text-3xl md:text-4xl font-bold text-ink mb-6 ${
              lang === "bn" ? "font-anek" : "font-bricolage"
            }`}
          >
            {lang === "bn" ? "ডেলিভারি ও রিটার্ন পলিসি" : "Shipping, Delivery & Returns"}
          </h1>

          {hasWpContent && lang === "en" ? (
            <div
              className="prose prose-sm max-w-none text-ink/80 space-y-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: wpPage!.content }}
            />
          ) : (
            <div className="prose prose-sm max-w-none flex flex-col gap-8 text-ink/90">
              {/* Delivery Rates */}
              <div className="bg-blush-50 p-6 rounded-card border border-line flex flex-col gap-4">
                <div className="flex items-center gap-2 text-rose font-bold text-base">
                  <Truck className="w-5 h-5" />
                  <span>{lang === "bn" ? "ডেলিভারি সময় ও চার্জ" : "Delivery Timelines & Charges"}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-4 rounded-card border border-line">
                    <h3 className="font-bold text-sm text-ink mb-1">
                      {lang === "bn" ? "ঢাকার ভেতরে (Inside Dhaka)" : "Inside Dhaka"}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {lang === "bn"
                        ? "ডেলিভারি চার্জ: $0.75 (~৳80)। ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি। $50 (বা ৳6000) টাকার অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি।"
                        : "Delivery charge: $0.75 (~৳80). Delivery within 24–48 hours. Free delivery on orders over $50."}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-card border border-line">
                    <h3 className="font-bold text-sm text-ink mb-1">
                      {lang === "bn" ? "ঢাকার বাইরে (Outside Dhaka)" : "Outside Dhaka"}
                    </h3>
                    <p className="text-muted leading-relaxed">
                      {lang === "bn"
                        ? "ডেলিভারি চার্জ: $1.20 (~৳130)। ৩ থেকে ৪ দিনের মধ্যে নিরাপদ কুরিয়ারের মাধ্যমে ডেলিভারি। $80 (বা ৳9500) টাকার অর্ডারে সম্পূর্ণ ফ্রি।"
                        : "Delivery charge: $1.20 (~৳130). Delivery within 48–72 hours via premium courier. Free on orders over $80."}
                    </p>
                  </div>
                </div>
              </div>

              {/* 7-Day Return Policy */}
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-rose" />
                  <span>{lang === "bn" ? "৭ দিনের সহজ রিটার্ন পলিসি" : "7-Day Return & Exchange Guarantee"}</span>
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  {lang === "bn"
                    ? "গ্রাহকের সন্তুষ্টি আমাদের শীর্ষ অগ্রাধিকার। যদি কোনো পণ্য ত্রুটিযুক্ত বা ক্ষতিগ্রস্ত অবস্থায় পৌঁছায়, তবে ডেলিভারি পাওয়ার ৭ দিনের মধ্যে আমাদের কাস্টমার কেয়ারে যোগাযোগ করে বিনামূল্যে পণ্য পরিবর্তন অথবা সম্পূর্ণ অর্থ ফেরত পেতে পারেন।"
                    : "We take extreme pride in our curation. If an item arrives damaged, leaking, or does not match your ordered specification, you may request an exchange or full refund within 7 calendar days of receipt."}
                </p>
              </div>

              {/* Packaging & Handling */}
              <div className="flex flex-col gap-3">
                <h2 className="text-xl font-bold text-ink flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-rose" />
                  <span>{lang === "bn" ? "তাপমাত্রা নিয়ন্ত্রিত নিরাপদ প্যাকেজিং" : "Climate-Shielded Packaging"}</span>
                </h2>
                <p className="text-muted text-sm leading-relaxed">
                  {lang === "bn"
                    ? "বাংলাদেশের উষ্ণ আবহাওয়ায় ভিটামিন সি ও সানস্ক্রিনের কার্যকারিতা অক্ষুণ্ণ রাখতে প্রতিটি পার্সেল থার্মাল বাবল ও সিলযুক্ত কার্ডবোর্ডে সাবধানে প্যাক করা হয়।"
                    : "Active cosmetics (Vitamin C, Retinoids, Sunscreens) are fragile in tropical heat. Every ABeauty & Fashion parcel is shipped in multi-layer insulated thermal bubble wrap to maintain maximum active potency."}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
