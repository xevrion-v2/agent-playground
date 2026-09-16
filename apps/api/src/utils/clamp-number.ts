/**
 * Clamps a number between min and max bounds.
 * @module utils/clamp-number
 */
export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
