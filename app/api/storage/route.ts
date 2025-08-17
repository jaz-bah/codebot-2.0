import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Storage from "@/models/storage.model";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(request);

  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;

    const storages = await Storage.find({ userId });

    return NextResponse.json({ storages }, { status: 200 });
  } catch (error) {
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

    const body = await request.json();
    const { language, code } = body;

    const storage = await Storage.create({
      userId,
      language,
      code,
    });

    return NextResponse.json({ storage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
