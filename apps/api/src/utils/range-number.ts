export function rangeNumber(start: number, end: number, step = 1): number[] {
  if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(step) || step === 0) {
    return [];
  }
  const result: number[] = [];
  if (step > 0) {
    for (let current = start; current <= end; current += step) {
      result.push(current);
    }
  } else {
    for (let current = start; current >= end; current += step) {
      result.push(current);
    }
  }
  return result;
}
