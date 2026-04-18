import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return null;
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    return null;
  }

  return {
    id: admin.id,
    email: admin.email,
  };
}
