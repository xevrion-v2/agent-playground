export function isCamelCase(value: string): boolean {
  return /^[a-z][a-zA-Z0-9]*$/.test(value) && !/[A-Z]{2,}/.test(value);
}
