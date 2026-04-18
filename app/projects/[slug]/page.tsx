import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProjectGallery } from "@/components/public/project-gallery";
import { getPublicProjectBySlug } from "@/lib/queries";

type ProjectDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProjectDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "Project",
      description: "Project details",
    };
  }

  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project was not found.",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const project = await getPublicProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="na-shell min-h-screen">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 pb-16 pt-8 md:px-6">
        <header className="space-y-2">
          <p className="text-sm text-sky-300">{project.category}</p>
          <h1 className="text-3xl font-semibold">{project.title}</h1>
          <p className="na-muted">{project.shortDescription}</p>
        </header>

        <article className="na-card rounded-xl p-5">
          <h2 className="text-xl font-semibold">Project Details</h2>
          <p className="na-muted mt-3 whitespace-pre-line">{project.fullDescription}</p>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-sky-300 hover:text-sky-200"
            >
              Visit Live Project
            </a>
          ) : null}
        </article>

        <ProjectGallery
          images={project.images.map((image) => ({
            id: image.id,
            imageUrl: image.imageUrl,
            altText: image.altText,
          }))}
        />
      </main>
      <Footer />
    </div>
  );
}
