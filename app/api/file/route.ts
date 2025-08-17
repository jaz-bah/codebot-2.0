import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import File from "@/models/file.model";


export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    console.log(req);


    try {
        await connectToDatabase();
        const userId: string = session.user.id as string;
        const files = await File.find({ userId });
        return NextResponse.json({ files }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || "Internal Server Error" },
            { status: 500 }
        );
    }

}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectToDatabase();
        const userId: string = session.user.id as string;
        const { name, note, url } = await req.json();
        const file = await File.create({
            userId,
            name,
            note,
            url,
        });
        return NextResponse.json({ file }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: (error as Error).message || "Internal Server Error" },
            { status: 500 }
        );
    }

}


