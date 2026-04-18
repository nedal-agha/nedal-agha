"use server";

import { AUTH_GENERIC_ERROR } from "@/lib/constants";
import { verifyAdminCredentials } from "@/lib/auth";
import { clearSessionCookie, setSessionCookie } from "@/lib/session";
import { authValidator } from "@/validators/auth-validator";

export async function loginAction(rawData: unknown) {
  const parsed = authValidator.safeParse(rawData);
  if (!parsed.success) {
    return { success: false, message: AUTH_GENERIC_ERROR };
  }

  const admin = await verifyAdminCredentials(parsed.data.email, parsed.data.password);
  if (!admin) {
    return { success: false, message: AUTH_GENERIC_ERROR };
  }

  await setSessionCookie({ adminId: admin.id, email: admin.email });
  return { success: true };
}

export async function logoutAction() {
  await clearSessionCookie();
}
