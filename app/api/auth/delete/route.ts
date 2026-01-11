import { getDb } from "@/app/config/db.config";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };

    const db = await getDb();

    const result = await db.collection("users").findOneAndDelete({
      _id: new ObjectId(decoded.userId),
    });

    if (!result) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await db.collection("snippets").deleteMany({
      userId: decoded.userId,
    });

    await db.collection("payments").deleteMany({
      userId: decoded.userId,
    });

    const res = NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );

    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return res;
  } catch (error) {
    console.error("Delete account error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
