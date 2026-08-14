const FRACTION_SLASH = "\u2044";

export function isFractionSlashPresent(input: string): boolean {
  return input.includes(FRACTION_SLASH);
}
