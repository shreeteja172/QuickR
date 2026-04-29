import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = await prisma.otp.findFirst({
    where: { email, otp },
  });

  if (!record) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }

  if (new Date() > record.expiresAt) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }

  await prisma.user.update({
    where: { email },
    data: { emailVerified: true },
  });

  await prisma.otp.deleteMany({ where: { email } });

  return NextResponse.json({ success: true });
}
