export const hasCloseBracket = (value: unknown): boolean => {
  return typeof value === "string" && value.includes("]");
};
