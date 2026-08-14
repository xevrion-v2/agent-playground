export function isExactLengthString(value: unknown, length: number): value is string {
  return (
    typeof value === "string" &&
    Number.isInteger(length) &&
    length >= 0 &&
    value.length === length
  );
}
