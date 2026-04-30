import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "No user found for that email" },
        { status: 404 },
      );
    }

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

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your account",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    if (error) {
      console.error("EMAIL SEND FAILED:", error);
      return NextResponse.json(
        { error: "Failed to send email", details: error },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      otpId: created.id,
    });
  } catch (err) {
    console.error("Resend OTP error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: message || "Failed to resend OTP" },
      { status: 500 },
    );
  }
}
