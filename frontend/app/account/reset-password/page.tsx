"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import { useLanguage } from "@/lib/i18n/context";
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ArrowRight } from "lucide-react";

function ResetPasswordContent() {
  const { lang } = useLanguage();
  const searchParams = useSearchParams();

  const key = searchParams.get("key") || "";
  const login = searchParams.get("login") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!key || !login) {
      setError(
        lang === "bn"
          ? "রিসেট লিংকটি অকার্যকর বা তথ্য অনুপস্থিত। দয়া করে পুনরায় চেষ্টা করুন।"
          : "Invalid or missing password reset parameters."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        lang === "bn"
          ? "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।"
          : "Password must be at least 6 characters long."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        lang === "bn"
          ? "পাসওয়ার্ড দুটি মিলছে না।"
          : "Passwords do not match."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, login, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setSuccess(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An error occurred.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand text-ink flex flex-col font-sans">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-container mx-auto w-full px-4 md:px-8 lg:px-14 py-12 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-card p-6 md:p-8 border border-line shadow-sm">
          {success ? (
            <div className="text-center space-y-4 py-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="font-serif text-2xl font-bold text-ink">
                {lang === "bn" ? "পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!" : "Password Reset Successfully!"}
              </h1>
              <p className="text-xs md:text-sm text-muted leading-relaxed">
                {lang === "bn"
                  ? "আপনার নতুন পাসওয়ার্ড কার্যকর হয়েছে। এখন আপনি নতুন পাসওয়ার্ড দিয়ে সাইন ইন করতে পারবেন।"
                  : "Your password has been updated. You can now sign in with your new credentials."}
              </p>
              <Link
                href="/account"
                className="inline-flex items-center justify-center gap-2 w-full h-12 bg-rose text-white font-bold rounded-pill hover:bg-rose-dark transition-all shadow-pill mt-4"
              >
                <span>{lang === "bn" ? "সাইন ইন করুন" : "Sign In Now"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-6 h-6" />
                </div>
                <h1 className="font-serif text-2xl font-bold text-ink">
                  {lang === "bn" ? "নতুন পাসওয়ার্ড সেট করুন" : "Set New Password"}
                </h1>
                <p className="text-xs text-muted mt-1">
                  {lang === "bn"
                    ? "আপনার অ্যাকাউন্টের জন্য একটি শক্তিশালী নতুন পাসওয়ার্ড দিন।"
                    : "Enter a strong new password for your account."}
                </p>
              </div>

              {error && (
                <div className="p-3.5 mb-4 bg-rose-50 border border-rose-200 rounded-card text-rose text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "নতুন পাসওয়ার্ড *" : "New Password *"}
                  </label>
                  <div className="relative">
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full h-11 px-3.5 pr-10 rounded-card border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[11px] text-muted mt-1">
                    {lang === "bn" ? "কমপক্ষে ৬ অক্ষরের হতে হবে" : "Must be at least 6 characters"}
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-ink uppercase tracking-wider mb-1.5">
                    {lang === "bn" ? "পাসওয়ার্ড নিশ্চিত করুন *" : "Confirm Password *"}
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full h-11 px-3.5 rounded-card border border-line focus:border-rose focus:ring-1 focus:ring-rose outline-none text-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-rose text-white font-bold rounded-pill hover:bg-rose-dark disabled:opacity-70 transition-all shadow-pill flex items-center justify-center gap-2 mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{lang === "bn" ? "আপডেট হচ্ছে..." : "Resetting Password..."}</span>
                    </>
                  ) : (
                    <span>{lang === "bn" ? "পাসওয়ার্ড নিশ্চিত করুন" : "Save New Password"}</span>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand" />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
