import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

type AdminLoginPageProps = {
  searchParams?: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const hasError = params?.error === "invalid_credentials";

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-slate-100">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
        <h1 className="text-2xl font-semibold">Admin Login</h1>
        <p className="mt-2 text-sm text-slate-300">Single-admin authentication gateway.</p>
        {hasError ? (
          <p className="mt-4 rounded-md border border-red-700 bg-red-950/40 p-3 text-sm text-red-200">Invalid credentials</p>
        ) : null}
        <LoginForm />
      </div>
    </div>
  );
}
