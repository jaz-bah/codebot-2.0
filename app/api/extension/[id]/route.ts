import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Extension from "@/models/extension.model";
import { IParams } from "@/types/global.type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const { name, note, url } = await request.json();

    const extension = await Extension.findById(id);
    if (!extension) {
      return NextResponse.json(
        { message: "Extension not found" },
        { status: 404 }
      );
    }

    if (extension.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    extension.name = name;
    extension.note = note;
    extension.url = url;
    await extension.save();

    return NextResponse.json({ extension }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log(request);

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const extension = await Extension.findById(id);
    if (!extension) {
      return NextResponse.json(
        { message: "Extension not found" },
        { status: 404 }
      );
    }

    if (extension.userId.toString() !== userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await extension.deleteOne({ _id: id });
    return NextResponse.json({ extension }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
