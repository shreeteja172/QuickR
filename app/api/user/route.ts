import { NextResponse } from "next/server";
import { currentSession } from "@/lib/current-session";
import prisma from "@/lib/db";

export async function DELETE() {
  try {
    const sessionData = await currentSession();
    if (!sessionData || !sessionData.user || !sessionData.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = sessionData.user.id;
    await prisma.qRCode.deleteMany({
      where: { userId },
    });

    await prisma.link.deleteMany({
      where: { userId },
    });
    await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 },
    );
  }
}
