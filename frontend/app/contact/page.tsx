import type { Metadata } from "next";
import { fetchWordPressPage } from "@/lib/wordpress/pages";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact & Concierge Support | ABeauty & Fashion",
  description:
    "Get in touch with the ABeauty & Fashion beauty concierge for orders, consultations, and support.",
};

export default async function ContactPage() {
  const wpPage = await fetchWordPressPage("contact");
  return <ContactClient wpPage={wpPage} />;
}
