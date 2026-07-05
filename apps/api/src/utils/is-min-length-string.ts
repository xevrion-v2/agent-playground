export const isMinLengthString = (
  value: unknown,
  minLength: number
): boolean => {
  return (
    typeof value === "string" &&
    Number.isInteger(minLength) &&
    minLength >= 0 &&
    value.length >= minLength
  );
};
