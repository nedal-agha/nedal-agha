"use server";

import { prisma } from "@/lib/prisma";
import { settingsValidator } from "@/validators/settings-validator";

export async function updateSettingsAction(rawData: unknown) {
  const parsed = settingsValidator.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten() };
  }

  const settings = await prisma.siteSettings.upsert({
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

  return { success: true, settings };
}
