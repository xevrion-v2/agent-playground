export const isSafePositiveInteger = (value: unknown): boolean => {
  return (
    typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value > 0
  );
};
