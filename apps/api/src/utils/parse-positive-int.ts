export function parsePositiveInt(value: unknown, fallback: number): number {
  const parsed = typeof value === 'number'
    ? value
    : typeof value === 'string'
      ? Number.parseInt(value, 10)
      : Number.NaN;

  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}