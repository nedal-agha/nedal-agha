export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function generateUniqueSlug(
  source: string,
  isTaken: (slug: string) => Promise<boolean>,
) {
  const base = slugify(source);

  if (!base) {
    throw new Error("Unable to generate slug");
  }

  if (!(await isTaken(base))) {
    return base;
  }

  let counter = 2;
  while (await isTaken(`${base}-${counter}`)) {
    counter += 1;
  }

  return `${base}-${counter}`;
}
