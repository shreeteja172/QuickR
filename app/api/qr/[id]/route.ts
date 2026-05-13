import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { currentSession } from "@/lib/current-session";

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

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const session = await currentSession();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const qr = await prisma.qRCode.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!qr) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(qr);
}

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const session = await currentSession();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { link } = await req.json();
  const destinationUrl = normalizeDestinationUrl(link ?? "");

  if (!destinationUrl) {
    return NextResponse.json(
      { error: "Valid URL is required" },
      { status: 400 },
    );
  }

  const existingQr = await prisma.qRCode.findFirst({
    where: {
      id,
      userId: user.id,
    },
    select: { id: true },
  });

  if (!existingQr) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const updated = await prisma.qRCode.update({
      where: { id },
      data: { data: destinationUrl },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update QR code" },
      { status: 500 },
    );
  }
}
