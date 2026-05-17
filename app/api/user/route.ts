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

export async function PATCH(req: Request) {
  try {
    const sessionData = await currentSession();
    if (!sessionData || !sessionData.user || !sessionData.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = sessionData.user.id;
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    return NextResponse.json({
      success: true,
      user: { id: updated.id, name: updated.name, email: updated.email },
    });
  } catch (error) {
    console.error("Failed to update user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}
