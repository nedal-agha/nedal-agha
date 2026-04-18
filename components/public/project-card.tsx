import Link from "next/link";

type ProjectCardProps = {
  slug: string;
  title: string;
  description: string;
  category: string;
};

export function ProjectCard({ slug, title, description, category }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="na-card block rounded-xl p-5 transition hover:border-sky-400/40">
      <p className="text-xs text-sky-300">{category}</p>
      <h3 className="mt-2 font-semibold">{title}</h3>
      <p className="na-muted mt-2 text-sm">{description}</p>
    </Link>
  );
}
