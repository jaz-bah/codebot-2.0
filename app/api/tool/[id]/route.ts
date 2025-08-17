import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Tool from "@/models/tool.model";
import { IParams } from "@/types/global.type";

export async function PUT(request: NextRequest, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    await connectToDatabase();

    const { name, note, url } = await request.json();

    const tool = await Tool.findById(id);

    if (!tool) {
      return NextResponse.json({ message: "Tool not found" }, { status: 404 });
    }

    if (tool.userId.toString() !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    tool.name = name;
    tool.note = note;
    tool.url = url;

    await tool.save();

    return NextResponse.json({ tool }, { status: 200 });

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

  console.log(request);

  try {
    await connectToDatabase();
    const tool = await Tool.findById(id);

    if (!tool) {
      return NextResponse.json({ message: "Tool not found" }, { status: 404 });
    }

    if (tool.userId.toString() !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await tool.deleteOne({ _id: id });

    return NextResponse.json({ tool }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
