import type { Metadata } from "next";
import { fetchWordPressPage } from "@/lib/wordpress/pages";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Our Story & Philosophy",
  description:
    "Learn about ABeauty & Fashion's commitment to 100% authentic, luxury skincare and cosmetics in Bangladesh.",
};

export default async function AboutPage() {
  const wpPage = await fetchWordPressPage("about");
  return <AboutClient wpPage={wpPage} />;
}
