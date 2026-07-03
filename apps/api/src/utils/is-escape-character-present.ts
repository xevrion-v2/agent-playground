export function isEscapeCharacterPresent(value: string): boolean {
  return value.includes("\u001B");
}
