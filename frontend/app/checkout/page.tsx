"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  User,
  MapPin,
  Banknote,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";
import { useCart } from "@/lib/cart/context";
import { useAuth } from "@/lib/auth/context";

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
  const { user, isLoggedIn, token, refreshOrders } = useAuth();
  const {
    items,
    itemsCount,
    subtotalUSD,
    subtotalBDT,
    discountUSD,
    discountBDT,
    shippingCity,
    shippingCostUSD,
    shippingCostBDT,
    setShippingCity,
    totalUSD,
    totalBDT,
    clearCart,
  } = useCart();

  // Form states
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState(bdDistricts[0]);
  const [thana, setThana] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "card">("cod");
  const [orderNotes, setOrderNotes] = useState("");

  // Sign up offer during checkout (for guest visitors)
  const [createAccount, setCreateAccount] = useState(false);
  const [accountPassword, setAccountPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [accountCreatedDuringOrder, setAccountCreatedDuringOrder] = useState(false);

  // Auto-populate customer details if logged in
  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(user.name || "");
      if (!email) setEmail(user.email || "");
      if (!phoneNumber) setPhoneNumber(user.phone || user.shipping?.phone || user.billing?.phone || "");
      if (user.shipping?.address_1 && !streetAddress) {
        setStreetAddress(user.shipping.address_1);
      }
      if (user.shipping?.city) {
        const match = bdDistricts.find((d) =>
          d.toLowerCase().includes((user.shipping.city || "").toLowerCase())
        );
        if (match) setDistrict(match);
      }
    }
  }, [user, fullName, email, phoneNumber, streetAddress]);

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDistrict(val);
    if (val.toLowerCase().includes("dhaka")) {
      setShippingCity("dhaka");
    } else {
      setShippingCity("outside");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (items.length === 0) {
      setSubmitError(
        lang === "bn"
          ? "আপনার ব্যাগ খালি। অনুগ্রহ করে পণ্য যোগ করুন।"
          : "Your bag is empty. Please add items before checking out."
      );
      return;
    }

    if (!isLoggedIn && createAccount && accountPassword.length < 6) {
      setSubmitError(
        lang === "bn"
          ? "অ্যাকাউন্ট তৈরির জন্য পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
          : "Password must be at least 6 characters to create an account."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        district,
        thana: thana.trim(),
        streetAddress: streetAddress.trim(),
        orderNotes: orderNotes.trim(),
        paymentMethod,
        createAccount: !isLoggedIn && createAccount,
        accountPassword: !isLoggedIn && createAccount ? accountPassword : "",
        shippingCostBDT,
        items: items.map((item) => ({
          id: item.id,
          titleEn: item.titleEn,
          titleBn: item.titleBn,
          priceBDT: item.priceBDT,
          quantity: item.quantity,
          image: item.image,
        })),
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to process your order. Please try again.");
      }

      // If user opted to create account during checkout, save session
      if (data.auth_token && data.user) {
        try {
          localStorage.setItem(
            "abf_customer_auth_v1",
            JSON.stringify({ token: data.auth_token, user: data.user })
          );
          setAccountCreatedDuringOrder(true);
        } catch (err) {
          console.warn("Could not save new account session", err);
        }
      }

      setOrderNumber(data.order_number || data.order_id?.toString() || "ABF-SUCCESS");
      setOrderPlaced(true);
      clearCart();

      // Refresh customer orders in context if authenticated
      if (token || data.auth_token) {
        refreshOrders();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="text-ink font-semibold">{lang === "bn" ? "নিরাপদ চেকআউট" : "Secure Checkout"}</span>
          </div>

          <h1
            className={`text-3xl md:text-4xl font-bold text-ink mb-8 ${
              lang === "bn" ? "font-anek" : "font-bricolage"
            }`}
          >
            {lang === "bn" ? "নিরাপদ চেকআউট" : "Complete Your Order"}
          </h1>

          {orderPlaced ? (
            /* ================= ORDER SUCCESS VIEW ================= */
            <div className="max-w-xl mx-auto p-8 rounded-card-lg bg-blush-50 border border-line text-center flex flex-col items-center gap-4 shadow-card animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-success-bg text-success flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-rose uppercase tracking-wider">
                  Order Confirmed
                </span>
                <h2 className="text-2xl font-bold text-ink mt-1 font-bricolage">
                  {lang === "bn" ? "ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে।" : "Thank You for Your Order!"}
                </h2>
                <p className="text-muted text-sm mt-1">
                  {lang === "bn"
                    ? `অর্ডার রেফারেন্স নম্বর: #${orderNumber} • শীঘ্রই আমাদের প্রতিনিধি কল করে কনফার্ম করবেন`
                    : `Order reference: #${orderNumber} • Our beauty advisor will call to confirm dispatch.`}
                </p>
              </div>

              {accountCreatedDuringOrder && (
                <div className="w-full p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {lang === "bn"
                      ? "আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! আপনি এখন সাইন-ইন অবস্থায় আছেন।"
                      : "Your account was successfully created! You are now signed in."}
                  </span>
                </div>
              )}

              <div className="w-full bg-white rounded-card p-4 border border-line text-xs text-left flex flex-col gap-2 my-2 shadow-xs">
                <div className="flex justify-between">
                  <span className="text-muted">{lang === "bn" ? "অর্ডার আইডি:" : "Order ID:"}</span>
                  <span className="font-bold text-ink font-bricolage">#{orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{lang === "bn" ? "গ্রাহকের নাম:" : "Name:"}</span>
                  <span className="font-bold text-ink">{fullName || "Valued Customer"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{lang === "bn" ? "মোবাইল:" : "Phone:"}</span>
                  <span className="font-bold text-ink">{phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{lang === "bn" ? "ডেলিভারি ঠিকানা:" : "Address:"}</span>
                  <span className="font-bold text-ink">
                    {streetAddress ? `${streetAddress}, ${district}` : district}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">{lang === "bn" ? "পেমেন্ট মাধ্যম:" : "Payment:"}</span>
                  <span className="font-bold text-rose uppercase">{paymentMethod}</span>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-sm">
                  <span className="font-bold text-ink">{lang === "bn" ? "পরিশোধযোগ্য মোট:" : "Total Amount:"}</span>
                  <span className="font-bold text-ink font-bricolage">{formatPrice(totalUSD, totalBDT)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                <Link
                  href={`/track-order?order_id=${encodeURIComponent(orderNumber)}&phone=${encodeURIComponent(phoneNumber)}`}
                  className="h-11 rounded-pill bg-ink text-white font-bold text-xs inline-flex items-center justify-center gap-2 hover:bg-rose transition-colors shadow-pill"
                >
                  <Truck className="w-4 h-4" />
                  <span>{lang === "bn" ? "অর্ডার ট্র্যাক করুন" : "Track Your Order"}</span>
                </Link>

                <Link
                  href="/account"
                  className="h-11 rounded-pill bg-[#F8F1F3] hover:bg-blush-200 text-plum font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors border border-line"
                >
                  <User className="w-4 h-4" />
                  <span>{lang === "bn" ? "আমার অ্যাকাউন্টে দেখুন" : "View in My Account"}</span>
                </Link>
              </div>

              {/* WhatsApp instant inquiry */}
              <a
                href={`https://wa.me/8801811377577?text=${encodeURIComponent(
                  `Hello ABeauty & Fashion, I just placed Order #${orderNumber} for total ${totalBDT} BDT. Please confirm delivery.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-pill bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] font-bold text-xs inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === "bn" ? "হোয়াটসঅ্যাপে অর্ডার কনফার্ম করুন" : "WhatsApp Quick Confirm"}</span>
              </a>

              <Link
                href="/shop"
                className="text-xs text-muted hover:text-rose font-semibold transition-colors mt-2"
              >
                ← {lang === "bn" ? "আরও কেনাকাটা করুন" : "Continue Shopping"}
              </Link>
            </div>
          ) : (
            /* ================= CHECKOUT FORM ================= */
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* Form Left (Shipping & Payment Details) */}
              <div className="lg:col-span-7 flex flex-col gap-8">
                {/* Logged in notification banner */}
                {isLoggedIn && user && (
                  <div className="p-4 rounded-card-lg bg-emerald-50/70 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span className="font-bold">{lang === "bn" ? "লগইন করা আছে:" : "Signed in as:"}</span>{" "}
                        {user.name} ({user.email})
                      </div>
                    </div>
                    <Link href="/account" className="text-emerald-700 font-bold hover:underline">
                      {lang === "bn" ? "অ্যাকাউন্ট" : "Manage"}
                    </Link>
                  </div>
                )}

                {submitError && (
                  <div className="p-4 rounded-card-lg bg-rose-50 border border-rose-200 text-rose text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* 1. Customer Information */}
                <div className="bg-white p-6 rounded-card-lg border border-line flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-lg text-ink font-bricolage border-b border-line pb-3">
                    <User className="w-5 h-5 text-rose" />
                    <span>{lang === "bn" ? "১. গ্রাহকের তথ্য" : "1. Customer Information"}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-ink mb-1.5">
                        {lang === "bn" ? "পূর্ণ নাম *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={lang === "bn" ? "যেমন: তানিয়া আহমেদ" : "e.g. Samantha Rahman"}
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-ink mb-1.5">
                        {lang === "bn" ? "মোবাইল নম্বর *" : "Phone Number *"}
                      </label>
                      <input
                        type="tel"
                        required
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-ink mb-1.5">
                        {lang === "bn" ? "ইমেইল এড্রেস *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs"
                      />
                    </div>
                  </div>

                  {/* SIGN UP OFFER ON CHECKOUT (GUESTS ONLY) */}
                  {!isLoggedIn && (
                    <div className="mt-2 pt-4 border-t border-line/70">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={createAccount}
                          onChange={(e) => setCreateAccount(e.target.checked)}
                          className="mt-0.5 rounded text-rose focus:ring-rose accent-rose w-4 h-4 cursor-pointer"
                        />
                        <div className="flex-1">
                          <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-rose" />
                            {lang === "bn"
                              ? "পরবর্তী দ্রুত চেকআউট ও ট্র্যাকিংয়ের জন্য একটি অ্যাকাউন্ট তৈরি করুন?"
                              : "Create an account for faster checkout & live tracking next time?"}
                          </span>
                          <p className="text-[11px] text-muted mt-0.5">
                            {lang === "bn"
                              ? "একটি পাসওয়ার্ড সেট করুন, আপনার অর্ডারটি সরাসরি আপনার নতুন অ্যাকাউন্টে সংরক্ষিত হবে।"
                              : "Set a password to manage addresses, re-order favorites, and see live tracking."}
                          </p>
                        </div>
                      </label>

                      {createAccount && (
                        <div className="mt-3 pl-6 animate-in fade-in duration-200">
                          <label className="block font-bold text-ink text-xs mb-1.5">
                            {lang === "bn" ? "পাসওয়ার্ড সেট করুন (কমপক্ষে ৬ অক্ষর) *" : "Set Account Password (Min 6 characters) *"}
                          </label>
                          <div className="relative max-w-sm">
                            <input
                              type={showPassword ? "text" : "password"}
                              required={createAccount}
                              value={accountPassword}
                              onChange={(e) => setAccountPassword(e.target.value)}
                              placeholder="••••••••"
                              className="w-full h-10 px-3.5 pr-10 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-2.5 text-muted hover:text-ink"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. Delivery Address */}
                <div className="bg-white p-6 rounded-card-lg border border-line flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-lg text-ink font-bricolage border-b border-line pb-3">
                    <MapPin className="w-5 h-5 text-rose" />
                    <span>{lang === "bn" ? "২. ডেলিভারি ঠিকানা" : "2. Delivery Address"}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-ink mb-1.5">
                        {lang === "bn" ? "জেলা নির্বাচন করুন *" : "District *"}
                      </label>
                      <select
                        value={district}
                        onChange={handleDistrictChange}
                        className="w-full h-11 px-3 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs font-medium cursor-pointer"
                      >
                        {bdDistricts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-ink mb-1.5">
                        {lang === "bn" ? "থানা / এলাকা *" : "Thana / Area *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={thana}
                        onChange={(e) => setThana(e.target.value)}
                        placeholder={lang === "bn" ? "যেমন: ধানমন্ডি / গুলশান / উত্তরা" : "e.g. Dhanmondi, Gulshan, Uttara"}
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-ink mb-1.5">
                        {lang === "bn" ? "সম্পূর্ণ বিস্তারিত ঠিকানা (বাসা, রোড, ফ্ল্যাট) *" : "Full Street Address *"}
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={streetAddress}
                        onChange={(e) => setStreetAddress(e.target.value)}
                        placeholder={lang === "bn" ? "বাড়ি নং, রোড নং, ব্লক/সেক্টর ও ল্যান্ডমার্ক..." : "House, Road, Block/Sector, landmark details..."}
                        className="w-full p-3 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-ink mb-1.5">
                        {lang === "bn" ? "ডেলিভারি নোট (ঐচ্ছিক)" : "Delivery Instructions (Optional)"}
                      </label>
                      <input
                        type="text"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder={lang === "bn" ? "নির্দিষ্ট সময়ে কল দেওয়া বা বিশেষ নির্দেশনা" : "Any specific delivery instructions"}
                        className="w-full h-11 px-3.5 rounded-card bg-[#F8F1F3] border border-line text-ink outline-none focus:border-rose text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="bg-white p-6 rounded-card-lg border border-line flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-lg text-ink font-bricolage border-b border-line pb-3">
                    <Banknote className="w-5 h-5 text-rose" />
                    <span>{lang === "bn" ? "৩. পেমেন্ট পদ্ধতি" : "3. Payment Method"}</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    {/* COD */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-card border cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "bg-blush-50 border-rose shadow-xs"
                          : "bg-white border-line hover:border-line-strong"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="mt-0.5 text-rose focus:ring-rose"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-ink">
                            {lang === "bn" ? "ক্যাশ অন ডেলিভারি (COD)" : "Cash on Delivery (COD)"}
                          </span>
                          <span className="text-[11px] font-bold text-success bg-success-bg px-2 py-0.5 rounded-pill">
                            {lang === "bn" ? "জনপ্রিয়" : "Most Popular"}
                          </span>
                        </div>
                        <p className="text-xs text-muted mt-1">
                          {lang === "bn"
                            ? "পণ্য হাতে পেয়ে দেখে মূল্য পরিশোধ করুন।"
                            : "Pay safely with cash when your package is delivered to your doorstep."}
                        </p>
                      </div>
                    </label>

                    {/* bKash / Nagad */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-card border cursor-pointer transition-all ${
                        paymentMethod === "bkash"
                          ? "bg-blush-50 border-rose shadow-xs"
                          : "bg-white border-line hover:border-line-strong"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "bkash"}
                        onChange={() => setPaymentMethod("bkash")}
                        className="mt-0.5 text-rose focus:ring-rose"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-ink">
                            {lang === "bn" ? "বিকাশ / নগদ মোবাইল ব্যাংকিং" : "bKash / Nagad Mobile Banking"}
                          </span>
                          <span className="text-[11px] font-bold text-rose">Instant Pay</span>
                        </div>
                        <p className="text-xs text-muted mt-1">
                          {lang === "bn"
                            ? "বিকাশ বা নগদ মার্চেন্ট নাম্বারে সরাসরি পেমেন্ট করুন।"
                            : "Direct secure transfer to our official verified merchant account."}
                        </p>
                      </div>
                    </label>

                    {/* Card */}
                    <label
                      className={`flex items-start gap-3 p-4 rounded-card border cursor-pointer transition-all ${
                        paymentMethod === "card"
                          ? "bg-blush-50 border-rose shadow-xs"
                          : "bg-white border-line hover:border-line-strong"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === "card"}
                        onChange={() => setPaymentMethod("card")}
                        className="mt-0.5 text-rose focus:ring-rose"
                      />
                      <div className="flex-1">
                        <span className="font-bold text-sm text-ink block">
                          {lang === "bn" ? "ভিসা / মাস্টারকার্ড" : "Credit / Debit Card (Visa / Mastercard)"}
                        </span>
                        <p className="text-xs text-muted mt-1">
                          {lang === "bn"
                            ? "এসএসএল কমার্জের মাধ্যমে নিরাপদ কার্ড পেমেন্ট।"
                            : "Encrypted 256-bit SSL transaction for domestic & international cards."}
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Right (Order Summary & Submit) */}
              <div className="lg:col-span-5 bg-blush-50/70 p-6 rounded-card-lg border border-line flex flex-col gap-5 sticky top-36">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <h2 className="font-bold text-lg text-ink font-bricolage">
                    {lang === "bn" ? "অর্ডারের বিবরণ" : "Order Summary"}
                  </h2>
                  <span className="text-xs font-bold text-muted">
                    {lang === "bn" ? `${toBnDigits(itemsCount)} টি পণ্য` : `${itemsCount} items`}
                  </span>
                </div>

                {/* Items Mini List */}
                <div className="divide-y divide-line max-h-72 overflow-y-auto pr-1">
                  {items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="py-3 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="relative w-12 h-14 rounded-card bg-white overflow-hidden shrink-0 border border-line">
                          {item.image && (
                            <Image
                              src={item.image}
                              alt={item.titleEn}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-ink truncate">
                            {lang === "bn" ? item.titleBn : item.titleEn}
                          </p>
                          <p className="text-muted text-[11px]">
                            Qty: {lang === "bn" ? toBnDigits(item.quantity) : item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="font-bold text-ink font-bricolage shrink-0">
                        {formatPrice(
                          item.priceUSD * item.quantity,
                          item.priceBDT * item.quantity
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="flex flex-col gap-2 pt-3 border-t border-line text-xs">
                  <div className="flex justify-between text-muted">
                    <span>{lang === "bn" ? "উপমোট (Subtotal)" : "Subtotal"}</span>
                    <span className="font-semibold text-ink font-bricolage">
                      {formatPrice(subtotalUSD, subtotalBDT)}
                    </span>
                  </div>

                  {discountUSD > 0 && (
                    <div className="flex justify-between text-success font-semibold">
                      <span>{lang === "bn" ? "কুপন ডিসকাউন্ট" : "Discount"}</span>
                      <span>-{formatPrice(discountUSD, discountBDT)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-muted">
                    <span>
                      {lang === "bn"
                        ? `ডেলিভারি চার্জ (${shippingCity === "dhaka" ? "ঢাকা" : "ঢাকার বাইরে"})`
                        : `Delivery (${shippingCity === "dhaka" ? "Dhaka" : "Outside"})`}
                    </span>
                    <span className="font-semibold text-ink">
                      {shippingCostUSD === 0 ? (
                        <span className="text-success font-bold">
                          {lang === "bn" ? "ফ্রি" : "FREE"}
                        </span>
                      ) : (
                        formatPrice(shippingCostUSD, shippingCostBDT)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-line font-bold text-base text-ink">
                    <span>{lang === "bn" ? "পরিশোধযোগ্য মোট:" : "Grand Total:"}</span>
                    <span className="text-2xl font-bricolage text-ink">
                      {formatPrice(totalUSD, totalBDT)}
                    </span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  disabled={items.length === 0 || isSubmitting}
                  className="w-full h-14 md:h-16 min-h-[56px] md:min-h-[60px] py-4 px-6 rounded-pill bg-ink hover:bg-rose text-white font-bold text-base md:text-lg inline-flex items-center justify-center gap-2.5 shadow-pill hover:shadow-card transition-all disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{lang === "bn" ? "অর্ডার প্রক্রিয়া করা হচ্ছে..." : "Processing Order..."}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 shrink-0" />
                      <span>
                        {lang === "bn" ? "অর্ডার নিশ্চিত করুন" : "Confirm & Place Order"}
                      </span>
                    </>
                  )}
                </button>

                <div className="flex flex-col gap-2 text-[11px] text-muted pt-2 border-t border-line">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success shrink-0" />
                    <span>
                      {lang === "bn"
                        ? "১০০% খাঁটি পণ্য ও গোপনীয়তার নিশ্চয়তা"
                        : "100% Genuine Imported Products"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-rose shrink-0" />
                    <span>
                      {lang === "bn"
                        ? "ঢাকার ভেতরে ২৪-৪৮ ঘণ্টা ও সারাদেশে ৩-৪ দিনে ডেলিভারি"
                        : "Fast shipping via trusted couriers (Steadfast / Pathao)"}
                    </span>
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
