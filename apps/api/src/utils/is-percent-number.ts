/**
 * Type guard utility.
 */
export function isPercentNumber(input: unknown): input is number {
  return typeof input === "number" && input >= 0 && input <= 100;
}
