export const stripStringPrefix = (
  value: unknown,
  prefix: string
): string => {
  if (typeof value !== "string" || !value.startsWith(prefix)) {
    return typeof value === "string" ? value : "";
  }

  return value.slice(prefix.length);
};
