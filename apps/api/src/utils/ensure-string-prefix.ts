export function ensureStringPrefix(value: string, prefix: string): string {
  return prefix.length > 0 && !value.startsWith(prefix) ? `${prefix}${value}` : value;
}
