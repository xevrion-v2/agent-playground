export function isNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value < 0;
}
