import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Email address not found. Please sign up first." },
        { status: 401 },
      );
    }

    if (!user.password) {
      return NextResponse.json(
        {
          error:
            "This account was created with a social login. Please sign in with the same provider.",
        },
        { status: 401 },
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        },
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("Login error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "Login failed: " + message },
      { status: 500 },
    );
  }
}
