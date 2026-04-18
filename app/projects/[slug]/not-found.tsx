import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className="na-shell min-h-screen px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-xl border border-slate-700 bg-slate-900/70 p-6 text-center">
        <h1 className="text-2xl font-semibold">Project Not Found</h1>
        <p className="mt-2 text-sm text-slate-300">This project does not exist or is not published.</p>
        <Link href="/projects" className="mt-4 inline-flex rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-900">
          Back to Projects
        </Link>
      </div>
    </div>
  );
}
