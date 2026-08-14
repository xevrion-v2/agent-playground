/**
 * Type guard utility.
 */
export function isUnitIntervalNumber(input: unknown): input is number {
  return typeof input === "number" && input >= 0 && input <= 1;
}
