import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Snippet from "@/models/snippet.model";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(request);

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const snippets = await Snippet.find({ userId });
    return NextResponse.json({ snippets }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const { language, code } = await request.json();
    const snippet = await Snippet.create({
      userId,
      language,
      code,
    });
    return NextResponse.json({ snippet }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
