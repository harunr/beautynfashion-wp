import type { Metadata } from "next";
import { fetchWordPressPage } from "@/lib/wordpress/pages";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | ABeauty & Fashion",
  description:
    "Review the terms and conditions for orders, 100% authenticity, delivery, and services at ABeauty & Fashion.",
};

export default async function TermsPage() {
  const wpPage = await fetchWordPressPage("terms");
  return <TermsClient wpPage={wpPage} />;
}
