export function isReversedQuestionMarkPresent(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  return value.includes('\u2E2E');
}
