export const ensureStringSuffix = (
  value: unknown,
  suffix: string
): string => {
  if (typeof value !== "string") {
    return suffix;
  }

  return value.endsWith(suffix) ? value : `${value}${suffix}`;
};
