type AdminTopbarProps = {
  email: string;
};

export function AdminTopbar({ email }: AdminTopbarProps) {
  return (
    <header className="border-b border-slate-800 bg-slate-900/40 px-4 py-4 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-300">Signed in as {email}</p>
        <form action="/api/auth/logout" method="post">
          <button
            type="submit"
            className="rounded-md border border-slate-600 px-3 py-1.5 text-xs font-semibold text-slate-100 transition hover:bg-slate-800"
          >
            Logout
          </button>
        </form>
      </div>
    </header>
  );
}
