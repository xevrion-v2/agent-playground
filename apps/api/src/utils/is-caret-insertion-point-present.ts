export function isCaretInsertionPointPresent(input: string): boolean {
  return input.includes("\u{2041}");
}
