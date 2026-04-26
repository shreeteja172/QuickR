import prisma from "@/lib/db";
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await auth.api.getSession({
        headers: req.headers,
    });
    const email = session?.user?.email;
    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
        where:{
            email: email
        },
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const allqr = await prisma.qRCode.findMany();

    return Response.json(allqr);
}

export async function POST(req:Request){
    const session = await auth.api.getSession({
        headers: req.headers,
    });
    const email = session?.user?.email;
    if (!email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const {data,image} = await req.json();

    const user = await prisma.user.findUnique({
        where:{
            email: email
        },
    });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const qr = await prisma.qRCode.create({
        data: {
            data,image,userId: user.id,
        }
    })
    return NextResponse.json(qr);
}