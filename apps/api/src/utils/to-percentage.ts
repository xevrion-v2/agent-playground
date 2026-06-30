/**
 * Formats a number as a percentage string.
 * Accepts values in decimal form (e.g. 0.25 → "25%").
 */
export function toPercentage(value: unknown, decimals: number = 0): string | null {
  if (value === null || value === undefined) return null;

  let num: number;
  if (typeof value === "number") {
    num = value;
  } else if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    num = Number(trimmed);
    if (!Number.isFinite(num)) return null;
  } else {
    return null;
  }

  if (!Number.isFinite(num)) return null;

  const percent = num * 100;
  return percent.toFixed(decimals) + "%";
}
