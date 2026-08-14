const CARET_INSERTION_POINT = "\u2041";

export function isCaretInsertionPointPresent(input: string): boolean {
  return input.includes(CARET_INSERTION_POINT);
}
