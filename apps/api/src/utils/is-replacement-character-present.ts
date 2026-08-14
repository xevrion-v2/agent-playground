const REPLACEMENT_CHARACTER = "\ufffd";

export function isReplacementCharacterPresent(input: string): boolean {
  return input.includes(REPLACEMENT_CHARACTER);
}
