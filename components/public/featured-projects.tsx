import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";

type FeaturedProject = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
};

type FeaturedProjectsProps = {
  projects: FeaturedProject[];
};

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (!projects.length) {
    return (
      <EmptyState
        title="Featured Projects"
        message="Featured items will appear here once projects are published and marked as featured."
      />
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Featured Projects</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.id} className="na-card rounded-xl p-5">
            <p className="text-xs text-sky-300">{project.category}</p>
            <h3 className="mt-2 text-lg font-semibold">{project.title}</h3>
            <p className="na-muted mt-2 text-sm">{project.shortDescription}</p>
            <Link href={`/projects/${project.slug}`} className="mt-4 inline-flex text-sm font-semibold text-sky-300 hover:text-sky-200">
              View details
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
