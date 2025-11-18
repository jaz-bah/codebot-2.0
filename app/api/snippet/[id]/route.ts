import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { IParams } from "@/types/global.type";
import Snippet from "@/models/snippet.model";

export async function PUT(request: NextRequest, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const { language, code } = await request.json();
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    if (snippet.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    snippet.language = language;
    snippet.code = code;
    await snippet.save();
    return NextResponse.json({ snippet }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  console.log(request);
  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    if (snippet.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await snippet.deleteOne();
    return NextResponse.json({ message: "Snippet deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
