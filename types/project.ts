export type ProjectImage = {
  id: number;
  imageUrl: string;
  altText: string | null;
  sortOrder: number;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  clientName: string | null;
  coverImageUrl: string;
  liveUrl: string | null;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  images: ProjectImage[];
};
