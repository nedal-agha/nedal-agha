import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { siteDefaults } from "@/data/site-defaults";
import { ensureAdminRequest } from "@/lib/guards";
import { settingsValidator } from "@/validators/settings-validator";

export async function GET(request: import("next/server").NextRequest) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    return NextResponse.json({ settings: settings || siteDefaults });
  } catch {
    return NextResponse.json({ settings: siteDefaults });
  }
}

export async function PUT(request: import("next/server").NextRequest) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = settingsValidator.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid settings payload", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const saved = await prisma.siteSettings.upsert({
      where: { id: 1 },
      update: {
        ...parsed.data,
        phone: parsed.data.phone || null,
        whatsapp: parsed.data.whatsapp || null,
        linkedinUrl: parsed.data.linkedinUrl || null,
        instagramUrl: parsed.data.instagramUrl || null,
        facebookUrl: parsed.data.facebookUrl || null,
      },
      create: {
        id: 1,
        ...parsed.data,
        phone: parsed.data.phone || null,
        whatsapp: parsed.data.whatsapp || null,
        linkedinUrl: parsed.data.linkedinUrl || null,
        instagramUrl: parsed.data.instagramUrl || null,
        facebookUrl: parsed.data.facebookUrl || null,
      },
    });

    return NextResponse.json({ settings: saved });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
