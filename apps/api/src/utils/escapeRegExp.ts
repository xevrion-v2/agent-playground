/**
 * Escapes a string so it can be safely embedded in a `RegExp` as a literal.
 *
 * Prefixes every RegExp special character (`.*+?^${}()|[]\`) with a backslash,
 * so user-controlled text never changes the meaning of a pattern.
 *
 * @example
 * const safe = escapeRegExp("file (v2).txt");
 * new RegExp(`^${safe}$`).test("file (v2).txt"); // true
 *
 * @param input - The raw text to escape. Must be a string.
 * @returns The escaped string, usable inside `new RegExp(...)`.
 * @throws {TypeError} When `input` is not a string.
 */
export function escapeRegExp(input: string): string {
  if (typeof input !== "string") {
    throw new TypeError(`escapeRegExp expected a string, received ${typeof input}`);
  }
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
