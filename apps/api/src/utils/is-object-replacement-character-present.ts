export function isObjectReplacementCharacterPresent(value: string): boolean {
  return value.includes("\ufffc");
}
