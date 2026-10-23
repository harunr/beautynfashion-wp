"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle, ArrowRight, PhoneCall } from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useStoreSettings } from "@/lib/wordpress/context";

export default function Footer() {
  const { lang, t } = useLanguage();
  const settings = useStoreSettings();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const aboutText =
    lang === "bn"
      ? settings.footer_about_bn || t.footer.about
      : settings.footer_about_en || t.footer.about;

  const newsletterTitle =
    lang === "bn"
      ? settings.footer_newsletter_title_bn || t.footer.newsletterTitle
      : settings.footer_newsletter_title_en || t.footer.newsletterTitle;

  const newsletterSub =
    lang === "bn"
      ? settings.footer_newsletter_sub_bn || t.footer.newsletterSubtitle
      : settings.footer_newsletter_sub_en || t.footer.newsletterSubtitle;

  const whatsappUrl = settings.social_whatsapp
    ? `https://wa.me/${settings.social_whatsapp.replace(/[^0-9]/g, "")}`
    : "https://wa.me/8801700000000";

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
              {aboutText}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-1">
              {settings.social_facebook && (
                <a
                  href={settings.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {settings.social_instagram && (
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {settings.social_whatsapp && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Concierge"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-600 text-white flex items-center justify-center transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              )}
              {settings.social_youtube && (
                <a
                  href={settings.social_youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-rose text-white flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-7 bg-plum-800/60 p-6 md:p-8 rounded-card border border-white/10 flex flex-col justify-center">
            <h3 className="font-bricolage text-lg md:text-xl font-bold text-white mb-2">
              {newsletterTitle}
            </h3>
            <p className="text-sm text-blush-200 mb-5 max-w-lg">
              {newsletterSub}
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
            {settings.footer_trade_license && (
              <p className="text-xs text-blush-200 mt-4 leading-normal">
                {lang === "bn" ? "ট্রেড লাইসেন্স নং: " : "Trade License: "}
                <span className="font-mono text-white/90">{settings.footer_trade_license}</span>
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blush-200">
          <p>{settings.footer_copyright || `© ${new Date().getFullYear()} ABeauty & Fashion. ${t.footer.rights}`}</p>
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
