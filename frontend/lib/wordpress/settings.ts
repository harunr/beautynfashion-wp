export interface MenuItem {
  id?: number;
  title: string;
  url: string;
}

export interface StoreSettings {
  announcement_active: string;
  announcement_text_en: string;
  announcement_text_bn: string;
  announcement_link: string;

  header_logo_url: string;
  header_hotline: string;
  header_search_placeholder_en: string;
  header_search_placeholder_bn: string;

  footer_about_en: string;
  footer_about_bn: string;
  footer_newsletter_title_en: string;
  footer_newsletter_title_bn: string;
  footer_newsletter_sub_en: string;
  footer_newsletter_sub_bn: string;
  footer_copyright: string;
  footer_trade_license: string;
  social_facebook: string;
  social_instagram: string;
  social_whatsapp: string;
  social_youtube: string;

  hero_eyebrow_en: string;
  hero_eyebrow_bn: string;
  hero_title_prefix_en: string;
  hero_title_accent_en: string;
  hero_title_suffix_en: string;
  hero_title_prefix_bn: string;
  hero_subtitle_en: string;
  hero_subtitle_bn: string;
  hero_cta_shop_text_en: string;
  hero_cta_shop_text_bn: string;
  hero_cta_shop_url: string;
  hero_cta_routine_text_en: string;
  hero_cta_routine_text_bn: string;
  hero_cta_routine_url: string;
  hero_image_url: string;

  trust_1_title_en: string;
  trust_1_title_bn: string;
  trust_1_desc_en: string;
  trust_1_desc_bn: string;

  trust_2_title_en: string;
  trust_2_title_bn: string;
  trust_2_desc_en: string;
  trust_2_desc_bn: string;

  trust_3_title_en: string;
  trust_3_title_bn: string;
  trust_3_desc_en: string;
  trust_3_desc_bn: string;

  trust_4_title_en: string;
  trust_4_title_bn: string;
  trust_4_desc_en: string;
  trust_4_desc_bn: string;

  primary_menu?: MenuItem[];
}

