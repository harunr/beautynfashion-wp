/**
 * SEO & Structured Data (JSON-LD) Architecture for ABeauty & Fashion
 * Master switch: IS_SITE_INDEXABLE controls whether search engine bots index the site.
 */

export const IS_SITE_INDEXABLE = false; // Set to TRUE once all real products are uploaded for launch!

export const SITE_CONFIG = {
  name: "ABeauty & Fashion",
  legalName: "ABeauty & Fashion Ltd.",
  url: "https://abeautynfashion.com",
  description:
    "Curated multi-brand luxury beauty, dermatologically vetted skincare, makeup, and hair care in Bangladesh. 100% authentic products with nationwide delivery.",
  logo: "https://abeautynfashion.com/logo.png",
  ogImage: "https://abeautynfashion.com/og-image.jpg",
  supportPhone: "+880 1711 000000",
  supportEmail: "support@abeautynfashion.com",
  sameAs: [
    "https://facebook.com/abeautynfashion",
    "https://instagram.com/abeautynfashion",
    "https://youtube.com/@abeautynfashion",
  ],
};

/**
 * Global Robots configuration honoring the master indexing flag
 */
export function getRobotsConfig() {
  if (!IS_SITE_INDEXABLE) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "none" as const,
        "max-snippet": -1,
      },
    };
  }

  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  };
}

/**
 * Organization Schema (JSON-LD)
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    legalName: SITE_CONFIG.legalName,
    url: SITE_CONFIG.url,
    logo: SITE_CONFIG.logo,
    image: SITE_CONFIG.logo,
    sameAs: SITE_CONFIG.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.supportPhone,
        contactType: "customer service",
        areaServed: "BD",
        availableLanguage: ["English", "Bengali"],
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "House 42, Road 11, Block D, Banani",
      addressLocality: "Dhaka",
      postalCode: "1213",
      addressCountry: "BD",
    },
  };
}

/**
 * WebSite & Sitelinks Searchbox Schema (JSON-LD)
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * BreadcrumbList Schema (JSON-LD)
 */
export function getBreadcrumbSchema(items: { name: string; url?: string; item?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const link = item.url || item.item || "/";
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: link.startsWith("http") ? link : `${SITE_CONFIG.url}${link}`,
      };
    }),
  };
}

/**
 * Product Schema (JSON-LD)
 */
export function getProductSchema(product: {
  id: string | number;
  name: string;
  description: string;
  image?: string;
  images?: string[];
  price: number;
  regularPrice?: number;
  currency?: string;
  sku: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
}) {
  const currency = product.currency || "USD";
  const imageList =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [SITE_CONFIG.ogImage];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: imageList,
    description: product.description,
    sku: product.sku || `ABF-${product.id}`,
    brand: {
      "@type": "Brand",
      name: SITE_CONFIG.name,
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      url: `${SITE_CONFIG.url}/product/${product.id}`,
      priceCurrency: currency,
      price: product.price.toFixed(2),
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.inStock !== false
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      priceValidUntil: "2027-12-31",
      seller: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
      },
    },
    ...(product.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating.toString(),
            reviewCount: (product.reviewCount || 10).toString(),
            bestRating: "5",
            worstRating: "1",
          },
        }
      : {}),
  };
}
