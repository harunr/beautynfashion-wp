"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import { ChevronRight, Shield, FileText } from "lucide-react";
import { WordPressPage } from "@/lib/wordpress/pages";

export default function TermsClient({ wpPage }: { wpPage: WordPressPage | null }) {
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
            {lang === "bn" ? "শর্তাবলী" : "Terms & Conditions"}
          </span>
        </nav>

        {/* Tab Switcher between Privacy & Terms */}
        <div className="flex border-b border-line mb-8 max-w-md">
          <Link
            href="/privacy"
            className="flex-1 pb-3 text-center font-bold text-sm border-b-2 border-transparent text-muted hover:text-ink flex items-center justify-center gap-2 transition-colors"
          >
            <Shield className="w-4 h-4" />
            <span>{lang === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy"}</span>
          </Link>
          <Link
            href="/terms"
            className="flex-1 pb-3 text-center font-bold text-sm border-b-2 border-rose text-rose flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            <span>{lang === "bn" ? "শর্তাবলী" : "Terms & Conditions"}</span>
          </Link>
        </div>

        {/* Legal Article Card */}
        <div className="bg-white rounded-card p-6 md:p-10 border border-line shadow-sm max-w-4xl space-y-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink mb-2">
              {lang === "bn" ? "ব্যবহারের সাধারণ শর্তাবলী" : "Terms & Conditions of Service"}
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
                  {lang === "bn" ? "১. চুক্তির প্রযোজ্যতা" : "1. Scope of Agreement"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "abeautynfashion.com ব্যবহার করে আপনি এই সাধারণ শর্তাবলী মেনে চলার সম্মতি প্রকাশ করছেন। আমাদের প্ল্যাটফর্মটি একক-ভেন্ডর প্রিমিয়াম বিউটি ও ফ্যাশন ই-কমার্স সেবা প্রদান করে।"
                    : "By accessing and using abeautynfashion.com, you agree to comply with and be bound by these Terms and Conditions. These terms govern all purchases, services, and interactions conducted on our website."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "২. পণ্যের বিবরণ ও মৌলিকতার অঙ্গীকার" : "2. Product Authenticity & Pricing"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "আমরা শতভাগ আসল ও অনুমোদিত ব্র্যান্ডের পণ্য সরবরাহ করি। মূল্য তালিকায় ভুলবশত কোনো অসঙ্গতি দেখা দিলে, অর্ডার পাঠানোর পূর্বে গ্রাহককে অবহিত করে সংশোধনের অধিকার কোম্পানি সংরক্ষণ করে।"
                    : "All products showcased on ABeauty & Fashion are 100% genuine and sourced from licensed distributors. While we strive for absolute accuracy in descriptions and pricing, we reserve the right to correct typographical discrepancies prior to order fulfillment."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "৩. অর্ডার ও ক্যাশ অন ডেলিভারি (COD)" : "3. Orders & Cash on Delivery"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "ক্যাশ অন ডেলিভারিতে অর্ডার করার ক্ষেত্রে ডেলিভারি নিশ্চিত করতে ফোনে কনফার্মেশন গ্রহণ করা হতে পারে। অযৌক্তিক অর্ডার বাতিল বা ভুয়া অর্ডার রোধে কোম্পানি আইনি সুরক্ষা বজায় রাখে।"
                    : "Cash on Delivery (COD) is available across all 64 districts in Bangladesh. We reserve the right to verify high-value orders via phone confirmation prior to dispatch."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "৪. রিটার্ন ও এক্সচেঞ্জ নীতি" : "4. Returns & Exchange Timeline"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "ক্ষতিগ্রস্ত বা ভুল পণ্য পৌঁছালে পণ্য প্রাপ্তির ৭ দিনের মধ্যে আসল প্যাকেট ও আনবক্সিং প্রমাণসহ রিটার্ন রিকোয়েস্ট করতে হবে। স্বাস্থ্যবিধির কারণে খোলা বা ব্যবহৃত প্রসাধন সামগ্রী ফেরতযোগ্য নয়।"
                    : "If a product arrives damaged or incorrect, submit a return request within 7 calendar days of receipt with unboxing photos. Due to hygiene regulations, opened or tested cosmetics cannot be returned."}
                </p>
              </section>

              <section className="space-y-2">
                <h2 className="font-serif text-lg font-bold text-ink">
                  {lang === "bn" ? "৫. বুদ্ধিবৃত্তিক সম্পত্তি" : "5. Intellectual Property"}
                </h2>
                <p>
                  {lang === "bn"
                    ? "এই ওয়েবসাইটে ব্যবহৃত সমস্ত কনটেন্ট, লোগো, ছবি ও ডিজাইনের কপিরাইট ABeauty & Fashion এবং সংশ্লিষ্ট ব্র্যান্ড পার্টনারদের সংরক্ষিত।"
                    : "All content, logos, imagery, and UI designs on this platform are the intellectual property of ABeauty & Fashion or its licensed brand partners."}
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
