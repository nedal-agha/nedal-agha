import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-sm font-semibold tracking-wide text-sky-300">
          Nedal Agha
        </Link>
        <ul className="flex items-center gap-4 text-sm text-slate-200">
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="transition hover:text-sky-300">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
