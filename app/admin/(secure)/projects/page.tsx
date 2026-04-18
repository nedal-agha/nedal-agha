import Link from "next/link";
import { ProjectsTable } from "@/components/admin/projects-table";
import { getAdminProjects } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await getAdminProjects();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new" className="rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-900">
          New Project
        </Link>
      </div>
      <ProjectsTable initialProjects={projects} />
    </section>
  );
}
