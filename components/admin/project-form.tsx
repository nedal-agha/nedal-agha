"use client";

import { useMemo, useState, useTransition } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { ProjectDetails } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/image-uploader";

type ProjectFormProps = {
  mode: "create" | "edit";
  initialProject?: ProjectDetails;
};

type FormState = {
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  clientName: string;
  coverImageUrl: string;
  liveUrl: string;
  galleryUrlsText: string;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
};

function makeInitialState(project?: ProjectDetails): FormState {
  return {
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    shortDescription: project?.shortDescription ?? "",
    fullDescription: project?.fullDescription ?? "",
    category: project?.category ?? "",
    clientName: project?.clientName ?? "",
    coverImageUrl: project?.coverImageUrl ?? "",
    liveUrl: project?.liveUrl ?? "",
    galleryUrlsText: project?.images.map((image) => image.imageUrl).join("\n") ?? "",
    isFeatured: project?.isFeatured ?? false,
    isPublished: project?.isPublished ?? false,
    sortOrder: project?.sortOrder ?? 0,
  };
}

function parseGalleryUrls(value: string) {
  return value
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((imageUrl, index) => ({
      imageUrl,
      altText: null,
      sortOrder: index,
    }));
}

export function ProjectForm({ mode, initialProject }: ProjectFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => makeInitialState(initialProject));
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const galleryCount = useMemo(() => parseGalleryUrls(form.galleryUrlsText).length, [form.galleryUrlsText]);

  const handleTextChange =
    (key: keyof Omit<FormState, "isFeatured" | "isPublished" | "sortOrder">) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: event.target.value }));
    };

  const handleCoverUploaded = (url: string) => {
    setForm((prev) => ({ ...prev, coverImageUrl: url }));
  };

  const handleGalleryUploaded = (urls: string[]) => {
    setForm((prev) => {
      const current = prev.galleryUrlsText.trim();
      const joined = urls.join("\n");
      return {
        ...prev,
        galleryUrlsText: current ? `${current}\n${joined}` : joined,
      };
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const payload = {
      title: form.title,
      slug: form.slug || undefined,
      shortDescription: form.shortDescription,
      fullDescription: form.fullDescription,
      category: form.category,
      clientName: form.clientName || null,
      coverImageUrl: form.coverImageUrl,
      liveUrl: form.liveUrl || null,
      isFeatured: form.isFeatured,
      isPublished: form.isPublished,
      sortOrder: Number.isFinite(form.sortOrder) ? form.sortOrder : 0,
      images: parseGalleryUrls(form.galleryUrlsText),
    };

    startTransition(async () => {
      try {
        const response = await fetch(mode === "create" ? "/api/admin/projects" : `/api/admin/projects/${initialProject?.id}`, {
          method: mode === "create" ? "POST" : "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const result = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(result.error || "Unable to save project");
        }

        setSuccess(mode === "create" ? "Project created successfully" : "Project updated successfully");
        router.push("/admin/projects");
        router.refresh();
      } catch (submitError) {
        setError(submitError instanceof Error ? submitError.message : "Unable to save project");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-5">
      {error ? <p className="rounded-md border border-red-700 bg-red-950/40 p-3 text-sm text-red-200">{error}</p> : null}
      {success ? <p className="rounded-md border border-emerald-700 bg-emerald-950/30 p-3 text-sm text-emerald-200">{success}</p> : null}

      <Input label="Project title" name="title" required value={form.title} onChange={handleTextChange("title")} />
      <Input label="Slug (optional)" name="slug" value={form.slug} onChange={handleTextChange("slug")} />
      <Input label="Category" name="category" required value={form.category} onChange={handleTextChange("category")} />
      <Input label="Client name (optional)" name="clientName" value={form.clientName} onChange={handleTextChange("clientName")} />
      <Textarea
        label="Short description"
        name="shortDescription"
        required
        rows={3}
        value={form.shortDescription}
        onChange={handleTextChange("shortDescription")}
      />
      <Textarea
        label="Full description"
        name="fullDescription"
        required
        rows={6}
        value={form.fullDescription}
        onChange={handleTextChange("fullDescription")}
      />
      <Input
        label="Cover image URL"
        name="coverImageUrl"
        required={form.isPublished}
        value={form.coverImageUrl}
        onChange={handleTextChange("coverImageUrl")}
      />
      <Input label="Live URL (optional)" name="liveUrl" value={form.liveUrl} onChange={handleTextChange("liveUrl")} />

      <label className="block space-y-2 text-sm">
        <span className="text-slate-200">Gallery image URLs (comma or newline separated)</span>
        <textarea
          className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-sky-400/40 focus:ring"
          value={form.galleryUrlsText}
          onChange={handleTextChange("galleryUrlsText")}
          rows={5}
        />
        <p className="text-xs text-slate-400">{galleryCount} images</p>
      </label>

      <ImageUploader onCoverUploaded={handleCoverUploaded} onGalleryUploaded={handleGalleryUploaded} />

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={form.isPublished}
            onChange={(event) => setForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
          />
          Published
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-200">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={(event) => setForm((prev) => ({ ...prev, isFeatured: event.target.checked }))}
          />
          Featured
        </label>
        <label className="block space-y-2 text-sm">
          <span className="text-slate-200">Sort order</span>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(event) =>
              setForm((prev) => ({
                ...prev,
                sortOrder: Number(event.target.value) || 0,
              }))
            }
            className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-sky-400/40 focus:ring"
          />
        </label>
      </div>

      <Button type="submit">{isPending ? "Saving..." : mode === "create" ? "Create Project" : "Save Changes"}</Button>
    </form>
  );
}
