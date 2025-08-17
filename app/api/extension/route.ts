import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Extension from "@/models/extension.model";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(request);

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const extensions = await Extension.find({ userId });
    return NextResponse.json({ extensions }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// post extension action
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const { name, note, url } = await request.json();
    const extension = await Extension.create({
      userId,
      name,
      note,
      url,
    });
    return NextResponse.json({ extension }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
