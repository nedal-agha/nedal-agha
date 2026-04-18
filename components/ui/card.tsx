import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="na-card rounded-xl p-5">{children}</div>;
}
