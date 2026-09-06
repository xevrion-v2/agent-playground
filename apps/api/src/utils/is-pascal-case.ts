export function isPascalCase(value: string): boolean {
  return /^[A-Z][a-zA-Z0-9]*$/.test(value);
}
