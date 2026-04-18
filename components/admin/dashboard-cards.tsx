import type { DashboardMetrics } from "@/lib/queries";

type DashboardCardsProps = {
  metrics: DashboardMetrics;
};

export function DashboardCards({ metrics }: DashboardCardsProps) {
  const cards = [
    { title: "Total Projects", value: metrics.totalProjects.toString() },
    { title: "Published", value: metrics.publishedProjects.toString() },
    { title: "Unread Messages", value: metrics.unreadMessages.toString() },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <article key={card.title} className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">
          <p className="text-sm text-slate-400">{card.title}</p>
          <p className="mt-2 text-2xl font-semibold">{card.value}</p>
        </article>
      ))}
    </div>
  );
}
