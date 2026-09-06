export function hasStringPrefix(value: unknown, prefix: string): value is string {
  return typeof value === "string" && value.startsWith(prefix);
}
