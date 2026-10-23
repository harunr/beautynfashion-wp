"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { WordPressPage } from "@/lib/wordpress/pages";

const faqs = [
  {
    qEn: "How do I know the products on ABeauty & Fashion are 100% genuine?",
    qBn: "কীভাবে নিশ্চিত হব যে আপনাদের প্রসাধনী পণ্যগুলো ১০০% আসল?",
    aEn: "We import directly from authorized global brand manufacturers and authorized European & Asian distributors. Every single product bears authentic manufacturer batch codes and tamper-evident seals. We offer a 200% cash-back authenticity guarantee.",
    aBn: "আমরা সরাসরি আন্তর্জাতিক ব্র্যান্ডের অনুমোদিত ডিস্ট্রিবিউটর থেকে পণ্য আমদানি করি। প্রতিটি পণ্যে আসল ব্যাচ কোড ও সিকিউরিটি সিল থাকে। নকল প্রমাণে দ্বিগুণ মূল্য ফেরতের নিশ্চয়তা রয়েছে।",
  },
  {
    qEn: "What are your shipping rates and delivery times across Bangladesh?",
    qBn: "বাংলাদেশে ডেলিভারি চার্জ কত এবং কতদিনে পণ্য পৌঁছায়?",
    aEn: "Inside Dhaka: $0.75 (~৳80), delivered within 24–48 hours (Free over $50). Outside Dhaka: $1.20 (~৳130), delivered within 48–72 hours via premium courier (Free over $80).",
    aBn: "ঢাকার ভেতরে: $0.75 (~৳80), ২৪ থেকে ৪৮ ঘণ্টায় ডেলিভারি ($50 বা ৳6000 টাকার অর্ডারে ফ্রি)। ঢাকার বাইরে: $1.20 (~৳130), ৪৮ থেকে ৭২ ঘণ্টায় ডেলিভারি ($80 বা ৳9500 টাকার অর্ডারে ফ্রি)।",
  },
  {
    qEn: "Can I pay using Cash on Delivery (COD)?",
    qBn: "আমি কি ক্যাশ অন ডেলিভারিতে (COD) মূল্য পরিশোধ করতে পারব?",
    aEn: "Yes! Cash on Delivery is available across all 64 districts in Bangladesh. You inspect the parcel seal and pay the courier rider directly.",
    aBn: "হ্যাঁ! বাংলাদেশের ৬৪টি জেলাতেই ক্যাশ অন ডেলিভারি (COD) সুবিধা রয়েছে। পার্সেল গ্রহণ করে ডেলিভারি ম্যানের কাছে নগদ মূল্য পরিশোধ করতে পারবেন।",
  },
  {
    qEn: "Which mobile banking and card payment options are supported?",
    qBn: "কোন কোন মোবাইল ব্যাংকিং ও কার্ড পেমেন্ট সাপোর্ট করে?",
    aEn: "We support bKash Merchant, Nagad, Rocket, Upay, as well as Visa, MasterCard, and American Express cards via 256-bit SSL encrypted gateway.",
    aBn: "বিকাশ, নগদ, রকেট এবং ভিসা ও মাস্টারকার্ডের মাধ্যমে নিরাপদ অনলাইন পেমেন্ট করা যায়।",
  },
  {
    qEn: "What is your return and replacement policy?",
    qBn: "পণ্য ফেরত বা পরিবর্তনের নিয়ম কী?",
    aEn: "If an item arrives damaged, leaking, or defective, contact our concierge within 7 calendar days with your order ID and unboxing photo for an immediate free exchange or full refund.",
    aBn: "পণ্য ক্ষতিগ্রস্ত বা ত্রুটিপূর্ণ হলে পাওয়ার ৭ দিনের মধ্যে আমাদের জানালে সম্পূর্ণ বিনামূল্যে পরিবর্তন বা মূল্য ফেরত দেওয়া হয়।",
  },
  {
    qEn: "How do I choose the right skincare routine for my skin type?",
    qBn: "আমার ত্বকের জন্য সঠিক স্কিনকেয়ার রুটিন কীভাবে বাছাই করব?",
    aEn: "Explore our Journal section for dermatologist-approved guides or reach out to our beauty advisors on WhatsApp (+880 1700 000000) for personalized consultations.",
    aBn: "আমাদের জার্নাল সেকশনে বিভিন্ন ত্বকের জন্য বিশেষ নির্দেশিকা দেওয়া আছে। এছাড়াও হোয়াটসঅ্যাপে মেসেজ দিয়ে আমাদের বিউটি বিশেষজ্ঞদের ফ্রি পরামর্শ নিতে পারেন।",
  },
];

