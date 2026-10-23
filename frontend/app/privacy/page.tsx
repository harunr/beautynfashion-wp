import type { Metadata } from "next";
import { fetchWordPressPage } from "@/lib/wordpress/pages";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy & Data Protection Policy | ABeauty & Fashion",
  description:
    "Learn how ABeauty & Fashion protects your personal data, transaction security, and privacy in Bangladesh.",
};

export default async function PrivacyPage() {
  const wpPage = await fetchWordPressPage("privacy");
  return <PrivacyClient wpPage={wpPage} />;
}
