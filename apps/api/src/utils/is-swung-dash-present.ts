const SWUNG_DASH = "\u2053";

export function isSwungDashPresent(input: string): boolean {
  return input.includes(SWUNG_DASH);
}
