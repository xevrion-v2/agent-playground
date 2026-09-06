export function clampNumber(value: number, min: number, max: number): number {
  if (min > max) {
    return value;
  }
  return Math.min(max, Math.max(min, value));
}
