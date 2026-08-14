export function stripStringSuffix(value: string, suffix: string): string {
  return value.endsWith(suffix) ? value.slice(0, value.length - suffix.length) : value;
}
