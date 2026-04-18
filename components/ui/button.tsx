import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
};

export function Button({ children, type = "button", variant = "primary" }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition";
  const style =
    variant === "primary"
      ? "bg-sky-400 text-slate-900 hover:bg-sky-300"
      : "border border-slate-600 text-slate-100 hover:bg-slate-800";

  return (
    <button type={type} className={`${base} ${style}`}>
      {children}
    </button>
  );
}
