import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import prisma from "@/lib/db";
import { getVerificationEmail } from "@/lib/email-verification";

const resend = new Resend(process.env.RESEND_API_KEY);

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
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashed, name: name || null },
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const created = await prisma.otp.create({
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

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your account",
      ...getVerificationEmail(otp),
    });

    return NextResponse.json({ success: true, otpId: created.id });
  } catch (err) {
    console.error("Registration error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: message || "Registration failed" },
      { status: 500 },
    );
  }
}
