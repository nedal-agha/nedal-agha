import { z } from "zod";

export const settingsValidator = z.object({
  siteNameAr: z.string().trim().min(2).max(140),
  siteNameEn: z.string().trim().min(2).max(140),
  heroTitle: z.string().trim().min(5).max(200),
  heroSubtitle: z.string().trim().min(5).max(300),
  aboutText: z.string().trim().min(20),
  email: z.email().trim().toLowerCase(),
  phone: z.string().trim().max(30).optional().nullable(),
  whatsapp: z.string().trim().max(30).optional().nullable(),
  linkedinUrl: z.url().optional().or(z.literal("")),
  instagramUrl: z.url().optional().or(z.literal("")),
  facebookUrl: z.url().optional().or(z.literal("")),
  footerText: z.string().trim().min(5).max(300),
});
