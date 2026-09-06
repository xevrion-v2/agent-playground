export function isZeroNumber(value: unknown): value is number {
  return typeof value === "number" && value === 0;
}
