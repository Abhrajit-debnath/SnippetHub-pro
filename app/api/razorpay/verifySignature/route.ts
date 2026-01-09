import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getDb } from "@/app/config/db.config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid signature" },
        { status: 400 }
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const db = await getDb();

    const user = await db.collection("users").findOne({
      _id: new ObjectId(decoded.userId),
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.collection("payments").insertOne({
      userId: user._id,
      email: user.email,
      username: user.username,

      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,

      plan: "PRO",
      amount: 100,
      currency: "INR",
      status: "SUCCESS",

      createdAt: new Date(),
    });

 
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          isSubscribed: true,
          plan: "PRO",
          subscribedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, message: "Verification failed" },
      { status: 500 }
    );
  }
}
