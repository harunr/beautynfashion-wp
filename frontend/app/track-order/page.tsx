"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Truck,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Package,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";

interface TrackingTimelineStep {
  time: string;
  labelEn: string;
  labelBn: string;
  done?: boolean;
}

interface TrackingItem {
  name: string;
  quantity: number;
  total: number;
}

interface TrackingInfo {
  orderNumber: string;
  status: string;
  statusEn: string;
  statusBn: string;
  courier: string;
  estDelivery: string;
  total: number;
  currency: string;
  paymentMethod: string;
  customerName: string;
  address: string;
  items: TrackingItem[];
  timeline: TrackingTimelineStep[];
}

function TrackOrderContent() {
  const { lang, formatPrice } = useLanguage();
  const searchParams = useSearchParams();

  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [trackingResult, setTrackingResult] = useState<TrackingInfo | null>(null);

  const fetchTracking = useCallback(
    async (targetId: string, targetPhone: string) => {
      if (!targetId.trim()) return;
      setLoading(true);
      setError(null);
      setTrackingResult(null);

      try {
        const url = new URL("/api/orders/track", window.location.origin);
        url.searchParams.set("order_id", targetId.trim());
        if (targetPhone.trim()) {
          url.searchParams.set("phone", targetPhone.trim());
        }

        const res = await fetch(url.toString(), { cache: "no-store" });
        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(
            data.error ||
              (lang === "bn"
                ? "অর্ডার পাওয়া যায়নি। অনুগ্রহ করে সঠিক অর্ডার আইডি দিন।"
                : "No order found with this reference.")
          );
        }

        setTrackingResult(data);
      } catch (err: unknown) {
        const msg =
          err instanceof Error
            ? err.message
            : lang === "bn"
            ? "অর্ডার ট্র্যাক করতে সমস্যা হয়েছে।"
            : "Failed to track order.";
        setError(msg);
      } finally {
        setLoading(false);
      }
    },
    [lang]
  );

  // Auto-track if navigated from checkout or account with URL params
  useEffect(() => {
    const paramId = searchParams.get("order_id") || searchParams.get("id");
    const paramPhone = searchParams.get("phone");

    if (paramId) {
      setOrderId(paramId);
      if (paramPhone) {
        setPhone(paramPhone);
      }
      fetchTracking(paramId, paramPhone || "");
    }
  }, [searchParams, fetchTracking]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(orderId, phone);
  };

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
              {lang === "bn" ? "অর্ডার ট্র্যাকিং" : "Track Order"}
            </span>
          </div>

          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="w-14 h-14 rounded-full bg-blush-100 text-rose flex items-center justify-center mx-auto mb-3 shadow-xs">
              <Truck className="w-7 h-7" />
            </div>
            <h1
              className={`text-3xl md:text-4xl font-bold text-ink mb-2 ${
                lang === "bn" ? "font-anek" : "font-bricolage"
              }`}
            >
              {lang === "bn" ? "লাইভ অর্ডার ট্র্যাকিং" : "Live Order Tracking"}
            </h1>
            <p className="text-muted text-sm leading-relaxed">
              {lang === "bn"
                ? "আপনার অর্ডার নিশ্চিতকরণ নম্বর (যেমন: ABF-1024) ও মোবাইল নম্বর দিয়ে অর্ডারের লাইভ অবস্থান ও ডেলিভারি স্ট্যাটাস জানুন।"
                : "Enter your order reference (e.g. ABF-1024) and phone number to track live status and estimated delivery."}
            </p>
          </div>

          {/* Tracking Query Form */}
          <form
            onSubmit={handleTrackSubmit}
            className="bg-blush-50/70 p-6 md:p-8 rounded-card-lg border border-line flex flex-col gap-4 shadow-xs"
          >
            {error && (
              <div className="p-3.5 rounded-card bg-rose-50 border border-rose-200 text-rose text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  {lang === "bn" ? "অর্ডার নম্বর (Order ID) *" : "Order ID *"}
                </label>
                <input
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="e.g. ABF-1025 or 1025"
                  className="w-full h-12 px-4 rounded-card bg-white border border-line text-ink outline-none focus:border-rose text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  {lang === "bn" ? "মোবাইল নম্বর (ঐচ্ছিক নিরাপত্তা যাচাই)" : "Phone Number (Optional Verification)"}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full h-12 px-4 rounded-card bg-white border border-line text-ink outline-none focus:border-rose text-sm font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-pill bg-ink hover:bg-rose text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-pill transition-all mt-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{lang === "bn" ? "ট্র্যাক করা হচ্ছে..." : "Tracking Package..."}</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>{lang === "bn" ? "লাইভ অবস্থান ট্র্যাক করুন" : "Track Package"}</span>
                </>
              )}
            </button>
          </form>

          {/* Live Tracking Result View */}
          {trackingResult && (
            <div className="mt-8 bg-white rounded-card-lg p-6 md:p-8 border border-line shadow-card animate-in fade-in duration-300 space-y-6">
              {/* Header capsule */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-line">
                <div>
                  <span className="text-[11px] font-bold uppercase text-muted tracking-wider block">
                    {lang === "bn" ? "অর্ডার নম্বর" : "Order Reference"}
                  </span>
                  <span className="font-bold text-2xl text-ink font-bricolage">
                    #{trackingResult.orderNumber}
                  </span>
                  {trackingResult.customerName && (
                    <p className="text-xs text-muted mt-0.5">
                      {lang === "bn" ? "গ্রাহক:" : "Customer:"} {trackingResult.customerName}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span className="px-3.5 py-1.5 rounded-pill bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center gap-1.5 shadow-xs">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span>{lang === "bn" ? trackingResult.statusBn : trackingResult.statusEn}</span>
                  </span>
                </div>
              </div>

              {/* Logistics Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-blush-50/60 p-4 rounded-xl border border-line/70">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-rose border border-line shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-muted block text-[11px]">
                      {lang === "bn" ? "কুরিয়ার পার্টনার" : "Courier Partner"}
                    </span>
                    <strong className="text-ink">{trackingResult.courier}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-plum border border-line shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-muted block text-[11px]">
                      {lang === "bn" ? "আনুমানিক ডেলিভারি সময়" : "Estimated Delivery"}
                    </span>
                    <strong className="text-ink">{trackingResult.estDelivery}</strong>
                  </div>
                </div>
              </div>

              {/* Timeline Steps */}
              <div>
                <h3 className="font-bold text-sm text-ink uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Package className="w-4 h-4 text-rose" />
                  <span>{lang === "bn" ? "ডেলিভারি টাইমলাইন" : "Delivery Progress Timeline"}</span>
                </h3>

                <div className="flex flex-col gap-5 pl-2 border-l-2 border-line ml-3">
                  {trackingResult.timeline.map((step, idx) => (
                    <div key={idx} className="relative pl-6">
                      <div
                        className={`absolute -left-[13px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                          step.done
                            ? "bg-emerald-600 border-white text-white shadow-xs"
                            : "bg-white border-line text-muted"
                        }`}
                      >
                        {step.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                        )}
                      </div>
                      <span className="text-[11px] font-bold text-muted block">
                        {step.time}
                      </span>
                      <span
                        className={`text-xs sm:text-sm font-semibold block mt-0.5 ${
                          step.done ? "text-ink" : "text-muted"
                        }`}
                      >
                        {lang === "bn" ? step.labelBn : step.labelEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items Preview */}
              {trackingResult.items && trackingResult.items.length > 0 && (
                <div className="pt-4 border-t border-line space-y-2 text-xs">
                  <h4 className="font-bold text-ink mb-2">
                    {lang === "bn" ? "অর্ডারের পণ্যসমূহ" : "Items in this shipment"}
                  </h4>
                  <div className="divide-y divide-line/60 bg-[#FAF8F9] rounded-xl p-3 border border-line">
                    {trackingResult.items.map((item, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between">
                        <span className="font-medium text-ink">
                          {item.name} <span className="text-muted">× {item.quantity}</span>
                        </span>
                        <span className="font-bold font-bricolage text-ink">
                          {formatPrice(0, item.total)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 flex items-center justify-between font-bold text-ink">
                      <span>{lang === "bn" ? "মোট পরিশোধযোগ্য:" : "Grand Total:"}</span>
                      <span className="text-rose font-bricolage text-sm">
                        {formatPrice(0, trackingResult.total)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery Address & WhatsApp Support */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-line text-xs">
                {trackingResult.address && (
                  <div className="flex items-center gap-1.5 text-muted max-w-sm">
                    <MapPin className="w-4 h-4 text-rose shrink-0" />
                    <span className="truncate">{trackingResult.address}</span>
                  </div>
                )}

                <a
                  href={`https://wa.me/8801811377577?text=${encodeURIComponent(
                    `Hello ABeauty & Fashion, I am tracking my Order #${trackingResult.orderNumber} (${trackingResult.statusEn}). Can you please provide an update?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-pill bg-[#E8F5E9] hover:bg-[#C8E6C9] text-[#1B5E20] font-bold inline-flex items-center gap-1.5 transition-colors ml-auto shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{lang === "bn" ? "হোয়াটসঅ্যাপে আপডেট চান?" : "WhatsApp Live Inquiry"}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <TrackOrderContent />
    </Suspense>
  );
}
