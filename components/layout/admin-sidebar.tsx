import Link from "next/link";

const adminLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminSidebar() {
  return (
    <aside className="border-r border-slate-800 bg-slate-900/60 p-4">
      <p className="mb-6 text-sm font-semibold tracking-wide text-sky-300">Admin Panel</p>
      <ul className="space-y-2 text-sm">
        {adminLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="block rounded-md px-3 py-2 text-slate-200 transition hover:bg-slate-800 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
