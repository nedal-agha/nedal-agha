type BadgeProps = {
  children: string;
};

export function Badge({ children }: BadgeProps) {
  return <span className="inline-flex rounded-full border border-slate-600 px-2 py-1 text-xs text-slate-300">{children}</span>;
}
