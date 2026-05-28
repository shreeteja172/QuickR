import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/db";
import { currentSession } from "@/lib/current-session";
import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> },
) {
  const session = await currentSession();
  const email = session?.user?.email;
  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resolvedParams = await context.params;
  const qrId = resolvedParams.id;
  const qr = await prisma.qRCode.findUnique({ where: { id: qrId } });
  if (!qr) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || user.id !== qr.userId) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const { origin } = new URL(request.url);
    const configuredAppUrl = process.env.NEXT_PUBLIC_APP_URL?.trim();
    const baseUrl = configuredAppUrl
      ? configuredAppUrl.replace(/\/+$/, "")
      : origin;

    const qrUrl = `${baseUrl}/api/r/${qr.id}`;

    const modules = QRCode.create(qrUrl).modules.size;
    const target = 3840;
    const scale = Math.max(1, Math.floor(target / modules));

    const dataUrl = await QRCode.toDataURL(qrUrl, {
      scale,
      margin: 1,
      color: { dark: "#000000", light: "#FFFFFF" },
    });

    const base64 = dataUrl.split(",")[1];
    const buffer = Buffer.from(base64, "base64");

    return new Response(buffer, {
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": `attachment; filename="qr-${qr.id}-4k.png"`,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 },
    );
  }
}
