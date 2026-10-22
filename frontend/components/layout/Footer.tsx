"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";

export default function Footer() {
  const { lang, t } = useLanguage();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-plum-900 text-blush-50 pt-16 pb-10 transition-colors border-t border-plum-800">
      <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
        {/* Top: Brand & Newsletter Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 flex flex-col gap-5">
            <Link href="/" className="inline-block" aria-label="ABeauty & Fashion Home">
              <span className="font-bricolage text-2xl font-bold tracking-tight text-white flex items-center gap-1.5">
                ABeauty <span className="font-instrument italic font-normal text-rose-light">&amp;</span> Fashion
              </span>
            </Link>
            <p className="text-blush-200 text-sm md:text-base leading-relaxed max-w-md">
              {t.footer.about}
            </p>
          </div>

          <div className="lg:col-span-7 bg-plum-800/60 p-6 md:p-8 rounded-card border border-white/10 flex flex-col justify-center">
            <h3 className="font-bricolage text-lg md:text-xl font-bold text-white mb-2">
              {t.footer.newsletterTitle}
            </h3>
            <p className="text-sm text-blush-200 mb-5 max-w-lg">
              {t.footer.newsletterSubtitle}
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-rose-light font-medium bg-plum-700/60 py-3 px-4 rounded-pill">
                <CheckCircle className="w-5 h-5 text-rose-light" />
                <span>
                  {lang === "bn"
                    ? "ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।"
                    : "Thank you for subscribing to the Glow Club!"}
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-blush-200" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.newsletterPlaceholder}
                    className="w-full h-12 pl-11 pr-4 rounded-pill bg-white/10 border border-white/15 text-white placeholder:text-blush-200 text-sm outline-none focus:border-rose transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 px-7 rounded-pill bg-rose text-white hover:bg-rose-dark transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-pill"
                >
                  <span>{t.footer.subscribe}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle: Links Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 text-sm">
          <div>
            <h4 className="font-bold text-white mb-4 text-xs tracking-wider uppercase">
              {t.footer.explore}
            </h4>
            <ul className="space-y-2.5 text-blush-200">
              <li>
                <Link href="/shop" className="hover:text-rose-light transition-colors">
                  {t.nav.shopAll}
                </Link>
              </li>
              <li>
                <Link href="/category/skincare" className="hover:text-rose-light transition-colors">
                  {t.nav.skincare}
                </Link>
              </li>
              <li>
                <Link href="/category/makeup" className="hover:text-rose-light transition-colors">
                  {t.nav.makeup}
                </Link>
              </li>
              <li>
                <Link href="/category/hair-care" className="hover:text-rose-light transition-colors">
                  {t.nav.hairCare}
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-rose-light font-medium hover:text-white transition-colors">
                  {t.nav.sale}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-xs tracking-wider uppercase">
              {t.footer.customerCare}
            </h4>
            <ul className="space-y-2.5 text-blush-200">
              <li>
                <Link href="/contact" className="hover:text-rose-light transition-colors">
                  {lang === "bn" ? "যোগাযোগ ও হেল্পলাইন" : "Contact & Support"}
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-rose-light transition-colors">
                  {lang === "bn" ? "অর্ডার ট্র্যাক করুন" : "Track Your Order"}
                </Link>
              </li>
              <li>
                <Link href="/shipping-returns" className="hover:text-rose-light transition-colors">
                  {lang === "bn" ? "ডেলিভারি ও রিটার্ন" : "Shipping & Returns"}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-rose-light transition-colors">
                  {lang === "bn" ? "সাধারণ প্রশ্নোত্তর" : "FAQs"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-xs tracking-wider uppercase">
              {t.footer.legal}
            </h4>
            <ul className="space-y-2.5 text-blush-200">
              <li>
                <Link href="/privacy" className="hover:text-rose-light transition-colors">
                  {lang === "bn" ? "প্রাইভেসি পলিসি" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-rose-light transition-colors">
                  {lang === "bn" ? "শর্তাবলী" : "Terms & Conditions"}
                </Link>
              </li>
              <li>
                <Link href="/authenticity" className="hover:text-rose-light transition-colors">
                  {lang === "bn" ? "১০০% আসল পণ্যের নিশ্চয়তা" : "Authenticity Guarantee"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 text-xs tracking-wider uppercase">
              {lang === "bn" ? "পেমেন্ট মাধ্যম" : "Accepted Payments"}
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-blush-200">
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-medium">bKash</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-medium">Nagad</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-medium">COD</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-medium">Visa</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-medium">Mastercard</span>
              <span className="px-2.5 py-1 rounded bg-white/10 text-white font-medium">SSLCommerz</span>
            </div>
            {lang === "bn" && (
              <p className="text-xs text-blush-200 mt-4 leading-normal">
                ট্রেড লাইসেন্স নং: TRAD/DSCC/042819/2024
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blush-200">
          <p>© {new Date().getFullYear()} ABeauty &amp; Fashion. {t.footer.rights}</p>
          <p className="opacity-75">
            {lang === "bn"
              ? "নিরাপদ হেডলেস আর্কিটেকচার দ্বারা চালিত"
              : "Built with Headless Next.js & WooCommerce"}
          </p>
        </div>
      </div>
    </footer>
  );
}
