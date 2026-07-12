export function isEscapeCharacterPresent(input: string): boolean {
  return input.includes("\u001B");
}
