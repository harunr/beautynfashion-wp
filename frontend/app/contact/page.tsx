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

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
            {/* Quick Contact Cards */}
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
                    href="mailto:support@abeautynfashion.com"
                    className="text-sm font-bold text-ink hover:text-rose transition-colors"
                  >
                    support@abeautynfashion.com
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
                    href="tel:+8801711000000"
                    className="text-sm font-bold text-ink hover:text-rose transition-colors"
                  >
                    +880 1711 000000
                  </a>
                  <p className="text-xs text-muted mt-0.5">
                    {lang === "bn" ? "শনিবার - বৃহস্পতিবার (১০টা - ৮টা)" : "Sat – Thu: 10:00 AM – 8:00 PM"}
                  </p>
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
                  <p className="text-sm font-bold text-ink">
                    ABeauty & Fashion Ltd.
                  </p>
                  <p className="text-xs text-muted mt-0.5">
                    House 42, Road 11, Block D, Banani, Dhaka - 1213, Bangladesh
                  </p>
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
                      <p className="text-xs text-muted leading-relaxed mt-2 pr-4">
                        {lang === "bn" ? faq.aBn : faq.aEn}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-card p-6 md:p-8 border border-line shadow-sm">
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink mb-1">
                {lang === "bn" ? "আমাদের একটি বার্তা পাঠান" : "Send Us a Message"}
              </h2>
              <p className="text-muted text-xs md:text-sm mb-6">
                {lang === "bn"
                  ? "নিচের ফর্মটি পূরণ করুন, আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।"
                  : "Fill out the form below and our beauty concierge team will respond promptly."}
              </p>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-ink">
                    {lang === "bn" ? "আপনার বার্তা সফলভাবে গৃহীত হয়েছে!" : "Message Sent Successfully!"}
                  </h3>
                  <p className="text-muted text-sm max-w-md mx-auto">
                    {lang === "bn"
                      ? "ধন্যবাদ! আমরা আপনার বার্তাটি পেয়েছি এবং আমাদের টিম দ্রুত আপনার ইমেলে উত্তর পাঠাবে।"
                      : "Thank you for reaching out. We have received your inquiry and our support team will get back to you shortly."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="inline-flex h-11 px-6 bg-plum text-white text-sm font-bold rounded-pill hover:bg-plum-900 transition-colors items-center mt-2"
                  >
                    {lang === "bn" ? "আরেকটি বার্তা পাঠান" : "Send Another Message"}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4"
                >
                  {/* Honeypot field for anti-spam */}
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "আপনার নাম *" : "Your Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={lang === "bn" ? "সম্পূর্ণ নাম" : "Full Name"}
                        className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "ইমেল ঠিকানা *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@domain.com"
                        className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "মোবাইল নম্বর" : "Phone Number"}
                      </label>
                      <input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "অর্ডার নম্বর (যদি থাকে)" : "Order ID (Optional)"}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. ABF-98214"
                        className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      {lang === "bn" ? "বিষয় *" : "Subject *"}
                    </label>
                    <select
                      required
                      className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all bg-white"
                    >
                      <option value="">{lang === "bn" ? "বিষয় নির্বাচন করুন" : "Select an inquiry reason"}</option>
                      <option value="order">{lang === "bn" ? "অর্ডার স্ট্যাটাস ও ট্র্যাকিং" : "Order Status & Tracking"}</option>
                      <option value="product">{lang === "bn" ? "পণ্য পরামর্শ ও তথ্য" : "Product Consultation"}</option>
                      <option value="return">{lang === "bn" ? "রিটার্ন বা রিফান্ড" : "Returns & Refunds"}</option>
                      <option value="wholesale">{lang === "bn" ? "হোলসেল বা পার্টনারশিপ" : "Wholesale & Partnerships"}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                      {lang === "bn" ? "আপনার বার্তা *" : "Your Message *"}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={
                        lang === "bn"
                          ? "আপনার প্রশ্ন বা পরামর্শ বিস্তারিত লিখুন..."
                          : "Describe your inquiry or order details in detail..."
                      }
                      className="w-full p-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    className="h-12 px-8 bg-rose text-white font-bold text-sm rounded-pill hover:bg-rose-dark transition-colors inline-flex items-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{lang === "bn" ? "বার্তা পাঠান" : "Send Message"}</span>
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
