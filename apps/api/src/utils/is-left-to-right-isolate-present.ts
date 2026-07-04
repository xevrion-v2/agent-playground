/**
 * Returns true when the value contains Unicode Left-to-Right Isolate (U+2066).
 */
export function isLeftToRightIsolatePresent(value: string): boolean {
  if (typeof value !== "string") {
    return false;
  }

  return value.includes("\u2066");
}
