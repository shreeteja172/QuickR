import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

const DUMMY_PASSWORD_HASH =
  "$2b$10$w3tM6QpZ6m0z4w1VY9bA2uC0Q8fHjXvN/5r8v8W4wS3p1sI6E8nZK";

function invalidCredentialsResponse() {
  return NextResponse.json(
    { error: "Invalid email or password" },
    { status: 401 },
  );
}

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

    const passwordHash = user?.password ?? DUMMY_PASSWORD_HASH;
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (!user || !user.password || !isPasswordValid) {
      return invalidCredentialsResponse();
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
    return NextResponse.json({ error: "Unable to sign in" }, { status: 500 });
  }
}
