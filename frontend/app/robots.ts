import { MetadataRoute } from "next";
import { IS_SITE_INDEXABLE, SITE_CONFIG } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!IS_SITE_INDEXABLE) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/account", "/api/"],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
