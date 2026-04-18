"use client";

export default function RootError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="na-shell flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-xl border border-red-800 bg-red-950/30 p-5 text-red-100">
        <h2 className="text-lg font-semibold">Something went wrong</h2>
        <p className="mt-2 text-sm opacity-90">{error.message || "Unexpected error"}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-md border border-red-700 px-3 py-1.5 text-sm hover:bg-red-900/40"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
