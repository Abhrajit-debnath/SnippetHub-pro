import { NextResponse } from "next/server";
import Razorpay from "razorpay";

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay env vars not configured");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

export async function POST() {
  try {
    const razorpay = getRazorpay();

    const order = await razorpay.orders.create({
      amount: 10000,
      currency: "INR",
      receipt: "pro_plan_order",
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Razorpay order error:", error);

    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
