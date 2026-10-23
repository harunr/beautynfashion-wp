import type { Metadata } from "next";
import { fetchWordPressPage } from "@/lib/wordpress/pages";
import ShippingReturnsClient from "./ShippingReturnsClient";

export const metadata: Metadata = {
  title: "Shipping & Returns Policy | ABeauty & Fashion",
  description:
    "Information on delivery timelines, shipping charges across Bangladesh, and our 7-day hassle-free return policy.",
};

export default async function ShippingReturnsPage() {
  const wpPage = await fetchWordPressPage("shipping-returns");
  return <ShippingReturnsClient wpPage={wpPage} />;
}
