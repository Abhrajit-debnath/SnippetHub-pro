import { getDb } from "@/app/config/db.config";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { snippetValidator } from "@/app/validators/snippets/snippet-validator";
import { promises } from "dns";
import getJwtSecret from "@/app/helpers/getJwt";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    // Get snippet id from params

    const { id } = await params;
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid snippet ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const validatedData = snippetValidator.parse(body);

    const { title, code, tags, language } = validatedData;

    // Get db

    const db = await getDb();
    const snippets = db.collection("snippets");

    // Find snippet and update

    const result = await snippets.findOneAndUpdate(
      {
        _id: new ObjectId(id),
        userId: new ObjectId(decodedToken.userId),
      },
      {
        $set: {
          title,
          code,
          tags,
          language,
          updatedAt: new Date(),
        },
      },
      {
        returnDocument: "after",
      }
    );
    console.log(result);
    
    if (!result) {
      return NextResponse.json(
        { message: "Snippet not found or unauthorized" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        data: result,
        message: "Snippets updated successfully",
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
