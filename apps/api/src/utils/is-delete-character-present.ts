export function isDeleteCharacterPresent(value: string): boolean {
  return value.includes("\u007F");
}
