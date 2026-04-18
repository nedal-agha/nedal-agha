export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="na-muted mt-2 text-sm">{message}</p>
    </div>
  );
}
