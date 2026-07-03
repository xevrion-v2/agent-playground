export function isMinLengthString(value: unknown, minLength: number): value is string {
  return typeof value === "string" && value.length >= minLength;
}
