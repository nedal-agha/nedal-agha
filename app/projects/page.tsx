import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectsGrid } from "@/components/public/projects-grid";
import { getPublishedProjects } from "@/lib/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse published web projects by Nedal Agha Web Development.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="na-shell min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold">Projects</h1>
          <p className="na-muted mt-2">Public catalog of published projects.</p>
        </header>
        <ProjectsGrid projects={projects} />
      </main>
      <Footer />
    </div>
  );
}
