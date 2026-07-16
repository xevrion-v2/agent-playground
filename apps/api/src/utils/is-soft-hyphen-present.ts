export function isSoftHyphenPresent(input: string): boolean {
  return input.includes("\u{00AD}");
}
