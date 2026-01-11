import { getDb } from "@/app/config/db.config";
import { snippetValidator } from "@/app/validators/snippets/snippet-validator";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import getJwtSecret from "@/app/helpers/getJwt";
export async function POST(req: NextRequest) {
  try {
    
    // Read token

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // verify token

    const decodedToken = Jwt.verify(token, getJwtSecret()) as {
      userId: string;
    };

    // Parse & validate body

    const body = await req.json();

    const validatedData = snippetValidator.parse(body);

    const { title, code, tags, language } = validatedData;

    // Get db

    const db = await getDb();
    const snippets = db.collection("snippets");

    // Insert snippet to db

    const result = await snippets.insertOne({
      title,
      code,
      tags,
      language,
      userId: new ObjectId(decodedToken.userId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Response

    return NextResponse.json(
      {
        message: "Snippet created successfully",
        snippetId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create snippet" },
      { status: 500 }
    );
  }
}
