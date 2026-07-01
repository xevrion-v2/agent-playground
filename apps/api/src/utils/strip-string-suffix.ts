export function stripStringSuffix(value: string, suffix: string): string {
  return suffix.length > 0 && value.endsWith(suffix) ? value.slice(0, -suffix.length) : value;
}
