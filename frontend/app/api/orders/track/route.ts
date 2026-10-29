import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("order_id") || "";
    const phone = searchParams.get("phone") || "";

    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID is required." },
        { status: 400 }
      );
    }

    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://admin.abeautynfashion.com";
    const targetUrl = new URL(`${wpUrl}/wp-json/abf/v1/orders/track`);
    targetUrl.searchParams.set("order_id", orderId);
    if (phone) {
      targetUrl.searchParams.set("phone", phone);
    }

    const response = await fetch(targetUrl.toString(), {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Order not found." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Order track API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while tracking your order." },
      { status: 500 }
    );
  }
}
