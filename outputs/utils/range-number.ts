export function rangeNumber(start: number, end: number, step = 1): number[] {
  if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step) || step === 0) {
    throw new RangeError("Range bounds and step must be finite, and step cannot be zero.");
  }

  const direction = start <= end ? 1 : -1;
  const increment = Math.abs(step) * direction;
  const values: number[] = [];

  for (let current = start; direction > 0 ? current <= end : current >= end; current += increment) {
    values.push(current);
  }

  return values;
}
