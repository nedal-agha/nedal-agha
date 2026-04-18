import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/public/hero-section";
import { AboutPreview } from "@/components/public/about-preview";
import { ServicesPreview } from "@/components/public/services-preview";
import { FeaturedProjects } from "@/components/public/featured-projects";
import { ContactCta } from "@/components/public/contact-cta";
import { getFeaturedProjects, getSiteSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, featuredProjects] = await Promise.all([getSiteSettings(), getFeaturedProjects()]);

  return (
    <div className="na-shell min-h-screen">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-16 pt-8 md:px-6">
        <HeroSection title={settings.heroTitle} subtitle={settings.heroSubtitle} />
        <AboutPreview aboutText={settings.aboutText} />
        <ServicesPreview />
        <FeaturedProjects projects={featuredProjects} />
        <section className="na-card rounded-2xl p-6">
          <h2 className="text-2xl font-semibold">Execution-First MVP</h2>
          <p className="na-muted mt-2">
            This baseline follows the strict architecture and delivery sequence from your blueprint.
          </p>
          <div className="mt-4 flex gap-3">
            <Link href="/projects" className="rounded-md bg-sky-400 px-4 py-2 font-medium text-slate-900">
              Browse Projects
            </Link>
            <Link href="/contact" className="rounded-md border border-slate-600 px-4 py-2 font-medium">
              Contact
            </Link>
          </div>
        </section>
        <ContactCta />
      </main>
      <Footer />
    </div>
  );
}
