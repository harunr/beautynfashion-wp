"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Award, CheckCircle, ChevronRight } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";

export default function AuthenticityPage() {
  const { lang } = useLanguage();

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
              {lang === "bn" ? "১০০% খাঁটি পণ্যের নিশ্চয়তা" : "Authenticity Guarantee"}
            </span>
          </div>

          <h1
            className={`text-3xl md:text-4xl font-bold text-ink mb-6 ${
              lang === "bn" ? "font-anek" : "font-bricolage"
            }`}
          >
            {lang === "bn" ? "১০০% অরিজিনাল ও খাঁটি পণ্যের অঙ্গীকার" : "100% Authenticity Guarantee"}
          </h1>

          <div className="prose prose-sm max-w-none flex flex-col gap-6 text-ink/90">
            <p className="text-muted text-base leading-relaxed">
              {lang === "bn"
                ? "ABeauty & Fashion এর প্রতিটি পণ্য সরাসরি অনুমোদিত আন্তর্জাতিক উৎপাদক ও প্রধান ব্র্যান্ড ডিস্ট্রিবিউটর থেকে আমদানি করা হয়। আমাদের প্ল্যাটফর্মে কোনো তৃতীয় পক্ষের অননুমোদিত সেলারকে পণ্য বিক্রির সুযোগ নেই।"
                : "At ABeauty & Fashion, authenticity is our founding principle. We operate as a strict direct-to-consumer authorized retailer. Every formula in our warehouse is sourced straight from brand headquarters or their certified national distributors."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
              <div className="bg-blush-50 p-4 rounded-card border border-line text-center">
                <ShieldCheck className="w-8 h-8 text-rose mx-auto mb-2" />
                <h3 className="font-bold text-sm text-ink mb-1">
                  {lang === "bn" ? "সরাসরি আমদানি" : "Direct Import"}
                </h3>
                <p className="text-xs text-muted">
                  {lang === "bn" ? "কোনো মধ্যস্বত্বভোগী নেই" : "Zero third-party marketplace resellers"}
                </p>
              </div>

              <div className="bg-blush-50 p-4 rounded-card border border-line text-center">
                <Award className="w-8 h-8 text-rose mx-auto mb-2" />
                <h3 className="font-bold text-sm text-ink mb-1">
                  {lang === "bn" ? "যাচাইকৃত ব্যাচ কোড" : "Verified Batch Codes"}
                </h3>
                <p className="text-xs text-muted">
                  {lang === "bn" ? "মেয়াদ ও আসল সিলযুক্ত" : "Authentic security hologram seals"}
                </p>
              </div>

              <div className="bg-blush-50 p-4 rounded-card border border-line text-center">
                <CheckCircle className="w-8 h-8 text-rose mx-auto mb-2" />
                <h3 className="font-bold text-sm text-ink mb-1">
                  {lang === "bn" ? "মান নিয়ন্ত্রণ" : "Climate Controlled"}
                </h3>
                <p className="text-xs text-muted">
                  {lang === "bn" ? "সতেজ ও সক্রিয় ফর্মুলা" : "Protected from humidity and light degradation"}
                </p>
              </div>
            </div>

            <div className="p-5 rounded-card bg-rose/5 border border-rose/20 text-xs text-ink/80 leading-relaxed">
              <p className="font-bold text-rose mb-1 text-sm">
                {lang === "bn" ? "আমাদের দ্বিগুণ অর্থ ফেরতের নিশ্চয়তা" : "Our Double-Money Back Commitment"}
              </p>
              <p>
                {lang === "bn"
                  ? "যদি কোনো গ্রাহক আমাদের পাঠানো কোনো পণ্য নকল বা ভেজাল প্রমাণ করতে পারেন, আমরা সম্পূর্ণ পণ্যের মূল্যের দ্বিগুণ অর্থ ফেরত প্রদানের প্রতিশ্রুতি দিচ্ছি।"
                  : "If any lab test or authorized brand representative ever finds a formula purchased on abeautynfashion.com to be non-genuine, we pledge a 200% immediate cash refund."}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
