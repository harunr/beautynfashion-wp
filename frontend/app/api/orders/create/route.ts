import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const body = await request.json();
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "https://admin.abeautynfashion.com";

    const response = await fetch(`${wpUrl}/wp-json/abf/v1/checkout/place-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Failed to create order." },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("Order create API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while placing your order." },
      { status: 500 }
    );
  }
}
