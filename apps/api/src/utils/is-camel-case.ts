export function isCamelCase(value: string): boolean {
  return /^[a-z][a-z0-9]*(?:[A-Z][a-z0-9]*)*$/.test(value);
}
