"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Truck, ChevronRight } from "lucide-react";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/lib/i18n/context";

interface TrackingTimelineStep {
  time: string;
  labelEn: string;
  labelBn: string;
}

interface TrackingInfo {
  orderNumber: string;
  statusEn: string;
  statusBn: string;
  courier: string;
  estDelivery: string;
  timeline: TrackingTimelineStep[];
}

export default function TrackOrderPage() {
  const { lang } = useLanguage();
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [trackingResult, setTrackingResult] = useState<TrackingInfo | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setTrackingResult({
        orderNumber: orderId.trim().toUpperCase(),
        statusEn: "Dispatched & On the Way",
        statusBn: "কুরিয়ারে হস্তান্তরিত • পথে আছে",
        courier: "Steadfast Express BD",
        estDelivery: "Tomorrow by 5:00 PM",
        timeline: [
          { time: "Today, 10:30 AM", labelEn: "Package scanned at Central Hub, Tejgaon", labelBn: "পার্সেল সেন্ট্রাল হাব, তেজগাঁওয়ে গৃহীত হয়েছে" },
          { time: "Today, 08:15 AM", labelEn: "Picked up by courier partner", labelBn: "কুরিয়ার পার্টনার পার্সেল গ্রহণ করেছে" },
          { time: "Yesterday, 04:00 PM", labelEn: "Order quality checked & packed", labelBn: "অর্ডার কোয়ালিটি চেক ও প্যাকিং সম্পন্ন" },
          { time: "Yesterday, 02:30 PM", labelEn: "Order confirmed via phone", labelBn: "ফোনে অর্ডার নিশ্চিত করা হয়েছে" },
        ],
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 py-10 md:py-16">
        <div className="max-w-2xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 text-xs text-muted mb-6">
            <Link href="/" className="hover:text-rose transition-colors">
              {lang === "bn" ? "হোম" : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-ink">
              {lang === "bn" ? "অর্ডার ট্র্যাকিং" : "Track Order"}
            </span>
          </div>

          <h1
            className={`text-3xl md:text-4xl font-bold text-ink mb-2 ${
              lang === "bn" ? "font-anek" : "font-bricolage"
            }`}
          >
            {lang === "bn" ? "আপনার অর্ডারের অবস্থান জানুন" : "Track Your Order"}
          </h1>
          <p className="text-muted text-sm mb-8">
            {lang === "bn"
              ? "অর্ডার কনফার্মেশন মেসেজে পাওয়া অর্ডার আইডি ও মোবাইল নম্বর প্রদান করুন।"
              : "Enter your order ID (e.g. ABF-98214) and contact number to see live status."}
          </p>

          <form onSubmit={handleTrack} className="bg-blush-50 p-6 rounded-card-lg border border-line flex flex-col gap-4 shadow-xs">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                {lang === "bn" ? "অর্ডার নম্বর (Order ID) *" : "Order ID *"}
              </label>
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. ABF-98214"
                className="w-full h-12 px-4 rounded-card bg-white border border-line text-ink outline-none focus:border-rose text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                {lang === "bn" ? "মোবাইল নম্বর *" : "Phone Number *"}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01XXXXXXXXX"
                className="w-full h-12 px-4 rounded-card bg-white border border-line text-ink outline-none focus:border-rose text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-pill bg-ink hover:bg-rose text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-pill transition-all mt-2"
            >
              <Search className="w-4 h-4" />
              <span>{lang === "bn" ? "ট্র্যাক করুন" : "Track Package"}</span>
            </button>
          </form>

          {/* Tracking Result View */}
          {trackingResult && (
            <div className="mt-8 bg-white rounded-card-lg p-6 border border-line shadow-card animate-in fade-in duration-300">
              <div className="flex items-center justify-between pb-4 border-b border-line mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase text-muted tracking-wider block">
                    Order Reference
                  </span>
                  <span className="font-bold text-lg text-ink font-bricolage">
                    #{trackingResult.orderNumber}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-pill bg-success-bg text-success font-bold text-xs flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />
                  {lang === "bn" ? trackingResult.statusBn : trackingResult.statusEn}
                </span>
              </div>

              <div className="text-xs text-muted mb-6 flex justify-between bg-blush-50 p-3 rounded-card">
                <span>Courier: <strong>{trackingResult.courier}</strong></span>
                <span>Est: <strong>{trackingResult.estDelivery}</strong></span>
              </div>

              {/* Steps timeline */}
              <div className="flex flex-col gap-4 pl-2 border-l-2 border-rose/30 ml-2">
                {trackingResult.timeline.map((step: TrackingTimelineStep, idx: number) => (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[13px] top-1 w-3 h-3 rounded-full bg-rose border-2 border-white" />
                    <span className="text-[11px] font-bold text-muted block">{step.time}</span>
                    <span className="text-xs font-semibold text-ink">
                      {lang === "bn" ? step.labelBn : step.labelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
