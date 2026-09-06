const DOUBLE_HYPHEN = "\u2e40";

export function isDoubleHyphenPresent(input: string): boolean {
  return input.includes(DOUBLE_HYPHEN);
}
