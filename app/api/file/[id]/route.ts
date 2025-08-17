import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import File from "@/models/file.model";
import { IParams } from "@/types/global.type";

export async function PUT(req: Request, { params }: IParams) {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try{
        await connectToDatabase();
        const userId: string = session.user.id as string;
        const { name, note, url } = await req.json();


        const file = await File.findById(id);
        if (!file) {
            return NextResponse.json({ message: "File not found" }, { status: 404 });
        }
        if (file.userId.toString() !== userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        file.name = name;
        file.note = note;
        file.url = url;
        await file.save();
        return NextResponse.json({ file }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || "Internal Server Error" },

            { status: 500 }
        );
    }
}

export async function DELETE(req: Request, { params }: IParams) {
    const { id } = await params;

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    console.log(req);
    try{
        await connectToDatabase();
        const userId: string = session.user.id as string;

        const file = await File.findById(id);
        if (!file) {
            return NextResponse.json({ message: "File not found" }, { status: 404 });
        }
        if (file.userId.toString() !== userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        await file.deleteOne();
        return NextResponse.json({ message: "File deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || "Internal Server Error" },
            { status: 500 }
        );
    }
}






