import { z } from "zod";

export const contactValidator = z
  .object({
    name: z.string().trim().min(2).max(100),
    email: z.email().trim().toLowerCase(),
    phone: z.string().trim().max(30).optional().nullable(),
    subject: z.string().trim().min(3).max(150),
    message: z.string().trim().min(10).max(5000),
    company: z.string().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.company && value.company.trim().length > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["company"],
        message: "Spam detected",
      });
    }
  });
