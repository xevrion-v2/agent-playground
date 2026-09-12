export function roundNumber(value: number, precision = 0): number {
  if (!Number.isFinite(value)) {
    return value;
  }

  if (!Number.isFinite(precision)) {
    return value;
  }

  const factor = 10 ** Math.trunc(precision);
  return Math.round(value * factor) / factor;
}
