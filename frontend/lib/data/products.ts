export interface ProductImage {
  src: string;
  alt: string;
  labelEn: string;
  labelBn: string;
}

export interface ProductShade {
  nameEn: string;
  nameBn: string;
  color: string;
}

export interface ProductTag {
  en: string;
  bn: string;
}

export interface Product {
  id: number;
  slug: string;
  titleEn: string;
  titleBn: string;
  brand: string;
  categoryEn: string;
  categoryBn: string;
  categorySlug: string;
  priceUSD: number;
  priceBDT: number;
  wasUSD?: number;
  wasBDT?: number;
  rating: number;
  reviewsCount: number;
  badgeEn?: string;
  badgeBn?: string;
  isSale?: boolean;
  inStock: boolean;
  stockQuantity: number;
  sku: string;
  images: ProductImage[];
  shortDescEn: string;
  shortDescBn: string;
  descriptionEn: string;
  descriptionBn: string;
  sizes?: string[];
  shades?: ProductShade[];
  tags: ProductTag[];
  detailsEn: string;
  detailsBn: string;
  howToUseEn: string;
  howToUseBn: string;
  ingredientsEn: string;
}

export interface Category {
  nameEn: string;
  nameBn: string;
  slug: string;
  image: string;
  itemCount: number;
  descriptionEn: string;
  descriptionBn: string;
}

export const CATEGORIES: Category[] = [
  {
    nameEn: "Skincare",
    nameBn: "স্কিনকেয়ার",
    slug: "skincare",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=600&auto=format&fit=crop",
    itemCount: 42,
    descriptionEn: "Dermatologist-formulated serums, ceramide creams, and gentle cleansers crafted for radiant health.",
    descriptionBn: "পরিষ্কার ও দীপ্তিময় ত্বকের জন্য ডার্মাটোলজিস্ট টেস্টেড সিরাম, ময়েশ্চারাইজার ও ক্লিনজার।",
  },
  {
    nameEn: "Makeup",
    nameBn: "মেকআপ",
    slug: "makeup",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=600&auto=format&fit=crop",
    itemCount: 38,
    descriptionEn: "Weightless foundations, transfer-proof lip stains, and buttery highlighters that celebrate your tone.",
    descriptionBn: "দীর্ঘস্থায়ী লিপ কালার, লাইটওয়েট ফাউন্ডেশন ও আন্তর্জাতিক মানের মেকআপ কালেকশন।",
  },
  {
    nameEn: "Hair Care",
    nameBn: "হেয়ার কেয়ার",
    slug: "hair-care",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=600&auto=format&fit=crop",
    itemCount: 24,
    descriptionEn: "Bond-repair silk masks, rosemary scalp elixirs, and restorative oils for salon-worthy shine.",
    descriptionBn: "চুল পড়া রোধ ও রেশমি চুলের জন্য পুষ্টিকর হেয়ার মাস্ক, স্ক্যাল্প সিরাম ও খাঁটি তেল।",
  },
  {
    nameEn: "Beauty Tools",
    nameBn: "বিউটি টুলস",
    slug: "beauty-tools",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600&auto=format&fit=crop",
    itemCount: 19,
    descriptionEn: "Sonic cleansing devices, ionic thermal stylers, and natural rose quartz sculpting tools.",
    descriptionBn: "সনিক ক্লিনজিং ডিভাইস, সিরামিক হেয়ার স্টাইলার ও স্কাল্পটিং গুয়া শা রোলার।",
  },
  {
    nameEn: "Fragrance",
    nameBn: "সুগন্ধি",
    slug: "fragrance",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600&auto=format&fit=crop",
    itemCount: 29,
    descriptionEn: "Artisanal Eau de Parfums capturing night-blooming florals, rare sandalwood, and golden amber.",
    descriptionBn: "মনোরম ও দীর্ঘস্থায়ী আন্তর্জাতিক পারফিউম ও বডি মিস্ট কালেকশন।",
  },
  {
    nameEn: "Bath & Body",
    nameBn: "বাথ ও বডি",
    slug: "bath-body",
    image: "https://images.unsplash.com/photo-1608248597359-009187ec09a9?q=80&w=600&auto=format&fit=crop",
    itemCount: 16,
    descriptionEn: "Whipped shea butters, nourishing cleansing oils, and gentle exfoliating body scrubs.",
    descriptionBn: "ত্বকের কোমলতার জন্য সুবাসিত বডি বাটার, পুষ্টিকর শাওয়ার অয়েল ও স্ক্রাব।",
  },
];

