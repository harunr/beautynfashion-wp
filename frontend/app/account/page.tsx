"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import { useAuth, CustomerAddress } from "@/lib/auth/context";
import { useCart } from "@/lib/cart/context";
import { getProductById, Product } from "@/lib/data/products";
import {
  User,
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Eye,
  EyeOff,
  ShieldCheck,
  ShoppingBag,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Trash2,
  Phone,
  Mail,
  Lock,
  MessageCircle,
  X,
  Sparkles,
} from "lucide-react";

export default function AccountPage() {
  const { lang, t, formatPrice, toBnDigits } = useLanguage();
  const {
    user,
    isLoggedIn,
    isLoading: isAuthLoading,
    orders,
    isLoadingOrders,
    login,
    register,
    forgotPassword,
    updateProfile,
    logout,
  } = useAuth();
  const { wishlistIds, toggleWishlist, addToCart } = useCart();

  // Active dashboard tab
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "orders" | "addresses" | "wishlist" | "details"
  >("dashboard");

  // Auth mode for guest users
  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login");

  // Sign In Form state
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register Form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);
  const [regError, setRegError] = useState<string | null>(null);

  // Forgot Password state
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);

  // Address edit modal state
  const [editingAddressType, setEditingAddressType] = useState<"shipping" | "billing" | null>(null);
  const [addressForm, setAddressForm] = useState<CustomerAddress>({
    first_name: "",
    last_name: "",
    phone: "",
    address_1: "",
    city: "Dhaka",
    state: "Dhaka",
    postcode: "",
    country: "BD",
  });
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressMessage, setAddressMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Account details form state
  const [detailsName, setDetailsName] = useState("");
  const [detailsPhone, setDetailsPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsMessage, setDetailsMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Quick add to cart feedback on wishlist items
  const [addedWishlistId, setAddedWishlistId] = useState<number | null>(null);

  // Synchronize details form when user data loads
  useEffect(() => {
    if (user) {
      setDetailsName(user.name || "");
      setDetailsPhone(user.phone || "");
    }
  }, [user]);

  // Handle Login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim() || !loginPassword.trim()) {
      setLoginError(
        lang === "bn"
          ? "অনুগ্রহ করে ইমেল/ফোন এবং পাসওয়ার্ড প্রদান করুন।"
          : "Please provide your email/phone and password."
      );
      return;
    }

    setLoginLoading(true);
    const result = await login(loginIdentifier.trim(), loginPassword);
    setLoginLoading(false);

    if (!result.success) {
      setLoginError(
        result.error ||
          (lang === "bn"
            ? "ইমেল বা পাসওয়ার্ড সঠিক নয়। পুনরায় চেষ্টা করুন।"
            : "Invalid credentials. Please verify and try again.")
      );
    }
  };

  // Handle Registration submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError(
        lang === "bn"
          ? "নাম, ইমেল এবং পাসওয়ার্ড পূরণ করা আবশ্যক।"
          : "Name, email, and password are required."
      );
      return;
    }

    if (regPassword.length < 6) {
      setRegError(
        lang === "bn"
          ? "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
          : "Password must be at least 6 characters long."
      );
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError(
        lang === "bn"
          ? "উভয় পাসওয়ার্ড মেলেনি। অনুগ্রহ করে যাচাই করুন।"
          : "Passwords do not match."
      );
      return;
    }

    setRegLoading(true);
    const result = await register({
      name: regName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim(),
      password: regPassword,
    });
    setRegLoading(false);

    if (!result.success) {
      setRegError(
        result.error ||
          (lang === "bn"
            ? "অ্যাকাউন্ট তৈরি করা সম্ভব হয়নি। অনুগ্রহ করে অন্য ইমেল চেষ্টা করুন।"
            : "Could not create account. Please try again.")
      );
    }
  };

  // Handle Forgot Password submission
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError(null);
    setForgotSuccess(null);

    if (!forgotIdentifier.trim()) {
      setForgotError(
        lang === "bn"
          ? "অনুগ্রহ করে আপনার নিবন্ধিত ইমেল ঠিকানা প্রদান করুন।"
          : "Please enter your registered email address."
      );
      return;
    }

    setForgotLoading(true);
    const result = await forgotPassword(forgotIdentifier.trim());
    setForgotLoading(false);

    if (result.success) {
      setForgotSuccess(
        result.message ||
          (lang === "bn"
            ? "আপনার ইমেলে পাসওয়ার্ড রিসেট লিঙ্ক পাঠানো হয়েছে। ইনবক্স অথবা স্প্যাম ফোল্ডার পরীক্ষা করুন।"
            : "Password reset instructions have been sent to your email.")
      );
      setForgotIdentifier("");
    } else {
      setForgotError(
        result.error ||
          (lang === "bn"
            ? "পাসওয়ার্ড রিসেট অনুরোধ প্রক্রিয়া করা যায়নি।"
            : "Failed to send reset link. Please check the email and try again.")
      );
    }
  };

  // Open address editor
  const openAddressEditor = (type: "shipping" | "billing") => {
    setEditingAddressType(type);
    setAddressMessage(null);
    const current = type === "shipping" ? user?.shipping : user?.billing;
    setAddressForm({
      first_name: current?.first_name || user?.firstName || "",
      last_name: current?.last_name || user?.lastName || "",
      phone: current?.phone || user?.phone || "",
      address_1: current?.address_1 || "",
      city: current?.city || "Dhaka",
      state: current?.state || "Dhaka",
      postcode: current?.postcode || "",
      country: current?.country || "BD",
    });
  };

  // Save address
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAddressType) return;
    setAddressLoading(true);
    setAddressMessage(null);

    const updatePayload =
      editingAddressType === "shipping"
        ? { shipping: addressForm }
        : { billing: addressForm };

    const result = await updateProfile(updatePayload);
    setAddressLoading(false);

    if (result.success) {
      setAddressMessage({
        type: "success",
        text:
          lang === "bn"
            ? "ঠিকানা সফলভাবে সংরক্ষিত হয়েছে!"
            : "Address updated successfully!",
      });
      setTimeout(() => {
        setEditingAddressType(null);
        setAddressMessage(null);
      }, 1200);
    } else {
      setAddressMessage({
        type: "error",
        text: result.error || "Failed to update address.",
      });
    }
  };

  // Save account details
  const handleSaveDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setDetailsLoading(true);
    setDetailsMessage(null);

    if (newPassword && newPassword !== confirmNewPassword) {
      setDetailsMessage({
        type: "error",
        text:
          lang === "bn"
            ? "নতুন পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মেলেনি।"
            : "New passwords do not match.",
      });
      setDetailsLoading(false);
      return;
    }

    const payload: {
      name?: string;
      phone?: string;
      current_password?: string;
      new_password?: string;
    } = {
      name: detailsName.trim(),
      phone: detailsPhone.trim(),
    };

    if (newPassword) {
      payload.current_password = currentPassword;
      payload.new_password = newPassword;
    }

    const result = await updateProfile(payload);
    setDetailsLoading(false);

    if (result.success) {
      setDetailsMessage({
        type: "success",
        text:
          lang === "bn"
            ? "আপনার প্রোফাইল সফলভাবে আপডেট হয়েছে!"
            : "Profile updated successfully!",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } else {
      setDetailsMessage({
        type: "error",
        text: result.error || "Failed to update profile.",
      });
    }
  };

  // Wishlist products
  const wishlistedProducts = wishlistIds
    .map((id) => getProductById(id))
    .filter(Boolean) as Product[];

  const handleQuickAddWishlist = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedWishlistId(product.id);
    setTimeout(() => setAddedWishlistId(null), 1800);
  };

  // Status color mapper
  const getStatusBadge = (status: string, statusLabel?: string) => {
    const s = (status || "").toLowerCase();
    if (s.includes("complete") || s.includes("deliver")) {
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-pill text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          {statusLabel || (lang === "bn" ? "বিতরণ সম্পন্ন" : "Delivered")}
        </span>
      );
    }
    if (s.includes("process")) {
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-pill text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
          {statusLabel || (lang === "bn" ? "প্রক্রিয়াধীন" : "Processing")}
        </span>
      );
    }
    if (s.includes("cancel") || s.includes("fail")) {
      return (
        <span className="inline-block px-2.5 py-0.5 rounded-pill text-[11px] font-bold bg-rose-50 text-rose border border-rose-200">
          {statusLabel || (lang === "bn" ? "বাতিল" : "Cancelled")}
        </span>
      );
    }
    return (
      <span className="inline-block px-2.5 py-0.5 rounded-pill text-[11px] font-bold bg-blush-50 text-ink border border-line">
        {statusLabel || status}
      </span>
    );
  };

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

        {/* 1. Loading Skeleton */}
        {isAuthLoading ? (
          <div className="max-w-md mx-auto bg-white rounded-card p-8 border border-line shadow-sm text-center py-16 animate-pulse">
            <div className="w-16 h-16 rounded-full bg-blush-100 mx-auto mb-4" />
            <div className="h-5 bg-blush-100 rounded-pill w-48 mx-auto mb-3" />
            <div className="h-3 bg-blush-50 rounded-pill w-64 mx-auto" />
          </div>
        ) : !isLoggedIn || !user ? (
          /* 2. Unauthenticated / Guest View: Sign In / Register / Forgot Password */
          <div className="max-w-md mx-auto bg-white rounded-card p-6 md:p-8 border border-line shadow-sm">
            {/* Brand Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blush-100 text-rose mb-3">
                <User className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-ink">
                {authMode === "forgot"
                  ? lang === "bn"
                    ? "পাসওয়ার্ড পুনরুদ্ধার"
                    : "Reset Password"
                  : authMode === "register"
                  ? lang === "bn"
                    ? "নতুন অ্যাকাউন্ট তৈরি করুন"
                    : "Create an Account"
                  : lang === "bn"
                  ? "স্বাগতম ABeauty & Fashion এ"
                  : "Welcome to ABeauty & Fashion"}
              </h1>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">
                {authMode === "forgot"
                  ? lang === "bn"
                    ? "আপনার নিবন্ধিত ইমেল দিন, আমরা পাসওয়ার্ড রিসেট করার নির্দেশাবলী পাঠাব।"
                    : "Enter your registered email and we'll send you reset instructions."
                  : authMode === "register"
                  ? lang === "bn"
                    ? "নিবন্ধন করে দ্রুত অর্ডার করুন এবং পছন্দের পণ্য সংরক্ষণ করুন।"
                    : "Sign up to track your deliveries, save addresses, and view your wishlist."
                  : lang === "bn"
                  ? "আপনার অর্ডার ট্র্যাক করতে ও পছন্দের পণ্য দেখতে লগইন করুন।"
                  : "Sign in to access your orders, saved addresses, and wishlist."}
              </p>
            </div>

            {/* Mode Switcher Tabs (Only if not in forgot mode) */}
            {authMode !== "forgot" && (
              <div className="flex border-b border-line mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("login");
                    setLoginError(null);
                  }}
                  className={`flex-1 pb-3 text-center font-bold text-sm sm:text-base transition-all border-b-2 ${
                    authMode === "login"
                      ? "border-rose text-rose"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {lang === "bn" ? "সাইন ইন" : "Sign In"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("register");
                    setRegError(null);
                  }}
                  className={`flex-1 pb-3 text-center font-bold text-sm sm:text-base transition-all border-b-2 ${
                    authMode === "register"
                      ? "border-rose text-rose"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {lang === "bn" ? "অ্যাকাউন্ট তৈরি" : "Register"}
                </button>
              </div>
            )}

            {/* TAB A: SIGN IN FORM */}
            {authMode === "login" && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "ইমেল বা মোবাইল নম্বর *" : "Email or Mobile Number *"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={loginIdentifier}
                      onChange={(e) => setLoginIdentifier(e.target.value)}
                      placeholder={
                        lang === "bn"
                          ? "01XXXXXXXXX অথবা email@domain.com"
                          : "01XXXXXXXXX or email@domain.com"
                      }
                      className="w-full h-11 px-3.5 pl-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-ink uppercase tracking-wider">
                      {lang === "bn" ? "পাসওয়ার্ড *" : "Password *"}
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("forgot");
                        setForgotError(null);
                        setForgotSuccess(null);
                      }}
                      className="text-xs text-rose hover:underline font-semibold"
                    >
                      {lang === "bn" ? "পাসওয়ার্ড ভুলে গেছেন?" : "Forgot password?"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 px-3.5 pl-10 pr-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-3.5 text-muted hover:text-ink transition-colors"
                      aria-label={showLoginPassword ? "Hide password" : "Show password"}
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full h-12 bg-plum text-white font-bold rounded-pill hover:bg-plum-900 transition-colors shadow-sm mt-3 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loginLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === "bn" ? "যাচাই করা হচ্ছে..." : "Signing in..."}</span>
                    </>
                  ) : (
                    <span>{lang === "bn" ? "প্রবেশ করুন" : "Sign In"}</span>
                  )}
                </button>

                <p className="text-center text-xs text-muted pt-2">
                  {lang === "bn" ? "নতুন গ্রাহক? " : "New to ABeauty & Fashion? "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("register")}
                    className="text-rose font-bold hover:underline"
                  >
                    {lang === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create an Account"}
                  </button>
                </p>
              </form>
            )}

            {/* TAB B: REGISTER FORM */}
            {authMode === "register" && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                {regError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{regError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "সম্পূর্ণ নাম *" : "Full Name *"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder={lang === "bn" ? "যেমন: আফরিন সুলতানা" : "e.g. Afrin Sultana"}
                      className="w-full h-11 px-3.5 pl-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <User className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "ইমেল ঠিকানা *" : "Email Address *"}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full h-11 px-3.5 pl-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "মোবাইল নম্বর *" : "Mobile Number *"}
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full h-11 px-3.5 pl-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <Phone className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *" : "Password (Min 6 characters) *"}
                  </label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? "text" : "password"}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 px-3.5 pl-10 pr-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-3.5 top-3.5 text-muted hover:text-ink transition-colors"
                      aria-label={showRegPassword ? "Hide password" : "Show password"}
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "পাসওয়ার্ড নিশ্চিত করুন *" : "Confirm Password *"}
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 px-3.5 pl-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <Lock className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={regLoading}
                  className="w-full h-12 bg-rose text-white font-bold rounded-pill hover:bg-rose-dark transition-colors shadow-sm mt-3 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {regLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === "bn" ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "Creating Account..."}</span>
                    </>
                  ) : (
                    <span>{lang === "bn" ? "অ্যাকাউন্ট তৈরি করুন" : "Create Account"}</span>
                  )}
                </button>

                <p className="text-center text-xs text-muted pt-2">
                  {lang === "bn" ? "ইতিমধ্যে অ্যাকাউন্ট আছে? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setAuthMode("login")}
                    className="text-rose font-bold hover:underline"
                  >
                    {lang === "bn" ? "সাইন ইন করুন" : "Sign In"}
                  </button>
                </p>
              </form>
            )}

            {/* TAB C: FORGOT PASSWORD FORM */}
            {authMode === "forgot" && (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                {forgotSuccess && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    <span>{forgotSuccess}</span>
                  </div>
                )}

                {forgotError && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{forgotError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "নিবন্ধিত ইমেল ঠিকানা *" : "Registered Email Address *"}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={forgotIdentifier}
                      onChange={(e) => setForgotIdentifier(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full h-11 px-3.5 pl-10 rounded-input border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <Mail className="w-4 h-4 text-muted absolute left-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full h-12 bg-plum text-white font-bold rounded-pill hover:bg-plum-900 transition-colors shadow-sm mt-3 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {forgotLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === "bn" ? "পাঠানো হচ্ছে..." : "Sending..."}</span>
                    </>
                  ) : (
                    <span>{lang === "bn" ? "রিসেট লিঙ্ক পাঠান" : "Send Reset Link"}</span>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode("login");
                      setForgotError(null);
                      setForgotSuccess(null);
                    }}
                    className="text-xs text-rose font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>{lang === "bn" ? "← সাইন ইন-এ ফিরে যান" : "← Back to Sign In"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* 3. Authenticated Customer Portal */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white rounded-card p-5 border border-line shadow-sm space-y-1">
                {/* User Info Capsule */}
                <div className="flex items-center gap-3.5 pb-4 mb-3 border-b border-line">
                  <div className="relative w-12 h-12 rounded-full bg-plum-50 border border-plum-200 text-plum font-serif text-xl font-bold flex items-center justify-center shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-bold text-sm text-ink leading-tight truncate">
                      {user.name}
                    </h2>
                    <p className="text-xs text-muted truncate">{user.email}</p>
                    {user.phone && (
                      <p className="text-[11px] text-muted truncate mt-0.5">{user.phone}</p>
                    )}
                  </div>
                </div>

                {/* Sidebar Navigation */}
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
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-pill transition-all ${
                      activeTab === "wishlist"
                        ? "bg-plum text-white font-bold shadow-sm"
                        : "text-ink hover:bg-blush-50 hover:text-rose"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4" />
                      <span>{lang === "bn" ? "পছন্দের তালিকা" : "Wishlist"}</span>
                    </div>
                    {wishlistIds.length > 0 && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-pill font-bold ${
                          activeTab === "wishlist" ? "bg-white/20 text-white" : "bg-blush-100 text-plum"
                        }`}
                      >
                        {lang === "bn" ? toBnDigits(wishlistIds.length) : wishlistIds.length}
                      </span>
                    )}
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
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3.5 py-2 rounded-pill text-rose hover:bg-rose-50 text-sm font-semibold transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{lang === "bn" ? "সাইন আউট" : "Sign Out"}</span>
                    </button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Right Tab Content */}
            <section className="lg:col-span-3 space-y-6">
              {/* TAB 1: DASHBOARD */}
              {activeTab === "dashboard" && (
                <div className="space-y-6">
                  {/* Welcome banner */}
                  <div className="bg-plum text-white rounded-card p-6 md:p-8 relative overflow-hidden shadow-sm">
                    <div className="relative z-10 max-w-xl">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-white/10 text-white text-xs font-semibold mb-3 backdrop-blur-sm">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>{lang === "bn" ? "ভেরিফাইড মেম্বার" : "Verified Customer"}</span>
                      </div>
                      <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight mb-2">
                        {lang === "bn" ? `স্বাগতম, ${user.name}!` : `Welcome back, ${user.name}!`}
                      </h1>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {lang === "bn"
                          ? "আপনার অ্যাকাউন্ট ড্যাশবোর্ড থেকে আপনি সহজেই সাম্প্রতিক অর্ডার পর্যবেক্ষণ করতে পারেন, শিপিং ও বিলিং ঠিকানা পরিচালনা করতে পারেন এবং পাসওয়ার্ড আপডেট করতে পারেন।"
                          : "From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your profile password."}
                      </p>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveTab("orders")}
                      className="bg-white rounded-card p-5 border border-line shadow-sm flex items-center gap-4 text-left hover:border-rose/50 transition-all"
                    >
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
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveTab("wishlist")}
                      className="bg-white rounded-card p-5 border border-line shadow-sm flex items-center gap-4 text-left hover:border-rose/50 transition-all"
                    >
                      <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                        <Heart className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-ink">
                          {lang === "bn" ? toBnDigits(wishlistIds.length) : wishlistIds.length}
                        </div>
                        <div className="text-xs text-muted">
                          {lang === "bn" ? "পছন্দের পণ্য" : "Saved Wishlist"}
                        </div>
                      </div>
                    </button>

                    <div className="bg-white rounded-card p-5 border border-line shadow-sm flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-plum-50 text-plum flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-ink">
                          {lang === "bn" ? "১০০% আসল" : "100% Authentic"}
                        </div>
                        <div className="text-xs text-muted">
                          {lang === "bn" ? "নিরাপদ শপিং" : "Direct Guarantee"}
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
                      {orders.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setActiveTab("orders")}
                          className="text-xs text-rose font-bold hover:underline"
                        >
                          {lang === "bn" ? "সবগুলো দেখুন" : "View All"}
                        </button>
                      )}
                    </div>

                    {isLoadingOrders ? (
                      <div className="py-8 text-center text-muted text-sm flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-rose" />
                        <span>{lang === "bn" ? "অর্ডার লোড হচ্ছে..." : "Loading orders..."}</span>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="py-8 text-center bg-blush-50/50 rounded-xl p-6 border border-line">
                        <Package className="w-8 h-8 text-muted mx-auto mb-2" />
                        <p className="text-sm font-semibold text-ink">
                          {lang === "bn" ? "আপনার কোনো পূর্ববর্তী অর্ডার নেই" : "No orders placed yet"}
                        </p>
                        <p className="text-xs text-muted mt-1 mb-4">
                          {lang === "bn"
                            ? "আমাদের অথেনটিক স্কিনকেয়ার ও মেকআপ কালেকশন ঘুরে দেখুন।"
                            : "Explore our collection of 100% authentic skincare and cosmetics."}
                        </p>
                        <Link
                          href="/shop"
                          className="px-5 py-2 rounded-pill bg-ink text-white font-bold text-xs hover:bg-rose transition-colors inline-flex items-center gap-2"
                        >
                          <span>{lang === "bn" ? "কেনাকাটা শুরু করুন" : "Start Shopping"}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-[#FAF5F7] text-xs font-bold uppercase tracking-wider text-muted border-b border-line">
                            <tr>
                              <th className="py-3 px-4">{lang === "bn" ? "অর্ডার আইডি" : "Order"}</th>
                              <th className="py-3 px-4">{lang === "bn" ? "তারিখ" : "Date"}</th>
                              <th className="py-3 px-4">{lang === "bn" ? "স্ট্যাটাস" : "Status"}</th>
                              <th className="py-3 px-4">{lang === "bn" ? "মোট মূল্য" : "Total"}</th>
                              <th className="py-3 px-4 text-right">{lang === "bn" ? "আইটেম" : "Items"}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-line">
                            {orders.slice(0, 3).map((order) => (
                              <tr key={order.id} className="hover:bg-[#FCF9FA] transition-colors">
                                <td className="py-3.5 px-4 font-bold text-ink">#{order.orderNumber}</td>
                                <td className="py-3.5 px-4 text-muted text-xs">
                                  {new Date(order.date).toLocaleDateString(
                                    lang === "bn" ? "bn-BD" : "en-US",
                                    { year: "numeric", month: "short", day: "numeric" }
                                  )}
                                </td>
                                <td className="py-3.5 px-4">
                                  {getStatusBadge(order.status, order.statusLabel)}
                                </td>
                                <td className="py-3.5 px-4 font-bold text-ink font-bricolage">
                                  {formatPrice(0, order.total)}
                                </td>
                                <td className="py-3.5 px-4 text-right text-xs text-muted">
                                  {lang === "bn"
                                    ? `${toBnDigits(order.itemsCount)} টি`
                                    : `${order.itemsCount} items`}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: ORDERS */}
              {activeTab === "orders" && (
                <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-ink">
                        {lang === "bn" ? "আপনার সকল অর্ডার" : "Order History"}
                      </h2>
                      <p className="text-xs text-muted mt-0.5">
                        {lang === "bn"
                          ? "আপনার সকল অতীত ও চলমান অর্ডারের বিস্তারিত তথ্য"
                          : "Review your past and active orders"}
                      </p>
                    </div>
                  </div>

                  {isLoadingOrders ? (
                    <div className="py-12 text-center text-muted text-sm flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin text-rose" />
                      <span>{lang === "bn" ? "অর্ডার লোড হচ্ছে..." : "Loading orders..."}</span>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="py-16 text-center bg-blush-50/50 rounded-xl p-6 border border-line max-w-md mx-auto">
                      <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm text-muted mx-auto mb-3">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-bold text-ink">
                        {lang === "bn" ? "আপনার কোনো অর্ডার নেই" : "No orders placed yet"}
                      </h3>
                      <p className="text-xs text-muted mt-1 mb-5">
                        {lang === "bn"
                          ? "আমাদের আসল স্কিনকেয়ার ও ফ্যাশন পণ্যগুলো ব্রাউজ করুন এবং আপনার প্রথম অর্ডার করুন।"
                          : "Browse our authentic beauty products and place your first order today."}
                      </p>
                      <Link
                        href="/shop"
                        className="px-6 py-2.5 rounded-pill bg-ink text-white font-bold text-xs hover:bg-rose transition-colors inline-flex items-center gap-2 shadow-pill"
                      >
                        <span>{lang === "bn" ? "কেনাকাটা শুরু করুন" : "Start Shopping"}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="border border-line rounded-xl p-4 sm:p-5 hover:border-line-strong transition-all space-y-3 bg-[#FAF8F9]/40"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-base text-ink">
                                #{order.orderNumber}
                              </span>
                              {getStatusBadge(order.status, order.statusLabel)}
                            </div>
                            <span className="text-xs text-muted">
                              {new Date(order.date).toLocaleDateString(
                                lang === "bn" ? "bn-BD" : "en-US",
                                { year: "numeric", month: "long", day: "numeric" }
                              )}
                            </span>
                          </div>

                          {/* Items Breakdown */}
                          <div className="space-y-2 py-1">
                            {order.items.map((item, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between text-xs sm:text-sm text-ink"
                              >
                                <span className="font-medium text-ink/90">
                                  {item.name}{" "}
                                  <span className="text-muted">× {item.quantity}</span>
                                </span>
                                <span className="font-bold font-bricolage">
                                  {formatPrice(0, item.total)}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Footer with Total and WhatsApp Support */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line/60">
                            <div>
                              <span className="text-xs text-muted mr-2">
                                {lang === "bn" ? "পেমেন্ট মাধ্যম:" : "Payment:"}{" "}
                                <span className="font-semibold text-ink">
                                  {order.paymentMethod || "Cash on Delivery"}
                                </span>
                              </span>
                              <span className="text-sm font-bold text-ink">
                                {lang === "bn" ? "সর্বমোট: " : "Total: "}
                                <span className="text-rose font-bricolage text-base">
                                  {formatPrice(0, order.total)}
                                </span>
                              </span>
                            </div>

                            <a
                              href={`https://wa.me/8801811377577?text=${encodeURIComponent(
                                `Hello ABeauty & Fashion Support, I have an inquiry about my Order #${order.orderNumber}.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-pill text-xs font-bold bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] transition-colors inline-flex items-center gap-1.5"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{lang === "bn" ? "হোয়াটসঅ্যাপে সাহায্য নিন" : "Order Help"}</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ADDRESSES */}
              {activeTab === "addresses" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-ink">
                        {lang === "bn" ? "সংরক্ষিত ঠিকানাসমূহ" : "Saved Addresses"}
                      </h2>
                      <p className="text-xs text-muted mt-0.5">
                        {lang === "bn"
                          ? "চেকআউটের সময় আপনার শিপিং ও বিলিং তথ্য স্বয়ংক্রিয়ভাবে ব্যবহৃত হবে।"
                          : "The following addresses are used by default on the checkout page."}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Default Shipping Address */}
                    <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-serif text-base font-bold text-ink flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-rose" />
                            <span>{lang === "bn" ? "শিপিং ঠিকানা" : "Shipping Address"}</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => openAddressEditor("shipping")}
                            className="text-xs text-rose font-bold hover:underline"
                          >
                            {lang === "bn" ? "সম্পাদনা" : "Edit"}
                          </button>
                        </div>

                        <div className="text-sm text-ink/80 leading-relaxed space-y-1">
                          <p className="font-bold text-ink">
                            {user.shipping?.first_name || user.name}{" "}
                            {user.shipping?.last_name || ""}
                          </p>
                          <p>
                            {user.shipping?.address_1 ||
                              (lang === "bn" ? "কোনো ঠিকানা যোগ করা হয়নি" : "No address set yet")}
                          </p>
                          {(user.shipping?.city || user.shipping?.state) && (
                            <p>
                              {[user.shipping?.city, user.shipping?.state, user.shipping?.postcode]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          )}
                          <p className="text-xs text-muted">
                            {lang === "bn" ? "দেশ: বাংলাদেশ" : "Country: Bangladesh"}
                          </p>
                          <p className="text-xs text-muted pt-1">
                            {lang === "bn" ? "মোবাইল: " : "Phone: "}
                            {user.shipping?.phone || user.phone || "—"}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openAddressEditor("shipping")}
                        className="mt-4 w-full h-9 rounded-pill bg-[#FAF8F9] hover:bg-blush-100 text-ink text-xs font-bold border border-line transition-colors"
                      >
                        {lang === "bn" ? "শিপিং ঠিকানা আপডেট করুন" : "Update Shipping Address"}
                      </button>
                    </div>

                    {/* Billing Address */}
                    <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-3 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-serif text-base font-bold text-ink flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-plum" />
                            <span>{lang === "bn" ? "বিলিং ঠিকানা" : "Billing Address"}</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => openAddressEditor("billing")}
                            className="text-xs text-rose font-bold hover:underline"
                          >
                            {lang === "bn" ? "সম্পাদনা" : "Edit"}
                          </button>
                        </div>

                        <div className="text-sm text-ink/80 leading-relaxed space-y-1">
                          <p className="font-bold text-ink">
                            {user.billing?.first_name || user.name}{" "}
                            {user.billing?.last_name || ""}
                          </p>
                          <p>
                            {user.billing?.address_1 ||
                              (lang === "bn" ? "শিপিং ঠিকানার অনুরূপ" : "Same as shipping address")}
                          </p>
                          {(user.billing?.city || user.billing?.state) && (
                            <p>
                              {[user.billing?.city, user.billing?.state, user.billing?.postcode]
                                .filter(Boolean)
                                .join(", ")}
                            </p>
                          )}
                          <p className="text-xs text-muted">
                            {lang === "bn" ? "ইমেল: " : "Email: "}
                            {user.billing?.email || user.email}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => openAddressEditor("billing")}
                        className="mt-4 w-full h-9 rounded-pill bg-[#FAF8F9] hover:bg-blush-100 text-ink text-xs font-bold border border-line transition-colors"
                      >
                        {lang === "bn" ? "বিলিং ঠিকানা আপডেট করুন" : "Update Billing Address"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: WISHLIST */}
              {activeTab === "wishlist" && (
                <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-ink">
                        {lang === "bn" ? "পছন্দের তালিকা" : "Your Wishlist"}
                      </h2>
                      <p className="text-xs text-muted mt-0.5">
                        {lang === "bn"
                          ? `${toBnDigits(wishlistedProducts.length)} টি পণ্য আপনার পছন্দের তালিকায় আছে`
                          : `${wishlistedProducts.length} items saved for later`}
                      </p>
                    </div>

                    {wishlistedProducts.length > 0 && (
                      <Link
                        href="/wishlist"
                        className="text-xs text-rose font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>{lang === "bn" ? "পূর্ণাঙ্গ ভিউ" : "Full Page View"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    )}
                  </div>

                  {wishlistedProducts.length === 0 ? (
                    <div className="text-center py-12 max-w-sm mx-auto">
                      <div className="w-16 h-16 rounded-full bg-rose-50 text-rose flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-lg font-bold text-ink mb-1">
                        {lang === "bn" ? "আপনার পছন্দের তালিকা ফাঁকা" : "Your Wishlist is Empty"}
                      </h3>
                      <p className="text-muted text-xs mb-5 leading-relaxed">
                        {lang === "bn"
                          ? "পণ্য ব্রাউজ করার সময় হার্ট আইকনে ক্লিক করে আপনার প্রিয় প্রসাধন এবং ফ্যাশন সামগ্রী সংরক্ষণ করুন।"
                          : "Explore our collection and click the heart icon on any product to save it to your wishlist."}
                      </p>
                      <Link
                        href="/shop"
                        className="inline-flex h-10 px-6 bg-ink hover:bg-rose text-white text-xs font-bold rounded-pill transition-colors items-center gap-2"
                      >
                        <span>{lang === "bn" ? "কেনাকাটা শুরু করুন" : "Explore Products"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {wishlistedProducts.map((p) => {
                        const title = lang === "bn" ? p.titleBn : p.titleEn;
                        return (
                          <div
                            key={p.id}
                            className="border border-line rounded-xl p-3 flex flex-col justify-between hover:shadow-card transition-all bg-white"
                          >
                            <div>
                              <div className="relative w-full aspect-square rounded-lg bg-blush-50 overflow-hidden mb-3">
                                <Link href={`/product/${p.slug || p.id}`}>
                                  <Image
                                    src={p.images[0]?.src || ""}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                  />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => toggleWishlist(p.id)}
                                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white text-rose flex items-center justify-center shadow-sm hover:bg-rose hover:text-white transition-colors"
                                  aria-label="Remove from wishlist"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              <span className="text-[10px] uppercase font-bold text-muted">
                                {p.brand}
                              </span>
                              <h4 className="text-xs font-bold text-ink line-clamp-2 mt-0.5 hover:text-rose">
                                <Link href={`/product/${p.slug || p.id}`}>{title}</Link>
                              </h4>
                            </div>

                            <div className="mt-3 pt-2 border-t border-line/60 flex items-center justify-between gap-2">
                              <span className="font-bold text-sm font-bricolage text-ink">
                                {formatPrice(p.priceUSD, p.priceBDT)}
                              </span>
                              <button
                                type="button"
                                onClick={(e) => handleQuickAddWishlist(p, e)}
                                className="h-8 px-3 rounded-pill bg-ink hover:bg-rose text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
                              >
                                {addedWishlistId === p.id ? (
                                  <>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                                    <span>{lang === "bn" ? "যোগ হয়েছে" : "Added"}</span>
                                  </>
                                ) : (
                                  <>
                                    <ShoppingBag className="w-3.5 h-3.5" />
                                    <span>{lang === "bn" ? "ব্যাগে নিন" : "Move to Bag"}</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 5: ACCOUNT DETAILS & PASSWORD */}
              {activeTab === "details" && (
                <div className="bg-white rounded-card p-6 border border-line shadow-sm space-y-6">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-ink">
                      {lang === "bn" ? "অ্যাকাউন্ট বিবরণ ও পাসওয়ার্ড" : "Account Details & Password"}
                    </h2>
                    <p className="text-xs text-muted mt-0.5">
                      {lang === "bn"
                        ? "আপনার ব্যক্তিগত তথ্য এবং পাসওয়ার্ড আপডেট করুন।"
                        : "Update your profile name, mobile number, and account password."}
                    </p>
                  </div>

                  {detailsMessage && (
                    <div
                      className={`p-3.5 rounded-lg text-xs flex items-start gap-2 ${
                        detailsMessage.type === "success"
                          ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                          : "bg-rose-50 border border-rose-200 text-rose"
                      }`}
                    >
                      {detailsMessage.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      )}
                      <span>{detailsMessage.text}</span>
                    </div>
                  )}

                  <form onSubmit={handleSaveDetails} className="space-y-4 max-w-lg">
                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "সম্পূর্ণ নাম *" : "Full Name *"}
                      </label>
                      <input
                        type="text"
                        required
                        value={detailsName}
                        onChange={(e) => setDetailsName(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-input border border-line text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "ইমেল ঠিকানা (অপরিবর্তনযোগ্য)" : "Email Address (Read-only)"}
                      </label>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="w-full h-11 px-3.5 rounded-input border border-line bg-gray-50 text-muted text-sm cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                        {lang === "bn" ? "মোবাইল নম্বর" : "Mobile Number"}
                      </label>
                      <input
                        type="tel"
                        value={detailsPhone}
                        onChange={(e) => setDetailsPhone(e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="w-full h-11 px-3.5 rounded-input border border-line text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all"
                      />
                    </div>

                    <div className="pt-4 border-t border-line space-y-4">
                      <div>
                        <h4 className="font-bold text-sm text-ink">
                          {lang === "bn" ? "পাসওয়ার্ড পরিবর্তন (ঐচ্ছিক)" : "Change Password (Optional)"}
                        </h4>
                        <p className="text-xs text-muted mt-0.5">
                          {lang === "bn"
                            ? "পাসওয়ার্ড পরিবর্তন করতে না চাইলে ঘরগুলো খালি রাখুন।"
                            : "Leave blank to keep your current password."}
                        </p>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                          {lang === "bn" ? "বর্তমান পাসওয়ার্ড" : "Current Password"}
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-11 px-3.5 rounded-input border border-line text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                          {lang === "bn" ? "নতুন পাসওয়ার্ড" : "New Password"}
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-11 px-3.5 rounded-input border border-line text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                          {lang === "bn" ? "নতুন পাসওয়ার্ড নিশ্চিত করুন" : "Confirm New Password"}
                        </label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full h-11 px-3.5 rounded-input border border-line text-sm focus:border-rose focus:ring-1 focus:ring-rose outline-none transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={detailsLoading}
                      className="h-11 px-6 bg-plum text-white font-bold text-sm rounded-pill hover:bg-plum-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
                    >
                      {detailsLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{lang === "bn" ? "সংরক্ষণ হচ্ছে..." : "Saving..."}</span>
                        </>
                      ) : (
                        <span>{lang === "bn" ? "পরিবর্তন সংরক্ষণ করুন" : "Save Changes"}</span>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Edit Address Modal */}
      {editingAddressType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-card p-6 md:p-8 max-w-lg w-full shadow-2xl border border-line relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setEditingAddressType(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blush-50 hover:bg-blush-100 flex items-center justify-center text-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif text-xl font-bold text-ink mb-1">
              {editingAddressType === "shipping"
                ? lang === "bn"
                  ? "শিপিং ঠিকানা সম্পাদনা"
                  : "Edit Shipping Address"
                : lang === "bn"
                ? "বিলিং ঠিকানা সম্পাদনা"
                : "Edit Billing Address"}
            </h3>
            <p className="text-xs text-muted mb-4">
              {lang === "bn"
                ? "ডেলিভারি দ্রুত ও নির্ভুল করার জন্য আপনার ঠিকানা হালনাগাদ করুন।"
                : "Ensure your address details are accurate for smooth deliveries."}
            </p>

            {addressMessage && (
              <div
                className={`p-3 rounded-lg text-xs mb-4 flex items-start gap-2 ${
                  addressMessage.type === "success"
                    ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                    : "bg-rose-50 border border-rose-200 text-rose"
                }`}
              >
                {addressMessage.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                <span>{addressMessage.text}</span>
              </div>
            )}

            <form onSubmit={handleSaveAddress} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                    {lang === "bn" ? "প্রথম নাম *" : "First Name *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.first_name || ""}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, first_name: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-input border border-line text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                    {lang === "bn" ? "শেষ নাম" : "Last Name"}
                  </label>
                  <input
                    type="text"
                    value={addressForm.last_name || ""}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, last_name: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-input border border-line text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                  {lang === "bn" ? "রাস্তা ও বাড়ির ঠিকানা *" : "Street Address *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={lang === "bn" ? "বাড়ি নম্বর, রোড নম্বর, এলাকা" : "House number, road number, area"}
                  value={addressForm.address_1 || ""}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, address_1: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-input border border-line text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                    {lang === "bn" ? "শহর/জেলা *" : "City / District *"}
                  </label>
                  <input
                    type="text"
                    required
                    value={addressForm.city || ""}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, city: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-input border border-line text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                    {lang === "bn" ? "পোস্টকোড" : "Postcode"}
                  </label>
                  <input
                    type="text"
                    value={addressForm.postcode || ""}
                    onChange={(e) =>
                      setAddressForm({ ...addressForm, postcode: e.target.value })
                    }
                    className="w-full h-10 px-3 rounded-input border border-line text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1">
                  {lang === "bn" ? "মোবাইল নম্বর *" : "Contact Phone *"}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="01XXXXXXXXX"
                  value={addressForm.phone || ""}
                  onChange={(e) =>
                    setAddressForm({ ...addressForm, phone: e.target.value })
                  }
                  className="w-full h-10 px-3 rounded-input border border-line text-sm"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingAddressType(null)}
                  className="h-10 px-4 rounded-pill border border-line text-xs font-bold hover:bg-blush-50 transition-colors"
                >
                  {lang === "bn" ? "বাতিল" : "Cancel"}
                </button>
                <button
                  type="submit"
                  disabled={addressLoading}
                  className="h-10 px-6 rounded-pill bg-plum hover:bg-plum-900 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm disabled:opacity-70"
                >
                  {addressLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{lang === "bn" ? "সংরক্ষণ হচ্ছে..." : "Saving..."}</span>
                    </>
                  ) : (
                    <span>{lang === "bn" ? "সংরক্ষণ করুন" : "Save Address"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
