export const isExactLengthString = (
  value: unknown,
  expectedLength: number
): boolean => {
  return (
    typeof value === "string" &&
    Number.isInteger(expectedLength) &&
    expectedLength >= 0 &&
    value.length === expectedLength
  );
};
