export const hasStringPrefix = (
  value: unknown,
  prefix: string
): boolean => {
  return typeof value === "string" && value.startsWith(prefix);
};
