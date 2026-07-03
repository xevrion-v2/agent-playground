export function isEscapeCharacterPresent(input: string): boolean {
  return input.includes("\x1b");
}