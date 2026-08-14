/**
 * Trim Lines helper - splits multiline text, trims each line, drops empty entries.
 * No runtime dependencies. TypeScript strict compilation safe.
 */

export function trimLines(text: string): string[] {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}
