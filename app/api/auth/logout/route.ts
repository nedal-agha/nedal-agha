import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/session";

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || "";
  const fromForm = contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data");

  await clearSessionCookie();

  if (fromForm) {
    return NextResponse.redirect(new URL("/admin/login", request.url), 303);
  }

  return NextResponse.json({ ok: true });
}
