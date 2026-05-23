import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { sendOtpEmail } from "@/lib/mailer";

const OTP_EXPIRY_MS = 5 * 60 * 1000;

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

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await prisma.otp.deleteMany({ where: { email } });

    await prisma.otp.create({
      data: {
        email,
        otp: hashedOtp,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MS),
      },
    });

    try {
      await sendOtpEmail(email, otp);
    } catch (emailErr) {
      console.error("Failed to send verification email:", emailErr);
      return NextResponse.json(
        { error: "Account created but we could not send the verification email. Please try resending the code." },
        { status: 201 },
      );
    }

    return NextResponse.json(
      { success: true, message: "Account created. Check your email for the verification code." },
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
