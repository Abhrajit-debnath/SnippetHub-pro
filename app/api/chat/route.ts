import getJwtSecret from "@/app/helpers/getJwt";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { Ollama } from "ollama";

const ollama = new Ollama({
  host: "http://localhost:11434",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body);

    const message: string = body.message;
    const snippet = body.snippet;

    if (!message || !snippet) {
      return NextResponse.json(
        { error: "message and snippet are required" },
        { status: 400 },
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: { userId: string };
    try {
      decoded = jwt.verify(token, getJwtSecret()) as { userId: string };
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const response = await ollama.chat({
      model: "llama3.1:8b",
      messages: [
        {
          role: "system",
          content: `
You are "Snippet AI".

Here is the code snippet you must analyze:

${snippet.code}


Your ONLY job is to analyze and explain code snippets
and answer questions strictly related to the given code.

Rules:
- Do not answer unrelated questions like outside the snippet context if they ask about any questions is not relavant say "I am here to help with your query about this particular snippet and I can't able to answer that".
- Be concise and accurate.
- But if a user greet you or else straight ask "Hi i am your snippet ai how can i help you today ?"
`,
        },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({
      success: true,
      userId: decoded.userId,
      reply: response.message.content,
    });
  } catch (error) {
    console.error("CHAT API ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
