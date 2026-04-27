import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { currentSession } from "@/lib/current-session";
import QRCode from "qrcode";

function normalizeDestinationUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch (error) {
    if (!(error instanceof TypeError)) {
      return null;
    }
  }

  try {
    const parsedWithHttps = new URL(`https://${trimmed}`);
    if (
      parsedWithHttps.protocol === "http:" ||
      parsedWithHttps.protocol === "https:"
    ) {
      return parsedWithHttps.href;
    }
  } catch (error) {
    if (!(error instanceof TypeError)) {
      return null;
    }
    return null;
  }

  return null;
}

export async function GET() {
  const session = await currentSession();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const allqr = await prisma.qRCode.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(allqr);
}

export async function POST(req: Request) {
  const session = await currentSession();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data } = await req.json();
  const destinationUrl = normalizeDestinationUrl(data ?? "");

  if (!destinationUrl) {
    return NextResponse.json(
      { error: "Valid URL is required" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const qr = await prisma.qRCode.create({
    data: {
      data: destinationUrl,
      image: "",
      userId: user.id,
    },
  });

  const { origin } = new URL(req.url);
  const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
  const baseUrl = configuredAppUrl
    ? configuredAppUrl.replace(/\/+$/, "")
    : origin;
  const qrUrl = `${baseUrl}/api/r/${qr.id}`;
  const qrImage = await QRCode.toDataURL(qrUrl);

  const updatedQr = await prisma.qRCode.update({
    where: { id: qr.id },
    data: { image: qrImage },
  });

  return NextResponse.json(updatedQr);
}
