export const roundToDecimals = (
  value: unknown,
  decimals: number
): number => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return Number.NaN;
  }

  const safeDecimals = Number.isInteger(decimals) && decimals >= 0 ? decimals : 0;
  const factor = 10 ** safeDecimals;

  return Math.round((value + Number.EPSILON) * factor) / factor;
};
