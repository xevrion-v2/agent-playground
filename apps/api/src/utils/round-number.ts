/**
 * Rounds a number safely from unknown input.
 * Returns null for values that cannot be rounded.
 */
export function roundNumber(value: unknown, decimals: number = 0): number | null {
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

  const factor = Math.pow(10, Math.max(0, Math.floor(decimals)));
  const rounded = Math.round(num * factor) / factor;
  return Object.is(rounded, -0) ? 0 : rounded;
}
