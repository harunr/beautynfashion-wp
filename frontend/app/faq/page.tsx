import type { Metadata } from "next";
import { fetchWordPressPage } from "@/lib/wordpress/pages";
import FaqClient from "./FaqClient";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | ABeauty & Fashion",
  description:
    "Find answers to questions about 100% genuine cosmetics, ordering, delivery timelines, COD, and returns in Bangladesh.",
};

export default async function FaqPage() {
  const wpPage = await fetchWordPressPage("faq");
  return <FaqClient wpPage={wpPage} />;
}
