import { EmptyState } from "@/components/ui/empty-state";

type GalleryItem = {
  id: number;
  imageUrl: string;
  altText: string | null;
};

type ProjectGalleryProps = {
  images: GalleryItem[];
};

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images.length) {
    return <EmptyState title="Project Gallery" message="No gallery images are available for this project yet." />;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image) => (
        <a
          key={image.id}
          href={image.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-slate-700 bg-slate-900/70 p-3 hover:border-sky-400/40"
        >
          <p className="text-sm font-semibold">Image #{image.id}</p>
          <p className="mt-1 break-all text-xs text-slate-400">{image.altText || image.imageUrl}</p>
        </a>
      ))}
    </div>
  );
}
