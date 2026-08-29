/**
 * Returns true if the string contains any newline control symbol.
 * Recognizes LF (\n), CR (\r), and CRLF sequences.
 */
export function isNewlineSymbolPresent(value: string): boolean {
  return /\r|\n/.test(value);
}
