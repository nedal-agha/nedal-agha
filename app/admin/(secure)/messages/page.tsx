import { MessagesTable } from "@/components/admin/messages-table";
import { getAdminMessages } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Messages</h1>
      <MessagesTable initialMessages={messages} />
    </section>
  );
}
