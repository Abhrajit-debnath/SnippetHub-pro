import { getDb } from "@/app/config/db.config";
import { loginValidator } from "@/app/validators/user/login-validator";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {

  try {
    
    const body = await req.json();

    //  Validate input

    const { email, password } = loginValidator.parse(body);

    //  Get DB

    const db = await getDb();

    //  Find user

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid Email" }, { status: 401 });
    }

    //  Verify password

    const isValid = await argon2.verify(user.password, password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    //  Create JWT

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "2d" }
    );

    //  Send token via httpOnly cookie

    const response = NextResponse.json({
      message: "Sign in successful",
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
