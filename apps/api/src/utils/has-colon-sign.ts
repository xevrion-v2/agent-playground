export const hasColonSign = (value: unknown): boolean => {
  return typeof value === "string" && value.includes(":");
};
