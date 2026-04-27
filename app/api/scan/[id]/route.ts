import { NextResponse } from "next/server";
import prisma from "@/lib/db";

function normalizeDestinationUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch {
    
  }

  try {
    const parsedWithHttps = new URL(`https://${trimmed}`);
    if (
      parsedWithHttps.protocol === "http:" ||
      parsedWithHttps.protocol === "https:"
    ) {
      return parsedWithHttps.href;
    }
  } catch {
    return null;
  }

  return null;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const qr = await prisma.qRCode.findUnique({
    where: { id },
  });

  if (!qr) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const destinationUrl = normalizeDestinationUrl(qr.data);
  if (!destinationUrl) {
    return NextResponse.json(
      { error: "Invalid destination URL" },
      { status: 400 },
    );
  }

  return NextResponse.redirect(destinationUrl);
}
