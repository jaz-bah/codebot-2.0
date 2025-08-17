import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Preset from "@/models/preset.model";
import { IParams } from "@/types/global.type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;

    const { name, language, code } = await request.json();

    const preset = await Preset.findById(id);

    if (!preset) {
      return NextResponse.json(
        { message: "Preset not found" },
        { status: 404 }
      );
    }

    if (preset.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    preset.name = name;
    preset.language = language;
    preset.code = code;

    await preset.save();

    return NextResponse.json({ preset }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized to delete preset" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;

    const preset = await Preset.findById(id);

    if (!preset) {
      return NextResponse.json(
        { message: "Preset not found" },
        { status: 404 }
      );
    }

    if (preset.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await preset.deleteOne();

    return NextResponse.json({ message: "Preset deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