export default function FaqClient({ wpPage }: { wpPage: WordPressPage | null }) {
  const { lang } = useLanguage();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const acf = (wpPage?.acf || {}) as Record<string, string | undefined>;

  const helpTitle =
    lang === "bn"
      ? acf.faq_help_title_bn || "আপনার প্রশ্নের উত্তর পাননি?"
      : acf.faq_help_title_en || "Still have questions?";

  const helpDesc =
    lang === "bn"
      ? acf.faq_help_desc_bn || "আমাদের কাস্টমার সাপোর্ট টিম প্রতিদিন সকাল ১০টা থেকে রাত ১০টা পর্যন্ত সক্রিয়।"
      : acf.faq_help_desc_en || "Our dedicated beauty concierge team is here to help 7 days a week from 10:00 AM to 10:00 PM.";

  const filteredFaqs = faqs.filter((f) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return f.qEn.toLowerCase().includes(q) || f.qBn.includes(q);
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-rose transition-colors">
              {lang === "bn" ? "হোম" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-ink">
              {lang === "bn" ? "সাধারণ জিজ্ঞাসা" : "FAQs"}
            </span>
          </div>

          <div className="text-center max-w-xl mx-auto mb-10">
            <h1
              className={`text-3xl md:text-4xl font-bold text-ink mb-3 ${
                lang === "bn" ? "font-anek" : "font-bricolage"
              }`}
            >
              {lang === "bn" ? "সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর" : "Frequently Asked Questions"}
            </h1>
            <p className="text-muted text-sm leading-relaxed">
              {lang === "bn"
                ? "অর্ডার, ডেলিভারি, আসল পণ্যের নিশ্চয়তা ও পেমেন্ট সংক্রান্ত যাবতীয় তথ্য এক নজরে জেনে নিন।"
                : "Everything you need to know about our products, authenticity, shipping, and ordering."}
            </p>

            {/* Search Box */}
            <div className="relative mt-6 max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === "bn" ? "প্রশ্ন খুঁজুন..." : "Search questions..."}
                className="w-full h-11 pl-11 pr-4 rounded-pill bg-[#F8F1F3] border border-line text-xs md:text-sm text-ink outline-none focus:border-rose transition-colors"
              />
            </div>
          </div>

          {/* Accordion List */}
          <div className="divide-y divide-line border-y border-line">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm md:text-base text-ink gap-4"
                  >
                    <span>{lang === "bn" ? faq.qBn : faq.qEn}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-rose" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="pt-3 text-xs md:text-sm text-muted leading-relaxed">
                      <p>{lang === "bn" ? faq.aBn : faq.aEn}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Dynamic Help Desk Box */}
          <div className="mt-12 p-6 rounded-card-lg bg-blush-50 border border-line text-center flex flex-col items-center gap-3">
            <h3 className="font-bold text-base text-ink">
              {helpTitle}
            </h3>
            <p className="text-xs text-muted max-w-md">
              {helpDesc}
            </p>
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-pill bg-ink text-white font-bold text-xs hover:bg-rose transition-colors"
            >
              {lang === "bn" ? "যোগাযোগ করুন" : "Contact Concierge"}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
