import { getDb } from "@/app/config/db.config";
import { signupValidator } from "@/app/validators/user/signup-validator";
import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate via zod validator

    const validatedData = signupValidator.parse(body);

    const { username, email, password } = validatedData;

    // Get db

    const db = await getDb();
    const users = db.collection("users");

    // Check existing user

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
        status: 409,
      });
    }

    // Hash Password

    const hashedPassword = await argon2.hash(password);

    // Save user into db

    const result = await users.insertOne({
      username,
      email,
      password: hashedPassword,
      isSubcribed: false,
      createdAt: new Date(),
    });

    // Create jwt

    const token = jwt.sign(
      {
        userId: result.insertedId.toString(),
        email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "2d" }
    );

    const response = NextResponse.json({
      message: "Signup successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 2,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
