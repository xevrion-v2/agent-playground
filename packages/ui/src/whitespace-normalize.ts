export function whitespaceNormalize(text: string): string {
  return text.trim().replace(/\s+/g, ' ');
}
