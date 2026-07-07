const HYPHEN_WITH_DIAERESIS = "\u2e1a";

export function isHyphenWithDiaeresisPresent(input: string): boolean {
  return input.includes(HYPHEN_WITH_DIAERESIS);
}
