"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import { ChevronRight, Shield, FileText } from "lucide-react";
import { WordPressPage } from "@/lib/wordpress/pages";

export default function PrivacyClient({ wpPage }: { wpPage: WordPressPage | null }) {
  const { lang, t } = useLanguage();

  const hasWpContent = wpPage?.content && wpPage.content.trim().length > 50;

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
            {lang === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}
          </span>
        </nav>

        {/* Tab Switcher between Privacy & Terms */}
        <div className="flex border-b border-line mb-8 max-w-md">
          <Link
            href="/privacy"
            className="flex-1 pb-3 text-center font-bold text-sm border-b-2 border-rose text-rose flex items-center justify-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>{lang === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}</span>
          </Link>
          <Link
            href="/terms"
            className="flex-1 pb-3 text-center font-bold text-sm border-b-2 border-transparent text-muted hover:text-ink flex items-center justify-center gap-2 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>{lang === "bn" ? "শর্তাবলী" : "Terms & Conditions"}</span>
          </Link>
        </div>

        {/* Legal Article Card */}
        <div className="bg-white rounded-card p-6 md:p-10 border border-line shadow-sm max-w-4xl space-y-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">
              {lang === "bn" ? "গোপনীয়তা নীতি ও ডেটা সুরক্ষা" : "Privacy & Data Protection Policy"}
            </h1>
            <p className="text-xs text-muted">
              {lang === "bn" ? "সর্বশেষ হালনাগাদ: অক্টোবর ২০২৬" : "Last Updated: October 2026"}
            </p>
          </div>

          {hasWpContent && lang === "en" ? (
            <div
              className="prose prose-sm max-w-none text-ink/80 space-y-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: wpPage!.content }}
            />
          ) : (
            <div className="prose prose-sm max-w-none text-ink/80 space-y-6 leading-relaxed">
              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "১. সংগৃহীত তথ্যাবলী" : "1. Information We Collect"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "আমরা যখন আপনি আমাদের প্ল্যাটফর্ম পরিদর্শন করেন, অ্যাকাউন্ট নিবন্ধন করেন অথবা অর্ডার সম্পন্ন করেন, তখন আপনার নাম, যোগাযোগের নম্বর, শিপিং ঠিকানা, ইমেল এবং লেনদেনের রেকর্ড নিরাপদভাবে সংগ্রহ করি।"
                    : "We collect personal information necessary to fulfil your orders, improve your shopping experience, and communicate updates. This includes your name, shipping address, email address, phone number, and order history."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "২. তথ্যের ব্যবহার ও উদ্দেশ্য" : "2. How We Use Your Information"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "আপনার তথ্য শুধুমাত্র অর্ডার প্রক্রিয়া, নিরাপদ ডেলিভারি প্রদান, গ্রাহক সেবা নিশ্চিতকরণ এবং আপনার সম্মতি সাপেক্ষে অফার বার্তা পাঠানোর কাজে ব্যবহৃত হয়। আমরা কোনো তৃতীয় পক্ষের কাছে আপনার ডেটা বিক্রি বা শেয়ার করি না।"
                    : "Your data is used solely to process orders, arrange courier dispatch via licensed partners (Pathao, Steadfast, RedX), prevent fraudulent activity, and notify you of order status. We strictly never sell your personal information."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "৩. পেমেন্ট ও আর্থিক নিরাপত্তা" : "3. Payment & Transaction Security"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "অনলাইন কার্ড বা মোবাইল ব্যাংকিং (bKash, Nagad) এর মাধ্যমে পেমেন্ট করার সময় সকল ডেটা সরাসরি বাংলাদেশ ব্যাংক অনুমোদিত SSLCommerz পেমেন্ট গেটওয়ের মাধ্যমে ২৫৬-বিট এনক্রিপশনে প্রক্রিয়াজাত হয়।"
                    : "All card payments and mobile wallet transactions (bKash, Nagad) are processed through Bangladesh Bank-licensed, PCI-DSS compliant payment gateways with 256-bit TLS encryption. We never store credit or debit card numbers on our servers."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "৪. কুকি ও ব্রাউজিং প্রেফারেন্স" : "4. Cookies & Browsing Preferences"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "আমরা আপনার নির্বাচিত ভাষা (ইংরেজি/বাংলা) এবং কার্ট আইটেম সংরক্ষণ করতে কুকি ব্যবহার করি। আপনি চাইলে আপনার ব্রাউজার সেটিংস থেকে যেকোনো সময় কুকি নিয়ন্ত্রণ বা মুছে ফেলতে পারেন।"
                    : "We use essential cookies to maintain your active shopping cart, currency preference, and language selection. You may adjust or clear cookies within your browser settings at any time."}
                </p>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
