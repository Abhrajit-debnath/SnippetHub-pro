import { getDb } from "@/app/config/db.config";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";


export async function DELETE(
req:NextRequest,
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
      decodedToken = Jwt.verify(token, process.env.JWT_SECRET!) as {
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



    // Get db

    const db = await getDb();
    const snippets = db.collection("snippets");

    // Find snippet and update

    const result = await snippets.findOneAndDelete(
      {
        _id: new ObjectId(id),
        userId: new ObjectId(decodedToken.userId),
      },
   
    );
    console.log(result);
    
    if (!result) {
      return NextResponse.json(
        { message: "Snippet not deleted or unauthorized" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        data: result,
        message: "Snippets deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete snippet" },
      { status: 500 }
    );
  }
}
