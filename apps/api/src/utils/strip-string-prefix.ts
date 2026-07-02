export const stripStringPrefix = (
  value: unknown,
  prefix: string
): string => {
  if (typeof value !== "string") {
    return "";
  }

  return value.startsWith(prefix) ? value.slice(prefix.length) : value;
};
