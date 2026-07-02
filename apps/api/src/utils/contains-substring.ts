export const containsSubstring = (
  value: unknown,
  substring: string
): boolean => {
  return typeof value === "string" && value.includes(substring);
};
