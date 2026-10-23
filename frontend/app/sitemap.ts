import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/product/11",
    "/product/12",
    "/product/13",
    "/product/14",
    "/product/15",
    "/product/16",
  ];

  return routes.map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/product") ? 0.8 : 0.6,
  }));
}
