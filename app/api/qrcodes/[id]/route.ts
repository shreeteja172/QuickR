import { NextResponse } from "next/server";
import prisma from "@/lib/db";

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

  const {link} = await req.json();

  if (!link) {
    return NextResponse.json({ error: "Data is required" }, { status: 400 });
  }

  try {
    const updated = await prisma.qRCode.update({
      where: { id },
      data: { data: link },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
