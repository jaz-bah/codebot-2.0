import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Component from "@/models/component.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.log(req);
    try {
        await connectToDatabase();

        const userId = session.user.id as string;
        const components = await Component.find({ userId });
        return NextResponse.json({ components }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error || "Internal server error" }, { status: 500 });

    }
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        await connectToDatabase();
        const userId: string = session.user.id as string;
        const { name, preview, url } = await req.json();
        const component = await Component.create({
            userId,
            name,
            preview,
            url,
        });
        return NextResponse.json({ component }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error || "Internal server error" }, { status: 500 });
    }
}



