export const isSafeNegativeInteger = (value: unknown): boolean => {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value < 0
  );
};
