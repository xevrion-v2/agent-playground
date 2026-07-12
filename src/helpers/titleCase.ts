/**
 * Title Case helper - capitalizes the first letter of each word in a string.
 * No runtime dependencies. TypeScript strict compilation safe.
 */

export function titleCase(str: string): string {
  if (!str) return str;
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
