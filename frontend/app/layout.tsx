import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  DM_Sans,
  Instrument_Serif,
  Anek_Bangla,
  Hind_Siliguri,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { AuthProvider } from "@/lib/auth/context";
import { CartProvider } from "@/lib/cart/context";
import CartDrawer from "@/components/cart/CartDrawer";
import SupportChat from "@/components/chat/SupportChat";
import {
  getRobotsConfig,
  getOrganizationSchema,
  getWebSiteSchema,
  SITE_CONFIG,
} from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { fetchStoreSettings } from "@/lib/wordpress/settings";
import { StoreSettingsProvider } from "@/lib/wordpress/context";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  weight: ["500", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  variable: "--font-anek-bangla",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  variable: "--font-hind-siliguri",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ABeauty & Fashion — Premium Beauty, Skincare & Fashion",
    template: "%s | ABeauty & Fashion",
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
  robots: getRobotsConfig(),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "bn-BD": "/?lang=bn",
    },
  },
  openGraph: {
    title: "ABeauty & Fashion — Premium Beauty & Fashion",
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ABeauty & Fashion — Premium Beauty & Fashion",
    description: SITE_CONFIG.description,
    images: [SITE_CONFIG.ogImage],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeSettings = await fetchStoreSettings();
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <JsonLd data={orgSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body
        className={`${bricolage.variable} ${dmSans.variable} ${instrumentSerif.variable} ${anekBangla.variable} ${hindSiliguri.variable} antialiased`}
      >
        <StoreSettingsProvider initialSettings={storeSettings}>
          <AuthProvider>
            <LanguageProvider>
              <CartProvider>
                {children}
                <CartDrawer />
                <SupportChat />
              </CartProvider>
            </LanguageProvider>
          </AuthProvider>
        </StoreSettingsProvider>
      </body>
    </html>
  );
}
