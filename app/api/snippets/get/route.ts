import { getDb } from "@/app/config/db.config";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import getJwtSecret from "@/app/helpers/getJwt";

export async function GET(req: NextRequest) {
  try {
    // Read token
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify token

    let decodedToken: { userId: string };

    try {
      decodedToken = Jwt.verify(token, getJwtSecret()) as {
        userId: string;
      };
    } catch {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Get db

    const db = await getDb();
    const snippets = db.collection("snippets");

    // Fetch snippets

    const result = await snippets
      .find({ userId: new ObjectId(decodedToken.userId) })
      .toArray();

    return NextResponse.json(
      {
        data: result,
        message: "Snippets fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
