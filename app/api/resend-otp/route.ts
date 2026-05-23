import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";
import { sendOtpEmail } from "@/lib/mailer";

const OTP_EXPIRY_MS = 5 * 60 * 1000;

async function ensureMinimumLatency(startedAt: number, minimumMs = 400) {
  const elapsed = Date.now() - startedAt;
  if (elapsed >= minimumMs) return;
  await new Promise((resolve) => setTimeout(resolve, minimumMs - elapsed));
}

export async function POST(req: Request) {
  const startedAt = Date.now();

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      await ensureMinimumLatency(startedAt);
      return NextResponse.json(
        { success: true, message: "If your request is valid, you will receive verification instructions shortly." },
        { status: 202 },
      );
    }

    if (user.emailVerified) {
      await ensureMinimumLatency(startedAt);
      return NextResponse.json(
        { error: "Email is already verified." },
        { status: 400 },
      );
    }

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
      await ensureMinimumLatency(startedAt);
      return NextResponse.json(
        { error: "Could not send verification email. Please try again." },
        { status: 500 },
      );
    }

    await ensureMinimumLatency(startedAt);
    return NextResponse.json(
      { success: true, message: "A new verification code has been sent to your email." },
      { status: 200 },
    );
  } catch (err) {
    console.error("Resend OTP error:", err);
    await ensureMinimumLatency(startedAt);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 },
    );
  }
}
