export const stringEqualsIgnoreCase = (
  value: unknown,
  other: string
): boolean => {
  return (
    typeof value === "string" &&
    value.localeCompare(other, undefined, { sensitivity: "accent" }) === 0
  );
};
