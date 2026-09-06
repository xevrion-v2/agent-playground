export function isZeroNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value === 0;
}
