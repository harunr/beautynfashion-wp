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
  title: "ABeauty & Fashion — Premium Beauty, Skincare & Fashion",
  description:
    "Curated multi-brand skincare, makeup, hair care, and beauty tools. 100% genuine products with fast delivery across Bangladesh and worldwide.",
  metadataBase: new URL("https://www.abeautynfashion.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "bn-BD": "/?lang=bn",
    },
  },
  openGraph: {
    title: "ABeauty & Fashion — Premium Beauty & Fashion",
    description:
      "Curated multi-brand skincare, makeup, hair care, and beauty tools.",
    url: "https://www.abeautynfashion.com",
    siteName: "ABeauty & Fashion",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${dmSans.variable} ${instrumentSerif.variable} ${anekBangla.variable} ${hindSiliguri.variable} antialiased`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
