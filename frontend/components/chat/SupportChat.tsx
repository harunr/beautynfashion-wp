"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Truck,
  ShieldCheck,
  Package,
  Headphones,
  Phone,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/context";
import { useStoreSettings } from "@/lib/wordpress/context";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  action?: {
    type: "whatsapp" | "link" | "inquiry_form";
    label: string;
    url?: string;
  };
}

export default function SupportChat() {
  const { lang } = useLanguage();
  const settings = useStoreSettings();

  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [inputText, setInputText] = useState("");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);

  // Form state for in-chat inquiry
  const [showInquiryForm, setShowInquiryForm] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const rawWhatsapp = settings.social_whatsapp || "+8801811377577";
  const cleanWhatsapp = rawWhatsapp.replace(/[^0-9]/g, "");
  const hotline = settings.header_hotline || "+880 1712-377577";

  // Pre-configured quick topics
  const quickTopics = [
    {
      id: "delivery",
      icon: Truck,
      labelEn: "Delivery Rates & Times",
      labelBn: "ডেলিভারি খরচ ও সময়",
      answerEn:
        "Inside Dhaka: ৳60 (Delivered within 24–48 hrs).\nOutside Dhaka: ৳120 via nationwide courier (Delivered within 48–72 hrs with SMS tracking).",
      answerBn:
        "ঢাকার ভেতরে: ৬০৳ (২৪–৪৮ ঘণ্টার মধ্যে ডেলিভারি)।\nঢাকার বাইরে: ১২০৳ (৪৮–৭২ ঘণ্টার মধ্যে হোম ডেলিভারি ও এসএমএস ট্র্যাকিং)।",
      waText: "Hello ABeauty team, I want to inquire about delivery times and charges.",
    },
    {
      id: "authenticity",
      icon: ShieldCheck,
      labelEn: "Authenticity Guarantee",
      labelBn: "১০০% আসল পণ্যের নিশ্চয়তা",
      answerEn:
        "Every single item at ABeauty & Fashion is 100% genuine and imported directly from authorized brand distributors. We feature genuine batch codes and manufacturer seals with a 100% Money-Back Authenticity Guarantee.",
      answerBn:
        "এবিউটি অ্যান্ড ফ্যাশনের প্রতিটি পণ্য ১০০% খাঁটি এবং অনুমোদিত ব্র্যান্ড ডিস্ট্রিবিউটরদের থেকে সরাসরি সংগৃহীত। প্রতিটি পণ্যে আসল ব্যাচ কোড ও সিল রয়েছে।",
      waText: "Hello, I want to verify product authenticity for an item.",
    },
    {
      id: "tracking",
      icon: Package,
      labelEn: "Track My Order",
      labelBn: "অর্ডার ট্র্যাকিং ও আপডেট",
      answerEn:
        "To track your parcel, share your order number or phone number below, or message our team directly on WhatsApp for live tracking updates.",
      answerBn:
        "আপনার অর্ডার ট্র্যাক করতে নিচে আপনার অর্ডার নম্বর বা ফোন নম্বর লিখে পাঠান, অথবা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।",
      waText: "Hello, I would like to track my order status.",
    },
    {
      id: "consultation",
      icon: Sparkles,
      labelEn: "Skin & Beauty Advice",
      labelBn: "স্কিনকেয়ার পরামর্শ ও রুটিন",
      answerEn:
        "Looking for the perfect serum, moisturiser, or makeup shade? Tell us your skin type (Oily, Dry, Sensitive, Combination) or chat directly with our beauty concierge on WhatsApp for a custom routine!",
      answerBn:
        "আপনার ত্বকের ধরন অনুযায়ী সঠিক সিরাম বা ময়েশ্চারাইজার বেছে নিতে আমাদের বিউটি কনসিয়ার্জের সাথে হোয়াটসঅ্যাপে সরাসরি পরামর্শ নিন!",
      waText: "Hello, I need skincare consultation and product recommendations.",
    },
  ];

  // Initialize messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text:
        lang === "bn"
          ? "হ্যালো! 👋 এবিউটি অ্যান্ড ফ্যাশন কনসিয়ার্জে স্বাগতম। আজকে আপনাকে কীভাবে সহযোগিতা করতে পারি?"
          : "Hello! 👋 Welcome to ABeauty & Fashion Concierge. How can our beauty advisor help you today?",
      timestamp: "Just now",
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setHasOpened(true);
    }
  }, [isOpen, messages]);

  // Handle Quick Topic Click
  const handleSelectTopic = (topic: (typeof quickTopics)[0]) => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: lang === "bn" ? topic.labelBn : topic.labelEn,
      timestamp: "Just now",
    };

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      sender: "bot",
      text: lang === "bn" ? topic.answerBn : topic.answerEn,
      timestamp: "Just now",
      action: {
        type: "whatsapp",
        label: lang === "bn" ? "হোয়াটসঅ্যাপে বিস্তারিত জানুন" : "Chat on WhatsApp for this",
        url: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(topic.waText)}`,
      },
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  // Submit Text Input
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText("");

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);

    // Bot prompt asking for contact info or offering WhatsApp
    setTimeout(() => {
      const botReply: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text:
          lang === "bn"
            ? "আপনার বার্তার জন্য ধন্যবাদ! আপনি কি চান আমাদের কনসিয়ার্জ সরাসরি হোয়াটসঅ্যাপে বা ফোনে আপনার সাথে যোগাযোগ করুক?"
            : "Thank you for your message! Would you like our beauty concierge to follow up with you on WhatsApp or call you back?",
        timestamp: "Just now",
        action: {
          type: "whatsapp",
          label: lang === "bn" ? "হোয়াটসঅ্যাপে চ্যাট করুন" : "Chat Directly on WhatsApp",
          url: `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
            `Inquiry from website: ${userText}`
          )}`,
        },
      };

      setMessages((prev) => [...prev, botReply]);
      setShowInquiryForm(true);
    }, 600);
  };

  // Submit in-chat contact inquiry
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) return;

    setIsSubmittingInquiry(true);

    try {
      // Gather latest user messages for context
      const lastUserMessages = messages
        .filter((m) => m.sender === "user")
        .map((m) => m.text)
        .join(" | ");

      const payload = {
        name: customerName.trim() || "Live Chat Visitor",
        phone: customerPhone.trim(),
        subject: "Live Support Chat Inquiry",
        message: lastUserMessages || "Customer requested callback via live support chat",
        source: "live-support-chat",
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      setInquirySuccess(true);
      setShowInquiryForm(false);

      const botConfirm: Message = {
        id: Date.now().toString(),
        sender: "bot",
        text:
          lang === "bn"
            ? `ধন্যবাদ ${customerName || ""}! আপনার নম্বর (${customerPhone}) সংরক্ষিত হয়েছে। আমাদের বিউটি কনসিয়ার্জ শীঘ্রই আপনার সাথে যোগাযোগ করবেন।`
            : `Thank you ${customerName || ""}! We received your number (${customerPhone}). Our beauty concierge team will get in touch with you shortly.`,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, botConfirm]);
    } catch {
      alert(
        lang === "bn"
          ? "দুঃখিত, তথ্য পাঠানো সম্ভব হয়নি। দয়া করে হোয়াটসঅ্যাপে সরাসরি মেসেজ দিন।"
          : "Could not send details. Please connect directly on WhatsApp."
      );
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3">
        {/* Unread Teaser Pill (visible if chat has never been opened) */}
        {!isOpen && !hasOpened && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white text-ink px-4 py-2.5 rounded-full shadow-lg border border-line text-xs font-semibold hover:border-rose transition-all animate-bounce duration-1000"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {lang === "bn" ? "সাহায্য প্রয়োজন? চ্যাট করুন" : "Need advice? Chat with us"}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close live support chat" : "Open live support chat"}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose text-white hover:bg-rose-dark shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 transform active:scale-95 group focus:outline-none focus:ring-4 focus:ring-rose/30"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform rotate-0 group-hover:rotate-90 duration-200" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7" />
              {/* Online Pulsing Indicator */}
              <span className="absolute top-1.5 right-1.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
              </span>

              {/* Unread Notification Badge */}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -left-1 bg-amber-400 text-ink text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Live Support Chat"
          className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] max-w-[400px] h-[550px] max-h-[82vh] bg-white rounded-3xl border border-line shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-plum-dark via-plum to-rose p-4 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white font-serif font-bold text-base">
                  AB
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-plum" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>{lang === "bn" ? "এবিউটি কনসিয়ার্জ" : "ABeauty Concierge"}</span>
                  <span className="text-[10px] bg-white/20 text-white font-medium px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </h3>
                <p className="text-[11px] text-white/80 leading-tight mt-0.5">
                  {lang === "bn"
                    ? "সাধারণত দ্রুত উত্তর দেওয়া হয়"
                    : "Replies in minutes or via WhatsApp"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#faf9f6]/80 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.sender === "user"
                      ? "bg-rose text-white rounded-br-none"
                      : "bg-white text-ink border border-line rounded-bl-none"
                  }`}
                >
                  {msg.text}

                  {/* Message Action Button (e.g. WhatsApp Link) */}
                  {msg.action && (
                    <div className="mt-2.5 pt-2 border-t border-line/60">
                      <a
                        href={msg.action.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#25D366] text-white text-[11px] font-bold hover:bg-[#20ba59] transition-all shadow-sm"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{msg.action.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
                <span className="text-[9px] text-muted mt-1 px-1">{msg.timestamp}</span>
              </div>
            ))}

            {/* Quick Answer Pills (shown when in initial state) */}
            {messages.length <= 2 && (
              <div className="pt-2">
                <p className="text-[11px] font-bold text-muted mb-2 uppercase tracking-wider">
                  {lang === "bn" ? "সাধারণ জিজ্ঞাসা নির্বাচন করুন:" : "Quick questions:"}
                </p>
                <div className="flex flex-col gap-1.5">
                  {quickTopics.map((topic) => {
                    const Icon = topic.icon;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => handleSelectTopic(topic)}
                        className="w-full text-left bg-white hover:bg-rose-50/70 border border-line hover:border-rose/40 rounded-xl p-2.5 transition-all flex items-center justify-between group shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="font-medium text-ink group-hover:text-rose transition-colors text-xs">
                            {lang === "bn" ? topic.labelBn : topic.labelEn}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-muted group-hover:text-rose transition-colors" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* In-Chat Callback Request Form */}
            {showInquiryForm && !inquirySuccess && (
              <form
                onSubmit={handleInquirySubmit}
                className="bg-white border border-rose-200 rounded-2xl p-3.5 shadow-sm space-y-2.5 animate-in fade-in"
              >
                <div className="flex items-center gap-2 text-rose font-bold text-xs">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>
                    {lang === "bn" ? "কলব্যাক অনুরোধ রাখুন" : "Request a Direct Callback"}
                  </span>
                </div>
                <input
                  type="text"
                  placeholder={lang === "bn" ? "আপনার নাম" : "Your Name"}
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg border border-line text-xs outline-none focus:border-rose"
                />
                <input
                  type="tel"
                  required
                  placeholder={lang === "bn" ? "মোবাইল নম্বর *" : "Phone / WhatsApp Number *"}
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg border border-line text-xs outline-none focus:border-rose"
                />
                <button
                  type="submit"
                  disabled={isSubmittingInquiry}
                  className="w-full h-8 rounded-lg bg-rose hover:bg-rose-dark disabled:opacity-70 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  {isSubmittingInquiry ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{lang === "bn" ? "নম্বর জমা দিন" : "Submit Phone Number"}</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Handoff Banner */}
          <div className="bg-sand/60 border-t border-line/60 px-4 py-2 flex items-center justify-between text-[11px] shrink-0">
            <span className="text-muted flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {lang === "bn" ? "হোয়াটসঅ্যাপে তাত্ক্ষণিক:" : "Instant on WhatsApp:"}
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${cleanWhatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
              {hotline && (
                <a
                  href={`tel:${hotline.replace(/\s+/g, "")}`}
                  className="text-ink hover:text-rose font-medium flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-muted" />
                  <span>{hotline}</span>
                </a>
              )}
            </div>
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-line flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                lang === "bn"
                  ? "আপনার বার্তা লিখুন..."
                  : "Type your question or query..."
              }
              className="flex-1 h-10 px-3.5 rounded-full bg-sand/40 border border-line text-xs text-ink placeholder:text-muted outline-none focus:border-rose focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-full bg-rose text-white hover:bg-rose-dark disabled:opacity-40 disabled:hover:bg-rose flex items-center justify-center transition-all shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
