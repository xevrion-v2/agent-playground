export function ensurePrefix(value: string, prefix: string): string {
  if (prefix === "" || value.startsWith(prefix)) {
    return value;
  }

  return `${prefix}${value}`;
}
