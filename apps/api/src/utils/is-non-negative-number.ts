export const isNonNegativeNumber = (value: unknown): boolean => {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
};
