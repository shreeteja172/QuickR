import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 },
      );
    }

    const records = await prisma.otp.findMany({
      where: { email },
      orderBy: { expiresAt: "desc" },
    });

    if (records.length === 0) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    const latestRecord = records[0];

    if (new Date() > latestRecord.expiresAt) {
      await prisma.otp.deleteMany({ where: { email } });
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    const isValid = await bcrypt.compare(otp, latestRecord.otp);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
    });

    await prisma.otp.deleteMany({ where: { email } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return NextResponse.json(
      { error: "Unable to process request" },
      { status: 500 },
    );
  }
}
