import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "@/lib/generated/prisma/client";

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

  const qr = await prisma.qRCode.findUnique({
    where: {
      id: id,
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

  const { link } = await req.json();
  const destinationUrl = normalizeDestinationUrl(link ?? "");

  if (!destinationUrl) {
    return NextResponse.json(
      { error: "Valid URL is required" },
      { status: 400 },
    );
  }

  try {
    const updated = await prisma.qRCode.update({
      where: { id },
      data: { data: destinationUrl },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Failed to update QR code" },
      { status: 500 },
    );
  }
}
