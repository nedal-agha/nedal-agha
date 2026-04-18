import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { readSessionFromCookies, readSessionFromRequest } from "@/lib/session";

export async function requireAdminSession() {
  const session = await readSessionFromCookies();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function ensureAdminRequest(request: NextRequest) {
  return readSessionFromRequest(request);
}
