import type { Metadata } from "next";
import { fetchWordPressPage } from "@/lib/wordpress/pages";
import AuthenticityClient from "./AuthenticityClient";

export const metadata: Metadata = {
  title: "100% Authenticity Guarantee | ABeauty & Fashion",
  description:
    "Our uncompromising promise of 100% genuine, directly-imported skincare and cosmetics with verified batch codes and 200% cash-back guarantee.",
};

export default async function AuthenticityPage() {
  const wpPage = await fetchWordPressPage("authenticity");
  return <AuthenticityClient wpPage={wpPage} />;
}
