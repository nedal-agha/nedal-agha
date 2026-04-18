import { servicesStatic } from "@/data/services-static";

export function ServicesPreview() {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {servicesStatic.map((service) => (
        <article key={service.title} className="na-card rounded-xl p-5">
          <h3 className="font-semibold">{service.title}</h3>
          <p className="na-muted mt-2 text-sm">{service.description}</p>
        </article>
      ))}
    </section>
  );
}
