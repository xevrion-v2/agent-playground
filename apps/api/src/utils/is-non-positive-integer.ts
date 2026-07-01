export const isNonPositiveInteger = (value: unknown): boolean => {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value <= 0
  );
};
