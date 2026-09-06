/**
 * Splits multiline text, trims each line, and drops empty entries.
 * @param text - The multiline text to trim lines from.
 * @returns Array of trimmed, non-empty lines.
 */
export function trimLines(text: string): string[] {
  return text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
}