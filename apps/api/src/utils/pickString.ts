export function pickString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}
