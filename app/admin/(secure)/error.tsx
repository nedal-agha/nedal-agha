"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-md border border-red-800 bg-red-950/30 p-4 text-sm text-red-100">
      <p>Admin page failed to load.</p>
      <button type="button" onClick={reset} className="mt-3 rounded-md border border-red-700 px-3 py-1.5 hover:bg-red-900/40">
        Retry
      </button>
    </div>
  );
}
