import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "ChangeMe123!", 10);

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@example.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      passwordHash,
    },
  });

  await prisma.siteSettings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      siteNameAr: "نضال آغا لتطوير المواقع الإلكترونية",
      siteNameEn: "Nedal Agha Web Development",
      heroTitle: "نبني مواقع إلكترونية تعكس قيمة علامتك التجارية",
      heroSubtitle: "تصميم وتطوير مواقع احترافية تجمع بين الجمال والأداء وسهولة الاستخدام",
      aboutText: "نقدّم حلول تطوير مواقع إلكترونية احترافية تساعد الأفراد والشركات على بناء حضور رقمي عصري وواضح وفعّال.",
      email: "contact@example.com",
      phone: null,
      whatsapp: null,
      linkedinUrl: null,
      instagramUrl: null,
      facebookUrl: null,
      footerText: "جميع الحقوق محفوظة © Nedal Agha Web Development",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });