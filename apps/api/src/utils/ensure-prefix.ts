export function ensurePrefix(value: string, prefix: string): string {
  if (prefix.length === 0 || value.startsWith(prefix)) {
    return value;
  }
  return `${prefix}${value}`;
}
