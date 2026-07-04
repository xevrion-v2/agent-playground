const OBJECT_REPLACEMENT_CHARACTER = "\ufffc";

export function isObjectReplacementCharacterPresent(input: string): boolean {
  return input.includes(OBJECT_REPLACEMENT_CHARACTER);
}
