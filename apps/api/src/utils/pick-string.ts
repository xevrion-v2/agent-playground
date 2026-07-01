export function pickString(value: unknown, fallback?: string): string | undefined {
  return typeof value === "string" ? value : fallback;
}
