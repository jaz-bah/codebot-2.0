import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Preset from "@/models/preset.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(request);

  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;

    const presets = await Preset.find({ userId });

    return NextResponse.json({ presets }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
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

    const { name, language, code } = await request.json();

    const preset = await Preset.create({
      name,
      language,
      code,
      userId,
    });

    return NextResponse.json({ preset }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
