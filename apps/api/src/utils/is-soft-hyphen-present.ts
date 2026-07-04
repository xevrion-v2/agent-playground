const SOFT_HYPHEN = "\u00ad";

export function isSoftHyphenPresent(input: string): boolean {
  return input.includes(SOFT_HYPHEN);
}
