export function ensureStringPrefix(value: string, prefix: string): string {
  return value.startsWith(prefix) ? value : `${prefix}${value}`;
}
