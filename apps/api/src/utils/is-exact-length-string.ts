export function isExactLengthString(value: unknown, length: number): value is string {
  return typeof value === "string" && value.length === length;
}
