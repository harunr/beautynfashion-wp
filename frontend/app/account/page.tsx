"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Eye,
  Clock,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

export default function AccountPage() {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const [activeTab, setActiveTab] = useState<"dashboard" | "orders" | "addresses" | "wishlist" | "details">("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default view as logged-in user demo, with switchable view
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  // Mock order list matching WooCommerce data
  const orders = [
    {
      id: "ABF-98214",
      date: "Oct 20, 2026",
      dateBn: "২০ অক্টোবর ২০২৬",
      status: "Processing",
      statusBn: "প্রক্রিয়াধীন",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      total: 78.0,
      itemsCount: 2,
    },
    {
      id: "ABF-97802",
      date: "Sep 15, 2026",
      dateBn: "১৫ সেপ্টেম্বর ২০২৬",
      status: "Delivered",
      statusBn: "বিতরণ সম্পন্ন",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      total: 125.0,
      itemsCount: 3,
    },
    {
      id: "ABF-96410",
      date: "Aug 02, 2026",
      dateBn: "০২ আগস্ট ২০২৬",
      status: "Delivered",
      statusBn: "বিতরণ সম্পন্ন",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      total: 45.0,
      itemsCount: 1,
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
            {lang === "bn" ? "আমার অ্যাকাউন্ট" : "My Account"}
          </span>
        </nav>

        {!isLoggedIn ? (
          /* Authentication Screen (Sign In / Register) */
          <div className="max-w-md mx-auto bg-white rounded-card p-6 md:p-8 border border-line shadow-sm">
            {/* Tabs Header */}
            <div className="flex border-b border-line mb-6">
              <button
                type="button"
                onClick={() => setAuthMode("login")}
                className={`flex-1 pb-3 text-center font-bold text-base transition-all border-b-2 ${
                  authMode === "login"
                    ? "border-rose text-rose"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {lang === "bn" ? "সাইন ইন" : "Sign In"}
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("register")}
                className={`flex-1 pb-3 text-center font-bold text-base transition-all border-b-2 ${
                  authMode === "register"
                    ? "border-rose text-rose"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {lang === "bn" ? "অ্যাকাউন্ট তৈরি" : "Register"}
              </button>
            </div>

            {authMode === "login" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "ইমেল বা ফোন নম্বর *" : "Email or Phone Number *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "bn" ? "01XXXXXXXXX বা email@domain.com" : "01XXXXXXXXX or email@domain.com"}
                    className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wider">
                      {lang === "bn" ? "পাসওয়ার্ড *" : "Password *"}
                    </label>
                    <a href="#forgot" className="text-xs text-rose hover:underline">
                      {lang === "bn" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot password?"}
                    </a>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                  />
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 rounded text-rose focus:ring-rose accent-rose"
                  />
                  <label htmlFor="remember" className="text-xs text-muted cursor-pointer select-none">
                    {lang === "bn" ? "আমাকে মনে রাখুন" : "Remember me"}
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-plum text-white font-bold rounded-pill hover:bg-plum-900 transition-colors shadow-sm mt-2"
                >
                  {lang === "bn" ? "প্রবেশ করুন" : "Sign In"}
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsLoggedIn(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "সম্পূর্ণ নাম *" : "Full Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={lang === "bn" ? "আপনার নাম" : "Your full name"}
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
                    placeholder="name@example.com"
                    className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "মোবাইল নম্বর *" : "Mobile Number *"}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="01XXXXXXXXX"
                    className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "পাসওয়ার্ড তৈরি করুন *" : "Create Password *"}
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full h-11 px-3.5 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-rose text-white font-bold rounded-pill hover:bg-rose-dark transition-colors shadow-sm mt-2"
                >
                  {lang === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account"}
                </button>
              </form>
            )}
          </div>
        ) : (
          /* Dashboard with responsive sidebar */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-card p-5 border border-line shadow-sm space-y-1">
                {/* User Info Capsule */}
                <div className="flex items-center gap-3.5 pb-4 mb-3 border-b border-line">
                  <div className="w-12 h-12 rounded-full bg-plum-50 border border-plum-200 text-plum font-serif text-xl font-bold flex items-center justify-center">
                    A
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-ink leading-tight">
                      {lang === "bn" ? "আফরিন সুলতানা" : "Afrin Sultana"}
                    </h2>
                    <p className="text-xs text-muted">afrin@example.com</p>
                  </div>
                </div>

                <nav className="space-y-1 text-sm font-medium">
                  <button
                    type="button"
                    onClick={() => setActiveTab("dashboard")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-pill transition-all ${
                      activeTab === "dashboard"
                        ? "bg-plum text-white font-bold shadow-sm"
                        : "text-ink hover:bg-blush-50 hover:text-rose"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>{lang === "bn" ? "ড্যাশবোর্ড" : "Dashboard"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("orders")}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-pill transition-all ${
                      activeTab === "orders"
                        ? "bg-plum text-white font-bold shadow-sm"
                        : "text-ink hover:bg-blush-50 hover:text-rose"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-4 h-4" />
                      <span>{lang === "bn" ? "অর্ডারসমূহ" : "Orders"}</span>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-pill font-bold ${
                        activeTab === "orders" ? "bg-white/20 text-white" : "bg-blush-100 text-plum"
                      }`}
                    >
                      {lang === "bn" ? toBnDigits(orders.length) : orders.length}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("addresses")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-pill transition-all ${
                      activeTab === "addresses"
                        ? "bg-plum text-white font-bold shadow-sm"
                        : "text-ink hover:bg-blush-50 hover:text-rose"
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>{lang === "bn" ? "ঠিকানাসমূহ" : "Addresses"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("wishlist")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-pill transition-all ${
                      activeTab === "wishlist"
                        ? "bg-plum text-white font-bold shadow-sm"
                        : "text-ink hover:bg-blush-50 hover:text-rose"
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{lang === "bn" ? "পছন্দের তালিকা" : "Wishlist"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab("details")}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-pill transition-all ${
                      activeTab === "details"
                        ? "bg-plum text-white font-bold shadow-sm"
                        : "text-ink hover:bg-blush-50 hover:text-rose"
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    <span>{lang === "bn" ? "অ্যাকাউন্ট বিবরণ" : "Account Details"}</span>
                  </button>

                  <div className="pt-3 border-t border-line">
                    <button
                      type="button"
                      onClick={() => setIsLoggedIn(false)}
                      className="w-full flex items-center gap-3 px-3.5 py-2 rounded-pill text-rose hover:bg-rose-50 text-sm font-semibold transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{lang === "bn" ? "লগআউট" : "Sign Out"}</span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Right Tab Content */}
            <section className="lg:col-span-3 space-y-6">
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Welcome banner */}
                  <div className="bg-plum text-white rounded-card p-6 md:p-8 relative overflow-hidden shadow-sm">
                    <div className="relative z-10 max-w-xl">
                      <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-2">
                        {lang === "bn" ? "স্বাগতম, আফরিন সুলতানা!" : "Welcome back, Afrin Sultana!"}
                      </h1>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {lang === "bn"
                          ? "আপনার অ্যাকাউন্ট ড্যাশবোর্ড থেকে আপনি সহজেই আপনার সাম্প্রতিক অর্ডার পর্যবেক্ষণ করতে পারেন, শিপিং ও বিলিং ঠিকানা পরিচালনা করতে পারেন এবং পাসওয়ার্ড পরিবর্তন করতে পারেন।"
                          : "From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your password and account details."}
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-card p-5 border border-line shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-rose-50 text-rose flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-ink">
                          {lang === "bn" ? toBnDigits(orders.length) : orders.length}
                        </div>
                        <div className="text-xs text-muted">
                          {lang === "bn" ? "মোট অর্ডার" : "Total Orders"}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-card p-5 border border-line shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-ink">
                          {lang === "bn" ? toBnDigits(1) : "1"}
                        </div>
                        <div className="text-xs text-muted">
                          {lang === "bn" ? "চলমান ডেলিভারি" : "Pending Delivery"}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-card p-5 border border-line shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-plum-50 text-plum flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-ink">
                          {lang === "bn" ? "১০০% আসল" : "100% Authentic"}
                        </div>
                        <div className="text-xs text-muted">
                          {lang === "bn" ? "প্রিমিয়াম সদস্য" : "Verified Member"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Orders Snippet */}
                  <div className="bg-white rounded-card p-6 border border-line shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="font-serif text-lg font-bold text-ink">
                        {lang === "bn" ? "সাম্প্রতিক অর্ডারসমূহ" : "Recent Orders"}
                      </h2>
                      <button
                        type="button"
                        onClick={() => setActiveTab("orders")}
                        className="text-xs text-rose font-bold hover:underline"
                      >
                        {lang === "bn" ? "সবগুলো দেখুন" : "View All"}
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-[#FAF5F7] text-xs font-bold uppercase tracking-wider text-muted border-b border-line">
                          <tr>
                            <th className="py-3 px-4">{lang === "bn" ? "অর্ডার আইডি" : "Order"}</th>
                            <th className="py-3 px-4">{lang === "bn" ? "তারিখ" : "Date"}</th>
                            <th className="py-3 px-4">{lang === "bn" ? "স্ট্যাটাস" : "Status"}</th>
                            <th className="py-3 px-4">{lang === "bn" ? "মোট মূল্য" : "Total"}</th>
                            <th className="py-3 px-4 text-right">{lang === "bn" ? "অ্যাকশন" : "Action"}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {orders.slice(0, 2).map((order) => (
                            <tr key={order.id} className="hover:bg-[#FCF9FA] transition-colors">
                              <td className="py-3.5 px-4 font-bold text-ink">{order.id}</td>
                              <td className="py-3.5 px-4 text-muted text-xs">
                                {lang === "bn" ? order.dateBn : order.date}
                              </td>
                              <td className="py-3.5 px-4">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-pill text-[11px] font-bold border ${order.statusColor}`}
                                >
                                  {lang === "bn" ? order.statusBn : order.status}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 font-bold text-ink">
                                {formatPrice(order.total)}
                              </td>
                              <td className="py-3.5 px-4 text-right">
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1 text-xs font-bold text-plum hover:text-rose transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>{lang === "bn" ? "দেখুন" : "View"}</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-4">
                  <h2 className="font-serif text-xl font-bold text-ink">
                    {lang === "bn" ? "আপনার সকল অর্ডার" : "Your Orders"}
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#FAF5F7] text-xs font-bold uppercase tracking-wider text-muted border-b border-line">
                        <tr>
                          <th className="py-3 px-4">{lang === "bn" ? "অর্ডার নম্বর" : "Order #"}</th>
                          <th className="py-3 px-4">{lang === "bn" ? "তারিখ" : "Date"}</th>
                          <th className="py-3 px-4">{lang === "bn" ? "আইটেম" : "Items"}</th>
                          <th className="py-3 px-4">{lang === "bn" ? "স্ট্যাটাস" : "Status"}</th>
                          <th className="py-3 px-4">{lang === "bn" ? "মোট মূল্য" : "Total"}</th>
                          <th className="py-3 px-4 text-right">{lang === "bn" ? "অ্যাকশন" : "Action"}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-line">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-[#FCF9FA] transition-colors">
                            <td className="py-4 px-4 font-bold text-ink">{order.id}</td>
                            <td className="py-4 px-4 text-muted text-xs">
                              {lang === "bn" ? order.dateBn : order.date}
                            </td>
                            <td className="py-4 px-4 text-xs text-muted">
                              {lang === "bn" ? `${toBnDigits(order.itemsCount)} টি আইটেম` : `${order.itemsCount} items`}
                            </td>
                            <td className="py-4 px-4">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded-pill text-[11px] font-bold border ${order.statusColor}`}
                              >
                                {lang === "bn" ? order.statusBn : order.status}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-bold text-ink">
                              {formatPrice(order.total)}
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                type="button"
                                className="px-3 py-1.5 rounded-pill text-xs font-bold bg-[#F8F1F3] hover:bg-blush-200 text-plum transition-colors"
                              >
                                {lang === "bn" ? "ট্র্যাক অর্ডার" : "Track Order"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "addresses" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Default Shipping Address */}
                  <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-base font-bold text-ink">
                        {lang === "bn" ? "শিপিং ঠিকানা (ডিফল্ট)" : "Shipping Address (Default)"}
                      </h3>
                      <button type="button" className="text-xs text-rose font-bold hover:underline">
                        {lang === "bn" ? "সম্পাদনা" : "Edit"}
                      </button>
                    </div>
                    <div className="text-sm text-ink/80 leading-relaxed">
                      <p className="font-bold text-ink">Afrin Sultana</p>
                      <p>House 42, Road 11, Block D</p>
                      <p>Banani, Dhaka - 1213</p>
                      <p>Bangladesh</p>
                      <p className="mt-2 text-xs text-muted">Phone: +880 1711 000000</p>
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-serif text-base font-bold text-ink">
                        {lang === "bn" ? "বিলিং ঠিকানা" : "Billing Address"}
                      </h3>
                      <button type="button" className="text-xs text-rose font-bold hover:underline">
                        {lang === "bn" ? "সম্পাদনা" : "Edit"}
                      </button>
                    </div>
                    <div className="text-sm text-ink/80 leading-relaxed">
                      <p className="font-bold text-ink">Afrin Sultana</p>
                      <p>Same as Shipping Address</p>
                      <p>Banani, Dhaka - 1213, Bangladesh</p>
                      <p className="mt-2 text-xs text-muted">Email: afrin@example.com</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "wishlist" && (
                <div className="bg-white rounded-card p-6 border border-line shadow-sm text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-rose-50 text-rose flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-ink mb-2">
                    {lang === "bn" ? "আপনার পছন্দের তালিকা ফাঁকা" : "Your Wishlist is Empty"}
                  </h3>
                  <p className="text-muted text-sm max-w-sm mx-auto mb-6">
                    {lang === "bn"
                      ? "পণ্য ব্রাউজ করার সময় হার্ট আইকনে ক্লিক করে আপনার প্রিয় প্রসাধন এবং ফ্যাশন সামগ্রী সংরক্ষণ করুন।"
                      : "Explore our collection and click the heart icon on any product to save it to your wishlist."}
                  </p>
                  <Link
                    href="/shop"
                    className="inline-flex h-11 px-6 bg-rose text-white text-sm font-bold rounded-pill hover:bg-rose-dark transition-colors items-center"
                  >
                    {lang === "bn" ? "কেনাকাটা শুরু করুন" : "Explore Products"}
                  </Link>
                </div>
              )}

              {activeTab === "details" && (
                <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-6">
                  <h2 className="font-serif text-xl font-bold text-ink">
                    {lang === "bn" ? "অ্যাকাউন্ট বিবরণ ও পাসওয়ার্ড" : "Account Details & Password"}
                  </h2>
                  <form className="space-y-4 max-w-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                          {lang === "bn" ? "প্রথম নাম *" : "First Name *"}
                        </label>
                        <input
                          type="text"
                          defaultValue="Afrin"
                          className="w-full h-11 px-3.5 rounded-input border border-line text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                          {lang === "bn" ? "শেষ নাম *" : "Last Name *"}
                        </label>
                        <input
                          type="text"
                          defaultValue="Sultana"
                          className="w-full h-11 px-3.5 rounded-input border border-line text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "ইমেল ঠিকানা *" : "Email Address *"}
                      </label>
                      <input
                        type="email"
                        defaultValue="afrin@example.com"
                        className="w-full h-11 px-3.5 rounded-input border border-line text-sm"
                      />
                    </div>

                    <div className="pt-4 border-t border-line space-y-4">
                      <h4 className="font-bold text-sm text-ink">
                        {lang === "bn" ? "পাসওয়ার্ড পরিবর্তন" : "Change Password"}
                      </h4>
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                          {lang === "bn" ? "বর্তমান পাসওয়ার্ড" : "Current Password"}
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-11 px-3.5 rounded-input border border-line text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                          {lang === "bn" ? "নতুন পাসওয়ার্ড" : "New Password"}
                        </label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full h-11 px-3.5 rounded-input border border-line text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="h-11 px-6 bg-plum text-white font-bold text-sm rounded-pill hover:bg-plum-900 transition-colors"
                    >
                      {lang === "bn" ? "পরিবর্তন সংরক্ষণ করুন" : "Save Changes"}
                    </button>
                  </form>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
