export function containsSubstring(value: unknown, substring: string): value is string {
  return typeof value === "string" && value.includes(substring);
}
