export function ensureStringSuffix(value: string, suffix: string): string {
  return suffix.length > 0 && !value.endsWith(suffix) ? `${value}${suffix}` : value;
}
