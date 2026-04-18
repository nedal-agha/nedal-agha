type SectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {subtitle ? <p className="na-muted mt-2">{subtitle}</p> : null}
    </div>
  );
}
