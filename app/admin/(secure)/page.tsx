import { DashboardCards } from "@/components/admin/dashboard-cards";
import { getDashboardMetrics } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <DashboardCards metrics={metrics} />
    </section>
  );
}
