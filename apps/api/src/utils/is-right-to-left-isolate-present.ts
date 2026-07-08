/**
 * Returns true when the value contains Unicode Right-to-Left Isolate (U+2067).
 */
export function isRightToLeftIsolatePresent(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.includes("\u2067");
}
