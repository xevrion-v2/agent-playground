export function isDeleteCharacterPresent(input: string): boolean {
  return input.includes("\x7f");
}