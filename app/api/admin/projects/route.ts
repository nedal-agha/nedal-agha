import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureAdminRequest } from "@/lib/guards";
import { generateUniqueSlug } from "@/lib/slug";
import { projectValidator } from "@/validators/project-validator";

export async function GET(request: import("next/server").NextRequest) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      include: { images: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(request: import("next/server").NextRequest) {
  const session = await ensureAdminRequest(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = projectValidator.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid project payload", details: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const slug = await generateUniqueSlug(parsed.data.slug || parsed.data.title, async (value) => {
      const found = await prisma.project.findUnique({ where: { slug: value }, select: { id: true } });
      return Boolean(found);
    });

    const created = await prisma.project.create({
      data: {
        ...parsed.data,
        slug,
        coverImageUrl: parsed.data.coverImageUrl || "",
        liveUrl: parsed.data.liveUrl || null,
        images: {
          create: parsed.data.images.map((image) => ({
            imageUrl: image.imageUrl,
            altText: image.altText || null,
            sortOrder: image.sortOrder,
          })),
        },
      },
      include: { images: true },
    });

    return NextResponse.json({ project: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
