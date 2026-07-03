export function isNullCharacterPresent(value: string): boolean {
  return value.includes("\u0000");
}
