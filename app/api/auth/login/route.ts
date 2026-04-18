import { NextResponse } from "next/server";
import { AUTH_GENERIC_ERROR } from "@/lib/constants";
import { verifyAdminCredentials } from "@/lib/auth";
import { setSessionCookie } from "@/lib/session";

function pickLoginData(record: Record<string, FormDataEntryValue | string | undefined>) {
  return {
    email: typeof record.email === "string" ? record.email : "",
    password: typeof record.password === "string" ? record.password : "",
  };
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const fromForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  const payload = fromForm
    ? pickLoginData(Object.fromEntries((await request.formData()).entries()))
    : pickLoginData((await request.json()) as Record<string, string>);

  let admin: Awaited<ReturnType<typeof verifyAdminCredentials>> | null = null;
  try {
    admin = await verifyAdminCredentials(payload.email, payload.password);
  } catch {
    if (fromForm) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid_credentials", request.url), 303);
    }

    return NextResponse.json({ error: AUTH_GENERIC_ERROR }, { status: 401 });
  }

  if (!admin) {
    if (fromForm) {
      return NextResponse.redirect(new URL("/admin/login?error=invalid_credentials", request.url), 303);
    }

    return NextResponse.json({ error: AUTH_GENERIC_ERROR }, { status: 401 });
  }

  await setSessionCookie({ adminId: admin.id, email: admin.email });

  if (fromForm) {
    return NextResponse.redirect(new URL("/admin", request.url), 303);
  }

  return NextResponse.json({ ok: true });
}
