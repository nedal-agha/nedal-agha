import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="na-shell flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md space-y-4 rounded-xl border border-slate-700 bg-slate-900/70 p-6 text-center">
        <h1 className="text-2xl font-semibold">404 - Page not found</h1>
        <p className="text-sm text-slate-300">The page you requested does not exist or is unavailable.</p>
        <Link href="/" className="inline-flex rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-900">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
