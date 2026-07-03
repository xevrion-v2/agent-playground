export function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)) {
    throw new TypeError("clampNumber expects finite numbers");
  }

  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  return Math.min(Math.max(value, lower), upper);
}
