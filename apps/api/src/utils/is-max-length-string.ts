export const isMaxLengthString = (
  value: unknown,
  maxLength: number
): boolean => {
  return (
    typeof value === "string" &&
    Number.isInteger(maxLength) &&
    maxLength >= 0 &&
    value.length <= maxLength
  );
};
