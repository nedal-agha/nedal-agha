"use client";

import { useState, useTransition } from "react";
import { EmptyState } from "@/components/ui/empty-state";

type MessageItem = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date | string;
};

type MessagesTableProps = {
  initialMessages: MessageItem[];
};

export function MessagesTable({ initialMessages }: MessagesTableProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  if (!messages.length) {
    return <EmptyState title="No messages" message="Incoming contact form messages will be listed here." />;
  }

  const markAsRead = (id: number) => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
        if (!response.ok) {
          throw new Error("Failed to mark message as read");
        }

        setMessages((prev) => prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)));
      } catch (markError) {
        setError(markError instanceof Error ? markError.message : "Failed to mark message");
      }
    });
  };

  const removeMessage = (id: number) => {
    if (!confirm("Delete this message?")) {
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
        if (!response.ok) {
          throw new Error("Failed to delete message");
        }

        setMessages((prev) => prev.filter((item) => item.id !== id));
      } catch (deleteError) {
        setError(deleteError instanceof Error ? deleteError.message : "Failed to delete message");
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
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Sender</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Subject</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Status</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {messages.map((item) => (
              <tr key={item.id} className="align-top">
                <td className="px-4 py-3">
                  <p className="font-semibold text-slate-100">{item.name}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.email}</p>
                  {item.phone ? <p className="mt-1 text-xs text-slate-400">{item.phone}</p> : null}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-200">{item.subject}</p>
                  <p className="mt-1 text-xs text-slate-400">{item.message}</p>
                </td>
                <td className="px-4 py-3 text-xs text-slate-300">{item.isRead ? "Read" : "Unread"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    {!item.isRead ? (
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => markAsRead(item.id)}
                        className="rounded-md border border-slate-600 px-2.5 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-800 disabled:opacity-60"
                      >
                        Mark Read
                      </button>
                    ) : null}
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => removeMessage(item.id)}
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
