/**
 * Clamps a finite numeric value into an inclusive range, tolerating reversed bounds.
 * @param num - The number to clamp.
 * @param min - Minimum bound.
 * @param max - Maximum bound.
 * @returns Clamped number.
 */
export function clampNumber(num: number, min: number, max: number): number {
  if (!isFinite(num)) return NaN;
  const lo = Math.min(min, max);
  const hi = Math.max(min, max);
  return Math.max(lo, Math.min(hi, num));
}