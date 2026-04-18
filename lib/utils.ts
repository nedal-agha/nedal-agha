export function cn(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function isFormRequest(contentType: string | null) {
  return Boolean(contentType && contentType.includes("application/x-www-form-urlencoded"));
}
