export function parseInteger(value: string, fallback?: number): number | undefined {
  const trimmed = value.trim();
  if (!/^[+-]?\d+$/.test(trimmed)) {
    return fallback;
  }

  const parsed = Number(trimmed);
  return Number.isSafeInteger(parsed) ? parsed : fallback;
}
