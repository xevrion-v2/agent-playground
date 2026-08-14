export function isOddInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && Math.abs(value % 2) === 1;
}
