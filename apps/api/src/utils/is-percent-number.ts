export function isPercentNumber(value: number): boolean {
  return Number.isFinite(value) && value >= 0 && value <= 100;
}
