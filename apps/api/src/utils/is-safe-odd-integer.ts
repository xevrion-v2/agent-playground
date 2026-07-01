export function isSafeOddInteger(value: number): boolean {
  return Number.isSafeInteger(value) && Math.abs(value % 2) === 1;
}
