import { ProjectCard } from "@/components/public/project-card";
import { EmptyState } from "@/components/ui/empty-state";

type ProjectGridItem = {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
};

type ProjectsGridProps = {
  projects: ProjectGridItem[];
};

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  if (!projects.length) {
    return <EmptyState title="No projects yet" message="Published projects will appear here." />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} slug={project.slug} title={project.title} description={project.shortDescription} category={project.category} />
      ))}
    </div>
  );
}
