export function isMaxLengthString(value: unknown, maxLength: number): value is string {
  return (
    typeof value === "string" &&
    Number.isInteger(maxLength) &&
    maxLength >= 0 &&
    value.length <= maxLength
  );
}
