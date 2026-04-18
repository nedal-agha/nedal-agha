import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { getAdminProjectById } from "@/lib/queries";

type AdminEditProjectPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminEditProjectPage({ params }: AdminEditProjectPageProps) {
  const { id } = await params;
  const projectId = Number(id);

  if (!Number.isFinite(projectId)) {
    notFound();
  }

  const project = await getAdminProjectById(projectId);

  if (!project) {
    notFound();
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Edit Project #{id}</h1>
      <ProjectForm mode="edit" initialProject={project} />
    </section>
  );
}
