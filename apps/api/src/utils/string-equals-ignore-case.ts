export function stringEqualsIgnoreCase(value: unknown, expected: string): value is string {
  return typeof value === "string" && value.toLowerCase() === expected.toLowerCase();
}
