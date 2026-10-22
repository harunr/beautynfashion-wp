"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Phone,
  User,
  MapPin,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";

const bdDistricts = [
  "Dhaka (ঢাকা)",
  "Chattogram (চট্টগ্রাম)",
  "Sylhet (সিলেট)",
  "Rajshahi (রাজশাহী)",
  "Khulna (খুলনা)",
  "Barishal (বরিশাল)",
  "Rangpur (রংপুর)",
  "Mymensingh (ময়মনসিংহ)",
  "Gazipur (গাজীপুর)",
  "Narayanganj (নারায়ণগঞ্জ)",
  "Cumilla (কুমিল্লা)",
  "Bogura (বগুড়া)",
  "Cox's Bazar (কক্সবাজার)",
  "Jessore (যশোর)",
  "Kushtia (কুষ্টিয়া)",
  "Faridpur (ফরিদপুর)",
  "Tangail (টাঙ্গাইল)",
  "Noakhali (নোয়াখালী)",
  "Feni (ফেনী)",
  "Dinajpur (দিনাজপুর)",
];

export default function CheckoutPage() {
  const { lang, formatPrice, toBnDigits } = useLanguage();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState(bdDistricts[0]);
  const [thana, setThana] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [deliveryZone, setDeliveryZone] = useState<"inside" | "outside">("inside");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "nagad" | "card">("cod");
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Cart values
  const subtotalUSD = 52.0;
  const subtotalBDT = 5850;

  const shippingUSD = 0; // Free over threshold
  const shippingBDT = deliveryZone === "inside" ? 60 : 120;

  const totalUSD = subtotalUSD + shippingUSD;
  const totalBDT = subtotalBDT + shippingBDT;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-container mx-auto px-4 md:px-8 lg:px-14">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted mb-6">
            <Link href="/cart" className="hover:text-rose transition-colors">
              {lang === "bn" ? "শপিং ব্যাগ" : "Cart"}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">{lang === "bn" ? "চেকআউট" : "Checkout"}</span>
          </div>

          <h1
            className={`text-3xl md:text-4xl font-bold text-ink mb-8 ${
              lang === "bn" ? "font-anek" : "font-bricolage"
            }`}
          >
            {lang === "bn" ? "নিরাপদ চেকআউট" : "Secure Checkout"}
          </h1>

          {orderPlaced ? (
            /* Order Success Modal State */
            <div className="max-w-xl mx-auto p-8 rounded-card-lg bg-blush-50 border border-line text-center flex flex-col items-center gap-4 shadow-card">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center text-success mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-bricolage text-2xl md:text-3xl font-bold text-ink">
                {lang === "bn" ? "অর্ডার সফলভাবে সম্পন্ন হয়েছে!" : "Order Confirmed!"}
              </h2>
              <p className="text-muted text-sm md:text-base leading-relaxed">
                {lang === "bn"
                  ? `ধন্যবাদ, ${fullName || "সম্মানিত গ্রাহক"}! আপনার অর্ডারটি গ্রহণ করা হয়েছে। আমাদের কাস্টমার প্রতিনিধি শীঘ্রই ফোন করে নিশ্চিত করবেন।`
                  : `Thank you for choosing ABeauty & Fashion! Your order has been placed. We've sent details to your contact.`}
              </p>
              <div className="p-4 rounded-card bg-white border border-line w-full text-xs md:text-sm text-ink space-y-1 my-2">
                <p>
                  <strong>{lang === "bn" ? "অর্ডার নং:" : "Order ID:"}</strong> #ABF-
                  {lang === "bn" ? toBnDigits(94821) : "94821"}
                </p>
                <p>
                  <strong>{lang === "bn" ? "পেমেন্ট পদ্ধতি:" : "Payment:"}</strong>{" "}
                  {paymentMethod === "cod"
                    ? lang === "bn"
                      ? "ক্যাশ অন ডেলিভারি"
                      : "Cash on Delivery"
                    : paymentMethod.toUpperCase()}
                </p>
                <p>
                  <strong>{lang === "bn" ? "সর্বমোট প্রদেয়:" : "Total Amount:"}</strong>{" "}
                  {formatPrice(totalUSD, totalBDT)}
                </p>
              </div>
              <Link
                href="/shop"
                className="h-12 px-8 rounded-pill bg-ink text-white font-semibold text-sm hover:bg-rose transition-colors inline-flex items-center gap-2 shadow-pill"
              >
                <span>{lang === "bn" ? "আরও শপিং করুন" : "Continue Shopping"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Checkout Step Cards */}
              <div className="lg:col-span-8 flex flex-col gap-8">
                {/* Step 1: Customer Contact Info */}
                <div className="p-6 rounded-card bg-white border border-line flex flex-col gap-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-line">
                    <span className="w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
                      1
                    </span>
                    <h2 className="font-bold text-base md:text-lg text-ink font-bricolage">
                      {lang === "bn" ? "গ্রাহকের তথ্য ও ফোন নম্বর" : "Contact Information"}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                        {lang === "bn" ? "আপনার পূর্ণ নাম *" : "Full Name *"}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={lang === "bn" ? "যেমন: জান্নাতুল ফেরদৌস" : "Jane Doe"}
                          className="w-full h-11 pl-10 pr-3 rounded-card bg-[#F8F1F3] border border-transparent text-sm outline-none focus:border-line-strong"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                        {lang === "bn" ? "মোবাইল নম্বর *" : "Phone Number (WhatsApp) *"}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder={lang === "bn" ? "০১৭XXXXXXXX" : "+880 17XX-XXXXXX"}
                          className="w-full h-11 pl-10 pr-3 rounded-card bg-[#F8F1F3] border border-transparent text-sm outline-none focus:border-line-strong font-mono"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                        {lang === "bn" ? "ইমেইল ঠিকানা (ঐচ্ছিক)" : "Email Address (Optional)"}
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-transparent text-sm outline-none focus:border-line-strong"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Shipping Address & Zone */}
                <div className="p-6 rounded-card bg-white border border-line flex flex-col gap-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-line">
                    <span className="w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
                      2
                    </span>
                    <h2 className="font-bold text-base md:text-lg text-ink font-bricolage">
                      {lang === "bn" ? "ডেলিভারি ঠিকানা ও এলাকা" : "Delivery Address & Zone"}
                    </h2>
                  </div>

                  {/* Delivery Zone Radio Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label
                      className={`p-4 rounded-card border-2 flex items-center justify-between cursor-pointer transition-all ${
                        deliveryZone === "inside"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="zone"
                          checked={deliveryZone === "inside"}
                          onChange={() => setDeliveryZone("inside")}
                          className="w-4 h-4 text-rose accent-rose cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-sm text-ink">
                            {lang === "bn" ? "ঢাকা সিটির ভেতরে" : "Inside Dhaka"}
                          </p>
                          <p className="text-xs text-muted">
                            {lang === "bn" ? "২৪–৪৮ ঘণ্টার মধ্যে ডেলিভারি" : "24–48 hours delivery"}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-ink">{formatPrice(0, 60)}</span>
                    </label>

                    <label
                      className={`p-4 rounded-card border-2 flex items-center justify-between cursor-pointer transition-all ${
                        deliveryZone === "outside"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="zone"
                          checked={deliveryZone === "outside"}
                          onChange={() => setDeliveryZone("outside")}
                          className="w-4 h-4 text-rose accent-rose cursor-pointer"
                        />
                        <div>
                          <p className="font-bold text-sm text-ink">
                            {lang === "bn" ? "ঢাকার বাইরে (সারা দেশ)" : "Outside Dhaka"}
                          </p>
                          <p className="text-xs text-muted">
                            {lang === "bn" ? "২–৪ দিনের মধ্যে ডেলিভারি" : "2–4 days delivery"}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-sm text-ink">{formatPrice(5.0, 120)}</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                        {lang === "bn" ? "জেলা নির্বাচন করুন *" : "District *"}
                      </label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-transparent text-sm font-medium outline-none cursor-pointer focus:border-line-strong"
                      >
                        {bdDistricts.map((d, i) => (
                          <option key={i} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                        {lang === "bn" ? "থানা / উপজেলা *" : "Thana / Area *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                        placeholder={lang === "bn" ? "যেমন: গুলশান / ধানমন্ডি" : "e.g. Gulshan / Banani"}
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-transparent text-sm outline-none focus:border-line-strong"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-muted mb-1.5">
                        {lang === "bn" ? "পূর্ণ ঠিকানা (বাসা নং, রোড নং) *" : "Full Street Address *"}
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-muted absolute left-3.5 top-3.5" />
                        <textarea
                          rows={2}
                          required
                          value={streetAddress}
                          onChange={(e) => setStreetAddress(e.target.value)}
                          placeholder={
                            lang === "bn"
                              ? "বাসা নং, রোড নং, ফ্ল্যাট, এলাকার নাম বিস্তারিত লিখুন"
                              : "House number, street name, apartment or suite"
                          }
                          className="w-full p-3 pl-10 rounded-card bg-[#F8F1F3] border border-transparent text-sm outline-none focus:border-line-strong resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3: Payment Method Selector */}
                <div className="p-6 rounded-card bg-white border border-line flex flex-col gap-5">
                  <div className="flex items-center gap-3 pb-3 border-b border-line">
                    <span className="w-7 h-7 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center">
                      3
                    </span>
                    <h2 className="font-bold text-base md:text-lg text-ink font-bricolage">
                      {lang === "bn" ? "পেমেন্ট মাধ্যম নির্বাচন" : "Payment Method"}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {/* Cash on Delivery (COD) */}
                    <label
                      className={`p-4 rounded-card border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          className="w-4 h-4 text-rose accent-rose cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Banknote className="w-5 h-5 text-rose" />
                          <div>
                            <p className="font-bold text-sm text-ink">
                              {lang === "bn" ? "ক্যাশ অন ডেলিভারি (COD)" : "Cash on Delivery"}
                            </p>
                            <p className="text-xs text-muted">
                              {lang === "bn" ? "পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন" : "Pay in cash upon delivery"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-pill bg-success-bg text-success text-xs font-bold">
                        {lang === "bn" ? "জনপ্রিয়" : "Popular"}
                      </span>
                    </label>

                    {/* bKash */}
                    <label
                      className={`p-4 rounded-card border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === "bkash"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "bkash"}
                          onChange={() => setPaymentMethod("bkash")}
                          className="w-4 h-4 text-rose accent-rose cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5 text-pink-600" />
                          <div>
                            <p className="font-bold text-sm text-ink">bKash (বিকাশ অনলাইন)</p>
                            <p className="text-xs text-muted">
                              {lang === "bn" ? "বিকাশ পেমেন্ট গেটওয়ে" : "Instant mobile payment via bKash"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-muted">Instant</span>
                    </label>

                    {/* Nagad */}
                    <label
                      className={`p-4 rounded-card border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === "nagad"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "nagad"}
                          onChange={() => setPaymentMethod("nagad")}
                          className="w-4 h-4 text-rose accent-rose cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-5 h-5 text-orange-600" />
                          <div>
                            <p className="font-bold text-sm text-ink">Nagad (নগদ অনলাইন)</p>
                            <p className="text-xs text-muted">
                              {lang === "bn" ? "নগদ পেমেন্ট গেটওয়ে" : "Instant mobile payment via Nagad"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-muted">Instant</span>
                    </label>

                    {/* Credit / Debit Card */}
                    <label
                      className={`p-4 rounded-card border-2 flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "border-ink bg-blush-50 shadow-sm"
                          : "border-line bg-white hover:border-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-4 h-4 text-rose accent-rose cursor-pointer"
                        />
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-indigo-600" />
                          <div>
                            <p className="font-bold text-sm text-ink">
                              {lang === "bn" ? "ভিসা / মাস্টারকার্ড" : "Credit / Debit Card"}
                            </p>
                            <p className="text-xs text-muted">SSLCommerz / Visa / Mastercard</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Right Column: Sticky Order Summary & Confirm Button */}
              <div className="lg:col-span-4 sticky top-28">
                <div className="p-6 rounded-card-lg bg-blush-50 border border-line shadow-card flex flex-col gap-5">
                  <h2
                    className={`text-xl font-bold text-ink ${
                      lang === "bn" ? "font-anek" : "font-bricolage"
                    }`}
                  >
                    {lang === "bn" ? "অর্ডার সারাংশ" : "Order Summary"}
                  </h2>

                  <div className="space-y-3 text-xs md:text-sm text-ink pb-4 border-b border-line">
                    <div className="flex items-center justify-between">
                      <span className="text-muted">{lang === "bn" ? "পণ্য মূল্য (২টি)" : "Items Subtotal"}</span>
                      <span className="font-bold">{formatPrice(subtotalUSD, subtotalBDT)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted">{lang === "bn" ? "ডেলিভারি চার্জ" : "Delivery Charge"}</span>
                      <span className="font-bold">{formatPrice(shippingUSD, shippingBDT)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-base font-bold text-ink">
                      {lang === "bn" ? "মোট প্রদেয়" : "Total to Pay"}
                    </span>
                    <span className="text-2xl font-bold text-ink font-bricolage">
                      {formatPrice(totalUSD, totalBDT)}
                    </span>
                  </div>

                  {/* Place Order CTA */}
                  <button
                    type="submit"
                    className="w-full h-14 rounded-pill bg-rose text-white hover:bg-rose-dark transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-pill mt-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>
                      {lang === "bn"
                        ? `অর্ডার কনফার্ম করুন • ${formatPrice(totalUSD, totalBDT)}`
                        : `Place Order • ${formatPrice(totalUSD, totalBDT)}`}
                    </span>
                  </button>

                  <p className="text-[11px] text-muted text-center leading-normal">
                    {lang === "bn"
                      ? "অর্ডার সম্পন্ন করার মাধ্যমে আপনি আমাদের শর্তাবলী ও প্রাইভেসি পলিসিতে সম্মতি দিচ্ছেন।"
                      : "By placing this order you agree to our Terms & Conditions and Privacy Policy."}
                  </p>

                  {/* Security Highlights */}
                  <div className="pt-3 border-t border-line flex flex-col gap-2 text-xs text-muted">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-rose" />
                      <span>{lang === "bn" ? "১০০% অরিজিনাল ব্র্যান্ডের নিশ্চয়তা" : "100% Genuine Brands Guarantee"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-rose" />
                      <span>
                        {lang === "bn"
                          ? "পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা"
                          : "Pay upon product delivery"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