export const PRODUCTS: Product[] = [
  // 1. Skincare - Vitamin C Serum
  {
    id: 11,
    slug: "radiance-c-squalane-serum",
    titleEn: "Radiance C+ Squalane Serum 30ml",
    titleBn: "রেডিয়েন্স সি+ স্কোয়ালেন সিরাম ৩০ মি.লি.",
    brand: "GlowRecipe",
    categoryEn: "Skincare",
    categoryBn: "স্কিনকেয়ার",
    categorySlug: "skincare",
    priceUSD: 38.0,
    priceBDT: 4500,
    wasUSD: 44.0,
    wasBDT: 5200,
    rating: 4.9,
    reviewsCount: 128,
    badgeEn: "Bestseller",
    badgeBn: "বেস্টসেলার",
    isSale: true,
    inStock: true,
    stockQuantity: 45,
    sku: "ABF-SK-001",
    sizes: ["30ml", "50ml"],
    tags: [
      { en: "Brightening", bn: "উজ্জ্বলতাকারী" },
      { en: "Antioxidant", bn: "অ্যান্টিঅক্সিডেন্ট" },
      { en: "Dermatologist Tested", bn: "ডার্মাটোলজিস্ট টেস্টেড" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
        alt: "Radiance C+ Squalane Serum 30ml Dropper Bottle",
        labelEn: "Front View",
        labelBn: "সামনের দৃশ্য",
      },
      {
        src: "https://images.unsplash.com/photo-1608248597359-009187ec09a9?q=80&w=800&auto=format&fit=crop",
        alt: "Serum Texture and Dropper",
        labelEn: "Texture",
        labelBn: "টেক্সচার",
      },
      {
        src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
        alt: "Serum in Hand",
        labelEn: "Lifestyle",
        labelBn: "লাইফস্টাইল",
      },
    ],
    shortDescEn: "Concentrated 15% THD Ascorbate Vitamin C infused with pure olive squalane for intense brightening without stinging.",
    shortDescBn: "১৫% টিএইচডি অ্যাসকরবেট ভিটামিন সি ও অলিভ স্কোয়ালেন সমৃদ্ধ সিরাম, যা ত্বককে জ্বালাপোড়া ছাড়া উজ্জ্বল করে।",
    descriptionEn: "Experience high-potency antioxidant protection with our Radiance C+ Squalane Serum. Formulated with an ultra-stable Vitamin C lipid ester (THD Ascorbate) and pure olive squalane, this fast-absorbing serum penetrates deeply to fade dark spots, boost natural collagen synthesis, and restore radiant glow to fatigued skin.",
    descriptionBn: "রেডিয়েন্স সি+ স্কোয়ালেন সিরাম ত্বকের গভীর পর্যন্ত পুষ্টি পৌঁছে দিয়ে মেছতা, রোদে পোড়া দাগ দূর করতে ও কোলাজেন উৎপাদন বৃদ্ধি করে ত্বককে প্রাকৃতিক উজ্জ্বলতা ফিরিয়ে দেয়।",
    detailsEn: "Formulated without parabens, sulfates, synthetic fragrance, or drying alcohol. Non-comedogenic and ideal for daily morning and evening use.",
    detailsBn: "প্যারাবেন, সালফেট, কৃত্রিম সুগন্ধি বা ক্ষতিকর অ্যালকোহল মুক্ত। নন-কমেডোজেনিক এবং প্রতিদিন সকাল ও রাতে ব্যবহারের জন্য সম্পূর্ণ নিরাপদ।",
    howToUseEn: "Apply 2-3 drops to clean skin in the morning before moisturizer. Follow with broad-spectrum SPF 50 sunscreen.",
    howToUseBn: "প্রতিদিন সকালে মুখ পরিষ্কার করার পর ২-৩ ফোঁটা সিরাম পুরো মুখে লাগান। এরপর ময়েশ্চারাইজার ও সানস্ক্রিন ব্যবহার করুন।",
    ingredientsEn: "Water (Aqua), Squalane, Tetrahexyldecyl Ascorbate (Vitamin C), Niacinamide, Glycerin, Sodium Hyaluronate, Tocopherol (Vitamin E), Centella Asiatica Extract.",
  },

  // 2. Skincare - Ceramide Barrier Cream
  {
    id: 12,
    slug: "hydra-barrier-ceramide-cream",
    titleEn: "Hydra-Barrier Ceramide Cream 50ml",
    titleBn: "হাইড্রো-ব্যারিয়ার সিরামাইড ক্রিম ৫০ মি.লি.",
    brand: "CeraCare",
    categoryEn: "Skincare",
    categoryBn: "স্কিনকেয়ার",
    categorySlug: "skincare",
    priceUSD: 34.0,
    priceBDT: 4000,
    wasUSD: 34.0,
    wasBDT: 4000,
    rating: 4.8,
    reviewsCount: 94,
    badgeEn: "Popular",
    badgeBn: "জনপ্রিয়",
    isSale: false,
    inStock: true,
    stockQuantity: 60,
    sku: "ABF-SK-002",
    sizes: ["50ml", "100ml"],
    tags: [
      { en: "Barrier Repair", bn: "ব্যারিয়ার রিপেয়ার" },
      { en: "72h Hydration", bn: "৭২ ঘণ্টা আর্দ্রতা" },
      { en: "Sensitive Skin", bn: "সংবেদনশীল ত্বক" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1608248597359-009187ec09a9?q=80&w=800&auto=format&fit=crop",
        alt: "Hydra-Barrier Ceramide Cream Jar",
        labelEn: "Front View",
        labelBn: "সামনের দৃশ্য",
      },
      {
        src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
        alt: "Cream Texture",
        labelEn: "Texture",
        labelBn: "টেক্সচার",
      },
    ],
    shortDescEn: "Triple ceramide complex (NP, AP, EOP) with centella asiatica to repair the compromised skin moisture barrier.",
    shortDescBn: "ট্রিপল সিরামাইড কমপ্লেক্স ও সেন্টেলা সমৃদ্ধ ক্রিম যা ক্ষতিগ্রস্ত ত্বকের আর্দ্রতা ধরে রেখে ত্বককে মসৃণ করে।",
    descriptionEn: "Our Hydra-Barrier Ceramide Cream delivers 72-hour sustained hydration while sealing microscopic moisture leaks. Perfect for sensitive, dry, or over-exfoliated skin, this velvety rich formula calms visible redness and restores skin elasticity.",
    descriptionBn: "হাইড্রো-ব্যারিয়ার ক্রিম ত্বকের অতিরিক্ত শুষ্কতা ও লালচে ভাব দূর করে ৭২ ঘণ্টা পর্যন্ত গভীর আর্দ্রতা নিশ্চিত করে।",
    detailsEn: "Dermatologist-tested, hypoallergenic, fragrance-free, cruelty-free.",
    detailsBn: "ডার্মাটোলজিস্ট টেস্টেড, হাইপোঅ্যালার্জেনিক এবং সংবেদনশীল ত্বকে ব্যবহারের জন্য শতভাগ নিরাপদ।",
    howToUseEn: "Warm a dime-sized amount between fingers and press gently into cleansed face and neck morning and night.",
    howToUseBn: "পরিষ্কার মুখে পরিমাণমতো ক্রিম নিয়ে আলতোভাবে ম্যাসাজ করে লাগান। সকাল ও রাতে ব্যবহারযোগ্য।",
    ingredientsEn: "Water, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Ceramide EOP, Phytosphingosine, Cholesterol, Centella Asiatica Leaf Extract.",
  },

  // 3. Makeup - Velvet Matte Lip Stain
  {
    id: 13,
    slug: "velvet-matte-lip-stain-berry-flush",
    titleEn: "Velvet Matte Lip Stain #04 Berry Flush",
    titleBn: "ভেলভেট ম্যাট লিপ স্টেন #০৪ বেরি ফ্লাশ",
    brand: "LuxeShade",
    categoryEn: "Makeup",
    categoryBn: "মেকআপ",
    categorySlug: "makeup",
    priceUSD: 24.0,
    priceBDT: 2800,
    wasUSD: 28.0,
    wasBDT: 3300,
    rating: 4.9,
    reviewsCount: 210,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    inStock: true,
    stockQuantity: 35,
    sku: "ABF-MU-001",
    shades: [
      { nameEn: "Berry Flush", nameBn: "বেরি ফ্লাশ", color: "#8E2A49" },
      { nameEn: "Rose Nude", nameBn: "রোজ নুড", color: "#C47C85" },
      { nameEn: "Classic Crimson", nameBn: "ক্রিমসন রেড", color: "#9E1C2B" },
    ],
    tags: [
      { en: "Transfer-Proof", bn: "ট্রান্সফার-প্রুফ" },
      { en: "16h Wear", bn: "১৬ ঘণ্টা স্থায়িত্ব" },
      { en: "Weightless", bn: "হালকা অনুভূতি" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop",
        alt: "Velvet Matte Lip Stain Bottle",
        labelEn: "Product",
        labelBn: "পণ্য",
      },
      {
        src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
        alt: "Lip Swatch Demonstration",
        labelEn: "Swatch",
        labelBn: "সোয়াচ",
      },
    ],
    shortDescEn: "Non-drying, transfer-proof velvet lip tint infused with rosehip seed oil and vitamin E for all-day comfort.",
    shortDescBn: "রোজহিপ অয়েল ও ভিটামিন ই সমৃদ্ধ নন-ড্রাইং ম্যাট লিপস্টিক, যা দীর্ঘ ১৬ ঘণ্টা স্থায়ী থাকে।",
    descriptionEn: "A lightweight, feather-soft matte lip stain designed for high pigment payoff without settling into fine lines. Formulated with hydrating jojoba and rosehip seed oils to keep lips moisturized throughout Bangladesh's humid weather.",
    descriptionBn: "গাঢ় রঙের নিখুঁত ফিনিশিং দেয় এবং ঠোঁট শুকিয়ে যাওয়া বা ফেটে যাওয়া প্রতিরোধ করে।",
    detailsEn: "Smudge-resistant, waterproof, enriched with antioxidant botanical oils.",
    detailsBn: "পানি ও ঘাম প্রতিরোধী, স্মাজ-প্রুফ এবং প্রাকৃতিক তেলে সমৃদ্ধ।",
    howToUseEn: "Use the precision applicator wand to trace lip contours, then fill inward. Blot lightly with tissue for a diffused cloud-like effect.",
    howToUseBn: "অ্যাপ্লিকেটরের সাহায্যে ঠোঁটের কিনারা থেকে শুরু করে সুন্দরভাবে মেখে নিন।",
    ingredientsEn: "Dimethicone, Dimethicone Crosspolymer, Rosa Canina (Rosehip) Fruit Oil, Simmondsia Chinensis (Jojoba) Seed Oil, Tocopherol, CI 15850, CI 77491.",
  },

  // 4. Beauty Tools - Pro Sonic Cleanser
  {
    id: 14,
    slug: "pro-sonic-facial-cleansing-device",
    titleEn: "Pro-Sonic Facial Cleansing Device",
    titleBn: "প্রো-সনিক ফেসিয়াল ক্লিনজিং ডিভাইস",
    brand: "AuraStyle",
    categoryEn: "Beauty Tools",
    categoryBn: "বিউটি টুলস",
    categorySlug: "beauty-tools",
    priceUSD: 79.0,
    priceBDT: 9500,
    wasUSD: 95.0,
    wasBDT: 11500,
    rating: 5.0,
    reviewsCount: 62,
    badgeEn: "Premium",
    badgeBn: "প্রিমিয়াম",
    isSale: true,
    inStock: true,
    stockQuantity: 20,
    sku: "ABF-TL-001",
    tags: [
      { en: "12,000 VPM", bn: "১২,০০০ কম্পন/মিনিট" },
      { en: "IPX7 Waterproof", bn: "আইপিএক্স৭ ওয়াটারপ্রুফ" },
      { en: "Medical Silicone", bn: "মেডিকেল গ্রেড সিলিকন" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop",
        alt: "Pro-Sonic Facial Cleansing Device",
        labelEn: "Device",
        labelBn: "ডিভাইস",
      },
      {
        src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
        alt: "Cleansing Device in Use",
        labelEn: "Lifestyle",
        labelBn: "লাইফস্টাইল",
      },
    ],
    shortDescEn: "12,000 sonic pulsations per minute with ultra-hygienic silicone bristles and thermal massage mode.",
    shortDescBn: "আল্ট্রা-হাইজিনিক সিলিকন ব্রাশ ও থার্মাল ম্যাসাজ মোডসহ ১২,০০০ সনিক স্পন্দন প্রতি মিনিটে।",
    descriptionEn: "Elevate your daily cleansing ritual. The Pro-Sonic cleansing device removes 99.5% of dirt, oil, sunscreen, and makeup residue while promoting lymphatic drainage and enhancing skincare absorption.",
    descriptionBn: "ত্বকের ৯৯.৫% ময়লা ও মেকআপ দূর করে এবং রক্ত সঞ্চালন বৃদ্ধি করে ত্বককে প্রাকৃতিকভাবে টানটান রাখে।",
    detailsEn: "Rechargeable via magnetic USB, 300 uses per single charge, 100% waterproof design.",
    detailsBn: "ম্যাগনেটিক ইউএসবি রিচার্জেবল, একবার চার্জে ৩০০ বার ব্যবহারযোগ্য, সম্পূর্ণ ওয়াটারপ্রুফ।",
    howToUseEn: "Apply cleanser to wet face. Turn on device and move in circular motions for 60 seconds. Rinse face and device with warm water.",
    howToUseBn: "মুখে ক্লিনজার মেখে ভেজা ডিভাইসের সাহায্যে ৬০ সেকেন্ড ম্যাসাজ করুন এবং পানি দিয়ে ধুয়ে ফেলুন।",
    ingredientsEn: "Body-safe antibacterial silicone, ABS core, lithium-ion battery.",
  },

  // 5. Hair Care - Silk Hair Mask
  {
    id: 15,
    slug: "silk-amino-acid-repair-hair-mask",
    titleEn: "Silk Amino Acid Deep Repair Hair Mask 200ml",
    titleBn: "সিল্ক অ্যামিনো অ্যাসিড ডিপ রিপেয়ার হেয়ার মাস্ক ২০০ মি.লি.",
    brand: "SilkTress",
    categoryEn: "Hair Care",
    categoryBn: "হেয়ার কেয়ার",
    categorySlug: "hair-care",
    priceUSD: 32.0,
    priceBDT: 3800,
    wasUSD: 38.0,
    wasBDT: 4500,
    rating: 4.7,
    reviewsCount: 75,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    inStock: true,
    stockQuantity: 50,
    sku: "ABF-HC-001",
    tags: [
      { en: "Bond Repair", bn: "বন্ড রিপেয়ার" },
      { en: "Argan Oil", bn: "আর্গান অয়েল" },
      { en: "Frizz Control", bn: "ফ্রিজ কন্ট্রোল" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop",
        alt: "Silk Amino Acid Hair Mask Tub",
        labelEn: "Product",
        labelBn: "পণ্য",
      },
      {
        src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop",
        alt: "Silky Hair Transformation",
        labelEn: "Result",
        labelBn: "ফলাফল",
      },
    ],
    shortDescEn: "Intensive reconstructive treatment with 18 hydrolyzed silk amino acids and Moroccan argan oil.",
    shortDescBn: "১৮টি হাইড্রোলাইজড সিল্ক অ্যামিনো অ্যাসিড ও মরোক্কান আর্গান অয়েল সমৃদ্ধ গভীর পুষ্টিকর মাস্ক।",
    descriptionEn: "Transforms brittle, heat-damaged, or frizzy strands into lustrous silk. Rebuilds internal hair keratin bonds and seals cuticles against ambient humidity and pollution.",
    descriptionBn: "ক্ষতিগ্রস্ত ও রুক্ষ চুলকে ভেতর থেকে মেরামত করে সিল্কি ও মসৃণ করে এবং কিউটিকল রক্ষা করে।",
    detailsEn: "Sulfate-free, silicone-build-up free, safe for color-treated and keratin-treated hair.",
    detailsBn: "সালফেটমুক্ত, কালার করা বা রিবন্ডিং করা চুলের জন্য সম্পূর্ণ নিরাপদ।",
    howToUseEn: "After shampooing, apply generous amount from mid-lengths to ends. Leave on for 5-10 minutes, then rinse thoroughly.",
    howToUseBn: "শ্যাম্পু করার পর ভেজা চুলে মেখে ৫-১০ মিনিট অপেক্ষা করে ভালো করে ধুয়ে ফেলুন।",
    ingredientsEn: "Water, Cetearyl Alcohol, Argania Spinosa (Argan) Kernel Oil, Hydrolyzed Silk, Hydrolyzed Keratin, Panthenol, Butyrospermum Parkii (Shea) Butter.",
  },

  // 6. Fragrance - Jasmine & Cashmere
  {
    id: 16,
    slug: "eau-de-parfum-jasmine-cashmere",
    titleEn: "Eau de Parfum - Jasmine & Cashmere 50ml",
    titleBn: "ও দো পারফিউম - জেসমিন ও ক্যাশমিয়ার ৫০ মি.লি.",
    brand: "Maison ABF",
    categoryEn: "Fragrance",
    categoryBn: "সুগন্ধি",
    categorySlug: "fragrance",
    priceUSD: 65.0,
    priceBDT: 7800,
    wasUSD: 65.0,
    wasBDT: 7800,
    rating: 4.9,
    reviewsCount: 43,
    badgeEn: "Luxury",
    badgeBn: "আভিজাত্য",
    isSale: false,
    inStock: true,
    stockQuantity: 25,
    sku: "ABF-FR-001",
    tags: [
      { en: "Eau de Parfum", bn: "ও দো পারফিউম" },
      { en: "12h Longevity", bn: "১২ ঘণ্টা স্থায়িত্ব" },
      { en: "French Formula", bn: "ফ্রেঞ্চ ফর্মুলা" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop",
        alt: "Eau de Parfum Glass Bottle",
        labelEn: "Bottle",
        labelBn: "বোতল",
      },
      {
        src: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
        alt: "Artisanal Perfume Presentation",
        labelEn: "Ambiance",
        labelBn: "পরিবেশনা",
      },
    ],
    shortDescEn: "Artisanal perfume blending night-blooming Bengali jasmine, bergamot, creamy sandalwood, and warm amber cashmere.",
    shortDescBn: "বেলি ফুল, চন্দন কাঠ ও উষ্ণ অ্যাম্বারের মিষ্টি মিশ্রণে তৈরি প্রিমিয়াম সুবাস যা দিনভর থাকে।",
    descriptionEn: "An evocative, long-wearing fragrance celebrating the sensory poetry of South Asian florals blended with modern French perfumery elegance. Notes of night-blooming jasmine sambac, Calabrian bergamot, creamy Mysore sandalwood, and Cashmeran amber.",
    descriptionBn: "অভিজাত বেলি ও চন্দনের দীর্ঘস্থায়ী সুবাস যা ব্যক্তিত্বকে করে তোলে আকর্ষণীয় ও অনন্য।",
    detailsEn: "20% pure perfume oil concentration (Eau de Parfum), crafted in Grasse, France.",
    detailsBn: "২০% পারফিউম অয়েল ঘনত্বের আসল ও দো পারফিউম।",
    howToUseEn: "Spray onto pulse points: wrists, inner elbows, and base of the neck. Do not rub wrists together.",
    howToUseBn: "কবজি, ঘাড় ও নাড়ির স্থানে স্প্রে করুন। স্প্রে করার পর ঘষবেন না।",
    ingredientsEn: "Alcohol Denat., Fragrance (Parfum), Benzyl Salicylate, Linalool, Hydroxycitronellal, Limonene, Geraniol.",
  },

  // 7. Skincare - Rosewater Hydrating Toner
  {
    id: 17,
    slug: "botanical-rosewater-hydrating-toner",
    titleEn: "Botanical Rosewater Hydrating Toner 150ml",
    titleBn: "বোটানিক্যাল রোজওয়াটার হাইড্রেটিং টোনার ১৫০ মি.লি.",
    brand: "GlowRecipe",
    categoryEn: "Skincare",
    categoryBn: "স্কিনকেয়ার",
    categorySlug: "skincare",
    priceUSD: 22.0,
    priceBDT: 2600,
    wasUSD: 26.0,
    wasBDT: 3100,
    rating: 4.8,
    reviewsCount: 88,
    badgeEn: "New",
    badgeBn: "নতুন",
    isSale: true,
    inStock: true,
    stockQuantity: 40,
    sku: "ABF-SK-003",
    tags: [
      { en: "Alcohol-Free", bn: "অ্যালকোহলমুক্ত" },
      { en: "pH Balancing", bn: "পিএইচ ব্যালেন্সিং" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
        alt: "Rosewater Toner Bottle",
        labelEn: "Bottle",
        labelBn: "বোতল",
      },
    ],
    shortDescEn: "Distilled organic Damask rose petals with hyaluronic acid and witch hazel to balance pH and minimize pore visibility.",
    shortDescBn: "গোলাপের নির্যাস ও হায়ালুরোনিক অ্যাসিড সমৃদ্ধ টোনার, যা ত্বকের পিএইচ ব্যালেন্স ঠিক রাখে।",
    descriptionEn: "Infuse thirsty skin with delicate botanical dew. This clarifying toner sweeps away lingering impurities while flooding cells with moisture.",
    descriptionBn: "ত্বকের গভীর থেকে আর্দ্রতা ফিরিয়ে আনে ও রোদে পোড়া ভাব শান্ত করে।",
    detailsEn: "100% vegan, cruelty-free, alcohol-free.",
    detailsBn: "শতভাগ ভেগান ও অহিংস ফর্মুলা।",
    howToUseEn: "Sweep over face and neck using a cotton pad or pat gently directly with fingertips after cleansing.",
    howToUseBn: "মুখ পরিষ্কার করার পর তুলা বা আঙুলের ডগায় নিয়ে আলতোভাবে মেখে নিন।",
    ingredientsEn: "Rosa Damascena Flower Water, Glycerin, Sodium Hyaluronate, Hamamelis Virginiana (Witch Hazel) Extract.",
  },

  // 8. Beauty Tools - Ionic Hair Styler
  {
    id: 18,
    slug: "ionic-ceramic-thermal-hair-styler",
    titleEn: "Ionic Ceramic Thermal Hair Styler",
    titleBn: "আয়নিক সিরামিক থার্মাল হেয়ার স্টাইলার",
    brand: "AuraStyle",
    categoryEn: "Beauty Tools",
    categoryBn: "বিউটি টুলস",
    categorySlug: "beauty-tools",
    priceUSD: 85.0,
    priceBDT: 9900,
    wasUSD: 110.0,
    wasBDT: 13000,
    rating: 5.0,
    reviewsCount: 54,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    inStock: true,
    stockQuantity: 15,
    sku: "ABF-TL-002",
    tags: [
      { en: "Ionic Tech", bn: "আয়নিক প্রযুক্তি" },
      { en: "Fast Heat-Up", bn: "দ্রুত গরম হয়" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
        alt: "Ionic Ceramic Thermal Hair Styler",
        labelEn: "Styler",
        labelBn: "স্টাইলার",
      },
    ],
    shortDescEn: "Negative ion generator eliminates frizz while ceramic tourmaline plates deliver smooth salon blowouts at home.",
    shortDescBn: "নেগেটিভ আয়ন প্রযুক্তিসম্পন্ন সিরামিক হেয়ার স্টাইলার যা ঘরেই দেয় পার্লারের মতো রেশমি লুক।",
    descriptionEn: "Salon-grade styling with advanced heat regulation. Dries and styles simultaneously without scorching delicate hair strands.",
    descriptionBn: "চুলের কোনো ক্ষতি না করে দ্রুত শুকায় ও স্টাইল করে।",
    detailsEn: "Dual voltage (110-240V), 3 temperature settings, 360-degree swivel cord.",
    detailsBn: "৩টি তাপমাত্রা মোড, ৩৬০ ডিগ্রি কর্ড এবং নিরাপদ অটো-শাটঅফ।",
    howToUseEn: "Towel-dry hair to 80% dry, then glide through small sections from root to tip for sleek volume.",
    howToUseBn: "হালকা ভেজা চুলে গোড়া থেকে ডগা পর্যন্ত আলতোভাবে টেনে স্টাইল করুন।",
    ingredientsEn: "Tourmaline ceramic barrel, nylon ball-tipped bristles, PTC heating element.",
  },

  // 9. Skincare - Invisible Mineral Sunscreen SPF 50+
  {
    id: 19,
    slug: "invisible-shield-mineral-sunscreen-spf50",
    titleEn: "Invisible Shield Mineral Sunscreen SPF 50+ PA++++",
    titleBn: "ইনভিজিবল শিল্ড মিনারেল সানস্ক্রিন এসপিএফ ৫০+ পিএ++++",
    brand: "PureClean",
    categoryEn: "Skincare",
    categoryBn: "স্কিনকেয়ার",
    categorySlug: "skincare",
    priceUSD: 29.0,
    priceBDT: 3450,
    wasUSD: 35.0,
    wasBDT: 4100,
    rating: 4.9,
    reviewsCount: 162,
    badgeEn: "Must Have",
    badgeBn: "মাস্ট হ্যাভ",
    isSale: true,
    inStock: true,
    stockQuantity: 70,
    sku: "ABF-SK-004",
    sizes: ["50ml"],
    tags: [
      { en: "Zero White Cast", bn: "সাদা দাগহীন" },
      { en: "Non-Greasy", bn: "তেলহীন ফর্মুলা" },
      { en: "Reef-Safe", bn: "পরিবেশবান্ধব" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop",
        alt: "Invisible Mineral Sunscreen Tube",
        labelEn: "Product",
        labelBn: "পণ্য",
      },
      {
        src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
        alt: "Sunscreen Application on Skin",
        labelEn: "Application",
        labelBn: "ব্যবহার",
      },
    ],
    shortDescEn: "Ultra-sheer 100% non-nano zinc oxide sunscreen providing broad-spectrum UV and blue light defense without white cast.",
    shortDescBn: "১০০% নন-ন্যানো জিংক অক্সাইড সানস্ক্রিন যা কোনো সাদা দাগ ছাড়াই রোদ ও ক্ষতিকর ব্লু-লাইট থেকে রক্ষা করে।",
    descriptionEn: "Designed specifically for South Asian skin tones and tropical weather. Featherlight matte finish controls excess sebum while providing clinically tested PA++++ defense against photoaging and hyperpigmentation.",
    descriptionBn: "ঘাম ও গরমে ত্বক চটচটে না করে ম্যাট ফিনিশ দেয় এবং রোদে পোড়া ও মেছতা পড়া থেকে শতভাগ সুরক্ষিত রাখে।",
    detailsEn: "Water-resistant for 80 minutes, non-comedogenic, cruelty-free, reef-safe.",
    detailsBn: "৮০ মিনিট পর্যন্ত পানি প্রতিরোধী, রোমকূপ বন্ধ করে না এবং নিরাপদ উপাদানযুক্ত।",
    howToUseEn: "Apply generously as the final step of morning skincare 15 minutes before sun exposure. Reapply every 2 hours.",
    howToUseBn: "রোদে বের হওয়ার ১৫ মিনিট পূর্বে মুখে ও গলায় পর্যাপ্ত পরিমাণে লাগান। প্রতি ২ ঘণ্টা পর পর পুনরায় লাগান।",
    ingredientsEn: "Zinc Oxide 18%, Aqua, Caprylic/Capric Triglyceride, Niacinamide, Bisabolol, Tocopherol, Camellia Sinensis Leaf Extract.",
  },

  // 10. Makeup - Radiant Liquid Foundation
  {
    id: 20,
    slug: "flawless-filter-radiant-foundation",
    titleEn: "Flawless Filter Radiant Liquid Foundation 30ml",
    titleBn: "ফ্ললেস ফিল্টার রেডিয়েন্ট লিকুইড ফাউন্ডেশন ৩০ মি.লি.",
    brand: "LuxeShade",
    categoryEn: "Makeup",
    categoryBn: "মেকআপ",
    categorySlug: "makeup",
    priceUSD: 36.0,
    priceBDT: 4300,
    wasUSD: 42.0,
    wasBDT: 5000,
    rating: 4.8,
    reviewsCount: 140,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    inStock: true,
    stockQuantity: 30,
    sku: "ABF-MU-002",
    shades: [
      { nameEn: "Golden Honey (Warm)", nameBn: "গোল্ডেন হানি (ওয়ার্ম)", color: "#C68B59" },
      { nameEn: "Warm Almond (Neutral)", nameBn: "ওয়ার্ম অ্যালমন্ড (নিউট্রাল)", color: "#B87A4C" },
      { nameEn: "Rich Toffee (Deep)", nameBn: "রিচ টফি (ডিপ)", color: "#8E5431" },
    ],
    tags: [
      { en: "Buildable Coverage", bn: "বিল্ডেবল কভারেজ" },
      { en: "Hydrating", bn: "হাইড্রেটিং" },
      { en: "Skin-Like Finish", bn: "ন্যাচারাল ফিনিশ" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop",
        alt: "Radiant Liquid Foundation Glass Bottle",
        labelEn: "Front View",
        labelBn: "সামনের দৃশ্য",
      },
      {
        src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
        alt: "Foundation Swatches",
        labelEn: "Swatches",
        labelBn: "সোয়াচ",
      },
    ],
    shortDescEn: "Second-skin radiant foundation enriched with hyaluronic acid and niacinamide for a luminous 16-hour glow.",
    shortDescBn: "হায়ালুরোনিক অ্যাসিড ও নিয়াসিনামাইড সমৃদ্ধ লিকুইড ফাউন্ডেশন যা ত্বকে প্রাকৃতিক ও দীপ্তিময় ফিনিশিং দেয়।",
    descriptionEn: "A medium-to-full buildable coverage foundation that blurs imperfections and evens skin tone without looking cakey. Formulated with light-reflecting micropigments matched to South Asian undertones.",
    descriptionBn: "ত্বকের দাগ ও অসমতা ঢেকে দিয়ে ন্যাচারাল গ্লো এনে দেয়। দীর্ঘ ১৬ ঘণ্টা স্থায়ী ও ঘাম প্রতিরোধী।",
    detailsEn: "Sweat-resistant, dermatologist tested, non-acnegenic.",
    detailsBn: "ঘাম ও তেল প্রতিরোধী, ব্রণের ঝুঁকি বাড়ায় না এবং সংবেদনশীল ত্বকে ব্যবহারযোগ্য।",
    howToUseEn: "Pump 1-2 drops onto the back of hand. Blend outwards using a damp beauty sponge or dense foundation brush.",
    howToUseBn: "১-২ ফোঁটা হাতে নিয়ে স্পঞ্জ বা ব্রাশ দিয়ে পুরো মুখে নিখুঁতভাবে ব্লেন্ড করুন।",
    ingredientsEn: "Aqua, Cyclopentasiloxane, Dimethicone, Glycerin, Niacinamide, Sodium Hyaluronate, Iron Oxides (CI 77491, CI 77492, CI 77499).",
  },

  // 11. Hair Care - Rosemary Scalp Oil
  {
    id: 21,
    slug: "rosemary-biotin-scalp-revitalizing-oil",
    titleEn: "Rosemary & Biotin Scalp Revitalizing Oil 60ml",
    titleBn: "রোজমেরি ও বায়োটিন স্ক্যাল্প রিভাইটালাইজিং অয়েল ৬০ মি.লি.",
    brand: "SilkTress",
    categoryEn: "Hair Care",
    categoryBn: "হেয়ার কেয়ার",
    categorySlug: "hair-care",
    priceUSD: 25.0,
    priceBDT: 2950,
    wasUSD: 30.0,
    wasBDT: 3500,
    rating: 4.9,
    reviewsCount: 185,
    badgeEn: "Viral",
    badgeBn: "ভাইরাল",
    isSale: true,
    inStock: true,
    stockQuantity: 55,
    sku: "ABF-HC-002",
    tags: [
      { en: "Hair Growth", bn: "চুল গজায়" },
      { en: "100% Organic", bn: "শতভাগ অর্গানিক" },
      { en: "Anti-Dandruff", bn: "খুশকি দূর করে" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1608248597359-009187ec09a9?q=80&w=800&auto=format&fit=crop",
        alt: "Rosemary Hair Oil Dropper Bottle",
        labelEn: "Dropper",
        labelBn: "ড্রপার বোতল",
      },
      {
        src: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop",
        alt: "Scalp Massage with Oil",
        labelEn: "Massage",
        labelBn: "ম্যাসাজ",
      },
    ],
    shortDescEn: "Cold-pressed rosemary oil with biotin and castor seed oil to stimulate microcirculation, reduce hair fall, and strengthen roots.",
    shortDescBn: "কোল্ড-প্রেসড রোজমেরি অয়েল, বায়োটিন ও ক্যাস্টর অয়েল সমৃদ্ধ যা নতুন চুল গজাতে এবং চুল পড়া বন্ধ করতে অত্যন্ত কার্যকর।",
    descriptionEn: "A nutrient-rich intensive scalp formula formulated with 100% natural cold-pressed botanicals. Clinically proven to reinvigorate sluggish follicles, calm scalp dryness, and eliminate dandruff.",
    descriptionBn: "মাথার ত্বকে রক্ত সঞ্চালন বাড়ায়, খুশকি ও চুলকানি দূর করে এবং গোড়া থেকে চুল মজবুত করে।",
    detailsEn: "Free of mineral oils, parabens, synthetic fragrance, and silicones.",
    detailsBn: "ক্ষতিকর মিনারেল অয়েল, প্যারাবেন ও কৃত্রিম সুগন্ধিমুক্ত শতভাগ খাঁটি ফর্মুলা।",
    howToUseEn: "Part hair into sections and apply a few drops directly to scalp. Massage gently for 3-5 minutes. Leave on for 2 hours or overnight before washing.",
    howToUseBn: "চুল ভাগ করে সরাসরি স্ক্যাল্পে কয়েক ফোঁটা দিন। ৩-৫ মিনিট আলতোভাবে ম্যাসাজ করুন। গোসলের ২ ঘণ্টা পূর্বে বা রাতে মেখে ঘুমান।",
    ingredientsEn: "Rosmarinus Officinalis (Rosemary) Leaf Oil, Ricinus Communis (Castor) Seed Oil, Biotin, Simmondsia Chinensis (Jojoba) Oil, Mentha Piperita (Peppermint) Oil.",
  },

  // 12. Beauty Tools - Rose Quartz Gua Sha Set
  {
    id: 22,
    slug: "rose-quartz-facial-gua-sha-set",
    titleEn: "Natural Rose Quartz Gua Sha & Facial Roller Set",
    titleBn: "ন্যাচারাল রোজ কোয়ার্টজ গুয়া শা ও ফেসিয়াল রোলার সেট",
    brand: "AuraStyle",
    categoryEn: "Beauty Tools",
    categoryBn: "বিউটি টুলস",
    categorySlug: "beauty-tools",
    priceUSD: 35.0,
    priceBDT: 4100,
    wasUSD: 45.0,
    wasBDT: 5300,
    rating: 4.9,
    reviewsCount: 92,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    inStock: true,
    stockQuantity: 28,
    sku: "ABF-TL-003",
    tags: [
      { en: "100% Real Crystal", bn: "আসল ক্রিস্টাল" },
      { en: "De-Puffing", bn: "ফোলাভাব কমায়" },
      { en: "Facial Sculpting", bn: "মুখের শেপ ঠিক রাখে" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop",
        alt: "Rose Quartz Gua Sha and Roller Set in Gift Box",
        labelEn: "Gift Set",
        labelBn: "উপহার বক্স",
      },
    ],
    shortDescEn: "Handcrafted 100% authentic Brazilian rose quartz stone designed to relieve facial tension, reduce morning puffiness, and chisel cheekbones.",
    shortDescBn: "শতভাগ খাঁটি রোজ কোয়ার্টজ পাথর দিয়ে তৈরি যা মুখের ফোলা ভাব দূর করে এবং ত্বকের রক্ত সঞ্চালন বাড়িয়ে দেয়।",
    descriptionEn: "Harness ancient holistic beauty therapy. The dual-ended roller cools and depuffs eye bags, while the sculpted heart Gua Sha promotes lymphatic drainage, sculpts jawline, and maximizes skincare serum absorption.",
    descriptionBn: "চোখের নিচের কালো দাগ ও ফোলাভাব দূর করতে সাহায্য করে এবং চোয়ালের রেখা সুন্দর করে তোলে।",
    detailsEn: "Includes handcrafted roller, sculpted gua sha, velvet travel pouch, and facial contour guide.",
    detailsBn: "১টি ডাবল-এন্ডেড রোলার, ১টি গুয়া শা পাথর ও মখমলের পাউচসহ সম্পূর্ণ সেট।",
    howToUseEn: "Apply face oil or serum first. Glide the roller upward and outward across cheeks, neck, and forehead with gentle pressure.",
    howToUseBn: "মুখে সিরাম বা তেল মেখে নিয়ে নিচ থেকে উপরের দিকে আলতো চাপে ম্যাসাজ করুন।",
    ingredientsEn: "100% Natural Grade-A Brazilian Rose Quartz crystal with zinc alloy reinforced frame.",
  },

  // 13. Fragrance - Velvet Oud & Amber
  {
    id: 23,
    slug: "velvet-oud-golden-amber-extrait",
    titleEn: "Velvet Oud & Golden Amber Extrait de Parfum 50ml",
    titleBn: "ভেলভেট উদ ও গোল্ডেন অ্যাম্বার এক্সট্রেইট ডি পারফিউম ৫০ মি.লি.",
    brand: "Maison ABF",
    categoryEn: "Fragrance",
    categoryBn: "সুগন্ধি",
    categorySlug: "fragrance",
    priceUSD: 78.0,
    priceBDT: 9200,
    wasUSD: 90.0,
    wasBDT: 10600,
    rating: 5.0,
    reviewsCount: 38,
    badgeEn: "Extrait",
    badgeBn: "এক্সট্রেইট",
    isSale: true,
    inStock: true,
    stockQuantity: 18,
    sku: "ABF-FR-002",
    tags: [
      { en: "30% Concentration", bn: "৩০% ঘনত্ব" },
      { en: "24h Projection", bn: "২৪ ঘণ্টা সুবাস" },
      { en: "Unisex", bn: "ইউনিসেক্স" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop",
        alt: "Velvet Oud Luxury Glass Flacon",
        labelEn: "Flacon",
        labelBn: "বোতল",
      },
    ],
    shortDescEn: "Smoky royal Cambodian agarwood, Madagascar vanilla bourbon, and warm balsamic amber for an unforgettable evening presence.",
    shortDescBn: "কম্বোডিয়ান আগর কাঠ, ভ্যানিলা ও অ্যাম্বারের রাজকীয় মিশ্রণ যা দীর্ঘ ২৪ ঘণ্টা মনোরম সুবাস ছড়ায়।",
    descriptionEn: "A decadent, opulent fragrance engineered with a master concentration of 30% pure perfume oils. A smoky accord of vintage agarwood enveloped in sweet spun caramel, golden amber, and soft musk.",
    descriptionBn: "রাজকীয় ও আভিজাত্যপূর্ণ সুবাস যা যেকোনো পার্টি বা বিশেষ অনুষ্ঠানে ব্যক্তিত্বকে করে তোলে আকর্ষণীয়।",
    detailsEn: "Extrait de Parfum concentration, hand-poured in small batches, vegan, IFRA compliant.",
    detailsBn: "সর্বোচ্চ ঘনত্বের এক্সট্রেইট ডি পারফিউম, শতভাগ অ্যালকোহল নিরাপদ।",
    howToUseEn: "Apply 1-2 spritzes directly to clothing collars or pulse points for all-day trail.",
    howToUseBn: "পোশাকের কলার বা নাড়ির স্থানে ১-২ বার স্প্রে করুন।",
    ingredientsEn: "Fragrance (Parfum), Alcohol Denat., Benzyl Benzoate, Eugenol, Isoeugenol, Farnesol.",
  },

  // 14. Bath & Body - Whipped Shea Souffle
  {
    id: 24,
    slug: "whipped-shea-vanilla-bean-body-souffle",
    titleEn: "Whipped Shea & Vanilla Bean Body Soufflé 250ml",
    titleBn: "হুইপড শিয়া ও ভ্যানিলা বিন বডি সুফ্লে ২৫০ মি.লি.",
    brand: "GlowRecipe",
    categoryEn: "Bath & Body",
    categoryBn: "বাথ ও বডি",
    categorySlug: "bath-body",
    priceUSD: 26.0,
    priceBDT: 3100,
    wasUSD: 30.0,
    wasBDT: 3600,
    rating: 4.8,
    reviewsCount: 112,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    inStock: true,
    stockQuantity: 45,
    sku: "ABF-BB-001",
    tags: [
      { en: "48h Moisture", bn: "৪৮ ঘণ্টা ময়েশ্চার" },
      { en: "Non-Sticky", bn: "নন-স্টিকি" },
      { en: "Gourmand", bn: "মিষ্টি সুবাস" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1607006314144-846399066f1d?q=80&w=800&auto=format&fit=crop",
        alt: "Whipped Shea Body Butter Glass Jar",
        labelEn: "Jar",
        labelBn: "জার",
      },
      {
        src: "https://images.unsplash.com/photo-1608248597359-009187ec09a9?q=80&w=800&auto=format&fit=crop",
        alt: "Whipped Cream Texture",
        labelEn: "Texture",
        labelBn: "টেক্সচার",
      },
    ],
    shortDescEn: "Air-whipped African shea butter and sweet Madagascar vanilla bean that instantly melts into skin for 48 hours of velvety comfort.",
    shortDescBn: "আফ্রিকান শিয়া বাটার ও ভ্যানিলা সমৃদ্ধ হালকা বডি ক্রিম যা ত্বকে মিশে গিয়ে ৪৮ ঘণ্টা কোমল রাখে।",
    descriptionEn: "Indulge in decadent cloud-like moisture. This rich yet fast-absorbing body soufflé calms scaly dry patches, improves skin firmness, and leaves a comforting vanilla gourmand scent.",
    descriptionBn: "ত্বকের শুষ্কতা দূর করে সারাদিন নরম ও মসৃণ রাখে এবং মিষ্টি সুবাস ছড়িয়ে দেয়।",
    detailsEn: "100% vegan, cruelty-free, no artificial dyes.",
    detailsBn: "শতভাগ প্রাকৃতিক উপাদান সমৃদ্ধ এবং প্যারাবেনমুক্ত।",
    howToUseEn: "Massage generously over warm, damp skin immediately after showering to lock in moisture.",
    howToUseBn: "গোসলের পরপরই ভেজা ত্বকে পর্যাপ্ত পরিমাণে ম্যাসাজ করে মেখে নিন।",
    ingredientsEn: "Butyrospermum Parkii (Shea) Butter, Coconut Alkanes, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Vanilla Planifolia Fruit Extract, Vitamin E.",
  },

  // 15. Bath & Body - Almond Cleansing Shower Oil
  {
    id: 25,
    slug: "nourishing-almond-honey-cleansing-shower-oil",
    titleEn: "Nourishing Almond & Honey Cleansing Shower Oil 300ml",
    titleBn: "নারিশিং অ্যালমন্ড ও হানি ক্লিনজিং শাওয়ার অয়েল ৩০০ মি.লি.",
    brand: "PureClean",
    categoryEn: "Bath & Body",
    categoryBn: "বাথ ও বডি",
    categorySlug: "bath-body",
    priceUSD: 28.0,
    priceBDT: 3350,
    wasUSD: 28.0,
    wasBDT: 3350,
    rating: 4.9,
    reviewsCount: 78,
    badgeEn: "Editor's Pick",
    badgeBn: "এডিটরের পছন্দ",
    isSale: false,
    inStock: true,
    stockQuantity: 36,
    sku: "ABF-BB-002",
    tags: [
      { en: "Oil-to-Milk", bn: "অয়েল-টু-মিল্ক" },
      { en: "Sulfate-Free", bn: "সালফেটমুক্ত" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop",
        alt: "Almond Shower Oil Pump Bottle",
        labelEn: "Bottle",
        labelBn: "বোতল",
      },
    ],
    shortDescEn: "Silky shower oil that transforms into an opulent cleansing milk on contact with water, respecting the skin's moisture barrier.",
    shortDescBn: "পানিতে স্পর্শ পেলেই ক্রিমি দুধে রূপান্তরিত হওয়া প্রিমিয়াম শাওয়ার অয়েল যা ত্বককে শুষ্ক না করে পরিষ্কার করে।",
    descriptionEn: "Say goodbye to tight, stripped skin after showering. Enriched with Mediterranean sweet almond oil, wild blossom honey, and lipid replenishing agents.",
    descriptionBn: "গোসলের পর ত্বক মসৃণ ও মোলায়েম রাখে এবং কোনো ধরনের শুষ্কতা তৈরি করে না।",
    detailsEn: "Sulfate-free, soap-free, biodegradable formula.",
    detailsBn: "সাবান ও ক্ষারমুক্ত নিরাপদ প্রাকৃতিক বডি ওয়াশ।",
    howToUseEn: "Lather with water in hands or on a sponge, massage all over the body, and rinse thoroughly.",
    howToUseBn: "হাতে বা স্পঞ্জে পানি দিয়ে ফেনা তৈরি করে সারা শরীরে মেখে ধুয়ে ফেলুন।",
    ingredientsEn: "Vitis Vinifera (Grape) Seed Oil, Laureth-4, MIPA-Laureth Sulfate, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Mel (Honey), Parfum.",
  },

  // 16. Makeup - Luminous Setting Powder
  {
    id: 26,
    slug: "luminous-silk-micro-fine-setting-powder",
    titleEn: "Luminous Silk Micro-Fine Setting Powder 12g",
    titleBn: "লুমিনাস সিল্ক মাইক্রো-ফাইন সেটিং পাউডার ১২ গ্রাম",
    brand: "LuxeShade",
    categoryEn: "Makeup",
    categoryBn: "মেকআপ",
    categorySlug: "makeup",
    priceUSD: 30.0,
    priceBDT: 3600,
    wasUSD: 36.0,
    wasBDT: 4300,
    rating: 4.8,
    reviewsCount: 89,
    badgeEn: "Sale",
    badgeBn: "অফার",
    isSale: true,
    inStock: true,
    stockQuantity: 42,
    sku: "ABF-MU-003",
    tags: [
      { en: "Flashback-Safe", bn: "ফ্ল্যাশব্যাক-মুক্ত" },
      { en: "Pore-Blurring", bn: "পোর-ব্লারিং" },
      { en: "Talc-Free", bn: "ট্যালকমুক্ত" },
    ],
    images: [
      {
        src: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop",
        alt: "Micro-Fine Setting Powder Compact",
        labelEn: "Compact",
        labelBn: "কমপ্যাক্ট",
      },
    ],
    shortDescEn: "Talc-free, ultra-milled translucent loose powder that sets makeup for 14 hours with a soft-focus velvet sheen and zero flashback.",
    shortDescBn: "ট্যালকমুক্ত মিহি সেটিং পাউডার যা মেকআপকে দীর্ঘ ১৪ ঘণ্টা গলতে না দিয়ে অয়েলি ভাব নিয়ন্ত্রণ করে।",
    descriptionEn: "Formulated with silica microspheres and bamboo silk powder, this featherweight loose setting powder locks foundation in place, blurs pores, and photographs flawlessly under bright flashes.",
    descriptionBn: "ক্যামেরার ফ্ল্যাশে সাদা দেখায় না এবং ত্বকের অতিরিক্ত তেল শোষণ করে রাখে।",
    detailsEn: "Talc-free, non-drying, translucent on all skin tones.",
    detailsBn: "সব ধরণের স্কিন টোনের সাথে মানানসই এবং ত্বক শুষ্ক করে না।",
    howToUseEn: "Press a velour puff into the powder, tap off excess, and gently press into T-zone and under-eye area.",
    howToUseBn: "পাফের সাহায্যে পাউডার নিয়ে টি-জোন ও চোখের নিচে হালকাভাবে সেট করে নিন।",
    ingredientsEn: "Silica, Zea Mays (Corn) Starch, Mica, Squalane, Bambusa Arundinacea Stem Powder, Lauroyl Lysine.",
  },
];

// Helper Functions
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductById(id: number | string): Product | undefined {
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;
  return PRODUCTS.find((p) => p.id === numericId || p.slug === String(id));
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return PRODUCTS.filter((p) => p.categorySlug === categorySlug);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return PRODUCTS.slice(0, limit);
}

export function getSaleProducts(): Product[] {
  return PRODUCTS.filter((p) => p.isSale);
}

export function getRelatedProducts(currentId: number | string, categorySlug?: string, limit = 4): Product[] {
  const numericId = typeof currentId === "string" ? parseInt(currentId, 10) : currentId;
  const filtered = PRODUCTS.filter((p) => {
    if (p.id === numericId) return false;
    if (categorySlug) return p.categorySlug === categorySlug;
    return true;
  });
  return filtered.slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  return PRODUCTS.filter(
    (p) =>
      p.titleEn.toLowerCase().includes(q) ||
      p.titleBn.includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.categoryEn.toLowerCase().includes(q) ||
      p.categoryBn.includes(q) ||
      p.tags.some((t) => t.en.toLowerCase().includes(q) || t.bn.includes(q))
  );
}
