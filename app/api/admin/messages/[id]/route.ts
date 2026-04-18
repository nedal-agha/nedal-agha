import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureAdminRequest } from "@/lib/guards";

type RouteParams = {
  params: Promise<{ id: string }>;
};

function parseId(id: string) {
  const value = Number(id);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }

  return value;
}

export async function PATCH(request: import("next/server").NextRequest, { params }: RouteParams) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const messageId = parseId(id);
  if (!messageId) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }

  try {
    const updated = await prisma.contactMessage.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    return NextResponse.json({ message: updated });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function DELETE(request: import("next/server").NextRequest, { params }: RouteParams) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const messageId = parseId(id);
  if (!messageId) {
    return NextResponse.json({ error: "Invalid message id" }, { status: 400 });
  }

  try {
    await prisma.contactMessage.delete({ where: { id: messageId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
