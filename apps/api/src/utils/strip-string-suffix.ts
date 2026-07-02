export const stripStringSuffix = (
  value: unknown,
  suffix: string
): string => {
  if (typeof value !== "string" || !value.endsWith(suffix)) {
    return typeof value === "string" ? value : "";
  }

  return value.slice(0, value.length - suffix.length);
};
