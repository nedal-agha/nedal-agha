import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureAdminRequest } from "@/lib/guards";
import { generateUniqueSlug } from "@/lib/slug";
import { projectValidator } from "@/validators/project-validator";

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

export async function GET(request: import("next/server").NextRequest, { params }: RouteParams) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const projectId = parseId(id);
  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({ where: { id: projectId }, include: { images: true } });
    if (!project) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PATCH(request: import("next/server").NextRequest, { params }: RouteParams) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const projectId = parseId(id);
  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = projectValidator.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid project payload", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const existing = await prisma.project.findUnique({ where: { id: projectId } });
    if (!existing) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const slug = await generateUniqueSlug(parsed.data.slug || parsed.data.title, async (value) => {
      const found = await prisma.project.findUnique({ where: { slug: value }, select: { id: true } });
      return Boolean(found && found.id !== projectId);
    });

    const updated = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: parsed.data.title,
        slug,
        shortDescription: parsed.data.shortDescription,
        fullDescription: parsed.data.fullDescription,
        category: parsed.data.category,
        clientName: parsed.data.clientName || null,
        coverImageUrl: parsed.data.coverImageUrl || "",
        liveUrl: parsed.data.liveUrl || null,
        isFeatured: parsed.data.isFeatured,
        isPublished: parsed.data.isPublished,
        sortOrder: parsed.data.sortOrder,
        images: {
          deleteMany: {},
          create: parsed.data.images.map((image) => ({
            imageUrl: image.imageUrl,
            altText: image.altText || null,
            sortOrder: image.sortOrder,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json({ project: updated });
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
  const projectId = parseId(id);
  if (!projectId) {
    return NextResponse.json({ error: "Invalid project id" }, { status: 400 });
  }

  try {
    await prisma.project.delete({ where: { id: projectId } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
