type AboutPreviewProps = {
  aboutText: string;
};

export function AboutPreview({ aboutText }: AboutPreviewProps) {
  return (
    <section className="na-card rounded-xl p-5">
      <h3 className="text-xl font-semibold">About</h3>
      <p className="na-muted mt-2">{aboutText}</p>
    </section>
  );
}
