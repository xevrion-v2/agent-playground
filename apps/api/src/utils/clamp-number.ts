export function clampNumber(value: number, lowerBound: number, upperBound: number): number {
  if (!Number.isFinite(value)) {
    throw new TypeError("value must be finite");
  }

  if (!Number.isFinite(lowerBound) || !Number.isFinite(upperBound)) {
    throw new TypeError("bounds must be finite");
  }

  const min = Math.min(lowerBound, upperBound);
  const max = Math.max(lowerBound, upperBound);

  return Math.min(Math.max(value, min), max);
}
