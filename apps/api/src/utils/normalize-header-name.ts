export function normalizeHeaderName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .split("-")
    .filter((segment) => segment.length > 0)
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join("-");
}
