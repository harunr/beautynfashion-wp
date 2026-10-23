export interface Article {
  slug: string;
  titleEn: string;
  titleBn: string;
  excerptEn: string;
  excerptBn: string;
  author: string;
  readTime: string;
  date: string;
  categoryEn: string;
  categoryBn: string;
  image: string;
  summaryDirectAnswerEn: string;
  summaryDirectAnswerBn: string;
  contentEn: { heading: string; text: string }[];
  contentBn: { heading: string; text: string }[];
  featuredProductIds: number[];
}

export const ARTICLES: Article[] = [
  {
    slug: "glass-skin-routine-bangladesh-humidity",
    titleEn: "The 7-Step Glass Skin Ritual Adapted for High Humidity & Heat",
    titleBn: "গরমে ও আর্দ্র আবহাওয়ায় নিখুঁত গ্লাস স্কিন কেয়ারের ৭টি সহজ ধাপ",
    excerptEn: "How to achieve dewy, poreless radiance without making your skin oily or triggering breakouts in tropical weather.",
    excerptBn: "ত্বক তেলতেলে বা চটচটে না করে কীভাবে গ্রীষ্মপ্রধান আবহাওয়াতেও প্রাকৃতিক কাঁচের মতো দীপ্তিময় ত্বক পাওয়া যায়。",
    author: "Dr. Samira Khan, Dermatologist",
    readTime: "5 min read",
    date: "October 2026",
    categoryEn: "Skincare Rituals",
    categoryBn: "স্কিনকেয়ার রিচুয়াল",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop",
    summaryDirectAnswerEn: "Achieving glass skin in humid climates requires layering ultra-light humectants (hyaluronic acid, rosewater) rather than heavy occlusive oils. Pair with stable Vitamin C and oil-free ceramide gel for long-lasting luminosity without clogging pores.",
    summaryDirectAnswerBn: "আর্দ্র আবহাওয়ায় অতিরিক্ত ভারি তেলের পরিবর্তে হালকা হায়ালুরোনিক অ্যাসিড, রোজওয়াটার ও তেলহীন সিরামাইড ব্যবহার করুন। এটি ত্বক চটচটে না করে প্রাকৃতিক উজ্জ্বলতা ধরে রাখে।",
    featuredProductIds: [11, 12, 17, 19],
    contentEn: [
      {
        heading: "1. The Philosophy of Humidity-Proof Glass Skin",
        text: "The traditional 10-step Korean routine was formulated for cold, dry East Asian winters. In Bangladesh and South Asia, applying thick facial balms leads to congested pores and acne. The secret is weightless water-burst hydration that quenches cellular thirst without trapping sweat.",
      },
      {
        heading: "2. Morning Step: Tone with Pure Rose Hydrosol",
        text: "Start with an alcohol-free Damask rosewater toner. It rebalances epidermal pH after cleansing and primes skin cells to absorb 4x more antioxidants from subsequent serums.",
      },
      {
        heading: "3. Antioxidant Infusion with THD Vitamin C",
        text: "Apply 2-3 drops of lipid-soluble THD Ascorbate Vitamin C. Unlike traditional L-ascorbic acid, THD does not oxidize in tropical heat and prevents sun-induced melanin production without irritation.",
      },
      {
        heading: "4. Lock with Non-Nano Mineral Sunscreen",
        text: "Never skip SPF. A lightweight mineral sunscreen with 18% zinc oxide prevents the UV damage that causes dullness and uneven texture. Look for non-nano formulations that blend invisibly on South Asian skin tones.",
      },
    ],
    contentBn: [
      {
        heading: "১. আর্দ্র আবহাওয়ায় স্কিনকেয়ারের মূল রহস্য",
        text: "ভারি ক্রিমের বদলে ওয়াটার-বেসড সিরাম ও হালকা ময়েশ্চারাইজার বেছে নিন যা দ্রুত ত্বকে মিশে যায় এবং ঘামের কারণে চটচটে ভাব তৈরি করে না।",
      },
      {
        heading: "২. সকালের শুরুতে গোলাপজলের টোনিং",
        text: "অ্যালকোহলমুক্ত খাঁটি রোজওয়াটার টোনার ব্যবহার করুন যা রোদে পোড়া ভাব শান্ত করে এবং ত্বকের লোমকূপ পরিষ্কার রাখে।",
      },
      {
        heading: "৩. ভিটামিন সি সিরাম দিয়ে দাগ দূরীকরণ",
        text: "সকালে সানস্ক্রিনের নিচে ভিটামিন সি সিরাম ব্যবহার করলে মেছতা ও কালচে দাগ দ্রুত হালকা হয় এবং ত্বক উজ্জ্বল দেখায়।",
      },
      {
        heading: "৪. এসপিএফ ৫০+ সানস্ক্রিন দিয়ে সুরক্ষা",
        text: "রোদে বের হওয়ার আগে অবশ্যই মিনারেল সানস্ক্রিন ব্যবহার করুন যা সূর্যের ক্ষতিকর অতিবেগুনি রশ্মি ও বয়সের ছাপ থেকে ত্বককে সুরক্ষা দেয়।",
      },
    ],
  },
  {
    slug: "finding-foundation-undertone-south-asian-skin",
    titleEn: "How to Pick the Perfect Foundation Shade for South Asian Undertones",
    titleBn: "দক্ষিণ এশীয় ত্বকের জন্য সঠিক ফাউন্ডেশন ও আন্ডারটোন নির্বাচনের নিয়ম",
    excerptEn: "Stop buying ashy or orange foundations. Here is the definitive guide to olive, golden, and neutral undertone matching.",
    excerptBn: "মুখে ফাউন্ডেশন লাগালে ধূসর বা অতিরিক্ত হলদে দেখায়? জেনে নিন আপনার আসল আন্ডারটোন ও নিখুঁত শেড বেছে নেওয়ার সহজ উপায়।",
    author: "Maliha Chowdhury, Lead Makeup Artist",
    readTime: "4 min read",
    date: "October 2026",
    categoryEn: "Makeup Mastery",
    categoryBn: "মেকআপ গাইড",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=900&auto=format&fit=crop",
    summaryDirectAnswerEn: "To avoid foundation oxidation or an ashy gray cast, match against your jawline and chest rather than the wrist. Most South Asian complexions have warm golden or olive undertones that require yellow-to-olive pigment bases rather than pink.",
    summaryDirectAnswerBn: "হাতের কবজির বদলে চোয়াল ও গলার সাথে মিলিয়ে ফাউন্ডেশন পরীক্ষা করুন। বেশিরভাগ বাঙালি ত্বকে গোল্ডেন বা অলিভ আন্ডারটোন থাকে, তাই গোলাপি বেসের বদলে হলুদ বা গোল্ডেন বেসের ফাউন্ডেশন সবচেয়ে ভালো মানায়।",
    featuredProductIds: [20, 26, 13],
    contentEn: [
      {
        heading: "1. The Wrist Vein Test vs. The Collarbone Test",
        text: "While blue vs. green wrist veins are a common indicator, hyperpigmentation on South Asian hands often skews results. The most reliable test is observing the color transition between your lower jaw and your collarbone under natural daylight.",
      },
      {
        heading: "2. Understanding the Olive Undertone",
        text: "Many Bangladeshi complexions are olive—a greenish-yellow undertone. Standard warm foundations can look overly orange, while cool foundations turn ashy gray. Look for neutral-warm shades enriched with yellow-green balance.",
      },
      {
        heading: "3. Setting Without Flashback",
        text: "Set foundation with a talc-free, micro-milled silica powder. Traditional talc reflects white camera flashes, resulting in the dreaded ghostly look in wedding photography.",
      },
    ],
    contentBn: [
      {
        heading: "১. গলার রঙের সাথে মিলিয়ে ফাউন্ডেশন বাছাই",
        text: "দোকানের লাইটের নিচে নয়, বরং দিনের প্রাকৃতিক আলোতে চোয়ালের নিচে ফাউন্ডেশন লাগিয়ে দেখুন ত্বকের রঙের সাথে পুরোপুরি মিশে যাচ্ছে কিনা।",
      },
      {
        heading: "২. অলিভ ও গোল্ডেন আন্ডারটোনের পার্থক্য",
        text: "বাঙালি ত্বকে সাধারণত ওয়ার্ম বা অলিভ আন্ডারটোন বেশি দেখা যায়। তাই সঠিক শেড নির্বাচন করলে ত্বক উজ্জ্বল ও ফ্রেশ দেখাবে।",
      },
      {
        heading: "৩. ছবি তোলার সময় ফ্ল্যাশব্যাক প্রতিরোধ",
        text: "ট্যালকমুক্ত লুজ সেটিং পাউডার ব্যবহার করুন যা বিয়ে বা পার্টির উজ্জ্বল ক্যামেরার ফ্ল্যাশে মুখে সাদা আভা তৈরি করবে না।",
      },
    ],
  },
  {
    slug: "rosemary-oil-scalp-growth-hairfall-prevention",
    titleEn: "The Science of Cold-Pressed Rosemary Oil for Hair Density and Roots",
    titleBn: "চুল পড়া রোধ ও নতুন চুল গজাতে রোজমেরি অয়েলের বৈজ্ঞানিক কার্যকারিতা",
    excerptEn: "Clinical studies confirm cold-pressed rosemary leaf oil matches 2% minoxidil in stimulating hair follicles without scalp itch.",
    excerptBn: "বিজ্ঞানসম্মতভাবে প্রমাণিত যে খাঁটি রোজমেরি অয়েল মাথার ত্বকে রক্ত সঞ্চালন বাড়িয়ে চুল পড়া বন্ধ করতে ও গোড়া মজবুত করতে ভূমিকা রাখে।",
    author: "Dr. Farhana Yasmin, Trichologist",
    readTime: "4 min read",
    date: "October 2026",
    categoryEn: "Hair Health",
    categoryBn: "হেয়ার কেয়ার",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=900&auto=format&fit=crop",
    summaryDirectAnswerEn: "Rosemary oil blocks dihydrotestosterone (DHT) binding on hair follicles and dilates micro-capillaries in the scalp. Applying it 2-3 times per week with a gentle 5-minute massage noticeably improves hair density within 12 weeks.",
    summaryDirectAnswerBn: "সপ্তাহে ২-৩ দিন মাথার ত্বকে কয়েক ফোঁটা রোজমেরি তেল দিয়ে আলতোভাবে ম্যাসাজ করলে মাথার ত্বকে রক্ত সঞ্চালন বাড়ে এবং চুলের গোড়া শক্ত হয়।",
    featuredProductIds: [21, 15, 18],
    contentEn: [
      {
        heading: "1. Why Follicles Weaken in Urban Environments",
        text: "Hard water, humidity, and atmospheric particulate matter (PM2.5) oxidize scalp sebum, suffocating dermal papilla cells. Rosemary's high carnosic acid content provides anti-inflammatory defense.",
      },
      {
        heading: "2. The Correct Dilution and Application Protocol",
        text: "Never apply pure 100% essential oil undiluted. Use a cold-pressed blend formulated with jojoba and castor carrier oils. Section hair and massage for 3-5 minutes with fingertips to activate blood flow.",
      },
    ],
    contentBn: [
      {
        heading: "১. শহরের ধুলাবালি ও দূষণের প্রভাব",
        text: "দূষণ ও শক্ত পানির কারণে মাথার ত্বক শুষ্ক হয়ে যায় এবং খুশকি বাড়ে। রোজমেরি অয়েল প্রাকৃতিক অ্যান্টিসেপটিক হিসেবে কাজ করে।",
      },
      {
        heading: "২. সঠিক ম্যাসাজ ও ব্যবহারের নিয়ম",
        text: "চুলের গোড়ায় আঙুলের ডগা দিয়ে আলতো করে ম্যাসাজ করুন। গোসলের ২ ঘণ্টা পূর্বে বা রাতে মেখে পরের দিন ধুয়ে ফেলুন।",
      },
    ],
  },
];

export function getAllArticles(): Article[] {
  return ARTICLES;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
