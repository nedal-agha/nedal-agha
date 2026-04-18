"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";
import type { ProjectDetails } from "@/lib/queries";
import { EmptyState } from "@/components/ui/empty-state";

type ProjectsTableProps = {
  initialProjects: ProjectDetails[];
};

async function patchProject(project: ProjectDetails, patch: Partial<ProjectDetails>) {
  const payload = {
    title: patch.title ?? project.title,
    slug: patch.slug ?? project.slug,
    shortDescription: patch.shortDescription ?? project.shortDescription,
    fullDescription: patch.fullDescription ?? project.fullDescription,
    category: patch.category ?? project.category,
    clientName: patch.clientName ?? project.clientName,
    coverImageUrl: patch.coverImageUrl ?? project.coverImageUrl,
    liveUrl: patch.liveUrl ?? project.liveUrl,
    isFeatured: patch.isFeatured ?? project.isFeatured,
    isPublished: patch.isPublished ?? project.isPublished,
    sortOrder: patch.sortOrder ?? project.sortOrder,
    images:
      patch.images?.map((image) => ({
        imageUrl: image.imageUrl,
        altText: image.altText,
        sortOrder: image.sortOrder,
      })) ??
      project.images.map((image) => ({
        imageUrl: image.imageUrl,
        altText: image.altText,
        sortOrder: image.sortOrder,
      })),
  };

  const response = await fetch(`/api/admin/projects/${project.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(result.error || "Unable to update project");
  }

  return response.json() as Promise<{ project: ProjectDetails }>;
}

export function ProjectsTable({ initialProjects }: ProjectsTableProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sortedProjects = useMemo(
    () => [...projects].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [projects],
  );

  if (!sortedProjects.length) {
    return <EmptyState title="No projects" message="Create your first project from the button above." />;
  }

  const onTogglePublished = (project: ProjectDetails) => {
    setError(null);
    startTransition(async () => {
      try {
        const updated = await patchProject(project, { isPublished: !project.isPublished });
        setProjects((prev) => prev.map((item) => (item.id === project.id ? updated.project : item)));
      } catch (toggleError) {
        setError(toggleError instanceof Error ? toggleError.message : "Failed to toggle publish status");
      }
    });
  };

  const onToggleFeatured = (project: ProjectDetails) => {
    setError(null);
    startTransition(async () => {
      try {
        const updated = await patchProject(project, { isFeatured: !project.isFeatured });
        setProjects((prev) => prev.map((item) => (item.id === project.id ? updated.project : item)));
      } catch (toggleError) {
        setError(toggleError instanceof Error ? toggleError.message : "Failed to toggle featured status");
      }
    });
  };

  const onDelete = (projectId: number) => {
    if (!confirm("Delete this project? This action cannot be undone.")) {
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/projects/${projectId}`, { method: "DELETE" });
        if (!response.ok) {
          throw new Error("Failed to delete project");
        }

        setProjects((prev) => prev.filter((item) => item.id !== projectId));
      } catch (deleteError) {
        setError(deleteError instanceof Error ? deleteError.message : "Failed to delete project");
      }
    });
  };

  return (
    <div className="space-y-4">
      {error ? <p className="rounded-md border border-red-700 bg-red-950/30 p-3 text-sm text-red-200">{error}</p> : null}
      <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/70">
        <table className="min-w-full divide-y divide-slate-800 text-sm">
          <thead className="bg-slate-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sortedProjects.map((project) => (
              <tr key={project.id} className="align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-100">{project.title}</p>
                  <p className="mt-1 text-xs text-slate-400">/{project.slug}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-xs text-slate-300">Published: {project.isPublished ? "Yes" : "No"}</p>
                  <p className="mt-1 text-xs text-slate-300">Featured: {project.isFeatured ? "Yes" : "No"}</p>
                </td>
                <td className="px-4 py-3 text-slate-300">{project.category}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="rounded-md border border-slate-600 px-2.5 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-800"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onTogglePublished(project)}
                      disabled={isPending}
                      className="rounded-md border border-slate-600 px-2.5 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-800 disabled:opacity-60"
                    >
                      {project.isPublished ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleFeatured(project)}
                      disabled={isPending}
                      className="rounded-md border border-slate-600 px-2.5 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-800 disabled:opacity-60"
                    >
                      {project.isFeatured ? "Unfeature" : "Feature"}
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(project.id)}
                      disabled={isPending}
                      className="rounded-md border border-red-700 px-2.5 py-1.5 text-xs font-semibold text-red-200 hover:bg-red-900/40 disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
