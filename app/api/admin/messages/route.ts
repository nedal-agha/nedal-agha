import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureAdminRequest } from "@/lib/guards";

export async function GET(request: import("next/server").NextRequest) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
