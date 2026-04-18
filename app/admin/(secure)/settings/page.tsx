import { SettingsForm } from "@/components/admin/settings-form";
import { getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Site Settings</h1>
      <SettingsForm
        initialValues={{
          siteNameAr: settings.siteNameAr,
          siteNameEn: settings.siteNameEn,
          heroTitle: settings.heroTitle,
          heroSubtitle: settings.heroSubtitle,
          aboutText: settings.aboutText,
          email: settings.email,
          phone: settings.phone || "",
          whatsapp: settings.whatsapp || "",
          linkedinUrl: settings.linkedinUrl || "",
          instagramUrl: settings.instagramUrl || "",
          facebookUrl: settings.facebookUrl || "",
          footerText: settings.footerText,
        }}
      />
    </section>
  );
}
