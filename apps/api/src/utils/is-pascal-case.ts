export function isPascalCase(value: string): boolean {
  return /^(?:[A-Z][a-z0-9]*)+$/.test(value);
}
