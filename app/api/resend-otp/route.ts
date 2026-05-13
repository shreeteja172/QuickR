import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

function acceptedResponse() {
  return NextResponse.json(
    {
      success: true,
      message:
        "If your request is valid, you will receive verification instructions shortly.",
    },
    { status: 202 },
  );
}

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
      return acceptedResponse();
    }

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
      await ensureMinimumLatency(startedAt);
      return acceptedResponse();
    }

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your account",
      html: `<h1>Your OTP is ${otp}</h1>`,
    });

    if (error) {
      console.error("EMAIL SEND FAILED:", error);
      await ensureMinimumLatency(startedAt);
      return acceptedResponse();
    }

    await ensureMinimumLatency(startedAt);
    return acceptedResponse();
  } catch (err) {
    console.error("Resend OTP error:", err);
    await ensureMinimumLatency(startedAt);
    return acceptedResponse();
  }
}
