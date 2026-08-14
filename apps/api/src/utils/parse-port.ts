export function parsePort(value: string | number, fallback?: number): number | undefined {
  const parsed = typeof value === "number" ? value : Number(value.trim());
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65_535) {
    return fallback;
  }

  return parsed;
}
