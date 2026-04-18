"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

type ImageUploaderProps = {
  onCoverUploaded: (url: string) => void;
  onGalleryUploaded: (urls: string[]) => void;
};

async function uploadOne(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(result.error || "Upload failed");
  }

  const result = (await response.json()) as { url: string };
  return result.url;
}

export function ImageUploader({ onCoverUploaded, onGalleryUploaded }: ImageUploaderProps) {
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCoverUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setError(null);
    setIsUploadingCover(true);

    try {
      const url = await uploadOne(file);
      onCoverUploaded(url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload cover image");
    } finally {
      setIsUploadingCover(false);
      event.target.value = "";
    }
  };

  const handleGalleryUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) {
      return;
    }

    setError(null);
    setIsUploadingGallery(true);

    try {
      const urls: string[] = [];
      for (const file of files) {
        const url = await uploadOne(file);
        urls.push(url);
      }
      onGalleryUploaded(urls);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Failed to upload gallery images");
    } finally {
      setIsUploadingGallery(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-3 rounded-md border border-slate-700 p-4">
      <h3 className="text-sm font-semibold">Image Upload</h3>
      <p className="text-xs text-slate-400">Upload directly to Cloudinary and save URLs in your project entry.</p>

      <label className="block text-sm text-slate-200">
        Cover image
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverUpload}
          disabled={isUploadingCover || isUploadingGallery}
          className="mt-2 block w-full text-xs text-slate-300 file:mr-3 file:rounded file:border-0 file:bg-slate-700 file:px-2 file:py-1.5 file:text-slate-100"
        />
      </label>

      <label className="block text-sm text-slate-200">
        Gallery images
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryUpload}
          disabled={isUploadingCover || isUploadingGallery}
          className="mt-2 block w-full text-xs text-slate-300 file:mr-3 file:rounded file:border-0 file:bg-slate-700 file:px-2 file:py-1.5 file:text-slate-100"
        />
      </label>

      {isUploadingCover || isUploadingGallery ? <p className="text-xs text-sky-300">Uploading images...</p> : null}
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
