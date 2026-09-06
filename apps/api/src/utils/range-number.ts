export function rangeNumber(start: number, end: number, step = 1): number[] {
  if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step)) {
    throw new TypeError("rangeNumber requires finite numbers");
  }

  if (step === 0) {
    throw new RangeError("rangeNumber step must not be 0");
  }

  const increment = Math.abs(step) * (start <= end ? 1 : -1);
  const values: number[] = [];

  for (let current = start; increment > 0 ? current <= end : current >= end; current += increment) {
    values.push(current);
  }

  return values;
}
