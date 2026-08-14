export function stripTrailingSlash(value: string): string {
  if (value === "" || value === "/" || value.endsWith("://")) {
    return value;
  }

  const stripped = value.replace(/\/+$/u, "");
  return stripped === "" ? "/" : stripped;
}
