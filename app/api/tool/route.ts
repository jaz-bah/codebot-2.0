import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Tool from "@/models/tool.model";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(request);


  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;

    const tools = await Tool.find({ userId });
    return NextResponse.json({ tools }, { status: 200 });
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
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;
    const { name, note, url } = await request.json();

    const tool = await Tool.create({ userId, name, note, url });
    return NextResponse.json({ tool }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
