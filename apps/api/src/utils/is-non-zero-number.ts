export const isNonZeroNumber = (value: unknown): boolean => {
  return typeof value === "number" && Number.isFinite(value) && value !== 0;
};
