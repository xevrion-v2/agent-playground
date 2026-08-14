export function clampNumber(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
