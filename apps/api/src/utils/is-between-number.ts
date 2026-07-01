export const isBetweenNumber = (
  value: unknown,
  min: number,
  max: number
): boolean => {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return false;
  }

  const lower = Math.min(min, max);
  const upper = Math.max(min, max);

  return value >= lower && value <= upper;
};
