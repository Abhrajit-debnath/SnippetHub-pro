import { getDb } from "@/app/config/db.config";
import getJwtSecret from "@/app/helpers/getJwt";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ query: string }> }
) {
  try {

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
    const { query } = await params

    const db = await getDb();
    const snippets = db.collection("snippets");

    const result = await snippets
      .find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { language: { $regex: query, $options: 'i' } },
          { tags: { $regex: query, $options: 'i' } },
          { code: { $regex: query, $options: 'i' } }
        ]
      }).toArray()

    console.log("DB Result:", result);

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