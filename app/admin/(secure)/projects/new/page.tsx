import { ProjectForm } from "@/components/admin/project-form";

export default function AdminNewProjectPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Create Project</h1>
      <ProjectForm mode="create" />
    </section>
  );
}
