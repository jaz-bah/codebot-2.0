import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Storage from "@/models/storage.model";
import { IParams } from "@/types/global.type";

export async function PUT(request: NextRequest, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;

    const body = await request.json();
    const { language, code } = body;

    const storage = await Storage.findById(id);

    if (!storage) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }
    if (storage.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    storage.language = language;
    storage.code = code;

    await storage.save();

    return NextResponse.json({ storage }, { status: 200 });
  } catch (error) {
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
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();

    const userId: string = session.user.id as string;

    const storage = await Storage.findById(id);

    if (!storage) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    if (storage.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await storage.deleteOne({ _id: id });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
