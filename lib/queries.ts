import { prisma } from "@/lib/prisma";
import { siteDefaults } from "@/data/site-defaults";

type ProjectSummary = {
  id: number;
  title: string;
  slug: string;
  shortDescription: string;
  category: string;
  coverImageUrl: string;
  isFeatured: boolean;
  isPublished: boolean;
  updatedAt: Date;
};

export type ProjectDetails = {
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
  createdAt: Date;
  updatedAt: Date;
  images: Array<{
    id: number;
    imageUrl: string;
    altText: string | null;
    sortOrder: number;
  }>;
};

export type DashboardMetrics = {
  totalProjects: number;
  publishedProjects: number;
  unreadMessages: number;
};

export async function getFeaturedProjects(): Promise<ProjectSummary[]> {
  try {
    return await prisma.project.findMany({
      where: { isPublished: true, isFeatured: true },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        category: true,
        coverImageUrl: true,
        isFeatured: true,
        isPublished: true,
        updatedAt: true,
      },
      take: 6,
    });
  } catch {
    return [];
  }
}

export async function getPublishedProjects(): Promise<ProjectSummary[]> {
  try {
    return await prisma.project.findMany({
      where: { isPublished: true },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      select: {
        id: true,
        title: true,
        slug: true,
        shortDescription: true,
        category: true,
        coverImageUrl: true,
        isFeatured: true,
        isPublished: true,
        updatedAt: true,
      },
    });
  } catch {
    return [];
  }
}

export async function getPublicProjectBySlug(slug: string): Promise<ProjectDetails | null> {
  try {
    return await prisma.project.findFirst({
      where: { slug, isPublished: true },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
          select: {
            id: true,
            imageUrl: true,
            altText: true,
            sortOrder: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getAdminProjects(): Promise<ProjectDetails[]> {
  try {
    return await prisma.project.findMany({
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
          select: {
            id: true,
            imageUrl: true,
            altText: true,
            sortOrder: true,
          },
        },
      },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getAdminProjectById(id: number): Promise<ProjectDetails | null> {
  try {
    return await prisma.project.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
          select: {
            id: true,
            imageUrl: true,
            altText: true,
            sortOrder: true,
          },
        },
      },
    });
  } catch {
    return null;
  }
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  try {
    const [totalProjects, publishedProjects, unreadMessages] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { isPublished: true } }),
      prisma.contactMessage.count({ where: { isRead: false } }),
    ]);

    return {
      totalProjects,
      publishedProjects,
      unreadMessages,
    };
  } catch {
    return {
      totalProjects: 0,
      publishedProjects: 0,
      unreadMessages: 0,
    };
  }
}

export async function getAdminMessages() {
  try {
    return await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    return [];
  }
}

export async function getSiteSettings() {
  try {
    const settings = await prisma.siteSettings.findUnique({ where: { id: 1 } });
    if (!settings) {
      return siteDefaults;
    }

    return settings;
  } catch {
    return siteDefaults;
  }
}
