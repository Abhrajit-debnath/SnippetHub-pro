import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { getDb } from "@/app/config/db.config";
import { ObjectId } from "mongodb";
import { resetPasswordValidators } from "@/app/validators/user/resetPassword-validators";
import argon2 from "argon2";

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    let decodedToken: { userId: string };
    try {
      decodedToken = Jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
      };
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const validatedData = resetPasswordValidators.parse(body);

    const { password } = validatedData;
    if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    const hashedPassword = await argon2.hash(password);

    // Update user in DB
    const db = await getDb();
    const result = await db
      .collection("users")
      .findOneAndUpdate(
        { _id: new ObjectId(decodedToken.userId) },
        { $set: { password: hashedPassword } },
        { returnDocument: "after" }
      );

    console.log(result);

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Password updated",
      user: result.email,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
