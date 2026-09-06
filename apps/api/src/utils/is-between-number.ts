/**
 * Type guard utility.
 */
export function isBetweenNumber(input: unknown, min: number, max: number): input is number {
  return typeof input === "number" && input >= min && input <= max;
}
