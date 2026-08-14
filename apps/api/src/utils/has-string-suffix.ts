export function hasStringSuffix(value: unknown, suffix: string): value is string {
  return typeof value === "string" && value.endsWith(suffix);
}
