export function stringEqualsIgnoreCase(value: unknown, expected: string): value is string {
  return typeof value === "string" && value.toLocaleLowerCase() === expected.toLocaleLowerCase();
}
