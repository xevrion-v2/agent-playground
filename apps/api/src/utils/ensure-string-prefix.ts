export const ensureStringPrefix = (
  value: unknown,
  prefix: string
): string => {
  if (typeof value !== "string") {
    return prefix;
  }

  return value.startsWith(prefix) ? value : `${prefix}${value}`;
};
