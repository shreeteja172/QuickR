import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashedPassword, name: name || null },
    });

    return NextResponse.json(
      { success: true, message: "Account created successfully." },
      { status: 200 },
    );
  } catch (err) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 },
    );
  }
}
