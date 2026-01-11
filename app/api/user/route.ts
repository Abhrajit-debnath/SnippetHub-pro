import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getDb } from "@/app/config/db.config";
import { ObjectId } from "mongodb";
import getJwtSecret from "@/app/helpers/getJwt";
export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decodedToken = jwt.verify(token, getJwtSecret()) as {
      email: string;
      userId: string;
    };

    const db = await getDb();
    const user = await db
      .collection("users")
      .findOne(
        { _id: new ObjectId(decodedToken.userId) },
        { projection: { password: 0 } }
      );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        isSubscribed: user.isSubscribed,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}
