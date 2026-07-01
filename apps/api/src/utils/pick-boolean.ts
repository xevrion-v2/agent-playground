export function pickBoolean(value: unknown, fallback?: boolean): boolean | undefined {
  return typeof value === "boolean" ? value : fallback;
}
