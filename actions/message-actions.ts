"use server";

import { prisma } from "@/lib/prisma";
import { contactValidator } from "@/validators/contact-validator";

export async function createMessageAction(rawData: unknown) {
  const parsed = contactValidator.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten() };
  }

  const message = await prisma.contactMessage.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      subject: parsed.data.subject,
      message: parsed.data.message,
    },
  });

  return { success: true, message };
}
