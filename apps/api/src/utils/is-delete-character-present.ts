export function isDeleteCharacterPresent(value: string): boolean {
  return value.includes("\x7f");
}