export const DEFAULT_STORE_SETTINGS: StoreSettings = {
  announcement_active: "1",
  announcement_text_en: "Eid Glow Collection 2026 — Up to 40% OFF",
  announcement_text_bn: "ঈদ স্পেশাল বিউটি অফার ২০২৬ — ৪০% পর্যন্ত বিশেষ ছাড়",
  announcement_link: "/sale",

  header_logo_url: "/logo.png",
  header_hotline: "+880 1700 000000",
  header_search_placeholder_en: "Search serums, lipsticks, stylers…",
  header_search_placeholder_bn: "সিরাম, লিপস্টিক, স্কিনকেয়ার খুঁজুন...",

  footer_about_en:
    "ABeauty & Fashion is Bangladesh's premier destination for 100% authentic, luxury skincare, cosmetics, and fragrances.",
  footer_about_bn:
    "এবিউটি অ্যান্ড ফ্যাশন বাংলাদেশে ১০০% খাঁটি ও আন্তর্জাতিক মানের প্রিমিয়াম বিউটি ও স্কিনকেয়ারের বিশ্বস্ত ঠিকানা।",
  footer_newsletter_title_en: "Join the Glow Club",
  footer_newsletter_title_bn: "গ্লো ক্লাবে যুক্ত হন",
  footer_newsletter_sub_en:
    "Subscribe for early access to sales, skincare tips, and exclusive drops.",
  footer_newsletter_sub_bn:
    "নতুন অফার, বিউটি টিপস ও বিশেষ ডিসকাউন্টের আপডেট সবার আগে পেতে সাবস্ক্রাইব করুন।",
  footer_copyright: "© 2026 ABeauty & Fashion. All rights reserved.",
  footer_trade_license: "TRAD/DSCC/042819/2024",
  social_facebook: "https://facebook.com/abeautynfashion",
  social_instagram: "https://instagram.com/abeautynfashion",
  social_whatsapp: "+8801700000000",
  social_youtube: "https://youtube.com",

  hero_eyebrow_en: "100% Genuine Imported Brands",
  hero_eyebrow_bn: "১০০% খাঁটি আন্তর্জাতিক ব্র্যান্ড",
  hero_title_prefix_en: "Beauty made ",
  hero_title_accent_en: "effortless",
  hero_title_suffix_en: ", fashion made personal.",
  hero_title_prefix_bn: "আপনার ত্বকের নিখুঁত যত্ন ও আসল আভিজাত্য।",
  hero_subtitle_en:
    "Curated skincare, makeup, hair care, and beauty tools — clinically tested so you only buy what works.",
  hero_subtitle_bn:
    "ডার্মাটোলজিস্ট পরীক্ষিত ও আসল বিউটি কালেকশন যা আপনার ত্বকের প্রাকৃতিক উজ্জ্বলতা ফিরিয়ে আনে।",
  hero_cta_shop_text_en: "Shop the Collection",
  hero_cta_shop_text_bn: "কালেকশন দেখুন",
  hero_cta_shop_url: "/shop",
  hero_cta_routine_text_en: "Explore Rituals",
  hero_cta_routine_text_bn: "স্কিনকেয়ার রুটিন",
  hero_cta_routine_url: "/journal",
  hero_image_url:
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=900&auto=format&fit=crop",

  trust_1_title_en: "100% Genuine Products",
  trust_1_title_bn: "১০০% আসল পণ্যের নিশ্চয়তা",
  trust_1_desc_en: "Directly sourced from authorized brand distributors with batch verification.",
  trust_1_desc_bn: "অনুমোদিত আন্তর্জাতিক ডিস্ট্রিবিউটর থেকে সরাসরি আমদানিকৃত পণ্য।",

  trust_2_title_en: "Fast & Reliable Shipping",
  trust_2_title_bn: "দ্রুততম হোম ডেলিভারি",
  trust_2_desc_en: "24-48h inside Dhaka, 3-4 days nationwide via premium couriers.",
  trust_2_desc_bn: "ঢাকার ভেতরে ২৪-৪৮ ঘণ্টায় ও সারা বাংলাদেশে ৩-৪ দিনে ডেলিভারি।",

  trust_3_title_en: "Dedicated Beauty Support",
  trust_3_title_bn: "বিশেষজ্ঞদের পরামর্শ ও সহায়তা",
  trust_3_desc_en: "Expert guidance from trained consultants for your skin and hair concerns.",
  trust_3_desc_bn: "সঠিক প্রসাধন ও রুটিন নির্বাচনে সার্বক্ষণিক সহায়তা।",

  trust_4_title_en: "Secure Checkout & COD",
  trust_4_title_bn: "ক্যাশ অন ডেলিভারি ও নিরাপদ পেমেন্ট",
  trust_4_desc_en: "Pay with cash upon receipt or via encrypted bKash / cards.",
  trust_4_desc_bn: "পণ্য হাতে পেয়ে মূল্য পরিশোধের সুবিধা এবং বিকাশ পেমেন্ট।",

  primary_menu: [
    { id: 46, title: "Shop All", url: "/shop" },
    { id: 47, title: "Skincare", url: "/category/skincare" },
    { id: 48, title: "Makeup", url: "/category/makeup" },
    { id: 49, title: "Hair Care", url: "/category/hair-care" },
    { id: 50, title: "Beauty Tools", url: "/category/beauty-tools" },
    { id: 51, title: "Journal", url: "/journal" },
    { id: 52, title: "Sale", url: "/sale" },
  ],
};

export async function fetchStoreSettings(): Promise<StoreSettings> {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://admin.abeautynfashion.com";
  try {
    const res = await fetch(`${wpUrl}/wp-json/abf/v1/store-settings`, {
      next: { revalidate: 60 }, // ISR: revalidates every 60 seconds
    });
    if (!res.ok) {
      return DEFAULT_STORE_SETTINGS;
    }
    const data = await res.json();
    return { ...DEFAULT_STORE_SETTINGS, ...data };
  } catch {
    return DEFAULT_STORE_SETTINGS;
  }
}
