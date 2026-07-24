export function titleCase(text: string): string {
  return text.replace(/\b\w/g, c => c.toUpperCase());
}
