export function isEmptyString(value: unknown): value is "" {
  return typeof value === "string" && value.length === 0;
}
