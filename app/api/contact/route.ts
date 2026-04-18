import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactValidator } from "@/validators/contact-validator";

function toStringValue(value: FormDataEntryValue | string | undefined) {
  return typeof value === "string" ? value : "";
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const fromForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  const raw = fromForm
    ? Object.fromEntries((await request.formData()).entries())
    : ((await request.json()) as Record<string, string>);

  const parsed = contactValidator.safeParse({
    name: toStringValue(raw.name),
    email: toStringValue(raw.email),
    phone: toStringValue(raw.phone) || null,
    subject: toStringValue(raw.subject),
    message: toStringValue(raw.message),
    company: toStringValue(raw.company),
  });

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact request", details: parsed.error.flatten() }, { status: 400 });
  }

  let createdId: number;
  try {
    const created = await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });
    createdId = created.id;
  } catch {
    if (fromForm) {
      return NextResponse.redirect(new URL("/contact?error=service_unavailable", request.url), 303);
    }

    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  if (fromForm) {
    return NextResponse.redirect(new URL("/contact?success=1", request.url), 303);
  }

  return NextResponse.json({ ok: true, id: createdId }, { status: 201 });
}
