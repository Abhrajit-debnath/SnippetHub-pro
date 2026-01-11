import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { getDb } from "@/app/config/db.config";
import { ObjectId } from "mongodb";

import getJwtSecret from "@/app/helpers/getJwt";


export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token
    let decodedToken: { userId: string };
    try {
      decodedToken = Jwt.verify(token, getJwtSecret()) as { userId: string };
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Get request body
    const body = await req.json();
    const email = body.email;
    if (!email) {
      return NextResponse.json({ message: "Username is required" }, { status: 400 });
    }

    // Update user in DB
    const db = await getDb();
    const result = await db.collection("users").findOneAndUpdate(
      { _id: new ObjectId(decodedToken.userId) },
      { $set: { email } },
      { returnDocument: "after" }
    );

    console.log(result);
    

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Username updated", user: result.email });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
