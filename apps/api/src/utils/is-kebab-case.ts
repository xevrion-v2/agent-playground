export function isKebabCase(value: string): boolean {
  return /^[a-z]+(?:-[a-z]+)*$/.test(value);
}
