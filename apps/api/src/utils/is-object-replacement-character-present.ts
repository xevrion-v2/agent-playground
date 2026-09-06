export function isObjectReplacementCharacterPresent(input: string): boolean {
  return input.includes("\uFFFC");
}
