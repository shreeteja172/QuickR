import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import prisma from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

function genericRegisterAccepted() {
  return NextResponse.json(
    {
      success: true,
      message:
        "If your request is valid, you will receive verification instructions shortly.",
    },
    { status: 200 },
  );
}

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
      return genericRegisterAccepted();
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashed, name: name || null },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.otp.create({
      data: {
        email,
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing: cannot send verification email");
      return NextResponse.json(
        { error: "Server misconfigured: email service not configured" },
        { status: 500 },
      );
    }

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your account",
      // ...getVerificationEmail(otp),
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    if (error) {
      console.error("EMAIL SEND FAILED:", error);
      return NextResponse.json(
        {
          error: "Failed to send verification email",
          details: error,
        },
        { status: 500 },
      );
    }

    return genericRegisterAccepted();
  } catch (err) {
    console.error("Registration error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: message || "Registration failed" },
      { status: 500 },
    );
  }
}
