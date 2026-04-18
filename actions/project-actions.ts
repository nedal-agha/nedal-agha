"use server";

import { prisma } from "@/lib/prisma";
import { generateUniqueSlug } from "@/lib/slug";
import { projectValidator } from "@/validators/project-validator";

export async function createProjectAction(rawData: unknown) {
  const parsed = projectValidator.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten() };
  }

  const slug = await generateUniqueSlug(parsed.data.slug || parsed.data.title, async (value) => {
    const existing = await prisma.project.findUnique({ where: { slug: value }, select: { id: true } });
    return Boolean(existing);
  });

  const project = await prisma.project.create({
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
  });

  return { success: true, project };
}
