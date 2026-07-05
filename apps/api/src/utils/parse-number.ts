export function parseNumber(
  value: string | number | undefined,
  fallback = 0,
): number {
  if (value === undefined || value === "") {
    return fallback;
  }

  const parsed = typeof value === "number" ? value : Number(value);

  return Number.isFinite(parsed) ? parsed : fallback;
}

export function parseInteger(
  value: string | number | undefined,
  fallback = 0,
): number {
  const parsed = parseNumber(value, fallback);

  return Number.isInteger(parsed) ? parsed : fallback;
}
