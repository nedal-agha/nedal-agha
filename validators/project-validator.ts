import { z } from "zod";

export const projectImageValidator = z.object({
  imageUrl: z.url(),
  altText: z.string().trim().max(160).optional().nullable(),
  sortOrder: z.number().int().min(0).default(0),
});

export const projectValidator = z
  .object({
    title: z.string().trim().min(3).max(120),
    slug: z.string().trim().min(3).max(140).optional(),
    shortDescription: z.string().trim().min(10).max(300),
    fullDescription: z.string().trim().min(20),
    category: z.string().trim().min(2).max(60),
    clientName: z.string().trim().max(100).optional().nullable(),
    coverImageUrl: z.url().optional().or(z.literal("")),
    liveUrl: z.url().optional().or(z.literal("")),
    isFeatured: z.boolean().default(false),
    isPublished: z.boolean().default(false),
    sortOrder: z.number().int().min(0).default(0),
    images: z.array(projectImageValidator).default([]),
  })
  .superRefine((value, ctx) => {
    const wantsPublish = value.isPublished;
    const hasCover = Boolean(value.coverImageUrl && value.coverImageUrl.length > 0);

    if (wantsPublish && !hasCover) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["coverImageUrl"],
        message: "Cover image is required when publishing a project",
      });
    }
  });
