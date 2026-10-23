"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import {
  Mail,
  MapPin,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Send,
} from "lucide-react";
import { WordPressPage } from "@/lib/wordpress/pages";

export default function ContactClient({ wpPage }: { wpPage: WordPressPage | null }) {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const acf = (wpPage?.acf || {}) as Record<string, string | undefined>;

  const email = acf.contact_email || "support@abeautynfashion.com";
  const phone = acf.contact_phone || "+880 1700 000000";
  const whatsapp = acf.contact_whatsapp || "+8801700000000";
  const address =
    lang === "bn"
      ? acf.contact_address_bn || "বাড়ি ৪২, রোড ১১, ব্লক ডি, বনানী, ঢাকা ১২১৩, বাংলাদেশ"
      : acf.contact_address_en || "House 42, Road 11, Block D, Banani, Dhaka 1213, Bangladesh";
  const hours =
    acf.contact_hours ||
    (lang === "bn" ? "শনিবার – বৃহস্পতিবার: সকাল ১০টা – রাত ১০টা" : "Saturday – Thursday: 10:00 AM – 10:00 PM");

  const whatsappLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`;

  const faqs = [
    {
      qEn: "How long does delivery take in Bangladesh?",
      qBn: "বাংলাদেশে ডেলিভারি পেতে কতদিন সময় লাগে?",
      aEn: "Inside Dhaka deliveries take 24–48 hours. Deliveries outside Dhaka take 48–72 hours via our premium courier partners with full SMS tracking.",
      aBn: "ঢাকার ভেতরে ২৪–৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে ৪৮–৭২ ঘণ্টার মধ্যে নিরাপদ কুরিয়ারের মাধ্যমে পৌঁছে যায়।",
    },
    {
      qEn: "Are all your beauty and skincare products 100% authentic?",
      qBn: "আপনাদের সকল বিউটি ও স্কিনকেয়ার পণ্য কি ১০০% আসল?",
      aEn: "Yes, every single product is directly imported from authorized brand distributors with genuine batch codes and manufacturer seals. We guarantee 100% authenticity.",
      aBn: "হ্যাঁ, প্রতিটি পণ্য অনুমোদিত ব্র্যান্ড ডিস্ট্রিবিউটর থেকে সরাসরি সংগৃহীত এবং আসল ব্যাচ কোড ও সিলসহ সরবরাহ করা হয়। আমরা শতভাগ অরিজিনাল পণ্যের নিশ্চয়তা প্রদান করি।",
    },
    {
      qEn: "What is your return and exchange policy?",
      qBn: "আপনাদের পণ্য ফেরত বা পরিবর্তনের নিয়ম কী?",
      aEn: "We offer a 7-day hassle-free return and exchange policy if the product arrives damaged, defective, or unopened in its original condition.",
      aBn: "পণ্য ক্ষতিগ্রস্ত অবস্থায় পৌঁছালে বা কোনো ত্রুটি থাকলে পণ্য পাওয়ার ৭ দিনের মধ্যে সহজে রিটার্ন বা এক্সচেঞ্জ করতে পারবেন।",
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
            {lang === "bn" ? "যোগাযোগ" : "Contact Us"}
          </span>
        </nav>

        {/* Header Hero */}
        <div className="max-w-2xl mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-rose">
            {lang === "bn" ? "সহায়তা ও তথ্য" : "Help & Concierge"}
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ink mt-2 mb-3">
            {lang === "bn" ? "আমাদের সাথে যোগাযোগ করুন" : "Get in Touch With Us"}
          </h1>
          <p className="text-muted text-sm md:text-base leading-relaxed">
            {lang === "bn"
              ? "অর্ডার সংক্রান্ত জিজ্ঞাসা, পণ্য পরামর্শ বা যেকোনো সহযোগিতার জন্য আমাদের কনসিয়ার্জ টিমের সাথে নির্দ্বিধায় কথা বলুন।"
              : "Have a question about an order, need personalised skincare advice, or want to partner with us? Our dedicated concierge team is here to assist."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Direct Contacts + FAQ */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Cards (Dynamic from WP ACF) */}
            <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-muted uppercase tracking-wider">
                    {lang === "bn" ? "ইমেল সাপোর্ট" : "Email Concierge"}
                  </h2>
                  <a
                    href={`mailto:${email}`}
                    className="text-sm font-bold text-ink hover:text-rose transition-colors"
                  >
                    {email}
                  </a>
                  <p className="text-xs text-muted mt-0.5">
                    {lang === "bn" ? "৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়" : "Replies within 4 hours"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-muted uppercase tracking-wider">
                    {lang === "bn" ? "হোয়াটসঅ্যাপ ও হেল্পলাইন" : "WhatsApp & Phone"}
                  </h2>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-ink hover:text-rose transition-colors block"
                  >
                    {whatsapp}
                  </a>
                  {phone && phone !== whatsapp && (
                    <a
                      href={`tel:${phone.replace(/\s+/g, "")}`}
                      className="text-xs text-muted hover:text-rose transition-colors block mt-0.5"
                    >
                      {phone}
                    </a>
                  )}
                  <p className="text-xs text-muted mt-0.5">{hours}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-line">
                <div className="w-10 h-10 rounded-full bg-plum-50 text-plum flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-muted uppercase tracking-wider">
                    {lang === "bn" ? "হেডকোয়ার্টার ও স্টুডিও" : "Headquarters & Studio"}
                  </h2>
                  <p className="text-sm font-bold text-ink">ABeauty & Fashion Ltd.</p>
                  <p className="text-xs text-muted mt-0.5 whitespace-pre-line">{address}</p>
                </div>
              </div>
            </div>

            {/* Quick Answer FAQs */}
            <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-4">
              <h2 className="font-serif text-lg font-bold text-ink">
                {lang === "bn" ? "সাধারণ প্রশ্নোত্তর" : "Frequently Asked Questions"}
              </h2>
              <div className="divide-y divide-line">
                {faqs.map((faq, index) => (
                  <div key={index} className="py-3">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex justify-between items-center text-left text-sm font-bold text-ink hover:text-rose transition-colors"
                    >
                      <span>{lang === "bn" ? faq.qBn : faq.qEn}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-muted transition-transform shrink-0 ml-2 ${
                          openFaq === index ? "rotate-180 text-rose" : ""
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <p className="text-xs text-muted mt-2 leading-relaxed">
                        {lang === "bn" ? faq.aBn : faq.aEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-card p-6 md:p-8 border border-line shadow-sm">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-2">
                {lang === "bn" ? "আমাদের একটি বার্তা পাঠান" : "Send Us a Message"}
              </h2>
              <p className="text-xs md:text-sm text-muted mb-6">
                {lang === "bn"
                  ? "নিচের ফর্মটি পূরণ করুন, আমাদের একজন কনসালট্যান্ট অতি দ্রুত আপনার সাথে যোগাযোগ করবেন।"
                  : "Fill out the form below and one of our beauty advisors will get back to you promptly."}
              </p>

              {submitted ? (
                <div className="p-8 text-center bg-rose-50 rounded-card border border-rose-200 animate-in fade-in">
                  <div className="w-12 h-12 bg-rose rounded-full text-white flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-ink mb-1">
                    {lang === "bn" ? "বার্তা সফলভাবে পাঠানো হয়েছে!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-xs text-muted max-w-sm mx-auto">
                    {lang === "bn"
                      ? "আমাদের প্রতিনিধি শীঘ্রই আপনার ইমেইল বা হোয়াটসঅ্যাপে যোগাযোগ করবেন।"
                      : "Thank you for reaching out. We will review your message and reply via email or phone shortly."}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1.5">
                        {lang === "bn" ? "আপনার পূর্ণ নাম *" : "Your Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === "bn" ? "যেমন: মারিয়া আক্তার" : "e.g. Maria Akter"}
                        className="w-full h-11 px-3.5 rounded-card border border-line text-sm text-ink outline-none focus:border-rose transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1.5">
                        {lang === "bn" ? "মোবাইল নম্বর *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+880 1700 000000"
                        className="w-full h-11 px-3.5 rounded-card border border-line text-sm text-ink outline-none focus:border-rose transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">
                      {lang === "bn" ? "ইমেইল এড্রেস *" : "Email Address *"}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full h-11 px-3.5 rounded-card border border-line text-sm text-ink outline-none focus:border-rose transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">
                      {lang === "bn" ? "বিষয় *" : "Subject *"}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={
                        lang === "bn"
                          ? "অর্ডার স্ট্যাটাস, পণ্য পরামর্শ বা অন্যান্য"
                          : "Order inquiry, product advice, or partnership"
                      }
                      className="w-full h-11 px-3.5 rounded-card border border-line text-sm text-ink outline-none focus:border-rose transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink mb-1.5">
                      {lang === "bn" ? "বার্তা লিখুন *" : "Your Message *"}
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder={
                        lang === "bn"
                          ? "আপনার অর্ডার আইডি বা বিস্তারিত মতামত এখানে লিখুন..."
                          : "Include order numbers or details so we can best assist you..."
                      }
                      className="w-full p-3.5 rounded-card border border-line text-sm text-ink outline-none focus:border-rose transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 h-12 rounded-pill bg-rose text-white hover:bg-rose-dark font-semibold text-sm transition-all inline-flex items-center justify-center gap-2 shadow-pill"
                  >
                    <span>{lang === "bn" ? "বার্তা পাঠান" : "Submit Message"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
