export const isNonBlankString = (value: unknown): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};
