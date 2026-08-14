export function isSafeOddInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && Math.abs(value) % 2 === 1;
}
