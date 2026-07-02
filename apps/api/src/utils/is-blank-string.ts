export const isBlankString = (value: unknown): boolean => {
  return typeof value === "string" && value.trim().length === 0;
};
