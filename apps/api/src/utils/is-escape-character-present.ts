export function isEscapeCharacterPresent(value: string): boolean {
  return value.includes("\x1b");
}
