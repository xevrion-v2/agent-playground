export function isDeleteCharacterPresent(input: string): boolean {
  return input.includes("\u007F");
}
