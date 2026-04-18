import Link from "next/link";

export function ContactCta() {
  return (
    <section className="na-card rounded-xl p-6 text-center">
      <h3 className="text-xl font-semibold">Ready to launch your next website?</h3>
      <p className="na-muted mt-2 text-sm">Let us turn your idea into a professional web presence.</p>
      <Link href="/contact" className="mt-4 inline-flex rounded-md bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-900">
        Contact Us
      </Link>
    </section>
  );
}
