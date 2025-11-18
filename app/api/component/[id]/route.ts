import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Component from "@/models/component.model";
import { IParams } from "@/types/global.type";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const { name, preview, files } = await req.json();

    const component = await Component.findById(id);
    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    if (component.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    component.name = name;
    component.preview = preview;
    component.files = files;
    await component.save();

    return NextResponse.json({ message: "Component updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(req);

  try {
    await connectToDatabase();
    const userId: string = session.user.id as string;
    const component = await Component.findById(id);
    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }
    if (component.userId.toString() !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await component.deleteOne();
    return NextResponse.json({ message: "Component deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request, { params }: IParams) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(req);
  try {
    await connectToDatabase();
    const component = await Component.findById(id);
    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ component }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error || "Internal Server Error" },
      { status: 500 }
    );
  }
}
