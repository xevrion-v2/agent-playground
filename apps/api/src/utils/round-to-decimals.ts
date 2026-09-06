export function roundToDecimals(value: number, decimals: number): number {
  if (!Number.isInteger(decimals) || decimals < 0) {
    throw new RangeError("decimals must be a non-negative integer");
  }

  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
