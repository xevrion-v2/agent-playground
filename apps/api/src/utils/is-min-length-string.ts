export function isMinLengthString(value: unknown, minLength: number): value is string {
  return (
    typeof value === "string" &&
    Number.isInteger(minLength) &&
    minLength >= 0 &&
    value.length >= minLength
  );
}
