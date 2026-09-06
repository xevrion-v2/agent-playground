/**
 * Returns whether `value` contains the question-mark symbol.
 * Dependency-free utility for API symbol checks.
 */
export function isQuestionMarkSymbolPresent(value: string): boolean {
  return value.includes("?");
}
