export const hasStringSuffix = (
  value: unknown,
  suffix: string
): boolean => {
  return typeof value === "string" && value.endsWith(suffix);
};
